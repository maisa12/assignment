# Import Employees
## Description
###### We have a system where client stores list of their employees. Employees are uniquely identified by employeeNo field.  Every day client posts csv file with updated list of employees which we need to synchronize with database.
###### Task: Create synchronization procedure, which generates change report. Report should reflect all users with appropriate statuses dumped to excel file.
###### User record structure: emloyeeNo, fisrtName, lastName, email, phone, position, hireDate, createDate, isDeleted.
## Install
```bash
$ npm install
```
## Usage
#### Set config.
###### Rename config.example.js to config.js and set your port and MongoDB connection URI.
```jsx
module.exports = {
      port: 3000,
      db: "MongoDB connection URI"
  };
```
#### Generate dummy user records and save to database. Default it generates 1000 dummy user records.
```bash
$ node script/addDocuments.js
```
#### if we want to change amount of dummy user records, we have to change 'docsAmount' value in `script/addDocuments.js`.
```jsx
//amount of docs to add
let docsAmount = 1000;
```
#### Server start.
```bash
$ node src/server.js
```
#### Alter list from db, dump to csv file and upload to the server.
```bash
$ node script/mainScript.js 
```
#### Server will generate change report dumped to excel file in `src/reports`.
