const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');


const register = async(req, res,next) => {
    try{    
        const { email, password } = req.body;
        if (!password) {
            return res.status(400).json({ msg: 'Please enter all fields.' });
        }
        if (password.length < 8) {
            return res.status(400).json({ msg: 'The password needs to be at least 8 characters long.' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);        
        const user = new User({
            email,
            passwordHash
        });
        await user.save()
        res.status(201).json({ msg: 'User created' });
    }catch (error) {
        next(error)
    }
}

const login = async(req, res,next) => {
    try{
    const { email, password } = req.body;
        const user = await User.findOne({ email : email });
        if (!user) {
            return res.status(401).json({ msg: 'Invalid email or password' });
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
            return res.status(401).json({ msg: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'test');
        res.json({ token });

    } catch (error) {
        next(error)
    }
}

module.exports = {
    register,
    login
}