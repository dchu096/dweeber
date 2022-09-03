const { MessageEmbed } = require('discord.js');
const { Configuration, OpenAIApi } = require("openai");
const signale = require('signale');

module.exports = {
    name: "horrorstory",
    description: "Ask a question to the bot",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "topic",
            description: "What would you like to ask?",
            type: 'STRING',
            required: true,
        },
    ],
	async run(client, interaction) {

        await interaction.deferReply();

        if (interaction.guild.id !== "958317326585987112") return interaction.followUp(`This command is currently only available in the Dweeber Support server.`);

        try {

        const inputtopic = interaction.options.getString('topic');



        async function generate(iprompt) {
            const response = await client.openai.createCompletion({
                model: "text-davinci-002",
                prompt: "Topic: " + iprompt,
                temperature: 0.8,
                max_tokens: 60,
                top_p: 1.0,
                frequency_penalty: 0.5,
                presence_penalty: 0.0,
            });
        const answer = response.data.choices[0].text;

        const horrorEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Dweeber AI Generate Horror: ${inputtopic}`)
        .setDescription(answer)
        .addFields({ name: 'Note', value: 'Due to the expensive fee of OpenAI **Please __AVOID__ spamming!**' })
        .setFooter({ text: 'Dweeber >> horrorstory'});

        interaction.followUp({ embeds: [horrorEmbed] });
        }
        
        //Ask an example question
        generate(inputtopic);

    } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
    }





	}
};