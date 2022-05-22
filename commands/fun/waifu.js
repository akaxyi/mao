const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const somethingRandom = require('some-random-cat').Random

module.exports.execute = async (client, message, args) => {

    const subreddits = ["animewaifus"]
    let randomSubReddit = subreddits[Math.floor(Math.random() * subreddits.length)]
    somethingRandom.getMeme(randomSubReddit).then(res => {
        const embed = new MessageEmbed()
            .setTitle(res.title)
            .setURL(`https://www.reddit.com/r/${randomSubReddit}`)
            .setImage(res.img)
            .setColor('#FFDF32')
        message.channel.send(embed)
    }).catch(e => attentionembedn(message, 'API Error. Please try again.'))

}
module.exports.help = {
    name: 'waifu',
    aliases: [],
    category: 'Fun',
    usage: '',
    description: 'Gets a random waifu of reddit!'
}
