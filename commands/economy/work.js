const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const prettyMilliseconds = require('pretty-ms');
const cd = '<a:No:830530976631095326>'
const coin = '<:maocoin:819634260352303154>'
const tick = '<a:tick:828290595180249098>'

module.exports.execute = async (client, message, args) => {

    let user = await client.fetchUser(message.author.id);

    if ((Date.parse(user.cooldowns.work) + 600000) > Date.now()) {
        return attentionembed(message, `You need to wait \`${prettyMilliseconds((Date.parse(user.cooldowns.work) + 600000) - Date.now())}\` before using this command again!`)
    } else {
        let replies = ['Programmer', 'Builder', 'Waiter', 'Busboy', 'Chief', 'Mechanic', 'Writer', 'Singer', 'shopkeeper', 'Doctor', 'Preist']

        let result = Math.floor((Math.random() * replies.length));
        let amount;
        let clover = user.items.find(x => x.name.toLowerCase() === 'clover');
        if (clover) {
            amount = Math.floor(Math.random() * 598) + 150
        } else amount = Math.floor(Math.random() * 299) + 75;
        let embed1 = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`${tick} You worked as a **${replies[result]}** and earned **${amount}** ${coin}!`);
        message.lineReply(embed1)

        user.coinsInWallet += amount;
        user.save().then(user.cooldowns.work = new Date(Date.now()))
        const randomAmountOfSpace = Math.floor(Math.random() * 9) + 1; // Min 1, Max 10
        client.giveBankSpace(message.author.id, randomAmountOfSpace);
    };

}
module.exports.help = {
    name: 'work',
    aliases: [],
    category: 'Economy',
    usage: '',
    description: 'Go to work and earn money!'
}
