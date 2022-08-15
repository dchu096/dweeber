require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const signale = require('signale');
const { inspect } = require(`util`);
const { OwnerID } = require('@root/config.json');


module.exports = {
    name: "evaluate",
    description: "Evaluate a code snippet",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "code",
            description: "The code you want to evaluate",
            type: 'STRING',
            required: true,
        },

    ],
	async run(client, interaction) {
		await interaction.deferReply({ ephemeral: true });

        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

        const toEval = interaction.options.getString('code');

        if (interaction.member.user.id !== OwnerID) {
            interaction.followUp(`You dont own me!`);
            return;
        }

        try {
            let evaluated = inspect(eval(toEval, {
                depth: 0
            }))

            if (!toEval) return interaction.followUp(`There is nothing for me to evaluate!`);

            if (toEval.includes('client.token')) return interaction.followUp(`Token is not allowed to be seen outside configuration file!`);

            let hrDiff = process.hrtime(process.hrtime());
            const evalEmbed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Evaulation Successful")
                .setDescription(`Process run time: ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms`)
                .addField(`Execution result:`, `\`\`\`javascript\n${evaluated}\n\`\`\``, true)

            interaction.followUp({ embeds: [evalEmbed], ephemeral: true })
        
        }   catch (err) {
                signale.fatal("[EVAL] " + err)
                interaction.followUp(`There is an error. Please try again later.`);
          } 


	
	}
};