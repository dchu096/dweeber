const { MessageEmbed } = require('discord.js');
const { Configuration, OpenAIApi } = require("openai");
const signale = require('signale');
const fetch = require('node-fetch');
const { Headers } = fetch;

module.exports = {
    name: "ask",
    description: "Ask a question to the bot",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "question",
            description: "What would you like to ask?",
            type: 'STRING',
            required: true,
        },
    ],
	async run(client, interaction) {

        await interaction.deferReply();

        if (interaction.guild.id !== "958317326585987112") return interaction.followUp(`This command is currently only available in the Dweeber Support server.`);

        const inputquestion = interaction.options.getString('question');

        try {

            var myHeaders = new Headers();
        myHeaders.append("apikey", "lKx0E2oM8cOXN5VdW6X9cr1s2wUwFKE5");

        var raw = inputquestion;

        var requestOptions = {
            method: 'POST',
            redirect: 'follow',
            headers: myHeaders,
            body: raw
        };

        fetch("https://api.apilayer.com/bad_words?censor_character=", requestOptions).then(json => {

        console.log(json)
    })

            async function ask(prompt) {
                const response = await client.openai.createCompletion({
                    model: "text-davinci-002",
                    prompt,
                    temperature: 0.7,
                    max_tokens: 256,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                });
            const answer = response.data.choices[0].text;

            const qaEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Dweeber AI ASK: ${inputquestion}`)
        .setDescription(answer)
        .setFooter({ text: 'Dweeber >> Ask'});

        interaction.followUp({ embeds: [qaEmbed] });
            }
            //Ask an example question
            ask(inputquestion);


      
            
            
        

        

    } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
    }





	}
};