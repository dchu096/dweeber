const client = require('../../index.js');

client.on("interactionCreate", async (interaction) => {
    if(interaction.isCommand()) {

        const cmd = client.slashCommands.get(interaction.commandName);
        if(!cmd)
        return interaction.reply({content: `The command does not exist!`});

        // const guild = client.guilds.cache.get(interaction.guildId);
        const args = [];

        for(let option of interaction.options.data) {
            if(option.type === "SUB_COMMAND") {
                if(option.name) args.push(option.name);
                option.options ?.forEach((x) => {
                    if(x.value) args.push(x.value);
                })
            } else if(option.value)
            args.push(option.value);
        }

        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

                    //BOT PERMISSION
        if(!interaction.guild.me.permissions.has(cmd.clientPerms || [])) return interaction.reply({embeds: [new MessageEmbed()
        .setDescription(`I'm missing \`${cmd.userPerms || []}\` permission`)
        .setFooter("Dweeber")
        .setTimestamp()
        ]})

        cmd.run(client, interaction, args);
    }

})
