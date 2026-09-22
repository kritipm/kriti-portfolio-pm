// v12
import { useState, useEffect } from 'react';

// ─── DESIGN SYSTEM ─────────────────────────────────────────────────────────────
// 3 colors. No exceptions.

const C = {
  bg:      '#000000',
  surface: '#0A0A0A',
  card:    '#111111',
  accent:  '#E63946',
  white:   '#FFFFFF',
  bright:  '#F0F0F0',
  mid:     '#C8C8C8',
  border:  'rgba(255,255,255,0.08)',
};

const sat   = "'Satoshi', sans-serif";
const inter = "'Inter', sans-serif";
const jb    = "'JetBrains Mono', monospace";

const GLOBAL_CSS = [
  "@import url('https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap');",
  "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');",
  '*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}',
  'html{scroll-behavior:smooth;}',
  "body{background:#000000;color:#F0F0F0;font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden;}",
  '::-webkit-scrollbar{width:4px;}',
  '::-webkit-scrollbar-track{background:#000000;}',
  '::-webkit-scrollbar-thumb{background:#2A2A2A;border-radius:2px;}',
  '@keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.35;transform:scale(.7);}}',
  '@keyframes scrollCarousel{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}',
  '.pulse-dot{animation:pulse 1.6s ease-in-out infinite;}',
  '.carousel-track{display:flex;gap:20px;animation:scrollCarousel 50s linear infinite;width:max-content;}',
  '.carousel-wrap:hover .carousel-track{animation-play-state:paused;}',
  '.hp{cursor:pointer;transition:background .2s,color .2s;}',
  '.hp:hover{background:#E63946 !important;color:#FFFFFF !important;}',
  '.hg{cursor:pointer;transition:border-color .2s,color .2s,background .2s;text-decoration:none;}',
  '.hg:hover{background:#E63946 !important;border-color:#E63946 !important;color:#FFFFFF !important;}',
  '.hl{transition:opacity .2s;text-decoration:none;}',
  '.hl:hover{opacity:0.75 !important;}',
  '.htab{cursor:pointer;transition:color .15s;}',
  '.htab:hover{color:#FFFFFF !important;}',
  '.hlink{transition:color .2s;text-decoration:none;}',
  '.hlink:hover{color:#E63946 !important;}',
  '.hcard-tab{cursor:pointer;transition:background .15s,color .15s;}',
  '.hcard-tab:hover{color:#FFFFFF !important;background:rgba(230,57,70,0.12) !important;}',
  '@media(max-width:768px){',
  '  body,html{overflow-x:hidden;max-width:100vw;}',
  '  .tabs-bar{overflow-x:auto !important;-webkit-overflow-scrolling:touch;scrollbar-width:none;}',
  '  .tabs-bar::-webkit-scrollbar{display:none;}',
  '  .skills-grid{grid-template-columns:1fr !important;}',
  '  .metrics-grid{grid-template-columns:1fr !important;}',
  '  .hero-ctas{flex-direction:column !important;width:100%;}',
  '  .hero-ctas button,.hero-ctas a{width:100%;text-align:center;justify-content:center;}',
  '}',
].join('\n');

// ─── HELPERS ───────────────────────────────────────────────────────────────────

const clean = s => s ? s.replace(/\s—\s/g, '. ').replace(/—/g, '. ') : s;
const metricLine = s => s ? s.replace(/\s·\s/g, '  /  ') : s;

// ─── DATA ──────────────────────────────────────────────────────────────────────

const HERO = [
  {
    line1: "Most job seekers spend 3+ hours sourcing across 5+ platforms, and the cognitive load and frustration that builds doesn't just drain them — it kills the consistency and the volume of applications needed to actually move.",
    line2: "RoleReach is an AI agentic pipeline that scrapes 5+ job platforms, finds contacts, and drafts outreach in your own tone.",
    line3: "51 PM roles. 8 AM. Every morning. The daily hustle, automated.",
  },
  {
    line1: "Non-technical business owners were dropping Bolna's activation journey because they were setting up an AI voice agent blind — no working demo, no live preview — and 75% of Bolna's revenue depends on them completing it.",
    line2: "Redesigned the entire flow as one single journey serving three types of users — non-technical, partially technical, and fully technical — with live previews, real demonstrations at every step, and trust built from the homepage to the last step.",
    line3: "From setup to live demo in 15 to 30 minutes, on their own. No engineering ticket. No support call.",
  },
  {
    line1: "Freshers stuck in career limbo and the noise of what might be possible — master's, extra courses, extra degrees — spending months on options that might not be needed, while new emerging roles they could actually reach keep arriving every month.",
    line2: "ReachMap maps them — one small form, and it shows every emerging role within reach, what's not, the exact gaps, saved matches across backgrounds, and every direction your current profile can actually go.",
    line3: "35% of testers found a reachable emerging role they had been missing. One form. Full map. No guesswork.",
  },
];

