const { MessageEmbed, Permissions } = require("discord.js");
const ms = require('ms');
const signale = require('signale');

module.exports = {
    name: "pausegiveaway",
    description: "Pause a giveaway",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "messageid",
            description: "The message ID of the giveaway",
            type: 'STRING',
            required: true,
        }
    ],
    run: async(client, interaction, args) => {


        const query = interaction.options.getString('messageid');

        const nopermsEmbed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Error')
            .setDescription('You do not have the permissions to pause a giveaway. [Required Permissions: MANAGE_MESSAGES]')
            .addFields(
                { name: 'TIP', value: `Want users to able to start giveaways? Create a new role named \`Giveaways\` and give it to them!` },
            )
            .setFooter('Dweeber >> pausegiveaway');

        if(!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")){
            return interaction.reply({ embed: nopermsEmbed });
        }

        try {
  
            const giveaway = client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

            if (!giveaway) {
                return interaction.reply({
                    content: 'Unable to find a giveaway for `'+ query + '`.',
                    ephemeral: true
                });
            }
    
            if (giveaway.ended) {
                return interaction.reply({
                    content: 'This giveaway is already ended.',
                    ephemeral: true
                });
            }

            if (giveaway.pauseOptions.isPaused) {
                return interaction.reply({
                    content: 'This giveaway is already paused.',
                    ephemeral: true
                });
            }

            const pauseEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Success')
                .setDescription('The giveaway has been paused.')
                .setFooter('Dweeber >> pausegiveaway');

    
            // Edit the giveaway
            client.giveawaysManager.pause(giveaway.messageId)
            // Success message
            .then(() => {
                // Success message
                interaction.reply({ embeds: [pauseEmbed] });
            })

        } catch (err) {
            interaction.reply(`There is an error. Please try again later.`);
            signale.fatal(err)
        }       
           
    }
}



