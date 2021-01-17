const Discord = require("discord.js")

module.exports= {
    config: {
        name: "addrole",
        description: "Adds a role to a member of the guild!",
        usage: "[user/ID]",
        category: "roles",
        accessableby: "Moderators",
        aliases: ["ar", "roleadd"]
    },
    run: async (bot, message, args) => {


        //messages
        message.delete().catch(O_o => {});

        const embedColor = '#87ceeb';
        const warningColor = '#ff0000';

        let rMember = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0])

        let role = message.guild.roles.cache.find(r => r.name === args[1]) || message.guild.roles.cache.find(r => r.id === args[1]) || message.mentions.roles.first()

        if (!rMember) {
            let nopersonembed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("Missing target user to add role")
                .addField("required:", "mentions/ID", false)
                .setColor(warningColor);
            return message.channel.send(nopersonembed).then(msg => msg.delete({timeout: 5000})).catch(O_o => {
            });
        }

        if (!role) {
            let nopersonembed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("Missing role to add on user")
                .addField("required:", "role ID", false)
                .setColor(warningColor);
            return message.channel.send(nopersonembed).then(msg => msg.delete({timeout: 5000})).catch(O_o => {
            });
        }

        if (!message.member.permissions.has("MANAGE_ROLES")) {
            let nopermsembed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("Missing MANAGE_ROLES permission (user)")
                .addField("required:", "BAN_MEMBERS permission", false)
                .setColor(warningColor);
            return message.channel.send(nopermsembed).then(msg => msg.delete({timeout: 5000})).catch(O_o => {
            });
        }

        if (!message.guild.me.permissions.has("MANGE_ROLES")) {
            let botnopermsembed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("Missing MANAGE_ROLES permission (bot)")
                .addField("required:", "BAN_MEMBERS permission", false)
                .setColor(warningColor);
            return message.channel.send(botnopermsembed).then(msg => msg.delete({timeout: 5000})).catch(O_o => {
            });
        }

        if(!rMember.roles.cache.has(role.id)) {
            await rMember.roles.add(role.id).catch(O_o => {});

            let roleadded = new Discord.MessageEmbed()
                .setDescription(`Role ${role.name} added to ${rMember.displayName}`)
                .setColor(embedColor);
            await message.channel.send(roleadded).then(msg => msg.delete({timeout: 5000})).catch(O_o => {});
        } else {
            let alreadyhaveroleEmbed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("This user already have the role")
                .setColor(warningColor);
            await message.channel.send(alreadyhaveroleEmbed).then(msg => msg.delete({timeout: 5000})).catch(O_o => {});
        }
}
}