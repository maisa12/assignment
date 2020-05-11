const read = require('./convertCsv');
const mainScript = require('./mainScript');
const Employee = require('../models/employee');
const createXlsx  = require('./createExcell');
let createReport =async () =>{
    const dataDb = await Employee.find({},{__v: false, _id:false}).sort({employeeNo: 1}).lean().exec();
    const dataUp = await read();
    let report = await mainScript(dataDb,  dataUp);
    createXlsx(report)
}
module.exports = createReport