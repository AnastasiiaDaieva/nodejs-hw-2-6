const express = require('express');

const router = express.Router();

const { User, schemas } = require('../../models/user');

const CreateError = require('http-errors');

const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;
