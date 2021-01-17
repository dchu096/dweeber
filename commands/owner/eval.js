const { inspect } = require("util");
const Discord = require("discord.js");

module.exports = { 
    config: {
        name: "eval",
        description: "Evaluates code",
        usage: "[code]",
        category: "owner",
        accessableby: "owner",
        aliases: ["evl"]
    },
    run: async (bot, message, args) => {
        let ownerid = "420839496263925767"
    if(message.author.id === ownerid) {
        //messages
        try {
            message.delete()
        } catch(e) {
            console.log(e); // [Error]
        }

        try {
            let toEval = args.join(" ")
			let evaluated = inspect(eval(toEval, { depth: 0 }));
            
            if (!toEval) {
                return message.channel.send(`Error while evaluating: \`air\``);
            } else {
                let hrStart = process.hrtime()
                let hrDiff;
                hrDiff = process.hrtime(hrStart);
                return message.channel.send(`*Executed  in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*\n\`\`\`javascript\n > ${evaluated}\n\`\`\``, { maxLength: 1900 })
            }
            
        } catch (e) {
            return message.channel.send(`Error while evaluating: \`${e.message}\``);
        }

      } else {
        let warningColor = '#FF0000' // color: red, change the hex for different color
        let deniedembed = new Discord.RichEmbed()
            .setTitle(`❌Error`)
            .setDescription(`This bot doesnt belong to you!`)
            .addField("required:", "bot developers", false)
            .setColor(warningColor)
        return message.reply(deniedembed).then(msg => msg.delete(10000)).then(() =>
            console.log(`${message.author.username} have been trying to access command eval`));
      }
    }
}