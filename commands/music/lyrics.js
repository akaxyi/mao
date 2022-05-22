const { attentionembed } = require('../../utils/embed');
const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

module.exports.execute = async (client, message, args) => {

    const queue = message.client.queue.get(message.guild.id);
    //If no Queue Error
    if (!queue) return attentionembed(message, "There is nothing playing in the server!");
    //Set lyrics to null for the try catch
    let lyrics = null;
    //define the temporary Embed
    let temEmbed = new MessageEmbed()
        .setAuthor("Searching for the lyrics!", "https://imgur.com/DsjVWqG.gif").setFooter("Lyrics")
        .setColor("GREEN")
    //send it and safe it in a variable
    let result = await message.lineReply(temEmbed)
    //try to find lyrics
    try {
        //use lyricsfinder
        lyrics = await lyricsFinder(queue.songs[0].title, "");
        //If no Lyrics define no lyrics
        if (!lyrics) lyrics = `No song lyrics found for ${queue.songs[0].title}.`;
    }
    //catch any error
    catch (error) {
        lyrics = `No song lyrics found for ${queue.songs[0].title}.`;
    }
    //define lyrics Embed
    let lyricsEmbed = new MessageEmbed()
        .setTitle("Lyrics")
        .setDescription(lyrics)
        .setColor("#FFDF32")
    //if to long make slice it 
    if (lyricsEmbed.description.length >= 2048)
        //slice the embed description and redefine it
        lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    //edit to approve
    return result.edit(lyricsEmbed).catch(console.error);

}
module.exports.help = {
    name: 'lyrics',
    aliases: [],
    category: 'Music',
    usage: '',
    description: 'Gets the lyrics for the song that is playing!'
}
