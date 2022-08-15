require('module-alias/register')
const { MessageEmbed, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');
const signale = require('signale');
const { SRAAPI } = require("@root/config.json");

module.exports = {
    name: "gay",
    description: "Make an image more gay",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "user",
            description: "The user profile you want to make more gay of",
            type: 'USER',
            required: false,
        },
    ],
	async run(client, interaction) {

        await interaction.deferReply();
        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

        const Target = interaction.options.getMember("user") || interaction.member;

        try {
        
            let link = (`https://some-random-api.ml/canvas/gay?key=${SRAAPI}&avatar=${Target.user.avatarURL({ format: "png" })}`)

            const attachment = new MessageAttachment(link, 'gay.png');
            
                const gayEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setImage(`attachment://gay.png`)
                .setFooter({ text: 'Dweeber >> gay'});
                 return interaction.followUp({ embeds: [gayEmbed], files: [attachment]  });

        } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
    }


            
	}
};

