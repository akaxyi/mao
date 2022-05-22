const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const Levels = require("discord-xp");
Levels.setURL("mongodb+srv://chan:discord@database.vnkhz.mongodb.net/data");
const economy = require('../../models/economy');

module.exports.execute = async (client, message, args) => {

  const choice = args[0]
  const noargs = new MessageEmbed()
    .setAuthor(`You didn't specify a leaderboard`, message.author.displayAvatarURL())
    .setDescription(`Choices:\n\`${client.prefix}leaderboard levels\`\n\`${client.prefix}leaderboard money\``)
    .setColor('#FF0000')
  if (!choice) return message.lineReply(noargs)

  if (choice === "levels") {
    const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.

    if (rawLeaderboard.length < 1) return attentionembed(message, "Nobody's in leaderboard yet.");

    const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.

    const lb = leaderboard.map(e => `**${e.position})** ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.

    message.channel.send(new MessageEmbed()
      .setDescription(`**XP leaderboard for ${message.guild.name}:** \n\n${lb.join("\n\n")}`)
      .setColor('#FFDF32'));
  }

  if (choice === "money") {
    let data = await economy.find().sort([['coinsInWallet', 'descending']])
    data = data.filter(x => client.users.cache.get(x.userId) && client.users.cache.get(x.userId).bot != true).slice(0, 6);

    const emojis = [':first_place:', ':second_place:', ':third_place:'];
    data = data.map((x, i) => `${emojis[i] || '🔹'} ${client.users.cache.get(x.userId).tag || 'Unkown#0000'} - **${x.coinsInWallet.toLocaleString()}** <:maocoin:819634260352303154>`);

    const embed = new MessageEmbed()
      .setAuthor(`People with the most money:`)
      .setDescription(`${data.join('\n')}`)
      .setColor('#FFDF32');
    message.channel.send(embed);

  }
}
module.exports.help = {
  name: 'leaderboard',
  aliases: ["lb"],
  category: 'Utility',
  usage: '',
  description: 'Shows the levels/money leaderboard for the server!'
}
