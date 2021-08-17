const eso = require('./eso.js')

//  Cached item prices used for calculating the crafting cost
var priceTable = {
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
    'Pewter Ounces' : 1,
    'Copper Ounces' : 1,
    'Silver Ounces' : 1,
    'Electrum Ounces' : 1,
    'Platinum Ounces' : 1,

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
    'Terne Plating' : 1,
    'Iridium Plating' : 1,
    'Zircon Plating' : 1,
    'Chromium Plating' : 1,

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

    var types = eso.armorSlots.concat(eso.blacksmithingWeaponTypes).concat(eso.woodworkingWeaponTypes)
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

    row.appendChild(typeCell)
    row.appendChild(levelCell)
    row.appendChild(weightCell)
    row.appendChild(traitCell)
    row.appendChild(qualityCell)

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
    } else if(eso.isJewelry(item)) {

    }

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

//  Handle adding new items to craft
document.getElementById('addItem').addEventListener('click', () => {
    addItem()
})

//  Use event delegation to handle clicks to elements in the item table
document.getElementById('itemTable').addEventListener('change', function(e) {
    //console.log('onChange:' + e.target.nodeName)

    if(e.target && e.target.nodeName == 'SELECT') {
        //console.log('select changed!')

        var row = e.target.closest('tr')
        //console.log('rowIndex: ' + row.rowIndex)

        updateItemTableRow(row.rowIndex)
    }
})