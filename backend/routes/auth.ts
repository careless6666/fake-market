import express from "express";
import { UserInfo } from "../repository/model/UserInfo";
import { User } from '../model/user'
const auth = require("../middleware/auth");
import {Db} from "../repository/psqlClient";
import {getRepository} from "typeorm";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

const router = express.Router();

/*

router.get('/profile', auth, (req, res) => {
    // adding a new parameter for checking verification
    //res.render('profile', { username: req.user?.username, verified : req.user.isVerified });

});*/

router.post('/register', async (req, res) => {
    // Our register logic starts here
    try {
        console.log('jopa')
        // Get user input
        const { firstName, lastName, email, password } = req.body;

        // Validate user input
        if (!(email && password && firstName && lastName)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        //const oldUser = await User.findOne({ email });

        const connection = await Db.getConnection()

        const userRepository = getRepository(UserInfo);
        const userInfo = await userRepository.findOne({email});

        await connection.close();

        if (userInfo) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUserInfo = new UserInfo();
        newUserInfo.email = email.toLowerCase();
        newUserInfo.lastName = lastName;
        newUserInfo.firstName = firstName;
        newUserInfo.password = encryptedPassword;

        userRepository.save(newUserInfo);

        // Create user in our database
        // Create token
        const token = jwt.sign(
            { user_id: newUserInfo.id, email },
            process.env.TOKEN_KEY ? process.env.TOKEN_KEY : '', 
            { expiresIn: "2h"}
        );
        // save user token
        //newUserInfo.token = token;



        const user: User = {
            firstName: newUserInfo.firstName ? newUserInfo.firstName : '',
            lastName: newUserInfo.lastName ? newUserInfo.lastName : '',
            email: newUserInfo.email ? newUserInfo.email: '',
            token: token
        }

        // return new user
        res.status(201).json(user);
        
    } catch (err) {
        console.log(err);
    }
})

router.post("/login", async (req, res) => {
    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        //const user = await User.findOne({ email });

        const connection = await Db.getConnection()

        const userRepository = getRepository(UserInfo);
        const userInfo = await userRepository.findOne({email});

        await connection.close();

        if (userInfo && (await bcrypt.compare(password, password))) {
            // Create token
            const token = jwt.sign(
                { user_id: userInfo.id, email },
                process.env.TOKEN_KEY ? process.env.TOKEN_KEY : '',
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            const user: User = {
                firstName: userInfo.firstName ? userInfo.firstName : '',
                lastName: userInfo.lastName ? userInfo.lastName : '',
                email: userInfo.email ? userInfo.email : '',
                token: token
            }

            // user
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
});


export default router