var readlineSync = require('readline-sync');
var updaterconfig = require("./config/updater.json", "utf8");
var fork = require('child_process').fork;
var child = fork('./bot.js');

var program = require("commander");
program
  .option("-u, --update", "Update application w/o starting")
  .option("-s, --start", "start bot")
  .option("-su, --startupdate", "update then start bot")
  .parse(process.argv);

if (program.update) update();
if (program.start) start();
if (program.startupdate) startupdate();


start();

function startupdate() {
  update();
  start();
}

function update() {

}

function start() {

  readlineSync.promptLoop(function(input) {
    sendcommand(input);
    return input === "shutdown";
  });
}
sendcommand("shutdown");

function sendcommand(input) {
  //send command to rest api (bot)
  console.log(input);
}
