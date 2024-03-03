const express = require('express');
const router = express.Router();
const { publicPosts } = require('../db.js');
const { privatePosts } = require('../db.js');
const checkUser = require('../middleware/checkuser.js')

router.get('/public', (req, res) => {
    res.json(publicPosts);
})

//here private posts are accessible only to authorised users, so we use middleware to check if it's authorised
router.get('/private', checkUser, (req, res) => {
    res.json(privatePosts);
})


module.exports = router;
