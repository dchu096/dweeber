require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const signale = require('signale');
const { SRAAPI } = require("@root/config.json");

module.exports = {
    name: "animequote",
    description: "Show a random anime quote",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "anime",
            description: "The anime you want to get a quote from",
            type: 'STRING',
            required: false,
        },
    ],
	async run(client, interaction) {

        await interaction.deferReply();
        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

        const animeinput = interaction.options.getString('anime');



        try {

            if (!animeinput) {

                await fetch(`https://animechan.vercel.app/api/random/`).then(res => res.json()).then(json => {
            
                const randomanimequoteEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Anime Quote`)
                .setDescription(`${json.character} from ${json.anime}`)
                .addField(`Quote:`, `${json.quote}`)
                .setFooter({ text: 'Dweeber >> animequote'});
                 return interaction.followUp({ embeds: [randomanimequoteEmbed] });
            });
            } else {
                await fetch(`https://animechan.vercel.app/api/quotes/anime?title=${animeinput}`).then(res => res.json()).then(json => {
            
                const animequoteEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Anime Quote`)
                .setDescription(`${json[0].character} from ${json[0].anime}`)
                .addField(`Quote:`, `${json[0].quote}`)
                .setFooter({ text: 'Dweeber >> animequote'});
                 return interaction.followUp({ embeds: [animequoteEmbed] });
            });       
            }
        
            
        } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
    }


            
	}
};

