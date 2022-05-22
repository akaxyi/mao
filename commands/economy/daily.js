const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const tick = '<a:tick:828290595180249098>'
const cd = '<a:No:830530976631095326>'
const coin = '<:maocoin:819634260352303154>'
const prettyMilliseconds = require('pretty-ms');

module.exports.execute = async (client, message, args) => {

    let user = await client.fetchUser(message.author.id);

    if ((Date.parse(user.cooldowns.daily) + 86400000) > Date.now()) {
        return attentionembed(message, `You need to wait \`${prettyMilliseconds((Date.parse(user.cooldowns.daily) + 86400000) - Date.now())}\` before using this command again!`)
    } else {
        let random;
        let clover = user.items.find(x => x.name.toLowerCase() === 'clover');
        if (clover) {
            random = random = Math.floor(Math.random() * 2998) + 1500
        } else random = Math.floor(Math.random() * 1499) + 750;
        const claimed = new MessageEmbed()
            .setDescription(`${tick} You claimed your **${random} ${coin}** reward!`)
            .setColor('GREEN');
        message.lineReply(claimed);
        user.coinsInWallet += random;
        const randomAmountOfSpace = Math.floor(Math.random() * 9) + 1; // Min 1, Max 10
        client.giveBankSpace(message.author.id, randomAmountOfSpace);
        user.save().then(user.cooldowns.daily = new Date(Date.now()))

    }
}
module.exports.help = {
    name: 'daily',
    aliases: [],
    category: 'Economy',
    usage: '',
    description: 'Claim your daily reward every day!'
}
