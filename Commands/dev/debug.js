require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const signale = require('signale');
const { inspect } = require(`util`);
const { Type } = require("@anishshobith/deeptype");
const OverrideDB = require("../../Schema/OverrideSchema");

module.exports = {
    name: "debug",
    description: "Debug a code snippet",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "code",
            description: "The code you want to evaluate",
            type: 'STRING',
            required: true,
        },

    ],
	async run(client, interaction) {
		await interaction.deferReply();

        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

        const toEval = interaction.options.getString('code');


        try {

            OverrideDB.findOne({userID: interaction.user.id}, async(err, data) => {
                if(err) throw err;
                if(data) {

                    if (data.userID === interaction.user.id && data.Allowed == "1") {
                        let evaluated = inspect(eval(toEval, {
                            depth: 0
                        }))
            
                        if (!toEval) return interaction.followUp(`There is nothing for me to evaluate!`);

                        let hrDiff = process.hrtime(process.hrtime());

                        const tokenEmbed = new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle("Debug")
                        .setDescription(`Process run time: ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms | called by ${interaction.user.tag}`)
                        .addField(`Execution result:`, `\`\`\`` + `Aborted: Token is not allowed to be seen outside configuration file!`+ `\`\`\``)
                        .addField(`Reminder:`, `This is a privilege that we grant to you. So please don't abuse it.`)
                        .setFooter({ text: 'Dweeber >> debug'});
            
                        if (toEval.includes('client.token')) return interaction.followUp({ embeds: [tokenEmbed]});

                        const mentionEmbed = new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle("Debug")
                        .setDescription(`Process run time: ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms | called by ${interaction.user.tag}`)
                        .addField(`Execution result:`, `\`\`\`` + `Aborted: You are not allowed to mention everyone!`+ `\`\`\``)
                        .addField(`Reminder:`, `This is a privilege that we grant to you. So please don't abuse it.`)
                        .setFooter({ text: 'Dweeber >> debug'});

                        if (toEval.indexOf('@everyone')) return interaction.followUp({ embeds: [mentionEmbed]});
            
                        const evalEmbed = new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle(`Debug`)
                            .setDescription(`Process run time: ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms | called by ${interaction.user.tag}`)
                            .addField(`Execution result:`, `\`\`\`` + trim(`javascript\n${evaluated}\n`, 1018) + `\`\`\``)
                            .addField(`Reminder:`, `This is a privilege that we grant to you. So please don't abuse it.`)
                            .setFooter({ text: 'Dweeber >> debug'});
            
                        interaction.followUp({ embeds: [evalEmbed]})

                        const exeEmbed = new MessageEmbed()
                        .setColor("#FF0000")
                        .setTitle("Debug command execution")
                        .setDescription(`user ${interaction.user.tag} executed a command`)
                        .addField(`Execution code:`, `\`\`\`` + trim(toEval, 1024) + `\`\`\``)
                        .setFooter({ text: 'Dweeber >> debug'})

                        client.channels.cache.get('989310134423531561').send({embeds: [exeEmbed]})



                    } 
                }else {
                        const overridefailedEmbed = new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle("Access denied")
                        .setDescription(`Hello ${interaction.user}, you do not have access to this command.`)
                        .setFooter({ text: 'Dweeber >> debug'});

                        interaction.followUp({embeds: [overridefailedEmbed]});
                    }
 
                    
                })

          
        
        }   catch (err) {
                signale.fatal("[EVAL] " + err)
                interaction.followUp(`There is an error. Please try again later.`);
          } 


	
	}
};