const PROJECTS = [
  {
    id: 0,
    tab: 'ROLEREACH',
    heading: 'RoleReach',
    subheading: 'Full Stack Agentic System · Live in Production',
    tagline: 'PM job search was manual, scattered, and generic. I built end-to-end infrastructure that scrapes daily, resolves hiring manager contacts, drafts outreach in my voice, and delivers to Telegram every morning at 8AM. One step stays human. The final send is always my call.',
    metric: '51 roles daily · 125 in pipeline · Named email on 33 leads · ₹0 monthly cost',
    pmTags: ['SYSTEMS THINKING','ITERATIVE SHIPPING','HUMAN IN THE LOOP DESIGN','AGENTIC PRODUCT DESIGN'],
    liveUrl: 'https://rolereach.onrender.com',
    skillSections: [
      { label: 'PM', chips: ['Problem Framing','Systems Thinking','Metrics Design','Prioritisation','Human-in-Loop Design','Iteration'] },
      { label: 'TECHNICAL', chips: ['Python','Supabase','GitHub Actions','Railway to Render','Claude API','Telegram Bot','Flask'] },
    ],
    problemStatement: 'A PM entering the market without a network has one lever: outreach volume. When building that volume manually takes two hours every morning, most of that time gets spent finding who to email, not actually emailing anyone. The pipeline dries up not because the opportunities do not exist but because the process of finding them is consuming the energy needed to pursue them.',
    cards: [
      {
        title: 'THE GAP',
        bullets: [
          'Every existing tool that solved any part of this cost money. Zero budget meant building the entire chain — scraping, enrichment, drafting, delivery — from scratch, for free, permanently.',
          'The stakes were real from day one. Every broken run was not a bug to fix later. It was a real opportunity gone. That accountability is completely different from breaking something in a practice exercise.',
          'Finding the role and finding the person behind it are two separate problems. No existing platform solved both. Scraping job posts was step one. Email enrichment was a completely separate build on top, connected only through job title and company name.',
        ],
      },
      {
        title: 'THE CONSTRAINT',
        bullets: [
          'A system that wakes up at 8AM, does 15 minutes of work, then switches off — without paying to sit idle all day. GitHub Actions solved it. It costs nothing between runs.',
          'Finding the email was necessary but not sufficient. When emails were not landing the answer was not to send more. It was to open a second channel — LinkedIn URL plus a DM drafter in the same voice.',
          'The outreach had to sound like one specific person, not a rewrite of a template. Passing a tone instruction to Claude produced generic output. Writing my own email first and using that as the locked base was the only way the voice constraint became solvable.',
        ],
      },
      {
        title: 'TRADE-OFFS',
        bullets: [
          'A spreadsheet waits for me to do all the work first. I built a system that finds the jobs, finds the contact, writes the email, and delivers it. The spreadsheet was never the right tool.',
          'The first version delivered everything as a wall of text in Telegram. 51 job titles with no contact info visible and no way to prioritise is a log file, not a product. I built the dashboard the next day.',
          'Voice is not a tone instruction. I wrote my own draft first — real sentences, real tone — and gave it to Claude to refine. That draft became the locked template. Only the company name and role change per email.',
        ],
      },
      {
        title: "WHAT I'D DO DIFFERENTLY",
        bullets: [
          'Two scrapers shipped without enrichment connected even though the function existed. Would map the full dependency chain before writing the first scraper.',
          'Built Google Jobs first by assumed volume. Would audit all five sources manually for three days first. Sequence by yield, not assumption.',
          'Would verify Snov free-tier daily limit before designing the rotation.',
        ],
      },
    ],
    quantMetrics: [
      { heading: 'PIPELINE SPEED',     label: 'Time: trigger to delivery',           type: 'REAL_USER',
        before: '120 min', value: '15 min', change: '↓ 87.5%', beforeBar: 100, bar: 13,
        calc: 'Manual: role sourcing (30) + contact search (45) + draft writing (25) + formatting (20) = 120 min. System: GitHub Actions trigger to Telegram delivery, timed across 14 consecutive morning runs.' },
      { heading: 'DAILY ROLES',        label: 'PM roles per run, every morning',      type: 'REAL_USER',
        before: '~5 manual', value: '51', change: '↑ 920%', beforeBar: 10, bar: 100,
        calc: '5 sources: LinkedIn, Naukri, Instahyre, Wellfound, direct ATS. De-duplicated and PM-role filtered before delivery.' },
      { heading: 'RUNNING COST',       label: 'Monthly infrastructure cost',          type: 'REAL_USER',
        before: 'Paid tools', value: '₹0', change: '↓ 100%', note: 'Permanent. 4 months of live use.' },
      { heading: 'ITERATIONS',         label: 'Pipeline versions shipped',            type: 'REAL_USER',
        before: 'V1', value: 'V8', change: '8 versions', note: '4 months of daily active use' },
      { heading: 'CONTACT RESOLUTION', label: 'Roles with named email per run',       type: 'EARLY_SIGNAL',
        before: '0', value: '23 / 51', change: '↑ from zero', beforeBar: 0, bar: 45,
        calc: 'Snov.io API enrichment cross-referenced with LinkedIn URL. 23 of 51 roles resolve to a named, deliverable email per run. ~45% hit rate.' },
      { heading: 'DRAFTS READY',       label: 'Outreach drafts generated per run',    type: 'EARLY_SIGNAL',
        before: '0', value: '15', change: '↑ from zero', beforeBar: 0, bar: 30 },
      { heading: 'COPY ITERATIONS',    label: 'Email rewrites before voice locked',   type: 'PEER_TEST',
        before: 'Generic V1', value: '7 rewrites', change: 'Voice locked',
        note: 'Self-tested. Locked template from real draft, not a prompt.',
        calc: 'Wrote a personal outreach email first — real sentences, real tone. Used it as base. Rewrote 7 times until voice locked. That draft is the fixed template. Only company name and role change per send.' },
      { heading: 'INTERVIEW RATE',     label: 'Per 100 outreach emails',              type: 'TARGET',
        before: 'Not measured', value: 'Pending', note: 'First reply is the signal. Not measured yet.' },
    ],
    qualInsights: [
      { heading: 'SYSTEM INSIGHT', text: 'Voice is not a tone instruction. It is a specific set of rules. Writing my own draft first and letting Claude refine it means every outreach sounds like me, not like every other candidate in the inbox.' },
      { heading: 'PM MOMENT', text: '51 jobs arriving in Telegram was a delivery problem solved. The dashboard built the next day was the product decision. Delivery working and experience working are two completely different things.' },
      { heading: 'DESIGN PRINCIPLE', text: 'Human review is not a safety net. It is a product decision about what trustworthy outreach looks like at scale. The gate is in the system on purpose.' },
    ],
    thinking: [
      ['More platforms delivering daily would create momentum.', 'More platforms meant more accumulation. Jobs piled up unread and created anxiety, not action. The dashboard now shows what needs attention, not everything ever scraped.'],
      ['Full automation was the natural endpoint. Finding the email was enough.', 'Emails going to real hiring managers without me reading them first is not efficiency. It is a fast way to make a bad impression at scale. The human gate stayed in as a product decision about trust.'],
      ['Professional-sounding email drafts were the right output.', 'Professional sounds exactly like every other candidate. Voice is a set of specific rules. I wrote my own draft first. That became the locked template.'],
      ['Building each piece well was enough.', 'Two parts went live without the email-finding step connected even though the function existed. The whole chain needed confirmation end to end before anything was built. Pieces that work in isolation do not automatically connect.'],
      ['When 51 jobs arrived in Telegram the hard part was over.', '51 unstructured titles with no contact info and no way to prioritise was not a product. It was a log file. I built the dashboard the next day.'],
    ],
    evolution: [
      { v: 'V1', built: 'Single forum scraper', why: 'Start somewhere. Prove scraping works.' },
      { v: 'V2', built: 'Five sources plus email enrichment plus Telegram at 8AM', why: 'Volume needs multiple pipes. Delivery needs automation.' },
      { v: 'V3', built: 'Dashboard', why: '51 jobs in a chat is noise. Need structure and hierarchy.' },
      { v: 'V4', built: 'Direct ATS scraper', why: 'Roles on day of posting. Speed matters more than accumulation.' },
      { v: 'V5', built: 'JSearch fix plus Instahyre APM queries', why: 'Silent failures waste runs. Better queries, better signal.' },
      { v: 'V6', built: '7 email rewrites plus LinkedIn DM channel', why: 'Generic email fails. Two channels beats one.' },
      { v: 'V7', built: 'Render migration plus IPv6 fix plus garbage filter', why: 'Railway expired. Infrastructure is the product.' },
      { v: 'V8', built: 'Dashboard rebuilt with clear action hierarchy', why: 'Who to contact today should be obvious without scanning.' },
    ],
  },
  {
    id: 1,
    tab: 'BOLNA STUDIO',
    heading: 'Bolna Studio',
    subheading: 'Activation Flow Redesign · Sent Unsolicited',
    tagline: 'Bolna\'s revenue depends on one moment — a business owner successfully building their first voice agent. The path to that moment was 30 minutes and produced zero working demos. I went through their Studio as a user, diagnosed where it breaks, and redesigned it. Both user types reach a working demo in under 15 minutes.',
    metric: '30 min broken baseline → 15 min with peers · 75% of Bolna revenue at stake',
    pmTags: ['ACTIVATION DESIGN','USER JOURNEY MAPPING','B2B PLG','PROBLEM DIAGNOSIS'],
    liveUrl: 'https://bol-na-funnel.vercel.app',
    skillSections: [
      { label: 'PM', chips: ['Activation Design','PLG','User Journey Mapping','Scope Decision','PRD Writing','Hypothesis Testing'] },
      { label: 'UX / DESIGN', chips: ['Flow Architecture','Progressive Disclosure','Demo Sequencing','Trust-First Design','Journey Mapping'] },
      { label: 'TECHNICAL', chips: ['HTML','CSS','JavaScript','Web Speech API','Anthropic API','Vercel','Single Page Architecture'] },
    ],
    problemStatement: 'A business owner who signs up for Bolna wants one thing: an agent making calls for their business. The existing flow put raw engineering parameters — tts_provider, buffer_size, temperature — in front of someone who runs a clinic or a bakery. 30 minutes in with zero working demos, the product had asked for trust it had done nothing to earn.',
    cards: [
      {
        title: 'THE GAP',
        bullets: [
          'Business owners were being asked to configure settings for a product they had never heard speak. The moment trust should have started — hearing your agent for the first time — was buried halfway through technical fields.',
          '75% of Bolna\'s revenue comes from business owners, not engineers. The flow was built for the 25%.',
          'The flow had no moment where the product proved itself before asking for configuration. Trust requires a working moment first. The entire activation journey was asking someone to invest 30 minutes before ever hearing the thing they were building actually speak.',
        ],
      },
      {
        title: 'THE CONSTRAINT',
        bullets: [
          'Built as a single page with no backend. Two PRD features could not be shipped: resuming where you left off and a credit-based nudge system. Both need a server. Both are named as limitations in the design document, not quietly left out.',
          'No access to Bolna\'s real activation data. Designed the validation framework the same way I would for a real product: 50% conservative assumption, 90% confidence, 68 tester minimum.',
          'Inbound calls need a completely separate setup process. Kept scope on outbound only — that is where the activation problem lives.',
        ],
      },
      {
        title: 'TRADE-OFFS',
        bullets: [
          'Voice selection belonged at the very first step, not halfway through. Hear your agent speak before touching any settings. Trust starts with the first working moment.',
          'Replaced two separate modes (Simple and Advanced) with one experience. Technical depth is hidden behind a toggle on each field. The default is always approachable. Depth is always one tap away.',
          'Replaced an eight-tab sidebar with a single scrollable room. Advanced features are still there. Just never in the way of someone doing this for the first time.',
          'Individual play buttons for each demo scenario instead of one run-through. Check any situation by itself.',
        ],
      },
      {
        title: "WHAT I'D DO DIFFERENTLY",
        bullets: [
          'Dual-trigger credit nudge architecturally missing because the static file constraint was caught too late. Would map every PRD feature against architecture before writing requirements.',
          'No distribution plan before building. Would define channel and cohort before locking sample size.',
          'Assumed loading spinner was a known bug. Would replicate across three browsers and document before scoping the redesign.',
        ],
      },
    ],
    quantMetrics: [
      { heading: 'FLOW TIME',            label: 'Non-technical user: current Bolna vs redesign target', type: 'REAL_USER',
        before: '30+ min', value: '<15 min', change: '↓ 50%+', beforeBar: 100, bar: 47,
        note: 'Current: zero working demos produced. Redesign: first live demo within 15 min.',
        calc: 'Current baseline from Bolna\'s live product. Redesign target set from prototype walk-throughs with non-technical and partially-technical reviewer types.' },
      { heading: 'PROTOTYPE ITERATIONS', label: 'Versions built and tested before submission',           type: 'REAL_USER',
        before: 'V1', value: 'V4', change: '4 versions' },
      { heading: 'NON-TECH COMPLETION',  label: 'Reviewer through voice and behaviour, no tech toggle opened', type: 'EARLY_SIGNAL',
        before: 'Expected: drop / help needed', value: '1 / 1', change: 'Full completion',
        note: 'Default experience held end to end. No clarifying questions asked.',
        calc: 'One non-technical reviewer. No setup instructions given. Completed voice selection and behaviour configuration. Advanced settings toggle never opened across the full session.' },
      { heading: 'PEER REVIEW SESSIONS', label: 'User types walked through prototype',                   type: 'PEER_TEST',
        before: '0', value: '2', change: '↑ 2 sessions', beforeBar: 0, bar: 100,
        note: 'Non-technical and partially-technical. Both completed without engineering help.',
        calc: 'Two sessions: one non-technical (no code background), one partially-technical. Each walked through the full flow independently. Both reached the demo step without being guided.' },
      { heading: 'PRIMARY KR',           label: 'Cohort reaching first live call in under 15 min',       type: 'TARGET',
        before: 'Not yet measured', value: '90%', bar: 90, note: 'Target: first live call, unassisted, under 15 min.' },
      { heading: 'VALIDATION MINIMUM',   label: 'Tester minimum for statistical signal',                 type: 'TARGET',
        before: '0 testers', value: '68 needed', bar: 100, note: 'p=0.5 / 90% confidence / ±10pp' },
    ],
    qualInsights: [
      { heading: 'USER SIGNAL', text: 'Non-technical reviewer completed voice and behavior sections without opening the technical detail toggle once. The default experience held without a single clarifying question.' },
      { heading: 'TRUST INSIGHT', text: 'Trust starts the moment something works, not when setup is complete. Moving voice to the first step was not a UX call. It was a trust architecture decision.' },
      { heading: 'FLOW INSIGHT', text: 'A sidebar with eight tabs is a navigation tool built for someone who knows the product. A single scrollable room is an activation tool built for someone doing it for the first time. They solve different problems.' },
    ],
    thinking: [
      ['A sidebar with eight tabs matching Bolna\'s structure was the responsible choice.', 'A business owner doing this for the first time does not need eight tabs. They need to do one thing. Replacing the sidebar with a single room was the actual solution to the actual problem.'],
      ['Voice selection belonged inside the audio settings section.', 'Hearing your agent speak is the moment the product becomes real. Asking someone to configure settings for something they have never heard speak is asking for trust the product has not earned.'],
      ['Two separate modes (simple and advanced) was the right way to serve two user types.', 'Asking someone to decide which type of user they are before they have seen anything is asking them to self-diagnose without information. One unified experience with depth behind a toggle removes that decision entirely.'],
      ['Lifecycle emails were responsible to include because re-engagement is a real growth problem.', 'Sending re-engagement emails to people who never reached their first call is solving a downstream symptom. Fix activation first. The retention problem changes when activation is solved.'],
    ],
    evolution: [
      { v: 'V1', built: 'Single HTML, static sliders, flat hamburger', why: 'Proof of concept. Does the flow make sense end to end?' },
      { v: 'V2', built: 'Full rebuild: dynamic content, AI chat, live values, demo pause', why: 'Static was not a product. Every interaction needed to feel real.' },
      { v: 'V3', built: 'Section sidebar replaced with journey tracker', why: 'Sidebar is for navigation. This is a journey. They are different problems.' },
      { v: 'V4', built: 'Ring animation on play, red pause, teal resume', why: 'Demo state had to be visible without the user looking for it.' },
    ],
  },
  {
    id: 2,
    tab: 'REACHMAP',
    heading: 'ReachMap',
    subheading: 'Emerging Roles Reachability Tool · KR Driven',
    tagline: 'Freshers were applying blind — skipping roles they could reach and chasing ones they could not. No structured way to check fit existed. I built one. A scoring system across 18 emerging roles. 4 questions, a result that means something. Set the KR before writing a single line of code. 35% hit in two weeks.',
    metric: '35% KR hit · 62 tester minimum crossed · Hypothesis confirmed · Live KPIs in real time',
    pmTags: ['PROBLEM DISCOVERY','HYPOTHESIS TESTING','0 TO 1 EXECUTION','KR DRIVEN SHIPPING'],
    liveUrl: 'https://rolereachability-tool.vercel.app',
    skillSections: [
      { label: 'PM', chips: ['Hypothesis Framing','Scoring Architecture','KR Methodology','Edge Case Design','Experiment Design'] },
      { label: 'RESEARCH', chips: ['User Testing','Statistical Sampling','Cohort Design','Metric Validation','Qualitative Signal Reading'] },
      { label: 'TECHNICAL', chips: ['React','Vite','Upstash Redis','Claude API','Vercel Serverless','Statistical Methodology'] },
    ],
    problemStatement: 'A fresher sees an unfamiliar job title and scrolls past. Not because they cannot do the role. Because they have no way to check whether they can. The only tool available is instinct. And instinct is wrong in both directions — missing roles that are reachable and chasing roles that are not.',
    cards: [
      {
        title: 'THE GAP',
        bullets: [
          'No structured gap analysis existed for freshers entering the market. The only signal available was gut feel against a job title they had never seen before.',
          'Two weeks of design was built on the wrong hypothesis — that freshers skip roles because the titles look intimidating. The build proved the real block: no way to check whether their background actually bridged to what the JD needed.',
          'The emerging roles market moves faster than any career advice can track. A role that did not exist two years ago is entry-level today. The tool needed to cover a category of roles that keeps expanding, not a fixed list someone decided was complete.',
        ],
      },
      {
        title: 'THE CONSTRAINT',
        bullets: [
          'No login by design. Getting a fresher to their result as fast as possible meant zero friction. The constraint that surfaced later: every visit from a different device counted as a new person. Switched to persistent browser IDs so the same person always counts as one.',
          'If scoring depended on AI there would be moments where the result simply did not arrive. A blank screen at the trust moment breaks the product. Scoring runs on pure math — instant, never fails. AI comes in after the score is already there.',
          'No existing data on what percentage of freshers would mark a role reachable. The 35% target was set as an educated starting point. 62 testers is the minimum for the result to mean anything statistically.',
        ],
      },
      {
        title: 'TRADE-OFFS',
        bullets: [
          'Built four gates instead of a score out of 100. Skill match sets the foundation. Background decides medium or high. Real work experience can push up one level. Weak English on a communication role caps at medium regardless of everything else. The tier comes from logic, not just a number.',
          'Rule-based fallback for testers without a Claude account. Generates a real explanation from actual matched and missing skills. Labeled honestly as rule-based. 100% coverage, zero blank cards.',
          'Both marks stay when a fresher returns with new skills and marks the same role again. The first shows what was reachable before. The second shows what is reachable now. The history of how they grew is preserved, not overwritten.',
        ],
      },
      {
        title: "WHAT I'D DO DIFFERENTLY",
        bullets: [
          'Experience fit is a flat bucket count. Would run five structured interviews before locking the weights. Interview first. Score after.',
          '35% target set without pressure-testing alternatives. Would test against 25% and 45% — what decision does each number trigger? That question should be answered before locking the KR.',
          'Original hypothesis drove two weeks of design before it was proven wrong. Would stress-test any hypothesis with five user conversations before building.',
        ],
      },
    ],
    quantMetrics: [
      { heading: 'PRIMARY KR',          label: 'Testers who marked one or more roles reachable', type: 'REAL_USER',
        before: '0%', value: '35%', change: '↑ 35pp', beforeBar: 0, bar: 35,
        note: 'Hit within 2 weeks of launch. 62+ testers pooled across shared storage.',
        calc: 'KR set before first line of code. One-sample proportion test: p=0.35, 90% confidence, ±10pp. 62 minimum required. Measured via Upstash Redis shared across all devices. Browser-persistent ID de-duplicates same user.' },
      { heading: 'SAMPLE CROSSED',      label: 'Tester minimum for statistical validity',        type: 'REAL_USER',
        before: '0', value: '62', change: '↑ threshold crossed', beforeBar: 0, bar: 100,
        note: 'Minimum crossed. Result is statistically significant.',
        calc: 'Pooled in shared Upstash storage. Unique browser-persistent IDs prevent same person counting twice across sessions or devices.' },
      { heading: 'PRD ITERATIONS',      label: 'Versions from wrong hypothesis to deployed KR',  type: 'REAL_USER',
        before: 'V1 wrong hypothesis', value: 'V8', change: '8 versions' },
      { heading: 'FALLBACK COVERAGE',   label: 'Testers served without a Claude account',        type: 'EARLY_SIGNAL',
        before: 'Blank screen', value: '100%', change: '↑ full coverage', beforeBar: 0, bar: 100,
        note: 'Zero blank screens across all tester sessions.',
        calc: 'Claude API unavailable without an account. Rule-based engine generates a real gap explanation. Labeled as rule-based. 100% coverage across all tester sessions.' },
      { heading: 'UNPROMPTED FEEDBACK', label: 'Testers who messaged about finding a role',      type: 'PEER_TEST',
        before: '0 signals', value: 'Multiple', change: 'Organic signal',
        note: 'Found roles they had assumed were completely out of reach.',
        calc: 'No feedback prompt in the product. Testers reached out independently via DM. Qualitative signal: hypothesis confirmed in plain language before it confirmed in numbers.' },
      { heading: 'KR CONTINUITY',       label: 'KR holding above 35% threshold',                type: 'TARGET',
        before: 'Pre-launch', value: '35%+', bar: 35, note: 'Consistent across pooled sessions. Still tracking.' },
    ],
    qualInsights: [
      { heading: 'USER SIGNAL', text: 'Testers messaged saying a role they had assumed was completely out of reach was one skill away. The hypothesis validated in plain language before it validated in numbers.' },
      { heading: 'BUILD INSIGHT', text: 'Two weeks of design built on the wrong hypothesis. The real problem surfaced through the build itself, not before it. Ship to discover, not to validate a guess.' },
      { heading: 'PRODUCT PRINCIPLE', text: '100% of testers received a result. No login. No CV. No blank screen. Zero-friction is not a UX choice. It is a product discipline that determines whether anyone reaches the trust moment at all.' },
    ],
    thinking: [
      ['Freshers skip roles because the titles look unfamiliar or intimidating.', 'I spent two weeks designing around that idea. The title has nothing to do with it. The real block was having no way to check whether their background bridges to what the JD needs. Everything built to that point got rebuilt around the correct problem.'],
      ['AI scoring was the obvious choice because smarter output is better output.', 'I thought about what happens when it fails. A blank card at the trust moment is the worst possible outcome. I rebuilt scoring on pure math that runs instantly and never fails. AI comes in quietly after the score is already there.'],
      ['Saving marks by role ID was sufficient.', 'Two separate attempts represent two versions of the same person at two different moments. Overwriting the first erases evidence of how they grew. Both marks stay, with their own frozen scores.'],
      ['The dashboard reading from local storage was measuring the product.', 'It was only counting sessions from one device. A metric that only measures itself is not useful. Switched to shared storage so every tester\'s data pools into one real number.'],
    ],
    evolution: [
      { v: 'V1', built: 'Wrong hypothesis. Freshers skip fancy titles.', why: 'Started somewhere. Proved the hypothesis wrong.' },
      { v: 'V2', built: 'Problem reframed. AI scoring dropped. Pure math. KR locked.', why: 'Instinct was the block, not the title. Math never fails at the trust moment.' },
      { v: 'V3', built: 'Weights locked. Tier logic. Communication cap.', why: 'A number without logic is not a score. Four gates build a tier.' },
      { v: 'V4', built: 'Composite mark key. Dark redesign.', why: 'Multiple attempts equal multiple versions of same person. History matters.' },
      { v: 'V5', built: 'Shared storage. Dashboard pooled across devices.', why: 'Local storage only counts one device. That metric is useless.' },
      { v: 'V6', built: 'Shareable cut. Single-select filter locked.', why: 'Distribution is a product decision. Filter clarity changes the experience.' },
      { v: 'V7', built: 'Rule-based fallback. 100% coverage.', why: 'Blank card at the trust moment is not acceptable.' },
      { v: 'V8', built: 'Vercel migration. Serverless API. Fully owned.', why: 'Infrastructure as product discipline. Own what you ship.' },
    ],
  },
];

