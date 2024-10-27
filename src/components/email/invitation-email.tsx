import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

import { Footer } from './components/footer';
import { Logo } from './components/logo';

interface InviteEmailProps {
  email?: string;
  invitedByEmail?: string;
  invitedByName?: string;
  workspaceName?: string;
  workspaceId?: string;
  inviteCode?: string;
}

const baseUrl =
  process.env.VERCEL_ENV === 'production'
    ? 'https://midday.ai/email'
    : 'http://localhost:3000/email';

const baseAppUrl =
  process.env.VERCEL_ENV === 'production'
    ? 'https://app.midday.ai'
    : 'http://localhost:3001';

export const InvitationEmail = ({
  invitedByEmail = 'bukinoshita@example.com',
  invitedByName = 'Pontus Abrahamsson',
  email = 'pontus@lostisland.co',
  workspaceName = 'Acme Co',
  workspaceId = '123',
  inviteCode = 'jnwe9203frnwefl239jweflasn1230oqef',
}: InviteEmailProps) => {
  const inviteLink = `${baseAppUrl}/workspace/${workspaceId}/${inviteCode}`;

  return (
    <Html>
      <Tailwind>
        <Head>
          <Font
            fontFamily="Geist"
            fallbackFontFamily="Helvetica"
            webFont={{
              url: 'https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.1/files/geist-sans-latin-400-normal.woff2',
              format: 'woff2',
            }}
            fontWeight={400}
            fontStyle="normal"
          />

          <Font
            fontFamily="Geist"
            fallbackFontFamily="Helvetica"
            webFont={{
              url: 'https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.1/files/geist-sans-latin-500-normal.woff2',
              format: 'woff2',
            }}
            fontWeight={500}
            fontStyle="normal"
          />
        </Head>
        <Preview>Join, {workspaceName} on Task Pilot</Preview>

        <Body className="mx-auto my-auto bg-[#fff] font-sans">
          <Container
            className="mx-auto my-[40px] max-w-[600px] border-transparent p-[20px] md:border-[#E8E7E1]"
            style={{ borderStyle: 'solid', borderWidth: 1 }}
          >
            <Logo baseUrl={baseUrl} />
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-[#121212]">
              Join <strong>{workspaceName}</strong> on{' '}
              <strong>Task Pilot</strong>
            </Heading>

            <Text className="text-[14px] leading-[24px] text-[#121212]">
              {invitedByName} (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-[#121212] no-underline"
              >
                {invitedByEmail}
              </Link>
              ) has invited you to the <strong>{workspaceName}</strong>{' '}
              workspace on <strong>Task Pilot</strong>.
            </Text>
            <Section className="mb-[42px] mt-[32px] text-center">
              <Button
                className="rounded-md border border-solid border-[#121212] bg-transparent px-6 py-3 text-center text-[14px] font-medium text-[#121212] no-underline"
                href={inviteLink}
              >
                Join the workspace
              </Button>
            </Section>

            <Text className="break-all text-[14px] leading-[24px] text-[#707070]">
              or copy and paste this URL into your browser:{' '}
              <Link href={inviteLink} className="text-[#707070] underline">
                {inviteLink}
              </Link>
            </Text>

            <br />
            <Section>
              <Text className="text-[12px] leading-[24px] text-[#666666]">
                This invitation was intended for{' '}
                <span className="text-[#121212] ">{email}</span>. If you were
                not expecting this invitation, you can ignore this email. If you
                are concerned about your account&apos;s safety, please reply to
                this email to get in touch with us.
              </Text>
            </Section>

            <br />

            <Footer baseUrl={baseUrl} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default InvitationEmail;
