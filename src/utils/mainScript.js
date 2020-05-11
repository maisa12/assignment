const search = require('./search');
const Employee = require('../models/employee');
let mainScript= async function (dbArray, upArray){
    let report = [];
    let properties = [];
    for(let property in upArray[0]){
        properties.push(property);
    }
  
    for(let item of dbArray){
        let result = search(upArray, item);
        if(result===-1){
            if(!item.isDeleted){
                //update isDeleted = true
                await Employee.update({employeeNo: item.employeeNo},  { $set: { isDeleted: true }})
                report.push({
                    employeeNo: item.employeeNo,
                    status: 'deleted'
                });
            }
        }
        else{
            result.isChecked = true;
            for(let prop of properties){
                if(result[prop]!=item[prop]){
                    await Employee.updateOne({employeeNo: item.employeeNo},  { $set: result})
                    report.push({
                        employeeNo: item.employeeNo,
                        status: 'updated'
                    });
                }
            }
            if(item.isDeleted){
                await Employee.updateOne({employeeNo: item.employeeNo},  { $set: { isDeleted: false}})
                report.push({
                    employeeNo: item.employeeNo,
                    status: 'restored'
                });
                //update user restored

            }
            
        }
    }
    let newUsers = upArray.filter(user=>user.isChecked!==true);
    if(newUsers.length!==0){
       await Employee.insertMany(newUsers, (err, odc)=>{
            if(err){
                return console.log(err)
            }
            else{
                console.log('successfully added')
            }
        });
        for(let newUser of newUsers){
            report.push({
                employeeNo: newUser.employeeNo,
                status: 'created'
            });    
        }
    }
 return report
};
module.exports = mainScript;