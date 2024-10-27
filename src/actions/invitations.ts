'use server';

import { revalidatePath } from 'next/cache';
import { render } from '@react-email/render';
import { Resend } from 'resend';

import { InvitationEmail } from '@/components/email/invitation-email';
import { createClient } from '@/utils/supabase/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export const inviteWorkspacegMembersAction = async (
  userId: string,
  workspaceId: string,
  invites: {
    email?: string;
    role: 'member' | 'owner';
  }[],
  pathName: string,
) => {
  try {
    const supabase = createClient();

    const data = invites?.map((invite) => ({
      ...invite,
      workspace_id: workspaceId,
      invited_by: userId,
    }));

    const { data: invitesData } = await supabase
      .from('user_invites')
      .upsert(data, {
        onConflict: 'email, workspace_id',
        ignoreDuplicates: false,
      })
      .select('email, code, user:invited_by(*), workspace:workspace_id(*)');

    const emails = invitesData?.map(async (invite) => ({
      from: 'TaskPilot <contact@andreul.com>',
      to: [invite.email],
      subject: `${invite.user.full_name} invited you to join ${invite.workspace.name} on Task Pilot.`,
      html: await render(
        InvitationEmail({
          invitedByEmail: invite.user.email,
          invitedByName: invite.user.full_name,
          workspaceId: invite.workspace.id,
          email: invite.email,
          workspaceName: invite.workspace.name,
          inviteCode: invite.code,
        }),
      ),
    }));

    const htmlEmails = await Promise.all(emails);

    await resend.batch.send(htmlEmails);

    revalidatePath(pathName);
  } catch (error) {
    return error instanceof Error
      ? { error: error.message }
      : { error: 'Error from updateBoardTitle.' };
  }
};
