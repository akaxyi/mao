const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {


    if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
        return attentionembed(message, "I am missing permissions, I need `KICK_MEMBERS`")
    }
    if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
        return attentionembed(message, "You are missing permissions, you need `KICK_MEMBERS`")
    } else {
        const kickTaged = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let reason = args.slice(1).join(" ");

        if (!kickTaged) {
            return attentionembed(message, `Please do \`${client.prefix}kick @user <reason>\``)
        }

        const botRolePossition = message.guild.member(client.user).roles.highest.position;
        const rolePosition = message.guild.member(kickTaged).roles.highest.position;
        const userRolePossition = message.member.roles.highest.position;
        if (userRolePossition <= rolePosition) return attentionembed(message, "This member has roles higher or equal to you!")
        if (botRolePossition <= rolePosition) return attentionembed(message, "This member has roles higher or equal to me!")

        if (kickTaged === message.author.id) {
            return attentionembed(message, "You aren't allowed to kick yourself!")
        }


        if (!message.guild.member(kickTaged).kickable) {
            return attentionembed(message, "An error ocurred, I couldn't kick that member!")
        }

        if (reason.length < 1) reason = "No reason given.";

        const kickEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor("Member Kicked")
            .setDescription(`- Target: <@${kickTaged.id}>\n- Moderator: <@${message.author.id}>\n- Reason: \`${reason}\``)
            .setThumbnail(kickTaged.user.displayAvatarURL())
            .setTimestamp();

        message.lineReply(kickEmbed);
        message.guild.member(kickTaged).kick(reason);

        kickTaged.send(`You have been kicked in **${message.guild.name}**! Reason: ${reason}`);
    }
}
module.exports.help = {
    name: 'kick',
    aliases: [],
    category: 'Moderation',
    usage: '@user <reason>',
    description: 'You kick someone in the server!'
}
