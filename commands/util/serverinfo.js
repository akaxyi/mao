const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const moment = require('moment');
const { stripIndent } = require('common-tags');
const region = {
  'us-central': ':flag_us: `US Central`',
  'us-east': ':flag_us: `US East`',
  'us-south': ':flag_us: `US Sout`',
  'us-west': ':flag_us: `US West`',
  'europe': ':flag_eu: `Europe`',
  'singapore': ':flag_sg: `Singapore`',
  'japan': ':flag_jp: `Japan`',
  'russia': ':flag_ru: `Russia`',
  'hongkong': ':flag_hk: `Hong Kong`',
  'brazil': ':flag_br: `Brazil`',
  'sydney': ':flag_au: `Sydney`',
  'southafrica': ':flag_za: `South Africa`'
};
const verificationLevels = {
  NONE: 'None',
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  VERY_HIGH: 'Highest'
};

module.exports.execute = async (client, message, args) => {

  function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
  };

  // Get member stats
  const members = message.guild.members.cache.array();
  const memberCount = members.length;
  const online = members.filter((m) => m.presence.status === 'online').length;
  const offline = members.filter((m) => m.presence.status === 'offline').length;
  const dnd = members.filter((m) => m.presence.status === 'dnd').length;
  const afk = members.filter((m) => m.presence.status === 'idle').length;
  const bots = members.filter(b => b.user.bot).length;
  const emojis = message.guild.emojis.cache;

  const serverStats = stripIndent`
  <:online:818976253234118706> **Online:** ${online}
  <:dnd:818976240681353217> **Do Not Disturb:** ${dnd}
  <:idle:818976218664927252> **AFK:** ${afk}
   <:offline:818976218824310804> **Offline:** ${offline}
 `;

  const embed = new MessageEmbed()
    .setTitle(`${message.guild.name} - ${message.guild.id}`)
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .addField('📜 **General:**', `- **Guild Icon URL:** [\`Guild Icon\`](${message.guild.iconURL()})\n- **Owner:** ${message.guild.owner}\n- **Region:** ${region[message.guild.region]}\n- **Verification Level:** \`${verificationLevels[message.guild.verificationLevel]}\`\n- **Created At:** \`${moment(message.guild.createdAt).format("MMMM Do YYYY, HH:mm:ss")}\` - \`${checkDays(message.channel.guild.createdAt)}\``)
    .addField('📜 **Statistics:**', `- **Member Count:** \`${memberCount}\` **Members** - \`${bots}\` **Bots**\n- **Role Count:** \`${message.guild.roles.cache.size}\`\n- **Emoji Count:** \`${emojis.filter(emoji => !emoji.animated).size}\` **Normal** - \`${emojis.filter(emoji => emoji.animated).size}\` **Animated**\n - **Boost Tier:** \`${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}\`\n- **Boost Count:** \`${message.guild.premiumSubscriptionCount || '0'}\``)
    .addField('📜 **Member Presence:**', `${serverStats}`)
    .setFooter(`Requested by ${message.author.username}`)
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
  if (message.guild.description) embed.setDescription(message.guild.description);
  if (message.guild.bannerURL) embed.setImage(message.guild.bannerURL({ dynamic: true }));
  message.channel.send(embed);

}
module.exports.help = {
  name: 'serverinfo',
  aliases: [],
  category: 'Utility',
  usage: '',
  description: 'Shows some info about the server!'
}
