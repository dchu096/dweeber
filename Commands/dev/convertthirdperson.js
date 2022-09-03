const { MessageEmbed } = require('discord.js');
const { Configuration, OpenAIApi } = require("openai");
const signale = require('signale');

module.exports = {
    name: "convertthirdperson",
    description: "Convert a first person sentence to a third person sentence",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "sentence",
            description: "What would you like to convert?",
            type: 'STRING',
            required: true,
        },
        {
            name: "gender",
            description: "The gender of the person you are converting this sentence to",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "male",
                    value: "male"
                },
                {
                    name: "female",
                    value: "female"
                }
            ]  
        }, 
    ],
	async run(client, interaction) {

        await interaction.deferReply();

        if (interaction.guild.id !== "958317326585987112") return interaction.followUp(`This command is currently only available in the Dweeber Support server.`);

        try {

        const inputstring = interaction.options.getString('sentence');
        const inputgender = interaction.options.getString('gender');


        async function generate(iprompt) {
            const response = await client.openai.createCompletion({
                model: "text-davinci-002",
                prompt: `Convert this from first-person to third person (gender ${inputgender}): ` + iprompt,
                temperature: 0,
                max_tokens: 60,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            });
        const answer = response.data.choices[0].text;

        const thirdpersonEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Dweeber AI Convert to 3rd person: ${inputstring}`)
        .setDescription(answer)
        .addFields({ name: 'Note', value: 'Due to the expensive fee of OpenAI **Please __AVOID__ spamming!**' })
        .setFooter({ text: 'Dweeber >> convertthirdperson'});

        interaction.followUp({ embeds: [thirdpersonEmbed] });
        }
        
        //Ask an example question
        generate(inputstring);

    } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
    }





	}
};