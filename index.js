const { Client, Collection } = require("discord.js");
const { token } = require("./botconfig.json");
const bot = new Client();
const nodes = [{
    host: "localhost",
    port: 2333,
    password: "",
}];

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));


bot.on("message", async message => {
    if (message.channel.id === '623482922942332933') {
        if (message.content.includes('stuck')) {
            message.reply('Hi! Please check this post: https://www.memuplay.com/blog/2016/03/01/how-to-solve-start-failure/, ' +
                'if you follow the instructions and the problem persists, please go to <#623482968765104160> and post there.')
        }
        if (message.content.includes('requirements')) {
            message.reply('Hi! Please check this post: https://www.memuplay.com/blog/index.php/2016/01/27/system-requirements/,' +
                'if you follow the instructions and the problem persists, please go to <#623482968765104160> and post there..')
        }
        if (message.content.includes('keymapping')) {
            message.reply('Hi! Please check this post: https://www.memuplay.com/blog/2019/08/28/keymapping-and-joystick-setup/, ' +
                'if you follow the instructions and the problem persists, please go to <#623482968765104160> and post there.')
        }
        if (message.content.includes('gamepad')) {
            message.reply('Hi! Please check this post: https://www.memuplay.com/blog/2019/08/28/keymapping-and-joystick-setup/, ' +
                'if you follow the instructions and the problem persists, please go to <#623482968765104160> and post there.')
        }
        if (message.content.includes('backup')) {
            message.reply('Hi! Please check this post: https://www.memuplay.com/blog/2016/01/27/restore-user-data/, ' +
                'if you follow the instructions and the problem persists, please go to <#623482968765104160> and post there.')
        }
        if (message.content.includes('recover')) {
            message.reply('Hi! Please check this post: https://www.memuplay.com/blog/2019/08/29/how-to-recover-broken-vms-and-data-in-memu/, ' +
                'if you follow the instructions and the problem persists, please go to <#623482968765104160> and post there.')
        }
        if (message.content.includes('restore')) {
            message.reply('Hi! Please check this post: https://www.memuplay.com/blog/2019/08/29/how-to-recover-broken-vms-and-data-in-memu/, ' +
                'if you follow the instructions and the problem persists, please go to <#623482968765104160> and post there.')
        }
        if (message.content.includes('restore')) {
            message.reply('Hi! Please check this post: https://www.memuplay.com/blog/2019/08/29/how-to-recover-broken-vms-and-data-in-memu/, ' +
                'if you follow the instructions and the problem persists, please go to <#623482968765104160> and post there.')
        }
        if (message.content.includes('install')) {
            message.reply('Hi! Please check this post: https://www.memuplay.com/blog/2019/08/29/how-to-solve-installation-failure-2/, ' +
                'if you follow the instructions and the problem persists, please go to <#623482968765104160> and post there.')
        }
        if (message.content.includes('graphics')) {
            message.reply('Hi! Please check this post: https://www.memuplay.com/blog/2016/11/15/how-to-update-graphic-driver/, ' +
                'if you follow the instructions and the problem persists, please go to <#623482968765104160> and post there.')
        }
        if (message.content.includes('mac')) {
            message.reply('Unfortunately, we cannot offer the Mac version of MEmu now. So please keep in touch with us and stay following us on Discord!')
        }
        if (message.content.includes('linux')) {
            message.reply('Hi! Unfortunately, we cannot offer the Linux version of MEmu now. So please keep in touch with us and stay following us on Discord!')
        }
        if (message.content.includes('64bit')) {
            message.reply('Hi! the 64 bit MEmu is still under development. We need a few more months to finish it.')
        }
        if (message.content.includes('x64')) {
            message.reply('Hi! the 64 bit MEmu is still under development. We need a few more months to finish it.')
        }
        if (message.content.includes('Pokemon GO')) {
            message.reply('Hi! the game is prohibited from playing on emulators.')
        }
        if (message.content.includes('fortnite')) {
            message.reply('Hi!the game needs 64 bit Android and we are still developing it. It will be available in a few months.')
        }
        if (message.content.includes('hero hunters')) {
            message.reply('Hi!the game needs 64 bit Android and we are still developing it. It will be available in a few months.')
        }
        if (message.content.includes('elder scrolls')) {
            message.reply('Hi!the game needs 64 bit Android and we are still developing it. It will be available in a few months.')
        }
        if (message.content.includes('freeze')) {
            message.reply('Hello! here is the way to solve poor performance: https://www.memuplay.com/blog/2019/08/29/solutions-of-bad-performance-and-blue-screen-problem/,' +
                ' if you still feel lag after following the steps, please go to <#623482968765104160> for help.' +
                'recommended reuqirements:' +
                '```' +
                'Total ram\n' +
                '4gb: set memu to use 3gb (3096mb)\n' +
                '6gb and over: set memu to use 4gb' +
                '```')
        }
        if (message.content.includes('facebook')) {
            message.reply('Hi!Please follow this post: https://www.memuplay.com/blog/2016/04/27/how-to-get-facebook-working/')
        }
        if (message.content.includes('call of duty')) {
            message.reply('Hi!Please check the FAQs of Call of Duty here! https://www.memuplay.com/blog/call-of-duty-mobile-faq.html')
        }
        if (message.content.includes('update')) {
            message.reply('Hi! Please check this post: https://www.memuplay.com/blog/index.php/2016/02/04/how-to-upgrade-memu/, ' +
                'if you follow the instructions and the problem persists, please go to <#623482968765104160> and post there.')
        }
    }
})



bot.login(token);
