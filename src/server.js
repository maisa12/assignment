const express = require('express');
const app = express();
const port = 3000;
const createReport = require('./utils/createReport');
const mongoose = require('mongoose');
const Employee = require('./models/employee');
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
    res.send(data);
});
app.post('/upload',  upload.any(), (req, res, next)=>{
    res.send('ok');
    createReport();
})

mongoose.connect(
    'mongodb://127.0.0.1:27017/test',
    {useNewUrlParser: true },
 ()=>{
    console.log('connected')
})
app.listen(port, ()=>console.log(`Server is listening: ${port}`))