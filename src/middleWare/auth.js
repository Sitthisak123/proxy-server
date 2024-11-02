const axios = require('axios');

async function auth(req, res, next) {
    const access_sessionID = req.headers['x-access-sessionID'];
    try {
        console.log(access_sessionID)
    } catch (err) {
        return res.status(400).send({});
    }
    return next();
}

module.exports = auth;