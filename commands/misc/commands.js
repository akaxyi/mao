const discord = require("discord.js");
const { config } = require("../../index.js");

module.exports.execute = async (client, message, args) => {
    const helpCommand = client.commands.get("help").help;
    const embed = new discord.MessageEmbed()
        .setColor("#FFDF32")
        .setThumbnail(client.user.avatarURL(client.user))
        .setFooter(`Requested by ${message.author.tag}`)
        .setTimestamp();


    const categories = [];
    const commands = client.commands;

    commands.forEach((command) => {
        if (!categories.includes(command.help.category)) {
            categories.push(command.help.category);
        }
    });

    embed.setTitle("Mao's Commands!");
    embed.setDescription([
        `**Prefix:** \`${client.prefix}\``,
        `Use \`${client.prefix}${helpCommand.name} ${helpCommand.usage}\` to view command help with more detail.`
    ].join("\n"));

    categories.forEach((cat) => {
        const tCommands = commands.filter((cmd) => cmd.help.category === cat);
        embed.addField(cat + ` - ${tCommands.size}`, tCommands.map((cmd) => "`" + cmd.help.name + "`").join(", "));
    });

    message.channel.send(embed);
    return;

}

module.exports.help = {
    name: "commands",
    aliases: [],
    category: "Miscellaneous",
    usage: "",
    description: "Shows the list of Mao's commands!"
}