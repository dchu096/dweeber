const { MessageEmbed, Collection, Permissions } = require("discord.js") //Discord shall be deleted from this file.XD
const client = require('../../index.js');
require('module-alias/register')
const ticketModel = require('@schema/TicketSchema')
const ticket = require('@schema/TicketOpenSchema')

client.on("interactionCreate", async (interaction) => {
    if (!interaction.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) return;
    if (!interaction.guild.me.permissions.has(Permissions.FLAGS.EMBED_LINKS)) return interaction.reply(`You did not give the bot enough permissions to create channels. [Required Permissions: EMBED_LINKS]`)
    
     if (interaction.isButton()) {
    if (interaction.user.bot) return;
    const ticketModule = await ticketModel.findOne({ guildID: interaction.guild.id });
    if (!ticketModule) return;
    else if (ticketModule) {
        for (var i = 0; i < ticketModule.Buttons.length; i++) {
            if (interaction.customId === `${ticketModule.Buttons[i]}-${interaction.guild.id}`) {
                const channel = `${ticketModule.Buttons[i]}-${interaction.user.id}-${interaction.user.username}`;
                const ticketUser = await ticket.findOne({ guildID: interaction.guild.id, authorID: interaction.user.id, reason: ticketModule.Buttons[i] });
                if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return interaction.reply(`You did not give the bot enough permissions to create channels. [Required Permissions: MANAGE_CHANNELS]`)
                if (!ticketUser) {
                    interaction.guild.channels.create(channel, {
                        type: 'text',
                        permissionOverwrites: [{
                            id: interaction.guild.id,
                            deny: ['VIEW_CHANNEL'],
                        }, {
                            id: interaction.user.id,
                            allow: ['VIEW_CHANNEL'],
                        }, {
                            id: interaction.client.user.id,
                            allow: ['VIEW_CHANNEL'],
                        }]
                    }).then(async (channel) => {
                        new ticket({
                            guildID: interaction.guild.id,
                            authorID: interaction.user.id,
                            reason: interaction.customId.toString().replace(`-${interaction.guild.id}`, ''),
                            channelID: channel.id
                        }).save()
                        channel.setTopic(`**Close ID: ${channel.id}**`)
                        const embed = new MessageEmbed()
                            .setTitle(`Thankyou for creating a ticket in ${interaction.guild.name}`)
                            .setDescription(`Please hold on while waiting for a staff member to assist you! \n\`\`\`→ Opened by ${interaction.user.tag}\`\`\`\n\`\`\`→ Category: ${interaction.customId.toString().replace(`-${interaction.guild.id}`, '')}\`\`\``)
                            .addFields({name: 'Close ID', value: channel.id})
                        channel.send({ content: `<@!${interaction.user.id}>`, embeds: [embed] }).catch(console.log)

                        interaction.reply({ content: `Opened ticket for ${interaction.customId.toString().replace(`-${interaction.guild.id}`, '')} \n This channel: <#${channel.id}>`, ephemeral: true }).catch(console.log)
                    }).catch(console.log)
                } else return interaction.reply({ content: `You already have a ticket open for \`${ticketModule.Buttons[i]}\`!` })
            }
        }
    }
}
})