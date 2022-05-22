const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
module.exports.execute = async (client, message, args) => {
    const query = args[0]
    const embed = new MessageEmbed()
        .setColor("#FFDF32")
        .setThumbnail(client.user.avatarURL(client.user))
        .setFooter(`Requested by ${message.author.tag}`)
        .setTimestamp();

    if (!query) {
        const embed = new MessageEmbed()
            .setColor('#FFDF32')
            .setTitle('Hello! I\'m Mao and I am a multipurpose bot!')
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setDescription(`\u200b\u2000•\u2000\u2000All my commands start with the prefix \`${client.prefix}\`\n\u2000•\u2000\u2000Use \`${client.prefix}commands\` to see the list of my commands.\n\u2000•\u2000\u2000You can also use \`${client.prefix}help <command>\` to get help on a specific command.`
            )
        message.channel.send(embed)
    } else {
        const command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
        if (!command) return this.execute(client, message, []);

        const commandInfo = command.help;
        const aliasesPresent = commandInfo.aliases.length > 0;

        embed.setTitle(`${commandInfo.name.toUpperCase()} Command!`);
        embed.setDescription(commandInfo.description);
        embed.addField("Usage", `\`${client.prefix}${commandInfo.name}${commandInfo.usage != "" ? ` ${commandInfo.usage}` : ""}\``);
        embed.addField("Aliases", `${aliasesPresent ? commandInfo.aliases.map(alias => `\`${alias}\``).join(", ") : "\`None\`"}`);

        message.channel.send(embed);

    };

}

module.exports.help = {
    name: "help",
    aliases: [],
    category: "Miscellaneous",
    usage: "<command>",
    description: "Shows Mao's help page!"
}