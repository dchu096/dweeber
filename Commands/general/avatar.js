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
        .setTitle(`${Target.user.username}'s Avatar`)
        .addField(`Other format`, `[PNG](${Target.displayAvatarURL({ format: "png", size: 2048, })}) | [JPG](${Target.displayAvatarURL({ format: "jpg", size: 2048, })}) | [JPEG](${Target.displayAvatarURL({ format: "jpeg", size: 2048, })}) | [WEBP](${Target.displayAvatarURL({ format: "webp", size: 2048, })}) | [GIF](${Target.displayAvatarURL({ format: "gif", size: 2048, })})`)
        .setImage(Target.displayAvatarURL({ dynamic: true, size: 2048 }))
        .setFooter("Dweeber >> Avatar")

        interaction.reply({embeds: [embed]});
  
    }
}