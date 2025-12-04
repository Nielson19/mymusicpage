import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const hashPassword = async (password) => bcrypt.hash(password, 10);
const comparePassword = async (password, hashed) => bcrypt.compare(password, hashed);

const registerUser = async (req, res) => {
  try {
    let { username, email, password, passwordConfirm } = req.body ?? {};

    username = typeof username === 'string' ? username.trim() : '';
    email = typeof email === 'string' ? email.trim().toLowerCase() : '';
    password = typeof password === 'string' ? password.trim() : '';
    passwordConfirm = typeof passwordConfirm === 'string' ? passwordConfirm.trim() : '';

    //basic validations
    if (!username) return res.status(400).json({ error: 'Username is required' });
    if (username.length < 3 || username.length > 30) {
      return res.status(400).json({ error: 'Username must be 3-30 characters' });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    if (!password || password.length < 3 || password.length > 30) {
      return res.status(400).json({
        error: 'Password is required and must be 3-30 characters',
      });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    //unique checks (email OR username)
    const existing = await User.findOne({ $or: [{ email }, { username }] }).lean();
    if (existing) {
      const taken =
        existing.email === email ? 'Email is taken' : 'Username is taken';
      return res.status(409).json({ error: taken });
    }

    //create user
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    //hide password in response
    const { password: _pw, ...safeUser } = user.toObject();
    return res.status(201).json(safeUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body ?? {};
    email = typeof email === 'string' ? email.trim().toLowerCase() : '';
    password = typeof password === 'string' ? password : '';

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    //return res.json({ message: 'Login successful' });
    const { password: _pw, ...safeUser } = user.toObject();
    return res.json(safeUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};


export default {
  hashPassword,
  comparePassword,
  registerUser,
  loginUser,
};