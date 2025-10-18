const readline = require("readline");

const { UserMessageModel } = require("./models/user.message.model.js");
const { BotMessageModel } = require("./models/bot.message.model.js");

const { Logger } = require("./libs/logger/index.js");

const responses = require("./vars/responses.js");
const includes = require("./vars/includes.js");

class ChatBot {
  logger = new Logger();

  constructor() {
    this.conversationHistory = [];
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "You: "
    });

    this.setupEventHandlers();
  }

  setupEventHandlers() {
    this.rl.on("line", (input) => {
      this.handleInput(input.trim());
    });

    this.rl.on("SIGINT", () => {
      this.rl.question("Are you sure you want to exit? (y/N)", (answer) => {
        if (answer.match(/^y(es)?$/i)) this.rl.pause();
        else this.rl.prompt();
      });
    });

    this.rl.on("close", () => {
      this.logger.log("Goodbye! Thanks for chatting.");
      process.exit(0);
    });
  }

  handleInput(input) {
    if (!input) {
      this.rl.prompt();
      return;
    }

    if (input.startsWith("/")) {
      this.handleCommand(input);
      return;
    }

    this.conversationHistory.push(new UserMessageModel(input));

    const response = this.getBotResponse(input);
    this.conversationHistory.push(new BotMessageModel(response));
    this.logger.log(`\nBot: ${response}\n`);

    this.rl.prompt();
  }

  handleCommand(command) {
    const cmd = command.toLowerCase().split(" ")[0];

    switch (cmd) {
    case "/help":
      this.showHelp();
      break;
    case "/exit": case "/quit":
      this.close();
      break;
    case "/clear":
      this.clear();
      break;
    case "/history":
      this.showHistory();
      break;
    case "/reset":
      this.reset();
      break;
    default:
      this.logger.log(`Unknown command: ${command}`);
      this.logger.log("Type /help to see available commands.\n");
    }

    this.rl.prompt();
  }

  showHelp() {
    this.logger.log([
      "Available Commands:",
      "  /help     - Show this help message",
      "  /exit     - Exit the chatbot",
      "  /quit     - Exit the chatbot",
      "  /clear    - Clear the screen",
      "  /history  - Show conversation history",
      "  /reset    - Reset conversation history",
    ].join("\n"));
  }

  close() {
    this.rl.close();
  }

  clear() {
    console.clear();
    this.logger.log("Chat history cleared from screen.\n");
  }

  showHistory() {
    if (this.conversationHistory.length === 0) {
      this.logger.log("No conversation history yet.\n");
      return;
    }

    this.logger.log("Conversation History:");
    this.logger.log("=".repeat(50));
    this.showHistoryLines();
    this.logger.log("=".repeat(50) + "\n");
  }

  showHistoryLines() {
    this.conversationHistory.forEach((entry) => {
      const time = entry.timestamp.toLocaleTimeString();
      const role = entry.role === "user" ? "You" : "Bot";
      this.logger.log(`[${time}] ${role}: ${entry.message}`);
    });
  }

  reset() {
    this.conversationHistory = [];
    this.logger.log("Conversation history has been reset.\n");
  }

  getBotResponse(userInput) {
    const input = userInput.toLowerCase();

    for (const include in includes) {
      for (const question in include.question) {
        if (input.includes(question)) {
          return include.answer;
        }
      }
    }

    return responses[Math.floor(Math.random() * responses.length)];
  }

  start() {
    console.clear();
    this.logger.log("=".repeat(50));
    this.logger.log("         Welcome to ChatBot CLI");
    this.logger.log("=".repeat(50));
    this.logger.log("Type your messages and press Enter to chat.");
    this.logger.log("Type /help for available commands.\n");

    this.rl.prompt();
  }
}

module.exports = { ChatBot };
