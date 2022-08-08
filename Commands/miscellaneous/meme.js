require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const signale = require('signale');
const { SRAAPI } = require("@root/config.json");

module.exports = {
    name: "meme",
    description: "Show a random meme",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
	async run(client, interaction) {

        await interaction.deferReply();
        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

        try {
        
            await fetch(`https://some-random-api.ml/meme?key=${SRAAPI}`).then(res => res.json()).then(json => {
            
                const apodEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Random meme`)
                .setDescription(`Category: ${json.category} | ID: ${json.id}`)
                .addField(`Caption:`, `${json.caption}`)
                .addField(`Tip:`, `If a meme is considered inapporporriate or offensive, please report it to the bot developers and we will blacklist it for ya!.`)
                .setImage(`${json.image}`)
                .setFooter({ text: 'Dweeber >> meme'});
                 return interaction.followUp({ embeds: [apodEmbed] });
            });
        } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
    }


            
	}
};

