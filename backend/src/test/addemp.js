const axios = require('axios');

const url = 'http://localhost:5000/api/employees';

const newEmployee = {
    name: "John Doe",
    age: 30,
    department: "Engineering",
    salary: 75000,
    phoneNumber: "1234567890"
};

axios.post(url, newEmployee)
    .then(response => {
        console.log('Employee added successfully:', response.data);  
    })
    .catch(error => {
        console.error('Error adding employee:', error.response ? error.response.data : error.message);
    });
