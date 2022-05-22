const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const love = Math.random() * 100;
    const loveIndex = Math.floor(love / 10);
    const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

    const embed = new MessageEmbed()
        .setColor("#FFDF32")
        .setDescription(`**${client.user.username}** gives this much of their love to **${member.user.username}**: **${Math.floor(love)}%\n\n${loveLevel}**`)
        .setTimestamp()
    message.lineReply({ embed: embed });

}
module.exports.help = {
    name: 'love',
    aliases: [],
    category: 'Fun',
    usage: 'or -love @user',
    description: 'See how much the bots loves you or someone!'
}
