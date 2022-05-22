const { attentionembed } = require('../../utils/embed');
const { MessageEmbed } = require("discord.js");

module.exports.execute = async (client, message, args) => {

    const queue = message.client.queue.get(message.guild.id);
    //If no Queue Error
    if (!queue) return attentionembed(message, "There is nothing playing in the server!").catch(console.error);
    const { channel } = message.member.voice;
    if (!message.member.voice.channel)
        return attentionembed(message, "You have to join a voice channel first!")
    //If not in the same channel return error
    if (queue && channel !== message.guild.me.voice.channel)
        return attentionembed(message, `You have to be in the same voice channel as me!`);

    //Reverse the Loop state
    queue.loop = !queue.loop;
    //Define the Loop embed
    const loopembed = new MessageEmbed()
        .setColor(queue.loop ? "GREEN" : "#FF0000")
        .setDescription(`${message.author} Loop is now ${queue.loop ? " enabled" : " disabled"}`, "https://imgur.com/DsjVWqG.gif")
    //send message into the Queue chat
    return queue.textChannel
        .send(loopembed)
        .catch(console.error);

}
module.exports.help = {
    name: 'loop',
    aliases: [],
    category: 'Music',
    usage: '',
    description: 'Loops the server queue!'
}
