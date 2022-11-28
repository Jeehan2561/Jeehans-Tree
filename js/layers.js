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
            ["row", [["achievement", "P1101"],["achievement", "P1102"],["achievement", "P1103"],["achievement", "P1104"],["achievement", "P1105"]]],
            ["row", [["achievement", "P1111"],["achievement", "P1112"],["achievement", "P1113"],["achievement", "P1114"],["achievement", "P1115"]]],
            ["row", [["achievement", "P1121"],["achievement", "P1122"],["achievement", "P1123"],["achievement", "P1124"],["achievement", "P1125"]]],
            ["row", [["achievement", "P1131"],["achievement", "P1132"],["achievement", "P1133"],["achievement", "P1134"],["achievement", "P1135"]]],
            ["row", [["achievement", "P1141"],["achievement", "P1142"],["achievement", "P1143"],["achievement", "P1144"],["achievement", "P1145"]]],
            ["row", [["achievement", "P1151"],["achievement", "P1152"],["achievement", "P1153"],["achievement", "P1154"],["achievement", "P1155"]]],
            ["row", [["achievement", "P1161"],["achievement", "P1162"],["achievement", "P1163"],["achievement", "P1164"],["achievement", "P1165"]]],
            ["row", [["achievement", "P1171"],["achievement", "P1172"],["achievement", "P1173"],["achievement", "P1174"],["achievement", "P1175"]]],
            ["row", [["achievement", "P1181"],["achievement", "P1182"],["achievement", "P1183"],["achievement", "P1184"],["achievement", "P1185"]]],
            ["row", [["achievement", "P1191"],["achievement", "P1192"],["achievement", "P1193"],["achievement", "P1194"],["achievement", "P1195"]]],
            ["row", [["achievement", "P1201"],["achievement", "P1202"],["achievement", "P1203"],["achievement", "P1204"],["achievement", "P1205"]]],
        ]
        }
    },
    achievements: {
        P111: {
            name: "P1A1",
            tooltip() {return "Have 100 Points [1 GP]"},
            done() {return player.points.gte(100) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P112: {
            name: "P1A2",
            tooltip() {return "Have 10,000 Points [1 GP]"},
            done() {return player.points.gte(10000) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P113: {
            name: "P1A3",
            tooltip() {return "Have 1,000,000 Points [1 GP]"},
            done() {return player.points.gte(1000000) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P114: {
            name: "P1A4",
            tooltip() {return "Have 100,000,000 Points [1 GP]"},
            done() {return player.points.gte(100000000) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P115: {
            name: "P1A5",
            tooltip() {return "Have 1.000e10 Points [1 GP]"},
            done() {return player.points.gte(100000000) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P121: {
            name: "P1B1",
            tooltip() {return "Have 100 Amogus [1 GP]"},
            done() {return player.amogus.points.gte(100) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P122: {
            name: "P1B2",
            tooltip() {return "Have 10,000 Amogus [1 GP]"},
            done() {return player.amogus.points.gte(10000) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P123: {
            name: "P1B3",
            tooltip() {return "Have 1,000,000 Amogus [1 GP]"},
            done() {return player.amogus.points.gte(1000000) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P124: {
            name: "P1B4",
            tooltip() {return "Have 100,000,000 Amogus [1 GP]"},
            done() {return player.amogus.points.gte(100000000) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P125: {
            name: "P1B5",
            tooltip() {return "Have 1.000e10 Amogus [1 GP]"},
            done() {return player.amogus.points.gte(1e10) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P131: {
            name: "P1C1",
            tooltip() {return "Have 5 🆎 Boosters [1 GP]"},
            done() {return getBuyableAmount('amogus', 11).gte(5) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P132: {
            name: "P1C2",
            tooltip() {return "Have 10 🆎 Boosters [1 GP]"},
            done() {return getBuyableAmount('amogus', 11).gte(10) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P133: {
            name: "P1C3",
            tooltip() {return "Have 15 🆎 Boosters [1 GP]"},
            done() {return getBuyableAmount('amogus', 11).gte(15) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P134: {
            name: "P1C4",
            tooltip() {return "Have 20 🆎 Boosters [1 GP]"},
            done() {return getBuyableAmount('amogus', 11).gte(20) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P135: {
            name: "P1C5",
            tooltip() {return "Have 25 🆎 Boosters [1 GP]"},
            done() {return getBuyableAmount('amogus', 11).gte(25) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P141: {
            name: "P1D1",
            tooltip() {return "Have 5 🆎 Generators [1 GP]"},
            done() {return getBuyableAmount('amogus', 12).gte(5) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P142: {
            name: "P1D2",
            tooltip() {return "Have 10 🆎 Generators [1 GP]"},
            done() {return getBuyableAmount('amogus', 12).gte(10) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P143: {
            name: "P1D3",
            tooltip() {return "Have 15 🆎 Generators [1 GP]"},
            done() {return getBuyableAmount('amogus', 12).gte(15) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P144: {
            name: "P1D4",
            tooltip() {return "Have 20 🆎 Generators [1 GP]"},
            done() {return getBuyableAmount('amogus', 12).gte(20) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P145: {
            name: "P1D5",
            tooltip() {return "Have 25 🆎 Generators [1 GP]"},
            done() {return getBuyableAmount('amogus', 12).gte(25) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P151: {
            name: "P1E1",
            tooltip() {return "Have 100 🆎 [1 GP]"},
            done() {return player.amogus.AB.gte(100) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P152: {
            name: "P1E2",
            tooltip() {return "Have 10,000 🆎 [1 GP]"},
            done() {return player.amogus.AB.gte(10000) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P153: {
            name: "P1E3",
            tooltip() {return "Have 1,000,000 🆎 [1 GP]"},
            done() {return player.amogus.AB.gte(1000000) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P154: {
            name: "P1E4",
            tooltip() {return "Have 100,000,000 🆎 [1 GP]"},
            done() {return player.amogus.AB.gte(100000000) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P155: {
            name: "P1E5",
            tooltip() {return "Have 1.000e10 🆎 [1 GP]"},
            done() {return player.amogus.AB.gte(1e10) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        P161: {
            name: "P1F1",
            tooltip() {return "Have 5 Boring Booster [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return player.booster.points.gte(5) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P162: {
            name: "P1F2",
            tooltip() {return "Have 10 Boring Booster [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return player.booster.points.gte(10) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P163: {
            name: "P1F3",
            tooltip() {return "Have 15 Boring Booster [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return player.booster.points.gte(15) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P164: {
            name: "P1F4",
            tooltip() {return "Have 20 Boring Booster [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return player.booster.points.gte(20) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P165: {
            name: "P1F5",
            tooltip() {return "Have 25 Boring Booster [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return player.booster.points.gte(25) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P171: {
            name: "P1G1",
            tooltip() {return "Have 5 🆎 Extractors [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 22).gte(5) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P172: {
            name: "P1G2",
            tooltip() {return "Have 10 🆎 Extractors [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 22).gte(10) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P173: {
            name: "P1G3",
            tooltip() {return "Have 15 🆎 Extractors [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 22).gte(15) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P174: {
            name: "P1G4",
            tooltip() {return "Have 20 🆎 Extractors [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 22).gte(20) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P175: {
            name: "P1G5",
            tooltip() {return "Have 25 🆎 Extractors [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 22).gte(25) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P181: {
            name: "P1H1",
            tooltip() {return "Have 5 🆎 Enhancers [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 23).gte(5) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P182: {
            name: "P1H2",
            tooltip() {return "Have 10 🆎 Enhancers [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 23).gte(10) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P183: {
            name: "P1H3",
            tooltip() {return "Have 15 🆎 Enhancers [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 23).gte(15) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P184: {
            name: "P1H4",
            tooltip() {return "Have 20 🆎 Enhancers [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 23).gte(20) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P185: {
            name: "P1H5",
            tooltip() {return "Have 25 🆎 Enhancers [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 23).gte(25) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P191: {
            name: "P1I1",
            tooltip() {return "Have 5 🆎 Space Labs [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 24).gte(5) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P192: {
            name: "P1I2",
            tooltip() {return "Have 10 🆎 Space Labs [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 24).gte(10) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P193: {
            name: "P1I3",
            tooltip() {return "Have 15 🆎 Space Labs [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 24).gte(15) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P194: {
            name: "P1I4",
            tooltip() {return "Have 20 🆎 Space Labs [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 24).gte(20) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P195: {
            name: "P1I5",
            tooltip() {return "Have 25 🆎 Space Labs [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return getBuyableAmount('amogus', 24).gte(25) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P1101: {
            name: "P1J1",
            tooltip() {return "Have 10 Extracted 🆎 [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return player.amogus.ExAB.gte(10) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P1102: {
            name: "P1J2",
            tooltip() {return "Have 100 Extracted 🆎 [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return player.amogus.ExAB.gte(100) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P1103: {
            name: "P1J3",
            tooltip() {return "Have 1,000 Extracted 🆎 [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return player.amogus.ExAB.gte(1000) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P1104: {
            name: "P1J4",
            tooltip() {return "Have 10,000 Extracted 🆎 [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return player.amogus.ExAB.gte(10000) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P1105: {
            name: "P1J5",
            tooltip() {return "Have 100,000 Extracted 🆎 [2 GP]"},
            unlocked() {return player.booster.unlocked},
            done() {return player.amogus.ExAB.gte(100000) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(2)
            }
        },
        P1111: {
            name: "P1K1",
            tooltip() {return "Have 100 Chess Points [3 GP]"},
            unlocked() {return player.chess.unlocked},
            done() {return player.chess.points.gte(1e2) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(3)
            }
        },
        P1112: {
            name: "P1K2",
            tooltip() {return "Have 10,000 Chess Points [3 GP]"},
            unlocked() {return player.chess.unlocked},
            done() {return player.chess.points.gte(1e4) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(3)
            }
        },
        P1113: {
            name: "P1K3",
            tooltip() {return "Have 1,000,000 Chess Points [3 GP]"},
            unlocked() {return player.chess.unlocked},
            done() {return player.chess.points.gte(1e6) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(3)
            }
        },
        P1114: {
            name: "P1K4",
            tooltip() {return "Have 100,000,000 Chess Points [3 GP]"},
            unlocked() {return player.chess.unlocked},
            done() {return player.chess.points.gte(1e8) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(3)
            }
        },
        P1115: {
            name: "P1K5",
            tooltip() {return "Have 1.000e10 Chess Points [3 GP]"},
            unlocked() {return player.chess.unlocked},
            done() {return player.chess.points.gte(1e10) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(3)
            }
        },
        P1121: {
            name: "P1L1",
            tooltip() {return "Have 5 total MP [3 GP]"},
            unlocked() {return player.chess.unlocked},
            done() {return buyableEffect('chess', 11).MP.gte(5) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(3)
            }
        },
        P1122: {
            name: "P1L2",
            tooltip() {return "Have 10 total MP [3 GP]"},
            unlocked() {return player.chess.unlocked},
            done() {return buyableEffect('chess', 11).MP.gte(10) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(3)
            }
        },
        P1123: {
            name: "P1L3",
            tooltip() {return "Have 15 total MP [3 GP]"},
            unlocked() {return player.chess.unlocked},
            done() {return buyableEffect('chess', 11).MP.gte(15) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(3)
            }
        },
        P1124: {
            name: "P1L4",
            tooltip() {return "Have 20 total MP [3 GP]"},
            unlocked() {return player.chess.unlocked},
            done() {return buyableEffect('chess', 11).MP.gte(20) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(3)
            }
        },
        P1125: {
            name: "P1L5",
            tooltip() {return "Have 25 total MP [3 GP]"},
            unlocked() {return player.chess.unlocked},
            done() {return buyableEffect('chess', 11).MP.gte(25) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(3)
            }
        },
        P1131: {
            name: "P1M1",
            tooltip() {return "Have 2 🆎 Charged Boosters [3 GP]"},
            unlocked() {return player.chess.unlocked},
            done() {return getBuyableAmount('amogus', 21).gte(2) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(3)
            }
        },
        P1132: {
            name: "P1M2",
            tooltip() {return "Have 4 🆎 Charged Boosters [3 GP]"},
            unlocked() {return player.chess.unlocked},
            done() {return getBuyableAmount('amogus', 21).gte(4) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(3)
            }
        },
        P1133: {
            name: "P1M3",
            tooltip() {return "Have 6 🆎 Charged Boosters [3 GP]"},
            unlocked() {return player.chess.unlocked},
            done() {return getBuyableAmount('amogus', 21).gte(6) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(3)
            }
        },
        P1134: {
            name: "P1M4",
            tooltip() {return "Have 8 🆎 Charged Boosters [3 GP]"},
            unlocked() {return player.chess.unlocked},
            done() {return getBuyableAmount('amogus', 21).gte(4) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(3)
            }
        },
        P1135: {
            name: "P1M5",
            tooltip() {return "Have 10 🆎 Charged Boosters [3 GP]"},
            unlocked() {return player.chess.unlocked},
            done() {return getBuyableAmount('amogus', 21).gte(10) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(3)
            }
        },
        P1141: {
            name: "P1N1",
            tooltip() {return "Have 8 White Pawns or 8 Black Pawns [3 GP]"},
            unlocked() {return player.chess.unlocked},
            done() {return (getBuyableAmount('chess', 21).gte(8)||getBuyableAmount('chess', 22).gte(8)) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(3)
            }
        },
        P1142: {
            name: "P1N2",
            tooltip() {return "Have 2 White Knights or 2 Black Knights [3 GP]"},
            unlocked() {return player.chess.unlocked},
            done() {return (getBuyableAmount('chess', 31).gte(2)||getBuyableAmount('chess', 32).gte(2)) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(3)
            }
        },
        P1143: {
            name: "P1N3",
            tooltip() {return "Have 2 White Bishops or 2 Black Bishops [3 GP]"},
            unlocked() {return player.chess.unlocked},
            done() {return (getBuyableAmount('chess', 41).gte(2)||getBuyableAmount('chess', 42).gte(2)) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(3)
            }
        },
        P1144: {
            name: "P1N4",
            tooltip() {return "Have 2 White Rooks or 2 Black Rooks [3 GP]"},
            unlocked() {return player.chess.unlocked},
            done() {return (getBuyableAmount('chess', 51).gte(2)||getBuyableAmount('chess', 52).gte(2)) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(3)
            }
        },
        P1145: {
            name: "P1N5",
            tooltip() {return "Have a White Queen or a Black Queen [3 GP]"},
            unlocked() {return player.chess.unlocked},
            done() {return (getBuyableAmount('chess', 61).gte(1)||getBuyableAmount('chess', 62).gte(1)) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(3)
            }
        },
        P1151: {
            name: "P1O1",
            tooltip() {return "Beat Soldier [3 GP]"},
            unlocked() {return player.chess.unlocked},
            done() {return hasChallenge('chess', 11) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(3)
            }
        },
        P1152: {
            name: "P1O2",
            tooltip() {return "Beat Dragon Knight [3 GP]"},
            unlocked() {return player.chess.unlocked},
            done() {return hasChallenge('chess', 12) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(3)
            }
        },
        P1153: {
            name: "P1O3",
            tooltip() {return "Beat Ferz [3 GP]"},
            unlocked() {return player.chess.unlocked},
            done() {return hasChallenge('chess', 13) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(3)
            }
        },
        P1154: {
            name: "P1O4",
            tooltip() {return "Beat Wazir [3 GP]"},
            unlocked() {return player.chess.unlocked},
            done() {return hasChallenge('chess', 14) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(3)
            }
        },
        P1155: {
            name: "P1O5",
            tooltip() {return "Beat Cheap Queen [3 GP]"},
            unlocked() {return player.chess.unlocked},
            done() {return hasChallenge('chess', 15) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(3)
            }
        },
    },
    update(diff) {
        if (!player.difficulty.gameStarted) layerDataReset(this.layer)
    },
})
addLayer("pgn", {
    name: "point gain nerf",
    symbol: "↓",
    position: 3,
    startData() {return {
        unlocked: true,
        points: new Decimal (0),
    }},
    tooltip() {
        return "Point gain nerfs"
    },
    color: "#800000",
    type: "none",
    row: "side",
    tabFormat: {
        Difficulty:{
            unlocked() {return false},
        content:[
            ["display-text", function() { return '<h2>Point gain nerfs</h2>' }],
            "blank",
            "blank",
            ["display-text", function() {
                if (player.points.gte(10)&&(canGenPoints())) return "Your point gain is divided by "+format(getPointDivider())+" (based on points)"
            }],
            ["display-text", function() {
                if (player.points.gte(1e20)&&(canGenPoints())) return "Previous Effect is raised to the " + format(getPointDividerExpo1()) + "th power (based on points)"
            }],
            ["display-text", function() {
                if (player.points.gte(1e100)&&(canGenPoints())) return "Previous Effect is multiplied by " + format(getPointDividerExpoMult()) + " (based on points)"
            }],
            ["display-text", function() {
                if (player.points.gte("1.8e308")&&(canGenPoints())) return "Previous Effect is raised to the " + format(getPointDividerExpo2()) + "th power (based on points)"
            }],
        ]
        }
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
        if (hasUpgrade('amogus', 42)) mult = mult.times(upgradeEffect('amogus', 42))
        if (hasUpgrade('booster', 11)) mult = mult.times(upgradeEffect('booster', 11))
        if (hasUpgrade('booster', 22)) mult = mult.times(upgradeEffect('booster', 22).M)
        if (hasUpgrade('booster', 31)) mult = mult.times(upgradeEffect('booster', 31))
        if (hasUpgrade('chess', 11)) mult = mult.times(upgradeEffect('chess', 11))
        if (hasUpgrade('chess', 24)) mult = mult.times(upgradeEffect('chess', 24))
        if (player.difficulty.staticResBoost) mult = mult.times(2)
        mult = mult.times(tmp.chess.effect)
        mult = mult.times(buyableEffect('chess', 22).Ef)
        if (inChallenge('chess', 13)) mult = mult.div(tmp.chess.AmogusDivinFerz)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        expo = new Decimal (1)
        if (hasUpgrade('booster', 42)) expo = expo.times(1.1)
        return expo
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
        let passive = 0
        if (hasMilestone('booster', 1)) passive = new Decimal (1)
        if (hasUpgrade('amogus', 43)) passive = passive.times(upgradeEffect('amogus', 43))
        return passive
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
                ["row", [["upgrade", 41], ["upgrade", 42], ["upgrade", 43], ["upgrade", 44], ["upgrade", 45]]],
                "blank",
                ["row", [["clickable", 13]]]
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
                ["row", [["buyable", 21], "blank", "blank", ["buyable", 22], "blank", "blank", ["buyable", 23], "blank", "blank", ["buyable", 24]]],
                "blank",
                "blank",
                ["row", [["clickable", 11], "blank", "blank", ["clickable", 12], "blank", "blank", ["clickable", 13]]],
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
         	cost: new Decimal (2),
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
         	cost: new Decimal (5),
            tooltip() {return "Formula: ([best amogus]+2)<sup>0.4</sup>"},
            effect() {return softcap(player.amogus.best, new Decimal ("1.8e308"), new Decimal (0.1)).max(0).add(2).pow(0.4)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('amogus', 12)}
       	},
        14: {
	        title: "Amogus Upgrade A4",
        	description: "Multiply point gain based on points.",
         	cost: new Decimal (12),
            tooltip() {return "Formula: (log<sub>10</sub>([points]+1)+2)<sup>0.5</sup>"},
            effect() {return player.points.max(0).add(1).log(10).add(2).pow(0.5)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('amogus', 13)}
       	},
        15: {
	        title: "Amogus Upgrade A5",
        	description: "Multiply amogus gain based on points.",
         	cost: new Decimal (40),
            tooltip() {return "Formula: (log<sub>10</sub>([points]+1)+2)<sup>0.2</sup>"},
            effect() {return player.points.max(0).add(1).log(10).add(2).pow(0.2)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('amogus', 14)}
       	},
        21: {
	        title: "Amogus Upgrade B1",
        	description: "Multiply amogus gain based on best amogus.",
         	cost: new Decimal (81),
            tooltip() {return "Formula: (log<sub>10</sub>([best amogus]+1)+2)<sup>0.25</sup>"},
            effect() {return player.amogus.best.max(0).add(1).log(10).add(2).pow(0.25)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('amogus', 15)}
       	},
        22: {
	        title: "Amogus Upgrade B2",
        	description: "Square root the point gain nerf, should be pretty useful later on.",
         	cost: new Decimal (144),
            unlocked() {return hasUpgrade('amogus', 21)}
       	},
        23: {
	        title: "Amogus Upgrade B3",
        	description: "Add 1 to <b>Amogus Upgrade A2</b>'s Effect Base Per Upgrade.",
         	cost: new Decimal (250),
            effect() {return new Decimal (player.amogus.upgrades.length)},
            effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id)) },
            unlocked() {return hasUpgrade('amogus', 22)}
       	},
        24: {
	        title: "Amogus Upgrade B4",
        	description: "It's getting little slow, Multiply Point gain based on upgrades",
         	cost: new Decimal (420),
            tooltip() {return "Formula: ([amogus upgrades]+2)<sup>1.25</sup>"},
            effect() {return new Decimal (player.amogus.upgrades.length).add(2).pow(1.25)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('amogus', 23)}
       	},
        25: {
	        title: "Amogus Upgrade B5",
        	description: "Multiply Point gain by 2.5, Unlock <b>🆎</b> tab",
         	cost: new Decimal (1536),
            effect() {return new Decimal (2.5)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('amogus', 24)}
       	},
        31: {
	        title: "Amogus Upgrade C1",
        	description: "Each <b>🆎 Generator</b> Multiply amogus gain by 1.25",
         	cost: new Decimal (5e3),
            effect() {return Decimal.pow(1.25, getBuyableAmount('amogus', 12))},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('amogus', 25)}
       	},
        32: {
	        title: "Amogus Upgrade C2",
        	description: "Multiply 🆎 Limit based on 🆎",
         	cost: new Decimal (12345),
            tooltip() {return "Formula: (log<sub>10</sub>([🆎]+10)+2)<sup>0.25</sup>"},
            effect() {return player.amogus.AB.max(0).add(10).log(10).max(1).add(2).pow(0.25)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('amogus', 31)}
       	},
        33: {
	        title: "Amogus Upgrade C3",
        	description: "Increase <b>🆎 Generator</b>'s Second Effect Base by 1, Unlock <b>🆎 Booster</b>",
         	cost: new Decimal (1.75e4),
            effect() {return new Decimal (1)},
            effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id))},
            unlocked() {return hasUpgrade('amogus', 32)}
       	},
        34: {
	        title: "Amogus Upgrade C4",
        	description: "Each <b>🆎 Booster</b> Multiply point gain by 2",
         	cost: new Decimal (4e4),
            effect() {return Decimal.pow(2, getBuyableAmount('amogus', 11))},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade('amogus', 33)}
       	},
        35: {
	        title: "Amogus Upgrade C5",
        	description: "Multiply 🆎 Gain and Limit by 1.1 per upgrade, Unlock a new layer",
         	cost: new Decimal (2e5),
            effect() {return Decimal.pow(1.1, player.amogus.upgrades.length)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade('amogus', 34)}
       	},
        41: {
	        title: "Amogus Upgrade D1",
        	description: "Multiply point gain based on <b>point gain</b>.",
         	cost: new Decimal (1e150),
            tooltip() {return "Formula: 2<sup>(log<sub>10</sub>[point gain])<sup>0.4</sup></sup>"},
            effect() {return Decimal.pow(2, getPointGen().max(1).log(10).pow(0.4))},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade('amogus', 35)&&hasUpgrade('booster', 45)}
       	},
        42: {
	        title: "Amogus Upgrade D2",
        	description: "Multiply amogus gain based on <b>amogus gain</b>.",
         	cost: new Decimal (1e165),
            tooltip() {return "Formula: 2<sup>(log<sub>10</sub>[amogus gain])<sup>0.4</sup></sup>"},
            effect() {return Decimal.pow(2, new Decimal(tmp.amogus.resetGain).max(1).log(10).pow(0.4))},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade('amogus', 41)&&hasUpgrade('booster', 45)}
       	},
        43: {
	        title: "Amogus Upgrade D3",
        	description: "Multiply passive amogus gain based on amogus, Decrease <b>Material Points</b>' Cost base by 1.",
         	cost: new Decimal (1e180),
            tooltip() {return "Formula: (log<sub>10</sub>[amogus]+1)<sup>1.25</sup>"},
            effect() {return player.amogus.points.max(1).log(10).add(1).pow(1.25)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade('amogus', 42)&&hasUpgrade('booster', 45)}
       	},
        44: {
	        title: "Amogus Upgrade D4",
        	description: "Divide all Row 1 🆎 Buyables' Cost based on total MP, Multiply Extracted 🆎 gain from extracting by total MP.",
         	cost: new Decimal (1e195),
            tooltip() {return "Formula: 2<sup>[total MP]<sup>1.2</sup></sup>"},
            effect() {return Decimal.pow(2, Decimal.pow(buyableEffect('chess', 11).MP, 1.2))},
            effectDisplay() { return "/"+format(upgradeEffect(this.layer, this.id))},
            unlocked() {return hasUpgrade('amogus', 43)&&hasUpgrade('booster', 45)}
       	},
        45: {
	        title: "Amogus Upgrade D5",
        	description: "Divide Ex. Req. and Booster Costs' based on <b>🆎 Boosters</b> and <b>🆎 Generator</b>, Each <b>🆎 Charged Booster</b> gain a free <b>🆎 Booster</b>.",
         	cost: new Decimal (1e210),
            tooltip() {return "Formula: [([🆎 Boosters]+2)([🆎 Generator]+2)]<sup>5</sup>"},
            effect() {return Decimal.pow(getBuyableAmount('amogus', 11).max(0).add(2).times(getBuyableAmount('amogus', 12).max(0).add(2)), 5)},
            effectDisplay() { return "/"+format(upgradeEffect(this.layer, this.id))},
            unlocked() {return hasUpgrade('amogus', 44)&&hasUpgrade('booster', 45)}
       	},
    },
    clickables: {
        11: {
            title: "🆎 Extractor",
            display(){
                if (player.amogus.Extracting) return "is Extracting"
                return "isn't Extracting"
            },
            unlocked() {return getBuyableAmount('amogus', 22).gte(1)&&hasUpgrade('booster', 21)},
            canClick() {return getBuyableAmount('amogus', 22).gte(1)&&(!hasUpgrade('chess', 45))},
            onClick() { player.amogus.Extracting = !player.amogus.Extracting },
            style: {"background-color"(){
                let color = "#666666"
                if (player.amogus.Extracting) color = "#8B0000"
                return color
            }},
        },
        12: {
            title: "Sell a 🆎 Extractor",
            unlocked() {return getBuyableAmount('amogus', 22).gte(1)&&hasUpgrade('booster', 21)},
            canClick() {return getBuyableAmount('amogus', 22).gte(1)},
            onClick() { setBuyableAmount('amogus', 22, getBuyableAmount('amogus', 22).sub(1).max(0))},
            style: {"background-color"(){
                let color = "#8B0000"
                return color
            }},
        },
        13: {
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
                let base = new Decimal(1e3).mul(Decimal.pow(4, x.pow(1.25)))
                if (hasUpgrade('amogus', 44)) base = base.div(upgradeEffect('amogus', 44))
                if (hasUpgrade('booster', 32)) base = base.div(upgradeEffect('booster', 32))
                if (hasUpgrade('chess', 14)) base = base.div(upgradeEffect('chess', 14))
                return base.floor()
            },
            tooltip() {
                return "Cost Formula:<br>1,000*4<sup>x<sup>1.250</sup></sup>/<b>Cost Dividers</b>"
            },
            display() {
                return "Multiply 🆎 gain and limit by "+format(buyableEffect(this.layer, this.id).Ba)+"<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " amogus" + "<br>Bought: " + getBuyableAmount(this.layer, this.id)+ (this.freelevel().gte(1) ? "+"+formatWhole(this.freelevel()): "") + "<br>Effect: " + format(buyableEffect(this.layer, this.id).Bo)+"x"
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
                base1 = base1.times(buyableEffect('amogus', 21).Ef1)
                let expo = x.add(this.freelevel())
                let eff1 = base1.pow(expo)
                return {
                    Ba: base1,
                    Bo: eff1}
            },
            freelevel() {
                let freelvl = new Decimal (0)
                if (hasUpgrade('amogus', 45)) freelvl = freelvl.add(getBuyableAmount('amogus', 21))
                return freelvl.floor()
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
                let base = new Decimal(1e3).mul(Decimal.pow(4, x.pow(1.25)))
                if (hasUpgrade('amogus', 44)) base = base.div(upgradeEffect('amogus', 44))
                if (hasUpgrade('booster', 32)) base = base.div(upgradeEffect('booster', 32))
                if (hasUpgrade('chess', 14)) base = base.div(upgradeEffect('chess', 14))
                return base.floor()
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
                if (player.amogus.Extracting&&(!hasUpgrade('chess', 45))) eff1 = eff1.times(0)
                if (hasUpgrade('amogus', 35)) eff1 = eff1.times(upgradeEffect('amogus', 35))
                if (hasUpgrade('booster', 34)) eff1 = eff1.times(upgradeEffect('booster', 34))
                eff1 = eff1.times(tmp.booster.effect)
                if (player.difficulty.staticResBoost) eff1 = eff1.times(2)
                eff1 = eff1.times(buyableEffect('chess', 11).Ef)
                eff1 = eff1.times(buyableEffect('chess', 31).Ef)
                if (inChallenge('chess', 12)) eff1 = eff1.div(1e15)
                let eff2 = base2.pow(x, expo).mul(x.min(1))
                eff2 = eff2.times(buyableEffect('amogus', 11).Bo)
                if (hasUpgrade('amogus', 32)) eff2 = eff2.times(upgradeEffect('amogus', 32))
                if (hasUpgrade('amogus', 35)) eff2 = eff2.times(upgradeEffect('amogus', 35))
                if (hasUpgrade('booster', 13)) eff2 = eff2.times(upgradeEffect('booster', 13))
                if (hasUpgrade('booster', 25)) eff2 = eff2.times(upgradeEffect('booster', 25))
                if (hasUpgrade('booster', 43)) eff2 = eff2.times(upgradeEffect('booster', 43))
                eff2 = eff2.times(buyableEffect('amogus', 24).Ef)
                if (hasUpgrade('chess', 32)) eff2 = eff2.pow(1.1)
                return {
                    BaP: base1,
                    BaL: base2,
                    P: eff1,
                    L: eff2
                }
            },
        },
        21: {
            title: "🆎 Charged Booster",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color": "#AA336A"
                }
            },
            branches: [11],
            unlocked() {
                return hasUpgrade('booster', 43)
            },
            cost(x) {
                let base = new Decimal(69).add(x.pow(2))
                if (hasUpgrade('chess', 44)) base = base.sub(69)
                return base.floor()
            },
            tooltip() {
                if (hasUpgrade('chess', 44)) return "Cost Formula:<br>x<sup>2</sup>"
                return "Cost Formula:<br>69+x<sup>2</sup>"
            },
            display() {
                return "Multiply <b>🆎 Boosters</b>' Effect Base by "+format(buyableEffect(this.layer, this.id).Ba1)+"<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost)+ " <b>🆎 Boosters</b><br>Bought: "+ formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effect: "+ format(buyableEffect(this.layer, this.id).Ef1)+"x"
            },
            canAfford() {
                return getBuyableAmount('amogus', 11).gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                setBuyableAmount(this.layer, 11, getBuyableAmount(this.layer, 11).sub(this.cost().times(cost)))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal (1.05)
                let eff1 = base1.pow(x)
                return {
                    Ba1: base1,
                    Ef1: eff1
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
                let base = new Decimal(1e10).mul(Decimal.pow(100, x.pow(1.25)))
                if (hasUpgrade('booster', 32)) base = base.div(upgradeEffect('booster', 32))
                if (hasUpgrade('chess', 33)) base = base.div(upgradeEffect('chess', 33))
                return base.floor()
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
                if (hasUpgrade('booster', 44)) base1 = base1.add(0.125)
                let base2 = new Decimal (1e10)
                if (hasMilestone('chess', 1)) base2 = base2.pow(0.5)
                if (hasUpgrade('chess', 45)) base2 = base2.pow(0.5)
                let expo2 = new Decimal (1.1)
                if (hasChallenge('chess', 15)) expo2 = new Decimal (1.09)
                let limbase = new Decimal (2)
                let diveff2 = new Decimal (1)
                if (hasUpgrade('amogus', 45)) diveff2 = diveff2.times(upgradeEffect('amogus', 45))
                if (hasUpgrade('booster', 22)) diveff2 = diveff2.times(upgradeEffect('booster', 22).D)
                diveff2 = diveff2.times(buyableEffect('chess', 61).Ef)
                let eff1 = new Decimal(0.5).times(Decimal.pow(base1, x.sub(1))).times(x.max(1).min(1))
                if (hasUpgrade('amogus', 44)) eff1 = eff1.times(buyableEffect('chess', 11).MP)
                if (hasUpgrade('booster', 23)) eff1 = eff1.times(upgradeEffect('booster', 23))
                if (hasUpgrade('booster', 35)) eff1 = eff1.times(upgradeEffect('booster', 35))
                if (hasMilestone('booster', 3)) eff1 = eff1.times(tmp.booster.M4effect)
                if (hasUpgrade('chess', 31)) eff1 = eff1.times(upgradeEffect('chess', 31))
                eff1 = eff1.times(buyableEffect('chess', 32).Ef)
                if (player.difficulty.staticResBoost) eff1 = eff1.times(2)
                if (hasMilestone('chess', 1)) eff1 = eff1.times(tmp.chess.M1effect)
                let eff2 = base2.pow(Decimal.pow(expo2, x.sub(1))).times(x.max(1).min(1))
                eff2 = eff2.div(diveff2)
                let lim = new Decimal (1).times(Decimal.pow(limbase, x)).times(x.max(1).min(1))
                if (hasUpgrade('chess', 43)) lim = lim.times(upgradeEffect('chess', 43))
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
                let base = new Decimal(1e10).mul(Decimal.pow(100, x.pow(1.25)))
                if (hasUpgrade('booster', 32)) base = base.div(upgradeEffect('booster', 32))
                if (hasUpgrade('chess', 33)) base = base.div(upgradeEffect('chess', 33))
                return base.floor()
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
                let base = new Decimal(1e10).mul(Decimal.pow(100, x.pow(1.25)))
                if (hasUpgrade('booster', 32)) base = base.div(upgradeEffect('booster', 32))
                if (hasUpgrade('chess', 33)) base = base.div(upgradeEffect('chess', 33))
                return base.floor()
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
        let ABrwe = new Decimal (1)
        if (hasUpgrade('chess', 45)) ABrwe = new Decimal (0)
        if (hasUpgrade('chess', 45)) player[this.layer].Extracting = true
        player.amogus.AB = player.amogus.AB.add((buyableEffect('amogus', 12).P).times(diff)).sub((player.amogus.AB.gte((buyableEffect('amogus', 22).LO))&&player.amogus.Extracting&&!player.amogus.ExAB.gte(buyableEffect('amogus', 22).LI)) ? (buyableEffect('amogus', 22).LO).times(diff).times(ABrwe) : new Decimal (0)).max(0).min(buyableEffect('amogus', 12).L)
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
        autoreset: false,
		points: new Decimal(0),
        best: new Decimal (0),
    }},
    tooltip() {
       let base = formatWhole(player.booster.points)+" boring boosters"
       if (false) base = base+"<br>"+format(player.amogus.AB)+" 🆎"
       return base
    },
    color: "#ACACE6",
    requires: new Decimal(8e5),
    resource: "boring boosters",
    baseResource: "amogus",
    baseAmount() {return player.amogus.points},
    type: "static",
    base() {return new Decimal (5)},
    exponent() {return new Decimal (1.25)},
    gainMult() {
        let mult = new Decimal (1)
        if (hasUpgrade('amogus', 45)) mult = mult.div(upgradeEffect('amogus', 45))
        if (hasUpgrade('booster', 14)) mult = mult.div(upgradeEffect('booster', 14))
        if (hasUpgrade('booster', 24)) mult = mult.div(upgradeEffect('booster', 24))
        if (hasUpgrade('booster', 31)) mult = mult.div(upgradeEffect('booster', 31))
        if (hasUpgrade('booster', 41)) mult = mult.div(upgradeEffect('booster', 41))
        if (hasUpgrade('chess', 41)) mult = mult.div(upgradeEffect('chess', 41))
        mult = mult.div(buyableEffect('chess', 41).Ef)
        return mult
    },
    row: 1,
    layerShown() {return hasUpgrade('amogus', 35)||player[this.layer].unlocked},
    doReset(l) {
        if (!(layers[l].row > this.row)) return
        
        let keep = ['autoreset','milestones']
        if (hasUpgrade('chess', 13)) keep.push('upgrades')
        
        layerDataReset(this.layer, keep)
    },
    autoPrestige() {return player.booster.autoreset},
    resetsNothing() {return hasUpgrade('chess', 23)},
    branches: ["amogus"],
    effect() {
		let amt = player.booster.best;
		let base = new Decimal(2)
        if (hasUpgrade('booster', 12)) base = base.add(upgradeEffect('booster', 12))
        if (hasUpgrade('booster', 45)) base = base.add(upgradeEffect('booster', 45))
        base = base.add(buyableEffect('chess', 42).Ef)
        if (inChallenge('chess', 13)) base = base.sub(1)
        if (inChallenge('chess', 14)) base = base.sub(1.25)
        if (inChallenge('chess', 15)) base = base.sub(1.5)
		eff = Decimal.pow(base.max(1),amt);
		return eff;
	},
    M4effect() {
        return Decimal.add(player[this.layer].milestones.length, 2).pow(0.75)
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
            tooltip() {return "Formula: (log<sub>10</sub>([best amogus]+1)+2)<sup>0.4</sup>/16"},
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
                if (hasUpgrade('chess', 25)) base = base.add(upgradeEffect('chess', 25))
                let expo = new Decimal (1)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return "^"+format(upgradeEffect(this.layer, this.id)) },
            unlocked() {return hasUpgrade('booster', 15)}
       	},
        22: {
	        title: "Booster Upgrade B2",
        	description: "Multiply amogus gain by 1.25 per upgrade, Divide Extracting 🆎 Requirements by 50",
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
            tooltip() {return "Formula: (log<sub>10</sub>([🆎 Limit]+1)+2)<sup>0.6</sup>"},
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
        41: {
	        title: "Booster Upgrade D1",
        	description: "Divide Booster's Cost based on Extracted 🆎",
            tooltip() {return "Formula: (log<sub>2</sub>([Extracted 🆎]+1)+2)<sup>2.5</sup>"},
         	cost: new Decimal (50),
            effect() {
                 let base = player.amogus.ExAB.max(0).add(1).log(2).add(2)
                 let expo = new Decimal (2.5)
                 let eff = base.pow(expo)
                 return eff
            },
            effectDisplay() { return "/"+format(upgradeEffect(this.layer, this.id)) },
            unlocked() {return hasUpgrade('booster', 35)&&hasUpgrade('chess', 35)}
       	},
        42: {
	        title: "Booster Upgrade D2",
        	description: "Time for lil inflate, Raise amogus gain to the 1.1th power",
         	cost: new Decimal (55),
            unlocked() {return hasUpgrade('booster', 41)&&hasUpgrade('chess', 35)}
       	},
        43: {
	        title: "Booster Upgrade D3",
        	description: "Multiply 🆎 Limit based on best Boosters, Unlock <b>🆎 Charged Booster</b>",
            tooltip() {return "Formula: ([best booster]+2)<sup>3</sup>"},
         	cost: new Decimal (63),
            effect() {
                let base = player.booster.best.add(2)
                let expo = new Decimal (3)
                let eff = base.pow(expo)
                return eff
           },
           effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('booster', 42)&&hasUpgrade('chess', 35)}
       	},
        44: {
	        title: "Booster Upgrade D4",
        	description: "Increase <b>🆎 Extractors</b>' gain base by 0.125, Unlock 2 new Pieces",
         	cost: new Decimal (69),
            unlocked() {return hasUpgrade('booster', 43)&&hasUpgrade('chess', 35)}
       	},
        45: {
	        title: "Booster Upgrade D5",
        	description: "Increase Booster's Base based on booster, Unlock 5 amogus upgrades",
            tooltip() {return "Formula: ([boosters]+2)<sup>0.5</sup>/32"},
         	cost: new Decimal (74),
            effect() {
                let base = player.booster.points.add(2)
                let expo = new Decimal (0.5)
                let eff = base.pow(expo).div(32)
                return eff
           },
           effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id)) },
            unlocked() {return hasUpgrade('booster', 44)&&hasUpgrade('chess', 35)}
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
        3: {requirementDescription: "21 Boring Boosters",
            done() {return player[this.layer].best.gte(21)},
            unlocked() {return hasUpgrade(this.layer, 21)},
            effectDescription() {return "Multiply Extracted 🆎 gain from Extracting by " + format(tmp.booster.M4effect) + " (based on milestones)"},
            tooltip() {return "Formula: ([Milestones]+2)<sup>0.75</sup>"},
        },
        4: {requirementDescription: "27 Boring Boosters",
            done() {return player[this.layer].best.gte(27)},
            effectDescription: "Unlock a new layer.",
        },
    },
    update(diff) {
        if (!player.difficulty.gameStarted) {
            player[this.layer].unlocked = false
            layerDataReset(this.layer)}
    },
})
addLayer("chess", {
    name: "chess", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "♙", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal (0),
        spentMP: new Decimal (0),
    }},
    tooltip() {
       let base = format(player.chess.points)+" chess points"
       if (hasUpgrade('chess', 11)) base = base+"<br>"+formatWhole(new Decimal(buyableEffect('chess', 11).MP).sub(player.chess.spentMP))+"/"+formatWhole(buyableEffect('chess', 11).MP)+" MP"
       return base
    },
    color: "#008080",
    requires() {
        let base = new Decimal(1e36)
        if (hasUpgrade('chess', 41)) base = base.div(1e6)
        return base
    }, // Can be a function that takes requirement increases into account
    resource: "chess points", // Name of prestige currency
    baseResource: " amogus", // Name of resource prestige is based on
    baseAmount() {return player.amogus.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal (1)
        if (hasUpgrade('chess', 15)) mult = mult.times(upgradeEffect('chess', 15))
        if (hasUpgrade('chess', 32)) mult = mult.times(upgradeEffect('chess', 32))
        if (hasUpgrade('chess', 42)) mult = mult.times(upgradeEffect('chess', 42))
        mult = mult.times(buyableEffect('chess', 51).Ef)
        if (player.difficulty.staticResBoost) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal (1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown() {
        return hasMilestone('booster', 4)||player[this.layer].unlocked
    },
    doReset(l) {
        if (!(layers[l].row > this.row)) return
        
        let keep = ['milestones']
        
        
        layerDataReset(this.layer, keep)
    },
    hotkeys: [
        {key: "c", description: "C: Reset for chess points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches: ["amogus", "booster"],
    effect() {
		let amt = player.chess.best.max(0).add(1).log(2).add(1);
		let pow = new Decimal(2)
        if (hasUpgrade('chess', 43)) pow = pow.times(2)
		eff = Decimal.pow(amt, pow);
		return eff;
	},
    MPeffect() {
        return Decimal.pow(1.5, buyableEffect(this.layer, 11).MP)
    },
    M1effect() {
        return buyableEffect('amogus', 22).LO.max(1).log(2).add(2).pow(0.8)
    },
    AmogusDivinFerz() {return Decimal.pow(10, player.amogus.points.max(1).log(10).pow(0.5))},
    PointDivinWazir() {return Decimal.pow(10, player.points.max(1).log(10).pow(0.6))},
    effectDescription() { 
        let eff = this.effect();
        return "translated to a "+format(eff)+"x boost to amogus gain (based on best chess points)"
    },
    passiveGeneration() {
        if (hasMilestone('chess', 2)) return new Decimal (0.1)
        return 0
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
            "milestones",
            "blank",
            "upgrades",
            "blank",
        ]},
        "Pieces": {
            unlocked(){return hasUpgrade("chess", 11)},
            content:[
                "main-display",
                "blank",
                ["prestige-button",function(){return ""}],
                "blank",
                "resource-display",
                "blank",
                ["display-text",
                function() {
                    return "You have " + formatWhole(buyableEffect('chess',11).MP) + " Material points, Translated to a x" + format(tmp.chess.MPeffect) + " boost to amogus gain."
                }],
                "blank",
                ["display-text",
                function() {
                    if (hasUpgrade('chess', 13)) return "You have " + formatWhole(buyableEffect('chess',11).MP.sub(player[this.layer].spentMP)) + " Material points left to spend."
                    return ""
                }],
                "blank",
                "buyables",
                "blank",
                ["row", [["clickable", 11]]],
            ]},
            "Challenges": {
                unlocked(){return hasUpgrade('chess', 45)},
                content:[
                    "main-display",
                    "blank",
                    ["prestige-button",function(){return ""}],
                    "blank",
                    "resource-display",
                    "blank",
                    "challenges",
                    "blank",
                ]},
    },
    milestones: {
        0: {
            requirementDescription: "20 chess points",
                done() {return player[this.layer].best.gte(20)}, // Used to determine when to give the milestone
                effectDescription: "Automatically gain boosters.",
                toggles: [["booster", "autoreset"]]
            },
        1: {
                requirementDescription: "1.000e12 chess points",
                    done() {return player[this.layer].best.gte(1e12)}, // Used to determine when to give the milestone
                    tooltip() {return "Effect Formula:<br>(log<sub>2</sub>([Ex. Req.])+2)<sup>0.8</sup>"},
                    effectDescription() {return "Square root extracting Requirements, but Multiply Extracted 🆎 gain by "+format(tmp.chess.M1effect)+" (based on it)."},
                },
        2: {
                requirementDescription: "4.204e20 chess points",
                    done() {return player[this.layer].best.gte(4.204e20)}, // Used to determine when to give the milestone
                    effectDescription: "Gain 10% of chess gain on reset per second.",
                },
    },
    clickables: {
        11: {
            title: "Respec Pieces",
            display(){
                return "Respec all Pieces for "+formatWhole(player[this.layer].spentMP)+" spent MP"
            },
            tooltip() {return "This will not force a chess reset, don't worry =)"},
            unlocked() {return true},
            canClick() {return player[this.layer].spentMP.gt(0)},
            onClick() {
                if (!hasChallenge('chess', 11)) {
                setBuyableAmount(this.layer, 21, new Decimal(0))
                setBuyableAmount(this.layer, 22, new Decimal(0))
                }
                setBuyableAmount(this.layer, 31, new Decimal(0))
                setBuyableAmount(this.layer, 32, new Decimal(0))
                setBuyableAmount(this.layer, 41, new Decimal(0))
                setBuyableAmount(this.layer, 42, new Decimal(0))
                setBuyableAmount(this.layer, 51, new Decimal(0))
                setBuyableAmount(this.layer, 52, new Decimal(0))
                setBuyableAmount(this.layer, 61, new Decimal(0))
                setBuyableAmount(this.layer, 62, new Decimal(0))
                player[this.layer].spentMP = new Decimal (0)
            },
        },
    },
    upgrades: {
        11: {
	        title: "Chess Upgrade A1",
        	description: "Multiply amogus gain by 3, Unlock a new tab.",
         	cost: new Decimal (2),
            effect() {
                return new Decimal (3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return player[this.layer].unlocked}
       	},
        12: {
	        title: "Chess Upgrade A2",
        	description: "Multiply point gain by 2 per upgrade, Unlock a new tab.",
         	cost: new Decimal (4),
            effect() {
                return new Decimal (2).pow(player[this.layer].upgrades.length)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade(this.layer, 11)}
       	},
        13: {
	        title: "Chess Upgrade A3",
        	description: "Keep Boosters upgrades on reset, Unlock 2 new Pieces.",
         	cost: new Decimal (7),
            unlocked() {return hasUpgrade(this.layer, 12)}
       	},
        14: {
	        title: "Chess Upgrade A4",
        	description: "Divide all Row 1 🆎 Buyables' Cost based on<b>♙ White Pawn</b>.",
            tooltip() {return "Effect Formula: 5<sup>([♙ White Pawn]+2)<sup>0.5</sup></sup>"},
         	cost: new Decimal (15),
            effect() {
                return new Decimal (5).pow(getBuyableAmount('chess', 21).add(2).pow(0.5))
            },
            effectDisplay() { return "/"+format(upgradeEffect(this.layer, this.id)) },
            unlocked() {return hasUpgrade(this.layer, 13)}
       	},
        15: {
	        title: "Chess Upgrade A5",
        	description: "Multiply Chess Point gain based on Boosters after 25.",
            tooltip() {return "Effect Formula: ([Boring Booster]-25)<sup>0.5</sup>+2"},
         	cost: new Decimal (42),
            effect() {
                return player.booster.points.sub(25).max(0).pow(0.5).add(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade(this.layer, 14)}
       	},
        21: {
	        title: "Chess Upgrade B1",
        	description: "Multiply point gain based on 🆎, again.",
            tooltip() {return "Effect Formula: (log<sub>10</sub>[🆎])<sup>1.25</sup>+2"},
         	cost: new Decimal (200),
            effect() {
                return player.amogus.AB.max(1).log(10).pow(1.25).add(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade(this.layer, 15)}
       	},
        22: {
	        title: "Chess Upgrade B2",
        	description: "Square root the Point gain nerf again.",
         	cost: new Decimal (500),
            unlocked() {return hasUpgrade(this.layer, 21)}
       	},
        23: {
	        title: "Chess Upgrade B3",
        	description: "Boosters reset Nothing.",
         	cost: new Decimal (1250),
            unlocked() {return hasUpgrade(this.layer, 22)}
       	},
        24: {
	        title: "Chess Upgrade B4",
        	description: "Multiply amogus gain based on 🆎.",
            tooltip() {return "Effect Formula: (log<sub>2</sub>[🆎])<sup>0.5</sup>+2"},
         	cost: new Decimal (6666),
            effect() {
                return player.amogus.AB.max(1).log(2).pow(0.5).add(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade(this.layer, 23)}
       	},
        25: {
	        title: "Chess Upgrade B5",
        	description: "Each upgrade add 0.1 to <b>Booster Upgrade B1</b>'s Effect base.",
         	cost: new Decimal (22222),
            effect() {
                return new Decimal (player.chess.upgrades.length).times(0.1)
            },
            effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id)) },
            unlocked() {return hasUpgrade(this.layer, 24)}
       	},
        31: {
	        title: "Chess Upgrade C1",
        	description: "Multiply Extracted 🆎 based on total MP, Unlock 4 Pieces",
            tooltip() {return "Effect Formula: ([total MP]+2)<sup>1.5</sup>"},
         	cost: new Decimal (55555),
             effect() {
                return new Decimal (buyableEffect('chess', 11).MP).add(2).pow(1.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade(this.layer, 25)}
       	},
        32: {
	        title: "Chess Upgrade C2",
        	description: "Raise 🆎 Limit to the 1.1th power, Multiply Chess point gain based on chess points",
            tooltip() {return "Effect Formula: (ln[chess points]+2)<sup>0.5</sup>"},
         	cost: new Decimal (125000),
             effect() {
                return player[this.layer].points.max(1).ln().add(2).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade(this.layer, 31)}
       	},
        33: {
	        title: "Chess Upgrade C3",
        	description: "Divide all Row 2 🆎 Buyables' Cost based on<b>♟︎ Black Pawn</b>.",
            tooltip() {return "Effect Formula: 5<sup>([♟︎ Black Pawn]+2)<sup>0.5</sup></sup>"},
         	cost: new Decimal (4.2e5),
             effect() {
                return new Decimal (5).pow(getBuyableAmount('chess', 22).add(2).pow(0.5))
            },
            effectDisplay() { return "/"+format(upgradeEffect(this.layer, this.id)) },
            unlocked() {return hasUpgrade(this.layer, 32)}
       	},
        34: {
	        title: "Chess Upgrade C4",
        	description: "Multiply point gain based on chess points.",
            tooltip() {return "Effect Formula: (ln([chess points])+2)<sup>2.5</sup>"},
         	cost: new Decimal (8e5),
            effect() {
                return player.chess.points.ln().add(2).pow(2.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade(this.layer, 33)}
       	},
        35: {
	        title: "Chess Upgrade C5",
        	description: "Decrease <b>Material Points</b>' Cost base by 1, Unlock 5 more booster upgrades.",
         	cost: new Decimal (1.2e6),
            unlocked() {return hasUpgrade(this.layer, 34)}
       	},
        41: {
	        title: "Chess Upgrade D1",
        	description: "Divide Booster's Cost based on total MP, Divide Chess reset's requirement by 1e6.",
            tooltip() {return "Effect Formula: ([MP]+2)<sup>(log<sub>2</sub>([MP]+1))<sup>0.75</sup>+2</sup>"},
         	cost: new Decimal (1e22),
            effect() {
                let base = new Decimal(buyableEffect('chess', 11).MP).add(2)
                let expo = new Decimal(buyableEffect('chess', 11).MP).max(0).add(1).log(2).pow(0.75).add(2)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return "/"+format(upgradeEffect(this.layer, this.id)) },
            unlocked() {return hasUpgrade(this.layer, 35)}
       	},
        42: {
	        title: "Chess Upgrade D2",
        	description: "Decrease <b>Material Points</b>' Cost base by 1, Multiply chess point gain based on total MP",
            tooltip() {return "Effect Formula: ([MP]+2)<sup>[MP]<sup>0.5</sup></sup>"},
         	cost: new Decimal (1e23),
            effect() {
                let base = new Decimal(buyableEffect('chess', 11).MP).add(2)
                let expo = new Decimal(buyableEffect('chess', 11).MP).pow(0.4)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade(this.layer, 41)}
       	},
        43: {
	        title: "Chess Upgrade D3",
        	description: "Decrease <b>Material Points</b>' Cost base by 1, Raise Chess Point effect to the 2nd power, Multiply Ex. 🆎 lim based on Ex. 🆎 lim.",
            tooltip() {return "Effect Formula: (log<sub>2</sub>([Ex.🆎 Lim])+2)<sup>2</sup>"},
         	cost: new Decimal (2.727e27),
            effect() {
                let base = buyableEffect('amogus', 22).LI.max(1).log(2).add(2)
                let expo = new Decimal(2)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade(this.layer, 42)}
       	},
        44: {
	        title: "Chess Upgrade D4",
        	description: "Gain 1 free MP for each 5 <b>Material Points</b>, Remove <b>🆎 Charged Booster</b>'s cost base, Unlock 2 new Pieces.",
            effect() {
                let base = new Decimal(getBuyableAmount('chess', 11)).div(5).floor()
                let expo = new Decimal(1)
                let eff = base.pow(expo)
                return eff
            },
         	cost: new Decimal (1e30),
             effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id)) },
            unlocked() {return hasUpgrade(this.layer, 43)}
       	},
        45: {
	        title: "Chess Upgrade D5",
        	description: "Square root Ex. Req., Always ex. 🆎 and it doesn't stop your 🆎 production nor consuming your 🆎, Unlock <b>Challenges</b>",
         	cost: new Decimal (2.829e31),
            unlocked() {return hasUpgrade(this.layer, 44)}
       	},
    },
    buyables: {
        11: {
            title: "Material Points",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color": "#FFFFFF"
                }
            },
            unlocked() {
                return true
            },
            cost(x) {
                let base = new Decimal (10)
                if (hasUpgrade('chess', 35)) base = new Decimal (9)
                if (hasUpgrade('amogus', 43)) base = new Decimal (8)
                if (hasUpgrade('chess', 42)) base = new Decimal (7)
                if (hasUpgrade('chess', 43)) base = new Decimal (6)
                if (hasChallenge('chess', 15)) base = new Decimal (5)
                let pow = x.pow(1.25)
                let divcost = new Decimal(1)
                divcost = divcost.times(buyableEffect('chess', 52).Ef)
                return base.pow(pow).div(divcost).floor()
            },
            tooltip() {
                if (hasChallenge('chess', 15)) return "Cost Formula:<br>5<sup>x<sup>1.25</sup></sup>"
                if (hasUpgrade('chess', 43)) return "Cost Formula:<br>6<sup>x<sup>1.25</sup></sup>"
                if (hasUpgrade('chess', 42)) return "Cost Formula:<br>7<sup>x<sup>1.25</sup></sup>"
                if (hasUpgrade('amogus', 43)) return "Cost Formula:<br>8<sup>x<sup>1.25</sup></sup>"
                if (hasUpgrade('chess', 35)) return "Cost Formula:<br>9<sup>x<sup>1.25</sup></sup>"
                return "Cost Formula:<br>10<sup>x<sup>1.25</sup></sup>"
            },
            display() {
                return "Gain a Material Point and<br> Multiply 🆎 gain by "+format(buyableEffect(this.layer, this.id).Ba)+"<br>Cost: "+format(this.cost())+ " chess points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"<br>Effects: +"+ formatWhole(buyableEffect(this.layer, this.id).MP) + ", "+ format(buyableEffect(this.layer, this.id).Ef)+"x"
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
                let base1 = new Decimal (3)
                let expo = x
                let eff1 = base1.pow(expo)
                let matPt = new Decimal (x)
                if (hasUpgrade('chess', 44)) matPt = matPt.add(upgradeEffect('chess', 44))
                return {
                    Ba: base1,
                    Ef: eff1,
                    MP: matPt
                }
            },
        },
        21: {
            title: "♙ White Pawn",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color": "#FFFFFF"
                }
            },
            unlocked() {
                return hasUpgrade('chess', 13)
            },
            cost(x) {
                let base = new Decimal (1)
                if (hasChallenge('chess', 11)) base = new Decimal (0)
                return base
            },
            tooltip() {
                return "Effect Formula: ([total MP]+2)<sup>0.75</sup>"
            },
            display() {
                return "Multiply Point gain by "+format(buyableEffect(this.layer, this.id).Ba)+" (based on total MP)<br>Cost: "+format(this.cost())+ " material points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"/8<br>Effect: "+ format(buyableEffect(this.layer, this.id).Ef)+"x"
            },
            canAfford() {
                return ((Decimal.sub(buyableEffect('chess', 11).MP, player[this.layer].spentMP)).gte(this.cost()))&&(getBuyableAmount(this.layer, this.id).lt(8))
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].spentMP = player[this.layer].spentMP.add(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = buyableEffect('chess', 11).MP.max(0).add(2).pow(0.75)
                if (inChallenge('chess', 12)) base1 = new Decimal (1)
                if (inChallenge('chess', 13)) base1 = new Decimal (1)
                if (inChallenge('chess', 14)) base1 = new Decimal (1)
                if (inChallenge('chess', 15)) base1 = new Decimal (1)
                let expo = x
                let eff1 = base1.pow(expo)
                return {
                    Ba: base1,
                    Ef: eff1,
                }
            },
        },
        22: {
            title: "♟︎ Black Pawn",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color": "#333333"
                }
            },
            unlocked() {
                return hasUpgrade('chess', 13)
            },
            cost(x) {
                let base = new Decimal (1)
                if (hasChallenge('chess', 11)) base = new Decimal (0)
                return base
            },
            tooltip() {
                return "Effect Formula: ([total MP]+2)<sup>0.45</sup>"
            },
            display() {
                return "Multiply amogus gain by "+format(buyableEffect(this.layer, this.id).Ba)+" (based on total MP)<br>Cost: "+format(this.cost())+ " material points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"/8<br>Effect: "+ format(buyableEffect(this.layer, this.id).Ef)+"x"
            },
            canAfford() {
                return ((Decimal.sub(buyableEffect('chess', 11).MP, player[this.layer].spentMP)).gte(this.cost()))&&(getBuyableAmount(this.layer, this.id).lt(8))
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].spentMP = player[this.layer].spentMP.add(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = buyableEffect('chess', 11).MP.max(0).add(2).pow(0.45)
                if (inChallenge('chess', 12)) base1 = new Decimal (1)
                if (inChallenge('chess', 13)) base1 = new Decimal (1)
                if (inChallenge('chess', 14)) base1 = new Decimal (1)
                if (inChallenge('chess', 15)) base1 = new Decimal (1)
                let expo = x
                let eff1 = base1.pow(expo)
                return {
                    Ba: base1,
                    Ef: eff1,
                }
            },
        },
        31: {
            title: "♘ White Knight",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color": "#FFFFFF"
                }
            },
            unlocked() {
                return hasUpgrade('chess', 31)
            },
            cost(x) {
                let base = new Decimal (3)
                if (hasChallenge('chess', 12)&&(x.gte(2))) base = new Decimal (4)
                return base
            },
            tooltip() {
                return "Effect Formula: ([total MP]+2)<sup>0.6</sup>"
            },
            display() {
                let limit = new Decimal (2)
                if (hasChallenge('chess', 12)) limit = new Decimal (3)
                return "Multiply 🆎 gain by "+format(buyableEffect(this.layer, this.id).Ba)+" (based on total MP)<br>Cost: "+format(this.cost())+ " material points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"/"+formatWhole(limit)+"<br>Effect: "+ format(buyableEffect(this.layer, this.id).Ef)+"x"
            },
            canAfford() {
                let limit = new Decimal (2)
                if (hasChallenge('chess', 12)) limit = new Decimal (3)
                return ((Decimal.sub(buyableEffect('chess', 11).MP, player[this.layer].spentMP)).gte(this.cost()))&&(getBuyableAmount(this.layer, this.id).lt(limit))
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].spentMP = player[this.layer].spentMP.add(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = buyableEffect('chess', 11).MP.max(0).add(2).pow(0.6)
                if (inChallenge('chess', 11)) base1 = new Decimal (1)
                if (inChallenge('chess', 13)) base1 = new Decimal (1)
                if (inChallenge('chess', 14)) base1 = new Decimal (1)
                if (inChallenge('chess', 15)) base1 = new Decimal (1)
                if (inChallenge('chess', 12)) base1 = base1.pow(0.5)
                let expo = x
                let eff1 = base1.pow(expo)
                return {
                    Ba: base1,
                    Ef: eff1,
                }
            },
        },
        32: {
            title: "♞ Black Knight",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color": "#333333"
                }
            },
            unlocked() {
                return hasUpgrade('chess', 31)
            },
            cost(x) {
                let base = new Decimal (3)
                if (hasChallenge('chess', 12)&&(x.gte(2))) base = new Decimal (4)
                return base
            },
            tooltip() {
                return "Effect Formula: ([total MP]+2)<sup>0.4</sup>"
            },
            display() {
                let limit = new Decimal (2)
                if (hasChallenge('chess', 12)) limit = new Decimal (3)
                return "Multiply Extracted 🆎 gain by "+format(buyableEffect(this.layer, this.id).Ba)+" (based on total MP)<br>Cost: "+format(this.cost())+ " material points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"/"+formatWhole(limit)+"<br>Effect: "+ format(buyableEffect(this.layer, this.id).Ef)+"x"
            },
            canAfford() {
                let limit = new Decimal (2)
                if (hasChallenge('chess', 12)) limit = new Decimal (3)
                return ((Decimal.sub(buyableEffect('chess', 11).MP, player[this.layer].spentMP)).gte(this.cost()))&&(getBuyableAmount(this.layer, this.id).lt(limit))
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].spentMP = player[this.layer].spentMP.add(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = buyableEffect('chess', 11).MP.max(0).add(2).pow(0.4)
                if (inChallenge('chess', 11)) base1 = new Decimal (1)
                if (inChallenge('chess', 13)) base1 = new Decimal (1)
                if (inChallenge('chess', 14)) base1 = new Decimal (1)
                if (inChallenge('chess', 15)) base1 = new Decimal (1)
                if (inChallenge('chess', 12)) base1 = base1.pow(0.5)
                let expo = x
                let eff1 = base1.pow(expo)
                return {
                    Ba: base1,
                    Ef: eff1,
                }
            },
        },
        41: {
            title: "♗ White Bishop",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color": "#FFFFFF"
                }
            },
            unlocked() {
                return hasUpgrade('chess', 31)
            },
            cost(x) {
                let base = new Decimal (3)
                if (hasChallenge('chess', 13)&&(x.gte(2))) base = new Decimal (4)
                return base
            },
            tooltip() {
                return "Effect Formula: ([total MP]+2)<sup>2.5</sup>"
            },
            display() {
                let limit = new Decimal (2)
                if (hasChallenge('chess', 13)) limit = new Decimal (3)
                return "Divide Booster Cost by "+format(buyableEffect(this.layer, this.id).Ba)+" (based on total MP)<br>Cost: "+format(this.cost())+ " material points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"/"+formatWhole(limit)+"<br>Effect: /"+ format(buyableEffect(this.layer, this.id).Ef)
            },
            canAfford() {
                let limit = new Decimal (2)
                if (hasChallenge('chess', 13)) limit = new Decimal (3)
                return ((Decimal.sub(buyableEffect('chess', 11).MP, player[this.layer].spentMP)).gte(this.cost()))&&(getBuyableAmount(this.layer, this.id).lt(limit))
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].spentMP = player[this.layer].spentMP.add(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = buyableEffect('chess', 11).MP.max(0).add(2).pow(2.5)
                if (inChallenge('chess', 11)) base1 = new Decimal (1)
                if (inChallenge('chess', 12)) base1 = new Decimal (1)
                if (inChallenge('chess', 14)) base1 = new Decimal (1)
                let expo = x
                let eff1 = base1.pow(expo)
                return {
                    Ba: base1,
                    Ef: eff1,
                }
            },
        },
        42: {
            title: "♝ Black Bishop",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color": "#333333"
                }
            },
            unlocked() {
                return hasUpgrade('chess', 31)
            },
            cost(x) {
                let base = new Decimal (3)
                if (hasChallenge('chess', 13)&&(x.gte(2))) base = new Decimal (4)
                return base
            },
            tooltip() {
                return "Effect Formula: ([total MP]+2)<sup>0.2</sup>/32"
            },
            display() {
                let limit = new Decimal (2)
                if (hasChallenge('chess', 13)) limit = new Decimal (3)
                return "Add "+format(buyableEffect(this.layer, this.id).Ba)+" to your booster base (based on total MP)<br>Cost: "+format(this.cost())+ " material points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"/"+formatWhole(limit)+"<br>Effect: +"+ format(buyableEffect(this.layer, this.id).Ef)
            },
            canAfford() {
                let limit = new Decimal (2)
                if (hasChallenge('chess', 13)) limit = new Decimal (3)
                return ((Decimal.sub(buyableEffect('chess', 11).MP, player[this.layer].spentMP)).gte(this.cost()))&&(getBuyableAmount(this.layer, this.id).lt(limit))
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].spentMP = player[this.layer].spentMP.add(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = buyableEffect('chess', 11).MP.max(0).add(2).pow(0.2).div(32).min(0.1)
                if (inChallenge('chess', 11)) base1 = new Decimal (0)
                if (inChallenge('chess', 12)) base1 = new Decimal (0)
                if (inChallenge('chess', 14)) base1 = new Decimal (0)
                let eff1 = base1.times(x)
                return {
                    Ba: base1,
                    Ef: eff1,
                }
            },
        },
        51: {
            title: "♖ White Rook",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color": "#FFFFFF"
                }
            },
            unlocked() {
                return hasUpgrade('booster', 44)
            },
            cost(x) {
                let base = new Decimal (5)
                return base
            },
            tooltip() {
                return "Effect Formula: ([total MP]+2)<sup>0.8</sup>"
            },
            display() {
                return "Multiply chess point gain by "+format(buyableEffect(this.layer, this.id).Ba)+" (based on total MP)<br>Cost: "+format(this.cost())+ " material points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"/2<br>Effect: "+ format(buyableEffect(this.layer, this.id).Ef)+"x"
            },
            canAfford() {
                return ((Decimal.sub(buyableEffect('chess', 11).MP, player[this.layer].spentMP)).gte(this.cost()))&&(getBuyableAmount(this.layer, this.id).lt(2))
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].spentMP = player[this.layer].spentMP.add(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = buyableEffect('chess', 11).MP.max(0).add(2).pow(0.8)
                if (inChallenge('chess', 11)) base1 = new Decimal (1)
                if (inChallenge('chess', 12)) base1 = new Decimal (1)
                if (inChallenge('chess', 13)) base1 = new Decimal (1)
                if (inChallenge('chess', 14)) base1 = new Decimal (1)
                if (hasChallenge('chess', 14)) base1 = base1.pow(getBuyableAmount('chess', 51).add(getBuyableAmount('chess', 52)).add(1))
                let expo = x
                let eff1 = base1.pow(expo)
                return {
                    Ba: base1,
                    Ef: eff1,
                }
            },
        },
        52: {
            title: "♜ Black Rook",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color": "#333333"
                }
            },
            unlocked() {
                return hasUpgrade('booster', 44)
            },
            cost(x) {
                let base = new Decimal (5)
                return base
            },
            tooltip() {
                return "Effect Formula: ([total MP]+2)<sup>0.6</sup>"
            },
            display() {
                return "Divide <b>Material Points</b>' cost by "+format(buyableEffect(this.layer, this.id).Ba)+" (based on total MP)<br>Cost: "+format(this.cost())+ " material points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"/2<br>Effect: /"+ format(buyableEffect(this.layer, this.id).Ef)
            },
            canAfford() {
                return ((Decimal.sub(buyableEffect('chess', 11).MP, player[this.layer].spentMP)).gte(this.cost()))&&(getBuyableAmount(this.layer, this.id).lt(2))
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].spentMP = player[this.layer].spentMP.add(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = buyableEffect('chess', 11).MP.max(0).add(2).pow(0.6)
                if (inChallenge('chess', 11)) base1 = new Decimal (1)
                if (inChallenge('chess', 12)) base1 = new Decimal (1)
                if (inChallenge('chess', 13)) base1 = new Decimal (1)
                if (inChallenge('chess', 14)) base1 = new Decimal (1)
                if (hasChallenge('chess', 14)) base1 = base1.pow(getBuyableAmount('chess', 51).add(getBuyableAmount('chess', 52)).add(1))
                let expo = x
                let eff1 = base1.pow(expo)
                return {
                    Ba: base1,
                    Ef: eff1,
                }
            },
        },
        61: {
            title: "♕ White Queen",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color": "#FFFFFF"
                }
            },
            unlocked() {
                return hasUpgrade('chess', 44)
            },
            cost(x) {
                let base = new Decimal (9)
                return base
            },
            tooltip() {
                return "Effect Formula:<br>10<sup>([total MP]+2)<sup>1.25</sup></sup>"
            },
            display() {
                return "Divide Ex. Req. by "+format(buyableEffect(this.layer, this.id).Ba)+" (based on total MP)<br>Cost: "+format(this.cost())+ " material points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"/1<br>Effect: /"+ format(buyableEffect(this.layer, this.id).Ef)
            },
            canAfford() {
                return ((Decimal.sub(buyableEffect('chess', 11).MP, player[this.layer].spentMP)).gte(this.cost()))&&(getBuyableAmount(this.layer, this.id).lt(1))
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].spentMP = player[this.layer].spentMP.add(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal (10).pow(buyableEffect('chess', 11).MP.max(0).add(2).pow(1.25))
                if (inChallenge('chess', 11)) base1 = new Decimal (1)
                if (inChallenge('chess', 12)) base1 = new Decimal (1)
                if (inChallenge('chess', 13)) base1 = new Decimal (1)
                if (inChallenge('chess', 14)) base1 = new Decimal (1)
                if (inChallenge('chess', 15)) base1 = base1.pow(0.5)
                let expo = x
                let eff1 = base1.pow(expo)
                return {
                    Ba: base1,
                    Ef: eff1,
                }
            },
        },
        62: {
            title: "♛ Black Queen",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color": "#333333"
                }
            },
            unlocked() {
                return hasUpgrade('chess', 44)
            },
            cost(x) {
                let base = new Decimal (9)
                return base
            },
            tooltip() {
                return "Effect Formula:<br>1+([total MP]+2)<sup>0.25</sup>"
            },
            display() {
                return "Raise Point gain base by "+format(buyableEffect(this.layer, this.id).Ba)+"th power (based on total MP)<br>Cost: "+format(this.cost())+ " material points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"/1<br>Effect: ^"+ format(buyableEffect(this.layer, this.id).Ef)
            },
            canAfford() {
                return ((Decimal.sub(buyableEffect('chess', 11).MP, player[this.layer].spentMP)).gte(this.cost()))&&(getBuyableAmount(this.layer, this.id).lt(1))
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].spentMP = player[this.layer].spentMP.add(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal (1).add(buyableEffect('chess', 11).MP.max(0).add(2).pow(0.25))
                if (inChallenge('chess', 11)) base1 = new Decimal (1)
                if (inChallenge('chess', 12)) base1 = new Decimal (1)
                if (inChallenge('chess', 13)) base1 = new Decimal (1)
                if (inChallenge('chess', 14)) base1 = new Decimal (1)
                if (inChallenge('chess', 15)) base1 = base1.pow(0.5)
                let expo = x
                let eff1 = base1.pow(expo)
                return {
                    Ba: base1,
                    Ef: eff1,
                }
            },
        },
    },
    challenges: {
        11: {
            name: "Soldier",
            challengeDescription: "Divide point gain by 1.000e100, All pieces except pawns do nothing.",
            goalDescription: "1.000e179 amogus",
            rewardDescription() {return "Pawns are free, Raise Point gain to the 1.05th power outside challenges."},
            canComplete: function() {return player.amogus.points.gte(1e179)},
        },
        12: {
            name: "Dragon Knight",
            challengeDescription: "Divide 🆎 gain by 1.000e15, All pieces except knights do nothing, Square root both Knights' effect.",
            goalDescription: "1.000e320 🆎",
            rewardDescription() {return "You can get 1 more of each Knights, Third of each Knight costs 4 MP."},
            canComplete: function() {return player.amogus.AB.gte("1e320")},
            unlocked() {return hasChallenge('chess', 11)},
        },
        13: {
            name: "Ferz",
            challengeDescription() {return "Decrease Booster's base by 1, All pieces except bishops do nothing, Divide amogus gain by "+ format(tmp.chess.AmogusDivinFerz)+" (Effect Formula: <br>10<sup>log<sub>10</sub>[amogus]<sup>0.6</sup></sup>)"},
            goalDescription: "2.020e202 amogus",
            rewardDescription() {return "You can get 1 more of each Bishops, Third of each Bishop costs 4 MP."},
            canComplete: function() {return player.amogus.points.gte("2.02e202")},
            unlocked() {return hasChallenge('chess', 12)},
        },
        14: {
            name: "Wazir",
            challengeDescription() {return "Raise your point gain base to the [# of Rooks]+1th power but Decrease Booster's base by 1.25, All pieces do nothing, Divide point gain by "+ format(tmp.chess.PointDivinWazir)+" (Effect Formula: <br>10<sup>log<sub>10</sub>[points]<sup>0.6</sup></sup>)"},
            goalDescription: "2.900e290 points",
            rewardDescription() {return "Raise Both Rooks' by the [# of Rooks]+1th power, Square root the point gain nerf."},
            canComplete: function() {return player.points.gte("2.9e290")},
            unlocked() {return hasChallenge('chess', 13)},
        },
        15: {
            name: "Cheap Queen",
            challengeDescription() {return "Divide Point gain by 1.000e150, Decrease Booster's base by 1.5, Square root Queens' effect, Pawns and Knights do nothing."},
            goalDescription: "2.400e147 points",
            rewardDescription() {return "Decrease <b>Material Points</b>' Cost base by 1, Ex. Req. scales less for each <b>🆎 Exors</b>"},
            canComplete: function() {return player.points.gte("2.4e147")},
            unlocked() {return hasChallenge('chess', 14)},
        },
    },
    update(diff) {
        if (!player.difficulty.gameStarted) {
            player[this.layer].unlocked = false
            layerDataReset(this.layer)}
    },
})