// ./commands/help.js

module.exports = {
  name: 'help',
  description: 'Display a list of available commands and their descriptions.',
  execute(client, message, args) {
    // Create a list of commands with their descriptions
    const commandList = client.commands.map((command) => {
      return `**/${command.name}**: ${command.description}`;
    });

    // Send the list of commands as a message
    message.channel.send(`Here is a list of available commands:\n${commandList.join('\n')}`);
  },
};
