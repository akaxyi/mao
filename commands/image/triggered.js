const { MessageEmbed, MessageAttachment } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const canvacord = require("canvacord");

module.exports.execute = async (client, message, args) => {

    let target = message.mentions.users.first() || message.author;

    let avatar = message.attachments.array()[0];

    if (avatar) {
        if (avatar.url) {
            let image = await canvacord.Canvas.trigger(avatar.url);
            let triggered = new MessageAttachment(image, "trigger.gif");
            return message.channel.send(triggered);
        }
    } else {
        let image = await canvacord.Canvas.trigger(
            target.displayAvatarURL({ dynamic: false, format: "png" })
        );
        let triggered = new MessageAttachment(image, "trigger.gif");
        return message.channel.send(triggered);
    }

}
module.exports.help = {
    name: 'triggered',
    aliases: [],
    category: 'Image',
    usage: 'or triggered @user',
    description: 'Shows a triggered gif of your avatar!'
}
