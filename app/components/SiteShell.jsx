"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

const NAV = [
{ href: "/", label: "Home" },
{ href: "/online-estimate", label: "Get an Estimate" },
{ href: "/vetting", label: "Carrier Standards" },
{ href: "/faq", label: "FAQ" },
{ href: "/about", label: "About" },
];

const TRUST = [
{ tag: "USDOT", code: "USDOT", text: "USDOT Compliant" },
{ tag: "INSURED", code: "BOND", text: "Bonded and Insured" },
{ tag: "FMCSA", code: "FMCSA", text: "FMCSA Authorized Motor Carriers" },
{ tag: "BROKER", code: "BRKR", text: "Licensed Interstate Moving Broker" },
];

// Status items: key is used for page-aware highlight + snap behavior
const STATUS = [
{ text: "Instant AI quotes", key: "online-estimate", href: "/online-estimate" },
{ text: "Vetted mover network", key: "vetting", href: "/vetting" },
{ text: "Real time updates", key: "home", href: "/" },
{ text: "Virtual video consults", key: "book", href: "/book" },
{ text: "Live review and claims monitoring", key: "home", href: "/" },
{ text: "Load tracking", key: "home", href: "/" },
];

function getRouteKey(path) {
const route = (path || "/").toLowerCase();
if (route.startsWith("/online-estimate")) return "online-estimate";
if (route.startsWith("/vetting")) return "vetting";
if (route.startsWith("/book")) return "book";
return "home";
}

