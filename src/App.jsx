// v9
import { useState, useEffect } from 'react';

const C = {
  bg:          '#0A0A0A',
  surface:     '#111111',
  card:        '#161616',
  accent:      '#E63946',
  textPrimary: '#F5F5F5',
  textSecond:  '#C0C0C0',
  textMuted:   '#888888',
  border:      'rgba(255,255,255,0.08)',
  green:       '#22C55E',
};

const SECTION_STYLES = [
  { bg: '#1A0B0C', border: '#E63946' }, // problem statement
  { bg: '#0B0C1A', border: '#4F8EF7' }, // constraint
  { bg: '#1A130B', border: '#F5A623' }, // decision
  { bg: '#130B1A', border: '#A855F7' }, // what i'd do differently
];

const METRIC_COLORS = {
  'VALIDATED':    '#22C55E',
  'TARGET':       '#888888',
  'EARLY SIGNAL': '#F59E0B',
  'QUALITATIVE':  '#60A5FA',
  'PEER TESTED':  '#A78BFA',
  'SELF TESTED':  '#F97316',
};

const sg = "'Space Grotesk', sans-serif";
const jb = "'JetBrains Mono', monospace";

const GLOBAL_CSS = [
  '*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }',
  'html { scroll-behavior:smooth; }',
  "body { background:#0A0A0A; color:#F5F5F5; font-family:'Space Grotesk', sans-serif; -webkit-font-smoothing:antialiased; overflow-x:hidden; }",
  '::-webkit-scrollbar { width:4px; }',
  '::-webkit-scrollbar-track { background:#0A0A0A; }',
  '::-webkit-scrollbar-thumb { background:#555555; border-radius:2px; }',
  '@keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.35; transform:scale(.7); } }',
  '.pulse-dot { animation: pulse 1.6s ease-in-out infinite; }',
  '.h-primary { cursor:pointer; transition:background .2s,color .2s; }',
  '.h-primary:hover { background:#E63946 !important; color:#F5F5F5 !important; }',
  '.h-ghost { cursor:pointer; transition:border-color .2s,color .2s,background .2s; text-decoration:none; }',
  '.h-ghost:hover { background:#E63946 !important; border-color:#E63946 !important; color:#F5F5F5 !important; }',
  '.h-live { cursor:pointer; transition:opacity .2s; text-decoration:none; }',
  '.h-live:hover { opacity:0.82 !important; }',
  '.h-log { cursor:pointer; transition:border-color .2s,color .2s; }',
  '.h-log:hover { border-color:#C0C0C0 !important; color:#F5F5F5 !important; }',
  '.h-tab { cursor:pointer; transition:color .2s; }',
  '.h-tab:hover { color:#F5F5F5 !important; }',
  '.h-link { transition:color .2s; text-decoration:none; }',
  '.h-link:hover { color:#E63946 !important; }',
  '.h-evolve { cursor:pointer; transition:color .2s; }',
  '.h-evolve:hover { color:#888888 !important; }',
  '@media (max-width: 768px) {',
  '  body, html { overflow-x: hidden; max-width: 100vw; }',
  '  .tabs-container { overflow-x: auto !important; -webkit-overflow-scrolling: touch; scrollbar-width: none; }',
  '  .tabs-container::-webkit-scrollbar { display: none; }',
  '  .go-deeper-grid { grid-template-columns: 1fr !important; gap: 12px !important; }',
  '  .psi-grid-row { grid-template-columns: 1fr !important; gap: 10px !important; }',
  '  .metrics-grid { grid-template-columns: 1fr !important; }',
  '  .hero-ctas { flex-direction: column !important; width: 100%; }',
  '  .hero-ctas button, .hero-ctas a { width: 100%; text-align: center; justify-content: center; }',
  '  .contact-items { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }',
  '  button, a { min-height: 44px; display: inline-flex; align-items: center; }',
  '}',
].join('\n');

const HERO_GRID = [
  {
    problem: 'No network. No referrals. 2 hours daily finding who to email.',
    whatIDid: 'Built autonomous pipeline. Scrapes. Enriches. Drafts in my voice.',
    impact: '51 roles daily. Zero manual effort.',
  },
  {
    problem: "75% of Bolna revenue stuck. Business owners couldn't activate without engineering help.",
    whatIDid: 'Redesigned entire onboarding from first principles.',
    impact: '30min → 15min. Self-served. No support needed.',
  },
  {
    problem: 'Freshers skipping roles they could actually get. Instinct was the only tool they had.',
    whatIDid: 'Built scoring system. Shipped it. Tested it with real users.',
    impact: '35% found a reachable role they had been missing.',
  },
];

