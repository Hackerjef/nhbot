// clear screem for menu
var clear = require("clear");
clear();

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

vorpal
  .command("clear", "Clears chat")
  .action(function(args, callback) {
    clear();
    this.log("Cleared Chat");
    callback();
  });

vorpal
  .command("restart", "restarts everything")
  .action(function(args, callback) {
    power("restart");
    callback();
  });

vorpal
  .command("update <subcommand>", "check for updates/installs updates")
  .action(function(args, callback) {
    if (args === "check") {
      updatecheck();
    } else if (args === "update") {
      update();
    } else {
      vorpal.log("need to add sub command");
    }
    callback();
  });
// check if command line
if (program.update) startup("updatedontstart");
if (program.startupdate) startup("startupdate");

//startbot on startup
const { fork } = require("child_process");
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
  vorpal.localStorage.setItem("botstart", "1");
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

function update() {
// idk
}

function updatecheck() {
//idk yet
}

//startup function
function startup(option) {
  if (option == "updatedontstart") {
    if ( updatecheck() ) {
      update();
    }
    vorpal.log("told to check and update and then shutdown");
    vorpal.log("kden done  ;-)");
    power("shutdown");
  }

  if (option == "updatestart") {
    if ( updatecheck() ) {
      update();
      power("restart");
    }
  }
}

// power function (for shutdown and restart)
function power(option) {
  if (option == "shutdown") {
    if (vorpal.localStorage.getItem("botstart") == "1") stop();
    process.exit(0);
  }
  if (option == "restart") {
    if (vorpal.localStorage.getItem("botstart") == "1") stop();
    //idk?
  }
}
