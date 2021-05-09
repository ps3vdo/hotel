const {verify} = require('../function/token');
const ApiError = require('../error/apiError');

module.exports = function(roles) {
	return function (req, res, next) {

		if (req.method === 'OPTIONS') {
			next();
		}
		try {
			const token = req.headers.authorization;
			if (!token) {

				return next(ApiError.forbidden("User is not logged in."));
			}
			const role = verify(req.headers.authorization);

			let hasRole = false;
			if (roles.includes(role)) {
				hasRole = true;
			}
			if (!hasRole) {
				return next(ApiError.forbidden("You don't have access."));
			}
			next();
		} catch (e) {
			console.log(e.message)
			return next(ApiError.forbidden("Authorisation Error."));
		}
	}
}