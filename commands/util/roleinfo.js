const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const permissions = require('../../utils/jsons/permissions.json');
const moment = require('moment')

module.exports.execute = async (client, message, args) => {

    if (!args.join(" ")) return attentionembed(message, `Please do \`-roleinfo <roleName>\``);
    let gRole = message.guild.roles.cache.find(m => m.name.toLowerCase() === args.join(" ").toLowerCase()) || message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if (!gRole) return attentionembed(message, "Couldn't find that role in the server!");

    const status = {
        false: "No",
        true: "Yes"
    }

    const rolePermissions = gRole.permissions.toArray();
    const finalPermissions = [];
    for (const permission in permissions) {
        if (rolePermissions.includes(permission)) finalPermissions.push(`\`${permissions[permission]}\``);
    }

    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };

    let embed = new MessageEmbed()
        .setTitle(`${gRole.name} - ${gRole.id}`)
        .setColor(gRole.displayHexColor)
        .addField('📜 **General:**', `- **Mention:** <@&${gRole.id}>\n- **Hex Colour:** \`${gRole.hexColor}\`\n- **Members:** \`${gRole.members.size}\`\n- **Role Position:** \`${parseInt(message.guild.roles.cache.size - gRole.position + 1)}\`\n- **Role Mentionable:** \`${status[gRole.mentionable]}\`\n- **Created At:** \`${moment(gRole.createdAt).format("MMMM Do YYYY, HH:mm:ss")}\` - \`${checkDays(gRole.createdAt)}\``)
        .addField(`📜 **${gRole.name}'s Permissions:**`, `${finalPermissions.join(' **|** ')}`)
        .setTimestamp();

    message.channel.send(embed);


}
module.exports.help = {
    name: 'roleinfo',
    aliases: [],
    category: 'Utility',
    usage: '<role>',
    description: 'Gets the info of a role in the server!'
}
