const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { Player } = require("discord-player");
const { DefaultExtractors } = require("@discord-player/extractor");
const fs = require("node:fs");
const path = require("node:path");
require("dotenv").config();

/* -------------------- CLIENT -------------------- */
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

/* -------------------- PLAYER -------------------- */
const player = new Player(client);
client.player = player;

/* -------------------- LOAD EXTRACTORS -------------------- */
(async () => {
  await player.extractors.loadMulti(DefaultExtractors);
  console.log("Extractors loaded successfully");
})();

/* -------------------- COMMAND COLLECTION -------------------- */
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.warn(`[WARNING] Command ${file} is missing data or execute.`);
  }
}

/* -------------------- INTERACTION HANDLER -------------------- */
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute({ client, interaction });
  } catch (error) {
    console.error(error);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error executing this command.",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error executing this command.",
        ephemeral: true,
      });
    }
  }
});

/* -------------------- READY -------------------- */
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

/* -------------------- LOGIN -------------------- */
client.login(process.env.TOKEN);
