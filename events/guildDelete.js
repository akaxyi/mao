const { client } = require('../index')
const { MessageEmbed } = require('discord.js');
client.on("guildDelete", guild => {

 const ID = "824354433923809320";

 const channel = client.channels.cache.get(ID);

 const sowner = guild.owner.user;

 if (!channel) return;

 const embed = new MessageEmbed()

  .setTitle("**I Left a Server!**")

  .addField(`**SERVER NAME**`, `\`\`\`${guild.name}\`\`\``)

  .addField(`**SERVER ID**`, `\`\`\`${guild.id}\`\`\``)

  .addField(`**SERVER OWNER**`, `\`\`\`${sowner.tag}\`\`\``)

  .addField(`**OWNER ID**`, `\`\`\`${sowner.id}\`\`\``)

  .addField(`**CREATED ON**`, `\`\`\`${guild.createdAt}\`\`\``)

  .addField(`**MEMBERS**`, `\`\`\`${guild.memberCount}\`\`\``)

  .setTimestamp()

  .setColor("#FFDF32")

  .setFooter(`Servers Count - ${client.guilds.cache.size}`);

 channel.send(embed);

});