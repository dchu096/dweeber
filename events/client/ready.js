const { ErelaClient, Utils } = require("erela.js");
const { nodes } = require("../../botconfig.json")

module.exports = bot => {
console.log(`====================================================================================`)
console.log(`    :::::::::  :::       ::: :::::::::: :::::::::: :::::::::  :::::::::: :::::::::  `)
console.log(`    :+:    :+: :+:       :+: :+:        :+:        :+:    :+: :+:        :+:    :+: `)
console.log(`   +:+    +:+ +:+       +:+ +:+        +:+        +:+    +:+ +:+        +:+    +:+  `)
console.log(`  +#+    +:+ +#+  +:+  +#+ +#++:++#   +#++:++#   +#++:++#+  +#++:++#   +#++:++#:    `)
console.log(` +#+    +#+ +#+ +#+#+ +#+ +#+        +#+        +#+    +#+ +#+        +#+    +#+    `)
console.log(`#+#    #+#  #+#+# #+#+#  #+#        #+#        #+#    #+# #+#        #+#    #+#     `)
console.log(`#########    ###   ###   ########## ########## #########  ########## ###    ###     `)
console.log(`====================================================================================`)

console.log(`Authenticating with Discord gateway, please wait`)

console.log(`${bot.user.username} is online, if theres any error message it will be below this message`)
console.log(`====================================================================================`)

    bot.levels = new Map()
        .set("none", 0.0)
        .set("low", 0.10)
        .set("medium", 0.15)
        .set("high", 0.25);

    let activities = [ `Memu Discord | ^2`, `DM for mods`], i = 0;

    setInterval(() => bot.user.setActivity(`${activities[i++ % activities.length]}`, { type: "WATCHING" }), 15000)

};