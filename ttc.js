const homedir = require('os').homedir()
const fs = require('fs')

const ttcPriceTablePath = homedir + "\\Documents\\Elder Scrolls Online\\live\\AddOns\\TamrielTradeCentre\\PriceTable.lua"

const ttcStrings = {
    'Jute' :                '[3320]={[0]={[1]',
    'Flax' :                '[3088]={[0]={[1]',
    'Cotton' :              '[153]={[0]={[1]',
    'Spidersilk' :          '[4770]={[0]={[1]',
    'Ebonthread' :          '[1603]={[0]={[1]',
    'Kresh Fiber' :         '[1517]={[0]={[1]',
    'Ironthread' :          '[1051]={[0]={[1]',
    'Silverweave' :         '[1622]={[0]={[1]',
    'Void Cloth' :          '[4815]={[0]={[1]',
    'Ancestor Silk' :       '[3799]={[0]={[1]',
    'Rawhide' :             '[2145]={[0]={[1]',
    'Hide' :                '[4791]={[0]={[1]',
    'Leather' :             '[6108]={[0]={[1]',
    'Thick Leather' :       '[4775]={[0]={[1]',
    'Fell Hide' :           '[1729]={[0]={[1]',
    'Topgrain Hide' :       '[890]={[0]={[1]',
    'Iron Hide' :           '[4033]={[0]={[1]',
    'Superb Hide' :         '[3251]={[0]={[1]',
    'Shadowhide' :          '[1180]={[0]={[1]',
    'Rubedo Leather' :      '[2318]={[0]={[1]',

    'Iron Ingot' :          '[3265]={[0]={[1]',
    'Steel Ingot' :         '[1637]={[0]={[1]',
    'Orichalcum Ingot' :    '[678]={[0]={[1]',
    'Dwarven Ingot' :       '[1630]={[0]={[1]',
    'Ebony Ingot' :         '[1906]={[0]={[1]',
    'Calcinium Ingot' :     '[1760]={[0]={[1]',
    'Galatite Ingot' :      '[790]={[0]={[1]',
    'Quicksilver Ingot' :   '[2644]={[0]={[1]',
    'Voidstone Ingot' :     '[1798]={[0]={[1]',
    'Rubedite Ingot' :      '[1321]={[0]={[1]',

    'Sanded Maple' :        '[3411]={[0]={[1]',
    'Sanded Oak' :          '[32]={[0]={[1]',
    'Sanded Beech' :        '[162]={[0]={[1]',
    'Sanded Hickory' :      '[3314]={[0]={[1]',
    'Sanded Yew' :          '[217]={[0]={[1]',
    'Sanded Birch' :        '[469]={[0]={[1]',
    'Sanded Ash' :          '[5411]={[0]={[1]',
    'Sanded Mahogany' :     '[228]={[0]={[1]',
    'Sanded Nightwood' :    '[476]={[0]={[1]',
    'Sanded Ruby Ash' :     '[117]={[0]={[1]',

    'Pewter Ounce' :        '[17820]={[0]={[1]',
    'Copper Ounce' :        '[17788]={[0]={[1]',
    'Silver Ounce' :        '[18060]={[0]={[1]',
    'Electrum Ounce' :      '[17828]={[0]={[1]',
    'Platinum Ounce' :      '[18031]={[0]={[1]',

    'Sapphire' :            '[5444]={[0]={[1]',
    'Garnet' :              '[4915]={[0]={[1]',
    'Diamond' :             '[713]={[0]={[1]',
    'Bloodstone' :          '[5764]={[0]={[1]',
    'Fortified Nirncrux' :  '[688]={[0]={[1]',
    'Sardonyx' :            '[4778]={[0]={[1]',
    'Quartz' :              '[4279]={[0]={[1]',
    'Emerald' :             '[2740]={[0]={[1]',
    'Almandine' :           '[1547]={[0]={[1]',

    'Amethyst' :            '[5160]={[0]={[1]',
    'Turquoise' :           '[622]={[0]={[1]',
    'Jade' :                '[3043]={[0]={[1]',
    'Potent Nirncrux' :     '[3790]={[0]={[1]',
    'Chysolite' :           '[2046]={[0]={[1]',
    'Ruby' :                '[707]={[0]={[1]',
    'Fire Opal' :           '[302]={[0]={[1]',
    'Carnelian' :           '[883]={[0]={[1]',
    'Citrine' :             '[2009]={[0]={[1]',

    'Cobalt' :              '[17883]={[0]={[1]',
    'Slaughterstone' :      '[17868]={[0]={[1]',
    'Dibellium' :           '[17854]={[0]={[1]',
    'Antimony' :            '[17965]={[0]={[1]',
    'Aurbic Amber' :        '[17989]={[0]={[1]',
    'Titanium' :            '[17910]={[0]={[1]',
    'Zinc' :                '[17919]={[0]={[1]',
    'Gilding Wax' :         '[18092]={[0]={[1]',
    'Dawn-Prism' :          '[18099]={[0]={[1]',

    'Hemming' :             '[388]={[1]={[1]',
    'Embroidery' :          '[1748]={[2]={[1]',
    'Elegant Lining' :      '[558]={[3]={[1]',
    'Dreugh Wax' :          '[211]={[4]={[1]',

    'Honing Stone' :        '[4593]={[1]={[1]',
    'Dwarven Oil' :         '[1016]={[2]={[1]',
    'Grain Solvent' :       '[4314]={[3]={[1]',
    'Tempering Alloy' :     '[5687]={[4]={[1]',

    'Pitch' :               '[4811]={[1]={[1]',
    'Turpen' :              '[2969]={[2]={[1]',
    'Mastic' :              '[2070]={[3]={[1]',
    'Rosin' :               '[2677]={[4]={[1]',

    'Terne Plating' :       '[17793]={[1]={[1]',
    'Iridium Plating' :     '[18085]={[2]={[1]',
    'Zircon Plating' :      '[17799]={[3]={[1]',
    'Chromium Plating' :    '[18124]={[4]={[1]',
}

