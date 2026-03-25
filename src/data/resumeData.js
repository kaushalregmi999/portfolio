export const profile = {
  name: 'Kaushal Regmi',
  title: 'Senior Software Developer',
  location: 'Biratnagar, Nepal',
  phone: '+977 9746208806',
  email: 'regmikaushal321@gmail.com',
  githubUsername: 'kaushal2341',
  summary:
    'Full-stack engineer with 8+ years building scalable web applications across React, Node.js, Next.js, and NestJS. Strong in architecture, reusable systems, performance tuning, and critical issue resolution.',
}

export const skills = [
  { name: 'Node.js', level: 5 },
  { name: 'React.js', level: 5 },
  { name: 'NestJS', level: 5 },
  { name: 'TypeScript', level: 5 },
  { name: 'Next.js', level: 5 },
  { name: 'Jest', level: 5 },
  { name: 'AWS', level: 4 },
  { name: 'Stripe', level: 4 },
  { name: 'MongoDB', level: 5 },
  { name: 'CSS', level: 3 },
]

export const experiences = [
  {
    id: 'exp-ebpearls',
    company: 'Ebpearls',
    role: 'Mid Level Developer (Senior Level Responsibilities)',
    period: 'Jan 2022 - Present',
    highlights: [
      'Built SPG platform capabilities including live-location workflows and AWS Chime communication integrations.',
      'Delivered production applications: Capsule, Diolog, Comm-spec, Bahah, and Top Teacher.',
      'Implemented reusable component systems, TDD workflows, and high-impact performance optimization.',
    ],
  },
  {
    id: 'exp-upwork',
    company: 'Upwork (Freelance)',
    role: 'Full Stack Developer',
    period: 'Nov 2019 - Nov 2021',
    highlights: [
      'Shipped multiple client applications and websites with Node.js + React architectures.',
      'Improved app performance, fixed critical defects, and accelerated delivery through modern tooling.',
      'Published and maintained products like Instructor Hub and Urbane Web.',
    ],
  },
  {
    id: 'exp-f1soft',
    company: 'F1 Soft International',
    role: 'Junior Developer (Mid-Level Responsibilities)',
    period: 'Nov 2017 - Nov 2019',
    highlights: [
      'Built and maintained enterprise applications including Nepal Krishi ERP and EMR modules.',
      'Refactored legacy systems, optimized performance, and introduced reusable design patterns.',
      'Solved critical production issues and improved project structure for maintainability.',
    ],
  },
]

export const internship = {
  id: 'intern-esell',
  title: 'E-sell (Final Year Internship Project)',
  period: 'Oct 2017 - Dec 2017',
  org: 'F1 Soft International / Tribhuvan University',
  stack: ['Java', 'Spring Boot', 'AngularJS', 'SQL'],
  summary:
    'Designed and implemented a full e-commerce platform from scratch with product discovery, bidding, and fixed-price purchase flows.',
}

export const projects = [
  {
    id: 'capsule',
    name: 'Capsule Tickets',
    url: 'https://www.capsuletickets.com/',
    description:
      'Event ticketing platform with real-time notifications, purchase orchestration, and backend ordering workflows.',
    stack: ['React', 'Node.js', 'Next.js', 'NestJS', 'MongoDB', 'Stripe'],
    achievements: [
      'Implemented backend ticket ordering and purchase mechanism for production traffic.',
      'Built reusable components with unit-focused testing workflows.',
      'Shipped real-time ticket event notifications to users.',
    ],
  },
  {
    id: 'diolog',
    name: 'Diolog',
    url: 'https://app.diolog.com.au',
    description:
      'Inquiry management platform with real-time kanban mechanics, advanced charts, and large-media processing.',
    stack: ['React', 'Node.js', 'Next.js', 'NestJS', 'MongoDB'],
    achievements: [
      'Built real-time kanban-like inquiry management flow.',
      'Delivered complex data visualization and chart presentation modules.',
      'Implemented robust upload/download handling for large video files.',
    ],
  },
  {
    id: 'commspec',
    name: 'Comm-spec',
    url: 'https://commspec.co/',
    description:
      'Schedule orchestration product supporting repeating schedules, ordering, duplication, and schema-driven updates.',
    stack: ['React', 'Node.js', 'Next.js', 'NestJS', 'MongoDB'],
    achievements: [
      'Delivered repeating and non-repeating scheduling support.',
      'Implemented schedule ordering, duplication, removal, and updates.',
      'Designed schemas for scalable schedule management.',
    ],
  },
  {
    id: 'bahah',
    name: 'Bahah',
    url: 'https://bahah.com.au/',
    description:
      'Booking and payments platform with complex slot management and full/partial refund systems using Stripe.',
    stack: ['React', 'Node.js', 'Next.js', 'NestJS', 'Stripe'],
    achievements: [
      'Built booking and editable time-slot management flows.',
      'Implemented full and partial refund workflows via Stripe.',
      'Added cron-based payout release system for transactions.',
    ],
  },
  {
    id: 'topteacher',
    name: 'Top Teacher',
    url: 'https://topteacher.com.au/',
    description:
      'Education commerce experience focused on frontend checkout, social login, and performance optimization.',
    stack: ['React', 'Node.js', 'Next.js', 'NestJS', 'MongoDB', 'PayPal'],
    achievements: [
      'Implemented frontend checkout journey with PayPal integration.',
      'Added social login pathways and polished account flow.',
      'Optimized frontend rendering and performance bottlenecks.',
    ],
  },
  {
    id: 'instructorhub',
    name: 'Instructor Hub',
    url: 'https://www.instructorhub.com/',
    description:
      'Freelance product delivery with full-stack ownership, deployment, and iterative feature rollout.',
    stack: ['React', 'Node.js', 'Heroku'],
    achievements: [
      'Owned end-to-end development and deployment lifecycle.',
      'Fixed critical issues and improved overall app performance.',
      'Delivered iterative features with direct client feedback loop.',
    ],
  },
  {
    id: 'spg',
    name: 'SPG Platform',
    url: 'https://devcms.red.global/login',
    description:
      'Special Protection Group application focused on live communication and location-aware response orchestration.',
    stack: ['React', 'Node.js', 'AWS Chime'],
    achievements: [
      'Integrated AWS Chime-based call flow for live location capture.',
      'Implemented client live-location tracking after emergency call events.',
      'Improved reliability in communication-driven mission workflows.',
    ],
  },
  {
    id: 'belongliving',
    name: 'Belong Living',
    url: 'https://belongliving.com.au/',
    description:
      'Web application delivery in freelancing phase with strong full-stack execution.',
    stack: ['React', 'Node.js'],
    achievements: [
      'Built and maintained production features across frontend and backend.',
      'Addressed client-reported defects with quick turnaround.',
      'Improved maintainability with cleaner component patterns.',
    ],
  },
  {
    id: 'urbane',
    name: 'Urbane Web',
    url: 'https://urbanere.com.au',
    description:
      'Business website and application support delivered as freelance full-stack engagement.',
    stack: ['React', 'Node.js'],
    achievements: [
      'Delivered core web features and responsive front-end experience.',
      'Enhanced performance and stability in existing modules.',
      'Collaborated with stakeholders to iterate rapidly on priorities.',
    ],
  },
]
