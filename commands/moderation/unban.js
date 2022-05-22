const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const userReg = RegExp(/<@!?(\d+)>/);

module.exports.execute = async (client, message, args) => {

    const userID = userReg.test(args[0]) ? userReg.exec(args[0])[1] : args[0]
    const mentionedUser = await message.client.users.fetch(userID).catch(() => null)

    if (!message.member.hasPermission('BAN_MEMBERS')) {
        return attentionembed(message, "You are missing permissions, you need `BAN_MEMBERS`")
    } else {
        if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
            return attentionembed(message, "I am missing permissions, I need `BAN_MEMBERS`")
        }
        else if (!mentionedUser) {
            return attentionembed(message, `Please do \`${client.prefix}unban <userID>\``)
        }

        const allBans = await message.guild.fetchBans()
        const bannedUser = allBans.get(mentionedUser.id)

        if (!bannedUser) {
            return attentionembed(message, "This member is not banned!")
        }

        const reason = args.slice(1).join(' ') || 'Not Specified'

        message.guild.members.unban(mentionedUser.id, [reason]).catch(err => console.log(err))

        message.lineReply(new MessageEmbed()
            .setColor("GREEN")
            .setAuthor("Member Unbanned")
            .setDescription(`- Target: <@${mentionedUser.id}>\n- Moderator: <@${message.author.id}>\n- Reason: \`${reason}\``)
            .setThumbnail(mentionedUser.user.displayAvatarURL())
            .setTimestamp())
    }
}
module.exports.help = {
    name: 'unban',
    aliases: [],
    category: 'Moderation',
    usage: '<userID>',
    description: 'You unban someone from the server!'
}
