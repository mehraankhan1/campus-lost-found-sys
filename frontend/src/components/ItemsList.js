// frontend/src/components/ItemsList.js
import React from "react";

/**
 * ItemsList
 * - items: array of item objects
 * - onDelete: function(itemId)
 * - onClaim: function(item)    <-- note: we pass the whole item so modal can show details
 */
export default function ItemsList({ items = [], onDelete, onClaim }) {
  if (!Array.isArray(items) || items.length === 0) {
    return (
      <section className="items-section">
        <h2>All Items (0)</h2>
        <div
          className="card empty-state"
          style={{ textAlign: "center", padding: 24 }}
        >
          <h3>No items yet</h3>
          <p className="muted">Report a lost or found item to get started.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="items-section">
      <h2>All Items ({items.length})</h2>

      <div className="items-grid">
        {items.map((it) => (
          <article
            key={it._id}
            className="item-card"
            role="article"
            aria-labelledby={`item-title-${it._id}`}
          >
            <div className="item-top">
              <div id={`item-title-${it._id}`} className="item-title">
                {it.title || "Untitled"}
              </div>

              <div className="badges">
                <span className={`badge type ${it.type || "lost"}`}>
                  {(it.type || "lost").toUpperCase()}
                </span>
                <span className={`badge status ${it.status || "unclaimed"}`}>
                  {(it.status || "unclaimed").toUpperCase()}
                </span>
              </div>
            </div>

            <div className="item-body">
              {/* Owner field may not exist in your model; show a dash if missing */}
              <div>
                <strong>Owner:</strong> {it.claimantName || "—"}
              </div>
              <div>
                <strong>Category:</strong> {it.category || "Other"}
              </div>
              <div className="muted small">ID: {it._id}</div>
            </div>

            <div className="item-actions">
              <button
                className="btn btn-claim"
                onClick={() => onClaim(it)}
                disabled={it.status === "claimed"}
                title={
                  it.status === "claimed"
                    ? "Item already claimed"
                    : "Claim this item"
                }
                aria-disabled={it.status === "claimed"}
              >
                <svg
                  className="btn-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    fill="white"
                    d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm1 15l-5-5 1.4-1.4L13 14.2l4.6-4.6L19 11z"
                  />
                </svg>
                Claim
              </button>

              {/* Delete button only for admin */}
              {localStorage.getItem("role") === "admin" && (
                <button
                  className="btn btn-delete"
                  onClick={() => onDelete(it._id)}
                  title="Delete this item"
                >
                  <svg
                    className="btn-icon"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      fill="white"
                      d="M9 3v1H4v2h16V4h-5V3H9zm1 5v10h2V8H10z"
                    />
                  </svg>
                  Delete
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
