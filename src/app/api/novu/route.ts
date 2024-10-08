import { serve } from '@novu/framework/next';

import { newBoardWorkflow, testWorkflow } from '@/utils/novu/workflows';

export const { GET, POST, OPTIONS } = serve({
  workflows: [testWorkflow, newBoardWorkflow],
});
