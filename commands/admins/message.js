const { RichEmbed } = require("discord.js")
const Discord = require("discord.js");

module.exports = {
    config: {
        name: "message",
        description: "message user in DM",
        usage: "^2message [ID] [Message]",
        category: "admins",
        accessableby: "admins",
        aliases: ["sendmsg"]
    },
    run: async (bot, message, args) => {
        var embedColor = '#00FFFF' // color: cyan

        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("You have no permission to process this command!");

        let Message = args.slice(1).join(' ') // .slice(1) removes the user mention, .join(' ') joins all the words in the message, instead of just sending 1 word
        if(!Message) return message.reply("You havnt provide a message to be sent")

        let mentioned = message.mentions.members.first() || message.guild.members.get(args[0]); // Gets the user mentioned!

        let contact = new Discord.RichEmbed() //setup rich embed
            .setAuthor(message.author.username, message.author.avatarURL)
            .setColor(embedColor)
            .setTitle(`A message from ${message.guild.name}`)
            .addField('From user:', message.author.tag)
            .addField("Message:", Message)
            .setFooter("Memubot | by dchu096")
            .setTimestamp()

        mentioned.send(contact);


        let chanemb = new Discord.RichEmbed()
            .setColor(embedColor) // color: green
            .setDescription(`Message sent to ${mentioned.user.tag}`);

        message.channel.send(chanemb).then(msg => {msg.delete(5000)});


        message.delete().catch(O_o=>{});
    }

}