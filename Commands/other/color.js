const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const signale = require('signale');

module.exports = {
    name: "color",
    description: "Fetch the color from a given hex code.",
    options: [
        {
            name: "input",
            description: "The hex code to fetch the color from.",
            type: 'STRING',
            required: true,
        },
    ],
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
	async run(client, interaction, args) {

        await interaction.deferReply();

        const color = interaction.options.getString('input');

        try {
    
        await fetch(`https://api.popcat.xyz/color/${color}`).then(res => res.json()).then(json => {
            
            const colorEmbed = new MessageEmbed()
            .setColor(`${json.hex}`)
            .setTitle(`Color: ${json.name}`)
            .setDescription(`Color info for ${json.name}`)
            .addField(`Name`, `${json.name}`)
            .addField(`Hex code`,`${json.hex}`)
            .addField(`RGB`,`${json.rgb}`)
            .addField(`brightened`,`${json.brightened}`)
            .setThumbnail(json.color_image)
            .setFooter({ text: 'Dweeber >> Color'});
            return interaction.followUp({ embeds: [colorEmbed] });
            });
        } catch (err) {
            signale.fatal(err)
            interaction.followUp(`There is no color with the hex code ${color} or theres an error occured`);
        }
       
            
	}
};