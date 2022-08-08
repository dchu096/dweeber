const signale = require('signale');
const { MessageEmbed } = require('discord.js');
const { GuessThePokemon } = require('discord-gamecord')

module.exports = {
    name: "guessthepokemon",
    description: "Guess the pokemon",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],


	async run(client, interaction) {


        try {
                
            new GuessThePokemon({
                message: interaction,
                slash_command: true,
                embed: {
                  title: 'Who\'s This Pokemon?',
                  footer: 'You have only 1 chance',
                  color: '#5865F2',
                },
                time: 60000,
                thinkMessage: '**Thinking...**',
                winMessage: 'Nice! The pokemon was **{pokemon}**',
                stopMessage: 'Better luck next time! It was a **{pokemon}**',
                incorrectMessage: 'Nope! The pokemon was **{pokemon}**',
              }).startGame();
     
            } catch (err) {
                signale.error(err)
                interaction.reply(`There is an error. Please try again later.`);

          } 

	}
};