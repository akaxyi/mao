const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

 if (message.author.id !== "547181832895070209") {
  attentionembed(message, "Owner Only!");
  return;
 }
 try {
  let codein = args.join(" ");
  let code = eval(codein);

  if (typeof code !== 'string')
   code = require('util').inspect(code, { depth: 0 });
  let embed = new MessageEmbed()
   .setAuthor('Eval Command')
   .setColor('GREEN')
   .addField(':inbox_tray: Input', `\`\`\`js\n${codein}\`\`\``)
   .addField(':outbox_tray: Output', `\`\`\`js\n${code}\n\`\`\``)
  message.lineReply(embed)
 } catch (e) {
  attentionembed(message, `\n${e}\n`);
 }

}
module.exports.help = {
 name: 'eval',
 aliases: [],
 category: 'Owner',
 usage: '<code>',
 description: 'Executes code from this command!'
}
