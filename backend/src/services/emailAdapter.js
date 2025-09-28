// backend/src/services/emailAdapter.js
class EmailAdapter {
  send(email, message) {
    console.log(`Adapted send to ${email}: ${message}`);
  }
}
module.exports = EmailAdapter;
