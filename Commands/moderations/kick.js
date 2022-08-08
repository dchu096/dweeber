const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: "kick",
    description: "Kick a user from the server",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'KICK_MEMBERS'],
    options: [
        {
            name: "user",
            description: "The user you would like to kick",
            type: 'USER',
            required: true,
        },
    ],
    run: async(client, interaction, args) => {

        try {

            await interaction.deferReply();

        const Target = interaction.options.getMember("user") || interaction.member; 

        if(message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return interaction.followUp(`You do not have the required permissions to kick members. [Required Permissions: KICK_MEMBERS]`);

        if (!Target.kickable) return interaction.followUp(`I cannot kick ${Target.user.username}`);

        if (!Target === interaction.member) return interaction.followUp(`I wont let you kick yourself.`);

        await Target.kick()

        const kickembed = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`${Target.user.tag} has been kicked.`)
        .addField(`User ID:`, `${Target.id}`)
        .addField(`Moderator:`, `${interaction.member.tag}`)
        .setFooter("Dweeber >> kick")
        interaction.reply({embeds: [kickembed]});

        } catch (err) {
            interaction.followUp(`There is an error. Please try again later.`);
            signale.fatal(err)
        }

        

        
  
    }
}