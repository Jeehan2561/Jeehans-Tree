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
                    ["row",[["display-text",function() {if (hasUpgrade('add', 23)&&false) return "Le Underrated Forest<br>Author: MomentCookie (Cookina)<br>Version: "+([tmp.a.LUFversion][0][player.a.trees])}], "blank", ["buyable", "A1"]]],
                    "blank",
                    "blank",
                    ["row",[["display-text",function() {return "The Operator Tree<br>Author: ψ<sub>ε<sub>Ω+1</sub></sub> (Harry) <br>Version: "+([tmp.add.versionList][0][player.add.version])}], "blank", ["buyable", 11]]]
            ]
        },
    },
    LUFversion() {
        return ["v1", "v1.1", "v1.2"]
    },
    LUFTrees() {
        return ["Yet Another Challenge Tree: Adventure", "The Plant Tree Classic", "The Meta Upgrades Incremental", "No Spoiler >:["]
    },
    buyables: {
        A1: {
            unlocked() {return hasUpgrade('add', 23)&&false},
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
            cost() {return [D(10), D(300), D(6e3), D(1e5), Decimal.dInf][player.add.version]},
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
            title() {return "Update"},
            display() {
                return "Update Yet Another Challenge Tree: Adventure to "+[tmp.add.versionList][0][player.add.version.add(1)]+", Multiply Point gain by 2.5 per level<br>Cost: "+format(this.cost())+" Points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            effect(x) {return D(2.5).pow(x)},
            style() {
                return {
                "min-height": "200px",
                "width": "200px",
            }
            },
            cost() {return [D(1e10), Decimal.dInf][player.I.version]},
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
        if (hasMilestone('rat', 1)) mul = mul.times(2)
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
        layerDataReset(this.layer, keep)
    },
    hotkeys: [
        {key: "", description: "The Operator Tree Hotkeys:", onPress(){}},
        {key: "a", description: "A: Reset for Addition Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}}
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
    buyables: {
        11: {
            title() {return "Additional Boost"},
            display() {
                return "Increase point gain base by 0.1 per level<br>Cost: "+format(this.cost())+" Addition Points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: +"+format(this.effect())
            },
            effect(x) {return x.div(10)},
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
        return ["v0.0", "v0.1", "v0.2", "v0.3", "v0.4", "v0.5"]
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
            ]
        },
    },
    hotkeys: [
        {key: "s", description: "S: Reset for Subtraction Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}}
    ],
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
    layerShown(){return player.add.version.gte(2)},
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
        if (hasMilestone('rat', 2)) mult = mult.times(2)
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
    hotkeys: [
        {key: "m", description: "M: Reset for Multiplication Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}}
    ],
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
    getResetGain() {
        if (player.add.points.lt(10)) return D(0)
        return player.add.points.div(10).times(4).log(4).times(tmp.mul.gainMult).pow(tmp.mul.gainExp).floor()
    },
    getNextAt() {
        if (player.add.points.lt(10)) return D(10)
        return D(4).pow(tmp.mul.getResetGain.add(1).pow(D(1).div(tmp.mul.gainExp)).div(tmp.mul.gainMult)).times(2.5)
    },
    layerShown(){return player.add.version.gte(1)},
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
    hotkeys: [
        {key: "r", description: "R: Reset for Rational Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}}
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
                effectDescription() {return "Double Addition effect, Multiply Point gain by 1.2 per Rational Points, Currently: "+format(this.effect())+"x"},
            },
        2: {
                requirementDescription: "3 Rational Points",
                done() {return player[this.layer].best.gte(3)},
                tooltip() {return "Effect Formula: 1.1<sup>ln[subtraction points]<sup>0.5</sup></sup>"},
                effect() {return Decimal.pow(1.1, player.sub.points.max(0).add(1).ln().pow(0.5))},
                effectDescription() {return "Double Multiplication gain, Multiply Point gain based on Subtraction points, Currently: "+format(this.effect())+"x"},
            },
    },
    getResetGain() {
        if (player.add.points.lt(D(250).times(D(2).pow(player.rat.points.add(1).pow(2).sub(player.rat.points.add(1)).div(2))))) return D(0)
        return D(1)
    },
    getNextAt() {
        return D(250).times(D(2).pow(player.rat.points.add(1).pow(2).sub(player.rat.points.add(1)).div(2)))
    },
    layerShown(){return player.add.version.gte(3)},
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
    resource: "Tier I Powers", // Name of prestige currency
    baseResource: "Challenge Powers", // Name of resource prestige is based on
    exponent: 0.5,
    baseAmount() {return player.chalpow}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
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
    doReset(l) {
        if (!(layers[l].row > this.row)) return
        
        let keep = ['milestones', 'version']
        if (hasMilestone('add', 0)) keep.push('upgrades')
        layerDataReset(this.layer, keep)
    },
    hotkeys: [
        {key: "", description: "Yet Another Challenge Tree: Adventure Hotkeys:", onPress(){}},
        {key: "a", description: "A: Reset for Addition Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}}
    ],
    upgrades: {
    },
    milestones: {
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
        return ["v0.0", "v0.1", "v0.2", "v0.3", "v0.4", "v0.5"]
    },
    layerShown(){return player.universe.eq(1)},
    update(diff) {
    }
})