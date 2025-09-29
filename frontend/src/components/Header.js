// frontend/src/components/Header.js
import React from "react";

export default function Header() {
  return (
    <header className="header header-creative">
      <div className="header-inner">
        <div className="brand">
          <div className="logo">
            {/* simple SVG mark */}
            <svg width="40" height="40" viewBox="0 0 24 24" aria-hidden>
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0" stopColor="#6d28d9" />
                  <stop offset="1" stopColor="#2563eb" />
                </linearGradient>
              </defs>
              <rect rx="6" width="24" height="24" fill="url(#g)" />
              <path
                d="M7 10c1.5-1 3.5-1 5 0 1.5 1 2 3 1 4.5-1 2.5-6 2.5-7.5 0-1-1.6-.5-3.3 1.5-4.5z"
                fill="rgba(255,255,255,0.9)"
              />
            </svg>
          </div>
          <div>
            <h1 className="header-title">Campus Lost & Found</h1>
            <p className="header-sub">
              Clean UI • OOP • Design Patterns • React CRUD
            </p>
          </div>
        </div>

        <div className="header-actions" aria-hidden>
          <button className="btn header-cta" title="Report an item">
            + Report
          </button>
          <button className="icon-btn" aria-label="Notifications">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="white"
                d="M12 2a6 6 0 0 0-6 6v3.586L4.293 15.293A1 1 0 0 0 5 17h14a1 1 0 0 0 .707-1.707L18 11.586V8a6 6 0 0 0-6-6zM8 20a4 4 0 0 0 8 0H8z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="header-wave" aria-hidden>
        {/* decorative wave */}
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path
            d="M0,40 C180,80 360,0 720,40 C1080,80 1260,0 1440,40 L1440 80 L0 80 Z"
            fill="rgba(255,255,255,0.06)"
          />
        </svg>
      </div>
    </header>
  );
}
