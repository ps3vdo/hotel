const accessToken = require('../function/token')

module.exports = function(roles) {
	return function (req, res, next) {

		if (req.method === 'OPTIONS') {
			next();
		}
		try {
			const token = req.headers.authorization;
			if (!token) {

				return res.status(403).json({message: "User is not logged in."});
			}
			const role = accessToken(req.headers.authorization);

			let hasRole = false;
			if (roles.includes(role)) {
				hasRole = true;
				console.log(role)
			}
			if (!hasRole) {
				return res.status(403).json({message: "You don't have access."});
			}
			next();
		} catch (e) {
			console.log(e.message)
			return res.status(403).json({message: "Authorisation Error."});
		}
	}
}