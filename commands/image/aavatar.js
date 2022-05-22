const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

    const { url } = await fetch(`https://nekos.life/api/v2/img/avatar`)
        .then((res) => res.json());

    const embed = new MessageEmbed()
        .setTitle(`Anime Avatar`)
        .setImage(url)
        .setColor('#FFDF32')

    return message.channel.send({ embed });

}
module.exports.help = {
    name: 'aavatar',
    aliases: [],
    category: 'Image',
    usage: '',
    description: 'Gets an anime avatar from google for you!'
}
