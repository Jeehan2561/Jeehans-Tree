addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "1", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        floor: Decimal.dZero,
		points: new Decimal(0),
        best: new Decimal (0),

    }},
    color: "#31AEB0",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "floors", // Name of resource prestige is based on
    baseAmount() {return player.p.floor.add(player.points)}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base() {return new Decimal (1.5)},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.times(buyableEffect('p', 12))
        if (hasUpgrade('p', 11)) mult = mult.times(upgradeEffect('p', 11))
        if (hasUpgrade('p', 24)) mult = mult.times(upgradeEffect('p', 24))
        if (hasUpgrade('p', 25)) mult = mult.times(upgradeEffect('p', 25))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    effect() {
        let boost = new Decimal (1).add(player.p.best.pow(0.5).div(16))
        return boost
    },
    getResetGain() {
        if (tmp.p.baseAmount.lt(tmp.p.requires)) return Decimal.dZero
        return Decimal.pow(tmp.p.base, tmp.p.baseAmount.sub(tmp.p.requires).max(0)).times(tmp.p.gainMult).floor()
    },
    getNextAt(canMax=false) {
        if (tmp.p.baseAmount.lt(tmp.p.requires)) return tmp.p.requires
        return tmp.p.getResetGain.add(1).pow(Decimal.div(1, tmp.p.gainExp)).div(tmp.p.gainMult).log(tmp.p.base).add(tmp.p.requires).max(tmp.p.requires)
        },
    effectDescription: function(){
        return " translated to a " + format(tmp[this.layer].effect) + "x boost to elevator's speed"
    },
    onPrestige(gain) {
        player[this.layer].floor = Decimal.dZero
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    tabFormat: {
        "Main": {
            unlocked(){return true},
            content:[
                "main-display",
                    "blank",
                    ["prestige-button", "", function (){ return false ? {'display': 'none'} : {}}],
                    "blank",
                    "resource-display",
                    ["display-text",
                    function() {
                        return "All prestige upgrades' cost is multiplied by 1.6 per bought upgrade"
                    }],
                    ["display-text",
                    function() {
                        return "Doing a Prestige will reset your floor back at 0 for prestige points."
                    }],
                    "milestones",
                    "blank",
                    "blank",
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15]]],
                    ["row", [["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24], ["upgrade", 25]]],
                    "blank",
                    "blank",
                    "buyables",
                    "blank",
                    "blank",
                    ["row", [["bar", 0]]],
                    "blank",
            ]
        },
    },
    upgrades: {
        11: {
	        title: "Prestige Upgrade A1",
        	description: "Multiply prestige gain by 1.2 per upgrade.",
            cost() {return Decimal.pow(1.6, player.p.upgrades.length).floor()},
            effect() {
                let base = new Decimal(1.2)
                let expo = new Decimal(player[this.layer].upgrades.length)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return player.p.best.gte(1)}
       	},
        12: {
	        title: "Prestige Upgrade A2",
        	description: "Divide <b>Faster Elevator</b>'s cost based on the current floor.",
            cost() {return Decimal.pow(1.6, player.p.upgrades.length).floor()},
            effect() {
                let base = Decimal.add(1, player.p.floor.add(player.points))
                let expo = new Decimal(0.4)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return "/"+format(upgradeEffect(this.layer, this.id))},
            unlocked() {return player.p.best.gte(1)}
       	},
        13: {
	        title: "Prestige Upgrade A3",
        	description: "Multiply Elevator's speed based on unspent prestige points.",
            cost() {return Decimal.pow(1.6, player.p.upgrades.length).floor()},
            effect() {
                let base = Decimal.add(1, player.p.points.max(0)).log10().add(1)
                let expo = new Decimal(0.4)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return player.p.best.gte(1)}
       	},
        14: {
	        title: "Prestige Upgrade A4",
        	description: "Multiply Elevator's speed by 1.2 per upgrade.",
            cost() {return Decimal.pow(1.6, player.p.upgrades.length).floor()},
            effect() {
                let base = new Decimal(1.2)
                let expo = new Decimal(player[this.layer].upgrades.length)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return player.p.best.gte(1)}
       	},
        15: {
	        title: "Prestige Upgrade A5",
        	description: "Multiply Elevator's speed based on the current floor.",
            cost() {return Decimal.pow(1.6, player.p.upgrades.length).floor()},
            effect() {
                let base = Decimal.add(1, player.p.floor.add(player.points))
                let expo = new Decimal(0.5)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return player.p.best.gte(1)}
       	},
        21: {
	        title: "Prestige Upgrade B1",
        	description: "Multiply Elevator's speed by 2.",
            cost() {return Decimal.pow(1.6, player.p.upgrades.length).floor()},
            effect() {
                return new Decimal (2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return player.p.best.gte(1)}
       	},
        22: {
	        title: "Prestige Upgrade B2",
        	description: "Multiply Elevator's speed by 1.1 per <b>Prestige Boost</b>.",
            cost() {return Decimal.pow(1.6, player.p.upgrades.length).floor()},
            effect() {
                let base = new Decimal (1.1)
                let expo = getBuyableAmount(this.layer, 12).max(0)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return player.p.best.gte(1)}
       	},
        23: {
	        title: "Prestige Upgrade B3",
        	description: "Divide <b>Prestige Boost</b>'s cost based on the current floor.",
            cost() {return Decimal.pow(1.6, player.p.upgrades.length).floor()},
            effect() {
                let base = Decimal.add(1, player.p.floor.add(player.points))
                let expo = new Decimal(0.4)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return "/"+format(upgradeEffect(this.layer, this.id))},
            unlocked() {return player.p.best.gte(1)}
       	},
        24: {
	        title: "Prestige Upgrade B4",
        	description: "Multiply prestige gain by 1.1 per <b>Faster Elevator</b>.",
            cost() {return Decimal.pow(1.6, player.p.upgrades.length).floor()},
            effect() {
                let base = new Decimal (1.1)
                let expo = getBuyableAmount(this.layer, 11).max(0)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return player.p.best.gte(1)}
       	},
        25: {
	        title: "Prestige Upgrade B5",
        	description: "Multiply prestige gain by 1.5",
            cost() {return Decimal.pow(1.6, player.p.upgrades.length).floor()},
            effect() {
                return new Decimal (1.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return player.p.best.gte(1)}
       	},
    },
    buyables: {
        11: {
            title: "Faster Elevator",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color" : "#31AEB0"
                }
            },
            unlocked() {
                return player.p.best.gte(1)
            },
            cost(x) {
                let base = new Decimal (3)
                let expo = new Decimal (1.2)
                let cost = base.pow(x.pow(expo))
                if (hasUpgrade('p', 12)) cost = cost.div(upgradeEffect('p', 12))
                return cost.floor()
            },
            tooltip() {
                return "Cost Formula:<br>3<sup>x<sup>1.2</sup></sup>"
            },
            display() {
                return "Multiply Elevator's speed by 1.2 per level<br>Cost: "+format(this.cost())+" Prestige Points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].points = player[this.layer].points.sub(this.cost().times(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                return Decimal.pow(1.2, x.max(0))
            },
        },
        12: {
            title: "Prestige Boost",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color" : "#31AEB0"
                }
            },
            unlocked() {
                return player.p.best.gte(1)
            },
            cost(x) {
                let base = new Decimal (3)
                let expo = new Decimal (1.2)
                let cost = base.pow(x.pow(expo)).times(4)
                if (hasUpgrade('p', 23)) cost = cost.div(upgradeEffect('p', 23))
                return cost.floor()
            },
            tooltip() {
                return "Cost Formula:<br>4*3<sup>x<sup>1.2</sup></sup>"
            },
            display() {
                return "Multiply Prestige gain by 1.2 per level<br>Cost: "+format(this.cost())+" Prestige Points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].points = player[this.layer].points.sub(this.cost().times(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                return Decimal.pow(1.2, x.max(0))
            },
        },
    },
    bars: {
        0: {
            direction: RIGHT,
            width: 500,
            height: 50,
            progress() {return Decimal.sub(1, player.points.add(1).floor().sub(player.points))},
            display() {return "Progress till the next floor<br>"+ format(Decimal.sub(1, player.points.add(1).floor().sub(player.points)).times(100))+"%/100.000%"},
            instant: false,
            fillStyle: {'background-color' : "#31AEB0"},
            baseStyle: {'background-color' : "#000000"},
        },
    },
    layerShown(){return player.points.gte(1)||player.p.unlocked},
    update(diff) {
        if (player.points.gte(1)) {
            player.points = Decimal.dZero
            player.p.floor = player.p.floor.add(1)
        }
    }
})