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
		await interaction.deferReply();

        const Target = interaction.member;
        const { member, channel } = interaction;
        const VoiceChannel = interaction.member.voice.channel;


        const songinput = interaction.options.getString('song');

        if (!Target.voice.channel) { 
           const noVoice = new MessageEmbed()
              .setColor('#ff0000')
                .setTitle('Error')
                .setDescription('You are not in a voice channel!')
                .setFooter({ text: 'Dweeber >> play'});
            return interaction.followUp({embeds: [noVoice], ephemeral: true});
        }

        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.followUp({ content: "You are not in my voice channel!", ephemeral: true });



        try {

            
            const searchingEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Searching...')
            .setDescription(`<a:loading:986418430360047616> Searching for ${songinput}`)
            .setFooter({ text: 'Dweeber >> play'});

            interaction.followUp({embeds: [searchingEmbed], ephemeral: true});

            client.distube.play(VoiceChannel, songinput, { textChannel: channel, member: member})

        
        }   catch (err) {
            interaction.followUp(`There is an error. Please try again later.`);
            signale.error(err)

          } 


	
	}
};