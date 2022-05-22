const { MessageEmbed } = require("discord.js");

module.exports = {
    async attentionembed(message, titel) {

        try {
            await message.reactions.removeAll();
        } catch {
        }

        let resultsEmbed = new MessageEmbed()
            .setDescription(`<a:No:830530976631095326> ` + titel)
            .setColor("#FF0000")

        message.lineReply(resultsEmbed);
        return;

    },
    async correctembed(message, titel) {

        try {
            await message.reactions.removeAll();
        } catch {
        }

        let resultsEmbed = new MessageEmbed()
            .setDescription(`<a:tick:828290595180249098> ` + titel)
            .setColor("GREEN")

        message.lineReply(resultsEmbed);
        return;

    }
};