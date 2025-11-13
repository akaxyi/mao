const { client, config } = require("../index.js");

client.on("ready", () => {
  console.log(
    `I, ${client.user.tag}, am at your service. Run ${config.prefix}help to view a list of commands!`
  );

  client.user
    .setActivity(`${client.prefix}help`, { type: "PLAYING" })
    .catch(console.error);
});

client.on(`ready`, () => {
  setInterval(() => {
    let member;
    client.guilds.cache.forEach(async (guild) => {
      member = await client.guilds.cache
        .get(guild.id)
        .members.cache.get(client.user.id);
      if (!member.voice.channel) return;
      //if connected but not speaking
      if (!member.speaking && !client.queue) {
        return member.voice.channel.leave();
      }
      //if alone
      if (member.voice.channel.members.size === 1) {
        return member.voice.channel.leave();
      }
    });
  }, 5000);
});
