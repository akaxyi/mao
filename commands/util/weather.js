const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const weather = require("weather-js");

module.exports.execute = async (client, message, args) => {

    weather.find({ search: args.join(" "), degreeType: "C" }, function (err, result) {
        if (!args.length) {
            return attentionembed(message, `Please do \`-weather <location>\``)
        }

        if (err) return attentionembed(message, `An error occurred:\n\```${err.message}\````);

        try {
        } catch (error) {
            if (error.message === "Cannot read property 'current' of undefined") return attentionembed(message, `Invalid location provided!`);
            if (error.message === "ESOCKETTIMEDOUT") return attentionembed(message, "Request timed out. Please try again.");
            console.log(error.message);
            return attentionembed(message, `An error occurred:\n\```${error.message}\````);
        }

        //const location = result[0].location; 
        let current = result[0].current;
        const ct = current.temperature;

        let col;

        if (ct <= 0) col = 13431807;
        else if (ct < 0 && ct >= 5) col = 12579071;
        else if (ct >= 6 && ct <= 10) col = 11861906;
        else if (ct >= 11 && ct <= 15) col = 9238900;
        else if (ct >= 16 && ct <= 20) col = 15531898;
        else if (ct >= 21 && ct <= 25) col = 16763258;
        else if (ct >= 26 && ct <= 30) col = 16739910;
        else if (ct >= 31 && ct <= 35) col = 16730914;
        else if (ct >= 36 && ct <= 40) col = 16727074;
        else if (ct >= 40) col = 12386304;
        else col = '#FFDF32'; // fallback

        const embed = new MessageEmbed()
            .setColor(col)
            .setTitle(`**Weather information for ${current.observationpoint}**`)
            .setDescription(`The weather is **${current.skytext.toLowerCase()}** at the moment.`)
            .addField('Temperature:', `**${ct}°C** / ${((1.8 * ct) + 32).toFixed(0)}°F`)
            .addField('Feels like:', `**${current.feelslike}°C** / ${((1.8 * current.feelslike) + 32).toFixed(0)}°F`)
            .addField('Humidity:', `**${current.humidity}%**`)
            .addField('Wind:', `**${current.winddisplay.toLowerCase()}** / ~${(current.winddisplay.toLowerCase().replace(/[^0-9]/g, "") * 0.621).toFixed(1)} mph`)
            .setThumbnail(current.imageUrl)
            .setFooter(`Correct as of ${current.observationtime.slice(0, -3)} local time`)
            .setTimestamp();
        message.channel.send({ embed });
    });

}
module.exports.help = {
    name: 'weather',
    aliases: [],
    category: 'Utility',
    usage: '<location>',
    description: 'Sees the weather of a country!'
}
