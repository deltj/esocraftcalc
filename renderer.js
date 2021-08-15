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
    row.appendChild(document.createElement('td'))
    row.appendChild(document.createElement('td'))
    row.appendChild(document.createElement('td'))
    row.appendChild(document.createElement('td'))
    row.appendChild(document.createElement('td'))
    row.appendChild(document.createElement('td'))
    row.appendChild(document.createElement('td'))
    row.appendChild(document.createElement('td'))
    row.appendChild(document.createElement('td'))
    row.appendChild(document.createElement('td'))
    row.appendChild(document.createElement('td'))

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
    var armorTable = document.querySelector('#itemTable tbody')
    var shoppingListTable = document.getElementById('shoppingList')

    var shoppingList = {}

    //  Loop over the armor table and update the shopping list
    for (var i = 0, row; row = armorTable.rows[i]; i++) {
        var mat = row.cells[5].innerHTML
        var qty = parseInt(row.cells[6].innerHTML)
        var gem = row.cells[7].innerHTML
        var fine = row.cells[8].innerHTML
        var fineQty = parseInt(row.cells[9].innerHTML)
        var superior = row.cells[10].innerHTML
        var superiorQty = parseInt(row.cells[11].innerHTML)
        var epic = row.cells[12].innerHTML
        var epicQty = parseInt(row.cells[13].innerHTML)
        var legendary = row.cells[14].innerHTML
        var legendaryQty = parseInt(row.cells[15].innerHTML)

        if(mat in shoppingList) {
            shoppingList[mat] += qty
        } else {
            shoppingList[mat] = qty
        }

        if(gem in shoppingList) {
            shoppingList[gem] += 1
        } else {
            shoppingList[gem] = 1
        }

        if(fineQty > 0 ) {
            if(fine in shoppingList) {
                shoppingList[fine] += fineQty
            } else {
                shoppingList[fine] = fineQty
            }
        }

        if(superiorQty > 0) {
            if(superior in shoppingList) {
                shoppingList[superior] += superiorQty
            } else {
                shoppingList[superior] = superiorQty
            }
        }

        if(epicQty > 0) {
            if(epic in shoppingList) {
                shoppingList[epic] += epicQty
            } else {
                shoppingList[epic] = epicQty
            }
        }

        if(legendaryQty > 0) {
            if(legendary in shoppingList) {
                shoppingList[legendary] += legendaryQty
            } else {
                shoppingList[legendary] = legendaryQty
            }
        }
    }

    //  Make a new shopping list
    var oldShoppingListTableBody = shoppingListTable.getElementsByTagName('tbody')[0]
    var newShoppingListTableBody = document.createElement('tbody')
    Object.keys(shoppingList).forEach(function(item) {
        var shoppingListRow = document.createElement('tr')
        var itemCell = document.createElement('td')
        var qtyCell = document.createElement('td')

        itemCell.innerHTML = item
        qtyCell.innerHTML = shoppingList[item]

        shoppingListRow.appendChild(itemCell)
        shoppingListRow.appendChild(qtyCell)

        newShoppingListTableBody.appendChild(shoppingListRow)
    })
    shoppingListTable.replaceChild(newShoppingListTableBody, oldShoppingListTableBody)
}

function updateArmorRow(rowIndex) {
    var table = document.getElementById('armorTable')
    var row = table.getElementsByTagName('tr')[rowIndex]

    //  Get item slot
    var slot = row.cells[0].childNodes[0].value
    //console.log('slot: ' + slot)
    //  Get item level
    var level = row.cells[1].childNodes[0].value
    //console.log('level: ' + level)

    //  Get item weight
    var weight = row.cells[2].childNodes[0].value
    if(weight == 'Light' || weight == 'Medium') {
        row.cells[8].innerHTML  = clothingImprovement['Fine']
        row.cells[10].innerHTML = clothingImprovement['Superior']
        row.cells[12].innerHTML = clothingImprovement['Epic']
        row.cells[14].innerHTML = clothingImprovement['Legendary']
    } else if(weight == 'Heavy') {
        row.cells[8].innerHTML  = blacksmithingImprovement['Fine']
        row.cells[10].innerHTML = blacksmithingImprovement['Superior']
        row.cells[12].innerHTML = blacksmithingImprovement['Epic']
        row.cells[14].innerHTML = blacksmithingImprovement['Legendary']
    }
    //console.log('weight: ' + weight)

    //  Get the required material
    var mat = armorMatFromLevelAndWeight(level, weight)
    row.cells[5].innerHTML = mat

    //  Get the required material quantity
    var matCount = armorMatCountFromSlotAndLevel(slot, level)
    row.cells[6].innerHTML = matCount

    //  Get the required trait gem
    var trait = row.cells[3].childNodes[0].value
    var traitGem = armorTraits[trait]
    row.cells[7].innerHTML = traitGem

    //  Update improvement stuff
    var quality = row.cells[4].childNodes[0].value
    if(quality == 'Basic') {
        row.cells[9].innerHTML  = 0
        row.cells[11].innerHTML = 0
        row.cells[13].innerHTML = 0
        row.cells[15].innerHTML = 0
    } else if(quality == 'Fine') {
        row.cells[9].innerHTML  = 2
        row.cells[11].innerHTML = 0
        row.cells[13].innerHTML = 0
        row.cells[15].innerHTML = 0
    } else if(quality == 'Superior') {
        row.cells[9].innerHTML  = 2
        row.cells[11].innerHTML = 3
        row.cells[13].innerHTML = 0
        row.cells[15].innerHTML = 0
    } else if(quality == 'Epic') {
        row.cells[9].innerHTML  = 2
        row.cells[11].innerHTML = 3
        row.cells[13].innerHTML = 4
        row.cells[15].innerHTML = 0
    } else if(quality == 'Legendary') {
        row.cells[9].innerHTML  = 2
        row.cells[11].innerHTML = 3
        row.cells[13].innerHTML = 4
        row.cells[15].innerHTML = 8
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