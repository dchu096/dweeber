const Discord = require("discord.js");

module.exports = {
    config: {
        name: "unmute",
        description: "Unmutes a member in the discord!",
        usage: "^2unmute <user> <reason>",
        category: "moderation",
        accessableby: "Moderators",
        aliases: ["unm", "speak"]
    },
    run: async (bot, message, args) => {
        let embedColor = '#00ff00' // color: green, change the hex for different color
// check if the command caller has permission to use the command
if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You dont have permission to use this command.");

if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to add roles!")

//define the reason and unmutee
let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!mutee) return message.channel.send("Please supply a user to be unmuted!");

let reason = args.slice(1).join(" ");
if(!reason) reason = "No reason given!"

//define mute role and if the mute role doesnt exist then send a message
let muterole = message.guild.roles.find(r => r.name === "Muted")
if(!muterole) return message.channel.send("There is no mute role to remove!")

        message.delete()

//remove role to the mentioned user and also send the user a dm explaing where and why they were unmuted
        let unmuteembed = new Discord.RichEmbed()
            .setColor(embedColor)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`You've been unmuted in ${message.guild.name}`)
            .addField('unmuted by', message.author.tag)
            .addField('Reason', reason)
            .setTimestamp();
        mutee.send(unmuteembed).then(() =>
mutee.removeRole(muterole.id)).catch(err => console.log(err));

        let successfullyembed = new Discord.RichEmbed()
            .setDescription(`${mutee.user.tag} has been unmuted.`)
            .setColor(embedColor);

    message.channel.send(successfullyembed)


    }
}