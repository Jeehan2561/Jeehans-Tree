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
                    ["row",[["display-text",function() {if (player.a.trees.gte(3)) return "The Meta Upgrades Incremental<br>Author: ThatOneKobold <br>Version: "+([tmp.meta.versionList][0][player.meta.version])}], "blank", ["buyable", 14]]],
                    ["row",[["display-text",function() {if (player.a.trees.gte(3)) return "Incremental God Tree<br>Author: Icecreamdude <br>Version: "+([tmp.inc.versionList][0][player.inc.version])}], "blank", ["buyable", 15]]],
                    ["row", [ ["clickable", 11], ["clickable", 12], ["clickable", 13], ["clickable", 14], ["clickable", 15]]],
            ]
        },
    },
    LUFversion() {
        return ["v1", "v1.1", "v1.2", "v1.3", "v1.4", "v1.5"]
    },
    LUFTrees() {
        return ["Yet Another Challenge Tree: Adventure", "The Plant Tree Original", "The Meta Upgrades Incremental", "Incremental God Tree" ,"No Spoiler >:["]
    },
    LUFAll() {
        return ["The Operator Tree", "Yet Another Challenge Tree: Adventure", "The Plant Tree Original", "The Meta Upgrades Incremental", "Incremental God Tree" ,"No Spoiler >:["]
    },
    buyables: {
        A1: {
            unlocked() {return hasUpgrade('add', 23)},
            title() {return "Le Underrated Forest"},
            display() {
                return "Update Le Underrated Forest to "+[tmp.a.LUFversion][0][player.a.trees.add(1)]+"<br>, Unlock "+tmp.a.LUFTrees[player.a.trees]+"<br>, Multiply Point gain by 2.5 per level<sup>2</sup><br>Cost: "+format(this.cost())+" Points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            effect(x) {return D(2.5).pow(x.pow(2))},
            style() {
                return {
                "min-height": "200px",
                "width": "200px",
            }
            },
            cost() {return [D(1e6), D(1e25), D(1e101), D(1e126), Decimal.dInf][player.a.trees]},
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
            cost() {return [D(6e9), D(1e15), D(1e73), D(1e137), Decimal.dInf][player.I.version]},
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
            cost() {return [D(1e34), D(1e44), D(1.111e111), Decimal.dInf][player.pla.version]},
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
        14: {
            unlocked() {return player.a.trees.gte(3)},
            title() {return "Update"},
            display() {
                return "Update The Meta Upgrades Incremental to "+[tmp.meta.versionList][0][player.meta.version.add(1)]+", Multiply Point gain by 7 per level<br>Cost: "+format(this.cost())+" Points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            effect(x) {return D(7).pow(x)},
            style() {
                return {
                "min-height": "200px",
                "width": "200px",
            }
            },
            cost() {return [D(1e104), D(1e119), Decimal.dInf][player.meta.version]},
            buy() {
                let cost = D(1)
                player.points = player.points.sub(this.cost().mul(cost))
                player.meta.version = player.meta.version.add(1)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.points.gte(this.cost())
            },
        },
        15: {
            unlocked() {return player.a.trees.gte(4)},
            title() {return "Update"},
            display() {
                return "Update Incremental God Tree to "+[tmp.meta.versionList][0][player.meta.version.add(1)]+", Multiply Point gain by 8.5 per level<br>Cost: "+format(this.cost())+" Points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            effect(x) {return D(8.5).pow(x)},
            style() {
                return {
                "min-height": "200px",
                "width": "200px",
            }
            },
            cost() {return [D(1e131), D(1e195), Decimal.dInf][player.inc.version]},
            buy() {
                let cost = D(1)
                player.points = player.points.sub(this.cost().mul(cost))
                player.inc.version = player.inc.version.add(1)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.points.gte(this.cost())
            },
        },
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
        14: {
            title() {return "Switch to"},
            display() {return "The Meta Upgrades Incremental"},
            unlocked() {return player.a.trees.gte(3)},
            canClick() {return !player.universe.eq(3)},
            onClick() {player.universe = D(3)},
        },
        15: {
            title() {return "Switch to"},
            display() {return "Incremental God Tree"},
            unlocked() {return player.a.trees.gte(4)},
            canClick() {return !player.universe.eq(4)},
            onClick() {player.universe = D(4)},
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
        81: {
            name() {return "Powerful"},
            tooltip() {return "Update YACT to v0.3."},
            done() {return player.I.version.gte(3)},
        },
        82: {
            name() {return "The Power Of Four"},
            tooltip() {return "Gain a tier 4 power."},
            done() {return player.IV.best.gte(1)},
        },
        83: {
            name() {return "Anti-Limited"},
            tooltip() {return "Break Limit once."},
            done() {return getBuyableAmount('IV', 11).gte(1)},
        },
        84: {
            name() {return "Hey, Googol"},
            tooltip() {
                if (hasAchievement(this.layer, this.id)) return "Reach "+format(1e100)+" points"
                return "Play Rickroll."},
            done() {return player.points.gte(1e100)},
        },
        85: {
            name() {return "(softcapped)"},
            tooltip() {return "Reach "+format(1e100)+" points/s"},
            done() {return RPG().gte(1e100)},
        },
        91: {
            name() {return "Meta Phase"},
            tooltip() {return "Unlock The Meta Upgrades Incremental."},
            done() {return player.a.trees.gte(3)},
        },
        92: {
            name() {return "This feels meta."},
            tooltip() {return "Buy Initiate."},
            done() {return hasUpgrade('meta', 11)},
        },
        93: {
            name() {return "That was short."},
            tooltip() {return "Update The Meta Upgrades Incremental to v0.1."},
            done() {return player.meta.version.gte(1)},
        },
        94: {
            name() {return "Shi(f)t."},
            tooltip() {return "Gain a meter of wave."},
            done() {return player.shift.best.gte(1)},
        },
        95: {
            name() {return "AD reference?"},
            tooltip() {return "Buy 1st Shift Multiplier."},
            done() {return getBuyableAmount('shift', 11).gte(1)},
        },
        101: {
            name() {return "And there's the missing zone."},
            tooltip() {return "Update The Plant Tree to v3.0."},
            done() {return player.pla.version.gte(3)},
        },
        102: {
            name() {return "Surprise!"},
            tooltip() {return "Complete The Forest Zone 3 times."},
            done() {return challengeCompletions('zon', 22).gte(3)},
        },
        103: {
            name() {return "Here's the new life"},
            tooltip() {return "Start Generating Wildlife."},
            done() {return player.pla.points.gte(233)},
        },
        104: {
            name() {return "Another life"},
            tooltip() {return "Start Generating Larger Wildlife."},
            done() {return hasUpgrade('wild', 33)},
        },
        105: {
            name() {return "Seems Useless"},
            tooltip() {return "Gain 5 Zones."},
            done() {return player.zon.points.gte(5)},
        },
        111: {
            name() {return "More Meta"},
            tooltip() {return "Update The Meta Upgrades Incremental to v0.2."},
            done() {return player.meta.version.gte(2)},
        },
        112: {
            name() {return "Recursion"},
            tooltip() {return "Gain a recursivity."},
            done() {return player.recur.points.gte(1)},
        },
        113: {
            name() {return "More Rational"},
            tooltip() {return "Gain 25 rational."},
            done() {return player.rat.points.gte(25)},
        },
        114: {
            name() {return "More Division for Small Number"},
            tooltip() {return "Gain 25 division."},
            done() {return player.div.points.gte(25)},
        },
        115: {
            name() {return "Exponents+"},
            tooltip() {return "Gain 4 exponentials."},
            done() {return player.expo.points.gte(4)},
        },
        121: {
            name() {return "God of Trees"},
            tooltip() {return "Unlock Incremental God Tree."},
            done() {return player.a.trees.gte(4)},
        },
        122: {
            name() {return "A Lovely Tree"},
            tooltip() {return "Beat your first Tree."},
            done() {return player.inc.trees.gte(1)},
        },
        123: {
            name() {return "A Lovely Forest"},
            tooltip() {return "Gain 20 Trees."},
            done() {return player.inc.trees.gte(20)},
        },
        124: {
            name() {return "We have technology."},
            tooltip() {return "Update Incremental God Tree to v0.1."},
            done() {return player.inc.version.gte(1)},
        },
        125: {
            name() {return "Digital Money"},
            tooltip() {return "Gain a crypto."},
            done() {return player.inc.crypto.gte(1)},
        },
        131: {
            name() {return "Another AD Reference?"},
            tooltip() {return "Unlock crypto dimensions."},
            done() {return hasUpgrade('inc', 51)},
        },
        132: {
            name() {return "8-Bit"},
            tooltip() {return "Gain a byte."},
            done() {return player.inc.byte.gte(1)},
        },
        133: {
            name() {return "Final Update."},
            tooltip() {return "Update YACT:A to v1.0"},
            done() {return player.I.version.gte(4)},
        },
        134: {
            name() {return "Final Tier."},
            tooltip() {return "Gain a tier 5 power."},
            done() {return player.V.points.gte(1)},
        },
        135: {
            name() {return "Time is relative"},
            tooltip() {return "Gain a Time Energy."},
            done() {return player.chalpow.gte(1e100)},
        },
        141: {
            name() {return "Inflation?"},
            tooltip() {return "Gain "+format(1e100)+" Challenge Power."},
            done() {return player.chalpow.gte(1e100)},
        },
        142: {
            name() {return "Another one."},
            tooltip() {return "Gain 8 Exponential Points."},
            done() {return player.expo.points.gte(8)},
        },
        143: {
            name() {return "But We haven't- nvm."},
            tooltip() {return "Update Incremental God Tree to v0.2."},
            done() {return player.inc.version.gte(2)},
        },
        144: {
            name() {return "Start Coding"},
            tooltip() {return "Gain a code experience."},
            done() {return player.inc.ce.gte(1)},
        },
        145: {
            name() {return "You're now a Mod Creator"},
            tooltip() {return "Gain a mod."},
            done() {return player.inc.mods.gte(1)},
        },
        151: {
            name() {return "The Incrementalverse"},
            tooltip() {return "Unlock realm mods."},
            done() {return hasUpgrade('inc', 65)},
        },
        152: {
            name() {return "Scaled Time"},
            tooltip() {return "Gain 10 Exponential Points."},
            done() {return player.expo.points.gte(8)},
        },
        153: {
            name() {return "Another Zone?"},
            tooltip() {return "Gain 6 Zones."},
            done() {return player.zon.points.gte(6)},
        },
        154: {
            name() {return "Limit Reached"},
            tooltip() {return "Gain "+format(D(2).pow(1024))+" Points."},
            done() {return player.points.gte(D(2).pow(1024))},
        },
        155: {
            name() {return "The end of the adventure"},
            tooltip() {return "Gain "+format(D(2).pow(1024))+" Challenge Power."},
            done() {return player.chalpow.gte(D(2).pow(1024))},
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
addLayer("c", {
    name: "cookina", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: D(0),
        best: D(0),
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
                    "blank",
                    "blank",
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
                unlocked() {return false},
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
    resource() {
        if (options.text==0) return "adion poins"
        return "addition points"}, // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    exponent: 0.5,
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        if (hasUpgrade('mul', 12)) mult = mult.times(upgradeEffect('mul', 12))
        if (hasUpgrade('add', 22)) mult = mult.times(upgradeEffect('add', 22))
        if (hasUpgrade('add', 31)) mult = mult.times(upgradeEffect('add', 31))
        if (hasUpgrade('sub', 22)) mult = mult.times(upgradeEffect('sub', 22))
        if (hasUpgrade('inc', 14)) mult = mult.times(upgradeEffect('inc', 14))
        mult = mult.times(tmp.rat.effect)
        mult = mult.times(challengeEffect('II', 21))
        mult = mult.times(challengeEffect('III', 21))
        if (hasMilestone('rat', 7)) mult = mult.times(milestoneEffect('rat', 7))
        if (hasMilestone('div', 3)) mult = mult.times(milestoneEffect('div', 3))
        if (hasMilestone('div', 12)) mult = mult.times(milestoneEffect('div', 12))
        if (hasMilestone('div', 15)) mult = mult.times(milestoneEffect('div', 15))
        if (hasMilestone('rat', 10)) mult = mult.times(milestoneEffect('rat', 10))
        if (hasMilestone('rat', 18)) mult = mult.times(milestoneEffect('rat', 18))
        mult = mult.times(buyableEffect('mul', 11))
        if (hasMilestone('expo', 0)) mult = mult.times(milestoneEffect('expo', 0))
        if (hasMilestone('shift', 0)) mult = mult.times(milestoneEffect('shift', 0))
        if (hasMilestone('pla', 2)) mult = mult.times(milestoneEffect('pla', 2))
        if (hasMilestone('pla', 4)) mult = mult.times(milestoneEffect('pla', 4))
        if (hasMilestone('gar', 3)) mult = mult.times(milestoneEffect('gar', 3))
        if (hasMilestone('recur', 0)) mult = mult.times(milestoneEffect('recur', 0))
        if (player.V.boost.eq(0)) mult = mult.times(tmp.V.timeEffect.asm)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let expo = D(1)
        if (hasMilestone('expo', 12)) expo = expo.times(tmp.expo.effect)
        return expo
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
        let texts = [", +"+format(tmp.add.effect)+" to poin gain bas", ", which adds " + format(tmp.add.effect) + " to point gain base",", translated to a +" + format(tmp.add.effect) + " boost to point gain base"]
        if (player.add.version.gte(1)) return texts[options.text]
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
    hotkeys: [
        {key: ">", description: ">: Switch Trees", onPress(){if (player.universe.add(1).lte(player.a.trees)&&player.tab == 'none') player.universe = player.universe.add(1)}, unlocked() {return player.a.trees.gte(1)}},
        {key: "<", description: "<: Switch Trees", onPress(){if (player.universe.sub(1).gte(0)&&player.tab == 'none') player.universe = player.universe.sub(1)}, unlocked() {return player.a.trees.gte(1)}},
        {key: "a", description: "A: Reset for Addition Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.universe.eq(0)}}
    ],
    automate() {
        if (player.add.AB){buyBuyable('add', 11)}
    },
    upgrades: {
        11: {
            title() {let texts = ["adr", "Adder", "Adder"]
                return texts[options.text]},
            tooltip() {return "Effect Formula:<br>{(log<sub>2</sub>[addition points]+1)+1)}/20"},
            description() {
                let texts=["adition ad poin gain bas.", "Boost point gain base based on addition.", "Increase Point gain base based on additions."]
                return texts[options.text]
            },
            effect() {return player.add.points.max(0).add(1).log2().add(1).div(20)},
            cost() {return D(1)},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        12: {
            title() {let texts = ["adtiongl", "Additional", "Additional"]
                return texts[options.text]},
            tooltip() {return "Effect Formula:<br>ln[addition points]<sup>0.5</sup>/8"},
            description() {
                let texts = ["poin ad poin gain bas.", "Boost point gain base based on addition", "Increase Point gain base based on points."]
                return texts[options.text]},
            effect() {return player.points.max(0).add(1).ln().pow(0.5).div(8)},
            cost() {return D(2)},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        13: {
            title() {let texts = ["wo wa?", "Woah What?", "Woah What?"]
                return texts[options.text]},
            tooltip() {return ""},
            description() {
                let t1 = ["everi upg ad 0.05 to ur poin gain bas, get new tab in achivent","Each upgrade add Point gain base by 0.05, Unlock a tab in achievements layer","Increase Point gain base by 0.05 per upgrade, Unlock a new tab in achievements layer."]
                let t2 = ["everi upg^2 ad 0.05 to ur poin gain bas, get new tab in achivent","Each upgrade<sup>2</sup> add Point gain base by 0.05, Unlock a tab in achievements layer","Increase Point gain base by 0.05 per upgrade<sup>2</sup>, Unlock a new tab in achievements layer."]
                if (hasUpgrade('add', 23)) return t2[options.text]
                return t1[options.text]},
            effect() {
                if (hasUpgrade('add', 23)) return D(player.add.upgrades.length).pow(2).div(20)
                return D(player.add.upgrades.length).div(20)},
            cost() {return D(4)},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        21: {
            title() {let texts = ["adictiv", "Addictive", "Addictive"]
                return texts[options.text]},
            description() {let texts = ["sub amt x2, mak tim tabl betr", "Boost Subtraction by 2x, Time Tables is better", "Multiply Subtraction gain by 2, Improve Time Tables' Effect."]
                return texts[options.text]},
            effect() {return D(2)},
            cost() {return D(1000)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return player.add.version.gte(4)},
        },
        22: {
            title() {let texts = ["ad poin", "Additional Pointers", "Additional Pointers"]
                return texts[options.text]},
            tooltip() {return "Effect Formula:<br>log<sub>10</sub>[points]<sup>0.5</sup>"},
            description() {let texts = ["bost ad amt bas on poins", "Boost Addition gain based on points.", "Multiply Addition gain based on points."]
                return texts[options.text]},
            effect() {return player.points.max(0).add(1).log10().max(1).pow(0.5)},
            cost() {return D(2000)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return player.add.version.gte(4)},
        },
        23: {
            title() {let texts = ["nrew adventur", "A new Addventure?", "A new Addventure???"]
                return texts[options.text]},
            description() {let texts = ["wo wa? betr, mak sumthn new.", "Woah What? is better, Unlock something new.", "Improve Woah What?'s first effect, Unlock something new."]
                return texts[options.text]},
            cost() {return D(4000)},
            unlocked() {return player.add.version.gte(4)},
        },
        31: {
            title() {let texts = ["funshunn+", "Function+", "Function+"]
                return texts[options.text]},
            tooltip() {return "log<sub>10</sub>([ft]+10)"},
            description() {let texts = ["bost adion gain bason f("+makeBlue("t")+")", "Boost Addition gain based on f("+makeBlue("t")+").", "Multiply Addition gain based on f("+makeBlue("t")+")."]
                return texts[options.text]},
            effect() {return player.III.ft.max(0).add(10).log10()},
            cost() {return D(1e10)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasMilestone('div', 7)},
        },
        32: {
            title() {let texts = ["+w+", "+-+", "+-+"]
                return texts[options.text]},
            description() {let texts = ["upg+1 multipi multi gain.","Boost Multiplication gain by [upgrade]+1.", "Multiply Multiplication gain by [upgrade]+1."]
                return texts[options.text]},
            effect() {return D(player.add.upgrades.length).add(1)},
            cost() {return D(1e12)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasMilestone('div', 7)},
        },
        33: {
            title() {let texts = ["decresd","Decrease","Decreased"]
                return texts[options.text]},
            tooltip() {return "x*2<sup>x</sup> -> 10*2<sup>x</sup>"},
            description() {let texts = ["chang adtion bos's cos.", "Change Addtional Boost's Cost Formula.", "Change Addtional Boost's Cost Formula"]
                return texts[options.text]},
            cost() {return D(1e14)},
            unlocked() {return hasMilestone('div', 7)},
        },
    },
    milestones: {
        0: {
            requirementDescription() {let texts = ["6 ad ups", "6 Addition Upgrades", "6 Addition Upgrades"]
        return texts[options.text]},
            unlocked() {return player.add.version.gte(4)},
            done() {return D(player.add.upgrades.length).gte(6)},
            effectDescription() {let texts = ["kep ad upg al tim.", "Keep All Addition Upgrades on Reset.", "Keep All Addition Upgrades on Every Reset"]
                return texts[options.text]},
        },
        1: {
                requirementDescription() {let texts = ["10 adionl bost", "10 Additional Boosts", "10 Additional Boosts"]
                    return texts[options.text]},
                unlocked() {return hasUpgrade('mul', 13)},
                done() {return getBuyableAmount('add', 11).gte(10)},
                effectDescription() {let texts = ["get 50% ad gain/s.", "Gain 50% of addition gain per seconds.", "Passively gain 50% of addition gain per second"]
                    return texts[options.text]},
        },
    },
    ABBase() {
        let base = D(0.1)
        if (hasMilestone('rat', 5)) base = base.times(milestoneEffect('rat', 5))
        return base
    },
    buyables: {
        11: {
            title() {let texts = ["adiong bost", "Additional Boost", "Additional Boost"]
                return texts[options.text]},
            purchaseLimit() {
                if (hasUpgrade('mul', 21)) return D(2).pow(1024)
                return D(100)},
            display() {
                if (options.text==0)return "each +"+format(tmp.add.ABBase)+" to poin gain bas<br>cos: "+format(this.cost())+" adion poins<br>lvl: "+formatWhole(getBuyableAmount(this.layer, this.id))+"/"+formatWhole(this.purchaseLimit())+"<br>efec: +"+format(this.effect())
                if (options.text==1)return "Add "+format(tmp.add.ABBase)+" to point gain base per level<br>Cost: "+format(this.cost())+" Addition Points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"/"+formatWhole(this.purchaseLimit())+"<br>Effect: +"+format(this.effect())
                if (options.text==2)return "Increase point gain base by "+format(tmp.add.ABBase)+" per level<br>Cost: "+format(this.cost())+" Addition Points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"/"+formatWhole(this.purchaseLimit())+"<br>Effect: +"+format(this.effect())
            },
            effect(x) {return x.times(tmp.add.ABBase)},
            unlocked() {return hasUpgrade('mul', 13)},
            tooltip() {
                if (hasUpgrade('add', 33)) return "Cost Formula: 10*2<sup>x</sup>"
                return "Cost Formula: x*2<sup>x</sup>"},
            cost(x) {
                let amt = x
                if (x.gte(100)) amt = D(100).add(x.sub(99).times(x.sub(100)).div(2))
                if (hasUpgrade('add', 33)) return D(10).times(D(2).pow(amt)).floor()
                return amt.max(0).times(D(2).pow(amt)).floor()},
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
    base() {
        return D(2)},
    getResetGain() {
        if (player.points.lt(tmp.add.requires)) return D(0)
        return player.points.times(tmp.add.base).div(tmp.add.requires).log(tmp.add.base).times(tmp.add.gainMult).pow(tmp.add.gainExp).floor()
    },
    getNextAt() {
        if (player.points.lt(tmp.add.requires)) return tmp.add.requires
        return D(tmp.add.base).pow(tmp.add.getResetGain.add(1).pow(D(1).div(tmp.add.gainExp)).div(tmp.add.gainMult)).div(tmp.add.base).times(tmp.add.requires)
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
    resource() {return ["subtactiong poins", "subtraction points", "subtraction points"][options.text]}, // Name of prestige currency
    baseResource() {return ["adion poins", "addition points", "addition points"][options.text]}, // Name of resource prestige is based on
    exponent: 0.5,
    baseAmount() {return player.add.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        if (hasUpgrade('add', 21)) mult = mult.times(upgradeEffect('add', 21))
        if (hasUpgrade('sub', 11)) mult = mult.times(upgradeEffect('sub', 11))
        if (hasUpgrade('sub', 21)) mult = mult.times(upgradeEffect('sub', 21))
        if (hasUpgrade('gar', 13)) mult = mult.times(upgradeEffect('gar', 11))
        if (hasMilestone('rat', 16)) mult = mult.times(milestoneEffect('rat', 16))
        if (hasMilestone('div', 17)) mult = mult.times(milestoneEffect('div', 17))
        if (player.V.boost.eq(0)) mult = mult.times(tmp.V.timeEffect.asm)
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
        {key: "s", description: "S: Reset for Subtraction Points", onPress(){if (canReset(this.layer)) doReset(this.layer)&&player.universe.eq(0)}, unlocked() {return player.universe.eq(0)}}
    ],
    passiveGeneration() {
        if (hasMilestone('div', 1)) return D(0.5)
        return 0
    },
    upgrades: {
        11: {
            title() {return ["negatvt", "Negativity", "Negativity"][options.text]},
            description() {return ["dis tee's updat multipi sub amt.", "Multiply Subtraction gain by this tree's updates.", "Multiply Subtraction gain by this tree's updates."][options.text]},
            effect() {return player.add.version},
            unlocked() {return hasMilestone('rat', 3)},
            cost() {return D(5)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        12: {
            title() {return ["negatv numbra", "Negative Number", "Negative Number"][options.text]},
            description() {return ["[upg]+1 multipi chaleng powa gain.", "Boost Challenge Power gain by [upgrades]+1.", "Multiply Challenge Power gain by [upgrades]+1."][options.text]},
            effect() {return D(player.sub.upgrades.length).add(1)},
            unlocked() {return hasMilestone('rat', 3)},
            cost() {return D(10)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        13: {
            title() {return ["reduc", "Reduce", "Reduce"][options.text]},
            description() {return ["dvid ratonl's cos wif upg+1.", "Divide Rational's cost by [upgrades]+1.", "Divide Rational's cost by [upgrades]+1."][options.text]},
            effect() {return D(player.sub.upgrades.length).add(1)},
            unlocked() {return hasMilestone('rat', 3)},
            cost() {return D(20)},
            effectDisplay() {return "/"+format(upgradeEffect(this.layer, this.id))},
        },
        21: {
            title() {return "<0"},
            tooltip() {return "Effect Formula: log<sub>10</sub>[Subtraction Points+1]+1"},
            description() {return ["bost sub amt basd on itsef.", "Boost Subtraction gain based on Subtraction.", "Multiply Subtraction gain based on Subtraction Points."][options.text]},
            effect() {return player.sub.points.max(0).add(1).log10().add(1)},
            unlocked() {return hasMilestone('div', 16)},
            cost() {return D(5e12)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        22: {
            title() {return ["invers", "Inverse","Inverse"][options.text]},
            tooltip() {return "Effect Formula: log<sub>2</sub>[Subtraction Points+1]+1"},
            description() {return ["bost adtiong amt badson sub.", "Boost Addition gain based on Subtraction.", "Multiply Addition gain based on Subtraction."][options.text]},
            effect() {return player.sub.points.max(0).add(1).log2().add(1)},
            unlocked() {return hasMilestone('div', 16)},
            cost() {return D(1e14)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        23: {
            title() {return "-|x|"},
            tooltip() {return "Effect Formula: [Cost Divider]<sup>0.1</sup>"},
            description() {return ["bost poin gain bsdon rationgl cos dividaaaaa, bcaz they usles now.", "Boost point gain based on Rational cost dividers [they're useless now].", "Multiply point gain based on Rational cost dividers [Since they're useless now]."][options.text]},
            effect() {return tmp.rat.gainMult.pow(-0.1).max(1)},
            unlocked() {return hasMilestone('div', 16)},
            cost() {return D(5e14)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
    },
    buyables: {
        11: {
            title() {return ["subtactiong bost+", "Subtraction Boost+", "Subtraction Boost+"][options.text]},
            display() {
                if(options.text==0) return "each mak ad req -0.1 and bos poin gain by 1.5<br>cos: "+format(this.cost())+" subtaciong poins<br>lvl: "+formatWhole(getBuyableAmount(this.layer, this.id))+"/9<br>ffec: -"+format(this.effect().d)+", "+format(this.effect().p)+"x"
                if(options.text==1) return "Subtract Addition Requirement by 0.1 and Boost Point gain by 1.5 per level<br>Cost: "+format(this.cost())+" Subtraction Points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"/9<br>Effect: -"+format(this.effect().d)+", "+format(this.effect().p)+"x"
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
    resource() {return ["multipatong poins", "multiplication points", "multiplication points"][options.text]}, // Name of prestige currency
    baseResource() {return ["adion poins", "addition points", "addition points"][options.text]}, // Name of resource prestige is based on
    exponent: 0.5,
    baseAmount() {return player.add.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        if (hasMilestone('rat', 2)) mult = mult.times((hasMilestone('rat', 4)) ? player.rat.best.max(2) : 2)
        if (hasUpgrade('add', 32)) mult = mult.times(upgradeEffect('add', 32))
        if (hasMilestone('rat', 14)) mult = mult.times(milestoneEffect('rat', 14))
        if (hasMilestone('rat', 19)) mult = mult.times(milestoneEffect('rat', 19))
        if (hasMilestone('div', 19)) mult = mult.times(milestoneEffect('div', 19))
        if (hasMilestone('pla', 4)) mult = mult.times(milestoneEffect('pla', 4))
        if (hasMilestone('gar', 3)) mult = mult.times(milestoneEffect('gar', 3))
        if (hasMilestone('expo', 1)) mult = mult.times(milestoneEffect('expo', 1))
        if (hasUpgrade('shift', 12)) mult = mult.times(upgradeEffect('shift', 12).M)
        if (hasMilestone('shift', 0)) mult = mult.times(milestoneEffect('shift', 0))
        if (hasMilestone('recur', 0)) mult = mult.times(milestoneEffect('recur', 0))
        if (hasUpgrade('inc', 14)) mult = mult.times(upgradeEffect('inc', 14))
        if (player.V.boost.eq(0)) mult = mult.times(tmp.V.timeEffect.asm)
        mult = mult.times(tmp.div.effect)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = D(1)
        if (hasUpgrade('mul', 22)) exp = exp.times(tmp.expo.effect)
        return exp
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
        return [", " + format(tmp.mul.effect) + "x to poin gain bas", ",  which boost point gain base by " + format(tmp.mul.effect) + "x",", translated to a " + format(tmp.mul.effect) + "x boost to point gain base"][options.text]
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
            title() {return ["her coms da kikr", "Here comes the kicker", "Here comes the kicker"][options.text]},
            tooltip() {if (player.add.version.gte(2)) return "Multiply This effect by 2 per this tree's update starting at 2"},
            description() {
                return "Increase Point gain base by 0.2."},
            effect() {return D(0.2).times((player.add.version.gte(2)) ? D(2).pow(player.add.version.sub(1)) : 1)},
            cost() {return D(1)},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        12: {
            title() {return ["tim tabls", "Time Tables", "Time Tables"][options.text]},
            description() {
                if (hasUpgrade('add', 21)) return ["bos adong gain wif dis tre's updat.", "Boost addition gain by this tree's updates.", "Multiply addition gain by this tree's updates."][options.text]
                return ["dubl adion gain.", "Double addition gain.", "Double addition gain."][options.text]},
            effect() {
                if (hasUpgrade('add', 21)) return player.add.version
                return D(2)},
            cost() {return D(1)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        13: {
            title() {return ["tim 2 by", "Time to Buy", "Time to Buy"][options.text]},
            description() {return ["[upg]+1 bosts poin gain, unloc adion byabl.", "Boost point gain by [upgrades]+1, Unlock an addition buyable.", "Multiply point gain by [upgrades]+1, Unlock an addition buyable."][options.text]},
            effect() {return D(player.mul.upgrades.length).add(1)},
            cost() {return D(2)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        21: {
            title() {return ["limles adtion", "Limitless Additional", "Limitless Additional"][options.text]},
            description() {
                return "You may buy Additional Boost past 100 except its cost scales, Improve Time Energy's 5th boost."},
            unlocked() {return hasMilestone('expo', 6)},
            cost() {return D(1e48)},
        },
        22: {
            title() {return ["mul mul mul mul", "Repeating Multiplication", "Repeating Multiplication"][options.text]},
            description() {
                return "Raise Multiplication gain by Exponential Layer's effect."},
            unlocked() {return hasMilestone('expo', 6)},
            cost() {return D(1e50)},
        },
        23: {
            title() {return ["markiler", "Incremental Multiplier", "Incremental Multiplier"][options.text]},
            description() {
                return "Multiply Incremental Point gain based on Multiplication."},
            effect() {return player.mul.points.max(1).log2().add(1)},
            unlocked() {return hasMilestone('expo', 6)},
            cost() {return D(4e57)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
    },
    buyables: {
        11: {
            title() {return ["multcativ bos", "Multiplicative Boost", "Multiplicative Boost"][options.text]},
            purchaseLimit() {
                return D(100)},
            display() {
                let base = "1.25"
                if (hasMilestone('expo', 6)) base = "2"
                if(options.text==0) return "each bo adion gain wif "+base+"<br>cos: "+format(this.cost())+" multapaton Points<br>lvl: "+formatWhole(getBuyableAmount(this.layer, this.id))+"/100<br>efec: "+format(this.effect())+"x"
                if(options.text==1) return "Boost addition gain by "+base+" per level<br>Cost: "+format(this.cost())+" Multiplication Points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"/100<br>Effect: "+format(this.effect())+"x"
                return "Multiply addition gain by "+base+" per level<br>Cost: "+format(this.cost())+" Multiplication Points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"/100<br>Effect: "+format(this.effect())+"x"
            },
            effect(x) {
                if (hasMilestone('expo', 6)) return D(2).pow(x)
                return D(1.25).pow(x)},
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
    resource() {return ["ratonl poins", "rational points", "rational points"][options.text]}, // Name of prestige currency
    baseResource: "addition points", // Name of resource prestige is based on
    exponent: 0.5,
    baseAmount() {return player.add.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        if (hasUpgrade('sub', 13)) mult = mult.div(upgradeEffect('sub', 13))
        if (hasMilestone('div', 0)) mult = mult.div(milestoneEffect('div', 0))
        if (hasMilestone('div', 16)) mult = mult.div(milestoneEffect('div', 16))
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
        return [", x" + format(tmp.rat.effect) + " to aditon gain.", ", which boost addition gain by " + format(tmp.rat.effect) + "x.", ", translated to a " + format(tmp.rat.effect) + "x boost to addition gain."][options.text]
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
            requirementDescription() {return ["1 ratonl", "1 Rational", "1 Rational Point"][options.text]},
            done() {return player[this.layer].best.gte(1)},
            effectDescription() {return ["ceil da sub bos+'s efec numba 2.", "Ceiling the Subtraction Boost+'s 2nd effect (round up).", "Ceiling the Subtraction Boost+'s second effect (round up)."][options.text]},
            },
        1: {
                requirementDescription() {return ["2 ratonl", "2 Rationals", "2 Rational Points"][options.text]},
                done() {return player[this.layer].best.gte(2)},
                effect() {return Decimal.pow(1.2, player.rat.points.max(0))},
                effectDescription() {
                    if (hasMilestone('rat', 4)) return ["ratonl bost adion efec, each ratonl poin gain*1.2, Currently: ", "Boost Addition effect by Rational, Each Rational Boosts Point gain by 1.2, Currently: ", "Multiply Addition effect by Rational Points, Multiply Point gain by 1.2 per Rational Points, Currently: "][options.text]+format(this.effect())+"x"
                    return ["dubl adion efec, each ratonl poin gain*1.2, Currently: ", "Double Addition effect, Each Rational Boosts Point gain by 1.2, Currently: ", "Double Addition effect, Multiply Point gain by 1.2 per Rational Points, Currently: "][options.text]+format(this.effect())+"x"},
            },
        2: {
                requirementDescription() {return ["3 ratonl", "3 Rationals", "3 Rational Points"][options.text]},
                done() {return player[this.layer].best.gte(3)},
                tooltip() {return "Effect Formula: 1.1<sup>ln[subtraction points]<sup>0.5</sup></sup>"},
                effect() {
                    let pow = D(1)
                    if (hasMilestone('rat', 12)) pow = pow.times(milestoneEffect('rat', 12))
                    return Decimal.pow(1.1, player.sub.points.max(0).add(1).ln().pow(0.5)).pow(pow)},
                effectDescription() {
                    if (hasMilestone('rat', 4)) return ["bos multa gain wif ratonl, bost poin gain basd om subtaton, Currently: ", "Boost Multiplication gain by Rational, Multiply Point gain based on Subtraction, Currently: ", "Multiply Multiplication gain by Rational Points, Multiply Point gain based on Subtraction points, Currently: "][options.text]+format(this.effect())+"x"
                    return ["dubl multa gain, bost poin gain basd om subtaton, Currently: ", "Double Multiplication gain, Boost Point gain based on Subtraction, Currently: ", "Double Multiplication gain, Multiply Point gain based on Subtraction points, Currently: "][options.text]+format(this.effect())+"x"
                },
            },
        3: {
                requirementDescription() {return ["4 ratonl", "4 Rationals", "4 Rational Points"][options.text]},
                done() {return player[this.layer].best.gte(4)},
                effectDescription() {
                    if (hasMilestone('rat', 4)) return ["Boost Point gain by Rational Points, unlok 3 sub upgs.", "Boost Point gain by Rational Points, Unlock 3 Subtraction Upgrades.", "Multiply Point gain by Rational Points, Unlock 3 Subtraction Upgrades."][options.text]
                    return ["dubl poin gain, Unlock 3 unlok 3 sub upgs.", "Double Point gain, Unlock 3 Subtraction Upgrades.", "Double Point gain, Unlock 3 Subtraction Upgrades."][options.text]},
            },
        4: {
                requirementDescription() {return ["5 ratonl", "5 Rationals", "5 Rational Points"][options.text]},
                unlocked() {return player.a.trees.gte(1)},
                done() {return player[this.layer].best.gte(5)},
                effectDescription() {return ["3 pevous milstons' ffec #1 betr, bost chal powr gain wid ratonl.", "Improve 3 Previous Milestones' first effect, Boost Challenge Power gain by Rational.", "Improve 3 Previous Milestones' first effect, Multiply Challenge Power gain by Rational Points."][options.text]},
            },
        5: {
                requirementDescription() {return ["6 ratonl", "6 Rationals", "6 Rational Points"][options.text]},
                unlocked() {return player.a.trees.gte(1)},
                done() {return player[this.layer].best.gte(6)},
                effect() {
                    return Decimal.pow(2, getBuyableAmount('add', 11).div(5).floor())},
                effectDescription() {return ["dubl adiong bos's efct everi 5 levels, Currently: ", "Double Additional Boost's effect every 5 levels, Currently: ", "Double Additional Boost's effect per 5 levels, Currently: "][options.text]+format(this.effect())+"x"},
            },
        6: {
                requirementDescription() {return ["7 ratonl", "7 Rationals", "7 Rational Points"][options.text]},
                unlocked() {return player.a.trees.gte(1)},
                done() {return player[this.layer].best.gte(7)},
                effect() {
                    return Decimal.pow(2, player.rat.best)},
                effectDescription() {return ["evert ratonl haf raton's coss, Currently: /", "Each Rational Half Rational's Cost, Currently: /", "Half Rational's Cost per Rational Points, Currently: /"][options.text]+format(this.effect())},
            },
        7: {
                requirementDescription() {return ["8 ratonl", "8 Rationals", "8 Rational Points"][options.text]},
                unlocked() {return player.a.trees.gte(1)},
                done() {return player[this.layer].best.gte(8)},
                effect() {
                    return player.rat.best.max(1)},
                effectDescription() {return ["unloc mult byalb, bos ad amt wif ratonl.", "Unlock a Multiplication Buyable, Boost Addition gain by Rational.", "Unlock a Multiplication Buyable, Multiply Addition gain by Rational Points."][options.text]},
            },
        8: {
                requirementDescription() {return ["9 ratonl", "9 Rationals", "9 Rational Points"][options.text]},
                unlocked() {return player.a.trees.gte(1)},
                done() {return player[this.layer].best.gte(9)},
                effectDescription() {return ["bost poin gain wid dis tre's updat.", "Boost Point gain by This tree's update.", "Multiply Point gain by This tree's update."][options.text]},
            },
        9: {
                requirementDescription() {return ["10 ratonl", "10 Rationals", "10 Rational Points"][options.text]},
                unlocked() {return player.a.trees.gte(1)},
                done() {return player[this.layer].best.gte(10)},
                toggles: [["add", "AB"]],
                effectDescription() {return ["autoby adiong bo an it fre.", "Autobuy Addition Boost and it's free.", "Autobuy Addition Boost and it doesn't spend anything."][options.text]},
            },
        10: {
                requirementDescription() {return ["11 ratonl", "11 Rationals", "11 Rational Points"][options.text]},
                unlocked() {return player.a.trees.gte(2)},
                done() {return player[this.layer].best.gte(11)},
                effect() {
                    return player.rat.best.max(1)},
                effectDescription() {return ["multipie ad an plan poin gain wif lnotar.", "Boost Addition and Plant point gain by Rational.", "Multiply Addition and Plant point gain by Rational Points."][options.text]},
            },
        11: {
                requirementDescription() {return ["12 ratonl", "12 Rationals", "12 Rational Points"][options.text]},
                unlocked() {return player.a.trees.gte(2)},
                done() {return player[this.layer].best.gte(12)},
                effect() {
                    return player.rat.best.max(1)},
                tooltip() {return "250*2<sup>[(x+1)<sup>2</sup>-(x+1)]/2</sup>/Dividers -> 250*2<sup>x<sup>1.5</sup></sup>"},
                effectDescription() {return ["divid divson's kos bi ratnol, chang raton ccos reci, buh al raon cos diver usles.", "Divide Division's Cost by Rational, Change Rational's Cost Formula, But Disable All Rational Dividers.", "Divide Division's Cost by Rational, Change Rational's Cost Formula, But Disable All Rational Dividers."][options.text]},
            },
        12: {
                requirementDescription() {return ["13 ratonl", "13 Rationals", "13 Rational Points"][options.text]},
                unlocked() {return player.a.trees.gte(2)},
                done() {return player[this.layer].best.gte(13)},
                tooltip() {return "Effect Formula: (x<sup>2</sup>/100)+1, This effect hardcapped at 30 Rational Points."},
                effect() {
                    return player.rat.best.max(0).min(30).pow(2).div(100).add(1)},
                effectDescription() {return ["bo 3rd ratonl milson's ffec #2 baon rtaon, Currently: ^", "Raise 3rd Rational Milestone's Second Effect based on Rational, Currently: ^", "Raise 3rd Rational Milestone's Second Effect based on Rational Points, Currently: ^"][options.text]+format(milestoneEffect('rat', 12))},
            },
        13: {
                requirementDescription() {return ["14 ratonl", "14 Rationals", "14 Rational Points"][options.text]},
                unlocked() {return player.a.trees.gte(2)},
                done() {return player[this.layer].best.gte(14)},
                effect() {
                    return player.rat.best.max(1)},
                effectDescription() {return ["div plan cods wiff raton.", "Divide Plant cost by Rational.", "Divide Plant cost by Rational points."][options.text]},
            },
        14: {
                requirementDescription() {return ["15 ratonl", "15 Rationals", "15 Rational Points"][options.text]},
                tooltip() {return "Effect Formula: log<sub>10</sub>[Multiplication]+1"},
                unlocked() {return player.a.trees.gte(2)},
                done() {return player[this.layer].best.gte(15)},
                effect() {
                    return player.mul.points.max(1).log10().add(1)},
                effectDescription() {return ["bo mul gain basn mul, Currently: ", "Boost Multiplication gain based on multiplication, Currently: ", "Multiply Multiplication gain based on Multiplication, Currently: "][options.text]+format(milestoneEffect(this.layer, this.id))+"x"},
            },
        15: {
                requirementDescription() {return ["16 ratonl", "16 Rationals", "16 Rational Points"][options.text]},
                unlocked() {return player.a.trees.gte(2)},
                done() {return player[this.layer].best.gte(16)},
                effect() {
                    return player.rat.best.max(1)},
                effectDescription() {return ["bo T1 gain wif ratonl.", "Boost Tier 1 gain by Rational.", "Multiply Tier 1 gain by Rational Points."][options.text]},
            },
        16: {
                requirementDescription() {return ["17 ratonl", "17 Rationals", "17 Rational Points"][options.text]},
                unlocked() {return player.a.trees.gte(2)},
                done() {return player[this.layer].best.gte(17)},
                effect() {
                    return player.rat.best.max(1)},
                effectDescription() {return ["rationl bo sub amt.", "Boost Subtraction gain by Rational.", "Multiply Subtraction gain by Rational Points."][options.text]},
            },
        17: {
                requirementDescription() {return ["18 ratonl", "18 Rationals", "18 Rational Points"][options.text]},
                tooltip() {return "Effect Formula: log<sub>20</sub>([Point]+20)"},
                unlocked() {return player.a.trees.gte(2)},
                done() {return player[this.layer].best.gte(18)},
                effect() {
                    return player.points.max(0).add(20).log(20)},
                effectDescription() {return ["bobo pt gian depn on pts, Currently: ", "Boost Point gain based on Points, Currently: ", "Multiply Point gain based on Points, Currently: "][options.text]+format(this.effect())+"x"},
            },
        18: {
                requirementDescription() {return ["19 ratonl", "19 Rationals", "19 Rational Points"][options.text]},
                tooltip() {return "Effect Formula: log<sub>2</sub>(["+makeBlue("t")+"]+2)"},
                unlocked() {return player.a.trees.gte(2)},
                done() {return player[this.layer].best.gte(19)},
                effect() {
                    return player.III.t.add(2).log(2)},
                effectDescription() {return ["bo ad gin bason ", "Boost Addition gain based on ", "Multiply Addition gain based on "][options.text]+makeBlue("t")+", Currently: "+format(this.effect())+"x"},
            },
        19: {
                requirementDescription() {return ["20 ratonl", "20 Rationals", "20 Rational Points"][options.text]},
                tooltip() {return "Effect Formula: log<sub>3</sub>(["+makeBlue("t")+"]+3)"},
                unlocked() {return player.a.trees.gte(2)},
                done() {return player[this.layer].best.gte(20)},
                effect() {
                    return player.III.t.add(3).log(3)},
                effectDescription() {return ["bo mul gin bason ", "Boost Multiplication gain based on ", "Multiply Multiplication gain based on "][options.text]+makeBlue("t")+", Currently: "+format(this.effect())+"x"},
            },
    },
    autoPrestige() {return hasMilestone('expo', 5)},
    resetsNothing() {return hasMilestone('expo', 5)},
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
    resource() {return ["exponen poins", "exponential points", "exponential points"][options.text]}, // Name of prestige currency
    baseResource() {return ["rat an div poin", "rational and division points", "rational and division points"][options.text]}, // Name of resource prestige is based on
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
        return [", ^" + format(tmp.expo.effect) + " to pt gain.", ", which raise point gain to the ^" + format(tmp.expo.effect) + " power.", ", translated to a ^" + format(tmp.expo.effect) + " boost to point gain."][options.text]
    },
    doReset(l) {
        if (!(layers[l].row > this.row)) return
        
        let keep = ['milestones']
        if (player.universe.eq(0)){layerDataReset(this.layer, keep)}
    },
    hotkeys: [
        {key: "E", description: "E: Reset for Exponential Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.universe.eq(1)}, unlocked() {return player.universe.eq(0)}}
    ],
    milestones: {
        0: {
            requirementDescription() {return ["1 expont", "1 Exponential", "1 Exponential Point"][options.text]},
            done() {return player[this.layer].best.gte(1)},
            effect() {
                return player[this.layer].best.pow_base(2)},
            effectDescription() {return ["dulb ad gain eac expont.", "Double Addition gain per exponential.", "Double Addition gain per exponential points."][options.text]},
            },
        1: {
                requirementDescription() {return ["2 expont", "2 Exponentials", "2 Exponential Points"][options.text]},
                done() {return player[this.layer].best.gte(2)},
                effect() {
                    return player[this.layer].best.pow_base(2)},
                effectDescription() {return ["dulb mul gain eac expont.", "Double Multiplication gain per exponential.", "Double Multiplication gain per exponential points."][options.text]},
            },
        2: {
                requirementDescription() {return ["3 expont", "3 Exponentials", "3 Exponential Points"][options.text]},
                done() {return player[this.layer].best.gte(3)},
                effect() {
                    return player[this.layer].best.pow_base(2)},
                effectDescription() {return ["dulb plan pont gain eac expont.", "Double Plant point gain per exponential.", "Double Plant point gain per exponential points."][options.text]},
            },
        3: {
                requirementDescription() {return ["4 expont", "4 Exponentials", "4 Exponential Points"][options.text]},
                done() {return player[this.layer].best.gte(4)},
                effect() {
                    return player[this.layer].best.pow_base(2)},
                effectDescription() {return ["halv divisong cuz eac expont.", "Half Division cost per exponential points.", "Half Division cost per exponential points."][options.text]},
            },
        4: {
                requirementDescription() {return ["5 expont", "5 Exponentials", "5 Exponential Points"][options.text]},
                done() {return player[this.layer].best.gte(5)},
                effectDescription() {return ["xpot afec adion.", "This layer's effect affect Addition gain.", "Raise Addition gain to the this layer's effect."][options.text]},
            },
        5: {
                requirementDescription() {return ["6 expont", "6 Exponentials", "6 Exponential Points"][options.text]},
                done() {return player[this.layer].best.gte(6)},
                effectDescription() {return ["auto rta an /.", "Automate Rational and Division.", "Automate Rational and Division."][options.text]},
            },
        6: {
                requirementDescription() {return ["7 expont", "7 Exponentials", "7 Exponential Points"][options.text]},
                done() {return player[this.layer].best.gte(7)},
                unlocked() {return player.I.version.gte(4)},
                effectDescription() {return ["3 new tim upg, mor mult bos bas.", "Unlock 3 new Multiplication Upgrades, Increase Multiplicative Boost base.", "Unlock 3 new Multiplication Upgrades, Increase Multiplicative Boost base."][options.text]},
            },
        7: {
                requirementDescription() {return ["8 expont", "8 Exponentials", "8 Exponential Points"][options.text]},
                done() {return player[this.layer].best.gte(8)},
                effect() {
                    return player[this.layer].best.pow_base(2)},
                    unlocked() {return player.I.version.gte(4)},
                effectDescription() {return ["dulb tim engi gain eac expont.", "Double Time Energy gain per exponential.", "Double Time Energy gain per exponential points."][options.text]},
            },
        8: {
                requirementDescription() {return ["9 expont", "9 Exponentials", "9 Exponential Points"][options.text]},
                done() {return player[this.layer].best.gte(9)},
                unlocked() {return player.I.version.gte(4)},
                effectDescription() {return ["xpo afecc timothy energy.", "This layer's effect affect Time energy gain.", "Raise Time Energy gain to the this layer's effect."][options.text]},
            },
        9: {
                requirementDescription() {return ["10 expont", "10 Exponentials", "10 Exponential Points"][options.text]},
                done() {return player[this.layer].best.gte(10)},
                unlocked() {return player.I.version.gte(4)},
                effectDescription() {return ["xpo afecc chal enery.", "This layer's effect affect Challenge Power gain.", "Raise Challenge Power gain to the this layer's effect."][options.text]},
            },
        10: {
                requirementDescription() {return ["11 expont", "11 Exponentials", "11 Exponential Points"][options.text]},
                done() {return player[this.layer].best.gte(11)},
                unlocked() {return player.I.version.gte(4)},
                effectDescription() {return ["xpo afecc one gain.", "This layer's effect affect Tier 1 gain.", "Raise Tier 1 gain to the this layer's effect."][options.text]},
            },
        11: {
                requirementDescription() {return ["12 expont", "12 Exponentials", "12 Exponential Points"][options.text]},
                done() {return player[this.layer].best.gte(12)},
                effect() {
                    return player[this.layer].best.pow_base(2)},
                    unlocked() {return player.I.version.gte(4)},
                effectDescription() {return ["dulb +- gain eac expon.", "Double Positive and Negative gain per Exponential.", "Double Positive and Negative gain per Exponential Points."][options.text]},
            },
        12: {
                requirementDescription() {return ["13 expont", "13 Exponentials", "13 Exponential Points"][options.text]},
                done() {return player[this.layer].best.gte(13)},
                unlocked() {return player.I.version.gte(4)},
                effectDescription() {return ["expon do pon gan bas.", "This layer's effect affects Point gain base.", "Raise Point gain base to the this layer's effect."][options.text]},
            },
        13: {
                requirementDescription() {return ["14 expont", "14 Exponentials", "14 Exponential Points"][options.text]},
                done() {return player[this.layer].best.gte(14)},
                unlocked() {return player.I.version.gte(4)},
                effectDescription() {return ["expon do plapon gan bas.", "This layer's effect affects Plant point gain.", "Raise Plant point gain to the this layer's effect."][options.text]},
            },
    },
    layerShown(){return player.add.version.gte(6)&&(player.universe.eq(0))},
    getResetGain() {
        if (tmp.expo.baseAmount.lt(tmp.expo.getNextAt)) return D(0)
        return D(1)
    },
    getNextAt() {
        let base = D(20).add(player.expo.points.times(10)).add(player.expo.points.sub(9).max(0).times(player.expo.points.sub(8).max(0)).div(2))
        return base
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
    resource() {return ["divisong poins", "division points", "division points"][options.text]}, // Name of prestige currency
    baseResource() {return ["multipatong poins", "multiplication points", "multiplication points"][options.text]}, // Name of resource prestige is based on
    base: 3,
    exponent: 1.25,
    resetsNothing() {return hasMilestone('expo', 5)},
    baseAmount() {return player.mul.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1).div(challengeEffect('III', 22))
        if (hasMilestone('expo', 3)) mult = mult.div(milestoneEffect('expo', 3))
        if (hasMilestone('div', 5)) mult = mult.div(milestoneEffect('div', 5))
        if (hasMilestone('div', 18)) mult = mult.div(milestoneEffect('div', 18))
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
            requirementDescription() {return ["1 divisong", "1 Division", "1 Division Point"][options.text]},
            effect() {return D(2).pow(player.div.best)},
            done() {return player[this.layer].best.gte(1)},
            effectDescription() {return ["haf raonl caus par divi, Currently: /", "Half Rational Cost per Division, Currently: /", "Half Rational Cost per Division point, Currently: /"][options.text]+format(this.effect())},
            },
        1: {
                requirementDescription() {return ["2 divisong", "2 Divisions", "2 Division Points"][options.text]},
                done() {return player[this.layer].best.gte(2)},
                effectDescription() {return ["get 50% sub n mul gain/s.", "Gain 50% of row 2 resources gain per second.", "Passively gain 50% of row 2 resources gain per second."][options.text]},
            },
        2: {
                requirementDescription() {return ["3 divisong", "3 Divisions", "3 Division Points"][options.text]},
                effect() {return D(2).pow(player.div.best)},
                done() {return player[this.layer].best.gte(3)},
                effectDescription() {return ["ever divison dublb poin gain, Currently: ", "Double Point gain per Division, Currently: ", "Double Point gain per Division point, Currently: "][options.text]+format(this.effect())+"x"},
            },
        3: {
                requirementDescription() {return ["4 divisong", "4 Divisions", "4 Division Points"][options.text]},
                effect() {return player.div.best.pow(1.5).max(1)},
                done() {return player[this.layer].best.gte(4)},
                effectDescription() {return ["divon<sup>1.5</sup> bos ad gain, Currently: ", "Boost Addition gain by Division<sup>1.5</sup>, Currently: ", "Multiply Addition gain by [Division points]<sup>1.5</sup>, Currently: "][options.text]+format(this.effect())+"x"},
            },
        4: {
                requirementDescription() {return ["5 divisong", "5 Divisions", "5 Division Points"][options.text]},
                effect() {return player.div.best.max(1)},
                done() {return player[this.layer].best.gte(5)},
                effectDescription() {return ["disong bos pon gan, Currently: ", "Boost Point gain by Division, Currently: ", "Multiply Point gain by Division points, Currently: "][options.text]+format(this.effect())+"x"},
            },
        5: {
                requirementDescription() {return ["6 divisong", "6 Divisions", "6 Division Points"][options.text]},
                effect() {return player.div.best.max(1)},
                done() {return player[this.layer].best.gte(6)},
                effectDescription() {return ["Dvson deewide div kos, Currently: /", "Divide Division Cost by Division, Currently: /", "Divide Division Cost by Division points, Currently: /"][options.text]+format(this.effect())},
            },
        6: {
                requirementDescription() {return ["7 divisong", "7 Divisions", "7 Division Points"][options.text]},
                done() {return player[this.layer].best.gte(7)},
                effectDescription() {return ["kep upg and bybl in prev layrs.", "Keep Upgrades and Buyables in Previous Layers.", "Keep Upgrades and Buyables in Previous Layers."][options.text]},
            },
        7: {
                requirementDescription() {return ["8 divisong an luf 1.2", "8 Divisions and Le Underrated Forest v1.2", "8 Division Points and Le Underrated Forest v1.2"][options.text]},
                effect() {return player.div.best.max(1)},
                unlocked() {return player.a.trees.gte(2)},
                done() {return player[this.layer].best.gte(8)&&player.a.trees.gte(2)},
                effectDescription() {return ["3 more ad upg, bost plan pon gain wif div.", "Unlock 3 new Addition Upgrades, Boost Plant Point gain by Division.", "Unlock 3 new Addition Upgrades, Multiply Plant Point gain by Division points."][options.text]},
            },
        8: {
                requirementDescription() {return ["9 divisong", "9 Divisions", "9 Division Points"][options.text]},
                unlocked() {return player.a.trees.gte(2)},
                effect() {return player.div.best.max(1)},
                done() {return player[this.layer].best.gte(9)},
                effectDescription() {return ["divson bo t2 gain.", "Boost Tier 2 gain by Division.", "Multiply Tier 2 gain by Division points."][options.text]},
            },
        9: {
                requirementDescription() {return ["10 divisong", "10 Divisions", "10 Division Points"][options.text]},
                unlocked() {return player.a.trees.gte(2)},
                effect() {return player.div.best.max(1)},
                done() {return player[this.layer].best.gte(10)},
                effectDescription() {return ["diwid plan kuz wid dvson.", "Divide Plant Cost by Division.", "Divide Plant Cost by Division points."][options.text]},
            },
        10: {
                requirementDescription() {return ["11 divisong", "11 Divisions", "11 Division Points"][options.text]},
                unlocked() {return player.a.trees.gte(2)},
                effect() {return player.div.best.max(1)},
                done() {return player[this.layer].best.gte(11)},
                effectDescription() {return ["divi bo plan po gan.", "Boost Plant Point gain by Division.", "Multiply Plant Point gain by Division points."][options.text]},
            },
        11: {
                requirementDescription() {return ["12 divisong", "12 Divisions", "12 Division Points"][options.text]},
                unlocked() {return player.a.trees.gte(2)},
                effect() {return player.div.best.max(1)},
                done() {return player[this.layer].best.gte(12)},
                effectDescription() {return ["bo porw chal gain whif divsogng.", "Boost Challenge Power gain by Division.", "Multiply Challenge Power gain by Division points."][options.text]},
            },
        12: {
                requirementDescription() {return ["13 divisong", "13 Divisions", "13 Division Points"][options.text]},
                unlocked() {return player.a.trees.gte(2)},
                effect() {return player.add.best.max(1).log10().add(1)},
                done() {return player[this.layer].best.gte(13)},
                effectDescription() {return ["adion bost adon gain, Currently: ", "Boost Addition gain based on Addition, Currently: ", "Multiply Addition gain based on Addition points, Currently: "][options.text]+format(milestoneEffect(this.layer, this.id))+"x"},
            },
        13: {
                requirementDescription() {return ["14 divisong", "14 Divisions", "14 Division Points"][options.text]},
                unlocked() {return player.a.trees.gte(2)},
                effect() {return player.div.best.max(1)},
                done() {return player[this.layer].best.gte(14)},
                effectDescription() {return ["divso bo ad eff.", "Boost Addition effect by Division.", "Multiply Addition effect by Division points."][options.text]},
            },
        14: {
                requirementDescription() {return ["15 divisong", "15 Divisions", "15 Division Points"][options.text]},
                unlocked() {return player.a.trees.gte(2)},
                effect() {return player.div.best.max(1)},
                done() {return player[this.layer].best.gte(15)},
                effectDescription() {return ["div bo t1 gain.", "Boost Tier 1 gain by Division.", "Multiply Tier 1 gain by Division points."][options.text]},
            },
        15: {
                requirementDescription() {return ["16 divisong", "16 Divisions", "16 Division Points"][options.text]},
                unlocked() {return player.a.trees.gte(2)},
                effect() {return getBuyableAmount('add', 11).max(1)},
                done() {return player[this.layer].best.gte(16)},
                effectDescription() {return ["adiong bo lvl bost ad gain.", "Boost Addition gain by Additional Boost Level.", "Multiply Addition gain by Additional Boost Level."][options.text]},
            },
        16: {
                requirementDescription() {return ["17 divisong", "17 Divisions", "17 Division Points"][options.text]},
                unlocked() {return player.a.trees.gte(2)},
                effect() {return player.div.best.max(1)},
                done() {return player[this.layer].best.gte(17)},
                effectDescription() {return ["3 new sub upg.", "Unlock 3 more Subtraction Upgrades.", "Unlock 3 more Subtraction Upgrades."][options.text]},
            },
        17: {
                requirementDescription() {return ["18 divisong", "18 Divisions", "18 Division Points"][options.text]},
                unlocked() {return player.a.trees.gte(2)},
                effect() {return player.div.best.max(1)},
                done() {return player[this.layer].best.gte(18)},
                effectDescription() {return ["div boot subn gain.", "Boost Subtraction gain by Division.", "Multiply Subtraction gain by Division points."][options.text]},
            },
        18: {
                requirementDescription() {return ["19 divisong", "19 Divisions", "19 Division Points"][options.text]},
                unlocked() {return player.a.trees.gte(2)&&player.add.version.gte(6)},
                effect() {return player.expo.best.max(1)},
                done() {return player[this.layer].best.gte(19)},
                effectDescription() {return ["xpo deedeevidvide di v cosy.", "Divide Division cost by Exponential.", "Divide Division cost by Exponential points."][options.text]},
            },
        19: {
                requirementDescription() {return ["20 divisong", "20 Divisions", "20 Division Points"][options.text]},
                unlocked() {return player.a.trees.gte(2)},
                effect() {return getBuyableAmount('mul', 11).max(1)},
                done() {return player[this.layer].best.gte(20)},
                effectDescription() {return ["multa bos levl bost mul gain.", "Boost Multiplication gain by Multiplicative Boost Level.", "Multiply Multiplication gain by Multiplicative Boost Level."][options.text]},
            },
    },
    autoPrestige() {return hasMilestone('expo', 5)},
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
        if (hasMilestone('V', 0)) mult = mult.times(milestoneEffect('V', 0))
        if (inChallenge('II', 22)) mult = D(0)
        if (player.V.boost.eq(8)) mult = mult.times(tmp.V.timeEffect.t1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let base = D(1)
        if (hasMilestone('expo', 10)) base = base.times(tmp.expo.effect)
        return base
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
        return D(1).add(player.I.points.pow(0.4).div(20)).min(1e40)
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
                if (inChallenge('IV', 31)) mult = mult.times(0)
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
                if (inChallenge('II', 11)||inChallenge('IV', 31)) enable = D(0)
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
        return ["v0.0", "v0.1", "v0.2", "v0.3", "v1.0", "v1.0"]
    },
    layerShown(){return player.universe.eq(1)},
    update(diff) {
        player.chalpow = player.chalpow.add(getChalPowGen().times(diff)).min(D(2).pow(1024))
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
        if (player.V.boost.eq(5)) mult = mult.times(tmp.V.timeEffect.t2)
        mult = mult.times(tmp.IV.ChalRew.T)
        if (!inChallenge('V', 22)) mult = mult.times(challengeEffect('V', 22))
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
        return D(1).add(player.II.points.pow(0.5).div(20)).min(1e40)
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
            rewardEffect() {return D(challengeCompletions('II', 22)).div(50).add(1).times(inChallenge('IV', 32) ? 0 : 1)},
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
                effectDescription() {return "Passively gain 50% of Tier 1 gain per second."},
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
        if (hasMilestone('V', 1)) mult = mult.div(milestoneEffect('V', 1))
        if (player.V.boost.eq(6)) mult = mult.div(tmp.V.timeEffect.t3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    onPrestige() {
        if (!tmp.III.resetsNothing) {player.chalpow = D(0)}
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
                    ["display-text",function() {if (hasMilestone('III', 0)) return "You have "+formatWhole(tmp.III.allowvar.sub(tmp.III.varsum))+"/"+formatWhole(tmp.III.allowvar)+" Varible points to put into your variables"}],
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
    resetsNothing() {return hasMilestone('IV', 0)},
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
        base = base.times(tmp.IV.PNBN.pb)
        base = base.div(tmp.IV.PNBN.nn)
        if (hasChallenge('IV', 42)) base = base.times(challengeEffect('IV', 42))
        if (hasChallenge('IV', 51)) base = base.times(challengeEffect('IV', 51))
        if (player.V.boost.eq(3)) base = base.times(tmp.V.timeEffect.dt)
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
        if (inChallenge('IV', 21)) return false
        if (inChallenge('III', 21)) return player.III.b.pow(2).sub(D(4).times(player.III.a).times(player.III.c)).gte(0)
        if (inChallenge('III', 12)) return player.III.a.times(2).sub(player.III.b).sub(player.III.c).gte(0)
        return true
    },
    milestones: {
        0: {
            requirementDescription: "1 Tier 3 Power",
            done() {return player[this.layer].best.gte(1)},
            effectDescription() {return "Unlock <b>f("+makeBlue("t")+")</b> and Passively gain 50% of Tier 2 gain."},
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
        if (inChallenge('IV', 52)) return D(5)
        return D(10).add(tmp.IV.ChalRew.L)
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
    autoPrestige() {return hasMilestone('V', 0)},
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
addLayer("IV", {
    name: "Tier 4", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "IV", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: D(0),
        best: D(0),
        pos: D(0),
        neg: D(0)
    }},
    color: "#FFC0CB",
    requires() {return D(1e10)}, // Can be a function that takes requirement increases into account
    resource: "Tier 4 Power", // Name of prestige currency
    baseResource: "Tier 2 Power", // Name of resource prestige is based on
    exponent: D(0.2),
    baseAmount() {return player.II.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        mult = mult.times(tmp.IV.PNBN.nb)
        mult = mult.div(tmp.IV.PNBN.pn)
        if (player.V.boost.eq(4)) mult = mult.times(tmp.V.timeEffect.t4)
        if (hasMilestone('V', 4)) mult = mult.times(milestoneEffect('V', 4))
        if (hasChallenge('IV', 41)) mult = mult.times(challengeEffect('IV', 41))
        if (hasChallenge('IV', 52)) mult = mult.times(challengeEffect('IV', 52))
        if (!inChallenge('V', 21)) mult = mult.times(challengeEffect('V', 21))
        if (inChallenge('IV', 22)) mult = mult.div(20)
        mult = mult.times(tmp.V.ChallengesCompletions.add(1).pow(hasMilestone('V', 8) ? player.V.points.max(1) : D(1)))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        if (inChallenge('IV', 51)) return D(0.5)
        return D(1)
    },
    onPrestige() {
        player.chalpow = D(0)
    },
    branches: ["II"],
    row: 2, // Row the layer is in on the tree (0 is the first row)
    passiveGeneration() {
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
                    ["display-text",function() {return "You have "+format(player.IV.pos)+"/"+format(tmp.IV.PNLim.p)+" Positive points, translated to a "+format(tmp.IV.PNBN.pb)+"x boost to "+makeBlue("dt")+", a /"+format(tmp.IV.PNBN.pn)+" nerf to tier 4 gain."}],
                    ["display-text",function() {return "You have "+format(player.IV.neg)+"/"+format(tmp.IV.PNLim.n)+" Negative points, translated to a "+format(tmp.IV.PNBN.nb)+"x boost to tier 4 gain, a /"+format(tmp.IV.PNBN.nn)+" nerf to "+makeBlue("dt")+"."}],
                    ["display-text",function() {return "NOTE:Increase tier 3 variables limit by 1 and Multiply Tier 2 gain by 2 per challenge and multiply Positive and Negative gain by This tree's update, Currently: +"+formatWhole(tmp.IV.ChalRew.L)+", "+format(tmp.IV.ChalRew.T)+"x"}],
                    "blank",
                    "blank",
                    "buyables",
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
        {key: "4", description: "4: Reset for Tier 4 Power", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.universe.eq(1)}}
    ],
    effect() {
        return D(1).add(player.IV.points.pow(0.4).div(10)).min(1e40)
    },
    effectDescription() {
        return ", translated to a "+format(tmp.IV.effect)+"x boost to point and challenge power gain"
    },
    ChalRew() {
        return {
            L: D(Object.values(player[this.layer].challenges).reduce((a,b) => a+b)).max(0),
            T: D(2).pow(Object.values(player[this.layer].challenges).reduce((a,b) => a+b))}
    },
    PNBN() {
        let PB = player.IV.pos.max(0).pow(0.4).div(20).add(1)
        let PN = player.IV.pos.max(0).pow(0.2).div(20).add(1)
        let NB = player.IV.neg.max(0).pow(0.4).div(20).add(1)
        let NN = player.IV.neg.max(0).pow(0.2).div(20).add(1)
        if (hasChallenge('IV', 31)) PB = PB.times(5)
        if (hasChallenge('IV', 31)) PN = PN.div(5)
        if (hasChallenge('IV', 32)) NB = NB.times(5)
        if (hasChallenge('IV', 32)) NN = NN.div(5)
        if (hasChallenge('IV', 21)) PB = PB.pow(1.25)
        if (hasChallenge('IV', 21)) NB = NB.pow(1.25)
        if (hasChallenge('IV', 22)) PN = PN.pow(0.8)
        if (hasChallenge('IV', 22)) NN = NN.pow(0.8)
        if (inChallenge('IV', 61)) PB = PB.pow(0)
        if (inChallenge('IV', 62)) NB = NB.pow(0)
        return {
            pb:PB.max(1),
            pn:PN.max(1),
            nb:NB.max(1),
            nn:NN.max(1),
        }
    },
    PNgain() {
        let P = D(2).pow(challengeCompletions(this.layer, 11).add(1)).times(challengeCompletions(this.layer, 11).max(0)).times(player.I.version.max(1))
        let N = D(2).pow(challengeCompletions(this.layer, 12).add(1)).times(challengeCompletions(this.layer, 12).max(0)).times(player.I.version.max(1))
        if (hasMilestone('IV', 3)) P = P.times(D(2).pow(getBuyableAmount('IV', 11)))
        if (hasMilestone('IV', 3)) N = N.times(D(2).pow(getBuyableAmount('IV', 11)))
        if (inChallenge('IV', 41)) P = P.div(D(2).pow(player.IV.pos.max(1).log(10)))
        if (inChallenge('IV', 42)) N = N.div(D(2).pow(player.IV.neg.max(1).log(10)))
        if (hasChallenge('IV', 51)) P = P.times(2)
        if (hasChallenge('IV', 51)) N = N.times(2)
        if (hasChallenge('IV', 52)) P = P.times(2)
        if (hasChallenge('IV', 52)) N = N.times(2)
        if (hasChallenge('IV', 61)) P = P.times(challengeEffect('IV', 61))
        if (hasChallenge('IV', 62)) N = N.times(challengeEffect('IV', 62))
        if (hasMilestone('V', 2)) P = P.times(milestoneEffect('V', 2))
        if (hasMilestone('V', 2)) N = N.times(milestoneEffect('V', 2))
        if (hasMilestone('expo', 11)) P = P.times(milestoneEffect('expo', 11))
        if (hasMilestone('expo', 11)) N = N.times(milestoneEffect('expo', 11))
        return {
            p:P,
            n:N
        }
    },
    PNLim() {
        let P = D(100).times(buyableEffect('IV', 11).L)
        let N = D(100).times(buyableEffect('IV', 11).L)
        return {
            p:P,
            n:N
        }
    },
    buyables: {
        11: {
            title() {return "Limit Break"},
            display() {
                return "Multiply positive and negative limit by 100 and challenge power gain by 10 per level<br>Cost: "+format(this.cost())+" Positive and Negative Points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect().L)+"x, "+format(this.effect().C)+"x"
            },
            effect(x) {
                return {
                L:D(100).pow(x),
                C:D(10).pow(x)}},
            unlocked() {return true},
            tooltip() {return "Cost Formula: 100<sup>x+1</sup>"},
            cost(x) {let base = D(100).pow(x.add(1))
                return base
            },
            buy() {
                let cost = D(1)
                if (!hasMilestone('V', 1)){player.IV.pos = D(0)
                player.IV.neg = D(0)}
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.IV.pos.min(player.IV.neg).gte(this.cost())
            },
        },
    },
    automate() {
        if (hasMilestone('V', 1)) buyBuyable('IV', 11)
    },
    challenges: {
        11: {
            name: "Positive",
            onEnter() {player.chalpow = D(0)},
            unlocked() {return hasMilestone('IV', 0)},
            challengeDescription() {return "No Nerfs.<br>Completions: "+formatWhole(challengeCompletions(this.layer, 11))+"/20"},
            goal() {
                if (hasMilestone('IV', 2)) return D(3).pow(challengeCompletions(this.layer, this.id))
                return D(4).pow(challengeCompletions(this.layer, this.id))},
            goalDescription() {return "Reach "+format(this.goal())+" Tier 4 Power"},
            completionLimit() {return D(20)},
            rewardEffect() {return tmp.IV.PNgain.p},
            rewardDescription() {return "Start Generating Positive Points, Currently: +"+format(challengeEffect(this.layer, this.id))+"/s"},
            canComplete: function() {return player.IV.points.gte(this.goal())},
        },
        12: {
            name: "Negative",
            onEnter() {player.chalpow = D(0)},
            unlocked() {return hasMilestone('IV', 0)},
            challengeDescription() {return "No Nerfs.<br>Completions: "+formatWhole(challengeCompletions(this.layer, 12))+"/20"},
            goal() {
                if (hasMilestone('IV', 2)) return D(3).pow(challengeCompletions(this.layer, this.id))
                return D(4).pow(challengeCompletions(this.layer, this.id))},
            goalDescription() {return "Reach "+format(this.goal())+" Tier 4 Power"},
            completionLimit() {return D(20)},
            rewardEffect() {return tmp.IV.PNgain.n},
            rewardDescription() {return "Start Generating Negative Points, Currently: +"+format(challengeEffect(this.layer, this.id))+"/s"},
            canComplete: function() {return player.IV.points.gte(this.goal())},
        },
        21: {
            name: "Buff Boost",
            onEnter() {
                player.chalpow = D(0)
                player.III.ft = D(0)
                player.III.t = D(0)
            },
            unlocked() {return hasMilestone('IV', 1)},
            challengeDescription() {return "You can't gain f("+makeBlue("t")+"). [Completing this challenge will increase the Nerf Decrease Goal]"},
            goal() {
                if (hasChallenge('IV', 22)) return D(1e13)
                return D(2e12)
            },
            goalDescription() {return "Reach "+format(this.goal())+" Tier 2 Power"},
            completionLimit() {return D(1)},
            rewardEffect() {return D(1.25)},
            rewardDescription() {return "Raise Postive and Negative points's Buffs to the 1.25th power."},
            canComplete: function() {return player.II.points.gte(this.goal())},
        },
        22: {
            name: "Nerf Decrease",
            onEnter() {
                player.chalpow = D(0)
                player.IV.points = D(0)
            },
            unlocked() {return hasMilestone('IV', 1)},
            challengeDescription() {return "Divide tier 4 gain by 20. [Completing this challenge will increase the Buff Boost Goal]"},
            goal() {
                if (hasChallenge('IV', 21)) return D(5)
                return D(1)
            },
            goalDescription() {return "Reach "+format(this.goal())+" Tier 4 Power"},
            completionLimit() {return D(1)},
            rewardEffect() {return D(1.25)},
            rewardDescription() {return "Raise Postive and Negative points's Nerfs to the 1.25th root."},
            canComplete: function() {return player.IV.points.gte(this.goal())},
        },
        31: {
            name: "Starlight",
            onEnter() {
                player.chalpow = D(0)
                player.IV.points = D(0)
            },
            unlocked() {return hasMilestone('IV', 2)},
            challengeDescription() {return "Slow it down and Or Be Square are disabled. [Completing this challenge will increase the Black Hole Goal]"},
            goal() {
                if (hasChallenge('IV', 32)) return D(3e3)
                return D(1e3)
            },
            goalDescription() {return "Reach "+format(this.goal())+" Tier 4 Power"},
            completionLimit() {return D(1)},
            rewardEffect() {return D(5)},
            rewardDescription() {return "Multiply Positive Buff and Divide Positive Nerf by 5."},
            canComplete: function() {return player.IV.points.gte(this.goal())},
        },
        32: {
            name: "Black Hole",
            onEnter() {
                player.chalpow = D(0)
                player.IV.points = D(0)
            },
            unlocked() {return hasMilestone('IV', 2)},
            challengeDescription() {return "Multiply To Be Number 2's effect by 0. [Completing this challenge will increase the Starlight Goal]"},
            goal() {
                if (hasChallenge('IV', 31)) return D(3e3)
                return D(1e3)
            },
            goalDescription() {return "Reach "+format(this.goal())+" Tier 4 Power"},
            completionLimit() {return D(1)},
            rewardEffect() {return D(5)},
            rewardDescription() {return "Multiply Negative Buff and Divide Negative Nerf by 5."},
            canComplete: function() {return player.IV.points.gte(this.goal())},
        },
        41: {
            name: "Proton",
            onEnter() {
                player.chalpow = D(0)
                player.IV.pos = D(0)
                player.IV.neg = D(0)
            },
            unlocked() {return hasMilestone('IV', 3)},
            challengeDescription() {return "Resets Positive and Negative points, Divide Positive point gain by 2<sup>log<sub>10</sub>[Positive Points]</sup>, Currently: /"+format(D(2).pow(player.IV.pos.max(1).log(10)))+" [Completing this challenge will increase the Electron Goal]"},
            goal() {
                if (hasChallenge('IV', 42)) return D(5e8)
                return D(1e8)
            },
            goalDescription() {return "Reach "+format(this.goal())+" Postive Points"},
            completionLimit() {return D(1)},
            rewardEffect() {return D(2).pow(player.IV.pos.max(1).log10().div(5))},
            rewardDescription() {return "Multiply tier 4 gain based on positive points, Currently: "+format(challengeEffect(this.layer, this.id))+"x"},
            canComplete: function() {return player.IV.pos.gte(this.goal())},
        },
        42: {
            name: "Electron",
            onEnter() {
                player.chalpow = D(0)
                player.IV.pos = D(0)
                player.IV.neg = D(0)
            },
            unlocked() {return hasMilestone('IV', 3)},
            challengeDescription() {return "Resets Positive and Negative points, Divide Negative point gain by 2<sup>log<sub>10</sub>[Negative Points]</sup>, Currently: /"+format(D(2).pow(player.IV.neg.max(1).log(10)))+" [Completing this challenge will increase the Proton Goal]"},
            goal() {
                if (hasChallenge('IV', 41)) return D(5e8)
                return D(1e8)
            },
            goalDescription() {return "Reach "+format(this.goal())+" Negative Points"},
            completionLimit() {return D(1)},
            rewardEffect() {return D(2).pow(player.IV.neg.max(1).log10().div(5))},
            rewardDescription() {return "Multiply "+makeBlue("dt")+" based on negative points, Currently: "+format(challengeEffect(this.layer, this.id))+"x"},
            canComplete: function() {return player.IV.neg.gte(this.goal())},
        },
        51: {
            name: "Math Addict",
            onEnter() {
                player.chalpow = D(0)
                player.IV.points = D(0)
            },
            unlocked() {return getBuyableAmount('IV', 11).gte(5)},
            challengeDescription() {return "Square root Tier 4 gain. [Completing this challenge will increase the Strength Hunter Goal]"},
            goal() {
                if (hasChallenge('IV', 52)) return D(2e6)
                return D(5e5)
            },
            goalDescription() {return "Reach "+format(this.goal())+" Tier 4 Power"},
            completionLimit() {return D(1)},
            rewardEffect() {return D(3)},
            rewardDescription() {return "Multiply "+makeBlue("dt")+" by 3, Double Positive and Negative gain."},
            canComplete: function() {return player.IV.points.gte(this.goal())},
        },
        52: {
            name: "Strength Hunter",
            onEnter() {
                player.chalpow = D(0)
                player.III.a = D(0)
                player.III.b = D(0)
                player.III.c = D(0)
                player.III.ft = D(0)
                player.III.t = D(0)
            },
            unlocked() {return getBuyableAmount('IV', 11).gte(5)},
            challengeDescription() {return "All variables have a limit of 5. [Completing this challenge will increase the Math Addict Goal]"},
            goal() {
                if (hasChallenge('IV', 51)) return D(5e8)
                return D(1e8)
            },
            goalDescription() {return "Reach "+format(this.goal())+" f("+makeBlue("t")+")"},
            completionLimit() {return D(1)},
            rewardEffect() {return D(10)},
            rewardDescription() {return "Multiply tier 4 gain by 10, Double Positive and Negative gain."},
            canComplete: function() {return player.III.ft.gte(this.goal())},
        },
        61: {
            name: "+*0",
            onEnter() {
                player.chalpow = D(0)
                player.IV.points = D(0)
                player.III.a = D(0)
                player.III.b = D(0)
                player.III.c = D(0)
                player.III.ft = D(0)
                player.III.t = D(0)
            },
            unlocked() {return getBuyableAmount('IV', 11).gte(6)},
            challengeDescription() {return "Positive Buff is Disabled. [Completing this challenge will increase the -*0 Goal]"},
            goal() {
                if (hasChallenge('IV', 62)) return D(1e11)
                return D(1e10)
            },
            goalDescription() {return "Reach "+format(this.goal())+" Tier 4 Power"},
            completionLimit() {return D(1)},
            rewardEffect() {return player.IV.pos.max(0).add(10).log10()},
            rewardDescription() {return "Multiply Positive gain based on Positive Points, Currently: "+format(challengeEffect(this.layer, this.id))+"x"},
            canComplete: function() {return player.IV.points.gte(this.goal())},
        },
        62: {
            name: "-*0",
            onEnter() {
                player.chalpow = D(0)
                player.IV.points = D(0)
                player.III.a = D(0)
                player.III.b = D(0)
                player.III.c = D(0)
                player.III.ft = D(0)
                player.III.t = D(0)
            },
            unlocked() {return getBuyableAmount('IV', 11).gte(6)},
            challengeDescription() {return "Negative Buff is Disabled. [Completing this challenge will increase the +*0 Goal]"},
            goal() {
                if (hasChallenge('IV', 61)) return D(2e6)
                return D(5e5)
            },
            goalDescription() {return "Reach "+format(this.goal())+" Tier 4 Power"},
            completionLimit() {return D(1)},
            rewardEffect() {return player.IV.neg.max(0).add(10).log10()},
            rewardDescription() {return "Multiply Negative gain based on Negative Points, Currently: "+format(challengeEffect(this.layer, this.id))+"x"},
            canComplete: function() {return player.IV.points.gte(this.goal())},
        },
    },
    passiveGeneration() {
        if (hasMilestone('IV', 0)) return D(0.5)
        return 0
    },
    milestones: {
        0: {
            requirementDescription: "1 Tier 4 Power",
            done() {return player[this.layer].best.gte(1)},
            effectDescription() {return "Passively gain 50% of Tier 4 gain, Tier 3 resets nothing."},
            },
        1: {
            requirementDescription: "2 Limit Breaks",
            done() {return getBuyableAmount('IV', 11).gte(2)},
            effectDescription() {return "Unlock 2 new tier 4 challenges per Limit break starting at 2, ending at 6."},
            },
        2: {
            requirementDescription: "3 Limit Breaks",
            tooltip() {return "4<sup>x</sup> -> 3<sup>x</sup>"},
            done() {return getBuyableAmount('IV', 11).gte(3)},
            effectDescription() {return "Change Positive and Negative's Goal Formula."},
            },
        3: {
            requirementDescription: "4 Limit Breaks",
            done() {return getBuyableAmount('IV', 11).gte(4)},
            effectDescription() {return "Double Positive and Negative gain per Limit Break, Currently: "+format(D(2).pow(getBuyableAmount('IV', 11)))+"x"},
            },
    },
    layerShown(){return player.universe.eq(1)&&player.I.version.gte(3)},
    update(diff) {
        player.IV.pos = player.IV.pos.add(tmp.IV.PNgain.p.times(diff)).min(tmp.IV.PNLim.p)
        player.IV.neg = player.IV.neg.add(tmp.IV.PNgain.n.times(diff)).min(tmp.IV.PNLim.n)
    }
})
addLayer("V", {
    name: "Tier 5", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "V", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: D(0),
        best: D(0),
        timeEnergy: D(0),
        boost: D(0),
    }},
    color: "#FF0000",
    requires() {return D(1e10)}, // Can be a function that takes requirement increases into account
    resource: "Tier 5 Power", // Name of prestige currency
    baseResource: "Tier 4 Power", // Name of resource prestige is based on
    base: D(10),
    exponent: D(2),
    baseAmount() {return player.IV.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    onPrestige() {
        if (!hasMilestone('V', 4)) player.chalpow = D(0)
    },
    resetsNothing() {return hasMilestone('V', 4)},
    branches: ["III", "IV"],
    row: 3, // Row the layer is in on the tree (0 is the first row)
    passiveGeneration() {
        return 0
    },
    ChallengesCompletions() {
        return D(Object.values(player[this.layer].challenges).reduce((a,b) => a+b))
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
                    ["display-text",function() {return "You have "+format(player.V.timeEnergy)+" Time Energy, You currently have "+formatWhole(tmp.V.Unlocked)+" choices of boosts to choose."}],
                    ["row",[["display-text",function() {return "Your Time Energy and Tier 4 gain is multiplied by "+formatWhole(tmp.V.ChallengesCompletions.add(1).pow(hasMilestone('V', 8) ? player.V.points.max(1) : D(1)))+". ([Tier 5 Challenges Completions]+1)"}]]],
                    ["row",[["display-text",function() {return "You're currently choosing the "+tmp.V.Ordinal[player.V.boost]+" boost."}]]],
                    ["row", [["clickable", 11], ["clickable", 12]]],
                    "blank",
                    ["row",[["display-text",function() {return "Lists of Boosts:<br>"+format(tmp.V.timeEffect.asm)+"x boost to Addition, Subtraction, Multiplication gain"}]]],
                    ["row",[["display-text",function() {return format(tmp.V.timeEffect.pot)+"x boost to Points gain"}]]],
                    ["row",[["display-text",function() {return format(tmp.V.timeEffect.cp)+"x boost to Challenge Power gain"}]]],
                    ["row",[["display-text",function() {return format(tmp.V.timeEffect.dt)+"x boost to "+makeBlue("dt")}]]],
                    ["row",[["display-text",function() {return format(tmp.V.timeEffect.t4)+"x boost to Tier 4 gain"}]]],
                    ["row",[["display-text",function() {if (tmp.V.Unlocked.gte(6)) return format(tmp.V.timeEffect.t2)+"x boost to Tier 2 gain"}]]],
                    ["row",[["display-text",function() {if (tmp.V.Unlocked.gte(7)) return "/"+format(tmp.V.timeEffect.t3)+" discount to Tier 3 cost"}]]],
                    ["row",[["display-text",function() {if (tmp.V.Unlocked.gte(8)) return format(tmp.V.timeEffect.inc)+"x boost to Incremental Points gain"}]]],
                    ["row",[["display-text",function() {if (tmp.V.Unlocked.gte(9)) return format(tmp.V.timeEffect.t1)+"x boost to Tier 1 gain"}]]],
                    "blank",
                    "blank",
                    "buyables",
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
        {key: "5", description: "5: Reset for Tier 5 Power", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.universe.eq(1)}}
    ],
    effect() {
        return player.V.points.add(1).pow(player.V.points.add(1))
    },
    effectDescription() {
        return ", translated to a "+format(tmp.V.effect)+"x boost to point and challenge power gain"
    },
    timeEffect() {
        let ti4 = player.V.timeEnergy.max(0).add(10).log10().pow(2)
        if (hasUpgrade('mul', 21)) ti4 = player.V.timeEnergy.max(0).add(10).log10().pow_base(1.4)
        return {
            asm: player.V.timeEnergy.max(0).add(1).log10().pow_base(2).min(1e100), // Addtion, Subtraction, Multiplication Gain.
            pot: player.V.timeEnergy.max(0).add(1).log10().pow_base(3).min(1e100), // Point gain.
            cp: player.V.timeEnergy.max(0).add(1).pow(player.V.timeEnergy.max(10).log10().pow(0.5).min(4)).min(softcap(player.V.timeEnergy.max(1).log10(), D(100), D(0.25)).pow_base(10).max(1e100).min(1e200)), // Challenge Power Gain.
            dt: player.V.timeEnergy.max(0).add(1).pow(0.5).min(1e100), // dt.
            t4: ti4, // Tier 4 gain.
            t2: player.V.timeEnergy.max(0).add(10).log10().pow(5), // Tier 2 gain.
            t3: player.V.timeEnergy.max(0).add(10).log10().pow(1.6), // Tier 3 cost.
            inc: player.V.timeEnergy.max(0).add(10).log10().pow_base(1.1), // Tier 3 cost.
            t1: player.V.timeEnergy.max(0).add(2).log2().pow(10), // Tier 1 gain.
        }
    },
    Unlocked() {
        return D(5).add(challengeCompletions('V', 11).min(10).div(2).floor())
    },
    TimeChamber() {
        let base = player.chalpow.max(0).add(1).log10().sub(50).pow_base(1.6).times(challengeEffect('V', 11))
        if (!inChallenge('V', 21)) base = base.times(challengeEffect('V', 21))
        if (!inChallenge('V', 22)) base = base.times(challengeEffect('V', 22))
        if (!inChallenge('V', 31)) base = base.times(challengeEffect('V', 31))
        if (inChallenge('V', 32)) base = player.chalpow.max(0).add(1).log10().sub(50).pow_base(1.6).times(challengeEffect('V', 11))
        if (hasUpgrade('inc', 63)) base = base.times(upgradeEffect('inc', 63))
        if (hasMilestone('expo', 7)) base = base.times(milestoneEffect('expo', 7))
        base = base.times(tmp.V.ChallengesCompletions.max(0).add(1).pow(hasMilestone('V', 8) ? player.V.points.max(1) : D(1)))
        if (hasMilestone('expo', 8)) base = base.pow(tmp.expo.effect)
        if (inChallenge('V', 22)) base = base.pow(1/3)
        if (inChallenge('V', 21)) base = base.div(challengeCompletions('V', 21).pow_base(10))
        base = base.pow(challengeEffect('V', 32))
        return base
    },
    Nerfed() {
        return player.V.timeEnergy.max(10).log10().pow(challengeCompletions('V', 31).div(4).add(1))
    },
    Ordinal() {
        return ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"]
    },
    clickables: {
        11: {
            title() {return "<"},
            tooltip() {return "This will force a tier 5 reset."},
            display() {return "Choose Previous Boost"},
            unlocked() {return player.V.points.gte(1)},
            canClick() {return player.V.boost.gt(0)},
            onClick() {
                doReset(this.layer, true)
                if (!hasMilestone('V', 4)) player.chalpow = D(0)
                player.V.boost = player.V.boost.sub(1)
            },
        },
        12: {
            title() {return ">"},
            tooltip() {return "This will force a tier 5 reset."},
            display() {return "Choose Next Boost"},
            unlocked() {return player.V.points.gte(1)},
            canClick() {return player.V.boost.lt(tmp.V.Unlocked.sub(1))},
            onClick() {
                doReset(this.layer, true)
                if (!hasMilestone('V', 4)) player.chalpow = D(0)
                player.V.boost = player.V.boost.add(1)
            },
        },
    },
    challenges: {
        11: {
            name: "The Time Chamber.",
            onEnter() {player.chalpow = D(0)},
            unlocked() {return hasMilestone('V', 0)},
            challengeDescription() {return "Generate time energy per second based on challenge power, Currently: +"+format(tmp.V.TimeChamber)+"/s<br>Completions: "+formatWhole(challengeCompletions('V', 11))+"/10"},
            goal() {
                return D(2).pow(challengeCompletions('V', 11).add(1).pow(3))
            },
            goalDescription() {return "Reach "+format(this.goal())+" Time Energy"},
            completionLimit() {return D(10)},
            rewardEffect() {return challengeCompletions('V', 11).pow(2).pow_base(2)},
            rewardDescription() {return "Each 2 Completion adds a new boost choice to time energy and Double Time Energy gain per Completion<sup>2</sup>, Currently: "+format(challengeEffect('V', 11))+"x"},
            canComplete: function() {return player.V.timeEnergy.gte(this.goal())},
        },
        21: {
            name: "Divide yet again.",
            onEnter() {player.chalpow = D(0)
                player.V.timeEnergy = D(0)
            },
            unlocked() {return hasMilestone('V', 3)},
            countsAs: [11],
            challengeDescription() {return "Stuck in The Time Chamber, Divide Time Energy and Challenge Power gain by 10 per completions<br>Completions: "+formatWhole(challengeCompletions('V', 21))},
            goal() {
                return D(20).pow(challengeCompletions(this.layer, this.id)).pow(challengeCompletions(this.layer, this.id).div(10).floor().pow_base(2))
            },
            goalDescription() {return "Reach "+format(this.goal())+" Time Energy"},
            completionLimit() {return D(1e6)},
            rewardEffect() {return challengeCompletions('V', 21).pow_base(4)},
            rewardDescription() {return "Quadruple Time Energy and Tier 4 gain per Completion (works outside this challenge), Currently: "+format(challengeEffect('V', 21))+"x"},
            canComplete: function() {return player.V.timeEnergy.gte(this.goal())},
        },
        22: {
            name: "Square root's friend.",
            onEnter() {player.chalpow = D(0)
                player.V.timeEnergy = D(0)
            },
            unlocked() {return hasMilestone('V', 5)},
            countsAs: [11],
            challengeDescription() {return "Stuck in The Time Chamber, Cube root Time Energy and Challenge Power gain<br>Completions: "+formatWhole(challengeCompletions('V', 22))},
            goal() {
                return D(10).pow(challengeCompletions(this.layer, this.id)).pow(challengeCompletions(this.layer, this.id).div(10).floor().pow_base(2))
            },
            goalDescription() {return "Reach "+format(this.goal())+" Time Energy"},
            completionLimit() {return D(1e6)},
            rewardEffect() {return challengeCompletions('V', 22).pow_base(4)},
            rewardDescription() {return "Quadruple Time Energy and Tier 2 gain per Completion (works outside this challenge), Currently: "+format(challengeEffect('V', 22))+"x"},
            canComplete: function() {return player.V.timeEnergy.gte(this.goal())},
        },
        31: {
            name: "Get Nerfed.",
            onEnter() {player.chalpow = D(0)
                player.V.timeEnergy = D(0)
            },
            unlocked() {return hasMilestone('V', 5)},
            countsAs: [11],
            challengeDescription() {return "Stuck in The Time Chamber, Time Energy gain is nerfed based on Time Energy, Currently: /"+format(tmp.V.Nerfed)+"<br>Completions: "+formatWhole(challengeCompletions('V', 31))},
            goal() {
                return D(15).pow(challengeCompletions(this.layer, this.id)).pow(challengeCompletions(this.layer, this.id).div(10).floor().pow_base(2))
            },
            goalDescription() {return "Reach "+format(this.goal())+" Time Energy"},
            completionLimit() {return D(1e6)},
            rewardEffect() {return challengeCompletions('V', 31).div(4).pow_base(player.V.timeEnergy.max(0).add(2).log2())},
            rewardDescription() {return "Multiply Time Energy gain based on Time Energy per Completion (works outside this challenge), Currently: "+format(challengeEffect('V', 31))+"x"},
            canComplete: function() {return player.V.timeEnergy.gte(this.goal())},
        },
        32: {
            name: "Truly By Yourself.",
            onEnter() {player.chalpow = D(0)
                player.V.timeEnergy = D(0)
            },
            unlocked() {return hasMilestone('V', 5)},
            countsAs: [11],
            challengeDescription() {return "Stuck in The Time Chamber, \"Divide Yet Again\", \"Square root's friend\", \"Get Nerfed\"'s rewards are disabled.<br>Completions: "+formatWhole(challengeCompletions('V', 32))},
            goal() {
                return D(200).pow(challengeCompletions(this.layer, this.id)).pow(challengeCompletions(this.layer, this.id).div(10).floor().pow_base(1.5))
            },
            goalDescription() {return "Reach "+format(this.goal())+" Time Energy"},
            completionLimit() {return D(1e6)},
            rewardEffect() {return challengeCompletions('V', 32).pow(0.5).div(25).add(1)},
            rewardDescription() {return "Raise Time Energy gain based Completion, Currently: ^"+format(challengeEffect('V', 32))},
            canComplete: function() {return player.V.timeEnergy.gte(this.goal())},
        },
    },
    milestones: {
        0: {
            requirementDescription: "1 Tier 5 Power",
            tooltip() {return "Effect Formula: ([T5]+1)<sup>10</sup>"},
            effect() {return player.V.points.max(0).add(1).pow(10)},
            done() {return player[this.layer].best.gte(1)},
            effectDescription() {return "Automate Tier 3 gain, Multiply Tier 1 gain based on Tier 5 Power, Currently: "+format(milestoneEffect('V', 0))+"x"},
            },
        1: {
                requirementDescription: "2 Tier 5 Power",
                tooltip() {return "Effect Formula: ([T5]+1)<sup>5</sup>"},
                effect() {return player.V.points.max(0).add(1).pow(5)},
                done() {return player[this.layer].best.gte(2)},
                effectDescription() {return "Automate Limit Break, Divide Tier 3 cost based on Tier 5 Power, Currently: /"+format(milestoneEffect('V', 1))},
            },
        2: {
                requirementDescription: "3 Tier 5 Power",
                effect() {return player.V.points.max(0).pow_base(3)},
                done() {return player[this.layer].best.gte(3)},
                effectDescription() {return "Triple Positive and Negative Energy gain per Tier 5 Power, Currently: "+format(milestoneEffect('V', 2))+"x"},
            },
        3: {
                requirementDescription() {return format(1e30)+" Time Energy"},
                done() {return player[this.layer].timeEnergy.gte(1e30)},
                effectDescription() {return "Unlock your \"first\" tier 5 challenge. (Square its goal every 10 completions)"},
            },
        4: {
                requirementDescription: "4 Tier 5 Power",
                effect() {return player.V.points.max(0).pow_base(10)},
                done() {return player[this.layer].best.gte(4)},
                effectDescription() {return "Tier 5 resets nothing, Multiply Tier 4 gain by 10 per Tier 5 Power, Currently: "+format(milestoneEffect('V', 4))+"x"},
            },
        5: {
                requirementDescription: "5 Tier 5 Power",
                done() {return player[this.layer].best.gte(5)},
                effectDescription() {return "Unlock your \"second\" tier 5 challenge. (Square its goal every 10 completions)"},
            },
        6: {
                requirementDescription() {return format(1e32)+" Tier 4 Power"},
                effect() {return player.V.points.max(0).pow_base(2)},
                done() {return player.IV.points.gte(1e32)},
                effectDescription() {return "Unlock your \"third\" tier 5 challenge. (Square its goal every 10 completions)"},
            },
        7: {
                requirementDescription: "6 Tier 5 Power",
                done() {return player[this.layer].best.gte(6)},
                effectDescription() {return "Unlock your \"fourth\" tier 5 challenge. (Raise its goal to the 1.5th power every 10 completions)"},
            },
        8: {
                requirementDescription: "7 Tier 5 Power",
                done() {return player[this.layer].best.gte(7)},
                effectDescription() {return "Raise Tier 5 Challenge Completions' effect to the Tier 5 Power"},
            },
    },
    layerShown(){return player.universe.eq(1)&&player.I.version.gte(4)},
    update(diff) {
        if (inChallenge('V', 11)) player.V.timeEnergy = player.V.timeEnergy.add(tmp.V.TimeChamber.times(diff))
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
        auto: false,
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
        if (hasUpgrade('wild', 31)) mult = mult.div(upgradeEffect('wild', 31))
        if (hasUpgrade('wild', 63)) mult = mult.div(upgradeEffect('wild', 63))
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
        
        let keep = ['milestones', 'version', 'auto']
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
                if (hasUpgrade('pla', 74)) base = base.div(upgradeEffect('pla', 74))
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
                if (hasUpgrade('wild', 42)) base = base.div(upgradeEffect('wild', 42))
                base = base.div(buyableEffect('wild', 11).S)
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
            unlocked() {return hasUpgrade('pla', 63)&&(!inChallenge('zon', 22))},
            tooltip() {return "Cost Formula: 10*(x+1)*(x+2)"},
            cost(x) {
                let scale = D(10)
                if (hasUpgrade('pla', 72)) scale = scale.sub(upgradeEffect('pla', 72))
                if (hasUpgrade('gar', 35)) scale = scale.sub(upgradeEffect('gar', 35))
                let base = (x.add(1).times(x.add(2))).times(scale)
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
            unlocked() {return !inChallenge('zon', 22)},
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
            unlocked() {return !inChallenge('zon', 22)},
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
                return "Reduce Plant point Magnitude requirement base by 2, Multiply Plant point gain by 5.5 per update."},
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
            effect() {return player.planpts.max(0).add(1).log10().max(1).pow(0.1)},
            cost() {return D(81)},
            effectDisplay() {return "/"+format(upgradeEffect(this.layer, this.id))},
        },
        34: {
            title() {return "Chives"},
            unlocked() {return hasMilestone('gar', 2)},
            description() {
                return "Reduce Plant Magnitude requirement base by 2, Divide Plant Cost by 5.5 per update."},
            effect() {return D(5.5).pow(player.pla.version)},
            cost() {return D(84)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        35: {
            title() {return "Thyme"},
            tooltip() {return "Effect Formula: log<sub>10</sub>([Plant point gain]+10)"},
            unlocked() {return hasMilestone('gar', 2)&&(!inChallenge('zon', 22))},
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
            unlocked() {return challengeCompletions('zon', 11).gte(3)&&(!inChallenge('zon', 22))},
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
            unlocked() {return challengeCompletions('zon', 12).gte(2)&&(!inChallenge('zon', 22))},
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
            effectDisplay() {return "/"+format(upgradeEffect(this.layer, this.id))},
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
            unlocked() {return challengeCompletions('zon', 12).gte(3)&&(!inChallenge('zon', 22))},
            description() {
                return "Multiply Point and Plant point gain by 5 per Echinocactus."},
            effect() {return D(5).pow(getBuyableAmount('pla', 13).max(0))},
            cost() {return D(191)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        71: {
            title() {return "Wild Garlic"},
            tooltip() {return "Effect Formula: log<sub>5</sub>[Gardens+5]<sup>0.2</sup>"},
            unlocked() {return challengeCompletions('zon', 22).gte(1)},
            description() {
                return "Divide Garden Cost based on Garden."},
            effect() {return player.gar.points.max(0).add(5).log(5).pow(0.2)},
            cost() {return D(214)},
            effectDisplay() {return "/"+format(upgradeEffect(this.layer, this.id))},
        },
        72: {
            title() {return "Tree Fern"},
            tooltip() {return ""},
            unlocked() {return challengeCompletions('zon', 22).gte(2)},
            description() {
                return "Triple Plant point gain, Reduce Echinocactus Cost Scaling by 2.5 (10 -> 7.5)"},
            effect() {return D(2.5)},
            cost() {return D(224)},
            effectDisplay() {return "-"+format(upgradeEffect(this.layer, this.id))},
        },
        73: {
            title() {return "Blue Bells"},
            tooltip() {return "[Plants]<sup>0.4</sup> -> [Plants]<sup>0.5</sup>"},
            unlocked() {return challengeCompletions('zon', 22).gte(3)},
            description() {
                return "Double Plant point gain, Change Wildlife gain base Formula."},
            effect() {return D(2)},
            cost() {return D(237)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        74: {
            title() {return "Filmy Fern"},
            tooltip() {return "Effect Formula: [Effect]<sup>0.1</sup>"},
            unlocked() {return challengeCompletions('zon', 22).gte(3)&&hasUpgrade('wild', 51)},
            description() {
                return "Divide Prickly Pear's Cost based on Nutrients' first effect."},
            effect() {return D(buyableEffect('wild', 11).S).pow(0.1)},
            cost() {return D(283)},
            effectDisplay() {return "/"+format(upgradeEffect(this.layer, this.id))},
        },
    },
    automate() {
        if (player.pla.auto) {
            buyBuyable('pla', 11)
            buyBuyable('pla', 12)
            buyBuyable('pla', 13)
        }
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
addLayer("wild", {
    name: "wildlife", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: D(0),
        best: D(0),
        large: D(0),
    }},
    branches: ['pla', 'zon', 'gar'],
    color: "#0088AA",
    requires: D(233), // Can be a function that takes requirement increases into account
    resource: "wildlife", // Name of prestige currency
    baseResource: "plants", // Name of resource prestige is based on
    exponent: D(1),
    base: D(2),
    baseAmount() {return player.pla.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = player.pla.points.max(0).pow(0.4)
        if (hasUpgrade('pla', 73)) mult = player.pla.points.max(0).pow(0.5)
        if (hasUpgrade('wild', 21)) mult = mult.add(upgradeEffect('wild', 21))
        if (hasUpgrade('wild', 12)) mult = mult.times(upgradeEffect('wild', 12))
        if (hasUpgrade('wild', 13)) mult = mult.times(upgradeEffect('wild', 13))
        if (hasUpgrade('wild', 23)) mult = mult.times(upgradeEffect('wild', 23))
        if (hasUpgrade('wild', 32)) mult = mult.times(upgradeEffect('wild', 32))
        if (hasUpgrade('wild', 34)) mult = mult.times(upgradeEffect('wild', 34))
        if (hasUpgrade('wild', 41)) mult = mult.times(upgradeEffect('wild', 41))
        if (hasUpgrade('wild', 43)) mult = mult.times(upgradeEffect('wild', 43))
        if (hasUpgrade('wild', 44)) mult = mult.times(upgradeEffect('wild', 44))
        if (hasUpgrade('wild', 52)) mult = mult.times(upgradeEffect('wild', 52))
        if (hasUpgrade('wild', 62)) mult = mult.times(upgradeEffect('wild', 62))
        mult = mult.times(tmp.wild.effect.w)
        mult = mult.times(buyableEffect('wild', 11).W)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
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
                    ["display-text",function() {return "You keep Wildlife upgrades on reset."}],
                    "blank",
                    "buyables",
                    "upgrades",
            ]
        },
    },
    canBuyMax() {return false},
    effect() {
        let bas1 = player.wild.large.max(0).add(1).pow(0.25)
        let bas2 = player.wild.large.max(0).add(1).pow(0.1)
        if (hasUpgrade('wild', 54)) bas2 = bas2.pow(upgradeEffect('wild', 54))
        return {
            po:bas1,
            w:bas2
        }
    },
    effectDescription() {
        let base = ""
        let lw = "wildlife"
        if (hasUpgrade('wild', 33)) lw = "wildlife and larger wildlife"
        if (hasUpgrade('wild', 33)) base = "<br>You have "+formatWhole(player.wild.large)+" larger wildlife (+"+format(tmp.wild.LWgain)+"/s), translated to a "+format(tmp.wild.effect.po)+"x boost to plant point and point gain and a "+format(tmp.wild.effect.w)+"x boost to wildlife gain"
        return " (+"+format(tmp.wild.gainMult)+"/s), You start gaining wildlife when you have at least 233 plants. additionally, you're losing "+format(tmp.wild.DecayRate.times(100))+"% of "+lw+" per second"+base
    },
    doReset(l) {
        if (!(layers[l].row > this.row)) return
        
        let keep = ['milestones', 'upgrades']
        if (player.universe.eq(2)){layerDataReset(this.layer, keep)}
    },
    buyables:{
        11: {
            title() {return "Nutrients"},
            display() {
                return "Divide Saguro cost by "+format(tmp.wild.buyables[11].base.S)+" (based on plant points) and Multiply Wildlife gain by "+format(tmp.wild.buyables[11].base.W)+" per level<br>Only Reduces Large Wildlife by 10% of Cost.<br>Cost: "+format(this.cost())+" Larger Wildllife<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"/"+formatWhole(tmp.wild.buyables[11].purchaseLimit)+"<br>Effect: /"+format(this.effect().S)+", "+format(this.effect().W)+"x"
            },
            purchaseLimit() {return D(10)},
            base() {
                return {
                    S: player.planpts.max(0).add(1).log10().add(1),
                    W: D(1.1)
                }
            },
            effect(x) {
                return {
                    S: tmp.wild.buyables[11].base.S.pow(x),
                    W: tmp.wild.buyables[11].base.W.pow(x)
                }
            },
            unlocked() {return hasUpgrade('wild', 51)},
            tooltip() {return "Effect Formula: log<sub>10</sub>[Plant points+1]+1<br>Cost Formula: 20*(x/2+1)<sup>2</sup>"},
            cost(x) {let base = D(20).times(x.div(2).add(1).pow(2))
                return base.floor()
            },
            buy() {
                let cost = D(0.1)
                player.wild.large = player.wild.large.sub(this.cost().mul(cost)).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.wild.large.gte(this.cost())
            },
        },
    },
    upgrades:{
        11: {
            title() {return "Log Pile"},
            tooltip() {return "Effect Formula: [Wildlife+1]<sup>0.2</sup>"},
            unlocked() {return true},
            description() {
                return "Multiply plant point gain based on Wildlife."},
            effect() {return player.wild.points.max(0).add(1).pow(0.2)},
            cost() {return D(50)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        12: {
            title() {return "Pond"},
            tooltip() {return "Effect Formula: log<sub>20</sub>[Wildlife+1]+1"},
            unlocked() {return true},
            description() {
                return "Multiply Wildlife gain based on Wildlife."},
            effect() {return player.wild.points.max(0).add(1).log(20).add(1)},
            cost() {return D(50)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        13: {
            title() {return "Cave"},
            tooltip() {return "Effect Formula: (Magnitude/25)+1"},
            unlocked() {return true},
            description() {
                return "Multiply Wildlife gain based on Magnitude."},
            effect() {return tmp.pla.PPmag.div(25).add(1)},
            cost() {return D(40000)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        14: {
            title() {return "Meadow"},
            tooltip() {return "If you have Stronger Wildlife, Increase this cost."},
            unlocked() {return true},
            description() {
                return "Double Larger Wildlife gain."},
            effect() {return D(2)},
            cost() {return hasUpgrade('wild', 24) ? D(1.4e11) : D(9.6e8)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        21: {
            title() {return "Bigger Wildlife"},
            tooltip() {return "Effect Formula: [Garden]<sup>0.4</sup>"},
            unlocked() {return true},
            description() {
                return "Increase Wildlife gain base based on Garden."},
            effect() {return player.gar.points.pow(0.4)},
            cost() {return D(200)},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        22: {
            title() {return "Longer Wildlife"},
            tooltip() {return ""},
            unlocked() {return true},
            description() {
                return "Multiply Plant point gain by this tree's update, Reduce Wildlife Decaying rate to 5%."},
            effect() {return player.pla.version.max(1)},
            cost() {return D(500)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        23: {
            title() {return "Faster Wildlife"},
            tooltip() {return ""},
            unlocked() {return true},
            description() {
                return "Multiply Wildlife and Plant point gain by [Exploration Features Level]+1."},
            effect() {return getBuyableAmount('gar', 13).add(1)},
            cost() {return D(360000)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        24: {
            title() {return "Stronger Wildlife"},
            tooltip() {return "If you have Meadow, Increase this cost"},
            unlocked() {return true},
            description() {
                return "Multiply Wildlife gain after loss by 5."},
            effect() {return D(5)},
            cost() {return hasUpgrade('wild', 14) ? D(2e11) : D(9.6e8)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        31: {
            title() {return "Anteater"},
            tooltip() {return "Requires Log Pile and Bigger Wildlife<br>Effect Formula: [Wildlife+1]<sup>0.4</sup>"},
            canAfford() {return hasUpgrade('wild', 11)&&hasUpgrade('wild', 21)},
            unlocked() {return true},
            description() {
                return "Divide Plant cost based on Wildlife."},
            effect() {return player.wild.points.max(0).add(1).pow(0.4)},
            cost() {return D(350)},
            effectDisplay() {return "/"+format(upgradeEffect(this.layer, this.id))},
        },
        32: {
            title() {return "Hedgehog"},
            tooltip() {return "Requires Pond and Bigger Wildlife"},
            canAfford() {return hasUpgrade('wild', 12)&&hasUpgrade('wild', 21)},
            unlocked() {return true},
            description() {
                return "Multiply Wildlife gain by [Zones]+1."},
            effect() {return player.zon.points.max(0).add(1)},
            cost() {return D(1111)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        33: {
            title() {return "Bear"},
            tooltip() {return "Requires Cave and Bigger Wildlife<br>Effect Formula: [Wildlife]<sup>0.1</sup>"},
            canAfford() {return hasUpgrade('wild', 13)&&hasUpgrade('wild', 21)},
            unlocked() {return true},
            description() {
                return "Start Generating Larger Wildlife based on Wildlife."},
            effect() {return player.wild.points.pow(0.1)},
            cost() {return D(1.4e6)},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))+"/s"},
        },
        34: {
            title() {return "Roe Deer"},
            tooltip() {return "Requires Meadow and Bigger Wildlife<br>Effect Formula: log<sub>4</sub>[Plant Points+4]<sup>0.25</sup>"},
            canAfford() {return hasUpgrade('wild', 14)&&hasUpgrade('wild', 21)},
            unlocked() {return true},
            description() {
                return "Multiply Wildlife gain based on Plant points."},
            effect() {return player.planpts.max(0).add(4).log(4).pow(0.25)},
            cost() {return D(1.1e9)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        41: {
            title() {return "Woodlice"},
            tooltip() {return "Requires Log Pile and Longer Wildlife<br>Effect Formula: (log<sub>10</sub>[Plant Points+10]*log<sub>10</sub>[Wildlife+10])<sup>0.25</sup>"},
            canAfford() {return hasUpgrade('wild', 11)&&hasUpgrade('wild', 22)},
            unlocked() {return true},
            description() {
                return "Multiply Plant Point and Wildlife gain based on Plant Points and Wildlife."},
            effect() {return player.planpts.max(0).add(10).log10().times(player.wild.points.max(0).add(10).log10()).pow(0.25)},
            cost() {return D(6969)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        42: {
            title() {return "Dragonfly"},
            tooltip() {return "Requires Pond and Longer Wildlife<br>Effect Formula: [Wildlife+1]<sup>0.5</sup>*[Plants+1]"},
            canAfford() {return hasUpgrade('wild', 12)&&hasUpgrade('wild', 22)},
            unlocked() {return true},
            description() {
                return "Divide Saguro's cost based on Plants and Wildlife."},
            effect() {return player.pla.points.max(0).add(1).times(player.wild.points.max(0).add(1).pow(0.5))},
            cost() {return D(27000)},
            effectDisplay() {return "/"+format(upgradeEffect(this.layer, this.id))},
        },
        43: {
            title() {return "Olm"},
            tooltip() {return ""},
            unlocked() {return true},
            description() {
                return "Multiply Wildlife gain by [Upgrade]+1, Reduce Garden Buyable Cost Scaling by 2."},
            effect() {return D(player.wild.upgrades.length).add(1)},
            cost() {return D(2.8e6)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        44: {
            title() {return "Field Mouse"},
            tooltip() {return "Requires Meadow and Longer Wildlife"},
            canAfford() {return hasUpgrade('wild', 14)&&hasUpgrade('wild', 22)},
            unlocked() {return true},
            description() {
                return "Multiply Wildlife gain by [Nutrient Amount]+1."},
            effect() {return getBuyableAmount('wild', 11).add(1)},
            cost() {return D(4e9)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        51: {
            title() {return "Centipide"},
            tooltip() {return "Requires Log Pile and Faster Wildlife<br>Effect Formula: [Wildlife+1]<sup>0.1</sup>"},
            canAfford() {return hasUpgrade('wild', 11)&&hasUpgrade('wild', 23)},
            unlocked() {return true},
            description() {
                return "Multiply point gain based on Wildlife, Unlock a Larger Wildlife Buyable."},
            effect() {return player.wild.points.max(0).add(1).pow(0.1)},
            cost() {return D(88888888)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        52: {
            title() {return "Pond Skater"},
            tooltip() {return "Requires Pond and Faster Wildlife<br>Effect Formula: log<sub>10</sub>[Plants+10]"},
            canAfford() {return hasUpgrade('wild', 12)&&hasUpgrade('wild', 23)},
            unlocked() {return true},
            description() {
                return "Multiply Wildlife gain based on Plants."},
            effect() {return player.pla.points.max(0).add(10).log10()},
            cost() {return D(2e8)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        53: {
            title() {return "Rabbit"},
            tooltip() {return "Requires Cave and Faster Wildlife<br>Effect Formula: log<sub>10</sub>([Wildlife+10][Larger Wildlife+10])<sup>0.1</sup> (R:ab:bit)"},
            canAfford() {return hasUpgrade('wild', 13)&&hasUpgrade('wild', 23)},
            unlocked() {return true},
            description() {
                return "Divide Garden Cost based on Wildlife and Larger Wildlife."},
            effect() {return player.wild.points.max(0).add(10).times(player.wild.points.max(0).add(10)).log10().pow(0.1)},
            cost() {return D(696969696)},
            effectDisplay() {return "/"+format(upgradeEffect(this.layer, this.id))},
        },
        54: {
            title() {return "Kestral"},
            tooltip() {return "Requires Meadow and Faster Wildlife"},
            canAfford() {return hasUpgrade('wild', 14)&&hasUpgrade('wild', 23)},
            unlocked() {return true},
            description() {
                return "Raise Larger Wildlife's Second Effect to the 2.5th power."},
            effect() {return D(2.5)},
            cost() {return D(7.5e10)},
            effectDisplay() {return "^"+format(upgradeEffect(this.layer, this.id))},
        },
        61: {
            title() {return "Wood Ant"},
            tooltip() {return "Requires Log Pile and Stronger Wildlife"},
            canAfford() {return hasUpgrade('wild', 11)&&hasUpgrade('wild', 24)},
            unlocked() {return true},
            description() {
                return "Multiply wildlife gain after loss by 2, Lose 20% as much Wildlife and Larger Wildlife."},
            effect() {return D(2)},
            cost() {return D(1.03e9)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        62: {
            title() {return "Swan"},
            tooltip() {return "Requires Pond and Stronger Wildlife<br>Effect Formula: log<sub>10</sub>[Effect+10]<sup>0.5</sup>"},
            canAfford() {return hasUpgrade('wild', 12)&&hasUpgrade('wild', 24)},
            unlocked() {return true},
            description() {
                return "Multiply wildlife gain based on Saguro Effect."},
            effect() {return buyableEffect('pla', 12).max(0).add(10).log10().pow(0.5)},
            cost() {return D(1.2e10)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        63: {
            title() {return "Alligator"},
            tooltip() {return "Requires Cave and Stronger Wildlife"},
            canAfford() {return hasUpgrade('wild', 12)&&hasUpgrade('wild', 24)},
            unlocked() {return true},
            description() {
                return "Divide Plant cost by Larger Wildlife's First Effect."},
            effect() {return tmp.wild.effect.po},
            cost() {return D(1.111e11)},
            effectDisplay() {return "/"+format(upgradeEffect(this.layer, this.id))},
        },
    },
    layerShown(){return player.universe.eq(2)&&(challengeCompletions('zon', 22).gte(3)||player.wild.unlocked)},
    DecayRate() {
        let mult = D(1)
        if (hasUpgrade('wild', 61)) mult = mult.div(5)
        if (hasUpgrade('wild', 22)) return D(0.05).times(mult)
        return D(0.1).times(mult)},
    LWgain() {
        let gain = upgradeEffect('wild', 33)
        if (hasUpgrade('wild', 14)) gain = gain.times(upgradeEffect('wild', 14))
        return gain
    },
    ALM() {
        let base = D(1)
        if (hasUpgrade('wild', 24)) base = base.times(upgradeEffect('wild', 24))
        if (hasUpgrade('wild', 61)) base = base.times(upgradeEffect('wild', 61))
        return base
    },
    update(diff) {
        if (player.pla.points.gte(233)) {
            player.wild.unlocked = true
            player.wild.points = player.wild.points.add(tmp.wild.gainMult.sub(player.wild.points.times(tmp.wild.DecayRate)).times(diff).times(tmp.wild.ALM)).min(tmp.wild.gainMult.div(tmp.wild.DecayRate)).max(0)
            player.wild.best = player.wild.points.max(player.wild.best)
        }
        if (hasUpgrade('wild', 33)) {
            player.wild.large = player.wild.large.add(tmp.wild.LWgain.sub(player.wild.large.times(tmp.wild.DecayRate)).times(diff)).min(tmp.wild.LWgain.div(tmp.wild.DecayRate)).max(0)
        }
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
    branches: ['pla', 'gar'],
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
            toggles: [["pla", "auto"]],
            effectDescription() {return "Auto buy Plant Buyables, and they don't spend anything."},
            },
        3: {
            requirementDescription: "4 Zones",
            done() {return player[this.layer].best.gte(4)},
            effectDescription() {return "Unlock Zone 3: The Temperate Zone."},
            },
        4: {
                requirementDescription: "The Plant Tree Original v3.0",
                done() {return player.pla.version.gte(3)},
                effectDescription() {return "Unlock more garden upgrades and Zone 4: The Forest Zone."},
            },
        5: {
                requirementDescription: "5 Zones",
                tooltip() {return "Effect Formula: [Zones/3+1]<sup>1/3</sup>"},
                effect() {return player.zon.points.div(3).add(1).pow(1/3)},
                done() {return player[this.layer].best.gte(5)},
                effectDescription() {return "Gardens reset nothing, Divide Garden Cost based on Zone, Currently: /"+format(milestoneEffect('zon', 5))},
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
            rewardDescription() {return "Unlock more plant upgrades and Multiply Plant point gain by 5 per completion, Currently: "+format(challengeEffect(this.layer, this.id))+"x"},
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
            rewardDescription() {return "Unlock more plant upgrades and Multiply Plant point gain by 5 per completion, Currently: "+format(challengeEffect(this.layer, this.id))+"x"},
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
            rewardDescription() {return "Unlock more garden buyables and Multiply Plant point gain by 5 per completion, Currently: "+format(challengeEffect(this.layer, this.id))+"x"},
            canComplete: function() {return player.pla.points.gte(this.goal())},
        },
        22: {
            name: "The Forest Zone",
            countsAs: [11, 12, 21],
            unlocked() {return hasMilestone('zon', 4)},
            onEnter() {
                player.pla.upgrades = []
                player.planpts = D(0)
            },
            challengeDescription() {return "Reset Plant upgrades, Apply Previous Challenge Nerfs, Echinocactus and \"New Plant Upgrades\" are Unavailable<br>Completions:"+formatWhole(challengeCompletions(this.layer, this.id))+"/3"},
            goal() {return [D(152), D(181), D(186), D(0)][challengeCompletions(this.layer, this.id).min(3)]},
            goalDescription() {return "Reach "+formatWhole(this.goal())+" Plants"},
            completionLimit() {return D(3)},
            rewardEffect() {return D(5).pow(challengeCompletions(this.layer, this.id))},
            rewardDescription() {return "Unlock more plant upgrades and Multiply Plant point gain by 5 per completion, Currently: "+format(challengeEffect(this.layer, this.id))+"x"},
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
        if (hasUpgrade('gar', 34)) mult = mult.div(upgradeEffect('gar', 34))
        if (hasUpgrade('pla', 33)) mult = mult.div(upgradeEffect('pla', 33))
        if (hasUpgrade('pla', 71)) mult = mult.div(upgradeEffect('pla', 71))
        if (hasUpgrade('wild', 53)) mult = mult.div(upgradeEffect('wild', 53))
        if (hasMilestone('zon', 5)) mult = mult.div(milestoneEffect('zon', 5))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    onPrestige() {if (!hasMilestone('zon', 5)) player.planpts = D(0)},
    resetsNothing() {return hasMilestone('zon', 5)},
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
                if (hasUpgrade('wild', 43)) base = D(16).add(x.times(2))
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
                if (hasUpgrade('wild', 43)) base = D(20).add(x.times(3))
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
                if (hasUpgrade('wild', 43)) base = D(18).add(x.times(4))
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
            effect() {
                let mult = D(1)
                if (hasUpgrade('gar', 31)) mult = mult.times(upgradeEffect('gar', 31))
                return player.gar.points.max(0).add(1).pow(2).times(player.pla.points.max(0).div(2).add(1)).times(mult)},
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
        31: {
            title() {return "Decking I"},
            tooltip() {return "Effect Formula: [Zones+1]<sup>3</sup>"},
            unlocked() {return hasMilestone('zon', 4)},
            description() {
                return "Multiply Lawn Effect based on Zone."},
            effect() {return player.zon.points.max(0).add(1).pow(3)},
            cost() {return D(30)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        32: {
            title() {return "Decking II"},
            tooltip() {return ""},
            unlocked() {return hasMilestone('zon', 4)},
            description() {
                return "Multiply Plant point gain by Ceramic Pots' effect."},
            effect() {return upgradeEffect('gar', 14)},
            cost() {return D(31)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        33: {
            title() {return "Decking III"},
            tooltip() {return "Effect Formula: [Gardens]<sup>2</sup>/20+1"},
            unlocked() {return hasMilestone('zon', 4)},
            description() {
                return "Multiply Plant point gain based on Garden."},
            effect() {return player.gar.points.max(0).pow(2).div(20).add(1)},
            cost() {return D(32)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        34: {
            title() {return "Decking IV"},
            tooltip() {return "Effect Formula: (log<sub>10</sub>[Points+1]+1)<sup>0.05</sup>"},
            unlocked() {return hasMilestone('zon', 4)},
            description() {
                return "Divide Garden Cost based on points."},
            effect() {return player.points.max(0).add(1).log10().add(1).pow(0.05)},
            cost() {return D(33)},
            effectDisplay() {return "/"+format(upgradeEffect(this.layer, this.id))},
        },
        35: {
            title() {return "Decking V"},
            tooltip() {return "I heard y'all like big numbers so here you go >:]"},
            unlocked() {return hasMilestone('zon', 4)},
            description() {
                return "Reduce Echinocactus Cost Scaling by 2.5 again."},
            effect() {return D(2.5)},
            cost() {return D(42)},
            effectDisplay() {return "-"+format(upgradeEffect(this.layer, this.id))},
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
        3: {
            requirementDescription: "44 Gardens",
            done() {return player[this.layer].best.gte(44)},
            effect() {
                return player.gar.points.max(0).add(1)},
            effectDescription() {return "Multiply Addition and Multiplication gain by [Garden]+1, Currently: "+format(this.effect())+"x"},
            },
    },
    layerShown(){return player.universe.eq(2)&&player.pla.version.gte(1)},
    update(diff) {
    }
})
addLayer("meta", {
    name: "meta points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ME", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: D(0),
        best: D(0),
        version: D(0),
        auto: false,
    }},
    color: "#B8B799",
    requires: D(0), // Can be a function that takes requirement increases into account
    resource: "meta points", // Name of prestige currency
    baseResource: "meta points", // Name of resource prestige is based on
    baseAmount() {return player.meta.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        return mult
    },
    roundUpCost() {return true},
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
                    "milestones",
                    "blank",
                    "blank",
                    "buyables",
                    "upgrades"
            ]
        },
    },
    effect() {
        return D(2).pow(player.meta.points.max(0).add(1).log10())
    },
    effectDescription() {
        return ", translated to a " + format(tmp.meta.effect) + "x boost to point gain."
    },
    upgrades: {
        11: {
            title() {return "Initiate"},
            tooltip() {return "(log<sub>10</sub>[Points]-100)<sup>2</sup>/20"},
            description() {
                return "Increase meta point gain base based on points."},
            effect() {return player.points.max(1).log10().sub(100).max(0).pow(2).div(20).add(buyableEffect('meta', 11)).times(tmp.recur.PressEffect).max(0)},
            cost() {return D(0)},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        12: {
            title() {return "Triplication"},
            tooltip() {return ""},
            description() {
                return "Triple meta point gain."},
            effect() {let base = D(3)
                if (hasUpgrade('shift', 13)) base=base.times(upgradeEffect('shift', 13))
                return softcap(base, D(69), D(0.5))
            },
            cost() {return D(69)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"+((upgradeEffect(this.layer, this.id).gte(69)) ? " (softcapped)" : "")},
        },
        13: {
            title() {return "Repetitive"},
            tooltip() {return ""},
            description() {
                return "Raise Repeat II's effect to the 1.2th power."},
            effect() {return D(1.2)},
            cost() {return D(727)},
            effectDisplay() {return "^"+format(upgradeEffect(this.layer, this.id))},
        },
        14: {
            title() {return "Wavy"},
            tooltip() {return "Effect Formula: 1.1<sup>log<sub>10</sub>[meta points]</sup>"},
            unlocked() {return player.meta.version.gte(1)},
            description() {
                return "Multiply wave gain by 1.1 per OoM of meta points."},
            effect() {return D(1.1).pow(player.meta.points.max(1).log10())},
            cost() {return D(1e6)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
    },
    RII() {
        let base = D(1.1)
        if (hasUpgrade('meta', 13)) base = base.pow(upgradeEffect('meta', 13))
        return base
    },
    RIII() {
        let base = D(0.2)
        if (hasUpgrade('shift', 12)) base = base.times(upgradeEffect('shift', 12).R)
        return base
    },
    automate() {
        if (player.meta.auto) {
            buyBuyable('meta', 11)
            buyBuyable('meta', 12)
            buyBuyable('meta', 13)
        }
    },
    buyables: {
        11: {
            title() {return "Repeat I"},
            display() {
                let cs=""
                if (getBuyableAmount(this.layer, this.id).gte(100)) cs=" (Scaled)"
                return "Increase Initiate effect by "+format(D(0.1).times(buyableEffect('meta', 13)))+" per level<br>Cost: "+format(this.cost())+" Meta Points"+cs+"<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: +"+format(this.effect())
            },
            effect(x) {return D(0.1).times(buyableEffect('meta', 13)).times(x)},
            unlocked() {return true},
            tooltip() {return "Cost Formula: 1.15<sup>x<sup>1.2</sup></sup>"},
            cost(x) {let base = D(1.15).pow(x.pow(1.2))
                if (x.gte(100)) base = D(1.15).pow(x.add(x.sub(99).times(x.sub(98)).div(2)).pow(1.2))
                return base
            },
            buy() {
                let cost = D(1)
                if (hasMilestone('meta', 0)) cost = D(0)
                player.meta.points = player.meta.points.sub(this.cost().mul(cost)).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.meta.points.gte(this.cost())
            },
        },
        12: {
            title() {return "Repeat II"},
            display() {
                let cs=""
                if (getBuyableAmount(this.layer, this.id).gte(100)) cs=" (Scaled)"
                return "Multiply meta point gain by "+format(tmp.meta.RII)+" per level<br>Cost: "+format(this.cost())+" Meta Points"+cs+"<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            effect(x) {return D(tmp.meta.RII).pow(x)},
            unlocked() {return true},
            tooltip() {return "Cost Formula: 10*1.2<sup>x<sup>1.2</sup></sup>"},
            cost(x) {let base = D(1.2).pow(x.pow(1.2)).times(10)
                if (x.gte(100)) base = D(1.2).pow(x.add(x.sub(99).times(x.sub(98)).div(2)).pow(1.2)).times(10)
                return base
            },
            buy() {
                let cost = D(1)
                if (hasMilestone('meta', 0)) cost = D(0)
                player.meta.points = player.meta.points.sub(this.cost().mul(cost)).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.meta.points.gte(this.cost())
            },
        },
        13: {
            title() {return "Repeat III"},
            display() {
                let cs=""
                if (getBuyableAmount(this.layer, this.id).gte(100)) cs=" (Scaled)"
                return "Increase Repeat I effect by +"+format(tmp.meta.RIII.times(100))+"% per level<br>Cost: "+format(this.cost())+" Meta Points"+cs+"<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            effect(x) {return D(tmp.meta.RIII).times(x).add(1)},
            unlocked() {return true},
            tooltip() {return "Cost Formula: 100*1.1<sup>x<sup>1.2</sup></sup>"},
            cost(x) {let base = D(1.1).pow(x.pow(1.2)).times(100)
                if (x.gte(100)) base = D(1.1).pow(x.add(x.sub(99).times(x.sub(98)).div(2)).pow(1.2)).times(100)
                return base
            },
            buy() {
                let cost = D(1)
                if (hasMilestone('meta', 0)) cost = D(0)
                player.meta.points = player.meta.points.sub(this.cost().mul(cost)).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.meta.points.gte(this.cost())
            },
        },
    },
    doReset(l) {
        if (!(layers[l].row > this.row)) return
        
        let keep = ['milestones', 'version', 'auto']
        if (hasMilestone('shift', 0)) keep.push('upgrades')
        if (player.universe.eq(3)){layerDataReset(this.layer, keep)}
    },
    milestones: {
        0: {
            toggles: [['meta', 'auto']],
            requirementDescription() {return "1e10 Meta Points"},
            done() {return player[this.layer].best.gte(1e10)},
            effectDescription() {return "Autobuy Repeat Buyables, they don't spend anything."},
            },
    },
    layerShown(){return player.meta.version.gte(0)&&(player.universe.eq(3))},
    versionList() {
        return ["v0.0", "v0.1", "v0.2", "v0.3", "v0.4", "v0.5"]
    },
    update(diff) {
        if (hasUpgrade('meta', 11)){
            player.meta.points = player.meta.points.add(getMetGain().times(diff))
            player.meta.best = player.meta.points.max(player.meta.best)
        }
    }
})
addLayer("shift", {
    name: "shifting", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SH", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: D(0),
        best: D(0),
        bestmult: D(0)
    }},
    color: "#5D9B9B",
    exponent: D(1/3),
    requires: D(5e3), // Can be a function that takes requirement increases into account
    resource: "meters of wave", // Name of prestige currency
    baseResource: "meta points", // Name of resource prestige is based on
    baseAmount() {return player.meta.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        if (hasUpgrade('meta', 14)) mult=mult.times(upgradeEffect('meta', 14))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
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
                    "milestones",
                    "blank",
                    "blank",
                    "upgrades"
            ]
        },
        "Shift Multipliers": {
            unlocked(){return true},
            content:[
                "main-display",
                    "blank",
                    ["prestige-button", "", function (){ return false ? {'display': 'none'} : {}}],
                    "blank",
                    "resource-display",
                    "milestones",
                    "blank",
                    "blank",
                    "buyables",
            ]
        },
    },
    hotkeys: [
        {key: "w", description: "W: Reset for Meter of Waves", onPress(){if (canReset(this.layer)&&player.universe.eq(3)) doReset(this.layer)}, unlocked() {return player.universe.eq(3)}}
    ],
    effect() {
        return D(2).pow(player.shift.points.max(0).add(1).log10())
    },
    effectDescription() {
        return ", translated to a " + format(tmp.shift.effect) + "x boost to meta point and point gain."
    },
    automate() {
        if (hasUpgrade('recur', 24)) {
            buyBuyable('shift', 11)
            buyBuyable('shift', 12)
            buyBuyable('shift', 13)
        }
    },
    branches: ["meta"],
    upgrades: {
        11: {
            title() {return "Synergize"},
            tooltip() {return "Effect Formula: log<sub>10</sub>[Meta points]+1"},
            description() {
                return "Multiply meta point gain based on meta points."},
            effect() {let base = player.meta.points.max(1).log10().add(1)
                let cap = D(15)
                if (hasUpgrade('recur', 23)) cap = D(30)
                if (hasUpgrade('recur', 23)) base = base.div(upgradeEffect('recur', 23))
                return base.max(1).min(cap)
            },
            cost() {return D(2)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x "+ (upgradeEffect(this.layer, this.id).gte(hasUpgrade('recur', 23) ? 30 : 15) ? "(hardcapped)" : "")},
        },
        12: {
            title() {return "Sine"},
            tooltip() {return ""},
            description() {
                return "Triple Multiplication gain, Multiply Repeat III effect by 1.4."},
            effect() {return {M:D(3), R:D(1.4)}},
            cost() {return D(20)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id).M)+"x, "+format(upgradeEffect(this.layer, this.id).R)+"x"},
        },
        13: {
            title() {return "Multiple-plication"},
            tooltip() {return "Effect Formula: log<sub>2</sub>[Waves+1]+2"},
            description() {
                return "Multiply Triplication effect based on waves."},
            effect() {return player.shift.points.max(0).add(1).log2().add(2)},
            cost() {return D(160)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        14: {
            title() {return "Based"},
            description() {
                return "Raise Meta point gain base to the 1.1th power."},
            effect() {let base = D(1.1)
                if (hasUpgrade('recur', 22)) base = base.add(upgradeEffect('recur', 22))
                return base
            },
            cost() {return D(5e4)},
            effectDisplay() {return "^"+format(upgradeEffect(this.layer, this.id))},
        },
    },
    SMAmount() {
        return getBuyableAmount(this.layer, 11).add(getBuyableAmount(this.layer, 12)).add(getBuyableAmount(this.layer, 13)).add(getBuyableAmount(this.layer, 21)).add(getBuyableAmount(this.layer, 22)).add(getBuyableAmount(this.layer, 23))
    },
    buyables: {
        11: {
            title() {return "1st Shift Multiplier"},
            display() {
                return "Increase meta point gain by +"+format(D(50).times(buyableEffect('shift', 12)).times(buyableEffect('shift', 31)))+"% per level<br>Cost: "+format(this.cost())+" Meters of Wave<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            effect(x) {return D(0.5).times(buyableEffect('shift', 12)).times(x).times(buyableEffect('shift', 31)).add(1)},
            unlocked() {return true},
            tooltip() {return "Cost Formula: 1.4<sup>x<sup>1.2</sup></sup>"},
            cost(x) {let base = D(1.4).pow(x.pow(1.2))
                if (hasUpgrade('recur', 12)) base = base.div(upgradeEffect('recur', 12))
                return base.ceil()
            },
            buy() {
                let cost = D(1)
                if (hasUpgrade('recur', 24)) cost = D(0)
                player.shift.points = player.shift.points.sub(this.cost().mul(cost)).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.shift.points.gte(this.cost())
            },
        },
        12: {
            title() {return "2nd Shift Multiplier"},
            display() {
                return "Increase previous multiplier base effect by +"+format(D(50).times(buyableEffect('shift', 13).times(buyableEffect('shift', 31))).times(hasUpgrade('recur', 25) ? upgradeEffect('recur', 25) : 1))+"% per level<br>Cost: "+format(this.cost())+" Meters of Wave<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            effect(x) {let base = D(0.5).times(buyableEffect('shift', 13)).times(x).times(buyableEffect('shift', 31))
            if (hasUpgrade('recur', 25)) base = base.times(upgradeEffect('recur', 25))
            return base.add(1)
        },
            unlocked() {return true},
            tooltip() {return "Cost Formula: 5*1.4<sup>x<sup>1.2</sup></sup>"},
            cost(x) {let base = D(1.4).pow(x.pow(1.2)).times(5)
                if (hasUpgrade('recur', 12)) base = base.div(upgradeEffect('recur', 12))
                return base.ceil()
            },
            buy() {
                let cost = D(1)
                if (hasUpgrade('recur', 24)) cost = D(0)
                player.shift.points = player.shift.points.sub(this.cost().mul(cost)).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.shift.points.gte(this.cost())
            },
        },
        13: {
            title() {return "3rd Shift Multiplier"},
            display() {
                return "Increase previous multiplier base effect by +"+format(D(50).times(buyableEffect('shift', 21)).times(buyableEffect('shift', 31)))+"% per level<br>Cost: "+format(this.cost())+" Meters of Wave<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            effect(x) {return D(0.5).times(buyableEffect('shift', 21)).times(x).times(buyableEffect('shift', 31)).add(1)},
            unlocked() {return true},
            tooltip() {return "Cost Formula: 25*1.4<sup>x<sup>1.2</sup></sup>"},
            cost(x) {let base = D(1.4).pow(x.pow(1.2)).times(25)
                if (hasUpgrade('recur', 12)) base = base.div(upgradeEffect('recur', 12))
                return base.ceil()
            },
            buy() {
                let cost = D(1)
                if (hasUpgrade('recur', 24)) cost = D(0)
                player.shift.points = player.shift.points.sub(this.cost().mul(cost)).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.shift.points.gte(this.cost())
            },
        },
        21: {
            title() {return "4th Shift Multiplier"},
            display() {
                return "Increase previous multiplier base effect by +"+format(D(50).times(buyableEffect('shift', 31)).times(buyableEffect('shift', 22)).times(hasUpgrade('recur', 25) ? upgradeEffect('recur', 25) : 1))+"% per level<br>Cost: "+format(this.cost())+" Meters of Wave<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            effect(x) {let base = D(0.5).times(buyableEffect('shift', 22)).times(x).times(buyableEffect('shift', 31))
            if (hasUpgrade('recur', 25)) base = base.times(upgradeEffect('recur', 25))
            return base.add(1)
        },
            unlocked() {return true},
            tooltip() {return "Cost Formula: 125*1.4<sup>x<sup>1.2</sup></sup>"},
            cost(x) {let base = D(1.4).pow(x.pow(1.2)).times(125)
                if (hasUpgrade('recur', 12)) base = base.div(upgradeEffect('recur', 12))
                return base.ceil()
            },
            buy() {
                let cost = D(1)
                player.shift.points = player.shift.points.sub(this.cost().mul(cost)).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.shift.points.gte(this.cost())
            },
        },
        22: {
            title() {return "5th Shift Multiplier"},
            display() {
                return "Increase previous multiplier base effect by +"+format(D(50).times(buyableEffect('shift', 31)).times(buyableEffect('shift', 23)))+"% per level<br>Cost: "+format(this.cost())+" Meters of Wave<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            effect(x) {return D(0.5).times(buyableEffect('shift', 23)).times(x).times(buyableEffect('shift', 31)).add(1)},
            unlocked() {return true},
            tooltip() {return "Cost Formula: 3,125*1.4<sup>x<sup>1.2</sup></sup>"},
            cost(x) {let base = D(1.4).pow(x.pow(1.2)).times(3125)
                if (hasUpgrade('recur', 12)) base = base.div(upgradeEffect('recur', 12))
                return base.ceil()
            },
            buy() {
                let cost = D(1)
                player.shift.points = player.shift.points.sub(this.cost().mul(cost)).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.shift.points.gte(this.cost())
            },
        },
        23: {
            title() {return "6th Shift Multiplier"},
            display() {
                return "Increase previous multiplier base effect by +"+format(D(50).times(buyableEffect('shift', 31)))+"% per level<br>Cost: "+format(this.cost())+" Meters of Wave<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            effect(x) {return D(0.5).times(buyableEffect('shift', 31)).times(x).add(1)},
            unlocked() {return true},
            tooltip() {return "Cost Formula: 390,625*1.4<sup>x<sup>1.2</sup></sup>"},
            cost(x) {let base = D(1.4).pow(x.pow(1.2)).times(390625)
                if (hasUpgrade('recur', 12)) base = base.div(upgradeEffect('recur', 12))
                return base.ceil()
            },
            buy() {
                let cost = D(1)
                player.shift.points = player.shift.points.sub(this.cost().mul(cost)).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.shift.points.gte(this.cost())
            },
        },
        31: {
            title() {return "Shifting Sacrifice"},
            display() {
                return "Reset Shift Multipliers, Multiply All Shift Multiplier's base effect based on Total Shift Multiplier Amount.<br>Req: "+formatWhole(tmp.shift.SMAmount)+"/"+formatWhole(this.cost())+" Shift Multipliers<br>Effect: x"+format(this.effect())+" → x"+format(tmp.shift.SMAmount.max(0).add(1).log(50))
            },
            effect(x) {return player.shift.bestmult.max(0).add(1).log(50).max(1).pow(hasUpgrade('recur', 14) ? 1 : 0)},
            unlocked() {return hasUpgrade('recur', 14)},
            tooltip() {return "Effect Formula: log<sub>50</sub>[Amount+1]"},
            cost(x) {return player.shift.bestmult.add(1).max(50)
            },
            buy() {
                player.shift.bestmult = getBuyableAmount(this.layer, 11).add(getBuyableAmount(this.layer, 12)).add(getBuyableAmount(this.layer, 13)).add(getBuyableAmount(this.layer, 21)).add(getBuyableAmount(this.layer, 22)).add(getBuyableAmount(this.layer, 23))
                setBuyableAmount(this.layer, 11, D(0))
                setBuyableAmount(this.layer, 12, D(0))
                setBuyableAmount(this.layer, 13, D(0))
                setBuyableAmount(this.layer, 21, D(0))
                setBuyableAmount(this.layer, 22, D(0))
                setBuyableAmount(this.layer, 23, D(0))
            },
            canAfford() {
                return tmp.shift.SMAmount.gte(this.cost())
            },
        },
    },
    doReset(l) {
        if (!(layers[l].row > this.row)) return
        
        let keep = ['milestones']
        if (hasUpgrade('recur', 13)) keep.push('upgrades')
        if (player.universe.eq(3)){layerDataReset(this.layer, keep)}
    },
    milestones: {
        0: {
            requirementDescription: "100 Meters of Wave",
            done() {return player[this.layer].best.gte(100)},
            effect() {
                return player.shift.points.max(0).add(2).log2()},
            effectDescription() {return "Keep all Meta Points upgrades. Multiply Addition and Multiplication gain based on waves, Currently: "+format(milestoneEffect('shift', 0))+"x"},
            },
    },
    layerShown(){return player.meta.version.gte(1)&&(player.universe.eq(3))},
    update(diff) {
    }
})
addLayer("recur", {
    name: "repression", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RE", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: D(0),
        best: D(0),
        pres: D(0)
    }},
    color: "#520387",
    exponent: D(0.125),
    requires: D(5e16), // Can be a function that takes requirement increases into account
    resource: "recursivity", // Name of prestige currency
    baseResource: "meta points", // Name of resource prestige is based on
    baseAmount() {return player.meta.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = D(1)
        if (hasUpgrade('inc', 21)) mult = mult.times(upgradeEffect('inc', 21))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return D(1)
    },
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
                    ["display-text",function() {return "Note: You may choose 2 upgrades in each row, So choose wisely you silly goober :3<br><br>You can only buy next upgrade when you bought all previous connected upgrades."}],
                    "milestones",
                    "blank",
                    "blank",
                    ["row", [["upgrade", 11], "blank", ["upgrade", 12], "blank", ["upgrade", 13], "blank", ["upgrade", 14]]],
                    "blank",
                    ["row", [["upgrade", 21], "blank", ["upgrade", 22], "blank", ["upgrade", 23], "blank", ["upgrade", 24], "blank", ["upgrade", 25]]],
                    "blank",
                    "blank",
                    ["row", [["clickable", "R"]]],
            ]
        },
        "Generator": {
            unlocked(){return hasUpgrade('recur', 11)},
            content:[
                "main-display",
                    "blank",
                    ["prestige-button", "", function (){ return false ? {'display': 'none'} : {}}],
                    "blank",
                    "resource-display",
                    ["display-text",function() {return "You have "+format(player.recur.pres)+" Pressure Points (+"+format(tmp.recur.PressGain)+"/s), translated to a "+format(tmp.recur.PressEffect)+"x boost to Initiate Effect"}],
                    "blank",
                    "blank",
                    "buyables"
            ]
        },
    },
    hotkeys: [
        {key: "c", description: "C: Reset for Recursivity", onPress(){if (canReset(this.layer)&&player.universe.eq(3)) doReset(this.layer)}, unlocked() {return player.universe.eq(3)}}
    ],
    effect() {
        return player.recur.points.max(0).add(1).log2().add(1).pow(3)
    },
    effectDescription() {
        return ", translated to a " + format(tmp.recur.effect) + "x boost to meta point and point gain."
    },
    PressGain() {
        return upgradeEffect('recur', 11).add(buyableEffect('recur', 11))
    },
    PressEffect() {
        return player.recur.pres.max(0).add(1).log(3).add(1).pow(hasUpgrade('recur', 11) ? 1 : 0)
    },
    branches: ["shift"],
    upgrades: {
        11: {
            title() {return "Pressure I"},
            description() {
                return "Unlock The Generator tab and start generating 1 pressure points per second."},
            effect() {return D(1)},
            canAfford() {return hasUpgrade(this.layer, 11)+hasUpgrade(this.layer, 12)+hasUpgrade(this.layer, 13)+hasUpgrade(this.layer, 14)<2},
            cost() {return D(2)},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))+"/s"},
        },
        12: {
            title() {return "Shift I"},
            description() {
                return "Divide Shifting Multipliers Cost by 5."},
            effect() {return D(5)},
            canAfford() {return hasUpgrade(this.layer, 11)+hasUpgrade(this.layer, 12)+hasUpgrade(this.layer, 13)+hasUpgrade(this.layer, 14)<2},
            cost() {return D(2)},
            effectDisplay() {return "/"+format(upgradeEffect(this.layer, this.id))},
        },
        13: {
            title() {return "QoL I"},
            description() {
                return "Keep All Shifting Upgrades."},
            canAfford() {return hasUpgrade(this.layer, 11)+hasUpgrade(this.layer, 12)+hasUpgrade(this.layer, 13)+hasUpgrade(this.layer, 14)<2},
            cost() {return D(2)},
        },
        14: {
            title() {return "Shift Multiplier I"},
            description() {
                return "Unlock Shifting Sacrifice."},
            canAfford() {return hasUpgrade(this.layer, 11)+hasUpgrade(this.layer, 12)+hasUpgrade(this.layer, 13)+hasUpgrade(this.layer, 14)<2},
            cost() {return D(2)},
        },
        21: {
            title() {return "Pressure II"},
            branches: [11],
            description() {
                return "Unlock a Pressure Buyable."},
            canAfford() {return (hasUpgrade(this.layer, 21)+hasUpgrade(this.layer, 22)+hasUpgrade(this.layer, 23)+hasUpgrade(this.layer, 24)+hasUpgrade(this.layer, 25)<2)&&hasUpgrade(this.layer, 11)},
            cost() {return D(16)},
        },
        22: {
            title() {return "Power I"},
            branches: [11, 12],
            description() {
                return "Increase Based effect by 0.1."},
            effect() {return D(0.1)},
            canAfford() {return (hasUpgrade(this.layer, 21)+hasUpgrade(this.layer, 22)+hasUpgrade(this.layer, 23)+hasUpgrade(this.layer, 24)+hasUpgrade(this.layer, 25)<2)&&hasUpgrade(this.layer, 11)&&hasUpgrade(this.layer, 12)},
            cost() {return D(16)},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        23: {
            title() {return "Shift II"},
            branches: [12],
            description() {
                return "Synergize's hardcaps at 30, But Divide Synergize Effect by 1.5."},
            effect() {return D(1.5)},
            canAfford() {return (hasUpgrade(this.layer, 21)+hasUpgrade(this.layer, 22)+hasUpgrade(this.layer, 23)+hasUpgrade(this.layer, 24)+hasUpgrade(this.layer, 25)<2)&&hasUpgrade(this.layer, 12)},
            cost() {return D(16)},
            effectDisplay() {return "/"+format(upgradeEffect(this.layer, this.id))},
        },
        24: {
            title() {return "QoL II"},
            branches: [13],
            description() {
                return "Autobuy Shift Multiplier 1-3, They don't spend anything."},
            canAfford() {return (hasUpgrade(this.layer, 21)+hasUpgrade(this.layer, 22)+hasUpgrade(this.layer, 23)+hasUpgrade(this.layer, 24)+hasUpgrade(this.layer, 25)<2)&&hasUpgrade(this.layer, 13)},
            cost() {return D(16)},
        },
        25: {
            title() {return "Shift Multiplier II"},
            branches: [14],
            tooltip() {return "Effect Formula: log<sub>10</sub>[Recursivity+1]+1"},
            description() {
                return "Multiply Shift Multiplier 2 and 4's base effect based on Recursivity."},
            effect() {return player.recur.points.max(0).add(1).log10().add(1)},
            canAfford() {return (hasUpgrade(this.layer, 21)+hasUpgrade(this.layer, 22)+hasUpgrade(this.layer, 23)+hasUpgrade(this.layer, 24)+hasUpgrade(this.layer, 25)<2)&&hasUpgrade(this.layer, 14)},
            cost() {return D(16)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
    },
    buyables: {
        11: {
            title() {return "Pressure I"},
            display() {
                return "Increase pressure point gain by 1 per level<br>Cost: "+format(this.cost())+" Pressure Points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: +"+format(this.effect())
            },
            effect(x) {return D(1).times(hasUpgrade('recur', 21) ? 1 : 0).times(x)},
            unlocked() {return hasUpgrade('recur', 21)},
            tooltip() {return "Cost Formula: 2<sup>x</sup>"},
            cost(x) {let base = D(2).pow(x)
                return base
            },
            buy() {
                let cost = D(1)
                player.recur.pres = player.recur.pres.sub(this.cost().mul(cost)).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.recur.pres.gte(this.cost())
            },
        },
    },
    clickables: {
        R: {
            title() {return "Respec"},
            display() {return "Reset Your Repression upgrades and gain your spent recursivity back"},
            unlocked() {return true},
            canClick() {return player.recur.upgrades.length>0},
            onClick() {
                if (hasUpgrade('recur', 11)) player.recur.points = player.recur.points.add(tmp.recur.upgrades[11].cost)
                if (hasUpgrade('recur', 12)) player.recur.points = player.recur.points.add(tmp.recur.upgrades[12].cost)
                if (hasUpgrade('recur', 13)) player.recur.points = player.recur.points.add(tmp.recur.upgrades[13].cost)
                if (hasUpgrade('recur', 14)) player.recur.points = player.recur.points.add(tmp.recur.upgrades[14].cost)
                if (hasUpgrade('recur', 21)) player.recur.points = player.recur.points.add(tmp.recur.upgrades[21].cost)
                if (hasUpgrade('recur', 22)) player.recur.points = player.recur.points.add(tmp.recur.upgrades[22].cost)
                if (hasUpgrade('recur', 23)) player.recur.points = player.recur.points.add(tmp.recur.upgrades[23].cost)
                if (hasUpgrade('recur', 24)) player.recur.points = player.recur.points.add(tmp.recur.upgrades[24].cost)
                if (hasUpgrade('recur', 25)) player.recur.points = player.recur.points.add(tmp.recur.upgrades[25].cost)
                player.recur.upgrades = []
            },
        },
    },
    doReset(l) {
        if (!(layers[l].row > this.row)) return
        
        let keep = ['milestones']
        if (player.universe.eq(3)){layerDataReset(this.layer, keep)}
    },
    milestones: {
        0: {
            requirementDescription: "50 Recursivity",
            effect() {return tmp.shift.SMAmount.add(1)},
            done() {return player[this.layer].points.gte(50)},
            effectDescription() {return "Multiply Addition and Multiplication gain by [Shift Multipliers Amount]+1, Currently: "+format(this.effect())+"x"},
            },
    },
    layerShown(){return player.meta.version.gte(2)&&(player.universe.eq(3))},
    update(diff) {
        if (hasUpgrade('recur', 11)) player.recur.pres = player.recur.pres.add(tmp.recur.PressGain.times(diff))
    }
})
addLayer("inc", {
    name: "Incremental God", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: D(0),
        best: D(0),
        version: D(0),
        // Trees
        leaves: D(0),
        trees: D(0),
        // Computer
        crypto: D(0),
        byte: D(0),
        cd1: D(0),
        cd2: D(0),
        cd3: D(0),
        cd4: D(0),
        // Coding
        ce: D(0),
        loc: D(0),
        mods: D(0),
        // Realm Mods
        balv: D(0),
        crlv: D(0),
        delv: D(0),
        dilv: D(0),
        hilv: D(0),
        volv: D(0),
        bad: D(0), // Deposit
        crd: D(0),
        ded: D(0),
        did: D(0),
        hid: D(0),
        vod: D(0),
        bap: D(0), // Power
        crp: D(0),
        dep: D(0),
        dip: D(0),
        hip: D(0),
        vop: D(0),
        rpage: D(0),
    }},
    nodeStyle: {
        background: "linear-gradient(90deg, #ff0000, #ff7700, #ffff00, #77ff00, #00ff00, #00ff77, #00ffff, #0077ff, #0000ff, #7700ff, #ff00ff, #ff0077)",
        "background-origin": "border-box",
    },
    color: "#FFFFFF",
    exponent: D(1),
    requires: D(1), // Can be a function that takes requirement increases into account
    resource: "incremental points", // Name of prestige currency
    baseResource: "incremental points", // Name of resource prestige is based on
    baseAmount() {return player.inc.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
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
                    ["row", [["bar", 0]]],
                    "blank",
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15]]],
                    ["row", [["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24], ["upgrade", 25]]],
                    "blank",
                    ["display-text",function() {return "You are gaining "+format(tmp.inc.Leafgain)+" leaves per second.<br>You have "+format(player.inc.trees)+" trees, which are generating "+format(tmp.inc.TreeEffect)+" incremental points per second"}],
                    ["display-text",function() {if (player.inc.trees.gte(tmp.inc.TSoftcap)) return makeRed("After "+formatWhole(tmp.inc.TSoftcap.add(1))+" Trees, Your leaf gain will be divided by 1.5 per tree starting at "+formatWhole(tmp.inc.TSoftcap.add(1))+", Currently: /"+format(tmp.inc.TreeNerf))}],
                    ["row", [["buyable", 11], ["buyable", 12]]],
                    ["row", [["buyable", 21], ["buyable", 22]]],
            ]
        },
        "Computer": {
            unlocked(){return player.inc.version.gte(1)},
            content:[
                ["display-text",function() {return "You have <h3>"+formatWhole(player.inc.crypto)+"</h3> Crypto, translated to a "+format(tmp.inc.CryptoEffect)+"x boost to Leaf and Incremental Point gain"}],
                    "blank",
                    ["row", [["clickable", 11]]],
                    "blank",
                    "resource-display",
                    "blank",
                    "blank",
                    ["row", [["upgrade", 31], ["upgrade", 32], ["upgrade", 33], ["upgrade", 34], ["upgrade", 35]]],
                    ["row", [["upgrade", 41], ["upgrade", 42], ["upgrade", 43], ["upgrade", 44], ["upgrade", 45]]],
                    ["row", [["upgrade", 51], ["upgrade", 52], ["upgrade", 53], ["upgrade", 54], ["upgrade", 55]]],
                    "blank",
                    "blank",
                    ["display-text",function() {if (hasUpgrade('inc', 51)) return "You have "+format(player.inc.byte)+" bytes or "+formatByte(player.inc.byte)+", Translated to a "+format(tmp.inc.ByteEffect)+"x boost to incremental point and leaf gain."}],
                    "blank",
                    ["row", [["buyable", 31], ["buyable", 32], ["buyable", 33], ["buyable", 34]]],
                    ["row", [["buyable", 41], ["buyable", 42], ["buyable", 43]]],
                    
            ]
        },
        "Coding": {
            unlocked(){return player.inc.version.gte(2)},
            content:[
                ["display-text",function() {return "You have <h3>"+formatWhole(player.inc.ce)+"</h3> Code Experience, translated to a "+format(tmp.inc.CodeEffect)+"x boost to Leaf and Incremental Point gain"}],
                    "blank",
                    ["row", [["clickable", 12]]],
                    "blank",
                    "resource-display",
                    "blank",
                    "blank",
                    ["row", [["bar", 1]]],
                    "blank",
                    ["row", [["upgrade", 61], ["upgrade", 62], ["upgrade", 63], ["upgrade", 64], ["upgrade", 65]]],
                    ["row", [["upgrade", 71], ["upgrade", 72], ["upgrade", 73], ["upgrade", 74], ["upgrade", 75]]],
                    ["row", [["upgrade", 81], ["upgrade", 82], ["upgrade", 83], ["upgrade", 84], ["upgrade", 85]]],
                    "blank",
                    ["display-text",function() {return "You are gaining "+format(tmp.inc.LoCgain)+" lines of code per second (based on code experience).<br>You have "+format(player.inc.mods)+" mods, translated to a "+format(tmp.inc.ModEffect)+"x boost to \"All Previous Main Point\", Incremental Point, Leaf gain"}],
                    "blank",
                    "blank",
                    ["row", [["clickable", 13], ["bar", 2]]],
                    ["row", [["clickable", 14], ["bar", 3]]],
                    ["row", [["clickable", 15], ["bar", 4]]],
                    ["row", [["clickable", 16], ["bar", 5]]],
                    ["row", [["clickable", 17], ["bar", 6]]],
                    ["row", [["clickable", 18], ["bar", 7]]],
                    "blank",
                    ["display-text",function() {if (hasUpgrade('inc', 65)) return tmp.inc.RealmList[player.inc.rpage]}],
                    "blank",
                    ["row", [["buyable", 51], ["buyable", 52], ["buyable", 53]]],
                    ["row", [["clickable", 21], ["clickable", 22]]],
            ]
        },
        "Milestones": {
            unlocked(){return player.inc.version.gte(1)},
            content:[
                    "milestones"
                    
            ]
        },
    },
    RealmBoost() {
        return {
            cr: player.inc.crlv.pow(0.75).pow_base(7),
            hi: player.inc.hilv.pow(0.75).pow_base(3),
            de: player.inc.delv.max(0).pow(0.5).div(2).add(1),
            di: player.inc.dilv.max(0).pow(2).div(5).add(1),
            ba: player.inc.balv.pow(0.75).pow_base(5),
            vo: player.inc.volv.pow_base(1.1).times(player.inc.volv.max(0).add(1).pow(0.5)),
        }
    },
    RealmList() {
        return ["Translated to a "+format(tmp.inc.RealmBoost.cr)+"x Boost to Incremental point and Leaf gain" 
        , "Translated to a "+format(tmp.inc.RealmBoost.hi)+"x Boost to Lines of Code gain"
        , "Translated to a "+format(tmp.inc.RealmBoost.de)+"x Boost to The start of Tree's Nerf"
        , "Translated to a "+format(tmp.inc.RealmBoost.di)+"x Boost to Crypto Dimensions' Multipliers"
        , "Translated to a "+format(tmp.inc.RealmBoost.ba)+"x Boost to Crypto gain"
        , "Translated to a "+format(tmp.inc.RealmBoost.vo)+"x Boost to Code Experience gain"
    ]
    },
    LoCgain() {
        let mult = player.inc.ce.max(0).pow(0.5)
        if (hasUpgrade('inc', 61)) mult = mult.times(upgradeEffect('inc', 61))
        if (hasUpgrade('inc', 65)) mult = mult.times(upgradeEffect('inc', 65))
        if (hasUpgrade('inc', 71)) mult = mult.times(upgradeEffect('inc', 71))
        if (hasUpgrade('inc', 75)) mult = mult.times(upgradeEffect('inc', 75))
        mult = mult.times(tmp.inc.RealmBoost.hi)
        mult = mult.times(buyableEffect('inc', 51))
        return mult
    },
    effect() {
        return player.inc.points.max(0).add(1).log10().pow(0.4).pow_base(10)
    },
    effectDescription() {
        return ", translated to a " + format(tmp.inc.effect) + "x boost to point gain."
    },
    TSoftcap() {
        let base = D(20)
        if (hasUpgrade('inc', 24)) base = base.add(upgradeEffect('inc', 24))
        if (hasUpgrade('inc', 25)) base = base.times(upgradeEffect('inc', 25))
        base = base.times(tmp.inc.RealmBoost.de)
        return base.floor().sub(1)
    },
    TreeNerf() {
        return D(1.5).pow(player.inc.trees.sub(tmp.inc.TSoftcap).max(0))
    },
    Scaling() {
        let scalespeed = buyableEffect('inc', 21)
        if (hasUpgrade('inc', 35)) scalespeed = scalespeed.times(upgradeEffect('inc', 35))
        if (hasUpgrade('inc', 45)) scalespeed = scalespeed.times(upgradeEffect('inc', 45))
        if (hasUpgrade('inc', 55)) scalespeed = scalespeed.times(upgradeEffect('inc', 55))
        scalespeed = scalespeed.times(buyableEffect('inc', 41).s)
        return scalespeed
    },
    TreeDiv() {
        let base = buyableEffect('inc', 22)
        if (hasUpgrade('inc', 55)) base = base.times(upgradeEffect('inc', 55))
        return base
    },
    TreeReq() {
        return player.inc.trees.max(0).times(tmp.inc.Scaling).pow(2).pow_base(1.05).times(4).div(tmp.inc.TreeDiv)
    },
    ModReq() {
        let base = player.inc.mods.max(0).times(1).pow(2.5).pow_base(1.1).times(10).div(1)
        if (hasUpgrade('inc', 72)) base = base.div(upgradeEffect('inc', 72))
        return base
    },
    TreeEffect() {
        let free = D(0)
        let base = D(0.1)
        let pow = D(1)
        base = base.add(buyableEffect('inc', 12))
        if (hasUpgrade('inc', 34)) base = base.add(upgradeEffect('inc', 34))
        if (hasUpgrade('inc', 44)) base = base.add(upgradeEffect('inc', 44))
        if (hasUpgrade('mul', 23)) base = base.times(upgradeEffect('mul', 23))
        if (hasUpgrade('inc', 13)) base = base.times(upgradeEffect('inc', 13))
        if (hasUpgrade('inc', 21)) base = base.times(upgradeEffect('inc', 21))
        if (hasUpgrade('inc', 31)) base = base.times(upgradeEffect('inc', 31))
        if (hasUpgrade('inc', 41)) base = base.times(upgradeEffect('inc', 41))
        base = base.times(tmp.inc.CryptoEffect)
        base = base.times(tmp.inc.ByteEffect)
        base = base.times(tmp.inc.CodeEffect)
        base = base.times(tmp.inc.ModEffect)
        base = base.times(tmp.inc.RealmBoost.cr)
        if (player.V.boost.eq(7)) base = base.times(tmp.V.timeEffect.inc)
        if (hasUpgrade('inc', 33)) pow = pow.times(upgradeEffect('inc', 33))
        if (hasUpgrade('inc', 43)) free = free.add(upgradeEffect('inc', 43))
        return player.inc.trees.add(free).pow(pow).times(base)
    },
    ByteEffect() {
        return player.inc.byte.max(0).add(1).pow(0.4)
    },
    CodeEffect() {
        return player.inc.ce.max(0).add(1).pow(0.5).times(player.inc.ce.max(10).log10())
    },
    ModEffect() {
        return player.inc.mods.max(0).pow_base(2.5).times(player.inc.mods.max(0).add(1).pow(2))
    },
    Leafgain() {
        let base = D(0)
        if (hasUpgrade('inc', 11)) base = upgradeEffect('inc', 11)
        if (hasUpgrade('inc', 12)) base = base.times(upgradeEffect('inc', 12))
        if (hasUpgrade('inc', 15)) base = base.times(upgradeEffect('inc', 15))
        if (hasUpgrade('inc', 22)) base = base.times(upgradeEffect('inc', 22))
        if (hasUpgrade('inc', 23)) base = base.times(player.inc.trees.max(0).add(1))
        if (hasUpgrade('inc', 32)) base = base.times(upgradeEffect('inc', 32))
        if (hasUpgrade('inc', 42)) base = base.times(upgradeEffect('inc', 42))
        if (hasUpgrade('inc', 53)) base = base.times(upgradeEffect('inc', 53))
        if (hasUpgrade('inc', 54)) base = base.times(upgradeEffect('inc', 54))
        base = base.times(buyableEffect('inc', 11))
        base = base.times(tmp.inc.CryptoEffect)
        base = base.times(tmp.inc.ByteEffect)
        base = base.times(tmp.inc.ModEffect)
        base = base.times(tmp.inc.CodeEffect)
        base = base.times(buyableEffect('inc', 41).m)
        base = base.times(tmp.inc.RealmBoost.cr)
        return base.div(tmp.inc.TreeNerf)
    },
    CryptoMult() {
        let mult = buyableEffect('inc', 42)
        if (hasUpgrade('inc', 23)) mult = mult.times(upgradeEffect('inc', 23))
        if (hasUpgrade('inc', 51)) mult = mult.times(upgradeEffect('inc', 51))
        if (hasUpgrade('inc', 52)) mult = mult.times(upgradeEffect('inc', 52))
        if (hasUpgrade('inc', 54)) mult = mult.times(upgradeEffect('inc', 54))
        if (hasUpgrade('inc', 61)) mult = mult.times(upgradeEffect('inc', 61))
        mult = mult.times(tmp.inc.RealmBoost.ba)
        return mult
    },
    CodeMult() {
        let mult = D(1)
        mult = mult.times(tmp.inc.RealmBoost.vo)
        if (hasUpgrade('inc', 71)) mult = mult.times(upgradeEffect('inc', 71))
        if (hasUpgrade('inc', 73)) mult = mult.times(upgradeEffect('inc', 73))
        if (hasUpgrade('inc', 74)) mult = mult.times(upgradeEffect('inc', 74))
        mult = mult.times(buyableEffect('inc', 52))
        return mult
    },
    CryptoGain() {
        if (player.inc.points.lt(2e6)) return D(0)
        return player.inc.points.max(1).div(200000).log10().max(0).pow(2).times(tmp.inc.CryptoMult).floor()
    },
    CodeGain() {
        if (player.inc.crypto.lt(1e8)) return D(0)
        return player.inc.crypto.max(1).div(5e7).log2().max(0).pow(2).times(tmp.inc.CodeMult).floor()
    },
    CryptoEffect() {
        return player.inc.crypto.max(0).add(1).log10().pow(0.4).pow_base(10)
    },
    NextCrypto() {
        return tmp.inc.CryptoGain.max(0).add(1).div(tmp.inc.CryptoMult).max(1).pow(0.5).pow_base(10).times(2e5)
    },
    NextCode() {
        return tmp.inc.CodeGain.max(0).add(1).div(tmp.inc.CodeMult).max(1).pow(0.5).pow_base(2).times(5e7)
    },
    upgrades: {
        11: {
            title() {return "Growing Trees"},
            description() {
                return "Start generating 0.5 leaves per second."},
            effect() {return D(0.5)},
            cost() {return D(0)},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))+"/s"},
        },
        12: {
            title() {return "Blooming"},
            description() {
                return "Multiply leaf gain based on upgrades."},
            effect() {return D(player.inc.upgrades.length).pow(2).div(4).add(1)},
            cost() {return D(3)},
            unlocked() {return hasUpgrade('inc', 11)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        13: {
            title() {return "Determined"},
            description() {
                return "Multiply incremental point gain based on upgrades."},
            effect() {return D(player.inc.upgrades.length).pow(3).div(8).add(1)},
            cost() {return D(40)},
            unlocked() {return hasUpgrade('inc', 12)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        14: {
            title() {return "Don't Stop."},
            description() {
                return "Multiply addition and multiplication gain by [Tree]+1."},
            effect() {return player.inc.trees.add(1)},
            cost() {return D(1200)},
            unlocked() {return hasUpgrade('inc', 13)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        15: {
            title() {return "Trees' Powers."},
            description() {
                return "Multiply leaf gain based on amount of trees you've unlocked."},
            effect() {return player.a.trees.max(0).add(1).pow(2)},
            cost() {return D(13)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Trees",
            currencyInternalName: "trees",
            unlocked() {return hasUpgrade('inc', 14)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        21: {
            title() {return "Pointy Leaves"},
            description() {
                return "Multiply recursivity and Incremental point gain based on leaves."},
            effect() {return player.inc.leaves.max(0).add(10).log10()},
            cost() {return D(16)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Trees",
            currencyInternalName: "trees",
            unlocked() {return hasUpgrade('inc', 15)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        22: {
            title() {return "Incremental Boost"},
            description() {
                return "Multiply leaf gain based on incremental points."},
            effect() {return player.inc.points.max(0).add(1).log10().pow_base(1.4)},
            cost() {return D(19)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Trees",
            currencyInternalName: "trees",
            unlocked() {return hasUpgrade('inc', 21)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        23: {
            title() {return "Tree Boost"},
            description() {
                return "Multiply Leaf gain by [Trees]+1, Multiply Crypto gain by 1.05 per Trees starting at 20."},
            effect() {return softcap(player.inc.trees.sub(19), D(200)).max(0).pow_base(1.05)},
            cost() {return D(35)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Trees",
            currencyInternalName: "trees",
            unlocked() {return hasUpgrade('inc', 22)&&hasUpgrade('inc', 51)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"+(player.inc.trees.gte(220) ? " (softcapped)" : "")},
        },
        24: {
            title() {return "Softercap"},
            description() {
                return "Tree's Nerf starts later based on upgrades."},
            effect() {return D(player.inc.upgrades.length).div(2).floor()},
            cost() {return D(50)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Trees",
            currencyInternalName: "trees",
            unlocked() {return hasUpgrade('inc', 23)&&hasUpgrade('inc', 51)},
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        25: {
            title() {return "Gentle cap"},
            description() {
                return "Tree's Nerf starts 2.5x later [The Start of the softcap will be floored]."},
            effect() {return D(2.5)},
            cost() {return D(59)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Trees",
            currencyInternalName: "trees",
            unlocked() {return hasUpgrade('inc', 24)&&hasUpgrade('inc', 51)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        31: {
            title() {return "Point Booster I"},
            tooltip() {return "Point, Challenge Power, Plant Point, Meta Point"},
            description() {
                return "Triple All Previous \"Main Point\" and Incremental Point gain."},
            effect() {return D(3)},
            cost() {return D(1)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Crypto",
            currencyInternalName: "crypto",
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        32: {
            title() {return "Leaf Booster I"},
            description() {
                return "Triple Leaf gain."},
            effect() {return D(3)},
            cost() {return D(1)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Crypto",
            currencyInternalName: "crypto",
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        33: {
            title() {return "Tree Effective Booster I"},
            description() {
                return "Square Effective Tree Amount."},
            effect() {return D(2)},
            cost() {return D(1)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Crypto",
            currencyInternalName: "crypto",
            effectDisplay() {return "^"+format(upgradeEffect(this.layer, this.id))},
        },
        34: {
            title() {return "Tree Base Booster I"},
            description() {
                return "Increase Tree base by 0.4."},
            effect() {return D(0.4)},
            cost() {return D(1)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Crypto",
            currencyInternalName: "crypto",
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        35: {
            title() {return "Speed Booster I"},
            description() {
                return "Reduce the scaling of the Tree's requirement by 10%."},
            effect() {return D(0.9)},
            cost() {return D(1)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Crypto",
            currencyInternalName: "crypto",
            effectDisplay() {return "/"+format(D(1).div(upgradeEffect(this.layer, this.id)))},
        },
        41: {
            title() {return "Point Booster II"},
            description() {
                return "Multiply Incremental Point gain based on crypto."},
            effect() {return player.inc.crypto.max(1).log10().add(2)},
            cost() {return D(10)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Crypto",
            currencyInternalName: "crypto",
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        42: {
            title() {return "Leaf Booster II"},
            description() {
                return "Multiply Leaf gain based on crypto."},
            effect() {return player.inc.crypto.max(1).log10().add(3)},
            cost() {return D(10)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Crypto",
            currencyInternalName: "crypto",
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        43: {
            title() {return "Tree Effective Booster II"},
            description() {
                return "Gain free effective trees based on crypto."},
            effect() {return player.inc.crypto.max(1).log2().add(1).floor()},
            cost() {return D(10)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Crypto",
            currencyInternalName: "crypto",
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        44: {
            title() {return "Tree Effect Booster II"},
            description() {
                return "Increase Tree base based on crypto."},
            effect() {return player.inc.crypto.max(1).log2().div(7)},
            cost() {return D(10)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Crypto",
            currencyInternalName: "crypto",
            effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))},
        },
        45: {
            title() {return "Speed Booster II"},
            description() {
                return "Decrease Tree Scaling based on crypto, hardcaps at /1.25."},
            effect() {return D(0.96).pow(player.inc.crypto.max(1).log10()).max(0.8)},
            cost() {return D(10)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Crypto",
            currencyInternalName: "crypto",
            effectDisplay() {return "/"+format(D(1).div(upgradeEffect(this.layer, this.id)))},
        },
        51: {
            title() {return "Another Dimension"},
            description() {
                return "Double Crypto Gain, Unlock crypto dimensions."},
            effect() {return D(2)},
            cost() {return D(40)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Crypto",
            currencyInternalName: "crypto",
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        52: {
            title() {return "Tree Quality"},
            description() {
                return "You can bulk beating trees, Triple Crypto Gain."},
            effect() {return D(3)},
            cost() {return D(250)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Crypto",
            currencyInternalName: "crypto",
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        53: {
            title() {return "Tree Automating"},
            description() {
                return "Automate Tree Buyables, Quadruple Leaf Gain, Unlock Byte Buyable."},
            effect() {return D(4)},
            cost() {return D(5000)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Crypto",
            currencyInternalName: "crypto",
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        54: {
            title() {return "A Good Byte"},
            description() {
                return "Multiply Leaf and Crypto gain based on Bytes."},
            effect() {return player.inc.byte.max(1).log10().pow_base(1.4)},
            cost() {return D(20000)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Crypto",
            currencyInternalName: "crypto",
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        55: {
            title() {return "Slower.."},
            description() {
                return "Divide Trees' cost by [Tree]+1, Decrease Tree's Scaling by 15%."},
            effect() {return D(0.85)},
            cost() {return D(100000)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Crypto",
            currencyInternalName: "crypto",
            effectDisplay() {return "/"+format(D(1).div(upgradeEffect(this.layer, this.id)))},
        },
        61: {
            title() {return "Make Your Mods NFTS!"},
            description() {
                return "Multiply Line of Code and Crypto gain by [Mods]+2."},
            effect() {return player.inc.mods.max(0).add(2)},
            cost() {return D(2)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Code Experience",
            currencyInternalName: "ce",
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        62: {
            title() {return "Modified Dimensions"},
            description() {
                return "Multiply Crypto Dimensions' Multiplier based on Mods."},
            effect() {return player.inc.mods.max(0).div(5).add(1)},
            cost() {return D(8)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Code Experience",
            currencyInternalName: "ce",
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        63: {
            title() {return "Mod Time."},
            description() {
                return "Gain 10% of Crypto gain per second, Multiply Time Energy gain by 5 per mod."},
            effect() {return player.inc.mods.max(0).pow_base(5)},
            cost() {return D(20)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Code Experience",
            currencyInternalName: "ce",
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        64: {
            title() {return "Cryptomator"},
            description() {
                return "Automate Crypto Buyables, Multiply Incremental Point gain based on it."},
            effect() {return player.inc.points.max(0).add(1).log2().pow(0.6).pow_base(1.1)},
            cost() {return D(60)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Code Experience",
            currencyInternalName: "ce",
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        65: {
            title() {return "Welcome to the Realm!"},
            description() {
                return "Multiply Lines of Code gain by [Upgrades]+1, Unlock Realm mods."},
            effect() {return D(1).add(player.inc.upgrades.length)},
            cost() {return D(200)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Code Experience",
            currencyInternalName: "ce",
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        71: {
            title() {return "Critical Byte"},
            description() {
                return "Multiply Code Experience and Lines of Code gain based on Byte."},
            effect() {return player.inc.byte.max(0).add(2).log2().pow(0.5)},
            cost() {return D(1000)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Code Experience",
            currencyInternalName: "ce",
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        72: {
            title() {return "Slight Optimization"},
            description() {
                return "Half Mod Requirement per Mod."},
            effect() {return player.inc.mods.pow_base(2)},
            cost() {return D(10000)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Code Experience",
            currencyInternalName: "ce",
            effectDisplay() {return "/"+format(upgradeEffect(this.layer, this.id))},
        },
        73: {
            title() {return "Time to Buy!"},
            description() {
                return "Multiply Code Experience gain by [Mods]+1, Unlock Coding Buyables."},
            effect() {return player.inc.mods.max(0).add(1)},
            cost() {return D(40000)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Code Experience",
            currencyInternalName: "ce",
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        74: {
            title() {return "#js-help"},
            description() {
                return "Multiply Code Experience gain based on Lines of Code."},
            effect() {return player.inc.loc.max(0).add(10).log10().add(1).pow(2)},
            cost() {return D(1e7)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Code Experience",
            currencyInternalName: "ce",
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        75: {
            title() {return "#tmt-help"},
            description() {
                return "Multiply Lines of Code gain based on Code Experience."},
            effect() {return player.inc.ce.max(0).add(2).log2().add(1).pow(2)},
            cost() {return D(3e8)},
            currencyLocation() {return player.inc},
            currencyDisplayName: "Code Experience",
            currencyInternalName: "ce",
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
    },
    automate() {
        if (hasUpgrade('inc', 53)) {
            buyBuyable('inc', 11)
            buyBuyable('inc', 12)
            buyBuyable('inc', 21)
            buyBuyable('inc', 22)
        }
        if (hasUpgrade('inc', 64)) {
            buyBuyable('inc', 31)
            buyBuyable('inc', 32)
            buyBuyable('inc', 33)
            buyBuyable('inc', 34)
            buyBuyable('inc', 41)
            buyBuyable('inc', 42)
            buyBuyable('inc', 43)
        }
    },
    buyables: {
        11: {
            title() {return "Leaves Multiplier"},
            display() {
                return "Increase leaves gain by 25% per level, Double this effect every 10 levels<br>Cost: "+format(this.cost())+" Incremental Points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            effect(x) {return D(0.25).times(x).add(1).times(D(2).pow(x.div(10).floor()))},
            unlocked() {return hasUpgrade('inc', 12)},
            tooltip() {return "Cost Formula: 1.25<sup>x<sup>1.25</sup></sup>"},
            cost(x) {let base = D(1.25).pow(x.pow(1.25))
                return base
            },
            buy() {
                let cost = D(1)
                if (hasUpgrade('inc', 53)) cost = D(0)
                player.inc.points = player.inc.points.sub(this.cost().mul(cost)).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.inc.points.gte(this.cost())
            },
        },
        12: {
            title() {return "Incremental Multiplier"},
            display() {
                return "Increase incremental point gain base by 0.1 per level, Double this effect every 5 levels<br>Cost: "+format(this.cost())+" Trees<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: +"+format(this.effect())
            },
            effect(x) {return D(0.1).times(x).times(D(2).pow(x.div(5).floor()))},
            unlocked() {return hasUpgrade('inc', 12)},
            tooltip() {return "Cost Formula: 1.1<sup>x<sup>1.25</sup></sup>*3"},
            cost(x) {let base = D(1.1).pow(x.pow(1.25)).times(3).floor()
                return base
            },
            buy() {
                let cost = D(1)
                if (hasUpgrade('inc', 53)) cost = D(0)
                player.inc.trees = player.inc.trees.sub(this.cost().mul(cost)).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.inc.trees.gte(this.cost())
            },
        },
        21: {
            title() {return "Slow Trees"},
            display() {
                return "Reduce the scaling of the Tree's Requirement by 5% per level<br>Cost: "+format(this.cost())+" Incremental Points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: /"+format(D(1).div(this.effect()))
            },
            effect(x) {return D(0.95).pow(softcap(x, D(20), D(0.5)))},
            unlocked() {return hasUpgrade('inc', 13)},
            tooltip() {return "Cost Formula: 3<sup>x<sup>1.5</sup></sup>"},
            cost(x) {let base = D(3).pow(x.pow(1.5))
                return base
            },
            buy() {
                let cost = D(1)
                if (hasUpgrade('inc', 53)) cost = D(0)
                player.inc.points = player.inc.points.sub(this.cost().mul(cost)).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.inc.points.gte(this.cost())
            },
        },
        22: {
            title() {return "Cheap Trees"},
            display() {
                return "Divide Tree Requirement by 1.5 per level<sup>2</sup><br>Cost: "+format(this.cost())+" Trees<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: /"+format(this.effect())
            },
            effect(x) {return D(1.5).pow(x.pow(2))},
            unlocked() {return hasUpgrade('inc', 13)},
            tooltip() {return "Cost Formula: 3<sup>x</sup>*3"},
            cost(x) {let base = D(3).pow(x.add(1)).floor()
                return base
            },
            buy() {
                let cost = D(1)
                if (hasUpgrade('inc', 53)) cost = D(0)
                player.inc.trees = player.inc.trees.sub(this.cost().mul(cost)).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.inc.trees.gte(this.cost())
            },
        },
        31: {
            title() {return "1st Crypto Dimension"},
            display() {
                return "Generating "+format(this.effect().g)+" bytes per second<br>Cost: "+format(this.cost())+" Crypto<br>Multiplier: "+format(this.effect().m)+"x<br>Amount: "+format(player.inc.cd1)+"<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))
            },
            effect(x) {
                let gen = player.inc.cd1.max(0).div(2)
                let mult = D(1.05).pow(x.sub(1).max(0).pow(2)).times(buyableEffect('inc', 43))
                if (hasUpgrade('inc', 62)) mult = mult.times(upgradeEffect('inc', 62))
                mult = mult.times(tmp.inc.RealmBoost.di)
                return {
                    g: gen.times(mult),
                    m: mult
                }
            },
            unlocked() {return hasUpgrade('inc', 51)},
            tooltip() {return "Cost Formula: 10*2<sup>x<sup>1.25</sup></sup>"},
            cost(x) {let base = D(2).pow(x.pow(1.25)).times(10).floor()
                if (x.gte(19)) base = D(2).pow(D(19).add(x.sub(19).times(x.sub(18)).div(2)).pow(1.25)).times(10).floor()
                return base
            },
            buy() {
                let cost = D(1)
                if (hasUpgrade('inc', 64)) cost = D(0)
                player.inc.crypto = player.inc.crypto.sub(this.cost().mul(cost)).max(0)
                player.inc.cd1 = player.inc.cd1.add(1)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.inc.crypto.gte(this.cost())
            },
        },
        32: {
            title() {return "2nd Crypto Dimension"},
            display() {
                return "Generating "+format(this.effect().g)+" 1st crypto dimensions per second<br>Cost: "+format(this.cost())+" Crypto<br>Multiplier: "+format(this.effect().m)+"x<br>Amount: "+format(player.inc.cd2)+"<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))
            },
            effect(x) {
                let gen = player.inc.cd2.max(0).pow(0.8).div(5)
                let mult = D(1.05).pow(x.sub(1).max(0).pow(2)).times(buyableEffect('inc', 43))
                if (hasUpgrade('inc', 62)) mult = mult.times(upgradeEffect('inc', 62))
                mult = mult.times(tmp.inc.RealmBoost.di)
                return {
                    g: gen.times(mult),
                    m: mult
                }
            },
            unlocked() {return hasUpgrade('inc', 51)},
            tooltip() {return "Cost Formula: 40*10<sup>x<sup>1.25</sup></sup>"},
            cost(x) {let base = D(10).pow(x.pow(1.25)).times(40).floor()
                if (x.gte(19)) base = D(10).pow(D(19).add(x.sub(19).times(x.sub(18)).div(2)).pow(1.25)).times(40).floor()
                return base
            },
            buy() {
                let cost = D(1)
                if (hasUpgrade('inc', 64)) cost = D(0)
                player.inc.crypto = player.inc.crypto.sub(this.cost().mul(cost)).max(0)
                player.inc.cd2 = player.inc.cd2.add(1)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.inc.crypto.gte(this.cost())
            },
        },
        33: {
            title() {return "3rd Crypto Dimension"},
            display() {
                return "Generating "+format(this.effect().g)+" 2nd crypto dimensions per second<br>Cost: "+format(this.cost())+" Crypto<br>Multiplier: "+format(this.effect().m)+"x<br>Amount: "+format(player.inc.cd3)+"<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))
            },
            effect(x) {
                let gen = player.inc.cd3.max(0).pow(0.8).div(12.5)
                let mult = D(1.05).pow(x.sub(1).max(0).pow(2)).times(buyableEffect('inc', 43))
                if (hasUpgrade('inc', 62)) mult = mult.times(upgradeEffect('inc', 62))
                mult = mult.times(tmp.inc.RealmBoost.di)
                return {
                    g: gen.times(mult),
                    m: mult
                }
            },
            unlocked() {return hasUpgrade('inc', 51)},
            tooltip() {return "Cost Formula: 640*50<sup>x<sup>1.25</sup></sup>"},
            cost(x) {let base = D(50).pow(x.pow(1.25)).times(640).floor()
                if (x.gte(19)) base = D(50).pow(D(19).add(x.sub(19).times(x.sub(18)).div(2)).pow(1.25)).times(640).floor()
                return base
            },
            buy() {
                let cost = D(1)
                if (hasUpgrade('inc', 64)) cost = D(0)
                player.inc.crypto = player.inc.crypto.sub(this.cost().mul(cost)).max(0)
                player.inc.cd3 = player.inc.cd3.add(1)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.inc.crypto.gte(this.cost())
            },
        },
        34: {
            title() {return "4th Crypto Dimension"},
            display() {
                return "Generating "+format(this.effect().g)+" 3rd crypto dimensions per second<br>Cost: "+format(this.cost())+" Crypto<br>Multiplier: "+format(this.effect().m)+"x<br>Amount: "+format(player.inc.cd4)+"<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))
            },
            effect(x) {
                let gen = player.inc.cd4.max(0).pow(0.8).div(31.25)
                let mult = D(1.05).pow(x.sub(1).max(0).pow(2)).times(buyableEffect('inc', 43))
                if (hasUpgrade('inc', 62)) mult = mult.times(upgradeEffect('inc', 62))
                mult = mult.times(tmp.inc.RealmBoost.di)
                return {
                    g: gen.times(mult),
                    m: mult
                }
            },
            unlocked() {return hasUpgrade('inc', 51)},
            tooltip() {return "Cost Formula: 40,960*250<sup>x<sup>1.25</sup></sup>"},
            cost(x) {let base = D(250).pow(x.pow(1.25)).times(40960).floor()
                if (x.gte(19)) base = D(250).pow(D(19).add(x.sub(19).times(x.sub(18)).div(2)).pow(1.25)).times(40960).floor()
                return base
            },
            buy() {
                let cost = D(1)
                if (hasUpgrade('inc', 64)) cost = D(0)
                player.inc.crypto = player.inc.crypto.sub(this.cost().mul(cost)).max(0)
                player.inc.cd4 = player.inc.cd4.add(1)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.inc.crypto.gte(this.cost())
            },
        },
        41: {
            title() {return "Digital Tree"},
            display() {
                return "Double all previous \"main point\", incremental point, leaf gain, Tree scales 5% slower per level<br>Cost: "+format(this.cost())+" Byte<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effects: "+format(this.effect().m)+"x, /"+format(D(1).div(this.effect().s))
            },
            effect(x) {
                let mult = x.max(0).pow_base(2)
                let scale = softcap(x.max(0), D(20), D(0.5)).pow_base(0.95)
                return {
                    m: mult,
                    s: scale
                }
            },
            unlocked() {return hasUpgrade('inc', 53)},
            tooltip() {return "Cost Formula: 100*5<sup>x<sup>1.25</sup></sup>"},
            cost(x) {let base = D(5).pow(x.pow(1.25)).times(100).floor()
                if (x.gte(19)) base = D(5).pow(D(19).add(x.sub(19).times(x.sub(18)).div(2)).pow(1.25)).times(100).floor()
                return base
            },
            buy() {
                let cost = D(1)
                if (hasUpgrade('inc', 64)) cost = D(0)
                player.inc.byte = player.inc.byte.sub(this.cost().mul(cost)).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.inc.byte.gte(this.cost())
            },
        },
        42: {
            title() {return "Digital Income"},
            display() {
                return "Multiply Crypto gain by 1.25 per level<br>Cost: "+format(this.cost())+" Byte<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            effect(x) {
                return x.max(0).pow_base(1.25)
            },
            unlocked() {return hasUpgrade('inc', 53)},
            tooltip() {return "Cost Formula: 500*4<sup>x<sup>1.25</sup></sup>"},
            cost(x) {let base = D(4).pow(x.pow(1.25)).times(500).floor()
                if (x.gte(19)) base = D(4).pow(D(19).add(x.sub(19).times(x.sub(18)).div(2)).pow(1.25)).times(500).floor()
                return base
            },
            buy() {
                let cost = D(1)
                if (hasUpgrade('inc', 64)) cost = D(0)
                player.inc.byte = player.inc.byte.sub(this.cost().mul(cost)).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.inc.byte.gte(this.cost())
            },
        },
        43: {
            title() {return "Digital Dimensions"},
            display() {
                return "Multiply Crypto dimensions' multiplier by 1.2 per level<br>Cost: "+format(this.cost())+" Byte<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            effect(x) {
                return x.max(0).pow_base(1.2)
            },
            unlocked() {return hasUpgrade('inc', 53)},
            tooltip() {return "Cost Formula: 10,000*5<sup>x<sup>1.25</sup></sup>"},
            cost(x) {let base = D(5).pow(x.pow(1.25)).times(1e4).floor()
                if (x.gte(19)) base = D(5).pow(D(19).add(x.sub(19).times(x.sub(18)).div(2)).pow(1.25)).times(1e4).floor()
                return base
            },
            buy() {
                let cost = D(1)
                if (hasUpgrade('inc', 64)) cost = D(0)
                player.inc.byte = player.inc.byte.sub(this.cost().mul(cost)).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.inc.byte.gte(this.cost())
            },
        },
        51: {
            title() {return "Extra Coder"},
            display() {
                return "Double Lines of code gain per level<br>Cost: "+format(this.cost())+" Code Experience<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            effect(x) {return x.pow_base(2)},
            unlocked() {return hasUpgrade('inc', 73)},
            tooltip() {return "Cost Formula: 10<sup>x</sup>"},
            cost(x) {let base = D(10).pow(x)
                return base
            },
            buy() {
                let cost = D(1)
                player.inc.ce = player.inc.ce.sub(this.cost().mul(cost)).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.inc.ce.gte(this.cost())
            },
        },
        52: {
            title() {return "Coding Lessons"},
            display() {
                return "Double Code Experience gain per level<br>Cost: "+format(this.cost())+" Mods<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            effect(x) {return x.pow_base(2)},
            unlocked() {return hasUpgrade('inc', 73)},
            tooltip() {return "Cost Formula: x<sup>2</sup>+1"},
            cost(x) {let base = x.pow(2).add(1)
                return base
            },
            buy() {
                let cost = D(1)
                player.inc.mods = player.inc.mods.sub(this.cost().mul(cost)).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.inc.mods.gte(this.cost())
            },
        },
        53: {
            title() {return "Hyper Realms"},
            display() {
                return "Double All Realm power gain per level<br>Cost: "+format(this.cost())+" Code Experience<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+format(this.effect())+"x"
            },
            effect(x) {return x.pow_base(2)},
            unlocked() {return hasUpgrade('inc', 73)},
            tooltip() {return "Cost Formula: 10<sup>x</sup>"},
            cost(x) {let base = D(25).pow(x)
                return base
            },
            buy() {
                let cost = D(1)
                player.inc.ce = player.inc.ce.sub(this.cost().mul(cost)).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player.inc.ce.gte(this.cost())
            },
        },
    },
    clickables: {
        11: {
            title() {return "<h2>Reset for "+formatWhole(tmp.inc.CryptoGain)+" Crypto</h2>"+ ((tmp.inc.CryptoGain.lte(10000)) ? "<br>Next at "+formatWhole(tmp.inc.NextCrypto)+" Incremental Points" : "")},
            canClick() {return player.inc.points.gte(4e5)&&tmp.inc.CryptoGain.gte(1)},
            onClick() {
                player.points = D(0)
                player.inc.crypto = player.inc.crypto.add(tmp.inc.CryptoGain)
                player.inc.trees = D(0)
                player.inc.points = D(0)
                player.inc.leaves = D(0)
                setBuyableAmount(this.layer, 11, D(0))
                setBuyableAmount(this.layer, 12, D(0))
                setBuyableAmount(this.layer, 21, D(0))
                setBuyableAmount(this.layer, 22, D(0))
                if (!hasMilestone('inc', 0)){for (let i = 0; i < player.inc.upgrades.length; i++) {
                    if (player.inc.upgrades[i]<26) {
                        player.inc.upgrades.splice(i, 1);
                        i--;
                    }
                }}
            },
            style: { width: '400px', "min-height": '100px', "background-color": "blue" }
        },
        12: {
            title() {return "<h2>Reset for "+formatWhole(tmp.inc.CodeGain)+" Code Experience</h2>"+ ((tmp.inc.CodeGain.lte(10000)) ? "<br>Next at "+formatWhole(tmp.inc.NextCode)+" Crypto" : "")},
            canClick() {return player.inc.crypto.gte(1e8)&&tmp.inc.CodeGain.gte(1)},
            onClick() {
                player.inc.ce = player.inc.ce.add(tmp.inc.CodeGain)
                player.points = D(0)
                player.inc.crypto = D(0)
                player.inc.byte = D(0)
                player.inc.cd1 = D(0)
                player.inc.cd2 = D(0)
                player.inc.cd3 = D(0)
                player.inc.cd4 = D(0)
                player.inc.trees = D(0)
                player.inc.points = D(0)
                player.inc.leaves = D(0)
                setBuyableAmount(this.layer, 11, D(0))
                setBuyableAmount(this.layer, 12, D(0))
                setBuyableAmount(this.layer, 21, D(0))
                setBuyableAmount(this.layer, 22, D(0))
                setBuyableAmount(this.layer, 31, D(0))
                setBuyableAmount(this.layer, 32, D(0))
                setBuyableAmount(this.layer, 33, D(0))
                setBuyableAmount(this.layer, 34, D(0))
                setBuyableAmount(this.layer, 41, D(0))
                setBuyableAmount(this.layer, 42, D(0))
                setBuyableAmount(this.layer, 43, D(0))
                for (let i = 0; i < player.inc.upgrades.length; i++) {
                    if (player.inc.upgrades[i]<56) {
                        player.inc.upgrades.splice(i, 1);
                        i--;
                    }
                }
                if (hasMilestone('inc', 0)) {
                    player.inc.upgrades.push(11, 12, 13, 14, 15, 21, 22, 23, 24, 25)
                }
            },
            style: { width: '400px', "min-height": '100px', "background-color": "purple" }
        },
        13: {
            title() {return "<img src='resources/symbolcreator.png' style='width:calc(80%);height:calc(80%);margin:10%'></img>"},
            tooltip() {return "You have deposited "+formatWhole(player.inc.crd)+" mods to the creator realm<br>Creator Realm Lv. "+formatWhole(player.inc.crlv)},
            unlocked() {return hasUpgrade('inc', 65)&&player.inc.rpage.eq(0)},
            canClick() {return player.inc.mods.gte(1)},
            onClick() {
                player.inc.crd = player.inc.crd.add(player.inc.mods)
                player.inc.mods = D(0)
            },
        },
        14: {
            title() {return "<img src='resources/symbolhigh.png' style='width:calc(80%);height:calc(80%);margin:10%'></img>"},
            tooltip() {return "You have deposited "+formatWhole(player.inc.hid)+" mods to the higher plane<br>Higher Plane Lv. "+formatWhole(player.inc.hilv)},
            unlocked() {return hasUpgrade('inc', 65)&&player.inc.rpage.eq(1)},
            canClick() {return player.inc.mods.gte(1)},
            onClick() {
                player.inc.hid = player.inc.hid.add(player.inc.mods)
                player.inc.mods = D(0)
            },
        },
        15: {
            title() {return "<img src='resources/symboldeath.png' style='width:calc(80%);height:calc(80%);margin:10%'></img>"},
            tooltip() {return "You have deposited "+formatWhole(player.inc.ded)+" mods to the death realm<br>Death Realm Lv. "+formatWhole(player.inc.delv)},
            unlocked() {return hasUpgrade('inc', 65)&&player.inc.rpage.eq(2)},
            canClick() {return player.inc.mods.gte(1)},
            onClick() {
                player.inc.ded = player.inc.ded.add(player.inc.mods)
                player.inc.mods = D(0)
            },
        },
        16: {
            title() {return "<img src='resources/symboldimension.png' style='width:calc(80%);height:calc(80%);margin:10%'></img>"},
            tooltip() {return "You have deposited "+formatWhole(player.inc.did)+" mods to the dimensional realm<br>Dimensional Realm Lv. "+formatWhole(player.inc.dilv)},
            unlocked() {return hasUpgrade('inc', 65)&&player.inc.rpage.eq(3)},
            canClick() {return player.inc.mods.gte(1)},
            onClick() {
                player.inc.did = player.inc.did.add(player.inc.mods)
                player.inc.mods = D(0)
            },
        },
        17: {
            title() {return "<img src='resources/symbolbackrooms.png' style='width:calc(80%);height:calc(80%);margin:10%'></img>"},
            tooltip() {return "You have deposited "+formatWhole(player.inc.bad)+" mods to the backrooms<br>Backrooms Lv. "+formatWhole(player.inc.balv)},
            unlocked() {return hasUpgrade('inc', 65)&&player.inc.rpage.eq(4)},
            canClick() {return player.inc.mods.gte(1)},
            onClick() {
                player.inc.bad = player.inc.bad.add(player.inc.mods)
                player.inc.mods = D(0)
            },
        },
        18: {
            title() {return "<img src='resources/symbolvoid.png' style='width:calc(80%);height:calc(80%);margin:10%'></img>"},
            tooltip() {return "You have deposited "+formatWhole(player.inc.vod)+" mods to the void<br>Void Lv. "+formatWhole(player.inc.volv)},
            unlocked() {return hasUpgrade('inc', 65)&&player.inc.rpage.eq(5)},
            canClick() {return player.inc.mods.gte(1)},
            onClick() {
                player.inc.vod = player.inc.vod.add(player.inc.mods)
                player.inc.mods = D(0)
            },
        },
        21: {
            title() {return "<"},
            unlocked() {return hasUpgrade('inc', 65)},
            canClick() {return player.inc.rpage.gt(0)},
            onClick() {
                player.inc.rpage = player.inc.rpage.sub(1)
            },
        },
        22: {
            title() {return ">"},
            unlocked() {return hasUpgrade('inc', 65)},
            canClick() {return player.inc.rpage.lt(5)},
            onClick() {
                player.inc.rpage = player.inc.rpage.add(1)
            },
        },
    },
    CrRealmReq() {
        return D(5).pow(player.inc.crlv.pow(1.25))
    },
    HiRealmReq() {
        return D(5).pow(player.inc.hilv.pow(1.25))
    },
    DeRealmReq() {
        return D(5).pow(player.inc.delv.pow(1.25))
    },
    DiRealmReq() {
        return D(5).pow(player.inc.dilv.pow(1.25))
    },
    BaRealmReq() {
        return D(5).pow(player.inc.balv.pow(1.25))
    },
    VoRealmReq() {
        return D(5).pow(player.inc.volv.pow(1.25))
    },
    bars: {
        0: {
            direction: RIGHT,
            width: 250,
            height: 50,
            progress() {return player.inc.leaves.div(tmp.inc.TreeReq)},
            display() {return format(player.inc.leaves)+" / "+format(tmp.inc.TreeReq)+"<br>leaves to beat a tree"},
            instant: false,
            unlocked() {return true},
            fillStyle: {'background-color' : "green"},
            baseStyle: {'background-color' : "#000000"},
        },
        1: {
            direction: RIGHT,
            width: 250,
            height: 50,
            progress() {return player.inc.loc.div(tmp.inc.ModReq)},
            display() {return format(player.inc.loc)+" / "+format(tmp.inc.ModReq)+"<br>lines of code to make a mod"},
            instant: false,
            unlocked() {return true},
            fillStyle: {'background-color' : "purple"},
            baseStyle: {'background-color' : "#000000"},
        },
        2: {
            direction: RIGHT,
            width: 250,
            height: 117,
            progress() {return player.inc.crp.div(tmp.inc.CrRealmReq)},
            display() {return format(player.inc.crp)+" / "+format(tmp.inc.CrRealmReq)+"<br>creation power to make a creation mod"},
            instant: false,
            unlocked() {return hasUpgrade('inc', 65)&&player.inc.rpage.eq(0)},
            fillStyle: {'background-color' : "red"},
            baseStyle: {'background-color' : "#000000"},
        },
        3: {
            direction: RIGHT,
            width: 250,
            height: 117,
            progress() {return player.inc.hip.div(tmp.inc.HiRealmReq)},
            display() {return format(player.inc.hip)+" / "+format(tmp.inc.HiRealmReq)+"<br>divine power to make a divine mod"},
            instant: false,
            unlocked() {return hasUpgrade('inc', 65)&&player.inc.rpage.eq(1)},
            fillStyle: {'background-color' : "orange"},
            baseStyle: {'background-color' : "#000000"},
        },
        4: {
            direction: RIGHT,
            width: 250,
            height: 117,
            progress() {return player.inc.dep.div(tmp.inc.DeRealmReq)},
            display() {return format(player.inc.dep)+" / "+format(tmp.inc.DeRealmReq)+"<br>fatal power to make a fatal mod"},
            instant: false,
            unlocked() {return hasUpgrade('inc', 65)&&player.inc.rpage.eq(2)},
            fillStyle: {'background-color' : "yellow"},
            baseStyle: {'background-color' : "#000000"},
        },
        5: {
            direction: RIGHT,
            width: 250,
            height: 117,
            progress() {return player.inc.dip.div(tmp.inc.DiRealmReq)},
            display() {return format(player.inc.dip)+" / "+format(tmp.inc.DiRealmReq)+"<br>dimensional power to make a dimensional mod"},
            instant: false,
            unlocked() {return hasUpgrade('inc', 65)&&player.inc.rpage.eq(3)},
            fillStyle: {'background-color' : "green"},
            baseStyle: {'background-color' : "#000000"},
        },
        6: {
            direction: RIGHT,
            width: 250,
            height: 117,
            progress() {return player.inc.bap.div(tmp.inc.BaRealmReq)},
            display() {return format(player.inc.bap)+" / "+format(tmp.inc.BaRealmReq)+"<br>liminal power to make a liminal mod"},
            instant: false,
            unlocked() {return hasUpgrade('inc', 65)&&player.inc.rpage.eq(4)},
            fillStyle: {'background-color' : "blue"},
            baseStyle: {'background-color' : "#000000"},
        },
        7: {
            direction: RIGHT,
            width: 250,
            height: 117,
            progress() {return player.inc.vop.div(tmp.inc.VoRealmReq)},
            display() {return format(player.inc.vop)+" / "+format(tmp.inc.VoRealmReq)+"<br>shadow power to make a shadow mod"},
            instant: false,
            unlocked() {return hasUpgrade('inc', 65)&&player.inc.rpage.eq(5)},
            fillStyle: {'background-color' : "purple"},
            baseStyle: {'background-color' : "#000000"},
        },
    },
    milestones: {
        0: {
            requirementDescription() {return "Incremental God Tree v0.2"},
            done() {return player[this.layer].version.gte(2)},
            effect() {
                return player[this.layer].best.pow_base(2)},
            effectDescription() {return "Keep all trees upgrades on all reset, Double Crypto gain per update."},
        },
    },
    doReset(l) {
        if (!(layers[l].row > this.row)) return
        
        let keep = ['milestones']
        if (player.universe.eq(4)){layerDataReset(this.layer, keep)}
    },
    versionList() {
        return ['v0.0', 'v0.1', 'v0.2', 'v0.3']
    },
    layerShown(){return (player.universe.eq(4))},
    update(diff) {
        addPoints('inc', tmp.inc.TreeEffect.times(diff))
        player.inc.leaves = player.inc.leaves.add(tmp.inc.Leafgain.times(diff)).max(0)
        if (player.inc.leaves.gte(tmp.inc.TreeReq)) {
            if (hasUpgrade('inc', 52)) {player.inc.trees = player.inc.leaves.max(0).div(4).times(buyableEffect('inc', 22)).times(tmp.inc.TreeDiv).log(1.05).pow(0.5).max(player.inc.trees.add(1)).floor()}
            if (!hasUpgrade('inc', 52)) {player.inc.trees = player.inc.trees.add(1).floor()}
            player.inc.leaves = D(0)
        }
        if (player.inc.loc.gte(tmp.inc.ModReq)) {
            player.inc.mods = player.inc.mods.add(1)
            player.inc.loc = D(0)
        }
        if (hasUpgrade('inc', 63)) {
            player.inc.crypto = player.inc.crypto.add(tmp.inc.CryptoGain.div(10).times(diff))
        }
        player.inc.byte = player.inc.byte.add(buyableEffect('inc', 31).g.times(diff)).max(0)
        player.inc.cd1 = player.inc.cd1.add(buyableEffect('inc', 32).g.times(diff)).max(0)
        player.inc.cd2 = player.inc.cd2.add(buyableEffect('inc', 33).g.times(diff)).max(0)
        player.inc.cd3 = player.inc.cd3.add(buyableEffect('inc', 34).g.times(diff)).max(0)
        player.inc.loc = player.inc.loc.add(tmp.inc.LoCgain.times(diff))
        player.inc.crp = player.inc.crp.add(player.inc.crd.pow(0.5).div(10).times(buyableEffect('inc', 53)).times(diff))
        player.inc.hip = player.inc.hip.add(player.inc.hid.pow(0.5).div(10).times(buyableEffect('inc', 53)).times(diff))
        player.inc.dep = player.inc.dep.add(player.inc.ded.pow(0.5).div(10).times(buyableEffect('inc', 53)).times(diff))
        player.inc.dip = player.inc.dip.add(player.inc.did.pow(0.5).div(10).times(buyableEffect('inc', 53)).times(diff))
        player.inc.bap = player.inc.bap.add(player.inc.bad.pow(0.5).div(10).times(buyableEffect('inc', 53)).times(diff))
        player.inc.vop = player.inc.vop.add(player.inc.vod.pow(0.5).div(10).times(buyableEffect('inc', 53)).times(diff))
        if (player.inc.crp.gte(tmp.inc.CrRealmReq)) {
            player.inc.crlv = player.inc.crlv.add(1)
            player.inc.crp = D(0)
        }
        if (player.inc.hip.gte(tmp.inc.HiRealmReq)) {
            player.inc.hilv = player.inc.hilv.add(1)
            player.inc.hip = D(0)
        }
        if (player.inc.dep.gte(tmp.inc.DeRealmReq)) {
            player.inc.delv = player.inc.delv.add(1)
            player.inc.dep = D(0)
        }
        if (player.inc.dip.gte(tmp.inc.DiRealmReq)) {
            player.inc.dilv = player.inc.dilv.add(1)
            player.inc.dip = D(0)
        }
        if (player.inc.bap.gte(tmp.inc.BaRealmReq)) {
            player.inc.balv = player.inc.balv.add(1)
            player.inc.bap = D(0)
        }
        if (player.inc.vop.gte(tmp.inc.VoRealmReq)) {
            player.inc.volv = player.inc.volv.add(1)
            player.inc.vop = D(0)
        }
    }
})