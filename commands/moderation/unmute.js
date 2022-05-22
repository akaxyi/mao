const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

  const mentionedMember = message.mentions.members.first()
    || message.guild.members.cache.get(args[0])

  const muteRole = message.guild.roles.cache.find(r => r.name == 'Muted')

  if (!message.member.hasPermission('MANAGE_ROLES')) {
    return attentionembed(message, "You are missing permissions, you need `MANAGE_ROLES`")
  } else {
    if (!mentionedMember) {
      return attentionembed(message, `Please do \`${client.prefix}unmute @user <reason>\``)
    }
    if (mentionedMember === message.author.id) {
      return attentionembed(message, "You aren't allowed to unmute yourself!")
    }

    if (!muteRole) {
      return attentionembed(message, "This server doesn't have a mute role, mute someone so I can create one!")
    }

    if (!mentionedMember.roles.cache.some(role => role.name === 'Muted')) return attentionembed(message, "This member is already unmuted!")


    if (mentionedMember.roles.highest.position >= message.guild.me.roles.highest.position) {
      return attentionembed(message, "This member has roles higher or equal to me!")
    }
    else if (muteRole.position >= message.guild.me.roles.highest.position) {
      return attentionembed(message, "The Muted role is higher than me!")
    }

    mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err))

    const reason = args.slice(1).join(' ') || 'Not Specified'

    message.lineReply(new MessageEmbed()
      .setColor("GREEN")
      .setAuthor("Member Unmuted")
      .setDescription(`- Target: <@${mentionedMember.id}>\n- Moderator: <@${message.author.id}>\n- Reason: \`${reason}\``)
      .setThumbnail(mentionedMember.user.displayAvatarURL())
      .setTimestamp())
  }
}
module.exports.help = {
  name: 'unmute',
  aliases: [],
  category: 'Moderation',
  usage: '@user',
  description: 'You unmute someone in the server!'
}
