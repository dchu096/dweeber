require('module-alias/register')
const { MessageEmbed, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');
const signale = require('signale');
const { SRAAPI } = require("@root/config.json");

module.exports = {
    name: "trigger",
    description: "Trigger someone",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "user",
            description: "The user you want to trigger",
            type: 'USER',
            required: false,
        },
    ],
	async run(client, interaction) {

        await interaction.deferReply();

        const Target = interaction.options.getMember("user") || interaction.member;

        try {
        
            let link = (`https://some-random-api.ml/canvas/triggered?avatar=${Target.user.avatarURL({ format: "png" })}&key=${SRAAPI}`)

                const attachment = new MessageAttachment(link, 'image.gif');
                const triggerEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`The triggered ${Target.user.username}`)
                .setDescription(`${Target.user.tag} is now triggered!`)
                .setImage('attachment://image.gif')
                .setFooter({ text: 'Dweeber >> trigger'});    

                 return interaction.followUp({ embeds: [triggerEmbed], files: [attachment] });

        } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
    }


            
	}
};

