const {app, BrowserWindow, dialog, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const ttc = require('./ttc.js')

//  Cached item prices used for calculating the crafting cost
//  Note: This price table is only meant to be a starting point for the user.  Updated prices are expected
//  to be entered manually or loaded from TTC
let priceTable = {
    //  Clothing/Light
    'Jute' : 1,
    'Flax' : 1,
    'Cotton' : 1,
    'Spidersilk' : 1,
    'Ebonthread' : 1,
    'Kresh Fiber' : 1,
    'Ironthread' : 1,
    'Silverweave' : 1,
    'Void Cloth' : 1,
    'Ancestor Silk' : 33,

    //  Clothing/Medium
    'Rawhide' : 1,
    'Hide' : 1,
    'Leather' : 1,
    'Thick Leather' : 1,
    'Fell Hide' : 1,
    'Topgrain Hide' : 1,
    'Iron Hide' : 1,
    'Superb Hide' : 1,
    'Shadowhide' : 1,
    'Rubedo Leather' : 15,

    //  Blacksmithing
    'Iron Ingot' : 1,
    'Steel Ingot' : 1,
    'Orichalcum Ingot' : 1,
    'Dwarven Ingot' : 1,
    'Ebony Ingot' : 1,
    'Calcinium Ingot' : 1,
    'Galatite Ingot' : 1,
    'Quicksilver Ingot' : 1,
    'Voidstone Ingot' : 1,
    'Rubedite Ingot' : 6.5,

    //  Woodworking
    'Sanded Maple' : 1,
    'Sanded Oak' : 1,
    'Sanded Beech' : 1,
    'Sanded Hickory' : 1,
    'Sanded Yew' : 1,
    'Sanded Birch' : 1,
    'Sanded Ash' : 1,
    'Sanded Mahogany' : 1,
    'Sanded Nightwood' : 1,
    'Sanded Ruby Ash' : 1,

    //  Jewelry
    'Pewter Ounce' : 7.20,
    'Copper Ounce' : 11,
    'Silver Ounce' : 71,
    'Electrum Ounce' : 83,
    'Platinum Ounce' : 35,

    //  Clothing improvement
    'Hemming' : 17,
    'Embroidery' : 17,
    'Elegant Lining' : 300,
    'Dreugh Wax' : 16000,

    //  Blacksmithing improvement
    'Honing Stone' : 19,
    'Dwarven Oil' : 19,
    'Grain Solvent' : 600,
    'Tempering Alloy' : 8203,

    //  Woodworking improvement
    'Pitch' : 1,
    'Turpen' : 1,
    'Mastic' : 1,
    'Rosin' : 1,

    //  Jewelry improvement
    'Terne Plating' : 1770,
    'Iridium Plating' : 12050,
    'Zircon Plating' : 69000,
    'Chromium Plating' : 205000,

    //  Armor traits
    'Sapphire' : 4,
    'Garnet' : 3,
    'Diamond' : 3,
    'Bloodstone' : 3,
    'Fortified Nirncrux' : 2373,
    'Sardonyx' : 4,
    'Quartz' : 2.8,
    'Emerald' : 15,
    'Almandine' : 2,

    //  Weapon traits
    'Amethyst' : 2,
    'Turquoise' : 2,
    'Jade' : 2,
    'Potent Nirncrux' : 2,
    'Chysolite' : 2,
    'Ruby' : 2,
    'Fire Opal' : 2,
    'Carnelian' : 2,
    'Citrine' : 2,

    //  Jewelry traits
    'Cobalt' : 1,
    'Slaughterstone' : 1,
    'Dibellium' : 1,
    'Antimony' : 1,
    'Aurbic Amber' : 1,
    'Titanium' : 1,
    'Zinc' : 1,
    'Gilding Wax' : 1,
    'Dawn-Prism' : 1,
}

//  Window object references
let mainWindow = null
let priceWindow = null

/** Creates the main window, which displays the item table and the shopping list table */
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

/** Creates the price window, which displays a table of crafting materials and associated prices for the user to edit */
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

//  The request-price-table message is sent by the mainWindow renderer when it needs updated price data
ipcMain.on('request-price-table', (event, arg) => {
    event.returnValue = priceTable
})

//  The load-ttc-price-table message is sent by the priceWindow when the user has requested price data from TTC
ipcMain.on('load-ttc-price-table', (event, arg) => {
    ttc.loadTtcPriceTable().then((pt) => {
        priceTable = pt
        event.returnValue = pt
    }).catch(() => {
        console.log(dialog.showMessageBox(priceWindow, {title: 'Error', message: 'Failed to open TTC price table.  Is TTC installed?', type: 'error'}))
    })
})

ipcMain.on('save-price-table', (event, arg) => {
  console.log(arg)
  priceTable = arg
  mainWindow.webContents.send('update-price-table', priceTable)
  priceWindow.close()
})

ipcMain.on('show-price-window', (event, arg) => {
  if(priceWindow === null) {
    createPriceWindow()
  }

  priceWindow.show()
})