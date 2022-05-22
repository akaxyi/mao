const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const { slapP } = require('../../utils/jsons/actions.json');

module.exports.execute = async (client, message, args) => {

    var recipient = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    var slap = slapP[Math.round(Math.random() * (slapP.length - 1))]

    if (!recipient) {
        const embed = new MessageEmbed()
            .setColor('#FFDF32')
            .setImage(slap);
        return message.channel.send(`${message.author} You aren't allowed to slap yourself but I've decided to slap you!`, { embed: embed });

    } else if (message.mentions.users.first() == message.author) {
        const embed = new MessageEmbed()
            .setColor('#FFDF32')
            .setImage(slap);
        return message.channel.send(`${message.author} You aren't allowed to slap yourself but I've decided to slap you!`, { embed: embed });

    } else {
        const embed = new MessageEmbed()
            .setColor('#FFDF32')
            .setImage(slap);
        return message.channel.send(`${message.author} started slapping ${recipient}!`, { embed: embed });
    }
}
module.exports.help = {
    name: 'slap',
    aliases: [],
    category: 'Actions',
    usage: '@user',
    description: 'Slap people!'
}