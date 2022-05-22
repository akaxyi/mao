const { MessageEmbed } = require("discord.js");
const { play } = require("../../utils/play")
const { attentionembed } = require('../../utils/embed');
const { prefix } = require('../../config.json')

module.exports.execute = async (client, message, args) => {

  const { channel } = message.member.voice;
  //get serverqueue
  const queue = message.client.queue.get(message.guild.id);
  //If no Queue Error
  if (!queue) return attentionembed(message, "There is nothing playing in the server!").catch(console.error);
  //if the argslength is null return error
  //if there is already a search return error
  if (message.channel.activeCollector)
    return attentionembed(message, "There is already an active search!");
  //if the user is not in a voice channel return error
  if (!message.member.voice.channel)
    return attentionembed(message, "You have to join a voice channel first!")
  //If not in the same channel return error
  if (queue && channel !== message.guild.me.voice.channel)
    return attentionembed(message, `You have to be in the same voice channel as me!`);
  //Define all filters with ffmpeg    https://ffmpeg.org/ffmpeg-filters.html
  const filters = [
    'bass=g=20,dynaudnorm=f=200',//bassboost
    'apulsator=hz=0.08', //8D
    'aresample=48000,asetrate=48000*0.8',//vaporwave
    'aresample=48000,asetrate=48000*1.25',//nightcore
    'surround',//surrounding
    "remove",
  ];
  //set some temporary variables
  let varforfilter; let choice;
  //get user input
  switch (args[0]) {
    case "8D":
      varforfilter = 0;
      break;
    case "bassboost":
      varforfilter = 1;
      break;
    case "clear":
      varforfilter = 2;
      break;
    case "nightcore":
      varforfilter = 3;
      break;
    case "surrounding":
      varforfilter = 4;
      break;
    case "vaporwave":
      varforfilter = 5;
      break;

    default:
      //fires if not valid input
      varforfilter = 404;
      message.lineReply(new MessageEmbed()
        .setColor("#FF0000")
        .setTitle("Not a valid Filter, these are the valid filters:")
        .setDescription(`
     \`8D\`
     \`bassboost\`
     \`clear\` (removes all filters)
     \`nightcore\`
     \`surrounding\`
     \`vaporwave\``)
        .setFooter(`Example: ${prefix}filter 8D`)
      )
      break;
  }
  //set choice to zero
  choice = filters[varforfilter];
  if (varforfilter === 404) return;
  try {
    const song = queue.songs[0];
    //play the collected song song, message, client, filters
    message.lineReply(new MessageEmbed()
      .setColor("GREEN")
      .setDescription("Applying: " + args[0], "https://imgur.com/DsjVWqG.gif")).then(msg => {
        msg.delete({ timeout: 2000 });
      })
    play(song, message, client, choice);
    //catch any errors while searching
  } catch (error) {
    //log them
    console.error(error);
    //set collector false, just incase its still true
    message.channel.activeCollector = false;
  }

}
module.exports.help = {
  name: 'filter',
  aliases: [],
  category: 'Music',
  usage: '<songFilter>',
  description: 'Adds a filter to the song that is playing!'
}
