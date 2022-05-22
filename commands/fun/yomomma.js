const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const fetch = require("node-fetch");

module.exports.execute = async (client, message, args) => {


    const { joke } = await fetch("http://api.yomomma.info")
        .then((res) => res.json());

    const embed = new MessageEmbed()
        .setTitle(`Yomomma joke!`)
        .setColor('#FFDF32')
        .setDescription(`${joke}`);

    return message.channel.send({ embed });

}
module.exports.help = {
    name: 'yomomma',
    aliases: [],
    category: 'Fun',
    usage: '',
    description: 'Mao tells you a yomomma joke!'
}
