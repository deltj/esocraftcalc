const {ipcRenderer} = require('electron')
const eso = require('./eso.js')

/** The array of items to be crafted */
var items = []

/** Adds an item to the table of crafted items */
function addItem() {
    var table = document.querySelector('#itemTable tbody')
    var row = document.createElement('tr')

    var typeCell = document.createElement('td')
    var levelCell = document.createElement('td')
    var weightCell = document.createElement('td')
    var traitCell = document.createElement('td')
    var qualityCell = document.createElement('td')
    var deleteCell = document.createElement('td')

    var types = eso.armorSlots.concat(eso.blacksmithingWeaponTypes).concat(eso.woodworkingWeaponTypes).concat(eso.jewelryTypes)
    types.sort()
    var typeSelect = document.createElement('select')
    types.forEach(function (item, index) {
        var opt = document.createElement('option')
        opt.value = item
        opt.text = item
        typeSelect.appendChild(opt)
    })

    var levelSelect = document.createElement('select')
    eso.itemLevels.forEach(function (item, index) {
        var opt = document.createElement('option')
        opt.value = item
        opt.text = item
        levelSelect.appendChild(opt)
    })
    levelSelect.value = 'CP 160'

    var weightSelect = document.createElement('select')
    eso.armorWeights.forEach(function (item, index) {
        var opt = document.createElement('option')
        opt.value = item
        opt.text = item
        weightSelect.appendChild(opt)
    })

    var traitSelect = document.createElement('select')
    for (var key in eso.armorTraits) {
        var opt = document.createElement('option')
        opt.value = key
        opt.text = key
        traitSelect.appendChild(opt)
    }

    var qualitySelect = document.createElement('select')
    eso.qualities.forEach(function (item, index) {
        var opt = document.createElement('option')
        opt.value = item
        opt.text = item
        qualitySelect.appendChild(opt)
    })
    qualitySelect.value = 'Epic'
    
    typeCell.appendChild(typeSelect)
    levelCell.appendChild(levelSelect)
    weightCell.appendChild(weightSelect)
    traitCell.appendChild(traitSelect)
    qualityCell.appendChild(qualitySelect)
    deleteCell.innerHTML = '<input type="image" id="deleteItem" src="./assets/delete.png" width="28" height="28" />'

    row.appendChild(typeCell)
    row.appendChild(levelCell)
    row.appendChild(weightCell)
    row.appendChild(traitCell)
    row.appendChild(qualityCell)
    row.appendChild(deleteCell)

    table.appendChild(row)

    updateItemTableRow(document.getElementById('itemTable').rows.length - 1)
}

