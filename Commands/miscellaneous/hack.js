const { MessageEmbed } = require("discord.js");
const { randomPassword, randomNumber, ipAddress } = require('tech-tip-cyber') // npm i tech-tip-cyber@latest // For Random Age, Password And IP Address
const randomMail = require('tech-tip-cyber') // npm i tech-tip-cyber@latest // For Random Email
const signale = require('signale');

module.exports = {
    name: "hack",
    description: "Hack a user",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "user",
            description: "The user to hack",
            type: 'USER',
            required: false,
        },
    ],
    run: async(client, interaction, args) => {

        await interaction.deferReply();

        const Target = interaction.options.getMember("user") || interaction.member; 

        if (Target.user.bot) {
            return interaction.followUp("You can't hack bots!")
        }

        const disemail = randomMail({ // Random Email For Discord Email
            domain: 'gmail.com' // You Can Keep Any Domain
        })

        const email = randomMail({ // Random Email For Gmail
            domain: 'gmail.com' // You Can Keep Any Domain
        })

        const dispassword = randomPassword(12) // Length Is 12 Of Password // Password For Discord

        const password = randomPassword(12) // Length Is 12 Of Password // Password For Gmail


        try {

       

        interaction.followUp(`Starting To Hack ${Target.user.username}`).then(message => { // Edit Message
            setTimeout(function () {
                message.edit(`[▓▓▓                             ] <a:clispinnerline:991176720268935221> Fetching token of ${Target.user.username}...`)
            }, 2000)
            setTimeout(function () {
                message.edit(`[▓▓▓▓▓▓▓                         ] <a:clispinnerline:991176720268935221> Logging In To Discord Account of ${Target.user.username} via token. 2FA bypassed`)
            }, 5000)
            setTimeout(function () {
                message.edit(`[▓▓▓▓▓▓▓▓▓▓▓▓                    ] <a:clispinnerline:991176720268935221> Logged In To Discord Of ${Target.user.username} and created backdoor\nEmail: ${disemail}\nPassword: ${dispassword}`)
            }, 8000)
            setTimeout(function () {
                message.edit(`[▓▓▓▓▓▓▓▓▓▓▓▓▓▓                  ] <a:clispinnerline:991176720268935221> Injecting Virus In #${Target.user.discriminator}`)
            }, 11000)
            setTimeout(function () {
                message.edit(`[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓               ] <a:clispinnerline:991176720268935221> Successfully Injected Virus In #${Target.user.discriminator}`)
            }, 15000)
            setTimeout(function () {
                message.edit(`[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓            ] <a:clispinnerline:991176720268935221> Attempting to connecting to gmail database and bruteforce ${Target.user.username}'s gmail account...`)
            }, 18000)
            setTimeout(function () {
                message.edit(`[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓          ] <a:clispinnerline:991176720268935221> Hacking Gmail Account... Getting Password`)
            }, 22000)
            setTimeout(function () {
                message.edit(`[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓       ] <a:clispinnerline:991176720268935221> Hacked Gmail Account Of ${Target.user.username} \nEmail: ${email}\nPassword: ${password}`)
            }, 26000)
            setTimeout(function () {
                message.edit(`[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    ] <a:clispinnerline:991176720268935221> Attempting to download every email and zipping all data...`)
            }, 30000)
            setTimeout(function () {
                message.edit(`[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] <a:clispinnerline:991176720268935221> Submitting data to FBI...`)
            }, 35000)
            setTimeout(function () {
                message.edit(`[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] <a:clispinnerline:991176720268935221> Reporting to discord for Terms and Condition breach...`)
            }, 40000)
            setTimeout(function () {
                message.edit(`<a:tick:991178421113733130> finished hacking ${Target.user.username}`)
            }, 44000)
        })

    } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.error(err)
    }
}
}