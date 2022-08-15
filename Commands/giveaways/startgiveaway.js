const { MessageEmbed } = require("discord.js");
const ms = require('ms');

module.exports = {
    name: "startgiveaway",
    description: "Start a giveaway",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "duration",
            description: "How long the giveaway will last",
            type: 'STRING',
            required: true,
        },
        {
            name: "time",
            description: "How long the giveaway will last",
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: "Minutes",
                    value: "m"
                },
                {
                    name: "Hours",
                    value: "h"
                },
                {
                    name: "Days",
                    value: "d"
                }
            ]   
        },
        {
            name: "winners",
            description: "How many winners will be selected",
            type: 'INTEGER',
            required: true,
        },
        {
            name: "prize",
            description: "The prize for the giveaway",
            type: 'STRING',
            required: true,
        },
    ],
    run: async(client, interaction, args) => {

        const duration = interaction.options.getString('duration');
        const time = interaction.options.getString('time');
        const winnerCount = interaction.options.getInteger('winners');
        const prize = interaction.options.getString('prize');

        try {
            client.giveawaysManager
            .start(interaction.channel, {
                duration: ms(`${duration}${time}`),
                winnerCount,
                prize
            }).then((data) => { 
            });

            interaction.reply({ content: 'The giveaway have started!', ephemeral: true });
        } catch (err) {
            interaction.followUp(`There is an error. Please try again later.`);
            signale.fatal(err)
        }       
           
    }
}