const { MessageEmbed } = require('discord.js');
const { Database } = require('quickmongo');
const quickmongo = new Database("mongodb+srv://ghosty:YwWdYLDQNWdXi12L@mao.iuwpxdz.mongodb.net/")
const { attentionembed } = require('../../utils/embed');
const config = require('../../config.json')

module.exports.execute = async (client, message, args) => {

    if (!message.member.hasPermission("MANAGE_GUILD")) {
        return attentionembed(message, "You are missing permissions, you need `MANAGE_GUILD`")
    } else {

        const choice = args[0];
        const noChoice = new MessageEmbed()
            .setColor('#FF0000')
            .setAuthor('No choice selected!', message.guild.iconURL())
            .setDescription('Please select a section you want to customise!')
            .addField('Usage:', `${config.prefix}setup <section> <query>`)
            .addField('\u200B', 'Levelling System!')
            .addField('🌟 Levels', 'Section Name: **levels**')
            .addField('🌟 Level Up Channel', 'Section Name: **levelsup**')
            .setFooter(`${client.prefix}setup config to see whats enabled!`)
        if (!choice) return message.lineReply(noChoice)


        const levelsCheck = await quickmongo.fetch(`levels-${message.guild.id}`);
        let levelsStatus;

        if (levelsCheck === true) {
            levelsStatus = '<a:tick:828290595180249098> **|** `ON`'
        } else levelsStatus = '<a:No:830530976631095326> **|** `OFF`';


        const getlevelsUpChannel = await quickmongo.get(`levelsup-${message.guild.id}`)
        const levelsUpChannelCheck = await quickmongo.fetch(`levelsup-${message.guild.id}`);
        let levelsUpChannelStatus;

        if (levelsUpChannelCheck) {
            levelsUpChannelStatus = `<#${getlevelsUpChannel}>`
        } else levelsUpChannelStatus = `No channel has been set!`









        if (choice === 'levels') {
            const query = args[1]

            if (!query) return attentionembed(message, 'Please pick `enable` or `disable`!')

            if (query === 'enable') {
                if ((await quickmongo.fetch(`levels-${message.guild.id}`)) === null) {
                    await quickmongo.set(`levels-${message.guild.id}`, true)
                    let r = new MessageEmbed()
                        .setDescription(`<a:tick:828290595180249098> My levelling system is now enabled!`)
                        .setColor("GREEN")
                    message.lineReply(r)
                } else if ((await quickmongo.fetch(`levels-${message.guild.id}`)) === false) {
                    await quickmongo.set(`levels-${message.guild.id}`, true)
                    let e = new MessageEmbed()
                        .setDescription(`<a:tick:828290595180249098> My levelling system is now enabled!`)
                        .setColor("GREEN")
                    message.lineReply(e)
                } else {
                    return attentionembed(message, "My levelling system has already been enabled!")
                }
            }

            if (query === 'disable') {
                if (await quickmongo.fetch(`levels-${message.guild.id}`) === true) {
                    await quickmongo.delete(`levels-${message.guild.id}`)
                    let resultsEmbed = new MessageEmbed()
                        .setDescription(`<a:tick:828290595180249098> My levelling system is now disabled!`)
                        .setColor("GREEN")
                    message.lineReply(resultsEmbed)
                } else {
                    return attentionembed(message, "My levelling system has already been disabled!")
                }
            }
        }

        if (choice === 'levelsup') {
            const levelsUpChannel = message.mentions.channels.first()

            if (!levelsUpChannel) return attentionembed(message, `Mention a channel or \`${client.prefix}setup levelsup reset\``)

            await quickmongo.set(`levelsup-${message.guild.id}`, levelsUpChannel.id);

            let s = new MessageEmbed()
                .setDescription(`<a:tick:828290595180249098> My levelling channel has been set to ${levelsUpChannel}!`)
                .setColor("GREEN")
            message.lineReply(s)
        }






        if (choice === 'config') {
            const configuration = new MessageEmbed()
                .setAuthor(`${message.guild.name}'s Configuration!`, message.guild.iconURL())
                .addField('Usage:', `${config.prefix}setup <section> <query>`)
                .setColor('#FFDF32')
                .addField('\u200B', 'Levelling System!')
                .addField('🌟 levels', `${levelsStatus}`)
                .addField('🌟 levelsup', `${levelsUpChannelStatus}`)
            return message.channel.send(configuration)
        }
    }
}
module.exports.help = {
    name: 'setup',
    aliases: [],
    category: 'Server Config',
    usage: 'or setup config',
    description: 'This is to show what is enabled/disabled!'
}
