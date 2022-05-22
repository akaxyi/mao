const { MessageEmbed, MessageAttachment } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

    const canvacord = require("canvacord");
    let person =
        message.mentions.users.first() ||
        (await message.client.users.fetch(args[0]).catch((e) => { })) ||
        message.author;
    let avatar = person.displayAvatarURL({ dynamic: false, format: "png" });
    const img = await canvacord.Canvas.pixelate(avatar);
    const embed = new MessageEmbed()
        .setDescription(`${person.toString()} in Minecraft:`)
        .attachFiles([new MessageAttachment(img, "img.png")])
        .setColor('#FFDF32')
        .setImage("attachment://img.png");
    message.reply(embed);

}
module.exports.help = {
    name: 'pixel',
    aliases: [],
    category: 'Image',
    usage: 'or pixel @user',
    description: 'Pixellates someones avatar!'
}
