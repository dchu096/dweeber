const Discord = require("discord.js")


module.exports = bot => {


    console.log(`${bot.user.username} is online`)
    //bot.user.setActivity("F# | by dchu096", {type: "WATCHING"});

    let statuses = [
    `${bot.guilds.size}`,
        `F#help`,
            `over ${bot.users.size} users`
        ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];

        bot.user.setActivity(status, {type: "LISTENING"});
    }, 30000)

}