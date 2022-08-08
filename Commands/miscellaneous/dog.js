require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const signale = require('signale');
const { SRAAPI } = require("@root/config.json");

module.exports = {
    name: "dog",
    description: "Show a random dog picture",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
	async run(client, interaction) {

        await interaction.deferReply();
        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

        try {
        
            await fetch(`https://some-random-api.ml/animal/dog?key=${SRAAPI}`).then(res => res.json()).then(json => {
            
                const apodEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Random Dog pictures`)
                .setDescription(`${json.fact}`)
                .setImage(`${json.image}`)
                .setFooter({ text: 'Dweeber >> dog'});
                 return interaction.followUp({ embeds: [apodEmbed] });
            });
        } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
    }


            
	}
};

