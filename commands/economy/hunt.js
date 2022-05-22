const { MessageEmbed } = require("discord.js");
const x = '<a:No:830530976631095326>'
const tick = '<a:tick:828290595180249098>'
const { attentionembed } = require('../../utils/embed');
const cd = '<a:No:830530976631095326>'
const prettyMilliseconds = require('pretty-ms');

module.exports.execute = async (client, message, args) => {

    let user = await client.fetchUser(message.author.id);

    if ((Date.parse(user.cooldowns.hunt) + 420000) > Date.now()) {
        return attentionembed(message, `You need to wait \`${prettyMilliseconds((Date.parse(user.cooldowns.hunt) + 420000) - Date.now())}\` before using this command again!`)
    } else {
        let founditem = user.items.find(x => x.name.toLowerCase() === 'rifle');
        array = user.items.filter(x => x.name !== 'rifle');
        if (!founditem) {
            return attentionembed(message, `Tough luck, you need a \`rifle\` for this command! Buy one for **10,000** <:maocoin:819634260352303154>!`)
            //////return message.channel.send("you don't have this item");
        }



        const randomMessage = [
            'bear',
            'deer',
            'duck',
            'pig',
            'cow',
            'fox',
            'rabbit',
            'chicken',
            'boar',
            'missed'
        ];

        const response = randomMessage[Math.floor((Math.random() * randomMessage.length))];

        if (response == 'bear') {
            const deerAmount = Math.round(Math.random() * 1) + 1;
            const data = await client.fetchUser(message.author.id);
            const EmbedBear = new MessageEmbed()
                .setDescription(`${tick} You went hunting with your rifle and came back with **x${deerAmount}** Bear 🐻!`)
                .setColor("GREEN")
            message.lineReply(EmbedBear);
            //message.channel.send(`You went hunting and came back with **${deerAmount}** x Bear 🐻`);
            const findItem = data.items.find(i => i.name.toLowerCase() == 'bear');
            let userInv = data.items.filter(i => i.name.toLowerCase() !== 'bear');
            if (findItem) {
                userInv.push({ name: 'bear', amount: (findItem.amount + deerAmount), description: '🐻 **Bear**\nSell this to get money!' });
                data.items = userInv;
                await data.save();
            } else {
                userInv.push({ name: 'bear', amount: deerAmount, description: '🐻 **Bear**\nSell this to get money!' });
                data.items = userInv;
                await data.save();
            }
        } else if (response == 'deer') {
            const deerAmount = Math.round(Math.random() * 1) + 1;
            const data = await client.fetchUser(message.author.id);
            const EmbedDeer = new MessageEmbed()
                .setDescription(`${tick} You went hunting with your rifle and came back with **x${deerAmount}** Deer 🦌`)
                .setColor("GREEN")
            message.lineReply(EmbedDeer);
            //message.channel.send(`You went hunting and came back with **${deerAmount}** x Deer 🦌`);
            const findItem = data.items.find(i => i.name.toLowerCase() == 'deer');
            let userInv = data.items.filter(i => i.name.toLowerCase() !== 'deer');
            if (findItem) {
                userInv.push({ name: 'deer', amount: (findItem.amount + deerAmount), description: '🦌 **Deer**\nSell this to get money!' });
                data.items = userInv;
                await data.save();
            } else {
                userInv.push({ name: 'deer', amount: deerAmount, description: '🦌 **Deer**\nSell this to get money!' });
                data.items = userInv;
                await data.save();
            }
        } else if (response == 'duck') {
            const deerAmount = Math.round(Math.random() * 1) + 1;
            const data = await client.fetchUser(message.author.id);
            const EmbedDuck = new MessageEmbed()
                .setDescription(`${tick} You went hunting with your rifle and came back with **x${deerAmount}** Duck 🦆`)
                .setColor("GREEN")
            message.lineReply(EmbedDuck);
            //message.channel.send(`You went hunting and came back with **${deerAmount}** x Duck 🦆`);
            const findItem = data.items.find(i => i.name.toLowerCase() == 'duck');
            let userInv = data.items.filter(i => i.name.toLowerCase() !== 'duck');
            if (findItem) {
                userInv.push({ name: 'duck', amount: (findItem.amount + deerAmount), description: '🦆 **Duck**\nSell this to get money!' });
                data.items = userInv;
                await data.save();
            } else {
                userInv.push({ name: 'duck', amount: deerAmount, description: '🦆 **Duck**\nSell this to get money!' });
                data.items = userInv;
                await data.save();
            }
        } else if (response == 'pig') {
            const deerAmount = Math.round(Math.random() * 1) + 1;
            const data = await client.fetchUser(message.author.id);
            const EmbedPig = new MessageEmbed()
                .setDescription(`${tick} You went hunting with your rifle and came back with **x${deerAmount}** Pig 🐷`)
                .setColor("GREEN")
            message.lineReply(EmbedPig);
            //message.channel.send(`You went hunting and came back with **${deerAmount}** x Pig 🐷`);
            const findItem = data.items.find(i => i.name.toLowerCase() == 'pig');
            let userInv = data.items.filter(i => i.name.toLowerCase() !== 'pig');
            if (findItem) {
                userInv.push({ name: 'pig', amount: (findItem.amount + deerAmount), description: '🐷 **Pig**\nSeel this to get money!' });
                data.items = userInv;
                await data.save();
            } else {
                userInv.push({ name: 'pig', amount: deerAmount, description: '🐷 **Pig**\nSell this to get money!' });
                data.items = userInv;
                await data.save();
            }
        } else if (response == 'cow') {
            const deerAmount = Math.round(Math.random() * 1) + 1;
            const data = await client.fetchUser(message.author.id);
            const EmbedCow = new MessageEmbed()
                .setDescription(`${tick} You went hunting with your rifle and came back with **x${deerAmount}** Cow 🐮`)
                .setColor("GREEN")
            message.lineReply(EmbedCow);
            //message.channel.send(`You went hunting and came back with **${deerAmount}** x Cow 🐮`);
            const findItem = data.items.find(i => i.name.toLowerCase() == 'cow');
            let userInv = data.items.filter(i => i.name.toLowerCase() !== 'cow');
            if (findItem) {
                userInv.push({ name: 'cow', amount: (findItem.amount + deerAmount), description: '🐮 **Cow**\nSell this to get money!' });
                data.items = userInv;
                await data.save();
            } else {
                userInv.push({ name: 'cow', amount: deerAmount, description: '🐮 **Cow**\nSell this to get money!' });
                data.items = userInv;
                await data.save();
            }
        } else if (response == 'fox') {
            const deerAmount = Math.round(Math.random() * 1) + 1;
            const data = await client.fetchUser(message.author.id);
            const EmbedFox = new MessageEmbed()
                .setDescription(`${tick} You went hunting with your rifle and came back with **x${deerAmount}** Fox 🦊`)
                .setColor("GREEN")
            message.lineReply(EmbedFox);
            //message.channel.send(`You went hunting and came back with **${deerAmount}** x Fox 🦊`);
            const findItem = data.items.find(i => i.name.toLowerCase() == 'fox');
            let userInv = data.items.filter(i => i.name.toLowerCase() !== 'fox');
            if (findItem) {
                userInv.push({ name: 'fox', amount: (findItem.amount + deerAmount), description: '🦊 **Fox**\nSell this to get money!' });
                data.items = userInv;
                await data.save();
            } else {
                userInv.push({ name: 'fox', amount: deerAmount, description: '🦊 **Fox**\nSell this to get money!' });
                data.items = userInv;
                await data.save();
            }
        } else if (response == 'rabbit') {
            const deerAmount = Math.round(Math.random() * 1) + 1;
            const data = await client.fetchUser(message.author.id);
            const EmbedRabbit = new MessageEmbed()
                .setDescription(`${tick} You went hunting with your rifle and came back with **x${deerAmount}** Rabbit 🐰`)
                .setColor("GREEN")
            message.lineReply(EmbedRabbit);
            //message.channel.send(`You went hunting and came back with **${deerAmount}** x Rabbit 🐰`);
            const findItem = data.items.find(i => i.name.toLowerCase() == 'rabbit');
            let userInv = data.items.filter(i => i.name.toLowerCase() !== 'rabbit');
            if (findItem) {
                userInv.push({ name: 'rabbit', amount: (findItem.amount + deerAmount), description: '🐰 **Rabbit**\nSell this to get money!' });
                data.items = userInv;
                await data.save();
            } else {
                userInv.push({ name: 'rabbit', amount: deerAmount, description: '🐰 **Rabbit**\nSell this to get money!' });
                data.items = userInv;
                await data.save();
            }
        } else if (response == 'chicken') {
            const deerAmount = Math.round(Math.random() * 1) + 1;
            const data = await client.fetchUser(message.author.id);
            const EmbedChicken = new MessageEmbed()
                .setDescription(`${tick} You went hunting with your rifle and came back with **x${deerAmount}** Chicken 🐔`)
                .setColor("GREEN")
            message.lineReply(EmbedChicken);
            //message.channel.send(`You went hunting and came back with **${deerAmount}** x Chicken 🐔`);
            const findItem = data.items.find(i => i.name.toLowerCase() == 'chicken');
            let userInv = data.items.filter(i => i.name.toLowerCase() !== 'chicken');
            if (findItem) {
                userInv.push({ name: 'chicken', amount: (findItem.amount + deerAmount), description: '🐔 **Chicken**\nSell this to get money!' });
                data.items = userInv;
                await data.save();
            } else {
                userInv.push({ name: 'chicken', amount: deerAmount, description: '🐔 **Chicken**\nSell this to get money!' });
                data.items = userInv;
                await data.save();
            }
        } else if (response == 'boar') {
            const deerAmount = Math.round(Math.random() * 1) + 1;
            const data = await client.fetchUser(message.author.id);
            const EmbedBoar = new MessageEmbed()
                .setDescription(`${tick} You went hunting with your rifle and came back with **x${deerAmount}** Boar 🐗`)
                .setColor("GREEN")
            message.lineReply(EmbedBoar);
            //message.channel.send(`You went hunting and came back with **${deerAmount}** x Boar 🐗`);
            const findItem = data.items.find(i => i.name.toLowerCase() == 'boar');
            let userInv = data.items.filter(i => i.name.toLowerCase() !== 'boar');
            if (findItem) {
                userInv.push({ name: 'boar', amount: (findItem.amount + deerAmount), description: '🐗 **Boar**\nSell this to get money!' });
                data.items = userInv;
                await data.save();
            } else {
                userInv.push({ name: 'boar', amount: deerAmount, description: '🐗 **Boar**\nSell this to get money!' });
                data.items = userInv;
                await data.save();
            }
        } else if (response == 'missed') {
            const Embedmissed = new MessageEmbed()
                .setDescription(`${x} You went hunting and you slipped and shot a round in the sky and scared off all the animals around!`)
                .setColor("GREEN")
            message.lineReply(Embedmissed);
        }
        user.save().then(user.cooldowns.hunt = new Date(Date.now()))
        const randomAmountOfSpace = Math.floor(Math.random() * 9) + 1; // Min 1, Max 10
        client.giveBankSpace(message.author.id, randomAmountOfSpace);

    }

}
module.exports.help = {
    name: 'hunt',
    aliases: [],
    category: 'Economy',
    usage: '',
    description: 'You go out hunting for animals or you might fail!'
}
