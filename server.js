var express = require('express');
var path = require('path');
var app = express();
var routes = require('./routes/index')
var mustache = require('mustache')
var fs = require('fs')
var $ = require('jquery')
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', function(request, response){
  var options = {title: "Trello Bug Counter"}
  var indexTemplate = fs.readFileSync('./views/index.html').toString();
  var html = mustache.render(indexTemplate, options);
  response.send(html)
})

var bugs = require('./bugs.js')
app.post('/', function(request, response){
  bugs.getResults(JSON.stringify(request.body.startdate), JSON.stringify(request.body.enddate), function(data){
    var options = {start: JSON.stringify(request.body.startdate).replace(/"/g,""), end: JSON.stringify(request.body.enddate).replace(/"/g,"")}
    var resultsTemplate = fs.readFileSync('./views/results.html').toString();
    Object.keys(data).forEach(function(key){
      resultsTemplate += "<tr><td class = 'text-center'>"+key+"</td> <td class = 'text-center'>"+data[key]+"</td></tr>"
    });
    resultsTemplate += "</table></body></html>"

    var html = mustache.render(resultsTemplate, options);
    response.send(html);
  })
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
