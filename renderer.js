var priceTable = {
    //  Light
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

    //  Medium
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

    //  Heavy
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
}

var armorSlots = [
    'Head',
    'Shoulders',
    'Chest',
    'Waist',
    'Feet',
    'Hands',
    'Legs'
]

var armorLevels = [1]
for(let i=2; i <= 25; i++) {
    armorLevels.push(i * 2)
}
for(let i=1; i <= 16; i++) {
    armorLevels.push('CP ' + i * 10)
}

//  Level groupings for figuring out which material to use
var levelGroup1  = ['1', '4', '6', '8', '10', '12', '14']
var levelGroup2  = ['16', '18', '20', '22', '24']
var levelGroup3  = ['26', '28', '30', '32', '34']
var levelGroup4  = ['36', '38', '40', '42', '44']
var levelGroup5  = ['46', '48', '50']
var levelGroup6  = ['CP 10', 'CP 20', 'CP 30']
var levelGroup7  = ['CP 40', 'CP 50', 'CP 60']
var levelGroup8  = ['CP 70', 'CP 80']
var levelGroup9  = ['CP 90', 'CP 100', 'CP 110', 'CP 120', 'CP 130', 'CP 140']
var levelGroup10 = ['CP 150', 'CP 160']

var armorWeights = [
    'Light',
    'Medium',
    'Heavy'
]

var armorTraits = {
    'Divines' : 'Sapphire',
    'Invigorating' : 'Garnet',
    'Impenetrable' : 'Diamond',
    'Infused' : 'Bloodstone',
    'Nirnhoned' : 'Fortified Nirncrux',
    'Reinforced' : 'Sardonyx',
    'Sturdy' : 'Quartz',
    'Training' : 'Emerald',
    'Well-Fitted' : 'Almandine'
}

var qualities = [
    'Basic',
    'Fine',
    'Superior',
    'Epic',
    'Legendary'
]

var clothingImprovement = {
    'Fine' : 'Hemming',
    'Superior' : 'Embroidery',
    'Epic' : 'Elegant Lining',
    'Legendary' : 'Dreugh Wax'
}

var blacksmithingImprovement = {
    'Fine' : 'Honing Stone',
    'Superior' : 'Dwarven Oil',
    'Epic' : 'Grain Solvent',
    'Legendary' : 'Tempering Alloy'
}

var items = []

