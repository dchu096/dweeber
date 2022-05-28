const { ErelaClient, Utils } = require("erela.js");
const { status } = require("../../botconfig.json");

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

    bot.user.setPresence({
        status: "online",  // You can show online, idle... Do not disturb is dnd
        game: {
            name: "status",  // The message shown
            type: "WATCHING" // PLAYING, WATCHING, LISTENING, STREAMING,
        }
    });


};