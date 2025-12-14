const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("exit")
    .setDescription("Stop the music and leave the voice channel"),

  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);

    if (!queue) {
      return interaction.reply({
        content: "❌ No active queue to stop.",
        ephemeral: true,
      });
    }

    queue.delete();
    return interaction.reply("👋 Music stopped. Leaving the voice channel.");
  },
};
