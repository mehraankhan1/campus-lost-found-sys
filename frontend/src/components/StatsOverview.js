import React from "react";

export default function StatsOverview({ items }) {
  const totalItems = items.length;
  const claimed = items.filter((i) => i.status === "claimed").length;
  const unclaimed = items.filter((i) => i.status === "unclaimed").length;

  // Export handler
  const handleExport = () => {
    // Convert items to CSV string
    const headers = ["Title", "Category", "Status"];
    const rows = items.map((it) => [it.title, it.category, it.status]);
    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    // Create a blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "lost_and_found_stats.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="card stats-card">
      <div className="stats-header">
        <h2>📊 Performance Overview</h2>
        <button className="btn btn-secondary" onClick={handleExport}>
          Export
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat">
          <div className="stat-value">{totalItems}</div>
          <div className="stat-label">Total Items</div>
        </div>
        <div className="stat">
          <div className="stat-value">{claimed}</div>
          <div className="stat-label">Claimed</div>
        </div>
        <div className="stat">
          <div className="stat-value">{unclaimed}</div>
          <div className="stat-label">Unclaimed</div>
        </div>
        <div className="stat">
          <div className="stat-value">3.2 days</div>
          <div className="stat-label">Avg. Time to Claim</div>
        </div>
      </div>

      {/* Placeholder for future charts */}
      <div className="stats-charts">
        <div className="chart-card">📈 Items Reported Over Time</div>
        <div className="chart-card">📊 Claim Rate by Category</div>
        <div className="chart-card">⏳ Time to Claim Distribution</div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.slice(0, 5).map((it) => (
              <tr key={it._id}>
                <td>{it.title}</td>
                <td>{it.category}</td>
                <td>{it.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
