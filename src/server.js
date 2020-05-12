const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const Employee = require('./models/employee');
const read = require('./utils/convertCsv');
const processEmployeeData = require('./utils/processEmployeeData');
const createXlsx  = require('./utils/createExcel');
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname+'/utils/uploaded')
      },
    filename: function (req, file, cb) {
  
        cb(null,  file.originalname );
  
    }
  });
var upload = multer({ storage: storage});

app.get('/', async(req, res)=>{    
 const data = await Employee.find({isDeleted: false},{__v: false, _id:false}).sort({employeeNo: 1}).lean().exec();
    res.send(data)
});
app.post('/upload',  upload.any(), async(req, res, next)=>{
    try{
        const dataDb =  Employee.find({},{__v: false, _id:false}).sort({employeeNo: 1}).lean().exec();
        const dataUp = read();
        const[arrayDb, arrayUp] = await Promise.all([dataDb, dataUp]);
        const report = await processEmployeeData(arrayDb,  arrayUp);
        createXlsx(report)
            res.send('ok')
    }
    catch(e){
        res.sendStatus(500)
    }
});

mongoose.connect(
    'mongodb://127.0.0.1:27017/test',
    {useNewUrlParser: true },
 ()=>{
    console.log('connected')
});
app.listen(port, ()=>console.log(`Server is listening: ${port}`));