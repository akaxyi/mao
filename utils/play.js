////////////////////////////
//////CONFIG LOAD///////////
////////////////////////////
const ytdl = require("discord-ytdl-core");
const { MessageEmbed } = require("discord.js");
const { attentionembed } = require("./embed");
let collector;
////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = {
    async play(song, message, client, filters) {
        const queue = message.client.queue.get(message.guild.id);

        if (!song) {
            queue.channel.leave();
            message.client.queue.delete(message.guild.id);
            const endembed = new MessageEmbed().setColor("#FFDF32")
                .setAuthor(`Music Queue has ended.`, "https://imgur.com/DsjVWqG.gif")
            return queue.textChannel.send(endembed).catch(console.error);
        }

        let stream = null;
        let streamType = song.url.includes("youtube.com") ? "opus" : "ogg/opus";
        let isnotayoutube = false;
        let seekTime = 0;
        let oldSeekTime = queue.realseek;
        let encoderArgstoset;
        if (filters === "remove") {
            queue.filters = ['-af', 'dynaudnorm=f=200'];
            encoderArgstoset = queue.filters;
            try {
                seekTime = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000 + oldSeekTime;
            } catch {
                seekTime = 0;
            }
            queue.realseek = seekTime;
        } else if (filters) {
            try {
                seekTime = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000 + oldSeekTime;
            } catch {
                seekTime = 0;
            }
            queue.realseek = seekTime;
            queue.filters.push(filters)
            encoderArgstoset = ['-af', queue.filters]
        }


        try {
            if (song.url.includes("youtube.com")) {
                stream = ytdl(song.url, {
                    filter: "audioonly",
                    opusEncoded: true,
                    encoderArgs: encoderArgstoset,
                    bitrate: 320,
                    seek: seekTime,
                    quality: "highestaudio",
                    liveBuffer: 40000,
                    highWaterMark: 1 << 25,

                });
            } else if (song.url.includes(".mp3") || song.url.includes("baseradiode")) {
                stream = song.url;
                isnotayoutube = true;
            }
        } catch (error) {
            if (queue) {
                queue.songs.shift();
                module.exports.play(queue.songs[0], message);
            }

            console.error(error);
            return attentionembed(message, `Error: ${error.message ? error.message : error}`);
        }

        queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));

        if (isnotayoutube) {
            console.log("TEST")
            const dispatcher = queue.connection
                .play(stream)
                .on("finish", () => {
                    if (collector && !collector.ended) collector.stop();

                    if (queue.loop) {
                        let lastSong = queue.songs.shift();
                        queue.songs.push(lastSong);
                        module.exports.play(queue.songs[0], message);
                    } else {
                        queue.songs.shift();
                        module.exports.play(queue.songs[0], message);
                    }
                })
                .on("error", (err) => {
                    console.error(err);
                    queue.songs.shift();
                    module.exports.play(queue.songs[0], message);
                });
            dispatcher.setVolumeLogarithmic(queue.volume / 100);
        } else {
            const dispatcher = queue.connection
                .play(stream, { type: streamType })
                .on("finish", () => {
                    if (collector && !collector.ended) collector.stop();

                    if (queue.loop) {
                        let lastSong = queue.songs.shift();
                        queue.songs.push(lastSong);
                        module.exports.play(queue.songs[0], message);
                    } else {
                        queue.songs.shift();
                        module.exports.play(queue.songs[0], message);
                    }
                })
                .on("error", (err) => {
                    console.error(err);
                    queue.songs.shift();
                    module.exports.play(queue.songs[0], message);
                });
            dispatcher.setVolumeLogarithmic(queue.volume / 100);
        }
        let thumb;
        if (song.thumbnail === undefined) thumb = "https://imgur.com/DsjVWqG.gif";
        else thumb = song.thumbnail.url;

        try {
            const newsong = new MessageEmbed()
                .setTitle("Now playing " + song.title)
                .setURL(song.url)
                .setColor("#FFDF32")
                .setThumbnail(thumb)
                .setFooter(`Song requested by: ${message.author.tag}`, message.member.user.displayAvatarURL({ dynamic: true }))
                .addField("Song duration:", `\`${song.duration} Minutes\``, true)

            var playingMessage = await queue.textChannel.send(newsong);
        } catch (error) {
            console.error(error);
        }
    }
};