const Discord = require("discord.js")
const {MessageEmbed} = require("discord.js");
const {embed} = require("discord.js")
const { Menu } = require('discord.js-menu')
const { prefix } = require("../../botconfig.json");
const { readdirSync } = require("fs")
const { stripIndents } = require("common-tags")
const { cyan } = require("../../colours.json")

module.exports= {
    config: {
        name: "help",
        description: "Help Menu",
        usage: "^2help",
        category: "info",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {

        /*
           * The menu class takes 4 parameters.
           * 1) A channel to send the menu to
           * 2) A user ID to give control over the navigation,
           * 3) An array of Page objects, each being a unique page of the menu
           * 4) How long, in milliseconds, you want the menu to wait for new reactions
           */
        if (!args[0]) {
            let helpMenu = new Menu(message.channel, message.author.id, [
                {
                    /*
                     * A page object consists of three items:
                     * 1) A name. This is used as a unique destination name for reactions.
                     * 2) Some content. This is a rich embed.
                     * You can use {object: formatting} or .functionFormatting() for embeds. Whichever you prefer.
                     * 3) A set of reactions, linked to either a page destination or a function.* (See example pages)
                     *
                     * Reactions can be emojis or custom emote IDs, and reaction destinations can be either the names
                     * of pages, () => { functions }, or special destination names. See below for a list of these.
                     */

                    /* You can call pages whatever you like. The first in the array is always loaded first. */
                    name: 'main',
                    content: new MessageEmbed({
                        title: 'Help Menu',
                        description: 'Welcome To Memubot!!',
                        fields: [
                            {
                                name: "Navigating",
                                value: "Use the left and right arrow",
                                inline: true
                            }
                        ]
                    }),
                    reactions: {
                        '➡️': 'infos',
                        '❌': 'delete',
                    }
                },


                {
                    name: 'infos',
                    content: new MessageEmbed({
                        title: 'Info',
                        description: 'Info Commands',
                        fields: [
                            {
                                name: 'help',
                                value: 'shows the help command',
                                inline: false
                            },

                            {
                                name: "About",
                                value: 'Shows the current info about the bot',
                                inline: false
                            },

                            {
                                name: "getid",
                                value: 'Shows your current/other uses discord ID',
                                inline: false
                            },

                            {
                                name: 'serverinfo',
                                value: 'shows information about your current server',
                                inline: false
                            },

                            {
                                name: 'userinfo',
                                value: 'shows information about you',
                                inline: false
                            },

                            {
                                name: 'stats',
                                value: 'shows information about current hosting server',
                                inline: false
                            }
                        ]

                    }),
                    reactions: {
                        '⬅️': 'main',
                        '➡️': 'channels',
                        '❌': 'delete',
                    }
                },


                {
                    name: 'channels',
                    content: new MessageEmbed({
                        title: 'Channels',
                        description: 'Channels command || require manage_channel',
                        fields: [

                            {
                                name: 'lock',
                                value: 'lock a channel',
                                inline: false
                            },

                            {
                                name: 'unlock',
                                value: 'unlock a channel',
                                inline: false
                            },

                            {
                                name: 'slowmode',
                                value: 'set a slowmode to a channel',
                                inline: false
                            }

                        ]
                    }),
                    reactions: {
                        '⬅️': 'infos',
                        '➡️': 'roles',
                        '❌': 'delete',
                    }
                },

                {
                    name: 'roles',
                    content: new MessageEmbed({
                        title: 'roles',
                        description: 'Roles Commands || need manage_roles',
                        fields: [
                            {
                                name: 'addrole',
                                value: 'Add a role to a specific user',
                                inline: false
                            },

                            {
                                name: "removerole",
                                value: 'Remove a role from a specific user',
                                inline: false
                            }
                        ]

                    }),
                    reactions: {
                        '⬅️': 'channels',
                        '➡️': 'moderations',
                        '❌': 'delete',
                    }
                },


                {
                    name: 'moderations',
                    content: new MessageEmbed({
                        title: 'Moderations',
                        description: 'Roles Commands || need kick_members, ban_members, manage_messages, manage_roles, manage_nicknames',
                        fields: [
                            {
                                name: 'ban',
                                value: 'Ban a specfic user',
                                inline: false
                            },

                            {
                                name: "kick",
                                value: 'kick a specific user',
                                inline: false
                            },

                            {
                                name: 'mute',
                                value: 'Mute a specific user',
                                inline: false
                            },

                            {
                                name: 'tempmute',
                                value: 'mute user for a specific time',
                                inline: false
                            },

                            {
                                name: 'unmute',
                                value: 'unmute a specific user',
                                inline: false
                            },

                            {
                                name: 'warn',
                                value: 'warn a specific user',
                                inline: false
                            },

                            {
                                name: 'warnings',
                                value: 'shows warnings of a specific user',
                                inline: false
                            },

                            {
                                name: 'setnick',
                                value: 'set a nickname of a specific user',
                                inline: false
                            },

                            {
                                name: 'clearwarnings',
                                value: 'clear a user total warning',
                                inline: false
                            }

                        ]

                    }),
                    reactions: {
                        '⬅️': 'roles',
                        '➡️': 'others',
                        '❌': 'delete',
                    }
                },

                {
                    name: 'others',
                    content: new MessageEmbed({
                        title: 'roles',
                        description: 'Roles Commands',
                        fields: [
                            {
                                name: 'ping',
                                value: 'Shows the ping',
                                inline: false
                            },

                            {
                                name: "say",
                                value: 'let the bot returns what you say.',
                                inline: false
                            }
                        ]

                    }),
                    reactions: {
                        '⬅️': 'moderations',
                        '➡️': 'special',
                        '❌': 'delete',
                    }
                },


                {
                    name: 'special',
                    content: new MessageEmbed({
                        title: 'special',
                        description: 'special Commands || need administrator',
                        fields: [
                            {
                                name: 'getuser',
                                value: 'search for a user by name in the guild',
                                inline: false
                            },

                            {
                                name: "message",
                                value: 'DM a user a message from this bot',
                                inline: false
                            }
                        ]

                    }),
                    reactions: {
                        '⬅️': 'others',
                        '➡️': 'owners',
                        '❌': 'delete',
                    }
                },


                {
                    name: 'owners',
                    content: new MessageEmbed({
                        title: 'owners',
                        description: 'owners Commands || inaccessible',
                        fields: [
                            {
                                name: 'eval',
                                value: 'execute a discord.js code',
                                inline: false
                            },

                            {
                                name: "pythonexec",
                                value: 'Execute a python code',
                                inline: false
                            },

                            {
                                name: "reload",
                                value: 'reload a specific command',
                                inline: false
                            },

                            {
                                name: "shutdown",
                                value: 'Turn the bot off',
                                inline: false
                            }
                        ]

                    }),
                    reactions: {
                        '⬅️': 'special',
                        '❌': 'delete',
                    }
                },
            ], 100000)

            /* Run Menu.start() when you're ready to send the menu in chat.
             * Once sent, the menu will automatically handle everything else.
             */
            helpMenu.start()

            /* The menu also has a singular event you can use for, well, whatever you like.
             * The "pageChange" event fires just before a new page is sent. You can use
             * this to edit pages on the fly, or run some other logic.
             * It's your menu, man, do whatever you need to.
             *
             * The "destination" is the Page object it's about to change to.
             */
            helpMenu.on('pageChange', destination => {
                destination.content.title = "Hey, " + message.author.username
            })
        } else {
            let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if (!command) return message.channel.send('No such command is found on this bot')
            command = command.config

            let embed = new Discord.MessageEmbed()

            .setDescription(stripIndents`The bot's prefix is: \`${prefix}\`\n
            **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Description:** ${command.description || "No Description provided."}
            **Usage:** ${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : "No Usage"}
            **Accessible by:** ${command.accessableby || "Members"}
            **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None."}`)

            return message.channel.send(embed)
        }
    }
}