const PROJECTS = [
  {
    id: 0,
    tab: 'ROLEREACH',
    heading: 'RoleReach',
    subheading: 'Full Stack Agentic System, Live in Production',
    tagline: "PM job search was manual, scattered across platforms and generic in outreach. I built end to end infrastructure that consolidates everything. It scrapes daily, resolves hiring manager contacts, drafts outreach in my voice and delivers to Telegram every morning at 8AM. A live dashboard tracks every lead from source to sent. One step stays human. The final send is always my judgment call.",
    metric: 'Runs every morning at 8AM sharp. 14 new roles today. 125 in pipeline. Named email on 33 leads. LinkedIn contact on 20 more.',
    pmTags: ['SYSTEMS THINKING', 'ITERATIVE SHIPPING', 'HUMAN IN THE LOOP DESIGN', 'AGENTIC PRODUCT DESIGN'],
    techTags: ['API INTEGRATION', 'WEB SCRAPING', 'WORKFLOW AUTOMATION', 'PRODUCTION DEPLOYMENT', 'DATABASE MANAGEMENT', 'AI INTEGRATION'],
    liveUrl: 'https://rolereach.onrender.com',
    problemStatement: "A PM entering the market without a network has one lever: outreach volume. When building that volume manually takes two hours every morning, most of that time gets spent finding who to email — not actually emailing anyone. The pipeline dries up not because the opportunities don't exist but because the process of finding them is consuming the energy needed to pursue them.",
    pmSkills: ['Problem Framing', 'Systems Thinking', 'Metrics Design', 'Prioritisation', 'User Research', 'Iteration'],
    techSkills: ['Python', 'Supabase', 'GitHub Actions', 'Railway → Render', 'Claude API', 'Telegram Bot', 'Flask'],
    constraintBullets: [
      "Zero budget. Not low budget. Zero. Every existing tool that solved any part of this charged money. The only option was to build something that works permanently for free. Every step of it, from finding jobs to sending the morning summary.",
      "The stakes were real from day one. Every test I ran used actual job listings at actual companies. When something broke it wasn't a bug to fix later. It was a real opportunity that slipped by while I was fixing it. That feeling is completely different from breaking something in a practice exercise.",
      "The hardest constraint was infrastructure. A system that wakes up at 8AM, does 15 minutes of work, then switches off without paying to sit idle all day. Keeping a server running 24 hours for one daily task is like leaving every light in the house on to use one room for an hour. I solved it with GitHub Actions. It costs nothing between runs.",
    ],
    decisionBullets: [
      "A spreadsheet felt like the obvious starting point. Then I thought about what a spreadsheet actually does. It holds information I already put in. It doesn't find the jobs. It doesn't find the contact. It doesn't write the email. It just waits for me to do all the work first. I built a system that does all of that instead.",
      "The first version delivered everything through a chat app. Fifty one jobs showed up as a wall of text with no way to see which had a contact, no way to know which to act on first, no structure at all. I built the dashboard the next day. Who to contact today, contact information already attached, the whole pipeline visible at once.",
      "Email alone wasn't enough. When hiring manager emails weren't landing the answer wasn't to send more. It was to open a second channel. I added a LinkedIn URL for every contact and a DM drafter built in the same voice and rules. Same person, same outreach, different door. The decision was never about one channel. It was about making sure every lead had at least one way in.",
    ],
    differentlyBullets: [
      "Two scrapers shipped without enrichment connected even though the function existed. Would map full dependency chain before writing first scraper.",
      "Built Google Jobs first by assumed volume. Would audit all five sources manually for three days first. Sequence by yield not assumption.",
      "Would verify Snov free-tier daily limit before designing the rotation.",
    ],
    metrics: [
      { type: 'VALIDATED', heading: 'PIPELINE SPEED', label: 'Time: trigger to delivery', dual: { beforeLabel: '120 min', beforePercent: 100, afterLabel: '15 min', afterPercent: 13 } },
      { type: 'VALIDATED', heading: 'DAILY ROLES FOUND', label: 'PM roles per run', value: '51', bar: { percent: 51 } },
      { type: 'VALIDATED', heading: 'CONTACT RESOLUTION', label: 'Roles with named email', value: '23 of 51', bar: { percent: 45 } },
      { type: 'VALIDATED', heading: 'DRAFTS READY', label: 'Outreach drafts per run', value: '15', bar: { percent: 30 } },
      { type: 'VALIDATED', heading: 'RUNNING COST', label: 'Monthly cost', value: '₹0', bar: { percent: 100 }, sub: 'Permanent not trial' },
      { type: 'VALIDATED', heading: 'ITERATIONS', label: 'Pipeline versions shipped', value: '8', sub: 'Across 4 months active use.' },
      { type: 'SELF TESTED', heading: 'COPY ITERATIONS', label: 'Email rewrites before lock', value: '7', sub: 'Frame that worked: builder who moves the needle' },
      { type: 'TARGET', heading: 'VALIDATION SIGNAL', label: 'Interview rate per 100 emails', value: 'Pending', bar: { percent: 0, dotted: true }, sub: 'Signal is first reply' },
    ],
    thinking: [
      ["More platforms delivering daily would create momentum. More sources, more options, constant progress.", "More platforms meant more accumulation. Jobs piled up unread and created anxiety, not action. Deduplication handled the overlap but the real fix was a sent and muted section. The dashboard now shows what needs attention, not everything ever scraped."],
      ["Full automation was the natural endpoint. And finding the email was enough to reach the right person.", "Emails going to real hiring managers without me reading them first is not efficiency. It is a fast way to make a bad impression at scale before any relationship exists. The human review gate stayed in on purpose. Not as a safety net. As a product decision about what trustworthy actually looks like. And when emails weren't landing the fix wasn't more volume. I added a LinkedIn URL and a DM drafter for the same contact. Same outreach, different channel, better odds."],
      ["Professional sounding email drafts were the right output.", "Professional sounds exactly like every other candidate in the inbox. Voice is not a tone instruction. It is a set of specific rules. I wrote my own draft first. Real sentences, real tone, real structure. Gave that to Claude to refine. That draft went into the system as the locked template. The only things that change per email are the company name and role. Everything else is already mine."],
      ["Building each piece well was enough.", "Two parts went live without the email finding step connected even though the step already existed. What it actually needed was for the whole chain from finding a job to having a sendable email to be confirmed end to end before anything got built. Pieces that work in isolation do not automatically connect."],
      ["When 51 jobs arrived in Telegram the hard part was over.", "51 unstructured job titles in a row with no contact info visible and no way to prioritise was not a product. It was a log file. I built the dashboard the next day because the delivery working and the experience working are two completely different things."],
    ],
    evolution: [
      { v: 'V1', text: 'Single forum scraper. No contacts. No delivery. Manual.' },
      { v: 'V2', text: 'Five sources. Email enrichment. Telegram at 8am.' },
      { v: 'V3', text: 'Dashboard built. 51 jobs in a chat is noise.' },
      { v: 'V4', text: 'Direct ATS scraper. Roles on day of posting.' },
      { v: 'V5', text: 'JSearch silent failure fixed. Instahyre with APM-specific queries.' },
      { v: 'V6', text: '13 emails sent blank portfolio link. 7 email rewrites. LinkedIn DM added.' },
      { v: 'V7', text: 'Railway expired. Render migration. IPv6 fix. Garbage email filter.' },
      { v: 'V8', text: 'Dashboard rebuilt. Clear action hierarchy. Bugs fixed.' },
    ],
  },
  {
    id: 1,
    tab: 'BOLNA STUDIO',
    heading: 'Bolna Studio',
    subheading: 'Activation Flow Redesign',
    tagline: "Bolna's revenue depends on one moment. A business owner successfully building their first voice agent. The path to that moment was taking 30 minutes and producing zero working demos. I went through their Studio as a user, diagnosed where the flow breaks and redesigned it. Separate paths for technical and non technical users, both reaching a working agent demo in under 15 minutes. I sent it to the founding team unsolicited.",
    metric: '30 min broken baseline. 15 min target hit with peers. 75% of Bolna revenue depends on this moment.',
    pmTags: ['ACTIVATION DESIGN', 'USER JOURNEY MAPPING', 'B2B PLG', 'PROBLEM DIAGNOSIS'],
    techTags: null,
    liveUrl: 'https://bol-na-funnel.vercel.app',
    problemStatement: "A business owner who signs up for Bolna wants one thing: an agent making calls for their business. The existing flow put raw engineering parameters — tts_provider, buffer_size, temperature — in front of someone who runs a clinic or a bakery. 30 minutes in with zero working demos, the product had asked for trust it had done nothing to earn.",
    pmSkills: ['Activation Design', 'PLG', 'User Journey Mapping', 'Scope Decision', 'PRD Writing', 'Hypothesis Testing'],
    techSkills: ['HTML', 'CSS', 'JavaScript', 'Web Speech API', 'Anthropic API', 'Vercel', 'Single Page Architecture'],
    constraintBullets: [
      "I built this as a single page with no backend. That meant two things from the PRD could not be built. The ability to pick up where you left off if you closed the browser and a nudge that fires based on how many days you have been using your free credit. Both need a server to track information over time. Both are named as limitations in the design document rather than quietly left out.",
      "I had no access to Bolna's actual activation data and no baseline to build from. So I designed the validation framework the same way I would for any real product. 50% conservative assumption when no baseline exists, 90% confidence level, 68 tester minimum before any result counts as signal. If Bolna ran this with real users they would know exactly how to measure whether it worked. That framework stays valid whether I run it or they do.",
      "Inbound calls turned out to need a completely separate setup process. Including them would have meant building two parallel journeys at once and solving two different problems at the same time. I kept the focus on outbound only because that is where the activation problem actually lives.",
    ],
    decisionBullets: [
      "Voice selection was halfway through setup in the original flow after several other fields. Voice is the first moment a business owner actually hears what they are building. Asking someone to configure settings for a product they have never heard speak is like asking someone to decorate a house they have never walked into. I moved voice to the very first step. Hear it before touching anything else.",
      "The first version had two separate modes. Simple for non technical users and advanced for people who want control. The problem is someone has to decide which type of person they are before they have seen anything. I replaced both with one single experience where every technical detail is hidden behind a small toggle on each field. The simple experience is the default. The depth is always one tap away.",
      "The original demo played through every scenario in a single run. If a business owner wanted to check one specific situation they had to sit through the whole thing to get there. I added individual play buttons to each scenario. Check any one by itself without running everything.",
      "The sidebar had eight tabs matching Bolna's existing product structure. That makes sense for someone who already knows the product and needs to jump between sections. It makes no sense for someone doing this for the first time. I replaced it with a single scrollable room where everything happens in order. Advanced features are still there. Just never in the way.",
    ],
    differentlyBullets: [
      "Dual-trigger credit nudge architecturally missing because static file constraint caught too late. Would map every PRD feature against architecture before writing requirements.",
      "No distribution plan before building. Would define channel and cohort before locking sample size.",
      "Assumed loading spinner was known bug. Would replicate across three browsers and document before scoping redesign.",
    ],
    metrics: [
      { type: 'VALIDATED', heading: 'BASELINE', label: 'Existing flow completion time', value: '30+ min', bar: { percent: 100, fillColor: '#E63946' }, sub: 'Zero working demos produced' },
      { type: 'VALIDATED', heading: 'ITERATIONS', label: 'Prototype versions', value: '4', sub: 'Built and iterated.' },
      { type: 'TARGET', heading: 'PRIMARY KR', label: 'Cohort reaching first live call', value: '90%', bar: { percent: 0, dotted: true }, sub: 'Target: under 15 min unassisted.' },
      { type: 'TARGET', heading: 'SAMPLE SIZE', label: 'Tester minimum', value: '68', sub: 'p=0.5 · 90% confidence · ±10pp margin' },
      { type: 'PEER TESTED', heading: 'QUALITATIVE', label: 'Non-technical reviewer result', quote: 'Completed voice and behavior sections without a single clarifying question. Technical detail toggle never opened.' },
    ],
    thinking: [
      ["A sidebar with eight tabs matching Bolna's structure was the responsible choice.", "A business owner doing this for the first time does not need eight tabs. They need to do one thing. Everything else is a distraction. Replacing the sidebar with a single room where everything happens in sequence was not a simplification. It was the actual solution to the actual problem."],
      ["Voice selection belonged inside the audio settings section.", "Hearing your agent speak for the first time is not a configuration step. It is the moment the product becomes real. Putting that moment halfway through technical fields asks someone to care about settings for something they have not yet felt. Trust starts the moment something works not the moment setup is complete."],
      ["The safety net question was optional for users whose goals matched existing templates.", "Those users never made an explicit decision about what their agent does when it cannot answer something. Their agent went into the demo carrying an implicit assumption nobody had chosen. Making it required meant the demo could show that decision working in real time rather than just showing the happy path."],
      ["Lifecycle emails were a responsible thing to include because re engagement is a real growth problem.", "Those emails would be sent to people who never made it to their first call. Trying to bring someone back when they were never fully there is solving a downstream symptom. Fix the activation problem first. The retention problem changes when the activation problem is solved."],
      ["Two separate modes, one simple and one advanced, was the right way to serve two different types of users.", "Asking someone to decide which type of user they are before they have seen anything is asking them to self diagnose without information. Nobody knows if they need advanced controls until they have seen what the simple experience cannot do. One unified experience with technical depth hidden behind a toggle on each field means the default is always approachable and the depth is always one tap away without forcing a decision upfront that the user is not ready to make."],
    ],
    evolution: [
      { v: 'V1', text: 'Single HTML. Static sliders. Flat hamburger.' },
      { v: 'V2', text: 'Full rebuild. Dynamic content. AI chat. Live values. Demo pause.' },
      { v: 'V3', text: 'Section sidebar replaced with journey tracker.' },
      { v: 'V4', text: 'Ring animation on every play button. Pauses red. Resumes teal.' },
    ],
  },
  {
    id: 2,
    tab: 'REACHMAP',
    heading: 'ReachMap',
    subheading: 'Emerging Roles Reachability Tool',
    tagline: "Freshers were applying blind. Skipping roles they could reach and chasing ones they couldn't. No structured way to check fit existed. I built one. A scoring system across 18 emerging roles that maps any fresher's background to what is actually reachable and shows exactly what gap stands between them and each role. No login. No CV. A 4 question form and a result that means something. I set the KR before writing a single line of code. I needed 62 testers for the result to mean anything. I hit 35% in two weeks.",
    metric: '35% KR hit. 62 tester minimum crossed. Hypothesis confirmed. Live KPIs tracked in real time.',
    pmTags: ['PROBLEM DISCOVERY', 'HYPOTHESIS TESTING', '0 TO 1 EXECUTION', 'KR DRIVEN SHIPPING'],
    techTags: null,
    liveUrl: 'https://rolereachability-tool.vercel.app',
    problemStatement: "A fresher sees an unfamiliar job title and scrolls past. Not because they can't do the role. Because they have no way to check whether they can. The only tool available is instinct. And instinct is wrong in both directions — missing roles that are reachable and chasing roles that are not.",
    pmSkills: ['Hypothesis Framing', 'Scoring Architecture', 'KR Methodology', 'Edge Case Design', 'Experiment Design'],
    techSkills: ['React', 'Vite', 'Upstash Redis', 'Claude API', 'Vercel Serverless', 'Statistical Methodology'],
    constraintBullets: [
      "The product had no login by design. Not because login was considered and rejected but because the only thing that mattered was getting a fresher to their result as fast as possible. No friction between them and the answer. The constraint that showed up later was that every visit from a different device counted as a new person. The same fresher on their phone and laptop looked like two different testers. That breaks the denominator. I switched to persistent IDs tied to the browser so the same person always counts as one.",
      "If the scoring engine depended on AI there would be moments where the score simply did not arrive. A blank screen at the exact moment someone is deciding whether the tool is worth their time breaks the only trust moment that matters. The scoring runs on pure math instead. Instant. Never fails. AI only comes in after the score is already there.",
      "No existing data existed on what percentage of freshers would look at a structured gap analysis and say yes this role is actually reachable for me. The 35% target was set as an educated starting point. The 62 tester minimum exists because without enough people trying the tool any percentage shown is just noise.",
    ],
    decisionBullets: [
      "A simple score out of 100 tells you how much you bring to a role. It does not tell you whether you are actually reachable for it. I built four gates instead. Skill match determines the foundation. Background decides whether you land in Medium or High. Strong real work experience can push you up one level. Weak English on a role that requires communication caps you at Medium regardless of everything else. The tier comes from logic not just a number.",
      "Some testers do not have a Claude account and cannot access the AI explanation. A blank card where the explanation should be is the worst possible outcome at the moment someone is deciding if this is useful. I built a fallback that generates a real explanation from the actual skills that matched and the ones that are missing. Labeled honestly as rule based. The full experience works without any account at all.",
      "Once you fill the form and mark a role as reachable that snapshot is saved with the exact background you had at that moment. If you come back later with new skills and mark the same role again both marks stay. The first shows what was reachable then. The second shows what is reachable now. The history of how you grew is preserved, not overwritten. The tier filter works the same way. Single select only. One tier at a time.",
    ],
    differentlyBullets: [
      "Experience fit is flat bucket count. Would run five structured interviews before locking weights. Interview first. Score after.",
      "35% target set without pressure testing alternatives. Would test against 25% and 45% — what decision does each number trigger? That question should be answered before locking the KR.",
      "Original hypothesis drove two weeks of design before it was proven wrong. Would stress-test any hypothesis with five user conversations before building.",
    ],
    metrics: [
      { type: 'VALIDATED', heading: 'PRIMARY KR', label: 'Testers marking ≥1 role reachable', value: '35%', bar: { percent: 35 }, sub: 'Hit within 2 weeks of launch' },
      { type: 'VALIDATED', heading: 'SAMPLE VALIDITY', label: 'Tester minimum crossed', value: '62', sub: 'Statistically valid signal' },
      { type: 'VALIDATED', heading: 'ITERATIONS', label: 'PRD versions', value: '8', sub: 'Problem reframe to deployment' },
      { type: 'VALIDATED', heading: 'FALLBACK COVERAGE', label: 'Testers served without account', value: '100%', bar: { percent: 100 } },
      { type: 'EARLY SIGNAL', heading: 'KR TREND', label: 'KR above threshold', value: '35%+', bar: { percent: 35 }, sub: 'Consistent across pooled sessions' },
      { type: 'QUALITATIVE', heading: 'USER REACTION', quote: 'Testers messaged saying a role they assumed was out of reach was one skill away. Hypothesis validating in plain language not in a number.' },
      { type: 'QUALITATIVE', heading: 'BUILD INSIGHT', quote: 'Original hypothesis wrong after 2 weeks of design. Real problem surfaced through the build itself. Not before it.' },
    ],
    thinking: [
      ["Freshers skip roles because the titles look unfamiliar or intimidating.", "I spent two weeks designing around that idea. The title has nothing to do with it. The real block was having no way to check whether their background actually bridges to what the JD needs. When that became clear the KR changed, the scoring logic changed, the UX changed and the success criteria changed. Everything built up to that point got rebuilt around the correct problem."],
      ["AI scoring was the obvious choice because smarter output is better output.", "I thought about what happens when it fails. A fresher lands on the results page and sees a blank card where their explanation should be. That is the exact moment they are deciding whether this tool is worth anything. I rebuilt the scoring on pure math that runs instantly and never fails. The AI comes in quietly after the score is already there."],
      ["Saving marks by role ID was sufficient.", "Two separate questionnaire attempts represent two different versions of the same person at two different moments. The first mark captured what was reachable before they added a new skill. The second captured what became reachable after. Overwriting the first erases evidence of how they changed. I changed the system to keep both marks completely separate with their own frozen scores."],
      ["The dashboard reading from local storage was measuring the product.", "It was only counting sessions from that one device. A metric that only measures itself is not useful. The whole point is to see how the product is actually performing across all the people who tried it. I switched to shared storage so every tester's data pooled into one real number regardless of which device they used."],
      ["Mapping the entire emerging role market was necessary before building anything.", "18 roles was enough to prove the hypothesis. The scoring logic, the gap analysis, the KR validation. All of it works on 18 roles exactly the same way it would on 180. The MVP did not need the full market. It needed enough roles to show the system works. Hypothesis confirmed first. Scale comes after."],
    ],
    evolution: [
      { v: 'V1', text: 'Wrong hypothesis. Freshers skip fancy titles. Wrong.' },
      { v: 'V2', text: 'Problem reframed. AI scoring dropped. Pure math. KR locked.' },
      { v: 'V3', text: 'Weights locked. Tier logic. Communication cap.' },
      { v: 'V4', text: 'Composite mark key. Dark redesign.' },
      { v: 'V5', text: 'Shared storage. Dashboard pooled across devices.' },
      { v: 'V6', text: 'Shareable cut. Single-select filter locked.' },
      { v: 'V7', text: 'Rule-based fallback. 100% coverage.' },
      { v: 'V8', text: 'Vercel. Serverless API. Fully owned.' },
    ],
  },
];

