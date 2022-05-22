const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const fetch = require('node-fetch');

module.exports.execute = async (client, message, args) => {
  let countries = args.join(" ");



  if (!args[0]) return attentionembed(message, `Please do \`${client.prefix}covid all | ${client.prefix}covid USA\``);

  if (args[0] === "all") {
    fetch(`https://covid19.mathdro.id/api`)
      .then(response => response.json())
      .then(data => {
        let confirmed = data.confirmed.value.toLocaleString()
        let recovered = data.recovered.value.toLocaleString()
        let deaths = data.deaths.value.toLocaleString()

        const embed = new MessageEmbed()
          .setTitle(`Worldwide COVID-19 Stats!`)
          .addField('Confirmed Cases', confirmed)
          .addField('Recovered', recovered)
          .setColor('#FFDF32')
          .addField('Deaths', deaths)

        message.channel.send(embed)
      })
  } else {
    fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
      .then(response => response.json())
      .then(data => {
        let confirmed = data.confirmed.value.toLocaleString()
        let recovered = data.recovered.value.toLocaleString()
        let deaths = data.deaths.value.toLocaleString()

        const embed = new MessageEmbed()
          .setTitle(`COVID-19 Stats for **${countries}**`)
          .addField('Confirmed Cases', confirmed)
          .addField('Recovered', recovered)
          .setColor('#FFDF32')
          .addField('Deaths', deaths)

        message.channel.send(embed)
      }).catch(e => {
        return attentionembed(message, 'Invalid country provided')
      })
  }


}
module.exports.help = {
  name: 'covid',
  aliases: [],
  category: 'Utility',
  usage: '<countryName> or covid all',
  description: 'Gets all or a certain country\'s covid cases!'
}
