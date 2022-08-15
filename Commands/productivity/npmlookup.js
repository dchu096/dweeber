require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const signale = require('signale');
const { STATUS_CODES } = require("http");

module.exports = {
    name: "npmlookup",
    description: "Lookup npm package",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "package",
            description: "The package you want to lookup",
            type: 'STRING',
            required: true,
        },
    ],
	async run(client, interaction) {

        await interaction.deferReply();
        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

        const pkginput = interaction.options.getString('app');

        try {

            const npmEmbed = new MessageEmbed()
            .setColor('RANDOM')  
            .setFooter({ text: 'Dweeber >> npmlookup'});
             
        
        
            await fetch(`https://registry.npmjs.com/${pkginput}`).then(res => res.json()).then(json => {
            
            npmEmbed.setTitle(`${json.name}`)
            npmEmbed.setDescription(`${json.description}`)
            npmEmbed.addField(`created at:`, `\`${json.time.created}\``, true)
            npmEmbed.addField(`Last modified:`, `\`${json.time.modified}\``, true)
            npmEmbed.addField(`Lastest stable | Latest dev:`, `${json["dist-tags"].latest} | ${json["dist-tags"].dev}`)
            npmEmbed.addField(`License:`, `${json.license}`)
                
            });	

            await fetch(`https://packagephobia.com/api.json?p=${encodeURIComponent(pkginput)}`).then(res => res.json()).then(json => {
            
                const sizemb = (json.installSize / 1000000).toFixed(2);

                npmEmbed.addField(`Size:`, `${sizemb} MB`)
			      
                });	



            return interaction.followUp({ embeds: [npmEmbed] });

        } catch (err) {
        interaction.followUp(`Package not found or there is an error occured. Please try again later.`);
        signale.fatal(err)
    }


            
	}
};
