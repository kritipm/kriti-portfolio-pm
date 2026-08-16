// v8
import { useState, useEffect, useRef } from 'react';

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
  { bg: '#1A0B0C', border: '#E63946' },
  { bg: '#0B0C1A', border: '#4F8EF7' },
  { bg: '#1A130B', border: '#F5A623' },
  { bg: '#0B1A0B', border: '#22C55E' },
  { bg: '#130B1A', border: '#A855F7' },
];

const sg = "'Space Grotesk', sans-serif";
const jb = "'JetBrains Mono', monospace";

const GLOBAL_CSS = [
  '*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }',
  'html { scroll-behavior:smooth; }',
  "body { background:#0A0A0A; color:#F5F5F5; font-family:'Space Grotesk', sans-serif; -webkit-font-smoothing:antialiased; overflow-x:hidden; }",
  '::-webkit-scrollbar { width:4px; }',
  '::-webkit-scrollbar-track { background:#0A0A0A; }',
  '::-webkit-scrollbar-thumb { background:#555555; border-radius:2px; }',
  '@keyframes pulse { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:.35;transform:scale(.7);} }',
  '.pulse-dot { animation:pulse 1.6s ease-in-out infinite; }',
  '.hero-fade { transition:opacity .45s ease,transform .45s ease; }',
  '.hero-in  { opacity:1; transform:translateY(0); }',
  '.hero-out { opacity:0; transform:translateY(-14px); pointer-events:none; }',
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
  '@media (max-width:768px) {',
  '  body,html { overflow-x:hidden; max-width:100vw; }',
  '  .tabs-container { overflow-x:auto !important; -webkit-overflow-scrolling:touch; scrollbar-width:none; }',
  '  .tabs-container::-webkit-scrollbar { display:none; }',
  '  .go-deeper-grid { grid-template-columns:1fr !important; gap:12px !important; }',
  '  .hero-ctas { flex-direction:column !important; width:100%; }',
  '  .hero-ctas button,.hero-ctas a { width:100%; text-align:center; justify-content:center; }',
  '  .contact-items { flex-direction:column !important; align-items:flex-start !important; gap:20px !important; }',
  '  button,a { min-height:44px; display:inline-flex; align-items:center; }',
  '}',
].join('\n');

