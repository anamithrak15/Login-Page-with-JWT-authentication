const JWT = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(400).json({
            errors: [
                {
                    msg: "No token found",
                }
            ]
        })
    }

    try { let u = await JWT.verify(token, "qwertyuiopasdfghjklzxcvbnm");
    req.user = u.email;
next() }
    catch (error) {
        return res.status(400).json({
            errors: [
                {
                    msg: "Invalid token",
                }
            ]
        })
    }

}
