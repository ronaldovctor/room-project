const API_URL = 'http://localhost:5000'

export const VALIDATE_TOKEN = (token) => {
	return {
		url: `${API_URL}/token/validate`,
		options: {
			method: 'POST',
			headers: {
				Authorization: `${token}`,
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
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
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
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userInfos),
		},
	}
}

export const ADD_FAV = (user, favorite) => {
	console.log(user)
	return {
		url: `${API_URL}/favorite/add`,
		options: {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: window.localStorage.getItem('token'),
			},
			body: JSON.stringify({ ...user, favorite }),
		},
	}
}

export const REMOVE_FAV = (user, favorite) => {
	return {
		url: `${API_URL}/favorite/remove`,
		options: {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: window.localStorage.getItem('token'),
			},
			body: JSON.stringify({ ...user, favorite }),
		},
	}
}
