const { MessageEmbed, Permissions } = require("discord.js");
const ms = require('ms');
const signale = require('signale');

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
        {
            name: "hostedby",
            description: "Who is hosting the giveaway",
            type: 'USER',
            required: false,
        },
        {
            name: "message",
            description: "The message in the embed",
            type: 'STRING',
            required: false,
        }
    ],
    run: async(client, interaction, args) => {

        const iduration = interaction.options.getString('duration');
        const itime = interaction.options.getString('time');
        const iwinnerCount = interaction.options.getInteger('winners');
        const iprize = interaction.options.getString('prize');
        const ihostedBy = interaction.options.getUser('hostedby');
        const imessage = interaction.options.getString('message');

        const nopermsEmbed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Error')
            .setDescription('You do not have the permissions to start a giveaway. [Required Permissions: MANAGE_MESSAGES]')
            .addFields(
                { name: 'TIP', value: `Want users to able to start giveaways? Create a new role named \`Giveaways\` and give it to them!` },
            )
            .setFooter('Dweeber >> startgiveaway');

        if(!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")){
            return interaction.reply({ embed: nopermsEmbed });
        }

        try {
            client.giveawaysManager
            .start(interaction.channel, {
                duration: ms(`${iduration}${itime}`),
                winnerCount: iwinnerCount,
                prize: iprize,
                hostedBy: ihostedBy ? ihostedBy : `<@!${interaction.user.id}>`,
                messages: {
                    giveaway: '<:6323partyicon:989442575867994162> **Giveaways** <:6323partyicon:989442575867994162>',
                    giveawayEnded: '<:6323partyicon:989442575867994162> **Giveaways Ended** <:6323partyicon:989442575867994162>',
                    inviteToParticipate: imessage || `To join the giveaway simply react with <:6323partyicon:989442575867994162>`,
                    drawing: `Ending: {timestamp}`,
                    winMessage: {
                        embed: {title: `Congrats, you won {this.prize}!`, description: `<:external:1013642176737067048> [Giveaway Link]({this.messageURL})`},
                        content: `{winners}`,
                        replyToGiveaway: true
                    },
                    noWinner: "Not enough people participated to this giveaway.",
                    embedFooter: {
                        text: `Dweeber >> giveaways | Winners: ${iwinnerCount}`,
                    }
                }

            })

            interaction.reply({ content: 'The giveaway have started!', ephemeral: true });
        } catch (err) {
            interaction.reply(`There is an error. Please try again later.`);
            signale.fatal(err)
        }       
           
    }
}



