const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a song from YouTube or Spotify")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Song name or URL")
        .setRequired(true)
    ),

  async execute(interaction, player) {
    // MUST acknowledge immediately
    await interaction.deferReply();

    const query = interaction.options.getString("query", true);
    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
      return interaction.editReply("❌ You must be in a voice channel.");
    }

    const result = await player.search(query, {
      requestedBy: interaction.user,
    });

    if (!result.hasTracks()) {
      return interaction.editReply("❌ No results found.");
    }

    await player.play(voiceChannel, result, {
      nodeOptions: {
        metadata: interaction,
        volume: 80,
        leaveOnEmpty: true,
        leaveOnEnd: false,
      },
    });

    return interaction.editReply(
      `🎶 **Now playing:** ${result.tracks[0].title}`
    );
  },
};
