const eso = require('./eso.js')

document.addEventListener('DOMContentLoaded', function(e) {
    //  Add materials to the table
    let priceTable = document.getElementById('priceTable')
    let priceTableBody = priceTable.getElementsByTagName('tbody')[0]

    let mats = []
    mats = mats.concat(eso.clothingMats)
    mats = mats.concat(eso.blacksmithingMats)
    mats = mats.concat(eso.woodworkingMats)
    mats = mats.concat(eso.jewelryMats)
    mats.sort()

    mats.forEach(function (item, index) {
        let row = document.createElement('tr')
        let matCell = document.createElement('td')
        let priceCell = document.createElement('td')
        
        matCell.innerHTML = item

        let priceInput = document.createElement('input')
        priceInput.type = 'number'
        priceInput.classList.add = 'priceInput'
        priceInput.value = 100

        priceCell.appendChild(priceInput)

        row.appendChild(matCell)
        row.appendChild(priceCell)

        priceTableBody.appendChild(row)
    })
})