require('module-alias/register')
const { MessageEmbed, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');
const signale = require('signale');
const { SRAAPI } = require("@root/config.json");

module.exports = {
    name: "wasted",
    description: "Put a wasted sign on a user's profile picture",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "user",
            description: "The user profile you want to make more grey of",
            type: 'USER',
            required: false,
        },
    ],
	async run(client, interaction) {

        await interaction.deferReply();

        const Target = interaction.options.getMember("user") || interaction.member;

        try {
        
            let link = (`https://some-random-api.ml/canvas/wasted?avatar=${Target.user.avatarURL({ format: "png" })}&key=${SRAAPI}`)

                const attachment = new MessageAttachment(link, 'image.png');
                const wastedEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`The wasted ${Target.user.username}`)
                .setDescription(`${Target.user.tag} is now wasted!`)
                .setImage('attachment://image.png')
                .setFooter({ text: 'Dweeber >> wasted'});    

                 return interaction.followUp({ embeds: [wastedEmbed], files: [attachment] });

        } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
    }


            
	}
};

