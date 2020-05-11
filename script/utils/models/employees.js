const mongoose = require('mongoose');

const EmployeesSchema = mongoose.Schema({
    employeeNo: Number,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    position: String,
    hireDate: Date,
    createDate: Date,
    updateDate: Date,
    isDeleted: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model('Employee', EmployeesSchema);