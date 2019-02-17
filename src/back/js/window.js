import config from './config'
import { ipcMain, BrowserWindow } from 'electron'
import { firstInstall } from './settings'
import { isWin } from './platform'
import { appOpenedAnalytics, screenViewAnalytics, linkOpenedAnalytics } from './analytics'
let path = require('path')
let open = require('open')

let window = null

/**
 * Create app browser window
 */
let createWindow = () => {
	window = new BrowserWindow({
		title: config.name,
		width: config.width,
		height: config.height,
		frame: false,
		center: true,
		show: false,
		skipTaskbar: true,
		resizable: false,
		minimizable: false,
		maximizable: false,
		fullscreenable: false,
		backgroundColor: '#111',
		icon: path.join(__dirname, '../img/icon.png')
	})
	window.loadURL(path.join('file://', __dirname, '../../front/html/app.jade'))
	if (firstInstall()) setTimeout(() => { windowToggle() }, 1000)
	appOpenedAnalytics()
	// window.webContents.openDevTools()
}

/**
 * Check if window is created
 */
let hasWindow = () => {
	return (window != null)
}

/**
 * Toggle app browser window visibility
 */
let windowToggle = () => {
	if (window.isVisible()) {
		window.isFocused() ? window.hide() : window.focus()
	} else {
		window.show()
		screenViewAnalytics('App')
	}
}

/**
 * Send user settings to app browser window
 */
let windowSendSettings = (change, category, login) => {
	window.webContents.on('did-finish-load', () => {
		window.webContents.send('options', {
			change: change,
			category: category,
			login: login
		})
	})
}

/**
 * Send photo to app browser window
 */
let windowSendPhoto = (photoPath) => {
	if (isWin()) photoPath = photoPath.replace(/\\/g, '/')
	window.webContents.send('photo', photoPath)
}

/**
 * Send information that wallpaper has been changed
 */
let windowsSendWallpaperChanged = () => {
	window.webContents.send('changed', true)
}

/**
 * Send changing to app browser window
 */
let windowSendChanging = () => {
	window.webContents.send('changing', true)
}

/**
 * Open links event
 */
let linksEvent = () => {
	window.webContents.on('new-window', (event, url) => {
		event.preventDefault()
		linkOpenedAnalytics(url)
		open(url)
	})
}

/**
 * Close window event
 */
let closeEvent = () => {
	ipcMain.on('close', () => {
		windowToggle()
	})
}

export {
	createWindow,
	hasWindow,
	windowToggle,
	windowSendSettings,
	windowSendPhoto,
	windowsSendWallpaperChanged,
	windowSendChanging,
	linksEvent,
	closeEvent
}
