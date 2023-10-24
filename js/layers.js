addLayer("a", {
    name: "achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🟊", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: D(0),
        best: D(0),
        trees: D(0)
    }},
    color: "#FFFF00",
    requires: D(1), // Can be a function that takes requirement increases into account
    resource: "achievements", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    exponent: 0.5,
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    tabFormat: {
        "Main": {
            unlocked(){return true},
            content:[
                "main-display",
                    "blank",
                    "blank",
                    "resource-display",
                    ["row", [["clickable", "P"], ["clickable", "C"]]],
                    "blank",
                    "blank",
                    "achievements"
            ]
        },
    },
    buyables: {
    },
    clickables: {
        P: {
            title() {return "Pause"},
            display() {return "Pause the game"},
            unlocked() {return true},
            canClick() {return true},
            onClick() {player.devSpeed = D(0)},
        },
        C: {
            title() {return "Continue"},
            display() {return "Continue the game"},
            unlocked() {return true},
            canClick() {return true},
            onClick() {player.devSpeed = D(1)},
        },
    },
    achievements: {},
    layerShown(){return true},
    update(diff) {
        player.a.points = D(player.a.achievements.length)
    }
})
addLayer("s", {
    name: "secret", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: D(0),
        best: D(0),
        blobclicks: D(0)
    }},
    color: "#aa0000",
    requires: D(1), // Can be a function that takes requirement increases into account
    resource: "secrets", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    exponent: 0.5,
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    tabFormat: {
        "Main": {
            unlocked(){return true},
            content:[
                "main-display",
                    "blank",
                    "blank",
                    "resource-display",
                    "blank",
                    "blank",
                    ["row", [["clickable", "blob"]]]
            ]
        },
    },
    clickables: {
        blob: {
                title: "blob",
                display(){
                    return ""
                },
                unlocked() {return true},
                canClick() {return true},
                onClick() {
                    player.s.blobclicks = player.s.blobclicks.add(1)
                    doPopup(type = "none", text = "You have found "+formatWhole(player.s.blobclicks)+" blobs.", title = "blob!", timer = 3, color = "#aa0000")},
        },
    },
    layerShown(){return true},
    update(diff) {
    },
    nodeStyle: {'opacity': '0'}
})
addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: D(0),
        best: D(0),
    }},
    color: "green",
    requires: D(5), // Can be a function that takes requirement increases into account
    resource: "prestige tokens", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    exponent: 0.5,
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        if (hasUpgrade('p', 15)) mult = mult.times(upgradeEffect('p', 15))
        if (hasUpgrade('p', 32)) mult = mult.times(upgradeEffect('p', 32))
        if (hasUpgrade('p', 33)) mult = mult.times(upgradeEffect('p', 33))
        if (hasUpgrade('p', 55)) mult = mult.times(upgradeEffect('p', 55))
        if (hasUpgrade('g', 11)) mult = mult.times(upgradeEffect('g', 11))
        if (hasUpgrade('g', 13)) mult = mult.times(upgradeEffect('g', 13))
        if (hasMilestone('r', 1)) mult = mult.times(milestoneEffect('r', 1))
        if (hasMilestone('t', 1)) mult = mult.times(milestoneEffect('t', 1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let expo = D(1)
        if (hasUpgrade('p', 44)) expo = expo.times(upgradeEffect('p', 44))
        return expo
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    tabFormat: {
        "Main": {
            unlocked(){return true},
            content:[
                "main-display",
                    "blank",
                    ["prestige-button", "", function (){return true}],
                    "blank",
                    "resource-display",
                    "blank",
                    "blank",
                    "upgrades"
            ]
        },
    },
    doReset(l) {
        if ((layers[l].row > this.row))
        {
        let keep = ['challenges','milestones']
        if (hasMilestone('b', 1)) keep.push('upgrades')
        layerDataReset(this.layer, keep)
    }},
    hotkeys: [
        {key: "p", description: "P: Reset for Prestige Tokens", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches: ['g', 'r', 'b'],
    upgrades: {
        11: {
            title: "P1",
        	description: "Double Point gain per upgrade.",
         	cost: new Decimal (1),
            effect() {return D(2).add(tmp.r.effect).pow(player.p.upgrades.length)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        12: {
            title: "P2",
        	description: "Multiply Point gain by [upgrade]+1.",
         	cost: new Decimal (2),
            effect() {
                let expo = D(1)
                if (hasUpgrade('p', 52)) expo = expo.times(upgradeEffect('p', 52))
                return D(1).add(player.p.upgrades.length).pow(expo)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        13: {
            title: "P3",
        	description: "Increase Point gain base by 1 per upgrade.",
         	cost: new Decimal (4),
            effect() {
                let expo = D(1)
                if (hasUpgrade('p', 52)) expo = expo.times(upgradeEffect('p', 52))
                return D(player.p.upgrades.length).pow(expo)},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        14: {
            title: "P4",
        	description: "Multiply Point gain based on prestige.",
         	cost: new Decimal (16),
            effect() {
                let expo = D(0.5)
                if (hasUpgrade('p', 21)) expo = expo.times(upgradeEffect('p', 21))
                return player.p.points.max(0).add(10).log10().pow(expo)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        15: {
            title: "P5",
        	description: "Multiply Prestige gain based on prestige.",
         	cost: new Decimal (128),
            effect() {
                let expo = D(0.5)
                if (hasUpgrade('p', 21)) expo = expo.times(upgradeEffect('p', 21))
                return player.p.points.max(0).add(2).log2().pow(expo)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        21: {
            title: "P6",
        	description: "Square P4 and P5.",
         	cost: new Decimal (2048),
            effect() {
                let ad = D(0)
                if (hasUpgrade('p', 31)) ad = ad.add(upgradeEffect('p', 31))
                return D(2).add(ad)},
            effectDisplay() {return "^"+format(upgradeEffect(this.layer, this.id))},
        },
        22: {
            title: "P7",
        	description: "Square Point gain base.",
         	cost: new Decimal (32768),
             effect() {
                let ad = D(0)
                if (hasUpgrade('p', 31)) ad = ad.add(upgradeEffect('p', 31))
                return D(2).add(ad)},
            effectDisplay() {return "^"+format(upgradeEffect(this.layer, this.id))},
        },
        23: {
            title: "P8",
        	description: "Double Point gain per rank.",
         	cost: new Decimal (262144),
            effect() {
                let ad = D(2)
                if (hasUpgrade('p', 35)) ad = ad.add(upgradeEffect('p', 35))
                return ad.pow(player.r.points)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        24: {
            title: "P9",
        	description: "Multiply Point gain based on Point gain.",
         	cost: new Decimal (2097152),
            effect() {
                let expo = D(0.5)
                if (hasUpgrade('p', 25)) expo = expo.times(upgradeEffect('p', 25))
                return getPointGen().max(0).add(10).log(10).pow(expo)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        25: {
            title: "P10",
        	description: "Square P9.",
         	cost: new Decimal (16777216),
             effect() {
                let ad = D(0)
                if (hasUpgrade('p', 31)) ad = ad.add(upgradeEffect('p', 31))
                return D(2).add(ad)},
            effectDisplay() {return "^"+format(upgradeEffect(this.layer, this.id))},
        },
        31: {
            title: "P11",
        	description: "Increase P6, P7 and P10's effect base by Rank's Effect.",
         	cost: new Decimal (134217728),
            effect() {return tmp.r.effect.max(0)},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        32: {
            title: "P12",
        	description: "Multiply Prestige gain based on Point gain.",
         	cost: D(2).pow(83),
            effect() {
                let expo = D(0.5)
                if (hasUpgrade('p', 34)) expo = expo.times(upgradeEffect('p', 34))
                return getPointGen().max(0).add(2).log2().pow(expo)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        33: {
            title: "P13",
        	description: "Multiply Prestige gain by [Upgrade]+1.",
         	cost: D(2).pow(90),
            effect() {
                let expo = D(1)
                if (hasUpgrade('p', 51)) expo = expo.times(upgradeEffect('p', 51))
                return D(1).add(player.p.upgrades.length).pow(expo)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        34: {
            title: "P14",
        	description: "Square P12.",
         	cost: D(2).pow(105),
             effect() {
                let ad = D(0)
                if (hasUpgrade('p', 41)) ad = ad.add(upgradeEffect('p', 41))
                return D(2).add(ad)},
            effectDisplay() {return "^"+format(upgradeEffect(this.layer, this.id))},
        },
        35: {
            title: "P15",
        	description: "Increase P8's base effect by Tier effect.",
         	cost: D(2).pow(113),
            effect() {return tmp.t.effect},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        41: {
            title: "P16",
        	description: "Increase P14's base effect by Rank effect.",
         	cost: D(2).pow(129),
            effect() {return tmp.r.effect},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        42: {
            title: "P17",
        	description: "Multiply Point gain by [Rank]+1 per Tier.",
         	cost: D(2).pow(243),
            effect() {return player.r.points.max(0).add(1).pow(player.t.points.max(0))},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        43: {
            title: "P18",
        	description: "Multiply Point gain by [Tier]+1 per Rank.",
         	cost: D(2).pow(252),
            effect() {return player.t.points.max(0).add(1).pow(player.r.points.max(0))},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        44: {
            title: "P19",
        	description: "Raise Prestige gain by +^0.005 per upgrade.",
         	cost: D(2).pow(285),
            effect() {return D(player.p.upgrades.length).div(200).add(1)},
            effectDisplay() {return "^"+format(upgradeEffect(this.layer, this.id))},
        },
        45: {
            title: "P20",
        	description: "Raise Point gain by +^0.005 per upgrade.",
         	cost: D(2).pow(337),
            effect() {return D(player.p.upgrades.length).div(200).add(1)},
            effectDisplay() {return "^"+format(upgradeEffect(this.layer, this.id))},
        },
        51: {
            title: "P21",
        	description: "Square P13.",
         	cost: D(2).pow(390),
            effect() {
                let ad = D(0)
                if (hasUpgrade('p', 53)) ad = ad.add(upgradeEffect('p', 53))
                return D(2).add(ad)},
            effectDisplay() {return "^"+format(upgradeEffect(this.layer, this.id))},
        },
        52: {
            title: "P22",
        	description: "Square P2 and P3.",
         	cost: D(2).pow(495),
            effect() {
                let ad = D(0)
                if (hasUpgrade('p', 54)) ad = ad.add(upgradeEffect('p', 54))
                return D(2).add(ad)},
            effectDisplay() {return "^"+format(upgradeEffect(this.layer, this.id))},
        },
        53: {
            title: "P23",
        	description: "Increase P21's effect by Tiers.",
         	cost: D(2).pow(626),
            effect() {return player.t.points.max(0)},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        54: {
            title: "P24",
        	description: "Increase P22's effect by Tiers.",
         	cost: D(2).pow(684),
            effect() {return player.t.points.max(0)},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        55: {
            title: "P25",
        	description: "Double Prestige gain per Booster.",
         	cost: D(2).pow(1155),
            effect() {return player.b.points.max(0).pow_base(2)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
    },
    passiveGeneration() {
        if (hasMilestone('r', 2)) return D(1)
        return 0
    },
    clickables: {
    },
    layerShown(){return true},
    update(diff) {
    },
})
addLayer("g", {
    name: "generator", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: D(0),
        best: D(0),
        genpow: D(0),
    }},
    color: "#aacc00",
    requires: D(1), // Can be a function that takes requirement increases into account
    resource: "generators", // Name of prestige currency
    baseResource: "prestige tokens", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    genEffect() {
        return player.g.genpow.max(0).add(2).log2().times(player.g.genpow.max(0).add(1).pow(0.5))
    },
    effect() {
        let base = D(2)
        if (hasUpgrade('g', 14)) base = base.add(upgradeEffect('g', 14))
        if (hasUpgrade('g', 15)) base = base.add(upgradeEffect('g', 15))
        if (hasUpgrade('g', 21)) base = base.add(upgradeEffect('g', 21))
        let mult = D(1)
        if (hasMilestone('b', 2)) mult = mult.times(milestoneEffect('b', 2))
        if (hasMilestone('t', 6)) mult = mult.times(milestoneEffect('t', 6))
        if (hasUpgrade('g', 12)) mult = mult.times(upgradeEffect('g', 12))
        return player.g.points.max(0).times(base.pow(player.g.points)).times(mult)
    },
    effectDescription() {
        return ", which generating "+format(tmp.g.effect)+" generator power per second"
    },
    doReset(l) {
        if ((layers[l].row > this.row))
        {
        let keep = ['challenges','milestones']
        layerDataReset(this.layer, keep)
    }},
    row: 1, // Row the layer is in on the tree (0 is the first row)
    tabFormat: {
        "Main": {
            unlocked(){return true},
            content:[
                "main-display",
                    "blank",
                    ["prestige-button", "", function (){return true}],
                    ["display-text", function() {return "You have "+format(player.g.genpow)+" Generator Power, which multiply point gain by "+format(tmp.g.genEffect)}],
                    "blank",
                    "resource-display",
                    "blank",
                    "blank",
                    "milestones",
                    "upgrades"
            ]
        },
    },
    hotkeys: [
        {key: "g", description: "G: Reset for Generators", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "G1",
        	description: "Multiply Prestige gain based on Generator Power.",
            currencyDisplayName: "Generator Power",
            currencyLocation() {return player.g},
            currencyInternalName: "genpow",
         	cost: D(2).pow(6),
            effect() {return player.g.genpow.max(0).add(1).log10().pow_base(3)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        12: {
            title: "G2",
        	description: "Multiply Generator gain based on Generator Power.",
            currencyDisplayName: "Generator Power",
            currencyLocation() {return player.g},
            currencyInternalName: "genpow",
         	cost: D(2).pow(9),
            effect() {return player.g.genpow.max(0).add(1).log10().pow_base(2)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        13: {
            title: "G3",
        	description() {return "Multiply Prestige gain by "+format(1e15)+" per Generator."},
            currencyDisplayName: "Generator Power",
            currencyLocation() {return player.g},
            currencyInternalName: "genpow",
         	cost: D(2).pow(12),
            effect() {return player.g.points.max(0).pow_base(1e15)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        14: {
            title: "G4",
        	description() {return "Increase Generator Base based on Ranks."},
            currencyDisplayName: "Generator Power",
            currencyLocation() {return player.g},
            currencyInternalName: "genpow",
         	cost: D(2).pow(13),
            effect() {return player.r.points.max(0).add(2).log2().div(10)},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        15: {
            title: "G5",
        	description() {return "Increase Generator Base based on Boosters."},
            currencyDisplayName: "Generator Power",
            currencyLocation() {return player.g},
            currencyInternalName: "genpow",
         	cost: D(2).pow(17),
            effect() {return player.b.points.max(0).add(2).log2().div(5)},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        21: {
            title: "G6",
        	description() {return "Increase Generator Base based on Tiers."},
            currencyDisplayName: "Generator Power",
            currencyLocation() {return player.g},
            currencyInternalName: "genpow",
         	cost: D(2).pow(44),
            effect() {return player.t.points.max(0).div(10)},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        22: {
            title: "G7",
        	description() {return "Slow Down Booster Cost Formula by Generator."},
            currencyDisplayName: "Generator Power",
            currencyLocation() {return player.g},
            currencyInternalName: "genpow",
         	cost: D(2).pow(84),
            effect() {return player.g.points},
            effectDisplay() {return "-"+format(upgradeEffect(this.layer, this.id))},
        },
    },
    milestones: {
        0: {
            requirementDescription: "1 Generator",
            done() {return player[this.layer].points.gte(1)},
            effectDescription() {return "Start Generating Generator Power."},
        },
        1: {
            requirementDescription: "2 Generators",
            done() {return player[this.layer].points.gte(1)},
            effect() {return player.g.points.max(0).pow_base(1e15)},
            effectDescription() {return "Multiply Point gain by "+format(1e15)+" per Generator."},
        },
        2: {
            requirementDescription: "3 Generators",
            done() {return player[this.layer].points.gte(1)},
            effect() {return player.g.points.max(0)},
            effectDescription() {return "Decrease Tier Cost by Generator."},
        },
    },
    getResetGain() {
        if (player.p.points.gte(tmp.g.getNextAt)) return D(1)
        return D(0)
    },
    getNextAt() {
        let red = D(0)
        if (hasMilestone('t', 5)) red = red.add(milestoneEffect('t', 5))
        return D("1e400").pow(player.g.points.sub(red).pow_base(1.1))},
    layerShown(){return true},
    update(diff) {
        player.g.genpow = player.g.genpow.add(tmp.g.effect.times(diff))
    },
})
addLayer("r", {
    name: "ranks", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: D(0),
        best: D(0),
    }},
    color: "#aa0000",
    requires: D(1), // Can be a function that takes requirement increases into account
    resource() {
        if (player.r.points.gte(50)) return "scaled ranks"
        return "ranks"}, // Name of prestige currency
    baseResource: "prestige tokens", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    effect() {
        let ad = D(0)
        if (hasMilestone('t', 3)) ad = ad.add(milestoneEffect('t', 3))
        if (hasMilestone('t', 4)) ad = ad.add(milestoneEffect('t', 4))
        return player.r.points.max(0).add(ad)
    },
    effectDescription() {
        return ", which increase P1's upgrade base by "+format(tmp.r.effect)
    },
    doReset(l) {
        if ((layers[l].row > this.row))
        {
        let keep = ['challenges','milestones']
        layerDataReset(this.layer, keep)
    }},
    row: 1, // Row the layer is in on the tree (0 is the first row)
    tabFormat: {
        "Main": {
            unlocked(){return true},
            content:[
                "main-display",
                    "blank",
                    ["prestige-button", "", function (){return true}],
                    "blank",
                    "resource-display",
                    "blank",
                    "blank",
                    "milestones"
            ]
        },
    },
    hotkeys: [
        {key: "r", description: "R: Reset for Ranks", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
    },
    milestones: {
        0: {
            requirementDescription: "Rank 1",
            done() {return player[this.layer].points.gte(1)},
            effect() {return player.r.points.max(0).add(1)},
            effectDescription() {return "Multiply Point gain by [Rank]+1"},
        },
        1: {
            requirementDescription: "Rank 5",
            done() {return player[this.layer].points.gte(5)},
            effect() {return player.r.points.max(0).add(1)},
            effectDescription() {return "Multiply Prestige gain by [Rank]+1"},
        },
        2: {
            requirementDescription: "Rank 10",
            done() {return player[this.layer].points.gte(10)},
            effect() {return player.r.points.max(0).add(1)},
            effectDescription() {return "Passively gain 100% of Prestige gain."},
        },
        3: {
            requirementDescription: "Rank 15",
            done() {return player[this.layer].points.gte(15)},
            effectDescription() {return "Unlock Booster."},
        },
        4: {
            requirementDescription: "Rank 30",
            done() {return player[this.layer].points.gte(30)},
            effectDescription() {return "Unlock Generator."},
        },
    },
    getResetGain() {
        if (player.p.points.gte(tmp.r.getNextAt)) return D(1)
        return D(0)
    },
    getNextAt() {
        let base = player.r.points
        if (player.r.points.gte(50)) base = D(49).add(player.r.points.sub(48).times(player.r.points.sub(49)).div(2))
        return D(10).pow(base.max(0).add(2).sub(tmp.t.effect).max(0).times(base.max(0).add(3).sub(tmp.t.effect).max(0)).div(2))},
    layerShown(){return true},
    update(diff) {
    },
})
addLayer("b", {
    name: "booster", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: D(0),
        best: D(0),
    }},
    color: "#4400cc",
    requires: D(1), // Can be a function that takes requirement increases into account
    resource() {
        if (player.b.points.gte(50)) return "scaled boosters"
        return "boosters"}, // Name of prestige currency
    baseResource: "prestige tokens", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    effect() {
        return player.b.points.max(0).pow(0.5).div(50).add(1)
    },
    effectDescription() {
        return ", which raise point gain to the "+format(tmp.b.effect)+"th power"
    },
    doReset(l) {
        if ((layers[l].row > this.row))
        {
        let keep = ['challenges','milestones']
        layerDataReset(this.layer, keep)
    }},
    row: 1, // Row the layer is in on the tree (0 is the first row)
    tabFormat: {
        "Main": {
            unlocked(){return true},
            content:[
                "main-display",
                    "blank",
                    ["prestige-button", "", function (){return true}],
                    "blank",
                    "resource-display",
                    "blank",
                    "blank",
                    "milestones"
            ]
        },
    },
    hotkeys: [
        {key: "b", description: "B: Reset for Boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
    },
    milestones: {
        0: {
            requirementDescription: "1 Booster",
            done() {return player[this.layer].points.gte(1)},
            effect() {return player.b.points.max(0).add(1)},
            effectDescription() {return "Multiply Point gain by [Booster]+1"},
        },
        1: {
            requirementDescription: "5 Boosters",
            done() {return player[this.layer].points.gte(5)},
            effectDescription() {return "Keep Prestige Upgrades Finally."},
        },
        2: {
            requirementDescription: "15 Boosters",
            done() {return player[this.layer].points.gte(15)},
            effect() {return player.b.points.max(0).add(1)},
            effectDescription() {return "Multiply Generator Power gain by [Booster]+1."},
        },
    },
    getResetGain() {
        if (player.p.points.gte(tmp.b.getNextAt)) return D(1)
        return D(0)
    },
    getNextAt() {
        let base = player.b.points
        if (player.b.points.gte(50)) base = D(49).add(player.b.points.sub(48).times(player.b.points.sub(49)).div(2))
        let slow = D(0)
        if (hasMilestone('t', 2)) slow = slow.add(tmp.t.effect)
        if (hasUpgrade('g', 22)) slow = slow.add(upgradeEffect('g', 22))
        return D(10).pow(D(10).add(base.max(0)).sub(slow).max(0).pow(2))},
    layerShown(){return true},
    update(diff) {
    },
})
addLayer("t", {
    name: "tiers", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: D(0),
        best: D(0),
        realname: "",
    }},
    color: "blue",
    requires: D(4), // Can be a function that takes requirement increases into account
    resource: "tiers", // Name of prestige currency
    baseResource: "ranks", // Name of resource prestige is based on
    baseAmount() {return player.r.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    effect() {
        return player.t.points.max(0)
    },
    effectDescription() {
        return ", which slow rank's cost formula by "+format(tmp.t.effect)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    tabFormat: {
        "Main": {
            unlocked(){return true},
            content:[
                "main-display",
                    "blank",
                    ["prestige-button", "", function (){return true}],
                    "blank",
                    "resource-display",
                    "blank",
                    "blank",
                    "milestones"
            ]
        },
    },
    branches: ['r'],
    doReset(l) {
        if ((layers[l].row > this.row))
        {
        let keep = ['challenges','milestones']
        layerDataReset(this.layer, keep)
    }},
    upgrades: {
    },
    milestones: {
        0: {
            requirementDescription: "Tier 1",
            done() {return player[this.layer].points.gte(1)},
            effect() {return player.t.points.max(0).add(1)},
            effectDescription() {return "Multiply Point gain by [Tier]+1"},
        },
        1: {
            requirementDescription: "Tier 2",
            done() {return player[this.layer].points.gte(2)},
            effect() {return player.t.points.max(0).add(1)},
            effectDescription() {return "Multiply Prestige gain by [Tier]+1"},
        },
        2: {
            requirementDescription: "Tier 3",
            done() {return player[this.layer].points.gte(3)},
            effect() {return tmp.t.effect},
            effectDescription() {return "Slow Booster's Cost by Tier Effect"},
        },
        3: {
            requirementDescription: "Tier 4",
            done() {return player[this.layer].points.gte(4)},
            effect() {return player.t.points.max(0)},
            effectDescription() {return "Gain a free effective Rank per Tier."},
        },
        4: {
            requirementDescription: "Tier 5",
            done() {return player[this.layer].points.gte(5)},
            effect() {return player.g.points.max(0)},
            effectDescription() {return "Gain a free effective Rank per Generator."},
        },
        5: {
            requirementDescription: "Tier 6",
            done() {return player[this.layer].points.gte(6)},
            effect() {return player.g.points.max(0)},
            effect() {return tmp.t.effect},
            effectDescription() {return "Slow Generator's Cost by Tier Effect."},
        },
        6: {
            requirementDescription: "Tier 7",
            done() {return player[this.layer].points.gte(6)},
            effect() {return player.g.points.max(0)},
            effect() {return player.t.points.max(0).add(1)},
            effectDescription() {return "Multiply Generator Power gain by [Tier]+1."},
        },
    },
    hotkeys: [
        {key: "t", description: "T: Reset for Tiers", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    getResetGain() {
        if (player.r.points.gte(tmp.t.getNextAt)) return D(1)
        return D(0)
    },
    getNextAt() {
        let red = D(0)
        if (hasMilestone('g', 2)) red = red.add(milestoneEffect('g', 2))
        return D(2).add(player.t.points).pow(2).sub(red)},
    LayersUnlocked() {
        return player.p.unlocked + player.g.unlocked + player.r.unlocked + player.b.unlocked + player.t.unlocked
    },
    layerShown(){return true},
    update(diff) {
        player.t.realname = "Cookina's "+"Very ".repeat(tmp.t.LayersUnlocked-1)+"Bad PGRB-Tree"
    },
})