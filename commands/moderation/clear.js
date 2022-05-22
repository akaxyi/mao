const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {
 if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) {
  return attentionembed(message, "I am missing permissions, I need `MANAGE_MESSAGES`")
 }
 if (!message.member.hasPermission("MANAGE_MESSAGES")) {
  return attentionembed(message, "You are missing permissions, you need `MANAGE_MESSAGES`")
 } else {
  const amount = args.join(' '); // Amount of messages which should be deleted

  if (!amount) return attentionembed(message, 'Please give me an amount of messages to clear!'); // Checks if the `amount` parameter is given
  if (isNaN(amount)) return attentionembed(message, 'You did\'t give me an actually number!'); // Checks if the `amount` parameter is a number. If not, the command throws an error

  if (amount > 100) return attentionembed(message, 'You can\'t delete more than 100 messages!'); // Checks if the `amount` integer is bigger than 100
  if (amount < 1) return attentionembed(message, 'You have to at least delete 1 message!'); // Checks if the `amount` integer is smaller than 1

  await message.channel.messages.fetch({ limit: amount }).then(messages => { // Fetches the messages
   message.channel.bulkDelete(messages // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
   )
  });
 }
}
module.exports.help = {
 name: 'clear',
 aliases: [],
 category: 'Moderation',
 usage: '<amount>',
 description: 'Clear up to 100 messages in a channel!'
}
