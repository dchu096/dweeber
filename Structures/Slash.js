let slash = [];
const { readdirSync } = require("fs");
const ascii = require("ascii-table");
let table = new ascii("Slash Commands");
table.setHeading('Command', ' LS');

module.exports = (client) => {
    readdirSync("./Commands/").forEach(dir => {
        const commands = readdirSync(`./Commands/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let pull = require(`../Commands/${dir}/${file}`);
            if (pull.name) {
                client.slashCommands.set(pull.name, pull);
                slash.push(pull);
                table.addRow(file, 'Command Reg');
            } else {
                table.addRow(file, 'Command UnReg');
                continue;
             }
          }
    });
    console.log(table.toString());
client.on("ready", async ()=> {
    await client.application.commands.set(slash)
 })
}