export default function SiteShell({ children }) {
const path = usePathname();
const router = useRouter();

const headerRef = useRef(null);
const statusStripRef = useRef(null);

const [paused, setPaused] = useState(false);
const [speed, setSpeed] = useState("normal"); // "normal" | "fast"
const scrollT = useRef(null);

const routeKey = useMemo(() => getRouteKey(path), [path]);

// Page-aware highlighting + badge shape selector
useEffect(() => {
document.documentElement.setAttribute("data-tm-route", routeKey);

// Pick one: "shield" | "plaque" | "circle"
document.documentElement.setAttribute("data-tm-badge", "plaque");
}, [routeKey]);

// Pause while user scrolls
useEffect(() => {
const onScroll = () => {
document.documentElement.classList.add("tm-scrolling");
setPaused(true);

if (scrollT.current) window.clearTimeout(scrollT.current);
scrollT.current = window.setTimeout(() => {
document.documentElement.classList.remove("tm-scrolling");
setPaused(false);
}, 160);
};

window.addEventListener("scroll", onScroll, { passive: true });
return () => {
window.removeEventListener("scroll", onScroll);
if (scrollT.current) window.clearTimeout(scrollT.current);
};
}, []);

// Auto-pause when header enters viewport
useEffect(() => {
if (!headerRef.current) return;

const obs = new IntersectionObserver(
(entries) => {
const entry = entries[0];
if (entry && entry.isIntersecting) setPaused(true);
else setPaused(false);
},
{ threshold: 0.65 }
);

obs.observe(headerRef.current);
return () => obs.disconnect();
}, []);

const loop = useMemo(() => [...STATUS, ...STATUS], []);

function snapTo(item) {
const targetHref = item.href || "/";
const onSamePage = (path || "/") === targetHref;

if (!onSamePage) {
router.push(targetHref);
return;
}

const id = `tm-${item.key}`;
const el = document.getElementById(id);
if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
else window.scrollTo({ top: 0, behavior: "smooth" });
}

return (
<div className="tm-shell">
{/* STATUS STRIP (TOP) */}
<div
ref={statusStripRef}
className={["tm-status", paused ? "is-paused" : "", speed === "fast" ? "is-fast" : ""].join(" ")}
aria-label="Platform capabilities"
onMouseEnter={() => setPaused(true)}
onMouseLeave={() => setPaused(false)}
>
<div className="tm-status-mask tm-status-mask-left" aria-hidden="true" />
<div className="tm-status-mask tm-status-mask-right" aria-hidden="true" />

<div className="tm-status-track" role="list">
<div className="tm-status-inner" role="presentation">
{loop.map((s, i) => (
<button
key={`${s.text}-${i}`}
type="button"
className="tm-status-item"
data-page={s.key}
role="listitem"
onClick={() => snapTo(s)}
aria-label={s.text}
>
<span className="tm-status-dot" aria-hidden="true" />
<span className="tm-status-text">{s.text}</span>
</button>
))}
</div>
</div>
</div>

{/* HEADER */}
<header ref={headerRef} className="tm-header">
<div className="tm-header-inner">
<Link href="/" className="tm-logo" aria-label="TruMove Home">
<Image
className="tm-logo-img"
src="/logo.png"
alt="TruMove"
width={280}
height={62}
priority
/>
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
<Link className="tm-cta" href="/book">
Book a Consult
</Link>
</div>
</div>
</header>

{/* TRUST STRIP (OFFICIAL) */}
<div className="tm-trust" aria-label="Compliance and authority">
<div className="tm-trust-inner">
<div className="tm-trust-items">
{TRUST.map((t) => (
<span key={t.tag} className="tm-trust-item">
<span className="tm-trust-badge" data-code={t.code} aria-hidden="true" />
<span className="tm-trust-text">{t.text}</span>
</span>
))}
</div>
</div>
</div>

<main className="tm-main">{children}</main>

<footer className="tm-footer">
<div className="tm-footer-inner">
<div className="tm-footer-left">
<div className="tm-footer-brand">TruMove</div>
<div className="tm-footer-sub">AI-powered moving quotes and carrier coordination.</div>
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
         from {
           transform: translateX(0);
         }
         to {
           transform: translateX(-50%);
         }
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

.tm-logo-img{
 width: 280px;
 height: 62px;
 display: block;
}

@media (max-width: 520px){
 .tm-logo-img{
   width: 220px;
   height: auto;
 }
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

       .tm-nav-link:hover::after {
         transform: scaleX(1);
       }

       .tm-nav-link.active {
         opacity: 1;
       }

       .tm-nav-link.active::after {
         transform: scaleX(1);
       }

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
         transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease,
           border-color 0.15s ease;
       }

       .tm-call::before,
       .tm-cta::before {
         content: "";
         width: 10px;
         height: 10px;
         border-radius: 999px;
         background: radial-gradient(circle at 30% 30%, #ffffff 0%, rgba(255, 255, 255, 0) 40%),
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

       /* TRUST STRIP (TOP, UNDER HEADER) */
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

       .tm-trust-item:hover {
         transform: translateY(-1px);
       }

       .tm-trust-text {
         font-size: 10.5px;
         letter-spacing: 0.16em;
         text-transform: uppercase;
         font-weight: 850;
         color: rgba(255, 255, 255, 0.96);
       }

       /* Seal base */
       .tm-trust-badge {
         width: 22px;
         height: 22px;
         position: relative;
         display: inline-grid;
         place-items: center;
         flex: 0 0 auto;

         background: radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0) 55%),
           linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.06));

         border: 1px solid rgba(255, 255, 255, 0.78);
         box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.7),
           0 1px 0 rgba(0, 0, 0, 0.6);
         overflow: hidden;
       }

       /* SHAPE SWITCH (controlled by html data-tm-badge) */
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

       /* inner ring */
       .tm-trust-badge::before {
         content: "";
         position: absolute;
         inset: 4px;
         border-radius: 6px;
         border: 1px solid rgba(255, 255, 255, 0.4);
         opacity: 0.95;
       }

       /* stamp text comes from data-code, this fixes the "blank badges" */
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
         box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.26), inset 0 -1px 0 rgba(0, 0, 0, 0.78),
           0 0 0 6px rgba(57, 255, 20, 0.1), 0 10px 22px rgba(0, 0, 0, 0.35);
       }

       /* MAIN */
       .tm-main {
         flex: 1;
         width: 100%;
       }

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

       .tm-footer-left {
         display: flex;
         flex-direction: column;
         gap: 6px;
       }

       .tm-footer-brand {
         font-weight: 800;
         color: #000;
       }

       .tm-footer-sub {
         color: #6b7280;
         font-size: 13px;
         max-width: 420px;
       }

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

       .tm-footer-link:hover {
         background: #f3f4f6;
       }

/* RESPONSIVE */
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


         .tm-call,
         .tm-cta {
           height: 38px;
           padding: 0 12px;
         }

         .tm-status-mask {
           width: 64px;
         }
       }
       /* HERO TRUSTBAR (clean seals, not bubbles) */
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
   linear-gradient(180deg, rgba(57,255,20,0.26), rgba(57,255,20,0.10));
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

