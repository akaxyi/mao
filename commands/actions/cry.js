const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const { cryP } = require('../../utils/jsons/actions.json');

module.exports.execute = async (client, message, args) => {

    const embed = new MessageEmbed()
        .setColor('#FFDF32')
        .setImage(cryP[Math.round(Math.random() * (cryP.length - 1))]);
    return message.channel.send(`${message.author} started crying!`, { embed: embed });

}
module.exports.help = {
    name: 'cry',
    aliases: [],
    category: 'Actions',
    usage: '',
    description: 'Start crying!'
}
