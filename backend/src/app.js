const express = require('express');
const bodyParser = require('body-parser');
const student = require('./controllers/student');
require('dotenv').config();

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Mount the student router at the /students endpoint
app.use('/students', student);

// Set a fallback for PORT in case it's not defined in the .env file
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
