const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class playCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'play',
            aliases: ['p', 'playsong'],
            group: 'music',
            memberName: 'play',
            description: 'Play a music from YT!',
            clientPermissions: [
                'VIEW_CHANNEL'
            ],
            userPermissions: [
                'VIEW_CHANNEL'
            ],

            args: [
                {
                    key: 'psong',
                    prompt:
                        'What song would you like to play?',
                    type: 'string'
                },


            ],


            guildOnly: true,

        });
    }


    async run(message,  {psong}) {
        
        const embedColor = '#87CEEB'; // color: skyblue

        const notinvcEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setDescription(`${message.client.emotes.error} You are not in a VC!`)

        if (!message.member.voice.channel) return message.channel.send(notinvcEmbed).catch();
        
        const botnotinvcEmbed = new Discord.MessageEmbed()
		.setColor(embedColor)
         .setDescription(`${message.client.emotes.error} Im not in a VC! please do \`dwbr join\` to call me in!`)

        if (!message.guild.me.voice.channel) return message.channel.send(botnotinvcEmbed).catch();

        if (message.member.voice.channel !== message.guild.me.voice.channel) return
        
            
        const receivedEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setDescription(`${message.client.emotes.success} Your search result of \`${psong}\` has been received and will be playing soon.`)

        message.client.player.play(message, psong, { firstResult: true }).then(message.channel.send(receivedEmbed)).catch();

        
       



        setTimeout(function(){
            
             const queue = message.client.player.getQueue(message);

            const queuedEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setDescription(`current song: ${queue.playing.title}`)

 message.channel.send(queuedEmbed).catch();

        }, 5000);

        
    }



};