/** Given a string matching a TTC price entry (as in those in the ttcStrings Object) return the TTC suggested price. */
function getSuggestedPrice(matchString) {
    //  Find the first instance of the string SuggestedPrice
    let priceStart = matchString.indexOf('SuggestedPrice')
    if(priceStart == -1) {
        //  No match found
        return -1
    }

    //  The suggested price begins 17 characters after the S in SuggestedPrice
    priceStart += 17

    //  Find the next comma after the start of the price value.  Its index will bound the suggested price
    let priceEnd = matchString.indexOf(',', priceStart)
    if(priceEnd == -1) {
        //  No next comma found?  weird
        return -1
    }

    let suggestedPriceStr = matchString.substring(priceStart, priceEnd)
    //console.log(suggestedPriceStr)

    let suggestedPrice = parseInt(suggestedPriceStr)
    
    return suggestedPrice
}

/** Loads prices for items in the ttcStrings Object from the local TTC price table.  The local TTC price table is a Lua program which must be parsed manually. */
async function loadTtcPriceTable() {
    let priceTable = {}
    let stream = fs.createReadStream(ttcPriceTablePath, {autoClose: true})
    stream.on('data', function(data) {
        let chunk = data.toString()

        Object.entries(ttcStrings).forEach(([key, val]) => {
            let idx = chunk.indexOf(val)
            if(idx != -1) {
                //console.log('found ' + key + '!!!')
                let suggestedPrice = getSuggestedPrice(chunk.substring(idx))
                
                if(suggestedPrice != -1) {
                    priceTable[key] = suggestedPrice
                    //console.log('ttc suggested price for ' + key + ' is ' + suggestedPrice)
                }
            }
        })
    })

    return await new Promise((resolve, reject) => {
        stream.on('error', () => {
            reject('error')
        })
        stream.on('end', () => {
            resolve(priceTable)
        })
    })
}
exports.loadTtcPriceTable = loadTtcPriceTable