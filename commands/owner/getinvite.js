const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

    if (message.author.id !== "547181832895070209") {
        attentionembed(message, "Owner Only!");
        return;
    }
    let guild = null;

    if (!args[0]) return attentionembed(message, "Enter An Name!")

    if (args[0]) {
        let fetched = client.guilds.cache.find(g => g.name === args.join(" "));
        let found = client.guilds.cache.get(args[0]);
        if (!found) {
            if (fetched) {
                guild = fetched;
            }
        } else {
            guild = found
        }
    } else {
        return attentionembed(message, "Invalid Name or ID!");
    }
    if (guild) {
        let tChannel = guild.channels.cache.find(ch => ch.type == "text" && ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE"));
        if (!tChannel) {
            return attentionembed(message, "An Error Has Occured Try Again!");
        }
        let invite = await tChannel.createInvite({ temporary: false, maxAge: 0 }).catch(err => {
            return attentionembed(message, `${err} has occured!`);
        });
        message.channel.send(invite.url);
    } else {
        return attentionembed(message, `\`${args.join(' ')}\` - Mao is Not in this server`);
    }

}
module.exports.help = {
    name: 'getinvite',
    aliases: [],
    category: 'Owner',
    usage: '<serverName> or getinvite <serverID>',
    description: 'Gets a server invite that Mao is in!'
}
