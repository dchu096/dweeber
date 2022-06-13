require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const signale = require('signale');
const MONGOURL = require('@root/config.json')


module.exports = {
    name: "daily",
    description: "Daily balance",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
	async run(client, interaction) {

        await interaction.deferReply();

        const target = interaction.member; 

        const guild = interaction.guild

        try {

            let amount = Math.floor(Math.random() * 500) + 100;

            let addMoney = await client.eco.daily(target.id,guild,amount);

            let userBalance = await client.eco.fetchMoney(target.id,guild.id);

        if (addMoney.cooldown) return interaction.followUp(`You have already claimed your daily credit. Come back after ${addMoney.time.days} days, ${addMoney.time.hours} hours, ${addMoney.time.minutes} minutes & ${addMoney.time.seconds} seconds to claim it again`);

         else return interaction.followUp(`You have claimed your daily credit of **${addMoney.amount}** 💸. You now have ${userBalance} 💸`);

       
        } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
    }


            
	}
};

