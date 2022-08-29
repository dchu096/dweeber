const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const signale = require('signale');

module.exports = {
    name: "queue",
    description: "Show the current queue",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
	async run(client, interaction) {
		await interaction.deferReply({ ephemeral: true });

        const VoiceChannel = interaction.member.voice.channel;
        const guild = interaction.guild
        const queue = client.distube.getQueue(VoiceChannel)

        try {

            const noVoice = new MessageEmbed()
            .setColor('#ff0000')
              .setTitle('<a:crossmark:1011568778942885909> Error')
              .setDescription('Ya need to be in a voice channel so i can play music for you!')
              .setFooter({ text: 'Dweeber >> queue'});

            const differentVoice = new MessageEmbed()
              .setColor('#ff0000')
              .setTitle('<a:crossmark:1011568778942885909> Error')
              .setDescription('Ya need to be in the same voice channel as me so i can play music for you!')
              .setFooter({ text: 'Dweeber >> queue'});

            const noqueue = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('<a:crossmark:1011568778942885909> Error')
                .setDescription('There is no music on right now! Please run \`/play\` to play some music!')
                .setFooter({ text: 'Dweeber >> queue'});



            if (!VoiceChannel) { 
                 return interaction.followUp({embeds: [noVoice]});
             }

             if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.followUp({embeds: [differentVoice]});


            if (!queue) return interaction.followUp({embeds: [noqueue]});

            if (!queue && !client.distube.isPlaying(VoiceChannel)) return interaction.followUp({embeds: [noqueue]});


            const stopEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`<:D_headphones:1011903101235630080> Queue`)
            .setDescription(`Current queue:\n${queue.songs
                .map(
                    (song, id) =>
                        `**${id ? id : 'Playing'}**. ${
                            song.name
                        } - \`${song.formattedDuration}\``,
                )
                .slice(0, 10)
                .join('\n')}`)
            .setFooter({ text: 'Dweeber >> queue'});

            interaction.followUp({embeds: [stopEmbed]});
        
        
        }   catch (err) {
                signale.error(err)
                interaction.followUp(`There is an error. Please try again later.`);
          } 


	
	}
};