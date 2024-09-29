export const workspaces = [
  {
    id: '1',
    name: 'Workspace #1',
    boards: [
      {
        id: '1',
        name: 'Sales Pipelines',
      },
      {
        id: '2',
        name: 'Dev Pipelines',
      },
      {
        id: '3',
        name: 'Economic Research',
      },
    ],
  },
  {
    id: '2',
    name: 'Workspace #2',
    boards: [
      {
        id: '1',
        name: 'Home Stuff',
      },
      {
        id: '2',
        name: 'Items for vacation',
      },
      {
        id: '3',
        name: 'Personal Journalism',
      },
    ],
  },
];

export const user = {
  userId: 1,
  orgId: 1,
  username: 'jonwick1',
  firstName: 'Jon',
  lastName: 'Wick',
  emailAddresses: [{ id: 'primary', emailAddress: 'jonwick@email.com' }],
  primaryEmailAddressId: 'primary',
  imageUrl: '/sign-in-background.jpg',
};

export const mails = [
  {
    id: 'de305d54-75b4-431b-adb2-eb6b9e546014',
    name: 'James Martin',
    email: 'jamesmartin@example.com',
    subject: 'Re: Conference Registration',
    text: "I've completed the registration for the conference next month. The event promises to be a great networking opportunity, and I'm looking forward to attending the various sessions and connecting with industry experts.\n\nI've also attached the conference schedule for your reference.\n\nIf there are any specific topics or sessions you'd like me to explore, please let me know. It's an exciting event, and I'll make the most of it.\n\nBest regards, James",
    date: '2022-11-30T19:15:00',
    read: true,
    labels: ['work', 'conference'],
  },
  {
    id: 'de305d54-75b4-431b-adb2-eb6b9e546014',
    name: 'James Martin',
    email: 'jamesmartin@example.com',
    subject: 'Re: Conference Registration',
    text: "I've completed the registration for the conference next month. The event promises to be a great networking opportunity, and I'm looking forward to attending the various sessions and connecting with industry experts.\n\nI've also attached the conference schedule for your reference.\n\nIf there are any specific topics or sessions you'd like me to explore, please let me know. It's an exciting event, and I'll make the most of it.\n\nBest regards, James",
    date: '2022-11-30T19:15:00',
    read: true,
    labels: ['work', 'conference'],
  },
  {
    id: 'de305d54-75b4-431b-adb2-eb6b9e546014',
    name: 'James Martin',
    email: 'jamesmartin@example.com',
    subject: 'Re: Conference Registration',
    text: "I've completed the registration for the conference next month. The event promises to be a great networking opportunity, and I'm looking forward to attending the various sessions and connecting with industry experts.\n\nI've also attached the conference schedule for your reference.\n\nIf there are any specific topics or sessions you'd like me to explore, please let me know. It's an exciting event, and I'll make the most of it.\n\nBest regards, James",
    date: '2022-11-30T19:15:00',
    read: true,
    labels: ['work', 'conference'],
  },
  {
    id: '7dd90c63-00f6-40f3-bd87-5060a24e8ee7',
    name: 'Sophia White',
    email: 'sophiawhite@example.com',
    subject: 'Team Dinner',
    text: "Let's have a team dinner next week to celebrate our success. We've achieved some significant milestones, and it's time to acknowledge our hard work and dedication.\n\nI've made reservations at a lovely restaurant, and I'm sure it'll be an enjoyable evening.\n\nPlease confirm your availability and any dietary preferences. Looking forward to a fun and memorable dinner with the team!\n\nBest, Sophia",
    date: '2022-11-05T20:30:00',
    read: false,
    labels: ['meeting', 'work'],
  },
  {
    id: '99a88f78-3eb4-4d87-87b7-7b15a49a0a05',
    name: 'Daniel Johnson',
    email: 'danieljohnson@example.com',
    subject: 'Feedback Request',
    text: "I'd like your feedback on the latest project deliverables. We've made significant progress, and I value your input to ensure we're on the right track.\n\nI've attached the deliverables for your review, and I'm particularly interested in any areas where you think we can further enhance the quality or efficiency.\n\nYour feedback is invaluable, and I appreciate your time and expertise. Let's work together to make this project a success.\n\nRegards, Daniel",
    date: '2022-10-22T09:30:00',
    read: false,
    labels: ['work'],
  },
  {
    id: '6c9a7f94-8329-4d70-95d3-51f68c186ae1',
    name: 'Samuel Turner',
    email: 'samuelturner@example.com',
    subject: 'Weekend Hike',
    text: "Who's up for a weekend hike in the mountains? I've been craving some outdoor adventure, and a hike in the mountains sounds like the perfect escape. If you're up for the challenge, we can explore some scenic trails and enjoy the beauty of nature.\n\nI've done some research and have a few routes in mind.\n\nLet me know if you're interested, and we can plan the details.\n\nIt's sure to be a memorable experience! Samuel",
    date: '2022-07-28T17:30:00',
    read: false,
    labels: ['personal'],
  },
];

