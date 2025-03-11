const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Error } = require("mongoose");

exports.signup = async (request, response) => {
  const { name, email, phone, role, password } = request.body;
  try {
    // validate the role
    if (!["admin", "client"].includes(role)) {
      return response
        .status(400)
        .json({ error: 'Invalid role. Must be a "admin" or "client".' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists)
      return response.status(400).json({ error: "User already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new User({
      name,
      email,
      phone,
      role,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    response.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup Error:", error.message);
    response.status(500).json({ error: "Internal Server Error." });
  }
};

exports.login = async (request, response) => {
  const { email, password } = request.body;
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return response.status(404).json({ error: "User does not exist" });

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return response.status(400).json({ error: "Invalid password" });

    // Create a token
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    response
      .status(200)
      .json({ token, role: user.role, message: "User logged in successfully" });
  } catch (error) {
    console.error("Login Error:", Error.message);
    response.status(500).json({ error: "Internal Server Error." });
  }
};

exports.logout = (request, response) => {
  try {
    // Invalidate the token by sending a success response
    response
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error.message);
    response.status(500).json({ error: "Internal Server Error." });
  }
};
