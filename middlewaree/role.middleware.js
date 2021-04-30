const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = function(roles) {
	return function (req, res, next) {

		if (req.method === 'OPTIONS') {
			next();
		}
		try {
			const token = req.header.autorization.split('.')[1];
			if (!token) {
				return res.status(403).json({message: "Пользователь не авторизован"});
			}

			const {role: userRole} = jwt.verify(token, config.SECRET);
			let hasRole = false;
			userRole.forEach(role => {
				if (roles.includes(role)) {
					hasRole = true;
				}
			})
			if (!hasRole) {
				return res.status(403).json({message: "У Вас нет доступа"});
			}
			next();
		} catch (e) {
			console.log(e)
			return res.status(403).json({message: "Пользователь не авторизован"});
		}
	}
}