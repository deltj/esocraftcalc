const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let priceWindow

function createMainWindow () {
  mainWindow = new BrowserWindow({width: 1200, height: 600, autoHideMenuBar: true})

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

function createPriceWindow() {
  priceWindow = new BrowserWindow({width: 400, height: 600, autoHideMenuBar: true, show: false, parent: mainWindow})

  priceWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'prices.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  //priceWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  priceWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    priceWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
  createMainWindow()
  createPriceWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createMainWindow()
  }
})

ipcMain.on('meaningful-channel-name', (event, arg) => {
  if(arg == 'show-price-window') {
    if(priceWindow === null) {
      createPriceWindow()
    } else {
      priceWindow.show()
    }
  }
})