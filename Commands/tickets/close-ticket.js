const ticketModel = require('@schema/TicketOpenSchema')
const ticketSchema = require('@schema/TicketSchema')
const discordTranscripts = require('discord-html-transcripts');
const { MessageEmbed, Permissions } = require('discord.js')
const signale = require('signale');

module.exports = {
    name: 'ticket-close',
    description: "Closes a ticket",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_CHANNELS'],
    async run(client, interaction) {

        await interaction.deferReply();

            try {

                ticketSchema.findOne({ guildID: interaction.guild.id }, async(err, data) => {
                    if(err) throw err;
                    if(data) {

                        ticketModel.findOne({ ChannelID: interaction.channel.id }, async(err, data) => {
                            if(err) throw err;
                            if(data) {

                                if (data.authorID === interaction.member.id) {

                                    const completedEmbed = new MessageEmbed()
                                    .setColor("RANDOM")
                                    .setTitle("Ticket Closed")
                                    .setDescription(`Thankyou for opening up a ticket in ${interaction.guild.name}.\n\n This ticket is now marked as completed and will be deleted in 20 seconds `)

                                    interaction.followUp({ embeds: [completedEmbed] });
                                    
                                    const attachment = await discordTranscripts.createTranscript(interaction.channel);

                                        await interaction.member.send({
                                            files: [attachment]
                                        });

                                    interaction.followUp("A transcript has been sent to you via DMs!");

                                }
        
                            } else {
        
                             interaction.followUp("This is not your ticket!")
            
                            }
                        })

                    } else {

                        const invalidSetupEmbed2 = new MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('<a:crossmark:1011568778942885909> Invalid Setup!')
                        .setDescription('You need to set up the ticket system first! Please use the command `ticket-setup` to set up the ticket system.')
                        .setFooter({ text: 'Dweeber >> ticket-close' })
            
                        return interaction.followUp({ embeds: [invalidSetupEmbed2] })  
    
                    }
                })

    } catch (error) {
        interaction.followUp(`There is an error. Please try again later.`)
        signale.fatal(error)
    }


    }
}