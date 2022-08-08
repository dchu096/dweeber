const signale = require('signale');
const { MessageEmbed } = require('discord.js');
const { Emojify } = require('discord-gamecord');

module.exports = {
    name: "emojify",
    description: "Emojify a string",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "input",
            description: "The string to emojify.",
            type: 'STRING',
            required: true,
        },
    ],

	async run(client, interaction) {

        const string = interaction.options.getString('input');

        try {
            interaction.reply(await Emojify(string));
           
            } catch (err) {
                signale.error(err)

          } 

	}
};