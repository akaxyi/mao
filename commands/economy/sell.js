const x = '<a:No:830530976631095326>'
const tick = '<a:tick:828290595180249098>'
const itemss = require('../../utils/items');
const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

    let user = await client.fetchUser(message.author.id);
    if (!args.join(' ')) {

        return attentionembed(message, `Sorry, you can't sell nothing, please enter a valid item \`ID\`!`)
        //////return message.channel.send("you can't sell nothing lmao");

    }
    if (!args[1]) args[1] = '';
    const item = itemss.find(x => x.name.toLowerCase() === args.join(' ').toString().toLowerCase() || x.name.toLowerCase() === args[0].toString().toLowerCase() || x.name.toLowerCase() === `${args[0].toString().toLowerCase()} ${args[1].toString().toLowerCase()}`);
    let sellAmount = args.join(' ').toString().match(/([1-9][0-9]*)/);
    if (!sellAmount) sellAmount = 1;
    else sellAmount = sellAmount[0]
    if (!item) {
        return attentionembed(message, `Tought luck, you can't sell this item!`)
        //////return message.channel.send("can't sell this item");
    }
    let founditem = user.items.find(x => x.name.toLowerCase() === item.name.toLowerCase());
    let array = [];
    array = user.items.filter(x => x.name !== item.name);
    if (!founditem) {
        return attentionembed(message, `Sorry, you didn't use the a valid \`ID\`!`)
        //////return message.channel.send("you don't have this item");
    }
    if (args[1] == 'all' || args[2] == 'all') {
        sellAmount = Math.floor(founditem.amount * item.sellAmount);
        user.items = array
        user.coinsInWallet += (sellAmount);
        user.save();
        const embed = new MessageEmbed()
            .setDescription(`${tick} You have sold **x${parseInt(sellAmount / item.sellAmount).toLocaleString()}** **${item.name}** for **${(sellAmount).toLocaleString()}** <:maocoin:819634260352303154>!`)
            .setColor('GREEN');
        return message.lineReply(embed);
    }
    if (founditem.amount < parseInt(sellAmount)) {
        return attentionembed(message, `Sorry, you only have **x${founditem.amount}** of this item!`)
        /////////return message.channel.send(`You only have ${founditem.amount} of this item`);
    }
    if (founditem.amount === 1) {
        user.items = array;
        await user.save();
    }
    else {
        if (founditem.amount - parseInt(sellAmount) == 0) {
            user.items = array;
            await user.save();
        } else {
            array.push({
                name: item.name,
                amount: (founditem.amount - parseInt(sellAmount)),
                description: item.description
            });
            user.items = array;
            await user.save();
        }
    }
    user.coinsInWallet += (item.sellAmount * parseInt(sellAmount));
    await user.save();
    const randomAmountOfSpace = Math.floor(Math.random() * 9) + 1; // Min 1, Max 10
    client.giveBankSpace(message.author.id, randomAmountOfSpace);
    const embed = new MessageEmbed()
        .setDescription(`${tick} You have sold **x${parseInt(sellAmount).toLocaleString()}** **${item.name}** for **${parseInt(item.sellAmount * sellAmount).toLocaleString()}** <:maocoin:819634260352303154>!`)
        .setColor('GREEN');
    message.lineReply(embed);
}
module.exports.help = {
    name: 'sell',
    aliases: [],
    category: 'Economy',
    usage: '<itemID>',
    description: 'You sell an item for money!'
}
