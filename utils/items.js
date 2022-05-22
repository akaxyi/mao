const { MessageEmbed } = require("discord.js");
const lock = '<:maolock:830572897750745170>'
const rifle = '<:rifle:831203985960206341>'
const shovel = '<:shovel:848921074720702464>'
const maocoin = '<a:shinycoin:834871291382988861>'

const array = [{
    name: 'padlock',
    description: `${lock} **Padlock**\nThis secures your wallet from getting robbed!`,
    canUse: false,
    canBuy: true,
    displayOnShop: true,
    sellAmount: 1500,
    price: 3000,
    keep: true,
    run: async (client, message, args) => {

    }
},
{
    name: 'banknote',
    description: `📜 **Bank Note** \nGives you more space in your bank!`,
    canUse: true,
    canBuy: true,
    displayOnShop: true,
    sellAmount: 2500,
    price: 5000,
    keep: false,
    run: async (client, message, args) => {
        const random = Math.ceil((Math.random() * 7500) + 2500);
        const e = await client.giveBankSpace(message.author.id, random);
        let bankspaceused = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`<a:tick:828290595180249098> You got **${random.toLocaleString()}** storage space! You now have **${e.bankSpace.toLocaleString()}** bank storage!`);
        return message.lineReply(bankspaceused);
    }
},
{
    name: 'rifle',
    description: `${rifle} **Hunting Rifle**\nGives you access to the \`hunt\` command!`,
    canUse: false,
    canBuy: true,
    displayOnShop: true,
    sellAmount: 5000,
    price: 10000,
    keep: true,
    run: async (client, message, args) => {

    }
},
{
    name: 'shovel',
    description: `${shovel} **Shovel**\nGives you access to the \`dig\` command!`,
    canUse: false,
    canBuy: true,
    displayOnShop: true,
    sellAmount: 5000,
    price: 10000,
    keep: true,
    run: async (client, message, args) => {

    }
},
{
    name: 'dog',
    description: `🐶 **dog**\nGives you **x2** more coins on \`beg\`, \`daily\`, \`weekly\`, \`work\``,
    canUse: false,
    canBuy: true,
    displayOnShop: true,
    sellAmount: 7500,
    price: 15000,
    keep: true,
    run: async (client, message, args) => {

    }
},
{
    name: 'coin',
    description: `${maocoin} **Shiny Coin**\nFlex on people that you have this rare coin!`,
    canUse: false,
    canBuy: true,
    displayOnShop: true,
    sellAmount: 12500000,
    price: 25000000,
    keep: true,
    run: async (client, message, args) => {

    }
},
{
    name: 'deer',
    description: '🦌 **Deer**\nSell this to get money!',
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 100,
    price: 0,
    keep: true,
    run: async (client, message, args) => {

    }
},
{
    name: 'bear',
    description: '🐻 **Bear**\nSell this to get money!',
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 120,
    price: 0,
    keep: true,
    run: async (client, message, args) => {

    }
},
{
    name: 'duck',
    description: '🦆 **Duck**\nSell this to get money!',
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 35,
    price: 0,
    keep: true,
    run: async (client, message, args) => {

    }
},
{
    name: 'pig',
    description: '🐷 **Pig**\nSell this to get money!',
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 75,
    price: 0,
    keep: true,
    run: async (client, message, args) => {

    }
},
{
    name: 'cow',
    description: '🐮 **Cow**\nSell this to get money!',
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 160,
    price: 0,
    keep: true,
    run: async (client, message, args) => {

    }
},
{
    name: 'fox',
    description: '🦊 **Fox**\nSell this to get money!',
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 100,
    price: 0,
    keep: true,
    run: async (client, message, args) => {

    }
},
{
    name: 'rabbit',
    description: '🐰 **Rabbit**\nSell this to get money!',
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 15,
    price: 0,
    keep: true,
    run: async (client, message, args) => {

    }
},
{
    name: 'chicken',
    description: '🐔 **Chicken**\nSell this to get money!',
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 35,
    price: 0,
    keep: true,
    run: async (client, message, args) => {

    }
},
{
    name: 'boar',
    description: '🐗 **Boar**\nSell this to get money!',
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 70,
    price: 0,
    keep: true,
    run: async (client, message, args) => {

    }
},
{
    name: 'worm',
    description: '🪱 **Worm**\nSell this to get money!',
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 300,
    price: 0,
    keep: true,
    run: async (client, message, args) => {

    }
},
{
    name: 'ant',
    description: '🐜 **Ant**\nSell this to get money!',
    canUse: false,  
    canBuy: false,
    displayOnShop: false,
    sellAmount: 250,
    price: 0,
    keep: true,
    run: async (client, message, args) => {

    }
},
{
    name: 'trash',
    description: '<:trash:848919922951061524> **Trash**\nSell this to get money!',
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 30,
    price: 0,
    keep: true,
    run: async (client, message, args) => {

    }
},
];

module.exports = array;