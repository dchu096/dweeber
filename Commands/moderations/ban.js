const { Permissions, MessageEmbed } = require("discord.js");
const ModerationDB = require("../../Schema/ModerationSchema");
const signale = require('signale');

module.exports = {
    name: "ban",
    description: "Ban a user",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'KICK_MEMBERS'],
    options: [
        {
            name: "user",
            description: "The user you would like to kick",
            type: 'USER',
            required: true,
        },
        {
            name: "delete_messages",
            description: "Delete the messages of the banned user",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "Dont delete",
                    value: "0"
                },
                {
                    name: "Previous 24Hours",
                    value: "1"
                },
                {
                    name: "Previous 7Days",
                    value: "7"
                }
            ]  
        },
        {
            
            name: "reason",
            description: "The reason for the ban",
            type: 'STRING',
            required: false,
            
        },
    ],
    run: async(client, interaction, args) => {

        await interaction.deferReply();

        const banreason = interaction.options.getString('reason');

        const duration = interaction.options.getString('delete_messages');

        const Target = interaction.options.getMember("user");
 

        try {
            ModerationDB.findOne({ userID: Target.id}, async(err, data) => {
                if(err) throw err;
                if(data) {
                    await ModerationDB.findOneAndUpdate(
                        {
                            userID: Target.id,
                            guildID: interaction.guild.id
                        },
                        {
                            $inc: {
                                banned: 1,
                            },
                        }
                    );

                   
                } else {
                    await ModerationDB.findOneAndUpdate(
                        {
                          userID: Target.id,
                          guildID: interaction.guild.id
                        },
  
                        {

                          warnings: 0,
                          kicked: 0,
                          banned: 1,
                        },
                        {
                          upsert: true
                        }
                      )
                    
                }
            })

        

        if(!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return interaction.followUp(`You do not have the required permissions to ban members. [Required Permissions: BAN_MEMBERS]`);

        if (!Target.kickable) return interaction.followUp(`I cannot ban ${Target.user.username}`);

        if (!Target === interaction.member) return interaction.followUp(`I wont let you ban yourself.`);


        if (!banreason) {
            reason = "None"
        } else {
            reason = banreason
        }

        await Target.ban({days:duration,reason: reason})

        const banEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`${Target.user.tag} has been banned. | Reason: ${reason}`)
        .addField(`User ID:`, `${Target.id}`)
        .addField(`Moderator:`, `${interaction.member.tag}`)
        .setFooter("Dweeber >> ban")
        interaction.followUp({ embeds: [banEmbed] });

        } catch (err) {
            interaction.followUp(`There is an error. Please try again later.`);
            signale.fatal(err)
        }

        

        
  
    }
}