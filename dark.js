const axios = require('axios');

// Now you can use axios for making HTTP requests


async function execute(interaction) {
  try {
    const response = await fetch('https://v2.jokeapi.dev/joke/Dark', {
      headers: {
        'User-Agent': 'Discord Bot',
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (data.type === 'single') {
        interaction.reply(data.joke);
      } else if (data.type === 'twopart') {
        interaction.reply(`${data.setup}\n\n${data.delivery}`);
      }
    } else {
      interaction.reply('Oops! Something went wrong while fetching the joke.');
    }
  } catch (error) {
    console.error('Error fetching joke:', error);
    interaction.reply('Oops! An error occurred while fetching the joke.');
  }
}

module.exports = {
  execute,
  name: 'darkjoke', // Command name
  description: 'Get a random dark joke', // Command description
};
