const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const signale = require('signale');

module.exports = {
    name: "volume",
    description: "Set the volume of the music",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "volume",
            description: "Set the volume of the music",
            type: 'INTEGER',
            required: true,
        },
    ],
	async run(client, interaction) {
		await interaction.deferReply();

        const volumeinput = interaction.options.getInteger('volume');

        const VoiceChannel = interaction.member.voice.channel;
        const guild = interaction.guild
        const queue = client.distube.getQueue(VoiceChannel)
        const Target = interaction.member;

        const noVoice = new MessageEmbed()
        .setColor('#ff0000')
          .setTitle('<a:crossmark:1011568778942885909> Error')
          .setDescription('Ya need to be in a voice channel so i can play music for you!')
          .setFooter({ text: 'Dweeber >> volume'});

        const differentVoice = new MessageEmbed()
          .setColor('#ff0000')
          .setTitle('<a:crossmark:1011568778942885909> Error')
          .setDescription('Ya need to be in the same voice channel as me so i can play music for you!')
          .setFooter({ text: 'Dweeber >> volume'});

        const noqueue = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('<a:crossmark:1011568778942885909> Error')
            .setDescription('There is no music on right now! Please run \`/play\` to play some music!')
            .setFooter({ text: 'Dweeber >> volume'});

        const invalidVolume = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('<a:crossmark:1011568778942885909> Error')
            .setDescription('The volume must be between 0 and 100!')
            .setFooter({ text: 'Dweeber >> volume'});


            if (!Target.voice.channel) { 
                return interaction.followUp({embeds: [noVoice]});
            }

            if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.followUp({embeds: [differentVoice]});

        try {


            if (!queue) return interaction.followUp({embeds: [noqueue]});

            if (!queue && !client.distube.isPlaying(VoiceChannel)) return interaction.followUp({embeds: [noqueue]});


            if (isNaN(volumeinput)) {
                return interaction.followUp({embeds: [invalidVolume]});
            }

            if (Number(volumeinput) < 1) return interaction.followUp({embeds: [invalidVolume]});

            if (Number(volumeinput) > 100) return interaction.followUp({embeds: [invalidVolume]});

            client.distube.setVolume(VoiceChannel, volumeinput);

            const stopEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`Music is now at ${volumeinput}% volume.`)
            .setFooter({ text: 'Dweeber >> volume'});

            interaction.followUp({embeds: [stopEmbed]});
        
        
        }   catch (err) {
                signale.error(err)
                interaction.followUp(`There is an error. Please try again later.`);
          } 


	
	}
};