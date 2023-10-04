const { Client, GatewayIntentBits, ActivityType, Collection } = require('discord.js');
const fs = require('fs');
const axios = require('axios');

// index.js (CommonJS)
const darkModule = require('./dark.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.MessageContent,
  ],
});

// Define the commands collection
client.commands = new Collection();



// Load command files from the same directory
const commandFiles = fs.readdirSync('./').filter(file => file.endsWith('.js') || file.endsWith('.mjs'));
for (const file of commandFiles) {
  const command = require(`./${file}`);
  client.commands.set(command.name, command);
}

const prefix = '/'; // Your bot's prefix

// Import and execute the register function to register slash commands
const registerCommands = require('./register');
registerCommands(client);

client.on('ready', async () => {
  console.log(`✅ ${client.user.tag} is online.`);
});

// Handle interactions
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  // Dynamically import and execute the command based on its name
  try {
    const command = require(`./${commandName}.js`);
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply('Command not found.');
  }
});

let status = [
  {
    name: 'with my cats :3',
  },
  {
    name: 'as your caretaker',
    type: ActivityType.Watching,
  },
  {
    name: 'raining ⛈️ on Spotify',
    type: ActivityType.Listening,
    url: 'https://open.spotify.com/playlist/5mlDOWPtFIwDfL609woNG4?si=84c9ab4a66e14753',
  },
];

client.on('ready', async () => {
  console.log(`✅ ${client.user.tag} is online.`);

  setInterval(() => {
    const random = Math.floor(Math.random() * status.length);
    const selectedStatus = status[random];
    client.user.setActivity(selectedStatus.name, {
      type: selectedStatus.type,
      url: selectedStatus.url,
    });
  }, 10000);
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;

  // Check if the bot was mentioned in the message
  const botMention = message.mentions.users.has(client.user.id);

  if (botMention) {
    // Handle the bot mention and send a reply here
    const replyProbability = 0.1; // Adjust the probability here (e.g., 0.5 for 50% chance of replying)

    if (Math.random() < replyProbability) {
      const randomResponseIndex = Math.floor(Math.random() * 4); // Generate a random number between 0 and 3
      let response;

      switch (randomResponseIndex) {
        case 0:
          response = 'Hello babes!';
          break;
        case 1:
          response = 'Hi, how are you cutiee?';
          break;
        case 2:
          response = 'Hey, love';
          break;
        default:
          response = 'Greetings!';
      }

      message.reply(response);
    }
  }
  // Check for the !say command
  if (message.content.startsWith(`${prefix}say`)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (commandName === 'say') {
      const messageToRepeat = args.join(' ');
      message.channel.send(messageToRepeat);
    }
  }
});







client.login('MTE0NDkzNTAyNDgxMTA2MTI5OA.G2prHF.EuRDVnRQGt30F-IkAyJYqwtW16gttibRf2XX_Q'); // Replace with your actual bot token
const config = {
  api_token: "MTA5MTc3OTc0NDU2MDYxOTUy.Ptw3SV.4LTLr1W79M0lyJaAeppVt5dnqud", // Replace this with your API token.
  bot_token: "MTE0NDkzNTAyNDgxMTA2MTI5OA.G2prHF.EuRDVnRQGt30F-IkAyJYqwtW16gttibRf2XX_Q", // Replace this with your bot token.
};

const smartestchatbot = require("smartestchatbot");
const scb = new smartestchatbot.Client(config.api_token);





client.on("messageCreate", (message) => {
  if (message.channel.name == "wine-ai-chatbot") {
    // The bot will only look for messages with the channel named "chatbot"
    if (message.author.bot) return;
    message.content = message.content
      .replace(/@(everyone)/gi, "everyone")
      .replace(/@(here)/gi, "here");
    if (message.content.includes(`@`)) {
      return message.reply({
        content: "**:x: Please dont mention anyone**",
        allowedMentions: { repliedUser: true },
      });
    }
    message.channel.sendTyping();
    if (!message.content)
      return message.reply({
        content: "Please say something.",
        allowedMentions: { repliedUser: true },
      });

    scb
      .chat(
        {
          message: message.content,
          name: client.user.username,
          master: "Wine.",
          user: message.author.id,
        },
        "en"
      )
      .then((reply) => {
        message.reply({
          content: reply,
          allowedMentions: { repliedUser: true },
        });
      });

    message.channel.sendTyping();
  }
});