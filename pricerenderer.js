const {ipcRenderer} = require('electron')
const eso = require('./eso.js')

let prices = {}
let mats = []

document.addEventListener('DOMContentLoaded', function(e) {
    //  Request the price table from the main process
    prices = ipcRenderer.sendSync('request-price-table', '')
    //console.log(prices)

    //  Add materials to the table
    let priceTable = document.getElementById('priceTable')
    let priceTableBody = priceTable.getElementsByTagName('tbody')[0]

    //  Add basic materials
    mats = mats.concat(eso.clothingMats)
    mats = mats.concat(eso.blacksmithingMats)
    mats = mats.concat(eso.woodworkingMats)
    mats = mats.concat(eso.jewelryMats)

    //  Add trait gems
    Object.values(eso.armorTraits).forEach(val => {
        mats.push(val)
    })
    Object.values(eso.weaponTraits).forEach(val => {
        mats.push(val)
    })
    Object.values(eso.jewelryTraits).forEach(val => {
        mats.push(val)
    })

    //  Add improvement items
    Object.values(eso.clothingImprovement).forEach(val => {
        mats.push(val)
    })
    Object.values(eso.blacksmithingImprovement).forEach(val => {
        mats.push(val)
    })
    Object.values(eso.woodworkingImprovement).forEach(val => {
        mats.push(val)
    })
    Object.values(eso.jewelryImprovement).forEach(val => {
        mats.push(val)
    })

    mats.sort()

    mats.forEach(function (item, index) {
        let row = document.createElement('tr')
        let matCell = document.createElement('td')
        let priceCell = document.createElement('td')
        
        matCell.innerHTML = item

        let priceInput = document.createElement('input')
        priceInput.type = 'number'
        priceInput.classList.add = 'priceInput'
        priceInput.value = prices[item]

        priceCell.appendChild(priceInput)

        row.appendChild(matCell)
        row.appendChild(priceCell)

        priceTableBody.appendChild(row)
    })
})

document.getElementById('save').addEventListener('click', () => {
    //  Collect prices from the table
    let priceTable = document.getElementById('priceTable')
    let priceTableBody = priceTable.getElementsByTagName('tbody')[0]

    //  Items in the html price table should be in the same order that they appear in the mats array
    mats.forEach(function (item, index) {
        let row = priceTableBody.rows[index]
        let input = row.cells[1].childNodes[0]
        
        prices[item] = parseInt(input.value)
    })

    ipcRenderer.sendSync('save-price-table', prices)
})

document.getElementById('loadTtc').addEventListener('click', () => {
    //  Request TTC price table load by main process
    prices = ipcRenderer.sendSync('load-ttc-price-table')

    //  Update price table
    let priceTable = document.getElementById('priceTable')
    let priceTableBody = priceTable.getElementsByTagName('tbody')[0]

    //  Items in the html price table should be in the same order that they appear in the mats array
    mats.forEach(function (item, index) {
        let row = priceTableBody.rows[index]
        let input = row.cells[1].childNodes[0]
        
        input.value = prices[item]
    })
})