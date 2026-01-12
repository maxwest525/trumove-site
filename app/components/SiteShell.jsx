<style jsx global>{`
  :root {
    --tm-green: #39ff14;
    --tm-ink: #0f172a;
    --tm-line: rgba(15, 23, 42, 0.1);
    --tm-max: 1480px;
    --tm-status-h: 44px;
    --tm-marquee-normal: 34s;
    --tm-marquee-fast: 18s;
  }

  .tm-shell {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #fff;
    color: var(--tm-ink);
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  }

  /* STATUS STRIP */
  .tm-status {
    position: sticky;
    top: 0;
    z-index: 90;
    height: var(--tm-status-h);
    border-bottom: 1px solid var(--tm-line);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), #ffffff);
    overflow: hidden;
  }

  .tm-status-track {
    height: 100%;
    overflow: hidden;
  }

  .tm-status-inner {
    height: 100%;
    display: flex;
    align-items: center;
    width: max-content;
    gap: 0;
    animation: tm-marquee var(--tm-marquee-normal) linear infinite;
    will-change: transform;
  }

  html.tm-scrolling .tm-status-inner {
    animation-play-state: paused;
  }
  .tm-status.is-paused .tm-status-inner {
    animation-play-state: paused;
  }
  .tm-status.is-fast .tm-status-inner {
    animation-duration: var(--tm-marquee-fast);
  }

  @keyframes tm-marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  .tm-status-item {
    appearance: none;
    border: 0;
    background: transparent;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 18px;
    font-size: 12px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-weight: 650;
    white-space: nowrap;
    color: rgba(15, 23, 42, 0.72);
    position: relative;
    cursor: pointer;
  }

  .tm-status-item:focus-visible {
    outline: 2px solid rgba(57, 255, 20, 0.45);
    outline-offset: 2px;
    border-radius: 10px;
  }

  .tm-status-item::after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 16px;
    background: rgba(15, 23, 42, 0.14);
  }

  .tm-status-dot {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: var(--tm-green);
    box-shadow: 0 0 0 5px rgba(57, 255, 20, 0.14);
    flex: 0 0 auto;
  }

  html[data-tm-route="online-estimate"] .tm-status-item[data-page="online-estimate"],
  html[data-tm-route="vetting"] .tm-status-item[data-page="vetting"],
  html[data-tm-route="book"] .tm-status-item[data-page="book"],
  html[data-tm-route="home"] .tm-status-item[data-page="home"] {
    color: rgba(15, 23, 42, 0.92);
  }

  .tm-status-mask {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 90px;
    pointer-events: none;
    z-index: 2;
  }

  .tm-status-mask-left {
    left: 0;
    background: linear-gradient(90deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  }

  .tm-status-mask-right {
    right: 0;
    background: linear-gradient(270deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  }

  /* HEADER */
  .tm-header {
    position: sticky;
    top: var(--tm-status-h);
    z-index: 80;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--tm-line);
  }

  .tm-header-inner {
    max-width: var(--tm-max);
    margin: 0 auto;
    padding: 14px 26px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    column-gap: 26px;
  }

  .tm-logo {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    text-decoration: none;
  }

  .tm-logo-img {
    width: 280px;
    height: 62px;
    display: block;
  }

  .tm-nav {
    display: flex;
    justify-content: center;
    gap: 26px;
    flex-wrap: nowrap;
    white-space: nowrap;
    min-width: 0;
  }

  .tm-nav-link {
    position: relative;
    text-decoration: none;
    color: var(--tm-ink);
    font-size: 19.5px;
    letter-spacing: 0.08em;
    font-weight: 500;
    padding: 12px 6px;
    white-space: nowrap;
    opacity: 0.86;
    text-transform: uppercase;
    transition: opacity 0.15s ease, transform 0.15s ease;
  }

  .tm-nav-link:hover {
    opacity: 1;
    transform: translateY(-1px);
  }

  .tm-nav-link::after {
    content: "";
    position: absolute;
    left: 4px;
    right: 4px;
    bottom: 6px;
    height: 2px;
    border-radius: 2px;
    background: var(--tm-green);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.18s ease;
  }

  .tm-nav-link:hover::after { transform: scaleX(1); }
  .tm-nav-link.active { opacity: 1; }
  .tm-nav-link.active::after { transform: scaleX(1); }

  .tm-header-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .tm-call,
  .tm-cta {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    height: 40px;
    padding: 0 16px;
    border-radius: 999px;
    text-decoration: none;
    white-space: nowrap;
    font-size: 12.5px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--tm-ink);
    border: 1px solid rgba(57, 255, 20, 0.4);
    background: linear-gradient(180deg, rgba(57, 255, 20, 0.18), rgba(57, 255, 20, 0.06));
    box-shadow: 0 14px 30px rgba(15, 23, 42, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.7);
    transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease, border-color 0.15s ease;
  }

  .tm-call::before,
  .tm-cta::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background:
      radial-gradient(circle at 30% 30%, #ffffff 0%, rgba(255, 255, 255, 0) 40%),
      radial-gradient(circle at center, var(--tm-green) 0%, var(--tm-green) 62%, rgba(57, 255, 20, 0.18) 100%);
    box-shadow: 0 0 0 4px rgba(57, 255, 20, 0.14);
    flex: 0 0 auto;
  }

  .tm-call:hover,
  .tm-cta:hover {
    transform: translateY(-1px);
    border-color: rgba(57, 255, 20, 0.55);
    box-shadow: 0 20px 44px rgba(15, 23, 42, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.8);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(57, 255, 20, 0.08));
  }

  /* TRUST STRIP */
  .tm-trust {
    background: linear-gradient(180deg, #070912, #050610);
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  }

  .tm-trust-inner {
    max-width: var(--tm-max);
    margin: 0 auto;
    padding: 10px 16px;
  }

  .tm-trust-items {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 26px;
    flex-wrap: wrap;
  }

  .tm-trust-item {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    white-space: nowrap;
    transition: transform 140ms ease;
  }

  .tm-trust-item:hover { transform: translateY(-1px); }

  .tm-trust-text {
    font-size: 10.5px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 850;
    color: rgba(255, 255, 255, 0.96);
  }

  .tm-trust-badge {
    width: 22px;
    height: 22px;
    position: relative;
    display: inline-grid;
    place-items: center;
    flex: 0 0 auto;
    background:
      radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0) 55%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.06));
    border: 1px solid rgba(255, 255, 255, 0.78);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      inset 0 -1px 0 rgba(0, 0, 0, 0.7),
      0 1px 0 rgba(0, 0, 0, 0.6);
    overflow: hidden;
  }

  html[data-tm-badge="circle"] .tm-trust-badge {
    border-radius: 999px;
    clip-path: none;
  }
  html[data-tm-badge="plaque"] .tm-trust-badge {
    border-radius: 8px;
    clip-path: polygon(10% 0%, 90% 0%, 100% 20%, 100% 80%, 90% 100%, 10% 100%, 0% 80%, 0% 20%);
  }
  html[data-tm-badge="shield"] .tm-trust-badge {
    border-radius: 10px 10px 14px 14px;
    clip-path: polygon(50% 4%, 88% 18%, 88% 54%, 50% 96%, 12% 54%, 12% 18%);
  }

  .tm-trust-badge::before {
    content: "";
    position: absolute;
    inset: 4px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    opacity: 0.95;
  }

  .tm-trust-badge::after {
    content: attr(data-code);
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    font-size: 8.5px;
    font-weight: 950;
    letter-spacing: 0.14em;
    color: rgba(255, 255, 255, 0.95);
    text-transform: uppercase;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.6);
  }

  .tm-trust-item:hover .tm-trust-badge {
    border-color: rgba(255, 255, 255, 0.92);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.26),
      inset 0 -1px 0 rgba(0, 0, 0, 0.78),
      0 0 0 6px rgba(57, 255, 20, 0.1),
      0 10px 22px rgba(0, 0, 0, 0.35);
  }

  /* MAIN */
  .tm-main { flex: 1; width: 100%; }

  /* FOOTER */
  .tm-footer {
    border-top: 1px solid var(--tm-line);
    background: #fff;
  }

  .tm-footer-inner {
    max-width: var(--tm-max);
    margin: 0 auto;
    padding: 24px 22px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }

  .tm-footer-left { display: flex; flex-direction: column; gap: 6px; }
  .tm-footer-brand { font-weight: 800; color: #000; }
  .tm-footer-sub { color: #6b7280; font-size: 13px; max-width: 420px; }

  .tm-footer-right {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    align-items: center;
  }

  .tm-footer-link {
    text-decoration: none;
    color: #111827;
    font-size: 13px;
    padding: 8px 10px;
    border-radius: 10px;
  }

  .tm-footer-link:hover { background: #f3f4f6; }

  /* RESPONSIVE, FIXED, NO BROKEN BRACES */
  @media (max-width: 1280px) {
    :root { --tm-max: 1320px; }

    .tm-header-inner {
      grid-template-columns: auto 1fr;
      grid-template-rows: auto auto;
      row-gap: 10px;
    }

    .tm-header-actions { justify-content: flex-end; }

    .tm-nav {
      grid-column: 1 / -1;
      justify-content: flex-start;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 6px;
      scrollbar-width: none;
    }

    .tm-nav::-webkit-scrollbar { display: none; }
    .tm-nav-link { font-size: 15px; }
  }

  @media (max-width: 520px) {
    .tm-logo-img { width: 220px; height: auto; }
    .tm-call, .tm-cta { height: 38px; padding: 0 12px; }
    .tm-status-mask { width: 64px; }
  }

  /* =========================
     HERO TRUSTBAR (CLEAN)
     ========================= */
  .tru-hero-trustbar{
    margin-top:14px;
    display:flex;
    flex-wrap:wrap;
    gap:10px 12px;
    align-items:center;
  }

  .tru-hero-trustitem{
    display:inline-flex;
    align-items:center;
    gap:10px;
    padding:8px 12px;
    border-radius:12px;
    border:1px solid rgba(15,23,42,0.10);
    background:linear-gradient(180deg, rgba(255,255,255,0.96), #ffffff);
    box-shadow:0 12px 26px rgba(15,23,42,0.08);
  }

  .tru-hero-trustlabel{
    font-size:10.5px;
    letter-spacing:0.14em;
    text-transform:uppercase;
    font-weight:900;
    color:rgba(15,23,42,0.84);
    white-space:nowrap;
  }

  .tru-hero-trustseal{
    width:22px;
    height:22px;
    display:inline-grid;
    place-items:center;
    position:relative;
    flex:0 0 auto;
    border-radius:8px;
    clip-path: polygon(10% 0%, 90% 0%, 100% 20%, 100% 80%, 90% 100%, 10% 100%, 0% 80%, 0% 20%);
    border:1px solid rgba(15,23,42,0.22);
    background:
      radial-gradient(circle at 30% 25%, rgba(255,255,255,0.80), rgba(255,255,255,0) 55%),
      linear-gradient(180deg, rgba(15,23,42,0.08), rgba(15,23,42,0.02));
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.85),
      0 10px 22px rgba(15,23,42,0.10);
    overflow:hidden;
  }

  .tru-hero-trustseal::before{
    content:"";
    position:absolute;
    inset:4px;
    border-radius:6px;
    border:1px solid rgba(15,23,42,0.18);
    opacity:0.9;
  }

  .tru-hero-trustseal::after{
    content:attr(data-code);
    position:absolute;
    inset:0;
    display:grid;
    place-items:center;
    font-size:8px;
    font-weight:950;
    letter-spacing:0.12em;
    text-transform:uppercase;
    color:rgba(15,23,42,0.86);
    text-shadow:0 1px 0 rgba(255,255,255,0.70);
  }

  /* HERO INLINE ERROR UI */
  .tru-hero-form-err{
    margin-top: 8px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: rgba(220, 38, 38, 0.92);
    min-height: 16px;
  }

  .tru-hero-input.is-error,
  .tru-hero-select.is-error{
    border-color: rgba(220, 38, 38, 0.55) !important;
    box-shadow: 0 0 0 5px rgba(220, 38, 38, 0.12) !important;
  }

  .tru-hero-input::placeholder{
    color: rgba(15,23,42,0.38);
  }

  /* =========================================================
     TRUMOVE, SECURE INTAKE CONSOLE, HERO FORM, SINGLE SOURCE
     ========================================================= */

  /* kill wrapper styling so only the card looks like a device */
  .tru-hero-visual,
  .tru-hero-visual-body,
  .tru-hero-formcard{
    background: transparent !important;
    border: 0 !important;
    box-shadow: none !important;
    padding: 0 !important;
  }

  #truHeroQuoteCard{
    position: relative !important;
    overflow: hidden !important;
    border-radius: 22px !important;
    border: 1px solid rgba(15,23,42,0.18) !important;
    background: rgba(255,255,255,0.98) !important;
    box-shadow:
      0 40px 120px rgba(15,23,42,0.18),
      inset 0 1px 0 rgba(255,255,255,0.94) !important;
    padding: 18px 18px 16px !important;
  }

  #truHeroQuoteCard::before{
    content:"" !important;
    position:absolute !important;
    inset:-2px !important;
    pointer-events:none !important;
    background:
      radial-gradient(900px 360px at 10% 0%, rgba(15,23,42,0.06), rgba(15,23,42,0.00) 58%),
      radial-gradient(700px 300px at 95% 25%, rgba(15,23,42,0.07), rgba(15,23,42,0.00) 55%),
      linear-gradient(180deg, rgba(255,255,255,0.60), rgba(255,255,255,0.00)) !important;
  }

  #truHeroQuoteCard::after{
    content:"" !important;
    position:absolute !important;
    left:14px !important;
    right:14px !important;
    top:12px !important;
    height:1px !important;
    background: linear-gradient(90deg, rgba(15,23,42,0.00), rgba(15,23,42,0.12), rgba(15,23,42,0.00)) !important;
    pointer-events:none !important;
  }

  #truHeroQuoteCard .tru-form-micro{
    position: relative !important;
    z-index: 2 !important;
    width: fit-content !important;
    padding: 6px 10px !important;
    border-radius: 999px !important;
    border: 1px solid rgba(15,23,42,0.16) !important;
    background: rgba(248,250,252,0.92) !important;
    box-shadow: 0 16px 40px rgba(15,23,42,0.10) !important;
    font-size: 9.5px !important;
    font-weight: 950 !important;
    letter-spacing: 0.24em !important;
    text-transform: uppercase !important;
    color: rgba(15,23,42,0.72) !important;
    margin-bottom: 10px !important;
  }

  #truHeroQuoteCard .tru-hero-form-title{
    position: relative !important;
    z-index: 2 !important;
    margin: 0 !important;
    font-size: 22px !important;
    font-weight: 980 !important;
    letter-spacing: -0.02em !important;
    color: rgba(15,23,42,0.96) !important;
    line-height: 1.05 !important;
  }

  #truHeroQuoteCard .tru-hero-form-sub{
    position: relative !important;
    z-index: 2 !important;
    margin: 6px 0 12px !important;
    font-size: 13.5px !important;
    line-height: 1.45 !important;
    font-weight: 750 !important;
    color: rgba(15,23,42,0.62) !important;
    padding-bottom: 12px !important;
    border-bottom: 1px solid rgba(15,23,42,0.10) !important;
  }

  #truHeroQuoteCard .tru-hero-form{
    position: relative !important;
    z-index: 1 !important;
    margin-top: 12px !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 0 !important;
  }

  #truHeroQuoteCard .tru-hero-form-row{
    margin: 0 0 9px !important;
  }

  #truHeroQuoteCard .tru-hero-form-row.two{
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 9px !important;
  }

  #truHeroQuoteCard .tru-hero-input,
  #truHeroQuoteCard .tru-hero-select{
    width: 100% !important;
    height: 46px !important;
    border-radius: 13px !important;
    padding: 0 12px !important;
    font-weight: 850 !important;
    border: 1px solid rgba(15,23,42,0.18) !important;
    background: rgba(255,255,255,0.96) !important;
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.92),
      0 10px 22px rgba(15,23,42,0.05) !important;
    outline: none !important;
    color: rgba(15,23,42,0.92) !important;
    transition: border-color 140ms ease, box-shadow 140ms ease, transform 140ms ease !important;
  }

  #truHeroQuoteCard .tru-hero-input:focus,
  #truHeroQuoteCard .tru-hero-select:focus{
    border-color: rgba(15,23,42,0.34) !important;
    box-shadow:
      0 0 0 6px rgba(15,23,42,0.10),
      inset 0 1px 0 rgba(255,255,255,0.92),
      0 18px 40px rgba(15,23,42,0.08) !important;
  }

  #truHeroQuoteCard .tru-choice-wrap{
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 9px !important;
    margin: 10px 0 10px !important;
  }

  #truHeroQuoteCard .tru-choice-btn{
    height: 42px !important;
    border-radius: 13px !important;
    border: 1px solid rgba(15,23,42,0.16) !important;
    background: rgba(255,255,255,0.72) !important;
    box-shadow:
      0 18px 46px rgba(15,23,42,0.10),
      inset 0 1px 0 rgba(255,255,255,0.90) !important;
    font-size: 11px !important;
    font-weight: 950 !important;
    letter-spacing: 0.16em !important;
    text-transform: uppercase !important;
    color: rgba(15,23,42,0.90) !important;
    cursor: pointer !important;
    transition: transform 140ms ease, box-shadow 140ms ease, border-color 140ms ease !important;
  }

  #truHeroQuoteCard .tru-choice-btn:hover{
    transform: translateY(-1px) !important;
    box-shadow:
      0 24px 64px rgba(15,23,42,0.14),
      inset 0 1px 0 rgba(255,255,255,0.92) !important;
  }

  #truHeroQuoteCard .tru-choice-btn.is-selected{
    border-color: rgba(15,23,42,0.36) !important;
    background: rgba(248,250,252,0.96) !important;
    box-shadow:
      0 26px 72px rgba(15,23,42,0.16),
      0 0 0 6px rgba(15,23,42,0.08),
      inset 0 1px 0 rgba(255,255,255,0.92) !important;
  }

  #truHeroQuoteCard .tru-primary-cta{
    height: 52px !important;
    width: 100% !important;
    border-radius: 15px !important;
    border: 1px solid rgba(15,23,42,0.22) !important;
    background: linear-gradient(180deg, rgba(10,12,18,0.98), rgba(0,0,0,0.98)) !important;
    color: rgba(255,255,255,0.96) !important;
    font-size: 12px !important;
    font-weight: 980 !important;
    letter-spacing: 0.20em !important;
    text-transform: uppercase !important;
    cursor: pointer !important;
    box-shadow:
      0 24px 64px rgba(15,23,42,0.22),
      inset 0 1px 0 rgba(255,255,255,0.10) !important;
    transition: transform 150ms ease, box-shadow 150ms ease !important;
  }

  #truHeroQuoteCard .tru-primary-cta:hover{
    transform: translateY(-1px) !important;
    box-shadow:
      0 38px 100px rgba(15,23,42,0.28),
      inset 0 1px 0 rgba(255,255,255,0.12) !important;
  }

  @media (max-width: 520px){
    #truHeroQuoteCard{ padding: 16px 14px 14px !important; }
    #truHeroQuoteCard .tru-hero-form-row.two{ grid-template-columns: 1fr !important; gap: 8px !important; }
    #truHeroQuoteCard .tru-choice-wrap{ grid-template-columns: 1fr !important; gap: 8px !important; }
  }
`}</style>
