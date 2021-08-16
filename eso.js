/* constants and information related to the crafting system in ESO */

const armorSlots = [
    'Head',
    'Shoulders',
    'Chest',
    'Waist',
    'Feet',
    'Hands',
    'Legs'
]
exports.armorSlots = armorSlots

const armorWeights = [
    'Light',
    'Medium',
    'Heavy'
]
exports.armorWeights = armorWeights

const blacksmithingWeaponTypes = [
    'Axe',
    'Mace',
    'Sword',
    'Battle Axe',
    'Maul',
    'Greatsword',
    'Dagger'
]
exports.blacksmithingWeaponTypes = blacksmithingWeaponTypes

const woodworkingWeaponTypes = [
    'Ice Staff',
    'Flame Staff',
    'Shock Staff',
    'Restoration Staff'
]
exports.woodworkingWeaponTypes = woodworkingWeaponTypes

const jewelryTypes = [
    'Ring',
    'Necklace'
]
exports.jewelryTypes = jewelryTypes

//  An array of available item levels for crafting
const itemLevels = ['1', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22',
    '24', '26', '28', '30', '32', '34', '36', '38', '40', '42', '44', '46', '48',
    '50', 'CP 10', 'CP 20', 'CP 30', 'CP 40', 'CP 50', 'CP 60', 'CP 70' , 'CP 80',
    'CP 90', 'CP 100', 'CP 110', 'CP 120', 'CP 130', 'CP 140', 'CP 150', 'CP 160']
exports.itemLevels = itemLevels

//  Level groupings for figuring out which material to use
const levelGroup1  = ['1', '4', '6', '8', '10', '12', '14']
const levelGroup2  = ['16', '18', '20', '22', '24']
const levelGroup3  = ['26', '28', '30', '32', '34']
const levelGroup4  = ['36', '38', '40', '42', '44']
const levelGroup5  = ['46', '48', '50']
const levelGroup6  = ['CP 10', 'CP 20', 'CP 30']
const levelGroup7  = ['CP 40', 'CP 50', 'CP 60']
const levelGroup8  = ['CP 70', 'CP 80']
const levelGroup9  = ['CP 90', 'CP 100', 'CP 110', 'CP 120', 'CP 130', 'CP 140']
const levelGroup10 = ['CP 150', 'CP 160']
exports.levelGroup1 = levelGroup1
exports.levelGroup2 = levelGroup2
exports.levelGroup3 = levelGroup3
exports.levelGroup4 = levelGroup4
exports.levelGroup5 = levelGroup5
exports.levelGroup6 = levelGroup6
exports.levelGroup7 = levelGroup7
exports.levelGroup8 = levelGroup8
exports.levelGroup9 = levelGroup9
exports.levelGroup10 = levelGroup10

