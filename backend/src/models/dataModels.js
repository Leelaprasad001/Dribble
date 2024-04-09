const pool = require('../config/db');
const bcrypt = require('bcrypt');

async function checkUser(username) {
  const result = await pool.query('SELECT COUNT(*) FROM users WHERE username = $1', [username]);
  return parseInt(result.rows[0].count) > 0;
}

async function register(name, username, email, password, photo, location, bringsto) {
  await pool.query(
    'INSERT INTO users (name, username, email, password, photo, location, bringsto, isemailverified, isactive) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    [name, username, email, password, photo, location, bringsto, false, false]
  );
}

async function confirmEmailByUsername(username) {
  await pool.query(
    'UPDATE users SET isemailverified = true, isactive = true WHERE username = $1',
    [username]
  );
}

async function uploadFile(fileId, content) {
  const query = {
    text: 'INSERT INTO Files(id, file_data) VALUES($1, $2)',
    values: [fileId, Buffer.from(content)],
  };
  await pool.query(query);
}


async function getFileData(fileId) {
  const query = {
    text: 'SELECT file_data FROM Files WHERE id = $1',
    values: [fileId],
  };
  const result = await pool.query(query);

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0].file_data;
}

async function getUser(username, password) {
  const user = await pool.query('SELECT * FROM users WHERE username = $1 ', [username]);
  if (user.rows.length === 0) {
    return null;
  }
  const hashedPassword = user.rows[0].password;
  const passwordMatch = await bcrypt.compare(password, hashedPassword);
  if (!passwordMatch) {
    return null;
  }
  return user.rows[0];
}

async function getUsersData(username) {
  const users = await pool.query('SELECT * FROM users WHERE username = $1 ', [username]);
  return users.rows;
}

module.exports = {
  checkUser, 
  register,
  uploadFile,
  getFileData,
  getUser,
  confirmEmailByUsername,
  getUsersData
};
