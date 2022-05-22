const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const { patP } = require('../../utils/jsons/actions.json');

module.exports.execute = async (client, message, args) => {

    var recipient = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    var pat = patP[Math.round(Math.random() * (patP.length - 1))]

    if (!recipient) {
        const embed = new MessageEmbed()
            .setColor('#FFDF32')
            .setImage(pat);
        return message.channel.send(`${message.author} You aren't allowed to pat yourself but I've decided to pat you!`, { embed: embed });

    } else if (message.mentions.users.first() == message.author) {
        const embed = new MessageEmbed()
            .setColor('#FFDF32')
            .setImage(pat);
        return message.channel.send(`${message.author} You aren't allowed to pat yourself but I've decided to pat you!`, { embed: embed });

    } else {
        const embed = new MessageEmbed()
            .setColor('#FFDF32')
            .setImage(pat);
        return message.channel.send(`${message.author} started patting ${recipient}!`, { embed: embed });
    }
}
module.exports.help = {
    name: 'pat',
    aliases: [],
    category: 'Actions',
    usage: '@user',
    description: 'Pat people!'
}