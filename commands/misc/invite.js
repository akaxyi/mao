const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {
    const invite = new MessageEmbed()
        .setTitle(`My links!`)
        .setColor('#FFDF32')
        .setDescription(`**[Invite Link](https://discord.com/oauth2/authorize?client_id=742026620470296577&scope=bot&permissions=272104567)\n[Support Server](https://discord.gg/fhaqgu5vqV)**`)
    message.channel.send(invite)

}
module.exports.help = {
    name: 'invite',
    aliases: [],
    category: 'Miscellaneous',
    usage: '',
    description: 'Gets my invite and support server link!'
}
