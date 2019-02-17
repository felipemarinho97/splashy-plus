import config from './config'
import { firstInstall } from './settings'
import { getPlatform } from './platform'
import { getSreenSizes} from './screen'
let analytics = require('universal-analytics')

let user

/**
 * Init user analytics
 */
let userAnalytics = () => {
	user = analytics(config.analytics)
	if (firstInstall()) installAnalytics()
}

/**
 * Send app install analytics event
 */
let installAnalytics = () => {
	let [screenWidth, screenHeight] = getSreenSizes()
	user.event('Application', 'Application installed').send()
	user.event('Environment', 'Platform', getPlatform()).send()
	user.event('Environment', 'Width', screenWidth).send()
	user.event('Environment', 'Height', screenHeight).send()
}

/**
 * Send app opened analytics event
 */
let appOpenedAnalytics = () => {
	user.event('Application', 'Application opened').send()
}

/**
 * Send app closed analytics event
 */
let appClosedAnalytics = () => {
	user.event('Application', 'Application closed').send()
}

/**
 * Send screen view analytics event
 */
let screenViewAnalytics = (screen) => {
	user.screenview(screen, config.name).send()
}

/**
 * Send exception analytics event
 */
let exceptionAnalytics = (exception) => {
	user.exception(exception).send()
}

/**
 * Send random wallpaper analytics event
 */
let randomWallpaperAnalytics = () => {
	user.event('Wallpapers', 'Next wallpaper').send()
}

/**
 * Send changed interval analytics event
 */
let changeSettingAnalytics = (change) => {
	user.event('Settings', 'Changed interval', change).send()
}

/**
 * Send changed category analytics event
 */
let categorySettingAnalytics = (category) => {
	user.event('Settings', 'Changed category', category).send()
}

/**
 * Send changed autolaunch analytics event
 */
let loginSettingAnalytics = (login) => {
	user.event('Settings', 'Changed autolaunch', (login) ? 'True' : 'False').send()
}

/**
 * Send wallpaper changed analytics event
 */
let wallpaperChangedAnalytics = () => {
	user.event('Wallpapers', 'Wallpaper changed').send()
}

/**
 * Send link opened analytics event
 */
let linkOpenedAnalytics = (url) => {
	user.event('Links', 'Link opened', url).send()
}

export {
	userAnalytics,
	appOpenedAnalytics,
	appClosedAnalytics,
	screenViewAnalytics,
	exceptionAnalytics,
	randomWallpaperAnalytics,
	changeSettingAnalytics,
	categorySettingAnalytics,
	loginSettingAnalytics,
	wallpaperChangedAnalytics,
	linkOpenedAnalytics
}
