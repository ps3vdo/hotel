const config = require('../config');
const crypto = require('crypto');

module.exports = generateAccessToken = (id, role) => {
    const header = {
        "alg": "HS256",
        "typ": "JWT"
    }
    const payload = {
        id,
        role,
        expires_at: Date.now() + 60*60*1000
    }

    const oneString = Buffer.from(JSON.stringify(header)).toString("base64");
    const twoString = Buffer.from(JSON.stringify(payload)).toString("base64");
    const tokenWithOut = oneString + "." + twoString;
    const treeString = crypto.createHmac('sha256', config.SECRET).update(tokenWithOut).digest('hex');
    return tokenWithOut + "." + treeString;
}