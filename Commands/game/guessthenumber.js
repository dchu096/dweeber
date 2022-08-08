const signale = require('signale');
const { GuessTheNumber } = require('weky')
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = {
    name: "guessthenumber",
    description: "Guess the number im thinking of",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],

	async run(client, interaction) {

        await interaction.deferReply();


        try {

            interaction.followUp(`Generating a random number...`).then(message => {
            GuessTheNumber({
                message: message,
                embed: {
                  footer: "Dweeber >> guessthenumber",
                  title: 'Guess The Number',
                  description: 'You have **{{time}}** to guess the number. (1-100)',
                  color: "RANDOM",
                  timestamp: false,
                },
                publicGame: true,
                number: Math.floor(Math.random() * 100) + 1,
                time: 60000,
                winMessage: {
                  publicGame:
                    'GG, The number which I guessed was **{{number}}**. <@{{winner}}> made it in **{{time}}**.\n\n__**Stats of the game:**__\n**Duration**: {{time}}\n**Number of participants**: {{totalparticipants}} Participants\n**Participants**: {{participants}}',
                  privateGame:
                    'GG, The number which I guessed was **{{number}}**. You made it in **{{time}}**.',
                },
                loseMessage:
                  'Better luck next time! The number which I guessed was **{{number}}**.',
                bigNumberMessage: 'No {{author}}! My number is greater than **{{number}}**.',
                smallNumberMessage:
                  'No {{author}}! My number is smaller than **{{number}}**.',
                othersMessage: 'Only <@{{author}}> can use the buttons!',
                buttonText: 'Cancel',
                ongoingMessage:
                  "A game is already runnning in <#{{channel}}>. You can't start a new one!",
                returnWinner: true,
              });
            })
            } catch (err) {
                signale.error(err)

          } 

	}
};