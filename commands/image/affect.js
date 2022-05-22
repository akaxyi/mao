const { MessageAttachment } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const DIG = require("discord-image-generation");

module.exports.execute = async (client, message, args) => {

    const target = message.mentions.users.first() || message.author;
    // Make the image
    let img = await new DIG.Affect().getImage(target.displayAvatarURL({ dynamic: false, format: "png" }))
    // Add the image as an attachement
    let attach = new MessageAttachment(img, "affect.png");;
    message.channel.send(attach)

}
module.exports.help = {
    name: 'affect',
    aliases: [],
    category: 'Image',
    usage: 'or affect @user',
    description: 'Roast someones avatar!'
}