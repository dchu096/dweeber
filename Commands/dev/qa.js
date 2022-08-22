require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const signale = require('signale');
const OverrideDB = require("../../Schema/OverrideSchema");
const { Configuration, OpenAIApi } = require("openai");

module.exports = {
    name: "qa",
    description: "Ask the smart QA a question",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "question",
            description: "The question you want to ask",
            type: 'STRING',
            required: true,
        },

    ],
	async run(client, interaction) {
		await interaction.deferReply();

        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

        const inputquestion = interaction.options.getString('code');


        try {

            OverrideDB.findOne({userID: interaction.user.id}, async(err, data) => {
                if(err) throw err;
                if(data) {

                    if (data.userID === interaction.user.id && data.Allowed == "1") {

                        const response = await client.openai.createCompletion({
                            model: "text-davinci-002",
                            prompt: `${inputquestion}\n`,
                            temperature: 0,
                            max_tokens: 100,
                            top_p: 1,
                            frequency_penalty: 0.0,
                            presence_penalty: 0.0,
                            stop: ["\n"],
                          });

                          console.log(response)

                          interaction.followUp(`Please check console!`)
                       



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