const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

    const user = await client.fetchUser(message.author.id);
    let number = 5 * parseInt(args[0]);
    let page;
    if (user.items.length <= 5) page = 1;
    else if (user.items.length <= 10) page = 2;
    else if (user.items.length <= 15) page = 3;
    else if (user.items.length <= 20) page = 4;
    if (!args[0]) {
        number = 5;
    }
    let item = user.items.slice(number - 5, number);
    if (item.length < 1) {
        return attentionembed(message, 'Sad times, you have no items!');
    }
    const items = item.map(x => `${x.description}\n\`Item ID: ${x.name}\` **x${x.amount.toLocaleString()}**`);
    const randomAmountOfSpace = Math.floor(Math.random() * 9) + 1; // Min 1, Max 10
    client.giveBankSpace(message.author.id, randomAmountOfSpace);
    const embed = new MessageEmbed()
        .setThumbnail(message.author.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
        .setTitle(`${message.author.username}'s Inventory`)
        .setDescription(`${items.join('\n\n')}`)
        .setFooter(`Page ${args[0] || 1} of ${page}`)
        .setColor('#FFDF32');
    message.channel.send(embed);

}
module.exports.help = {
    name: 'inventory',
    aliases: ["inv"],
    category: 'Economy',
    usage: '',
    description: 'Check to see what items you have!'
}
