const { MessageEmbed, version: discord_version } = require("discord.js");
const config = require("../../config.json");
const pkg = require("../../package.json");
const moment = require("moment");

module.exports.execute = async (client, message, args) => {
  const d = moment.duration(message.client.uptime);
  const days = d.days() == 1 ? `${d.days()} day` : `${d.days()} days`;
  const hours = d.hours() == 1 ? `${d.hours()} hour` : `${d.hours()} hours`;
  const minutes =
    d.minutes() == 1 ? `${d.minutes()} minute` : `${d.minutes()} minutes`;
  const seconds =
    d.seconds() == 1 ? `${d.seconds()} second` : `${d.seconds()} seconds`;

  function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
  }

  const embed = new MessageEmbed()
    .setTitle(`${message.client.user.tag} - ${message.client.user.id}`)
    .setDescription(
      `\`\`\`prolog\n${days}, ${hours}, ${minutes}, and ${seconds}\`\`\``
    )
    .setThumbnail(message.client.user.displayAvatarURL())
    .addField(
      "📜 **General:**",
      `- **Developer:** \`Woah#0002\`\n- **Server Count:** \`${
        client.guilds.cache.size
      }\`\n- **Channel Count:** \`${
        client.channels.cache.size
      }\`\n- **Member Count:** \`${client.guilds.cache.reduce(
        (acc, value) => acc + value.memberCount,
        0
      )}\`\n- **In Voice Channel Count:** \`${
        client.queue.size
      }\`\n- **Command Count:** \`${
        client.commands.size
      }\`\n- **Created At:** \`${moment(message.client.user.createdAt).format(
        "MMMM Do YYYY, HH:mm:ss"
      )}\` - \`${checkDays(message.client.user.createdAt)}\``
    )
    .addField(
      "📜 Information",
      `- **Bot Version:** \`v${pkg.version}\`\n- **Discord.JS:** \`v${discord_version}\`\n- **Node.JS:** \`${process.version}\`\n- **Database:** \`MongoDB Atlas\``
    )
    .setColor("#FFDF32")
    .addField(
      "Links",
      "**[Invite Me](https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot&permissions=0) | " +
        "[Support Server](YOUR_SUPPORT_SERVER_INVITE) | " +
        "[Top.gg](https://top.gg/bot/YOUR_BOT_ID)**"
    )
    .setFooter(`Requested By ${message.author.tag}`)
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
  message.channel.send(embed);
};
module.exports.help = {
  name: "botinfo",
  aliases: ["stats"],
  category: "Utility",
  usage: "",
  description: "Shows Mao's information!",
};
