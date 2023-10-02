const axios = require('axios');

async function execute(interaction) {
  try {
    const response = await axios.get('https://official-joke-api.appspot.com/jokes/random');
    const joke = response.data;

    // Send the joke setup and punchline as a reply
    interaction.reply(`**Joke:** ${joke.setup}\n**Punchline:** ${joke.punchline}`);
  } catch (error) {
    console.error('Error fetching joke:', error);
    interaction.reply('Oops! Something went wrong while fetching a joke.');
  }
}

module.exports = {
  execute,
  name: 'joke',
  description: 'Sends a joke',
};
