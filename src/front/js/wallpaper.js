import { ipcRenderer } from 'electron'

/**
 * Set wallpaper as app background
 */
let changeBackground = () => {
	ipcRenderer.on('photo', (event, photoPath) => {
		document.getElementById('background')
			.style.backgroundImage = "url('" + photoPath + "')"
	})
}

/**
 * Wallpepr has been changed
 */
let wallpaperChanged = () => {
	ipcRenderer.on('changed', (event, changed) => {
		document.getElementById('loader')
			.classList.add('messages--hidden')
	})
}

/**
 * Broadcast random event
 */
let randomWallpaper = () => {
	document.getElementById('random')
		.addEventListener('click', () => {
			ipcRenderer.send('random')
		})
}

/**
 * Wallpaper changing indicator
 */
let wallpaperChanging = () => {
	ipcRenderer.on('changing', (event, status) => {
		document.getElementById('loader')
			.classList.remove('messages--hidden')
	})
}

export {
	changeBackground,
	wallpaperChanged,
	randomWallpaper,
	wallpaperChanging
}
