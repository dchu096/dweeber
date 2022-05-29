const { MessageEmbed } = require('discord.js');
const {Signale} = require('signale');
const signale = new Signale();

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
        const embedColor = '#87CEEB';
        let member = message.mentions.members.first() || message.member;

        try {
            if (!member) {
              message.channel.send("No user defined")
            }
            if (args[0]) {
              message.channel.send("ID avatar fetch is currently not supported!")
            }
            
            const avatarEmbed = new MessageEmbed()
            .setColor(embedColor)
            .setTitle(`${member.user.username}'s avatar`)
            .setImage(`${member.displayAvatarURL({ dynamic:true })}`)
            .setFooter({ text: 'Dweeber >> Avatar'});
        message.channel.send({ embeds: [avatarEmbed] });

          } catch (err) {
            signale.error(err)
          }

    }

}