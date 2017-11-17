const { fork } = require("child_process");
// arguments
var program = require("commander");
program
  .option("-u, --update", "Update application w/o starting")
  .option("-su, --startupdate", "update then start bot")
  .parse(process.argv);

// cli
const vorpal = require("vorpal")();
vorpal.localStorage("storage");

vorpal
  .delimiter("$")
  .show();

//commands
vorpal
  .command("start", "starts bot.")
  .action(function(args, callback) {
    this.log("!starting bot!");
    start();
    callback();
  });

vorpal
  .command("stop", "stops bot.")
  .action(function(args, callback) {
    this.log("!Stoping bot!");
    stop();
    callback();
  });

if (program.update)vorpal.log("not ready yet");
if (program.startupdate)vorpal.log("not ready yet");

const forked = fork("bot.js");
vorpal.localStorage.setItem("botstart", "1");
vorpal.pipe(forked.stdout);
vorpal.pipe(forked.stderr);
forked.on("message", (msg) => {
  vorpal.log("Bot:", msg);
});


// functions
function start() {
  if (vorpal.localStorage.getItem("botstart") == "1") vorpal.log("Bot already started");
  if (vorpal.localStorage.getItem("botstart") == "1") return;
  const forked = fork("bot.js");
  vorpal.pipe(forked.stdout);
  vorpal.pipe(forked.stderr);
  forked.on("message", (msg) => {
    vorpal.log("Bot:", msg);
  });
}

function stop() {
  forked.kill("SIGINT");
  vorpal.localStorage.setItem("botstart", "0");
}
