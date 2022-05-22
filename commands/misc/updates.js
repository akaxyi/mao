const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

    const guild = client.guilds.cache.get('811340754903498763');
    const channel = guild.channels.cache.get("811343337130426438");
    const messages = await channel.messages.fetch({ limit: 1 });
    const announcement = messages.first();

    const embed = new MessageEmbed()
        .setTitle("Recent Updates!")
        .setColor('#FFDF32')
        .setAuthor(announcement.author.username, announcement.author.displayAvatarURL({ size: 64 }))
        .setDescription(announcement.cleanContent)
        .setThumbnail(announcement.author.displayAvatarURL({ size: 512 }))
        .setTimestamp(new Date(announcement.createdTimestamp));

    return message.channel.send({ embed });

}
module.exports.help = {
    name: 'updates',
    aliases: [],
    category: 'Miscellaneous',
    usage: '',
    description: 'Gets the latest updates from the support server!'
}
