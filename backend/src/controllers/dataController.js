const dataModel = require('../models/dataModels');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { Resend } = require('resend');
const resend = new Resend('re_KQhJxLei_CTC7gj4rKxiGbp4YJLcPy3vz');
const uuid = require('uuid');

async function checkUser(req, res) {
    const { username } = req.body;
    const userExists = await dataModel.checkUser(username);
    if (userExists) {
      return res.status(201).json({ error: 'Username already exists' });
    }
    res.status(200).json({ message: 'User not found' });
}

async function register(req, res) {
  try {
    const { name, username, email, password, photo, location, bringsto } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await dataModel.register(name, username, email, hashedPassword, photo, location, bringsto);

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Confirm your email',
      html: `<p>Hi ${name},</p><p>Click <a href="http://localhost:4000/api/confirmemail?username=${username}">here</a> to confirm your email address and activate your account.</p>`,
    });
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function confirmEmail(req, res) {
  try {
    const username = req.params.username;
    await dataModel.confirmEmailByUsername(username);
    res.status(200).json({ message: 'Email confirmed successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function uploadFile(req, res) {
  try {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    const fileId = uuidv4();
    await dataModel.uploadFile(fileId, req.file.buffer); 
    return res.status(200).json({ fileId });
  } catch (err) {
      console.error("Error uploading file:", err);
      return res.status(500).json({ error: "Internal server error" });
  }
}

async function getFile(req, res) {
  try {
    const fileId = req.params.fileId;
    const fileData = await dataModel.getFileData(fileId);
    
    if (!fileData) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename=file.dat');
    res.send(fileData);
  } catch (error) {
    console.error('Error retrieving file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await dataModel.getUser(username, password);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User logged in successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function sendMail(req, res) {
  try {
    const { email } = req.body;
    const htmlContent = `
      <h1>Confirm Your Email Address</h1>
      <p>Dear Sir,</p>
      <p>Welcome to Dribble! We're excited to have you join us.</p>
      <p>To get started, please confirm your email address by clicking the button below:</p>
      <p>
          <a style="background-color: #4CAF50;
            border: none;
            color: white;
            padding: 10px 24px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 12px;
            margin: 2px 1px;
            cursor: pointer;" 
          href="http://localhost:4000/api/confirmemail?username=leela12345">Confirm Email</a>
      </p>
      <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
      <p>Thank you for choosing us!</p>
      <p>Best regards,</p>
      <p>Dribble Team</p>
    `;
    await resend.emails.send({
      from: 'dribble@example.com',
      to: email,
      subject: 'Confirm your email',
      html: htmlContent
    });
    res.status(200).json({ message: 'mail sent' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = {
  checkUser,
  register,
  uploadFile,
  getFile,
  login,
  confirmEmail,
  sendMail
};
