import { Balancer } from 'react-wrap-balancer';

import * as Icons from '@/components/icons/icons';
import { buttonVariants, FlipWords } from '@/components/ui';
import { cn } from '@/utils/cn';
import {
  getProducts,
  getSubscription,
  getUser,
} from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

export default async function HomePage() {
  const words = ['move forward', 'work faster', 'stay in sync', 'collaborate'];

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center pt-48">
      <div className="z-10 min-h-[50vh] w-full max-w-4xl px-5 xl:px-0">
        <h1
          className="animate-fade-up bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl/[5rem]"
          style={{ animationDelay: '0.20s', animationFillMode: 'forwards' }}
        >
          <Balancer>Task Pilot helps teams</Balancer>
        </h1>
        <FlipWords
          words={words}
          className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl/[5rem]"
        />

        <p
          className="mt-6 animate-fade-up text-center text-muted-foreground/80 opacity-0 md:text-xl"
          style={{ animationDelay: '0.30s', animationFillMode: 'forwards' }}
        >
          <Balancer>
            Collaborate, manage projects, and reach new productivity peaks. From
            high rises to the home office, the way your team works is unique -
            accomplish it all with Dadarello
          </Balancer>
        </p>
        <div
          className="mx-auto mt-6 flex animate-fade-up  items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: '0.40s', animationFillMode: 'forwards' }}
        >
          <a
            className={cn(
              buttonVariants({ variant: 'default' }),
              'bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white',
            )}
            // href={siteConfig.github}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icons.GitHub className="mr-1 h-4 w-4" />
            <span>Star on GitHub</span>
          </a>
        </div>
      </div>
      <div className="my-16 w-full max-w-screen-lg animate-fade-up gap-5 border-t p-5 xl:px-0">
        <h2 className="pt-4 text-center text-3xl font-bold md:text-4xl">
          What&apos;s included?
        </h2>

        <p className="pb-8 pt-4 text-center text-lg">
          <Balancer>
            This repo comes fully stacked with everything you need for your
            enterprise startup. Stop worrying about boilerplate integrations and
            start building your product today!
          </Balancer>
        </p>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* {marketingFeatures.map((feature) => (
          <Card key={feature.title} className={cn("p-2")}>
            <CardHeader>{feature.icon}</CardHeader>
            <CardContent className="space-y-2">
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription className="mt-2">
                {feature.body}
              </CardDescription>
            </CardContent>
          </Card>
        ))} */}
        </div>
      </div>
    </main>
  );
}
