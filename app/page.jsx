"use client";

import "./globals.css";
import { useEffect } from "react";

const HTML = 
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>TruMove</title>
  <style>
    :root {
      --tru-green: #39ff14;
      --tru-black: #000000;
      --tru-red: #ef4444;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #ffffff;
      color: #111827;
    }

    .tru-page-frame {
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 40px 16px 70px;
      background: #ffffff;
    }

    .tru-page-inner {
      width: 100%;
      max-width: 1120px;
    }

    section + section {
      margin-top: 32px;
    }

    @media (max-width: 768px) {
      section + section {
        margin-top: 26px;
      }
    }

    /* HERO */

    .tru-hero {
      background: #ffffff;
      border-radius: 32px;
      padding: 32px 30px 34px;
      border: 1px solid #e5e7eb;
      box-shadow:
        0 28px 70px rgba(15,23,42,0.08),
        0 0 0 1px rgba(148,163,184,0.35);
    }

    @media (max-width: 768px) {
      .tru-hero {
        border-radius: 24px;
        padding: 26px 20px 28px;
      }
    }

    .tru-hero-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.5fr) minmax(0, 1.2fr);
      gap: 28px;
      align-items: center;
    }

    @media (max-width: 900px) {
      .tru-hero-grid {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    .tru-hero-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 4px 10px;
      border-radius: 999px;
      background: rgba(57,255,20,0.06);
      border: 1px solid rgba(57,255,20,0.45);
      font-size: 0.8rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #065f46;
      margin-bottom: 12px;
    }

    .tru-hero-pill-dot {
      width: 7px;
      height: 7px;
      border-radius: 999px;
      background: var(--tru-green);
      box-shadow: 0 0 0 4px rgba(57,255,20,0.35);
    }

    .tru-hero-title {
      font-size: clamp(2.1rem, 3vw, 2.5rem);
      line-height: 1.12;
      font-weight: 800;
      margin: 0 0 10px;
      color: #020617;
    }

    .tru-hero-sub {
      font-size: 0.98rem;
      color: #4b5563;
      max-width: 32rem;
      margin-bottom: 18px;
    }

    .tru-hero-bullets {
      display: flex;
      flex-wrap: wrap;
      gap: 10px 16px;
      margin-bottom: 20px;
    }

    .tru-hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: 999px;
      background: #f3f4f6;
      font-size: 0.78rem;
      color: #374151;
    }

    .tru-hero-badge-dot {
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background: var(--tru-green);
    }

    .tru-hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
    }

   .tru-hero-btn-primary {
  padding: 11px 22px;
  border-radius: 999px;
  border: 2px solid #000000; /* black stroke */
  background: linear-gradient(180deg, #4dff32, #2fe112); /* same glow style */
  color: #020617;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow:
    0 3px 4px rgba(0,0,0,0.25),
    0 8px 18px rgba(57,255,20,0.35); /* pop / glow */
  transition: transform 0.15s ease, box-shadow 0.2s ease;
}

.tru-hero-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow:
    0 5px 8px rgba(0,0,0,0.3),
    0 14px 28px rgba(57,255,20,0.45);
}

