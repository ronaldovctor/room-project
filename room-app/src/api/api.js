const API_URL = 'http://localhost:5000'

export const VALIDATE_TOKEN = (token) => {
	return {
		url: `${API_URL}/token/validate`,
		options: {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	}
}

export const USER_LOGIN = (emailPassword) => {
	return {
		url: `${API_URL}/login`,
		options: {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(emailPassword),
		},
	}
}

export const USER_EDIT = (user) => {
	return {
		url: `${API_URL}/user/edit`,
		options: {
			body: JSON.stringify(user),
		},
	}
}

export const USER_DELETE = (idPassword) => {
	return {
		url: `${API_URL}/user/delete`,
		options: {
			body: JSON.stringify(idPassword),
		},
	}
}

export const USER_CREATE = (userInfos) => {
	return {
		url: `${API_URL}/create`,
		options: {
			body: JSON.stringify(userInfos),
		},
	}
}
