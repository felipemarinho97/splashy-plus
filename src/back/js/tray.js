import config from './config'
import { app, Tray, Menu } from 'electron'
import { isWin, isMac, isLinux, isWin7orVista } from './platform'
import { windowToggle } from './window'
import { appClosedAnalytics } from './analytics'
let path = require('path')

let tray

/**
 * Create app tray menu
 */
let createTray = () => {
	if (isWin()) {
		if (isWin7orVista()) {
			tray = new Tray(path.join(__dirname, '../img/trayb.ico'))
		} else {
			tray = new Tray(path.join(__dirname, '../img/tray.ico'))
		}
	} else if (isLinux()) {
		tray = new Tray(path.join(__dirname, '../img/tray.png'))
	} else {
		tray = new Tray(path.join(__dirname, '../img/trayTemplate.png'))
	}
	let menu = Menu.buildFromTemplate([{
		label: config.name,
		click: () => {
			windowToggle()
		}
	}, {
		label: 'Quit',
		click: () => {
			appClosedAnalytics()
			app.quit()
		}
	}])
	tray.setContextMenu(menu)
	tray.setToolTip(config.name)
	if (isMac()) {
		app.dock.hide()
	} else {
		tray.on('click', () => { windowToggle() })
		tray.on('double-click', () => { windowToggle() })
	}
}

export { createTray }
