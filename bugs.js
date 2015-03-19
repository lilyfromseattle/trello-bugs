var async = require('async')
var board_id = "t8hXGU8J"
var trello = require('./trello.js')
var return_results = require('./returnresults.js')

// var optimist = require('optimist')
//     .usage("Usage: $0 -s [start] -e [end]")
//     .demand(["s"])
//     .alias("s", "start")
//     .describe("s", "start of date")
//     .demand(["e"])
//     .alias("e", "end")
//     .describe("e", "end of date");
//
// var argv = optimist.argv;
//
// if (typeof(argv.e) == 'undefined' || argv.e == null) {
//   optimist.showHelp();
//   process.exit(1);
//   return;
// }
//
// var start = argv.start
// var end = argv.end

module.exports.getResults = getResults;
function getResults(start, end, callback) {
  async.parallel({
      "labels": trello.getLabels.bind(this),
      "cards": function(pcb){
        trello.getCards(start, end, pcb);
      }
  },function(error, results){
    var frequencies = trello.compareIds(results.labels, results.cards, start, end);
    // return_results.printResults(frequencies);
    // return_results.generateSpreadsheet(frequencies);
    callback(frequencies)
  });
  // callback(frequencies)
}
