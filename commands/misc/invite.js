const { MessageEmbed } = require("discord.js");
const { attentionembed } = require("../../utils/embed");

module.exports.execute = async (client, message, args) => {
  const invite = new MessageEmbed()
    .setTitle(`My links!`)
    .setColor("#FFDF32")
    .setDescription(
      `**[Invite Link](https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot&permissions=0)\n[Support Server](YOUR_SUPPORT_SERVER_INVITE)**`
    );
  message.channel.send(invite);
};
module.exports.help = {
  name: "invite",
  aliases: [],
  category: "Miscellaneous",
  usage: "",
  description: "Gets my invite and support server link!",
};
