const fs = require('fs');
const path = require('path');
const pickupLines = require('./pickup-lines.json'); // Adjust the path as needed

async function execute(interaction) {
  try {
    let pickupLine = '';

    const mentionedUser = interaction.options.get('user');
    if (mentionedUser) {
      pickupLine = pickupLines.pickupLines[Math.floor(Math.random() * pickupLines.pickupLines.length)];
      pickupLine = pickupLine.replace(/@user/g, `<@${mentionedUser.value}>`);
    } else {
      const randomIndex = Math.floor(Math.random() * pickupLines.pickupLines.length);
      pickupLine = pickupLines.pickupLines[randomIndex];
    }

    interaction.reply(pickupLine);
  } catch (error) {
    console.error('Error fetching pickup line:', error);
    interaction.reply('Oops! Something went wrong while fetching a pickup line.');
  }
}

module.exports = {
  execute,
  name: 'pickup',
  description: 'Sends a lovely pickup line',
};
