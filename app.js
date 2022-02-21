const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');

require('dotenv').config();

const contactsRouter = require('./routes/api/contacts');

const usersRouter = require('./routes/api/users');

const app = express();

// const upload = multer({ dest: })

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);
// app.post('/api/contacts', async (req, res, next) => {});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
