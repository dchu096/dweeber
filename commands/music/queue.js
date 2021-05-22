const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class queueCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'queue',
            group: 'music',
            memberName: 'queue',
            description: 'Show the current queue',
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
         .setDescription(`${message.client.emotes.error} Im not in a VC! please do \`dwbr join\` to call me in!`)

        if (!message.guild.me.voice.channel) return message.channel.send(botnotinvcEmbed)

        if (message.member.voice.channel !== message.guild.me.voice.channel) return
        
        const queue = message.client.player.getQueue(message);

         const nosongEmbed = new Discord.MessageEmbed()
        .setColor(embedColor)
         .setDescription(`${message.client.emotes.error} There is no song that are playing!`)

        message.channel.send(`**Server queue - ${message.guild.name} ${message.client.emotes.queue} ${message.client.player.getQueue(message).loopMode ? '(looped)' : ''}**\nCurrent : ${queue.playing.title} | ${queue.playing.author}\n\n` + (queue.tracks.map((track, i) => {
            return `**#${i + 1}** - ${track.title} | ${track.author} (requested by : ${track.requestedBy.username})`
        }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `And **${queue.tracks.length - 5}** other songs...` : `In the playlist **${queue.tracks.length}** song(s)...`}`));
    }
};