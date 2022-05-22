const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

    let timeEmbed = new MessageEmbed()
        .setColor("#FFDF32")
        .setAuthor(`Mao's Shop`)
        .addField("<:maolock:830572897750745170> Padlock - **3,000** <:maocoin:819634260352303154>", "`Item ID: padlock`\nThis secures your wallet from getting robbed!")
        .addField("📜 Bank Note - **5,000** <:maocoin:819634260352303154>", "`Item ID: banknote`\nGives you more space in your bank!")
        .addField("<:rifle:831203985960206341> Rifle - **10,000** <:maocoin:819634260352303154>", "`Item ID: rifle`\nGives you access to the \`hunt\` command!")
        .addField("<:shovel:848921074720702464> Shovel - **10,000** <:maocoin:819634260352303154>", "`Item ID: shovel`\nGives you access to the \`dig\` command!")
        .addField("🐶 Dog - **15,000** <:maocoin:819634260352303154>", "`Item ID: dog`\nGives you **x2** more coins on \`beg\`, \`daily\`, \`hack\`, \`weekly\`, \`work\`")
        .addField("<a:shinycoin:834871291382988861> Shiny Coin - **25,000,000** <:maocoin:819634260352303154>", "`Item ID: coin`\nFlex on people that you have this shiny coin!")

    message.channel.send(timeEmbed)
    const randomAmountOfSpace = Math.floor(Math.random() * 9) + 1; // Min 1, Max 10
    client.giveBankSpace(message.author.id, randomAmountOfSpace);

}
module.exports.help = {
    name: 'shop',
    aliases: [],
    category: 'Economy',
    usage: '',
    description: 'Shows Mao\'s creepy shop!'
}
