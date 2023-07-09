addLayer("a", {
    name: "achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: D(0),
        best: D(0),

    }},
    color: "#31AEB0",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
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
                    "blank",
                    "blank",
                    "achievements"
            ]
        },
    },
    achievements: {
        11: {
            name() {return "Reset."},
            tooltip() {return "Prestige Once.<br> Reward: Multiply Point gain by 1.2"},
            done() {return player.p.best.gte(1)},
        },
        12: {
            name() {return "Why?"},
            tooltip() {return "Buy a Prestige upgrade."},
            done() {return D(player.p.upgrades.length).gte(1)},
        },
        13: {
            name() {return "Still useless..."},
            tooltip() {return "Buy 4 Prestige upgrades.<br> Reward: Unlock a new layer"},
            done() {return D(player.p.upgrades.length).gte(4)},
        },
        14: {
            name() {return "Why is this a thing?"},
            tooltip() {return "Prestige's effect goes over 1.25x.<br> Reward: Multiply Point gain by 1.2"},
            done() {return tmp.p.effect.gte(1.25)},
        },
        15: {
            name() {
                if (hasAchievement('a', 15)) return "Shouldn't have done that"
                return "Powerful!"},
            tooltip() {
                if (hasAchievement('a', 15)) return "Gain an unbalanced power. Reward: The nightmare begins..."
                return "Gain an unbalanced power. Reward: Beware!"},
            done() {return player.ub.best.gte(1)},
        },
        21: {
            name() {return "Okay fine."},
            unlocked() {return player.ub.best.gte(1)},
            tooltip() {return "Buy a Prestige upgrade in NM mode.<br> Reward: Each Prestige upgrade increase point gain base by 0.05."},
            done() {return(D(player.p.upgrades.length).gte(1)&&(player.ub.best.gte(1)))},
        },
        22: {
            name() {return "Superb?"},
            unlocked() {return player.ub.best.gte(1)},
            tooltip() {return "Super Prestige Once.<br> Reward: Multiply Point gain by [achievements]+1."},
            done() {return(player.sp.best.gte(1)&&(player.ub.best.gte(1)))},
        },
        23: {
            name() {return "Meh."},
            unlocked() {return player.ub.best.gte(1)},
            tooltip() {return "Buy a super prestige upgrade."},
            done() {return D(player.sp.upgrades.length).gte(1)&&(player.ub.best.gte(1))},
        },
        24: {
            name() {return "Shouldn't have done this"},
            unlocked() {return player.ub.best.gte(1)},
            tooltip() {return "Buy any super prestige upgrade on 2nd row Reward: Multiply Point gain by 1.2."},
            done() {return (hasUpgrade('sp', 21)||hasUpgrade('sp', 22)||hasUpgrade('sp', 23)||hasUpgrade('sp', 24))&&(player.ub.best.gte(1))},
        },
        25: {
            name() {
                if (hasAchievement('a', 25)) return "HOPELESS"
                return "Unfair!"},
            unlocked() {return player.ub.best.gte(1)},
            tooltip() {
                if (hasAchievement('a', 25)) return "Gain another unbalanced power. Reward: The nightmare continues..."
                return "Gain another unbalanced power. Reward: Not a good idea"},
            done() {return player.ub.best.gte(2)},
        },
        31: {
            name() {return "Hyperb?"},
            unlocked() {return player.ub.best.gte(2)},
            tooltip() {return "Hyper Prestige Once."},
            done() {return(player.hp.best.gte(1)&&(player.ub.best.gte(2)))},
        },
        32: {
            name() {return "That's Something."},
            unlocked() {return player.ub.best.gte(2)},
            tooltip() {return "Buy a hyper prestige upgrade.<br> Reward: Generate 20% of prestige gain per second."},
            done() {return(D(player.hp.upgrades.length).gte(1)&&(player.ub.best.gte(2)))},
        },
        33: {
            name() {return "Pointy."},
            unlocked() {return player.ub.best.gte(2)},
            effect() {return player.points.max(1).log(2).add(1).pow(0.6)},
            tooltip() {return "Have 100 Points in NM+ mode.<br> Reward: Multiply Point gain based on points, Currently: x"+format(achievementEffect('a', 33))},
            done() {return(player.points.gte(100)&&(player.ub.best.gte(2)))},
        },
        34: {
            name() {return "We're slowing down."},
            unlocked() {return player.ub.best.gte(2)},
            tooltip() {return "Have 10 Hyper Prestige Points in NM+ mode.<br> Reward: Unlock a new layer."},
            done() {return(player.hp.best.gte(10)&&(player.ub.best.gte(2)))},
        },
        35: {
            name() {
                if (hasAchievement('a', 35)) return "Spiced up"
                return "How Spicy."},
            unlocked() {return player.ub.best.gte(2)},
            tooltip() {
                if (hasAchievement('a', 35)) return "Gain the third unbalanced power. Reward: The nightmare may continues..."
                return "Gain the third unbalanced power. Reward: Beware!"},
            done() {return player.ub.best.gte(3)},
        },
    },
    layerShown(){return true},
    update(diff) {
        player.a.points = D(player.a.achievements.length)
    }
})
addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: D(0),
        best: D(0),

    }},
    color: "#31AEB0",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    exponent: 0.5,
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        mult = mult.add(D(player.p.upgrades.length).times(0.5))
        mult = mult.add(D(player.sp.upgrades.length).times(0.5))
        mult = mult.add(D(player.hp.upgrades.length).times(0.5))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    effect() {
        let boost = D(1).add(player.p.best.pow(0.4).div(10))
        return boost
    },
    effectDescription: function(){
        return " translated to a " + format(tmp[this.layer].effect) + "x boost to point gain (based on best)"
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Prestige", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    passiveGeneration() {
        if (hasAchievement('a', 32)) return D(0.2)
        return 0
    },
    tabFormat: {
        "Main": {
            unlocked(){return true},
            content:[
                "main-display",
                    "blank",
                    ["prestige-button", "", function (){ return false ? {'display': 'none'} : {}}],
                    "blank",
                    "resource-display",
                    "blank",
                    "blank",
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14]]],
            ]
        },
    },
    upgrades: {
        11: {
	        title: "I",
        	description: "Increase Prestige gain by +50%",
            cost() {return D(1)},
            unlocked() {return player.p.best.gte(1)}
       	},
        12: {
	        title: "II",
        	description: "Increase Prestige gain by +50%",
            cost() {return D(1)},
            unlocked() {return player.p.best.gte(1)}
       	},
        13: {
	        title: "III",
        	description: "Increase Prestige gain by +50%",
            cost() {return D(1)},
            unlocked() {return player.p.best.gte(1)}
       	},
        14: {
	        title: "IV",
        	description: "Increase Prestige gain by +50%",
            cost() {return D(1)},
            unlocked() {return player.p.best.gte(1)}
       	},
    },
    layerShown(){return player.points.gte(1)||player.p.unlocked},
    update(diff) {
    }
})
addLayer("b", {
    name: "boosters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: D(0),
        best: D(0),

    }},
    branches: ['p'],
    color: "#BCBCF6",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "booster", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    base: 2,
    exponent: 1.25,
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
        let boost = D(1.2).pow(player.b.best)
        return boost
    },
    effectDescription: function(){
        return " translated to a " + format(tmp[this.layer].effect) + "x boost to point gain (based on best)"
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Boost", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tabFormat: {
        "Main": {
            unlocked(){return true},
            content:[
                "main-display",
                    "blank",
                    ["prestige-button", "", function (){ return false ? {'display': 'none'} : {}}],
                    "blank",
                    "resource-display",
                    "blank",
                    "blank",
            ]
        },
    },
    layerShown(){return hasAchievement('a', 34)||player.b.unlocked},
    update(diff) {
    }
})
addLayer("sp", {
    name: "super-prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: D(0),
        best: D(0),

    }},
    branches: ['p'],
    color: "#65A0B0",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "super prestige points", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    exponent: 0.5,
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        mult = mult.add(D(player.sp.upgrades.length).times(0.5))
        mult = mult.add(D(player.hp.upgrades.length).times(0.5))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Super Prestige", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tabFormat: {
        "Main": {
            unlocked(){return true},
            content:[
                "main-display",
                    "blank",
                    ["prestige-button", "", function (){ return false ? {'display': 'none'} : {}}],
                    "blank",
                    "resource-display",
                    "blank",
                    "blank",
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14]]],
                    ["row", [["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24]]],
            ]
        },
    },
    upgrades: {
        11: {
	        title: "I",
        	description: "Increase Prestige and Super prestige gain by +50%",
            cost() {return D(1)},
            unlocked() {return player.sp.best.gte(1)}
       	},
        12: {
	        title: "II",
        	description: "Increase Prestige and Super prestige gain by +50%",
            cost() {return D(1)},
            unlocked() {return player.sp.best.gte(1)}
       	},
        13: {
	        title: "III",
        	description: "Increase Prestige and Super prestige gain by +50%",
            cost() {return D(1)},
            unlocked() {return player.sp.best.gte(1)}
       	},
        14: {
	        title: "IV",
        	description: "Increase Prestige and Super prestige gain by +50%",
            cost() {return D(1)},
            unlocked() {return player.sp.best.gte(1)}
       	},
        21: {
	        title: "V",
        	description: "Increase Prestige and Super prestige gain by +50%",
            currencyDisplayName: "prestige points",
            currencyInternalName: "points",
            currencyLocation() {return player.p},
            cost() {return D(20)},
            unlocked() {return player.sp.best.gte(1)}
       	},
        22: {
	        title: "VI",
        	description: "Increase Prestige and Super prestige gain by +50%",
            currencyDisplayName: "prestige points",
            currencyInternalName: "points",
            currencyLocation() {return player.p},
            cost() {return D(20)},
            unlocked() {return player.sp.best.gte(1)}
       	},
        23: {
	        title: "VII",
        	description: "Increase Prestige and Super prestige gain by +50%",
            currencyDisplayName: "prestige points",
            currencyInternalName: "points",
            currencyLocation() {return player.p},
            cost() {return D(20)},
            unlocked() {return player.sp.best.gte(1)}
       	},
        24: {
	        title: "VIII",
        	description: "Increase Prestige and Super prestige gain by +50%",
            currencyDisplayName: "prestige points",
            currencyInternalName: "points",
            currencyLocation() {return player.p},
            cost() {return D(20)},
            unlocked() {return player.sp.best.gte(1)}
       	},
    },
    layerShown(){return player.ub.best.gte(1)||player.sp.unlocked},
    update(diff) {
    }
})
addLayer("hp", {
    name: "hyper-prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "HP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: D(0),
        best: D(0),

    }},
    branches: ['sp'],
    color: "#ACACE6",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "hyper prestige points", // Name of prestige currency
    baseResource: "super prestige points", // Name of resource prestige is based on
    exponent: 0.5,
    baseAmount() {return player.sp.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        mult = mult.add(D(player.hp.upgrades.length).times(0.5))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "h", description: "H: Hyper Prestige", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tabFormat: {
        "Main": {
            unlocked(){return true},
            content:[
                "main-display",
                    "blank",
                    ["prestige-button", "", function (){ return false ? {'display': 'none'} : {}}],
                    "blank",
                    "resource-display",
                    "blank",
                    "blank",
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14]]],
                    ["row", [["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24]]],
                    ["row", [["upgrade", 31], ["upgrade", 32], ["upgrade", 33], ["upgrade", 34]]],
            ]
        },
    },
    upgrades: {
        11: {
	        title: "I",
        	description: "Increase Hyper prestige and previous prestige layers gain by +50%",
            cost() {return D(1)},
            unlocked() {return player.hp.best.gte(1)}
       	},
        12: {
	        title: "II",
        	description: "Increase Hyper prestige and previous prestige layers gain by +50%",
            cost() {return D(1)},
            unlocked() {return player.hp.best.gte(1)}
       	},
        13: {
	        title: "III",
        	description: "Increase Hyper prestige and previous prestige layers gain by +50%",
            cost() {return D(1)},
            unlocked() {return player.hp.best.gte(1)}
       	},
        14: {
	        title: "IV",
        	description: "Increase Hyper prestige and previous prestige layers gain by +50%",
            cost() {return D(1)},
            unlocked() {return player.hp.best.gte(1)}
       	},
        21: {
	        title: "V",
        	description: "Increase Hyper prestige and previous prestige layers gain by +50%",
            currencyDisplayName: "super prestige points",
            currencyInternalName: "points",
            currencyLocation() {return player.sp},
            cost() {return D(20)},
            unlocked() {return player.hp.best.gte(1)}
       	},
        22: {
	        title: "VI",
        	description: "Increase Hyper prestige and previous prestige layers gain by +50%",
            currencyDisplayName: "super prestige points",
            currencyInternalName: "points",
            currencyLocation() {return player.sp},
            cost() {return D(20)},
            unlocked() {return player.hp.best.gte(1)}
       	},
        23: {
	        title: "VII",
        	description: "Increase Hyper prestige and previous prestige layers gain by +50%",
            currencyDisplayName: "super prestige points",
            currencyInternalName: "points",
            currencyLocation() {return player.sp},
            cost() {return D(20)},
            unlocked() {return player.hp.best.gte(1)}
       	},
        24: {
	        title: "VIII",
        	description: "Increase Hyper prestige and previous prestige layers gain by +50%",
            currencyDisplayName: "super prestige points",
            currencyInternalName: "points",
            currencyLocation() {return player.sp},
            cost() {return D(20)},
            unlocked() {return player.hp.best.gte(1)}
       	},
        31: {
	        title: "IX",
        	description: "Increase Hyper prestige and previous prestige layers gain by +50%",
            currencyDisplayName: "prestige points",
            currencyInternalName: "points",
            currencyLocation() {return player.p},
            cost() {return D(400)},
            unlocked() {return player.hp.best.gte(1)}
       	},
        32: {
	        title: "XI",
        	description: "Increase Hyper prestige and previous prestige layers gain by +50%",
            currencyDisplayName: "prestige points",
            currencyInternalName: "points",
            currencyLocation() {return player.p},
            cost() {return D(400)},
            unlocked() {return player.hp.best.gte(1)}
       	},
        33: {
	        title: "XII",
        	description: "Increase Hyper prestige and previous prestige layers gain by +50%",
            currencyDisplayName: "prestige points",
            currencyInternalName: "points",
            currencyLocation() {return player.p},
            cost() {return D(400)},
            unlocked() {return player.hp.best.gte(1)}
       	},
        34: {
	        title: "XIII",
        	description: "Increase Hyper prestige and previous prestige layers gain by +50%",
            currencyDisplayName: "prestige points",
            currencyInternalName: "points",
            currencyLocation() {return player.p},
            cost() {return D(400)},
            unlocked() {return player.hp.best.gte(1)}
       	},
    },
    layerShown(){return player.ub.best.gte(2)||player.hp.unlocked},
    update(diff) {
    }
})
addLayer("ub", {
    name: "unbalanced", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "UB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: D(0),
        best: D(0),

    }},
    color: "#31AEB0",
    requires() {
        if (player.ub.best.gte(3)) return Decimal.dInf
        return D(10)}, // Can be a function that takes requirement increases into account
    resource: "unbalanced powers", // Name of prestige currency
    baseResource() {
        if (player.ub.best.gte(2)) return "hyper prestige points"
        if (player.ub.best.gte(1)) return "super prestige points"
        return "prestige points"
    }, // Name of resource prestige is based on
    base: D(4),
    exponent: D(1),
    baseAmount() {
        if (player.ub.best.gte(2)) return player.hp.points
        if (player.ub.best.gte(1)) return player.sp.points
        return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    tabFormat: {
        "Main": {
            unlocked(){return true},
            content:[
                "main-display",
                    "blank",
                    ["prestige-button", "", function (){ return false ? {'display': 'none'} : {}}],
                    "blank",
                    "resource-display",
                    "blank",
                    "blank",
                    ["display-text",
                    function() {
                    return "Game mode: " + ["None", "NM", "NM+", "NM++"][player.ub.best.min(3)] + "<br>Next Game mode: " + ["None", "NM", "NM+", "NM++"][player.ub.best.add(1).min(3)]
                    }],
                    ["display-text",
                    function() {
                    let base = "<br>"
                    if (player.ub.best.gte(1)) base = base + "[NM - NightMare]<br>- Unlock Super Prestige.<br>- Unbalance powers now require super prestige points.<br>- Divide point gain by 2.<br>"
                    if (player.ub.best.gte(2)) base = base + "[NM+ - NightMare+]<br>- Unlock Hyper Prestige.<br>- Unbalance powers now require ultra prestige points.<br>- Divide point gain by 3 per unbalanced power.<br>"
                    if (player.ub.best.gte(3)) base = base + "[NM++ - NightMare++]<br>- Coming Soon.<br>- Multiply point gain by 0.<br>"
                    return base
                    }],
            ]
        },
    },
    gameMode() {
        return ["", "NM", "NM+", "NM++"][player.ub.best.min(3)]
    },
    layerShown(){return hasAchievement('a', 13)},
    update(diff) {
        VERSION.withmode = "Le Stupid Tree Game "+ tmp.ub.gameMode + " v" + VERSION.num
    }
})