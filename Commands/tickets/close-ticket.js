const ticketModel = require('@schema/TicketOpenSchema')

module.exports = {
    name: 'ticket-close',
    description: "Closes a ticket",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_CHANNELS'],
    options: [
        {
            name: 'id',
            description: 'Ticket ID',
            type: 'STRING',
            required: true
        },
    ],
    async run(client, interaction) {
        const id = interaction.options.getString('id')

        const ticket = await ticketModel.findOne({channelID: id})
        if (ticket) {
            if (interaction.user.id == ticket.authorID) {

            } else if (interaction.user.id) {
                
            }
        }
    }
}