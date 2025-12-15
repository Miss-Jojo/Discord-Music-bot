const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resume the paused song"),

  async execute({ interaction, client }) {
    const queue = client.player.nodes.get(interaction.guildId);

    if (!queue || !queue.node.isPaused()) {
      return interaction.reply({
        content: "❌ Music is not paused.",
        flags: 64,
      });
    }

    queue.node.resume();
    interaction.reply("▶️ Music resumed.");
  },
};
