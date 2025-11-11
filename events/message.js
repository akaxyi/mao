require("discord-reply");
const { client, config } = require("../index.js");
const { Collection, MessageEmbed } = require("discord.js");
const cooldowns = new Collection();
const Levels = require("discord-xp");
if (config.mongoUri) {
  Levels.setURL(config.mongoUri);
}
const { Database } = require("quickmongo");
const quickmongo = new Database(config.mongoUri || "");

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  const prefix = client.prefix;
  const args = message.content.slice(prefix.length).trim().split(/\s+/);
  const cmd = args.shift().toLowerCase();
  let command;

  if (message.content.startsWith(prefix)) {
    if (client.commands.has(cmd)) {
      command = client.commands.get(cmd);
    } else {
      command = client.commands.get(client.aliases.get(cmd));
    }
    if (!command) return;
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        const slowdown = [
          "Woahhh! Slow down there bud!",
          "You know spamming isn't cool?",
          "Are you flash? No??? Then stop going fast!",
        ];
        return message.lineReply(
          new MessageEmbed()
            .setColor("#FF0000")
            .setTitle(
              `${slowdown[Math.floor(Math.random() * slowdown.length)]}`
            )
            .setDescription(
              `<a:No:830530976631095326> Please wait \`${timeLeft.toFixed(
                1
              )} seconds\` before using \`${client.prefix}${
                command.help.name
              }\` again!`
            )
        );
      }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    if (command) command.execute(client, message, args);
  }

  const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(mention)) {
    message.lineReply(
      `Hi there user! Do \`${client.prefix}help\` for my help page!`
    );
  }
});

client.on("message", async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;
  if (message.content.startsWith(config.prefix)) return;

  if ((await quickmongo.fetch(`levels-${message.guild.id}`)) === true) {
    const randomAmountOfXp = Math.floor(Math.random() * 19) + 1; // Min 1, Max 15
    const hasLeveledUp = await Levels.appendXp(
      message.author.id,
      message.guild.id,
      randomAmountOfXp
    );
    if (hasLeveledUp) {
      const user = await Levels.fetch(message.author.id, message.guild.id);
      const levelsUpChannelCheck = await quickmongo.fetch(
        `levelsup-${message.guild.id}`
      );

      if (levelsUpChannelCheck) {
        const getLevelUpChannel = await quickmongo.get(
          `levelsup-${message.guild.id}`
        );
        const levelsUpChannel =
          message.guild.channels.cache.get(getLevelUpChannel);
        levelsUpChannel.send(
          `${message.author}, congratulations! You have leveled up to ** ${user.level}**. :tada: `
        );
      } else {
        message.channel.send(
          `${message.author}, congratulations! You have leveled up to ** ${user.level}**. :tada: `
        );
      }
    }
  }
});
