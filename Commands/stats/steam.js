require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const signale = require('signale');
const { STEAMAPI } = require("@root/config.json");

module.exports = {
    name: "steam",
    description: "Get stats about a steam user",
    required: true,
    options: [
        {
            name: "vanityurl",
            description: "The vanity url of the user (https://steamcommunity.com/id/<vanityurl>)",
            type: 'STRING',
            required: true,
        },
    ],
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],

	async run(client, interaction) {

        await interaction.deferReply();

        const userusername = interaction.options.getString('vanityurl');

        try {   

            const steamEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setFooter({ text: 'Dweeber >> Steam'});

            
            
        
            await fetch(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${STEAMAPI}&vanityurl=${userusername}`).then(res => res.json()).then(json => {

                const notfoundEmbed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('User not found')
                    .setDescription(`I cannot find the user ${userusername}`)
                    .addFields({ name: 'Reminder', value: 'The VanityURL is the username after \`https://steamcommunity.com/id/\` and **not** their username!' })
                    .setFooter({ text: 'Dweeber >> Steam'});

                if(json.response.success === 42) return interaction.followUp({ embeds: [notfoundEmbed] });

                const id = json.response.steamid;
                const summaries = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAMAPI}&steamids=${id}`;
                const bans = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${STEAMAPI}&steamids=${id}`;
                const state = ["Offline", "Online", "Busy", "Away", "Snooze", "Looking to trade", "Looking to play"];

                fetch(summaries).then(res => res.json()).then(json => {
                    if(!json.response) return interaction.followUp({ embeds: [notfoundEmbed] })


                    const { personaname, avatarfull, realname, personastate, loccountrycode, profileurl, timecreated, lastlogoff } = json.response.players[0];

                    const privateEmbed = new MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('User private')
                        .setDescription(`The user ${personaname} is private`)
                        .addFields({ name: 'Reminder', value: 'In order to use this command please enable your profile lookup to be public!' })

                    if(json.communityvisibilitystate === 1) return interaction.followUp({ embeds: [privateEmbed] });

                    fetch(bans).then(res => res.json()).then(json => {
                        if(!json.players) return interaction.followUp({ embeds: [notfoundEmbed] })

                        const { CommunityBanned, VACBanned, DaysSinceLastBan, EconomyBan, NumberOfVACBans, NumberOfGameBans} = json.players[0];

                        var communitybanstatus;
                        var vacbanstatus;
                        var economybanstatus;
                        var dayssincelastban;
                        var numberofvacbans;
                        var numberofgamebans;

                        if(CommunityBanned === true) {
                            communitybanstatus = 'Yes';
                        } else {
                            communitybanstatus = 'No';
                        }

                        if(VACBanned === true) {
                            vacbanstatus = 'Yes';
                        } else {
                            vacbanstatus = 'No';
                        }

                        if(EconomyBan === true) {
                            economybanstatus = 'Yes';
                        } else {
                            economybanstatus = 'No';
                        }

                        if(DaysSinceLastBan === 0) {
                            dayssincelastban = 'Never';
                        } else {
                            dayssincelastban = DaysSinceLastBan;
                        }

                        if(NumberOfVACBans === 0) {
                            numberofvacbans = 'None';
                        } else {
                            numberofvacbans = NumberOfVACBans;
                        }

                        if(NumberOfGameBans === 0) {
                            numberofgamebans = 'None';
                        } else {
                            numberofgamebans = NumberOfGameBans;
                        }

                        
                            steamEmbed.setTitle(`${personaname}'s Steam Profile`)
                            steamEmbed.setDescription(`Real name: ${realname} || ID: ${id}`)
                            steamEmbed.setURL(profileurl)
                            steamEmbed.setThumbnail(avatarfull)
                            steamEmbed.addFields(
                                { name: 'Status', value: `${state[personastate]}` },
                                { name: 'Country:', value: `:flag_${loccountrycode ? loccountrycode.toLowerCase() : "white"}:` },
                                { name: 'Account Created:', value: `<t:${timecreated}:d>` },
                                { name: 'Last offline:', value: `<t:${lastlogoff}:R>` },
                                { name: '=============', value: '=============' },
                                { name: 'Community Ban status:', value: `\`${communitybanstatus}\``, inline: true },
                                { name: 'VAC Ban status:', value: `\`${vacbanstatus}\``, inline: true },
                                { name: 'Number of VAC bans:', value: `\`${numberofvacbans}\``, inline: true },
                                { name: 'Number of Game bans:', value: `\`${numberofgamebans}\``, inline: true },
                                { name: 'Steam Market Ban:', value: `\`${economybanstatus}\``, inline: true },
                                { name: 'Days since last ban:', value: `\`${dayssincelastban}\``, inline: true },
                                
                            )



                        interaction.followUp({ embeds: [steamEmbed] });

                        })
});

})

            
        } catch (err) {  
        interaction.followUp({ content: `Profile not found, unreachable or theres an error occured!`, ephemeral: true });
        signale.fatal(err)
    }


}
};

