// backend/src/services/notificationService.js

class NotificationService {
  constructor() {
    // Private list of subscribers (students, staff, etc.)
    this._observers = [];
  }

  // Subscribe a new observer
  subscribe(observer) {
    this._observers.push(observer);
  }

  // Send message to all subscribers
  notify(message) {
    this._observers.forEach((observer) => {
      if (typeof observer.update === "function") {
        observer.update(message); // Call the update method on each observer
      }
    });
  }
}

// Export a single instance (so everyone uses the same service)
module.exports = new NotificationService();
