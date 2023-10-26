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
        "Hell": {
            unlocked(){return player.points.gte("10^^100")||player.universe.gte(1)},
            content:[
                "main-display",
                    "blank",
                    "blank",
                    "resource-display",
                    ["row", [["clickable", "N"]]],
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
        N: {
            title() {return "Corrupt"},
            display() {return "Corrupt Everything and move on.<br> Req: "+format("10^^100")+" Points"},
            unlocked() {return true},
            canClick() {return player.points.gte("10^^100")},
            onClick() {
                player.universe = player.universe.add(1)
                player.points = D(0)
            },
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
// UNIVERSE I: PGRB-TREE 
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
        if (hasUpgrade('g', 24)) expo = expo.times(upgradeEffect('g', 24))
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
    layerShown(){return player.universe.eq(0)},
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
        let expo = D(1)
        if (hasUpgrade('g', 25)) expo = expo.times(upgradeEffect('g', 25))
        return player.g.genpow.max(0).add(2).log2().times(player.g.genpow.max(0).add(1).pow(0.5)).pow(expo)
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
        let expo = D(1)
        if (hasUpgrade('g', 23)) expo = expo.times(upgradeEffect('g', 23))
        return player.g.points.max(0).times(base.pow(player.g.points)).times(mult).pow(expo)
    },
    effectDescription() {
        return ", which generating "+format(tmp.g.effect)+" generator power per second"
    },
    doReset(l) {
        if ((layers[l].row > this.row))
        {
        let keep = ['challenges','milestones']
        if (hasUpgrade('g', 25)) keep.push('upgrades')
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
                    "upgrades",
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
        23: {
            title: "G8",
        	description() {return "Raise Generator Power gain by Booster's Effect."},
            currencyDisplayName: "Generator Power",
            currencyLocation() {return player.g},
            currencyInternalName: "genpow",
         	cost: D(2).pow(92),
            effect() {return tmp.b.effect},
            effectDisplay() {return "^"+format(upgradeEffect(this.layer, this.id))},
        },
        24: {
            title: "G9",
        	description() {return "Raise Prestige gain by Booster's Effect."},
            currencyDisplayName: "Generator Power",
            currencyLocation() {return player.g},
            currencyInternalName: "genpow",
         	cost: D(2).pow(111),
            effect() {return tmp.b.effect},
            effectDisplay() {return "^"+format(upgradeEffect(this.layer, this.id))},
        },
        25: {
            title: "G10",
        	description() {return "Raise Generator Power effect by Booster's Effect Unlock a tier challenge."},
            currencyDisplayName: "Generator Power",
            currencyLocation() {return player.g},
            currencyInternalName: "genpow",
         	cost: D(2).pow(120),
            effect() {return tmp.b.effect},
            effectDisplay() {return "^"+format(upgradeEffect(this.layer, this.id))},
        },
        25: {
            title: "G10",
        	description() {return "Raise Generator Power effect by Booster's Effect, Keep All Generator Upgrades, Unlock a tier challenge."},
            currencyDisplayName: "Generator Power",
            currencyLocation() {return player.g},
            currencyInternalName: "genpow",
         	cost: D(2).pow(120),
            effect() {return tmp.b.effect},
            effectDisplay() {return "^"+format(upgradeEffect(this.layer, this.id))},
        },
        31: {
            title: "G11",
        	description() {return "Remove Point gain nerf lmao."},
            currencyDisplayName: "Generator Power",
            currencyLocation() {return player.g},
            currencyInternalName: "genpow",
         	cost: D(2).pow(150),
        },
        32: {
            title: "G12",
        	description() {return "Improve Booster effect lmao."},
            currencyDisplayName: "Generator Power",
            currencyLocation() {return player.g},
            currencyInternalName: "genpow",
         	cost: D(2).pow(171),
        },
        33: {
            title: "G13",
        	description() {return "Remove Rank Scaling lmao."},
            currencyDisplayName: "Generator Power",
            currencyLocation() {return player.g},
            currencyInternalName: "genpow",
         	cost: D(2).pow(252),
        },
        34: {
            title: "G14",
        	description() {return "Multiply Point gain by [Generator]+1 per Generator."},
            currencyDisplayName: "Generator Power",
            currencyLocation() {return player.g},
            currencyInternalName: "genpow",
         	cost: D(2).pow(444),
            effect() {return player.g.points.max(0).pow_base(player.g.points.max(0).add(1))},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        35: {
            title: "G14",
        	description() {return "Raise Point gain to the [Point]h power lmao."},
            currencyDisplayName: "Generator Power",
            currencyLocation() {return player.g},
            currencyInternalName: "genpow",
         	cost: D(2).pow(456),
            effect() {return player.points.max(1)},
            effectDisplay() {return "^"+format(upgradeEffect(this.layer, this.id))},
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
            done() {return player[this.layer].points.gte(2)},
            effect() {return player.g.points.max(0).pow_base(1e15)},
            effectDescription() {return "Multiply Point gain by "+format(1e15)+" per Generator."},
        },
        2: {
            requirementDescription: "3 Generators",
            done() {return player[this.layer].points.gte(3)},
            effect() {return player.g.points.max(0)},
            effectDescription() {return "Decrease Tier Cost by Generator."},
        },
    },
    getResetGain() {
        if (player.p.points.gte(tmp.g.getNextAt)) return D(1)
        return D(0)
    },
    resetsNothing() {return hasMilestone('t', 7)},
    getNextAt() {
        let red = D(0)
        if (hasMilestone('t', 5)) red = red.add(milestoneEffect('t', 5))
        return D("1e400").pow(player.g.points.sub(red).pow_base(1.1))},
    layerShown(){return player.universe.eq(0)},
    update(diff) {
        player.g.genpow = player.g.genpow.add(tmp.g.effect.times(diff))
    },
    autoPrestige() {return hasMilestone('t', 9)}
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
        if (player.r.points.gte(50)&&!hasUpgrade('g', 33)) return "scaled ranks"
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
        let mult = D(1)
        if (hasChallenge('t', 11)) mult = mult.times(2)
        return player.r.points.max(0).add(ad).times(mult)
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
    resetsNothing() {return hasMilestone('t', 7)},
    getNextAt() {
        let base = player.r.points
        if (player.r.points.gte(50)&&!hasUpgrade('g', 33)) base = D(49).add(player.r.points.sub(48).times(player.r.points.sub(49)).div(2))
        if (inChallenge('t', 11)) return D(10).pow(base.sub(tmp.t.effect).pow_base(1.2))
        if (hasChallenge('t', 11)) return D(10).pow(base.sub(tmp.t.effect).pow_base(1.15))
        return D(10).pow(base.max(0).add(2).sub(tmp.t.effect).max(0).times(base.max(0).add(3).sub(tmp.t.effect).max(0)).div(2))
    },
    layerShown(){return player.universe.eq(0)},
    update(diff) {
    },
    autoPrestige() {return hasMilestone('t', 9)}
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
        if (player.b.points.gte(50)&&!hasMilestone('t', 8)) return "scaled boosters"
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
        if (hasUpgrade('g', 32)) return player.b.points.max(0).pow(0.5).div(20).add(1)
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
    getNextAt(buyMax) {
        let base = player.b.points
        if (player.b.points.gte(50)&&!hasMilestone('t', 8)) base = D(49).add(player.b.points.sub(48).times(player.b.points.sub(49)).div(2))
        let slow = D(0)
        if (hasMilestone('t', 2)) slow = slow.add(tmp.t.effect)
        if (hasUpgrade('g', 22)) slow = slow.add(upgradeEffect('g', 22))
        return D(10).pow(D(10).add(base.max(0)).sub(slow).max(0).pow(2))},
    layerShown(){return player.universe.eq(0)},
    resetsNothing() {return hasMilestone('t', 7)},
    update(diff) {
    },
    autoPrestige() {return hasMilestone('t', 9)}
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
                    "milestones",
                    "challenges"
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
    challenges: {
        11: {
            name: "Ranked",
            challengeDescription() {return "Rank uses a different formula"},
            unlocked() {return hasUpgrade('g', 25)},
            onEnter() {
            },
            goal() {return D(45)},
            goalDescription() {return "Rank "+formatWhole(this.goal())},
            rewardDescription() {return "Double Rank effect but now uses a different formula."},
            canComplete: function() {return player.r.points.gte(this.goal())},
        },
    },
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
            done() {return player[this.layer].points.gte(7)},
            effect() {return player.g.points.max(0)},
            effect() {return player.t.points.max(0).add(1)},
            effectDescription() {return "Multiply Generator Power gain by [Tier]+1."},
        },
        7: {
            requirementDescription: "Tier 8",
            done() {return player[this.layer].points.gte(8)},
            effectDescription() {return "Row 2 Layers reset nothing."},
        },
        8: {
            requirementDescription: "Tier 9",
            done() {return player[this.layer].points.gte(9)},
            effectDescription() {return "Remove Booster Scaling Lmao."},
        },
        9: {
            requirementDescription: "Tier 10",
            done() {return player[this.layer].points.gte(10)},
            effectDescription() {return "Automatically Buy Row 2 Layers."},
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
    layerShown(){return player.universe.eq(0)},
    update(diff) {
        player.t.realname = "Cookina's "+"Very ".repeat(tmp.t.LayersUnlocked-1)+"Bad PGRB-Tree"
    },
})
// UNIVERSE II: TIME TRAVELLING
addLayer("T", {
    name: "timer", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: D(0),
        best: D(0),
        time: D(0),
        realname: "",
    }},
    color: "#cccccc",
    requires: D(5), // Can be a function that takes requirement increases into account
    resource: "timers", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    exponent: 0.5,
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let expo = D(1)
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
                    ["display-text", function() {return "Time: "+formatTimePlus(player.T.time)+", which multiply point gain by "+format(tmp.T.timeEffect)}],
                    "blank",
                    "blank",
                    "buyables",
                    "upgrades"
            ]
        },
    },
    effect() {
        let timer = player.T.points.max(0)
        if (inChallenge('tm', 11)&&timer.gte(1)) timer = timer.max(1).log10().pow(0.75).pow_base(10)
        let base = D(2)
        if (hasUpgrade('T', 34)) base = base.add(upgradeEffect('T', 34))
        if (hasUpgrade('tm', 12)) base = base.add(upgradeEffect('tm', 12))
        let mult = D(1)
        if (hasUpgrade('T', 12)) mult = mult.times(upgradeEffect('T', 12))
        if (hasUpgrade('T', 14)) mult = mult.times(upgradeEffect('T', 14))
        if (hasUpgrade('T', 22)) mult = mult.times(upgradeEffect('T', 22))
        if (hasUpgrade('T', 24)) mult = mult.times(upgradeEffect('T', 24))
        res = timer.times(timer.pow_base(base)).div(2).times(mult).times(tmp.tm.timeSpeed)
        if (res.gte(1)&&inChallenge('tm', 11)) res = timer.times(timer.pow_base(base)).div(2).times(mult).max(1).log10().pow(0.75).pow_base(10).times(tmp.tm.timeSpeed)
        return res
    },
    effectDescription() {
        return ", which generate "+formatTimePlus(tmp.T.effect)+" per real life second"
    },
    timeEffect() {
        return player.T.time.max(0).add(1).log10().add(1).pow(buyableEffect('T', 21))
    },
    doReset(l) {
        if ((layers[l].row > this.row))
        {
        let keep = ['challenges','milestones']
        layerDataReset(this.layer, keep)
    }},
    branches: [],
    automate() {
        if (hasMilestone('tm', 1)) {
            buyBuyable('T', 11)
            buyBuyable('T', 12)
            buyBuyable('T', 13)
            buyBuyable('T', 15)
        }
    },
    buyables: {
        11: {
            title() {return "Timer Shop 1"},
            display() {
                return "Gain a Timer.<br>Cost: "+format(this.cost())+" Points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: +"+format(this.effect())
            },
            effect(x) {return x.max(0)},
            style() {
                return {
                "min-height": "200px",
                "width": "200px",
            }
            },
            cost(x) {return D(5).times(x.sub(tmp.T.Slowing).max(0).pow(1.25).pow_base(2))},
            buy() {
                let cost = D(1)
                if (hasMilestone('tm', 1)) cost = D(0)
                player.points = player.points.sub(this.cost().mul(cost))
                addPoints('T', D(1))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.points.gte(this.cost())
            },
        },
        12: {
            title() {return "Time Shop 2"},
            display() {
                return "Gain a Timer.<br>Cost: "+formatTimePlus(this.cost())+"<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: +"+format(this.effect())
            },
            unlocked() {return getBuyableAmount('T', 21).gte(1)},
            effect(x) {return x.max(0)},
            style() {
                return {
                "min-height": "200px",
                "width": "200px",
            }
            },
            cost(x) {return D(3).pow(x.sub(tmp.T.Slowing).max(0)).pow(1.25)},
            buy() {
                let cost = D(1)
                if (hasMilestone('tm', 1)) cost = D(0)
                player.T.time = player.T.time.sub(cost.times(this.cost()))
                addPoints('T', D(1))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.T.time.gte(this.cost())
            },
        },
        13: {
            title() {return "Time Shop 3"},
            display() {
                return "Gain a Timer.<br>Req: "+formatWhole(this.cost())+" Timers<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: +"+format(this.effect())
            },
            unlocked() {return getBuyableAmount('T', 21).gte(2)},
            effect(x) {return x.max(0)},
            style() {
                return {
                "min-height": "200px",
                "width": "200px",
            }
            },
            cost(x) {return x.add(2).sub(tmp.T.Slowing).max(0).times(x.add(1).sub(tmp.T.Slowing).max(0)).div(2)},
            buy() {
                addPoints('T', D(1))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.T.points.gte(this.cost())
            },
        },
        14: {
            title() {return "Tickspeed Shop"},
            display() {
                return "Multiply \"Time\" speed by "+format(D(1.125).add(getBuyableAmount('T', 22).times(0.025)))+".<br>Cost: "+format(this.cost())+" Points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            unlocked() {return getBuyableAmount('T', 21).gte(14)},
            effect(x) {return D(1.125).add(getBuyableAmount('T', 22).times(0.025)).pow(x.max(0))},
            style() {
                return {
                "min-height": "200px",
                "width": "200px",
            }
            },
            cost(x) {return D(10).pow(x.pow(2))},
            buy() {
                let cost = D(1)
                player.points = player.points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.points.gte(this.cost())
            },
        },
        15: {
            title() {return "Time Shop 4"},
            display() {
                return "Gain a Timer.<br>Req: "+formatTimePlus(this.cost())+" Best Dilated Time<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: +"+format(this.effect())
            },
            unlocked() {return hasUpgrade('tm', 14)},
            effect(x) {return x.max(0)},
            style() {
                return {
                "min-height": "200px",
                "width": "200px",
            }
            },
            cost(x) {return D(10).pow(x.sub(tmp.T.Slowing).max(0)).times(3.1536e16)},
            buy() {
                addPoints('T', 1)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.tm.besttime.gte(this.cost())
            },
        },
        21: {
            title() {return "Timed Boosters"},
            display() {
                return "Reset Previous Progress for a Timed Booster which Raise Time's effect to the [Timed Booster]+1th power and unlock more contents.<br>Cost: "+formatWhole(this.cost())+" Timers<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: ^"+format(this.effect())
            },
            effect(x) {return x.max(0).add(1)},
            style() {
                return {
                "min-height": "200px",
                "width": "200px",
            }
            },
            cost(x) {return D(3).times(x.add(1).sub(getBuyableAmount('T', 22)).max(0).pow(2))},
            buy() {
                if(!hasUpgrade('T', 35)){player.points = D(0)
                player.T.time = D(0)
                player.T.points = D(0)
                setBuyableAmount(this.layer, 11, D(0))
                setBuyableAmount(this.layer, 12, D(0))
                setBuyableAmount(this.layer, 13, D(0))
                setBuyableAmount(this.layer, 14, D(0))
                setBuyableAmount(this.layer, 15, D(0))
            }
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.T.points.gte(this.cost())
            },
        },
        22: {
            title() {return "Timed Galaxy"},
            display() {
                return "Reset Previous Progress for a Timed Galaxy which Slow Timed Booster by 1 and Increase Tickspeed base by 0.025 per galaxy and unlock more contents.<br>Cost: "+formatWhole(this.cost())+" Timed Boosters<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: +"+format(this.effect())
            },
            effect(x) {return x.max(0)},
            style() {
                return {
                "min-height": "200px",
                "width": "200px",
            }
            },
            cost(x) {return D(16).add(x.times(4))},
            buy() {
                player.points = D(0)
                player.T.time = D(0)
                player.T.points = D(0)
                setBuyableAmount(this.layer, 11, D(0))
                setBuyableAmount(this.layer, 12, D(0))
                setBuyableAmount(this.layer, 13, D(0))
                setBuyableAmount(this.layer, 14, D(0))
                setBuyableAmount(this.layer, 15, D(0))
                setBuyableAmount(this.layer, 21, D(0))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return getBuyableAmount('T', 21).gte(this.cost())
            },
        },
    },
    Slowing() {
        let base = D(0)
        if (hasUpgrade('tm', 11)) base = base.add(upgradeEffect('tm', 11))
        if (hasUpgrade('T', 23)) base = base.add(upgradeEffect('T', 23))
        return base
    },
    upgrades: {
        11: {
            title: "T1",
            tooltip() {return "Note: Timer Upgrades Doesn't Reduce your Timers"},
        	description: "Multiply Point gain by [Timer]+1.",
         	cost: new Decimal (40),
            effect() {return player.T.points.max(0).add(1)},
            pay() {},
            unlocked() {return getBuyableAmount('T', 21).gte(3)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        12: {
            title: "T2",
        	description: "Triple Point gain per Timed Boosters.",
         	cost: new Decimal (55),
            effect() {return getBuyableAmount('T', 21).max(0).pow_base(3)},
            pay() {},
            unlocked() {return getBuyableAmount('T', 21).gte(4)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        13: {
            title: "T3",
        	description: "Triple Time gain per Timed Boosters.",
         	cost: new Decimal (70),
            effect() {return getBuyableAmount('T', 21).max(0).pow_base(3)},
            pay() {},
            unlocked() {return getBuyableAmount('T', 21).gte(4)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        14: {
            title: "T4",
        	description: "Multiply Time gain based on Time.",
         	cost: new Decimal (95),
            effect() {return player.T.time.max(0).add(10).log10().pow(0.5)},
            pay() {},
            unlocked() {return getBuyableAmount('T', 21).gte(5)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        15: {
            title: "T5",
        	description: "Multiply Point gain based on Points.",
         	cost: new Decimal (207),
            effect() {return player.points.max(0).add(2).log2()},
            pay() {},
            unlocked() {return getBuyableAmount('T', 21).gte(8)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        21: {
            title: "T6",
        	description: "Triple Point gain per Time Machine.",
         	cost: new Decimal (270),
            effect() {return player.tm.points.max(0).pow_base(3)},
            pay() {},
            unlocked() {return getBuyableAmount('T', 21).gte(9)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        22: {
            title: "T7",
        	description: "Triple Time gain per Time Machine.",
         	cost: new Decimal (299),
            effect() {return player.tm.points.max(0).pow_base(3)},
            pay() {},
            unlocked() {return getBuyableAmount('T', 21).gte(9)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        23: {
            title: "T8",
        	description: "Slow down each Time Shop's cost Formula by Timed Boosters.",
         	cost: new Decimal (372),
            effect() {return getBuyableAmount('T', 21).max(0)},
            pay() {},
            unlocked() {return getBuyableAmount('T', 21).gte(11)},
            effectDisplay() {return "-"+format(upgradeEffect(this.layer, this.id))},
        },
        24: {
            title: "T9",
        	description: "Multiply Time gain based on Points.",
         	cost: new Decimal (567),
            effect() {return player.points.max(0).add(2).log2()},
            pay() {},
            unlocked() {return getBuyableAmount('T', 21).gte(13)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        25: {
            title: "T10",
        	description: "Multiply \"Time\" speed based on Timers.",
         	cost: new Decimal (567),
            effect() {return player.T.points.max(0).div(10).add(1)},
            pay() {},
            unlocked() {return getBuyableAmount('T', 21).gte(14)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        31: {
            title: "T11",
        	description: "Multiply \"Time\" speed based on Points.",
         	cost: new Decimal (643),
            effect() {return player.points.max(0).add(2).log2()},
            pay() {},
            unlocked() {return getBuyableAmount('T', 21).gte(14)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        32: {
            title: "T12",
        	description: "Double \"Time\" speed per upgrade.",
         	cost: new Decimal (654),
            effect() {return D(2).pow(player.T.upgrades.length)},
            pay() {},
            unlocked() {return getBuyableAmount('T', 21).gte(14)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        33: {
            title: "T13",
        	description: "Double \"Time\" speed per Timed Booster.",
         	cost: new Decimal (720),
            effect() {return D(2).pow(getBuyableAmount('T', 21))},
            pay() {},
            unlocked() {return getBuyableAmount('T', 21).gte(15)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        34: {
            title: "T14",
        	description: "Increase Timer base by 0.01 per Timed Booster.",
         	cost: new Decimal (789),
            effect() {return getBuyableAmount('T', 21).max(0).div(100)},
            pay() {},
            unlocked() {return getBuyableAmount('T', 21).gte(16)},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        35: {
            title: "T15",
        	description: "Timed Boosters Reset Nothing, Unlock Time Dilation.",
         	cost: new Decimal (1170),
            pay() {},
            unlocked() {return getBuyableAmount('T', 21).gte(16)},
        },
    },
    layerShown(){return player.universe.eq(1)},
    LayersUnlocked() {
        return player.T.unlocked + player.tm.unlocked
    },
    update(diff) {
        player.T.realname = "Cookina's "+"Very ".repeat(tmp.T.LayersUnlocked-1)+"Bad Time the Tree"
        player.T.time = player.T.time.add(tmp.T.effect.times(diff))
    },
})
addLayer("tm", {
    name: "time machine", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "TM", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: D(0),
        best: D(0),
        besttime: D(0),
    }},
    color: "#55ccee",
    requires: D(90), // Can be a function that takes requirement increases into account
    resource: "time machines", // Name of prestige currency
    baseResource: "timers", // Name of resource prestige is based on
    base: D(1.1),
    exponent: D(1),
    baseAmount() {return player.T.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let expo = D(1)
        return expo
    },
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
                    "milestones",
                    "upgrades",
                    "challenges"
            ]
        },
    },
    effect() {
        return player.tm.points.max(0).add(1).pow(3)
    },
    effectDescription() {
        return ", which makes \"time\" goes "+format(tmp.tm.effect)+"x faster"
    },
    timeEffect() {
        return player.T.time.max(0).add(1).log10().add(1).pow(buyableEffect('T', 21))
    },
    doReset(l) {
        if ((layers[l].row > this.row))
        {
        let keep = ['challenges','milestones']
        layerDataReset(this.layer, keep)
    }},
    branches: [],
    milestones: {
        0: {
            requirementDescription: "9 Time Machines",
            done() {return player[this.layer].points.gte(9)},
            effectDescription() {return "Time Machines reset nothing."},
        },
        1: {
            requirementDescription: "10 Time Machines",
            done() {return player[this.layer].points.gte(10)},
            effectDescription() {return "Time Shops are free and automate them lmao."},
        },
    },
    upgrades: {
        11: {
            title: "TM1",
        	description: "Slow Each Time Shop's Cost Formula by Time Machines.",
         	cost: new Decimal (1),
            effect() {return player.tm.points.max(0)},
            unlocked() {return true},
            effectDisplay() {return "-"+format(upgradeEffect(this.layer, this.id))},
        },
        12: {
            title: "TM2",
        	description: "Increase Timer's Base Effect by 0.01 per Time Machine.",
         	cost: new Decimal (9),
            effect() {return player.tm.points.max(0).div(100)},
            unlocked() {return true},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        13: {
            title: "TM3",
        	description: "Multiply \"Time\" speed based on Time.",
         	cost: new Decimal (20),
            effect() {return player.T.time.add(10).log10()},
            unlocked() {return true},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        14: {
            title: "TM4",
        	description: "Double Time Speed per Time Machine, Unlock Time Shop 4.",
         	cost: new Decimal (28),
            effect() {return player.tm.points.pow_base(2)},
            unlocked() {return true},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
    },
    challenges: {
        11: {
            name: "Time Dilation",
            challengeDescription() {return "Dilate \"Time\" speed, Time and point gain and \"Timer to Time\", to the 0.75th power"},
            unlocked() {return hasUpgrade('T', 35)},
            onEnter() {
                player.points = D(0)
                player.T.points = D(0)
                player.T.time = D(0)
                setBuyableAmount('T', 11, D(0))
                setBuyableAmount('T', 12, D(0))
                setBuyableAmount('T', 13, D(0))
                setBuyableAmount('T', 14, D(0))
                setBuyableAmount('T', 15, D(0))
                setBuyableAmount('T', 21, D(0))
                setBuyableAmount('T', 22, D(0))
            },
            onExit() {
                player.tm.besttime = player.T.time.max(player.tm.besttime)
            },
            onComplete() {
                player.tm.besttime = player.T.time.max(player.tm.besttime)
            },
            rewardEffect() {return player.tm.besttime.div(3.1536e16).div(13.7).max(0).add(2).log2().pow(player.tm.besttime.max(1).slog())},
            goal() {return player.tm.besttime},
            goalDescription() {return "Get as much Dilated Time as you can! Best Dilated Time: "+formatTimePlus(player.tm.besttime)},
            rewardDescription() {return "Multiply \"Time\" Speed based on Dilated Time, Currently: "+format(this.rewardEffect())+"x"},
            canComplete: function() {return player.T.time.gte(this.goal())},
        },
    },
    timeSpeed() {
        let mult = buyableEffect('T', 14)
        if (hasUpgrade('T', 25)) mult = mult.times(upgradeEffect('T', 25))
        if (hasUpgrade('T', 31)) mult = mult.times(upgradeEffect('T', 31))
        if (hasUpgrade('T', 32)) mult = mult.times(upgradeEffect('T', 32))
        if (hasUpgrade('T', 33)) mult = mult.times(upgradeEffect('T', 33))
        if (hasUpgrade('tm', 13)) mult = mult.times(upgradeEffect('tm', 13))
        if (hasUpgrade('tm', 14)) mult = mult.times(upgradeEffect('tm', 14))
        mult = mult.times(challengeEffect('tm', 11))
        let dilate = D(1)
        if (inChallenge('tm', 11)) dilate = D(0.75)
        return tmp.tm.effect.times(mult).max(1).log10().pow(dilate).pow_base(10)
    },
    resetsNothing() {return hasMilestone('tm', 0)},
    layerShown(){return player.universe.eq(1)&&(getBuyableAmount('T', 21).gte(5)||player.tm.unlocked)},
    update(diff) {
    },
})