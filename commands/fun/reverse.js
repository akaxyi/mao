const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

    message.channel.send(args.join('').split('').reverse().join('') || 'No text to reverse.')

}
module.exports.help = {
    name: 'reverse',
    aliases: [],
    category: 'Fun',
    usage: '<text>',
    description: 'Reverses text that you give Mao!'
}
