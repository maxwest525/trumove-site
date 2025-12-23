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

      <style jsx>{`
        .tm-shell {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #fff;
          color: #0f172a;
          font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial,
            sans-serif;
        }
        .tm-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #e5e7eb;
        }
.tm-header-inner{
  max-width:1120px;
  margin:0 auto;
  padding:14px 18px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:14px;
 flex-wrap: nowrap;
}

.tm-logo{
  display:flex;
  align-items:center;
}


        .tm-nav {
          display: flex;
          gap: 12px;
          flex: 1;
          align-items: center;
          flex-wrap: wrap;
           overflow-x: auto;
  scrollbar-width: none;
}
.tm-nav::-webkit-scrollbar{ display:none; }
        }
        .tm-nav-link {
          text-decoration: none;
          color: #111827;
          font-size: 14px;
          padding: 8px 10px;
          border-radius: 10px;
        }
.tm-nav-link:hover {
  background: rgba(17,24,39,0.06);
  color: #000;
}


        .tm-nav-link.active {
          background: #111827;
          color: #fff;
        }
.tm-cta{
  text-decoration:none;
  display:inline-flex;
  align-items:center;
  gap:10px;
  padding:10px 14px 10px 10px;
  border-radius:999px;
  background:#39ff14;
  color:#000;
  border:1px solid #16a34a33;
  font-weight:900;
  letter-spacing:0.12em;
  font-size:12px;
  white-space:nowrap;
}
.tm-cta:hover{ filter:brightness(0.96); }

.tm-cta-icon{
  width:28px;
  height:28px;
  border-radius:999px;
  background:#fff;
  border:1px solid rgba(0,0,0,0.12);
  display:inline-flex;
  align-items:center;
  justify-content:center;
  font-size:18px;
  line-height:1;
}
.tm-cta-text{
  position:relative;
  top:1px;
}

        .tm-main {
          flex: 1;
          width: 100%;
        }
        .tm-footer {
          border-top: 1px solid #e5e7eb;
          background: #fff;
        }
        .tm-footer-inner {
          max-width: 1120px;
          margin: 0 auto;
          padding: 24px 18px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .tm-footer-brand {
          font-weight: 800;
          color: #000;
        }
        .tm-footer-sub {
          margin-top: 6px;
          color: #6b7280;
          font-size: 13px;
          max-width: 420px;
        }
        .tm-footer-right {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        .tm-footer-link {
          text-decoration: none;
          color: #111827;
          font-size: 13px;
          padding: 8px 10px;
          border-radius: 10px;
        }
        .tm-footer-link:hover {
          background: #f3f4f6;
        }
        .tm-cta.call {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #eaffea;
  border: 1px solid #39ff14;
  color: #000;
}

.call-dot {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #39ff14;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 4px rgba(57,255,20,0.2);
}

.tm-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e5e7eb;
}

.tm-header-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 12px 18px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.tm-logo { display:flex; align-items:center; }
.tm-logo-img{
  height: 62px;
  width: auto;
  max-height: 62px;
  display:block;
}

.tm-nav {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
  overflow-x: auto;
  padding: 6px 4px;
  scrollbar-width: none;
}
.tm-nav::-webkit-scrollbar {
  display: none;
}

.tm-nav{
  display:flex;
  align-items:center;
  gap: 18px;
  flex: 1;
  min-width: 0;
  justify-content: center;
}

.tm-nav-link{
  position: relative;
  text-decoration:none;
  color:#0f172a;
  font-size:14px;
  font-weight:700;
  padding: 10px 2px;
  white-space: nowrap;
  opacity: 0.9;
  transition: opacity .15s ease, transform .15s ease;
}

.tm-nav-link:hover{
  opacity: 1;
  transform: translateY(-1px);
}

.tm-nav-link::after{
  content:"";
  position:absolute;
  left:0;
  right:0;
  bottom: 4px;
  height: 2px;
  border-radius: 2px;
  background: #39ff14;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .18s ease;
}

.tm-nav-link:hover::after{
  transform: scaleX(1);
}

.tm-nav-link.active{
  opacity: 1;
}

.tm-nav-link.active::after{
  transform: scaleX(1);
}


.tm-call {
  text-decoration: none;
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 0.02em;
  padding: 11px 16px;
  border-radius: 999px;
  background: linear-gradient(180deg, #1f2937 0%, #0f172a 100%);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: inline-flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}

.tm-call::before {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #39ff14;
  box-shadow: 0 0 0 4px rgba(57, 255, 20, 0.18),
    0 0 12px rgba(57, 255, 20, 0.8);
}

.tm-call:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 26px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
}




/* Mobile */
@media (max-width: 860px) {
  .tm-header-inner {
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
  }

  .tm-nav {
    grid-column: 1 / -1;
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 6px;
  }

  .tm-nav::-webkit-scrollbar {
    height: 6px;
  }
}


      `}</style>
    </div>
  );
}
