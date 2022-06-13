const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const signale = require('signale');

module.exports = {
    name: "iss_position",
    description: "Look up the current location of international space station",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
	async run(client, interaction, args) {

        await interaction.deferReply();

        try {
            
            await fetch(`http://api.open-notify.org/iss-now.json`).then(res => res.json()).then(json => {

            
                const issEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Internet space station current location`)
                .setDescription(`Longitude: ${json.iss_position.longitude}, Latitude: ${json.iss_position.latitude}`)
                .setFooter({ text: 'Dweeber >> iss_position'});
    
            return interaction.followUp({ embeds: [issEmbed] });
            });
        } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
    }


}

};