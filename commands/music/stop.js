const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

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
    //Leave the channel
    await channel.leave();
    //send the approve message    
    const stopembed = new MessageEmbed().setColor("GREEN")
        .setDescription(`${message.author} stopped the music.`, "https://imgur.com/DsjVWqG.gif")
    return queue.textChannel.send(stopembed).catch(console.error);
}
module.exports.help = {
    name: 'stop',
    aliases: ["fuckoff"],
    category: 'Music',
    usage: '',
    description: 'Stops the music from playing!'
}
