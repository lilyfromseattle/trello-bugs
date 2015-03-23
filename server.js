var express = require('express');
var path = require('path');
var app = express();
var routes = require('./routes/index');
var mustache = require('mustache');
var fs = require('fs');
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', function(request, response){
  var options = {title: "Trello Bug Counter"};
  var indexTemplate = fs.readFileSync('./views/index.html').toString();
  var html = mustache.render(indexTemplate, options);
  response.send(html);
});

var bugs = require('./bugs.js');
app.post('/', function(request, response){
  bugs.getResults(JSON.stringify(request.body.startdate), JSON.stringify(request.body.enddate), function(data){
    var table_content = [];
    var resultsTemplate = fs.readFileSync('./views/results.html').toString();
    console.log(data);
    Object.keys(data).forEach(function(key){
      table_content.push({"name": key, "frequency": data[key]});
    });
    // resultsTemplate += "</table></body></html>";
  //   table_content.push( "name": function () {
  //   return this.firstName + " " + this.lastName;
  // })
  console.log(table_content);
    var options = {start: JSON.stringify(request.body.startdate).replace(/"/g,""), end: JSON.stringify(request.body.enddate).replace(/"/g,""), stuff: table_content};
    console.log(options)
    var html = mustache.render(resultsTemplate, options);
    response.send(html);
    console.log('HELLO')
  });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
