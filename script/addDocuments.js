const faker = require('faker');
const Employee = require('./utils/models/employee');
const mongoose = require('mongoose');
const binarySearch = require('../src/utils/binarySearch');
//amount of docs to add
let docsAmount = 1000;
//check employeeNo
function check(array, dbArray){
    try{
      var wholeArray = array.concat(dbArray);
      wholeArray.sort((a,b)=>a.employeeNo-b.employeeNo);
      var employeeN = faker.random.number();
      let val ={employeeNo: employeeN};
      let data = binarySearch(wholeArray, val);
      if(data===-1){ 
        array.push({
                employeeNo: employeeN,
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                phone: faker.phone.phoneNumber(),
                position: faker.name.jobType(),
                createDate: new Date(faker.date.past()),
                hireDate: new Date(faker.date.past()),
                updateDate: new Date(faker.date.past()),
        })
        return
      }
      return check(array, dbArray)
}
    catch(e){
        console.log(e)
       }
 };
//create array of new users
async function create(amount){
try{
    let response =  await Employee.find({}, {_id: false, __v: false}).lean().exec();
    let newUsers = []; 
    for(let i=0; i<amount; i++){
        check(newUsers, response);
    }
    await Employee.insertMany(newUsers, (err, docs)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(docs)
        }
        mongoose.connection.close()
    });
}   catch(e){
        console.log(e)
    }
}

//add data to database 
(async function addData(amount){
    try{
    mongoose.connect(
        'mongodb://127.0.0.1:27017/test',
        {useNewUrlParser: true },
     ()=>{
        console.log('connected')
    });
    await create(amount);
}
catch(e){
    console.log(e);
}
})(docsAmount)
