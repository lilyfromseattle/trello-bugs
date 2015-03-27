var casper = require('casper').create();
phantom.casperTest = true;

casper.test.begin('Trello Bug counter has working form',8, function suite(test) {
  casper.start('http://trello-bug-counter.herokuapp.com', function() {
    test.assert(true, "true's true");
      this.test.assertTextExists('Trello', 'page body contains "trello"');
      this.test.assertTitle("Trello Bug Counter", 'Trello Bug Counter homepage title is the one expected');
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
  this.test.done(1);
  this.test.renderResults(true);

});