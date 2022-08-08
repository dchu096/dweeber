const signale = require('signale');
const { MessageEmbed } = require('discord.js');
const { EightBall } = require('discord-gamecord')

module.exports = {
    name: "8ball",
    description: "Ask the magic 8 ball a question",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "input",
            description: "The question to ask the magic 8 ball.",
            type: 'STRING',
            required: true,
        },
    ],

	async run(client, interaction) {

        const question = interaction.options.getString('input');

        try {
                
            new EightBall({
                message: interaction,
                question: question,
                slash_command: true,
                embed: {
                    title: '🎱 8Ball',
                    color: 'RANDOM',
                    footer: 'Dweeber >> 8Ball',
                }
            }).startGame();
       

     
            } catch (err) {
                signale.error(err)
                interaction.reply(`There is an error. Please try again later.`);

          } 

	}
};