const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pause the current song"),

  async execute({ interaction, client }) {
    const queue = client.player.nodes.get(interaction.guildId);

    if (!queue || !queue.isPlaying()) {
      return interaction.reply({
        content: "❌ No music is playing.",
        flags: 64,
      });
    }

    queue.node.pause();
    interaction.reply("⏸️ Music paused.");
  },
};
