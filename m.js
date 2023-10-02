const axios = require('axios');
const { EmbedBuilder } = require('discord.js'); // Import the EmbedBuilder class

// Define an array of meme API URLs
const memeAPIs = [
  'https://meme-api.com/gimme',
  'https://meme-api.com/gimme/wholesomememes',
];

async function execute(interaction) {
  try {
    // Choose a random meme API URL from the array
    const randomAPIIndex = Math.floor(Math.random() * memeAPIs.length);
    const selectedAPI = memeAPIs[randomAPIIndex];

    // Fetch a meme from the selected API
    const response = await axios.get(selectedAPI);
    const meme = response.data;

    // Create an embed using EmbedBuilder and set the image URL fetched from the API
    const embed = new EmbedBuilder()
      
      .setImage(meme.url); // The URL field may vary depending on the API

    // Send the embed as a reply
    interaction.reply({ embeds: [embed] });
  } catch (error) {
    console.error('Error fetching meme:', error);
    interaction.reply('Oops! Something went wrong while fetching a meme.');
  }
}

module.exports = {
  execute,
  name: 'meme',
  description: 'Sends a random meme from one of two different APIs',
};
