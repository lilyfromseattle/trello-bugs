#!/usr/bin/env node
var async = require('async');
var trello = require('../trello.js');
var return_results = require('../returnresults.js');

var optimist = require('optimist')
    .usage("Usage: $0 -s [start] -e [end] -b [board] -k [key] -t [token]")
    .demand(["s"])
    .alias("s", "start")
    .describe("s", "start of date")

    .demand(["e"])
    .alias("e", "end")
    .describe("e", "end of date")

    .demand(["b"])
    .alias("b", "board")
    .describe("b", "trello board ID")

    .demand(["k"])
    .alias("k", "key")
    .describe("k", "trello key")

    .demand(["t"])
    .alias("t", "token")
    .describe("t", "trello token");

var argv = optimist.argv;

if (typeof(argv.e) == 'undefined' || argv.e == null) {
  optimist.showHelp();
  process.exit(1);
  return;
}

var start = argv.start;
var end = argv.end;
process.env.KEY = argv.key;
console.log(process.env.KEY)
process.env.TOKEN = argv.token;
console.log(process.env.TOKEN)
process.env.BOARD_ID = argv.board;

async.parallel({
    "labels": trello.getLabels.bind(this),
    "cards": function(pcb){
      trello.getCards(start, end, pcb);
    }
},function(error, results){
  var frequencies = trello.compareIds(results.labels, results.cards, start, end);
  return_results.printResults(frequencies);
  return_results.generateSpreadsheet(frequencies);
});
