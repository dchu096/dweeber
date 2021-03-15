const { prefix } = require("../../botconfig.json");

module.exports = async (bot, message) => {

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

}