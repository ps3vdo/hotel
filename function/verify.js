const config = require('../config');
const crypto = require("crypto");

module.exports = function (token) {
    token = token.split(' ')[1];
    const [oneString, twoString, verify] = token.split('.');
    const decryptString = Buffer.from(twoString, "base64").toString()
    const {id, role, expires_at} = JSON.parse(decryptString);
    const tokenWithOut = oneString + '.' + twoString;
    const treeString = crypto.createHmac('sha256', config.SECRET).update(tokenWithOut).digest('hex');
    if(treeString !== verify) throw new Error ("У Вас нет доступа");
    if(expires_at < Date.now()) throw new Error ("Требуется повторная авторизация");
    return role;
}