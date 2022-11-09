function getLocalStorage(key, initial) {
	console.log('passou...')
	if (window.localStorage.getItem(key)) return window.localStorage.getItem(key)
	return initial
}

export default getLocalStorage
