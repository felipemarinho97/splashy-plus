import { ipcMain } from 'electron'

let online = false

/**
 * Online event
 */
let onlineEvent = () => {
	ipcMain.on('online', (event, status) => {
		console.log('Online ' + status)
		online = status
	})
}

/**
 * App is online
 */
let isOnline = () => {
	online ? console.log('Online') : console.log('Offline')
	return online
}

export {
	onlineEvent,
	isOnline
}
