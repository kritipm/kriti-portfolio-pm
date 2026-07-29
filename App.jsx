// v6
import { useState, useEffect, useRef } from 'react';

const C = {
  bg:          '#0A0A0A',
  surface:     '#111111',
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
  '@keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.35; transform:scale(.7); } }',
  '.pulse-dot { animation: pulse 1.6s ease-in-out infinite; }',
  '.hero-fade { transition: opacity .45s ease, transform .45s ease; }',
  '.hero-in { opacity:1; transform:translateY(0); }',
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
  '@media (max-width: 768px) {',
  '  body, html { overflow-x: hidden; max-width: 100vw; }',
  '  .tabs-container { overflow-x: auto !important; -webkit-overflow-scrolling: touch; scrollbar-width: none; }',
  '  .tabs-container::-webkit-scrollbar { display: none; }',
  '  .go-deeper-grid { grid-template-columns: 1fr !important; gap: 12px !important; }',
  '  .hero-ctas { flex-direction: column !important; width: 100%; }',
  '  .hero-ctas button, .hero-ctas a { width: 100%; text-align: center; justify-content: center; }',
  '  .contact-items { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }',
  '  button, a { min-height: 44px; display: inline-flex; align-items: center; }',
  '}',
].join('\n');

const HERO_LINES = [
  { text: 'Identified the drop-off in PM job search. Built an autonomous pipeline to close it.', hl: 'autonomous pipeline' },
  { text: 'Diagnosed where B2B onboarding was losing activation. Redesigned the flow.', hl: 'activation' },
  { text: 'Freshers were skipping reachable roles. Built a scoring system to show the gap.', hl: 'scoring system' },
];

