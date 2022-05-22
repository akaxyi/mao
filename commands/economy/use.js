const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const itemss = require('../../utils/items');
const x = '<a:No:830530976631095326>'

module.exports.execute = async (client, message, args) => {

    let user = await client.fetchUser(message.author.id);
    if (!args.join(' ')) {

        return attentionembed(message, `Sorry, please enter a valid item \`ID\`!`)
        //////return message.channel.send("you can't use nothing lmao");

    }
    const item = itemss.find(x => x.name.toLowerCase() === args.join(' ').toString().toLowerCase());
    if (!item) {

        return attentionembed(message, `Sorry,  you didn't use the a valid \`ID\`!`)
        //////return message.channel.send("can't use this item");

    }
    if (!item.canUse) {

        return attentionembed(message, `Sorry, can't use this item!`)
        //////return message.channel.send(":thinking: You can't use this item");

    }
    let founditem = user.items.find(x => x.name.toLowerCase() === item.name.toLowerCase());
    let array = [];
    array = user.items.filter(x => x.name !== item.name);
    if (!founditem) {
        return attentionembed(message, `Tought luck, you don't have this item!`)
        //////return message.channel.send("you don't have this item");
    }

    if (item.keep == false) {
        if (founditem.amount === 1) {
            user.items = user.items.filter(x => x.name.toLowerCase() != item.name.toLowerCase());
            await user.save();
        }
        else {
            array.push({
                name: item.name,
                amount: founditem.amount - 1,
                description: item.description
            });
            user.items = array;
            await user.save();
            const randomAmountOfSpace = Math.floor(Math.random() * 9) + 1; // Min 1, Max 10
            client.giveBankSpace(message.author.id, randomAmountOfSpace);
        }
    }
    await item.run(client, message, args);

}
module.exports.help = {
    name: 'use',
    aliases: [],
    category: 'Economy',
    usage: '<itemID>',
    description: 'Use an item you have in your inventory!'
}