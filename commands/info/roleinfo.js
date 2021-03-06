const Discord = require('discord.js');
module.exports = {
    config: {
        name: "roleinfo",
        description: "shows the current role information",
        usage: " ",
        category: "info",
        accessableby: "Members",
        aliases: ["ri", "roledesc"]
    },
    run: async (bot, message, args) => {
        const embedColor = '#87CEEB'; // color: skyblue
        const warningColor = '#ff0000';

        let role = args.join(` `) || message.guild.role.cache.get(args[0]);
        if (!role) {
            let noroleEmbed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("Missing Role input")
                .addField("required:", "role", false)
                .setColor(warningColor)
            return message.channel.send(noroleEmbed)
        }

        let gRole = message.guild.roles.cache.find(`name`, role);

        if (!gRole) {
            let nogroleEmbed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("Role not found")
                .addField("required:", "role", false)
                .setColor(warningColor)
            return message.channel.send(nogroleEmbed)
        }

        const status = {
            false: "No",
            true: "Yes"
        }

        let roleEmbed = new Discord.MessageEmbed()
                .setColor(embedColor)
                .addField("ID", gRole.id, true)
                .addField("Name", gRole.name, true)
                .addField("Hex", gRole.hexColor, true)
                .addField("Members", gRole.members.size, true)
                .addField("Position", gRole.position, true)
                .addField("Hoisted", status[gRole.hoist], true)
                .addField("Mentionable", status[gRole.mentionable], true)
                .addField("Managed", status[gRole.managed], true)
            await message.channel.send(roleEmebed);


    }

}
