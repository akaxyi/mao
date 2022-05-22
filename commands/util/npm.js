const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const fetch = require("node-fetch");
const moment = require("moment");

module.exports.execute = async (client, message, args) => {

    let query = args.join(' ');
    if (!query) query = await awaitMessages(message);
    if (!query) return;
    const res = await fetch(`https://registry.npmjs.com/${encodeURIComponent(query)}`).catch(err => console.log(err));
    if (res.status === 404) return attentionembed(message, 'Couldn\'t that npm package, try one that actually exists!');
    const body = await res.json();
    const embed = new MessageEmbed()
        .setColor('#FFDF32')
        .setTitle(body.name)
        .setURL(`https://www.npmjs.com/package/${body.name}`)
        .setDescription(body.description || 'No description.')
        .addField('Version', body['dist-tags'].latest, true)
        .addField('License', body.license || 'None', true)
        .addField('Author', body.author ? body.author.name : '???', true)
        .addField('Creation Date', moment.utc(body.time.created).format('YYYY/MM/DD hh:mm:ss'), true)
        .addField('Modification Date', body.time.modified ? moment.utc(body.time.modified).format('YYYY/MM/DD hh:mm:ss') : 'None', true)
        .addField('Maintainers', body.maintainers.map(user => user.name).join(', '))
    message.channel.send(embed);


    async function awaitMessages(message) {
        let responce;

        const filter = (user) => {
            return user.author.id === message.author.id;
        };

        message.lineReply('**What do you want to search for?** \nType `cancel` to cancel the command.');

        await message.channel.awaitMessages(filter, { max: 1, time: 120000, errors: ['time'] })
            .then((msg) => {
                const firstMsg = msg.first();
                if (firstMsg.content.toLowerCase() === 'cancel') return firstMsg.react('👍');
                responce = firstMsg.content;
            })
            .catch(() => {
                attentionembed(message, 'You took too long to say a npm package, cancelled!');
            });

        return responce;
    }

}
module.exports.help = {
    name: 'npm',
    aliases: [],
    category: 'Utility',
    usage: '<npmPackage>',
    description: 'Search for the details of a npm package!'
}
