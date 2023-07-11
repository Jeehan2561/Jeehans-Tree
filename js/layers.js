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
                if (hasAchievement('a', 35)) return "Gain the third unbalanced power. Reward: The Milk was fake and The nightmare may continues..."
                return "Gain the third unbalanced power. Reward: Some milk to calm you down."},
            done() {return player.ub.best.gte(3)},
        },
        41: {
            name() {return "Keep this point in your mind."},
            unlocked() {return player.ub.best.gte(3)},
            tooltip() {
                return "Gain a point in NM++ mode. Reward: Keep Prestige upgrades, Each Super Prestige upgrades increase point gain base by 0.05."},
            done() {return player.points.gte(1)&&player.ub.best.gte(3)},
        },
        42: {
            name() {return "Supreme Boost."},
            unlocked() {return player.ub.best.gte(3)},
            tooltip() {
                return "Super Boost Once. Reward: Multiply Point gain by [Super Boosters]+1."},
            done() {return player.sb.best.gte(1)&&player.ub.best.gte(3)},
        },
        43: {
            name() {return "Mixed Boosts."},
            unlocked() {return player.ub.best.gte(3)},
            tooltip() {
                return "Have 6 Boosters and 3 Super Boosters. Reward: Multiply Hyper point gain by 1.2 per Super Booster."},
            done() {return player.b.best.gte(6)&&player.sb.best.gte(3)&&player.ub.best.gte(3)},
        },
        44: {
            name() {return "Not so NightMare now huh?"},
            unlocked() {return player.ub.best.gte(3)},
            tooltip() {
                return "Have 1,000 Super Prestige points. Reward: Divide Booster's cost by [Booster]+2"},
            done() {return player.sp.best.gte(10)&&player.ub.best.gte(3)},
        },
        45: {
            name() {
                if (hasAchievement('a', 45)) return "BUT WHO CARES?"
                return "Okay that was painful."},
            unlocked() {return player.ub.best.gte(3)},
            tooltip() {
                if (hasAchievement('a', 45)) return "Gain the fourth unbalanced power. Reward: NEVERENDING NIGHTMARE."
                return "Gain the fourth unbalanced power. Reward: A break you deserved."},
            done() {return player.ub.best.gte(4)},
        },
        51: {
            name() {return "SUPreme Boost."},
            unlocked() {return player.ub.best.gte(4)},
            tooltip() {
                return "Super Boost Once in NM+3 Mode. Reward: Gain a free booster for effect per Super Booster."},
            done() {return player.sb.best.gte(1)&&player.ub.best.gte(4)},
        },
        52: {
            name() {return "Less the Useless."},
            unlocked() {return player.ub.best.gte(4)},
            tooltip() {
                return "Have 3 Super Boosters in NM+3 Mode. Reward: Keep SP upgrades, Raise prestige's effect to the [Super Boosters/5]+1th power."},
            done() {return player.sb.best.gte(3)&&player.ub.best.gte(4)},
        },
        53: {
            name() {return "Cookina's Flashbacks."},
            unlocked() {return player.ub.best.gte(4)},
            tooltip() {
                return "Have 100 Hyper Prestige in NM+3 Mode. Reward: Generate 20% of SP gain,<br> Unlock Cookina's worst nightmare \"Numbruh\" (reference to her first TMT and ΩL mod)."},
            done() {return player.hp.best.gte(100)&&player.ub.best.gte(4)},
        },
        54: {
            name() {return "She has suffered."},
            unlocked() {return player.ub.best.gte(4)},
            tooltip() {
                if (hasAchievement('a', 54)) return "Avoid her warnings and Start the Numbruh Minigame. Reward: ไม่มีรางวัลหรอกนะ =] - Cookina."
                return "Avoid her warnings and Start the Numbruh Minigame. Reward: A reward from her."},
            done() {return player.ub.startnum&&player.ub.best.gte(4)},
        },
        55: {
            name() {
                if (hasAchievement('a', 55)) return "Starts now"
                return "True Nightmare"},
            unlocked() {return player.ub.best.gte(4)},
            tooltip() {
                if (hasAchievement('a', 55)) return "Gain the fifth unbalanced power. Reward: Prepare for the next fight."
                return "Gain the fifth unbalanced power. Reward: A great reward for you."},
            done() {return player.ub.best.gte(5)},
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
        if (hasUpgrade('ub', 21)) mult = mult.times(upgradeEffect('ub', 21))
        if (player.ub.best.gte(4)) mult = mult.div(1.25)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    effect() {
        let boost = D(1).add(player.p.best.pow(0.4).div(10))
        if (hasAchievement('a', 52)) boost = boost.pow(D(1).add(player.sb.best.max(0).div(5)))
        boost = softcap(boost, D(100), D(0.1))
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
    doReset(l) {
        if (!(layers[l].row > this.row)) return
        
        let keep = []
        if (hasAchievement('a', 41)) keep.push('upgrades')
        
        layerDataReset(this.layer, keep)
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
    resource: "boosters", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    base: 2,
    exponent: 1.25,
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        if (hasAchievement('a', 44)) mult = mult.div(player.b.best.max(0).add(2))
        if (hasUpgrade('ub', 23)) mult = mult.div(5)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    effect() {
        let amt = player.b.best.max(0)
        if (hasAchievement('a', 51)) amt = amt.add(player.sb.best.max(0))
        let boost = D(1.2).add(tmp.sb.effect).pow(amt)
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
addLayer("sb", {
    name: "super boosters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: D(0),
        best: D(0),

    }},
    branches: ['sp','b'],
    color: "#8C8CC6",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "super boosters", // Name of prestige currency
    baseResource: "boosters", // Name of resource prestige is based on
    baseAmount() {return player.b.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    effect() {
        let boost = D(0.01).times(player.sb.best)
        return boost
    },
    effectDescription: function(){
        return " translated to a +" + format(tmp[this.layer].effect) + " boost to booster base (based on best)"
    },
    getResetGain() {
        let gain = D(-1).add(D(1).add(player.b.points.times(8)).pow(0.5)).div(2)
        return gain.sub(player.sb.points).max(0).min(1).floor()
    },
    getNextAt(canMax=false) {
        gain = player.sb.points.add(1).pow(2).add(player.sb.points.add(1)).div(2)
        return gain.floor()},
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "S", description: "Shift+S: Super Boost", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
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
    layerShown(){return player.ub.best.gte(3)||player.b.unlocked},
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
        if (player.ub.best.gte(4)) mult = mult.div(1.25)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Super Prestige", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    passiveGeneration() {
        if (hasAchievement('a', 53)) return D(0.2)
        return 0
    },
    doReset(l) {
        if (!(layers[l].row > this.row)) return
        
        let keep = []
        if (hasAchievement('a', 52)) keep.push('upgrades')
        
        layerDataReset(this.layer, keep)
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
        if (hasAchievement('a', 43)) mult = mult.times(Decimal.pow(1.2, player.sb.best))
        if (player.ub.best.gte(4)) mult = mult.div(1.25)
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
	        title: "X",
        	description: "Increase Hyper prestige and previous prestige layers gain by +50%",
            currencyDisplayName: "prestige points",
            currencyInternalName: "points",
            currencyLocation() {return player.p},
            cost() {return D(400)},
            unlocked() {return player.hp.best.gte(1)}
       	},
        33: {
	        title: "XI",
        	description: "Increase Hyper prestige and previous prestige layers gain by +50%",
            currencyDisplayName: "prestige points",
            currencyInternalName: "points",
            currencyLocation() {return player.p},
            cost() {return D(400)},
            unlocked() {return player.hp.best.gte(1)}
       	},
        34: {
	        title: "XII",
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
        num: D(1),
        spentUP: D(0),
		points: D(0),
        best: D(0),
        startnum: false,
    }},
    color: "#31AEB0",
    requires() {
        if (player.ub.best.gte(5)) return Decimal.dInf
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
                    return "Game mode: " + ["None", "NM", "NM+", "NM++", "NM+3", "NM+4"][player.ub.best.min(5)] + "<br>Next Game mode: " + ["None", "NM", "NM+", "NM++", "NM+3", "NM+4"][player.ub.best.add(1).min(5)]
                    }],
                    ["display-text",
                    function() {
                    let base = "<br>"
                    if (player.ub.best.gte(1)) base = base + "[NM - NightMare]<br>- Unlock Super Prestige.<br>- Unbalanced powers now require super prestige points.<br>- Divide point gain by 2.<br>"
                    if (player.ub.best.gte(2)) base = base + "[NM+ - NightMare+]<br>- Unlock Hyper Prestige.<br>- Unbalanced powers now require ultra prestige points.<br>- Divide point gain by 3 per unbalanced power.<br>"
                    if (player.ub.best.gte(3)) base = base + "[NM++ - NightMare++]<br>- Unlock Super Booster.<br>- Divide point gain based on points, Currently: /"+format(tmp.ub.NMII)+".<br>"
                    if (player.ub.best.gte(4)) base = base + "[NM+3 - NightMare+3]<br>- Unlock Unbalanced buyables.<br>- Lose 4% of your points per second<br>-Divide All prestige currencies gain by 1.25<br>"
                    if (player.ub.best.gte(5)) base = base + "[NM+4 - NightMare+4]<br>- Hide Numbruh<br>- Multiply point gain by 0<br>- You asked for it >;[<br>"
                    return base
                    }],
            ]
        },
        "Buyables": {
            unlocked(){return player.ub.best.gte(4)&&(hasAchievement('a', 53))},
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
                    return "You have "+formatWhole(player.ub.best.sub(player.ub.spentUP))+" Unbalanced Perks left to spend"
                    }],
                    "blank",
                    "blank",
                    "buyables",
                    "blank",
                    "blank",
                    ["row", [["clickable", 11]]],
            ]
        },
        "Numbruh": {
            unlocked(){return player.ub.best.eq(4)&&(hasAchievement('a', 53))},
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
                    return "Your current Numbruh is "+format(player.ub.num)+"."
                    }],
                    ["display-text",
                    function() {
                    if (hasAchievement('a', 54)) return "Your Numbruh is multiplying by "+format(tmp.ub.NumbruhMult)+" per second."
                    }],
                    ["display-text",
                    function() {
                    if (player.ub.num.gte(1e10)) return "Your numbruh is bigger than "+format(1e10)+" Which makes Cookina mad, She is dividing the Numbruh Multiplier by "+format(player.ub.num.div(1e10).max(1).log(2).max(1).pow(0.5))+"."
                    }],
                    "blank",
                    "blank",
                    "upgrades",
                    "blank",
                    "blank",
                    ["row", [["clickable", 12]]],
            ]
        },
    },
    NumbruhMult() {
        let base = D(1)
        if (hasUpgrade('ub', 11)) base = base.times(upgradeEffect('ub', 11))
        if (hasUpgrade('ub', 13)) base = base.times(upgradeEffect('ub', 13))
        if (hasUpgrade('ub', 14)) base = base.times(upgradeEffect('ub', 14))
        if (hasUpgrade('ub', 22)) base = base.times(upgradeEffect('ub', 22))
        if (player.ub.num.gte(1e10)) base = base.div(player.ub.num.div(1e10).max(1).log(2).max(1).pow(0.5))
        return base
    },
    upgrades: {
        11: {
	        title: "N",
        	description: "Increase Numbruh Multiplier by +5% per upgrade.",
            effect() {
                return D(1).add(D(player.ub.upgrades.length).times(0.05))
            },
            currencyDisplayName: "Numbruh",
            currencyInternalName: "num",
            currencyLocation() {return player.ub},
            cost() {return D(1)},
            pay() {player.ub.num = D(1)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasAchievement('a', 54)}
       	},
        12: {
	        title: "u",
        	description: "Multiply point gain based on Numbruh",
            effect() {
                return player.ub.num.max(1).log(10).add(1).pow(0.4)
            },
            currencyDisplayName: "Numbruh",
            currencyInternalName: "num",
            currencyLocation() {return player.ub},
            cost() {return D(10)},
            pay() {player.ub.num = player.ub.num.div(10).max(1)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasAchievement('a', 54)}
       	},
        13: {
	        title: "m",
        	description: "Multiply Numbruh Multiplier based on points",
            effect() {
                return player.points.max(1).log(10).add(1).pow(0.5).div(16).add(1)
            },
            currencyDisplayName: "Numbruh",
            currencyInternalName: "num",
            currencyLocation() {return player.ub},
            cost() {return D(100)},
            pay() {player.ub.num = player.ub.num.div(100).max(1)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasAchievement('a', 54)}
       	},
        14: {
	        title: "b",
        	description: "Multiply Numbruh Multiplier based on Numbruh",
            effect() {
                return player.ub.num.max(1).log(10).add(1).pow(0.5).div(16).add(1)
            },
            currencyDisplayName: "Numbruh",
            currencyInternalName: "num",
            currencyLocation() {return player.ub},
            cost() {return D(1e4)},
            pay() {player.ub.num = player.ub.num.div(1e4).max(1)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasAchievement('a', 54)}
       	},
        21: {
	        title: "r",
        	description: "Multiply Prestige gain based on Numbruh.",
            effect() {
                return player.ub.num.max(1).log(10).max(1).pow(0.5)
            },
            currencyDisplayName: "Numbruh",
            currencyInternalName: "num",
            currencyLocation() {return player.ub},
            cost() {return D(1e8)},
            pay() {player.ub.num = player.ub.num.div(1e8).max(1)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasAchievement('a', 54)}
       	},
        22: {
	        title: "U",
        	description: "Increase Numbruh Multiplier by 1% per achievement.",
            effect() {
                return D(1).add(player.a.best.div(100))
            },
            currencyDisplayName: "Numbruh",
            currencyInternalName: "num",
            currencyLocation() {return player.ub},
            cost() {return D(1e10)},
            pay() {player.ub.num = player.ub.num.div(1e10).max(1)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasAchievement('a', 54)}
       	},
        23: {
	        title: "h",
        	description: "Divide Booster's cost by 5.",
            effect() {
                return D(5)
            },
            currencyDisplayName: "Numbruh",
            currencyInternalName: "num",
            currencyLocation() {return player.ub},
            cost() {return D(1e11)},
            pay() {player.ub.num = player.ub.num.div(1e11).max(1)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasAchievement('a', 54)}
       	},
    },
    buyables: {
        11: {
            title: "Adder",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color" : "#31AEB0"
                }
            },
            unlocked() {
                return player.ub.best.gte(4)
            },
            cost(x) {
                return x.add(1).floor()
            },
            tooltip() {
                return "Cost Formula:<br>x+1"
            },
            display() {
                return "Increase point gain base by 0.25 per level<br>Cost: "+format(this.cost())+" Unbalanced Perks<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: +"+format(this.effect())
            },
            canAfford() {
                return player[this.layer].best.sub(player.ub.spentUP).gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].spentUP = player[this.layer].spentUP.add(this.cost().times(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                return Decimal.times(0.25, x.max(0))
            },
        },
        12: {
            title: "Multiplier",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color" : "#31AEB0"
                }
            },
            unlocked() {
                return player.ub.best.gte(4)
            },
            cost(x) {
                return x.add(1).floor()
            },
            tooltip() {
                return "Cost Formula:<br>x+1"
            },
            display() {
                return "Increase point gain by 25% per level<br>Cost: "+format(this.cost())+" Unbalanced Perks<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            canAfford() {
                return player[this.layer].best.sub(player.ub.spentUP).gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].spentUP = player[this.layer].spentUP.add(this.cost().times(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                return Decimal.times(0.25, x.max(0)).add(1)
            },
        },
        13: {
            title: "Power up",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color" : "#31AEB0"
                }
            },
            unlocked() {
                return player.ub.best.gte(4)
            },
            cost(x) {
                return x.add(1).floor()
            },
            tooltip() {
                return "Cost Formula:<br>x+1"
            },
            display() {
                return "Increase point gain exponent by 10% per level<br>Cost: "+format(this.cost())+" Unbalanced Perks<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: ^"+format(this.effect())
            },
            canAfford() {
                return player[this.layer].best.sub(player.ub.spentUP).gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].spentUP = player[this.layer].spentUP.add(this.cost().times(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                return Decimal.times(0.1, x.max(0)).add(1)
            },
        },
        14: {
            title: "Based Power",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color" : "#31AEB0"
                }
            },
            unlocked() {
                return player.ub.best.gte(4)
            },
            cost(x) {
                return x.add(1).floor()
            },
            tooltip() {
                return "Cost Formula:<br>x+1"
            },
            display() {
                return "Increase point gain base exponent by 10% per level<br>Cost: "+format(this.cost())+" Unbalanced Perks<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: ^"+format(this.effect())
            },
            canAfford() {
                return player[this.layer].best.sub(player.ub.spentUP).gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].spentUP = player[this.layer].spentUP.add(this.cost().times(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                return Decimal.times(0.1, x.max(0)).add(1)
            },
        },
    },
    clickables: {
        11: {
            title() {return "Respec Unbalanced buyables"},
            tooltip() {return "NOTE: This won't force an unbalanced reset, So you can enjoy this part a little more."},
            canClick() {return true},
            onClick() {
                setBuyableAmount(this.layer, 11, D(0))
                setBuyableAmount(this.layer, 12, D(0))
                setBuyableAmount(this.layer, 13, D(0))
                setBuyableAmount(this.layer, 14, D(0))
                player.ub.spentUP = D(0)
            }
		},
        12: {
            title() {
                if (!player.ub.startnum) return "Unleash HER nightmare."
                return "14MN07H4PPY >=["
            },
            tooltip() {
                if (!player.ub.startnum) return "NOTE: Please don't."
                return "NOTE: 011 0000 01 1 / 0000 01 0001 0 / 1011 111 001 / 100 111 10 0 001100"
            },
            canClick() {return !player.ub.startnum},
            onClick() {
                if (confirm("Do you want to continue? This can cause many mistakes, Press Yes to Confirm.")) {
                    if (confirm("You could make her feels pain, Do you want to proceed?")) {
                        if (confirm("Is this want you really want? =[")) {
                            player.ub.startnum = true
                        }
                    }
                }
            }
		},
    },
    NMII() {
        let base = player.points.max(0).add(1).log(20).add(1).pow(1.25)
        if (player.ub.best.gte(4)) base = base.pow(1)
        return base
    },
    NMV() {
        return player.ub.best.max(4).div(4)
    },
    gameMode() {
        return ["", "NM", "NM+", "NM++", "NM+3", "NM+4"][player.ub.best.min(5)]
    },
    layerShown(){return hasAchievement('a', 13)},
    update(diff) {
        VERSION.withmode = "Le Stupid Tree Game "+ tmp.ub.gameMode + " v" + VERSION.num
        if (player.ub.best.eq(4)) {player.ub.num = player.ub.num.times(tmp.ub.NumbruhMult.pow(D(diff))).min(1e20)}
    }
})