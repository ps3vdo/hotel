const ApiError('../error.apiError');
module.exports = function(err, req, res, next) {
	if (err instanceof ApiError) {
	return res.status(err.status).json({err.message})
	}
	return res.status(500).json({message: 'Unexpected error'})
}