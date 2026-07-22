import { useState, useEffect, useRef } from 'react';

/* ── DESIGN TOKENS ─────────────────────────────────────────── */
const C = {
  bg:          '#0A0A0A',
  surface:     '#111111',
  card:        '#161616',
  accent:      '#E63946',
  textPrimary: '#F5F5F5',
  textSecond:  '#888888',
  textMuted:   '#444444',
  border:      'rgba(255,255,255,0.06)',
  green:       '#22C55E',
};
const sg = "'Space Grotesk', sans-serif";
const jb = "'JetBrains Mono', monospace";

/* ── GLOBAL CSS ────────────────────────────────────────────── */
const GLOBAL_CSS = `
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; }
  body {
    background:${C.bg};
    color:${C.textPrimary};
    font-family:${sg};
    -webkit-font-smoothing:antialiased;
    overflow-x:hidden;
  }
  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-track { background:${C.bg}; }
  ::-webkit-scrollbar-thumb { background:${C.textMuted}; border-radius:2px; }

  @keyframes pulse {
    0%,100% { opacity:1; transform:scale(1); }
    50%      { opacity:.35; transform:scale(.7); }
  }
  .pulse-dot { animation: pulse 1.6s ease-in-out infinite; }

  .hero-fade { transition: opacity .45s ease, transform .45s ease; }
  .hero-in   { opacity:1; transform:translateY(0); }
  .hero-out  { opacity:0; transform:translateY(-14px); pointer-events:none; }

  /* button / link hover classes */
  .h-primary { cursor:pointer; transition:background .2s,color .2s; }
  .h-primary:hover { background:${C.accent} !important; color:${C.textPrimary} !important; }

  .h-ghost { cursor:pointer; transition:border-color .2s,color .2s; text-decoration:none; }
  .h-ghost:hover { border-color:${C.accent} !important; color:${C.accent} !important; }

  .h-live { cursor:pointer; transition:background .2s,color .2s,border-color .2s; text-decoration:none; }
  .h-live:hover { background:${C.accent} !important; color:${C.textPrimary} !important; border-color:${C.accent} !important; }

  .h-log { cursor:pointer; transition:border-color .2s,color .2s; }
  .h-log:hover { border-color:${C.textSecond} !important; color:${C.textPrimary} !important; }

  .h-tab { cursor:pointer; transition:color .2s; }
  .h-tab:hover { color:${C.textPrimary} !important; }

  .h-link { transition:color .2s; text-decoration:none; }
  .h-link:hover { color:${C.accent} !important; }

  /* ── THREE: RESPONSIVE ─────────────────────────────────── */
  @media (max-width: 768px) {
    body, html {
      overflow-x: hidden;
      max-width: 100vw;
    }

    /* Tabs scroll horizontally, hide scrollbar */
    .tabs-container {
      overflow-x: auto !important;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .tabs-container::-webkit-scrollbar {
      display: none;
    }

    /* Go Deeper — single column */
    .go-deeper-grid {
      grid-template-columns: 1fr !important;
      gap: 12px !important;
    }

    /* Hero CTAs — stack full width */
    .hero-ctas {
      flex-direction: column !important;
      width: 100%;
    }
    .hero-ctas button,
    .hero-ctas a {
      width: 100%;
      text-align: center;
      justify-content: center;
    }

    /* Contact — already column, ensure alignment */
    .contact-items {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 20px !important;
    }

    /* Minimum tap target */
    button, a {
      min-height: 44px;
      display: inline-flex;
      align-items: center;
    }
  }
`;

/* ── CONTENT ───────────────────────────────────────────────── */
const HERO_LINES = [
  {
    text: 'Identified the drop-off in PM job search. Built an autonomous pipeline to close it.',
    hl:   'autonomous pipeline',
  },
  {
    text: 'Diagnosed where B2B onboarding was losing activation. Redesigned the flow.',
    hl:   'activation',
  },
  {
    text: 'Freshers were skipping reachable roles. Built a scoring system to show the gap.',
    hl:   'scoring system',
  },
];

