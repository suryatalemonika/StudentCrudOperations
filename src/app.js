const express = require('express');
const bodyParser = require('body-parser');
const student = require('./controllers/student');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.use('/students', student);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
