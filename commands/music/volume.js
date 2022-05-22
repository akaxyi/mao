const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

    const queue = message.client.queue.get(message.guild.id);
    //if no queue return error
    if (!queue) return attentionembed(message, `There is nothing playing in the server!`);
    const { channel } = message.member.voice;
    //If not in a channel return error
    if (!message.member.voice.channel)
        return attentionembed(message, "You have to join a voice channel first!")
    //If not in the same channel return error
    if (queue && channel !== message.guild.me.voice.channel)
        return attentionembed(message, `You have to be in the same voice channel as me!`);
    //define Info Embed
    const volinfoembed = new MessageEmbed()
        .setColor("#FFDF32")
        .setDescription(`🔊 Song volume is: \`${queue.volume}%\``)
    //if no args return info embed   			 
    if (!args[0]) return message.channel.send(volinfoembed).catch(console.error);
    //if args is not a number return error
    if (isNaN(args[0])) return attentionembed(message, "That's not a Number between **0 - 200**");
    //if args is not a Number between 150 and 0 return error
    if (parseInt(args[0]) < 0 || parseInt(args[0]) > 200)
        return attentionembed(message, "That's not a Number between **0 - 200**");
    //set queue volume to args
    queue.volume = args[0];
    //set current volume to the wanted volume
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    //define approve embed
    const volinfosetembed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`🔊 Song volume changed to: \`${args[0]}%\`!`)
    //Send approve message
    return queue.textChannel.send(volinfosetembed).catch(console.error);

}
module.exports.help = {
    name: 'volume',
    aliases: ["v"],
    category: 'Music',
    usage: '<0-200>',
    description: 'Changes the song volume!'
}
