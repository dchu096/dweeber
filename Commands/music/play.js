require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const config = require("@root/config.json");
const signale = require('signale');

module.exports = {
    name: "play",
    description: "Play a song from YT",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "song",
            description: "The song you want to play",
            type: 'STRING',
            required: true,
        },
    ],
	async run(client, interaction) {
		await interaction.deferReply({ ephemeral: true });

        const Target = interaction.member;
        const { member, channel } = interaction;
        const VoiceChannel = interaction.member.voice.channel;
        const songinput = interaction.options.getString('song');

        const noVoice = new MessageEmbed()
              .setColor('#ff0000')
                .setTitle('<a:crossmark:1011568778942885909> Error')
                .setDescription('Ya need to be in a voice channel so i can play music for you!')
                .setFooter({ text: 'Dweeber >> play'});

        const differentVoice = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('<a:crossmark:1011568778942885909> Error')
                .setDescription('Ya need to be in the same voice channel as me so i can play music for you!')
                .setFooter({ text: 'Dweeber >> play'});

        if (!Target.voice.channel) { 
           
            return interaction.followUp({embeds: [noVoice]});
        }

        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.followUp({embeds: [differentVoice]});



        try {

            
            const searchingEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('<a:searching:1011889118780870697> Searching...')
            .setDescription(`Hold on! Im looking up \`${songinput}\` for ya!!`)
            .setFooter({ text: 'Dweeber >> play'});

            interaction.followUp({embeds: [searchingEmbed]});

            client.distube.play(VoiceChannel, songinput, { textChannel: channel, member: member})

        
        }   catch (err) {
            interaction.followUp(`There is an error. Please try again later.`);
            signale.error(err)

          } 


	
	}
};