/* Mini form inline error UI */
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

.tru-hero-label{
 display:block;
 margin: 2px 0 6px;
 font-size: 11px;
 font-weight: 900;
 letter-spacing: 0.14em;
 text-transform: uppercase;
 color: rgba(15,23,42,0.70);
}

.tru-hero-input::placeholder{
 color: rgba(15,23,42,0.38);
}





/* =========================================================
  HERO FORM — PREMIUM CONTROL HEADER (FINAL)
  Paste ONCE at the very bottom
  ========================================================= */

#truHeroQuoteCard{
 position: relative;
 overflow: hidden;
 background: #ffffff !important; /* kill the gradient */
 border: 1px solid rgba(15,23,42,0.10) !important;
 border-radius: 22px !important;
 box-shadow:
   0 34px 100px rgba(15,23,42,0.14),
   inset 0 1px 0 rgba(255,255,255,0.90) !important;
 padding: 22px 22px 20px !important;
}

/* subtle “tech” ambient lighting */
#truHeroQuoteCard::before{
 content:"";
 position:absolute;
 inset:-2px;
 background:
   radial-gradient(900px 320px at 12% 0%, rgba(57,255,20,0.10), rgba(57,255,20,0.00) 55%),
   radial-gradient(760px 320px at 92% 20%, rgba(15,23,42,0.07), rgba(15,23,42,0.00) 60%);
 pointer-events:none;
}

/* header feels like a “system module” */
#truHeroQuoteCard .tru-hero-form-title{
 position: relative;
 z-index: 1;
 font-size: 12px;
 font-weight: 950;
 letter-spacing: 0.22em;
 text-transform: uppercase;
 color: rgba(15,23,42,0.78);
 margin: 0;
}

/* main statement, big-tech */
#truHeroQuoteCard .tru-hero-form-sub{
 position: relative;
 z-index: 1;
 font-size: 15px;
 font-weight: 850;
 letter-spacing: -0.01em;
 line-height: 1.25;
 color: rgba(15,23,42,0.95);
 margin: 8px 0 0;
}

/* add a helper line under your subcopy by using the existing element */
#truHeroQuoteCard .tru-hero-form-sub::after{
 content:"Choose a workflow below, your move stays organized in one place.";
 display:block;
 margin-top: 10px;
 padding-bottom: 14px;
 border-bottom: 1px solid rgba(15,23,42,0.08);
 font-size: 12.5px;
 font-weight: 650;
 line-height: 1.35;
 color: rgba(15,23,42,0.60);
}

/* ensure no inner wrapper becomes a second card */
.tru-hero-visual-body,
.tru-hero-formcard{
 background: transparent !important;
 border: 0 !important;
 box-shadow: none !important;
 padding: 0 !important;
}

html body #truHeroQuoteCard,
html body #truHeroQuoteCard.tru-hero-formcard,
html body .tru-hero-visual-body#truHeroQuoteCard{
 background: #fff !important;
 border: 1px solid rgba(15,23,42,0.10) !important;
 border-radius: 22px !important;
 box-shadow: 0 34px 100px rgba(15,23,42,0.14), inset 0 1px 0 rgba(255,255,255,0.90) !important;
 padding: 22px 22px 20px !important;
 overflow: hidden !important;
 position: relative !important;
}

html body #truHeroQuoteCard::before{
 content:"" !important;
 position:absolute !important;
 inset:-2px !important;
 background:
   radial-gradient(900px 320px at 12% 0%, rgba(57,255,20,0.10), rgba(57,255,20,0.00) 55%),
   radial-gradient(760px 320px at 92% 20%, rgba(15,23,42,0.07), rgba(15,23,42,0.00) 60%) !important;
 pointer-events:none !important;
}


/* ================================
  HERO RIGHT COLUMN: ONE CARD ONLY
  Put at VERY BOTTOM
  ================================ */

/* The right column wrappers must not look like cards */
.tru-hero-visual,
.tru-hero-visual-body,
.tru-hero-formcard{
 background: transparent !important;
 border: 0 !important;
 box-shadow: none !important;
}

