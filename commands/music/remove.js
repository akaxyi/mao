const { MessageEmbed } = require("discord.js");
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

    const queue = message.client.queue.get(message.guild.id);
    //if there is no queue return error
    if (!queue) return attentionembed(message, "There is no queue in the server!");
    const { channel } = message.member.voice;
    //If not in a channel return error
    if (!message.member.voice.channel)
        return attentionembed(message, "You have to join a voice channel first!")
    //If not in the same channel return error
    if (queue && channel !== message.guild.me.voice.channel)
        return attentionembed(message, `You have to be in the same voice channel as me!`);
    //if no args then return error
    if (!args.length) return attentionembed(message, `Try this: ${client.prefix}remove <SongNumber>`);
    //If not a number then return error
    if (isNaN(args[0])) return attentionembed(message, `Try this: ${client.prefix}remove <SongNumber>`);

    if (args[0] > queue.songs.length)
        return message.channel.send(`The queue is only ${queue.songs.length} songs long!`)
    try {
        const song = queue.songs.splice(args[0] - 1, 1);
        queue.textChannel.send(new MessageEmbed()
            .setDescription(`${message.author} removed **${song[0].title}** from the server queue!`)
            .setColor("GREEN")
        );
    } catch (error) {
        return attentionembed(message, `An unexpected error occurred.\nPossible type: ${error}`)
    }

}
module.exports.help = {
    name: 'remove',
    aliases: [],
    category: 'Music',
    usage: '<SongNumber>',
    description: 'Removes a song from the server queue!'
}