.tru-hero-btn-primary:active {
  transform: translateY(0);
  box-shadow:
    0 2px 4px rgba(0,0,0,0.25),
    0 6px 14px rgba(57,255,20,0.3);
}


    .tru-hero-btn-secondary {
      background: transparent;
      border: none;
      padding: 0;
      font-size: 0.9rem;
      color: #4b5563;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .tru-hero-btn-secondary span.chevron {
      display: inline-block;
      font-size: 0.95rem;
      transform: translateY(1px);
    }

    .tru-hero-note {
      width: 100%;
      font-size: 0.78rem;
      color: #6b7280;
      margin-top: 6px;
    }

    .tru-hero-visual {
      position: relative;
      border-radius: 24px;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      padding: 18px 18px 20px;
      box-shadow: 0 18px 45px rgba(15,23,42,0.08);
    }

    .tru-hero-visual-tag {
      position: absolute;
      top: 14px;
      left: 14px;
      padding: 4px 9px;
      border-radius: 999px;
      background: #020617;
      color: #e5e7eb;
      font-size: 0.7rem;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .tru-hero-visual-tag-dot {
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background: var(--tru-green);
    }

    .tru-hero-visual-body {
      margin-top: 18px;
      border-radius: 18px;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      padding: 14px 14px 16px;
    }

    .tru-hero-mini-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .tru-hero-mini-title {
      font-size: 0.8rem;
      font-weight: 600;
      color: #111827;
    }

    .tru-hero-mini-status {
      font-size: 0.75rem;
      color: #059669;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    .tru-hero-mini-status-dot {
      width: 7px;
      height: 7px;
      border-radius: 999px;
      background: var(--tru-green);
    }

    .tru-hero-mini-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.8rem;
      margin-bottom: 6px;
      color: #4b5563;
    }

    .tru-hero-mini-label {
      color: #6b7280;
    }

    .tru-hero-mini-value {
      font-weight: 500;
      color: #111827;
    }

    .tru-hero-mini-bar {
      margin-top: 12px;
      height: 7px;
      border-radius: 999px;
      background: #e5e7eb;
      overflow: hidden;
    }

    .tru-hero-mini-bar-fill {
      width: 68%;
      height: 100%;
      background: linear-gradient(to right, #22c55e, var(--tru-green));
    }

    /* QUICK MINI QUOTE FORM */

    .tru-mini-wrap {
      width: 100%;
      background: #ffffff;
      display: flex;
      justify-content: center;
      padding: 0;
      font-family: system-ui, sans-serif;
    }

    .tru-mini-card {
      width: 100%;
      max-width: 650px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 22px;
      padding: 22px 24px 24px;
      box-shadow: 0 12px 35px rgba(0,0,0,0.06);
      color: #111827;
      text-align: center;
    }

    .tru-mini-title {
      font-size: 1.4rem;
      font-weight: 700;
      color: #111827;
      margin-bottom: 8px;
    }

    .tru-mini-sub {
      font-size: 0.9rem;
      color: #6b7280;
      margin-bottom: 16px;
    }

    .tru-mini-form {
      display: grid;
      grid-template-columns: repeat(3, minmax(0,1fr));
      gap: 10px;
    }

    @media (max-width: 690px) {
      .tru-mini-form {
        grid-template-columns: minmax(0,1fr);
      }
    }

    .tru-mini-input,
    .tru-mini-select {
      width: 100%;
      padding: 10px 12px;
      border-radius: 10px;
      border: 1px solid #d1d5db;
      background: #ffffff;
      color: #111827;
      font-size: 0.9rem;
      outline: none;
    }

    .tru-mini-input::placeholder {
      color: #9ca3af;
    }

    .tru-mini-input:focus,
    .tru-mini-select:focus {
      border-color: var(--tru-green);
      box-shadow: 0 0 0 2px rgba(57,255,20,0.35);
    }

   .tru-mini-btn {
  margin-top: 16px;
  width: 100%;
  padding: 12px 20px;
  border-radius: 999px;
  border: 2px solid #000000; /* black stroke */
  background: linear-gradient(180deg, #4dff32, #2fe112); /* same pop as inventory button */
  color: #020617;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow:
    0 3px 4px rgba(0,0,0,0.25),
    0 8px 18px rgba(57,255,20,0.35);
  transition: transform 0.15s ease, box-shadow 0.2s ease;
}

.tru-mini-btn:hover {
  transform: translateY(-2px);
  box-shadow:
    0 5px 8px rgba(0,0,0,0.3),
    0 14px 28px rgba(57,255,20,0.45);
}

.tru-mini-btn:active {
  transform: translateY(0);
  box-shadow:
    0 2px 4px rgba(0,0,0,0.25),
    0 6px 14px rgba(57,255,20,0.3);
}

    /* FEATURES SECTION */

    .tru-simple-wrap {
      background: #ffffff;
      border-radius: 32px;
      padding: 38px 30px 32px;
      border: 1px solid #e5e7eb;
      box-shadow:
        0 24px 65px rgba(15,23,42,0.07),
        0 0 0 1px rgba(148,163,184,0.25);
    }

    @media (max-width: 768px) {
      .tru-simple-wrap {
        border-radius: 24px;
        padding: 28px 20px 26px;
      }
    }

    .tru-simple-inner {
      width: 100%;
      max-width: 1050px;
      margin: 0 auto;
      text-align: center;
    }

    .tru-simple-kicker {
      color: #9ca3af;
      font-size: 0.85rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    .tru-simple-title {
      font-size: 1.8rem;
      font-weight: 800;
      margin: 0 0 10px;
      color: #020617;
    }

    .tru-simple-sub {
      font-size: 0.9rem;
      color: #6b7280;
      margin-bottom: 26px;
    }

    .tru-simple-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 22px;
    }

    @media (max-width: 900px) {
      .tru-simple-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 640px) {
      .tru-simple-grid {
        grid-template-columns: 1fr;
      }
    }

    .tru-simple-card {
      position: relative;
      background: #ffffff;
      border-radius: 18px;
      padding: 20px 18px 18px;
      border: 1px solid rgba(148,163,184,0.5);
      box-shadow:
        0 12px 30px rgba(15,23,42,0.08),
        0 0 0 1px rgba(148,163,184,0.35);
      overflow: hidden;
      transition:
        transform 160ms ease,
        box-shadow 160ms ease,
        border-color 160ms ease;
    }

    .tru-simple-card:hover {
      transform: translateY(-3px) scale(1.01);
      border-color: rgba(57,255,20,0.9);
      box-shadow:
        0 18px 45px rgba(15,23,42,0.16),
        0 0 0 1px rgba(57,255,20,0.6);
    }

    .tru-simple-icon {
      width: 38px;
      height: 38px;
      border-radius: 999px;
      background: #ffffff;
      border: 1px solid rgba(57,255,20,0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 10px;
      box-shadow:
        0 0 0 3px rgba(57,255,20,0.18),
        0 8px 18px rgba(15,23,42,0.25);
    }

    .tru-simple-card:hover .tru-simple-icon {
      box-shadow:
        0 0 0 4px rgba(57,255,20,0.3),
        0 10px 24px rgba(15,23,42,0.3);
    }

    .tru-simple-icon svg {
      width: 18px;
      height: 18px;
      stroke: #022c22;
    }

    .tru-simple-card-title {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 6px;
      color: #020617;
    }

    .tru-simple-card-text {
      font-size: 0.86rem;
      color: #6b7280;
    }

    .tru-simple-cta {
      margin-top: 26px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 12px;
      align-items: center;
      padding: 12px 16px;
      border-radius: 999px;
      border: 1px solid rgba(148,163,184,0.55);
      background: #f9fafb;
    }

    @media (max-width: 640px) {
      .tru-simple-cta {
        border-radius: 18px;
        align-items: flex-start;
      }
    }

    .tru-simple-cta-text {
      font-size: 0.85rem;
      color: #4b5563;
    }

    .tru-simple-cta-strong {
      font-weight: 600;
      color: #020617;
    }

    .tru-simple-cta-btn {
      padding: 8px 16px;
      border-radius: 999px;
      border: 1px solid rgba(57,255,20,0.8);
      background: #ffffff;
      font-size: 0.82rem;
      font-weight: 600;
      color: #022c22;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      box-shadow: 0 6px 16px rgba(15,23,42,0.08);
      transition: transform 140ms ease, box-shadow 140ms ease, background 140ms ease;
    }

    .tru-simple-cta-btn:hover {
      background: #ecfdf5;
      transform: translateY(-1px);
      box-shadow: 0 10px 24px rgba(15,23,42,0.12);
    }

    .tru-simple-cta-btn span.chevron {
      font-size: 0.9rem;
      transform: translateY(1px);
    }

    /* MISSION + STATS + GUARANTEE + TRUST */

    .tru-mission-wrap {
      width: 100%;
      background: #ffffff;
      display: flex;
      justify-content: center;
      padding: 50px 0 10px;
      color: #111827;
    }

    .tru-mission-inner {
      width: 100%;
      max-width: 900px;
      text-align: center;
      padding: 0 16px;
    }

    .tru-mission-kicker {
      font-size: 0.85rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #9ca3af;
      margin-bottom: 10px;
    }

    .tru-mission-title {
      font-size: 1.9rem;
      font-weight: 800;
      color: #020617;
      margin: 0 0 14px;
      letter-spacing: 0.02em;
    }

    .tru-mission-title span {
      color: var(--tru-green);
      font-weight: 900;
    }

    .tru-mission-text {
      font-size: 1rem;
      color: #4b5563;
      line-height: 1.6;
      max-width: 700px;
      margin: 0 auto;
    }

    @media (max-width: 600px) {
      .tru-mission-title {
        font-size: 1.6rem;
      }
      .tru-mission-text {
        font-size: 0.95rem;
      }
    }

    .tru-mission-stats-shell {
      margin-top: 32px;
      width: 100%;
      display: flex;
      justify-content: center;
    }

    .tru-mission-stats-bar {
      width: 100%;
      max-width: 900px;
      border-radius: 999px;
      padding: 12px 18px;
      border: 1px solid #e5e7eb;
      background: #f9fafb;
      box-shadow: 0 10px 28px rgba(15,23,42,0.06);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }

    @media (max-width: 640px) {
      .tru-mission-stats-bar {
        border-radius: 18px;
        flex-direction: column;
        align-items: stretch;
        text-align: center;
      }
    }

    .tru-mission-stat {
      flex: 1;
      min-width: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 6px 10px;
    }

    .tru-mission-stat + .tru-mission-stat {
      border-left: 1px solid #e5e7eb;
    }

    @media (max-width: 640px) {
      .tru-mission-stat + .tru-mission-stat {
        border-left: none;
        border-top: 1px solid #e5e7eb;
      }
    }

    .tru-mission-stat-icon {
      width: 30px;
      height: 30px;
      border-radius: 999px;
      border: 1px solid rgba(57,255,20,0.7);
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow:
        0 0 0 3px rgba(57,255,20,0.1),
        0 6px 14px rgba(15,23,42,0.18);
      flex-shrink: 0;
    }

    .tru-mission-stat-icon svg {
      width: 16px;
      height: 16px;
      stroke: #022c22;
    }

    .tru-mission-stat-copy {
      text-align: left;
    }

    @media (max-width: 640px) {
      .tru-mission-stat-copy {
        text-align: center;
      }
    }

    .tru-mission-stat-number {
      font-size: 1.2rem;
      font-weight: 800;
      color: var(--tru-green);
      margin-bottom: 2px;
    }

    .tru-mission-stat-label {
      font-size: 0.8rem;
      color: #6b7280;
    }

    .tru-guarantee-wrap {
      margin-top: 32px;
      width: 100%;
      display: flex;
      justify-content: center;
    }

    .tru-guarantee-card {
      width: 100%;
      max-width: 900px;
      border-radius: 22px;
      border: 1px solid #e5e7eb;
      background: #ffffff;
      box-shadow: 0 14px 36px rgba(15,23,42,0.06);
      padding: 18px 18px 16px;
      text-align: left;
      display: grid;
      grid-template-columns: minmax(0, 1.3fr) minmax(0, 1.1fr);
      gap: 16px;
      align-items: center;
    }

    @media (max-width: 768px) {
      .tru-guarantee-card {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    .tru-guarantee-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 3px 9px;
      border-radius: 999px;
      border: 1px solid rgba(57,255,20,0.7);
      background: rgba(57,255,20,0.06);
      font-size: 0.78rem;
      color: #065f46;
      margin-bottom: 6px;
    }

    .tru-guarantee-tag-dot {
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background: var(--tru-green);
    }

    .tru-guarantee-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #020617;
      margin-bottom: 6px;
    }

    .tru-guarantee-text {
      font-size: 0.9rem;
      color: #4b5563;
      margin-bottom: 8px;
    }

    .tru-guarantee-list {
      font-size: 0.85rem;
      color: #374151;
      padding-left: 18px;
      margin: 0;
    }

    .tru-guarantee-list li + li {
      margin-top: 4px;
    }

    .tru-guarantee-side {
      font-size: 0.85rem;
      color: #6b7280;
      border-left: 1px solid #e5e7eb;
      padding-left: 16px;
    }

    @media (max-width: 768px) {
      .tru-guarantee-side {
        border-left: none;
        border-top: 1px solid #e5e7eb;
        padding-left: 0;
        padding-top: 10px;
        text-align: left;
      }
    }

    .tru-guarantee-highlight {
      font-weight: 600;
      color: #020617;
    }

    .tru-trust-wrap {
      margin-top: 22px;
      display: flex;
      justify-content: center;
    }

    .tru-trust-row {
      width: 100%;
      max-width: 900px;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      color: #6b7280;
    }

    .tru-trust-label {
      color: #9ca3af;
    }

    .tru-trust-badge {
      padding: 6px 12px;
      border-radius: 999px;
      border: 1px solid #e5e7eb;
      background: #f9fafb;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: #374151;
    }

    .tru-trust-dot {
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background: var(--tru-green);
    }

    @media (max-width: 600px) {
      .tru-trust-row {
        font-size: 0.78rem;
      }
    }

    /* CONTACT */

    .tru-contact-wrap {
      width: 100%;
      background: #ffffff;
      display: flex;
      justify-content: center;
      padding: 40px 0 0;
      color: #111827;
    }

    .tru-contact-inner {
      width: 100%;
      max-width: 700px;
      text-align: center;
      padding: 0 16px;
    }

    .tru-contact-title {
      font-size: 1.8rem;
      font-weight: 800;
      margin-bottom: 4px;
      color: #020617;
    }

    .tru-contact-sub {
      font-size: 0.95rem;
      color: #6b7280;
      margin-bottom: 28px;
    }

    .tru-contact-card {
      border-radius: 22px;
      border: 1px solid #e5e7eb;
      background: #ffffff;
      box-shadow: 0 18px 40px rgba(15,23,42,0.06);
      padding: 22px 20px 20px;
      text-align: left;
    }

    @media (max-width: 600px) {
      .tru-contact-card {
        border-radius: 18px;
        padding: 18px 14px 16px;
      }
    }

    .tru-contact-form {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-top: 4px;
    }

    .tru-field {
      position: relative;
    }

    .tru-field-inner {
      position: relative;
    }

    .tru-field-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .tru-field-icon svg {
      width: 16px;
      height: 16px;
      stroke: #9ca3af;
    }

    .tru-contact-input,
    .tru-contact-textarea {
      width: 100%;
      padding: 13px 14px 11px 38px;
      border-radius: 10px;
      background: #ffffff;
      border: 1px solid #d1d5db;
      color: #111827;
      font-size: 0.95rem;
      outline: none;
      transition: border-color 140ms ease, box-shadow 140ms ease, background 140ms ease;
    }

    .tru-contact-textarea {
      min-height: 130px;
      resize: vertical;
      padding-top: 18px;
    }

    .tru-contact-input::placeholder,
    .tru-contact-textarea::placeholder {
      color: transparent;
    }

    .tru-contact-input:focus,
    .tru-contact-textarea:focus {
      border-color: var(--tru-green);
      box-shadow: 0 0 0 2px rgba(57,255,20,0.35);
      background: #ffffff;
    }

    .tru-field-label {
      position: absolute;
      left: 38px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 0.9rem;
      color: #9ca3af;
      pointer-events: none;
      transition:
        top 140ms ease,
        transform 140ms ease,
        font-size 140ms ease,
        color 140ms ease;
      background: transparent;
    }

    .tru-field-label.textarea-label {
      top: 18px;
      transform: translateY(0);
    }

    .tru-field.has-value .tru-field-label,
    .tru-contact-input:focus + .tru-field-label,
    .tru-contact-textarea:focus + .tru-field-label {
      top: 6px;
      transform: translateY(0);
      font-size: 0.75rem;
      color: #6b7280;
    }

    .tru-field.has-value.textarea-field .tru-field-label,
    .textarea-field .tru-contact-textarea:focus + .tru-field-label {
      top: 5px;
    }

    .tru-field-error-text {
      margin-top: 4px;
      font-size: 0.78rem;
      color: var(--tru-red);
      display: none;
    }

    .tru-field.has-error .tru-contact-input,
    .tru-field.has-error .tru-contact-textarea {
      border-color: var(--tru-red);
      box-shadow: 0 0 0 1px rgba(239,68,68,0.35);
    }

    .tru-field.has-error .tru-field-error-text {
      display: block;
    }

    .tru-field.has-error .tru-field-icon svg {
      stroke: var(--tru-red);
    }

    .tru-contact-btn-row {
      margin-top: 6px;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
      justify-content: flex-start;
    }

    .tru-contact-btn {
  padding: 11px 20px;
  border-radius: 999px;

  /* Black stroke like the other buttons */
  border: 2px solid #000000;

  /* Embossed neon gradient */
  background: linear-gradient(180deg, #4dff32, #2fe112);

  color: #020617;
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;

  /* Glow + shadow */
  box-shadow:
    0 3px 4px rgba(0,0,0,0.25),
    0 8px 18px rgba(57,255,20,0.35);

  transition: transform 0.15s ease, box-shadow 0.2s ease;
}

.tru-contact-btn:hover {
  transform: translateY(-2px);
  box-shadow:
    0 5px 8px rgba(0,0,0,0.3),
    0 14px 28px rgba(57,255,20,0.45);
}

.tru-contact-btn:active {
  transform: translateY(0);
  box-shadow:
    0 2px 4px rgba(0,0,0,0.25),
    0 6px 14px rgba(57,255,20,0.3);
}

    .tru-contact-hint {
      font-size: 0.8rem;
      color: #9ca3af;
    }

    .tru-contact-secondary {
      margin-top: 16px;
      font-size: 0.85rem;
      color: #6b7280;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      justify-content: center;
      align-items: center;
    }

    .tru-contact-secondary-btn {
      padding: 6px 12px;
      border-radius: 999px;
      border: 1px solid #e5e7eb;
      background: #f9fafb;
      font-size: 0.82rem;
      color: #111827;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      box-shadow: 0 6px 16px rgba(15,23,42,0.08);
      transition: background 140ms ease, box-shadow 140ms ease, transform 140ms ease;
    }

    .tru-contact-secondary-btn:hover {
      background: #ffffff;
      transform: translateY(-1px);
      box-shadow: 0 10px 24px rgba(15,23,42,0.12);
    }

    .tru-contact-secondary-btn span.chevron {
      font-size: 0.9rem;
      transform: translateY(1px);
    }

    .tru-contact-secondary-btn svg {
      width: 14px;
      height: 14px;
      stroke: #020617; /* black phone icon */
    }
  </style>
</head>
<body>
  <div class="tru-page-frame">
    <div class="tru-page-inner">

      <!-- HERO -->
      <section class="tru-hero">
        <div class="tru-hero-grid">
          <div>
            <div class="tru-hero-pill">
              <span class="tru-hero-pill-dot"></span>
              <span>Smarter moving, powered by TruMove</span>
            </div>

            <h1 class="tru-hero-title">
              Move day control, without the stress.
            </h1>

            <p class="tru-hero-sub">
              TruMove turns a few simple questions into instant pricing, vetted movers, and live support. No spam calls, no surprise add ons, no getting bounced around.
            </p>

            <div class="tru-hero-bullets">
              <div class="tru-hero-badge">
                <span class="tru-hero-badge-dot"></span>
                <span>Instant AI quotes</span>
              </div>
              <div class="tru-hero-badge">
                <span class="tru-hero-badge-dot"></span>
                <span>Vetted mover network</span>
              </div>
              <div class="tru-hero-badge">
                <span class="tru-hero-badge-dot"></span>
                <span>Real time updates</span>
              </div>
            </div>

            <div class="tru-hero-actions">
              <button class="tru-hero-btn-primary" id="truHeroStartQuote">
                Start my quote
              </button>

              <button class="tru-hero-btn-secondary" type="button">
                <span>See how TruMove works</span>
                <span class="chevron">→</span>
              </button>
            </div>

            <div class="tru-hero-note">
              No hidden fees, no endless phone calls, just one clean dashboard for your whole move.
            </div>
          </div>

          <div class="tru-hero-visual">
            <div class="tru-hero-visual-tag">
              <span class="tru-hero-visual-tag-dot"></span>
              <span>Preview from your dashboard</span>
            </div>

            <div class="tru-hero-visual-body">
              <div class="tru-hero-mini-header">
                <div class="tru-hero-mini-title">
                  TruMove Smart Quote
                </div>
                <div class="tru-hero-mini-status">
                  <span class="tru-hero-mini-status-dot"></span>
                  <span>Pre approved movers found</span>
                </div>
              </div>

              <div class="tru-hero-mini-row">
                <span class="tru-hero-mini-label">Move size</span>
                <span class="tru-hero-mini-value">2 Bedroom, local</span>
              </div>

              <div class="tru-hero-mini-row">
                <span class="tru-hero-mini-label">Estimated range</span>
                <span class="tru-hero-mini-value">$930 - $1,180</span>
              </div>

              <div class="tru-hero-mini-row">
                <span class="tru-hero-mini-label">Recommended crew</span>
                <span class="tru-hero-mini-value">3 movers, 1 truck</span>
              </div>

              <div class="tru-hero-mini-bar">
                <div class="tru-hero-mini-bar-fill"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- QUICK MINI QUOTE FORM -->
      <section class="tru-mini-wrap" id="truMiniSection">
        <div class="tru-mini-card">
          <div class="tru-mini-title">Start Your Move</div>
          <div class="tru-mini-sub">Enter a few quick details and we will take you to your personalized quote.</div>

          <form class="tru-mini-form" id="truMiniForm" onsubmit="return false;">
            <input type="text" id="miniName" class="tru-mini-input" placeholder="Your name" required>
            <input type="text" id="miniZip" class="tru-mini-input" placeholder="Your ZIP code" required>
            <select id="miniSize" class="tru-mini-select" required>
              <option value="" disabled selected>Move size</option>
              <option value="Studio">Studio</option>
              <option value="1 Bedroom">1 Bedroom</option>
              <option value="2 Bedroom">2 Bedroom</option>
              <option value="3 Bedroom">3 Bedroom</option>
              <option value="4+ Bedroom">4+ Bedroom</option>
            </select>
          </form>

          <button class="tru-mini-btn" id="truMiniSubmit">Get My Quote →</button>
        </div>
      </section>

      <!-- FEATURES SECTION -->
      <section class="tru-simple-wrap">
        <div class="tru-simple-inner">
          <div class="tru-simple-kicker">All in one platform</div>
          <h2 class="tru-simple-title">The essentials, done right.</h2>
          <p class="tru-simple-sub">
            From instant quotes to live support, TruMove keeps every part of your move in one place so nothing slips through the cracks.
          </p>

          <div class="tru-simple-grid">

            <article class="tru-simple-card">
              <div class="tru-simple-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L5 14H11L11 22L19 10H13L13 2Z"
                        stroke-width="1.6"
                        stroke-linejoin="round"
                        stroke-linecap="round" />
                </svg>
              </div>
              <div class="tru-simple-card-title">Instant Pricing</div>
              <div class="tru-simple-card-text">Turn a few details into AI powered quotes in seconds.</div>
            </article>

            <article class="tru-simple-card">
              <div class="tru-simple-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M9 6H20M9 12H20M9 18H20" stroke-width="1.6"
                        stroke-linecap="round" />
                  <path d="M4 6L5.5 7.5L8 4.5" stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                  <path d="M4 12L5.5 13.5L8 10.5" stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                  <path d="M4 18L5.5 19.5L8 16.5" stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
              </div>
              <div class="tru-simple-card-title">Inventory Made Easy</div>
              <div class="tru-simple-card-text">Tap through rooms, add items, and watch your move build itself.</div>
            </article>

            <article class="tru-simple-card">
              <div class="tru-simple-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="3.5" y="6" width="11" height="12" rx="2"
                        stroke-width="1.6" />
                  <path d="M15 10L20.5 7.5V16.5L15 14"
                        stroke-width="1.6"
                        stroke-linejoin="round"
                        stroke-linecap="round" />
                </svg>
              </div>
              <div class="tru-simple-card-title">Live Video Help</div>
              <div class="tru-simple-card-text">Walk your home with a TruMove specialist over secure video.</div>
            </article>

            <article class="tru-simple-card">
              <div class="tru-simple-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="9" cy="8" r="2.2" stroke-width="1.6" />
                  <circle cx="15" cy="8" r="2.2" stroke-width="1.6" />
                  <circle cx="9" cy="16" r="2.2" stroke-width="1.6" />
                  <circle cx="15" cy="16" r="2.2" stroke-width="1.6" />
                  <path d="M11.2 8H12.8M9 10.2V13.8M15 10.2V13.8M11 16H13"
                        stroke-width="1.6"
                        stroke-linecap="round" />
                </svg>
              </div>
              <div class="tru-simple-card-title">Smart Matching</div>
              <div class="tru-simple-card-text">We rank movers on real performance, not paid placement.</div>
            </article>

            <article class="tru-simple-card">
              <div class="tru-simple-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="13" r="3.2" stroke-width="1.6" />
                  <path d="M11 4V6.5M18 11H15.5M6.5 11H4M15.2 6.8L13.7 8.3M8.3 8.3L6.8 6.8"
                        stroke-width="1.6"
                        stroke-linecap="round" />
                  <path d="M17 17L20 20" stroke-width="1.6"
                        stroke-linecap="round" />
                </svg>
              </div>
              <div class="tru-simple-card-title">Real Time Updates</div>
              <div class="tru-simple-card-text">Track confirmations, crews, and timing from one live timeline.</div>
            </article>

            <article class="tru-simple-card">
              <div class="tru-simple-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 3L6 5.5V11.5C6 15.1 8.4 18.4 12 19.5C15.6 18.4 18 15.1 18 11.5V5.5L12 3Z"
                        stroke-width="1.6"
                        stroke-linejoin="round" />
                  <path d="M9 11.5L11 13.5L15 9.5"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
              </div>
              <div class="tru-simple-card-title">Built In Protection</div>
              <div class="tru-simple-card-text">We screen carriers and flag red flag reviews before you book.</div>
            </article>
          </div>

          <div class="tru-simple-cta">
            <div class="tru-simple-cta-text">
              <span class="tru-simple-cta-strong">Want the full breakdown.</span>
              Compare TruMove to a traditional moving broker in one quick view.
            </div>
            <button class="tru-simple-cta-btn" type="button">
              <span>See all features</span>
              <span class="chevron">→</span>
            </button>
          </div>
        </div>
      </section>

      <!-- MISSION + STATS + GUARANTEE + TRUST -->
      <section class="tru-mission-wrap">
        <div class="tru-mission-inner">
          <div class="tru-mission-kicker">OUR MISSION</div>
          <h2 class="tru-mission-title">
            Making moving <span>honest</span>, <span>clear</span>, and <span>predictable</span>.
          </h2>
          <p class="tru-mission-text">
            Our mission is to make moving honest, clear, and predictable, using AI and real carrier data to give you transparent prices, trusted movers, and a move that goes the way it should.
          </p>

          <div class="tru-mission-stats-shell">
            <div class="tru-mission-stats-bar">

              <div class="tru-mission-stat">
                <div class="tru-mission-stat-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 4L13.9 8.24L18.5 8.74L15 11.79L15.9 16.3L12 14.1L8.1 16.3L9 11.79L5.5 8.74L10.1 8.24L12 4Z"
                          stroke-width="1.5"
                          stroke-linejoin="round" />
                  </svg>
                </div>
                <div class="tru-mission-stat-copy">
                  <div class="tru-mission-stat-number">4.9★</div>
                  <div class="tru-mission-stat-label">Average Rating</div>
                </div>
              </div>

              <div class="tru-mission-stat">
                <div class="tru-mission-stat-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M4 8L12 4L20 8V16L12 20L20 16V8L12 12L4 8Z"
                          stroke-width="1.5"
                          stroke-linejoin="round" />
                  </svg>
                </div>
                <div class="tru-mission-stat-copy">
                  <div class="tru-mission-stat-number">10,000+</div>
                  <div class="tru-mission-stat-label">Moves Assisted</div>
                </div>
              </div>

              <div class="tru-mission-stat">
                <div class="tru-mission-stat-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 3L6 5.5V11.5C6 15.1 8.4 18.4 12 19.5C15.6 18.4 18 15.1 18 11.5V5.5L12 3Z"
                          stroke-width="1.5"
                          stroke-linejoin="round" />
                  </svg>
                </div>
                <div class="tru-mission-stat-copy">
                  <div class="tru-mission-stat-number">0</div>
                  <div class="tru-mission-stat-label">Spam Calls, Ever</div>
                </div>
              </div>

            </div>
          </div>

          <div class="tru-guarantee-wrap">
            <div class="tru-guarantee-card">
              <div>
                <div class="tru-guarantee-tag">
                  <span class="tru-guarantee-tag-dot"></span>
                  <span>TruMove Guarantee</span>
                </div>
                <div class="tru-guarantee-title">If it feels off, we flag it before you ever sign.</div>
                <div class="tru-guarantee-text">
                  Every quote on TruMove passes through our checks so you do not waste time on carriers that are going to play games on price or service.
                </div>
                <ul class="tru-guarantee-list">
                  <li>No spam calls sold to other brokers.</li>
                  <li>No last minute surprise add ons without receipts.</li>
                  <li>Help from a real human if anything feels wrong on move day.</li>
                </ul>
              </div>

              <div class="tru-guarantee-side">
                <span class="tru-guarantee-highlight">We built TruMove from bad experiences.</span>
                <br />
                You should know the real range, the real crew, and the real reputation before you say yes. If we would not book a mover for our own families, they do not show up in your options.
              </div>
            </div>
          </div>

          <div class="tru-trust-wrap">
            <div class="tru-trust-row">
              <span class="tru-trust-label">Trusted across thousands of moves.</span>

              <span class="tru-trust-badge">
                <span class="tru-trust-dot"></span>
                <span>Google Reviews</span>
              </span>

              <span class="tru-trust-badge">
                <span class="tru-trust-dot"></span>
                <span>Yelp Movers</span>
              </span>

              <span class="tru-trust-badge">
                <span class="tru-trust-dot"></span>
                <span>Better Business Bureau</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- CONTACT -->
      <section class="tru-contact-wrap">
        <div class="tru-contact-inner">
          <h2 class="tru-contact-title">Contact Us</h2>
          <p class="tru-contact-sub">
            Have a question. Send us a message and a TruMove specialist will respond shortly.
          </p>

          <div class="tru-contact-card" id="truContactCard">
            <form class="tru-contact-form" id="truContactForm" novalidate>
              <div class="tru-field" data-field="name">
                <div class="tru-field-inner">
                  <span class="tru-field-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="9" r="3.2" stroke-width="1.6" />
                      <path d="M6.5 18.4C7.6 16.5 9.7 15.3 12 15.3C14.3 15.3 16.4 16.5 17.5 18.4"
                            stroke-width="1.6"
                            stroke-linecap="round" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    id="contactName"
                    class="tru-contact-input"
                    autocomplete="name"
                    required
                  />
                  <label for="contactName" class="tru-field-label">Your name</label>
                </div>
                <div class="tru-field-error-text">Please enter your name.</div>
              </div>

              <div class="tru-field" data-field="email">
                <div class="tru-field-inner">
                  <span class="tru-field-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="5" width="18" height="14" rx="2" stroke-width="1.6" />
                      <path d="M4 7L12 12.5L20 7" stroke-width="1.6" stroke-linecap="round" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    id="contactEmail"
                    class="tru-contact-input"
                    autocomplete="email"
                    required
                  />
                  <label for="contactEmail" class="tru-field-label">Your email</label>
                </div>
                <div class="tru-field-error-text">Please enter a valid email address.</div>
              </div>

              <div class="tru-field textarea-field" data-field="message">
                <div class="tru-field-inner">
                  <span class="tru-field-icon" aria-hidden="true" style="top: 18px; transform: none;">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M5 5H19V14H9L5 18V5Z"
                            stroke-width="1.6"
                            stroke-linejoin="round" />
                    </svg>
                  </span>
                  <textarea
                    id="contactMessage"
                    class="tru-contact-textarea"
                    required
                  ></textarea>
                  <label for="contactMessage" class="tru-field-label textarea-label">Write your message here</label>
                </div>
                <div class="tru-field-error-text">Please add a short message.</div>
              </div>

              <div class="tru-contact-btn-row">
                <button type="submit" class="tru-contact-btn" id="truContactBtn">
                  Send Message
                </button>
                <span class="tru-contact-hint">Average reply time under one business day.</span>
              </div>
            </form>
          </div>

          <div class="tru-contact-secondary">
            <span>Prefer to talk to a real person.</span>
            <button class="tru-contact-secondary-btn" type="button">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6.5 4.5L9.5 4L11 7.5L9.3 8.7C9.9 9.9 10.8 10.9 12 11.7L13.9 10.4L17 12L16.3 15.3C16.2 15.8 15.8 16.1 15.3 16.2C14.1 16.5 12.3 16.1 10.3 14.8C8.3 13.4 6.9 11.7 6.1 10.1C5.5 8.9 5.3 7.8 5.5 6.9C5.6 6.4 5.9 5.9 6.5 4.5Z"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
              </svg>
              <span>Talk to a TruMove specialist</span>
              <span class="chevron">→</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  </div>

  <script>
    // Hero button scroll to mini form
    (function () {
      var btn = document.getElementById("truHeroStartQuote");
      var miniSection = document.getElementById("truMiniSection");
      if (btn && miniSection) {
        btn.addEventListener("click", function () {
          miniSection.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    })();

    // Mini form redirect
    (function () {
      var btn = document.getElementById("truMiniSubmit");
      if (!btn) return;
      btn.addEventListener("click", function () {
        var name = document.getElementById("miniName").value.trim();
        var zip = document.getElementById("miniZip").value.trim();
        var size = document.getElementById("miniSize").value;

        if (!name || !zip || !size) {
          alert("Please fill out all fields to proceed.");
          return;
        }

        // Change this to your real quote page URL
       var url = "https://trumoveinc.com/book-video%2Fphone-consult";

      // If inside an iframe (GoDaddy embed), redirect the full page
      try {
        if (window.top && window.top !== window.self) {
          window.top.location.href = url;
        } else {
          window.location.href = url;
        }
      } catch (e) {
        // If GoDaddy blocks top navigation, open as fallback
        window.open(url, "_blank");
      }
    });
  })();

    // Contact form validation and floating labels
    (function () {
      var form = document.getElementById("truContactForm");
      if (!form) return;

      var nameField = form.querySelector('.tru-field[data-field="name"]');
      var emailField = form.querySelector('.tru-field[data-field="email"]');
      var messageField = form.querySelector('.tru-field[data-field="message"]');

      var nameInput = document.getElementById("contactName");
      var emailInput = document.getElementById("contactEmail");
      var messageInput = document.getElementById("contactMessage");

      function validateEmail(value) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(value).toLowerCase());
      }

      function setFieldState(fieldEl, hasError) {
        if (hasError) {
          fieldEl.classList.add("has-error");
        } else {
          fieldEl.classList.remove("has-error");
        }

        var input = fieldEl.querySelector(".tru-contact-input, .tru-contact-textarea");
        if (input && input.value.trim() !== "") {
          fieldEl.classList.add("has-value");
        } else {
          fieldEl.classList.remove("has-value");
        }
      }

      form.querySelectorAll(".tru-field").forEach(function (fieldEl) {
        var input = fieldEl.querySelector(".tru-contact-input, .tru-contact-textarea");
        if (!input) return;

        input.addEventListener("input", function () {
          setFieldState(fieldEl, false);
        });

        input.addEventListener("blur", function () {
          setFieldState(fieldEl, fieldEl.classList.contains("has-error"));
        });

        setFieldState(fieldEl, false);
      });

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        var hasError = false;

        if (!nameInput.value.trim()) {
          setFieldState(nameField, true);
          hasError = true;
        } else {
          setFieldState(nameField, false);
        }

        if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
          setFieldState(emailField, true);
          hasError = true;
        } else {
          setFieldState(emailField, false);
        }

        if (!messageInput.value.trim()) {
          setFieldState(messageField, true);
          hasError = true;
        } else {
          setFieldState(messageField, false);
        }

        if (hasError) return;

        alert("Thank you. Your message has been sent to the TruMove team.");
        form.reset();
        form.querySelectorAll(".tru-field").forEach(function (fieldEl) {
          fieldEl.classList.remove("has-error", "has-value");
        });
      });
    })();
  </script>
</body>
</html>;

export default function HomePage() {
  useEffect(() => {
    // Hero button scroll to mini form
    (function () {
      var btn = document.getElementById("truHeroStartQuote");
      var miniSection = document.getElementById("truMiniSection");
      if (btn && miniSection) {
        btn.addEventListener("click", function () {
          miniSection.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    })();

    // Mini form redirect
    (function () {
      var btn = document.getElementById("truMiniSubmit");
      if (!btn) return;

      btn.addEventListener("click", function () {
        var name = document.getElementById("miniName")?.value?.trim() || "";
        var zip = document.getElementById("miniZip")?.value?.trim() || "";
        var size = document.getElementById("miniSize")?.value || "";

        if (!name || !zip || !size) {
          alert("Please fill out all fields to proceed.");
          return;
        }

        // TEMP: send them to your internal Next page
        var url = "/online-estimate";

        window.location.href = url;
      });
    })();

    // Contact form validation + floating labels (your existing logic)
    (function () {
      var form = document.getElementById("truContactForm");
      if (!form) return;

      var nameField = form.querySelector('.tru-field[data-field="name"]');
      var emailField = form.querySelector('.tru-field[data-field="email"]');
      var messageField = form.querySelector('.tru-field[data-field="message"]');

      var nameInput = document.getElementById("contactName");
      var emailInput = document.getElementById("contactEmail");
      var messageInput = document.getElementById("contactMessage");

      function validateEmail(value) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(value).toLowerCase());
      }

      function setFieldState(fieldEl, hasError) {
        if (!fieldEl) return;
        if (hasError) fieldEl.classList.add("has-error");
        else fieldEl.classList.remove("has-error");

        var input = fieldEl.querySelector(".tru-contact-input, .tru-contact-textarea");
        if (input && input.value.trim() !== "") fieldEl.classList.add("has-value");
        else fieldEl.classList.remove("has-value");
      }

      form.querySelectorAll(".tru-field").forEach(function (fieldEl) {
        var input = fieldEl.querySelector(".tru-contact-input, .tru-contact-textarea");
        if (!input) return;

        input.addEventListener("input", function () {
          setFieldState(fieldEl, false);
        });

        input.addEventListener("blur", function () {
          setFieldState(fieldEl, fieldEl.classList.contains("has-error"));
        });

        setFieldState(fieldEl, false);
      });

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        var hasError = false;

        if (!nameInput.value.trim()) {
          setFieldState(nameField, true);
          hasError = true;
        } else setFieldState(nameField, false);

        if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
          setFieldState(emailField, true);
          hasError = true;
        } else setFieldState(emailField, false);

        if (!messageInput.value.trim()) {
          setFieldState(messageField, true);
          hasError = true;
        } else setFieldState(messageField, false);

        if (hasError) return;

        alert("Thank you. Your message has been sent to the TruMove team.");
        form.reset();
        form.querySelectorAll(".tru-field").forEach(function (fieldEl) {
          fieldEl.classList.remove("has-error", "has-value");
        });
      });
    })();
  }, []);

  return <main dangerouslySetInnerHTML={{ __html: HTML }} />;
}
