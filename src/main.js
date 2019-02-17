import { app } from 'electron'
import { winInstall, singleInstance } from './back/js/instance'
import { localPhotos, createFolders } from './back/js/files'
import { screenSizes } from './back/js/screen'
import { userAnalytics } from './back/js/analytics'
import { createTray } from './back/js/tray'
import { createWindow, linksEvent, closeEvent } from './back/js/window'
import { userSettings, settingsEvent } from './back/js/settings'
import { onlineEvent } from './back/js/online'
import { changeWallpapers, randomWallpaperEvent, wallpapersIntervalEvent } from './back/js/loop'
import { wallpapersCategoryEvent } from './back/js/unsplash'
import { autoLaunch, autoLaunchEvent } from './back/js/login'

// Before app is ready
winInstall()
singleInstance()
localPhotos()

/**
 * Start app
 */
let startApp = () => {
	screenSizes()
	createFolders()
	userAnalytics()
	createTray()
	createWindow()
	userSettings()
	autoLaunch()
	registerEvents()
	changeWallpapers()
}

/**
 * User events
 */
let registerEvents = () => {
	onlineEvent()
	randomWallpaperEvent()
	wallpapersIntervalEvent()
	wallpapersCategoryEvent()
	autoLaunchEvent()
	linksEvent()
	settingsEvent()
	closeEvent()
}

/**
 * Close app
 */
let closeApp = () => {
	app.quit()
}

// Let the magic begin
app.on('ready', startApp)

// By by :(
app.on('window-all-closed', closeApp)
