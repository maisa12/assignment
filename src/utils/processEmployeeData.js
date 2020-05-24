const binarySearch = require('./binarySearch');
const Employee = require('../models/employee');
let processEmployeeData = async function (dbArray, upArray){
    let report = [];
    let properties = [];
    for(let property in upArray[0]){
         properties.push(property);
    }
    for(let item of dbArray){
        let result = binarySearch(upArray, item);
        if(result===-1){
            if(!item.isDeleted){
                //update isDeleted = false
                await Employee.updateOne({employeeNo: item.employeeNo},  { $set: { isDeleted: true, updateDate: new Date(Date.now()) }})
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
                    result.updateDate = new Date(Date.now());
                    await Employee.updateOne({employeeNo: item.employeeNo},  { $set: result})
                    report.push({
                        employeeNo: item.employeeNo,
                        status: 'updated'
                    });
                    break;
                }
            }
            if(item.isDeleted){
                await Employee.updateOne({employeeNo: item.employeeNo},  { $set: { isDeleted: false, updateDate: new Date(Date.now())}})
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
module.exports = processEmployeeData;