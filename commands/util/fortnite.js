const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const { stripIndents } = require("common-tags");
const Client = require("fortnite");
const ft = new Client('b30eb6e0-f5cf-4b5f-9462-a6bdb49a13cc');

module.exports.execute = async (client, message, args) => {
      const platforms = ["pc", "gamepad", "touch"];
      // Get the last word from the args array
      const lastWord = args[args.length - 1];

      // Declare variables so we can use them later
      let platform, username;

      // If the platforms array includes the last word we provided
      if (platforms.includes(lastWord)) {
            // Make the username untill the last word
            username = args.slice(0, args.length - 1).join(" ");
            // Make the platform the last word  
            platform = lastWord;
      } else {
            // Make the username all words
            username = args.join(" ");
            // Platform defaults to PC
            platform = "all";
      }

      // Search the user 
      const search = await ft.user(username, platform);



      // If the user isn't found
      if (!search.username) {
            return attentionembed(message, "Couldn't find that user with that username!")
      }

      // Declare stuffs for easier access
      const lifetime = search.stats.lifetime;
      const solo = search.stats.solo;
      const duo = search.stats.duo;
      const squad = search.stats.squad;

      const embed = new MessageEmbed()
            .setTitle(`${search.username} (${search.platform})`)
            .setURL(search.url)
            .setColor("#FFDF32")
            .setFooter(`Fortnite stats`, message.author.displayAvatarURL)
            .setTimestamp()
            .addField("Solo:", stripIndents`**- Wins:** ${solo.wins}
         **- KD:** ${solo.kd}
         **- Kills:** ${solo.kills}
         **- Kills per match:** ${solo.kills_per_match}`, true)
            .addField("Duo:", stripIndents`**- Wins:** ${duo.wins}
         **- KD:** ${duo.kd}
         **- Kills:** ${duo.kills}
         **- Kills per match:** ${duo.kills_per_match}`, true)
            .addField("Squad:", stripIndents`**- Wins:** ${squad.wins}
         **- KD:** ${squad.kd}
         **- Kills:** ${squad.kills}
         **- Kills per match:** ${squad.kills_per_match}`, true)
            .addField("Lifetime:", stripIndents`**- Wins:** ${lifetime.wins}
         **- KD:** ${lifetime.kd}
         **- Kills:** ${lifetime.kills}`, false)

      message.channel.send(embed)

}
module.exports.help = {
      name: 'fortnite',
      aliases: [],
      category: 'Utility',
      usage: '<username> <pc | gamepad | touch>',
      description: 'Gets the stats of the fortnite account you give me!'
}
