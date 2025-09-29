// src/oop/AdminProxy.js
class RealAdmin {
  deleteItem(itemId) {
    return `Item ${itemId} deleted from system.`;
  }
}

class AdminProxy {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.realAdmin = null;
  }

  authenticate() {
    return this.email === "admin@qut.edu.au" && this.password === "admin123";
  }

  deleteItem(itemId) {
    if (this.authenticate()) {
      if (!this.realAdmin) {
        this.realAdmin = new RealAdmin();
      }
      return this.realAdmin.deleteItem(itemId);
    } else {
      return "Access denied. Admin only.";
    }
  }
}

module.exports = { AdminProxy };
