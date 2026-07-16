import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

function signToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

function toSafeUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    dob: user.dob,
    joinedAt: user.createdAt
  };
}

// POST /api/auth/register
export async function register(req, res) {
  try {
    const { name, email, password, mobile, dob } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required.' });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      mobile,
      dob
    });

    const token = signToken(user._id);
    res.status(201).json({ message: 'Account created successfully.', token, user: toSafeUser(user) });
  } catch (err) {
    res.status(400).json({ message: 'Unable to register.', error: err.message });
  }
}

// POST /api/auth/login
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const token = signToken(user._id);
    res.json({ message: 'Login successful.', token, user: toSafeUser(user) });
  } catch (err) {
    res.status(500).json({ message: 'Server error while logging in.', error: err.message });
  }
}

// GET /api/auth/me  (token verify + session restore on page refresh)
export async function getMe(req, res) {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json({ user: toSafeUser(user) });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
}
