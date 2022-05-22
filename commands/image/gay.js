const { MessageAttachment } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const DIG = require("discord-image-generation");

module.exports.execute = async (client, message, args) => {

 const target = message.mentions.users.first() || message.author;
 // Make the image
 let img = await new DIG.Gay().getImage(target.displayAvatarURL({ dynamic: false, format: "png" }))
 // Add the image as an attachement
 let attach = new MessageAttachment(img, "gay.png");;
 message.channel.send(attach)

}
module.exports.help = {
 name: 'gay',
 aliases: [],
 category: 'Image',
 usage: 'or gay @user',
 description: 'Puts the rainbow flag over someones avatar!'
}
