const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

    if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
        return attentionembed(message, "I am missing permissions, I need `BAN_MEMBERS`")
    }
    if (!message.member.hasPermission("BAN_MEMBERS")) {
        return attentionembed(message, "You are missing permissions, you need `BAN_MEMBERS`")
    } else {

        const banTaged = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let reason = args.slice(1).join(" ");

        if (!banTaged) {
            return attentionembed(message, `Please do \`${client.prefix}ban @user <reason>\``)
        }
        if (banTaged === message.author.id) {
            return attentionembed(message, "You aren't allowed to ban yourself!")
        }
        const botRolePossition = message.guild.member(client.user).roles.highest.position;
        const rolePosition = message.guild.member(banTaged).roles.highest.position;
        const userRolePossition = message.member.roles.highest.position;
        if (userRolePossition <= rolePosition) return attentionembed(message, "This member has roles higher or equal to you!")
        if (botRolePossition <= rolePosition) return attentionembed(message, "This member has roles higher or equal to me!")

        if (reason.length < 1) reason = "No reason given.";

        if (!message.guild.member(banTaged).bannable) {
            return attentionembed(message, "An error ocurred, I couldn't ban that member!")
        }

        const banEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor("Member Banned")
            .setDescription(`- Target: <@${banTaged.id}>\n- Moderator: <@${message.author.id}>\n- Reason: \`${reason}\``)
            .setThumbnail(banTaged.user.displayAvatarURL())
            .setTimestamp();

        message.lineReply(banEmbed);
        message.guild.members.ban(banTaged.id, { reason });

        banTaged.send(
            `You have banned in **${message.guild.name}**! Reason: ${reason}`
        );
    }
}
module.exports.help = {
    name: 'ban',
    aliases: [],
    category: 'Moderation',
    usage: '@user <reason>',
    description: 'You ban someone in the server!'
}
