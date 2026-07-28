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
    background:#0A0A0A;
    color:#F5F5F5;
    font-family:'Space Grotesk', sans-serif;
    -webkit-font-smoothing:antialiased;
    overflow-x:hidden;
  }
  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-track { background:#0A0A0A; }
  ::-webkit-scrollbar-thumb { background:#444444; border-radius:2px; }

  @keyframes pulse {
    0%,100% { opacity:1; transform:scale(1); }
    50%      { opacity:.35; transform:scale(.7); }
  }
  .pulse-dot { animation: pulse 1.6s ease-in-out infinite; }

  .hero-fade { transition: opacity .45s ease, transform .45s ease; }
  .hero-in   { opacity:1; transform:translateY(0); }
  .hero-out  { opacity:0; transform:translateY(-14px); pointer-events:none; }

  .h-primary { cursor:pointer; transition:background .2s,color .2s; }
  .h-primary:hover { background:#E63946 !important; color:#F5F5F5 !important; }

  .h-ghost { cursor:pointer; transition:border-color .2s,color .2s; text-decoration:none; }
  .h-ghost:hover { border-color:#E63946 !important; color:#E63946 !important; }

  .h-live { cursor:pointer; transition:background .2s,color .2s,border-color .2s; text-decoration:none; }
  .h-live:hover { background:#E63946 !important; color:#F5F5F5 !important; border-color:#E63946 !important; }

  .h-log { cursor:pointer; transition:border-color .2s,color .2s; }
  .h-log:hover { border-color:#888888 !important; color:#F5F5F5 !important; }

  .h-tab { cursor:pointer; transition:color .2s; }
  .h-tab:hover { color:#F5F5F5 !important; }

  .h-link { transition:color .2s; text-decoration:none; }
  .h-link:hover { color:#E63946 !important; }

  @media (max-width: 768px) {
    body, html { overflow-x: hidden; max-width: 100vw; }
    .tabs-container { overflow-x: auto !important; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
    .tabs-container::-webkit-scrollbar { display: none; }
    .go-deeper-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
    .hero-ctas { flex-direction: column !important; width: 100%; }
    .hero-ctas button, .hero-ctas a { width: 100%; text-align: center; justify-content: center; }
    .contact-items { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }
    button, a { min-height: 44px; display: inline-flex; align-items: center; }
  }
`;

const HERO_LINES = [
  { text: 'Identified the drop-off in PM job search. Built an autonomous pipeline to close it.', hl: 'autonomous pipeline' },
  { text: 'Diagnosed where B2B onboarding was losing activation. Redesigned the flow.', hl: 'activation' },
  { text: 'Freshers were skipping reachable roles. Built a scoring system to show the gap.', hl: 'scoring system' },
];

const PROJECTS = [
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
  {
    id: 1,
    tab:     'FIXED THE ONBOARDING',
    heading: 'Bolna Onboarding Activation Funnel',
    tagline: '75% of Bolna revenue depends
