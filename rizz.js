const { EmbedBuilder } = require('discord.js');
const rizzData = require('./rizz.json'); // Adjust the path as needed

async function execute(interaction) {
  try {
    const rizzLines = rizzData.rizzLines; // Extract the rizzLines array from the JSON

    const randomIndex = Math.floor(Math.random() * rizzLines.length);
    const rizzLine = rizzLines[randomIndex];

    const randomColor = Math.floor(Math.random() * 16777215).toString(16); // Generate a random hexadecimal color
    const embed = new EmbedBuilder()
      .setDescription(rizzLine)
      .setColor(`#${randomColor}`); // Set the random color

    interaction.reply({ embeds: [embed] });
  } catch (error) {
    console.error('Error sending rizz line:', error);
    interaction.reply('Oops! Something went wrong while sending a rizz line.');
  }
}

module.exports = {
  execute,
  name: 'rizz',
  description: 'Sends a lovely rizz line',
};
