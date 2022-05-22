const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const tick = '<a:tick:828290595180249098>'

module.exports.execute = async (client, message, args) => {
    if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) {
        return attentionembed(message, "I am missing permissions, I need `MANAGE_CHANNELS`")
    }
    if (!message.member.hasPermission('MANAGE_CHANNELS')) {
        //! tempmute @user 1s/m/h/d
        return attentionembed(message, "You are missing permissions, you need `MANAGE_CHANNELS`")
    } else {

        const amount = parseInt(args[0]);
        if (isNaN(amount))

            return attentionembed(message, "It doesn't seem to be valid number!");
        if (args[0] === amount + "s") {
            message.channel.setRateLimitPerUser(amount);
            if (amount > 1) {
                const embed = new MessageEmbed().setColor("GREEN")
                    .setDescription(`${tick} You set the slowmode to **${amount}** second(s)!`)
                message.lineReply(embed)
                return;
            } else {
                const embed1 = new MessageEmbed().setColor("GREEN")
                    .setDescription(`${tick} You set the slowmode to **${amount}** second(s)!`)
                message.lineReply(embed1)
                return;
            }
        }
        if (args[0] === amount + "min") {
            message.channel.setRateLimitPerUser(amount * 60);
            if (amount > 1) {
                const embed2 = new MessageEmbed().setColor("GREEN")
                    .setDescription(`${tick} You set the slowmode to **${amount}** minute(s)!`)
                message.lineReply(embed2)
                return;
            } else {
                const embed3 = new MessageEmbed().setColor("GREEN")
                    .setDescription(`${tick} You set the slowmode to **${amount}** minute(s)!`)
                message.lineReply(embed3)
                return;
            }
        }
        if (args[0] === amount + "h") {
            message.channel.setRateLimitPerUser(amount * 60 * 60);
            if (amount > 1) {
                const embed4 = new MessageEmbed().setColor("GREEN")
                    .setDescription(`${tick} You set the slowmode to **${amount}** hour(s)!`)
                message.lineReply(embed4)
                return;
            } else {
                const embed5 = new MessageEmbed().setColor("GREEN")
                    .setDescription(`${tick} You set the slowmode to **${amount}** hour(s)!`)
                message.lineReply(embed5)
                return;
            }
        } else {
            attentionembed(message,
                "You can only set seconds(s), minutes(min) and hours(h)"
            );
        }
    }
}
module.exports.help = {
    name: 'slowmode',
    aliases: [],
    category: 'Moderation',
    usage: '<time (s | m | h)>',
    description: 'Sets a slowmode time for the channel!'
}
