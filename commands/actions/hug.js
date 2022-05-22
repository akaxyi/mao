const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const { hugP } = require('../../utils/jsons/actions.json');

module.exports.execute = async (client, message, args) => {

    var recipient = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    var hug = hugP[Math.round(Math.random() * (hugP.length - 1))]

    if (!recipient) {
        const embed = new MessageEmbed()
            .setColor('#FFDF32')
            .setImage(hug);
        return message.channel.send(`${message.author} You aren't allowed to hug yourself but I've decided to hug you!`, { embed: embed });

    } else if (message.mentions.users.first() == message.author) {
        const embed = new MessageEmbed()
            .setColor('#FFDF32')
            .setImage(hug);
        return message.channel.send(`${message.author} You aren't allowed to hug yourself but I've decided to hug you!`, { embed: embed });

    } else {
        const embed = new MessageEmbed()
            .setColor('#FFDF32')
            .setImage(hug);
        return message.channel.send(`${message.author} started hugging ${recipient}!`, { embed: embed });
    }
}
module.exports.help = {
    name: 'hug',
    aliases: [],
    category: 'Actions',
    usage: '@user',
    description: 'Hug people!'
}