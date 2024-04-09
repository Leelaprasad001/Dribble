const express = require('express');
const dotenv = require('dotenv');
const userRouters = require('./src/routes/dataRoutes');
const cors = require('cors'); // Import cors package
const pool = require('./src/config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(cors());

app.use('/', userRouters);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
