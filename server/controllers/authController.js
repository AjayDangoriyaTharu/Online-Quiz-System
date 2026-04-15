const bcrypt      = require('bcrypt');
const jwt         = require('jsonwebtoken');
const User        = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });

// POST /api/auth/register
const register = asyncHandler(async (req, res) => {
  const { name, email, password, adminSecret } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (await User.findOne({ email })) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  const role = adminSecret && adminSecret === process.env.ADMIN_SECRET
    ? 'admin'
    : 'student';

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashed, role });

  res.status(201).json({ message: 'User registered successfully', role });
});

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({
    token: generateToken(user._id),
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

module.exports = { register, login };