const GO_DEEPER = [
  {
    title: 'ROLEREACH',
    links: [
      { label: 'PM Thinking Doc', url: 'https://docs.google.com/document/d/1okSpT6R14QdzQUyEci-MmYI1eIAsFU4L/edit?usp=sharing' },
      { label: 'PRD', url: 'https://docs.google.com/document/d/1yg28tEFtGrw7cOWOK7IZLM0IbofKiBwe/edit?usp=sharing' },
      { label: 'GitHub', url: 'https://github.com/kritipm/rolereach' },
    ],
  },
  {
    title: 'BOLNA STUDIO',
    links: [
      { label: 'PM Thinking Doc', url: 'https://docs.google.com/document/d/175Gg6ROjYAJnLLMb8vGeLbmPll0pm2jH/edit?usp=sharing' },
      { label: 'PRD', url: 'https://docs.google.com/document/d/1g5iMeoSJIZvLnLncvMU8Zt36Gaaa4VaW/edit?usp=sharing' },
      { label: 'GitHub', url: 'https://github.com/kritipm/bol-na-funnel' },
    ],
  },
  {
    title: 'REACHMAP',
    links: [
      { label: 'PM Thinking Doc', url: 'https://docs.google.com/document/d/1XwsyDVu_BAi3JwBOko6F2MZzHefdx0wW/edit?usp=sharing' },
      { label: 'PRD', url: 'https://docs.google.com/document/d/1hYSuz0BpBrHkDrwzwLmjPOAihtV731er/edit?usp=sharing' },
      { label: 'GitHub', url: 'https://github.com/kritipm/rolereachability-tool' },
    ],
  },
];

