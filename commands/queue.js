const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Show the current music queue"),

  async execute({ interaction, client }) {
    const queue = client.player.nodes.get(interaction.guildId);

    if (!queue || !queue.isPlaying()) {
      return interaction.reply({
        content: "❌ Queue is empty.",
        flags: 64,
      });
    }

    const tracks = queue.tracks.toArray().slice(0, 10);

    const list = tracks
      .map((track, i) => `${i + 1}. ${track.title}`)
      .join("\n");

    interaction.reply(`🎶 **Current Queue:**\n${list}`);
  },
};
