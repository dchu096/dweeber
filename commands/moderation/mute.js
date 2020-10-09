const { RichEmbed } = require("discord.js")
const Discord = require("discord.js");

module.exports = {
    config: {
        name: "mute",
        description: "Mute a member in the dserver!",
        usage: "^2mute <user> <reason>",
        category: "moderation",
        accessableby: "Members",
        aliases: ["m", "nospeak"]
    },
    run: async (bot, message, args) => {
        let embedColor = '#514f48' // color: grey, change the hex for different color
// check if the command caller has permission to use the command
if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You dont have permission to use this command.");

if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to add roles!")

//define the reason and mutee
let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!mutee) return message.channel.send("Please provide a user to be muted!");

let reason = args.slice(1).join(" ");
if(!reason) reason = "No reason given!"

//define mute role and if the mute role doesnt exist then create one
let muterole = message.guild.roles.find(r => r.name === "Muted")
if(!muterole) {
    try{
        muterole = await message.guild.createRole({
            name: "Muted",
            color: "#514f48",
            permissions: []
        })
        message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                SEND_TTS_MESSAGES: false,
                ATTACH_FILES: false,
                SPEAK: false
            })
        })
    } catch(e) {
        console.log(e.stack);
    }
}

//add role to the mentioned user and also send the user a dm explaining where and why they were muted
        let muteembed = new Discord.RichEmbed()
            .setColor(embedColor)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`You've been muted in ${message.guild.name}`)
            .addField('Muted by', message.author.tag)
            .addField('Reason', reason)
            .setTimestamp();
        mutee.send(muteembed).then(() =>
            mutee.addRole(muterole.id)).catch(err => console.log(err));

        let successfullyembed = new Discord.RichEmbed()
            .setDescription(`${mutee.user.tag} has been muted.`)
            .setColor(embedColor);

        message.channel.send(successfullyembed);
    }
}

