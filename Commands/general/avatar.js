const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Get the avatar of a user or yourself.",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "user",
            description: "The user to get the avatar of",
            type: 'USER',
            required: false,
        },
    ],
    run: async(client, interaction, args) => {

        const Target = interaction.options.getMember("user") || interaction.member; 

        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${Target.user.tag}'s Avatar`)
        .setImage(Target.displayAvatarURL({ dynamic: true, size: 2048 }))
        .setFooter("Dweeber >> Avatar")

        interaction.reply({embeds: [embed]});
  
    }
}