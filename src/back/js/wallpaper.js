import { getPhotoPath, cleanPhotos } from './files'
import { windowSendPhoto, windowsSendWallpaperChanged } from './window'
import { changeWallpapers } from './loop'
import { wallpaperChangedAnalytics, exceptionAnalytics } from './analytics'
let wallpaper = require('wallpaper')

/**
 * Set wallpaper
 */
let setWallpaper = () => {
	let photoPath = getPhotoPath()
	windowSendPhoto(photoPath)
	wallpaper.set(photoPath)
		.then(wallpaperSet, wallpaperSetFailed)
}

/**
 * Wallpepr has been set
 */
let wallpaperSet = () => {
	console.log('Wallpaper set')
	wallpaperChangedAnalytics()
	windowsSendWallpaperChanged()
	cleanPhotos()
}

/**
 * Setting wallpaper has failed
 */
let wallpaperSetFailed = () => {
	console.log('Wallpaper set failed')
	exceptionAnalytics('Wallpaper set failed')
	changeWallpapers()
}

export { setWallpaper }
