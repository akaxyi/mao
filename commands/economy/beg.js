const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const prettyMilliseconds = require('pretty-ms');
const tick = '<a:tick:828290595180249098>'
const cd = '<a:No:830530976631095326>'

module.exports.execute = async (client, message, args) => {

    let user = await client.fetchUser(message.author.id);

    if ((Date.parse(user.cooldowns.beg) + 300000) > Date.now()) {
        return attentionembed(message, `You need to wait \`${prettyMilliseconds((Date.parse(user.cooldowns.beg) + 300000) - Date.now())}\` before using this command again!`)
    } else {
        let random;
        let clover = user.items.find(x => x.name.toLowerCase() === 'clover');
        if (clover) {
            random = Math.floor(Math.random() * 198) + 100
        } else random = Math.floor(Math.random() * 99) + 50;
        const randomMessage = [
            `**Elon Musk** gave you **${random.toLocaleString()}** <:maocoin:819634260352303154>!`,
            `**Bill Gates** gave you **${random.toLocaleString()}** <:maocoin:819634260352303154>!`,
            `**Johnny Depp** gave you **${random.toLocaleString()}** <:maocoin:819634260352303154>!`,
            `**Barack Obama** gave you **${random.toLocaleString()}** <:maocoin:819634260352303154>!`,
            `**Tom Hanks** gave you **${random.toLocaleString()}** <:maocoin:819634260352303154>!`,
            `**Leonardo DiCaprio** gave you **${random.toLocaleString()}** <:maocoin:819634260352303154>!`,
            `**Morgan Freeman** gave you **${random.toLocaleString()}** <:maocoin:819634260352303154>!`,
            `**Samuel L. Jackson** gave you **${random.toLocaleString()}** <:maocoin:819634260352303154>!`,
            `**Angelina Jolie** gave you **${random.toLocaleString()}** <:maocoin:819634260352303154>!`
        ];

        const response = randomMessage[Math.floor((Math.random() * randomMessage.length))];

        let begembed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`${tick} ${response}`);

        await message.lineReply(begembed).catch();

        user.coinsInWallet += random;
        const randomAmountOfSpace = Math.floor(Math.random() * 9) + 1; // Min 1, Max 10
        client.giveBankSpace(message.author.id, randomAmountOfSpace);
        user.save().then(user.cooldowns.beg = new Date(Date.now()))
    };

}
module.exports.help = {
    name: 'beg',
    aliases: [],
    category: 'Economy',
    usage: '',
    description: 'You beg for money on the streets!'
}