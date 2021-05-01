const accessToken = require('../function/verify')

	module.exports = function(roles) {
	return function (req, res, next) {

		if (req.method === 'OPTIONS') {
			next();
		}
		try {
			const token = req.headers.authorization;
			if (!token) {

				return res.status(403).json({message: "Пользователь не авторизован"});
			}
			const role = accessToken(req.headers.authorization);
			console.log(role)
			let hasRole = false;
			roles.forEach(role => {
				if (roles.includes(role)) {
					hasRole = true;
				}
				})
			if (!hasRole) {
				return res.status(403).json({message: "У Вас нет доступа"});
			}
			next();
		} catch (e) {
			console.log(e.message)
			return res.status(403).json({message: "Ошибка авторизации."});
		}
	}
}