require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const signale = require('signale');
const { TRACKERAPI } = require("@root/config.json");

module.exports = {
    name: "apex",
    description: "Get the user apex stats",
    required: true,
    options: [
        {
            name: "platform",
            description: "The platform to get the stats from",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "origin",
                    value: "origin"
                },
                {
                    name: "Xbox live",
                    value: "xbl"
                },
                {
                    name: "Playsyation",
                    value: "psn"
                }
            ]  
        },
        {
            name: "username",
            description: "The player username",
            type: 'STRING',
            required: true,
        },
    ],
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],

	async run(client, interaction) {

        await interaction.deferReply();

        const userplatform = interaction.options.getString('platform');
        const userusername = interaction.options.getString('username');

        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

        try {
        
            await fetch(`https://public-api.tracker.gg/v2/apex/standard/profile/${userplatform}/${userusername}`,{
                "Content-Type": "application/json",
                method: 'GET',
                headers: {'TRN-Api-Key': `${TRACKERAPI}`}
                }).then(res => res.json()).then(json => {

                    var banned = 'No'

                    if (json.data.metadata.isGameBanned != false) {
                        banned = 'Yes'
                    }

                const apexEmbed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(`${json.data.platformInfo.platformUserIdentifier} apex stats`)
                    .setDescription(`UserID: ${json.data.userInfo.userId} | Platform: ${json.data.platformInfo.platformSlug}`)
                    .setThumbnail(json.data.platformInfo.avatarUrl)
                    .addField('Premium user', `${json.data.userInfo.isPremium}`, true)
                    .addField('Verified user', `${json.data.userInfo.isVerified}`, true)
                    .addField('Influencer', `${json.data.userInfo.isInfluencer}`, true)
                    .addField('Partner', `${json.data.userInfo.isPartner}`, true)
                    .addField("=================", "=================")
                    .addField("Current Season", `${json.data.metadata.currentSeason}`, true)
                    .addField("Active Legend", `${json.data.metadata.activeLegend}`, true)
                    .addField("Active Legend Name", `${json.data.metadata.activeLegendName}`, true)
                    .addField("=================", "=================")
                    .addField('Account suspicious', `${json.data.userInfo.isSuspicious}`, true)
                    .addField('Account banned', `${banned}`, true)

                    .setFooter({ text: 'Dweeber >> apex'});
                    interaction.followUp({ embeds: [apexEmbed] });

});


            
        } catch (err) {  
        interaction.followUp({ content: `Profile not found, unreachable or theres an error occured!`, ephemeral: true });
        signale.fatal(err)
    }


            
	}
};