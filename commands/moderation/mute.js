const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

    const mentionedMember = message.mentions.members.first()
        || message.guild.members.cache.get(args[0])

    let muteRole = message.guild.roles.cache.find(r => r.name == 'Muted')

    if (!message.member.hasPermission('MANAGE_ROLES')) {
        //! tempmute @user 1s/m/h/d
        return attentionembed(message, "You are missing permissions, you need `MANAGE_ROLES`")
    } else {


        if (!message.guild.me.hasPermission(['MANAGE_ROLES', 'MANAGE_CHANNELS'])) {
            return attentionembed(message, "I am missing permissions, I need `MANAGE_ROLES`")
        }
        else if (!mentionedMember) {
            return attentionembed(message, `Please do \`${client.prefix}mute @user <reason>\``)
        }
        else if (mentionedMember === message.author.id) {
            return attentionembed(message, "You aren't allowed to mute yourself!")
        }


        const rolePosition = message.guild.member(mentionedMember).roles.highest.position;
        const userRolePossition = message.member.roles.highest.position;
        if (userRolePossition <= rolePosition) return attentionembed(message, "This member has roles higher or equal to you!")

        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    color: 'BLACK',
                }
            }).catch(err => console.log(err))
        }

        if (mentionedMember.roles.highest.position >= message.guild.me.roles.highest.position) {
            return attentionembed(message, "This member has roles higher or equal to me!")
        }
        else if (muteRole.position >= message.guild.me.roles.highest.position) {
            return attentionembed(message, "The Muted role is higher than me!")
        }

        if (mentionedMember.roles.cache.some(role => role.name === 'Muted')) return attentionembed(message, "This member is already muted!")


        for (const channel of message.guild.channels.cache) {
            channel[1].updateOverwrite(muteRole, {
                SEND_MESSAGES: false,
                CONNECT: false,
            }).catch(err => console.log(err))
        }

        const noEveryone = mentionedMember.roles.cache.filter(r => r.name !== '@everyone')

        await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err))

        for (const role of noEveryone) {
            await mentionedMember.roles.remove(role[0]).catch(err => console.log(err))
        }

        const reason = args.slice(1).join(' ') || 'Not Specified'

        message.lineReply(new MessageEmbed()
            .setColor("GREEN")
            .setAuthor("Member Muted")
            .setDescription(`- Target: <@${mentionedMember.id}>\n- Moderator: <@${message.author.id}>\n- Reason: \`${reason}\``)
            .setThumbnail(mentionedMember.user.displayAvatarURL())
            .setTimestamp())
    }
}

module.exports.help = {
    name: 'mute',
    aliases: [],
    category: 'Moderation',
    usage: '@user <reason>',
    description: 'You mute someone in the server!'
}
