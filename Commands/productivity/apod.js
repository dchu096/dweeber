require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const signale = require('signale');
const { NASAAPI } = require("@root/config.json");

module.exports = {
    name: "apod",
    description: "Show a Astronomy Picture of the Day",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
	async run(client, interaction) {

        await interaction.deferReply();
        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

        try {
        
            await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASAAPI}`).then(res => res.json()).then(json => {
            
                const apodEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Astronomy Picture of the Day`)
                .setDescription(`Copyright ${json.copyright} @ ${json.date}`)
                .addField(`Explanation`, trim(`${json.explanation}`, 1024))
                .setImage(`${json.url}`)
                .setFooter({ text: 'Dweeber >> APOD'});
                 return interaction.followUp({ embeds: [apodEmbed] });
            });
        } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
    }


            
	}
};