function addItem() {
    var table = document.querySelector('#itemTable tbody')
    var row = document.createElement('tr')

    var typeCell = document.createElement('td')
    var levelCell = document.createElement('td')
    var weightCell = document.createElement('td')
    var traitCell = document.createElement('td')
    var qualityCell = document.createElement('td')

    var typeSelect = document.createElement('select')
    armorSlots.forEach(function (item, index) {
        var opt = document.createElement('option')
        opt.value = item
        opt.text = item
        typeSelect.appendChild(opt)
    })

    var levelSelect = document.createElement('select')
    armorLevels.forEach(function (item, index) {
        var opt = document.createElement('option')
        opt.value = item
        opt.text = item
        levelSelect.appendChild(opt)
    })
    levelSelect.value = 'CP 160'

    var weightSelect = document.createElement('select')
    armorWeights.forEach(function (item, index) {
        var opt = document.createElement('option')
        opt.value = item
        opt.text = item
        weightSelect.appendChild(opt)
    })

    var traitSelect = document.createElement('select')
    for (var key in armorTraits) {
        var opt = document.createElement('option')
        opt.value = key
        opt.text = key
        traitSelect.appendChild(opt)
    }

    var qualitySelect = document.createElement('select')
    qualities.forEach(function (item, index) {
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

    updateArmorRow(document.getElementById('armorTable').rows.length - 1)
}

function armorMatFromLevelAndWeight(level, weight) {
    if(weight == 'Light') {
        if(levelGroup1.includes(level)) {
            return 'Jute'
        }

        else if(levelGroup2.includes(level)) {
            return 'Flax'
        }

        else if(levelGroup3.includes(level)) {
            return 'Cotton'
        }

        else if(levelGroup4.includes(level)) {
            return 'Spidersilk'
        }

        else if(levelGroup5.includes(level)) {
            return 'Ebonthread'
        }

        else if(levelGroup6.includes(level)) {
            return 'Kresh Fiber'
        }

        else if(levelGroup7.includes(level)) {
            return 'Ironthread'
        }

        else if(levelGroup8.includes(level)) {
            return 'Silverweave'
        }

        else if(levelGroup9.includes(level)) {
            return 'Void Cloth'
        }

        else if(levelGroup10.includes(level)) { 
            return 'Ancestor Silk'
        }
    } else if(weight == 'Medium') {
        if(levelGroup1.includes(level)) {
            return 'Rawhide'
        }

        else if(levelGroup2.includes(level)) {
            return 'Hide'
        }

        else if(levelGroup3.includes(level)) {
            return 'Leather'
        }

        else if(levelGroup4.includes(level)) {
            return 'Thick Leather'
        }

        else if(levelGroup5.includes(level)) {
            return 'Fell Hide'
        }

        else if(levelGroup6.includes(level)) {
            return 'Topgrain Hide'
        }

        else if(levelGroup7.includes(level)) {
            return 'Iron Hide'
        }

        else if(levelGroup8.includes(level)) {
            return 'Superb Hide'
        }

        else if(levelGroup9.includes(level)) {
            return 'Shadowhide'
        }

        else if(levelGroup10.includes(level)) { 
            return 'Rubedo Leather'
        }
    } else if(weight == 'Heavy') {
        if(levelGroup1.includes(level)) {
            return 'Iron Ingot'
        }

        else if(levelGroup2.includes(level)) {
            return 'Steel Ingot'
        }

        else if(levelGroup3.includes(level)) {
            return 'Orichalcum Ingot'
        }

        else if(levelGroup4.includes(level)) {
            return 'Dwarven Ingot'
        }

        else if(levelGroup5.includes(level)) {
            return 'Ebony Ingot'
        }

        else if(levelGroup6.includes(level)) {
            return 'Calcinium Ingot'
        }

        else if(levelGroup7.includes(level)) {
            return 'Galatite Ingot'
        }

        else if(levelGroup8.includes(level)) {
            return 'Quicksilver Ingot'
        }

        else if(levelGroup9.includes(level)) {
            return 'Voidstone Ingot'
        }

        else if(levelGroup10.includes(level)) { 
            return 'Rubedite Ingot'
        }
    }

    return 'Unknown'
}

function armorMatCountFromSlotAndLevel(slot, level) {
    var slotFactor = 0
    if(slot == 'Chest') {
        slotFactor = 2
    }
    else if(slot == 'Legs') {
        slotFactor = 1
    }

    var levelFactor = 0
    if(levelGroup1.includes(level)) {
        levelFactor = 5 + levelGroup1.indexOf(level)
    }

    else if(levelGroup2.includes(level)) {
        levelFactor = 6 + levelGroup2.indexOf(level)
    }

    else if(levelGroup3.includes(level)) {
        levelFactor = 7 + levelGroup3.indexOf(level)
    }

    else if(levelGroup4.includes(level)) {
        levelFactor = 8 + levelGroup4.indexOf(level)
    }

    else if(levelGroup5.includes(level)) {
        levelFactor = 9 + levelGroup5.indexOf(level)
    }

    else if(levelGroup6.includes(level)) {
        levelFactor = 10 + levelGroup6.indexOf(level)
    }

    else if(levelGroup7.includes(level)) {
        levelFactor = 11 + levelGroup7.indexOf(level)
    }

    else if(levelGroup8.includes(level)) {
        levelFactor = 12 + levelGroup8.indexOf(level)
    }

    else if(levelGroup9.includes(level)) {
        levelFactor = 13 + levelGroup9.indexOf(level)
    }

    else if(levelGroup10.includes(level)) { 
        levelFactor = 13
    }

    var matCount = levelFactor + slotFactor

    if(level == 'CP 160') {
        matCount *= 10
    }

    return matCount
}

function updateShoppingList() {
    var shoppingList = {}

    //  Loop over the armor table and update the shopping list
    items.forEach(function (item, index) {
        console.log(item)

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
        costCell.innerHTML = cost

        totalCost += cost

        shoppingListRow.appendChild(itemCell)
        shoppingListRow.appendChild(qtyCell)
        shoppingListRow.appendChild(costCell)

        newShoppingListTableBody.appendChild(shoppingListRow)
    })
    shoppingListTable.replaceChild(newShoppingListTableBody, oldShoppingListTableBody)

    shoppingListTableFooter = shoppingListTable.getElementsByTagName('tfoot')[0]
    shoppingListTableFooter.rows[0].cells[1].innerHTML = totalCost
}

function updateArmorRow(rowIndex) {
    var table = document.getElementById('armorTable')
    var row = table.getElementsByTagName('tr')[rowIndex]

    //  Get item slot
    var slot = row.cells[0].childNodes[0].value

    //  Get item level
    var level = row.cells[1].childNodes[0].value

    //  Get item weight
    var weight = row.cells[2].childNodes[0].value

    //  Get the material required to craft the basic item
    var mat = armorMatFromLevelAndWeight(level, weight)

    //  Get the required material quantity
    var matQty = armorMatCountFromSlotAndLevel(slot, level)

    //  Get the required trait gem
    var trait = row.cells[3].childNodes[0].value
    var traitGem = armorTraits[trait]

    if(!items[rowIndex]) {
        items[rowIndex] = {}
    }
    
    items[rowIndex].mat = mat
    items[rowIndex].matQty = matQty
    items[rowIndex].traitGem = traitGem

    //  Update improvement materials
    if(weight == 'Light' || weight == 'Medium') {
        items[rowIndex].fineMat  = clothingImprovement['Fine']
        items[rowIndex].superiorMat = clothingImprovement['Superior']
        items[rowIndex].epicMat = clothingImprovement['Epic']
        items[rowIndex].legendaryMat = clothingImprovement['Legendary']
    } else if(weight == 'Heavy') {
        items[rowIndex].fineMat  = blacksmithingImprovement['Fine']
        items[rowIndex].superiorMat = blacksmithingImprovement['Superior']
        items[rowIndex].epicMat = blacksmithingImprovement['Epic']
        items[rowIndex].legendaryMat = blacksmithingImprovement['Legendary']
    }

    //  Update improvement material quantities
    var quality = row.cells[4].childNodes[0].value
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

    updateShoppingList()
}

//  Handle adding new armor pieces to the armor table
document.getElementById('addArmorButton').addEventListener('click', () => {
    addItem()
})

//  Use event delegation to handle clicks to elements in the armor table
document.getElementById('armorTable').addEventListener('change', function(e) {
    //console.log('onChange:' + e.target.nodeName)

    if(e.target && e.target.nodeName == 'SELECT') {
        //console.log('select changed!')

        var row = e.target.closest('tr')
        //console.log('rowIndex: ' + row.rowIndex)

        updateArmorRow(row.rowIndex)
    }
})