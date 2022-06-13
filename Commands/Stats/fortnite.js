require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const signale = require('signale');
const { TRACKERAPI } = require("@root/config.json");

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
                    name: "Keyboard and Mouse",
                    value: "kbm"
                },
                {
                    name: "Controller",
                    value: "gamepad"
                },
                {
                    name: "Mobile",
                    value: "touch"
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

        const embedColor = '#87CEEB'; // color: skyblue
        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

        try {
        
            await fetch(`https://api.fortnitetracker.com/v1/profile/${userplatform}/${epic}`,{
                "Content-Type": "application/json",
                method: 'GET',
                headers: {'TRN-Api-Key': `${TRACKERAPI}`}
                }).then(res => res.json()).then(json => {

                var top3=json.lifeTimeStats.filter(json=> json.key == "Top 3s");
                var top5=json.lifeTimeStats.filter(json=> json.key == "Top 5s");
                var top6=json.lifeTimeStats.filter(json=> json.key == "Top 6s");
                var top10=json.lifeTimeStats.filter(json=> json.key == "Top 10");
                var top12=json.lifeTimeStats.filter(json=> json.key == "Top 12s");
                var top25=json.lifeTimeStats.filter(json=> json.key == "Top 25s");
                var TotalMatch=json.lifeTimeStats.filter(json=> json.key == "Matches Played");
                var TotalWins=json.lifeTimeStats.filter(json=> json.key == "Wins");
                var TotalKills=json.lifeTimeStats.filter(json=> json.key == "Kills");
                var TotalKD=json.lifeTimeStats.filter(json=> json.key == "K/d");

                

                const fortniteEmbed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(`${json.epicUserHandle} fortnite stats`)
                    .setDescription(`Account ID: ${json.accountId}`)
                    .setThumbnail(`${json.avatar}`)
                    .addField(`Top 3`, `${top3[0].value}`)
                    .addField(`Top 5`, `${top5[0].value}`)
                    .addField(`Top 6`, `${top6[0].value}`)
                    .addField(`Top 10`, `${top10[0].value}`)
                    .addField(`Top 12`, `${top12[0].value}`)
                    .addField(`Top 25`, `${top25[0].value}`)
                    .addField(`Matches Played`, `${TotalMatch[0].value}`)
                    .addField(`Victory Royale`, `${TotalWins[0].value}`)
                    .addField(`Kills`, `${TotalKills[0].value}`)
                    .addField(`K/d`, `${TotalKD[0].value}`)
                    .setFooter({ text: 'Dweeber >> Fortnite'});
                    interaction.followUp({ embeds: [fortniteEmbed] });

});


            
        } catch (err) {  
        interaction.followUp({ content: `Profile not found, unreachable or theres an error occured!`, ephemeral: true });
        signale.fatal(err)
    }


            
	}
};
