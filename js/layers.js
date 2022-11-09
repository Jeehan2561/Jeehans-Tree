addLayer("difficulty", {
    name: "difficulty",
    symbol: "↑",
    position: 1,
    startData() {return {
        unlocked: true,
        points: new Decimal (0),
        gameStarted: false,
        gpBoost: false,
        dividerNerf: false,
        staticResBoost: false
    }},
    tooltip() {
        return "Difficulty"
    },
    color: "#FFFFFF",
    resource: "difficulty",
    type: "none",
    row: "side",
    tabFormat: {
        Difficulty:{
            unlocked() {return false},
        content:[
            ["display-text", function() { return '<h2>Difficulty</h2>' }],
            "blank",
            "blank",
            "clickables",
            ["display-text", function() {
                if (!player.difficulty.gameStarted) return ""
                return "You have spent "+formatTime(player.runTime)+" in this run"
            }],
            "blank",
            ["display-text", function() { return 'Note: The game is kinda balanced in normal mode and I didn\'t balance stuffs in other modes so expect some unbalanced gameplays\.' }]
        ]
        }
    },
    update(diff){
        if (player.difficulty.gameStarted) player.runTime = player.runTime.add(diff)
    },
    clickables: {
        11: {
            title: "GP Boost",
            display(){
                if (player.difficulty.gpBoost) return "is On (Easier version)"
                return "is off (Normal Version)"
            },
            unlocked() {return true},
            canClick() {return !player.difficulty.gameStarted},
            onClick() { player.difficulty.gpBoost = !player.difficulty.gpBoost },
            style: {"background-color"(){
                let color = "#FF0000"
                if (player.difficulty.gpBoost) color = "#00FF00"
                return color
            }},
        },
        12: {
            title: "Point gain divider",
            display(){
                if (player.difficulty.dividerNerf) return "is raised to the 0.75th power (Easier version)"
                return "is on (Normal Version)"
            },
            unlocked() {return true},
            canClick() {return !player.difficulty.gameStarted},
            onClick() { player.difficulty.dividerNerf = !player.difficulty.dividerNerf },
            style: {"background-color"(){
                let color = "#FF0000"
                if (player.difficulty.dividerNerf) color = "#00FF00"
                return color
            }},
        },
        13: {
            title: "Multiply Non-Static resources gain by",
            tooltip() {return "(Exclude GP)"},
            display(){
                if (player.difficulty.staticResBoost) return "2 (Easier version)"
                return "1 (Normal Version)"
            },
            unlocked() {return true},
            canClick() {return !player.difficulty.gameStarted},
            onClick() { player.difficulty.staticResBoost = !player.difficulty.staticResBoost },
            style: {"background-color"(){
                let color = "#FF0000"
                if (player.difficulty.staticResBoost) color = "#00FF00"
                return color
            }},
        },
        21: {
            title: "Start the run",
            display(){
                return "Start the run"
            },
            unlocked() {return true},
            canClick() {return !player.difficulty.gameStarted},
            onClick() {
                if(confirm("Start the run?")) {
                    player.difficulty.gameStarted = true
                    player.points = modInfo.initialStartPoints
                    player.runTime = new Decimal (0)
                    player.keepGoing = false
                    tmp.gameEnded = false
                }
            },
            style: {"background-color"(){
                let color = "#FF0000"
                if (player.difficulty.gameStarted) color = "#00FF00"
                return color
            }},
        },
        22: {
            title: "Restart the run",
            display(){
                return "Restart the run"
            },
            unlocked() {return true},
            canClick() {return player.difficulty.gameStarted},
            onClick() {
                if(confirm("Restart the run?")) {
                    player.difficulty.gameStarted = false
                    player.points = modInfo.initialStartPoints
                    player.runTime = new Decimal (0)
                    player.keepGoing = false
                    tmp.gameEnded = false
                }
            },
            style: {"background-color"(){
                let color = "#FF0000"
                if (!player.difficulty.gameStarted) color = "#00FF00"
                return color
            }},
        },
    }
})
addLayer("goal", {
    name: "goals",
    symbol: "🟊",
    position: 0,
    startData() {return {
        unlocked: true,
        points: new Decimal (0),
    }},
    tooltip() {
        let base = format(player.goal.achievements.length) + " goals done<br>" + format(player.goal.points) + " GP"
        return base},
    effect() {
        let eff = player.goal.points.max(0).times(0.2).add(1)
        if (!player.difficulty.gpBoost) eff = new Decimal (1)
        return eff
    },
    effectDescription() { 
        let eff = this.effect();
        return "translated to a "+format(eff)+"x boost to point gain"
    },
    color: "#FFFF00",
    resource: "goal points",
    type: "none",
    row: "side",
    tabFormat: {
        Goals: {
            unlocked() {return true},
            content:[
            "main-display",
            "blank",
            "blank",
            "blank",
            "blank",
            ["row", [["achievement", "P111"],["achievement", "P112"],["achievement", "P113"],["achievement", "P114"],["achievement", "P115"]]],
            ["row", [["achievement", "P121"],["achievement", "P122"],["achievement", "P123"],["achievement", "P124"],["achievement", "P125"]]],
            ["row", [["achievement", "P131"],["achievement", "P132"],["achievement", "P133"],["achievement", "P134"],["achievement", "P135"]]],
            ["row", [["achievement", "P141"],["achievement", "P142"],["achievement", "P143"],["achievement", "P144"],["achievement", "P145"]]],
            ["row", [["achievement", "P151"],["achievement", "P152"],["achievement", "P153"],["achievement", "P154"],["achievement", "P155"]]],
            ["row", [["achievement", "P161"],["achievement", "P162"],["achievement", "P163"],["achievement", "P164"],["achievement", "P165"]]],
            ["row", [["achievement", "P171"],["achievement", "P172"],["achievement", "P173"],["achievement", "P174"],["achievement", "P175"]]],
            ["row", [["achievement", "P181"],["achievement", "P182"],["achievement", "P183"],["achievement", "P184"],["achievement", "P185"]]],
            ["row", [["achievement", "P191"],["achievement", "P192"],["achievement", "P193"],["achievement", "P194"],["achievement", "P195"]]],
            ["row", [["achievement", "P1101"],["achievement", "P1102"],["achievement", "P1103"],["achievement", "P1104"],["achievement", "P1105"]]],]
        }
    },
    achievements: {
        P111: {
            name: "P1A1",
            tooltip() {return "Have 100 Points [1 GP]"},
            done() {return player.points.gte(100)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P112: {
            name: "P1A2",
            tooltip() {return "Have 10,000 Points [1 GP]"},
            done() {return player.points.gte(10000)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P113: {
            name: "P1A3",
            tooltip() {return "Have 1,000,000 Points [1 GP]"},
            done() {return player.points.gte(1000000)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P114: {
            name: "P1A4",
            tooltip() {return "Have 100,000,000 Points [1 GP]"},
            done() {return player.points.gte(100000000)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P115: {
            name: "P1A5",
            tooltip() {return "Have 1.000e10 Points [1 GP]"},
            done() {return player.points.gte(100000000)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P121: {
            name: "P1B1",
            tooltip() {return "Have 100 Amogus [1 GP]"},
            done() {return player.amogus.points.gte(100)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P122: {
            name: "P1B2",
            tooltip() {return "Have 10,000 Amogus [1 GP]"},
            done() {return player.amogus.points.gte(10000)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P123: {
            name: "P1B3",
            tooltip() {return "Have 1,000,000 Amogus [1 GP]"},
            done() {return player.amogus.points.gte(1000000)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P124: {
            name: "P1B4",
            tooltip() {return "Have 100,000,000 Amogus [1 GP]"},
            done() {return player.amogus.points.gte(100000000)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P125: {
            name: "P1B5",
            tooltip() {return "Have 1.000e10 Amogus [1 GP]"},
            done() {return player.amogus.points.gte(1e10)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P131: {
            name: "P1C1",
            tooltip() {return "Have 5 🆎 Boosters [1 GP]"},
            done() {return getBuyableAmount('amogus', 11).gte(5)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P132: {
            name: "P1C2",
            tooltip() {return "Have 10 🆎 Boosters [1 GP]"},
            done() {return getBuyableAmount('amogus', 11).gte(10)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P133: {
            name: "P1C3",
            tooltip() {return "Have 15 🆎 Boosters [1 GP]"},
            done() {return getBuyableAmount('amogus', 11).gte(15)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P134: {
            name: "P1C4",
            tooltip() {return "Have 20 🆎 Boosters [1 GP]"},
            done() {return getBuyableAmount('amogus', 11).gte(20)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P135: {
            name: "P1C5",
            tooltip() {return "Have 25 🆎 Boosters [1 GP]"},
            done() {return getBuyableAmount('amogus', 11).gte(25)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P141: {
            name: "P1D1",
            tooltip() {return "Have 5 🆎 Generators [1 GP]"},
            done() {return getBuyableAmount('amogus', 12).gte(5)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P142: {
            name: "P1D2",
            tooltip() {return "Have 10 🆎 Generators [1 GP]"},
            done() {return getBuyableAmount('amogus', 12).gte(10)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P143: {
            name: "P1D3",
            tooltip() {return "Have 15 🆎 Generators [1 GP]"},
            done() {return getBuyableAmount('amogus', 12).gte(15)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P144: {
            name: "P1D4",
            tooltip() {return "Have 20 🆎 Generators [1 GP]"},
            done() {return getBuyableAmount('amogus', 12).gte(20)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P145: {
            name: "P1D5",
            tooltip() {return "Have 25 🆎 Generators [1 GP]"},
            done() {return getBuyableAmount('amogus', 12).gte(25)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P151: {
            name: "P1E1",
            tooltip() {return "Have 100 🆎 [1 GP]"},
            done() {return player.amogus.AB.gte(100)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P152: {
            name: "P1E2",
            tooltip() {return "Have 10,000 🆎 [1 GP]"},
            done() {return player.amogus.AB.gte(10000)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P153: {
            name: "P1E3",
            tooltip() {return "Have 1,000,000 🆎 [1 GP]"},
            done() {return player.amogus.AB.gte(1000000)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P154: {
            name: "P1E4",
            tooltip() {return "Have 100,000,000 🆎 [1 GP]"},
            done() {return player.amogus.AB.gte(100000000)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P155: {
            name: "P1E5",
            tooltip() {return "Have 1.000e10 🆎 [1 GP]"},
            done() {return player.amogus.AB.gte(1e10)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P161: {
            name: "P1F1",
            tooltip() {return "Have 5 Boring Booster [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return player.booster.points.gte(5)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P162: {
            name: "P1F2",
            tooltip() {return "Have 10 Boring Booster [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return player.booster.points.gte(10)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P163: {
            name: "P1F3",
            tooltip() {return "Have 15 Boring Booster [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return player.booster.points.gte(15)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P164: {
            name: "P1F4",
            tooltip() {return "Have 20 Boring Booster [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return player.booster.points.gte(20)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P165: {
            name: "P1F5",
            tooltip() {return "Have 25 Boring Booster [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return player.booster.points.gte(25)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P171: {
            name: "P1G1",
            tooltip() {return "Have 5 🆎 Extractors [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 22).gte(5)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P172: {
            name: "P1G2",
            tooltip() {return "Have 10 🆎 Extractors [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 22).gte(10)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P173: {
            name: "P1G3",
            tooltip() {return "Have 15 🆎 Extractors [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 22).gte(15)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P174: {
            name: "P1G4",
            tooltip() {return "Have 20 🆎 Extractors [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 22).gte(20)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P175: {
            name: "P1G5",
            tooltip() {return "Have 25 🆎 Extractors [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 22).gte(25)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P181: {
            name: "P1H1",
            tooltip() {return "Have 5 🆎 Enhancers [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 23).gte(5)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P182: {
            name: "P1H2",
            tooltip() {return "Have 10 🆎 Enhancers [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 23).gte(10)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P183: {
            name: "P1H3",
            tooltip() {return "Have 15 🆎 Enhancers [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 23).gte(15)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P184: {
            name: "P1H4",
            tooltip() {return "Have 20 🆎 Enhancers [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 23).gte(20)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P185: {
            name: "P1H5",
            tooltip() {return "Have 25 🆎 Enhancers [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 23).gte(25)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P191: {
            name: "P1I1",
            tooltip() {return "Have 5 🆎 Space Labs [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 24).gte(5)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P192: {
            name: "P1I2",
            tooltip() {return "Have 10 🆎 Space Labs [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 24).gte(10)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P193: {
            name: "P1I3",
            tooltip() {return "Have 15 🆎 Space Labs [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 24).gte(15)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P194: {
            name: "P1I4",
            tooltip() {return "Have 20 🆎 Space Labs [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 24).gte(20)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P195: {
            name: "P1I5",
            tooltip() {return "Have 25 🆎 Space Labs [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 24).gte(25)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P1101: {
            name: "P1J1",
            tooltip() {return "Have 10 Extracted 🆎 [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return player.amogus.ExAB.gte(10)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P1102: {
            name: "P1J2",
            tooltip() {return "Have 100 Extracted 🆎 [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return player.amogus.ExAB.gte(100)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P1103: {
            name: "P1J3",
            tooltip() {return "Have 1,000 Extracted 🆎 [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return player.amogus.ExAB.gte(1000)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P1104: {
            name: "P1J4",
            tooltip() {return "Have 10,000 Extracted 🆎 [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return player.amogus.ExAB.gte(10000)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P1105: {
            name: "P1J5",
            tooltip() {return "Have 100,000 Extracted 🆎 [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return player.amogus.ExAB.gte(100000)},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
    },
    update(diff) {
        if (!player.difficulty.gameStarted) layerDataReset(this.layer)
    },
})
addLayer("amogus", {
    name: "amogus", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ඞ", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal (0),
        AB: new Decimal (0),
        ExAB: new Decimal (0),
        Extracting: false
    }},
    tooltip() {
       let base = format(player.amogus.points)+" amogus"
       if (hasUpgrade('amogus', 25)) base = base+"<br>"+format(player.amogus.AB)+" 🆎"
       if (hasUpgrade('booster', 21)) base = base+"<br>"+format(player.amogus.ExAB)+" extracted 🆎"
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
        if (hasUpgrade('booster', 11)) mult = mult.times(upgradeEffect('booster', 11))
        if (hasUpgrade('booster', 22)) mult = mult.times(upgradeEffect('booster', 22).M)
        if (hasUpgrade('booster', 31)) mult = mult.times(upgradeEffect('booster', 31))
        if (player.difficulty.staticResBoost) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal (1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown() {
        return player.difficulty.gameStarted
    },
    doReset(l) {
        if (!(layers[l].row > this.row)) return
        
        let keep = []
        if (hasMilestone('booster', 0)) keep.push('upgrades', 'buyables')
        
        layerDataReset(this.layer, keep)
    },
    hotkeys: [
        {key: "a", description: "A: Reset for amogus", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    passiveGeneration() {
        if (hasMilestone('booster', 1)) return new Decimal (1);
        return 0
    },
    getABeffect() {
        return player.amogus.AB.max(0).pow(0.5).add(1)
    },
    getExABeffect() {
        return player.amogus.ExAB.max(0).pow(0.4).add(1)
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
                ["row", [["upgrade", 31], ["upgrade", 32], ["upgrade", 33], ["upgrade", 34], ["upgrade", 35]]],
                "blank",
                ["row", [["clickable", 12]]]
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
                ["display-text",
                function() {
                    if (getBuyableAmount('amogus', 22).gte(1)) return "You have " + format(player.amogus.ExAB) + " Extracted 🆎, Translated to a x" + format(tmp.amogus.getExABeffect) + " boost to 🆎 gain."
                }],
                "blank",
                "blank",
                ["row", [["buyable", 11], "blank", "blank", ["buyable", 12]]],
                "blank",
                "blank",
                ["row", [["buyable", 22], "blank", "blank", ["buyable", 23], "blank", "blank", ["buyable", 24]]],
                "blank",
                "blank",
                ["row", [["clickable", 11], "blank", "blank", ["clickable", 12]]],
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
                if (hasUpgrade('booster', 21)) base = base.pow(upgradeEffect('booster', 21))
                return base
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('amogus', 11)}
       	},
        13: {
	        title: "Amogus Upgrade A3",
        	description: "Multiply point gain based on best amogus. (by using a sussy formula)",
         	cost: new Decimal (10),
            tooltip() {return "Formula: ([best amogus]+2)<sup>0.4</sup>"},
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
         	cost: new Decimal (150),
            tooltip() {return "Formula: (log<sub>10</sub>([best amogus]+1)+2)<sup>0.25</sup>"},
            effect() {return player.amogus.best.max(0).add(1).log(10).add(2).pow(0.25)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('amogus', 15)}
       	},
        22: {
	        title: "Amogus Upgrade B2",
        	description: "Square root the point gain divider, should be pretty useful later on.",
         	cost: new Decimal (300),
            unlocked() {return hasUpgrade('amogus', 21)}
       	},
        23: {
	        title: "Amogus Upgrade B3",
        	description: "Add 1 to <b>Amogus Upgrade A2</b>'s Effect Base Per Upgrade.",
         	cost: new Decimal (750),
            effect() {return new Decimal (player.amogus.upgrades.length)},
            effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id)) },
            unlocked() {return hasUpgrade('amogus', 22)}
       	},
        24: {
	        title: "Amogus Upgrade B4",
        	description: "It's getting little slow, Multiply Point gain based on upgrades",
         	cost: new Decimal (1234),
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
         	cost: new Decimal (12288),
            effect() {return Decimal.pow(1.25, getBuyableAmount('amogus', 12))},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('amogus', 25)}
       	},
        32: {
	        title: "Amogus Upgrade C2",
        	description: "Boost 🆎 Limit based on 🆎",
         	cost: new Decimal (32768),
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
            effect() {return Decimal.pow(2, getBuyableAmount('amogus', 11))},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade('amogus', 33)}
       	},
        35: {
	        title: "Amogus Upgrade C5",
        	description: "Multiply 🆎 Gain and Limit by 1.1 per upgrade, Unlock a new layer",
         	cost: new Decimal (1048576),
            effect() {return Decimal.pow(1.1, player.amogus.upgrades.length)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade('amogus', 34)}
       	},
    },
    clickables: {
        11: {
            title: "🆎 Extractor",
            display(){
                if (player.amogus.Extracting) return "is Extracting"
                return "isn't Extracting"
            },
            unlocked() {return getBuyableAmount('amogus', 22).gte(1)},
            canClick() {return getBuyableAmount('amogus', 22).gte(1)},
            onClick() { player.amogus.Extracting = !player.amogus.Extracting },
            style: {"background-color"(){
                let color = "#666666"
                if (player.amogus.Extracting) color = "#8B0000"
                return color
            }},
        },
        12: {
            title: "Hold to Do an amogus reset",
            display(){
                return ""
            },
            unlocked() {return true},
            canClick() {return true},
            onHold() {if (canReset(this.layer)) doReset(this.layer)},
            style: {"background-color"(){
                let color = "#FF0000"
                return color
            }},
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
                let base = new Decimal(1e3).mul(Decimal.pow(4, x.pow(1.25))).floor()
                if (hasUpgrade('booster', 32)) base = base.div(upgradeEffect('booster', 32)).floor()
                return base
            },
            tooltip() {
                return "Cost Formula:<br>1,000*4<sup>x<sup>1.250</sup></sup>/<b>Cost Dividers</b>"
            },
            display() {
                return "Multiply 🆎 gain and limit by "+format(buyableEffect(this.layer, this.id).Ba)+"<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " amogus" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: " + format(buyableEffect(this.layer, this.id).Bo)+"x"
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
                base1 = base1.add(buyableEffect('amogus', 23).Ef)
                let expo = x
                let eff1 = base1.pow(expo)
                return {
                    Ba: base1,
                    Bo: eff1}
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
                let base = new Decimal(1e3).mul(Decimal.pow(4, x.pow(1.25))).floor()
                if (hasUpgrade('booster', 32)) base = base.div(upgradeEffect('booster', 32)).floor()
                return base
            },
            tooltip() {
                return "Cost Formula:<br>1,000*4<sup>x<sup>1.250</sup></sup>/<b>Cost Dividers</b>"
            },
            display() {
                return "Multiply 🆎 gain by "+format(buyableEffect(this.layer, this.id).BaP)+"<br>and Multiply 🆎 limit by "+format(buyableEffect(this.layer, this.id).BaL)+"<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " amogus" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effects: Gain " + format(buyableEffect(this.layer, this.id).P)+" 🆎/s"+"<br>But With a Limit of "+format(buyableEffect(this.layer, this.id).L)+" 🆎"
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
                if (hasUpgrade('booster', 15)) base1 = base1.add(upgradeEffect('booster', 15))
                base1 = base1.add(buyableEffect('amogus', 23).Ef)
                let base2 = new Decimal (2)
                if (hasUpgrade('amogus', 33)) base2 = base2.add(upgradeEffect('amogus', 33))
                base2 = base2.add(buyableEffect('amogus', 23).Ef)
                let expo = x
                let eff1 = base1.pow(x.sub(1), expo).mul(x.min(1))
                eff1 = eff1.times(buyableEffect('amogus', 11).Bo)
                eff1 = eff1.times(tmp.amogus.getExABeffect)
                if (player.amogus.Extracting) eff1 = eff1.times(0)
                if (hasUpgrade('amogus', 35)) eff1 = eff1.times(upgradeEffect('amogus', 35))
                if (hasUpgrade('booster', 34)) eff1 = eff1.times(upgradeEffect('booster', 34))
                eff1 = eff1.times(tmp.booster.effect)
                if (player.difficulty.staticResBoost) eff1 = eff1.times(2)
                let eff2 = base2.pow(x, expo).mul(x.min(1))
                eff2 = eff2.times(buyableEffect('amogus', 11).Bo)
                if (hasUpgrade('amogus', 32)) eff2 = eff2.times(upgradeEffect('amogus', 32))
                if (hasUpgrade('amogus', 35)) eff2 = eff2.times(upgradeEffect('amogus', 35))
                if (hasUpgrade('booster', 13)) eff2 = eff2.times(upgradeEffect('booster', 13))
                if (hasUpgrade('booster', 25)) eff2 = eff2.times(upgradeEffect('booster', 25))
                eff2 = eff2.times(buyableEffect('amogus', 24).Ef)
                return {
                    BaP: base1,
                    BaL: base2,
                    P: eff1,
                    L: eff2
                }
            },
        },
        22: {
            title: "🆎 Extractor",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color": "#8B0000"
                }
            },
            branches: [11],
            unlocked() {
                return hasUpgrade('booster', 21)
            },
            cost(x) {
                let base = new Decimal(1e10).mul(Decimal.pow(100, x.pow(1.25))).floor()
                if (hasUpgrade('booster', 32)) base = base.div(upgradeEffect('booster', 32)).floor()
                return base
            },
            tooltip() {
                return "Cost Formula:<br>1.000e10*100<sup>x<sup>1.250</sup></sup>/<b>Cost Dividers</b>"
            },
            display() {
                return "Multiply Extracted 🆎 gain from Extracting by "+format(buyableEffect(this.layer, this.id).BaE)+",<br>Limit by "+format(buyableEffect(this.layer, this.id).BaLI)+"<br>but Multiply Extracting Requirements by "+format(buyableEffect(this.layer, this.id).BaLO)+"<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " amogus" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effects: Extract " + format(buyableEffect(this.layer, this.id).E) + " Extracted 🆎 from " + format(buyableEffect(this.layer, this.id).LO) + " 🆎 per second" + "<br> With a Limit of " + format(buyableEffect(this.layer, this.id).LI) + " Extracted 🆎"
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
                let base2 = new Decimal (1e10)
                let expo2 = new Decimal (1.1)
                let limbase = new Decimal (2)
                let diveff2 = new Decimal (1)
                if (hasUpgrade('booster', 22)) diveff2 = diveff2.times(upgradeEffect('booster', 22).D)
                let eff1 = new Decimal(0.5).times(Decimal.pow(base1, x.sub(1))).times(x.max(1).min(1))
                if (hasUpgrade('booster', 23)) eff1 = eff1.times(upgradeEffect('booster', 23))
                if (hasUpgrade('booster', 35)) eff1 = eff1.times(upgradeEffect('booster', 35))
                if (player.difficulty.staticResBoost) eff1 = eff1.times(2)
                let eff2 = base2.pow(Decimal.pow(expo2, x.sub(1))).times(x.max(1).min(1))
                eff2 = eff2.div(diveff2)
                let lim = new Decimal (1).times(Decimal.pow(limbase, x)).times(x.max(1).min(1))
                return {
                    BaE: base1,
                    BaLO: base2.pow(expo2.pow(x)).div(diveff2).div(eff2),
                    BaLI: limbase,
                    E: eff1,
                    LO: eff2,
                    LI: lim
                }
            },
        },
        23: {
            title: "🆎 Enhancer",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color": "#FF00FF"
                }
            },
            branches: [11, 12],
            unlocked() {
                return hasUpgrade('booster', 15)
            },
            cost(x) {
                let base = new Decimal(1e10).mul(Decimal.pow(100, x.pow(1.25))).floor()
                if (hasUpgrade('booster', 32)) base = base.div(upgradeEffect('booster', 32)).floor()
                return base
            },
            tooltip() {
                return "Cost Formula:<br>1.000e10*100<sup>x<sup>1.250</sup></sup>/<b>Cost Dividers</b>"
            },
            display() {
                return "Increase <b>🆎 Booster</b>'s effect base and both <b>🆎 Generator</b>'s effect base by "+format(buyableEffect(this.layer, this.id).Ba)+"<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " amogus" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: +" + format(buyableEffect(this.layer, this.id).Ef)
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
                let base1 = new Decimal (0.1)
                let eff1 = base1.times(x)
                return {
                    Ba: base1,
                    Ef: eff1
                }
            },
        },
        24: {
            title: "🆎 Space Lab",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color": "#BBFFFF"
                }
            },
            branches: [12],
            unlocked() {
                return hasUpgrade('booster', 33)
            },
            cost(x) {
                let base = new Decimal(1e10).mul(Decimal.pow(100, x.pow(1.25))).floor()
                if (hasUpgrade('booster', 32)) base = base.div(upgradeEffect('booster', 32)).floor()
                return base
            },
            tooltip() {
                return "Cost Formula:<br>1.000e10*100<sup>x<sup>1.250</sup></sup>"
            },
            display() {
                return "Multiply 🆎 limit by "+format(buyableEffect(this.layer, this.id).Ba)+",<br> Add "+format(buyableEffect(this.layer, this.id).Ba2)+" to your point gain base<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " amogus" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effects: " + format(buyableEffect(this.layer, this.id).Ef) +"x, +" + format(buyableEffect(this.layer, this.id).Ef2)
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
                let base1 = new Decimal (2.5)
                let base2 = new Decimal (1)
                let eff1 = base1.times(x.add(1).min(1)).pow(x)
                let eff2 = base2.times(x)
                return {
                    Ba: base1,
                    Ba2: base2,
                    Ef: eff1,
                    Ef2: eff2,
                }
            },
        },
    },
    update(diff) {
        player.amogus.AB = player.amogus.AB.add((buyableEffect('amogus', 12).P).times(diff)).sub((player.amogus.AB.gte((buyableEffect('amogus', 22).LO))&&player.amogus.Extracting&&!player.amogus.ExAB.gte(buyableEffect('amogus', 22).LI)) ? (buyableEffect('amogus', 22).LO).times(diff) : new Decimal (0)).max(0).min(buyableEffect('amogus', 12).L)
        if (player.amogus.Extracting&&(player.amogus.AB.gte((buyableEffect('amogus', 22).LO)))) player.amogus.ExAB = player.amogus.ExAB.add((buyableEffect('amogus', 22).E).times(diff)).min(buyableEffect('amogus', 22).LI)
        if (!player.difficulty.gameStarted) {
            player[this.layer].unlocked = false
            layerDataReset(this.layer)}
    },
})
addLayer("booster", {
    name: "boring boosters",
    symbol: "BB",
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal (0),
    }},
    tooltip() {
       let base = format(player.booster.points)+" boring boosters"
       if (false) base = base+"<br>"+format(player.amogus.AB)+" 🆎"
       return base
    },
    color: "#ACACE6",
    requires: new Decimal(1e6),
    resource: "boring boosters",
    baseResource: "amogus",
    baseAmount() {return player.amogus.points},
    type: "static",
    base() {return new Decimal (5)},
    exponent() {return new Decimal (1.25)},
    gainMult() {
        let mult = new Decimal (1)
        if (hasUpgrade('booster', 14)) mult = mult.div(upgradeEffect('booster', 14))
        if (hasUpgrade('booster', 24)) mult = mult.div(upgradeEffect('booster', 24))
        if (hasUpgrade('booster', 31)) mult = mult.div(upgradeEffect('booster', 31))
        return mult
    },
    row: 1,
    layerShown() {return hasUpgrade('amogus', 35)||player[this.layer].unlocked},
    branches: ["amogus"],
    effect() {
		let amt = player.booster.best;
		let base = new Decimal(2)
        if (hasUpgrade('booster', 12)) base = base.add(upgradeEffect('booster', 12))
		eff = Decimal.pow(base,amt);
		return eff;
	},
    effectDescription() { 
        let eff = this.effect();
        return "translated to a "+format(eff)+"x boost to point gain and 🆎 gain (based on best booster)"
    },
    canBuyMax() {return hasMilestone('booster', 2)},
    hotkeys: [
        {key: "b", description: "B: Boring Booster reset",
         onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked(){return hasUpgrade('amogus', 35)||player[this.layer].unlocked}}
    ],
    tabFormat: ["main-display",
                    "prestige-button", "resource-display",
                    ["blank", "5px"],
						"milestones",
						"upgrades"
				],
    upgrades: {
        11: {
	        title: "Booster Upgrade A1",
        	description: "Multiply amogus gain based on best boosters, classic.",
         	cost: new Decimal (3),
            tooltip() {return "Formula: ([best boosters]+2)<sup>0.4</sup>"},
            effect() {
                let base = player.booster.best.add(2)
                let expo = new Decimal (0.4)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return player[this.layer].unlocked}
       	},
        12: {
	        title: "Booster Upgrade A2",
        	description: "Best Amogus boosts booster's base.",
         	cost: new Decimal (4),
            tooltip() {return "Formula: (log<sub>10</sub>([best boosters]+1)+2)<sup>0.4</sup>"},
            effect() {
                let base = player.amogus.best.max(0).add(1).log(10).add(2)
                let expo = new Decimal (0.4)
                let eff = base.pow(expo).div(16)
                return eff
            },
            effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id)) },
            unlocked() {return hasUpgrade('booster', 11)}
       	},
        13: {
	        title: "Booster Upgrade A3",
        	description: "Multiply 🆎 Limit Based on itself.",
         	cost: new Decimal (5),
            tooltip() {return "Formula: (ln([🆎 Limit]+1)+2)<sup>0.5</sup>"},
            effect() {
                let base = (buyableEffect('amogus', 12).L).max(0).add(1).ln().add(2)
                let expo = new Decimal (0.5)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('booster', 12)}
       	},
        14: {
	        title: "Booster Upgrade A4",
        	description: "Divide Booster's Cost based on unspent Boosters.",
         	cost: new Decimal (6),
            tooltip() {return "Formula: ([unspent boosters]+2)<sup>3</sup>"},
            effect() {
                let base = player.booster.points.max(1).add(2)
                let expo = new Decimal (3)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return "/"+format(upgradeEffect(this.layer, this.id)) },
            unlocked() {return hasUpgrade('booster', 13)}
       	},
        15: {
	        title: "Booster Upgrade A5",
        	description: "Increase <b>🆎 Generator</b>'s First Effect Base by 0.125, Unlock <b>🆎 Enhancer</b>.",
         	cost: new Decimal (10),
            effect() {
                let base = new Decimal (0.125)
                let expo = new Decimal (1)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id)) },
            unlocked() {return hasUpgrade('booster', 14)}
       	},
        21: {
	        title: "Booster Upgrade B1",
        	description: "Raise <b>Amogus Upgrade A2</b>'s Effect to the 2nd power, Unlock <b>🆎 Extractor</b>.",
         	cost: new Decimal (11),
            effect() {
                let base = new Decimal (2)
                let expo = new Decimal (1)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return "^"+format(upgradeEffect(this.layer, this.id)) },
            unlocked() {return hasUpgrade('booster', 15)}
       	},
        22: {
	        title: "Booster Upgrade B2",
        	description: "Multiply amogus gain by 1.25 per upgrade, Divide <b>🆎 Extractor</b>'s Second Effect by 50",
         	cost: new Decimal (12),
            effect() {
                let base = new Decimal (1.25)
                let expo = new Decimal (player.booster.upgrades.length)
                let eff = base.pow(expo)
                let eff2 = new Decimal (50)
                return {
                    M: eff,
                    D: eff2
                }
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id).M)+"x, /"+format(upgradeEffect(this.layer, this.id).D) },
            unlocked() {return hasUpgrade('booster', 21)}
       	},
        23: {
	        title: "Booster Upgrade B3",
        	description: "Multiply Extracted 🆎 gain from Extracting based on Extracted 🆎.",
         	cost: new Decimal (13),
            tooltip() {return "Formula: (log<sub>10</sub>([Extracted 🆎]+1)+2)<sup>0.6</sup>"},
            effect() {
                let base = new Decimal (player.amogus.ExAB).max(0).add(1).log(10).add(2)
                let expo = new Decimal (0.6)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('booster', 22)}
       	},
        24: {
	        title: "Booster Upgrade B4",
        	description: "Boring Boosters are cheaper based on points.",
         	cost: new Decimal (14),
            tooltip() {return "Formula: (log<sub>10</sub>([Points]+1)+2)<sup>2</sup>"},
            effect() {
                let base = new Decimal (player.points).max(0).add(1).log(10).add(2)
                let expo = new Decimal (2)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return "/"+format(upgradeEffect(this.layer, this.id)) },
            unlocked() {return hasUpgrade('booster', 23)}
       	},
        25: {
	        title: "Booster Upgrade B5",
        	description: "Multiply 🆎 Limit based on Extracted 🆎.",
         	cost: new Decimal (16),
            tooltip() {return "Formula: (log<sub>10</sub>([Extracted 🆎]+1)+2)<sup>2</sup>"},
            effect() {
                let base = new Decimal (player.amogus.ExAB).max(0).add(1).log(10).add(2)
                let expo = new Decimal (2)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('booster', 24)}
       	},
        31: {
	        title: "Booster Upgrade C1",
        	description: "Boring Boosters are cheaper based on <b>🆎 Enhancer</b>.",
         	cost: new Decimal (17),
            tooltip() {return "Formula: ([🆎 Enhancers]+2)<sup>2.5</sup>"},
            effect() {
                let base = getBuyableAmount('amogus', 23).add(2)
                let expo = new Decimal (2.5)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return "/"+format(upgradeEffect(this.layer, this.id)) },
            unlocked() {return hasUpgrade('booster', 25)}
       	},
        32: {
	        title: "Booster Upgrade C2",
        	description: "All 🆎 buyables are cheaper based on Unspent Boosters.",
         	cost: new Decimal (19),
             tooltip() {return "Formula: ([unspent boosters]+2)<sup>2.5</sup>"},
            effect() {
                let base = player.booster.points.add(2)
                let expo = new Decimal (2.5)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return "/"+format(upgradeEffect(this.layer, this.id)) },
            unlocked() {return hasUpgrade('booster', 31)}
       	},
        33: {
	        title: "Booster Upgrade C3",
        	description: "Multiply Point gain By 3, Unlock <b>🆎 Space Lab</b>.",
         	cost: new Decimal (22),
            effect() {
                let base = new Decimal (3)
                let expo = new Decimal (1)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('booster', 32)}
       	},
        34: {
	        title: "Booster Upgrade C4",
        	description: "Multiply 🆎 gain Based on 🆎 Limit.",
            tooltip() {return "Formula: (log<sub>10</sub>([🆎 Limit]+1)+2)<sup>0.5</sup>"},
         	cost: new Decimal (24),
            effect() {
                let base = (buyableEffect('amogus', 12).L).max(0).add(1).log(10).add(2)
                let expo = new Decimal (0.6)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('booster', 33)}
       	},
        35: {
	        title: "Booster Upgrade C5",
        	description: "Multiply Extracted 🆎 gain from Extracting Based on 🆎.",
         	cost: new Decimal (25),
            tooltip() {return "Formula: (log<sub>10</sub>([🆎]+1)+2)<sup>0.2</sup>"},
            effect() {
                let base = player.amogus.AB.max(0).add(1).log(10).add(2)
                let expo = new Decimal (0.2)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('booster', 34)}
       	},
    },
    milestones: {
        0: {requirementDescription: "3 Boring Boosters",
                done() {return player[this.layer].best.gte(3)}, // Used to determine when to give the milestone
                effectDescription: "Keep all contents in amogus layer upon resetting. (except resources)",
            },
        1: {requirementDescription: "9 Boring Boosters",
            done() {return player[this.layer].best.gte(9)},
            effectDescription: "Gain 100% of amogus gain on reset per second.",
        },
        2: {requirementDescription: "15 Boring Boosters",
            done() {return player[this.layer].best.gte(15)},
            effectDescription: "You can buy max Boring Boosters.",
        },
    },
    update(diff) {
        if (!player.difficulty.gameStarted) {
            player[this.layer].unlocked = false
            layerDataReset(this.layer)}
    },
})