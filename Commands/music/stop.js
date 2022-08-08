const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const signale = require('signale');

module.exports = {
    name: "stop",
    description: "Stop the music",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
	async run(client, interaction) {
		await interaction.deferReply();

        const VoiceChannel = interaction.member.voice.channel;

        try {

            const guild = interaction.guild
            const queue = client.distube.getQueue(VoiceChannel)

            if (!queue) return interaction.followUp({ content: "There is no music playing!", ephemeral: true });

            if (!queue && !client.distube.isPlaying(VoiceChannel)) return interaction.followUp({ content: "There is no music playing!", ephemeral: true });


            await queue.stop(VoiceChannel)

            const stopEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`Music is now stopped.`)
            .setFooter({ text: 'Dweeber >> stop'});

            interaction.followUp({embeds: [stopEmbed]});
        
        
        }   catch (err) {
                signale.error(err)
                interaction.followUp(`There is an error. Please try again later.`);
          } 


	
	}
};