const HERO_LINES = [
  {
    text: "Freshers were missing roles they could reach and chasing ones they couldn't. I built a scoring system. 35% KR. 62 tester minimum for the result to mean anything. Both hit.",
    hl: "35% KR",
  },
  {
    text: "30 minutes of onboarding. Zero working demos. 75% of revenue on the line. I rebuilt the flow around one insight. Two user types. One destination. Both reach a working voice agent demo in under 15 minutes.",
    hl: "under 15 minutes",
  },
  {
    text: "Manual search. Generic outreach. Zero replies. I built an 8 platform pipeline that scrapes, finds hiring managers and drafts outreach in my voice. Delivered at 8AM daily.",
    hl: "8 platform pipeline",
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
    liveUrl: 'https://rolereach-production.up.railway.app',
    thinking: [
      ["More platforms delivering daily would create momentum. More sources, more options, constant progress.", "More platforms meant more accumulation. Jobs piled up unread and created anxiety, not action. Deduplication handled the overlap but the real fix was a sent and muted section. The dashboard now shows what needs attention, not everything ever scraped."],
      ["Full automation was the natural endpoint. And finding the email was enough to reach the right person.", "Emails going to real hiring managers without me reading them first is not efficiency. It is a fast way to make a bad impression at scale before any relationship exists. The human review gate stayed in on purpose. Not as a safety net. As a product decision about what trustworthy actually looks like. And when emails weren't landing the fix wasn't more volume. I added a LinkedIn URL and a DM drafter for the same contact. Same outreach, different channel, better odds."],
      ["Professional sounding email drafts were the right output.", "Professional sounds exactly like every other candidate in the inbox. Voice is not a tone instruction. It is a set of specific rules. I wrote my own draft first. Real sentences, real tone, real structure. Gave that to Claude to refine. That draft went into the system as the locked template. The only things that change per email are the company name and role. Everything else is already mine."],
      ["Building each piece well was enough.", "Two parts went live without the email finding step connected even though the step already existed. What it actually needed was for the whole chain from finding a job to having a sendable email to be confirmed end to end before anything got built. Pieces that work in isolation do not automatically connect."],
      ["When 51 jobs arrived in Telegram the hard part was over.", "51 unstructured job titles in a row with no contact info visible and no way to prioritise was not a product. It was a log file. I built the dashboard the next day because the delivery working and the experience working are two completely different things."],
    ],
    sections: [
      {
        id: '01', title: '01  THE GAP',
        bullets: [
          "I opened five websites every morning, scrolled through hundreds of posts and spent two hours just finding who to reach out to. Not a single application sent yet.",
          "Without a network the only way to get noticed is to reach enough people that some write back. That only works with volume. The manual process made volume impossible.",
          "One morning it became obvious. Trying harder at this process was never going to improve it. It needed to be automated or it needed to not exist.",
        ],
      },
      {
        id: '02', title: '02  THE CONSTRAINT',
        bullets: [
          "Zero budget. Not low budget. Zero. Every existing tool that solved any part of this charged money. The only option was to build something that works permanently for free. Every step of it, from finding jobs to sending the morning summary.",
          "The stakes were real from day one. Every test I ran used actual job listings at actual companies. When something broke it wasn't a bug to fix later. It was a real opportunity that slipped by while I was fixing it. That feeling is completely different from breaking something in a practice exercise.",
          "The hardest constraint was infrastructure. A system that wakes up at 8AM, does 15 minutes of work, then switches off without paying to sit idle all day. Keeping a server running 24 hours for one daily task is like leaving every light in the house on to use one room for an hour. I solved it with GitHub Actions. It costs nothing between runs.",
        ],
      },
      {
        id: '03', title: '03  THE DECISION',
        bullets: [
          "A spreadsheet felt like the obvious starting point. Then I thought about what a spreadsheet actually does. It holds information I already put in. It doesn't find the jobs. It doesn't find the contact. It doesn't write the email. It just waits for me to do all the work first. I built a system that does all of that instead.",
          "The first version delivered everything through a chat app. Fifty one jobs showed up as a wall of text with no way to see which had a contact, no way to know which to act on first, no structure at all. I built the dashboard the next day. Who to contact today, contact information already attached, the whole pipeline visible at once.",
          "Email alone wasn't enough. When hiring manager emails weren't landing the answer wasn't to send more. It was to open a second channel. I added a LinkedIn URL for every contact and a DM drafter built in the same voice and rules. Same person, same outreach, different door. The decision was never about one channel. It was about making sure every lead had at least one way in.",
        ],
      },
      {
        id: '04', title: '04  THE OUTCOME',
        bullets: [
          "The first full run came back with 51 PM roles across 5 platforms in one go. Of those 23 had a named hiring manager email already attached. Not a list of jobs to scroll through. A list of people to contact today with everything already there.",
          "15 emails written and waiting in the dashboard. Already in my tone. Already following my rules. Nothing to fix or rewrite. Just read, decide and send.",
          "From the moment the morning schedule kicks in to the moment the summary arrives: 15 minutes. The same time the old process spent just opening the first website and starting to scroll.",
        ],
      },
      {
        id: '05', title: "05  WHAT I'D DO DIFFERENTLY",
        bullets: [
          "Two parts of the system went live without the email finding step connected to them. Jobs came back with no way to reach anyone. The fix already existed. It just never got linked. Before building any individual piece next time the whole journey from finding a job to having a sendable email needs to be mapped completely first. Every step confirmed. Then build.",
          "I started with the source that felt like it would have the most jobs. Turned out two smaller platforms were returning more of the right roles per search. A few days of checking each source manually before building anything would have shown that. The most useful ones should have been built first.",
          "I designed contact finding around email as the only channel. Limits, blocked addresses, hiring managers who don't respond to cold email. None of that was accounted for. The real insight came later. LinkedIn URL plus a DM drafter means even when email fails the contact isn't dead. I should have designed for multiple contact paths from day one, not added them after the first channel showed its limits.",
        ],
      },
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
    thinking: [
      ["A sidebar with eight tabs matching Bolna's structure was the responsible choice.", "A business owner doing this for the first time does not need eight tabs. They need to do one thing. Everything else is a distraction. Replacing the sidebar with a single room where everything happens in sequence was not a simplification. It was the actual solution to the actual problem."],
      ["Voice selection belonged inside the audio settings section.", "Hearing your agent speak for the first time is not a configuration step. It is the moment the product becomes real. Putting that moment halfway through technical fields asks someone to care about settings for something they have not yet felt. Trust starts the moment something works not the moment setup is complete."],
      ["The safety net question was optional for users whose goals matched existing templates.", "Those users never made an explicit decision about what their agent does when it cannot answer something. Their agent went into the demo carrying an implicit assumption nobody had chosen. Making it required meant the demo could show that decision working in real time rather than just showing the happy path."],
      ["Lifecycle emails were a responsible thing to include because re engagement is a real growth problem.", "Those emails would be sent to people who never made it to their first call. Trying to bring someone back when they were never fully there is solving a downstream symptom. Fix the activation problem first. The retention problem changes when the activation problem is solved."],
      ["Two separate modes, one simple and one advanced, was the right way to serve two different types of users.", "Asking someone to decide which type of user they are before they have seen anything is asking them to self diagnose without information. Nobody knows if they need advanced controls until they have seen what the simple experience cannot do. One unified experience with technical depth hidden behind a toggle on each field means the default is always approachable and the depth is always one tap away without forcing a decision upfront that the user is not ready to make."],
    ],
    sections: [
      {
        id: '01', title: '01  THE GAP',
        bullets: [
          "Bolna lets business owners across India build AI calling agents that handle bookings, reminders and customer follow ups without writing any code. The product works. The problem was getting people to actually use it for the first time.",
          "75% of Bolna's revenue comes from business owners who complete setup and make their first real call. The path to that first call was taking over 30 minutes and producing zero working demos. That is the entire business sitting on a broken step.",
          "A new user would land inside a screen full of settings like tts provider, buffer size and temperature. A bakery owner or a clinic manager does not know what temperature means in the context of a phone call. They were being asked to make technical decisions about a product they had never heard work. People were being asked to trust a product that had not yet done anything to earn that trust.",
        ],
      },
      {
        id: '02', title: '02  THE CONSTRAINT',
        bullets: [
          "I built this as a single page with no backend. That meant two things from the PRD could not be built. The ability to pick up where you left off if you closed the browser and a nudge that fires based on how many days you have been using your free credit. Both need a server to track information over time. Both are named as limitations in the design document rather than quietly left out.",
          "I had no access to Bolna's actual activation data and no baseline to build from. So I designed the validation framework the same way I would for any real product. 50% conservative assumption when no baseline exists, 90% confidence level, 68 tester minimum before any result counts as signal. If Bolna ran this with real users they would know exactly how to measure whether it worked. That framework stays valid whether I run it or they do.",
          "Inbound calls turned out to need a completely separate setup process. Including them would have meant building two parallel journeys at once and solving two different problems at the same time. I kept the focus on outbound only because that is where the activation problem actually lives.",
        ],
      },
      {
        id: '03', title: '03  THE DECISION',
        bullets: [
          "Voice selection was halfway through setup in the original flow after several other fields. Voice is the first moment a business owner actually hears what they are building. Asking someone to configure settings for a product they have never heard speak is like asking someone to decorate a house they have never walked into. I moved voice to the very first step. Hear it before touching anything else.",
          "The first version had two separate modes. Simple for non technical users and advanced for people who want control. The problem is someone has to decide which type of person they are before they have seen anything. I replaced both with one single experience where every technical detail is hidden behind a small toggle on each field. The simple experience is the default. The depth is always one tap away.",
          "The original demo played through every scenario in a single run. If a business owner wanted to check one specific situation they had to sit through the whole thing to get there. I added individual play buttons to each scenario. Check any one by itself without running everything.",
          "The sidebar had eight tabs matching Bolna's existing product structure. That makes sense for someone who already knows the product and needs to jump between sections. It makes no sense for someone doing this for the first time. I replaced it with a single scrollable room where everything happens in order. Advanced features are still there. Just never in the way.",
        ],
      },
      {
        id: '04', title: '04  THE OUTCOME',
        bullets: [
          "The finished prototype was sent directly to Bolna's founding team with a live link. Nobody asked for it. I built it and sent it because the problem was real and the solution was ready.",
          "I set one primary KR. 90% of first time users reach a working voice agent demo in under 15 minutes, unassisted. Baseline to beat: 30 minutes and zero working demos in the existing flow.",
          "The 68 tester minimum came from a statistical formula. Below 68 any percentage measured is preliminary. At or above 68 the result is valid signal. Three supporting signals designed into the product: how many testers complete setup using the guided path, how many make 100 calls within their first week, how many contact support about onboarding in their first 7 days.",
        ],
      },
      {
        id: '05', title: "05  WHAT I'D DO DIFFERENTLY",
        bullets: [
          "The credit nudge only tracks spending. A user who makes a few calls in week one and then waits two weeks will never see the 80% nudge because their balance looks fine. The time based trigger needs a backend. That constraint should have been caught before writing the requirement, not after.",
          "I set the 68 person minimum before thinking about how those 68 people would actually be found. The sample size and the distribution plan need to be designed together. Not one after the other.",
          "A redesign without backend access can validate the user experience but not the product outcome. Next time I would define that boundary upfront and design the validation plan around it. What can be tested in the prototype, what needs the real system, and who needs to run which part.",
        ],
      },
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
    thinking: [
      ["Freshers skip roles because the titles look unfamiliar or intimidating.", "I spent two weeks designing around that idea. The title has nothing to do with it. The real block was having no way to check whether their background actually bridges to what the JD needs. When that became clear the KR changed, the scoring logic changed, the UX changed and the success criteria changed. Everything built up to that point got rebuilt around the correct problem."],
      ["AI scoring was the obvious choice because smarter output is better output.", "I thought about what happens when it fails. A fresher lands on the results page and sees a blank card where their explanation should be. That is the exact moment they are deciding whether this tool is worth anything. I rebuilt the scoring on pure math that runs instantly and never fails. The AI comes in quietly after the score is already there."],
      ["Saving marks by role ID was sufficient.", "Two separate questionnaire attempts represent two different versions of the same person at two different moments. The first mark captured what was reachable before they added a new skill. The second captured what became reachable after. Overwriting the first erases evidence of how they changed. I changed the system to keep both marks completely separate with their own frozen scores."],
      ["The dashboard reading from local storage was measuring the product.", "It was only counting sessions from that one device. A metric that only measures itself is not useful. The whole point is to see how the product is actually performing across all the people who tried it. I switched to shared storage so every tester's data pooled into one real number regardless of which device they used."],
      ["Mapping the entire emerging role market was necessary before building anything.", "18 roles was enough to prove the hypothesis. The scoring logic, the gap analysis, the KR validation. All of it works on 18 roles exactly the same way it would on 180. The MVP did not need the full market. It needed enough roles to show the system works. Hypothesis confirmed first. Scale comes after."],
    ],
    sections: [
      {
        id: '01', title: '01  THE GAP',
        bullets: [
          "Freshers are making two mistakes simultaneously. Skipping roles they could actually reach and applying to ones they have no shot at. Both mistakes come from the same place. No structured way to check whether their background actually bridges to what a role's JD actually needs.",
          "The original hypothesis was that freshers skip roles because the titles look unfamiliar. That drove two weeks of design work before it turned out to be wrong. A plain title can have a JD full of tools and experience a fresher has never touched. A complex title can have a JD that maps perfectly to what they already know. The title sends them in the wrong direction before they even read what the role actually needs.",
          "This is not a hypothetical problem. I watched it happen across freshers, juniors and seniors around me. Months spent trying to figure out which direction to go, which roles were actually reachable, which skills were worth learning and what would actually pay off. Nobody had a structured way to answer any of it. That pattern became the brief for this product.",
        ],
      },
      {
        id: '02', title: '02  THE CONSTRAINT',
        bullets: [
          "The product had no login by design. Not because login was considered and rejected but because the only thing that mattered was getting a fresher to their result as fast as possible. No friction between them and the answer. The constraint that showed up later was that every visit from a different device counted as a new person. The same fresher on their phone and laptop looked like two different testers. That breaks the denominator. I switched to persistent IDs tied to the browser so the same person always counts as one.",
          "If the scoring engine depended on AI there would be moments where the score simply did not arrive. A blank screen at the exact moment someone is deciding whether the tool is worth their time breaks the only trust moment that matters. The scoring runs on pure math instead. Instant. Never fails. AI only comes in after the score is already there.",
          "No existing data existed on what percentage of freshers would look at a structured gap analysis and say yes this role is actually reachable for me. The 35% target was set as an educated starting point. The 62 tester minimum exists because without enough people trying the tool any percentage shown is just noise.",
        ],
      },
      {
        id: '03', title: '03  THE DECISION',
        bullets: [
          "A simple score out of 100 tells you how much you bring to a role. It does not tell you whether you are actually reachable for it. I built four gates instead. Skill match determines the foundation. Background decides whether you land in Medium or High. Strong real work experience can push you up one level. Weak English on a role that requires communication caps you at Medium regardless of everything else. The tier comes from logic not just a number.",
          "Some testers do not have a Claude account and cannot access the AI explanation. A blank card where the explanation should be is the worst possible outcome at the moment someone is deciding if this is useful. I built a fallback that generates a real explanation from the actual skills that matched and the ones that are missing. Labeled honestly as rule based. The full experience works without any account at all.",
          "Once you fill the form and mark a role as reachable that snapshot is saved with the exact background you had at that moment. If you come back later with new skills and mark the same role again both marks stay. The first shows what was reachable then. The second shows what is reachable now. The history of how you grew is preserved, not overwritten. The tier filter works the same way. Single select only. One tier at a time.",
        ],
      },
      {
        id: '04', title: '04  THE OUTCOME',
        bullets: [
          "I hit the first KR. 35% of unique testers marked at least one role as relevant and reachable within two weeks of launch. I crossed the 62 tester minimum before calling the result valid. Below that number the dashboard marks the percentage as inconclusive. The result only counts once enough people have tried it to make it statistically meaningful.",
          "The formula behind the 62 number: one sample proportion test targeting 35% with a margin of error of plus or minus 10 percentage points at 90% confidence. Not an estimate. A specific calculation I made before writing a single line of code.",
          "Every tester gets a persistent ID so returning users count as the same person and not a new one. The denominator stays honest. The dashboard is passcode protected and tracks the KR live against the 62 tester floor. Every tester gets a real explanation of their results whether they have a Claude account or not. No blank cards ever.",
        ],
      },
      {
        id: '05', title: "05  WHAT I'D DO DIFFERENTLY",
        bullets: [
          "Experience is currently scored as a flat count. A six month internship at a real company and a weekend hackathon project both count as one experience type. They are not the same thing. The next version weights by what kind of experience it is, not just how many kinds there are. Five conversations with freshers from different backgrounds before locking the scoring would have shown this from the start.",
          "The 35% target was set because it felt like a meaningful threshold. But it was never tested against what would actually change if the number came back at 25% or 45%. The question to ask before setting any KR is what will be done differently depending on where the result lands. Answering that first makes the target mean something.",
          "I needed the entire emerging role market to do this properly but mapping all of it before building would have taken months. I proved the hypothesis on 18 roles first. The system works the same on 180 as it does on 18. Hypothesis confirmed first. Scale comes after.",
        ],
      },
    ],
  },
];

const GO_DEEPER = [
  {
    title: 'ROLEREACH',
    links: [
      { label: 'PM Thinking Doc', url: null },
      { label: 'PRD', url: null },
      { label: 'GitHub', url: 'https://github.com/kritipm/rolereach' },
    ],
  },
  {
    title: 'BOLNA STUDIO',
    links: [
      { label: 'PM Thinking Doc', url: null },
      { label: 'PRD', url: null },
      { label: 'GitHub', url: 'https://github.com/kritipm/bol-na-funnel' },
    ],
  },
  {
    title: 'REACHMAP',
    links: [
      { label: 'PM Thinking Doc', url: null },
      { label: 'PRD', url: null },
      { label: 'GitHub', url: 'https://github.com/kritipm/rolereachability-tool' },
    ],
  },
];

function HL({ text, hl }) {
  if (!hl || !text.includes(hl)) return <>{text}</>;
  const i = text.indexOf(hl);
  return (
    <>
      {text.slice(0, i)}
      <span style={{ color: C.accent }}>{hl}</span>
      {text.slice(i + hl.length)}
    </>
  );
}

function SectionCard({ sec, si }) {
  const [open, setOpen] = useState(false);
  const st = SECTION_STYLES[si];
  return (
    <div style={{ border: '1px solid ' + st.border + '44', marginBottom: 6 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', background: open ? st.bg : 'transparent', border: 'none', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderLeft: '3px solid ' + st.border }}
      >
        <span style={{ fontFamily: jb, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: st.border }}>{sec.title}</span>
        <span style={{ fontFamily: jb, fontSize: 14, color: st.border, flexShrink: 0, marginLeft: 16 }}>{open ? '-' : '+'}</span>
      </button>
      {open && (
        <div style={{ background: st.bg, padding: '0 24px 24px 27px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {sec.bullets.map((b, i) => (
            <p key={i} style={{ fontFamily: sg, fontSize: 15, color: C.textSecond, lineHeight: 1.85, paddingLeft: 16, borderLeft: '1px solid rgba(255,255,255,0.1)' }}>{b}</p>
          ))}
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

      <button
        onClick={onToggle}
        style={{ fontFamily: jb, fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '16px 28px', background: expanded ? C.surface : C.textPrimary, color: expanded ? C.textPrimary : C.bg, border: '2px solid ' + C.textPrimary, display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontWeight: 700, marginBottom: expanded ? 40 : 0, transition: 'background 0.2s, color 0.2s' }}
      >
        {expanded ? 'COLLAPSE DECISION LOG ↑' : 'READ THE DECISION LOG ↓'}
      </button>

      {expanded && (
        <div>
          <div style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.12)', padding: 36, marginBottom: 32 }}>
            <p style={{ fontFamily: jb, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.textPrimary, marginBottom: 32, fontWeight: 700 }}>
              THE PIVOT LOG
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
          </div>

          <p style={{ fontFamily: jb, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.textMuted, marginBottom: 16 }}>
            DECISION LOG
          </p>
          <div style={{ marginBottom: 40 }}>
            {project.sections.map((sec, si) => (
              <SectionCard key={sec.id} sec={sec} si={si} />
            ))}
          </div>

          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="h-live"
            style={{ fontFamily: jb, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '16px 36px', background: C.accent, color: C.textPrimary, border: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700 }}>
            SEE IT LIVE
          </a>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [expanded, setExpanded] = useState({ 0: false, 1: false, 2: false });
  const [heroIdx, setHeroIdx] = useState(0);
  const [heroVis, setHeroVis] = useState(true);
  const [heroDone, setHeroDone] = useState(false);
  const tabsRef = useRef(null);

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  useEffect(() => {
    if (heroDone) return;
    const id = setTimeout(() => {
      if (heroIdx < HERO_LINES.length - 1) {
        setHeroVis(false);
        setTimeout(() => {
          setHeroIdx(p => p + 1);
          setHeroVis(true);
        }, 480);
      } else {
        setHeroDone(true);
      }
    }, 6000);
    return () => clearTimeout(id);
  }, [heroIdx, heroDone]);

  const scrollToTabs = () =>
    tabsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

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

        <div style={{ minHeight: 'clamp(80px,10vw,140px)', marginBottom: 32 }}>
          <p
            className={'hero-fade ' + (heroVis ? 'hero-in' : 'hero-out')}
            style={{ fontFamily: sg, fontWeight: 600, fontSize: 'clamp(18px,2.5vw,30px)', color: C.textPrimary, lineHeight: 1.55, maxWidth: 760 }}
          >
            <HL text={HERO_LINES[heroIdx].text} hl={HERO_LINES[heroIdx].hl} />
          </p>
        </div>

        <p style={{ fontFamily: sg, fontWeight: 400, fontSize: 17, color: C.textSecond, letterSpacing: '0.02em', marginBottom: 56 }}>
          3 live products. Observed. Built. Iterated until it worked.
        </p>

        <div className="hero-ctas" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <button onClick={scrollToTabs} className="h-primary"
            style={{ fontFamily: sg, fontWeight: 700, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '16px 32px', background: C.textPrimary, color: C.bg, border: 'none' }}>
            SEE MY WORK
          </button>
          <a
            href="https://docs.google.com/document/d/1XNEAJEkzXqUM4FSw41wIWECK6ySPA7m3/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="h-ghost"
            style={{ fontFamily: sg, fontWeight: 700, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '16px 32px', background: 'transparent', color: C.textPrimary, border: '1px solid ' + C.textPrimary, display: 'inline-flex', alignItems: 'center' }}
          >
            READ CV
          </a>
        </div>
      </section>

      <div ref={tabsRef}>
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
              <ProjectPanel
                key={p.id}
                project={p}
                expanded={expanded[i]}
                onToggle={() => setExpanded(prev => ({ ...prev, [i]: !prev[i] }))}
              />
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
                      style={{ fontFamily: sg, fontSize: 14, color: C.textPrimary, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ color: C.accent, flexShrink: 0 }}>+</span>
                      {lk.label}
                    </a>
                  ) : (
                    <div key={lk.label} style={{ fontFamily: sg, fontSize: 14, color: C.textMuted, display: 'flex', alignItems: 'center', gap: 10, cursor: 'default' }}>
                      <span style={{ color: C.textMuted, flexShrink: 0 }}>+</span>
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