/* Remove hidden width limits that create the smaller inner box */
.tru-hero-visual,
.tru-hero-visual-body{
 width: 100% !important;
 max-width: none !important;
 min-width: 0 !important;
 padding: 0 !important;
 margin: 0 !important;
}

/* Make the card span the full width of the right column */
#truHeroQuoteCard{
 width: 100% !important;
 max-width: none !important;
 margin: 0 !important;
}

/* If the card is inside a flex container, allow it to stretch */
.tru-hero-visual-body{
 display: block !important;
}

/* =========================================================
   TRUMOVE — SECURE INTAKE CONSOLE (HERO FORM)
   Paste at VERY BOTTOM of SiteShell CSS
   ========================================================= */

/* Remove any “double box” / wrapper card styling */
.tru-hero-visual,
.tru-hero-visual-body,
.tru-hero-formcard{
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
}

/* The ONE official card */
#truHeroQuoteCard{
  position: relative;
  overflow: hidden;
  border-radius: 22px !important;
  border: 1px solid rgba(15,23,42,0.14) !important;
  background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,252,0.96)) !important;
  box-shadow:
    0 34px 110px rgba(15,23,42,0.16),
    inset 0 1px 0 rgba(255,255,255,0.92) !important;
  padding: 22px 22px 18px !important;
}

/* Subtle “secure console” scan + edge light, not neon */
#truHeroQuoteCard::before{
  content:"";
  position:absolute;
  inset:-2px;
  background:
    radial-gradient(900px 360px at 10% 0%, rgba(57,255,20,0.09), rgba(57,255,20,0.00) 58%),
    radial-gradient(700px 300px at 95% 25%, rgba(15,23,42,0.07), rgba(15,23,42,0.00) 55%),
    linear-gradient(180deg, rgba(255,255,255,0.60), rgba(255,255,255,0.00));
  pointer-events:none;
}

/* Hairline “top edge” like a premium device */
#truHeroQuoteCard::after{
  content:"";
  position:absolute;
  left:14px;
  right:14px;
  top:12px;
  height:1px;
  background: linear-gradient(90deg, rgba(15,23,42,0.00), rgba(15,23,42,0.12), rgba(15,23,42,0.00));
  pointer-events:none;
}

/* Micro label: system style */
#truHeroQuoteCard .tru-form-micro{
  position: relative;
  z-index: 1;
  width: fit-content;
  padding: 7px 10px;
  border-radius: 999px;
  border: 1px solid rgba(15,23,42,0.12);
  background: rgba(255,255,255,0.78);
  box-shadow: 0 14px 34px rgba(15,23,42,0.08);
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(15,23,42,0.72);
  margin-bottom: 12px;
}

/* Header: big-tech, “official” */
#truHeroQuoteCard .tru-hero-form-title{
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: 22px;
  font-weight: 950;
  letter-spacing: -0.02em;
  color: rgba(15,23,42,0.96);
}

/* Subheader: controlled + confident */
#truHeroQuoteCard .tru-hero-form-sub{
  position: relative;
  z-index: 1;
  margin: 8px 0 14px;
  font-size: 13.5px;
  line-height: 1.45;
  font-weight: 700;
  color: rgba(15,23,42,0.62);
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(15,23,42,0.10);
}

/* Form spacing */
#truHeroQuoteCard .tru-hero-form{
  position: relative;
  z-index: 1;
  margin-top: 14px;
}

#truHeroQuoteCard .tru-hero-form-row{
  margin: 0 0 10px;
}

#truHeroQuoteCard .tru-hero-form-row.two{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

/* Precision fields: “secure console” */
#truHeroQuoteCard .tru-hero-input,
#truHeroQuoteCard .tru-hero-select{
  width: 100%;
  height: 50px;
  border-radius: 14px;
  border: 1px solid rgba(15,23,42,0.14);
  background: rgba(255,255,255,0.96);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.92),
    0 12px 28px rgba(15,23,42,0.06);
  padding: 0 14px;
  outline: none;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: rgba(15,23,42,0.92);
  transition: border-color 140ms ease, box-shadow 140ms ease, transform 140ms ease;
}

#truHeroQuoteCard .tru-hero-input::placeholder{
  color: rgba(15,23,42,0.38);
  font-weight: 750;
}

