const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stop music and clear the queue"),

  async execute({ interaction, client }) {
    const queue = client.player.nodes.get(interaction.guildId);

    if (!queue) {
      return interaction.reply({
        content: "❌ No music session found.",
        flags: 64,
      });
    }

    queue.delete();
    interaction.reply("🛑 Music stopped and queue cleared.");
  },
};