const armorTraits = {
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
exports.armorTraits = armorTraits

const weaponTraits = {
    'Charged' : 'Amethyst',
    'Defending' : 'Turquoise',
    'Infused' : 'Jade',
    'Nirnhoned' : 'Potent Nirncrux',
    'Powered' : 'Chysolite',
    'Precise' : 'Ruby',
    'Sharpened' : 'Fire Opal',
    'Training' : 'Carnelian',
    'Decisive' : 'Citrine'
}
exports.weaponTraits = weaponTraits

const jewelryTraits = {
    'Arcane' : 'Cobalt',
    'Bloodthirsty' : 'Slaughterstone',
    'Harmony' : 'Dibellium',
    'Healthy' : 'Antimony',
    'Infused' : 'Aurbic Amber',
    'Protective' : 'Titanium',
    'Robust' : 'Zinc',
    'Swift' : 'Gilding Wax',
    'Triune' : 'Dawn-Prism'
}
exports.jewelryTraits = jewelryTraits

const qualities = [
    'Basic',
    'Fine',
    'Superior',
    'Epic',
    'Legendary'
]
exports.qualities = qualities

const clothingImprovement = {
    'Fine' : 'Hemming',
    'Superior' : 'Embroidery',
    'Epic' : 'Elegant Lining',
    'Legendary' : 'Dreugh Wax'
}
exports.clothingImprovement = clothingImprovement

const blacksmithingImprovement = {
    'Fine' : 'Honing Stone',
    'Superior' : 'Dwarven Oil',
    'Epic' : 'Grain Solvent',
    'Legendary' : 'Tempering Alloy'
}
exports.blacksmithingImprovement = blacksmithingImprovement

const woodworkingImprovement = {
    'Fine' : 'Pitch',
    'Superior' : 'Turpen',
    'Epic' : 'Mastic',
    'Legendary' : 'Rosin'
}
exports.woodworkingImprovement = woodworkingImprovement

/** Determine whether the specified item is an armor piece.
 * @returns true if the the item is armor, false otherwise
 */
 function isArmor(item) {
    if(eso.armorSlots.includes(item)) {
        return true
    } else {
        return false
    }
}
exports.isArmor = isArmor

/** Determine whether the specified item is a weapon.
 * @returns true if the item is a weapon, false otherwise
 */
function isWeapon(item) {
    if(eso.blacksmithingWeaponTypes.includes(item)) {
        return true
    } else if(eso.woodworkingWeaponTypes.includes(item)) {
        return true
    } else {
        return false
    }
}
exports.isWeapon = isWeapon

/** Determine whether the specified item is a jewelry piece.
 * @returns true if the item is jewelry, false otherwise
 */
function isJewelry(item) {
    if(eso.jewelryTypes.includes(item)) {
        return true
    } else {
        return false
    }
}
exports.isJewelry = isJewelry

/** Determine the material used to craft a light armor item at the specified level */
function clothingMatLight(level) {
    if(eso.levelGroup1.includes(level)) {
        return 'Jute'
    }

    else if(eso.levelGroup2.includes(level)) {
        return 'Flax'
    }

    else if(eso.levelGroup3.includes(level)) {
        return 'Cotton'
    }

    else if(eso.levelGroup4.includes(level)) {
        return 'Spidersilk'
    }

    else if(eso.levelGroup5.includes(level)) {
        return 'Ebonthread'
    }

    else if(eso.levelGroup6.includes(level)) {
        return 'Kresh Fiber'
    }

    else if(eso.levelGroup7.includes(level)) {
        return 'Ironthread'
    }

    else if(eso.levelGroup8.includes(level)) {
        return 'Silverweave'
    }

    else if(eso.levelGroup9.includes(level)) {
        return 'Void Cloth'
    }

    else if(eso.levelGroup10.includes(level)) { 
        return 'Ancestor Silk'
    }

    else {
        return 'Unknown'
    }
}
exports.clothingMatLight = clothingMatLight

/** Determine the material used to craft a medium armor item at the specified level */
function clothingMatMedium(level) {
    if(eso.levelGroup1.includes(level)) {
        return 'Rawhide'
    }

    else if(eso.levelGroup2.includes(level)) {
        return 'Hide'
    }

    else if(eso.levelGroup3.includes(level)) {
        return 'Leather'
    }

    else if(eso.levelGroup4.includes(level)) {
        return 'Thick Leather'
    }

    else if(eso.levelGroup5.includes(level)) {
        return 'Fell Hide'
    }

    else if(eso.levelGroup6.includes(level)) {
        return 'Topgrain Hide'
    }

    else if(eso.levelGroup7.includes(level)) {
        return 'Iron Hide'
    }

    else if(eso.levelGroup8.includes(level)) {
        return 'Superb Hide'
    }

    else if(eso.levelGroup9.includes(level)) {
        return 'Shadowhide'
    }

    else if(eso.levelGroup10.includes(level)) { 
        return 'Rubedo Leather'
    }

    else {
        return 'Unknown'
    }
}
exports.clothingMatMedium = clothingMatMedium

/** Determine the material used to craft a medium armor item at the specified level */
function blacksmithingMat(level) {
    if(eso.levelGroup1.includes(level)) {
        return 'Iron Ingot'
    }

    else if(eso.levelGroup2.includes(level)) {
        return 'Steel Ingot'
    }

    else if(eso.levelGroup3.includes(level)) {
        return 'Orichalcum Ingot'
    }

    else if(eso.levelGroup4.includes(level)) {
        return 'Dwarven Ingot'
    }

    else if(eso.levelGroup5.includes(level)) {
        return 'Ebony Ingot'
    }

    else if(eso.levelGroup6.includes(level)) {
        return 'Calcinium Ingot'
    }

    else if(eso.levelGroup7.includes(level)) {
        return 'Galatite Ingot'
    }

    else if(eso.levelGroup8.includes(level)) {
        return 'Quicksilver Ingot'
    }

    else if(eso.levelGroup9.includes(level)) {
        return 'Voidstone Ingot'
    }

    else if(eso.levelGroup10.includes(level)) { 
        return 'Rubedite Ingot'
    }

    else {
        return 'Unknown'
    }
}
exports.blacksmithingMat = blacksmithingMat

/** Determine the material used to craft a woodworking item at the specified level */
function woodworkingMat(level) {
    if(eso.levelGroup1.includes(level)) {
        return 'Sanded Maple'
    }

    else if(eso.levelGroup2.includes(level)) {
        return 'Sanded Oak'
    }

    else if(eso.levelGroup3.includes(level)) {
        return 'Sanded Beech'
    }

    else if(eso.levelGroup4.includes(level)) {
        return 'Sanded Hickory'
    }

    else if(eso.levelGroup5.includes(level)) {
        return 'Sanded Yew'
    }

    else if(eso.levelGroup6.includes(level)) {
        return 'Sanded Birch'
    }

    else if(eso.levelGroup7.includes(level)) {
        return 'Sanded Ash'
    }

    else if(eso.levelGroup8.includes(level)) {
        return 'Sanded Mahogany'
    }

    else if(eso.levelGroup9.includes(level)) {
        return 'Sanded Nightwood'
    }

    else if(eso.levelGroup10.includes(level)) { 
        return 'Sanded Ruby Ash'
    }

    else {
        return 'Unknown'
    }
}
exports.woodworkingMat = woodworkingMat

/** Determine the material required to craft an armor piece with the specified weight and level */
function armorMatFromWeightAndLevel(weight, level) {
    if(weight == 'Light') {
        return eso.clothingMatLight(level)
    } else if(weight == 'Medium') {
        return eso.clothingMatMedium(level)
    } else if(weight == 'Heavy') {
        return eso.blacksmithingMat(level)
    } else {
        return 'Unknown'
    }
}
exports.armorMatFromWeightAndLevel = armorMatFromWeightAndLevel

/** Determine the quantity of material required to craft an armor item of the specified type and level */
function armorMatQtyFromTypeAndLevel(type, level) {
    var slotFactor = 0
    if(type == 'Chest') {
        slotFactor = 2
    }
    else if(type == 'Legs') {
        slotFactor = 1
    }

    var levelFactor = 0
    if(eso.levelGroup1.includes(level)) {
        levelFactor = 5 + levelGroup1.indexOf(level)
    }

    else if(eso.levelGroup2.includes(level)) {
        levelFactor = 6 + levelGroup2.indexOf(level)
    }

    else if(eso.levelGroup3.includes(level)) {
        levelFactor = 7 + levelGroup3.indexOf(level)
    }

    else if(eso.levelGroup4.includes(level)) {
        levelFactor = 8 + levelGroup4.indexOf(level)
    }

    else if(eso.levelGroup5.includes(level)) {
        levelFactor = 9 + levelGroup5.indexOf(level)
    }

    else if(eso.levelGroup6.includes(level)) {
        levelFactor = 10 + levelGroup6.indexOf(level)
    }

    else if(eso.levelGroup7.includes(level)) {
        levelFactor = 11 + levelGroup7.indexOf(level)
    }

    else if(eso.levelGroup8.includes(level)) {
        levelFactor = 12 + levelGroup8.indexOf(level)
    }

    else if(eso.levelGroup9.includes(level)) {
        levelFactor = 13 + levelGroup9.indexOf(level)
    }

    else if(eso.levelGroup10.includes(level)) { 
        levelFactor = 13
    }

    var matCount = levelFactor + slotFactor

    if(level == 'CP 160') {
        matCount *= 10
    }

    return matCount
}
exports.armorMatQtyFromTypeAndLevel = armorMatQtyFromTypeAndLevel

/** Determine the material required to craft an armor piece with the specified weight and level */
function weaponMatFromTypeAndLevel(type, level) {
    if(eso.blacksmithingWeaponTypes.includes(type)) {
        return eso.blacksmithingMat(level)
    } else if(eso.woodworkingWeaponTypes.includes(type)) {
        return eso.woodworkingMat(level)
    } else {
        return 'Unknown'
    }
}
exports.weaponMatFromTypeAndLevel = weaponMatFromTypeAndLevel

function weaponMatQtyFromTypeAndLevel(type, level) {
    var levelFactor = 0
    if(eso.levelGroup1.includes(level)) {
        levelFactor = 3 + levelGroup1.indexOf(level)
    }

    else if(eso.levelGroup2.includes(level)) {
        levelFactor = 4 + levelGroup2.indexOf(level)
    }

    else if(eso.levelGroup3.includes(level)) {
        levelFactor = 5 + levelGroup3.indexOf(level)
    }

    else if(eso.levelGroup4.includes(level)) {
        levelFactor = 6 + levelGroup4.indexOf(level)
    }

    else if(eso.levelGroup5.includes(level)) {
        levelFactor = 7 + levelGroup5.indexOf(level)
    }

    else if(eso.levelGroup6.includes(level)) {
        levelFactor = 8 + levelGroup6.indexOf(level)
    }

    else if(eso.levelGroup7.includes(level)) {
        levelFactor = 9 + levelGroup7.indexOf(level)
    }

    else if(eso.levelGroup8.includes(level)) {
        levelFactor = 10 + levelGroup8.indexOf(level)
    }

    else if(eso.levelGroup9.includes(level)) {
        levelFactor = 11 + levelGroup9.indexOf(level)
    }

    else if(eso.levelGroup10.includes(level)) { 
        if(eso.woodworkingWeaponTypes.includes(type)) {
            levelFactor = 12
        } else {
            levelFactor = 11
        }
    }

    let bigWeaps = ['Battle Axe', 'Maul', 'Greatsword']
    let sizeFactor = 0
    if(bigWeaps.includes(type)) {
        sizeFactor = 3
    }
    
    let matCount = levelFactor + sizeFactor

    if(level == 'CP 160') {
        matCount *= 10
    }

    return matCount
}
exports.weaponMatQtyFromTypeAndLevel = weaponMatQtyFromTypeAndLevel