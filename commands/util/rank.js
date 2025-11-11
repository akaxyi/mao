const { MessageAttachment } = require("discord.js");
const { attentionembed } = require("../../utils/embed");
const Levels = require("discord-xp");
const canvacord = require("canvacord");
const { Database } = require("quickmongo");
const config = require("../../config.json");
let quickmongo = null;
if (config.mongoUri) {
  try {
    Levels.setURL(config.mongoUri);
    quickmongo = new Database(config.mongoUri);
  } catch (e) {
    console.warn(
      "[WARN] Failed to initialize database for rank command:",
      e.message
    );
  }
}

module.exports.execute = async (client, message, args) => {
  if (!quickmongo)
    return attentionembed(message, "Levelling system not configured.");
  const levelsCheck = await quickmongo.fetch(`levels-${message.guild.id}`);
  if (levelsCheck === null)
    return attentionembed(message, "My levelling system has been disabled!");
  else {
    if ((await quickmongo.fetch(`levels-${message.guild.id}`)) === true) {
      const target = message.mentions.users.first() || message.author;
      const user = await Levels.fetch(target.id, message.guild.id, true);
      if (!user)
        return attentionembed(message, "This user doesn't have any xp!");
      if (target.bot)
        return attentionembed(message, `Bots Don't Have accounts!`);

      let img = "https://imgur.com/p4lNMmW.png";

      const rank = new canvacord.Rank()
        .setAvatar(target.displayAvatarURL({ dynamic: false, format: "png" }))
        .setLevel(user.level)
        .setRank(user.position)
        .setCurrentXP(user.xp - Levels.xpFor(user.level)) // Current User Xp
        .setRequiredXP(
          Levels.xpFor(parseInt(user.level) + 1) - Levels.xpFor(user.level)
        )
        .setStatus(target.presence.status, true, true)
        .setProgressBar("#FFFFFF", "COLOR")
        .setProgressBarTrack("GREY")
        .setUsername(target.username)
        .setBackground("IMAGE", img)
        .setDiscriminator(target.discriminator);
      rank.build().then((data) => {
        const attachment = new MessageAttachment(data, `rank.png`);
        message.channel.send(attachment);
      });
    }
  }
};
module.exports.help = {
  name: "rank",
  aliases: [],
  category: "Utility",
  usage: "or rank @user",
  description: "Shows a rank card for someones level!",
};
