const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const status = {
    online: "<:online:818976253234118706> \`Online\`",
    idle: "<:idle:818976218664927252> \`Idle\`",
    dnd: "<:dnd:818976240681353217> \`Do Not Disturb\`",
    offline: "<:offline:818976218824310804> \`Offline\`"
};
const flags = {
    DISCORD_EMPLOYEE: '<:Employee:818975753525264454>',
    DISCORD_PARTNER: '<:Partner:818975753675997184>',
    BUGHUNTER_LEVEL_1: '<:Bughunter_Level1:818975752778154035>',
    BUGHUNTER_LEVEL_2: '<:Bughunter_Level2:818975753361686538>',
    HYPESQUAD_EVENTS: '<:HypeSquad_Events:818975753445048329>',
    HOUSE_BRAVERY: '<:Bravery:818975753077129227>',
    HOUSE_BRILLIANCE: '<:Brilliance:818975753223405598>',
    HOUSE_BALANCE: '<:Balance:818975753185919006>',
    EARLY_SUPPORTER: '<:Early_Supporter:818975753583591454>',
    VERIFIED_BOT: '<a:verifyblue:827627215780577281>',
    VERIFIED_DEVELOPER: '<:Early_Verified_Bot_Developer:818975753332981811>'
};

module.exports.execute = async (client, message, args) => {

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const userFlags = member.user.flags.toArray();

    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };

    const embed = new MessageEmbed()
        .setTitle(`${member.user.tag} - ${member.user.id}`)
        .setColor(member.displayHexColor)
        .setFooter(`Requested by ${message.author.username}`)
        .setThumbnail(member.user.displayAvatarURL())
        .addField('📜 **User:**', `- **Avatar URL:** [\`Avatar\`](${member.user.avatarURL()})\n- **Badges:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(' ') : 'None'}\n- **Status:** ${status[member.user.presence.status]}\n- **Created At:** \`${moment(member.user.createdAt).format("MMMM Do YYYY, HH:mm:ss")}\` - \`${checkDays(member.user.createdAt)}\``)
        .addField('📜 **Member:**', `- **Highest Role:** ${member.roles.highest}\n- **Roles:** \`${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}\`\n- **Joined At:** \`${moment(member.joinedAt).format("MMMM Do YYYY, HH:mm:ss")}\` - \`${checkDays(member.joinedAt)}\``)
        .setTimestamp()
    message.channel.send({ embed });

}
module.exports.help = {
    name: 'userinfo',
    aliases: ["whois"],
    category: 'Utility',
    usage: 'or userinfo @user',
    description: 'Shows someones userinfo about them!'
}
