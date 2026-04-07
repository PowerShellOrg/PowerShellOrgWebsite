# Discord Mirror Quick Start

1. Add the `DISCORD_BOT_TOKEN` secret to the GitHub repository.
2. Update `config/discord-mirror.json` with the real guild ID and channel IDs.
3. Give the Discord bot **View Channel** and **Read Message History** in the selected channels.
4. Push the changes to `main`.
5. Verify the GitHub Actions workflow succeeds.
6. Open `/discord/` and `/discord/search/` on the site.
7. Verify moderation controls are working before announcing the feature publicly.
