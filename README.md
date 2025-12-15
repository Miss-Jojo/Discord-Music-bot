# Discord-Music-bot

<h1>🎵 The Lyre — Discord Music Bot</h1>

The Lyre is a Discord music bot built using discord.js v14 and discord-player v7.
This project is currently in active development and focuses on building a solid, stable core before introducing advanced features.

The goal of this project is not just to “make a bot that plays music”, but to understand Discord’s interaction model, command lifecycle, audio pipelines, and library version compatibility.

<h1>✅ Current Status (Working)</h1>

As of now, the bot supports the following fully functional slash commands:

/play — Play music from YouTube (search or direct link)

/pause — Pause the currently playing track

/resume — Resume paused playback

/skip — Skip the current track

/queue — View the current music queue

/stop — Stop playback and clear the queue
All commands are implemented using:

Discord Slash Commands

Proper guild-based queue management

discord-player’s Node-based architecture

<h2>🧠 What We Learned While Building This</h2>

This project involved solving several real-world issues commonly faced when working with Discord bots:

<h3><b>Major Problems Faced</b></h3>

Slash commands not responding due to missing data exports

guildId being undefined in interactions

Incorrect usage of player.search() (removed in discord-player v7)

Extractor registration errors

Commands showing in Discord but not executing

Breaking changes between discord-player v6 → v7

Environment variables not loading correctly

Deprecated interaction response options (ephemeral warnings)

<h3>Key Takeaways</h3>

Library version compatibility matters a lot

Slash commands require both deployment and runtime handlers

discord-player v7 requires strict queue access via player.nodes

Debugging Discord bots is mostly about structure, not syntax

<h2>🛠 Tech Stack</h2>

Node.js v20+

discord.js v14

discord-player v7

@discord-player/extractor

FFmpeg (installed and configured via system PATH)

<h2>🔮 Roadmap (Planned Improvements)</h2>

🎛 Button controls (Pause / Skip / Stop UI)

🔍 Autocomplete search

🔊 Voice channel permission checks

📜 Better queue embeds

💾 Persistent queues

⚡ Performance optimizations

🎚 Volume control & filters

<h1>📌 Final Note</h1>

This project represents real learning progress.
The focus so far has been stability, correctness, and understanding, and future iterations will build advanced features on top of this solid base.

More features and optimizations are actively planned.