export type Mail = (typeof mails)[number];

export const accounts = [
  {
    label: 'Alicia Koch',
    email: 'alicia@example.com',
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>Vercel</title>
        <path d="M24 22.525H0l12-21.05 12 21.05z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Alicia Koch',
    email: 'alicia@gmail.com',
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>Gmail</title>
        <path
          d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: 'Alicia Koch',
    email: 'alicia@me.com',
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>iCloud</title>
        <path
          d="M13.762 4.29a6.51 6.51 0 0 0-5.669 3.332 3.571 3.571 0 0 0-1.558-.36 3.571 3.571 0 0 0-3.516 3A4.918 4.918 0 0 0 0 14.796a4.918 4.918 0 0 0 4.92 4.914 4.93 4.93 0 0 0 .617-.045h14.42c2.305-.272 4.041-2.258 4.043-4.589v-.009a4.594 4.594 0 0 0-3.727-4.508 6.51 6.51 0 0 0-6.511-6.27z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export type Account = (typeof accounts)[number];

export const contacts = [
  {
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
  },
  {
    name: 'Liam Wilson',
    email: 'liam.wilson@example.com',
  },
  {
    name: 'Olivia Davis',
    email: 'olivia.davis@example.com',
  },
  {
    name: 'Noah Martinez',
    email: 'noah.martinez@example.com',
  },
  {
    name: 'Ava Taylor',
    email: 'ava.taylor@example.com',
  },
  {
    name: 'Lucas Brown',
    email: 'lucas.brown@example.com',
  },
  {
    name: 'Sophia Smith',
    email: 'sophia.smith@example.com',
  },
  {
    name: 'Ethan Wilson',
    email: 'ethan.wilson@example.com',
  },
  {
    name: 'Isabella Jackson',
    email: 'isabella.jackson@example.com',
  },
  {
    name: 'Mia Clark',
    email: 'mia.clark@example.com',
  },
  {
    name: 'Mason Lee',
    email: 'mason.lee@example.com',
  },
  {
    name: 'Layla Harris',
    email: 'layla.harris@example.com',
  },
  {
    name: 'William Anderson',
    email: 'william.anderson@example.com',
  },
  {
    name: 'Ella White',
    email: 'ella.white@example.com',
  },
  {
    name: 'James Thomas',
    email: 'james.thomas@example.com',
  },
  {
    name: 'Harper Lewis',
    email: 'harper.lewis@example.com',
  },
  {
    name: 'Benjamin Moore',
    email: 'benjamin.moore@example.com',
  },
  {
    name: 'Aria Hall',
    email: 'aria.hall@example.com',
  },
  {
    name: 'Henry Turner',
    email: 'henry.turner@example.com',
  },
  {
    name: 'Scarlett Adams',
    email: 'scarlett.adams@example.com',
  },
];

export type Contact = (typeof contacts)[number];
