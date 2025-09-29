// frontend/src/components/ClaimForm.js
import React from "react";

/**
 * ClaimForm
 * Props:
 *  - claimData: { itemId, claimantName, claimantEmail, proofText }
 *  - onChange: event handler for inputs
 *  - onSubmit: submit handler
 *  - onVerify: handler for verify email
 *  - loading: optional boolean to disable actions while waiting
 */
export default function ClaimForm({
  claimData = {},
  onChange,
  onSubmit,
  onVerify,
  loading = false,
}) {
  return (
    <section className="form-section claim-form-section card">
      <div className="form-header">
        <h2>Submit a Claim</h2>
        <p className="muted">
          Provide evidence so staff can verify ownership faster.
        </p>
      </div>

      <form onSubmit={onSubmit} className="claim-form-grid" noValidate>
        {/* If itemId already exists (from modal), show as read-only */}
        {claimData.itemId ? (
          <div className="form-row full">
            <label className="label">Item ID</label>
            <input
              name="itemId"
              value={claimData.itemId}
              readOnly
              disabled
              className="input readonly"
            />
            <small className="muted">
              This claim will be linked to the selected item.
            </small>
          </div>
        ) : (
          <div className="form-row full">
            <label className="label">Item ID</label>
            <input
              name="itemId"
              placeholder="Item ID (paste or leave blank)"
              value={claimData.itemId}
              onChange={onChange}
              className="input"
            />
          </div>
        )}

        <div className="form-row">
          <label className="label">Full name</label>
          <input
            name="claimantName"
            placeholder="Your full name"
            value={claimData.claimantName}
            onChange={onChange}
            required
            className="input"
            aria-label="Full name"
          />
        </div>

        <div className="form-row">
          <label className="label">Email</label>
          <input
            type="email"
            name="claimantEmail"
            placeholder="you@student.qut.edu.au"
            value={claimData.claimantEmail}
            onChange={onChange}
            required
            className="input"
            aria-label="Email address"
          />
          <small className="muted">
            Use QUT email for faster verification.
          </small>
        </div>

        <div className="form-row full">
          <label className="label">Proof / Details</label>
          <textarea
            name="proofText"
            placeholder="Describe why this item is yours (serial numbers, unique marks, where/when you lost it)..."
            value={claimData.proofText}
            onChange={onChange}
            rows="5"
            required
            className="input textarea"
          />
        </div>

        <div className="form-actions full">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              "Submitting..."
            ) : (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  className="btn-icon"
                >
                  <path
                    fill="white"
                    d="M5 20h14v-2H5v2zm7-18L5.33 9h3.34v6h5.66V9h3.34L12 2z"
                  />
                </svg>
                Submit Claim
              </>
            )}
          </button>

          <button
            type="button"
            className="btn btn-secondary verify-btn"
            onClick={onVerify}
            disabled={loading || !claimData.claimantEmail}
            title={
              !claimData.claimantEmail ? "Enter an email first" : "Verify email"
            }
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              className="btn-icon"
            >
              <path
                fill="white"
                d="M12 2L2 7l10 5 10-5-10-5zm0 13a7 7 0 1 1 0 14 7 7 0 0 1 0-14z"
              />
            </svg>
            Verify Email
          </button>
        </div>
      </form>
    </section>
  );
}
