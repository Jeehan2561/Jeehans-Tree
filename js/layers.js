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
                    "clickables",
            ]
        },
    },
    LUFversion() {
        return ["v1", "v1.1", "v1.2"]
    },
    LUFTrees() {
        return ["Yet Another Challenge Tree: Adventure", "No Spoiler >:[", "The Plant Tree Classic", "The Meta Upgrades Incremental"]
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
            cost() {return [D(1e6), Decimal.dInf][player.a.trees]},
            buy() {
                let cost = new Decimal (1)
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
            cost() {return [D(10), D(300), D(6e3), D(1e5), D(1e12), Decimal.dInf][player.add.version]},
            buy() {
                let cost = new Decimal (1)
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
                let cost = new Decimal (1)
                player.points = player.points.sub(this.cost().mul(cost))
                player.I.version = player.I.version.add(1)
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
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
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
        version: D(0),
    }},
    color: "#4BDC13",
    requires() {return new Decimal(1).sub(buyableEffect('sub', 11).d)}, // Can be a function that takes requirement increases into account
    resource: "addition points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    exponent: 0.5,
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        if (hasUpgrade('mul', 12)) mult = mult.times(upgradeEffect('mul', 12))
        if (hasUpgrade('add', 22)) mult = mult.times(upgradeEffect('add', 22))
        mult = mult.times(tmp.rat.effect)
        mult = mult.times(challengeEffect('II', 21))
        mult = mult.times(challengeEffect('III', 21))
        if (hasMilestone('rat', 7)) mult = mult.times(milestoneEffect('rat', 7))
        if (hasMilestone('div', 3)) mult = mult.times(milestoneEffect('div', 3))
        mult = mult.times(buyableEffect('mul', 11))
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
        
        let keep = ['milestones', 'version']
        if (hasMilestone('add', 0)) keep.push('upgrades')
        if (player.universe.eq(0)){layerDataReset(this.layer, keep)}
    },
    hotkeys: [
        {key: "", description: "The Operator Tree Hotkeys:", onPress(){}, unlocked() {return player.universe.eq(0)}},
        {key: "a", description: "A: Reset for Addition Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.universe.eq(0)}}
    ],
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
            tooltip() {return "Cost Formula: x*2<sup>x</sup>"},
            cost(x) {return x.max(0).times(D(2).pow(x)).floor()},
            buy() {
                let cost = new Decimal (1)
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
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "subtraction points", // Name of prestige currency
    baseResource: "addition points", // Name of resource prestige is based on
    exponent: 0.5,
    baseAmount() {return player.add.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        if (hasUpgrade('add', 21)) mult = mult.times(upgradeEffect('add', 21))
        if (hasUpgrade('sub', 11)) mult = mult.times(upgradeEffect('sub', 11))
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
        
        let keep = ['milestones', 'version']
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
                let cost = new Decimal (1)
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
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "multiplication points", // Name of prestige currency
    baseResource: "addition points", // Name of resource prestige is based on
    exponent: 0.5,
    baseAmount() {return player.add.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        if (hasMilestone('rat', 2)) mult = mult.times((hasMilestone('rat', 4)) ? player.rat.best.max(2) : 2)
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
        
        let keep = ['milestones', 'version']
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
                let cost = new Decimal (1)
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
        if (!(layers[l].row > this.row)) return
        
        let keep = ['milestones', 'version']
        if (player.universe.eq(0)){layerDataReset(this.layer, keep)}
    },
    hotkeys: [
        {key: "r", description: "R: Reset for Rational Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.universe.eq(1)}, unlocked() {return player.universe.eq(0)}}
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
                    return Decimal.pow(1.1, player.sub.points.max(0).add(1).ln().pow(0.5))},
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
                effectDescription() {return "No effect."},
            },
    },
    getResetGain() {
        if (player.add.points.lt(tmp.rat.getNextAt)) return D(0)
        return D(1)
    },
    getNextAt() {
        return D(250).times(D(2).pow(player.rat.points.add(1).pow(2).sub(player.rat.points.add(1)).div(2))).times(tmp.rat.gainMult)
    },
    layerShown(){return player.add.version.gte(3)&&(player.universe.eq(0))},
    update(diff) {
    }
})
addLayer("div", {
    name: "division", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
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
        return player.div.points.max(0).pow(2).div(16).add(1).times(player.div.points.max(0))
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
    requires() {return new Decimal(1)}, // Can be a function that takes requirement increases into account
    resource: "Tier 1 Power", // Name of prestige currency
    baseResource: "Challenge Power", // Name of resource prestige is based on
    exponent: 1/3,
    baseAmount() {return player.chalpow}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        mult = mult.times(challengeEffect('II', 11))
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
        {key: "0", description: "Yet Another Challenge Tree: Adventure Hotkeys:", onPress(){}, unlocked() {return player.universe.eq(1)}},
        {key: "1", description: "1: Reset for Tier 1 Power", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.universe.eq(1)}}
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
    requires() {return new Decimal(10)}, // Can be a function that takes requirement increases into account
    resource: "Tier 2 Power", // Name of prestige currency
    baseResource: "Tier 1 Power", // Name of resource prestige is based on
    exponent: 1/3,
    baseAmount() {return player.I.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        mult = mult.times(tmp.III.effect)
        mult = mult.times(challengeEffect('III', 12))
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
        return D(0)
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
    requires() {return new Decimal(100)}, // Can be a function that takes requirement increases into account
    resource: "Tier 3 Power", // Name of prestige currency
    baseResource: "Tier 2 Power", // Name of resource prestige is based on
    base: 2,
    exponent: 1.25,
    baseAmount() {return player.II.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
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
            unlocked() {return hasMilestone('III', 3)},
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
                done() {return player[this.layer].best.gte(4)},
                effectDescription() {return "Unlock Exponential."},
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