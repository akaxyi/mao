const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {
    const howgayy = Math.floor(Math.random() * 99) + 1;
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const gay = new MessageEmbed()
        .setDescription(`${member.user.username} is **${howgayy}%** gay!`)
        .setColor('#FFDF32')
    message.channel.send(gay)

}
module.exports.help = {
    name: 'howgay',
    aliases: [],
    category: 'Fun',
    usage: 'or howgay @user',
    description: 'Checks how gay people are!'
}