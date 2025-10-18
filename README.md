# Node.js Chatbot

A simple command-line chatbot application built with Node.js.

## Description

This is an interactive CLI chatbot that responds to user messages using predefined responses and patterns. The bot maintains conversation history and provides various commands for managing the chat session.

## Features

- Interactive command-line interface
- Conversation history tracking
- Pattern-based response system
- Built-in commands for chat management
- Timestamped message logging

## Installation

1. Clone this repository
2. Install dependencies (if any):
```bash
npm install
```

## Usage

Start the chatbot:
```bash
node index.js
```

## Available Commands

- `/help` - Show available commands
- `/exit` or `/quit` - Exit the chatbot
- `/clear` - Clear the screen
- `/history` - Show conversation history
- `/reset` - Reset conversation history

## Project Structure

- `index.js` - Entry point
- `chatbot.js` - Main chatbot logic
- `models/` - Message models
- `libs/` - Utility libraries (logger)
- `vars/` - Response and pattern definitions

## How It Works

The chatbot uses pattern matching to detect keywords in user input and responds with appropriate predefined messages. If no pattern matches, it returns a random response from a fallback list.
