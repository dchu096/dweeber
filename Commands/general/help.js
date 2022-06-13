const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { stripIndents } = require("common-tags");
const signale = require('signale');

module.exports = {
    name: "help",
    description: "Show the help menu.",
    options: [
        {
            name: "command",
            description: "The command to get help for",
            type: 'STRING',
            required: false,
        },
    ],
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],

    run: async(client, interaction, args) => {

        var prefix = '/'

        await interaction.deferReply();

        const helpcommand = interaction.options.getString('command');

        const HelpEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle("Dweeber commands list")
            .setAuthor(`${client.user.username.displayName}`)
            .setThumbnail(client.user.displayAvatarURL())

        if(!helpcommand) {
            const categories = readdirSync("./Commands/")

            HelpEmbed.setDescription(`Bot prefix is: **${prefix}**`)
            HelpEmbed.setFooter({ text: 'Dweeber >> Help'});
            categories.forEach(category => {
                const dir = client.commands.filter(c => c.config.category === category)
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try {
                    HelpEmbed.addField(`❯ ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\``).join(" "))
                } catch(err) {
                    signale.error(err)
                }
            })

            return interaction.followUp({ embeds: [HelpEmbed] })
        } else {
            let command = client.commands.get(client.aliases.get(helpcommand.toLowerCase()) ||helpcommand.toLowerCase())
            if(!command) return interaction.followUp(HelpEmbed.setTitle("Invalid Command.").setDescription(`Do \`${prefix}help\` for the list of the commands.`))
            command = command.config

            HelpEmbed.setDescription(stripIndents`The bot's prefix is: \`${prefix}\`\n
            **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Description:** ${command.description || "No Description provided."}
            **Usage:** ${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : "No Usage"}
            **Accessible by:** ${command.accessableby || "Members"}
            **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None."}`)

            return interaction.followUp({ embeds: [HelpEmbed] });
  
    }
}
}