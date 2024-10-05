import { renderEmail } from '../../emails/novu-onboarding-email';
import { emailControlSchema, payloadSchema } from './schemas';

export const welcomeOnboardingEmail = workflow(
  'welcome-onboarding-email',
  async ({ step, payload }) => {
    await step.email(
      'send-email',
      async (controls: any) => {
        return {
          subject: controls.subject,
          body: renderEmail(controls, payload),
        };
      },
      {
        controlSchema: emailControlSchema,
      },
    );
  },
  {
    payloadSchema,
  },
);
function workflow(
  arg0: string,
  arg1: ({ step, payload }: { step: any; payload: any }) => Promise<void>,
  arg2: {
    payloadSchema: import('zod').ZodObject<
      {
        teamImage: import('zod').ZodDefault<import('zod').ZodString>;
        userImage: import('zod').ZodDefault<import('zod').ZodString>;
        arrowImage: import('zod').ZodDefault<import('zod').ZodString>;
      },
      'strip',
      import('zod').ZodTypeAny,
      { teamImage: string; userImage: string; arrowImage: string },
      {
        teamImage?: string | undefined;
        userImage?: string | undefined;
        arrowImage?: string | undefined;
      }
    >;
  },
) {
  throw new Error('Function not implemented.');
}
