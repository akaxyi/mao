const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const user = await client.fetchUser(member.id);
    if (member.user.bot) {
        return attentionembed(message, `Bots don't have accounts!`);
    };

    const percentageDiff = Math.floor((user.coinsInBank * 100) / user.bankSpace)

    const embed = new MessageEmbed()
        .setTitle(`${member.user.username}'s Account!`)
        .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
        .setDescription(`**Pocket**: ${user.coinsInWallet.toLocaleString()} <:maocoin:819634260352303154>\n**Bank Balance**: ${user.coinsInBank.toLocaleString()} / ${user.bankSpace.toLocaleString()} \`(${percentageDiff}%)\` <:maocoin:819634260352303154>\n**Net Worth**: ${(user.coinsInWallet + user.coinsInBank).toLocaleString()} <:maocoin:819634260352303154>`)
        .setColor('#FFDF32');
    message.channel.send(embed);

}
module.exports.help = {
    name: 'bal',
    aliases: ["balance", "account"],
    category: 'Economy',
    usage: 'or bal @user',
    description: 'Check to see how much money you or someone has!'
}
