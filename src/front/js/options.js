import { ipcRenderer } from 'electron'

/**
 * Display user settings in options
 */
let userSettings = () => {
	ipcRenderer.on('options', (event, options) => {
		let optionChange, optionsChangeUnit, optionsChangeValue
		let optionsCategory, optionsCategoryValue
		let optionsLogin, optionsLoginValue
		switch (options.change) {
		case 1:
			optionChange = 1
			optionsChangeUnit = 'minute'
			optionsChangeValue = 1
			break
		case 3:
			optionChange = 3
			optionsChangeUnit = 'minutes'
			optionsChangeValue = 2
			break
		case 5:
			optionChange = 5
			optionsChangeUnit = 'minutes'
			optionsChangeValue = 3
			break
		case 10:
			optionChange = 10
			optionsChangeUnit = 'minutes'
			optionsChangeValue = 4
			break
		case 15:
			optionChange = 15
			optionsChangeUnit = 'minutes'
			optionsChangeValue = 5
			break
		case 30:
			optionChange = 30
			optionsChangeUnit = 'minutes'
			optionsChangeValue = 6
			break
		case 60:
			optionChange = 1
			optionsChangeUnit = 'hour'
			optionsChangeValue = 7
			break
		case (60 * 3):
			optionChange = 3
			optionsChangeUnit = 'hours'
			optionsChangeValue = 8
			break
		case (60 * 6):
			optionChange = 6
			optionsChangeUnit = 'hours'
			optionsChangeValue = 9
			break
		case (60 * 12):
			optionChange = 12
			optionsChangeUnit = 'hours'
			optionsChangeValue = 10
			break
		default:
			optionChange = 24
			optionsChangeUnit = 'hours'
			optionsChangeValue = 11
		}
		document.getElementById('options__change')
			.innerHTML = optionChange
		document.getElementById('options__change_unit')
			.innerHTML = optionsChangeUnit
		document.getElementById('change')
			.value = optionsChangeValue
		switch (options.login) {
		case false:
			optionsLogin = 'No'
			optionsLoginValue = 1
			break
		default:
			optionsLogin = 'Yes'
			optionsLoginValue = 2
		}
		document.getElementById('options__login')
			.innerHTML = optionsLogin
		document.getElementById('login')
			.value = optionsLoginValue
		console.log(options.category)
		switch (options.category) {
		case 'featured':
			optionsCategory = 'Featured'
			optionsCategoryValue = 1
			break
		case 'random':
			optionsCategory = 'Random'
			optionsCategoryValue = 2
			break
		case 'buildings':
			optionsCategory = 'Buildings'
			optionsCategoryValue = 3
			break
		case 'food':
			optionsCategory = 'Food'
			optionsCategoryValue = 4
			break
		case 'nature':
			optionsCategory = 'Nature'
			optionsCategoryValue = 5
			break
		case 'objects':
			optionsCategory = 'Objects'
			optionsCategoryValue = 6
			break
		case 'people':
			optionsCategory = 'People'
			optionsCategoryValue = 7
			break
		case 'technology':
			optionsCategory = 'Technology'
			optionsCategoryValue = 8
			break
		case 'custom':
			optionsCategory = 'Custom'
			optionsCategoryValue = 9
			break
		default:
			document.getElementById('custom')
				.value = options.category
			optionsCategory = 'Custom'
			optionsCategoryValue = 9
		}
		document.getElementById('options__category')
			.innerHTML = optionsCategory
		document.getElementById('category')
			.value = optionsCategoryValue
	})
}

/**
 * Toggle settings screen
 */
let toggleSettings = () => {
	document.getElementById('settings')
		.addEventListener('click', () => {
			let _options = document.getElementById('options')
			let _settings = document.getElementById('settings')
			if (_options.classList.contains('options--visible')) {
				_settings.classList.remove('button--active')
				_options.classList.remove('options--visible')
			} else {
				ipcRenderer.send('settings', true)
				_settings.classList.add('button--active')
				_options.classList.add('options--visible')
			}
		})
}