const GO_DEEPER = [
  { title: 'ROLEREACH', links: [
    { label: 'PM Thinking Doc', url: 'https://docs.google.com/document/d/1okSpT6R14QdzQUyEci-MmYI1eIAsFU4L/edit?usp=sharing' },
    { label: 'PRD', url: 'https://docs.google.com/document/d/1yg28tEFtGrw7cOWOK7IZLM0IbofKiBwe/edit?usp=sharing' },
    { label: 'GitHub', url: 'https://github.com/kritipm/rolereach' },
  ]},
  { title: 'BOLNA STUDIO', links: [
    { label: 'PM Thinking Doc', url: 'https://docs.google.com/document/d/175Gg6ROjYAJnLLMb8vGeLbmPll0pm2jH/edit?usp=sharing' },
    { label: 'PRD', url: 'https://docs.google.com/document/d/1g5iMeoSJIZvLnLncvMU8Zt36Gaaa4VaW/edit?usp=sharing' },
    { label: 'GitHub', url: 'https://github.com/kritipm/bol-na-funnel' },
  ]},
  { title: 'REACHMAP', links: [
    { label: 'PM Thinking Doc', url: 'https://docs.google.com/document/d/1XwsyDVu_BAi3JwBOko6F2MZzHefdx0wW/edit?usp=sharing' },
    { label: 'PRD', url: 'https://docs.google.com/document/d/1hYSuz0BpBrHkDrwzwLmjPOAihtV731er/edit?usp=sharing' },
    { label: 'GitHub', url: 'https://github.com/kritipm/rolereachability-tool' },
  ]},
];

