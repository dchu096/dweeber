const Discord = require("discord.js");

module.exports = {
    config: {
        name: "requirements",
        description: "Shows the minimum requirements for memu",
        usage: " ",
        category: "Memu",
        accessableby: "Memu Members"
    },
    run: async (bot, message, args) => {
        const channelID = '786692269478641714'
        const embedColor = '#87CEEB'
        const warningColor = '#ff0000';

        // MESSAGES

        if(message.channel.id === channelID) {

            const requirementsembed = new Discord.MessageEmbed()
                .setTitle("Memu Emulator requirements")
                .setDescription("requirements to use Memu emulator")
                .setColor(embedColor)
                .addField("Minimum Requirements", "CPU: 2 cores x86/x86_64 Processor (Intel or AMD CPU)\n" +
                    "OS: Win8 / Win10 (Not recommended to run on Server/Enterprise/deprecated OS )\n" +
                    "Graphics: intel HD graphics with Latest DirectX 11 (prefer 12) / Graphics driver with OpenGL 2.0\n" +
                    "VT: Hardware Virtualization Technology (Intel VT-x/AMD-V) shall be enabled in BIOS\n" +
                    "RAM: 2GB of RAM (32bit / x86) / 4GB of RAM (64bit / x64)\n" +
                    "Storage: (HDD) 5GB of free space available\n" +
                    "Network: usable Data/broadband connection ", false)
                .addField("Recommended Requirements", "CPU: 64bit processor with Single Thread PassMark score > 1500 (Intel/AMD Multi-Core). (4 cores or more preferred)\n" +
                    "OS: Win10 x64\n" +
                    "Graphics: (integrated) IntelHD (iris plus 655 and higher) / Radeon (R7 and higher) (Discrete) Nvidia (GTX460 or higher) /ATI(radeon HD 7850M and higher) with PassMark score > 750 with latest Windows DirectX 11 / Graphics driver with OpenGL 4.5 or higher.\n" +
                    "VT: Hardware Virtualization Technology (Intel VT-x/AMD-V) must be enabled in BIOS\n" +
                    "RAM: 8GB or higher\n" +
                    "Storage: (SSD), 10GB of hard disk free space\n" +
                    "Network: Broadband connection with low latency for FPS games", false)
                .setFooter("If your system dont meet these requires,we cannot guarantee MEmu will run well on your system")
            await message.channel.send(requirementsembed).catch(O_o => {});
        } else {
            let wrongChannelEmbed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("Wrong channel")
                .addField("required:", "<#786692269478641714>", false)
                .setColor(warningColor)
            return message.channel.send(wrongChannelEmbed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {});
        }

        }
    }