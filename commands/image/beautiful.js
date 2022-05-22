const { MessageAttachment } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const DIG = require("discord-image-generation");

module.exports.execute = async (client, message, args) => {

 const target = message.mentions.users.first() || message.author;
 // Make the image
 let img = await new DIG.Beautiful().getImage(target.displayAvatarURL({ dynamic: false, format: "png" }))
 // Add the image as an attachement
 let attach = new MessageAttachment(img, "beautiful.png");;
 message.channel.send(attach)

}
module.exports.help = {
 name: 'beautiful',
 aliases: [],
 category: 'Image',
 usage: 'or beautiful @user',
 description: 'Puts your or someones avatar on a gravity falls picture!'
}