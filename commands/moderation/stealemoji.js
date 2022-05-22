const { MessageEmbed, Util, Message } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

  if (!message.member.hasPermission('MANAGE_EMOJIS')) {
    //! tempmute @user 1s/m/h/d
    return attentionembed(message, "You are missing permissions, you need `MANAGE_EMOJIS`")
  } else {

    if (!message.guild.me.hasPermission('MANAGE_EMOJIS')) {
      return attentionembed(message, "I am missing permissions, I need `MANAGE_EMOJIS`")
    }


    if (!args.length) return attentionembed(message, `Please do \`${client.prefix}stealemoji <emoji>\``)

    for (const rawEmoji of args) {
      const parsedEmoji = Util.parseEmoji(rawEmoji)

      if (parsedEmoji.id) {

        const extension = parsedEmoji.animated ? ".gif" : ".png";

        const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;
        message.guild.emojis.create(url, parsedEmoji.name).then((emoji) => message.lineReply(new MessageEmbed()
          .setColor("GREEN")
          .setDescription(`<a:tick:828290595180249098> You added a new emoji: \`${emoji.url}\``)))
      }
    }
  }
}
module.exports.help = {
  name: 'stealemoji',
  aliases: [],
  category: 'Moderation',
  usage: '<emoji>',
  description: 'Steal an emoji from another server to add it to your server!'
}
