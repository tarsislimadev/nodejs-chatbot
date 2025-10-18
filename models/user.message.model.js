const { MessageModel } = require("./message.model.js");

class UserMessageModel extends MessageModel { role = "user"; }

module.exports = { UserMessageModel };
