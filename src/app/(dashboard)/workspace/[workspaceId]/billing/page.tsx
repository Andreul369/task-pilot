import Pricing from '@/components/pricing';
import {
  getProducts,
  getSubscription,
  getUser,
} from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

export default async function WorkspaceBillingPage({
  params,
}: {
  params: { workspaceId: string };
}) {
  const supabase = createClient();
  const [user, products, subscription] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
    getSubscription(supabase),
  ]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex h-14 items-center bg-muted/40">
        <h1 className="p-4 text-lg font-semibold md:text-2xl lg:p-6">
          Workspaces name
        </h1>
      </div>
      <div className="flex flex-1 flex-col gap-12 p-4 lg:gap-6 lg:p-6">
        <Pricing
          user={user}
          products={products ?? []}
          subscription={subscription}
        />
      </div>
    </div>
  );
}
