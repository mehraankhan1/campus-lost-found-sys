// frontend/src/components/ClaimModal.js
import React from "react";
import ClaimForm from "./ClaimForm";

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
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="item-preview">
          <h3>Item Details</h3>
          <p>
            <strong>Title:</strong> {item.title}
          </p>
          <p>
            <strong>Category:</strong> {item.category}
          </p>
          <p>
            <strong>Type:</strong> {item.type}
          </p>
          <p>
            <strong>Status:</strong> {item.status}
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
