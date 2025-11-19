import User from '../models/user.js';
import bcrypt from 'bcrypt';

//test endpoint
const test = (req, res) => {
    res.json('test working')
}

/*
const jwt = require('jsonwebtoken');
*/


//register endpoint
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // check if name was entered
        if (!username) {
            return res.json({
                error: 'Username is required'
            })
        };

        // check if password is good
        if (!password || password.length > 3 || password.length < 30){
            return res.json({
                error: 'Password is required must be at least 3 characters and a max of 30'
            })
        };

        //check email
        const exist = await User.findOne({email});
        if (exist) {
            return res.json({
                error: 'Email is taken'
            })
        }

        const hashedPassword =  await hashPassword(password) 
        //create db user
        const user = await User.create({
            username, 
            email, 
            password: hashedPassword,
        });

        return res.json(user)
    } catch (error) {
        console.log(error)
    }

};

//hash password
const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if(err) {
                reject(err)
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) {
                    reject(err)
                }
                resolve(hash)
            })
        })
    })
}

//compare password
const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed)
}

//login endpoint
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

         //check if user exist 
        const user = await User.findOne({email});
        if (!user){
            return res.json ({
                error: "No user found"
            })
        }
        
        //check if password match
        const match = await comparePassword(password, user.password)
        if (match){
            res.json('Password matches')

            /*jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) =>{
                if (err) throw err;
                res.cookie('token', token).json(user)
            })
            */
        }

        if (!match) {
            res.json('Password do not match')
        }
    } catch (error) {
        
    }
}

//export all functions
export default {
    test,
    hashPassword,
    comparePassword,
    registerUser,
    loginUser,
}