const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {
    const embed = new MessageEmbed()
        .setDescription('`Pinging!`')
        .setColor('#FFDF32');
    const msg = await message.channel.send(embed);
    const timestamp = (message.editedTimestamp) ? message.editedTimestamp : message.createdTimestamp; // Check if edited
    const latency = `\`\`\`ini\n${Math.floor(msg.createdTimestamp - timestamp)}ms\`\`\``;
    const apiLatency = `\`\`\`ini\n${Math.round(message.client.ws.ping)}ms\`\`\``;
    embed.setTitle(`Pong!`)
        .setDescription('')
        .addField('Your Latency', latency, true)
        .addField('Mao\'s Latency', apiLatency, true)
        .setColor('#FFDF32')
        .setTimestamp();
    msg.edit(embed);

}
module.exports.help = {
    name: 'ping',
    aliases: [],
    category: 'Miscellaneous',
    usage: '',
    description: 'Gets your ping and Mao\'s ping!'
}
