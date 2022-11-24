import { useState } from 'react'

const types = {
	name: {
		regex: /^\w{3,}\s(?:\w{2}\s\w{3,}|\w{3,})\s?.+/i,
		message: 'É preciso no mínimo nome e sobrenome.',
	},
	email: {
		regex: /^[A-Za-z0-9+_.-]+@(.+)$/,
		message: 'Preencha um email válido.',
	},
	password: {
		regex: '',
		message: '',
	},
	address: {
		regex: /^[A-Z]{2}(?:,\s|\s)(?:\w+)(?:,\s|\s)Rua.+(?:,\s|\s)[N-n]°\s\d/i,
		message: 'Siga o padrão (Sigla, Cidade, Rua, Número)',
	},
}

function useForm(type) {
	const [value, setValue] = useState('')
	const [error, setError] = useState(null)

	function validate(val) {
		if (!val.length) {
			setError('Preencha o campo.')
			return false
		} else if (types[type] && !types[type].regex.test(val)) {
			setError(types[type].message)
			return false
		} else {
			setError(null)
			return true
		}
	}

	function onChange({ target }) {
		if (error) validate(target.value)
		setValue(target.value)
	}

	return {
		value,
		error,
		onChange,
		onBlur: () => validate(value),
		validate: () => validate(value),
	}
}

export default useForm
