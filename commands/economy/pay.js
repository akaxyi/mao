const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const x = '<a:No:830530976631095326>'
const tick = '<a:tick:828290595180249098>'

module.exports.execute = async (client, message, args) => {

    const authorData = await client.fetchUser(message.author.id);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    if (authorData.passive == true) return attentionembed(message, `To use \`pay\` you have to disable passive mode!`).catch();

    else {

        if (!member || !args[0]) {

            return attentionembed(message, `You have to pay the coins to someone!`)
            //return message.channel.send(`Who are you giving the coins to?`);
        }
        if (member.user.id == message.author.id) {
            return attentionembed(message, `You can't pay yourself the coins!`)
            //return message.channel.send(`Lol you can't give yourself coins u crazy.`);
        }
        if (member.user.bot) {
            return attentionembed(message, `Bots don't have accounts!`);
        };
        if (!args[1]) {
            return attentionembed(message, `You have to give the person money`)
            //return message.channel.send(`How much coins are you giving them?`);
        }

        if (isNaN(args[1]) && args[1] != 'all') {
            return attentionembed(message, `That isn't a valid amount!`)
        }
        const userData = await client.fetchUser(member.user.id);
        if (userData.passive == true) {
            return attentionembed(message, `To give ${member} money they have to disable passive mode!`).catch();
            //return message.channel.send(`That user is in passive mode, they can't recive any coins`);
        }
        if (args[1] == 'all') {
            const toGive = authorData.coinsInWallet;

            authorData.coinsInWallet = 0;

            await authorData.save();

            userData.coinsInWallet = (userData.coinsInWallet + toGive);

            userData.save();

            let sendcoinsembed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`${tick} You have given ${member} **${parseInt(toGive).toLocaleString()}** <:maocoin:819634260352303154>!`);
            message.lineReply(sendcoinsembed3).catch();
            //message.channel.send(`You gave ${member} **${parseInt(toGive).toLocaleString()}** coins`); //Change the message how u like
        } else {
            const toGive = args[1];

            if (toGive > authorData.coinsInWallet) {

                return attentionembed(message, `Sad times, you don't have that much coins!`)

                //return message.reply(`You don't have that many coins.`);
            }

            authorData.coinsInWallet = (authorData.coinsInWallet - parseInt(toGive));

            await authorData.save();

            userData.coinsInWallet = (userData.coinsInWallet + parseInt(toGive));

            await userData.save();
            const randomAmountOfSpace = Math.floor(Math.random() * 9) + 1; // Min 1, Max 10
            client.giveBankSpace(message.author.id, randomAmountOfSpace);
            let sendcoinsembed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`${tick} You have given ${member} **${parseInt(toGive).toLocaleString()}** <:maocoin:819634260352303154>!`);
            message.lineReply(sendcoinsembed3).catch();
        }
    }
}
module.exports.help = {
    name: 'pay',
    aliases: [],
    category: 'Economy',
    usage: '@user <amount>',
    description: 'You give money to someone in the server!'
}
