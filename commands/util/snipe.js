const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

 const msg = client.snipes.get(message.channel.id)
 if (!msg) return attentionembed(message, "There is no deleted messages/images!")
 const embed = new MessageEmbed()
  .setAuthor(msg.author)
  .setDescription(`${msg.content}`)
  .setColor('#FFDF32')
  .setTimestamp()
 if (msg.image) embed.setImage(msg.image)
 message.channel.send(embed)

}
module.exports.help = {
 name: 'snipe',
 aliases: [],
 category: 'Utility',
 usage: '',
 description: 'Gets the last deleted message/image in the channel!'
}
