import config from './config'
import { getLoginSetting, setLoginSetting } from './settings'
import { loginSettingAnalytics } from './analytics'
import { ipcMain } from 'electron'
let AutoLaunch = require('auto-launch-patched')

/**
 * Enable autolaunch on user login if settings say so
 */
let autoLaunch = () => {
	disableAutoLaunch()
	if (getLoginSetting()) {
		setTimeout(() => { enableAutoLaunch() }, 5000)
	}
}

/**
 * Enable autolaunch on user login
 */
let enableAutoLaunch = () => {
	let autoLauncher = new AutoLaunch({
		name: config.name,
		isHidden: true
	})
	autoLauncher.enable()
		.then(() => {
			console.log('Autologin enabled')
		})
		.catch(() => {})
}

/**
 * Disable autolaunch on user login
 */
let disableAutoLaunch = () => {
	let autoLauncher = new AutoLaunch({
		name: config.name,
		isHidden: true
	})
	autoLauncher.disable()
		.then(() => {
			console.log('Autologin disabled')
		})
		.catch(() => {})
}

/**
 * Autolaunch event
 */
let autoLaunchEvent = () => {
	ipcMain.on('login', (event, login) => {
		console.log('Autologin changed ' + login)
		setLoginSetting(login)
		loginSettingAnalytics(login)
		login ? enableAutoLaunch() : disableAutoLaunch()
	})
}

export {
	autoLaunch,
	autoLaunchEvent
}
