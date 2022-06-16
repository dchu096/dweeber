const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const signale = require('signale');
const EconomyDB = require("../../Schema/EconomySchema");

module.exports = {
    name: "starteconomy",
    description: "Start the economy",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],

	async run(client, interaction) {

        try {

            const row = new MessageActionRow().addComponents(
				      new MessageButton()
					    .setCustomId('starteco')
				    	.setLabel('Start economy')
					    .setStyle('PRIMARY'),
			);
            const embed = new MessageEmbed()
            .setColor('#eed202')
            .setTitle('Start economy')
            .setDescription('Are you sure you want to start the economy?')
            .addField('Warning', 'This Operation is not reversible!')
            .setFooter({ text: 'Dweeber >> starteconomy'});
            
            const errorEmbed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Error')
            .setDescription('You have already started the economy! You cannot start it again! If you need to stop it, please contact the bot owner.')
            .setFooter({ text: 'Dweeber >> starteconomy'});

            const successEmbed = new MessageEmbed()
            .setColor('#30B700')
            .setTitle('Success')
            .setDescription('You have started the economy!')
            .setFooter({ text: 'Dweeber >> starteconomy'});
            

            EconomyDB.findOne({ userID: interaction.user.id }, async(err, data ) => {
              if(err) throw err;
              if(data) {
                  interaction.reply({ embeds: [errorEmbed]}) // Return an error that the user's economy is already started
              } else {
                  interaction.reply({ embeds: [embed], components: [row] }) // Start the economy
                  
              }
            })

            const filter = i => i.user.id === interaction.user.id;

            const collector = interaction.channel.createMessageComponentCollector({
              filter,
              max: 1,
            })

             collector.on('collect', async i => {
              if (i.customId === "starteco") {
                row.components[0].setDisabled(true)
              }
             })

             collector.on('end', async(ButtonInteraction) => {
              ButtonInteraction.first().deferUpdate();
              const id = ButtonInteraction.first().customId;

              if(id === "starteco") return interaction.editReply({embeds: [successEmbed], components: [row]}), await EconomyDB.findOneAndUpdate(
                {
                  userID: interaction.user.id
                },
                {
                  coins: 0,
                  bank: 0,
                  bankLimit: 4000,
                },
                {
                  upsert: true
                }
              )
             })



        } catch (err) {
        interaction.reply(`There is an error. Please try again later.`);
        signale.fatal(err)
        }
        
	}
};

