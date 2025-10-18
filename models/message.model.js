class MessageModel {
  role = "none";
  message = null;
  timestamp = new Date();

  constructor(message) {
    this.message = message;
  }
}

module.exports = { MessageModel };
