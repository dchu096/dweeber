require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const signale = require('signale');
const EconomyDB = require("../../Schema/EconomySchema");

module.exports = {
    name: "beg",
    description: "Beg for coins.",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    timeout: 10,
	async run(client, interaction) {

        await interaction.deferReply();

        const Target = interaction.member;

        const guild = interaction.guild

        try {

            EconomyDB.findOne({ userID: Target.id}, async(err, data) => {
                if(err) throw err;
                if(data) {
                    let amount = Math.floor(Math.random() * 30) + 1; 
                    const response = await EconomyDB.findOneAndUpdate(
                        {
                            userID: interaction.user.id,
                        },
                        {
                            $inc: {
                                coins: amount,
                            },
                        }
                    );

                    const totalAmount = data.coins + amount;

                    const begEmbed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(`Beg result`)
                    .setDescription(`${Target.user.tag} begged for ${amount} coins!`)
                    .addField(`Total: `, `${totalAmount} <:dcoin:992585021720363128>  | ${data.bank} :bank:`)
                    .setFooter({ text: 'Dweeber >> beg'});


                    return interaction.followUp({embeds: [begEmbed]})
                } else {
                    const None = new MessageEmbed() // If you or user dosent have Economy started.#
                    .setColor('#ff0000')
                    .setTitle('Error')
                    .setDescription('You do not have an economy started! Please do \`starteconomy\` to start the economy!')
                    .setFooter({ text: 'Dweeber >> beg'});


                    return interaction.followUp({embeds: [None]})

                }
            })
           
            
        } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
    }


            
	}
};

