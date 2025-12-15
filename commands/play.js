const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a song from YouTube or search")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Song name or YouTube URL")
        .setRequired(true)
    ),

  async execute({ client, interaction }) {
    const query = interaction.options.getString("query");

    if (!query) {
      return interaction.reply({
        content: "You must provide a song name or URL.",
        ephemeral: true,
      });
    }

    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.reply({
        content: "You need to be in a voice channel first.",
        ephemeral: true,
      });
    }

    await interaction.deferReply();

    try {
      const result = await client.player.search(query, {
        requestedBy: interaction.user,
      });

      if (!result.hasTracks()) {
        return interaction.editReply("No results found.");
      }

      await client.player.play(voiceChannel, result, {
        nodeOptions: {
          metadata: interaction,
        },
      });

      return interaction.editReply(
        `🎶 **Now Playing:** ${result.tracks[0].title}`
      );
    } catch (error) {
      console.error(error);
      return interaction.editReply("Failed to play this track.");
    }
  },
};
