const mongoose = require('mongoose');

const EmployeesSchema = mongoose.Schema({
    employeeNo: {
        type: Number,
        index: true 
    },
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    position: String,
    hireDate: {
        type: Date,
        default: new Date(Date.now())
    },
    createDate: {
        type: Date,
        default: new Date(Date.now())
    },
    updateDate: {
        type: Date,
        default: new Date(Date.now())
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model('Employee', EmployeesSchema);