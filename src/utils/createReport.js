const read = require('./convertCsv');
const mainScript = require('./mainScript');
const Employee = require('../models/employee');
const createXlsx  = require('./createExcell');
let createReport = () =>{
  
    const dataDb =  Employee.find({},{__v: false, _id:false}).sort({employeeNo: 1}).lean().exec();
    const dataUp = read();
    Promise.all([dataDb, dataUp])
            .then(response=>mainScript(response[0],  response[1]))
            .then(report=>createXlsx(report))
            .catch(e=>console.log(e))
    //let report = await mainScript(dataDb,  dataUp);
   // createXlsx(report)
}

module.exports = createReport