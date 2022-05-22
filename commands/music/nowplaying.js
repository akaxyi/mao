const createBar = require("string-progressbar");
const { MessageEmbed } = require("discord.js");
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

    const queue = message.client.queue.get(message.guild.id);
    //if nothing playing error
    if (!queue) return attentionembed(message, "There is nothing playing in the server!").catch(console.error);
    //Define the current song 
    const song = queue.songs[0];
    //get current song duration in s
    let minutes = song.duration.split(":")[0];
    let seconds = song.duration.split(":")[1];
    let ms = (Number(minutes) * 60 + Number(seconds));
    //get thumbnail
    let thumb;
    if (song.thumbnail === undefined) thumb = "https://imgur.com/DsjVWqG.gif";
    else thumb = song.thumbnail.url;
    //define current time
    const seek = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
    //define left duration
    const left = ms - seek;
    //define embed
    let nowPlaying = new MessageEmbed()
        .setTitle("Now playing " + song.title)
        .setURL(song.url)
        .setThumbnail(song.thumbnail.url)
        .setColor("#FFDF32")
        .setFooter("Time Remaining: " + new Date(left * 1000).toISOString().substr(11, 8));
    //if its a stream
    if (ms >= 10000) {
        nowPlaying.setDescription("**Song Duration:**", "🔴 LIVE", false);
        //send approve msg
        return message.channel.send(nowPlaying);
    }
    //If its not a stream 
    if (ms > 0 && ms < 10000) {
        nowPlaying.addField("**Song Duration:**", "**(" + createBar.splitBar((ms == 0 ? seek : ms), seek, 15, "▬", "⚪️")[0] + ")**\n **" + new Date(seek * 1000).toISOString().substr(11, 8) + " | " + (ms == 0 ? " ◉ LIVE" : new Date(ms * 1000).toISOString().substr(11, 8)) + "**", false);
        //send approve msg
        return message.channel.send(nowPlaying);
    }

}
module.exports.help = {
    name: 'nowplaying',
    aliases: ["np"],
    category: 'Music',
    usage: '',
    description: 'Gets the information about the song that is playing!'
}
