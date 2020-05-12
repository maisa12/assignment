const Employee = require('./utils/models/employee');
const mongoose = require('mongoose');
const fs = require('fs');
const faker = require('faker');
const config = require('../config');
const stringify = require('csv-stringify');
const request = require('request')
const binarySearch = require('../src/utils/binarySearch');
function convertIntoCsvFile(data){
  try{
 let writeFile = fs.createWriteStream(__dirname + '/utils/csvFiles/postFile.csv');
  stringify(data,{   
                    cast: {
                            date: function(value){
                            return value.toISOString()
                          }
                    },
                    header: true,
                    columns: [ "employeeNo", "firstName", "lastName", "email", "phone", "position"]
                  },
                  function(err, output){
                      writeFile.write(output);
                      writeFile.end();
                      const formData = {
                           my_file:  fs.createReadStream(__dirname + '/utils/csvFiles/postFile.csv'),
                      };
  request.post({
                  url:`http://localhost:${config.port}/upload`, formData: formData
                }, 
    function optionalCallback(err, httpResponse, body) {
          if (err) {
              return console.error('upload failed:', err);
          }       
          console.log('Upload successful!  Server responded with:', body);
    }
  );
     });
    } catch(e){
      console.log(e)
    }
  };

  //check employeeNo
function check(array, dbArray){
    try{
      var holeArray = array.concat(dbArray);
      var employeeN =  {
        employeeNo: faker.random.number()
      };
      let data = binarySearch(holeArray, employeeN);
      if(data===-1){
        array.push({
              employeeNo: employeeN.employeeNo,
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
//update data for csv file
async function updatedData(){
try{
    let response =  await Employee.find({}, {_id: false, __v: false}).lean().exec();
    let newUsers = []; 
    for(let item of response){
        //random number
        let randomN = Math.floor(Math.random()*10);
        if(item.isDeleted===false){
              //delete info
              if(randomN===6 || randomN===7){
                  item.isDeleted=true;
              }     
              //update info
              if(randomN===8 || randomN===9){
                  item.position=faker.name.jobType();
              }
              //add new
              if(randomN===5){
                  check(newUsers, response);
              }
        }
        //restore
        else{
            if(randomN<6){
                item.isDeleted=false;
            }
        }
    }
    response = response.filter(user=>user.isDeleted!==true);
    response.forEach(user=>{
        delete user.isDeleted
    })
    response = response.concat(newUsers);
  return response
} catch(e){
      console.log(e)
  }
};
  //create csv file with updated data
(async function(){
  try{
    mongoose.connect(
      config.db,
      {useNewUrlParser: true },
   ()=>{
      console.log('connected')
  });
    let objArray = await updatedData();
    convertIntoCsvFile(objArray);
    console.log('csv file is updated')
    mongoose.connection.close();
  } catch(e){
    console.log(e)
  }
  })()

  