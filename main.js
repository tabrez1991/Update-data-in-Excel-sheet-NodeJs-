
var fs = require('fs');
const Json2csvParser = require('json2csv').Parser;



const express = require('express')
const app = express()
const port = 8090
var path = require('path');
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/getData', function(req, res) {
    console.log('==============')
    console.log(req.query)
    
  var newLine = "\r\n";
  var fields = ['Name', 'Mobile'];
  var appendThis = [
      {
          'Name': req.query.input,
          'Mobile': req.query.search
      }
  ];

  fs.stat('file.csv', function (err, stat) {
      if (err == null) {
          const json2csvParser = new Json2csvParser({ fields });
          const csv = json2csvParser.parse(appendThis);

          fs.appendFile('file.csv', csv, function (err) {
              if (err) throw err;
              console.log('The "data to append" was appended to file!');
          });
      }
      else {
          //write the headers and newline
          console.log('New file, just writing headers');
          fields = (fields + newLine);

          fs.writeFile('file.csv', fields, function (err, stat) {
              if (err) throw err;
              console.log('file saved');
          });
      }
  });
  
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))





