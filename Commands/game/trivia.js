const signale = require('signale');
const { MessageEmbed } = require('discord.js');
const { Trivia } = require('discord-gamecord')

module.exports = {
    name: "trivia",
    description: "Play a game of Trivia",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "difficulty",
            description: "The difficulty of the game",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "easy",
                    value: "easy"
                },
                {
                    name: "medium",
                    value: "medium"
                },
                {
                    name: "hard",
                    value: "hard"
                }
            ]  
        },
    ],


	async run(client, interaction) {

        try {
                
            new Trivia({
                message: interaction,
                slash_command: true,
                embed: {
                  title: 'Trivia',
                  description: 'You have {time} seconds to respond!',
                  color: '#5865F2',
                },
                difficulty: interaction.options.getString('difficulty'),
                winMessage: 'GG, Your answer was correct! It was **{answer}**',
                loseMessage: 'Your answer was Incorrect! The correct answer was **{answer}**',
                othersMessage: 'You are not allowed to use buttons for this message!',
              }).startGame();
     
            } catch (err) {
                signale.error(err)
                interaction.reply(`There is an error. Please try again later.`);

          } 

	}
};