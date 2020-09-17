const { RichEmbed } = require("discord.js")
const Discord = require('discord.js');
module.exports = {
    config: {
        name: "roleinfo",
        description: "showds the current role information",
        usage: "^2roleinfo",
        category: "info",
        accessableby: "Members",
        aliases: ["ri", "roledesc"]
    },
    run: async (bot, message, args) => {
        var embedColor = '#87CEEB' // color: skyblue

        let inline = true

        let role = args.join(` `)
        if(!role) return message.reply("Specify a role!");
        let gRole = message.guild.roles.find(`name`, role);
        if(!gRole) return message.reply("Couldn't find that role.");

        const status = {
            false: "No",
            true: "Yes"
        }

        let roleemebed = new Discord.RichEmbed()
            .setColor(embedColor)
            .addField("ID", gRole.id, inline )
            .addField("Name", gRole.name, inline)
            .addField("Mention", `\`<@${gRole.id}>\``, inline)
            .addField("Hex", gRole.hexColor, inline)
            .addField("Members", gRole.members.size, inline)
            .addField("Position", gRole.position, inline)
            .addField("Hoisted", status[gRole.hoist], inline)
            .addField("Mentionable", status[gRole.mentionable], inline)
            .addField("Managed", status[gRole.managed], inline)

        message.channel.send(roleemebed);

    }

}
