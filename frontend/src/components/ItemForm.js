// frontend/src/components/ItemForm.js
import React from "react";

export default function ItemForm({
  newItem,
  foundTitle,
  onChange,
  onSubmit,
  onTestMatch,
}) {
  return (
    <section className="form-section">
      <div className="form-card">
        <h2 className="form-title">📋 Report Lost / Found Item</h2>
        <p className="form-subtitle">
          Fill in the details below to report a lost or found item.
        </p>

        <form onSubmit={onSubmit} className="styled-form">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">Item Title</label>
            <input
              id="title"
              name="title"
              placeholder="e.g. iPhone, Backpack"
              value={newItem.title}
              onChange={onChange}
              required
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              id="category"
              name="category"
              placeholder="e.g. Electronics, Books"
              value={newItem.category}
              onChange={onChange}
              required
            />
          </div>

          {/* Found Title Match */}
          <div className="form-group">
            <label htmlFor="foundTitle">Found Title (for match)</label>
            <input
              id="foundTitle"
              name="foundTitle"
              placeholder="Enter title to test match"
              value={foundTitle}
              onChange={(e) => onChange(e, "foundTitle")}
            />
          </div>

          {/* Lost or Found Selector */}
          <div className="form-group">
            <label htmlFor="type">Item Type</label>
            <select
              id="type"
              name="type"
              value={newItem.type}
              onChange={onChange}
              required
            >
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              🚀 Report
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onTestMatch}
            >
              🔍 Test Match
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