/** Update the specified row index in the item table. */
function updateItemTableRow(rowIndex) {
    var itemTable = document.getElementById('itemTable')
    var row = itemTable.rows[rowIndex]

    //  If this item isn't in the items array, add it
    if(!items[rowIndex]) {
        items[rowIndex] = {}
    }

    var type = row.cells[0].childNodes[0].value
    var level = row.cells[1].childNodes[0].value
    var weight = row.cells[2].childNodes[0].value
    var quality = row.cells[4].childNodes[0].value

    //  Show/hide the weight selector depending on whether the item is armor
    var weightSelect = row.cells[2].childNodes[0]
    var traitSelect = row.cells[3].childNodes[0]
    
    //  Check if item type has changed
    if(items[rowIndex].type != type) {
        if(eso.isArmor(type)) {
            //  Show weight select
            weightSelect.style.display = 'block'

            //  Set armor traits
            var newTraitSelect = document.createElement('select')
            for (var key in eso.armorTraits) {
                var opt = document.createElement('option')
                opt.value = key
                opt.text = key
                newTraitSelect.appendChild(opt)
            }
            row.cells[3].replaceChild(newTraitSelect, traitSelect)
            newTraitSelect.value = 'Divines'
        }

        else if(eso.isWeapon(type)) {
            //  Hide weight select
            weightSelect.style.display = 'none'

            //  Set weapon traits
            var newTraitSelect = document.createElement('select')
            for (var key in eso.weaponTraits) {
                var opt = document.createElement('option')
                opt.value = key
                opt.text = key
                newTraitSelect.appendChild(opt)
            }
            row.cells[3].replaceChild(newTraitSelect, traitSelect)
            newTraitSelect.value = 'Charged'
        }

        else if(eso.isJewelry(type)) {
            //  Hide weight select
            weightSelect.style.display = 'none'

            //  Set weapon traits
            var newTraitSelect = document.createElement('select')
            for (var key in eso.jewelryTraits) {
                var opt = document.createElement('option')
                opt.value = key
                opt.text = key
                newTraitSelect.appendChild(opt)
            }
            row.cells[3].replaceChild(newTraitSelect, traitSelect)
            newTraitSelect.value = 'Arcane'
        }
    }

    var trait = row.cells[3].childNodes[0].value

    items[rowIndex].type = type
    items[rowIndex].level = level
    items[rowIndex].weight = weight
    items[rowIndex].trait = trait
    items[rowIndex].quality = quality

    //  Update material, trait, and improvement accordingly
    if(eso.isArmor(type)) {
        items[rowIndex].mat = eso.armorMatFromWeightAndLevel(weight, level)
        items[rowIndex].matQty = eso.armorMatQtyFromTypeAndLevel(type, level)
        items[rowIndex].traitGem = eso.armorTraits[trait]

        if(weight == 'Light' || weight == 'Medium') {
            items[rowIndex].fineMat  = eso.clothingImprovement['Fine']
            items[rowIndex].superiorMat = eso.clothingImprovement['Superior']
            items[rowIndex].epicMat = eso.clothingImprovement['Epic']
            items[rowIndex].legendaryMat = eso.clothingImprovement['Legendary']
        } else if(weight == 'Heavy') {
            items[rowIndex].fineMat  = eso.blacksmithingImprovement['Fine']
            items[rowIndex].superiorMat = eso.blacksmithingImprovement['Superior']
            items[rowIndex].epicMat = eso.blacksmithingImprovement['Epic']
            items[rowIndex].legendaryMat = eso.blacksmithingImprovement['Legendary']
        }

        if(quality == 'Basic') {
            items[rowIndex].fineQty  = 0
            items[rowIndex].superiorQty = 0
            items[rowIndex].epicQty = 0
            items[rowIndex].legendaryQty = 0
        } else if(quality == 'Fine') {
            items[rowIndex].fineQty  = 2
            items[rowIndex].superiorQty = 0
            items[rowIndex].epicQty = 0
            items[rowIndex].legendaryQty = 0
        } else if(quality == 'Superior') {
            items[rowIndex].fineQty  = 2
            items[rowIndex].superiorQty = 3
            items[rowIndex].epicQty = 0
            items[rowIndex].legendaryQty = 0
        } else if(quality == 'Epic') {
            items[rowIndex].fineQty  = 2
            items[rowIndex].superiorQty = 3
            items[rowIndex].epicQty = 4
            items[rowIndex].legendaryQty = 0
        } else if(quality == 'Legendary') {
            items[rowIndex].fineQty  = 2
            items[rowIndex].superiorQty = 3
            items[rowIndex].epicQty = 4
            items[rowIndex].legendaryQty = 8
        }
    } else if(eso.isWeapon(type)) {
        items[rowIndex].mat = eso.weaponMatFromTypeAndLevel(type, level)
        items[rowIndex].matQty = eso.weaponMatQtyFromTypeAndLevel(type, level)
        items[rowIndex].traitGem = eso.weaponTraits[trait]

        if(eso.blacksmithingWeaponTypes.includes(type)) {
            items[rowIndex].fineMat  = eso.blacksmithingImprovement['Fine']
            items[rowIndex].superiorMat = eso.blacksmithingImprovement['Superior']
            items[rowIndex].epicMat = eso.blacksmithingImprovement['Epic']
            items[rowIndex].legendaryMat = eso.blacksmithingImprovement['Legendary']
        } else if(eso.woodworkingWeaponTypes.includes(type)) {
            items[rowIndex].fineMat  = eso.woodworkingImprovement['Fine']
            items[rowIndex].superiorMat = eso.woodworkingImprovement['Superior']
            items[rowIndex].epicMat = eso.woodworkingImprovement['Epic']
            items[rowIndex].legendaryMat = eso.woodworkingImprovement['Legendary']
        }

        if(quality == 'Basic') {
            items[rowIndex].fineQty  = 0
            items[rowIndex].superiorQty = 0
            items[rowIndex].epicQty = 0
            items[rowIndex].legendaryQty = 0
        } else if(quality == 'Fine') {
            items[rowIndex].fineQty  = 2
            items[rowIndex].superiorQty = 0
            items[rowIndex].epicQty = 0
            items[rowIndex].legendaryQty = 0
        } else if(quality == 'Superior') {
            items[rowIndex].fineQty  = 2
            items[rowIndex].superiorQty = 3
            items[rowIndex].epicQty = 0
            items[rowIndex].legendaryQty = 0
        } else if(quality == 'Epic') {
            items[rowIndex].fineQty  = 2
            items[rowIndex].superiorQty = 3
            items[rowIndex].epicQty = 4
            items[rowIndex].legendaryQty = 0
        } else if(quality == 'Legendary') {
            items[rowIndex].fineQty  = 2
            items[rowIndex].superiorQty = 3
            items[rowIndex].epicQty = 4
            items[rowIndex].legendaryQty = 8
        }
    } else if(eso.isJewelry(type)) {
        items[rowIndex].mat = eso.jewelryMatFromLevel(level)
        items[rowIndex].matQty = eso.jewelryMatQtyFromTypeAndLevel(type, level)
        items[rowIndex].traitGem = eso.jewelryTraits[trait]

        items[rowIndex].fineMat  = eso.jewelryImprovement['Fine']
        items[rowIndex].superiorMat = eso.jewelryImprovement['Superior']
        items[rowIndex].epicMat = eso.jewelryImprovement['Epic']
        items[rowIndex].legendaryMat = eso.jewelryImprovement['Legendary']

        if(quality == 'Basic') {
            items[rowIndex].fineQty  = 0
            items[rowIndex].superiorQty = 0
            items[rowIndex].epicQty = 0
            items[rowIndex].legendaryQty = 0
        } else if(quality == 'Fine') {
            items[rowIndex].fineQty  = 1
            items[rowIndex].superiorQty = 0
            items[rowIndex].epicQty = 0
            items[rowIndex].legendaryQty = 0
        } else if(quality == 'Superior') {
            items[rowIndex].fineQty  = 1
            items[rowIndex].superiorQty = 2
            items[rowIndex].epicQty = 0
            items[rowIndex].legendaryQty = 0
        } else if(quality == 'Epic') {
            items[rowIndex].fineQty  = 1
            items[rowIndex].superiorQty = 2
            items[rowIndex].epicQty = 3
            items[rowIndex].legendaryQty = 0
        } else if(quality == 'Legendary') {
            items[rowIndex].fineQty  = 1
            items[rowIndex].superiorQty = 2
            items[rowIndex].epicQty = 3
            items[rowIndex].legendaryQty = 4
        }
    }

    updateShoppingList()
}

