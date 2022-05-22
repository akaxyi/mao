const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

    let signos = ["*", "/", "+", "-", "x", "~"];

    if (!args[0]) return attentionembed(message, `Please do \`${client.prefix}math <number> <sign> <number>\``)
    if (isNaN(args[0])) return attentionembed(message, 'The signs for the math command are: \`(+, *, -, /, x, ~)\`')

    if (!signos.some(x => x.toLowerCase(message.content))) return attentionembed(message, 'The signs for the math command are: \`(+, *, -, /, x, ~)\`')

    if (!args[2]) return attentionembed(message, `Please do \`${client.prefix}math <number> <sign> <number>\``)
    if (isNaN(args[2])) return attentionembed(message, 'The signs for the math command are: \`(+, *, -, /, x, ~)\`')

    let signo = args[1];
    if (signo === 'x') {
        signo = '*'
    }

    if (signo === '~') {
        signo = '/'
    }

    try {
        const resultado = eval(args[0] + signo + args[2]);

        const calcula = new MessageEmbed()
            .setTitle('Calculator!')
            .setColor('GREEN')
            .addField("Input", '```js\n' + args[0] + ' ' + signo + ' ' + args[2] + '```')
            .addField('Exit', '```js\n' + await resultado + '```')

        return message.linere(calcula);

    } catch (e) {
        const err = new MessageEmbed()
            .setDescription('Oh no! An error has occurred\n\n`' + e.message + '`')
            .setColor('#FF0000')
        return message.lineReply(err);
    }

}
module.exports.help = {
    name: 'math',
    aliases: ["calculate"],
    category: 'Utility',
    usage: '<expression>',
    description: 'Mao calculates the expressions you give Mao!'
}
