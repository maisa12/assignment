const parse = require('csv-parse');
const fs = require('fs');
let read = function (){
     return new Promise((resolve, reject)=>{
        let read =  fs.createReadStream(__dirname + '/uploaded/postFile.csv');
    var data =[];     
    const parser = parse({columns: true, skip_empty_lines: true});
    parser.on('readable', function(){
     let record
     while (record = this.read()) {
          data = data.concat(record);
     }
   });
   read.pipe(parser);
   parser.on('error', (err) => {
     console.error('parser.error', err);
 });
 parser.on('finish', () => {
     data.sort((a,b)=>{
          return a.employeeNo-b.employeeNo
     })
     resolve(data)
 })
     })
}
module.exports = read