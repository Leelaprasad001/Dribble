const { Pool } = require('pg');
const express = require('express');
const dotenv = require('dotenv');
const userRouters = require('./src/routes/dataRoutes');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(cors());

app.use('/', userRouters);

const neonPool = new Pool({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
