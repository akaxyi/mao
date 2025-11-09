const Discord = require("discord.js");
const { GatewayIntentBits, Client } = require("discord.js");
const config = require("./config.json");
const utils = require("./utils/util.js");

//const MongoClient = require("./utils/mongoClient");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  allowedMentions: { repliedUser: false },
  fetchAllMembers: false,
});
const util = new utils.Utils(client, process.cwd());
module.exports = { client, config, util };

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.queue = new Map();
client.snipes = new Map();
client.setMaxListeners(0);
client.prefix = config.prefix;

util.loadModules("events");
util.loadModules("commands", true);

client.login(config.token);
