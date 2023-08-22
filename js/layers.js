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
                    "blank",
                    "blank",
                    "achievements"
            ]
        },
        "Tree Manager": {
            unlocked(){return hasUpgrade('add', 13)||player.add.version.gte(1)},
            content:[
                "main-display",
                    "blank",
                    "blank",
                    "resource-display",
                    "blank",
                    "blank",
                    ["row",[["display-text",function() {if (hasUpgrade('add', 23)) return "Le Underrated Forest<br>Version: "+([tmp.a.LUFversion][0][player.a.trees])}], "blank", ["buyable", "A1"]]],
                    ["row",[["display-text",function() {return "The Operator Tree<br>Author: ψ<sub>ε<sub>Ω+1</sub></sub> (Harry) <br>Version: "+([tmp.add.versionList][0][player.add.version])}], "blank", ["buyable", 11]]],
                    ["row",[["display-text",function() {if (player.a.trees.gte(1)) return "Yet Another Challenge Tree: Adventure<br>Author: new42ur3jeans (42UR3) <br>Version: "+([tmp.I.versionList][0][player.I.version])}], "blank", ["buyable", 12]]],
                    ["row",[["display-text",function() {if (player.a.trees.gte(2)) return "The Plant Tree: Original<br>Author: Thenonymous <br>Version: "+([tmp.pla.versionList][0][player.pla.version])}], "blank", ["buyable", 13]]],
                    "clickables",
            ]
        },
    },
    LUFversion() {
        return ["v1", "v1.1", "v1.2", "v1.3"]
    },
    LUFTrees() {
        return ["Yet Another Challenge Tree: Adventure", "The Plant Tree Original", "No Spoiler >:[", "The Meta Upgrades Incremental"]
    },
    buyables: {
        A1: {
            unlocked() {return hasUpgrade('add', 23)},
            title() {return "Le Underrated Forest"},
            display() {
                return "Update Le Underrated Forest to "+[tmp.a.LUFversion][0][player.a.trees.add(1)]+"<br>, Unlock "+[tmp.a.LUFTrees][0][player.a.trees]+"<br>, Multiply Point gain by 2.5 per level<sup>2</sup><br>Cost: "+format(this.cost())+" Points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            effect(x) {return D(2.5).pow(x.pow(2))},
            style() {
                return {
                "min-height": "200px",
                "width": "200px",
            }
            },
            cost() {return [D(1e6), D(1e25), Decimal.dInf][player.a.trees]},
            buy() {
                let cost = D(1)
                player.points = player.points.sub(this.cost().mul(cost))
                player.a.trees = player.a.trees.add(1)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.points.gte(this.cost())
            },
        },
        11: {
            title() {return "Update"},
            display() {
                return "Update The Operator Tree to "+[tmp.add.versionList][0][player.add.version.add(1)]+", Multiply Point gain by 2.5 per level<br>Cost: "+format(this.cost())+" Points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            effect(x) {return D(2.5).pow(x)},
            style() {
                return {
                "min-height": "200px",
                "width": "200px",
            }
            },
            cost() {return [D(10), D(300), D(6e3), D(1e5), D(1e12), D(1e67), Decimal.dInf][player.add.version]},
            buy() {
                let cost = D(1)
                player.points = player.points.sub(this.cost().mul(cost))
                player.add.version = player.add.version.add(1)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.points.gte(this.cost())
            },
        },
        12: {
            unlocked() {return player.a.trees.gte(1)},
            title() {return "Update"},
            display() {
                return "Update Yet Another Challenge Tree: Adventure to "+[tmp.I.versionList][0][player.I.version.add(1)]+", Multiply Point gain by 4 per level<br>Cost: "+format(this.cost())+" Points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            effect(x) {return D(4).pow(x)},
            style() {
                return {
                "min-height": "200px",
                "width": "200px",
            }
            },
            cost() {return [D(6e9), D(1e15), Decimal.dInf][player.I.version]},
            buy() {
                let cost = D(1)
                player.points = player.points.sub(this.cost().mul(cost))
                player.I.version = player.I.version.add(1)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.points.gte(this.cost())
            },
        },
        13: {
            unlocked() {return player.a.trees.gte(2)},
            title() {return "Update"},
            display() {
                return "Update The Plant Tree: Original to "+[tmp.pla.versionList][0][player.pla.version.add(1)]+", Multiply Point gain by 5.5 per level<br>Cost: "+format(this.cost())+" Points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            effect(x) {return D(5.5).pow(x)},
            style() {
                return {
                "min-height": "200px",
                "width": "200px",
            }
            },
            cost() {return [D(1e34), D(1e44), Decimal.dInf][player.pla.version]},
            buy() {
                let cost = D(1)
                player.points = player.points.sub(this.cost().mul(cost))
                player.pla.version = player.pla.version.add(1)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.points.gte(this.cost())
            },
        },
    },
    clickables: {
        11: {
            title() {return "Switch to"},
            display() {return "The Operator Tree"},
            unlocked() {return player.a.trees.gte(1)},
            canClick() {return !player.universe.eq(0)},
            onClick() {player.universe = D(0)},
        },
        12: {
            title() {return "Switch to"},
            display() {return "Yet Another Challenge Tree: Adventure"},
            unlocked() {return player.a.trees.gte(1)},
            canClick() {return !player.universe.eq(1)},
            onClick() {player.universe = D(1)},
        },
        13: {
            title() {return "Switch to"},
            display() {return "The Plant Tree: Original"},
            unlocked() {return player.a.trees.gte(2)},
            canClick() {return !player.universe.eq(2)},
            onClick() {player.universe = D(2)},
        },
    },
    achievements: {
        11: {
            name() {return "Operate"},
            tooltip() {return "Gain an addition point."},
            done() {return player.add.points.gte(1)},
        },
        12: {
            name() {return "This feels wrong..."},
            tooltip() {return "Update The Operator Tree to v0.1."},
            done() {return player.add.version.gte(1)},
        },
        13: {
            name() {return "What, More?"},
            tooltip() {return "Gain a multiplication point."},
            done() {return player.mul.points.gte(1)},
        },
        14: {
            name() {return "Wait this isn't in my game >:["},
            tooltip() {return "Buy an addition buyable."},
            done() {return getBuyableAmount('add', 11).gte(1)},
        },
        15: {
            name() {return "Wait What?"},
            tooltip() {return "Update The Operator Tree to v0.2."},
            done() {return player.add.version.gte(2)},
        },
        21: {
            name() {return "Negative."},
            tooltip() {return "Gain a subtraction point."},
            done() {return player.sub.points.gte(1)},
        },
        22: {
            name() {return "This is useless"},
            tooltip() {return "Buy an subtraction buyable."},
            done() {return getBuyableAmount('sub', 11).gte(1)},
        },
        23: {
            name() {return "How Nice."},
            tooltip() {return "Update The Operator Tree to v0.3."},
            done() {return player.add.version.gte(3)},
        },
        24: {
            name() {return "It's on the ceiling"},
            tooltip() {return "Gain a rational point."},
            done() {return player.rat.points.gte(1)},
        },
        25: {
            name() {return "Please more content."},
            tooltip() {return "Update The Operator Tree to v0.4."},
            done() {return player.add.version.gte(4)},
        },
        31: {
            name() {return "New Tree?"},
            tooltip() {return "Unlock YACT:A."},
            done() {return player.a.trees.gte(1)},
        },
        32: {
            name() {return "Is this an adventure?"},
            tooltip() {return "Complete your first challenge."},
            done() {return hasChallenge('I', 11)},
        },
        33: {
            name() {return "Nice one."},
            tooltip() {return "Gain a Tier 1 Power."},
            done() {return player.I.best.gte(1)},
        },
        34: {
            name() {return "Expansion"},
            tooltip() {return "Update YACT:A to v0.1."},
            done() {return player.I.version.gte(1)},
        },
        35: {
            name() {return "Second Tier."},
            tooltip() {return "Gain a Tier 2 Power."},
            done() {return player.II.best.gte(1)},
        },
        41: {
            name() {return "Half the tree."},
            tooltip() {return "Update The Operator Tree to v0.5."},
            done() {return player.add.version.gte(5)},
        },
        42: {
           name() {return "Divider"},
            tooltip() {return "Gain a division point."},
            done() {return player.div.points.gte(1)},
        },
        43: {
            name() {return "Challenge School"},
            tooltip() {return "Update YACT:A to v0.2."},
            done() {return player.I.version.gte(2)},
        },
        44: {
            name() {return "Mathematician."},
            tooltip() {return "Gain a Tier 3 Power."},
            done() {return player.III.best.gte(1)},
        },
        45: {
            name() {return "Functioning"},
            tooltip() {return "Start generating f("+makeBlue("t")+")."},
            done() {return player.III.ft.gt(0)},
        },
        51: {
            name() {return "It's planting time"},
            tooltip() {return "Unlock The Plant Tree."},
            done() {return player.a.trees.gte(2)},
        },
        52: {
            name() {return "Thenonymous is happy"},
            tooltip() {return "Gain a plant."},
            done() {return player.pla.best.gte(1)},
        },
        53: {
            name() {return "What is magnitude? is magnitude?"},
            tooltip() {
                if (hasAchievement(this.layer, this.id)) return "Buy a plant upgrade related to magnitude."
                return "Well, I can't tell (well, I can't tell)"
            },
            done() {return hasUpgrade('pla', 14)},
        },
        54: {
            name() {return "Growing Fast."},
            tooltip() {return "Buy Upgrade Fertilizer."},
            done() {return hasUpgrade('pla', 15)},
        },
        55: {
            name() {return "Drink some wa'er"},
            tooltip() {return "Buy Watering Can."},
            done() {return hasUpgrade('pla', 25)},
        },
        61: {
            name() {return "Zen Garden"},
            tooltip() {return "Update The Plant Tree to v1.0."},
            done() {return player.pla.version.gte(1)},
        },
        62: {
            name() {return "Plant Garden"},
            tooltip() {return "Gain a garden."},
            done() {return player.gar.best.gte(1)},
        },
        63: {
            name() {return "Plant Automation"},
            tooltip() {return "Gain 4 gardens."},
            done() {return player.gar.best.gte(4)},
        },
        64: {
            name() {return "Nice >:]"},
            tooltip() {return "Gain "+format(6.969e42)+" points."},
            done() {return player.points.gte(6.969e42)},
        },
        65: {
            name() {return "INTO THE ZONE-"},
            tooltip() {return "Update The Plant Tree to v2.0."},
            done() {return player.pla.version.gte(2)},
        },
        71: {
            name() {return "Thyme for Zone!"},
            tooltip() {return "Gain a zone."},
            done() {return player.zon.best.gte(1)},
        },
        72: {
            name() {return "Where's the new zone?"},
            tooltip() {return "Gain 3 zones."},
            done() {return player.zon.best.gte(3)},
        },
        73: {
            name() {return "Broken Balancing"},
            tooltip() {return "Gain "+format(1e100)+" Plant points."},
            done() {return player.planpts.gte(1e100)},
        },
        74: {
            name() {return "Finally!!!"},
            tooltip() {return "Update The Operator Tree to v0.6."},
            done() {return player.add.version.gte(6)},
        },
        75: {
            name() {return "Exponentiated"},
            tooltip() {return "Gain an exponential point."},
            done() {return player.expo.best.gte(1)},
        },
    },
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
addLayer("add", {
    name: "addition", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: D(0),
        best: D(0),
        AB: false,
        version: D(0),
    }},
    color: "#4BDC13",
    requires() {return D(1).sub(buyableEffect('sub', 11).d)}, // Can be a function that takes requirement increases into account
    resource: "addition points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    exponent: 0.5,
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        if (hasUpgrade('mul', 12)) mult = mult.times(upgradeEffect('mul', 12))
        if (hasUpgrade('add', 22)) mult = mult.times(upgradeEffect('add', 22))
        if (hasUpgrade('add', 31)) mult = mult.times(upgradeEffect('add', 31))
        mult = mult.times(tmp.rat.effect)
        mult = mult.times(challengeEffect('II', 21))
        mult = mult.times(challengeEffect('III', 21))
        if (hasMilestone('rat', 7)) mult = mult.times(milestoneEffect('rat', 7))
        if (hasMilestone('div', 3)) mult = mult.times(milestoneEffect('div', 3))
        if (hasMilestone('div', 12)) mult = mult.times(milestoneEffect('div', 12))
        if (hasMilestone('rat', 10)) mult = mult.times(milestoneEffect('rat', 10))
        mult = mult.times(buyableEffect('mul', 11))
        if (hasMilestone('pla', 2)) mult = mult.times(milestoneEffect('pla', 2))
        if (hasMilestone('pla', 4)) mult = mult.times(milestoneEffect('pla', 4))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
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
                    "blank",
                    "blank",
                    "milestones",
                    "buyables",
                    "blank",
                    "blank",
                    "upgrades"
            ]
        },
    },
    effect() {
        let mul = D(1)
        if (hasMilestone('rat', 1)) mul = mul.times((hasMilestone('rat', 4)) ? player.rat.best.max(2) : 2)
        if (hasMilestone('div', 13)) mul = mul.times(milestoneEffect('div', 13))
        return player.add.points.add(1).log(20).pow(0.5).div(10).times(mul)
    },
    effectDescription() {
        if (player.add.version.gte(1)) return ", translated to a +" + format(tmp.add.effect) + " boost to point gain base"
    },
    passiveGeneration() {
        if (hasMilestone('add', 1)) return D(0.5)
        return 0
    },
    doReset(l) {
        if (!(layers[l].row > this.row)) return
        
        let keep = ['milestones', 'version', 'AB']
        if (hasMilestone('add', 0)) keep.push('upgrades')
        if (hasMilestone('div', 6)) keep.push('buyables')
        if (player.universe.eq(0)){layerDataReset(this.layer, keep)}
    },
    hotkeylist() {["The Operator Tree Hotkeys:", "Yet Another Challenge Tree: Adeventure Hotkeys:", "The Plant Tree Hotkeys:"][player.universe]},
    hotkeys: [
        {key: ">", description: ">: Switch Trees", onPress(){if (player.universe.add(1).lte(player.a.trees)) player.universe = player.universe.add(1)}, unlocked() {return player.a.trees.gte(1)}},
        {key: "<", description: "<: Switch Trees", onPress(){if (player.universe.sub(1).gte(0)) player.universe = player.universe.sub(1)}, unlocked() {return player.a.trees.gte(1)}},
        {key: "a", description: "A: Reset for Addition Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.universe.eq(0)}}
    ],
    automate() {
        if (player.add.AB){buyBuyable('add', 11)}
    },
    upgrades: {
        11: {
            title() {return "Adder"},
            tooltip() {return "Effect Formula:<br>(log<sub>2</sub>[addition points]+1)/20"},
            description() {return "Increase Point gain base based on addition points."},
            effect() {return player.add.points.max(0).add(1).log2().add(1).div(20)},
            cost() {return D(1)},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        12: {
            title() {return "Additional"},
            tooltip() {return "Effect Formula:<br>log<sub>10</sub>[addition points]<sup>0.5</sup>/8"},
            description() {return "Increase Point gain base based on points."},
            effect() {return player.points.max(0).add(1).ln().pow(0.5).div(8)},
            cost() {return D(2)},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        13: {
            title() {return "Woah What?"},
            tooltip() {return ""},
            description() {
                if (hasUpgrade('add', 23)) return "Increase Point gain by 0.05 per upgrade<sup>2</sup>, Unlock a new tab in achievements layer."
                return "Increase Point gain by 0.05 per upgrade, Unlock a new tab in achievements layer."},
            effect() {
                if (hasUpgrade('add', 23)) return D(player.add.upgrades.length).pow(2).div(20)
                return D(player.add.upgrades.length).div(20)},
            cost() {return D(4)},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        21: {
            title() {return "Addictive"},
            description() {return "Multiply Subtraction gain by 2, Improve <b>Time Tables</b>' Effect."},
            effect() {return D(2)},
            cost() {return D(1000)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return player.add.version.gte(4)},
        },
        22: {
            title() {return "Additional Points"},
            tooltip() {return "Effect Formula:<br>log<sub>10</sub>[points]<sup>0.5</sup>"},
            description() {return "Multiply Addition gain based on points."},
            effect() {return player.points.max(0).add(1).log10().max(1).pow(0.5)},
            cost() {return D(2000)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return player.add.version.gte(4)},
        },
        23: {
            title() {return "A new Addventure???"},
            description() {return "Improve <b>Woah What?</b>'s first effect, Unlock something new."},
            cost() {return D(4000)},
            unlocked() {return player.add.version.gte(4)},
        },
        31: {
            title() {return "Function+"},
            tooltip() {return "log<sub>10</sub>([ft]+10)"},
            description() {return "Multiply Addition gain based on f("+makeBlue("t")+")."},
            effect() {return player.III.ft.max(0).add(10).log10()},
            cost() {return D(1e10)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasMilestone('div', 7)},
        },
        32: {
            title() {return "+-+"},
            description() {return "Multiply Multiplication gain by [upgrade]+1"},
            effect() {return D(player.add.upgrades.length).add(1)},
            cost() {return D(1e12)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasMilestone('div', 7)},
        },
        33: {
            title() {return "Decreased"},
            tooltip() {return "x*2<sup>x</sup> -> 10*2<sup>x</sup>"},
            description() {return "Change Addtional Boost's Cost Formula"},
            cost() {return D(1e14)},
            unlocked() {return hasMilestone('div', 7)},
        },
    },
    milestones: {
        0: {
            requirementDescription: "6 Addition Upgrades",
            unlocked() {return player.add.version.gte(4)},
            done() {return D(player.add.upgrades.length).gte(6)},
            effectDescription() {return "Keep All Addition Upgrades on Every Reset."},
        },
        1: {
                requirementDescription: "10 Additional Boosts",
                unlocked() {return hasUpgrade('mul', 13)},
                done() {return getBuyableAmount('add', 11).gte(10)},
                effectDescription() {return "Passively gain 50% of addition gain per second."},
        },
    },
    ABBase() {
        let base = D(0.1)
        if (hasMilestone('rat', 5)) base = base.times(milestoneEffect('rat', 5))
        return base
    },
    buyables: {
        11: {
            title() {return "Additional Boost"},
            display() {
                return "Increase point gain base by "+format(tmp.add.ABBase)+" per level<br>Cost: "+format(this.cost())+" Addition Points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: +"+format(this.effect())
            },
            effect(x) {return x.times(tmp.add.ABBase)},
            unlocked() {return hasUpgrade('mul', 13)},
            tooltip() {
                if (hasUpgrade('add', 33)) return "Cost Formula: 10*2<sup>x</sup>"
                return "Cost Formula: x*2<sup>x</sup>"},
            cost(x) {
                if (hasUpgrade('add', 33)) return D(10).times(D(2).pow(x)).floor()
                return x.max(0).times(D(2).pow(x)).floor()},
            buy() {
                let cost = D(1)
                if (hasMilestone('rat', 9)) cost = D(0)
                player.add.points = player.add.points.sub(this.cost().mul(cost)).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.add.points.gte(this.cost())
            },
        },
    },
    getResetGain() {
        if (player.points.lt(tmp.add.requires)) return D(0)
        return player.points.times(2).div(tmp.add.requires).log(2).times(tmp.add.gainMult).pow(tmp.add.gainExp).floor()
    },
    getNextAt() {
        if (player.points.lt(tmp.add.requires)) return tmp.add.requires
        return D(2).pow(tmp.add.getResetGain.add(1).pow(D(1).div(tmp.add.gainExp)).div(tmp.add.gainMult)).div(2).times(tmp.add.requires)
    },
    versionList() {
        return ["v0.0", "v0.1", "v0.2", "v0.3", "v0.4", "v0.5", "v0.6", "v0.7", "v0.8", "v0.9", "v1.0"]
    },
    layerShown(){return player.universe.eq(0)},
    update(diff) {
    }
})
addLayer("sub", {
    name: "subtraction", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: D(0),
        best: D(0),
    }},
    color: "#00DDDD",
    requires: D(10), // Can be a function that takes requirement increases into account
    resource: "subtraction points", // Name of prestige currency
    baseResource: "addition points", // Name of resource prestige is based on
    exponent: 0.5,
    baseAmount() {return player.add.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        if (hasUpgrade('add', 21)) mult = mult.times(upgradeEffect('add', 21))
        if (hasUpgrade('sub', 11)) mult = mult.times(upgradeEffect('sub', 11))
        if (hasUpgrade('gar', 13)) mult = mult.times(upgradeEffect('gar', 11))
        if (hasMilestone('rat', 16)) mult = mult.times(milestoneEffect('rat', 16))
        mult = mult.times(tmp.div.effect)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    branches: ["add"],
    row: 1, // Row the layer is in on the tree (0 is the first row)
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
                    "buyables",
                    "upgrades"
            ]
        },
    },
    doReset(l) {
        if (!(layers[l].row > this.row)) return
        
        let keep = ['milestones']
        if (hasMilestone('div', 6)) keep.push('upgrades', 'buyables')
        if (player.universe.eq(0)){layerDataReset(this.layer, keep)}
    },
    hotkeys: [
        {key: "s", description: "S: Reset for Subtraction Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.universe.eq(0)}}
    ],
    passiveGeneration() {
        if (hasMilestone('div', 1)) return D(0.5)
        return 0
    },
    upgrades: {
        11: {
            title() {return "Negativity"},
            description() {return "Multiply Subtraction gain by this tree's updates."},
            effect() {return player.add.version},
            unlocked() {return hasMilestone('rat', 3)},
            cost() {return D(5)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        12: {
            title() {return "Negative Numbers"},
            description() {return "Multiply Challenge Power gain by [upgrades]+1."},
            effect() {return D(player.sub.upgrades.length).add(1)},
            unlocked() {return hasMilestone('rat', 3)},
            cost() {return D(10)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        13: {
            title() {return "Reduce"},
            description() {return "Divide Rational's cost by [upgrades]+1."},
            effect() {return D(player.sub.upgrades.length).add(1)},
            unlocked() {return hasMilestone('rat', 3)},
            cost() {return D(20)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
    },
    buyables: {
        11: {
            title() {return "Subtraction Boost+"},
            display() {
                return "Decrease Addition Requirement by 0.1 and Multiply Point gain by 1.5 per level<br>Cost: "+format(this.cost())+" Subtraction Points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"/9<br>Effect: -"+format(this.effect().d)+", "+format(this.effect().p)+"x"
            },
            purchaseLimit() {return D(9)},
            effect(x) {
                let pbase = D(1.5).pow(x)
                if (hasMilestone('rat', 0)) pbase = pbase.ceil()
                return {
                d: x.min(9).div(10),
                p: pbase
            }},
            unlocked() {return player.sub.unlocked},
            tooltip() {return "Cost Formula: x*1.5<sup>x</sup>"},
            cost(x) {return x.max(0).times(D(1.5).pow(x)).floor()},
            buy() {
                let cost = D(1)
                player.sub.points = player.sub.points.sub(this.cost().mul(cost)).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.sub.points.gte(this.cost())&&(getBuyableAmount(this.layer, this.id).lt(9))
            },
        },
    },
    getResetGain() {
        if (player.add.points.lt(10)) return D(0)
        return player.add.points.div(5).log(2).times(tmp.sub.gainMult).pow(tmp.sub.gainExp).floor()
    },
    getNextAt() {
        if (player.add.points.lt(10)) return D(10)
        return D(2).pow(tmp.sub.getResetGain.add(1).pow(D(1).div(tmp.sub.gainExp)).div(tmp.sub.gainMult)).times(5)
    },
    layerShown(){return player.add.version.gte(2)&&(player.universe.eq(0))},
    update(diff) {
    }
})
addLayer("mul", {
    name: "multiplication", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: D(0),
        best: D(0),
    }},
    color: "#38C52E",
    requires: D(10), // Can be a function that takes requirement increases into account
    resource: "multiplication points", // Name of prestige currency
    baseResource: "addition points", // Name of resource prestige is based on
    exponent: 0.5,
    baseAmount() {return player.add.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        if (hasMilestone('rat', 2)) mult = mult.times((hasMilestone('rat', 4)) ? player.rat.best.max(2) : 2)
        if (hasUpgrade('add', 32)) mult = mult.times(upgradeEffect('add', 32))
        if (hasMilestone('rat', 14)) mult = mult.times(milestoneEffect('rat', 14))
        if (hasMilestone('pla', 4)) mult = mult.times(milestoneEffect('pla', 4))
        mult = mult.times(tmp.div.effect)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    branches: ["add"],
    row: 1, // Row the layer is in on the tree (0 is the first row)
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
                    "buyables",
                    "upgrades"
            ]
        },
    },
    effect() {
        return player.mul.points.add(1).log(20).pow(0.5).div(4).add(1)
    },
    effectDescription() {
        return ", translated to a " + format(tmp.mul.effect) + "x boost to point gain base"
    },
    doReset(l) {
        if (!(layers[l].row > this.row)) return
        
        let keep = ['milestones']
        if (hasMilestone('div', 6)) keep.push('upgrades', 'buyables')
        if (player.universe.eq(0)){layerDataReset(this.layer, keep)}
    },
    hotkeys: [
        {key: "m", description: "M: Reset for Multiplication Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.universe.eq(0)}}
    ],
    passiveGeneration() {
        if (hasMilestone('div', 1)) return D(0.5)
        return 0
    },
    upgrades: {
        11: {
            title() {return "Here comes the kicker"},
            tooltip() {if (player.add.version.gte(2)) return "Multiply This effect by 2 per this tree's update starting at 2"},
            description() {
                return "Increase Point gain base by 0.2."},
            effect() {return D(0.2).times((player.add.version.gte(2)) ? D(2).pow(player.add.version.sub(1)) : 1)},
            cost() {return D(1)},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        12: {
            title() {return "Time Tables"},
            description() {
                if (hasUpgrade('add', 21)) return "Multiply addition gain by this tree's updates"
                return "Multiply addition gain by 2."},
            effect() {
                if (hasUpgrade('add', 21)) return player.add.version
                return D(2)},
            cost() {return D(1)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        13: {
            title() {return "Time to Buy"},
            description() {return "Multiply point gain by [upgrades]+1, Unlock an addition buyable."},
            effect() {return D(player.mul.upgrades.length).add(1)},
            cost() {return D(2)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
    },
    buyables: {
        11: {
            title() {return "Multiplicative Boost"},
            display() {
                return "Multiply addition gain by 1.25 per level<br>Cost: "+format(this.cost())+" Multiplication Points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            effect(x) {return D(1.25).pow(x)},
            unlocked() {return hasMilestone('rat', 7)},
            tooltip() {return "Cost Formula: 10*3<sup>x<sup>1.2</sup></sup>"},
            cost(x) {return D(3).pow(x.pow(1.2)).times(10).floor()},
            buy() {
                let cost = D(1)
                player.mul.points = player.mul.points.sub(this.cost().mul(cost)).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.mul.points.gte(this.cost())
            },
        },
    },
    getResetGain() {
        if (player.add.points.lt(10)) return D(0)
        return player.add.points.div(10).times(4).log(4).times(tmp.mul.gainMult).pow(tmp.mul.gainExp).floor()
    },
    getNextAt() {
        if (player.add.points.lt(10)) return D(10)
        return D(4).pow(tmp.mul.getResetGain.add(1).pow(D(1).div(tmp.mul.gainExp)).div(tmp.mul.gainMult)).times(2.5)
    },
    layerShown(){return player.add.version.gte(1)&&player.universe.eq(0)},
    update(diff) {
    }
})
addLayer("rat", {
    name: "rational", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: D(0),
        best: D(0),
    }},
    color: "#33AAAA",
    requires: D(250), // Can be a function that takes requirement increases into account
    resource: "rational points", // Name of prestige currency
    baseResource: "addition points", // Name of resource prestige is based on
    exponent: 0.5,
    baseAmount() {return player.add.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        if (hasUpgrade('sub', 13)) mult = mult.div(upgradeEffect('sub', 13))
        if (hasMilestone('div', 0)) mult = mult.div(milestoneEffect('div', 0))
        if (hasMilestone('rat', 6)) mult = mult.div(milestoneEffect('rat', 6))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    branches: ["add"],
    row: 2, // Row the layer is in on the tree (0 is the first row)
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
                    "milestones"
            ]
        },
    },
    effect() {
        return player.rat.points.add(1).pow(2).sub(player.rat.points.add(1)).div(20).add(1)
    },
    effectDescription() {
        return ", translated to a " + format(tmp.rat.effect) + "x boost to addition gain."
    },
    doReset(l) {
        if ((!(layers[l].row > this.row))) return
        
        let keep = ['milestones']
        if (player.universe.eq(0)){layerDataReset(this.layer, keep)}
    },
    hotkeys: [
        {key: "r", description: "R: Reset for Rational Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.universe.eq(0)}}
    ],
    milestones: {
        0: {
            requirementDescription: "1 Rational Point",
            done() {return player[this.layer].best.gte(1)},
            effectDescription() {return "Ceiling the Subtraction Boost+'s second effect (round up)."},
            },
        1: {
                requirementDescription: "2 Rational Points",
                done() {return player[this.layer].best.gte(2)},
                effect() {return Decimal.pow(1.2, player.rat.points.max(0))},
                effectDescription() {
                    if (hasMilestone('rat', 4)) return "Multiply Addition effect by Rational Points, Multiply Point gain by 1.2 per Rational Points, Currently: "+format(this.effect())+"x"
                    return "Double Addition effect, Multiply Point gain by 1.2 per Rational Points, Currently: "+format(this.effect())+"x"},
            },
        2: {
                requirementDescription: "3 Rational Points",
                done() {return player[this.layer].best.gte(3)},
                tooltip() {return "Effect Formula: 1.1<sup>ln[subtraction points]<sup>0.5</sup></sup>"},
                effect() {
                    let pow = D(1)
                    if (hasMilestone('rat', 12)) pow = pow.times(milestoneEffect('rat', 12))
                    return Decimal.pow(1.1, player.sub.points.max(0).add(1).ln().pow(0.5)).pow(pow)},
                effectDescription() {
                    if (hasMilestone('rat', 4)) return "Multiply Multiplication gain by Rational Points, Multiply Point gain based on Subtraction points, Currently: "+format(this.effect())+"x"
                    return "Double Multiplication gain, Multiply Point gain based on Subtraction points, Currently: "+format(this.effect())+"x"
                },
            },
        3: {
                requirementDescription: "4 Rational Points",
                done() {return player[this.layer].best.gte(4)},
                effectDescription() {
                    if (hasMilestone('rat', 4)) return "Multiply Point gain by Rational Points, Unlock 3 Subtraction Upgrades."
                    return "Double Point gain, Unlock 3 Subtraction Upgrades."},
            },
        4: {
                requirementDescription: "5 Rational Points",
                unlocked() {return player.a.trees.gte(1)},
                done() {return player[this.layer].best.gte(5)},
                effectDescription() {return "Improve 3 Previous Milestones' first effect, Multiply Challenge Power gain by Rational Points."},
            },
        5: {
                requirementDescription: "6 Rational Points",
                unlocked() {return player.a.trees.gte(1)},
                done() {return player[this.layer].best.gte(6)},
                effect() {
                    return Decimal.pow(2, getBuyableAmount('add', 11).div(5).floor())},
                effectDescription() {return "Double Additional Boost's effect every 5 levels, Currently: "+format(this.effect())+"x"},
            },
        6: {
                requirementDescription: "7 Rational Points",
                unlocked() {return player.a.trees.gte(1)},
                done() {return player[this.layer].best.gte(7)},
                effect() {
                    return Decimal.pow(2, player.rat.best)},
                effectDescription() {return "Divide Rational's Cost by 2 per Rational Points, Currently: /"+format(this.effect())+""},
            },
        7: {
                requirementDescription: "8 Rational Points",
                unlocked() {return player.a.trees.gte(1)},
                done() {return player[this.layer].best.gte(8)},
                effect() {
                    return player.rat.best.max(1)},
                effectDescription() {return "Unlock a Multiplication Buyable, Multiply Addition gain by Rational Points."},
            },
        8: {
                requirementDescription: "9 Rational Points",
                unlocked() {return player.a.trees.gte(1)},
                done() {return player[this.layer].best.gte(9)},
                effectDescription() {return "Multiply Point gain by This tree's update."},
            },
        9: {
                requirementDescription: "10 Rational Points",
                unlocked() {return player.a.trees.gte(1)},
                done() {return player[this.layer].best.gte(10)},
                toggles: [["add", "AB"]],
                effectDescription() {return "Autobuy Addition Boost and it doesn't spend anything."},
            },
        10: {
                requirementDescription: "11 Rational Points",
                unlocked() {return player.a.trees.gte(2)},
                done() {return player[this.layer].best.gte(11)},
                effect() {
                    return player.rat.best.max(1)},
                effectDescription() {return "Multiply Addition and Plant point gain by Rational Points."},
            },
        11: {
                requirementDescription: "12 Rational Points",
                unlocked() {return player.a.trees.gte(2)},
                done() {return player[this.layer].best.gte(12)},
                effect() {
                    return player.rat.best.max(1)},
                tooltip() {return "250*2<sup>[(x+1)<sup>2</sup>-(x+1)]/2</sup> -> 250*2<sup>x<sup>1.5</sup></sup>"},
                effectDescription() {return "Divide Division's Cost by Rational, Change Rational's Cost Formula."},
            },
        12: {
                requirementDescription: "13 Rational Points",
                unlocked() {return player.a.trees.gte(2)},
                done() {return player[this.layer].best.gte(13)},
                tooltip() {return "Effect Formula: (x<sup>2</sup>/100)+1, This effect hardcapped at 30 Rational Points."},
                effect() {
                    return player.rat.best.max(0).min(30).pow(2).div(100).add(1)},
                effectDescription() {return "Raise 3rd Rational Milestone's Second Effect based on Rational Points, Currently: ^"+format(milestoneEffect('rat', 12))},
            },
        13: {
                requirementDescription: "14 Rational Points",
                unlocked() {return player.a.trees.gte(2)},
                done() {return player[this.layer].best.gte(14)},
                effect() {
                    return player.rat.best.max(1)},
                effectDescription() {return "Divide Plant cost by Rational."},
            },
        14: {
                requirementDescription: "15 Rational Points",
                unlocked() {return player.a.trees.gte(2)},
                done() {return player[this.layer].best.gte(15)},
                effect() {
                    return player.mul.points.max(1).log10().add(1)},
                effectDescription() {return "Multiply Multiplication gain based on Multiplication, Currently: "+format(milestoneEffect(this.layer, this.id))+"x"},
            },
        15: {
                requirementDescription: "16 Rational Points",
                unlocked() {return player.a.trees.gte(2)},
                done() {return player[this.layer].best.gte(16)},
                effect() {
                    return player.rat.best.max(1)},
                effectDescription() {return "Multiply Tier 1 gain by Rational."},
            },
        16: {
                requirementDescription: "17 Rational Points",
                unlocked() {return player.a.trees.gte(2)},
                done() {return player[this.layer].best.gte(17)},
                effect() {
                    return player.rat.best.max(1)},
                effectDescription() {return "Multiply Subtraction gain by Rational."},
            },
    },
    getResetGain() {
        if (player.add.points.lt(tmp.rat.getNextAt)) return D(0)
        return D(1)
    },
    getNextAt() {
        if (hasMilestone('rat', 11)) return D(250).times(D(2).pow(player.rat.points.pow(1.5)))
        return D(250).times(D(2).pow(player.rat.points.add(1).pow(2).sub(player.rat.points.add(1)).div(2))).times(tmp.rat.gainMult)
    },
    layerShown(){return player.add.version.gte(3)&&(player.universe.eq(0))},
    update(diff) {
    }
})

addLayer("expo", {
    name: "exponential", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: D(0),
        best: D(0),
    }},
    color: "#FF69B4",
    requires: D(20), // Can be a function that takes requirement increases into account
    resource: "exponential points", // Name of prestige currency
    baseResource: "rational and division points", // Name of resource prestige is based on
    baseAmount() {return player.rat.points.add(player.div.points)}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        return mult
    },
    roundUpCost() {return true},
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    branches: ["rat", "div"],
    row: 2, // Row the layer is in on the tree (0 is the first row)
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
                    "milestones"
            ]
        },
    },
    onPrestige() {
        player.rat.points = D(0)
        player.div.points = D(0)
        player.rat.best = D(0)
        player.div.best = D(0)
        player.rat.total = D(0)
        player.div.total = D(0)
    },
    effect() {
        return player.expo.points.max(0).pow(0.5).div(20).add(1)
    },
    effectDescription() {
        return ", translated to a ^" + format(tmp.expo.effect) + " boost to point gain."
    },
    doReset(l) {
        if (!(layers[l].row > this.row)) return
        
        let keep = ['milestones']
        if (player.universe.eq(0)){layerDataReset(this.layer, keep)}
    },
    hotkeys: [
        {key: "E", description: "E: Reset for Exponential Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.universe.eq(1)}, unlocked() {return player.universe.eq(0)}}
    ],
    layerShown(){return player.add.version.gte(6)&&(player.universe.eq(0))},
    getResetGain() {
        if (tmp.expo.baseAmount.lt(tmp.expo.getNextAt)) return D(0)
        return D(1)
    },
    getNextAt() {
        return D(20).add(player.expo.points.times(10))
    },
    update(diff) {
    }
})

addLayer("div", {
    name: "division", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: D(0),
        best: D(0),
    }},
    color: "#900090",
    requires: D(100), // Can be a function that takes requirement increases into account
    resource: "division points", // Name of prestige currency
    baseResource: "multiplication points", // Name of resource prestige is based on
    base: 3,
    exponent: 1.25,
    baseAmount() {return player.mul.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1).div(challengeEffect('III', 22))
        if (hasMilestone('div', 5)) mult = mult.div(milestoneEffect('div', 5))
        if (hasMilestone('rat', 11)) mult = mult.div(milestoneEffect('rat', 11))
        if (hasMilestone('rat', 13)) mult = mult.div(milestoneEffect('rat', 13))
        return mult
    },
    roundUpCost() {return true},
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    branches: ["sub", "mul"],
    row: 2, // Row the layer is in on the tree (0 is the first row)
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
                    "milestones"
            ]
        },
    },
    effect() {
        return player.div.points.max(0).pow(2).div(16).add(1).times(player.div.points.max(1))
    },
    effectDescription() {
        return ", translated to a " + format(tmp.div.effect) + "x boost to row 2 resources gain."
    },
    doReset(l) {
        if (!(layers[l].row > this.row)) return
        
        let keep = ['milestones']
        if (player.universe.eq(0)){layerDataReset(this.layer, keep)}
    },
    hotkeys: [
        {key: "d", description: "D: Reset for Division Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.universe.eq(1)}, unlocked() {return player.universe.eq(0)}}
    ],
    milestones: {
        0: {
            requirementDescription: "1 Division Point",
            effect() {return D(2).pow(player.div.best)},
            done() {return player[this.layer].best.gte(1)},
            effectDescription() {return "Divide Rational Cost by 2 per Division, Currently: /"+format(this.effect())},
            },
        1: {
                requirementDescription: "2 Division Points",
                done() {return player[this.layer].best.gte(2)},
                effectDescription() {return "Passively gain 50% of row 2 resources gain per second."},
            },
        2: {
                requirementDescription: "3 Division Points",
                effect() {return D(2).pow(player.div.best)},
                done() {return player[this.layer].best.gte(3)},
                effectDescription() {return "Double Point gain per Division, Currently: "+format(this.effect())+"x"},
            },
        3: {
                requirementDescription: "4 Division Points",
                effect() {return player.div.best.pow(1.5).max(1)},
                done() {return player[this.layer].best.gte(4)},
                effectDescription() {return "Multiply Addition gain by Division<sup>1.5</sup>, Currently: "+format(this.effect())+"x"},
            },
        4: {
                requirementDescription: "5 Division Points",
                effect() {return player.div.best.max(1)},
                done() {return player[this.layer].best.gte(5)},
                effectDescription() {return "Multiply Point gain by Division, Currently: "+format(this.effect())+"x"},
            },
        5: {
                requirementDescription: "6 Division Points",
                effect() {return player.div.best.max(1)},
                done() {return player[this.layer].best.gte(6)},
                effectDescription() {return "Divide Division Cost by Division, Currently: /"+format(this.effect())},
            },
        6: {
                requirementDescription: "7 Division Points",
                done() {return player[this.layer].best.gte(7)},
                effectDescription() {return "Keep Upgrades and Buyables in Previous Layers."},
            },
        7: {
                requirementDescription: "8 Division Points and Le Underrated Forest v1.2",
                effect() {return player.div.best.max(1)},
                unlocked() {return player.a.trees.gte(2)},
                done() {return player[this.layer].best.gte(8)&&player.a.trees.gte(2)},
                effectDescription() {return "Unlock 3 new Addition Upgrades, Multiply Plant Point gain by Division."},
            },
        8: {
                requirementDescription: "9 Division Points",
                unlocked() {return player.a.trees.gte(2)},
                effect() {return player.div.best.max(1)},
                done() {return player[this.layer].best.gte(9)},
                effectDescription() {return "Multiply Tier 2 gain by Division."},
            },
        9: {
                requirementDescription: "10 Division Points",
                unlocked() {return player.a.trees.gte(2)},
                effect() {return player.div.best.max(1)},
                done() {return player[this.layer].best.gte(10)},
                effectDescription() {return "Divide Plant Cost by Division."},
            },
        10: {
                requirementDescription: "11 Division Points",
                unlocked() {return player.a.trees.gte(2)},
                effect() {return player.div.best.max(1)},
                done() {return player[this.layer].best.gte(11)},
                effectDescription() {return "Multiply Plant Point gain by Division."},
            },
        11: {
                requirementDescription: "12 Division Points",
                unlocked() {return player.a.trees.gte(2)},
                effect() {return player.div.best.max(1)},
                done() {return player[this.layer].best.gte(12)},
                effectDescription() {return "Multiply Challenge Power gain by Division."},
            },
        12: {
                requirementDescription: "13 Division Points",
                unlocked() {return player.a.trees.gte(2)},
                effect() {return player.add.best.max(1).log10().add(1)},
                done() {return player[this.layer].best.gte(13)},
                effectDescription() {return "Multiply Addition gain based on Addition, Currently: "+format(milestoneEffect(this.layer, this.id))+"x"},
            },
        13: {
                requirementDescription: "14 Division Points",
                unlocked() {return player.a.trees.gte(2)},
                effect() {return player.div.best.max(1)},
                done() {return player[this.layer].best.gte(14)},
                effectDescription() {return "Multiply Addition effect by Division."},
            },
        14: {
                requirementDescription: "15 Division Points",
                unlocked() {return player.a.trees.gte(2)},
                effect() {return player.div.best.max(1)},
                done() {return player[this.layer].best.gte(15)},
                effectDescription() {return "Multiply Tier 1 gain by Division."},
            },
    },
    layerShown(){return player.add.version.gte(5)&&(player.universe.eq(0))},
    update(diff) {
    }
})
addLayer("I", {
    name: "Tier I", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: D(0),
        best: D(0),
        version: D(0),
    }},
    color: "#4BDC13",
    requires() {return D(1)}, // Can be a function that takes requirement increases into account
    resource: "Tier 1 Power", // Name of prestige currency
    baseResource: "Challenge Power", // Name of resource prestige is based on
    exponent: 1/3,
    baseAmount() {return player.chalpow}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        mult = mult.times(challengeEffect('II', 11))
        if (hasMilestone('rat', 15)) mult = mult.times(milestoneEffect('rat', 15))
        if (hasMilestone('div', 14)) mult = mult.times(milestoneEffect('div', 14))
        if (inChallenge('II', 22)) mult = D(0)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    onPrestige() {
        player.chalpow = D(0)
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
                    "blank",
                    "blank",
                    "milestones",
                    "challenges"
            ]
        },
    },
    doReset(l) {
        if (!(layers[l].row > this.row)) return
        
        let keep = ['milestones', 'challenges', 'version']
        if (player.universe.eq(1)){layerDataReset(this.layer, keep)}
    },
    hotkeys: [
        {key: "1", description: "1: Reset for Tier 1 Power", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.universe.eq(1)}},
        {key: "W", description: "", onPress(){
            doPopup(type = "none", text = "W", title = "Here's your", timer = 3, color = "#00ffff")
        }, unlocked() {return true}}
    ],
    effect() {
        return D(1).add(player.I.points.pow(0.4).div(20))
    },
    effectDescription() {
        return ", translated to a "+format(tmp.I.effect)+"x boost to point and challenge power gain"
    },
    ProveNerf() {return player.points.max(0).add(1).log10().add(1).pow(2)},
    passiveGeneration() {
        if (hasMilestone('II', 4)) return D(0.5)
        return 0
    },
    challenges: {
        11: {
            name: "Prove Yourself",
            unlocked() {return true},
            challengeDescription() {return "Point gain is divided based on Points, Currently: /"+format(tmp.I.ProveNerf)},
            goal() {return D(1e5)},
            goalDescription() {return "Reach "+formatWhole(this.goal())+" Points"},
            completionLimit() {return D(1)},
            rewardEffect() {return getChalPowGen()},
            rewardDescription() {return "Start Generate Challenge Power, Currently: +"+format(challengeEffect(this.layer, this.id))+"/s"},
            canComplete: function() {return player.points.gte(this.goal())},
        },
        12: {
            name: "Slow it down",
            onEnter() {player.chalpow = D(0)},
            unlocked() {return hasMilestone('I', 0)},
            challengeDescription() {return "Divide Challenge Power gain by 4."},
            goal() {return D(1)},
            goalDescription() {return "Reach "+formatWhole(this.goal())+" Challenge Power"},
            completionLimit() {return D(1)},
            rewardEffect() {
                let mult = D(1)
                if (hasChallenge('III', 11)) mult = mult.add(0.125)
                if (hasChallenge('III', 12)) mult = mult.add(0.125)
                if (hasChallenge('III', 21)) mult = mult.add(0.125)
                if (hasChallenge('III', 22)) mult = mult.add(0.125)
                return D(Object.values(player[this.layer].challenges).reduce((a,b) => a+b)).div(20).times(mult)},
            rewardDescription() {return "Increase Challenge Power gain base and Point gain exponent base by 0.05 per challenge, Currently: +"+format(challengeEffect(this.layer, this.id))},
            canComplete: function() {return player.chalpow.gte(this.goal())},
        },
        21: {
            name: "Be There",
            onEnter() {player.chalpow = D(0)},
            unlocked() {return hasMilestone('I', 1)},
            challengeDescription() {return "Square Challenge Power gain if it's below 1, else Square Root it."},
            goal() {return D(1)},
            goalDescription() {return "Reach "+formatWhole(this.goal())+" Challenge Power"},
            completionLimit() {return D(1)},
            rewardEffect() {return player.chalpow.max(0).add(1).ln().add(1)},
            rewardDescription() {return "Multiply Point gain based on Challenge Power, Currently: "+format(challengeEffect(this.layer, this.id))+"x"},
            canComplete: function() {return player.chalpow.gte(this.goal())},
        },
        22: {
            name: "Or Be Square",
            countsAs: [12, 21],
            onEnter() {player.chalpow = D(0)},
            unlocked() {return hasMilestone('I', 2)},
            challengeDescription() {return "Apply <b>Slow it down</b> and <b>Be There</b>'s nerfs in that order."},
            goal() {return D(0.1)},
            goalDescription() {return "Reach "+formatWhole(this.goal())+" Challenge Power"},
            completionLimit() {return D(1)},
            rewardEffect() {
                let enable = D(1)
                if (inChallenge('II', 11)) enable = D(0)
                return player.chalpow.max(0).add(1).log10().pow(0.4).add(1).pow(enable)},
            rewardDescription() {return "Multiply Challenge Power gain based on Challenge Power, Currently: "+format(challengeEffect(this.layer, this.id))+"x"},
            canComplete: function() {return player.chalpow.gte(this.goal())},
        },
    },
    milestones: {
        0: {
            requirementDescription: "1 Tier 1 Power",
            done() {return player[this.layer].best.gte(1)},
            effectDescription() {return "Unlock <b>Slow it down</b>."},
            },
        1: {
                requirementDescription: "3 Tier 1 Power",
                done() {return player[this.layer].best.gte(3)},
                effectDescription() {return "Unlock <b>Be There</b>."},
            },
        2: {
                requirementDescription: "6 Tier 1 Power",
                done() {return player[this.layer].best.gte(6)},
                effectDescription() {return "Unlock <b>Or Be Square</b>."},
            },
    },
    versionList() {
        return ["v0.0", "v0.1", "v0.2", "v0.3", "v0.4", "v0.5"]
    },
    layerShown(){return player.universe.eq(1)},
    update(diff) {
        player.chalpow = player.chalpow.add(getChalPowGen().times(diff))
    }
})
addLayer("II", {
    name: "Tier 2", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "II", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: D(0),
        best: D(0),
    }},
    color: "#FF7F00",
    requires() {return D(10)}, // Can be a function that takes requirement increases into account
    resource: "Tier 2 Power", // Name of prestige currency
    baseResource: "Tier 1 Power", // Name of resource prestige is based on
    exponent: 1/3,
    baseAmount() {return player.I.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        mult = mult.times(tmp.III.effect)
        mult = mult.times(challengeEffect('III', 12))
        if (hasMilestone('div', 8)) mult = mult.times(milestoneEffect('div', 8))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    onPrestige() {
        player.chalpow = D(0)
    },
    branches: ["I"],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    passiveGeneration() {
        if (hasMilestone('III', 0)) return D(0.5)
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
                    "milestones",
                    "challenges"
            ]
        },
    },
    doReset(l) {
        if (!(layers[l].row > this.row)) return
        
        let keep = ['milestones', 'challenges']
        if (player.universe.eq(1)){layerDataReset(this.layer, keep)}
    },
    hotkeys: [
        {key: "2", description: "2: Reset for Tier 2 Power", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.universe.eq(1)}}
    ],
    effect() {
        return D(1).add(player.II.points.pow(0.5).div(20))
    },
    effectDescription() {
        return ", translated to a "+format(tmp.II.effect)+"x boost to point and challenge power gain"
    },
    BQII() {return player.chalpow.max(0).add(1).log10().add(1).pow(2)},
    challenges: {
        11: {
            name: "By Yourself",
            onEnter() {player.chalpow = D(0)},
            unlocked() {return hasMilestone('II', 0)},
            challengeDescription() {return "Or Be Square's reward is disabled.<br>Completions: "+formatWhole(challengeCompletions('II', 11))+"/10"},
            goal() {return D(D(challengeCompletions('II', 11)).sub(1).max(0).div(10).add(2)).pow(D(challengeCompletions('II', 11)).max(0))},
            goalDescription() {return "Reach "+format(this.goal())+" Challenge Power"},
            completionLimit() {return D(10)},
            rewardEffect() {return D(challengeCompletions('II', 11)).pow(2).div(5).add(1).pow(challengeEffect('II', 22))},
            rewardDescription() {return "Multiply tier 1 and challenge power gain based on this challenge's completions, Currently: "+format(challengeEffect(this.layer, this.id))+"x"},
            canComplete: function() {return player.chalpow.gte(this.goal())},
        },
        12: {
            name: "Less Point",
            onEnter() {player.chalpow = D(0)},
            unlocked() {return hasMilestone('II', 1)},
            challengeDescription() {return "Square root Point and Challenge Power gain<br>Completions: "+formatWhole(challengeCompletions('II', 12))+"/10"},
            goal() {return D(D(challengeCompletions('II', 12)).sub(1).max(0).div(10).add(2)).pow(D(challengeCompletions('II', 12)).max(0))},
            goalDescription() {return "Reach "+format(this.goal())+" Challenge Power"},
            completionLimit() {return D(10)},
            rewardEffect() {return player.points.max(0).add(1).log10().add(1).pow(D(challengeCompletions('II', 12)).max(1).div(20)).pow(challengeEffect('II', 22))},
            rewardDescription() {return "Multiply challenge power gain based on points and this challenge's completions, Currently: "+format(challengeEffect(this.layer, this.id))+"x"},
            canComplete: function() {return player.chalpow.gte(this.goal())},
        },
        21: {
            name: "Slow Again",
            onEnter() {player.chalpow = D(0)
            },
            unlocked() {return hasMilestone('II', 2)},
            challengeDescription() {return "Divide Challenge Power gain based on Challenge Power<br>Currently: /"+format(tmp.II.BQII)+"<br>Completions: "+formatWhole(challengeCompletions('II', 21))+"/10"},
            goal() {return D(D(challengeCompletions('II', 21)).sub(1).max(0).div(10).add(2)).pow(D(challengeCompletions('II', 21)).max(0))},
            goalDescription() {return "Reach "+format(this.goal())+" Challenge Power"},
            completionLimit() {return D(10)},
            rewardEffect() {return D(challengeCompletions('II', 21)).pow(2).div(10).add(1).pow(challengeEffect('II', 22))},
            rewardDescription() {return "Multiply addition gain based on this challenge's completions, Currently: "+format(challengeEffect(this.layer, this.id))+"x"},
            canComplete: function() {return player.chalpow.gte(this.goal())},
        },
        22: {
            name: "To Be Number 2",
            countsAs: [11, 12, 21],
            onEnter() {player.chalpow = D(0)
            },
            unlocked() {return hasMilestone('II', 3)},
            challengeDescription() {return "You can't gain tier 1 power, Apply 3 Previous Challenges at once.<br>Completions: "+formatWhole(challengeCompletions('II', 22))+"/10"},
            goal() {return D(D(challengeCompletions('II', 22)).sub(1).max(0).div(10).add(2)).pow(D(challengeCompletions('II', 22)).max(0))},
            goalDescription() {return "Reach "+format(this.goal())+" Challenge Power"},
            completionLimit() {return D(10)},
            rewardEffect() {return D(challengeCompletions('II', 22)).div(50).add(1)},
            rewardDescription() {return "Raise All Previous Tier 2 Challenge Reward based on this challenge's completions, Currently: ^"+format(challengeEffect(this.layer, this.id))},
            canComplete: function() {return player.chalpow.gte(this.goal())},
        },
    },
    milestones: {
        0: {
            requirementDescription: "1 Tier 2 Power",
            done() {return player[this.layer].best.gte(1)},
            effectDescription() {return "Unlock <b>By Yourself</b>."},
            },
        1: {
                requirementDescription: "5 By Yourself Completions",
                done() {return D(challengeCompletions('II', 11)).gte(5)},
                effectDescription() {return "Unlock <b>Less Point</b>."},
            },
        2: {
                requirementDescription: "5 Less Point Completions",
                done() {return D(challengeCompletions('II', 12)).gte(5)},
                effectDescription() {return "Unlock <b>Slow Again</b>."},
            },
        3: {
                requirementDescription: "5 Slow Again Completions",
                done() {return D(challengeCompletions('II', 21)).gte(5)},
                effectDescription() {return "Unlock <b>To Be Number 2</b>."},
            },
        4: {
                requirementDescription: "5 To Be Number 2 Completions",
                done() {return D(challengeCompletions('II', 22)).gte(5)},
                effectDescription() {return "Gain 50% of Tier 1 gain per second."},
            },
    },
    layerShown(){return player.universe.eq(1)&&player.I.version.gte(1)},
    update(diff) {
    }
})
addLayer("III", {
    name: "Tier 3", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "III", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: D(0),
        best: D(0),
        ft: D(0),
        t: D(0),
        a: D(0),
        b: D(0),
        c: D(0),
        dt: D(0),
        diff: D(0),
    }},
    color: "#0099FF",
    requires() {return D(100)}, // Can be a function that takes requirement increases into account
    resource: "Tier 3 Power", // Name of prestige currency
    baseResource: "Tier 2 Power", // Name of resource prestige is based on
    base: 2,
    exponent: 1.25,
    baseAmount() {return player.II.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        if (hasMilestone('III', 5)) mult = mult.div(40)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    onPrestige() {
        player.chalpow = D(0)
    },
    branches: ["II"],
    row: 2, // Row the layer is in on the tree (0 is the first row)
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
                    ["display-text",function() {if (hasMilestone('III', 0)) return "f("+makeBlue("t")+"+"+makeBlue("dt")+") = f("+makeBlue("t")+")+(gain)"+makeBlue("dt")}],
                    ["display-text",function() {if (hasMilestone('III', 0)) return "f("+makeBlue("t")+") gain = ["+ makeBlue("bc")+"]<sup>("+makeBlue("a")+"/5+1)*"+format(tmp.III.ftbasepow)+"</sup>"+((tmp.III.ftmult.lt(1)&&tmp.III.ftmult.gt(0)) ? "/"+format(D(1).div(tmp.III.ftmult)) : "*"+format(tmp.III.ftmult))+" = "+format(tmp.III.ftgain)+", "+makeBlue("dt")+" = "+format(player.III.diff)+((tmp.III.dtmult.lt(1)&&tmp.III.dtmult.gt(0)) ? "/"+format(D(1).div(tmp.III.dtmult)) : "*"+format(tmp.III.dtmult))+" = "+format(player.III.dt)+", f("+makeBlue("t")+") = "+format(player.III.ft)+", "+makeBlue("t")+" = "+format(player.III.t)}],
                    ["display-text",function() {if (hasMilestone('III', 0)) return "You can only generate f("+makeBlue("t")+") and "+makeBlue("t")+" when 0<"+makeBlue("a")+"+"+makeBlue("b")+"+"+makeBlue("c")+"≤ 2"+makeBlue("T<sub>3</sub>")+"+1 and "+makeBlue("bc")+">0, where "+makeBlue("T<sub>3</sub>")+" is Tier 3 Power"}],
                    ["display-text",function() {if (hasMilestone('III', 0)) return "Your f("+makeBlue("t")+") gives a "+format(tmp.III.fteff)+"x boost to Challenge Power gain."}],
                    "blank",
                    "blank",
                    ["row", [["clickable", 11], ["clickable", 12], ["clickable", 13], ["bar", 0], ["clickable", 14],]],
                    ["row", [["clickable", 21], ["clickable", 22], ["clickable", 23], ["bar", 1], ["clickable", 24],]],
                    ["row", [["clickable", 31], ["clickable", 32], ["clickable", 33], ["bar", 2], ["clickable", 34],]],
                    "blank",
                    "blank",
                    "milestones",
                    ["display-text",function() {if (inChallenge('III', 21)) return makeBlue("b")+"<sup>2</sup>-4"+makeBlue("ac")+"="+formatWhole(player.III.b.pow(2).sub(D(4).times(player.III.a).times(player.III.c)))}],
                    ["display-text",function() {if (inChallenge('III', 12)) return "2"+makeBlue("a")+"-"+makeBlue("b")+"-"+makeBlue("c")+"="+formatWhole(player.III.a.times(2).sub(player.III.b).sub(player.III.c))}],
                    "challenges",
                    "blank",
                    "blank",
                    ["display-text",function() {return "Hey that's not exactly how it works from my tree >:c<br> - 42UR3"}],
            ]
        },
    },
    doReset(l) {
        if (!(layers[l].row > this.row)) return
        
        let keep = ['milestones', 'challenges']
        if (player.universe.eq(1)){layerDataReset(this.layer, keep)}
    },
    hotkeys: [
        {key: "3", description: "3: Reset for Tier 3 Power", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.universe.eq(1)}}
    ],
    effect() {
        return player.III.best.max(0).add(5).pow(2).div(25).times(player.III.best.max(1))
    },
    effectDescription() {
        return ", translated to a "+format(tmp.III.effect)+"x boost to tier 2 gain"
    },
    ftvalue() {
        return player.III.b.max(0).times(player.III.c.max(0)).pow(player.III.a.max(0).div(5).add(1))
    },
    ftmult() {
        let base = D(1)
        if (inChallenge('III', 11)) base = base.div(D(challengeCompletions('III', 11)).add(2).pow(2))
        return base
    },
    ftbasepow() {
        if (inChallenge('III', 22)) return D(0.5)
        return D(1)
    },
    dtmult() {
        let base = D(1)
        base = base.times(challengeEffect('III', 11))
        return base
    },
    ftgain() {
        return tmp.III.ftvalue.pow(tmp.III.ftbasepow).times(tmp.III.ftmult)
    },
    fteff() {
        return player.III.ft.max(0).add(1).log2().add(1).pow(2)
    },
    challenges: {
        11: {
            name: "Simple Division",
            onEnter() {
                player.chalpow = D(0)
                player.III.t = D(0)
                player.III.ft = D(0)
            },
            unlocked() {return hasMilestone('III', 1)},
            challengeDescription() {return "Divide f("+makeBlue("t")+") gain by ([Completions]+2)<sup>2</sup> <br>Completions: "+formatWhole(challengeCompletions('III', 11))+"/10"},
            goal() {return D(D(challengeCompletions('III', 11)).sub(1).max(0).div(5).add(2)).pow(D(challengeCompletions('III', 11)).max(0)).times(5)},
            goalDescription() {return "Reach "+format(this.goal())+" f("+makeBlue("t")+")"},
            completionLimit() {return D(10)},
            rewardEffect() {return D(challengeCompletions('III', 11)).pow(2).times(player.III.ft.max(0).add(1).log2().add(1).div(100)).add(1)},
            rewardDescription() {return "Increase Slow it down's reward by +12.5%, Multiply "+makeBlue("dt")+" based on f("+makeBlue("t")+") and this challenge's completions, Currently: "+format(challengeEffect(this.layer, this.id))+"x"},
            canComplete: function() {return player.III.ft.gte(this.goal())},
        },
        12: {
            name: "Simpler Subtraction",
            onEnter() {
                player.chalpow = D(0)
                player.III.t = D(0)
                player.III.ft = D(0)
            },
            unlocked() {return hasMilestone('III', 2)},
            challengeDescription() {return "You may generate f("+makeBlue("t")+") when 2"+makeBlue("a")+"-"+makeBlue("b")+"-"+makeBlue("c")+"≥0<br>Completions: "+formatWhole(challengeCompletions('III', 12))+"/10"},
            goal() {return D(D(challengeCompletions('III', 12)).sub(1).max(0).div(5).add(2)).pow(D(challengeCompletions('III', 12)).max(0)).times(5)},
            goalDescription() {return "Reach "+format(this.goal())+" f("+makeBlue("t")+")"},
            completionLimit() {return D(10)},
            rewardEffect() {return Decimal.pow(player.III.ft.max(0).add(1).log10().add(1), D(challengeCompletions('III', 12)).div(5))},
            rewardDescription() {return "Increase Slow it down's reward by +12.5%, Multiply Tier 2 gain based on f("+makeBlue("t")+") and this challenge's completions, Currently: "+format(challengeEffect(this.layer, this.id))+"x"},
            canComplete: function() {return player.III.ft.gte(this.goal())},
        },
        21: {
            name: "Quadratic Reference",
            onEnter() {
                player.chalpow = D(0)
                player.III.t = D(0)
                player.III.ft = D(0)
            },
            unlocked() {return hasMilestone('III', 3)},
            challengeDescription() {return "You may generate f("+makeBlue("t")+") when "+makeBlue("b")+"<sup>2</sup>-4"+makeBlue("ac")+"≥0<br>Completions: "+formatWhole(challengeCompletions('III', 21))+"/10"},
            goal() {return D(D(challengeCompletions('III', 21)).sub(1).max(0).div(5).add(2)).pow(D(challengeCompletions('III', 21)).max(0)).times(5)},
            goalDescription() {return "Reach "+format(this.goal())+" f("+makeBlue("t")+")"},
            completionLimit() {return D(10)},
            rewardEffect() {return Decimal.pow(player.III.ft.max(0).add(1).log10().add(1), D(challengeCompletions('III', 21)).div(4))},
            rewardDescription() {return "Increase Slow it down's reward by +12.5%, Multiply Addition gain based on f("+makeBlue("t")+") and this challenge's completions, Currently: "+format(challengeEffect(this.layer, this.id))+"x"},
            canComplete: function() {return player.III.ft.gte(this.goal())},
        },
        22: {
            name: "Exponential",
            onEnter() {
                player.chalpow = D(0)
                player.III.t = D(0)
                player.III.ft = D(0)
            },
            unlocked() {return hasMilestone('III', 4)},
            challengeDescription() {return "Square root f("+makeBlue("t")+") gain<br>Completions: "+formatWhole(challengeCompletions('III', 22))+"/10"},
            goal() {return D(D(challengeCompletions('III', 22)).sub(1).max(0).div(5).add(2)).pow(D(challengeCompletions('III', 22)).max(0)).times(5)},
            goalDescription() {return "Reach "+format(this.goal())+" f("+makeBlue("t")+")"},
            completionLimit() {return D(10)},
            rewardEffect() {return Decimal.pow(3, challengeCompletions('III', 22).pow(0.5))},
            rewardDescription() {return "Increase Slow it down's reward by +12.5%, Divide Division's Cost based on this challenge's completions, Currently: /"+format(challengeEffect(this.layer, this.id))},
            canComplete: function() {return player.III.ft.gte(this.goal())},
        },
    },
    chalReq() {
        if (inChallenge('III', 21)) return player.III.b.pow(2).sub(D(4).times(player.III.a).times(player.III.c)).gte(0)
        if (inChallenge('III', 12)) return player.III.a.times(2).sub(player.III.b).sub(player.III.c).gte(0)
        return true
    },
    milestones: {
        0: {
            requirementDescription: "1 Tier 3 Power",
            done() {return player[this.layer].best.gte(1)},
            effectDescription() {return "Unlock <b>f("+makeBlue("t")+")</b> and Generate 50% of Tier 2 Power."},
            },
        1: {
                requirementDescription: "2 Tier 3 Power",
                done() {return player[this.layer].best.gte(2)},
                effectDescription() {return "Unlock Simple Division."},
            },
        2: {
                requirementDescription: "3 Tier 3 Power",
                done() {return player[this.layer].best.gte(3)},
                effectDescription() {return "Unlock Simpler Subtraction."},
            },
        3: {
                requirementDescription: "4 Tier 3 Power",
                done() {return player[this.layer].best.gte(4)},
                effectDescription() {return "Unlock Quadratic Reference."},
            },
        4: {
                requirementDescription: "5 Tier 3 Power",
                done() {return player[this.layer].best.gte(5)},
                effectDescription() {return "Unlock Exponential."},
            },
        5: {
                requirementDescription: "40 Tier 3 Challenge Completions",
                done() {return D(Object.values(player.III.challenges).reduce((a,b) => a+b)).gte(40)},
                effectDescription() {return "Divide Tier 3 Power Cost by 40."},
            },
        6: {
                requirementDescription: "15 Tier 3 Power",
                unlocked() {return player.a.trees.gte(2)},
                done() {return player[this.layer].best.gte(15)&&player.a.trees.gte(2)},
                effectDescription() {return "Divide Plant cost by [Tier 3]+1."},
            },
    },
    allowvar() {
        return player.III.best.max(0).times(2).add(1)
    },
    varlim() {
        return D(10)
    },
    varsum() {
        return player.III.a.add(player.III.b).add(player.III.c)
    },
    bars: {
        0: {
            direction: RIGHT,
            width: 250,
            height: 50,
            progress() {return player.III.a.div(tmp.III.varlim.max(1))},
            display() {return makeBlue("a")+": "+format(player.III.a)+"/"+format(tmp.III.varlim)},
            instant: false,
            unlocked() {return hasMilestone('III', 0)},
            fillStyle: {'background-color' : "#FF0000"},
            baseStyle: {'background-color' : "#000000"},
        },
        1: {
            direction: RIGHT,
            width: 250,
            height: 50,
            progress() {return player.III.b.div(tmp.III.varlim.max(1))},
            display() {return makeBlue("b")+": "+format(player.III.b)+"/"+format(tmp.III.varlim)},
            instant: false,
            unlocked() {return hasMilestone('III', 0)},
            fillStyle: {'background-color' : "#00FF00"},
            baseStyle: {'background-color' : "#000000"},
        },
        2: {
            direction: RIGHT,
            width: 250,
            height: 50,
            progress() {return player.III.c.div(tmp.III.varlim.max(1))},
            display() {return makeBlue("c")+": "+format(player.III.c)+"/"+format(tmp.III.varlim)},
            instant: false,
            unlocked() {return hasMilestone('III', 0)},
            fillStyle: {'background-color' : "#00FFFF"},
            baseStyle: {'background-color' : "#000000"},
        },
    },
    clickables: {
        11: {
            display() {
                return "<h1><b>1</b></h1>"
            },
            unlocked() {return hasMilestone('III', 0)},
            canClick() {
                return player[this.layer].a.gt(1)
            },
            onClick(){
                player[this.layer].a = D(1)
            },
            style: {
                "width": "80px",
                "height": "5px"
            }
        },
        12: {
            display() {
                return "<h1><b>HALF</b></h1>"
            },
            unlocked() {return hasMilestone('III', 0)},
            canClick() {
                return player[this.layer].a.gt(1)
            },
            onClick(){
                player[this.layer].a = player[this.layer].a.div(2).floor()
            },
            style: {
                "width": "80px",
                "height": "5px"
            }
        },
        13: {
            display() {
                return "<h1><b>-</b></h1>"
            },
            unlocked() {return hasMilestone('III', 0)},
            canClick() {
                return player.III.a.gte(1)
            },
            onClick(){
                player[this.layer].a = player[this.layer].a.sub(1)
            },
            style: {
                "width": "80px",
                "height": "5px"
            }
        },
        14: {
            display() {
                return "<h1><b>+</b></h1>"
            },
            unlocked() {return hasMilestone('III', 0)},
            canClick() {
                return tmp.III.varsum.lt(tmp.III.allowvar)&&(player.III.a.lt(tmp.III.varlim))
            },
            onClick(){
                player[this.layer].a = player[this.layer].a.add(1)
            },
            style: {
                "width": "80px",
                "height": "5px"
            }
        },
        21: {
            display() {
                return "<h1><b>1</b></h1>"
            },
            unlocked() {return hasMilestone('III', 0)},
            canClick() {
                return player[this.layer].b.gt(1)
            },
            onClick(){
                player[this.layer].b = D(1)
            },
            style: {
                "width": "80px",
                "height": "5px"
            }
        },
        22: {
            display() {
                return "<h1><b>HALF</b></h1>"
            },
            unlocked() {return hasMilestone('III', 0)},
            canClick() {
                return player[this.layer].b.gt(1)
            },
            onClick(){
                player[this.layer].b = player[this.layer].b.div(2).floor()
            },
            style: {
                "width": "80px",
                "height": "5px"
            }
        },
        23: {
            display() {
                return "<h1><b>-</b></h1>"
            },
            unlocked() {return hasMilestone('III', 0)},
            canClick() {
                return player.III.b.gte(1)
            },
            onClick(){
                player[this.layer].b = player[this.layer].b.sub(1)
            },
            style: {
                "width": "80px",
                "height": "5px"
            }
        },
        24: {
            display() {
                return "<h1><b>+</b></h1>"
            },
            unlocked() {return hasMilestone('III', 0)},
            canClick() {
                return tmp.III.varsum.lt(tmp.III.allowvar)&&(player.III.b.lt(tmp.III.varlim))
            },
            onClick(){
                player[this.layer].b = player[this.layer].b.add(1)
            },
            style: {
                "width": "80px",
                "height": "5px"
            }
        },
        31: {
            display() {
                return "<h1><b>1</b></h1>"
            },
            unlocked() {return hasMilestone('III', 0)},
            canClick() {
                return player[this.layer].c.gt(1)
            },
            onClick(){
                player[this.layer].c = D(1)
            },
            style: {
                "width": "80px",
                "height": "5px"
            }
        },
        32: {
            display() {
                return "<h1><b>HALF</b></h1>"
            },
            unlocked() {return hasMilestone('III', 0)},
            canClick() {
                return player[this.layer].c.gt(1)
            },
            onClick(){
                player[this.layer].c = player[this.layer].c.div(2).floor()
            },
            style: {
                "width": "80px",
                "height": "5px"
            }
        },
        33: {
            display() {
                return "<h1><b>-</b></h1>"
            },
            unlocked() {return hasMilestone('III', 0)},
            canClick() {
                return player.III.c.gte(1)
            },
            onClick(){
                player[this.layer].c = player[this.layer].c.sub(1)
            },
            style: {
                "width": "80px",
                "height": "5px"
            }
        },
        34: {
            display() {
                return "<h1><b>+</b></h1>"
            },
            unlocked() {return hasMilestone('III', 0)},
            canClick() {
                return tmp.III.varsum.lt(tmp.III.allowvar)&&(player.III.c.lt(tmp.III.varlim))
            },
            onClick(){
                player[this.layer].c = player[this.layer].c.add(1)
            },
            style: {
                "width": "80px",
                "height": "5px"
            }
        },
    },
    layerShown(){return player.universe.eq(1)&&player.I.version.gte(2)},
    update(diff) {
        player.III.diff = D(diff)
        player.III.dt = D(diff).times(tmp.III.dtmult)
        if(tmp.III.varsum.gte(1)&&(player.III.b.times(player.III.c).gt(0))&&(tmp.III.chalReq)) {
            player.III.t = player.III.t.add(player.III.dt)
            player.III.ft = player.III.ft.add(tmp.III.ftgain.times(player.III.dt))
        }
    }
})
addLayer("pla", {
    name: "plant", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: D(0),
        best: D(0),
        version: D(0),
    }},
    color: "#27B000",
    requires: D(1), // Can be a function that takes requirement increases into account
    resource: "plants", // Name of prestige currency
    baseResource: "plant points", // Name of resource prestige is based on
    exponent: D(1.25),
    base() {
        let base = D(2)
        if (hasUpgrade('pla', 43)) base = base.sub(0.05)
        base = base.sub(buyableEffect('pla', 13))
        return base
    },
    baseAmount() {return player.planpts}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        if (hasUpgrade('pla', 13)) mult = mult.div(upgradeEffect('pla', 13))
        if (hasUpgrade('pla', 21)) mult = mult.div(upgradeEffect('pla', 21))
        if (hasUpgrade('pla', 22)) mult = mult.div(upgradeEffect('pla', 22))
        if (hasUpgrade('pla', 23)) mult = mult.div(upgradeEffect('pla', 23))
        if (hasUpgrade('pla', 25)) mult = mult.div(upgradeEffect('pla', 25))
        if (hasUpgrade('pla', 34)) mult = mult.div(upgradeEffect('pla', 34))
        if (hasUpgrade('pla', 41)) mult = mult.div(upgradeEffect('pla', 41))
        if (hasUpgrade('pla', 45)) mult = mult.div(upgradeEffect('pla', 45))
        if (hasMilestone('rat', 13)) mult = mult.div(milestoneEffect('rat', 13))
        if (hasMilestone('III', 6)) mult = mult.div(player.III.points.max(0).add(1))
        if (hasMilestone('div', 9)) mult = mult.div(milestoneEffect('div', 9))
        if (hasUpgrade('gar', 13)) mult = mult.div(upgradeEffect('gar', 13))
        if (hasUpgrade('gar', 14)) mult = mult.div(upgradeEffect('gar', 14))
        if (hasUpgrade('gar', 23)) mult = mult.div(upgradeEffect('gar', 23))
        if (inChallenge('zon', 12)) mult = mult.times(getBuyableAmount('pla', 11).add(1))
        mult = mult.div(buyableEffect('pla', 11).C)
        mult = mult.div(buyableEffect('pla', 12))
        return mult
    },
    autoPrestige() {return hasMilestone('gar', 1)},
    resetsNothing() {return hasMilestone('gar', 1)},
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    onPrestige() {
        if (!tmp.pla.resetsNothing) {player.planpts = D(0)}
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
                    "milestones",
                    "blank",
                    ["display-text",function() {if (hasUpgrade('pla', 14)) return "You have "+format(tmp.pla.PPmag)+" Magnitude, Next at "+format(tmp.pla.PPmagNext)+" Plant points."}],
                    ["display-text",function() {if (hasUpgrade('gar', 14)) return "You have "+format(tmp.pla.Pmag)+" Plant magnitude, Next at "+format(tmp.pla.PmagNext)+" plants."}],
                    "blank",
                    "buyables",
                    "upgrades"
            ]
        },
    },
    canBuyMax() {return hasUpgrade('pla', 13)||player.gar.unlocked},
    effect() {
        return D(1).add(player.pla.points.max(0).div(5)).pow(2)
    },
    effectDescription() {
        return ", translated to a " + format(tmp.pla.effect) + "x boost to point gain."
    },
    doReset(l) {
        if (!(layers[l].row > this.row)) return
        
        let keep = ['milestones', 'version']
        if (hasMilestone('gar', 1)) keep.push('upgrades')
        if (player.universe.eq(2)){layerDataReset(this.layer, keep)}
    },
    hotkeys: [
        {key: "p", description: "P: Reset for Plants", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.universe.eq(2)}}
    ],
    buyables: {
        11: {
            title() {return "Prickly Pear"},
            display() {
                return "Multiply plant point gain by "+format(tmp.pla.PPEbase.add(tmp.pla.buyables[11].addP))+" and Divide plant cost by "+format(tmp.pla.PPEbase)+" per level<br>Cost: "+format(this.cost())+" Plants<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect().P)+"x, /"+format(this.effect().C)
            },
            addP() {
                let addP = D(0)
                if (hasUpgrade('pla', 54)) addP = addP.add(1)
                return addP
            },
            effect(x) {
                let base = D(0)
                if (hasUpgrade('pla', 64)) base = base.add(upgradeEffect('pla', 64))
                return {
                P:tmp.pla.PPEbase.add(tmp.pla.buyables[11].addP).pow(x.add(base)),
                C:tmp.pla.PPEbase.pow(x.add(base))}},
            unlocked() {return hasUpgrade('gar', 12)},
            tooltip() {return "Cost Formula: 5*2<sup>x</sup>"},
            cost(x) {let base = D(2).pow(x).times(5)
                if (hasUpgrade('gar', 14)) base = base.div(upgradeEffect('gar', 14))
                if (hasUpgrade('pla', 44)) base = base.div(upgradeEffect('pla', 44).P)
                if (hasUpgrade('pla', 52)) base = base.div(upgradeEffect('pla', 52))
                if (hasUpgrade('pla', 62)) base = base.div(upgradeEffect('pla', 62))
                return base.floor()
            },
            buy() {
                let cost = D(1)
                if (hasMilestone('zon', 2)) cost = D(0)
                player.pla.points = player.pla.points.sub(this.cost().mul(cost)).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.pla.points.gte(this.cost())
            },
        },
        12: {
            title() {return "Saguaro"},
            display() {
                return "Divide plant cost by 10 per level<br>Cost: "+format(this.cost())+" Plant points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: /"+format(this.effect())
            },
            effect(x) {
                let base = D(0)
                if (hasUpgrade('pla', 61)) base = base.add(upgradeEffect('pla', 61))
                if (hasUpgrade('pla', 64)) base = base.add(upgradeEffect('pla', 64))
                return D(10).pow(x.add(base))},
            unlocked() {return hasUpgrade('gar', 21)},
            tooltip() {return "Cost Formula: 100<sup>x<sup>1.25</sup></sup>"},
            cost(x) {
                let base = D(100).pow(x.pow(1.25))
                if (hasUpgrade('pla', 44)) base = base.div(upgradeEffect('pla', 44).P)
                return base.floor()
            },
            buy() {
                let cost = D(1)
                if (hasMilestone('zon', 2)) cost = D(0)
                player.planpts = player.planpts.sub(this.cost().mul(cost)).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.planpts.gte(this.cost())
            },
        },
        13: {
            title() {return "Echinocactus"},
            display() {
                return "Reduce Plant cost base by 0.005 per level<br>Cost: "+format(this.cost())+" Plants<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"/10<br>Effect: -"+format(this.effect())
            },
            purchaseLimit() {return D(10)},
            effect(x) {return x.min(10).div(200)},
            unlocked() {return hasUpgrade('pla', 63)},
            tooltip() {return "Cost Formula: 10*(x+1)*(x+2)"},
            cost(x) {let base = (x.add(1).times(x.add(2))).times(10)
                return base.floor()
            },
            buy() {
                let cost = D(1)
                if (hasMilestone('zon', 2)) cost = D(0)
                player.pla.points = player.pla.points.sub(this.cost().mul(cost)).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.pla.points.gte(this.cost())
            },
        },
    },
    upgrades: {
        11: {
            title() {return "Sedum"},
            description() {
                return "Raise the first plant milestone effect to the 2nd power."},
            effect() {
                let addbase = D(0)
                if (hasUpgrade('pla', 55)) addbase = addbase.add(1)
                return D(2).add(addbase)},
            cost() {return D(3)},
            effectDisplay() {return "^"+format(upgradeEffect(this.layer, this.id))},
        },
        12: {
            title() {return "Bear-Paw Succulent"},
            tooltip() {return "Effect Formula: log<sub>10</sub>([Plant points]+1)+2"},
            description() {
                return "Multiply plant point gain based on plant points."},
            effect() {return player.planpts.max(0).add(1).log10().add(2)},
            cost() {return D(5)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        13: {
            title() {return "Jade Plant"},
            description() {
                return "You can buy max plants, Divide Plant cost by [Plants]+1."},
            effect() {return player.pla.points.max(0).add(1)},
            cost() {return D(8)},
            effectDisplay() {return "/"+format(upgradeEffect(this.layer, this.id))},
        },
        14: {
            title() {return "Snake Plant"},
            description() {
                return "Multiply Plant Point gain by 1.4 per magnitude."},
            effect() {
                return Decimal.pow(1.4, tmp.pla.PPmag.max(0))},
            cost() {return D(10)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        15: {
            title() {return "Upgrade Fertilizer"},
            description() {
                return "Multiply Plant Point gain by 1.4 per upgrade."},
            effect() {return Decimal.pow(1.4, player.pla.upgrades.length)},
            cost() {return D(12)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        21: {
            title() {return "Philodendron"},
            tooltip() {return "Effect Formula: log<sub>10</sub>([Plant points]+10)"},
            description() {
                return "Divide Plant Cost based on Plant points."},
            effect() {return player.planpts.max(0).add(10).log10()},
            cost() {return D(14)},
            effectDisplay() {return "/"+format(upgradeEffect(this.layer, this.id))},
        },
        22: {
            title() {return "Anthurium"},
            description() {
                return "Divide Plant Cost by 1.4 per magnitude."},
            effect() {return Decimal.pow(1.4, tmp.pla.PPmag.max(0))},
            cost() {return D(17)},
            effectDisplay() {return "/"+format(upgradeEffect(this.layer, this.id))},
        },
        23: {
            title() {return "Yucca"},
            tooltip() {return "Effect Formula: [1+([Plants]/4)]<sup>2</sup>"},
            description() {
                return "Divide Plant Cost based on Plants."},
            effect() {return D(1).add(player.pla.points.div(4)).pow(2)},
            cost() {return D(19)},
            effectDisplay() {return "/"+format(upgradeEffect(this.layer, this.id))},
        },
        24: {
            title() {return "Coconut Palm"},
            description() {
                return "Multiply Plant point gain by [upgrade]+1."},
            effect() {return D(1).add(player.pla.upgrades.length)},
            cost() {return D(21)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        25: {
            title() {return "Watering Can"},
            description() {
                return "Divide Plant cost by 1.4 per upgrade."},
            effect() {return Decimal.pow(1.4, player.pla.upgrades.length)},
            cost() {return D(24)},
            effectDisplay() {return "/"+format(upgradeEffect(this.layer, this.id))},
        },
        31: {
            title() {return "Mint"},
            tooltip() {return "Effect Formula: ([Plants]/5)<sup>2</sup>+1"},
            unlocked() {return hasMilestone('gar', 2)},
            description() {
                return "Multiply Point and Plant point gain based on Plants."},
            effect() {return player.pla.points.max(0).div(5).pow(2).add(1)},
            cost() {return D(69)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        32: {
            title() {return "Parsley"},
            unlocked() {return hasMilestone('gar', 2)},
            description() {
                return "Reduce Plant point Magnitude requirement base by 2, Multiply Plant point gain by 5.5 per this tree's update."},
            effect() {return D(5.5).pow(player.pla.version)},
            cost() {return D(77)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        33: {
            title() {return "Rosemary"},
            tooltip() {return "Effect Formula: [log<sub>10</sub>([Plant points]+1)+1]<sup>0.1</sup>"},
            unlocked() {return hasMilestone('gar', 2)},
            description() {
                return "Divide Garden cost based on plant points"},
            effect() {return player.planpts.max(1).log10().max(1).pow(0.1)},
            cost() {return D(81)},
            effectDisplay() {return "/"+format(upgradeEffect(this.layer, this.id))},
        },
        34: {
            title() {return "Chives"},
            unlocked() {return hasMilestone('gar', 2)},
            description() {
                return "Reduce Plant Magnitude requirement base by 2, Divide Plant Cost by 5.5 per this tree's update."},
            effect() {return D(5.5).pow(player.pla.version)},
            cost() {return D(84)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        35: {
            title() {return "Thyme"},
            tooltip() {return "Effect Formula: log<sub>10</sub>([Plant point gain]+10)"},
            unlocked() {return hasMilestone('gar', 2)},
            description() {
                return "Multiply Plant point gain based on Plant point gain, Unlock Zones."},
            effect() {return getPlaPtsGen().max(0).add(10).log10()},
            cost() {return D(88)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        41: {
            title() {return "Date Palm"},
            tooltip() {return "Effect Formula: log<sub>10</sub>([Plant points]+10)*([Plants]+1)"},
            unlocked() {return challengeCompletions('zon', 11).gte(1)},
            description() {
                return "Divide Plant cost based on plant points and plants."},
            effect() {return player.pla.points.max(0).add(1).times(player.planpts.max(0).add(10).log10())},
            cost() {return D(93)},
            effectDisplay() {return "/"+format(upgradeEffect(this.layer, this.id))},
        },
        42: {
            title() {return "Acai Palm"},
            tooltip() {return "Effect Formula: ([Completions]*2+1)<sup>[Zones]*2+1</sup>"},
            unlocked() {return challengeCompletions('zon', 11).gte(1)},
            description() {
                return "Multiply Plant point gain based on zones and The Tropical Zone completions."},
            effect() {return challengeCompletions('zon', 11).times(2).add(1).pow(player.zon.points.max(0).times(2).add(1))},
            cost() {return D(97)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        43: {
            title() {return "Sago Palm"},
            unlocked() {return challengeCompletions('zon', 11).gte(2)},
            description() {
                return "Multiply Plant Point gain by [Prickly Pear]+1, Reduce Plant cost base by 0.05."},
            effect() {return getBuyableAmount('pla', 11).add(1)},
            cost() {return D(104)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        44: {
            title() {return "Areca Palm"},
            unlocked() {return challengeCompletions('zon', 11).gte(2)},
            description() {
                return "Divide Prickly Pear cost by [Prickly Pear]+1, Saguro cost by [Saguro]+1."},
            effect() {return {
                P: getBuyableAmount('pla', 11).add(1),
                S: getBuyableAmount('pla', 12).add(1)
            }},
            cost() {return D(110)},
            effectDisplay() {return "/"+format(upgradeEffect(this.layer, this.id).P)+", /"+format(upgradeEffect(this.layer, this.id).S)},
        },
        45: {
            title() {return "Peace Lily"},
            tooltip() {return "Effect Formula: log<sub>10</sub>([Points]+1)+1"},
            unlocked() {return challengeCompletions('zon', 11).gte(3)},
            description() {
                return "Divide Plant cost based on points."},
            effect() {return player.points.max(0).add(1).log10().add(1)},
            cost() {return D(120)},
            effectDisplay() {return "/"+format(upgradeEffect(this.layer, this.id))},
        },
        51: {
            title() {return "Stonecrop"},
            tooltip() {return "Effect Formula: 5<sup>log<sub>10</sub>([Plants]+1)+1</sup><br>If You have Sempervivum, Increase this cost."},
            unlocked() {return challengeCompletions('zon', 12).gte(1)},
            description() {
                return "Multiply Plant point gain based on plants."},
            effect() {return D(5).pow(player.pla.points.max(0).add(1).log10().add(1))},
            cost() {return hasUpgrade('pla', 52) ? D(132) : D(122)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        52: {
            title() {return "Sempervivum"},
            tooltip() {return "Effect Formula: log<sub>10</sub>([Plant points]+1)+1<br>If You have Stonecrop, Increase this cost"},
            unlocked() {return challengeCompletions('zon', 12).gte(1)},
            description() {
                return "Divide Prickly Pear Cost based on Plant points."},
            effect() {return player.planpts.max(0).add(1).log10().add(1)},
            cost() {return hasUpgrade('pla', 51) ? D(125) : D(122)},
            effectDisplay() {return "/"+format(upgradeEffect(this.layer, this.id))},
        },
        53: {
            title() {return "Campanula"},
            tooltip() {return "If You have Phlox, Increase this cost"},
            unlocked() {return challengeCompletions('zon', 12).gte(2)},
            description() {
                return "Multiply Plant point gain by 2 per Saguro."},
            effect() {return D(2).pow(getBuyableAmount('pla', 12))},
            cost() {return hasUpgrade('pla', 54) ? D(142) : D(138)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        54: {
            title() {return "Phlox"},
            tooltip() {return "If You have Campanula, Increase this cost"},
            unlocked() {return challengeCompletions('zon', 12).gte(2)},
            description() {
                return "Increase Prickly Pear's Base effect for plant points by 1."},
            effect() {return D(1)},
            cost() {return hasUpgrade('pla', 53) ? D(145) : D(138)},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        55: {
            title() {return "Sprinkler"},
            tooltip() {return "Effect Formula: ([Zones]+2)<sup>[Zones]/2+1</sup>"},
            unlocked() {return challengeCompletions('zon', 12).gte(2)},
            description() {
                return "Increase Sedum's base effect by 1, Multiply Point gain based on zones."},
            effect() {return player.zon.points.max(0).add(2).pow(player.zon.points.div(2).add(1))},
            cost() {return D(151)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        61: {
            title() {return "Dianthus"},
            tooltip() {return "If You have Pulsatilla Vulgaris, Increase this cost"},
            unlocked() {return challengeCompletions('zon', 12).gte(3)},
            description() {
                return "Gain 0.5 Free Effective Saguro levels per Prickly Pear."},
            effect() {return D(0.5).times(getBuyableAmount('pla', 11)).max(0)},
            cost() {return hasUpgrade('pla', 62) ? D(165) : D(158)},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        62: {
            title() {return "Pulsatilla Vulgaris"},
            tooltip() {return "If You have Dianthus, Increase this cost"},
            unlocked() {return challengeCompletions('zon', 12).gte(3)},
            description() {
                return "Divide Prickly Pear cost by [Saguro]+1."},
            effect() {return getBuyableAmount('pla', 12).add(1)},
            cost() {return hasUpgrade('pla', 61) ? D(165) : D(158)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        63: {
            title() {return "Primrose"},
            unlocked() {return challengeCompletions('zon', 12).gte(3)},
            description() {
                return "Multiply Challenge Power gain by 3 per zone, Unlock a new buyable."},
            effect() {return D(3).pow(player.zon.points)},
            cost() {return D(175)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        64: {
            title() {return "Thrift"},
            unlocked() {return challengeCompletions('zon', 12).gte(3)},
            description() {
                return "Gain 1 Free Effective Prickly and Saguro levels per Echinocactus."},
            effect() {return getBuyableAmount('pla', 13).max(0)},
            cost() {return D(178)},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        65: {
            title() {return "Vines"},
            unlocked() {return challengeCompletions('zon', 12).gte(3)},
            description() {
                return "Multiply Point and Plant point gain by 5 per Echinocactus."},
            effect() {return D(5).pow(getBuyableAmount('pla', 13).max(0))},
            cost() {return D(191)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
    },
    PPEbase() {
        let base = D(2)
        if (hasUpgrade('gar', 15)) base = base.add(upgradeEffect('gar', 15))
        return base
    },
    PPbase() {
        let base = D(10)
        if (hasUpgrade('pla', 32)) base = base.sub(2)
        return base.max(5)
    },
    Pbase() {
        let base = D(10)
        if (hasUpgrade('pla', 34)) base = base.sub(2)
        return base.max(5)
    },
    PPmag() {
        return player.planpts.max(1).log(tmp.pla.PPbase).floor()
    },
    PPmagNext() {
        return Decimal.pow(tmp.pla.PPbase, tmp.pla.PPmag.add(1))
    },
    Pmag() {
        return player.pla.points.max(1).log(tmp.pla.Pbase).floor()
    },
    PmagNext() {
        return Decimal.pow(tmp.pla.Pbase, tmp.pla.Pmag.add(1))
    },
    milestones: {
        0: {
            requirementDescription: "1 Plant",
            done() {return player[this.layer].best.gte(1)},
            effect() {
                let pow = D(1)
                if (hasUpgrade('pla', 11)) pow = pow.times(upgradeEffect('pla', 11))
                return player.pla.points.max(0).add(1).pow(pow)},
            effectDescription() {return "Multiply Plant Point gain by [Plant]+1, Currently: "+format(milestoneEffect('pla', 0))+"x"},
            },
        1: {
                requirementDescription: "10 Plants",
                tooltip() {return "Effect Formula: (log<sub>2</sub>([Plant Points]+1)+1)<sup>0.5</sup>"},
                done() {return player[this.layer].best.gte(10)},
                effect() {
                    return player.planpts.max(0).add(1).log2().add(1).pow(0.5)},
                effectDescription() {return "Multiply Point gain based on Plant Points, Currently: "+format(milestoneEffect('pla', 1))+"x"},
            },
        2: {
                requirementDescription: "1,000,000 Plant Points",
                tooltip() {return "Effect Formula: (log<sub>10</sub>([Plant Points]+1)+1)"},
                done() {return player.planpts.gte(1e6)},
                effect() {
                    return player.planpts.max(0).add(1).log10().add(1)},
                effectDescription() {return "Multiply Addition gain based on Plant Points, Currently: "+format(milestoneEffect('pla', 2))+"x"},
            },
        3: {
                requirementDescription: "25 Plants",
                tooltip() {return "Effect Formula: (log<sub>10</sub>([Points]+1)+1)"},
                done() {return player.pla.best.gte(25)},
                effect() {
                    return player.points.max(0).add(1).log10().add(1)},
                effectDescription() {return "Multiply Plant point gain based on Points, Currently: "+format(milestoneEffect('pla', 3))+"x"},
            },
        4: {
                requirementDescription: "200 Plants",
                done() {return player.pla.best.gte(200)},
                effect() {
                    return player.pla.points.max(0).add(1)},
                effectDescription() {return "Multiply Addition and Multiplication gain by [Plants]+1, Currently: "+format(milestoneEffect('pla', 4))+"x"},
            },
    },
    versionList() {
        return ["v0.0", "v1.0", "v2.0", "v3.0", "v4.0", "v5.0"]
    },
    layerShown(){return player.universe.eq(2)},
    update(diff) {
        if (player.a.trees.gte(2)) player.planpts = player.planpts.add(getPlaPtsGen().times(diff))
    }
})
addLayer("zon", {
    name: "zones", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Z", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: D(0),
        best: D(0),
    }},
    branches: ['pla'],
    color: "#00AAFF",
    requires: D(90), // Can be a function that takes requirement increases into account
    resource: "zones", // Name of prestige currency
    baseResource: "plants", // Name of resource prestige is based on
    exponent: D(1.25),
    base: D(1.2),
    baseAmount() {return player.pla.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    onPrestige() {player.planpts = D(0)},
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
                    "milestones",
                    "blank",
                    ["display-text",function() {false}],
                    "blank",
                    "challenges"
            ]
        },
    },
    canBuyMax() {return false},
    effect() {
        return D(5).pow(player.zon.points.max(0))
    },
    effectDescription() {
        return ", translated to a " + format(tmp.zon.effect) + "x boost to plant point gain."
    },
    doReset(l) {
        if (!(layers[l].row > this.row)) return
        
        let keep = ['milestones']
        if (player.universe.eq(2)){layerDataReset(this.layer, keep)}
    },
    hotkeys: [
        {key: "z", description: "Z: Reset for Zones", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.universe.eq(2)}}
    ],
    milestones: {
        0: {
            requirementDescription: "1 Zone",
            done() {return player[this.layer].best.gte(1)},
            effectDescription() {return "Unlock Zone 1: The Tropical Zone."},
            },
        1: {
            requirementDescription: "2 Zones",
            done() {return player[this.layer].best.gte(2)},
            effectDescription() {return "Unlock Zone 2: The Alpine Zone."},
            },
        2: {
            requirementDescription: "3 Zones",
            done() {return player[this.layer].best.gte(3)},
            effectDescription() {return "Plant Buyables don't spend anything."},
            },
        3: {
            requirementDescription: "4 Zones",
            done() {return player[this.layer].best.gte(4)},
            effectDescription() {return "Unlock Zone 3: The Temperate Zone."},
            },
    },
    challenges: {
        11: {
            name: "The Tropical Zone",
            unlocked() {return hasMilestone('zon', 0)},
            onEnter() {
                player.pla.upgrades = []
                player.planpts = D(0)
            },
            challengeDescription() {return "Reset Plant upgrades, Divide Plant point gain by [plant]+1.<br>Completions:"+formatWhole(challengeCompletions(this.layer, this.id))+"/3"},
            goal() {return [D(75), D(90), D(100), D(0)][challengeCompletions(this.layer, this.id).min(3)]},
            goalDescription() {return "Reach "+formatWhole(this.goal())+" Plants"},
            completionLimit() {return D(3)},
            rewardEffect() {return D(5).pow(challengeCompletions(this.layer, this.id))},
            rewardDescription() {return "Unlock more plant upgrades and Multiply Plant point by 5 per completion, Currently: "+format(challengeEffect(this.layer, this.id))+"x"},
            canComplete: function() {return player.pla.points.gte(this.goal())},
        },
        12: {
            name: "The Alpine Zone",
            countsAs: [11],
            unlocked() {return hasMilestone('zon', 1)},
            onEnter() {
                player.pla.upgrades = []
                player.planpts = D(0)
            },
            challengeDescription() {return "Reset Plant upgrades, Apply Previous Challenge Nerfs, Divide Plant point gain and Multiply Plant cost by [Prickly Pear]+1<br>Completions:"+formatWhole(challengeCompletions(this.layer, this.id))+"/3"},
            goal() {return [D(100), D(115), D(136), D(0)][challengeCompletions(this.layer, this.id).min(3)]},
            goalDescription() {return "Reach "+formatWhole(this.goal())+" Plants"},
            completionLimit() {return D(3)},
            rewardEffect() {return D(5).pow(challengeCompletions(this.layer, this.id))},
            rewardDescription() {return "Unlock more plant upgrades and Multiply Plant point by 5 per completion, Currently: "+format(challengeEffect(this.layer, this.id))+"x"},
            canComplete: function() {return player.pla.points.gte(this.goal())},
        },
        21: {
            name: "The Temperate Zone",
            countsAs: [11, 12],
            unlocked() {return hasMilestone('zon', 3)},
            onEnter() {
                player.pla.upgrades = []
                player.planpts = D(0)
            },
            challengeDescription() {return "Reset Plant upgrades, Apply Previous Challenge Nerfs, Divide Plant point gain by log<sub>2</sub>([Plant Points]+2), Currently: /"+format(tmp.zon.TTZNerf)+"<br>Completions:"+formatWhole(challengeCompletions(this.layer, this.id))+"/3"},
            goal() {return [D(137), D(154), D(183), D(0)][challengeCompletions(this.layer, this.id).min(3)]},
            goalDescription() {return "Reach "+formatWhole(this.goal())+" Plants"},
            completionLimit() {return D(3)},
            rewardEffect() {return D(5).pow(challengeCompletions(this.layer, this.id))},
            rewardDescription() {return "Unlock more garden buyables and Multiply Plant point by 5 per completion, Currently: "+format(challengeEffect(this.layer, this.id))+"x"},
            canComplete: function() {return player.pla.points.gte(this.goal())},
        },
    },
    TTZNerf() {return player.planpts.max(0).add(2).log2()},
    layerShown(){return player.universe.eq(2)&&(hasUpgrade('pla', 35)||player.zon.unlocked)},
    update(diff) {
    }
})
addLayer("gar", {
    name: "garden", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: D(0),
        best: D(0),
    }},
    branches: ['pla'],
    color: "#FF8800",
    requires: D(30), // Can be a function that takes requirement increases into account
    resource: "gardens", // Name of prestige currency
    baseResource: "plants", // Name of resource prestige is based on
    exponent: D(0.8),
    base: D(1.2),
    baseAmount() {return player.pla.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        if (hasUpgrade('gar', 22)) mult = mult.div(upgradeEffect('gar', 22))
        if (hasUpgrade('pla', 33)) mult = mult.div(upgradeEffect('pla', 33))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    onPrestige() {player.planpts = D(0)},
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
                    "milestones",
                    "blank",
                    ["display-text",function() {false}],
                    "blank",
                    "buyables",
                    "upgrades"
            ]
        },
    },
    canBuyMax() {return hasUpgrade('gar', 22)},
    effect() {
        return D(1).add(player.gar.points.max(0)).pow(3)
    },
    effectDescription() {
        return ", translated to a " + format(tmp.gar.effect) + "x boost to point gain."
    },
    doReset(l) {
        if (!(layers[l].row > this.row)) return
        
        let keep = ['milestones']
        if (player.universe.eq(2)){layerDataReset(this.layer, keep)}
    },
    hotkeys: [
        {key: "g", description: "G: Reset for Gardens", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.universe.eq(2)}}
    ],
    buyables: {
        11: {
            title() {return "Water Features"},
            display() {
                return "Multiply plant point gain by "+format(challengeCompletions('zon', 21).add(1))+" per level ([The Temperate Zone Completions]+1)<br>Req: "+format(this.cost())+" Gardens<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            effect(x) {return challengeCompletions('zon', 21).add(1).pow(x)},
            unlocked() {return challengeCompletions('zon', 21).gte(1)},
            tooltip() {return "Cost Formula: 16+4x"},
            cost(x) {let base = D(16).add(x.times(4))
                return base.floor()
            },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.gar.points.gte(this.cost())
            },
        },
        12: {
            title() {return "Tunnel Features"},
            display() {
                return "Multiply plant point gain by "+format(player.zon.points.max(0).add(1))+" per level ([Zone]+1)<br>Req: "+format(this.cost())+" Gardens<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            effect(x) {return player.zon.points.max(0).add(1).pow(x)},
            unlocked() {return challengeCompletions('zon', 21).gte(2)},
            tooltip() {return "Cost Formula: 20+5x"},
            cost(x) {let base = D(20).add(x.times(5))
                return base.floor()
            },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.gar.points.gte(this.cost())
            },
        },
        13: {
            title() {return "Exploration Features"},
            display() {
                return "Multiply plant point gain by "+format(getBuyableAmount('gar', 11).add(getBuyableAmount('gar', 12)).add(getBuyableAmount('gar', 13)).max(0).add(1).log2().add(2))+" per level (based on Total First Row Garden Buyables Levels)<br>Req: "+format(this.cost())+" Gardens<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            effect(x) {return getBuyableAmount('gar', 11).add(getBuyableAmount('gar', 12)).add(getBuyableAmount('gar', 13)).max(0).add(1).log2().add(2).pow(x)},
            unlocked() {return challengeCompletions('zon', 21).gte(3)},
            tooltip() {return "Cost Formula: 18+6x<br>Effect Formula: log<sub>2</sub>(x+1)+2"},
            cost(x) {let base = D(18).add(x.times(6))
                return base.floor()
            },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.gar.points.gte(this.cost())
            },
        },
    },
    upgrades: {
        11: {
            title() {return "Lawn"},
            tooltip() {return "Effect Formula: ([Gardens]+1)<sup>2</sup>*([Plants]/2+1)"},
            description() {
                return "Multiply Plant point gain based on gardens and plants."},
            effect() {return player.gar.points.max(0).add(1).pow(2).times(player.pla.points.max(0).div(2).add(1))},
            cost() {return D(1)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        12: {
            title() {return "Raised Bed"},
            tooltip() {return "Effect Formula: 3<sup>[Update]</sup>/10"},
            description() {
                return "Increase Plant Point gain base based on this tree's update, Unlock a plant buyable."},
            effect() {return D(3).pow(player.pla.version).div(10)},
            cost() {return D(2)},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        }, 
        13: {
            title() {return "Terracotta Pots"},
            description() {
                return "Multiply Subtraction gain and Divide Plant Cost by Lawn effect."},
            effect() {return upgradeEffect(this.layer, 11)},
            cost() {return D(3)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        14: {
            title() {return "Ceramic Pots"},
            description() {
                return "Divide Plant Cost and Prickly Pear Cost by 4 per plant magnitude."},
            effect() {return D(4).pow(tmp.pla.Pmag)},
            cost() {return D(3)},
            effectDisplay() {return "/"+format(upgradeEffect(this.layer, this.id))},
        },
        15: {
            title() {return "Gardener"},
            description() {
                return "Increase Prickly Pear's Effect base by 0.2 per upgrade."},
            effect() {return D(player.gar.upgrades.length).times(0.2)},
            cost() {return D(4)},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        21: {
            title() {return "Raised Bed II"},
            description() {
                return "Multiply Plant point gain by [upgrade]+1, Unlock another plant buyable."},
            effect() {return D(player.gar.upgrades.length).add(1)},
            cost() {return D(4)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        22: {
            title() {return "Shed"},
            description() {
                return "You can buy max gardens, Divide Garden Cost by 1.05 per plant magnitude."},
            effect() {return D(1.05).add(hasUpgrade('gar', 23) ? 0.025 : 0).pow(tmp.pla.Pmag)},
            cost() {return D(6)},
            effectDisplay() {return "/"+format(upgradeEffect(this.layer, this.id))},
        },
        23: {
            title() {return "Woodshed"},
            tooltip() {return "Effect Formula: ([Garden]+1)<sup>2</sup>"},
            description() {
                return "Increase Previous upgrade base effect by 0.025, Divide Plant Cost based on garden."},
            effect() {return player.gar.points.max(0).add(1).pow(2)},
            cost() {return D(7)},
            effectDisplay() {return "/"+format(upgradeEffect(this.layer, this.id))},
        },
        24: {
            title() {return "Powerhouse"},
            tooltip() {return "Effect Formula: log<sub>10</sub>([Challenge Power]+1)+1"},
            description() {
                return "Multiply Plant point gain based on challenge power."},
            effect() {return player.chalpow.max(0).add(1).log10().add(1)},
            cost() {return D(7)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        25: {
            title() {return "Lantern"},
            description() {
                return "Multiply Plant point gain by [Saguro]+1."},
            effect() {return getBuyableAmount('pla', 12).max(0).add(1)},
            cost() {return D(8)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
    },
    milestones: {
        0: {
            requirementDescription: "1 Garden",
            done() {return player[this.layer].best.gte(1)},
            effect() {
                return player.gar.points.max(0).add(1)},
            effectDescription() {return "You can buy max plants, Multiply Challenge Power gain by [Garden]+1, Currently: "+format(milestoneEffect('gar', 0))+"x"},
            },
        1: {
            requirementDescription: "4 Gardens",
            done() {return player[this.layer].best.gte(4)},
            effect() {
                return player.gar.points.max(0).add(1)},
            effectDescription() {return "Keep Plant Upgrades, Automatically gain plants and they reset nothing."},
            },
        2: {
            requirementDescription: "The Plant Tree v2.0",
            done() {return player.pla.version.gte(2)},
            effect() {
                return player.gar.points.max(0).add(1)},
            effectDescription() {return "Unlock a new row of plant upgrades."},
            },
    },
    layerShown(){return player.universe.eq(2)&&player.pla.version.gte(1)},
    update(diff) {
    }
})