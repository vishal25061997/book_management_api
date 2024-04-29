// const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function isStringInvalid(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user's id
 *         name:
 *           type: string
 *           description: The user's name
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address
 *         password:
 *           type: string
 *           format: password
 *           description: The user's password
 *       required:
 *         - name
 *         - email
 *         - password
 *
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for user management
 *
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       '201':
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       '400':
 *         description: Bad request. Invalid input data
 *       '500':
 *         description: Internal server error
 */

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email);

    if (
      isStringInvalid(name) ||
      isStringInvalid(email) ||
      isStringInvalid(password)
    ) {
      return res
        .status(400)
        .json({ err: "something is missing : Bad parameters" });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    bcrypt.hash(password, 10, async (err, hash) => {
      await User.create({
        name,
        email,
        password: hash,
      });
      res.status(201).json({ msg: "user has create successfully" });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginUserRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address
 *         password:
 *           type: string
 *           format: password
 *           description: The user's password
 *       required:
 *         - email
 *         - password
 *     LoginUserResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: Authentication token for the user
 *
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for user management
 *
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Log in with user credentials
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/LoginUserRequest"
 *     responses:
 *       '200':
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/LoginUserResponse"
 *       '400':
 *         description: Bad request. Invalid input data or credentials
 *       '500':
 *         description: Internal server error
 */

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (isStringInvalid(email) || isStringInvalid(password)) {
      return res
        .status(400)
        .json({ err: "something is missing : Bad parameters" });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id }, "yadav");
    res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { registerUser, loginUser };
