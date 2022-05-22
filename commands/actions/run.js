const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const { runP } = require('../../utils/jsons/actions.json');

module.exports.execute = async (client, message, args) => {

    const embed = new MessageEmbed()
        .setColor('#FFDF32')
        .setImage(runP[Math.round(Math.random() * (runP.length - 1))]);
    return message.channel.send(`${message.author} started running away!`, { embed: embed });

}
module.exports.help = {
    name: 'run',
    aliases: [],
    category: 'Actions',
    usage: '',
    description: 'Start running!'
}
