const parse = require('csv-parse');
const fs = require('fs');
let read = function (){
     return new Promise((resolve, reject)=>{
        let read =  fs.createReadStream(__dirname + '/uploads/postFile.csv');
    var data =[];
    read.on('data', async  function (chunk) { 
    parse(chunk,{columns: true, skip_empty_lines: true}, function(err, records){
           data = data.concat(records);
        });
     
    });
  return read.on('end', function () { 
    data.sort((a,b)=>{
           return a.employeeNo-b.employeeNo
      })
     resolve(data)
    });
     })
}
module.exports = read