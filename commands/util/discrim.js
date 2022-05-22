const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

 let discrim = args[0];
 if (!discrim) {
  discrim = message.author.discriminator;
 }

 if (discrim.startsWith("#")) {
  discrim = discrim.slice(1);
 }

 if (/^[0-9]+$/.test(discrim) && discrim.length === 4) {
  const users = client.users.cache.filter(user => user.discriminator === discrim).map(user => user.username);
  if (users.length === 0) return message.reply(`After searching all my servers, no one with the discriminator **#${discrim}** could be found.`);
  return message.channel.send(`**${users.length}** user(s) found with the discriminator **#${discrim}**:\n\`\`\`yml\n${users.join(" | ")}\`\`\``);
 } else {
  return message.reply('Invalid discriminator provided.');
 }

}
module.exports.help = {
 name: 'discrim',
 aliases: [],
 category: 'Utility',
 usage: 'or discrim #discrim',
 description: 'Searches for users with the specified discriminator!'
}
