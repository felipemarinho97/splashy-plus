import { ipcMain } from 'electron'
import config from './config'
import { windowSendSettings } from './window'
import { getSreenSizes } from './screen'
import { screenViewAnalytics } from './analytics'
let settings = require('electron-settings')

/**
 * Manage user settings
 */
let userSettings = () => {
	if (firstInstall()) createSettings()
	logSettings()
	windowSendSettings(getChangeSetting(), getCategorySetting(), getLoginSetting())
}

/**
 * Create user settings
 */
let createSettings = () => {
	setChangeSetting(config.change)
	setCategorySetting(config.category)
	setLoginSetting(config.login)
}

/**
 * App is opening for the first time if there is no settings
 */
let firstInstall = () => {
	return !settings.has('change')
}

/**
 * Get wallpaper changing interval setting
 */
let getChangeSetting = () => {
	return settings.get('change')
}

/**
 * Get wallpaper category setting
 */
let getCategorySetting = () => {
	return settings.get('category')
}

/**
 * Get auto-login setting
 */
let getLoginSetting = () => {
	return settings.get('login')
}

/**
 * Set wallpaper changing interval setting
 */
let setChangeSetting = (change) => {
	settings.set('change', change)
}

/**
 * Set wallpaper category setting
 */
let setCategorySetting = (category) => {
	settings.set('category', category)
}

/**
 * Set auto-login setting
 */
let setLoginSetting = (login) => {
	settings.set('login', login)
}

/**
 * Settings event
 */
let settingsEvent = () => {
	ipcMain.on('settings', (event, settings) => {
		screenViewAnalytics('Settings')
	})
}

/**
 * Log settings to console
 */
let logSettings = () => {
	let [screenWidth, screenHeight] = getSreenSizes()
	console.log('Interval ' + getChangeSetting())
	console.log('Category ' + getCategorySetting())
	console.log('Autologin ' + getLoginSetting())
	console.log('Width ' + screenWidth)
	console.log('Height ' + screenHeight)
}

export {
	userSettings,
	createSettings,
	firstInstall,
	getChangeSetting,
	getCategorySetting,
	getLoginSetting,
	setChangeSetting,
	setCategorySetting,
	setLoginSetting,
	settingsEvent
}
