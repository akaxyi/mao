const { attentionembed } = require('../../utils/embed');
const { MessageEmbed } = require("discord.js")

module.exports.execute = async (client, message, args) => {

    const queue = message.client.queue.get(message.guild.id);
    //if no queue return error
    if (!queue) return attentionembed(message, "There is nothing playing").catch(console.error);
    //If not in the same channel return
    const { channel } = message.member.voice;
    if (!message.member.voice.channel)
        return attentionembed(message, "You have to join a voice channel first!")
    //If not in the same channel return error
    if (queue && channel !== message.guild.me.voice.channel)
        return attentionembed(message, `You have to be in the same voice channel as me!`);
    //If its playing
    if (queue.playing) {
        //set playing to false
        queue.playing = false;
        //pause the music
        queue.connection.dispatcher.pause(true);
        //define the pause embed
        const pausemebed = new MessageEmbed().setColor("#FFDF32")
            .setDescription(`${message.author} paused the music.`, "https://imgur.com/DsjVWqG.gif")
        //return message
        return queue.textChannel.send(pausemebed).catch(console.error);
    }

}
module.exports.help = {
    name: 'pause',
    aliases: [],
    category: 'Music',
    usage: '',
    description: 'Pauses the currently playing song!'
}
