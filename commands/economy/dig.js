const { MessageEmbed } = require("discord.js");
const x = '<a:No:830530976631095326>'
const tick = '<a:tick:828290595180249098>'
const { attentionembed } = require('../../utils/embed');
const prettyMilliseconds = require('pretty-ms');

module.exports.execute = async (client, message, args) => {

    let user = await client.fetchUser(message.author.id);

    if ((Date.parse(user.cooldowns.dig) + 420000) > Date.now()) {
        return attentionembed(message, `You need to wait \`${prettyMilliseconds((Date.parse(user.cooldowns.dig) + 420000) - Date.now())}\` before using this command again!`)
    } else {
        let founditem = user.items.find(x => x.name.toLowerCase() === 'shovel');
        array = user.items.filter(x => x.name !== 'shovel');
        if (!founditem) {
            return attentionembed(message, `Tough luck, you need a \`shovel\` for this command! Buy one for **10,000** <:maocoin:819634260352303154>!`)
            //////return message.channel.send("you don't have this item");
        }



        const randomMessage = [
            'ant',
            'worm',
            'trash',
            'rifle',
            'banknote',
            'missed'
        ];

        const response = randomMessage[Math.floor((Math.random() * randomMessage.length))];

        if (response == 'ant') {
            const antAmount = Math.round(Math.random() * 1) + 1;
            const data = await client.fetchUser(message.author.id);
            const EmbedAnt = new MessageEmbed()
                .setDescription(`${tick} You went digging with your shovel and came back with **x${antAmount}** Ant 🐜!`)
                .setColor("GREEN")
            message.lineReply(EmbedAnt);
            //message.channel.send(`You went hunting and came back with **${deerAmount}** x Bear 🐻`);
            const findItem = data.items.find(i => i.name.toLowerCase() == 'ant');
            let userInv = data.items.filter(i => i.name.toLowerCase() !== 'ant');
            if (findItem) {
                userInv.push({ name: 'ant', amount: (findItem.amount + antAmount), description: '🐜 **Ant**\nSell this to get money!' });
                data.items = userInv;
                await data.save();
            } else {
                userInv.push({ name: 'ant', amount: antAmount, description: '🐜 **Ant**\nSell this to get money!' });
                data.items = userInv;
                await data.save();
            }
        } else if (response == 'worm') {
            const wormAmount = Math.round(Math.random() * 1) + 1;
            const data = await client.fetchUser(message.author.id);
            const EmbedWorm = new MessageEmbed()
                .setDescription(`${tick} You went digging with your shovel and came back with **x${wormAmount}** Worm 🪱`)
                .setColor("GREEN")
            message.lineReply(EmbedWorm);
            //message.channel.send(`You went hunting and came back with **${deerAmount}** x Deer 🦌`);
            const findItem = data.items.find(i => i.name.toLowerCase() == 'worm');
            let userInv = data.items.filter(i => i.name.toLowerCase() !== 'worm');
            if (findItem) {
                userInv.push({ name: 'worm', amount: (findItem.amount + wormAmount), description: '🪱 **Worm**\nSell this to get money!' });
                data.items = userInv;
                await data.save();
            } else {
                userInv.push({ name: 'worm', amount: wormAmount, description: '🪱 **Worm**\nSell this to get money!' });
                data.items = userInv;
                await data.save();
            }
        } else if (response == 'trash') {
            const trashAmount = Math.round(Math.random() * 1) + 1;
            const data = await client.fetchUser(message.author.id);
            const EmbedTrash = new MessageEmbed()
                .setDescription(`${tick} You went digging with your shovel and came back with **x${trashAmount}** Trash <:trash:848919922951061524>`)
                .setColor("GREEN")
            message.lineReply(EmbedTrash);
            //message.channel.send(`You went hunting and came back with **${deerAmount}** x Deer 🦌`);
            const findItem = data.items.find(i => i.name.toLowerCase() == 'trash');
            let userInv = data.items.filter(i => i.name.toLowerCase() !== 'trash');
            if (findItem) {
                userInv.push({ name: 'trash', amount: (findItem.amount + trashAmount), description: '<:trash:848919922951061524> **Trash**\nSell this to get money!' });
                data.items = userInv;
                await data.save();
            } else {
                userInv.push({ name: 'trash', amount: trashAmount, description: '<:trash:848919922951061524> **Trash**\nSell this to get money!' });
                data.items = userInv;
                await data.save();
            }
        } else if (response == 'rifle') {
            const rifleAmount = Math.round(Math.random() * 1) + 1;
            const data = await client.fetchUser(message.author.id);
            const EmbedRifle = new MessageEmbed()
                .setDescription(`${tick} You went digging with your shovel and came back with **x${rifleAmount}** Rifle <:rifle:831203985960206341>`)
                .setColor("GREEN")
            message.lineReply(EmbedRifle);
            //message.channel.send(`You went hunting and came back with **${deerAmount}** x Pig 🐷`);
            const findItem = data.items.find(i => i.name.toLowerCase() == 'rifle');
            let userInv = data.items.filter(i => i.name.toLowerCase() !== 'rifle');
            if (findItem) {
                userInv.push({ name: 'rifle', amount: (findItem.amount + rifleAmount), description: '<:rifle:831203985960206341> **Hunting Rifle**\nGives you access to the \`hunt\` command!' });
                data.items = userInv;
                await data.save();
            } else {
                userInv.push({ name: 'rifle', amount: rifleAmount, description: '<:rifle:831203985960206341> **Hunting Rifle**\nGives you access to the \`hunt\` command!' });
                data.items = userInv;
                await data.save();
            }
        } else if (response == 'banknote') {
            const banknoteAmount = Math.round(Math.random() * 1) + 1;
            const data = await client.fetchUser(message.author.id);
            const EmbedBanknote = new MessageEmbed()
                .setDescription(`${tick} You went hunting with your rifle and came back with **x${banknoteAmount}** Banknote 📜`)
                .setColor("GREEN")
            message.lineReply(EmbedBanknote);
            //message.channel.send(`You went hunting and came back with **${deerAmount}** x Cow 🐮`);
            const findItem = data.items.find(i => i.name.toLowerCase() == 'banknote');
            let userInv = data.items.filter(i => i.name.toLowerCase() !== 'banknote');
            if (findItem) {
                userInv.push({ name: 'banknote', amount: (findItem.amount + banknoteAmount), description: '📜 **Bank Note** \nGives you more space in your bank!' });
                data.items = userInv;
                await data.save();
            } else {
                userInv.push({ name: 'banknote', amount: banknoteAmount, description: '📜 **Bank Note** \nGives you more space in your bank!' });
                data.items = userInv;
                await data.save();
            }
        } else if (response == 'missed') {
            const Embedmissed = new MessageEmbed()
                .setDescription(`${x} You went hunting and you slipped and shot a round in the sky and scared off all the animals around!`)
                .setColor("GREEN")
            message.lineReply(Embedmissed);
        }
        user.save().then(user.cooldowns.dig = new Date(Date.now()))
        const randomAmountOfSpace = Math.floor(Math.random() * 9) + 1; // Min 1, Max 10
        client.giveBankSpace(message.author.id, randomAmountOfSpace);

    }

}
module.exports.help = {
    name: 'dig',
    aliases: [],
    category: 'Economy',
    usage: '',
    description: 'You go out digging with your shovel!'
}
