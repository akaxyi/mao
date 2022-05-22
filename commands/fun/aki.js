
const { attentionembed } = require('../../utils/embed');
const { MessageEmbed } = require("discord.js"),
  { Aki } = require("aki-api"),
  emojis = ["👍", "👎", "❔", "🤔", "🙄", "❌"],
  Started = new Set();

module.exports.execute = async (client, message, args) => {

  attentionembed(message, 'Please wait for the game to fully start up. If the reactions are not working, unreact and react again. If the game does not load, use the command again.')
  if (!Started.has(message.author.id)) Started.add(message.author.id);
  else return attentionembed(message, "The game already started!");
  const aki = new Aki("en");
  await aki.start();
  const msg = await message.channel.send(new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
    .setTitle(`${message.author.username}, Question ${aki.currentStep + 1}`)
    .setColor("#FFDF32")
    .setDescription(`**${aki.question}**\n${aki.answers.map((x, i) => `${x} | ${emojis[i]}`).join("\n")}`));
  for (let emoji of emojis) await msg.react(emoji).catch(console.error);
  const collector = msg.createReactionCollector((reaction, user) => emojis.includes(reaction.emoji.name) && user.id === message.author.id, { time: 60000 * 6 });
  collector.on("collect", async (reaction, user) => {
    reaction.users.remove(user).catch(console.error);
    if (reaction.emoji.name == "❌") return collector.stop();

    await aki.step(emojis.indexOf(reaction.emoji.name));
    if (aki.progress >= 70 || aki.currentStep >= 78) {
      await aki.win();
      collector.stop();
      message.channel.send(new MessageEmbed()
        .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle("Is this your character?")
        .setDescription(`**${aki.answers[0].name}**\n${aki.answers[0].description}\nRanking as **#${aki.answers[0].ranking}**\n\nyes (**y**) **|** no (**n**)`)
        .setImage(aki.answers[0].absolute_picture_path)
        .setColor("#FFDF32"));
      message.channel.awaitMessages(response => ["yes", "y", "no", "n"].includes(response.content.trim().toLowerCase()) &&
        response.author.id == message.author.id, { max: 1, time: 30000, errors: ["time"] })
        .then(collected => {
          const content = collected.first().content.trim().toLowerCase();
          if (content == "y" || content == "yes")
            return message.lineReply(new MessageEmbed()
              .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
              .setColor("#FF0000")
              .setTitle("Great! Guessed right one more time."));
          else
            return message.lineReply(new MessageEmbed()
              .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
              .setColor("GREEN")
              .setTitle("Congratulations, you win!"))
        });
      return;
    }
    msg.edit(new MessageEmbed()
      .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
      .setTitle(`${message.author.username}, Question Number ${aki.currentStep + 1}`)
      .setColor("#FFDF32")
      .setDescription(`**${aki.question}**\n${aki.answers.map((x, i) => `${x} **|** ${emojis[i]}`).join("\n")}`));
  });


  collector.on("end", () => {
    Started.delete(message.author.id);
  });

}
module.exports.help = {
  name: 'aki',
  aliases: ['akinator'],
  category: 'Fun',
  usage: '',
  description: 'You start a game of akinator!'
}
