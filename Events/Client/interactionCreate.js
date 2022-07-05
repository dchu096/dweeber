const { MessageEmbed, Collection } = require("discord.js");
const client = require('../../index.js');
const Timeout = new Collection();

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

        if(cmd.timeout) {
            if(Timeout.has(`${interaction.commandName}${interaction.user.id}`)) return interaction.reply({embeds: [new MessageEmbed()
            .setColor("")
            .setDescription(``)
            .setFooter("") 
            ]})
       
          Timeout.set(`${interaction.commandName}${interaction.user.id}`, Date.now() + cmd.timeout)
                  setTimeout(() => {
                      Timeout.delete(`${interaction.commandName}${interaction.user.id}`)
                  }, cmd.timeout)
              }

                    //BOT PERMISSION
        if(!interaction.guild.me.permissions.has(cmd.clientPerms || [])) return interaction.reply({embeds: [new MessageEmbed()
        .setDescription(`I'm missing \`${cmd.userPerms || []}\` permission`)
        .setFooter("Dweeber")
        .setTimestamp()
        ]})

        cmd.run(client, interaction, args);
    }

})