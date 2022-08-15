require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const signale = require('signale');
const { FORTNITEAPI } = require("@root/config.json");

module.exports = {
    name: "fortnite",
    description: "Get the user Fortnite stats",
    required: true,
    options: [
        {
            name: "platform",
            description: "The platform to get the stats from",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "Epic Games",
                    value: "epic"
                },
                {
                    name: "Playstation Network",
                    value: "psn"
                },
                {
                    name: "Xbox Live",
                    value: "xbl"
                }
            ]  
        },
        {
            name: "username",
            description: "The player epic username",
            type: 'STRING',
            required: true,
        },
    ],
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],

	async run(client, interaction) {

        await interaction.deferReply();

        const userplatform = interaction.options.getString('platform');
        const epic = interaction.options.getString('username');

        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

        try {

            var statsimg = 'none'

            if (userplatform === 'epic') {
                statsimg = 'keyboardMouse'
            }

            if (userplatform === 'psn') {
                statsimg = 'gamepad'
            }

            if (userplatform === 'xbl') {
                statsimg = 'gamepad'
            }
        
            await fetch(`https://fortnite-api.com/v2/stats/br/v2?accountType=${userplatform}&name=${epic}&image=${statsimg}`,{
                "Content-Type": "application/json",
                method: 'GET',
                headers: {'Authorization': `${FORTNITEAPI}`}
                }).then(res => res.json()).then(json => {

                    const privateEmbed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setDescription(`${json.error}`)

                    if (json.status === '403') {
                    interaction.followUp({ embeds: [privateEmbed] });
                    return;
                    }

                    const fortniteEmbed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(`${json.data.account.name} fortnite stats`)
                    .setDescription(`Battlepass stats: Level ${json.data.battlePass.level} | Progress: ${json.data.battlePass.progress}`)
                    .setImage(json.data.image)
                
                    .setFooter({ text: 'Dweeber >> fortnite'});
                    interaction.followUp({ embeds: [fortniteEmbed] });

});


            
        } catch (err) {  
        interaction.followUp({ content: `Profile not found, unreachable or theres an error occured!`, ephemeral: true });
        signale.fatal(err)
    }


            
	}
};