const xlsx = require('xlsx');
const path = require('path');
let createXlsx = function(data){
    try{
    let newBook = xlsx.utils.book_new();
    let newWS = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(newBook, newWS, 'report');
    let pathRep = path.join(__dirname, `../reports/${Date.now()}.xlsx`);
    xlsx.writeFile(newBook, pathRep);
    }
    catch(e){
        console.log(e)
    }
}
module.exports = createXlsx ;