var mocha = require('mocha');
var assert = require('assert');

var trello = require('../trello.js');

describe('test CompareIds', function(){
  var compareIdTests = [
    {
      inputs: {
        labels: [ { '54db994974d650d56743c542': 'They Caught',
                    '54e221bf74d650d56763b14e': 'Client Revision',
                    '54db992874d650d56743c407': 'Feature Request',
                    '55021af551e31d6bed4618a6': 'Task',
                    '54db993474d650d56743c469': 'We Caught',
                    '54db997774d650d56743c6be': 'Misunderstanding',
                    '54f75d7f51e31d6bed043751': 'Out of our control' } ],

         cards:  [ { dateLastActivity: '2015-03-10T20:44:36.868Z',
                     idLabels: []},

                   { dateLastActivity: '2015-03-10T20:44:53.901Z',
                     idLabels: []},

                   { dateLastActivity: '2015-03-10T20:44:53.901Z',
                     idLabels: ['54db994974d650d56743c542'] } ] },

        outputs: { 'They Caught': 1, Total: 1 }
    }
  ];

  compareIdTests.forEach(function(test){
    for(var key in test.outputs){
      describe('compareIds', function(){
       var results = trello.compareIds(test.inputs.labels[0], test.inputs.cards);

        it('should return the correct tally for all bug types', function(){
            assert.equal(test.outputs[key], results[key]);
        });

        it('returns the correct bug types', function(){
            assert.equal(test.outputs[test.outputs[key]], results[results[key]]);
        });

      });
    }
  });
});

describe('test filterCards', function(){
  var filterCardsTests = [
    {
      inputs: {
        start: "January 1, 2015",

        end: "March 12, 2015",

         cards:  [ { dateLastActivity: '2014-03-10T20:44:36.868Z',
                     idLabels: []},

                   { dateLastActivity: '2014-04-10T20:44:53.901Z',
                     idLabels: []},

                   { dateLastActivity: '2015-02-10T20:44:43.901Z',
                     idLabels: []},

                   { dateLastActivity: '2015-03-10T20:44:53.901Z',
                     idLabels: ['54db994974d650d56743c542'] } ] },

        outputs: [ { dateLastActivity: '2015-03-10T20:44:53.901Z',
                     idLabels: ['54db994974d650d56743c542'] },

                   { dateLastActivity: '2015-02-10T20:44:43.901Z',
                     idLabels: []} ]
    }
  ];

  filterCardsTests.forEach(function(test){
    for(var key in test.outputs){
      describe('filterCards', function(){
       var results = trello.filterCards(test.inputs.start, test.inputs.end, test.inputs.cards);

       it('should only return cards within the date range given', function(){
            assert.equal(1, test.outputs[key][0] == results[key][0]);
        });

      });
    }
  });
});


describe('test filterLabels', function(){
  var filterLabelsTests = [
    {
      inputs: {
        labels: [ { id: '5490716274d650d567eb6bd1',
                    idBoard: '549071622ea0313e5d789e28',
                    name: 'Task',
                    color: 'orange',
                    uses: 20 },
                  { id: '54db997774d650d56743c6be',
                    idBoard: '549071622ea0313e5d789e28',
                    name: 'Bug - Misunderstanding',
                    color: 'sky',
                    uses: 3 },
                  { id: '54f75d7f51e31d6bed043751',
                    idBoard: '549071622ea0313e5d789e28',
                    name: 'Bug - Out of our control',
                    color: 'sky',
                    uses: 3 },
                  { id: '5490716274d650d567eb6bd3',
                    idBoard: '549071622ea0313e5d789e28',
                    name: 'Triage',
                    color: 'blue',
                    uses: 0 } ] },

        outputs: [ { '54db997774d650d56743c6be': 'Misunderstanding',
                     '54f75d7f51e31d6bed043751': 'Out of our control' } ]
    }
  ];

  filterLabelsTests.forEach(function(test){
    for(var key in test.outputs[0]){
      describe('filterLabels', function(){
       var results = trello.filterLabels(test.inputs.labels);
       it("should only return labels containing the string 'bug'", function(){
            assert.equal(1, test.outputs[0][key] == results[key]);
        });

      });
    }
  });
});