// ─── COMPONENTS ────────────────────────────────────────────────────────────────

function RedLabel({ text }) {
  return (
    <p style={{ fontFamily:jb, fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', color:C.accent, marginBottom:14, fontWeight:700 }}>
      {text}
    </p>
  );
}

function BigHead({ text }) {
  return (
    <h3 style={{ fontFamily:sat, fontWeight:700, fontSize:'clamp(26px,3.5vw,44px)', color:C.white, lineHeight:1.1, marginBottom:40, letterSpacing:'-0.01em' }}>
      {text}
    </h3>
  );
}

function Divider({ color }) {
  return <div style={{ height:1, background: color || C.border, marginBottom:20 }} />;
}

// 4 credibility tiers — distinct visual language per tier
// REAL_USER:    red top border  (solid, most prominent)
// EARLY_SIGNAL: white top border (solid, secondary)
// PEER_TEST:    left border only (different axis entirely — reads as qualitative/anecdotal)
// TARGET:       dashed top border (projection, not fact)
const TIER = {
  REAL_USER:    { bg:'rgba(230,57,70,0.07)', topBdr:'3px solid #E63946',               leftBdr:'none', badge:'REAL USER OUTCOME', badgeC:C.accent,               badgeBdr:C.accent,                numC:C.white,  barC:C.accent },
  EARLY_SIGNAL: { bg:C.card,                 topBdr:'2px solid rgba(255,255,255,0.28)', leftBdr:'none', badge:'EARLY INDICATOR',   badgeC:C.mid,                  badgeBdr:'rgba(255,255,255,0.18)',numC:C.bright, barC:'rgba(255,255,255,0.3)' },
  PEER_TEST:    { bg:'#0C0C0C',              topBdr:'none',                            leftBdr:'4px solid rgba(255,255,255,0.32)', badge:'PEER TESTING', badgeC:C.mid, badgeBdr:'rgba(255,255,255,0.2)', numC:C.bright, barC:'rgba(255,255,255,0.25)' },
  TARGET:       { bg:C.surface,              topBdr:'1px dashed rgba(255,255,255,0.15)',leftBdr:'none', badge:'FUTURE TARGET',     badgeC:'rgba(255,255,255,0.3)',badgeBdr:'rgba(255,255,255,0.15)', numC:C.mid,    barC:'rgba(255,255,255,0.12)' },
};

function QuantCard({ m }) {
  const t = TIER[m.type] || TIER.TARGET;
  const isTarget = m.type === 'TARGET';
  const hasBefore = m.before != null;

  return (
    <div style={{ padding:'32px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>

      {/* Heading + badge */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:12, marginBottom:4 }}>
        <p style={{ fontFamily:jb, fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.38)', fontWeight:700 }}>
          {m.heading}
        </p>
        <span style={{ fontFamily:jb, fontSize:7, letterSpacing:'0.14em', textTransform:'uppercase', color:t.badgeC, flexShrink:0 }}>
          {t.badge}
        </span>
      </div>
      {m.label && <p style={{ fontFamily:inter, fontSize:11, color:'rgba(255,255,255,0.22)', marginBottom:22 }}>{m.label}</p>}

      {/* Before → After number row */}
      <div style={{ display:'flex', alignItems:'flex-end', gap:0, marginBottom:16 }}>
        {hasBefore && (
          <>
            <div>
              <p style={{ fontFamily:jb, fontSize:8, color:'rgba(255,255,255,0.24)', letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:6 }}>BEFORE</p>
              <p style={{ fontFamily:jb, fontSize:20, fontWeight:700, color:'rgba(255,255,255,0.2)', lineHeight:1 }}>{m.before}</p>
            </div>
            <span style={{ fontFamily:jb, fontSize:14, color:'rgba(255,255,255,0.1)', margin:'0 16px', paddingBottom:2, flexShrink:0 }}>→</span>
          </>
        )}
        <div>
          {hasBefore && (
            <p style={{ fontFamily:jb, fontSize:8, color: isTarget ? 'rgba(255,255,255,0.24)' : t.barC, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:6 }}>
              {isTarget ? 'TARGET' : 'AFTER'}
            </p>
          )}
          <p style={{ fontFamily:jb, fontSize: hasBefore ? 36 : 30, fontWeight:700, color:t.numC, lineHeight:1 }}>{m.value}</p>
        </div>
        {m.change && (
          <div style={{ marginLeft:'auto', paddingBottom:4, textAlign:'right' }}>
            <span style={{ fontFamily:jb, fontSize:13, fontWeight:700, color: isTarget ? 'rgba(255,255,255,0.28)' : m.type === 'REAL_USER' ? C.accent : 'rgba(255,255,255,0.4)' }}>
              {m.change}
            </span>
          </div>
        )}
      </div>

      {/* Stacked comparison bars */}
      {(m.bar != null || m.beforeBar != null) && (
        <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
          {m.beforeBar != null && (
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ fontFamily:jb, fontSize:7, color:'rgba(255,255,255,0.16)', width:44, flexShrink:0, letterSpacing:'0.1em', textTransform:'uppercase' }}>BEFORE</span>
              <div style={{ flex:1, height:9, background:'rgba(255,255,255,0.04)', borderRadius:1 }}>
                <div style={{ width: m.beforeBar+'%', height:'100%', background:'rgba(255,255,255,0.1)', borderRadius:1 }} />
              </div>
            </div>
          )}
          {m.bar != null && (
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              {m.beforeBar != null && (
                <span style={{ fontFamily:jb, fontSize:7, color:'rgba(255,255,255,0.16)', width:44, flexShrink:0, letterSpacing:'0.1em', textTransform:'uppercase' }}>AFTER</span>
              )}
              <div style={{ flex:1, height:9, background:'rgba(255,255,255,0.04)', borderRadius:1 }}>
                {isTarget ? (
                  <div style={{ width: m.bar+'%', height:'100%', background:'transparent', outline:'1px dashed rgba(255,255,255,0.15)', borderRadius:1 }} />
                ) : (
                  <div style={{ width: m.bar+'%', height:'100%', background:t.barC, borderRadius:1 }} />
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {m.note && <p style={{ marginTop:12, fontFamily:inter, fontSize:12, color:'rgba(255,255,255,0.28)', lineHeight:1.6 }}>{m.note}</p>}
      {m.calc && (
        <div style={{ marginTop:18, paddingTop:14, borderTop:'1px solid rgba(255,255,255,0.04)' }}>
          <p style={{ fontFamily:jb, fontSize:8, letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)', marginBottom:5 }}>HOW</p>
          <p style={{ fontFamily:inter, fontSize:11, color:'rgba(255,255,255,0.28)', lineHeight:1.8 }}>{m.calc}</p>
        </div>
      )}
    </div>
  );
}

function HorizontalCards({ cards }) {
  const [active, setActive] = useState(null);
  return (
    <div>
      <div style={{ display:'flex', borderBottom:'2px solid rgba(255,255,255,0.1)' }}>
        {cards.map((card, i) => {
          const isActive = active === i;
          return (
            <button key={i} className="hcard-tab"
              onClick={() => setActive(isActive ? null : i)}
              style={{
                flex:1,
                fontFamily:jb, fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase',
                padding:'20px 8px',
                background: isActive ? C.accent : 'transparent',
                color: isActive ? '#FFFFFF' : C.bright,
                border:'none',
                borderBottom: isActive ? '2px solid '+C.accent : '2px solid transparent',
                marginBottom:-2,
                fontWeight: isActive ? 700 : 500,
                transition:'all .15s',
                textAlign:'center',
                cursor:'pointer',
                lineHeight:1.4,
              }}>
              {card.title}
            </button>
          );
        })}
      </div>
      {active !== null && (
        <div style={{ background:'#080808', borderLeft:'3px solid '+C.accent, padding:'36px 40px' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:28 }}>
            {cards[active].bullets.map((b, j) => (
              <p key={j} style={{ fontFamily:inter, fontSize:15, color:C.bright, lineHeight:2, paddingLeft:24, borderLeft:'1px solid rgba(255,255,255,0.1)' }}>
                {clean(b)}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function EvolutionCarousel({ items }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ marginTop:72 }}>
      <RedLabel text="HOW THIS EVOLVED" />
      <BigHead text="Every version changed something real." />
      <div className="carousel-wrap" style={{ overflow:'hidden', cursor:'grab' }}>
        <div className="carousel-track">
          {doubled.map((item, i) => (
            <div key={i} style={{
              flexShrink:0, width:248,
              background:'#0C0C0C',
              borderLeft:'3px solid '+C.accent,
              padding:'24px 22px',
            }}>
              <p style={{ fontFamily:jb, fontSize:20, fontWeight:700, color:C.accent, marginBottom:18 }}>{item.v}</p>
              <p style={{ fontFamily:jb, fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:C.white, marginBottom:8, fontWeight:700 }}>BUILT</p>
              <p style={{ fontFamily:inter, fontSize:13, color:C.bright, lineHeight:1.8, marginBottom:18 }}>{clean(item.built)}</p>
              <p style={{ fontFamily:jb, fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:C.accent, marginBottom:8, fontWeight:700 }}>WHY</p>
              <p style={{ fontFamily:inter, fontSize:13, color:C.mid, lineHeight:1.8 }}>{clean(item.why)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectPanel({ project }) {
  const allMetrics = project.quantMetrics;

  return (
    <div style={{ paddingBottom:96 }}>

      {/* ── PROJECT HEADING (FULL WIDTH) ── */}
      <div style={{ paddingTop:80, paddingBottom:60, marginBottom:72, borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
        <RedLabel text={project.subheading} />
        <h2 style={{
          fontFamily:sat, fontWeight:700,
          fontSize:'clamp(56px,8vw,112px)',
          color:C.white, lineHeight:0.9,
          marginBottom:36, letterSpacing:'-0.025em',
          width:'100%',
        }}>
          {project.heading}
        </h2>
        <p style={{ fontFamily:inter, fontSize:18, color:C.bright, lineHeight:1.9, maxWidth:760, marginBottom:32 }}>
          {clean(project.tagline)}
        </p>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:20, marginBottom:36 }}>
          <p style={{ fontFamily:jb, fontSize:14, color:C.accent, fontWeight:700, letterSpacing:'0.02em' }}>
            {metricLine(project.metric)}
          </p>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hl"
            style={{ fontFamily:jb, fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', padding:'14px 28px', background:C.accent, color:'#FFFFFF', display:'inline-flex', alignItems:'center', gap:8, fontWeight:700, textDecoration:'none' }}>
            SEE LIVE PRODUCT
          </a>
        </div>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {project.pmTags.map(t => (
            <span key={t} style={{ fontFamily:jb, fontSize:9, letterSpacing:'0.08em', textTransform:'uppercase', color:C.mid, border:'1px solid rgba(255,255,255,0.15)', padding:'5px 12px' }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── SKILLS ── */}
      <div style={{ marginBottom:80 }}>
        <RedLabel text="SKILLS" />
        <BigHead text="What I used to build this." />
        <div className="skills-grid" style={{ display:'grid', gridTemplateColumns:`repeat(${project.skillSections.length},1fr)`, gap:48 }}>
          {project.skillSections.map(sec => (
            <div key={sec.label}>
              <p style={{ fontFamily:jb, fontSize:11, letterSpacing:'0.18em', textTransform:'uppercase', color:C.accent, marginBottom:22, fontWeight:700 }}>
                {sec.label}
              </p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
                {sec.chips.map(c => (
                  <span key={c} style={{ fontFamily:inter, fontSize:13, color:C.bright, border:'1px solid rgba(255,255,255,0.18)', padding:'7px 16px' }}>{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── THE PROBLEM ── */}
      <div style={{ marginBottom:80 }}>
        <RedLabel text="THE PROBLEM" />
        <BigHead text="What was actually broken." />
        <div style={{ borderLeft:'3px solid '+C.accent, paddingLeft:32 }}>
          <p style={{ fontFamily:inter, fontSize:17, color:C.bright, lineHeight:2, maxWidth:740 }}>
            {clean(project.problemStatement)}
          </p>
        </div>
      </div>

      {/* ── PM THINKING CARDS ── */}
      <div style={{ marginBottom:80 }}>
        <RedLabel text="PM THINKING" />
        <BigHead text="How I made the calls." />
        <HorizontalCards cards={project.cards} />
      </div>

      {/* ── IMPACT ── */}
      <div style={{ marginBottom:80 }}>
        <RedLabel text="IMPACT" />
        <BigHead text="Numbers that count." />

        {/* ALL METRICS — 4 credibility tiers in one grid */}
        <div style={{ marginBottom:48 }}>
          <div style={{ display:'flex', gap:28, flexWrap:'wrap', marginBottom:24, paddingBottom:16, borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
            {[
              { label:'Real user outcome', color:C.accent },
              { label:'Early indicator',   color:'rgba(255,255,255,0.3)' },
              { label:'Peer testing',      color:'rgba(255,255,255,0.35)' },
              { label:'Future target',     color:'rgba(255,255,255,0.18)' },
            ].map(leg => (
              <div key={leg.label} style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:18, height:3, background:leg.color, flexShrink:0 }} />
                <span style={{ fontFamily:jb, fontSize:9, letterSpacing:'0.12em', textTransform:'uppercase', color:leg.color }}>
                  {leg.label}
                </span>
              </div>
            ))}
          </div>
          <div>
            {allMetrics.map((m, i) => <QuantCard key={i} m={m} />)}
          </div>
        </div>

        {/* QUALITATIVE SIGNAL */}
        <div>
          <div style={{ marginBottom:20, paddingBottom:14, borderBottom:'2px solid '+C.accent }}>
            <p style={{ fontFamily:jb, fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:C.white, fontWeight:700 }}>
              QUALITATIVE SIGNAL
            </p>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
            {project.qualInsights.map((q, i) => (
              <div key={i} style={{ background:C.card, borderLeft:'3px solid '+C.accent, padding:'28px 32px', display:'flex', gap:28, alignItems:'flex-start' }}>
                <span style={{ fontFamily:jb, fontSize:28, fontWeight:700, color:C.accent, flexShrink:0, lineHeight:1, minWidth:52 }}>
                  {String(i+1).padStart(2,'0')}
                </span>
                <div>
                  <p style={{ fontFamily:jb, fontSize:10, letterSpacing:'0.16em', textTransform:'uppercase', color:C.white, marginBottom:14, fontWeight:700 }}>
                    {q.heading}
                  </p>
                  <p style={{ fontFamily:inter, fontSize:15, color:C.bright, lineHeight:1.95 }}>
                    {clean(q.text)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ASSUMPTION FAILED ── */}
      <div style={{ marginBottom:72 }}>
        <RedLabel text="ASSUMPTION FAILED" />
        <BigHead text="What the build proved wrong." />
        <div style={{ display:'flex', flexDirection:'column' }}>
          {project.thinking.map(([assumption, reality], i) => (
            <div key={i} style={{ padding:'36px 0', borderTop:'1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ fontFamily:jb, fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:C.mid, fontWeight:700, marginBottom:12 }}>
                ASSUMED
              </p>
              <p style={{ fontFamily:inter, fontSize:15, color:C.mid, lineHeight:1.9, marginBottom:20 }}>
                {clean(assumption)}
              </p>
              <div style={{ display:'flex', gap:20, alignItems:'flex-start' }}>
                <span style={{ fontFamily:jb, fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:C.accent, fontWeight:700, flexShrink:0, paddingTop:4 }}>
                  ACTUAL
                </span>
                <p style={{ fontFamily:inter, fontSize:15, color:C.white, lineHeight:1.9, fontWeight:500 }}>
                  {clean(reality)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── EVOLUTION ── */}
      <EvolutionCarousel items={project.evolution} />

      {/* ── BOTTOM CTA ── */}
      <div style={{ marginTop:56 }}>
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hl"
          style={{ fontFamily:jb, fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', padding:'18px 40px', background:C.accent, color:'#FFFFFF', display:'inline-flex', alignItems:'center', gap:8, fontWeight:700, textDecoration:'none' }}>
          SEE IT LIVE
        </a>
      </div>

    </div>
  );
}

// ─── APP ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [heroIdx, setHeroIdx]     = useState(0);
  const [heroVis, setHeroVis]     = useState(true);

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setHeroVis(false);
      setTimeout(() => { setHeroIdx(i => (i+1) % HERO.length); setHeroVis(true); }, 400);
    }, 10000);
    return () => clearInterval(t);
  }, []);

  const gutter = 'max(28px, calc((100vw - 1040px) / 2))';
  const row = HERO[heroIdx];

  return (
    <div style={{ background:C.bg, minHeight:'100vh' }}>

      {/* ── HERO ── */}
      <section style={{ minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', padding:'80px ' + gutter }}>
        <div style={{ marginBottom:72 }}>
          <p style={{ fontFamily:sat, fontWeight:700, fontSize:20, letterSpacing:'0.12em', textTransform:'uppercase', color:C.white, marginBottom:6 }}>
            KRITI KUMARI
          </p>
          <p style={{ fontFamily:jb, fontSize:11, letterSpacing:'0.22em', textTransform:'uppercase', color:C.accent }}>
            PRODUCT MANAGER
          </p>
        </div>

        <div style={{ opacity:heroVis?1:0, transition:'opacity 0.4s ease', marginBottom:44, maxWidth:780 }}>
          <p style={{ fontFamily:inter, fontSize:'clamp(17px,2.2vw,22px)', color:'#A0A0A0', lineHeight:1.8, marginBottom:24 }}>
            {clean(row.line1)}
          </p>
          <p style={{ fontFamily:inter, fontWeight:600, fontSize:'clamp(17px,2.2vw,22px)', color:'#F5F5F5', lineHeight:1.8, marginBottom:24 }}>
            {clean(row.line2)}
          </p>
          <p style={{ fontFamily:inter, fontWeight:700, fontSize:'clamp(17px,2.2vw,22px)', color:C.accent, lineHeight:1.8 }}>
            {clean(row.line3)}
          </p>
        </div>

        <div style={{ display:'flex', gap:8, marginBottom:52, alignItems:'center' }}>
          {HERO.map((_, i) => (
            <button key={i}
              onClick={() => { setHeroVis(false); setTimeout(() => { setHeroIdx(i); setHeroVis(true); }, 400); }}
              style={{ width:i===heroIdx?28:6, height:3, borderRadius:2, background:i===heroIdx?C.accent:'rgba(255,255,255,0.2)', border:'none', padding:0, cursor:'pointer', transition:'width .3s,background .3s' }} />
          ))}
        </div>

        <p style={{ fontFamily:inter, fontSize:16, color:C.mid, lineHeight:1.75, maxWidth:560, marginBottom:52 }}>
          Not a builder who thinks about product.<br />A PM who ships to prove the thinking.
        </p>

        <div className="hero-ctas" style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
          <button onClick={() => document.getElementById('projects-tabs')?.scrollIntoView({ behavior:'smooth' })} className="hp"
            style={{ fontFamily:sat, fontWeight:700, fontSize:14, letterSpacing:'0.08em', textTransform:'uppercase', padding:'16px 36px', background:C.white, color:C.bg, border:'none', cursor:'pointer' }}>
            SEE MY WORK
          </button>
          <a href="https://docs.google.com/document/d/1AQNiKSa-3V8_QLb6py7CEst0_oYjadoq/edit?usp=sharing"
            target="_blank" rel="noopener noreferrer" className="hg"
            style={{ fontFamily:sat, fontWeight:700, fontSize:14, letterSpacing:'0.08em', textTransform:'uppercase', padding:'16px 36px', background:'transparent', color:C.white, border:'1px solid '+C.white, display:'inline-flex', alignItems:'center', textDecoration:'none' }}>
            READ CV
          </a>
        </div>
      </section>

      {/* ── PROJECT TABS ── */}
      <div id="projects-tabs">
        <div className="tabs-bar" style={{ position:'sticky', top:0, zIndex:100, background:C.surface, borderBottom:'1px solid rgba(255,255,255,0.1)', display:'flex', overflowX:'auto' }}>
          {PROJECTS.map((p, i) => (
            <button key={p.id} onClick={() => setActiveTab(i)} className="htab"
              style={{
                fontFamily:jb, fontSize:12, letterSpacing:'0.14em', textTransform:'uppercase',
                padding:'22px 40px', background:'transparent', border:'none',
                borderBottom: activeTab===i ? '2px solid '+C.accent : '2px solid transparent',
                marginBottom:-1,
                color: activeTab===i ? C.white : C.mid,
                fontWeight: activeTab===i ? 700 : 500,
                display:'flex', alignItems:'center', gap:10, whiteSpace:'nowrap', flexShrink:0, cursor:'pointer',
              }}>
              {activeTab===i && (
                <span className="pulse-dot" style={{ width:6, height:6, borderRadius:'50%', background:C.accent, flexShrink:0 }} />
              )}
              {p.tab}
            </button>
          ))}
        </div>
        <div style={{ padding:'0 '+gutter }}>
          {PROJECTS.map((p, i) => activeTab===i ? <ProjectPanel key={p.id} project={p} /> : null)}
        </div>
      </div>

      {/* ── GO DEEPER ── */}
      <section style={{ padding:'80px '+gutter, borderTop:'1px solid rgba(255,255,255,0.08)' }}>
        <RedLabel text="GO DEEPER" />
        <h3 style={{ fontFamily:sat, fontWeight:700, fontSize:'clamp(26px,3.5vw,44px)', color:C.white, marginBottom:48, letterSpacing:'-0.01em' }}>
          Read the full thinking.
        </h3>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:2 }}>
          {GO_DEEPER.map(card => (
            <div key={card.title} style={{ background:C.card, padding:36 }}>
              <p style={{ fontFamily:jb, fontSize:10, letterSpacing:'0.18em', textTransform:'uppercase', color:C.accent, marginBottom:28, fontWeight:700 }}>
                {card.title}
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
                {card.links.map(lk => (
                  <a key={lk.label} href={lk.url} target="_blank" rel="noopener noreferrer" className="hlink"
                    style={{ fontFamily:inter, fontSize:15, color:C.bright, display:'flex', alignItems:'center', gap:12, textDecoration:'none' }}>
                    <span style={{ color:C.accent, flexShrink:0, fontSize:16, fontWeight:700, lineHeight:1 }}>+</span>
                    {lk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section style={{ padding:'80px '+gutter, borderTop:'1px solid rgba(255,255,255,0.08)' }}>
        <RedLabel text="GET IN TOUCH" />
        <h3 style={{ fontFamily:sat, fontWeight:700, fontSize:'clamp(26px,3.5vw,44px)', color:C.white, marginBottom:48, letterSpacing:'-0.01em' }}>
          Let's talk.
        </h3>
        <div style={{ display:'flex', flexDirection:'column', gap:32 }}>
          {[
            { label:'Phone',    href:'tel:+916201890335',                    text:'+91 6201890335'         },
            { label:'Email',    href:'mailto:kritipm62@gmail.com',           text:'kritipm62@gmail.com'    },
            { label:'LinkedIn', href:'https://www.linkedin.com/in/kritiux', text:'linkedin.com/in/kritiux', ext:true },
          ].map(item => (
            <a key={item.label} href={item.href} {...(item.ext?{target:'_blank',rel:'noopener noreferrer'}:{})} className="hlink"
              style={{ fontFamily:inter, fontSize:18, color:C.white, display:'flex', alignItems:'center', gap:24, textDecoration:'none' }}>
              <span style={{ fontFamily:jb, fontSize:9, color:C.mid, textTransform:'uppercase', letterSpacing:'0.12em', minWidth:80, flexShrink:0 }}>
                {item.label}
              </span>
              {item.text}
            </a>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding:'24px '+gutter, borderTop:'1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ fontFamily:jb, fontSize:11, color:C.mid, letterSpacing:'0.08em' }}>
          KRITI KUMARI / Portfolio September 2026
        </p>
      </footer>

    </div>
  );
}
