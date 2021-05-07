const Commando = require('discord.js-commando');
const Discord = require("discord.js");

module.exports = class filterCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'filter',
            group: 'music',
            memberName: 'filter',
            description: 'Put a filter to the current music',
            clientPermissions: [
                'VIEW_CHANNEL'
            ],
            userPermissions: [
                'VIEW_CHANNEL'
            ],

            args: [
                {
                    key: 'sfilter',
                    prompt:
                        'Which filter would you like to use? Please do \`2$filters-all\` to see available filters',
                    type: 'string',
                    oneOf: ['8D', 'gate', 'haas', 'phaser', 'treble', 'tremolo', 'vibrato', 'reverse', 'karaoke', 'flanger', 'mcompand', 'pulsator', 'subboost', 'bassboost', 'vaporwave', 'nightcore', 'normalizer', 'surrounding'],
                },


            ],

            guildOnly: true,

        });
    }

    async run(message, {sfilter}) {
        
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

        const filterToUpdate = message.client.filters.find((x) => x.toLowerCase() === sfilter.toLowerCase());

        const filtersUpdated = {};

        filtersUpdated[filterToUpdate] = message.client.player.getQueue(message).filters[filterToUpdate] ? false : true;

        message.client.player.setFilters(message, filtersUpdated);

        if (filtersUpdated[filterToUpdate]) message.channel.send(`Please wait, adding filters to music...`);
        else message.channel.send(`Please wait, removing filter on music...`);
    }
};