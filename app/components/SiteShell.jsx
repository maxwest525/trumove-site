"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/online-estimate", label: "Get an Estimate" },
  { href: "/vetting", label: "Carrier Standards" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
];


export default function SiteShell({ children }) {
  const path = usePathname();

  return (
    <div className="tm-shell">
<header className="tm-header">
  <div className="tm-header-inner">
<Link href="/" className="tm-logo" aria-label="TruMove Home">
  <img className="tm-logo-img" src="/logo.png" alt="TruMove" />
</Link>

<nav className="tm-nav" aria-label="Primary">
  {NAV.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      className={`tm-nav-link ${path === item.href ? "active" : ""}`}
    >
      {item.label}
    </Link>
  ))}
</nav>

    <div className="tm-header-actions">
      <a className="tm-call" href="tel:+10000000000">
        Call Us Now
      </a>

      <Link className="tm-cta" href="/book-a-consult">
        Book a Consult
      </Link>
    </div>
  </div>
  
</header>

{/* TRUST STRIP (dark, official) */}
<section className="tm-trust" aria-label="Trust">
  <div className="tm-trust-inner">
    <div className="tm-trust-left">
      <span className="tm-trust-badge">
        <span className="tm-i tm-i-shield" aria-hidden="true" />
        FMCSA &amp; DOT COMPLIANT
      </span>
      <span className="tm-trust-sep" aria-hidden="true" />
      <span className="tm-trust-badge">
        <span className="tm-i tm-i-check" aria-hidden="true" />
        BONDED &amp; INSURED
      </span>
      <span className="tm-trust-sep" aria-hidden="true" />
      <span className="tm-trust-badge">
        <span className="tm-i tm-i-star" aria-hidden="true" />
        PLACEHOLDER
      </span>
    </div>

    <div className="tm-trust-right">
      <span className="tm-trust-mini">Enterprise-grade quoting</span>
      <span className="tm-trust-dot" aria-hidden="true" />
      <span className="tm-trust-mini">Vetted carrier network</span>
    </div>
  </div>
</section>

{/* STATUS STRIP (light, product status) */}
<section className="tm-status" aria-label="Status">
  <div className="tm-status-inner">
    <div className="tm-status-item">
      <span className="tm-status-led" aria-hidden="true" />
      Live quote ranges
    </div>
    <div className="tm-status-item">
      <span className="tm-status-led" aria-hidden="true" />
      No spam calls
    </div>
    <div className="tm-status-item">
      <span className="tm-status-led" aria-hidden="true" />
      PLACEHOLDER
    </div>
  </div>
</section>

<main className="tm-main">{children}</main>




      <footer className="tm-footer">
        <div className="tm-footer-inner">
          <div className="tm-footer-left">
            <div className="tm-footer-brand">TruMove</div>
            <div className="tm-footer-sub">
              AI-powered moving quotes and carrier coordination.
            </div>
          </div>

          <div className="tm-footer-right">
            <Link className="tm-footer-link" href="/vetting">
  Carrier Standards
</Link>
<Link className="tm-footer-link" href="/book">
  Book a consult
</Link>
<Link className="tm-footer-link" href="/privacy">
  Privacy
</Link>
<Link className="tm-footer-link" href="/terms">
  Terms
</Link>

          </div>
        </div>
      </footer>

