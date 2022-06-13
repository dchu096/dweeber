require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const signale = require('signale');

module.exports = {
    name: "beg",
    description: "Beg for coins.",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
	async run(client, interaction) {

        await interaction.deferReply();

        const target = interaction.member;

        const guild = interaction.guild

        try {

            let amount = Math.floor(Math.random() * 50) + 10;
            let userBalance = await client.eco.fetchMoney(target.id,guild.id);
            let beg = await client.eco.beg(target.id,guild,amount, { canLose: true });
            let total = await client.eco.addMoney(target.id,guild.id,userBalance);

            if (beg.lost) return interaction.followUp(`Begon Thot! Try again later.`);

            if (beg.onCooldown) return interaction.followUp(`You have already begged for coins. Come back after ${beg.time.seconds} seconds to beg again`);
            
            else return interaction.followUp(`You begged for **${beg.amount}** 💸. You now have ${total} 💸`);    
        } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
    }


            
	}
};

