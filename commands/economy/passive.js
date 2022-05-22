const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const tick = '<a:tick:828290595180249098>'

module.exports.execute = async (client, message, args) => {

    const userData = await client.fetchUser(message.author.id);
    const enable = ['on', 'enable'];
    const disable = ['off', 'disable'];
    if (!args[0]) {
        let status = userData.passive
        if (status == false) status = `\`DISABLED\``
        else status = `\`ENABLED\``

        let passive1embed = new MessageEmbed()
            .setColor("#FFDF32")
            .setDescription(`**${message.author}**! Your passive mode is ${status}`);

        return message.channel.send(passive1embed).catch();
        //return message.channel.send(`Your passive mode is ${status}`);
    }
    if (enable.includes(args[0].toString().toLowerCase())) {

        if (userData.passive == true) return attentionembed(message, `Your passive mode has already been enabled!`).catch();
        //if (userData.passive == true) return message.reply(`You're already in passive mode`)

        userData.passive = true;
        await userData.save();

        let passive3embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`${tick} Your passive mode is now enabled!`);

        message.lineReply(passive3embed).catch();
        //message.reply(`I have enabled your passive mode`);
    } else if (disable.includes(args[0].toString().toLowerCase())) {

        if (userData.passive == false) return attentionembed(message, `Your passive mode has already been disabled!`).catch();
        //if (userData.passive == false) return message.reply(`You're not passive mode`);
        userData.passive = false;
        await userData.save();
        let passive5embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`${tick} Your passive mode is now disabled!`);

        message.lineReply(passive5embed).catch();
        //message.reply(`I have disabled your passive mode`);
    } else {
        return attentionembed(message, `Please pick \`enable\` or \`disable\`!`).catch();

        //message.reply(`Dude that's not a valid option`);

    }

}
module.exports.help = {
    name: 'passive',
    aliases: [],
    category: 'Economy',
    usage: 'on or passive off',
    description: 'You turn on or turn off passive mode!'
}
