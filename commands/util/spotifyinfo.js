const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');


module.exports.execute = async (client, message, args) => {

    let user;
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else {
        user = message.author;
    }

    let status;
    if (user.presence.activities.length === 1) status = user.presence.activities[0];
    else if (user.presence.activities.length > 1) status = user.presence.activities[1];

    if (user.presence.activities.length === 0 || status.name !== "Spotify" && status.type !== "LISTENING") {

        return attentionembed(message, `${user} isn't listening to spotify right now!`);
    }

    if (status !== null && status.type === "LISTENING" && status.name === "Spotify" && status.assets !== null) {
        let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`,
            url = `https:/open.spotify.com/track/${status.syncID}`,
            name = status.details,
            artist = status.state,
            album = status.assets.largeText


        const information = new MessageEmbed()
            .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
            .setTitle("Spotify Status")
            .setColor('#FFDF32')
            .setThumbnail(image)
            .addField("Name:", name, true)
            .addField("Album:", album, true)
            .addField("Artist:", artist, true)
            .addField(`${user.username} Is Listening to:`, `[\`${artist} - ${name}\`](${url})`, true)
        return message.channel.send(information)
    }

}
module.exports.help = {
    name: 'spotifyinfo',
    aliases: ["spotify"],
    category: 'Utility',
    usage: 'or spotifyinfo @user',
    description: 'Shows your or somones info about their spotify song they are listening to!'
}
