const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class filtersCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'filters',
            group: 'music',
            memberName: 'filters',
            description: 'Show the filters applied to the current song',
            clientPermissions: [
                'VIEW_CHANNEL'
            ],
            userPermissions: [
                'VIEW_CHANNEL'
            ],

        });
    }


    async run(message) {
        
        const embedColor = '#87CEEB'; // color: skyblue
        
 const notinvcEmbed = new Discord.MessageEmbed()
	.setColor(embedColor)
	.setDescription(`${message.client.emotes.error} You are not in a VC!`)
        if (!message.member.voice.channel) return message.channel.send(notinvcEmbed);

     const botnotinvcEmbed = new Discord.MessageEmbed()
		.setColor(embedColor)
         .setDescription(`${message.client.emotes.error} Im not in a VC! please do \`2$join\` to call me in!`)

        if (!message.guild.me.voice.channel) return message.channel.send(botnotinvcEmbed)

        if (message.member.voice.channel !== message.guild.me.voice.channel) return

  const nosongEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
         .setDescription(`${message.client.emotes.error} There is no song that are playing!`)

        if (!message.client.player.getQueue(message)) return message.channel.send(nosongEmbed);

        const filtersStatuses = [[], []];

        message.client.filters.forEach((filterName) => {
            const array = filtersStatuses[0].length > filtersStatuses[1].length ? filtersStatuses[1] : filtersStatuses[0];
            array.push(filterName.charAt(0).toUpperCase() + filterName.slice(1) + " : " + (message.client.player.getQueue(message).filters[filterName] ? message.client.emotes.success : message.client.emotes.off));
        });

        message.channel.send({
            embed: {
                color: embedColor,
                footer: { text: 'Please report bugs to Support Server' },
                fields: [
                    { name: 'Filters', value: filtersStatuses[0].join('\n'), inline: true },
                    { name: '** **', value: filtersStatuses[1].join('\n'), inline: true },
                ],
                timestamp: new Date(),
                description: `List of all filters enabled or disabled.`,
            },
        });
    }
};