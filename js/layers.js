addLayer("amogus", {
    name: "amogus", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ඞ", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        AB: new Decimal (0),
    }},
    tooltip() {
       let base = format(player.amogus.points)+" amogus"
       if (hasUpgrade('amogus', 25)) base = base+"<br>"+format(player.amogus.AB)+" 🆎"
       return base
    },
    color: "#FF0000",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "amogus", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal (1)
        if (hasUpgrade('amogus', 15)) mult = mult.times(upgradeEffect('amogus', 15))
        if (hasUpgrade('amogus', 21)) mult = mult.times(upgradeEffect('amogus', 21))
        if (hasUpgrade('amogus', 31)) mult = mult.times(upgradeEffect('amogus', 31))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal (1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for amogus", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    getABeffect() {
        return player.amogus.AB.max(0).add(1).pow(0.5)
    },
    tabFormat: {
        "Upgrades": {
            unlocked(){return true},
            content:[
                "main-display",
                "blank",
                ["prestige-button",function(){return ""}],
                "blank",
                "resource-display",
                "blank",
                "blank",
                ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15]]],
                ["row", [["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24], ["upgrade", 25]]],
                ["row", [["upgrade", 31], ["upgrade", 32], ["upgrade", 33], ["upgrade", 34], ["upgrade", 35]]]
            ]
        },
        "🆎": {
            unlocked(){return hasUpgrade('amogus', 25)},
            content:[
                "main-display",
                "blank",
                ["prestige-button",function(){return ""}],
                "blank",
                "resource-display",
                ["display-text",
                function() {
                    return "You have " + format(player.amogus.AB) + " 🆎, Translated to a x" + format(tmp.amogus.getABeffect) + " boost to point gain."
                }],
                "blank",
                "blank",
                ["row", [["buyable", 11], ["buyable", 12]]],
            ]
        },
    },
    upgrades: {
        11: {
	        title: "Amogus Upgrade A1",
        	description: "Start gaining points by doing absolutely nothing.",
         	cost: new Decimal (1),
       	},
        12: {
	        title: "Amogus Upgrade A2",
        	description: "Multiply point gain by 4, how boring.",
         	cost: new Decimal (4),
            effect() {
                let base = new Decimal (4)
                if (hasUpgrade('amogus', 23)) base = base.add(upgradeEffect('amogus', 23))
                return base
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('amogus', 11)}
       	},
        13: {
	        title: "Amogus Upgrade A3",
        	description: "Multiply point gain based on best amogus. (by using a sussy formula)",
         	cost: new Decimal (10),
            tooltip() {return "Best Amogus: "+format(player.amogus.best)+"<br>Formula: ([best amogus]+2)<sup>0.4</sup>"},
            effect() {return player.amogus.best.max(0).add(2).pow(0.4)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('amogus', 12)}
       	},
        14: {
	        title: "Amogus Upgrade A4",
        	description: "Multiply point gain based on points.",
         	cost: new Decimal (25),
            tooltip() {return "Formula: (log<sub>10</sub>([points]+1)+2)<sup>0.5</sup>"},
            effect() {return player.points.max(0).add(1).log(10).add(2).pow(0.5)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('amogus', 13)}
       	},
        15: {
	        title: "Amogus Upgrade A5",
        	description: "Multiply amogus gain based on points.",
         	cost: new Decimal (69),
            tooltip() {return "Formula: (log<sub>10</sub>([points]+1)+2)<sup>0.2</sup>"},
            effect() {return player.points.max(0).add(1).log(10).add(2).pow(0.2)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('amogus', 14)}
       	},
        21: {
	        title: "Amogus Upgrade B1",
        	description: "Multiply amogus gain based on best amogus.",
         	cost: new Decimal (256),
            tooltip() {return "Formula: (log<sub>10</sub>([best amogus]+1)+2)<sup>0.25</sup>"},
            effect() {return player.amogus.best.max(0).add(1).log(10).add(2).pow(0.25)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('amogus', 15)}
       	},
        22: {
	        title: "Amogus Upgrade B2",
        	description: "Square root the point gain divider, should be pretty useful later on.",
         	cost: new Decimal (420),
            unlocked() {return hasUpgrade('amogus', 21)}
       	},
        23: {
	        title: "Amogus Upgrade B3",
        	description: "Add 1 to <b>Amogus Upgrade A2</b>'s Effect Base Per Upgrade.",
         	cost: new Decimal (1024),
            effect() {return new Decimal (player.amogus.upgrades.length)},
            effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id)) },
            unlocked() {return hasUpgrade('amogus', 22)}
       	},
        24: {
	        title: "Amogus Upgrade B4",
        	description: "It's getting little slow, Multiply Point gain based on upgrades",
         	cost: new Decimal (1536),
            tooltip() {return "Formula: ([amogus upgrades]+2)<sup>1.25</sup>"},
            effect() {return new Decimal (player.amogus.upgrades.length).add(2).pow(1.25)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('amogus', 23)}
       	},
        25: {
	        title: "Amogus Upgrade B5",
        	description: "Multiply Point gain by 2.5, Unlock <b>🆎</b> tab",
         	cost: new Decimal (4096),
            effect() {return new Decimal (2.5)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('amogus', 24)}
       	},
        31: {
	        title: "Amogus Upgrade C1",
        	description: "Each <b>🆎 Generator</b> Multiply amogus gain by 1.25",
         	cost: new Decimal (16384),
            effect() {return Decimal.pow(1.25, getBuyableAmount('amogus', 12))},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('amogus', 25)}
       	},
        32: {
	        title: "Amogus Upgrade C2",
        	description: "Boost 🆎 Limit based on 🆎",
         	cost: new Decimal (49152),
             tooltip() {return "Formula: (log<sub>10</sub>([🆎]+10)+2)<sup>0.25</sup>"},
            effect() {return player.amogus.AB.max(0).add(10).log(10).max(1).add(2).pow(0.25)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('amogus', 31)}
       	},
        33: {
	        title: "Amogus Upgrade C3",
        	description: "Increase <b>🆎 Generator</b>'s Second Effect Base by 1, Unlock <b>🆎 Booster</b>",
         	cost: new Decimal (1e5),
            effect() {return new Decimal (1)},
            effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id))},
            unlocked() {return hasUpgrade('amogus', 32)}
       	},
        34: {
	        title: "Amogus Upgrade C4",
        	description: "Each <b>🆎 Booster</b> Multiply point gain by 2",
         	cost: new Decimal (262144),
            effect() {return Decimal.pow(2, getBuyableAmount('amogus', 12))},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade('amogus', 33)}
       	},
        35: {
	        title: "Amogus Upgrade C5",
        	description: "Multiply 🆎 Gain and Limit by 1.1 per upgrade",
         	cost: new Decimal (1048576),
            effect() {return Decimal.pow(1.1, player.amogus.upgrades.length)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade('amogus', 34)}
       	},
    },
    buyables: {
        11: {
            title: "🆎 Booster",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color": "#C71585"
                }
            },
            unlocked() {
                return hasUpgrade('amogus', 33)
            },
            cost(x) {
                return new Decimal(1e3).mul(Decimal.pow(4, x.pow(1.25))).floor()
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " amogus" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effects: Boost 🆎 gain and 🆎 limit by " + format(buyableEffect(this.layer, this.id))+"x"
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal (2)
                let expo = x
                let eff1 = base1.pow(expo)
                return eff1
            },
        },
        12: {
            title: "🆎 Generator",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color": "#FFFF00"
                }
            },
            unlocked() {
                return hasUpgrade('amogus', 25)
            },
            cost(x) {
                return new Decimal(1e3).mul(Decimal.pow(4, x.pow(1.25))).floor()
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " amogus" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effects: Gain " + format(buyableEffect(this.layer, this.id).P)+" 🆎/s"+"<br>But With a Limit of "+format(buyableEffect(this.layer, this.id).L)+" 🆎"
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal (1.125)
                let base2 = new Decimal (2)
                if (hasUpgrade('amogus', 33)) base2 = base2.add(upgradeEffect('amogus', 33))
                let expo = x
                let eff1 = base1.pow(x.sub(1), expo).mul(x.min(1))
                eff1 = eff1.times(buyableEffect('amogus', 11))
                if (hasUpgrade('amogus', 35)) eff1 = eff1.times(upgradeEffect('amogus', 35))
                let eff2 = base2.pow(x, expo).mul(x.min(1))
                eff2 = eff2.times(buyableEffect('amogus', 11))
                if (hasUpgrade('amogus', 32)) eff2 = eff2.times(upgradeEffect('amogus', 32))
                if (hasUpgrade('amogus', 35)) eff2 = eff2.times(upgradeEffect('amogus', 35))
                return {
                    P: eff1,
                    L: eff2
                }
            },
        },
    },
    update(diff) {
        player.amogus.AB = player.amogus.AB.add((buyableEffect('amogus', 12).P).times(diff)).min(buyableEffect('amogus', 12).L)
    },
    layerShown(){return true}
})