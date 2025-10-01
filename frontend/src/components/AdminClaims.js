import React, { useEffect, useState } from "react";
import { adminAPI, claimAPI } from "../services/api";

export default function AdminClaims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all claims for admin
  const fetchClaims = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getClaims();
      setClaims(res.data); // assuming backend returns array of claim objects
    } catch (err) {
      console.error(
        "Error fetching claims:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  // Approve a claim
  const handleApprove = async (claimId) => {
    try {
      setLoading(true);
      const res = await claimAPI.approveClaim(claimId);
      console.log(res.data);
      alert("Claim approved successfully!");
      // Refresh the list after approving
      fetchClaims();
    } catch (err) {
      console.error(
        "Error approving claim:",
        err.response?.data || err.message
      );
      alert("Failed to approve claim.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <section className="admin-claims-card card">
      <h2>Pending Claims</h2>
      {claims.length === 0 && <p>No pending claims.</p>}
      <ul>
        {claims.map((claim) => (
          <li key={claim._id} style={{ marginBottom: 12 }}>
            <p>
              <strong>{claim.claimantName}</strong> ({claim.claimantEmail})
              <br />
              Item ID: {claim.itemId}
              <br />
              Proof: {claim.proofText}
            </p>
            <button
              onClick={() => handleApprove(claim._id)}
              disabled={claim.approved || loading}
              className={
                claim.approved ? "btn btn-secondary" : "btn btn-primary"
              }
            >
              {claim.approved ? "Approved" : "Approve"}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
