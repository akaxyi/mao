const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const request = require('node-superfetch');

module.exports.execute = async (client, message, args) => {

 const month = parseInt(args[0]);
 const day = parseInt(args[1]);

 if (isNaN(month)) {
  return attentionembed(message, 'Please give me a month! (the month has to be a number)');
 }

 if (isNaN(day)) {
  return attentionembed(message, 'Please give me a day! (the month has to be a number)');
 }

 const date = month && day ? `/${month}/${day}` : '';
 try {
  const { text } = await request.get(`http://history.muffinlabs.com/date${date}`);
  const body = JSON.parse(text);
  const events = body.data.Events;
  const event = events[Math.floor(Math.random() * events.length)];
  const embed = new MessageEmbed()
   .setColor('#FFDF32')
   .setURL(body.url)
   .setTitle(`On ${body.date} this happened!`)
   .setTimestamp()
   .setDescription(`${event.year}: ${event.text}`)
   .addField('See more about this day!',
    event.links.map(link => `[${link.title}](${link.link.replace(/\)/g, '%29')})`).join(', '));

  return message.channel.send(embed);
 }
 catch (err) {
  if (err.status === 404 || err.status === 500) return attentionembed(message, 'Invalid date.');
  return attentionembed(message, `Oh no, an error occurred: \`${err.message}\`. Try again later!`);
 }

}
module.exports.help = {
 name: 'today-in-history',
 aliases: ["tih"],
 category: 'Utility',
 usage: '<month> <day>',
 description: 'Gets the important event that happened on the month and the day you gave Mao!'
}
