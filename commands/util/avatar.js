const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    message.channel.send(
        new MessageEmbed()
            .setTitle(`${member.user.tag}'s Avatar`)
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setColor(member.displayHexColor)
    )

}
module.exports.help = {
    name: 'avatar',
    aliases: ["av"],
    category: 'Utility',
    usage: 'or avatar @user',
    description: 'Shows someones avatar!'
}