function ChipRow({ label, chips }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontFamily: jb, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#444444', marginBottom: 12 }}>
        {label}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {chips.map(c => (
          <span key={c} style={{ fontFamily: jb, fontSize: 11, color: '#888888', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 999, padding: '4px 12px' }}>
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

function Bar({ percent, color, dotted }) {
  return (
    <div style={{ width: '100%', height: 4, borderRadius: 2, overflow: 'hidden', background: dotted ? 'transparent' : 'rgba(255,255,255,0.06)', border: dotted ? '1px dashed rgba(255,255,255,0.25)' : 'none' }}>
      {!dotted && <div style={{ width: percent + '%', height: '100%', borderRadius: 2, background: color }} />}
    </div>
  );
}

function MetricCard({ m }) {
  const color = METRIC_COLORS[m.type];
  return (
    <div style={{ background: C.card, borderLeft: '3px solid ' + color, padding: '16px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: m.label ? 6 : 14 }}>
        <span style={{ fontFamily: jb, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color }}>
          {m.heading}
        </span>
        <span style={{ fontFamily: jb, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color, border: '1px solid ' + color, borderRadius: 999, padding: '2px 8px', whiteSpace: 'nowrap', flexShrink: 0 }}>
          {m.type}
        </span>
      </div>

      {m.label && (
        <p style={{ fontFamily: jb, fontSize: 12, color: C.textSecond, marginBottom: m.quote ? 0 : 12 }}>
          {m.label}
        </p>
      )}

      {m.quote ? (
        <p style={{ fontFamily: sg, fontSize: 14, color: C.textSecond, lineHeight: 1.75, marginTop: m.label ? 12 : 0 }}>
          {m.quote}
        </p>
      ) : m.dual ? (
        <>
          <p style={{ fontFamily: jb, fontSize: 24, fontWeight: 700, color: C.textPrimary, marginBottom: 14 }}>
            {m.dual.beforeLabel} <span style={{ color: C.textMuted, fontWeight: 400 }}>→</span> {m.dual.afterLabel}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div>
              <p style={{ fontFamily: jb, fontSize: 9, color: '#555555', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Before</p>
              <Bar percent={m.dual.beforePercent} color="#555555" />
            </div>
            <div>
              <p style={{ fontFamily: jb, fontSize: 9, color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>After</p>
              <Bar percent={m.dual.afterPercent} color={color} />
            </div>
          </div>
        </>
      ) : (
        <>
          <p style={{ fontFamily: jb, fontSize: 24, fontWeight: 700, color: C.textPrimary, marginBottom: m.bar ? 10 : 0 }}>
            {m.value}
          </p>
          {m.bar && <Bar percent={m.bar.percent} color={m.bar.fillColor || color} dotted={m.bar.dotted} />}
        </>
      )}

      {m.sub && (
        <p style={{ marginTop: 10, fontFamily: sg, fontSize: 13, color: C.textMuted, lineHeight: 1.6 }}>
          {m.sub}
        </p>
      )}
    </div>
  );
}

function EvolutionToggle({ items }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: 40 }}>
      <button onClick={() => setOpen(o => !o)} className="h-evolve"
        style={{ fontFamily: jb, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#444444', background: 'transparent', border: 'none', padding: 0, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        08  How this evolved
        <span style={{ display: 'inline-block', transition: 'transform .2s ease', transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}>→</span>
      </button>

      {open && (
        <div style={{ marginTop: 28, position: 'relative', paddingLeft: 28 }}>
          <div style={{ position: 'absolute', left: 4, top: 6, bottom: 6, width: 1, background: 'rgba(255,255,255,0.12)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {items.map((it, i) => (
              <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', position: 'relative' }}>
                <div style={{ position: 'absolute', left: -28, top: 6, width: 7, height: 7, borderRadius: '50%', background: C.accent }} />
                <span style={{ fontFamily: jb, fontSize: 12, fontWeight: 700, color: C.accent, minWidth: 32, flexShrink: 0 }}>
                  {it.v}
                </span>
                <p style={{ fontFamily: sg, fontSize: 14, color: '#888888', lineHeight: 1.7 }}>
                  {it.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectPanel({ project, expanded, onToggle }) {
  const bd = '1px solid ' + C.border;
  return (
    <div style={{ paddingTop: 64 }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 32, flexWrap: 'wrap', marginBottom: 28 }}>
        <div style={{ flex: 1, minWidth: 260 }}>
          <h2 style={{ fontFamily: sg, fontWeight: 700, fontSize: 'clamp(26px,3.5vw,44px)', color: C.textPrimary, lineHeight: 1.1, marginBottom: 8 }}>
            {project.heading}
          </h2>
          <p style={{ fontFamily: jb, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.accent, marginBottom: 16 }}>
            {project.subheading}
          </p>
          <p style={{ fontFamily: sg, fontSize: 17, color: C.textSecond, lineHeight: 1.8, maxWidth: 620, marginBottom: 18 }}>
            {project.tagline}
          </p>
          <p style={{ fontFamily: jb, fontSize: 14, color: '#FF2535', lineHeight: 1.65, marginBottom: 20, fontWeight: 700, letterSpacing: '0.02em' }}>
            {project.metric}
          </p>
          <div style={{ marginBottom: 0 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: project.techTags ? 8 : 0 }}>
              {project.pmTags.map(t => (
                <span key={t} style={{ fontFamily: jb, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.textSecond, border: bd, padding: '4px 10px' }}>{t}</span>
              ))}
            </div>
            {project.techTags && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {project.techTags.map(t => (
                  <span key={t} style={{ fontFamily: jb, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.textMuted, border: '1px solid rgba(255,255,255,0.06)', padding: '4px 10px' }}>{t}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="h-live"
          style={{ fontFamily: jb, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '16px 28px', background: C.accent, color: C.textPrimary, border: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', flexShrink: 0, fontWeight: 700 }}>
          SEE LIVE PRODUCT
        </a>
      </div>

      <button onClick={onToggle} className="h-log"
        style={{ fontFamily: jb, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '13px 22px', background: 'transparent', color: C.textSecond, border: bd, display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: expanded ? 40 : 0 }}>
        {expanded ? 'COLLAPSE DECISION LOG' : 'READ THE DECISION LOG'}
      </button>

      {expanded && (
        <div>

          {/* 01. PROBLEM STATEMENT */}
          <div style={{ background: SECTION_STYLES[0].bg, borderLeft: '3px solid ' + SECTION_STYLES[0].border, padding: '24px 28px', marginBottom: 32 }}>
            <p style={{ fontFamily: jb, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: SECTION_STYLES[0].border, marginBottom: 20 }}>
              PROBLEM STATEMENT
            </p>
            <p style={{ fontFamily: sg, fontSize: 15, color: C.textSecond, lineHeight: 1.85, paddingLeft: 16, borderLeft: '1px solid rgba(255,255,255,0.12)' }}>
              {project.problemStatement}
            </p>
          </div>

          {/* 02 & 03. PM SKILLS / TECHNICAL SKILLS */}
          <ChipRow label="PM SKILLS" chips={project.pmSkills} />
          <ChipRow label="TECHNICAL EXECUTION" chips={project.techSkills} />

          {/* 04. THE CONSTRAINT */}
          <div style={{ background: SECTION_STYLES[1].bg, borderLeft: '3px solid ' + SECTION_STYLES[1].border, padding: '24px 28px', marginBottom: 6 }}>
            <p style={{ fontFamily: jb, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: SECTION_STYLES[1].border, marginBottom: 20 }}>
              THE CONSTRAINT
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {project.constraintBullets.map((b, i) => (
                <p key={i} style={{ fontFamily: sg, fontSize: 15, color: C.textSecond, lineHeight: 1.85, paddingLeft: 16, borderLeft: '1px solid rgba(255,255,255,0.12)' }}>{b}</p>
              ))}
            </div>
          </div>

          {/* 05. THE DECISION */}
          <div style={{ background: SECTION_STYLES[2].bg, borderLeft: '3px solid ' + SECTION_STYLES[2].border, padding: '24px 28px', marginTop: 6, marginBottom: 40 }}>
            <p style={{ fontFamily: jb, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: SECTION_STYLES[2].border, marginBottom: 20 }}>
              THE DECISION
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {project.decisionBullets.map((b, i) => (
                <p key={i} style={{ fontFamily: sg, fontSize: 15, color: C.textSecond, lineHeight: 1.85, paddingLeft: 16, borderLeft: '1px solid rgba(255,255,255,0.12)' }}>{b}</p>
              ))}
            </div>
          </div>

          {/* 05. WHAT I'D DO DIFFERENTLY */}
          <div style={{ background: SECTION_STYLES[3].bg, borderLeft: '3px solid ' + SECTION_STYLES[3].border, padding: '24px 28px', marginBottom: 40 }}>
            <p style={{ fontFamily: jb, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: SECTION_STYLES[3].border, marginBottom: 20 }}>
              05  WHAT I'D DO DIFFERENTLY
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {project.differentlyBullets.map((b, i) => (
                <p key={i} style={{ fontFamily: sg, fontSize: 15, color: C.textSecond, lineHeight: 1.85, paddingLeft: 16, borderLeft: '1px solid rgba(255,255,255,0.12)' }}>{b}</p>
              ))}
            </div>
          </div>

          {/* 06. IMPACT METRICS */}
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontFamily: jb, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.textSecond, marginBottom: 20 }}>
              06  IMPACT METRICS
            </p>
            <div className="metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
              {project.metrics.map((m, i) => (
                <MetricCard key={i} m={m} />
              ))}
            </div>
          </div>

          {/* 07. THINKING BEHIND IT */}
          <div style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.12)', padding: 36, marginBottom: 0 }}>
            <p style={{ fontFamily: jb, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.textPrimary, marginBottom: 32, fontWeight: 700 }}>
              07  THINKING BEHIND IT
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {project.thinking.map(([assumption, reality], i) => (
                <div key={i} style={{ paddingBottom: 28, marginBottom: 28, borderBottom: i < project.thinking.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                  <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 12 }}>
                    <span style={{ fontFamily: jb, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#AAAAAA', minWidth: 68, paddingTop: 4, flexShrink: 0 }}>ASSUMED</span>
                    <p style={{ fontFamily: sg, fontSize: 15, color: '#AAAAAA', lineHeight: 1.8 }}>{assumption}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: jb, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.accent, minWidth: 68, paddingTop: 4, flexShrink: 0, fontWeight: 700 }}>ACTUAL</span>
                    <p style={{ fontFamily: sg, fontSize: 15, color: '#FFFFFF', lineHeight: 1.8, fontWeight: 500 }}>{reality}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 08. HOW THIS EVOLVED */}
            <EvolutionToggle items={project.evolution} />
          </div>

          <div style={{ marginTop: 36 }}>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="h-live"
              style={{ fontFamily: jb, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '16px 36px', background: C.accent, color: C.textPrimary, border: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700 }}>
              SEE IT LIVE
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [expanded, setExpanded] = useState({ 0: false, 1: false, 2: false });

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  const gutter = 'max(24px, calc((100vw - 960px) / 2))';
  const bd = '1px solid ' + C.border;

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>

      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px ' + gutter }}>
        <div style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: sg, fontWeight: 700, fontSize: 18, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.textPrimary, marginBottom: 8 }}>
            KRITI KUMARI
          </p>
          <p style={{ fontFamily: jb, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.accent }}>
            PRODUCT MANAGER
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
          <div className="psi-grid-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {['PROBLEM', 'WHAT I DID', 'IMPACT'].map(h => (
              <p key={h} style={{ fontFamily: jb, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#444444' }}>
                {h}
              </p>
            ))}
          </div>

          {HERO_GRID.map((row, i) => (
            <div key={i} className="psi-grid-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
              <div style={{ background: C.surface, padding: '20px 22px' }}>
                <p style={{ fontFamily: sg, fontSize: 15, color: '#888888', lineHeight: 1.65 }}>{row.problem}</p>
              </div>
              <div style={{ background: C.surface, padding: '20px 22px' }}>
                <p style={{ fontFamily: sg, fontSize: 15, color: '#F5F5F5', lineHeight: 1.65 }}>{row.whatIDid}</p>
              </div>
              <div style={{ background: C.surface, padding: '20px 22px' }}>
                <p style={{ fontFamily: sg, fontWeight: 700, fontSize: 15, color: '#E63946', lineHeight: 1.65 }}>{row.impact}</p>
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: sg, fontWeight: 400, fontSize: 16, color: '#888888', lineHeight: 1.6, textAlign: 'center', maxWidth: 640, margin: '0 auto 56px' }}>
          Not a builder who thinks about product.<br />A PM who ships to prove the thinking.
        </p>

        <div className="hero-ctas" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <button onClick={() => document.getElementById('projects-tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="h-primary"
            style={{ fontFamily: sg, fontWeight: 700, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '16px 32px', background: C.textPrimary, color: C.bg, border: 'none' }}>
            SEE MY WORK
          </button>
          <a
            href="https://docs.google.com/document/d/1AQNiKSa-3V8_QLb6py7CEst0_oYjadoq/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="h-ghost"
            style={{ fontFamily: sg, fontWeight: 700, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '16px 32px', background: 'transparent', color: C.textPrimary, border: '1px solid ' + C.textPrimary, display: 'inline-flex', alignItems: 'center' }}
          >
            READ CV
          </a>
        </div>
      </section>

      <div id="projects-tabs">
        <div className="tabs-container" style={{ position: 'sticky', top: 0, zIndex: 100, background: C.surface, borderBottom: bd, display: 'flex', overflowX: 'auto' }}>
          {PROJECTS.map((p, i) => (
            <button key={p.id} onClick={() => setActiveTab(i)} className="h-tab"
              style={{ fontFamily: jb, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '20px 32px', background: 'transparent', border: 'none', borderBottom: activeTab === i ? '2px solid ' + C.accent : '2px solid transparent', marginBottom: -1, color: activeTab === i ? C.textPrimary : C.textMuted, fontWeight: activeTab === i ? 700 : 400, display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap', flexShrink: 0 }}>
              {activeTab === i && (
                <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: C.green, flexShrink: 0 }} />
              )}
              {p.tab}
            </button>
          ))}
        </div>

        <div style={{ padding: '0 ' + gutter + ' 96px' }}>
          {PROJECTS.map((p, i) =>
            activeTab === i ? (
              <ProjectPanel key={p.id} project={p} expanded={expanded[i]} onToggle={() => setExpanded(prev => ({ ...prev, [i]: !prev[i] }))} />
            ) : null
          )}
        </div>
      </div>

      <section style={{ padding: '80px ' + gutter, borderTop: bd }}>
        <p style={{ fontFamily: jb, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.textSecond, marginBottom: 40 }}>
          GO DEEPER
        </p>
        <div className="go-deeper-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {GO_DEEPER.map(card => (
            <div key={card.title} style={{ background: '#111111', border: bd, padding: 28 }}>
              <p style={{ fontFamily: jb, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.textSecond, marginBottom: 22, lineHeight: 1.65 }}>
                {card.title}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {card.links.map(lk => (
                  lk.url ? (
                    <a key={lk.label} href={lk.url} target="_blank" rel="noopener noreferrer" className="h-link"
                      style={{ fontFamily: sg, fontSize: 15, color: C.textPrimary, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ color: C.accent, flexShrink: 0, fontSize: 18 }}>+</span>
                      {lk.label}
                    </a>
                  ) : (
                    <div key={lk.label} style={{ fontFamily: sg, fontSize: 15, color: C.textMuted, display: 'flex', alignItems: 'center', gap: 10, cursor: 'default' }}>
                      <span style={{ color: C.textMuted, flexShrink: 0, fontSize: 18 }}>+</span>
                      {lk.label}
                    </div>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '80px ' + gutter, borderTop: bd }}>
        <p style={{ fontFamily: jb, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.textSecond, marginBottom: 40 }}>
          GET IN TOUCH
        </p>
        <div className="contact-items" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {[
            { label: 'Phone', href: 'tel:+916201890335', text: '+91 6201890335', ext: false },
            { label: 'Email', href: 'mailto:kritipm62@gmail.com', text: 'kritipm62@gmail.com', ext: false },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kritiux', text: 'linkedin.com/in/kritiux', ext: true },
          ].map(item => (
            <a key={item.label} href={item.href}
              {...(item.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="h-link"
              style={{ fontFamily: sg, fontSize: 17, color: C.textPrimary, display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontFamily: jb, fontSize: 11, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', minWidth: 88 }}>
                {item.label}
              </span>
              {item.text}
            </a>
          ))}
        </div>
      </section>

      <footer style={{ padding: '24px ' + gutter, borderTop: bd }}>
        <p style={{ fontFamily: jb, fontSize: 11, color: C.textMuted, letterSpacing: '0.08em' }}>
          Last updated — Portfolio August 2026.
        </p>
      </footer>

    </div>
  );
}
