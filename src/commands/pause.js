const execute = (bot, msg, args) => {
  const queue = bot.queues.get(msg.guild.id);
  if (!queue) {
    return msg.reply("não existe nenhuma música sendo reproduzida");
  }
  queue.dispatcher.pause();
  return msg.reply("Música Pausada");
};

module.exports = {
  name: "pause",
  help: "Pausa a reprodução de música atual",
  execute,
};
