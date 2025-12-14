const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Show the current music queue"),

  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);

    if (!queue || !queue.tracks || queue.tracks.size === 0) {
      return interaction.reply({
        content: "📭 The queue is empty.",
        ephemeral: true,
      });
    }

    const tracks = queue.tracks
      .toArray()
      .slice(0, 10)
      .map((track, index) => `${index + 1}. ${track.title}`)
      .join("\n");

    return interaction.reply({
      content: `🎶 **Current Queue:**\n${tracks}`,
    });
  },
};
