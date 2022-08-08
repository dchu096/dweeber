require('module-alias/register')
const { MessageEmbed, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');
const signale = require('signale');
const { SRAAPI } = require("@root/config.json");

module.exports = {
    name: "jail",
    description: "Jail user",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "user",
            description: "The user profile you want to jail",
            type: 'USER',
            required: false,
        },
    ],
	async run(client, interaction) {

        await interaction.deferReply();

        const Target = interaction.options.getMember("user") || interaction.member;

        try {
        
            let link = (`https://some-random-api.ml/canvas/jail?avatar=${Target.user.avatarURL({ format: "png" })}&key=${SRAAPI}`)

                const attachment = new MessageAttachment(link, 'image.png');
                const jailEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`The jailbird ${Target.user.username}`)
                .setDescription(`${Target.user.tag} is now in jail!`)
                .setImage('attachment://image.png')
                .setFooter({ text: 'Dweeber >> jail'});    

                 return interaction.followUp({ embeds: [jailEmbed], files: [attachment] });

        } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
    }


            
	}
};

