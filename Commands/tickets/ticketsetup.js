require('module-alias/register')
const TicketSetupModel = require('@schema/TicketSchema')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
    name: 'ticket-setup',
    description: "Set up tickets for your server.",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: 'category1',
            description: 'Set\'s the first buttons name',
            type: 'STRING',
            required: true
        },
        {
            name: 'category2',
            description: "Set\'s the second buttons name",
            type: 'STRING',
            required: true
        },
        {
            name: 'category3',
            description: "Set\'s the third buttons name",
            type: 'STRING',
            required: true
        },
        {
            name: 'description',
            description: "Set\'s the embed descriptions",
            type: 'STRING'
        },
        {
            name: 'transcript',
            description: "Set\'s the transcript channel",
            type: 'CHANNEL'
        }
    ],
    async run(client, interaction) {
        var button1 = interaction.options.getString('category1')
        var button2 = interaction.options.getString('category2')
        var button3 = interaction.options.getString('category3')
        var description = interaction.options.getString('description');
        var channel = interaction.options.getChannel('transcript');

        if (!description) description = 'Please select your categories to get help.';
        if (!channel) channel = {id:'69420'} //When the tickets closes it looks for the channel with this id and if it's not found then it dms the closer

        const Setup = await TicketSetupModel.findOne({ guildID: interaction.guild.id });
        if (!Setup) {
            new TicketSetupModel({
                guildID: interaction.guild.id,
                Buttons: [button1, button2, button3],
                Description: description,
                Channel: channel.id
            }).save();

            interaction.reply({ content: `Opened a way to start tickets`, ephemeral: true });

            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel(button1)
                        .setCustomId(button1 + '-' + interaction.guild.id)
                        .setStyle('PRIMARY'),
                    new MessageButton()
                        .setLabel(button2)
                        .setCustomId(button2 + '-' + interaction.guild.id)
                        .setStyle('PRIMARY'),
                    new MessageButton()
                        .setLabel(button3)
                        .setCustomId(button3 + '-' + interaction.guild.id)
                        .setStyle('PRIMARY')
                )

                const embed = new MessageEmbed()
                .setTitle('Tickets - ' + interaction.guild.name)
                .setDescription(description)
                .setColor("RANDOM")
                .setFooter({ text: 'Dweeber >> tickets' })

                interaction.channel.send({ embeds: [embed], components: [row] })
        } else return interaction.reply(`A ticket menu for ${interaction.guild.name} already exists!`) //I still have to make it myself where they can have two setups.
    }
}