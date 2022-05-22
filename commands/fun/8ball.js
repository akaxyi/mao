const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const answers = [
    'It is certain.',
    'It is decidedly so.',
    'Without a doubt.',
    'Yes - definitely.',
    'You may rely on it.',
    'As I see it, yes.',
    'Most likely.',
    'Outlook good.',
    'Yes.',
    'Signs point to yes.',
    'Reply hazy, try again.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
    'Don\'t count on it.',
    'My reply is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Very doubtful.'
];

module.exports.execute = async (client, message, args) => {

    const question = args.join(' ');
    if (!question) return attentionembed(message, 'Please give me a question!');
    const embed = new MessageEmbed()
        .setTitle('Magic 8Ball!')
        .addField(`${message.author.username}'s Question!`, question)
        .addField('My answer!', `${answers[Math.floor(Math.random() * answers.length)]}`)
        .setTimestamp()
        .setColor('GREEN');
    message.lineReply(embed);

}
module.exports.help = {
    name: '8ball',
    aliases: [],
    category: 'Fun',
    usage: '<question>',
    description: 'Ask Mao a question and Mao gives you a reply!'
}
