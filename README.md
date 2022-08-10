# Dweeber < / slash commands>

✅ This branch is actively maintained and updated

**Please consider putting a ⭐ on this repo. It helps!!**

![](readmefiles/dweeber-half.jpg)

# Status

![](https://img.shields.io/github/issues/dchu096/dweeber) | ![](https://img.shields.io/github/forks/dchu096/dweeber) | ![](https://img.shields.io/github/stars/dchu096/dweeber) | ![](https://img.shields.io/github/license/dchu096/dweeber) 

![Discord Banner 2](https://discordapp.com/api/guilds/958317326585987112/widget.png?style=banner2)


# About Dweeber


Dweeber is a discord bot built with features in mind, helping you build, moderate, entertain your server.

The main features of this bot:


> Detailed Moderation: We included detailed moderation system for you to bring to your server. Not just a kick and ban like some discord bot but a full warning system [WIP]



> Advanced Entertaining: Dweeber are packed with advanced music features including the most basic play, pause, skip command and more advanced volume and a non-laggy music experience into your server for absolutely no cost



> Easy Dashboard: Dweeber will be provided with a useable, decent-looking dashboard to manage/view your current queue. [WIP]



> Mini Games: To help engaging your server member dweeber is also packed with some mini-games such as Would you Rather and guess the number.



> Economy: Dweeber has an economy system to also maintain your server's engagement rate. [WIP]


Bot informations:

invite: https://discord.com/api/oauth2/authorize?client_id=984042951107821648&permissions=1532228922615&redirect_uri=https%3A%2F%2Fpanel.dweeber.dev%3A8443%2Fcallback&scope=bot%20applications.commands

Permission: 1532228922615

Bot library: discord.js v13

# Credits

Thankyou for [@behold](https://github.com/BeholdIsLost), [@mira](https://github.com/MiraBellierr) for helping out with the bot bugs

Dashboard are forked and edited from [@Tomato](https://github.com/Tomato6966)

API used:

https://api.nasa.gov/
https://tracker.gg/developers
https://www.weatherapi.com/
https://some-random-api.ml/
https://developer.musixmatch.com/
https://serpapi.com/
https://openai.com/api/


# Self-hosting??

If you would like to self host this bot please following the following instructions:

# Download this code 

![image](https://user-images.githubusercontent.com/39256422/183834055-6dccccbe-c92c-4026-80a1-13dcf7f86549.png)

# Delete folder "Readme files"

![image](https://user-images.githubusercontent.com/39256422/183834271-cb1ff333-7d56-40d3-9e02-8c2ed6d2d177.png)


# Open config.json and edit the details

```

{
    "TOKEN": "", // Your bot token, obtain it from https://discord.com/developers/applications
    "OwnerID": "", // Your ID. open dev option and copy your ID on discord
    "NASAAPI": "", // API for NASA, obtain from https://api.nasa.gov/
    "TRACKERAPI": "", // API for tracker Network, obtain from https://tracker.gg/developers
    "WeatherAPI": "", // API for weather command, obtain from https://www.weatherapi.com/
    "SRAAPI": "", // API for images, some should be optional but strongly recommended. get from https://some-random-api.ml/. Free version will have a watermark tho.
    "musicAPI": "", // Lyrics API, obtain from https://developer.musixmatch.com/
    "FORTNITEAPI": "", // Same as trackerAPI.
    "SERPAPI": "", //Play store search API. get from https://serpapi.com/
    "OPENAIKEY": "", //OpenAI key. get from https://openai.com/api/
    "youtubeCookie": "", // Optional but if you want just look up guides on google
    "spotify_api": {
        "enabled": true, // Please leave it true if you want able to fetch songs from spotify and play it
        "clientSecret": "", // https://developer.spotify.com/
        "clientId": "" // https://developer.spotify.com/
  },
    "MONGOURL": "" // Your mongo connection sting. https://www.mongodb.com/
}
```

# Open terminal and do `npm install` or `yarn install`

![image](https://user-images.githubusercontent.com/39256422/183834633-0297ca5c-fb7f-4690-9546-713942ac848e.png)


# Run the bot by doing node shard.js

![image](https://user-images.githubusercontent.com/39256422/183834684-23a939e9-4774-4d5c-a820-007b5d622ad3.png)

# What i recommend to host bots.

⚠️ **Strongly recommended NOT to use**

Any online search of "free hosting" or "free discord bot hosting". Usually pterodactyl dont give you the port for 8443 and changing that will mean you lose ssl!

**Heroku** have a low usuage limit unless you pay! And they have poor hardware so running a music bot on them means you might encounter serious lag!

**Glitch** hibernates your server after a limit of time and they have poor performance.

**Replit** are ok but still complex to setup and make it run.

✅ **Useable solution**

**Digital ocean** will gives you 50 dollar credit if you have github student and they offer decent performance.

**Google** will offer a 300 dollar credit but use them only if you dont mind having a no dashboard or know how to tweak with firewalls.

**Home PC / raspberry PI** are great if you only using this as a test project / only for yourself unless you want to keep your PC 24/7 on.


✅ **Ideal solution** [AD]

**Hosturly** is a good VPS provider with I9 cpu. I host on them and have literally no issue since then. Would recommended to use them!

