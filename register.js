// Export a function that registers slash commands
module.exports = async (client) => {
  client.on('ready', async () => {
    const commands = [
      {
        name: 'dark',
        description: 'Get a random dark joke',
      },
      {
        name: 'help',
        description: 'Help',
      },
      {
        name: 'm',
        description: 'Sends a random meme',
      },
      {
        name: 'joke',
        description: 'Sends a joke',
      },
      {
        name: 'pickup',
        description: 'Sends a lovely pickup line',
      },
      {
        name: 'rizz',
        description: 'Sends a lovely rizz line',
      },
      {
          name: 'ping',
          description: 'Pong!',
      }  
        
    ];

    try {
      // Register slash commands
      await client.application.commands.set(commands);
      console.log('Registered slash commands successfully.');
    } catch (error) {
      console.error('Error registering slash commands:', error);
    }
  });
};
