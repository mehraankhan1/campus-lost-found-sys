// backend/src/services/notificationService.js
class NotificationService {
  constructor() {
    this._observers = [];
  }
  subscribe(observer) {
    this._observers.push(observer);
  }
  notify(message) {
    this._observers.forEach((obs) => obs.notify(message));
  }
}
module.exports = NotificationService;
