const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./models/db');
const employeeRoutes = require('./routes/employeeRoutes');
require('dotenv').config();

const app = express();
connectDB();

app.use(bodyParser.json());
app.use('/api', employeeRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
