const { client } = require("../index.js");
client.on('messageDelete', function (message, channel) {
 if (message.author.bot) return;
 if (message.channel.type === "dm") return;
 client.snipes.set(message.channel.id, {
  content: message.content,
  author: message.author.tag,
  image: message.attachments.first() ? message.attachments.first().proxyURL : null
 })
})