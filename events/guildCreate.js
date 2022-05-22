const { MessageEmbed } = require('discord.js');
const { client } = require('../index');

client.on('guildCreate', (guild) => {
    const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
    const embed = new MessageEmbed()
        .setTitle('Thanks for adding me to this lovely server!')
        .setDescription(`Invite me [Here](https://discord.com/oauth2/authorize?client_id=742026620470296577&scope=bot&permissions=272104567)\nAny issues or suggestions? Join my support server [Here](https://discord.gg/fhaqgu5vqV)\nMy prefix is \`${client.prefix}\``)
        .setColor('#FFDF32')
        .addField('Help', `To get help for Mao check the usages down below!\n(Usage: ${client.prefix}help or @Mao)`)
        .setThumbnail(client.user.avatarURL())

    channel.send(embed)
})

client.on("guildCreate", guild => {

    const ID = "824354433923809320";

    const channel = client.channels.cache.get(ID);

    const sowner = guild.owner.user;

    if (!channel) return;

    const embed = new MessageEmbed()

        .setTitle("**I Joined a Server!**")

        .addField(`**SERVER NAME**`, `\`\`\`${guild.name}\`\`\``)

        .addField(`**SERVER ID**`, `\`\`\`${guild.id}\`\`\``)

        .addField(`**SERVER OWNER**`, `\`\`\`${sowner.tag}\`\`\``)

        .addField(`**OWNER ID**`, `\`\`\`${sowner.id}\`\`\``)

        .addField(`**CREATED ON**`, `\`\`\`${guild.createdAt}\`\`\``)

        .addField(`**MEMBERS**`, `\`\`\`${guild.memberCount}\`\`\``)

        .setTimestamp()

        .setColor("#FFDF32")

        .setFooter(`Servers Count - ${client.guilds.cache.size}`);

    channel.send(embed);

});