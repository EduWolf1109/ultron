//requisição de arquivos
const Discord = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

//ativa as configurações dotenv
dotenv.config();

//Cria a variável bot
const bot = new Discord.Client();
//Cria a variável de conleção de comandos
bot.commands = new Discord.Collection();

bot.queues = new Map();

//Biblioteca padrão do Node
const commandFiles = fs.readdirSync(path.join(__dirname, "./commands")).filter((filename) => filename.endsWith(".js"));

//Modo de processamento dos arquivos de comando
for (var filename of commandFiles) {
    const command = require(`./commands/${filename}`);
    bot.commands.set(command.name, command);
}

//Método de conexão
bot.login(process.env.TOKEN);

//Evento de conexão (Autenticação)
bot.on("ready", function () {
    console.log(`${bot.user.username} está conectado`);
});

//Respondendo Mensagem
bot.on("message", (msg) => {
    if (!msg.content.startsWith(process.env.PREFIX) || msg.author.bot) return;

    const args = msg.content.slice(process.env.PREFIX.length).split(" ");
    const command = args.shift();

    //Verificação se o comando existe
    try {
        bot.commands.get(command).execute(bot, msg, args);
    } catch (e) {
        return msg.reply("Eu não conheço essas palavras humano insolente");
    }
});

