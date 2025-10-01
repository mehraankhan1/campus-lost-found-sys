import React, { useEffect, useState } from "react";
import { adminAPI, claimAPI } from "../services/api";

// 🔹 Constants for UI text
const TEXT = {
  HEADER: "Pending Claims",
  LOADING: "Loading...",
  NO_CLAIMS: "No pending claims.",
  APPROVED: "Approved",
  APPROVE: "Approve",
  SUCCESS_ALERT: "Claim approved successfully!",
  FAILURE_ALERT: "Failed to approve claim.",
};

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
      // silently fail without console log
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
      await claimAPI.approveClaim(claimId);
      alert(TEXT.SUCCESS_ALERT);
      // Refresh the list after approving
      fetchClaims();
    } catch (err) {
      alert(TEXT.FAILURE_ALERT);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>{TEXT.LOADING}</p>;

  return (
    <section className="admin-claims-card card">
      <h2>{TEXT.HEADER}</h2>
      {claims.length === 0 && <p>{TEXT.NO_CLAIMS}</p>}
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
              {claim.approved ? TEXT.APPROVED : TEXT.APPROVE}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}