const PROJECTS = [
  /* ── PROJECT 1 ─────────────────────────────────────────── */
  {
    id: 0,
    tab:     'AUTOMATED THE SEARCH',
    heading: 'PM Job Search Outreach Agent',
    tagline: 'Scrapes PM roles across five platforms daily. Drafts cold outreach in her exact voice. Delivers to Telegram at 8am. Live dashboard shows contact resolution, source performance, and funnel in real time.',
    metric:  '70% of reachable PM opportunities captured daily · 15 drafts in my voice · ₹0/month',
    tags:    ['AI-native tooling', 'Systems thinking'],
    liveUrl: 'https://rolereach-production.up.railway.app',
    sections: [
      {
        id: '01', title: '01  THE GAP',
        bullets: [
          'Every morning started with 2-3 hours across five platforms. Searching, copy-pasting, hunting emails one by one, writing cold emails from scratch.',
          "The real problem wasn't time. For a PM with no referral network and no alumni chain, outreach volume is the only lever that exists.",
          'Manual process broke down daily. Not just hours lost. The pipeline dried up. A dry pipeline means no interviews.',
          "No fallback network existed. The system had to be built because waiting for referrals wasn't a strategy that existed.",
        ],
      },
      {
        id: '02', title: '02  THE CONSTRAINT',
        bullets: [
          'Zero budget permanently. Not a free trial. Hunter.io, Apollo, Lusha, residential proxies, always-on hosting — all ruled out before a single line was written.',
          "Pipeline ran on real opportunities with real stakes. If it misfired it wasn't a test failure. It was a missed PM role.",
          'Building for yourself with real consequences is a different kind of pressure than building for a hypothetical user.',
          "Hardest moment: pipeline felt complete then wasn't. GitHub Actions retrofitted as scheduling layer. Rebuild or ship. Answer was ship.",
        ],
      },
      {
        id: '03', title: '03  THE DECISION',
        bullets: [
          "Autonomous pipeline over job aggregator spreadsheet. Spreadsheet needs daily manual input. Doesn't scale.",
          'Dashboard over Telegram as primary interface. 51 jobs in a chat thread is noise. Built full triage product on top.',
          'Telegram over WhatsApp. Session window expires every 24 hours. Template approval required. Both would have killed the pipeline before first email sent.',
          '3-account Snov.io rotation over Hunter.io. Three free-tier accounts at ₹0/month. No drop in requirement.',
          'GitHub Actions over always-on server. Runs on trigger. 37 minutes. Costs nothing between cycles.',
          'Human review gate kept. A pipeline that sends without review is a risk not a tool.',
          'Claude API with locked conventions. Voice hard-coded at API layer before model sees a single job.',
        ],
      },
      {
        id: '04', title: '04  THE OUTCOME',
        bullets: [
          '51 PM roles in a single confirmed run across five sources.',
          '23 with named hiring manager emails. ACT NOW in dashboard.',
          '15 cold email drafts in her voice. Ready to send.',
          '₹0/month running cost.',
          '37 minutes end-to-end.',
          'Live dashboard permanently.',
          'Validation metric: interview rate per 100 outreach emails.',
        ],
      },
      {
        id: '05', title: "05  WHAT I'D DO DIFFERENTLY",
        bullets: [
          'Shipped two scrapers without contact enrichment. Would map full dependency chain before writing first scraper.',
          'Assumed Google Jobs was highest yield. Would run 3-day manual audit first.',
          'Assumed Snov.io rotation would cover gaps. Would verify free-tier limits before architecting rotation.',
        ],
      },
    ],
    thinking: [
      ['Telegram delivery felt complete.',        '51 jobs in a chat thread is noise. Built full triage dashboard. ACT NOW prioritisation. Contact resolution at a glance.'],
      ['Full automation was the obvious goal.',    'A pipeline that sends without review is a risk not a tool. Human review gate kept deliberately.'],
      ['Professional sounding drafts felt right.','Professional is generic. Locked every convention at API layer.'],
      ['WhatsApp felt natural.',                  'Session window expires every 24 hours. Switched to Telegram before writing a line of code.'],
      ['Pipeline felt complete after scraping.',  'Two scrapers shipped without enrichment. Dependencies mapped after not before.'],
    ],
  },

  /* ── PROJECT 2 ─────────────────────────────────────────── */
  {
    id: 1,
    tab:     'FIXED THE ONBOARDING',
    heading: 'Bolna Onboarding Activation Funnel',
    tagline: '75% of Bolna revenue depends on activation. Existing flow took 30 minutes and produced zero working demos. Redesigned to get any business owner to first live call in under 15 minutes self-served.',
    metric:  '30 min broken baseline → 15 min target · 75% revenue dependency · Self-serve',
    tags:    ['B2B PLG', 'Activation design'],
    liveUrl: 'https://bol-na-funnel.vercel.app',
    sections: [
      {
        id: '01', title: '01  THE GAP',
        bullets: [
          "Bolna's core product works. Business operators across India can build AI calling agents without writing code.",
          '75% of revenue comes from operators activating and making live calls. Path from signup to first live call was broken.',
          'Studio encountered by non-technical owners was built for engineers. tts_provider, temperature, buffer_size — raw parameters with no translation.',
          'Chat test stuck on loading spinner. Confirmed via Bolna support chat.',
          'Full walkthrough took 30+ minutes. Zero working demos heard.',
        ],
      },
      {
        id: '02', title: '02  THE CONSTRAINT',
        bullets: [
          'No backend. Single HTML file. Ruled out resume-where-left-off and time-based credit nudge. Named in PRD not silently dropped.',
          'No Bolna activation data. p=0.5 conservative assumption. 68-person minimum ±10pp margin.',
          'Inbound configuration separate setup. Ruled out entirely. Two parallel flows would dilute the problem being solved.',
        ],
      },
      {
        id: '03', title: '03  THE DECISION',
        bullets: [
          "Voice was buried after five setup fields. Business owners configuring a product they hadn't felt yet. Moved to first. Hear the agent before touching settings.",
          'Simple/Advanced fork forced self-categorization before entry. One flow instead. Depth always one tap away.',
          'Safety net only appeared when system failed to match goal. Most users never made the decision. Made required for every agent.',
          'Full landing redesign in scope. Drop-off inside Studio after signup. Redesigning upstream inverts sequence. Scoped out.',
          'Single demo run forced watching everything. Per-scenario play buttons instead. Each independently testable.',
          'Credit warning toast only. Toast nobody sees never lands. Persistent badge added.',
          "Lifecycle emails in scope. Retention for users who haven't activated solves wrong problem. Scoped out entirely.",
          "Sidebar with eight tabs matched Bolna's structure. Sidebar is for existing users. Single room instead. Full depth behind one icon.",
        ],
      },
      {
        id: '04', title: '04  THE OUTCOME',
        bullets: [
          'Sent to Bolna founding team with live URL. Unsolicited. Unprompted.',
          'Primary KR: 90% of 68-person cohort reach working live call under 10 minutes.',
          'Baseline: 30+ minutes. Zero demos heard.',
          'p=0.5. 90% confidence. ±10pp. Minimum 68 signups.',
        ],
      },
      {
        id: '05', title: "05  WHAT I'D DO DIFFERENTLY",
        bullets: [
          'Dual-trigger nudge missing because static file constraint caught too late. Would map PRD features against architecture before writing requirements.',
          'No distribution plan before prototype. Would define channel and cohort before locking sample size.',
          'Assumed spinner was known bug. Would replicate across three browsers first.',
        ],
      },
    ],
    thinking: [
      ['Bolna sidebar felt safe.',             'Sidebar exposes capability to existing users. Not first-timers. Single scrollable room. Full depth behind one icon.'],
      ['Voice belonged with audio settings.',  'Voice is first moment owner feels the product. Moved to Section 1.'],
      ['Lifecycle emails in scope.',           'Retention copy for non-activated users is wrong problem. Activation first.'],
      ['Simple/Advanced fork felt inclusive.', 'Forces self-categorization. Per-field toggle instead.'],
      ['Safety net felt optional.',            'Majority never made the decision. Required for every agent now.'],
    ],
  },

  /* ── PROJECT 3 ─────────────────────────────────────────── */
  {
    id: 2,
    tab:     'MAPPED THE GAP',
    heading: 'Emerging Roles Reachability Tool for Freshers',
    tagline: 'Live product. First KR hit. 35% of testers marked at least one role reachable within two weeks. Built scoring system, shipped it, validated it.',
    metric:  '35% KR validated · 62-tester minimum crossed · Statistically defensible',
    tags:    ['Hypothesis-driven PM', 'Metrics design'],
    liveUrl: 'https://rolereachability-tool-qlxpx3193-role-reachability.vercel.app',
    sections: [
      {
        id: '01', title: '01  THE GAP',
        bullets: [
          "Freshers scroll past unfamiliar titles. Assumption the role isn't for them — never checked against anything real.",
          'Original hypothesis: freshers skip fancy titles. Seemed true. Was wrong.',
          'Title is irrelevant. Plain title can hide a stretch role. Fancy title can be completely reachable.',
          'No structured way to assess fit. Defaulted to instinct. Instinct is almost always wrong both directions.',
          'Nine months of lived experience became the product brief.',
        ],
      },
      {
        id: '02', title: '02  THE CONSTRAINT',
        bullets: [
          "No login. Fresher won't create account to explore. Signup before value kills funnel at entry.",
          'AI unreliable as primary infrastructure. Blank card on API failure breaks trust at the only moment that matters.',
          "No existing baseline. KR of 35% couldn't be validated against prior evidence. 62-tester minimum exists because of this.",
        ],
      },
      {
        id: '03', title: '03  THE DECISION',
        bullets: [
          'First instinct was AI scoring. AI fails unpredictably. Pure math instead. Skills 30% + Experience 30% + Background 20% + Communication 20%. Instant. Never fails.',
          'Flat score threshold tells how much you bring. Not whether reachable. Four gates instead. Skills anchor. Background decides. Experience lifts. Communication caps.',
          'Account-less testers would see blank card. Built rule-based fallback. Real skill-specific content. Labeled honestly.',
          'Role-only key silently overwrote marks. Composite roleId::profileId instead. Both marks kept independently.',
          'Device-only dashboard measured itself. Shared storage pooled across all testers.',
          'Multi-select filter for power users. Freshers need clarity. Single-select.',
        ],
      },
      {
        id: '04', title: '04  THE OUTCOME',
        bullets: [
          'Live product. 8 PRD iterations.',
          '35% KR validated. 62-tester minimum crossed. Statistically defensible.',
          'p=0.35. ±10pp. 90% confidence.',
          'Persistent tester ID. Returning visitors count once.',
          'Passcode-gated KPI dashboard.',
          'Rule-based fallback for all testers.',
        ],
      },
      {
        id: '05', title: "05  WHAT I'D DO DIFFERENTLY",
        bullets: [
          'Experience fit flat bucket count. Would run five structured interviews before locking weights.',
          '35% target assumed meaningful. Would pressure-test against 25% and 45%.',
          'Hypothesis drove two weeks before proven wrong. Would stress-test with five user conversations first.',
        ],
      },
    ],
    thinking: [
      ['Freshers skip fancy titles.',          'Wrong. Title irrelevant. Real block was no structured assessment. Rewrote KR, scoring, UX before single screen built.'],
      ['Flat score cutoff tells how much you bring.', 'Not reachability. Four gates.'],
      ['Resume upload felt personal.',         'Manual questionnaire validates faster. Discovery is the job.'],
      ['AI felt right for scoring.',           'Fails unpredictably. Math instead. AI for explanation only after trust earned.'],
      ['Role-only marks sufficient.',          'Same role twice is two different discoveries. Composite key. Both frozen.'],
    ],
  },
];

