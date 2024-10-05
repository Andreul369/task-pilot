import { Novu } from '@novu/node';
import { nanoid } from 'nanoid';

const novu = new Novu(process.env.NOVU_API_KEY!);

const API_ENDPOINT = 'https://api.novu.co/v1';

export enum TriggerEvents {
  TransactionNewInApp = 'transaction_new_in_app',
  TransactionsNewInApp = 'transactions_new_in_app',
  TransactionNewEmail = 'transaction_new_email',
  InboxNewInApp = 'inbox_new_in_app',
  MatchNewInApp = 'match_in_app',
}

export enum NotificationTypes {
  Transaction = 'transaction',
  Transactions = 'transactions',
  Inbox = 'inbox',
  Match = 'match',
}

type TriggerUser = {
  subscriberId: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  workspaceId: string;
};

type TriggerPayload = {
  name: TriggerEvents;
  payload: any;
  user: TriggerUser;
  replyTo?: string;
  tenant?: string; // NOTE: Currently no way to listen for messages with tenant, we use workspace_id + user_id for unique
};

export async function trigger(data: TriggerPayload) {
  try {
    await novu.trigger(data.name, {
      to: {
        ...data.user,
        //   Prefix subscriber id with workspace id
        subscriberId: `${data.user.workspaceId}_${data.user.subscriberId}`,
      },
      payload: data.payload,
      tenant: data.tenant,
      overrides: {
        email: {
          replyTo: data.replyTo,
          // @ts-ignore
          headers: {
            'X-Entity-Ref-ID': nanoid(),
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function triggerBulk(events: TriggerPayload[]) {
  try {
    await novu.bulkTrigger(
      events.map((data) => ({
        name: data.name,
        to: {
          ...data.user,
          //   Prefix subscriber id with workspace id
          subscriberId: `${data.user.workspaceId}_${data.user.subscriberId}`,
        },
        payload: data.payload,
        tenant: data.tenant,
        overrides: {
          email: {
            replyTo: data.replyTo,
            headers: {
              'X-Entity-Ref-ID': nanoid(),
            },
          },
        },
      })),
    );
  } catch (error) {
    console.log(error);
  }
}

type GetSubscriberPreferencesParams = {
  workspaceId: string;
  subscriberId: string;
};

export async function getSubscriberPreferences({
  subscriberId,
  workspaceId,
}: GetSubscriberPreferencesParams) {
  const response = await fetch(
    `${API_ENDPOINT}/subscribers/${workspaceId}_${subscriberId}/preferences`,
    {
      method: 'GET',
      headers: {
        Authorization: `ApiKey ${process.env.NOVU_API_KEY!}`,
      },
    },
  );

  return response.json();
}

type UpdateSubscriberPreferenceParams = {
  subscriberId: string;
  workspaceId: string;
  templateId: string;
  type: string;
  enabled: boolean;
};

export async function updateSubscriberPreference({
  subscriberId,
  workspaceId,
  templateId,
  type,
  enabled,
}: UpdateSubscriberPreferenceParams) {
  const response = await fetch(
    `${API_ENDPOINT}/subscribers/${workspaceId}_${subscriberId}/preferences/${templateId}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `ApiKey ${process.env.NOVU_API_KEY!}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        channel: {
          type,
          enabled,
        },
      }),
    },
  );

  return response.json();
}
