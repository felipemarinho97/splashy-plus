import { ipcRenderer } from 'electron'

/**
 * Online checker
 */
let onlineStatus = () => {
	navigator.onLine ? online() : offline()
	window.addEventListener('online', online)
	window.addEventListener('offline', offline)
}

/**
 * User is online
 */
let online = () => {
	sendOnlineStatus()
	document.getElementById('offline')
		.classList.add('messages--hidden')
}

/**
 * User is offline
 */
let offline = () => {
	sendOnlineStatus()
	document.getElementById('offline')
		.classList.remove('messages--hidden')
}

/**
 * Broadcast online event
 */
let sendOnlineStatus = () => {
	ipcRenderer.send('online', !!navigator.onLine)
}

export { onlineStatus }
