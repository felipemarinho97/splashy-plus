let electron = require('electron')
let isRetina = require('is-retina')

let screenWidth, screenHeight

/**
 * The largest screen sizes
 */
let screenSizes = () => {
	let displays = electron.screen.getAllDisplays()
	let display = displays[0]
	displays.forEach((value, index, displays) => {
		if (display.size.width < displays[index].size.width) display = displays[index]
	})
	screenWidth = (isRetina) ? display.size.width * 2 : display.size.width
	screenHeight = (isRetina) ? display.size.height * 2 : display.size.height
}

/**
 * Return screen sizes
 */
let getSreenSizes = () => {
	return [screenWidth, screenHeight]
}

export {
	screenSizes,
	getSreenSizes
}
