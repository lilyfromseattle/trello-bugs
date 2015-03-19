var https = require('https')
function makeRequestToTrello(path, callback){
  var options = {
    host: "api.trello.com",
    path: path,
    port: 443,
    method: 'GET'
  };

  var content = "";
  https.request(options, function(response) {

    response.on('data', function (chunk) {
        content += chunk;
    });

    response.on('end', function(){
        callback(null, JSON.parse(content));
    });

  }).on('error', function(error) {
      callback(error);

  }).end();
}

var env = require('node-env-file');

var token = process.env.TOKEN
var key = process.env.KEY

var board_id = process.env.BOARD_ID
var getParams = "?key="+key+"&token="+token;

module.exports.getLabels = getLabels;
function getLabels(callback) {
  makeRequestToTrello("/1/boards/"+ board_id +"/labels" + getParams, function(error, data){
    var filteredLabels = filterLabels(data)
    callback(error, filteredLabels);
  });
}

module.exports.filterLabels = filterLabels;
function filterLabels(arrayOfLabels) {
  var filteredLabels = {}
  for (i = 0; i < arrayOfLabels.length; i++) {
    var findings = arrayOfLabels[i]["name"].match(/Bug - (.+)/);
    if ( findings != null && findings.length > 1){
      filteredLabels[arrayOfLabels[i]["id"]] = findings[1];
    }
  }
  return filteredLabels;
}

module.exports.getCards = getCards;
function getCards(start, end, callback){
    makeRequestToTrello("/1/boards/t8hXGU8J/cards/all" +getParams, function(error, allCards){
      var filteredCards = filterCards(start, end, allCards);
      callback(error, filteredCards);
    });
}

module.exports.filterCards = filterCards;
function filterCards(startUnparsed, endUnparsed, allCards) {
  var filteredCards = []
  allCards.forEach(function(card) {
    var date = new Date(Date.parse(card["dateLastActivity"]))
    var start = new Date(Date.parse(startUnparsed))
    var endInput = new Date(Date.parse(endUnparsed))
    var end = new Date(endInput.getTime()+24*60*60*1000);

      if (start < date && date < end) {
        filteredCards.push(card)
      }
  })
  return filteredCards
}

module.exports.compareIds = compareIds;
function compareIds(labelData, cardData) {
  var frequencies = {}
  counter = 0
  cardData.forEach(function(card){
      card["idLabels"].forEach(function(id) {
        if(labelData[id] != null) {
          counter += 1
          frequencies[labelData[id]] = (frequencies[labelData[id]] != null) ? frequencies[labelData[id]]+1 : 1
        }
      })
  });
  frequencies["Total"] = counter
  return frequencies
}
