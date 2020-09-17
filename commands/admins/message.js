const { RichEmbed } = require("discord.js")
const Discord = require("discord.js");

module.exports = {
    config: {
        name: "message",
        description: "message user in DM",
        usage: "^2message <ID> <Message>",
        category: "admins",
        accessableby: "admins",
        aliases: ["send"]
    },
    run: async (bot, message, args) => {
        var embedColor = '#00FFFF' // color: cyan

        let Owner = message.author;
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("You have no permission to process this command!");

        const id = args.shift();
        const sayMessage = args.join(" ")
        if(!sayMessage) return message.reply("Usage `^2messgae <user>  <your message>`")

        let mentioned = message.mentions.members.first() || message.guild.members.get(args[0]); // Gets the user mentioned!

        let contact = new Discord.RichEmbed() //setup rich embed
            .setAuthor(Owner.username)
            .setColor("embedColor")
            .setTitle(`A message from ${message.guild.name}`)
            .addField("Response:", sayMessage)
            .setTimestamp()

        mentioned.send(contact);

        let chanemb = new Discord.RichEmbed()
            .setColor("#00ff00")
            .setDescription(`Message sent to ${mentioned.user.tag}`);

        message.channel.send(chanemb).then(msg => {msg.delete(5000)});


        message.delete().catch(O_o=>{});
    }

}