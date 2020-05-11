const xlsx = require('xlsx');

let createXlsx = function(data){
    let newBook = xlsx.utils.book_new();
    let newWS = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(newBook, newWS, 'report');
    xlsx.writeFile(newBook, `../reports/${Date.now()}.xlsx`);
}
module.exports = createXlsx ;