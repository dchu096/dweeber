require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const signale = require('signale');
const { TRACKERAPI } = require("@root/config.json");

module.exports = {
    name: "csgo",
    description: "Get the CSGO stats",
    required: true,
    options: [
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

        const userusername = interaction.options.getString('username');

        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

        try {
        
            await fetch(`https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${userusername}`,{
                "Content-Type": "application/json",
                method: 'GET',
                headers: {'TRN-Api-Key': `${TRACKERAPI}`}
                }).then(res => res.json()).then(json => {

                    const csEmbed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(`${json.data.platformInfo.platformUserHandle} csgo stats`)
                    .setDescription(`UserID: ${json.data.userInfo.userId} | Platform: ${json.data.platformInfo.platformSlug}`)
                    .setThumbnail(json.data.platformInfo.avatarUrl)
                    .addField('Premium user', `${json.data.userInfo.isPremium}`, true)
                    .addField('Verified user', `${json.data.userInfo.isVerified}`, true)
                    .addField('Influencer', `${json.data.userInfo.isInfluencer}`, true)
                    .addField('Partner', `${json.data.userInfo.isPartner}`, true)
                    .addField("=================", "=================")
                    .addField('Account suspicious', `${json.data.userInfo.isSuspicious}`, true)

                    .setFooter({ text: 'Dweeber >> apex'});
                    interaction.followUp({ embeds: [csEmbed] });


});


            
        } catch (err) {  
        interaction.followUp({ content: `Profile not found, unreachable or theres an error occured!`, ephemeral: true });
        signale.fatal(err)
    }


            
	}
};