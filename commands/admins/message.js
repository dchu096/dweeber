const Discord = require("discord.js");

module.exports = {
    config: {
        name: "message",
        description: "message user in DM",
        usage: "^2message [ID] [Message]",
        category: "admins",
        accessableby: "admins",
        aliases: ["sendmessage", "messageuser"]
    },
    run: async (bot, message, args) => {
        const embedColor = '#87ceeb';
        const warningColor = '#ff0000';
        const okColor = '#00ff00';

        //messages

        let userMsg = args.slice(1).join(' ') // .slice(1) removes the user mention, .join(' ') joins all the words in the message, instead of just sending 1 word
        if(!userMsg) return message.reply("You havnt provide a message to be sent")

        if(!message.member.hasPermission('ADMINISTRATOR')) {
            const nopermembed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("Missing Administrator permission")
                .addField("required:", "ADMINISTRATOR permission", false)
                .setColor(warningColor)
            return message.channel.send(nopermembed).then(msg => msg.delete({ timeout: 5000 }));
        }

        let userarguments= args.slice(1).join(' ') // .slice(1) removes the user mention, .join(' ') joins all the words in the message, instead of just sending 1 word
        if(!userarguments) return message.reply("You didnt provide a message to be sent")

        let mentioned = message.mentions.members.first() || message.guild.members.cache.get(args[0]); // Gets the user mentioned!

        let contact = new Discord.MessageEmbed() //setup rich embed
            .setAuthor(message.author.username, message.author.avatarURL())
            .setColor(embedColor)
            .setTitle(`A message from ${message.guild.name}`)
            .addField('From user:', message.author.tag)
            .addField("Message:", userMsg)
            .setTimestamp()

        mentioned.send(contact)


        let doneembed = new Discord.MessageEmbed()
            .setColor(okColor)
            .setDescription(`Message sent to ${mentioned.user.tag}`);

        message.channel.send(doneembed).then(msg => msg.delete({ timeout: 5000 }));
    }

}