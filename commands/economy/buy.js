const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const itemss = require('../../utils/items');
const x = '<a:No:830530976631095326>'
const tick = '<a:tick:828290595180249098>'

module.exports.execute = async (client, message, args) => {

    let user = await client.fetchUser(message.author.id);
    if (!args.join(' ')) {

        return attentionembed(message, `Sorry, you can't buy nothing, please enter a valid item \`id\`!`)
        //return message.channel.send("you can't buy nothing, please enter the correct item id");
    }
    if (!args[1]) args[1] = '';
    const item = itemss.find(x => x.name.toLowerCase() === args.join(' ').toString().toLowerCase() || x.name.toLowerCase() === args[0].toString().toLowerCase() || x.name.toLowerCase() === `${args[0].toString().toLowerCase()} ${args[1].toString().toLowerCase()}`);
    if (!item) {
        return attentionembed(message, `Sorry, you can't buy that item, please enter a valid item \`ID\`!`)
        //return message.channel.send("You can't buy an item that doesn't exist please use the correct item id");
    }
    if (item.canBuy == false) {
        return attentionembed(message, `Sorry, you can't buy that item, please enter a another valid item!`)
        //return message.channel.send(":thinking: You can't buy this item");
    }


    let buyAmount = args.join(' ').toString().match(/([1-9][0-9]*)/)

    if (!buyAmount) buyAmount = 1;
    else buyAmount = buyAmount[0]
    if (item.price > user.coinsInWallet || (buyAmount * item.price) > user.coinsInWallet) {
        return attentionembed(message, `Sorry, you can't buy this item, you don't have enought money to buy it!`)
        //return message.channel.send("You dont have the funds to buy this item.");
    }

    let founditem = user.items.find(x => x.name.toLowerCase() === item.name.toLowerCase());
    let array = [];
    array = user.items.filter(x => x.name !== item.name);
    if (founditem) {
        array.push({
            name: item.name,
            amount: (parseInt(founditem.amount) + parseInt(buyAmount)),
            description: item.description
        });
        user.items = array;
        await user.save();
    }
    else {
        user.items.push({
            name: item.name,
            amount: buyAmount,
            description: item.description
        });
        await user.save();
    }
    user.coinsInWallet -= (parseInt(item.price) * parseInt(buyAmount));
    await user.save();
    const randomAmountOfSpace = Math.floor(Math.random() * 9) + 1; // Min 1, Max 10
    client.giveBankSpace(message.author.id, randomAmountOfSpace);
    let itempayedembed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`${tick} You have successfully bought **${parseInt(buyAmount).toLocaleString()}** \`${item.name}\`!`);

    message.lineReply(itempayedembed).catch();
    //message.channel.send(`You bought **${parseInt(buyAmount).toLocaleString()}** \`${item.name}\``);

}
module.exports.help = {
    name: 'buy',
    aliases: [],
    category: 'Economy',
    usage: '<itemID>',
    description: 'You buy something from Mao\'s shop!'
}
