const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const signale = require('signale');


module.exports = {
    name: "remindme",
    description: "Reminds you of something after a certain time",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
       
        {
            name: "time",
            description: "How long do you want me to remind you after?",
            type: 'INTEGER',
            required: true,
        },
        {
            name: "message",
            description: "What do you want me to remind you of?",
            type: 'STRING',
            required: true,
        },
        {
            name: "dm",
            description: "Do you want me to DM you the reminder?",
            type: "STRING",
            required: false,
            choices: [
                {
                    name: "Yes! (default)",
                    value: "yes"
                },
                {
                    name: "No.",
                    value: "no"
                }
            ]  
        }
    ],
	async run(client, interaction) {

        try {

            await interaction.deferReply();

            const timeinput = interaction.options.getInteger('time');
            const messageinput = interaction.options.getString('message');
            const dminput = interaction.options.getString('dm');
    
            const Target = interaction.member; 

            var msDelay = timeinput * 1000;

            const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

            function reminderfunctiondm() {
    
                    let reminderdm = new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(`**REMINDER from ${interaction.guild.name}:**`)
                        .setDescription(trim(`This is your reminder: \` ${messageinput} \``), 1024)
    
                    Target.send({embeds: [reminderdm]})
                }


                function reminderfunction() {
    
                    let reminder = new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(`This is your reminder:`)
                        .setDescription(trim(`This is your reminder: \` ${messageinput} \``), 1024)
                    interaction.channel.send({ content: `<@!${Target.id}>`, embeds: [reminder] })
                };


        if (dminput === "no") {
            let secEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Reminder set`)
            .setDescription(`Your reminder has been set. I will remind you in ` + `${timeinput}` + ` seconds in this channel. \`[ ${messageinput} ]\``)
            .setFooter(`You have toggled DMs false!`)

            interaction.followUp({embeds: [secEmbed]});
                    setTimeout(reminderfunction, msDelay);

        } else {
            let secEmbeddm = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Reminder set`)
            .setDescription(`Your reminder has been set. I will remind you in ` + `${timeinput}` + ` seconds in DM. \`[ ${messageinput} ]\``)
            .setFooter(`The default reminder will send to DM, want not to dm? Set dm option to false!`)

            interaction.followUp({embeds: [secEmbeddm]});
                    setTimeout(reminderfunctiondm, msDelay);
        }
            
        
        } catch (err) {
            interaction.followUp(`Your DM is not open but you have toggled DMs to true! Please open your DM and try again.`);
            signale.fatal(err)
        }



	}
};





    