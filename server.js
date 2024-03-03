const express = require("express");
const router = express.Router();
const auth = require('./routes/auth.js');
const posts = require('./routes/posts.js');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());
app.use("/auth", auth);
app.use("/posts", posts);
app.get('/', (req, res) => {
    res.send('hi, home page here');
})

app.listen(3000, () => {
    console.log('The server is running in port 3000')
})


