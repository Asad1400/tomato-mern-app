import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ 
                success: false,
                message: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (isMatch) {
            const token = createToken(user._id);
            res.json({ 
                success: true,
                message: "User logged in successfully",
                token
            })
        }
        else {
            return res.json({ 
                success: false,
                message: "Incorrect password"
            })
        }
    }   
    catch (e) {
        console.log(e);
        res.json({ 
            success: false,
            message: e.message
        })
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ 
                success: false,
                message: "All fields are required"
            })
        }

        const exists = await userModel.findOne({ email });

        if (exists) {
            return res.json({ 
                success: false,
                message: "User already exists"
            })
        }

        if (!validator.isEmail(email)) {
            return res.json({ 
                success: false,
                message: "Invalid email"
            })
        }

        if (password.length < 8) {
            return res.json({ 
                success: false,
                message: "Password must be at least 8 characters"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ 
            success: true,
            message: "User created successfully",
            token
        })
    }
    catch (e) {
        console.log(e);
        res.json({ 
            success: false,
            message: e.message
        })
    }
}

export { loginUser, registerUser };