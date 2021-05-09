class ApiError extends Error {
	constructor(status, message) {
		super();
		this.status = status;
		this.message = message;
	}

	static badRequest(message) {					//ошибка запроса
		return new ApiError(404, message);
	}
	static internal(message) {						//внутренняя ошибка
		return new ApiError(500, message);
	}
	static forbidden(message) {						//ошибка доступа
		return new ApiError(403, message);
	}
}

module.exports = ApiError;