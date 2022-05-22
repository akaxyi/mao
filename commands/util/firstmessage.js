const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

  const fetchMessages = await message.channel.messages.fetch({
    after: 1,
    limit: 1,
  });
  const msg = fetchMessages.first();

  message.channel.send(
    new MessageEmbed()
      .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
      .addField("URL", `[First Message](${msg.url})`, true)
      .addField("Author", msg.author, true)
      .addField('Message ID', msg.id, true)
      .setColor('#FFDF32')
      .addField('Created At', msg.createdAt.toLocaleDateString(), true)
  );

}
module.exports.help = {
  name: 'firstmessage',
  aliases: [],
  category: 'Utility',
  usage: '',
  description: 'Gets the first message of the channel!'
}
