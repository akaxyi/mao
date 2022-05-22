const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {
    const hownooby = Math.floor(Math.random() * 99) + 1;
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const noob = new MessageEmbed()
        .setDescription(`${member.user.username} is **${hownooby}%** noob!`)
        .setColor('#FFDF32')
    message.channel.send(noob)

}
module.exports.help = {
    name: 'hownoob',
    aliases: [],
    category: 'Fun',
    usage: 'or hownoob @user',
    description: 'Checks how noob people are!'
}
