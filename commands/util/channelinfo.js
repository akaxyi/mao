const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const moment = require('moment');
const channelTypes = {
    dm: 'DM',
    text: 'Text',
    voice: 'Voice',
    category: 'Category',
    news: 'News',
    store: 'Store'
};

module.exports.execute = async (client, message, args) => {

    let channel = message.mentions.channels.first();

    if (!channel) {
        if (parseInt(args[0]) < 9223372036854775807n) {
            channel = message.guild.channels.cache.get(args[0]);
        } else channel = message.channel;
    }

    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };

    const embed = new MessageEmbed()
        .setTitle(`${channel.name} - ${channel.id}`)
        .addField('📜 **General:**', `- **Type:** \`${channelTypes[channel.type]}\`\n- **Member Access Count:** \`${channel.members.size}\`\n- **Bot Access Count:** \`${channel.members.array().filter(b => b.user.bot).length}\`\n- **Created At:** \`${moment(channel.createdAt).format("MMMM Do YYYY, HH:mm:ss")}\` - \`${checkDays(channel.createdAt)}\`\n- **Channel Topic:** \`${channel.topic}\``)
        .setFooter(`Requested By ${message.author.tag}`)
        .setTimestamp()
        .setColor('#FFDF32');
    if (channel.type === 'text') {
        embed // Text embed
            .spliceFields(3, 0, { name: '📜 **Other:**', value: `- **Rate Limit:** \`${channel.rateLimitPerUser}\`\n- **NSFW:** \`${channel.nsfw}\`` })
    } else if (channel.type === 'voice') {
        embed // Voice embed
            .spliceFields(0, 1, { name: '📜 **Other:** ', value: `- **Channel:** \`${channel.name}\`\n- **User Limit:** \`${channel.userLimit}\`\n- **Full:** \`${channel.full}\`` })
    }
    message.channel.send(embed);
}
module.exports.help = {
    name: 'channelinfo',
    aliases: [],
    category: 'Utility',
    usage: 'or channelinfo #channel',
    description: 'Check the info of the current or mentioned channel!'
}