/** Update the specified row index in the item table. */
function deleteItemTableRow(rowIndex) {
    document.getElementById('itemTable').deleteRow(rowIndex)
    items.splice(rowIndex, 1)
    updateShoppingList()
}

function updateShoppingList() {
    var shoppingList = {}

    //  Loop over items and update the shopping list
    items.forEach(function (item, index) {
        //console.log(item)

        if(item.mat in shoppingList) {
            shoppingList[item.mat] += item.matQty
        } else {
            shoppingList[item.mat] = item.matQty
        }

        if(item.traitGem in shoppingList) {
            shoppingList[item.traitGem] += 1
        } else {
            shoppingList[item.traitGem] = 1
        }

        if(item.fineQty > 0 ) {
            if(item.fineMat in shoppingList) {
                shoppingList[item.fineMat] += item.fineQty
            } else {
                shoppingList[item.fineMat] = item.fineQty
            }
        }

        if(item.superiorQty > 0) {
            if(item.superiorMat in shoppingList) {
                shoppingList[item.superiorMat] += item.superiorQty
            } else {
                shoppingList[item.superiorMat] = item.superiorQty
            }
        }

        if(item.epicQty > 0) {
            if(item.epicMat in shoppingList) {
                shoppingList[item.epicMat] += item.epicQty
            } else {
                shoppingList[item.epicMat] = item.epicQty
            }
        }

        if(item.legendaryQty > 0) {
            if(item.legendaryMat in shoppingList) {
                shoppingList[item.legendaryMat] += item.legendaryQty
            } else {
                shoppingList[item.legendaryMat] = item.legendaryQty
            }
        }
    })

    //  Update the shopping list table
    var shoppingListTable = document.getElementById('shoppingList')
    var oldShoppingListTableBody = shoppingListTable.getElementsByTagName('tbody')[0]
    var newShoppingListTableBody = document.createElement('tbody')
    var totalCost = 0
    Object.keys(shoppingList).forEach(function(item) {
        var shoppingListRow = document.createElement('tr')
        var itemCell = document.createElement('td')
        var qtyCell = document.createElement('td')
        var costCell = document.createElement('td')

        var cost = shoppingList[item] * priceTable[item]

        itemCell.innerHTML = item
        qtyCell.innerHTML = shoppingList[item]
        costCell.innerHTML = cost.toLocaleString()

        totalCost += cost

        shoppingListRow.appendChild(itemCell)
        shoppingListRow.appendChild(qtyCell)
        shoppingListRow.appendChild(costCell)

        newShoppingListTableBody.appendChild(shoppingListRow)
    })
    shoppingListTable.replaceChild(newShoppingListTableBody, oldShoppingListTableBody)

    shoppingListTableFooter = shoppingListTable.getElementsByTagName('tfoot')[0]
    shoppingListTableFooter.rows[0].cells[1].innerHTML = totalCost.toLocaleString()
}

//  Handle click for the add item button
document.getElementById('addItem').addEventListener('click', () => {
    addItem()
})

//  Handle click for the edit material proces button
document.getElementById('editPrices').addEventListener('click', () => {
    ipcRenderer.send('show-price-window', '')
})

//  Use event delegation to handle clicks to selects in the item table
document.getElementById('itemTable').addEventListener('change', function(e) {
    if(e.target && e.target.nodeName == 'SELECT') {
        let row = e.target.closest('tr')
        updateItemTableRow(row.rowIndex)
    }
})

//  Use event delegation to handle clicks to row delete buttons
document.getElementById('itemTable').addEventListener('click', function(e) {
    if(e.target && e.target.nodeName == 'INPUT') {
        let row = e.target.closest('tr')
        deleteItemTableRow(row.rowIndex)
    }
})

ipcRenderer.on('update-price-table', (event, arg) => {
    priceTable = arg
    updateShoppingList()
})