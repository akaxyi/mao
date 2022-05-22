const { MessageEmbed } = require('discord.js');
const x = '<a:No:830530976631095326>'
const c = " <:maocoin:819634260352303154>"
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

    let data = await client.fetchUser(message.author.id);


    if (args.join(' ') === 'all') {
        if (data.coinsInWallet > data.bankSpace) {
            const max_deposit = (data.coinsInWallet + data.coinsInBank - data.bankSpace);

            if (data.coinsInBank - data.bankSpace === 0) {

                return attentionembed(message, `Sad times, your bank balance is full!`)
            }


            data.coinsInWallet = max_deposit;
            let dep111embed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`<a:tick:828290595180249098> You put **${(data.bankSpace - data.coinsInBank).toLocaleString()}** ${c} in their bank!`);

            await message.lineReply(dep111embed).catch();

            data.coinsInBank = ((data.coinsInWallet + data.bankSpace) - max_deposit);

            await data.save();
        } else {
            if (data.coinsInWallet === 0) {
                return attentionembed(message, `Sorry you can't deposit 0 <:maocoin:819634260352303154>!`)
            }

            if ((data.coinsInWallet + data.coinsInBank) > data.bankSpace) {
                const left = (data.coinsInWallet + data.coinsInBank) - data.bankSpace;

                let begembed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`<a:tick:828290595180249098> You put **${(data.coinsInWallet - left).toLocaleString()}** ${c} in their bank!`);

                await message.lineReply(begembed).catch();

                data.coinsInBank += (data.coinsInWallet - left);
                data.coinsInWallet = left;

                await data.save();
            } else {
                let dep111embed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`<a:tick:828290595180249098> You put **${(data.coinsInWallet).toLocaleString()}** ${c} in their bank!`);
                await message.lineReply(dep111embed).catch();

                data.coinsInBank += data.coinsInWallet;
                data.coinsInWallet = 0;

                await data.save();
            }
        }
    } else {
        if (isNaN(args[0])) {

            return attentionembed(message, `That was an invalid number!`)
        }
        if (data.bankSpace - data.coinsInBank < parseInt(args[0])) {
            return attentionembed(message, `Sad times, your bank balance is not big enough!`)
        }
        if (parseInt(args[0]) > data.coinsInWallet) {
            return attentionembed(message, `Sorry, you don't have that much money!`)
        }

        data.coinsInBank += parseInt(args[0]);
        let depamountembed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`<a:tick:828290595180249098> You put **${parseInt(args[0]).toLocaleString()}** ${c} in their bank!`);

        await message.lineReply(depamountembed).catch();

        data.coinsInWallet -= parseInt(args[0]);

        await data.save();
    }
}
module.exports.help = {
    name: 'deposit',
    aliases: ["dep"],
    category: 'Economy',
    usage: '<amount>',
    description: 'Deposits money into your bank balance!'
}
