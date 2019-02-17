import { app } from 'electron'
import { addBypassChecker } from 'electron-compile'
let path = require('path')
let fs = require('fs')
let del = require('del')

let appUserFolder = app.getPath('userData')
let appPhotosFolder = path.join(appUserFolder, 'Photos/')
let photoPath

/**
 * Support for loading local photos
 */
let localPhotos = () => {
	addBypassChecker((filePath) => {
		return filePath.indexOf(app.getAppPath()) === -1 && (/.jpg/.test(filePath))
	})
}

/**
 * Create app photos folder
 */
let createFolders = () => {
	if (!fs.existsSync(appUserFolder)) fs.mkdirSync(appUserFolder)
	if (!fs.existsSync(appPhotosFolder)) fs.mkdirSync(appPhotosFolder)
}

/**
 * Save downloaded photo to app photos folder
 */
let savePhoto = () => {
	photoPath = appPhotosFolder + +(new Date()) + '.jpg'
	return fs.createWriteStream(photoPath)
}

/**
 * Return new photo path
 */
let getPhotoPath = () => {
	return photoPath
}

/**
 * Delete old photos
 */
let cleanPhotos = () => {
	del([
		appPhotosFolder + '*',
		'!' + photoPath
	], { force: true })
		.then(() => {})
}

export {
	localPhotos,
	createFolders,
	savePhoto,
	getPhotoPath,
	cleanPhotos
}
