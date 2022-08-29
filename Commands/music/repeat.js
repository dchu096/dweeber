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

        const noVoice = new MessageEmbed()
        .setColor('#ff0000')
          .setTitle('<a:crossmark:1011568778942885909> Error')
          .setDescription('Ya need to be in a voice channel so i can play music for you!')
          .setFooter({ text: 'Dweeber >> repeat'});

        const differentVoice = new MessageEmbed()
          .setColor('#ff0000')
          .setTitle('<a:crossmark:1011568778942885909> Error')
          .setDescription('Ya need to be in the same voice channel as me so i can play music for you!')
          .setFooter({ text: 'Dweeber >> repeat'});

        const noqueue = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('<a:crossmark:1011568778942885909> Error')
            .setDescription('There is no music on right now! Please run \`/play\` to play some music!')
            .setFooter({ text: 'Dweeber >> repeat'});

        const alreadyrepeating = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('<a:crossmark:1011568778942885909> Error')
            .setDescription('I am already repeating the current song!')
            .setFooter({ text: 'Dweeber >> repeat'});

        

            if (!Target.voice.channel) { 
                return interaction.followUp({embeds: [noVoice]});
            }

            if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.followUp({embeds: [differentVoice]});

            if (!queue) return interaction.followUp({embeds: [noqueue]});

            if (!queue && !client.distube.isPlaying(VoiceChannel)) return interaction.followUp({embeds: [noqueue]});



        try {

            if (!queue.repeatMode === 0) return interaction.followUp({embeds: [alreadyrepeating]});

            if (loopMethod === "song") {
                queue.repeatMode = 1;
                const repeatSong = new MessageEmbed()
                .setColor('#00ff00')
                .setTitle('Repeat Song')
                .setDescription(`Oki, I will repeat the current song for ya!`)
                .setFooter({ text: 'Dweeber >> repeat'});
                return interaction.followUp({embeds: [repeatSong]});
            }

            if (loopMethod === "queue") {
                queue.repeatMode = 2;
                const repeatQueue = new MessageEmbed()
                .setColor('#00ff00')
                .setTitle('Repeat Queue')
                .setDescription(`Oki, I will repeat the current queue for ya!`)
                .setFooter({ text: 'Dweeber >> repeat'});
                return interaction.followUp({embeds: [repeatQueue]});
            }

            if (loopMethod === "off") {
                queue.repeatMode = 0;
                const repeatOff = new MessageEmbed()
                .setColor('#00ff00')
                .setTitle('Repeat Off')
                .setDescription(`Oki, I will stop repeating!`)
                .setFooter({ text: 'Dweeber >> repeat'});
                return interaction.followUp({embeds: [repeatOff]});
            }
        
        }   catch (err) {
            interaction.followUp(`There is an error. Please try again later.`);
            signale.error(err)

          } 


	
	}
};