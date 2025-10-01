
import React from "react";

const DEFAULT_TYPE = "lost";
const DEFAULT_STATUS = "unclaimed";
const DEFAULT_CATEGORY = "Other";
const DEFAULT_OWNER = "—";

/**
 * ItemsList
 * - items: array of item objects
 * - onDelete: function(itemId)
 * - onClaim: function(item)
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
        {items.map((item) => (
          <article
            key={item._id}
            className="item-card"
            role="article"
            aria-labelledby={`item-title-${item._id}`}
          >
            <div className="item-top">
              <div id={`item-title-${item._id}`} className="item-title">
                {item.title || "Untitled"}
              </div>

              <div className="badges">
                <span className={`badge type ${item.type || DEFAULT_TYPE}`}>
                  {(item.type || DEFAULT_TYPE).toUpperCase()}
                </span>
                <span className={`badge status ${item.status || DEFAULT_STATUS}`}>
                  {(item.status || DEFAULT_STATUS).toUpperCase()}
                </span>
              </div>
            </div>

            <div className="item-body">
              <div>
                <strong>Owner:</strong> {item.claimantName || DEFAULT_OWNER}
              </div>
              <div>
                <strong>Category:</strong> {item.category || DEFAULT_CATEGORY}
              </div>
              <div className="muted small">ID: {item._id}</div>
            </div>

            <div className="item-actions">
              <button
                className="btn btn-claim"
                onClick={() => onClaim(item)}
                disabled={item.status === "claimed"}
                title={
                  item.status === "claimed"
                    ? "Item already claimed"
                    : "Claim this item"
                }
                aria-disabled={item.status === "claimed"}
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
                  onClick={() => onDelete(item._id)}
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
