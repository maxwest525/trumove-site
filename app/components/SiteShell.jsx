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
       .tm-header{
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e5e7eb;
}

.tm-header-inner{
  max-width: 1120px;
  margin: 0 auto;
  padding: 12px 18px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;
}

.tm-logo{
  display: flex;
  align-items: center;
  flex: 0 0 auto;
}

.tm-logo-img{
  height: 62px;
  width: auto;
  max-height: 62px;
  display: block;
}

.tm-nav{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  flex: 1 1 auto;
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: none;
}

.tm-nav::-webkit-scrollbar{ display:none; }

.tm-nav-link{
  position: relative;
  text-decoration: none;
  color: #0f172a;
  font-size: 14px;
  font-weight: 700;
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

.tm-nav-link:hover::after{ transform: scaleX(1); }
.tm-nav-link.active{ opacity: 1; }
.tm-nav-link.active::after{ transform: scaleX(1); }

.tm-header-actions{
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 0 0 auto;
}

.tm-call{
  text-decoration: none;
  font-size: 13px;
  font-weight: 800;
  padding: 10px 12px;
  border-radius: 12px;
  color: #0f172a;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);
  white-space: nowrap;
}

.tm-call:hover{
  transform: translateY(-1px);
  box-shadow: 0 12px 26px rgba(15, 23, 42, 0.12);
}

.tm-cta{
  text-decoration: none;
  font-size: 13px;
  font-weight: 900;
  padding: 10px 14px;
  border-radius: 12px;
  background: #39ff14;
  color: #000;
  border: 1px solid rgba(22,163,74,0.25);
  box-shadow: 0 10px 20px rgba(57,255,20,0.16);
  white-space: nowrap;
}

.tm-cta:hover{
  transform: translateY(-1px);
  filter: brightness(0.98);
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
