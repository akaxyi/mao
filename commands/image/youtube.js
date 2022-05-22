const { MessageEmbed, MessageAttachment } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const canvacord = require("canvacord");

module.exports.execute = async (client, message, args) => {

 if (!args[0]) return attentionembed(message, "Give me some text to put on the comment!")


 const avatar1 = message.author.displayAvatarURL({ dynamic: false, format: "png", size: 256 });

 msg = args.join(" ");

 const image = await canvacord.Canvas.youtube({ username: message.author.username, content: `${msg}`, avatar: avatar1, dark: true });
 const attachment = new MessageAttachment(image, 'youtube.png');

 message.channel.send(attachment);


}
module.exports.help = {
 name: 'youtube',
 aliases: [],
 category: 'Image',
 usage: '<text>',
 description: 'Puts your text on a youtube comment!'
}
