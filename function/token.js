const config = require('../config');
const crypto = require('crypto');

const generateAccessToken = (id, role) => {
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

const verify = function (token) {
    token = token.split(' ')[1];
    const [oneString, twoString, verify] = token.split('.');
    const decryptString = Buffer.from(twoString, "base64").toString()
    const {id, role, expires_at} = JSON.parse(decryptString);
    const tokenWithOut = oneString + '.' + twoString;
    const treeString = crypto.createHmac('sha256', config.SECRET).update(tokenWithOut).digest('hex');
    if(treeString !== verify) throw new Error ("You don't have access");
    if(expires_at < Date.now()) throw new Error ("Re-authorization required");
    return role;
}

module.exports = {verify, generateAccessToken};
//TODO access token renewal