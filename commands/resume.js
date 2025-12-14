const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resume the paused song"),

  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);

    if (!queue) {
      return interaction.reply({
        content: "❌ No queue found.",
        ephemeral: true,
      });
    }

    queue.node.resume();
    return interaction.reply("▶️ Music resumed.");
  },
};
