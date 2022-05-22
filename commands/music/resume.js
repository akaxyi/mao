
const { MessageEmbed } = require("discord.js");
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {
    const queue = message.client.queue.get(message.guild.id);
    //if no queue return error
    if (!queue) return attentionembed(message, "There is nothing playing in the server!").catch(console.error);
    //if user not in the same channel as the bot retunr
    const { channel } = message.member.voice;
    //If not in a channel return error
    if (!message.member.voice.channel)
        return attentionembed(message, "You have to join a voice channel first!")
    //If not in the same channel return error
    if (queue && channel !== message.guild.me.voice.channel)
        return attentionembed(message, `You have to be in the same voice channel as me!`);
    //if its paused
    if (!queue.playing) {
        //set it to true
        queue.playing = true;
        //resume the Bot
        queue.connection.dispatcher.resume();
        //Create approve embed
        const playembed = new MessageEmbed().setColor("#FFDF32")
            .setDescription(`${message.author} resumed the music!`, "https://imgur.com/DsjVWqG.gif")
        //send the approve
        return queue.textChannel.send(playembed).catch(console.error);
    }
    //if its not paused return error
    return attentionembed(message, "The Queue is not paused in the server!").catch(console.error);

}
module.exports.help = {
    name: 'resume',
    aliases: [],
    category: 'Music',
    usage: '',
    description: 'Resumes the paused music!'
}
