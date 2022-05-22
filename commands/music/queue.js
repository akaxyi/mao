const { MessageEmbed, splitMessage } = require("discord.js");
const { attentionembed } = require('../../utils/embed');

module.exports.execute = async (client, message, args) => {

	const queue = message.client.queue.get(message.guild.id);
	//if no queue aka nothing playing error
	if (!queue) return attentionembed(message, "There is nothing playing in the server!").catch(console.error);
	let description = "";
	for (let i = 0; i < queue.songs.length; i++) {
		description += `**${i}.** [${queue.songs[i].title.substring(0, 40)}](${queue.songs[i].url}) | \`${queue.songs[i].duration}\`\n`
	}
	//define queueembed
	let queueEmbed = new MessageEmbed()
		.setTitle("Server Music Queue")
		.setDescription(description)
		.setFooter(`Add songs to the queue by doing \`${client.prefix}play <SongName>\``)
		.setColor("#FFDF32");
	//split the description
	const splitDescription = splitMessage(description, {
		maxLength: 2048,
		char: "\n",
		prepend: "",
		append: ""
	});
	//For every description send a new embed
	splitDescription.forEach(async (m) => {
		//(over)write embed description
		queueEmbed.setDescription(m);
		//send embed
		message.channel.send(queueEmbed);
	});

}
module.exports.help = {
	name: 'queue',
	aliases: [],
	category: 'Music',
	usage: '',
	description: 'Gets the server queue!'
}
