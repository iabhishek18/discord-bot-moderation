# Discord Bot — Moderation & Music

> Feature-rich Discord bot with slash commands for moderation (ban/kick/warn/timeout), YouTube music playback with queue, XP leveling system, and server configuration.

## 🚀 Overview

A production-ready Discord bot built with Discord.js v14 featuring a complete moderation suite (ban, kick, warn with auto-timeout at 3 warnings), YouTube music playback with queue management, an XP leveling system with leaderboards, and per-guild configuration storage in MongoDB.

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🛡️ Auto-Moderation | Ban, kick, warn (auto-timeout at 3 warns) |
| 🎵 Music Playback | YouTube with queue, skip, pause |
| 📊 XP Leveling | Message-based XP with leaderboard |
| ⚙️ Guild Config | Per-server settings (prefix, channels, roles) |
| 🎫 Slash Commands | Modern Discord slash command interface |
| 📋 Audit Logging | Moderation actions logged to channel |
| 👋 Welcome Messages | Configurable welcome channel |
| 🎁 Giveaways | Timed giveaways with reactions |

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| Framework | Discord.js v14 |
| Voice | @discordjs/voice, ytdl-core |
| Database | MongoDB + Mongoose |
| Language | TypeScript |
| Runtime | Node.js 20+ |

## ⚡ Quick Start

```bash
npm install
cp .env.example .env
# Add your Discord bot token and MongoDB URI
npm run dev
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `DISCORD_TOKEN` | Bot token from Discord Developer Portal |
| `MONGODB_URI` | MongoDB connection string |
| `CLIENT_ID` | Application ID for slash commands |

### Slash Commands

| Command | Permission | Description |
|---------|-----------|-------------|
| `/ban @user [reason]` | Ban Members | Ban a user |
| `/warn @user <reason>` | Moderate Members | Issue warning |
| `/play <url/search>` | - | Play YouTube audio |

## 📄 License

MIT
