// frontend/src/components/ClaimForm.js
import React from "react";

// 🔹 Centralized constants for ClaimForm
const CLAIM_FORM_CONSTANTS = {
  HEADER: {
    TITLE: "Submit a Claim",
    SUBTITLE: "Provide evidence so staff can verify ownership faster.",
  },
  ITEM_ID: {
    LABEL: "Item ID",
    PLACEHOLDER: "Item ID (paste or leave blank)",
    INFO: "This claim will be linked to the selected item.",
  },
  NAME: {
    LABEL: "Full name",
    PLACEHOLDER: "Your full name",
    ARIA_LABEL: "Full name",
  },
  EMAIL: {
    LABEL: "Email",
    PLACEHOLDER: "you@student.qut.edu.au",
    INFO: "Use QUT email for faster verification.",
    ARIA_LABEL: "Email address",
  },
  PROOF: {
    LABEL: "Proof / Details",
    PLACEHOLDER:
      "Describe why this item is yours (serial numbers, unique marks, where/when you lost it)...",
  },
  BUTTONS: {
    SUBMIT: "Submit Claim",
    SUBMITTING: "Submitting...",
    VERIFY: "Verify Email",
    VERIFY_DISABLED_TITLE: "Enter an email first",
    VERIFY_ENABLED_TITLE: "Verify email",
  },
};

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
        <h2>{CLAIM_FORM_CONSTANTS.HEADER.TITLE}</h2>
        <p className="muted">{CLAIM_FORM_CONSTANTS.HEADER.SUBTITLE}</p>
      </div>

      <form onSubmit={onSubmit} className="claim-form-grid" noValidate>
        {/* If itemId already exists (from modal), show as read-only */}
        {claimData.itemId ? (
          <div className="form-row full">
            <label className="label">{CLAIM_FORM_CONSTANTS.ITEM_ID.LABEL}</label>
            <input
              name="itemId"
              value={claimData.itemId}
              readOnly
              disabled
              className="input readonly"
            />
            <small className="muted">
              {CLAIM_FORM_CONSTANTS.ITEM_ID.INFO}
            </small>
          </div>
        ) : (
          <div className="form-row full">
            <label className="label">{CLAIM_FORM_CONSTANTS.ITEM_ID.LABEL}</label>
            <input
              name="itemId"
              placeholder={CLAIM_FORM_CONSTANTS.ITEM_ID.PLACEHOLDER}
              value={claimData.itemId}
              onChange={onChange}
              className="input"
            />
          </div>
        )}

        <div className="form-row">
          <label className="label">{CLAIM_FORM_CONSTANTS.NAME.LABEL}</label>
          <input
            name="claimantName"
            placeholder={CLAIM_FORM_CONSTANTS.NAME.PLACEHOLDER}
            value={claimData.claimantName}
            onChange={onChange}
            required
            className="input"
            aria-label={CLAIM_FORM_CONSTANTS.NAME.ARIA_LABEL}
          />
        </div>

        <div className="form-row">
          <label className="label">{CLAIM_FORM_CONSTANTS.EMAIL.LABEL}</label>
          <input
            type="email"
            name="claimantEmail"
            placeholder={CLAIM_FORM_CONSTANTS.EMAIL.PLACEHOLDER}
            value={claimData.claimantEmail}
            onChange={onChange}
            required
            className="input"
            aria-label={CLAIM_FORM_CONSTANTS.EMAIL.ARIA_LABEL}
          />
          <small className="muted">{CLAIM_FORM_CONSTANTS.EMAIL.INFO}</small>
        </div>

        <div className="form-row full">
          <label className="label">{CLAIM_FORM_CONSTANTS.PROOF.LABEL}</label>
          <textarea
            name="proofText"
            placeholder={CLAIM_FORM_CONSTANTS.PROOF.PLACEHOLDER}
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
              CLAIM_FORM_CONSTANTS.BUTTONS.SUBMITTING
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
                {CLAIM_FORM_CONSTANTS.BUTTONS.SUBMIT}
              </>
            )}
          </button>

          <button
            type="button"
            className="btn btn-secondary verify-btn"
            onClick={onVerify}
            disabled={loading || !claimData.claimantEmail}
            title={
              !claimData.claimantEmail
                ? CLAIM_FORM_CONSTANTS.BUTTONS.VERIFY_DISABLED_TITLE
                : CLAIM_FORM_CONSTANTS.BUTTONS.VERIFY_ENABLED_TITLE
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
            {CLAIM_FORM_CONSTANTS.BUTTONS.VERIFY}
          </button>
        </div>
      </form>
    </section>
  );
}
