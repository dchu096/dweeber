require('module-alias/register')
const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
const {Signale} = require('signale');
const { trackerAPI } = require("@root/botconfig.json")
module.exports = {
    config: {
        name: "fortnite",
        description: "Fetch fortnite stats from a user",
        usage: "",
        category: "game",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {

        const embedColor = '#87CEEB'; // color: skyblue
        const signale = new Signale();

        const platform = args[0];
        const epic = args[1];


         await fetch(`https://api.fortnitetracker.com/v1/profile/${platform}/${epic}`,{
        method: 'GET',
        headers: {'TRN-Api-Key': `${trackerAPI}`}
        }).then(res => res.json()).then(json => {
            console.log(json)
            message.channel.send("Information have been logged to console!")
        });

       

    }

}