const GO_DEEPER = [
  {
    title: 'PM JOB SEARCH\nOUTREACH AGENT',
    links: [
      { label: 'PM Thinking Doc', url: 'https://docs.google.com/document/d/17sGTRD6TvpI1_oLnJlFLZbBKO-jl1BXh/edit' },
      { label: 'PRD',             url: 'https://docs.google.com/document/d/1ozcW0V6NE2ELUrbU2734ExDDlTQO62ZI/edit' },
      { label: 'GitHub',          url: 'https://github.com/kritipm/rolereach' },
    ],
  },
  {
    title: 'BOLNA ONBOARDING\nACTIVATION FUNNEL',
    links: [
      { label: 'PM Thinking Doc', url: 'https://docs.google.com/document/d/1MEp-lKaTyklciafv483b2PnQPriQVZgI/edit' },
      { label: 'PRD',             url: 'https://docs.google.com/document/d/1HIvWNhVei1YwPnGp2NhPox_wNm8YWYh_/edit' },
      { label: 'GitHub',          url: 'https://github.com/kritipm/bol-na-funnel' },
    ],
  },
  {
    title: 'EMERGING ROLES\nREACHABILITY TOOL',
    links: [
      { label: 'PM Thinking Doc', url: 'https://docs.google.com/document/d/1l_fSMhQqYl140lloQqYlin2U2W7jsLOu/edit' },
      { label: 'PRD',             url: 'https://docs.google.com/document/d/1PhvRRkVrqLDsvnPJ0quQBYw2b5fss7aP/edit' },
      { label: 'GitHub',          url: 'https://github.com/kritipm/rolereachability-tool' },
    ],
  },
];

