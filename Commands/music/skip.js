const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const signale = require('signale');

module.exports = {
    name: "skip",
    description: "Skip the current song",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
	async run(client, interaction) {
		await interaction.deferReply();

        const VoiceChannel = interaction.member.voice.channel;

        try {

            const guild = interaction.guild
            const queue = client.distube.getQueue(VoiceChannel)

            if (!queue) return interaction.followUp({ content: "There is no music playing!", ephemeral: true });

            if (!queue && !client.distube.isPlaying(VoiceChannel)) return interaction.followUp({ content: "There is no music playing!", ephemeral: true });

            if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.followUp({ content: "You are not in my voice channel!", ephemeral: true });


            await queue.skip(VoiceChannel)

            const stopEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`The music is now skipped.`)
            .setFooter({ text: 'Dweeber >> skip'});

            interaction.followUp({embeds: [stopEmbed]});
        
        
        }   catch (err) {
                signale.error(err)
                interaction.followUp(`There is an error. Please try again later.`);
          } 


	
	}
};