const { Permissions, MessageEmbed } = require("discord.js");
const signale = require('signale');
const ModerationDB = require("../../Schema/ModerationSchema");

module.exports = {
    name: "userinfo",
    description: "Get the infomation of a user or yourself",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "user",
            description: "The user to get the info of",
            type: 'USER',
            required: false,
        },
    ],
    run: async(client, interaction, args) => {

      await interaction.deferReply();


      const memberMention = interaction.options.getMember("user") || interaction.member; 

      const userMention = await client.users.fetch(memberMention)   

        const flags = {
          DISCORD_EMPLOYEE: 'Discord Employee',
          DISCORD_PARTNER: 'Discord Partner',
          BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
          BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
          HYPESQUAD_EVENTS: 'HypeSquad Events',
          HOUSE_BRAVERY: 'House of Bravery',
          HOUSE_BRILLIANCE: 'House of Brilliance',
          HOUSE_BALANCE: 'House of Balance',
          EARLY_SUPPORTER: 'Early Supporter',
          TEAM_USER: 'Team User',
          SYSTEM: 'System',
          VERIFIED_BOT: 'Verified Bot',
          VERIFIED_DEVELOPER: 'Verified Bot Developer'
        };

        try {

            var AdminPerm = "No";

            if (memberMention.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
              AdminPerm = "Yes"
            }


    
            const statuses = {
                "online" : "🟢",
                "idle" : "🟠",
                "dnd" : "🔴",
                "offline" : "⚫️",
              }
    
              const activity = memberMention.presence ? memberMention.presence.activities[0] : {
                type: "CUSTOM",
                emoji: {
                  name: "❌"
                },
                state : "OFFLINE - No activity"
              };
    
              var userstatus = "Nothing";
              if(activity){
                if(activity.type === "CUSTOM"){
                  let emoji = `${activity.emoji ? activity.emoji.id  ? `<${activity.emoji.animated ? "a": ""}:${activity.emoji.name}:${activity.emoji.id }>`: activity.emoji.name : ""}`
                  userstatus = `${emoji} \`${activity.state || client.la[ls].cmds.info.userinfo.nostatus}\``
                }
                else{
                  userstatus = `\`${activity.type.toLowerCase().charAt(0).toUpperCase() + activity.type.toLowerCase().slice(1)} ${activity.name}\``
                }
              }
    
            let embedColor = "#87CEEB"
    
            var roles = "None"
    
            const rolesofmember = memberMention.roles.cache.filter(r => r.name !== '@everyone').map(role => role.name).join(', ')
    
            let userinfo = {};
            userinfo.bot = memberMention.user.bot;
            userinfo.createdat = memberMention.user.createdAt;
            userinfo.discrim = memberMention.user.discriminator;
            userinfo.id = memberMention.user.id;
            userinfo.tag = memberMention.user.tag;
            userinfo.uname = memberMention.user.username;

            const userFlags = memberMention.user.flags.toArray();

            userinfo.allroles = rolesofmember || roles;

            userinfo.avatar = memberMention.displayAvatarURL({ dynamic: true, size: 2048 });

                ModerationDB.findOne({ Target: memberMention.id, guilldID: interaction.guild.id}, async(err, data) => {
                  if(err) throw err;
                  if(data) {
                const InfoEmbed = new MessageEmbed()
                .setTitle(`About ${userinfo.uname}`)
                .setThumbnail(userinfo.avatar)
                .setColor(embedColor)
                .setAuthor({ name: `${userinfo.uname}`, iconURL: `${userinfo.avatar}`})
                .addField("Botuser", `${userinfo.bot}`, true)
                .addField("Username", `${userinfo.uname}`, true)
                .addField("Discriminator", `${userinfo.discrim}`, true)
                .addField("Online Status:", `${statuses[memberMention.presence ? memberMention.presence.status : "offline"]} ${memberMention.presence ? memberMention.presence.status : "offline"}`)
                .addField("Created At:", `${userinfo.createdat}`, true)
                .addField("Client ID:", `${userinfo.id}`, true)
                .addField("Roles:", `${userinfo.allroles}`, false)
                .addField("Badge:", `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`, true)
                .addField("Administrator:", `${AdminPerm}`, true)
                .addField("Activity:", `${userstatus}`)
                .addField("Got warned:", `${data.warnings} times`, true)
                .addField("Got kicked:", `${data.kicked} times`, true)
                .addField("Got banned:", `${data.banned} times`, true)
                  .setFooter({ text: 'Dweeber >> UserInfo'});
                      
                      interaction.followUp({ embeds: [InfoEmbed] });
                   
                  } else {
      
                    await ModerationDB.findOneAndUpdate(
                      {
                        userID: memberMention.id,
                        guildID: interaction.guild.id
                      },

                      {
                        warnings: 0,
                        kicked: 0,
                        banned: 0
                      },
                      {
                        upsert: true
                      }
                    )

                    const InfoEmbed = new MessageEmbed()
                .setTitle(`About ${userinfo.uname}`)
                .setThumbnail(userinfo.avatar)
                .setColor(embedColor)
                .setAuthor({ name: `${userinfo.uname}`, iconURL: `${userinfo.avatar}`})
                .addField("Botuser", `${userinfo.bot}`, true)
                .addField("Username", `${userinfo.uname}`, true)
                .addField("Discriminator", `${userinfo.discrim}`, true)
                .addField("Online Status:", `${statuses[memberMention.presence ? memberMention.presence.status : "offline"]} ${memberMention.presence ? memberMention.presence.status : "offline"}`)
                .addField("Created At:", `${userinfo.createdat}`, true)
                .addField("Client ID:", `${userinfo.id}`, true)
                .addField("Roles:", `${userinfo.allroles}`, false)
                .addField("Badge:", `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`, true)
                .addField("Administrator:", `${AdminPerm}`, true)
                .addField("Activity:", `${userstatus}`)
                .addField("Got warned:", `0 times`, true)
                .addField("Got kicked:", `0 times`, true)
                .addField("Got banned:", `0 times`, true)
                  .setFooter({ text: 'Dweeber >> UserInfo'});
                      
                      interaction.followUp({ embeds: [InfoEmbed] });
      
                  }
              })

            


        } catch (err) {

            interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)

        }

        
  
    }
}