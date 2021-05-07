const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class nowplayingCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'nowplaying',
            aliases: ['np'],
            group: 'music',
            memberName: 'nowplaying',
            description: 'Shows the current playing music!',
            clientPermissions: [
                'VIEW_CHANNEL'
            ],
            userPermissions: [
                'VIEW_CHANNEL'
            ],

            guildOnly: true,

        });
    }


    async run(message) {
          const notinvcEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setDescription(`You are not in a VC!`)
        if (!message.member.voice.channel) return message.channel.send(notinvcEmbed);

 const botnotinvcEmbed = new Discord.MessageEmbed()
		.setColor('#0099ff')
         .setDescription(`Im not in a VC! please do \`2$join\` to call me in!`)

        if (!message.guild.me.voice.channel) return message.channel.send(botnotinvcEmbed)

        if (message.member.voice.channel !== message.guild.me.voice.channel) return

 const nosongEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
         .setDescription(`there is no song that are playing!`)

        if (!message.client.player.getQueue(message)) return message.channel.send(nosongEmbed);

        const track = message.client.player.nowPlaying(message);
        const filters = [];

        Object.keys(message.client.player.getQueue(message).filters).forEach((filterName) => message.client.player.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;

        message.channel.send({
            embed: {
                color: 'RED',
                author: { name: track.title },
                footer: { text: 'Please report bug to Support Server' },
                fields: [
                    { name: 'Channel', value: track.author, inline: true },
                    { name: 'Requested by', value: track.requestedBy.username, inline: true },
                    { name: 'From playlist', value: track.fromPlaylist ? 'Yes' : 'No', inline: true },

                    { name: 'Views', value: track.views, inline: true },
                    { name: 'Duration', value: track.duration, inline: true },
                    { name: 'Filters activated', value: filters.length + '/' + message.client.filters.length, inline: true },

                    { name: 'Volume', value: message.client.player.getQueue(message).volume, inline: true },
                    { name: 'Repeat mode', value: message.client.player.getQueue(message).repeatMode ? 'Yes' : 'No', inline: true },
                    { name: 'Currently paused', value: message.client.player.getQueue(message).paused ? 'Yes' : 'No', inline: true },

                    { name: 'Progress bar', value: message.client.player.createProgressBar(message, { timecodes: true }), inline: true }
                ],
                thumbnail: { url: track.thumbnail },
                timestamp: new Date(),
            },
        });
    }
};