const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

    if (!args.join(" ")) return attentionembed(message, "Give me some text to put on the tweet!")

    let tweet = message.content.slice(message.content.indexOf(args.join(" ")), message.content.length);

    if (tweet.length > 68) tweet = tweet.slice(0, 65) + '...';

    try {

        const res = await fetch('https://nekobot.xyz/api/imagegen?type=trumptweet&text=' + tweet);
        const img = (await res.json()).message;

        const embed = new MessageEmbed()
            .setTitle('OMG Trump tweeted again...')
            .setImage(img)
            .setTimestamp()
            .setColor('#FFDF32');
        await message.channel.send(embed);

    } catch (err) {
        attentionembed(message, `Sorry an error happened: **${err}**`)
    }

}
module.exports.help = {
    name: 'trump',
    aliases: ["tweet"],
    category: 'Image',
    usage: '<text>',
    description: 'Puts your text on a trump tweet!'
}
