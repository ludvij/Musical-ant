const { app, BrowserWindow } = require("electron");

const server = require("./server");

let mainWindow;

const createWindow = () => {
	mainWindow = new BrowserWindow({
		show: false,
		autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: true
		}
	})
	mainWindow.maximize()
	mainWindow.show()
	mainWindow.loadURL('http://localhost:3000')
	mainWindow.on('closed', () => {
		mainWindow = null
	})
}

app.on('ready', createWindow)


app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})