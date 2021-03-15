const { ErelaClient, Utils } = require("erela.js");
const { nodes } = require("../../botconfig.json")

module.exports = bot => {
    console.log(`${bot.user.username} is online`);

    bot.levels = new Map()
        .set("none", 0.0)
        .set("low", 0.10)
        .set("medium", 0.15)
        .set("high", 0.25);

    let activities = [ `for rule breakers`, `prefix: ^2`, `^2help`], i = 0;

    setInterval(() => bot.user.setActivity(`${activities[i++ % activities.length]}`, { type: "WATCHING" }), 15000)

};