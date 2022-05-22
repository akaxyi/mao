const { MessageEmbed } = require("discord.js");
const { util } = require("../../index.js");
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

    if (message.author.id !== "547181832895070209") {
        attentionembed(message, "Owner Only!");
        return;
    }

    if (!args[0]) return client.commands.get("help").execute(client, message, ["reload"]);
    const cmd = args[0].toLowerCase();
    const res = util.reloadCommand(cmd);

    switch (res) {
        case "Command Loaded": {
            let resultsEmbed = new MessageEmbed()
                .setDescription(`<a:tick:828290595180249098> \`${cmd}\` Command reloaded successfully!`)
                .setColor("#FFDF32")
            message.lineReply(resultsEmbed)
            break;
        }
        case "Command Not Loaded": {
            attentionembed(message, `\`${cmd}\` Command was never loaded!`);
            break;
        }
        case "Unknown Command": {
            attentionembed(message, "The command provided does not exist!");
            break;
        }
        case "Error": {
            attentionembed(message, "An unknown an error has occurred when reloding the command!");
            break;
        }
    }

}

module.exports.help = {
    name: "reload",
    aliases: ["rl"],
    category: "Owner",
    usage: "<command>",
    description: "Did you make changes to a command? Reload it without restarting the me!"
}