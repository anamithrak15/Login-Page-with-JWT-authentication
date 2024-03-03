const express = require('express');
const { check, validationResult } = require("express-validator");
const { users } = require('../db.js');
const router = express.Router();
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');


//signup
router.post('/signup', [
    check("email", "Please provide a valid email address").isEmail(),
    check("password", "Please provide a valid password of length greater than 5").isLength({
        min: 6
    })
], async (req, res) => {
    const { password, email } = req.body;

    //validate input
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }


    //validate if user doesn't already exist

    let user = users.find((user) => {
        return user.email === email
    });
    if (user) {
        return res.status(400).json({
            errors: [
                {
                    msg: "This user already exist!",
                }
            ]
        })
    }

    //hashing password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    //to save in db
    users.push({
        email: email,
        password: hashedPassword
    })

    const token = await JWT.sign({
        email
    }, "qwertyuiopasdfghjklzxcvbnm", {
        expiresIn: 3600000
    })

    res.json({
        token
    })
    // res.send("validation passed");
    // console.log(password, email);
    // if (password.length < 6)
    //     res.send('auth')

})



//login
router.post('/login', async (req, res) => {
    const { password, email } = req.body;

    let user = users.find((user) => {
        return user.email === email;
    })

    if (!user) {
        return res.status(400).json({
            errors: [
                {
                    msg: "Invalid Credentials",
                }
            ]
        })
    }

    let isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(400).json({
            errors: [
                {
                    msg: "Invalid Credentials",
                }
            ]
        })
    }
    const token = await JWT.sign({
        email
    }, "qwertyuiopasdfghjklzxcvbnm", {
        expiresIn: 3600000
    })

    res.json({
        token
    })


})

router.get("/all", (req, res) => {
    res.json(users)
})


module.exports = router;