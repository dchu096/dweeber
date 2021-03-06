const Discord = require("discord.js");

module.exports = {
    config: {
        name: "getid",
        description: "get a user ID",
        usage: " ",
        category: "info",
        accessableby: "members",
        aliases: ["id", "gid"]
    },
    run: async (bot, message, args) => {
        const embedColor = '#87CEEB';
        const member = message.mentions.members.first() || message.member;

        // MESSAGES
        message.delete().catch(O_o => {});


        const Embed = new Discord.MessageEmbed() // Creates the embed thats returned to the person warning if its sent.
            .setColor(embedColor)
            .setTitle(`${member.user.username} Discord user ID is: \`${member.user.id}\`.`);
        await message.channel.send(Embed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {}); // Sends the embed


    }

}