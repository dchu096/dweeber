const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const signale = require('signale');

module.exports = {
    name: "pause",
    description: "Pause the music",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
	async run(client, interaction) {
		await interaction.deferReply();

        const VoiceChannel = interaction.member.voice.channel;
        const Target = interaction.member;
        const guild = interaction.guild
        const queue = client.distube.getQueue(VoiceChannel)

        const noVoice = new MessageEmbed()
        .setColor('#ff0000')
          .setTitle('<a:crossmark:1011568778942885909> Error')
          .setDescription('Ya need to be in a voice channel so i can play music for you!')
          .setFooter({ text: 'Dweeber >> resume'});

        const differentVoice = new MessageEmbed()
          .setColor('#ff0000')
          .setTitle('<a:crossmark:1011568778942885909> Error')
          .setDescription('Ya need to be in the same voice channel as me so i can play music for you!')
          .setFooter({ text: 'Dweeber >> resume'});

        const noqueue = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('<a:crossmark:1011568778942885909> Error')
            .setDescription('There is no music on right now! Please run \`/play\` to play some music!')
            .setFooter({ text: 'Dweeber >> resume'});

            if (!Target.voice.channel) { 
                return interaction.followUp({embeds: [noVoice]});
            }

            if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.followUp({embeds: [differentVoice]});

           




        try {

            if (!queue) return interaction.followUp({embeds: [noqueue]});

            if (queue && client.distube.isPlaying(VoiceChannel)) {
                await queue.pause(VoiceChannel)

            const resumeEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`<a:tick:991178421113733130>  Paused`)
            .setDescription(`Resumed the music!`)
            .setFooter({ text: 'Dweeber >> resume'});

            interaction.followUp({embeds: [resumeEmbed]});
            } else {
                interaction.followUp({ content: "There is no music playing!", ephemeral: true });
            }


            

            

        
        }   catch (err) {
                signale.error(err)
                interaction.followUp(`There is an error. Please try again later.`);
          } 


	
	}
};