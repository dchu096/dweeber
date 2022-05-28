const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "avatar",
        description: "Show the user's profile picture",
        usage: " ",
        category: "info",
        accessableby: "members",
        aliases: ["pfp"]
    },
    run: async (bot, message, args) => {
        const user = message.mentions.users.first() || message.author;
        const embedColor = '#87CEEB';

        const avatarEmbed = new MessageEmbed()
            .setColor(embedColor)
            .setAuthor("Avatar >> " + user.username)
            .setImage(user.displayAvatarURL())
            .setFooter({ text: 'Dweeber >> Avatar'});
        message.channel.send({ embeds: [avatarEmbed] });

    }

}