/* ── HELPER: highlighted text ──────────────────────────────── */
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

/* ── PROJECT PANEL ─────────────────────────────────────────── */
function ProjectPanel({ project, expanded, onToggle }) {
  return (
    <div style={{ paddingTop: 60 }}>

      {/* ── Collapsed header (always visible) ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
        <div style={{ flex: 1, minWidth: 240 }}>
          <h2 style={{ fontFamily: sg, fontWeight: 700, fontSize: 'clamp(22px,3vw,36px)', color: C.textPrimary, lineHeight: 1.15, marginBottom: 14 }}>
            {project.heading}
          </h2>
          <p style={{ fontFamily: sg, fontSize: 15, color: C.textSecond, lineHeight: 1.7, maxWidth: 620, marginBottom: 16 }}>
            {project.tagline}
          </p>
          <p style={{ fontFamily: jb, fontSize: 12, color: C.accent, lineHeight: 1.6, marginBottom: 18 }}>
            {project.metric}
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {project.tags.map(t => (
              <span key={t} style={{ fontFamily: jb, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.textMuted, border: `1px solid ${C.border}`, padding: '4px 10px' }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* See Live Product */}
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="h-live"
          style={{ fontFamily: jb, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '10px 16px', background: 'transparent', color: C.textPrimary, border: `1px solid ${C.border}`, display: 'inline-flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', flexShrink: 0 }}>
          ↗ SEE LIVE PRODUCT
        </a>
      </div>

      {/* Toggle button */}
      <button onClick={onToggle} className="h-log"
        style={{ fontFamily: jb, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '12px 20px', background: 'transparent', color: C.textSecond, border: `1px solid ${C.border}`, display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: expanded ? 48 : 0 }}>
        {expanded ? 'COLLAPSE DECISION LOG ↑' : 'READ THE DECISION LOG ↓'}
      </button>

      {/* ── Expanded content ── */}
      {expanded && (
        <div>
          {/* Five sections */}
          {project.sections.map(sec => (
            <div key={sec.id} style={{ marginBottom: 44 }}>
              <p style={{ fontFamily: jb, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.accent, marginBottom: 18 }}>
                {sec.title}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {sec.bullets.map((b, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <span style={{ color: C.textMuted, flexShrink: 0, fontFamily: jb, fontSize: 13, lineHeight: 1.75 }}>→</span>
                    <p style={{ fontFamily: sg, fontSize: 14, color: C.textSecond, lineHeight: 1.8 }}>{b}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Thinking */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 28, marginBottom: 36 }}>
            <p style={{ fontFamily: jb, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.textSecond, marginBottom: 24 }}>
              THINKING BEHIND IT
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {project.thinking.map(([assumption, reality], i) => (
                <div key={i} style={{ display: 'flex', gap: 14 }}>
                  <span style={{ color: C.textMuted, flexShrink: 0, fontFamily: jb, fontSize: 13, lineHeight: 1.75 }}>→</span>
                  <p style={{ fontFamily: sg, fontSize: 13, lineHeight: 1.75 }}>
                    <span style={{ color: C.textMuted }}>{assumption} </span>
                    <span style={{ color: C.textPrimary }}>{reality}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* See It Live */}
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="h-live"
            style={{ fontFamily: jb, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '14px 28px', background: 'transparent', color: C.textPrimary, border: `1px solid ${C.textPrimary}`, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            ↗ SEE IT LIVE
          </a>
        </div>
      )}
    </div>
  );
}

/* ── APP ───────────────────────────────────────────────────── */
export default function App() {
  const [activeTab, setActiveTab]   = useState(0);
  const [expanded,  setExpanded]    = useState({ 0: false, 1: false, 2: false });
  const [heroIdx,   setHeroIdx]     = useState(0);
  const [heroVis,   setHeroVis]     = useState(true);
  const tabsRef = useRef(null);

  /* inject global CSS once */
  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  /* hero rotation */
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

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>

      {/* ══════════════════ HERO ══════════════════ */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: `80px ${gutter}`,
      }}>
        {/* name + title */}
        <div style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: sg, fontWeight: 700, fontSize: 18, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.textPrimary, marginBottom: 8 }}>
            KRITI KUMARI
          </p>
          <p style={{ fontFamily: jb, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.accent }}>
            PRODUCT MANAGER
          </p>
        </div>

        {/* rotating lines */}
        <div style={{ minHeight: 'clamp(52px,7vw,88px)', marginBottom: 28 }}>
          <p
            className={`hero-fade ${heroVis ? 'hero-in' : 'hero-out'}`}
            style={{ fontFamily: sg, fontWeight: 400, fontSize: 'clamp(20px,2.8vw,32px)', color: C.textPrimary, lineHeight: 1.45, maxWidth: 700 }}
          >
            <HL text={HERO_LINES[heroIdx].text} hl={HERO_LINES[heroIdx].hl} />
          </p>
        </div>

        {/* fixed line */}
        <p style={{ fontFamily: sg, fontWeight: 400, fontSize: 14, color: C.textSecond, letterSpacing: '0.02em', marginBottom: 56 }}>
          3 live products. Every decision documented.
        </p>

        {/* ── ONE: CTAs — className added for mobile media query ── */}
        <div className="hero-ctas" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <button
            onClick={scrollToTabs}
            className="h-primary"
            style={{ fontFamily: sg, fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '14px 28px', background: C.textPrimary, color: C.bg, border: 'none' }}
          >
            SEE MY WORK
          </button>

          {/* ── ONE: CV button — href updated, onClick removed ── */}
          <a
            href="https://drive.google.com/file/d/163C2-GvWbN-y2TNhIl3i09dpUmCG5LXN/view"
            target="_blank"
            rel="noopener noreferrer"
            className="h-ghost"
            style={{ fontFamily: sg, fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '14px 28px', background: 'transparent', color: C.textPrimary, border: `1px solid ${C.textPrimary}`, display: 'inline-flex', alignItems: 'center' }}
          >
            READ CV
          </a>
        </div>
      </section>

      {/* ══════════════════ TABS ══════════════════ */}
      <div ref={tabsRef}>

        {/* ── THREE: sticky tab bar — className added ── */}
        <div className="tabs-container" style={{ position: 'sticky', top: 0, zIndex: 100, background: C.surface, borderBottom: `1px solid ${C.border}`, display: 'flex', overflowX: 'auto' }}>
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActiveTab(i)}
              className="h-tab"
              style={{
                fontFamily: jb,
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '18px 24px',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === i
                  ? `2px solid ${C.accent}`
                  : '2px solid transparent',
                marginBottom: -1,
                color: activeTab === i ? C.textPrimary : C.textMuted,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {activeTab === i && (
                <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: C.green, flexShrink: 0 }} />
              )}
              {p.tab}
            </button>
          ))}
        </div>

        {/* panel */}
        <div style={{ padding: `0 ${gutter} 96px` }}>
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

      {/* ══════════════════ GO DEEPER ══════════════════ */}
      <section style={{ padding: `80px ${gutter}`, borderTop: `1px solid ${C.border}` }}>
        <p style={{ fontFamily: jb, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.textSecond, marginBottom: 40 }}>
          GO DEEPER
        </p>
        {/* ── THREE: go-deeper grid — className added ── */}
        <div className="go-deeper-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {GO_DEEPER.map(card => (
            <div key={card.title} style={{ background: C.card, border: `1px solid ${C.border}`, padding: 28 }}>
              <p style={{ fontFamily: jb, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.textSecond, marginBottom: 22, lineHeight: 1.65, whiteSpace: 'pre-line' }}>
                {card.title}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {card.links.map(lk => (
                  <a key={lk.label} href={lk.url} target="_blank" rel="noopener noreferrer" className="h-link"
                    style={{ fontFamily: sg, fontSize: 13, color: C.textPrimary, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: C.accent, flexShrink: 0 }}>↗</span>
                    {lk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════ CONTACT ══════════════════ */}
      <section style={{ padding: `80px ${gutter}`, borderTop: `1px solid ${C.border}` }}>
        <p style={{ fontFamily: jb, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.textSecond, marginBottom: 40 }}>
          GET IN TOUCH
        </p>
        {/* ── THREE: contact items — className added ── */}
        <div className="contact-items" style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {[
            /* ── TWO: phone added ── */
            { label: 'Phone',    href: 'tel:+916201890335',                   text: '+91 6201890335',           ext: false },
            { label: 'Email',    href: 'mailto:kritipm62@gmail.com',           text: 'kritipm62@gmail.com',      ext: false },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kritiux',  text: 'linkedin.com/in/kritiux',  ext: true  },
          ].map(item => (
            <a key={item.label} href={item.href}
              {...(item.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="h-link"
              style={{ fontFamily: sg, fontSize: 16, color: C.textPrimary, display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontFamily: jb, fontSize: 11, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', minWidth: 88 }}>
                {item.label}
              </span>
              {item.text}
            </a>
          ))}
        </div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer style={{ padding: `24px ${gutter}`, borderTop: `1px solid ${C.border}` }}>
        <p style={{ fontFamily: jb, fontSize: 11, color: C.textMuted, letterSpacing: '0.08em' }}>
          Last updated — Portfolio July 2026.
        </p>
      </footer>

    </div>
  );
}
