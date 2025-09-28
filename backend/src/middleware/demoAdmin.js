// backend/src/middleware/demoAdmin.js
// Very small demo-only admin guard.
// Checks request header 'x-admin-email' and 'x-admin-pass' against hardcoded demo creds.
// For assignment/demo use only.

const DEMO_ADMIN_EMAIL = process.env.DEMO_ADMIN_EMAIL || "admin@qut.edu.au";
const DEMO_ADMIN_PASS = process.env.DEMO_ADMIN_PASS || "admin123";

function demoAdminGuard(req, res, next) {
  const email = req.header("x-admin-email");
  const pass = req.header("x-admin-pass");

  if (email === DEMO_ADMIN_EMAIL && pass === DEMO_ADMIN_PASS) {
    // attach demo user info for downstream handlers (optional)
    req.user = { email, role: "admin", demo: true };
    return next();
  }

  return res.status(403).json({ error: "Admin access required (demo mode)" });
}

module.exports = demoAdminGuard;
