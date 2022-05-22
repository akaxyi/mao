const { MessageAttachment } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const DIG = require("discord-image-generation");

module.exports.execute = async (client, message, args) => {

 const target = message.mentions.users.first()

 if(!target) return attentionembed(message, "Please mention someone!")
 // Make the image
 let img = await new DIG.Bed().getImage(message.author.displayAvatarURL({ dynamic: false, format: "png" }), target.displayAvatarURL({ dynamic: false, format: "png" }))
 // Add the image as an attachement
 let attach = new MessageAttachment(img, "bed.png");;
 message.channel.send(attach)

}
module.exports.help = {
 name: 'bed',
 aliases: [],
 category: 'Image',
 usage: '@user',
 description: 'You be mean to someones avatar!'
}
