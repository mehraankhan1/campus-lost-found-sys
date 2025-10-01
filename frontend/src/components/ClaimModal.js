// frontend/src/components/ClaimModal.js
import React from "react";
import ClaimForm from "./ClaimForm";

// Default values for missing item fields
const DEFAULT_TITLE = "Untitled";
const DEFAULT_CATEGORY = "Other";
const DEFAULT_TYPE = "Lost";
const DEFAULT_STATUS = "Unclaimed";

export default function ClaimModal({
  item,
  claimData,
  onChange,
  onSubmit,
  onVerify,
  onClose,
  loading = false,
}) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Claim Item</h2>
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <span>&times;</span>
          </button>
        </div>

        <div className="item-preview">
          <h3>Item Details</h3>
          <p>
            <strong>Title:</strong> {item.title || DEFAULT_TITLE}
          </p>
          <p>
            <strong>Category:</strong> {item.category || DEFAULT_CATEGORY}
          </p>
          <p>
            <strong>Type:</strong> {item.type || DEFAULT_TYPE}
          </p>
          <p>
            <strong>Status:</strong> {item.status || DEFAULT_STATUS}
          </p>
        </div>

        {/* Your styled ClaimForm */}
        <ClaimForm
          claimData={claimData}
          onChange={onChange}
          onSubmit={onSubmit}
          onVerify={onVerify}
          loading={loading}
        />
      </div>
    </div>
  );
}