/**
 * Broadcast settings changes
 */
let changeSettings = () => {
	document.getElementById('change')
		.addEventListener('input', () => {
			let optionChange, optionsChangeUnit
			switch (document.getElementById('change').value) {
			case '1':
				optionChange = 1
				optionsChangeUnit = 'minute'
				break
			case '2':
				optionChange = 3
				optionsChangeUnit = 'minutes'
				break
			case '3':
				optionChange = 5
				optionsChangeUnit = 'minutes'
				break
			case '4':
				optionChange = 10
				optionsChangeUnit = 'minutes'
				break
			case '5':
				optionChange = 15
				optionsChangeUnit = 'minutes'
				break
			case '6':
				optionChange = 30
				optionsChangeUnit = 'minutes'
				break
			case '7':
				optionChange = 1
				optionsChangeUnit = 'hour'
				break
			case '8':
				optionChange = 3
				optionsChangeUnit = 'hours'
				break
			case '9':
				optionChange = 6
				optionsChangeUnit = 'hours'
				break
			case '10':
				optionChange = 12
				optionsChangeUnit = 'hours'
				break
			default:
				optionChange = 24
				optionsChangeUnit = 'hours'
			}
			document.getElementById('options__change')
				.innerHTML = optionChange
			document.getElementById('options__change_unit')
				.innerHTML = optionsChangeUnit
		})

	document.getElementById('change')
		.addEventListener('change', () => {
			let change
			switch (document.getElementById('change').value) {
			case '1':
				change = 1
				break
			case '2':
				change = 3
				break
			case '3':
				change = 5
				break
			case '4':
				change = 10
				break
			case '5':
				change = 15
				break
			case '6':
				change = 30
				break
			case '7':
				change = 60
				break
			case '8':
				change = 60 * 3
				break
			case '9':
				change = 60 * 6
				break
			case '10':
				change = 60 * 12
				break
			default:
				change = 60 * 24
			}
			ipcRenderer.send('change', change)
		})

	document.getElementById('category')
		.addEventListener('input', () => {
			let optionCategory
			switch (document.getElementById('category').value) {
			case '1':
				optionCategory = 'Featured'
				break
			case '2':
				optionCategory = 'Random'
				break
			case '3':
				optionCategory = 'Buildings'
				break
			case '4':
				optionCategory = 'Food'
				break
			case '5':
				optionCategory = 'Nature'
				break
			case '6':
				optionCategory = 'Objects'
				break
			case '7':
				optionCategory = 'People'
				break
			case '8':
				optionCategory = 'Technology'
				break
			case '9':
				optionCategory = 'Custom'
				break
			default:
				optionCategory = 'Featured'
			}
			document.getElementById('options__category')
				.innerHTML = optionCategory
		})

	const custom = document	.getElementById('custom');

	custom.addEventListener("keypress", (e) => {
			if (e.keyCode == 13) {
				ipcRenderer.send("category", custom.value);
			}
		});
		

	document.getElementById('category')
		.addEventListener('change', () => {			
			let category
			switch (document.getElementById('category').value) {
			case '1':
				category = 'featured'
				break
			case '2':
				category = 'random'
				break
			case '3':
				category = 'buildings'
				break
			case '4':
				category = 'food'
				break
			case '5':
				category = 'nature'
				break
			case '6':
				category = 'objects'
				break
			case '7':
				category = 'people'
				break
			case '8':
				category = 'technology'
				break
			case '9':
				category = document.getElementById('custom')
					.value
				break
			default:
				category = 'featured'
			}
			ipcRenderer.send('category', category)
		})

	document.getElementById('login')
		.addEventListener('input', () => {
			let optionsLogin, login
			if (document.getElementById('login').value === '1') {
				optionsLogin = 'No'
				login = false
			} else {
				optionsLogin = 'Yes'
				login = true
			}
			document.getElementById('options__login')
				.innerHTML = optionsLogin
			ipcRenderer.send('login', login)
		})
}

export {
	userSettings,
	toggleSettings,
	changeSettings
}
