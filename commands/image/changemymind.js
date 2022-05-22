const { MessageEmbed, MessageAttachment } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const canvacord = require("canvacord");

module.exports.execute = async (client, message, args) => {

  let mindtxt = args.slice(0).join(" ");
  if (!mindtxt)
    return message.channel
      .send(attentionembed(message, "Give me some text to put on the sign!"))
  let image = await canvacord.Canvas.changemymind(mindtxt);

  let triggered = new MessageAttachment(image, "changemymind.png");

  message.channel.send(triggered);

}
module.exports.help = {
  name: 'changemymind',
  aliases: ["cmm"],
  category: 'Image',
  usage: '<text>',
  description: 'Puts your text on the changemymind meme!'
}
