require("dotenv").config();

const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { Player } = require("discord-player");
const { DefaultExtractors } = require("@discord-player/extractor");
const fs = require("fs");
const path = require("path");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

// Load commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.data.name, command);
}

// Create player
const player = new Player(client);

// ✅ CORRECT extractor loading for v7+
(async () => {
  await player.extractors.loadMulti(DefaultExtractors);
  console.log("Extractors loaded successfully");
})();

// Interaction handler
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, player);
  } catch (error) {
    console.error(error);

    if (interaction.deferred || interaction.replied) {
      await interaction.editReply(
        "❌ There was an error executing this command."
      );
    } else {
      await interaction.reply({
        content: "❌ There was an error executing this command.",
        flags: 64,
      });
    }
  }
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.TOKEN);
