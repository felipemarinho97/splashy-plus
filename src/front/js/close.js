import { ipcRenderer } from 'electron'

/**
 * Broadcast close event
 */
let closeWindow = () => {
	document.getElementById('close')
		.addEventListener('click', () => {
			ipcRenderer.send('close')
		})
}

export { closeWindow }
