require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const signale = require('signale');
const { BRAINSHOPBID } = require("@root/config.json");
const { BRAINSHOPKEY } = require("@root/config.json");


module.exports = {
    name: "chat",
    description: "Chat with dweeber AI",
    options: [
        {
            name: "message",
            description: "What would you like to talk?",
            type: 'STRING',
            required: true,
        },
    ],
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
	async run(client, interaction, args) {

        await interaction.deferReply();

        const messageinput = interaction.options.getString('message');

        const uid = interaction.member.id;

        try {
            
            await fetch(`http://api.brainshop.ai/get?bid=${BRAINSHOPBID}&key=${BRAINSHOPKEY}&uid=${uid}&msg=${messageinput}`).then(res => res.json()).then(json => {
                const ChatEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Dweeber Chat`)
                .addField(`${messageinput}`, `${json.cnt}`)
                .setFooter({ text: 'Dweeber >> Chat'})
    
            return interaction.followUp({ embeds: [ChatEmbed] });
            });
        } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
    }


}

};
