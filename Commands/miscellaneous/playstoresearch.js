require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const signale = require('signale');
const { SERPAPI } = require("@root/config.json");

module.exports = {
    name: "playstoresearch",
    description: "Search for a app on the Play Store",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "store",
            description: "The store you want to search on",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "apps",
                    value: "apps"
                },
                {
                    name: "games",
                    value: "games"
                }
            ]  
        },
        {
            name: "app",
            description: "The item you want to get a search",
            type: 'STRING',
            required: true,
        },
    ],
	async run(client, interaction) {

        await interaction.deferReply();
        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

        const storeinput = interaction.options.getString('store');

        const appinput = interaction.options.getString('app');



        try {

            await fetch(`https://serpapi.com/search?engine=google_play&store=${storeinput}&q=${appinput}&api_key=${SERPAPI}`).then(res => res.json()).then(json => {
            
                const gstoreEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Search Results for ${appinput}`)
                .addField(`App name:`, `${json.app_highlight.title}`, true)
                .addField(`App developers:`, `${json.app_highlight.author}`, true)
                .addField(`App description:`, `${json.app_highlight.description}`, true)
                .addField(`App ID:`, `${json.app_highlight.product_id}`, true)
                .addField(`Rating:`, `${json.app_highlight.rating} :star: `, true)
                .addField(`Downloads:`, `${json.app_highlight.downloads}`, true)
                .setThumbnail(`${json.app_highlight.thumbnail}`)
                .setFooter({ text: 'Dweeber >> Play Store Search'});
                 return interaction.followUp({ embeds: [gstoreEmbed] });
            });
        
            
        } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
    }


            
	}
};

