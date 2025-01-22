const axios = require('axios');

const url = 'http://localhost:5000/api/employees';

axios.get(url)
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });
