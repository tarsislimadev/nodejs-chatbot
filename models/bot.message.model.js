const { MessageModel } = require("./message.model.js");

class BotMessageModel extends MessageModel { role = "bot"; }

module.exports = { BotMessageModel };
