require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const signale = require('signale');
const EconomyDB = require("../../Schema/EconomySchema");


module.exports = {
    name: "work",
    description: "Work for your money",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
	async run(client, interaction) {

        await interaction.deferReply();

        const Target = interaction.member; 

        const guild = interaction.guild

        try {

            const jsonData = {
                "001": "Isn't learning programming fun?",
                "002": "Please stop raiding my server.",
                "003": "I'm not a bot, I'm a human.",
                "004": "I'm a programmer",
                "005": "There is a error with my code, can you help me to fix it?",
                "006": "How can i write a essay about coding?",
                "007": "It was getting dark, and we weren’t there yet.",
                "008": "Despite multiple complications and her near-death experience",
                "009": "She opened up her third bottle of wine of the night.",
                "010": "That must be the tenth time I've been arrested for selling deep-fried cigars.",
            }
            const values = Object.values(jsonData)
            
            const randomValue = values[parseInt(Math.random() * values.length)]

            let wamount;

            const time = "5000";

            const workEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Working as a typer`)
            .setDescription(`Your boss have asked you to type the following sentence`)
            .addField(`Sentence: `, `${randomValue}`)
            .setFooter({ text: 'Dweeber >> work'});

            interaction.followUp({embeds: [workEmbed]})

            const workSuccessEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Work finished`)
            
            .setFooter({ text: 'Dweeber >> work'});

            const workFailEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Work finished`)
            .setDescription(`${interaction.member} have failed to type the sentence and got nothing from the boss.`)
            .setFooter({ text: 'Dweeber >> work'});

            const cheatedEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Work finished`)
            .setDescription(`${interaction.member} have cheated and got nothing from the boss.`)
            .setFooter({ text: 'Dweeber >> work'});


            const filter = m => m.author.id === interaction.user.id
            const collector = interaction.channel.createMessageCollector(filter, {max: 1, time: 15000})
            collector.once('collect', async (message) => {

                if (message.content == randomValue) {
                    wamount = Math.floor(Math.random() * 300) + 100;
                    workSuccessEmbed.setDescription(`${interaction.member} have successfully typed the sentence and got ${wamount} <:dcoin:992585021720363128> from the boss.`)
                    message.channel.send({ embeds: [workSuccessEmbed] })
                    } else {
                    message.channel.send({ embeds: [workFailEmbed] })
                    wamount = "0";
                    }
                
            }) 
            
            collector.on('end', (collected, reason) => {
                if (reason) {
                  if (reason === 'time') {
                    interaction.reply({ embeds: [cheatedEmbed] })
                  }
                } 
              })
              

              

       
        } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
    }


            
	}
};

