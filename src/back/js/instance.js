import { app } from 'electron'
import { hasWindow, windowToggle } from './window'
let squirrel = require('electron-squirrel-startup')

/**
 * Handle Win install process
 */
let winInstall = () => {
	if (squirrel) app.quit()
}

/**
 * User can open only one instance of app
 */
let singleInstance = () => {
	let lock = app.requestSingleInstanceLock()
	if (!lock) app.quit()
	else if (hasWindow()) windowToggle()
}

export {
	winInstall,
	singleInstance
}
