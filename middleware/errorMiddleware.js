const ApiError = require('../error/apiError');

module.exports = function (err, req, res) {
	if (err instanceof ApiError) {
		return res.status(err.status).json(err.message)
	}
	return res.status(500).json({ message: 'Unexpected error' })
}