#truHeroQuoteCard .tru-hero-input:focus,
#truHeroQuoteCard .tru-hero-select:focus{
  border-color: rgba(57,255,20,0.55);
  box-shadow:
    0 0 0 6px rgba(57,255,20,0.12),
    inset 0 1px 0 rgba(255,255,255,0.92),
    0 18px 40px rgba(15,23,42,0.08);
}

/* Choice buttons: enterprise toggle row */
#truHeroQuoteCard .tru-choice-wrap{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 10px 0 12px;
}

#truHeroQuoteCard .tru-choice-btn{
  height: 46px;
  border-radius: 14px;
  border: 1px solid rgba(15,23,42,0.14);
  background: rgba(255,255,255,0.84);
  box-shadow: 0 16px 40px rgba(15,23,42,0.10), inset 0 1px 0 rgba(255,255,255,0.85);
  cursor: pointer;
  font-size: 11px;
  font-weight: 950;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(15,23,42,0.86);
  transition: transform 140ms ease, border-color 140ms ease, box-shadow 140ms ease, background 140ms ease;
}

#truHeroQuoteCard .tru-choice-btn:hover{
  transform: translateY(-1px);
  border-color: rgba(57,255,20,0.38);
  box-shadow: 0 20px 52px rgba(15,23,42,0.14), inset 0 1px 0 rgba(255,255,255,0.90);
}

/* “Selected” state (Step 3 JS will toggle .is-selected) */
#truHeroQuoteCard .tru-choice-btn.is-selected{
  border-color: rgba(57,255,20,0.62);
  background: linear-gradient(180deg, rgba(255,255,255,0.92), rgba(57,255,20,0.10));
  box-shadow:
    0 22px 62px rgba(15,23,42,0.16),
    0 0 0 6px rgba(57,255,20,0.10),
    inset 0 1px 0 rgba(255,255,255,0.92);
}

/* Primary CTA: expensive, not cheesy */
#truHeroQuoteCard .tru-primary-cta{
  height: 54px;
  width: 100%;
  border-radius: 16px;
  border: 1px solid rgba(15,23,42,0.16);
  background: linear-gradient(180deg, rgba(10,12,18,0.98), rgba(0,0,0,0.98));
  color: rgba(255,255,255,0.96);
  font-size: 12px;
  font-weight: 950;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow:
    0 26px 70px rgba(15,23,42,0.22),
    0 0 0 6px rgba(57,255,20,0.08),
    inset 0 1px 0 rgba(255,255,255,0.10);
  transition: transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease;
}

#truHeroQuoteCard .tru-primary-cta:hover{
  transform: translateY(-1px);
  border-color: rgba(57,255,20,0.40);
  box-shadow:
    0 34px 90px rgba(15,23,42,0.26),
    0 0 0 7px rgba(57,255,20,0.10),
    inset 0 1px 0 rgba(255,255,255,0.12);
}

#truHeroQuoteCard .tru-primary-cta:active{
  transform: translateY(0);
}

/* Error message alignment */
#truHeroQuoteCard #miniErr{
  margin-top: 10px;
}

/* Mobile */
@media (max-width: 520px){
  #truHeroQuoteCard{
    padding: 18px 16px 16px !important;
  }
  #truHeroQuoteCard .tru-hero-form-row.two{
    grid-template-columns: 1fr;
  }
  #truHeroQuoteCard .tru-choice-wrap{
    grid-template-columns: 1fr;
  }
}

/* ================================
   STEP 1 — HERO FORM: kill the green wash + force one premium card
   Paste at VERY BOTTOM of SiteShell CSS
   ================================ */

/* If any wrapper is acting like a second card, kill it */
.tru-hero-visual,
.tru-hero-visual-body,
.tru-hero-formcard{
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
  padding: 0 !important;
}

/* The only card that should look “official” */
#truHeroQuoteCard{
  background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,252,0.96)) !important;
  border: 1px solid rgba(15,23,42,0.14) !important;
  box-shadow: 0 34px 110px rgba(15,23,42,0.16), inset 0 1px 0 rgba(255,255,255,0.92) !important;
}

/* Remove any neon/green outline effects coming from old rules */
#truHeroQuoteCard *{
  outline-color: transparent !important;
}
#truHeroQuoteCard :focus{
  outline: none !important;
}

     `}</style>
</div>
);
}
