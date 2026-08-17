// GARAGE by ARTICON: project data.
//
// Static fallback. In production, api.js can fetch this same shape live
// from a Google Sheet (via Apps Script) so leads can update status without
// touching code. See src/lib/api.js and /BACKEND.md. Until then, the site
// runs entirely off this file.

export const STATUS = {
  RECRUITING: { label: 'Recruiting' },
  IN_PROGRESS: { label: 'In progress' },
  SHIPPED: { label: 'Shipped' },
  PAUSED: { label: 'On hold' },
}

export const projects = [
  {
    slug: 'local-first',
    type: 'flagship',
    name: 'LOCAL//FIRST',
    tagline: 'No API keys. No cloud AI. Build local.',
    status: 'RECRUITING',
    hero: 'A local-first AI hackathon built around one constraint: everything has to run on the machine in front of you.',
    summary: [
      'LOCAL//FIRST is an AI hackathon built around one constraint: AI systems must run locally rather than depending on hosted AI APIs.',
      'Participants explore local LLMs, computer vision models, speech models, small language models, optimisation techniques and other forms of on-device AI.',
      'A big part of the event is making the competition fair across different levels of hardware, so the challenge rewards engineering, optimisation and creativity, not just whoever owns the most powerful GPU.',
    ],
    whatYoullDo:
      'The founding team splits across four areas: designing the actual challenge tracks and hardware tiers, building the platform that runs registration and judging, handling logistics on the day, and creating the posters, campaigns and coverage that get people to show up. A separate outreach group brings in judges, mentors and sponsors from outside college.',
    plugIn: ['Challenge & technical design', 'Platform & systems', 'Event operations', 'Creative & media', 'Outreach & partnerships'],
    benefits: [
      'Hands-on experience running a real technical event from scratch, not just attending one',
      'A concrete deliverable you can point to afterwards, whichever part you build',
      'Direct contact with external judges, mentors and AI communities',
      'Room to lead a track outright if you want the ownership',
    ],
  },
  {
    slug: 'wikilynx',
    type: 'flagship',
    name: 'WIKILYNX 2.0',
    tagline: 'Race through Wikipedia. No search bar. No Google.',
    status: 'RECRUITING',
    hero: 'Players get a starting Wikipedia page and a target page, and have to reach it using only in-article links.',
    summary: [
      'Wikilynx is returning. Players are given a starting Wikipedia page and a target page and must reach the destination using only links available within Wikipedia.',
      'No search bar. No Google. Just knowledge, strategy and questionable Wikipedia rabbit holes.',
      'Wikilynx ran successfully before, and 2.0 builds on that format with new challenges, game modes and a better competitive experience: individual speedruns, team battles, elimination stages, increasingly difficult routes.',
    ],
    whatYoullDo:
      'The team designs how the game actually plays (routes, rounds, scoring), builds the small platform that runs it (timers, leaderboards, match tracking), hosts the competition on mic, handles the logistics, and creates the branding and coverage around it.',
    plugIn: ['Game design', 'Tech & platform', 'Game masters', 'Event operations', 'Creative & media'],
    benefits: [
      'A fast, visible project you can see through from idea to event night',
      'Practice in hosting, game design or building a small live-event platform',
      'A proven format, which makes it a low-risk first ARTICON project',
      'Content people actually remember and talk about afterwards',
    ],
  },
  {
    slug: 'eclipse',
    type: 'product',
    name: 'ECLIPSE',
    tagline: 'A platform for student life.',
    status: 'IN_PROGRESS',
    hero: 'Infrastructure for student life: events, clubs, communities and opportunities in one place instead of scattered across WhatsApp and Instagram.',
    summary: [
      'Eclipse is one of ARTICON\u2019s long-term product initiatives: a platform connecting events, clubs, communities, opportunities and students across the college.',
      'Instead of information being scattered across WhatsApp groups, Instagram pages and posters, Eclipse makes it easy to discover events, clubs, competitions, workshops, opportunities, inter-branch collaborations and projects looking for contributors.',
      'Eclipse is not another social media app. Think of it as infrastructure. Because it\u2019s long-term, joining Eclipse means working on it continuously, not organising a single event.',
    ],
    whatYoullDo:
      'This is ongoing product work: deciding what Eclipse should become, designing the interface, building the frontend and backend, testing what ships, and getting the first clubs and events onto the platform.',
    plugIn: ['Product & strategy', 'Frontend development', 'Backend development', 'UI/UX design', 'Testing & quality', 'Community & adoption', 'Partnerships'],
    benefits: [
      'Real product experience, from research to shipped feature, that reads well afterwards',
      'Long-term ownership of something used across the whole college, not one event',
      'Space to work in whichever part of the stack interests you most',
      'A project that keeps compounding instead of ending after one weekend',
    ],
  },
  {
    slug: 'activity-hours',
    type: 'recurring',
    name: 'ACTIVITY HOURS',
    tagline: 'Small games. Maximum chaos.',
    status: 'RECRUITING',
    hero: 'Short, highly interactive games and challenges designed to bring the community together. No laptop required.',
    summary: [
      'Not everything ARTICON does needs a workshop and a laptop. Activity Hours are short, highly interactive games and challenges designed to bring the community together.',
      'Think Deal or No Deal, Password Panic, AI or Human, Tech Taboo, Debugging Roulette, Guess the Output, Tech Jeopardy, and whatever weird concepts come next.',
      'These are generally smaller and much faster to organise than ARTICON\u2019s flagship events, which makes this a great entry point if you want to contribute without a big time commitment.',
    ],
    whatYoullDo:
      'Small teams dream up a game, test it, then run it. Someone hosts, someone handles logistics, someone might build a small tool like a buzzer or quiz system, and someone shapes how it\u2019s promoted.',
    plugIn: ['Activity design', 'Hosting', 'Activity crew', 'Tech builders', 'Creative crew'],
    benefits: [
      'The lowest-commitment way into ARTICON if you\u2019re short on time',
      'A safe place to try hosting or event design for the first time',
      'Quick turnaround: idea to a running session in a couple of weeks',
      'Genuinely fun to be part of, not just useful',
    ],
  },
  {
    slug: 'build-series',
    type: 'recurring',
    name: 'ARTICON BUILD SERIES',
    tagline: 'Learn by shipping, not by copying code.',
    status: 'RECRUITING',
    hero: 'We don\u2019t want technical upskilling to mean attend workshop, copy code, receive certificate, forget everything.',
    summary: [
      'The Build Series focuses on learning through building and shipping. Sessions may cover AI/ML, LLMs, web development, data science, cybersecurity, systems, open source, hardware and other emerging tech.',
      'Different members lead different sessions depending on their expertise. The aim is for participants to leave a series having actually built something.',
      'Instead of teaching React concepts, build an application. Instead of explaining RAG, build a RAG system. Instead of explaining computer vision, build something using a camera.',
    ],
    whatYoullDo:
      'Mentors lead sessions in whatever they know well, supported by people researching what\u2019s worth teaching, building the reference project participants will make, helping beginners during sessions, and handling scheduling and logistics.',
    plugIn: ['Technical mentors', 'Research & curriculum', 'Project builders', 'Learning support', 'Session operations'],
    benefits: [
      'A structured reason to go deep on something you already know, by teaching it',
      'Mentoring experience, which is different from (and useful alongside) just building',
      'Participants leave with something built, so your session has a visible result',
      'A lower-pressure way to contribute than owning a flagship event',
    ],
  },
  {
    slug: 'second-brain',
    type: 'product',
    name: 'SECOND BRAIN',
    tagline: 'ARTICON\u2019s community knowledge platform.',
    status: 'RECRUITING',
    hero: 'Every year students discover resources, solve problems and learn lessons, then graduate, and most of that knowledge disappears. Second Brain is an attempt to change that.',
    summary: [
      'Second Brain is a community-built knowledge platform: technical notes, learning resources, roadmaps, project documentation, tutorials, useful tools, GitHub repos, event resources, past projects, and lessons from seniors.',
      'An intelligent search and AI layer can eventually let students interact with this collective knowledge naturally, so Second Brain is both a software product and a community knowledge project.',
    ],
    whatYoullDo:
      'The team splits between building the platform itself, working on the AI and search layer, curating and structuring what\u2019s already been submitted, writing original guides and notes, designing how thousands of resources stay navigable, and getting people to actually contribute.',
    plugIn: ['AI / knowledge systems', 'Software development', 'Knowledge curators', 'Contributors', 'Product & UX', 'Community'],
    benefits: [
      'A long-term product to point to, with your name on specific contributions',
      'A natural place to work with RAG, embeddings or search if that interests you',
      'A low-friction entry point if you\u2019d rather write and curate than code',
      'You\u2019re building the thing that outlives your batch',
    ],
  },
  {
    slug: 'mall-hackathon',
    type: 'paused',
    name: 'MALL HACKATHON',
    tagline: 'A hackathon in collaboration with IEDC.',
    status: 'PAUSED',
    hero: 'On hold while the IEDC collaboration details get worked out.',
    summary: [
      'A hackathon run in collaboration with IEDC. This one is paused for the moment. The team opens up once the collaboration structure is confirmed.',
    ],
    whatYoullDo: '',
    plugIn: [],
    benefits: [],
  },
  {
    slug: 'joy-run',
    type: 'paused',
    name: 'JOY RUN',
    tagline: 'Technology, used in the real world.',
    status: 'PAUSED',
    hero: 'A small core team is already shaping this one. Wider recruitment opens later.',
    summary: [
      'Joy Run is being worked on by a small existing team for now, so it stays off the general list while that early shape comes together. Check back for when it opens up.',
    ],
    whatYoullDo: '',
    plugIn: [],
    benefits: [],
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)

export const activeProjects = () => projects.filter((p) => p.type !== 'paused')
export const pausedProjects = () => projects.filter((p) => p.type === 'paused')
