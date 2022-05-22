const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const x = '<a:No:830530976631095326>'
const tick = '<a:tick:828290595180249098>'

module.exports.execute = async (client, message, args) => {

    let data = await client.fetchUser(message.author.id);
    if (args.join(' ') === 'all') {
        if (data.coinsInBank === 0) {
            return attentionembed(message, `Sorry you can't withdraw 0 <:maocoin:819634260352303154>!`)
        }
        data.coinsInWallet += data.coinsInBank; {

            let with2embed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`${tick} You withdrew **${data.coinsInBank.toLocaleString()}** <:maocoin:819634260352303154>!`);
            await message.lineReply(with2embed);
            ////await message.channel.send(`Withdrawed **${data.coinsInBank}** coins.`);

        }

        data.coinsInBank -= data.coinsInBank;

        await data.save();
    } else {
        let withAmount = parseInt(args[0]);
        if (withAmount === 0) {
            return attentionembed(message, `Sorry you can't withdraw 0 <:maocoin:819634260352303154>!`)
        }
        if (isNaN(withAmount)) {

            return attentionembed(message, `That was an invalid number!`)
            //return message.channel.send('That\'s not a number.');
        }

        if (parseInt(withAmount) > data.coinsInBank) {
            return attentionembed(message, `Sorry you can't withdraw 0 <:maocoin:819634260352303154>!`)
            //return message.channel.send('You do not have that much coins.');
        }

        data.coinsInWallet += parseInt(withAmount); {
            let with4embed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`${tick} You withdrew **${(withAmount).toLocaleString()}** <:maocoin:819634260352303154>!`);
            await message.lineReply(with4embed);
            ///await message.channel.send(`Withdrawed **${args[0]}** coins.`);
        }

        data.coinsInBank -= parseInt(withAmount);

        await data.save();
    }

}
module.exports.help = {
    name: 'withdraw',
    aliases: ["with"],
    category: 'Economy',
    usage: '<amount>',
    description: 'Withdraws money into your pocket!'
}