const PROJECTS = [
  {
    id: 0,
    tab: 'AUTOMATED THE SEARCH',
    heading: 'PM Job Search Outreach Agent',
    tagline: 'Scrapes PM roles across five platforms daily. Drafts cold outreach in my exact voice. Delivers to Telegram at 8am. Live dashboard shows contact resolution, source performance, and funnel in real time.',
    metric: '51 roles in one run. 23 with hiring manager emails. 15 drafts ready to send. Rs.0/month.',
    tags: ['AI-native tooling', 'Systems thinking'],
    liveUrl: 'https://rolereach-production.up.railway.app',
    sections: [
      {
        id: '01', title: '01  THE GAP',
        bullets: [
          "Every morning started the same way. Open five websites. Scroll through hundreds of job posts. Copy each interesting one into a spreadsheet by hand. Then try to figure out who at that company actually does the hiring. Then write an email to that person from scratch. By the time all of that was done two hours were already gone and not a single application had actually been sent yet.",
          "When I don't know anyone in the industry the only way to get noticed is to reach out to enough people that some of them write back. That only works if I'm sending a lot of outreach. And I can't send a lot when I'm spending two hours just finding who to reach out to.",
          "When the manual process broke it didn't slow down. It stopped completely. No roles found means no emails sent. No emails sent means no interviews. There was no backup option. Either the system works or nothing moves.",
          "One morning it became clear. Trying harder at this process was never going to fix it. The process itself needed to not exist anymore.",
        ],
      },
      {
        id: '02', title: '02  THE CONSTRAINT',
        bullets: [
          "The first thing to check was whether a tool already existed for this. Turns out all the good ones cost money. Every single one. Even running a computer program that stays on all day to check for new jobs costs money when it is just sitting there doing nothing between checks. The only option was to build something that works completely for free. Not for a month. Not on a trial. Forever.",
          "Every test of this thing used real job listings at real companies. When something broke it wasn't just a technical problem to fix later. It was a real job opportunity that slipped by while the fix was happening. That is a very different feeling from breaking something in a practice exercise.",
          "The moment this felt finished was actually the moment it showed it wasn't. Making a program that wakes itself up every morning at 8am searches for jobs finds contact emails writes outreach and delivers everything without paying for it to sit idle all day turned out to need a completely different setup than what existed. Patched it. Held breath. First morning it worked everything arrived exactly as it should have.",
        ],
      },
      {
        id: '03', title: '03  THE DECISION',
        bullets: [
          "A spreadsheet felt like the obvious starting point. Then I thought about what a spreadsheet actually does. It holds information that a person put into it. It doesn't find the jobs. It doesn't find the contact. It doesn't write the email. It just sits there waiting for a person to do all the work first. I built a system that does all of that instead and the system itself became proof of exactly the thinking that product management jobs ask about.",
          "The first version delivered everything through a chat app. Worked perfectly from a technical standpoint. Then I actually tried to use it. Fifty one jobs showed up as a wall of text in a chat conversation with no way to see which ones had a contact email no way to know which ones to act on first no structure at all. I built a proper dashboard instead. A sorted list of who to contact today. What contact information exists. How the whole effort is performing over time.",
          "WhatsApp felt like the natural place to receive a morning summary because everyone is already there. Then I found out that to send automated messages through WhatsApp every single message template needs to be approved in advance by the company that owns WhatsApp. And the permission to send expires every day and needs to be renewed. Either of those alone would have stopped this before it started. Switched to a different messaging app that has no such restrictions.",
          "There are companies that will find anyone's work email for you. They all charge money. I found a free version of the same service that has a daily limit on how many emails it will look up. Set up three separate accounts and spread the lookups across all three. Same number of emails found. Zero cost.",
          "Keeping a computer program running all day just to do one thing in the morning is like leaving all the lights in your house on all night to use them for one hour. I set it up to only switch on when needed do the work in 37 minutes and switch off again. Costs nothing in between.",
          "It would have been easy to make this fully automatic. Find jobs write emails send emails all without anyone checking anything. I decided against it. An email going out to a real person at a real company without anyone reading it first is not a smart system. It is a fast way to make a bad impression at scale. Every email gets written and prepared then waits for one human check before it goes anywhere.",
          "The emails sound like me because before the program writes anything it gets given a very specific list of rules about how I write. What the subject line looks like. How the email ends. Whether to attach the CV. How to handle questions about salary. The program follows those rules every time. The result sounds like a person wrote it because the rules that define how that person writes were set before a single word got generated.",
        ],
      },
      {
        id: '04', title: '04  THE OUTCOME',
        bullets: [
          "First full run came back with 51 PM roles found across five different websites in one go. Real listings. Real companies. The system working exactly as designed.",
          "Of those 51 roles 23 had a named hiring manager email attached to them. Those 23 showed up at the top of the dashboard with a clear signal to act on them today. Not just a list of jobs. A list of people to email with their email addresses already found and attached.",
          "15 emails already written and waiting in the dashboard. Already in my tone. Already following my rules for subject lines and closings. Nothing to fix or rewrite. Just read decide and send.",
          "The whole thing costs nothing to run every month. Every part of it. Finding jobs finding emails writing outreach scheduling delivering the morning summary. Designed from the start to cost nothing forever.",
          "From the moment the morning schedule kicks in to the moment the summary arrives: 37 minutes. The same 37 minutes the old process spent just opening websites and starting to scroll.",
          "Everything is visible and live at rolereach-production.up.railway.app. The number this whole system is trying to move is simple. How many people write back for every hundred emails sent out. The moment that first reply comes in through the pipeline that is when the experiment becomes real.",
        ],
      },
      {
        id: '05', title: "05  WHAT I'D DO DIFFERENTLY",
        bullets: [
          "Two parts of the system went live without the email finding step connected to them. Jobs came back from those two parts with no way to reach anyone at the companies. The fix already existed. It just never got connected. Before building any individual piece next time the whole journey from finding a job to having a sendable email needs to be drawn out completely first. Every step confirmed. Then build.",
          "I started with the source that felt like it would have the most jobs. Turned out two smaller websites were actually returning more of the right kind of jobs per search. A few days of checking each source manually before building anything would have shown that. The most useful ones should get built first.",
          "I assumed the setup for finding emails would keep working at the same rate forever. There is actually a daily limit on how many emails each account can look up. Knowing that number before designing the system would have made the whole thing easier to get right from the start.",
        ],
      },
    ],
    thinking: [
      ["When 51 jobs arrived in Telegram the hard part was over.", "51 unstructured job titles in a row with no contact info visible and no way to prioritise was not a product. It was a log file. Built the dashboard the next day because the delivery working and the experience working are two completely different things."],
      ["Full automation was the natural endpoint.", "Emails going to real hiring managers without anyone reading them first is not efficiency. It is a fast way to make a bad impression at scale before any relationship exists. The human review gate stayed in on purpose. Not as a safety net. As a product decision about what trustworthy actually looks like."],
      ["Professional sounding email drafts were the right output.", "Professional also sounds exactly like every other candidate in the inbox. Voice is not a tone instruction. It is a set of specific rules. Writing those rules down before the system generates anything is what makes the output sound like a specific person instead of a template."],
      ["Building each piece well was enough.", "Two parts went live missing the email finding step even though the step already existed. What it actually needed was for the whole chain from finding a job to having a sendable email to be confirmed end to end before anything got built. Pieces that work in isolation do not automatically connect."],
    ],
  },
  {
    id: 1,
    tab: 'FIXED THE ONBOARDING',
    heading: 'Bolna Onboarding Activation Funnel',
    tagline: '75% of Bolna revenue depends on activation. The path to first live call was taking 30 minutes and producing zero working demos. Redesigned to get any business owner to first live call in under 10 minutes self-served.',
    metric: '30 min broken baseline. 10 min target. 75% revenue dependency. Sent unsolicited to founding team.',
    tags: ['B2B PLG', 'Activation design'],
    liveUrl: 'https://bol-na-funnel.vercel.app',
    sections: [
      {
        id: '01', title: '01  THE GAP',
        bullets: [
          "Bolna lets business owners across India build AI calling agents that handle bookings reminders and customer follow ups without writing any code. The product works. The problem was getting people to actually use it for the first time.",
          "75 percent of Bolna's revenue comes from business owners who complete setup and make their first real call. The path to that first call was taking over 30 minutes and producing zero working demos. That is the entire business sitting on a broken step.",
          "A business owner who signed up would land inside a screen full of settings like tts provider and buffer size and temperature. These are engineering terms. A bakery owner or a clinic manager does not know what temperature means in the context of a phone call. They were being asked to make technical decisions about a product they had never heard work.",
          "The chat test that was supposed to let people try the agent before committing was stuck on a loading spinner. The templates that were supposed to make setup easier never appeared on screen even though support confirmed they existed. People were being asked to trust a product that had not yet done anything to earn that trust.",
        ],
      },
      {
        id: '02', title: '02  THE CONSTRAINT',
        bullets: [
          "I built this as a single page with no backend server. That meant two things from the PRD could not be built properly. The ability to pick up where you left off if you closed the browser. And a nudge that fires based on how many days you have been using your free credit. Both of those need a server to track information over time. Both are named as limitations in the design document rather than quietly left out.",
          "There was no access to Bolna's real data about how many people were dropping off or where. The target of getting 90 percent of testers to their first live call in under 10 minutes was set using the most cautious assumption possible because there was no existing number to build from.",
          "Inbound calls turn out to need a completely separate setup process. Including them would have meant building two parallel journeys at once and solving two different problems at the same time. I kept the focus on outbound only because that is where the activation problem actually lives.",
        ],
      },
      {
        id: '03', title: '03  THE DECISION',
        bullets: [
          "The original design puts voice selection halfway through the setup after several other fields. Voice is the first moment a business owner actually hears what they are building. Asking someone to configure settings for a product they have never heard speak is like asking someone to decorate a house they have never walked into. I moved voice to the very first step. Hear it before touching anything else.",
          "The first version had two separate modes. A simple mode for non technical users and an advanced mode for people who want more control. The problem with that is someone has to decide which type of person they are before they have seen anything. I replaced both modes with one single experience where every technical detail is hidden behind a small toggle on each field. The simple experience is the default. The depth is always one tap away.",
          "The question of what happens when the agent cannot answer something only appeared in the original flow when the system failed to understand what a user was trying to build. That meant most people never made that decision at all. Their agent went into the demo without anyone having chosen what it does when it gets stuck. I made it a required step for every single agent. The demo now shows that decision actually working.",
          "There was a version of this project that included rewriting Bolna's entire landing page. The landing page has problems but they are marketing problems. The place where people are actually stopping is inside the product after they have already signed up. Fixing the page before fixing the product would have been solving the wrong problem first.",
          "The original demo played through every scenario one after another in a single run. If a business owner wanted to check how the agent handles one specific situation they had to sit through the whole thing to get there. I added individual play buttons to each scenario. Check any one by itself without running everything.",
          "A notification toast that fires to tell you how much free credit you have used is only useful if you happen to be looking at the screen when it appears. I added a permanent badge in the top bar that always shows where you stand regardless of which step you are currently on.",
          "Lifecycle emails that re engage people who have not activated yet were in the original scope. Re engagement only works on people who have already got something out of the product. Sending emails to people who never made it to their first call is trying to bring back someone who was never there to begin with. I left them out entirely.",
          "The second version of this design had a sidebar with eight tabs matching the way Bolna's existing product is structured. That structure makes sense for someone who already knows the product and needs to move between different sections. It makes no sense for someone doing this for the first time. I replaced it with a single scrollable room where everything happens in order. All the advanced features are still accessible behind one menu icon. They are just never in the way.",
        ],
      },
      {
        id: '04', title: '04  THE OUTCOME',
        bullets: [
          "The finished prototype was sent directly to Bolna's founding team with a live link. Nobody asked for it. I built it and sent it because the problem was real and the solution was ready.",
          "The target this design is built to hit: 90 percent of a group of 68 first time users reach a working live call in under 10 minutes without any help. The baseline to beat: over 30 minutes and zero working demos in the existing flow.",
          "The minimum of 68 testers was set using a statistical formula that makes the result meaningful rather than just a number that depends on who happened to try it that day.",
          "Supporting signals designed into the product: how many testers complete setup using the guided path. How many make 100 calls within their first week. How many contact support about onboarding in their first 7 days.",
        ],
      },
      {
        id: '05', title: "05  WHAT I'D DO DIFFERENTLY",
        bullets: [
          "The credit nudge in the PRD fires when someone has used 50 percent and again at 80 percent of their free credit. It also needs to fire based on how many days have passed since signup. The version that got built only tracks spending. A business owner who makes a few calls in week one and then waits two weeks before deciding will never see the 80 percent nudge because their balance looks fine. Building the time based trigger needs a backend. The constraint should have been caught before writing the requirement not after the build was done.",
          "The 68 person minimum was set before thinking about how those 68 people would actually be found. A distribution plan and a KR should be designed together. The number of testers needed changes depending on who is available to test.",
          "I assumed the loading spinner on the chat test was a known issue that Bolna was already aware of. I should have tested it across three different browsers documented exactly what happened and confirmed with support before treating it as established fact in the design.",
        ],
      },
    ],
    thinking: [
      ["A sidebar with eight tabs matching Bolna's structure was the responsible choice.", "A business owner doing this for the first time does not need eight tabs. They need to do one thing. Everything else is a distraction. Replacing the sidebar with a single room where everything happens in sequence was not a simplification. It was the actual solution to the actual problem."],
      ["Voice selection belonged inside the audio settings section.", "Hearing your agent speak for the first time is not a configuration step. It is the moment the product becomes real. Putting that moment halfway through technical fields asks someone to care about settings for something they have not yet felt. Trust starts the moment something works not the moment setup is complete."],
      ["The safety net question was optional for users whose goals matched existing templates.", "Those users never made an explicit decision about what their agent does when it cannot answer something. Their agent went into the demo carrying an implicit assumption nobody had chosen. Making it required meant the demo could show that decision working in real time rather than just showing the happy path."],
      ["Lifecycle emails were a responsible thing to include because re engagement is a real growth problem.", "Those emails would be sent to people who never made it to their first call. Trying to bring someone back when they were never fully there is solving a downstream symptom. Fix the activation problem first. The retention problem changes when the activation problem is solved."],
    ],
  },
  {
    id: 2,
    tab: 'MAPPED THE GAP',
    heading: 'Emerging Roles Reachability Tool for Freshers',
    tagline: 'Live product. First KR hit. 35% of testers marked at least one role reachable within two weeks. Built a scoring system, shipped it, validated it against a statistically defensible minimum.',
    metric: '35% KR validated. 62-tester minimum crossed. One sample proportion. 90% confidence. Rs.0.',
    tags: ['Hypothesis-driven PM', 'Metrics design'],
    liveUrl: 'https://rolereachability-tool.vercel.app',
    sections: [
      {
        id: '01', title: '01  THE GAP',
        bullets: [
          "A fresher sees a job title they don't recognise and scrolls past it. No second look. The assumption is automatic. That role is not for me. But that assumption was never actually checked against anything real. It was just a feeling.",
          "The original idea behind this tool was that freshers skip roles with fancy or unfamiliar titles. That seemed like the right problem. It was wrong. The title has nothing to do with it. A simple plain title can be a role that requires years of experience. A complex unfamiliar title can be completely within reach. What actually determines reachability has nothing to do with how the title sounds.",
          "The real problem is that there is no structured way for a fresher to check whether their background actually bridges to a role. So they guess. And guessing in both directions means missing roles they could get and chasing roles they cannot.",
          "This is not a hypothetical problem. I spent nine months in a role that turned out to be completely different from what was expected. That experience became the brief for this product.",
        ],
      },
      {
        id: '02', title: '02  THE CONSTRAINT',
        bullets: [
          "Asking someone to create an account before showing them anything useful is asking them to trust me before I have done anything to earn it. A fresher exploring whether a role is even possible for them is not going to sign up first. No login was the only option. That one decision shaped everything else about how the product works.",
          "AI systems are powerful but they are also slow and unpredictable. If the core scoring engine depended on an AI to give each person their result there would be moments where the score simply did not arrive. A blank screen at the exact moment someone is deciding whether the tool is worth their time breaks the only trust moment that matters. The scoring runs on pure math instead. The AI only comes in after the score is already showing.",
          "There was no existing data on what percentage of freshers would look at a structured gap analysis and say yes this role is actually reachable for me. The 35 percent target was set as an educated starting point. The 62 tester minimum exists because without enough people trying the tool any percentage shown is just noise.",
        ],
      },
      {
        id: '03', title: '03  THE DECISION',
        bullets: [
          "The first instinct was to let AI generate the scores. Smarter results. More personalised. But AI takes time and sometimes fails completely. A fresher waiting five seconds for a score that never loads has already decided the tool is broken. Pure math instead. Skills 30 percent plus Experience 30 percent plus Background 20 percent plus Communication 20 percent. Runs instantly every time. Never fails. The AI only handles the explanation that appears after the score is already there.",
          "A simple score out of 100 tells you how much you bring to a role. It does not tell you whether you are actually reachable for it. I built four gates instead. Skill match determines the foundation. Background decides whether you land in Medium or High. Strong real work experience can push you up one level. Weak English on a role that requires a lot of communication caps you at Medium regardless of everything else. The tier comes from logic not just a number.",
          "Some testers do not have a Claude account and cannot access the AI explanation. A blank card where the explanation should be is the worst possible outcome at the moment someone is deciding if this is useful. I built a fallback that generates a real explanation from the actual skills that matched and the actual skills that are missing. Labeled honestly as a rule based explanation. A link to try the AI version sits right next to it. The full experience works without any account at all.",
          "When the same role gets marked as relevant across two different questionnaire attempts the original design would silently overwrite the first mark with the second one. But two attempts are two different snapshots of the same person at two different moments. The first mark captured what was reachable then. The second captures what is reachable now. Both matter. I changed the system to keep them completely separate.",
          "The dashboard that tracks how many testers have marked a role as reachable was originally reading only from the device it was being viewed on. A dashboard that only shows data from one device is not measuring the product. It is measuring that one device. I switched to shared storage that pools results from every tester everywhere so the number on the dashboard is the real number.",
          "The filter that lets testers sort roles by tier was originally a multi select. You could look at High and Medium at the same time. That sounds more powerful but it creates a comparison task when what a fresher actually needs is focus. I changed it to single select. Pick one tier. See what is in it. Clear and simple.",
        ],
      },
      {
        id: '04', title: '04  THE OUTCOME',
        bullets: [
          "The product is live and being tested. First KR hit. 35 percent of unique testers marked at least one role as relevant and reachable within two weeks of launch.",
          "The 62 tester minimum was crossed before calling the result valid. Below that number the percentage shown in the dashboard is marked as inconclusive. The result only counts once enough people have tried it to make it statistically meaningful.",
          "The formula behind the 62 number: one sample proportion test targeting 35 percent with a margin of error of plus or minus 10 percentage points at 90 percent confidence. Not an estimate. A specific calculation made before a single line of code was written.",
          "Every tester gets a persistent ID on their first visit so if they come back they count as the same person not a new one. The denominator stays honest.",
          "The dashboard is passcode protected and not visible to testers. It tracks the KR percentage live against the 62 tester floor and shows exactly where things stand.",
          "Every tester gets a real explanation of their results whether they have a Claude account or not. The AI version loads quietly in the background after the score appears. If it fails the rule based version is already there. No blank cards ever.",
        ],
      },
      {
        id: '05', title: "05  WHAT I'D DO DIFFERENTLY",
        bullets: [
          "Experience is currently scored as a flat count. Zero types of experience gets a low score. One type gets a medium score. Two or more gets a high score. But a six month internship at a real company and a weekend hackathon project are not the same thing even if they both count as one experience type. The next version weights by what kind of experience it is not just how many kinds there are. Five conversations with freshers from different experience backgrounds before locking the scoring would have shown this from the start.",
          "The 35 percent target was set because it felt like a meaningful threshold. A third of testers finding at least one reachable role seems like strong signal. But it was never tested against what would actually change if the number came back at 25 percent instead or 45 percent. The question to ask before setting any KR is what will be done differently depending on where the result lands. Answering that question first makes the target mean something.",
          "The original hypothesis that freshers skip roles with fancy titles drove two weeks of design work before it turned out to be wrong. The actual problem was the absence of any structured way to assess fit not the title. Five conversations with real freshers asking one simple question before any design started would have revealed this before a single screen was built.",
        ],
      },
    ],
    thinking: [
      ["Freshers skip roles because the titles look unfamiliar or intimidating.", "Spent two weeks designing around that idea. Title has nothing to do with it. The real block was having no way to check. When that became clear the KR changed the scoring logic changed the UX changed and the success criteria changed. Everything built up to that point got rebuilt around the correct problem."],
      ["AI scoring was the obvious choice because smarter output is better output.", "Thought about what happens when it fails. A fresher lands on the results page and sees a blank card where their explanation should be. That is the exact moment they are deciding whether this tool is worth anything. Rebuilt the scoring on pure math that runs instantly and never fails. The AI comes in quietly after the score is already there."],
      ["Saving marks by role ID was sufficient.", "Two separate questionnaire attempts represent two different versions of the same person at two different moments. The first mark captured what was reachable before they added a new skill. The second captured what became reachable after. Overwriting the first erases evidence of how they changed. Changed the system to keep both marks completely separate with their own frozen scores."],
      ["The dashboard reading from local storage was measuring the product.", "It was only counting sessions from that one device. A metric that only measures itself is not useful. The whole point is to see how the product is actually performing across all the people who tried it. Switched to shared storage so every tester's data pooled into one real number regardless of which device they used."],
    ],
  },
];

