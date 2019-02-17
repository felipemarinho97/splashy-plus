import { ipcMain } from 'electron'
import { isOnline } from './online'
import { windowSendChanging } from './window'
import { getWallpaper } from './unsplash'
import { getChangeSetting, setChangeSetting } from './settings'
import { randomWallpaperAnalytics, changeSettingAnalytics } from './analytics'

let wallpaperInterval

/**
 * Change wallpapers
 */
let changeWallpapers = () => {
	if (isOnline()) {
		windowSendChanging()
		wallpapersInterval()
		getWallpaper()
	} else {
		wallpapersIntervalOffline()
	}
}

/**
 * Change wallpaper every X minutes
 */
let wallpapersInterval = () => {
	clearInterval(wallpaperInterval)
	wallpaperInterval = setInterval(changeWallpapers, getChangeSetting() * 60000) // Min to ms
	console.log('Next ' + nextChange())
}

/**
 * Try to change wallpaper every 3 seconds
 */
let wallpapersIntervalOffline = () => {
	clearInterval(wallpaperInterval)
	wallpaperInterval = setInterval(changeWallpapers, 3000)
}

/**
 * Random wallpaper event
 */
let randomWallpaperEvent = () => {
	ipcMain.on('random', () => {
		console.log('Random wallpaper')
		randomWallpaperAnalytics()
		changeWallpapers()
	})
}

/**
 * Change wallpapers interval event
 */
let wallpapersIntervalEvent = () => {
	ipcMain.on('change', (event, change) => {
		console.log('Interval changed ' + change)
		setChangeSetting(change)
		changeSettingAnalytics(change)
		wallpapersInterval()
	})
}

/**
 * Calculate when next wallpaper change will occur
 */
let nextChange = () => {
	let now = new Date()
	let next = new Date(now.getTime() + (getChangeSetting() * 60 * 1000))
	let hours = next.getHours()
	let minutes = next.getMinutes()
	return hours + ':' + ((minutes < 10) ? ('0' + minutes) : minutes)
}

export {
	changeWallpapers,
	randomWallpaperEvent,
	wallpapersIntervalEvent
}
