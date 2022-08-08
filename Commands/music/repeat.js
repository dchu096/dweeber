require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const config = require("@root/config.json");
const signale = require('signale');

module.exports = {
    name: "repeat",
    description: "Repeat your current song",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "method",
            description: "The method you want to repeat",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "Song",
                    value: "song"
                },
                {
                    name: "Queue",
                    value: "queue"
                },
                {
                    name: "off",
                    value: "off"
                }
            ]  
        },
    ],
	async run(client, interaction) {
		await interaction.deferReply();

        const Target = interaction.member;
        const { member, channel } = interaction;
        const VoiceChannel = interaction.member.voice.channel;

        const queue = client.distube.getQueue(VoiceChannel)

        const loopMethod = interaction.options.getString('method');

        if (!Target.voice.channel) { 
           const noVoice = new MessageEmbed()
              .setColor('#ff0000')
                .setTitle('Error')
                .setDescription('You are not in a voice channel!')
                .setFooter({ text: 'Dweeber >> play'});
            return interaction.followUp({embeds: [noVoice]});
        }

        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.followUp({ content: "You are not in my voice channel!", ephemeral: true });



        try {

            if (!queue.repeatMode === 0) return interaction.followUp({ content: "You are already repeating!", ephemeral: true });

            if (loopMethod === "song") {
                queue.repeatMode = 1;
                const repeatSong = new MessageEmbed()
                .setColor('#00ff00')
                .setTitle('Repeat Song')
                .setDescription(`Oki, I will repeat the current song!`)
                .setFooter({ text: 'Dweeber >> repeat'});
                return interaction.followUp({embeds: [repeatSong]});
            }

            if (loopMethod === "queue") {
                queue.repeatMode = 2;
                const repeatQueue = new MessageEmbed()
                .setColor('#00ff00')
                .setTitle('Repeat Queue')
                .setDescription(`Oki, I will repeat the current queue!`)
                .setFooter({ text: 'Dweeber >> repeat'});
                return interaction.followUp({embeds: [repeatQueue]});
            }

            if (loopMethod === "off") {
                queue.repeatMode = 0;
                const repeatOff = new MessageEmbed()
                .setColor('#00ff00')
                .setTitle('Repeat Off')
                .setDescription(`Oki, I will not repeat anything!`)
                .setFooter({ text: 'Dweeber >> repeat'});
                return interaction.followUp({embeds: [repeatOff]});
            }
        
        }   catch (err) {
            interaction.followUp(`There is an error. Please try again later.`);
            signale.error(err)

          } 


	
	}
};