import { welcomeOnboardingEmail } from '@/novu/workflows';

// the workflows collection can hold as many workflow definitions as you need
export const { GET, POST, OPTIONS } = serve({
  workflows: [welcomeOnboardingEmail],
});
function serve(arg0: { workflows: void[] }): {
  GET: any;
  POST: any;
  OPTIONS: any;
} {
  throw new Error('Function not implemented.');
}
