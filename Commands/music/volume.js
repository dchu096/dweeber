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
            required: false,
        },
    ],
	async run(client, interaction) {
		await interaction.deferReply();

        const VoiceChannel = interaction.member.voice.channel;

        const volumeinput = interaction.options.getInteger('volume');

        try {

            const guild = interaction.guild
            const queue = client.distube.getQueue(VoiceChannel)

            if (!queue) return interaction.followUp({ content: "There is no music playing!", ephemeral: true });

            if (!queue && !client.distube.isPlaying(VoiceChannel)) return interaction.followUp({ content: "There is no music playing!", ephemeral: true });


            if (isNaN(volumeinput)) {
                return interaction.followUp({ content: "The number you entered are not valid!", ephemeral: true });
            }

            if (Number(volumeinput) < 1) return interaction.followUp({ content: "Setting volume below 1 is mute the music. If thats what you wanted just mute the bot yourself ig!", ephemeral: true });

            if (Number(volumeinput) > 100) return interaction.followUp({ content: "Setting volume above 100 will destroy the quality of the music, so i wont let that happen!", ephemeral: true });

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