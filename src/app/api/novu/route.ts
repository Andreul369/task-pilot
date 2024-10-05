import { serve } from '@novu/framework/next';

import { newBoardWorkflow, testWorkflow } from '@/app/novu/workflows';

export const { GET, POST, PUT, OPTIONS } = serve({
  workflows: [testWorkflow, newBoardWorkflow],
});
