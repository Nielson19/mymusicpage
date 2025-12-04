// This file currently handles the Auth for users not signing in thru Spotify.
// THIS specifically is a file duplicated specifically to explain the pieces of code where it might be confusing.
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken'; // For session tokens
import bcrypt from 'bcrypt'; // For password hashing

const hashPassword = async (password) => bcrypt.hash(password, 10); // Hashes a password 2^10 times thru
const comparePassword = async (password, hashed) => bcrypt.compare(password, hashed); // Hashes the current given password (BASED on the hashed password) to see if it matches up with the hashedPassword currently in the DB.
// ex. $2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgc3Z72GXZ1kVWGZenTek0, the $2b$ says this is bcrypt, and 10 is the amount of hashes to the power of 2, and part of the rest of the String is both the seed + actually hashed password.

const registerUser = async (req, res) => {
  try {
    // Destructures the request. If no request body, just return an empty list to avoid an error crash.
    let { username, email, password, passwordConfirm } = req.body ?? {};

    // Trims down the collected inputs
    username = typeof username === 'string' ? username.trim() : '';
    email = typeof email === 'string' ? email.trim().toLowerCase() : '';
    password = typeof password === 'string' ? password.trim() : '';
    passwordConfirm = typeof passwordConfirm === 'string' ? passwordConfirm.trim() : '';

    // Basic validations
    if (!username) return res.status(400).json({ error: 'Username is required' });
    if (username.length < 3 || username.length > 30) {
      return res.status(400).json({ error: 'Username must be 3-30 characters' });
    }

    // Needs a chunk of text w/ no spaces followed by a @ symbol, followed by more text + dot + more text.
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

    // Unique checks (email OR username)
    const existing = await User.findOne({ $or: [{ email }, { username }] }).lean(); // Since email and username are both unique, an index is made for them in the DB, making it so we don't have to look inside every single user individually to find any matches.
    if (existing) {
      const taken =
        existing.email === email ? 'Email is taken' : 'Username is taken';
      return res.status(409).json({ error: taken });
    }

    // Creates the user within the DB, with a hashedPassword
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // This line goes into the user object. We want to get everything EXCEPT the password, but it'd be bad practice to list out EVERY user property, so instead just pull out password and change it to nothing, then the rest of the user object can now be placed inside safeUser.
    const { password: _pw, ...safeUser } = user.toObject();
    return res.status(201).json(safeUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    // Same as registration
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

    // Tokens are like keycards at a hotel. We call the info inside it a 'payload'.
    // Pack the user's ID, email, and name into a digital token as a String, but it's essentially packing a JSON object into a String.
    // JWT_SECRET lets us hash this token in a special way. Instead of JUST hashing it, the secret ingredient needed to unhash it is JWT_SECRET.
    // You can think of it like a math problem: Token = (Header + Payload + Secret) % 10. Without ever seeing Secret, the token could theoritically be anything. So hackers could only get the token via guessing (but if its a big secret then it'd also be billions+ of attempts before you get a succesful guess).
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Now we'll attach this token to a reponse as an HTTP-Only cookie. This means that JS can't read this cookie.
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax', // Protects against CSRF (Cross-Site Request Forgery) attacks. These attacks are basically like, if you go on hackersite.com, and it tries to go into mymusicpage.com silently to get its token. Lax basically says, do NOT attach this cookie if the req is from a different website. 
      // Lax specifically says that, it will allow GET requests from other sites (which is mainly just for viewing), but won't honor POST requests (for modifying things). The hackers themselves can't even see the GET response because the browser itself will block it from being received based on different origins (the request is from hackersite.com, not mymusicpage.com).
      secure: process.env.NODE_ENV === 'production', // We will only actually enforce these diff rules IF the NODE_ENV code is production.
      maxAge: 7 * 24 * 60 * 60 * 1000, // maxAge is for the browser (Chrome/Safari/Edge/etc.), expiresIn is for the server itself.
    });

    //return res.json({ message: 'Login successful' });
    const { password: _pw, ...safeUser } = user.toObject();
    return res.json(safeUser);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// In the future, when we have time, it probably would maybe be best to export the actual functions themselves rather than exporting it as an object that holds all 4 functions. (I think, idk if that actually might have any security issues tho)
export default {
  hashPassword,
  comparePassword,
  registerUser,
  loginUser,
};