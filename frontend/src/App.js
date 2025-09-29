// frontend/src/App.js
import React, { useState, useEffect } from "react";
import api, { itemAPI, claimAPI, adminAPI } from "./services/api"; // note: adminAPI added
import Header from "./components/Header";
import ItemForm from "./components/ItemForm";
import ItemsList from "./components/ItemsList";
import ClaimModal from "./components/ClaimModal";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [claims, setClaims] = useState([]); // for admin
  const [lostItems, setLostItems] = useState([]); // for admin

  const [newItem, setNewItem] = useState({
    title: "",
    category: "",
    type: "lost",
  });
  const [foundTitle, setFoundTitle] = useState("");
  const [claimData, setClaimData] = useState({
    itemId: "",
    claimantName: "",
    claimantEmail: "",
    proofText: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // UI state
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState("items");
  const [search, setSearch] = useState("");

  // Admin login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchItems();
  }, []);

  // Helpers
  const unwrap = (res) => (res && res.data !== undefined ? res.data : res);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await itemAPI.getAllItems();
      setItems(unwrap(res) || []);
    } catch (err) {
      setMessage("Error loading items: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminData = async () => {
    if (role !== "admin") return;
    try {
      const lostRes = await adminAPI.getLostItems();
      setLostItems(unwrap(lostRes) || []);

      const claimsRes = await adminAPI.getClaims();
      setClaims(unwrap(claimsRes) || []);
    } catch (err) {
      setMessage("Error fetching admin data: " + err.message);
    }
  };

  // ---------- Login ----------
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@qut.edu.au" && password === "admin123") {
      localStorage.setItem("role", "admin");
      localStorage.setItem("email", email);
      setMessage("✅ Admin logged in");
      setActiveTab("admin");
      fetchAdminData();
    } else {
      setMessage("❌ Invalid credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    setMessage("Logged out");
    setActiveTab("items");
  };

  // ---------- User actions ----------
  const handleItemChange = (e, special) => {
    if (special === "foundTitle") return setFoundTitle(e.target.value);
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleClaimChange = (e) =>
    setClaimData({ ...claimData, [e.target.name]: e.target.value });

  const handleItemSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await itemAPI.createItem(newItem);
      setMessage(`Item "${newItem.title}" created.`);
      setNewItem({ title: "", category: "", type: "lost" });
      setFoundTitle("");
      fetchItems();
      setActiveTab("items");
    } catch (err) {
      setMessage("Error creating item: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTestMatch = async () => {
    if (!newItem.title || !foundTitle) {
      setMessage("Enter both lost and found titles to test match");
      return;
    }
    try {
      const res = await itemAPI.matchItems({
        lostTitle: newItem.title,
        foundTitle,
        category: newItem.category,
      });
      setMessage(unwrap(res).match ? "✅ Items match!" : "❌ No match found");
    } catch (err) {
      setMessage("Error testing match: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await itemAPI.deleteItem(id);
      setMessage("Item deleted");
      fetchItems();
    } catch (err) {
      setMessage("Error deleting item: " + err.message);
    }
  };

  const handleClaimClick = (item) => {
    if (item.status === "claimed") {
      setMessage("This item has already been claimed");
      return;
    }
    setSelectedItem(item);
    setClaimData({
      itemId: item._id,
      claimantName: "",
      claimantEmail: "",
      proofText: "",
    });
    setShowClaimModal(true);
  };

  const handleCloseModal = () => {
    setShowClaimModal(false);
    setSelectedItem(null);
    setClaimData({
      itemId: "",
      claimantName: "",
      claimantEmail: "",
      proofText: "",
    });
  };

  const handleClaimSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await claimAPI.createClaim(claimData);
      setMessage("Claim submitted. Staff will review it.");
      handleCloseModal();
      fetchItems();
    } catch (err) {
      setMessage("Error submitting claim: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------- Filtering ----------
  const visibleItems = items
    .filter((it) => it.title?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (a.status === "claimed" ? 1 : -1));

  return (
    <div className="App shell">
      <Header />
      <div className="main-layout">
        <aside className="sidebar">
          <div className="brand">
            <h3>Campus Lost & Found</h3>
            <p className="muted">Simple — Fast — Trustworthy</p>
          </div>

          <nav className="nav">
            <button
              className={`nav-btn ${activeTab === "items" ? "active" : ""}`}
              onClick={() => setActiveTab("items")}
            >
              Items
            </button>
            <button
              className={`nav-btn ${activeTab === "report" ? "active" : ""}`}
              onClick={() => setActiveTab("report")}
            >
              Report Item
            </button>
            <button
              className={`nav-btn ${activeTab === "stats" ? "active" : ""}`}
              onClick={() => setActiveTab("stats")}
            >
              Stats
            </button>

            {role === "admin" && (
              <button
                className={`nav-btn ${activeTab === "admin" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("admin");
                  fetchAdminData();
                }}
              >
                Admin
              </button>
            )}
          </nav>

          <div className="search">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search items..."
            />
          </div>

          <div className="help">
            <small>
              Tip: Click an item to claim. Verify email for faster approval.
            </small>
          </div>

          {role === "admin" ? (
            <button onClick={handleLogout} className="nav-btn logout-btn">
              Logout
            </button>
          ) : (
            <form onSubmit={handleLogin} className="admin-login-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Admin Email"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button type="submit">Login</button>
            </form>
          )}
        </aside>

        <main className="content">
          {message && <div className="flash">{message}</div>}

          {activeTab === "report" && (
            <section className="card">
              <h2>Report Lost / Found Item</h2>
              <ItemForm
                newItem={newItem}
                foundTitle={foundTitle}
                onChange={handleItemChange}
                onSubmit={handleItemSubmit}
                onTestMatch={handleTestMatch}
              />
            </section>
          )}

          {activeTab === "items" && (
            <section className="card">
              <div className="card-header">
                <h2>Available Items</h2>
                <div className="small-actions">
                  <button onClick={() => setActiveTab("report")}>
                    + Report
                  </button>
                  <button onClick={fetchItems}>Refresh</button>
                </div>
              </div>
              {loading ? (
                <div className="loading">Loading...</div>
              ) : (
                <ItemsList
                  items={visibleItems}
                  onDelete={handleDelete}
                  onClaim={handleClaimClick}
                />
              )}
            </section>
          )}

          {activeTab === "stats" && (
            <section className="card stats-card">
              <h2>System Stats</h2>
              <div className="stats-grid">
                <div className="stat">
                  <div className="stat-value">{items.length}</div>
                  <div className="stat-label">Total items</div>
                </div>
                <div className="stat">
                  <div className="stat-value">
                    {items.filter((i) => i.status === "unclaimed").length}
                  </div>
                  <div className="stat-label">Available</div>
                </div>
                <div className="stat">
                  <div className="stat-value">
                    {items.filter((i) => i.status === "claimed").length}
                  </div>
                  <div className="stat-label">Claimed</div>
                </div>
              </div>
            </section>
          )}

          {activeTab === "admin" && role === "admin" && (
            <section className="card">
              <h2>Admin Dashboard</h2>
              <div>
                <h3>Lost Items</h3>
                <ul>
                  {lostItems.map((it) => (
                    <li key={it._id}>
                      {it.title} ({it.category})
                    </li>
                  ))}
                </ul>
                <h3>Claims</h3>
                <ul>
                  {claims.map((cl) => (
                    <li key={cl._id}>
                      {cl.claimantName} - {cl.claimantEmail} (Item: {cl.itemId})
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </main>
      </div>

      {showClaimModal && selectedItem && (
        <ClaimModal
          item={selectedItem}
          claimData={claimData}
          onChange={handleClaimChange}
          onSubmit={handleClaimSubmit}
          onVerify={() => {}}
          onClose={handleCloseModal}
          loading={loading}
        />
      )}
    </div>
  );
}

export default App;
