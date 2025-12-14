const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pause the current song"),

  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);

    if (!queue || !queue.isPlaying()) {
      return interaction.reply({
        content: "❌ No music is currently playing.",
        ephemeral: true,
      });
    }

    queue.node.pause();
    return interaction.reply("⏸️ Music paused.");
  },
};
