const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

 const queue = message.client.queue.get(message.guild.id);
 //if no Queue return error
 if (!queue)
  return attentionembed(message, "There is nothing you can skip!").catch(console.error);
 //if not in the same channel return
 const { channel } = message.member.voice;
 //If not in a channel return error
 if (!message.member.voice.channel)
  return attentionembed(message, "You have to join a voice channel first!")
 //If not in the same channel return error
 const members = channel.members.filter((m) => !m.user.bot);
 if (queue && channel !== message.guild.me.voice.channel)
  return attentionembed(message, `You have to be in the same voice channel as me!`);
 const song = queue.songs[0];
 const embed = new MessageEmbed()
  .setAuthor(`Voting has started to skip ${song.title}`, "https://imgur.com/DsjVWqG.gif")
  .setDescription(`React to 👍 emoji to vote for it!`)
  .setColor('#FFDF32');

 const m = await message.channel.send(embed);


 if (members.size > 1) {

  m.react("👍");

  const mustVote = Math.floor(members.size / 2 + 1);

  const filter = (reaction, user) => {
   const member = message.guild.members.cache.get(user.id);
   const voiceChannel = member.voice.channel;
   if (voiceChannel) {
    return voiceChannel.id === channel.id;
   }
  };

  const collector = await m.createReactionCollector(filter, {
   time: 25000
  });

  collector.on("collect", (reaction) => {
   const haveVoted = reaction.count - 1;
   if (haveVoted >= mustVote) {
    queue.playing = true;
    //end current song
    queue.connection.dispatcher.end();
    m.edit(embed);
    collector.stop(true);
   }
  });

  collector.on("end", (collected, isDone) => {
   if (!isDone) {
    return attentionembed(message, "Time is up!");
   }
  });

 } else {
  queue.playing = true;
  //end current song
  queue.connection.dispatcher.end();
  embed.setAuthor(`Skipped!`, "https://imgur.com/DsjVWqG.gif")
  embed.setDescription(`${song.title}`);
  m.edit(embed);
 }
 //set playing to true 

}
module.exports.help = {
 name: 'skip',
 aliases: [],
 category: 'Music',
 usage: '',
 description: 'Skips the song!'
}
