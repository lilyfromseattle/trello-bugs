var fs = require('fs');

module.exports.generateSpreadsheet = generateSpreadsheet;
function generateSpreadsheet(frequencies) {
  var writeStream = fs.createWriteStream("trello-bugs.xls");
  var data = "Bug Type"+"\t"+" Frequency"+"\n";

  for (var stat in frequencies) {
    data += stat +"\t" + frequencies[stat] +"\n";
  }
  writeStream.write(data);
  writeStream.close();
}

module.exports.printResults = printResults;
function printResults(frequencies) {
  console.log(frequencies);
}