const GO_DEEPER = [
  {
    title: 'PM JOB SEARCH\nOUTREACH AGENT',
    links: [
      { label: 'PM Thinking Doc', url: 'https://docs.google.com/document/d/17sGTRD6TvpI1_oLnJlFLZbBKO-jl1BXh/edit' },
      { label: 'PRD', url: 'https://docs.google.com/document/d/1ozcW0V6NE2ELUrbU2734ExDDlTQO62ZI/edit' },
      { label: 'GitHub', url: 'https://github.com/kritipm/rolereach' },
    ],
  },
  {
    title: 'BOLNA ONBOARDING\nACTIVATION FUNNEL',
    links: [
      { label: 'PM Thinking Doc', url: 'https://docs.google.com/document/d/1MEp-lKaTyklciafv483b2PnQPriQVZgI/edit' },
      { label: 'PRD', url: 'https://docs.google.com/document/d/1HIvWNhVei1YwPnGp2NhPox_wNm8YWYh_/edit' },
      { label: 'GitHub', url: 'https://github.com/kritipm/bol-na-funnel' },
    ],
  },
  {
    title: 'EMERGING ROLES\nREACHABILITY TOOL',
    links: [
      { label: 'PM Thinking Doc', url: 'https://docs.google.com/document/d/1l_fSMhQqYl140lloQqYlin2U2W7jsLOu/edit' },
      { label: 'PRD', url: 'https://docs.google.com/document/d/1PhvRRkVrqLDsvnPJ0quQBYw2b5fss7aP/edit' },
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

function ProjectPanel({ project, expanded, onToggle }) {
  const bd = '1px solid ' + C.border;
  return (
    <div style={{ paddingTop: 64 }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 32, flexWrap: 'wrap', marginBottom: 28 }}>
        <div style={{ flex: 1, minWidth: 260 }}>
          <h2 style={{ fontFamily: sg, fontWeight: 700, fontSize: 'clamp(26px,3.5vw,44px)', color: C.textPrimary, lineHeight: 1.1, marginBottom: 16 }}>
            {project.heading}
          </h2>
          <p style={{ fontFamily: sg, fontSize: 17, color: C.textSecond, lineHeight: 1.8, maxWidth: 620, marginBottom: 18 }}>
            {project.tagline}
          </p>
          <p style={{ fontFamily: jb, fontSize: 13, color: C.accent, lineHeight: 1.6, marginBottom: 20 }}>
            {project.metric}
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {project.tags.map(t => (
              <span key={t} style={{ fontFamily: jb, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.textSecond, border: bd, padding: '5px 12px' }}>
                {t}
              </span>
            ))}
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 40 }}>
            {project.sections.map((sec, si) => (
              <div key={sec.id} style={{ background: SECTION_STYLES[si].bg, borderLeft: '3px solid ' + SECTION_STYLES[si].border, padding: '24px 28px' }}>
                <p style={{ fontFamily: jb, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: SECTION_STYLES[si].border, marginBottom: 20 }}>
                  {sec.title}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {sec.bullets.map((b, i) => (
                    <p key={i} style={{ fontFamily: sg, fontSize: 15, color: C.textSecond, lineHeight: 1.85, paddingLeft: 16, borderLeft: '1px solid rgba(255,255,255,0.12)' }}>{b}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.12)', padding: 36, marginBottom: 36 }}>
            <p style={{ fontFamily: jb, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.textPrimary, marginBottom: 32, fontWeight: 700, letterSpacing: '0.2em' }}>
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
  const tabsRef = useRef(null);

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setHeroVis(false);
      setTimeout(() => {
        setHeroIdx(p => (p + 1) % HERO_LINES.length);
        setHeroVis(true);
      }, 480);
    }, 4000);
    return () => clearInterval(id);
  }, []);

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

        <div style={{ minHeight: 'clamp(60px,8vw,100px)', marginBottom: 32 }}>
          <p
            className={'hero-fade ' + (heroVis ? 'hero-in' : 'hero-out')}
            style={{ fontFamily: sg, fontWeight: 600, fontSize: 'clamp(22px,3vw,38px)', color: C.textPrimary, lineHeight: 1.4, maxWidth: 720 }}
          >
            <HL text={HERO_LINES[heroIdx].text} hl={HERO_LINES[heroIdx].hl} />
          </p>
        </div>

        <p style={{ fontFamily: sg, fontWeight: 400, fontSize: 17, color: C.textSecond, letterSpacing: '0.02em', marginBottom: 56 }}>
          3 live products. Every decision documented.
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
              <p style={{ fontFamily: jb, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.textSecond, marginBottom: 22, lineHeight: 1.65, whiteSpace: 'pre-line' }}>
                {card.title}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {card.links.map(lk => (
                  <a key={lk.label} href={lk.url} target="_blank" rel="noopener noreferrer" className="h-link"
                    style={{ fontFamily: sg, fontSize: 15, color: C.textPrimary, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: C.accent, flexShrink: 0, fontSize: 18 }}>+</span>
                    {lk.label}
                  </a>
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
          Last updated — Portfolio July 2026.
        </p>
      </footer>

    </div>
  );
}
