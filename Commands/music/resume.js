const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const signale = require('signale');

module.exports = {
    name: "resume",
    description: "Resume the music",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
	async run(client, interaction) {
		await interaction.deferReply();

        const VoiceChannel = interaction.member.voice.channel;

        try {

            const guild = interaction.guild
            const queue = client.distube.getQueue(VoiceChannel)

            if (!queue) return interaction.followUp({ content: "There is no music playing!", ephemeral: true });

            if (queue && !client.distube.isPlaying(VoiceChannel)) {
                await queue.resume(VoiceChannel)

            const resumeEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`Music is now resumed.`)
            .setFooter({ text: 'Dweeber >> resume'});

            interaction.followUp({embeds: [stopEmbed]});
            } else {
                interaction.followUp({ content: "There is no music playing!", ephemeral: true });
            }


            

            

        
        }   catch (err) {
                signale.error(err)
                interaction.followUp(`There is an error. Please try again later.`);
          } 


	
	}
};