// ping.js
module.exports = {
  name: 'ping',
  description: 'Check the bot\'s ping',
  execute(message, args) {
    // Calculate the bot's ping
    const ping = Date.now() - message.createdTimestamp;

    // Send a message with the ping
    message.reply(`Pong! My ping is ${ping}ms.`);
  },
};
