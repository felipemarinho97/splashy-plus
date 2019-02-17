let os = require('os')

/**
 * Get platform
 */
let getPlatform = () => {
	return os.platform()
}

/**
 * Platform is Windows
 */
let isWin = () => {
	return (os.platform() === 'win32')
}

/**
 * Platform is macOS
 */
let isMac = () => {
	return (os.platform() === 'darwin')
}

/**
 * Platform is Linux
 */
let isLinux = () => {
	return (os.platform() === 'linux')
}

/**
 * Windows version is 7 or Vista
 * @see msdn.microsoft.com/en-us/library/ms724832(VS.85).aspx
 */
let isWin7orVista = () => {
	let win = os.release()
	return (win.startsWith('6.1') || win.startsWith('6.0'))
}

export {
	getPlatform,
	isWin,
	isMac,
	isLinux,
	isWin7orVista
}
