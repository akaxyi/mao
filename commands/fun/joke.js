const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const fetch = require('node-fetch');

module.exports.execute = async (client, message, args) => {

    const data = await fetch('https://sv443.net/jokeapi/v2/joke/Programming,Miscellaneous?blacklistFlags=nsfw,religious,political,racist,sexist')
        .then(res => res.json())
        .catch(() => null);

    return message.channel.send(
        new MessageEmbed()
            .setColor('#FFDF32')
            .setAuthor(`${data.category} Joke`)
            .setDescription(data.type === 'twopart' ? `${data.setup}\n\n||${data.delivery}||` : data.joke)
    );

}
module.exports.help = {
    name: 'joke',
    aliases: [],
    category: 'Fun',
    usage: '',
    description: 'Mao tells you a joke!'
}
