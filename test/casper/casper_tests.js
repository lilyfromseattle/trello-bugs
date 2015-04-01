var process = require('system').env;
var testURI = (process.server_uri) ? process.server_uri : "http://trello-bug-counter.herokuapp.com";
// var testURI = "http://trello-bug-counter.herokuapp.com";
var casper = require('casper').create();
console.log("HEY!");
// console.log(process.server_uri);
phantom.casperTest = true;

casper.test.begin('Trello Bug counter has working form',9, function suite(test) {
  casper.start(testURI, function() {
    test.assert(true, "true's true");
    this.test.assertTitle("Trello Bug Counter BLAHHH", 'Trello Bug Counter homepage title is the one expected');
    this.test.assertTextExists('Trello', 'page body contains "trello"');
    this.test.assertExists('form[action="/"]', 'date form is found');
    this.fill('form[action="/"]', {
          startdate: 'January 1, 2012',
          enddate: 'March 15, 2015',
      }, true);
  });

  casper.then(function() {
      this.test.assertTextExists('Total', 'page body contains "total"');
      this.test.assertVisible('h3.text-center');
      this.test.assertTitle("- Results", 'no title for results page yet!');
      this.test.assertExists('div.title-div');
      this.test.assertEval(function() {
          return __utils__.findAll('td.text-center').length >= 8;
      }, 'search for bugs retrieves 8 or more results');
  });
});
casper.run(function() {
  this.test.done(9);
  this.test.renderResults(true);

});
