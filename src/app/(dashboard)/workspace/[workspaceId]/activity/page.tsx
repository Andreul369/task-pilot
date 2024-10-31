import { getAuditLogs } from '@/actions/audit-logs';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { getInitials } from '@/utils/helpers';

export default async function WorkspaceActivityPage({
  params,
}: {
  params: { workspaceId: string };
}) {
  const workspaceId = params.workspaceId;
  const auditLogs = await getAuditLogs(workspaceId);

  function formatActivityMessage(
    userName: string,
    action: 'delete' | 'update' | 'create',
    entityType: string,
  ) {
    const actionText = {
      delete: 'deleted',
      update: 'updated',
      create: 'created',
    }[action];

    return `${userName} ${actionText} a ${entityType}`;
  }

  // TODO: we could use infinite query to do this.
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 self-center p-4">
      <Card>
        <CardHeader className="p-4 lg:p-6">
          <CardTitle className="flex items-center gap-2">
            Workspace Activity
          </CardTitle>
          <CardDescription>
            View the activity of your workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 p-4 lg:p-6">
          {auditLogs?.map((log) => (
            <div key={log.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={log.user_image} />
                  <AvatarFallback>
                    {log && getInitials(log.user_name)}
                  </AvatarFallback>
                </Avatar>
                <p className="font-medium leading-none">
                  {formatActivityMessage(
                    log.user_name,
                    log.action,
                    log.entity_type,
                  )}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
