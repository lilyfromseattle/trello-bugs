// describe('Trello Bug Counter interface', function() {
//   before(function() {
//     casper.start('http://trello-bug-counter.herokuapp.com');
//   });
//
//   it('should have a working form', function() {
//     casper.then(function() {
//       'Trello Bug Counter'.should.matchTitle;
//       'form[action="/"]'.sho;uld.be.inDOM.and.be.visible;
//       this.fill('form[action="/"]', {
//         startdate: 'January 1, 2012',
//         enddate: 'March 15, 2015',
//       }, true);
//     });
//
//     casper.then(function() {
//       ''.should.matchTitle;
//       'h3.text-center'.sho;uld.be.inDOM.and.be.visible;
//       this.fill('form[action="/search"]', {
//         q: 'casperjs'
//       }, true);
//     });
//
//     casper.then(function() {
//       this.test.assertEval(function() {
//           return __utils__.findAll('td.text-center').length >= 8;
//       }, 'search for bugs retrieves 8 or more results');
//     });
//
//   });
// });
