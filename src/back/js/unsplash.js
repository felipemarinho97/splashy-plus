import { ipcMain } from 'electron'
import config from './config'
import { getSreenSizes } from './screen'
import { changeWallpapers } from './loop'
import { exceptionAnalytics, categorySettingAnalytics } from './analytics'
import { savePhoto } from './files'
import { setWallpaper } from './wallpaper'
import { getCategorySetting, setCategorySetting } from './settings'
let request = require('request')

let unsplashError

/**
 * Download Unsplash wallpaper
 */
let getWallpaper = () => {
	unsplashError = false
	let unsplashRequest = request.get(unsplashPhoto())
		.on('error', downloadError)
		.on('response', (response) => {
			checkResponse(response)
		})
		.pipe(savePhoto())
	unsplashRequest.on('finish', () => {
		unsplashError ? downloadFailed() : downloadSuccess()
	})
}

/**
 * Unsplash photo download link
 */
let unsplashPhoto = () => {
	let [screenWidth, screenHeight] = getSreenSizes()
	let link = config.unsplash
	let category = getCategorySetting()
	link += '/' + screenWidth + 'x' + screenHeight + '/?'
	link += category

	return link
}

/**
 * Photo download error
 */
let downloadError = () => {
	unsplashError = true
}

/**
 * Check response for errors
 */
let checkResponse = (response) => {
	if (response.statusCode !== 200 || (typeof response.request.uri.pathname === 'undefined') || (response.request.uri.pathname.includes(config.error))) downloadError()
}

/**
 * Download failed
 */
let downloadFailed = () => {
	unsplashError = false
	console.log('Photo download failed, 10 sec')
	exceptionAnalytics('Photo download failed')
	setTimeout(() => { changeWallpapers() }, 10000)
}

/**
 * Download success
 */
let downloadSuccess = () => {
	unsplashError = false
	console.log('Photo downloaded & saved')
	setWallpaper()
}

/**
 * Change wallpapers category event
 */
let wallpapersCategoryEvent = () => {
	ipcMain.on('category', (event, category) => {
		console.log('Category changed to ' + category)
		setCategorySetting(category)
		categorySettingAnalytics(category)
	})
}

export {
	getWallpaper,
	wallpapersCategoryEvent
}
