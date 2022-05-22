const { MessageEmbed } = require('discord.js');
const randomPuppy = require("random-puppy");

module.exports.execute = async (client, message, args) => {

 const subReddits = ["dankmeme", "meme", "me_irl"];
 const random = subReddits[Math.floor(Math.random() * subReddits.length)];

 const img = await randomPuppy(random);
 const embed = new MessageEmbed()
  .setColor("#FFDF32")
  .setImage(img)
  .setTitle("Meme!")
  .setURL(`https://reddit.com/r/${random}`);

 message.channel.send(embed);

}
module.exports.help = {
 name: 'meme',
 aliases: [],
 category: 'Image',
 usage: '',
 description: 'Shows a meme from reddit!'
}
