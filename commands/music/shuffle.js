const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

  const queue = message.client.queue.get(message.guild.id);
  //if no queue return error
  if (!queue) return attentionembed(message, "There is no queue in the server!");
  //if not in the same channel as the bot
  const { channel } = message.member.voice;
  //If not in a channel return error
  if (!message.member.voice.channel)
    return attentionembed(message, "You have to join a voice channel first!")
  //If not in the same channel return error
  if (queue && channel !== message.guild.me.voice.channel)
    return attentionembed(message, `You have to be in the same voice channel as me!`);
  //get all queue songs
  let songs = queue.songs;
  //make an array and mix them
  for (let i = songs.length - 1; i > 1; i--) {
    let j = 1 + Math.floor(Math.random() * i);
    [songs[i], songs[j]] = [songs[j], songs[i]];
  }
  //define queue.songs
  queue.songs = songs;
  //set the Queue
  message.client.queue.set(message.guild.id, queue);
  //send the Approve message
  queue.textChannel.send(new MessageEmbed().setColor("#FFDF32")
    .setDescription(`${message.author} shuffled the music.`, "https://imgur.com/DsjVWqG.gif")
  )
}
module.exports.help = {
  name: 'shuffle',
  aliases: [],
  category: 'Music',
  usage: '',
  description: 'Shuffles the server queue about!'
}