<style jsx global>{`
  :root{
    --tm-green:#39ff14;
    --tm-ink:#0b1220;
    --tm-text:#0f172a;
    --tm-muted:rgba(15,23,42,0.70);
    --tm-line:rgba(15,23,42,0.10);
  }

  .tm-shell{
    min-height:100vh;
    display:flex;
    flex-direction:column;
    background:#fff;
    color:var(--tm-text);
    font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
  }

  /* HEADER */
  .tm-header{
    position:sticky;
    top:0;
    z-index:60;
    background:rgba(255,255,255,0.86);
    backdrop-filter:blur(14px);
    border-bottom:1px solid rgba(15,23,42,0.08);
  }

  .tm-header-inner{
    max-width:1280px;
    margin:0 auto;
    padding:14px 22px;
    display:grid;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    column-gap:22px;
  }

  .tm-logo{
    display:flex;
    align-items:center;
    flex-shrink:0;
    text-decoration:none;
  }

  .tm-logo-img{
    height:62px;
    width:auto;
    display:block;
    max-width:260px;
  }

  /* NAV LINKS */
  .tm-nav{
    display:flex;
    justify-content:center;
    gap:18px;
    align-items:center;
    white-space:nowrap;
    min-width:0;
  }

  .tm-nav-link{
    position:relative;
    text-decoration:none;
    color:rgba(15,23,42,0.86);
    font-size:15px;
    letter-spacing:0.06em;
    font-weight:500;
    padding:10px 4px;
    text-transform:uppercase;
    transition:color .15s ease, transform .15s ease;
  }

  .tm-nav-link:hover{
    color:rgba(15,23,42,1);
    transform:translateY(-1px);
  }

  .tm-nav-link::after{
    content:"";
    position:absolute;
    left:4px;
    right:4px;
    bottom:6px;
    height:2px;
    border-radius:2px;
    background:var(--tm-green);
    transform:scaleX(0);
    transform-origin:left;
    transition:transform .18s ease;
    opacity:0.9;
  }

  .tm-nav-link:hover::after{ transform:scaleX(1); }
  .tm-nav-link.active{ color:rgba(15,23,42,1); }
  .tm-nav-link.active::after{ transform:scaleX(1); }

  /* ACTIONS (keep, but not cartoonish) */
  .tm-header-actions{
    display:flex;
    align-items:center;
    gap:10px;
    white-space:nowrap;
    flex-shrink:0;
  }

  .tm-call,
  .tm-cta{
    display:inline-flex;
    align-items:center;
    justify-content:center;
    height:40px;
    padding:0 14px;
    border-radius:999px;
    text-decoration:none;
    white-space:nowrap;
    font-size:12.5px;
    font-weight:600;
    letter-spacing:0.10em;
    text-transform:uppercase;
    color:rgba(15,23,42,0.92);
    border:1px solid rgba(15,23,42,0.14);
    background:rgba(255,255,255,0.85);
    box-shadow:0 10px 22px rgba(15,23,42,0.08);
    transition:transform .15s ease, box-shadow .15s ease, border-color .15s ease;
  }

  .tm-call:hover,
  .tm-cta:hover{
    transform:translateY(-1px);
    box-shadow:0 18px 38px rgba(15,23,42,0.12);
    border-color:rgba(15,23,42,0.20);
  }

  /* Trust strip (dark, official) */
  .tm-trust{
    position:relative;
    z-index:55;
    background:linear-gradient(180deg, rgba(11,18,32,0.96), rgba(11,18,32,0.92));
    border-bottom:1px solid rgba(255,255,255,0.10);
  }

  .tm-trust-inner{
    max-width:1280px;
    margin:0 auto;
    padding:10px 22px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:16px;
    flex-wrap:wrap;
  }

  .tm-trust-left{
    display:flex;
    align-items:center;
    gap:14px;
    flex-wrap:wrap;
    min-width:0;
  }

  .tm-trust-badge{
    display:inline-flex;
    align-items:center;
    gap:10px;
    font-size:12px;
    letter-spacing:0.12em;
    text-transform:uppercase;
    font-weight:650;
    color:rgba(255,255,255,0.90);
  }

  .tm-trust-sep{
    width:1px;
    height:14px;
    background:rgba(255,255,255,0.18);
  }

  .tm-trust-right{
    display:flex;
    align-items:center;
    gap:10px;
    white-space:nowrap;
    color:rgba(255,255,255,0.72);
    font-size:12px;
    letter-spacing:0.06em;
    text-transform:uppercase;
    font-weight:600;
  }

  .tm-trust-mini{ opacity:0.95; }
  .tm-trust-dot{
    width:4px;
    height:4px;
    border-radius:99px;
    background:rgba(255,255,255,0.35);
  }

  /* Minimal icons (no emoji, no cheesy dots) */
  .tm-i{
    width:14px;
    height:14px;
    display:inline-block;
    position:relative;
    flex:0 0 auto;
  }

  .tm-i-check::before{
    content:"";
    position:absolute;
    left:3px;
    top:6px;
    width:4px;
    height:2px;
    border-left:2px solid var(--tm-green);
    border-bottom:2px solid var(--tm-green);
    transform:rotate(-45deg);
    box-shadow:0 0 0 3px rgba(57,255,20,0.10);
  }

  .tm-i-shield::before{
    content:"";
    position:absolute;
    inset:1px 2px 2px 2px;
    border:1.6px solid rgba(57,255,20,0.85);
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
    border-top-left-radius:6px;
    border-top-right-radius:6px;
    clip-path:polygon(50% 0%, 100% 15%, 100% 55%, 50% 100%, 0% 55%, 0% 15%);
    box-shadow:0 0 0 3px rgba(57,255,20,0.08);
  }

  .tm-i-star::before{
    content:"";
    position:absolute;
    left:6px;
    top:1px;
    width:2px;
    height:12px;
    background:rgba(255,255,255,0.75);
    transform:rotate(20deg);
    opacity:0.55;
  }

  /* Status strip (light, product status) */
  .tm-status{
    background:linear-gradient(180deg, rgba(255,255,255,0.98), rgba(255,255,255,0.92));
    border-bottom:1px solid rgba(15,23,42,0.08);
  }

  .tm-status-inner{
    max-width:1280px;
    margin:0 auto;
    padding:10px 22px;
    display:flex;
    align-items:center;
    justify-content:center;
    gap:18px;
    flex-wrap:wrap;
  }

  .tm-status-item{
    display:inline-flex;
    align-items:center;
    gap:10px;
    font-size:12px;
    letter-spacing:0.10em;
    text-transform:uppercase;
    font-weight:650;
    color:rgba(15,23,42,0.78);
    padding:6px 0;
  }

  .tm-status-led{
    width:8px;
    height:8px;
    border-radius:999px;
    background:var(--tm-green);
    box-shadow:0 0 0 4px rgba(57,255,20,0.12);
  }

  /* MAIN + FOOTER */
  .tm-main{ flex:1; width:100%; }

  .tm-footer{
    border-top:1px solid rgba(15,23,42,0.10);
    background:#fff;
  }

  .tm-footer-inner{
    max-width:1280px;
    margin:0 auto;
    padding:26px 22px;
    display:flex;
    align-items:flex-start;
    justify-content:space-between;
    gap:16px;
    flex-wrap:wrap;
  }

  .tm-footer-brand{ font-weight:800; color:#000; }
  .tm-footer-sub{ margin-top:6px; color:rgba(15,23,42,0.60); font-size:13px; max-width:420px; }
  .tm-footer-right{ display:flex; gap:14px; flex-wrap:wrap; align-items:center; }

  .tm-footer-link{
    text-decoration:none;
    color:rgba(15,23,42,0.82);
    font-size:13px;
    padding:8px 10px;
    border-radius:10px;
  }

  .tm-footer-link:hover{ background:rgba(15,23,42,0.04); }

  /* RESPONSIVE: remove overlap without making it feel cramped */
  @media (max-width: 1040px){
    .tm-header-inner{
      grid-template-columns:auto 1fr;
      grid-template-rows:auto auto;
      row-gap:10px;
    }

    .tm-header-actions{
      grid-column:2;
      justify-content:flex-end;
    }

    .tm-nav{
      grid-column:1 / -1;
      justify-content:flex-start;
      overflow-x:auto;
      -webkit-overflow-scrolling:touch;
      padding-bottom:6px;
    }

    .tm-nav::-webkit-scrollbar{ display:none; }
  }

  @media (max-width: 620px){
    .tm-logo-img{ height:54px; }
    .tm-trust-right{ display:none; }
  }
`}</style>




    </div>
  );
}
