const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const x = '<a:No:830530976631095326>'
const coin = "<:maocoin:819634260352303154>"
const s = '🛡️'
const tick = "<a:tick:828290595180249098>"
const prettyMilliseconds = require('pretty-ms');

module.exports.execute = async (client, message, args) => {

    const user = await client.fetchUser(message.author.id);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    if (user.passive == true) return attentionembed(message, `To use \`rob\` you have to disable passive mode!`).catch();

    else {

        if ((Date.parse(user.cooldowns.rob) + 3600000) > Date.now()) {
            return attentionembed(message, `You need to wait \`${prettyMilliseconds((Date.parse(user.cooldowns.rob) + 3600000) - Date.now())}\` before using this command again!`)
        } else {

            if (!member) {
                return attentionembed(message, `You have to mention somone to rob from!`)
            }
            if (member.user.id == message.author.id) {
                return attentionembed(message, `You can't rob yourself!`)
                //return message.channel.send(`Lol you can't give yourself coins u crazy.`);
            }
            if (member.user.bot) {
                return attentionembed(message, `Bots don't have accounts!`);
            };
            const robbedUser = await client.fetchUser(member.id);
            if (robbedUser.passive == true) {
                return attentionembed(message, `${member} has passive mode enabled, try better next time!`).catch();
            }
            if (robbedUser.coinsInWallet < 200) {
                return attentionembed(message, `Sorry, this person has below **200** ${coin}!`)
            }
            if (user.items.find(x => x.name == 'dog')) {
                const newInv = user.items.find(i => i.name != 'dog');
                const bypass = user.items.find(i => i.name == 'dog');
                if (bypass.amount == 1) {
                    user.items = newInv;
                } else {
                    newInv.push({ name: 'dog', amount: bypass.amount - 1, description: bypass.description });
                    user.items = newInv
                }
            } else {
                const random = Math.floor(Math.random() * 5);
                if (random === 3) {
                    user.save().then(user.cooldowns.rob = new Date(Date.now()))
                    return attentionembed(message, `${s} You tried to rob **${member.user}**, but they had a **DOG**! Try again next time!`)

                }
            }
            let array = robbedUser.items.find(x => x.name !== 'padlock');
            const padlock = robbedUser.items.find(x => x.name === 'padlock');
            if (padlock) {

                let rob6embed = new MessageEmbed()
                    .setColor("#FF0000")
                    .setDescription(`${s} You tried to rob **${member.user}**, but they had a **PADLOCK**! Try again next time!`);
                message.lineReply(rob6embed);
                let rob6embeddd = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`${tick} **${message.author}** Tried to steal from you but you luckily had a **PADLOCK**!`);
                member.send(rob6embeddd);
                //message.channel.send(`You tried to rob **${member.user.tag}**, but they had a **Padlock**🔒. Try again next time.`);
                user.save().then(user.cooldowns.rob = new Date(Date.now()))
                if (padlock.amount === 1) {
                    robbedUser.items = array;
                    await robbedUser.save();
                    return;
                }
                else {
                    array.push({
                        name: 'padlock',
                        amount: padlock.amount - 1,
                        description: padlock.description
                    });
                    robbedUser.items = array;
                    await robbedUser.save();
                    return;

                }
            }
            const randomAmount = Math.round(Math.random() * robbedUser.coinsInWallet);
            user.coinsInWallet += randomAmount;
            robbedUser.coinsInWallet -= randomAmount;
            await user.save();
            await robbedUser.save();

            let rob6embed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`${tick} You stole **${randomAmount.toLocaleString()}** ${coin} from ${member}!`);
            message.lineReply(rob6embed);

            let rob6embedd = new MessageEmbed()
                .setColor("#FF0000")
                .setDescription(`**${message.author}** Stole **${randomAmount.toLocaleString()}** ${coin} from you!`);
            member.send(rob6embedd);

            user.save().then(user.cooldowns.rob = new Date(Date.now()))
            const randomAmountOfSpace = Math.floor(Math.random() * 9) + 1; // Min 1, Max 10
            client.giveBankSpace(message.author.id, randomAmountOfSpace);
        }
    }
}
module.exports.help = {
    name: 'rob',
    aliases: ["steal"],
    category: 'Economy',
    usage: '@user',
    description: 'Try to rob somone, maybe fail or get money!'
}