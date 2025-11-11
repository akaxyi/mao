<h1 align="middle">Mao Discord Bot (Template)</h1>

### Setup

1. Copy `config.json.example` to `config.json` and fill in values:

   - `token`: Your Discord bot token
   - `ytToken`: Your YouTube Data API key (optional; only if you add features requiring it)
   - `prefix`: Command prefix, default `-`
   - `PRUNING`: Whether to prune queue messages
   - `mongoUri`: MongoDB connection string for leveling/economy features

2. Install dependencies.

3. Run the bot.

Note: Database-backed features (levels/economy) are disabled until `mongoUri` is provided.

## Categories

- 🎵 Music
- ℹ️ Information
- ⚙️ Utility
- 🔧 Settings
- 🎮 Fun
- 🛠️ Moderation
- 🖼️ Image
- 🏦 Economy

Links and IDs specific to the original bot were intentionally removed. Replace with your own where appropriate.
