const fs = require("node:fs");
const path = require("node:path");

// Command Handling Logic
function setupCommands(client, commandsDir) {
    for (const file of fs.readdirSync(commandsDir).filter((file) => file.endsWith(".js"))) {
        const filePath = path.join(commandsDir, file);
        const command = require(filePath);
        registerCommand(client, command);
    }
}

function registerCommand(client, command) {
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING]: The command is missing a required "data" or "execute" property`);
    }
}

module.exports = { setupCommands };
