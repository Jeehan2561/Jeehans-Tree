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
            title: "Point gain divider (RECOMMEND NORMAL ONLY FOR THIS)",
            display(){
                if (player.difficulty.dividerNerf) return "is raised to the 0.75th power (Easier version)"
                return "is on (Normal Version)"
            },
            unlocked() {return false},
            canClick() {return false},
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
                    layerDataReset("goal")
                    layerDataReset("amogus")
                    layerDataReset("booster")
                    layerDataReset("sbooster")
                    layerDataReset("chess")
                    layerDataReset("dv")
                    layerDataReset("infection")
                    layerDataReset("antiamogus")
                    layerDataReset("antip")
                    player.infection.activeChallenge=null
                    player.chess.activeChallenge=null
                    player.amogus.unlocked = false
                    player.booster.unlocked = false
                    player.sbooster.unlocked = false
                    player.chess.unlocked = false
                    player.dv.unlocked = false
                    player.infection.unlocked = false
                    player.antiamogus.unlocked = false
                    player.antip.unlocked = false
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
    symbol: "🟊", //🟊
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
            "blank",
            "blank",
            ["row", [["achievement", "P161"],["achievement", "P162"],["achievement", "P163"],["achievement", "P164"],["achievement", "P165"]]],
            ["row", [["achievement", "P171"],["achievement", "P172"],["achievement", "P173"],["achievement", "P174"],["achievement", "P175"]]],
            ["row", [["achievement", "P181"],["achievement", "P182"],["achievement", "P183"],["achievement", "P184"],["achievement", "P185"]]],
            ["row", [["achievement", "P191"],["achievement", "P192"],["achievement", "P193"],["achievement", "P194"],["achievement", "P195"]]],
            ["row", [["achievement", "P1101"],["achievement", "P1102"],["achievement", "P1103"],["achievement", "P1104"],["achievement", "P1105"]]],
            "blank",
            "blank",
            ["row", [["achievement", "P1111"],["achievement", "P1112"],["achievement", "P1113"],["achievement", "P1114"],["achievement", "P1115"]]],
            ["row", [["achievement", "P1121"],["achievement", "P1122"],["achievement", "P1123"],["achievement", "P1124"],["achievement", "P1125"]]],
            ["row", [["achievement", "P1131"],["achievement", "P1132"],["achievement", "P1133"],["achievement", "P1134"],["achievement", "P1135"]]],
            ["row", [["achievement", "P1141"],["achievement", "P1142"],["achievement", "P1143"],["achievement", "P1144"],["achievement", "P1145"]]],
            ["row", [["achievement", "P1151"],["achievement", "P1152"],["achievement", "P1153"],["achievement", "P1154"],["achievement", "P1155"]]],
            "blank",
            "blank",
            ["row", [["achievement", "P1161"],["achievement", "P1162"],["achievement", "P1163"],["achievement", "P1164"],["achievement", "P1165"]]],
            ["row", [["achievement", "P1171"],["achievement", "P1172"],["achievement", "P1173"],["achievement", "P1174"],["achievement", "P1175"]]],
            ["row", [["achievement", "P1181"],["achievement", "P1182"],["achievement", "P1183"],["achievement", "P1184"],["achievement", "P1185"]]],
            ["row", [["achievement", "P1191"],["achievement", "P1192"],["achievement", "P1193"],["achievement", "P1194"],["achievement", "P1195"]]],
            ["row", [["achievement", "P1201"],["achievement", "P1202"],["achievement", "P1203"],["achievement", "P1204"],["achievement", "P1205"]]],
            "blank",
            "blank",
            ["row", [["achievement", "P1211"],["achievement", "P1212"],["achievement", "P1213"],["achievement", "P1214"],["achievement", "P1215"]]],
            ["row", [["achievement", "P1221"],["achievement", "P1222"],["achievement", "P1223"],["achievement", "P1224"],["achievement", "P1225"]]],
            ["row", [["achievement", "P1231"],["achievement", "P1232"],["achievement", "P1233"],["achievement", "P1234"],["achievement", "P1235"]]],
            ["row", [["achievement", "P1241"],["achievement", "P1242"],["achievement", "P1243"],["achievement", "P1244"],["achievement", "P1245"]]],
            ["row", [["achievement", "P1251"],["achievement", "P1252"],["achievement", "P1253"],["achievement", "P1254"],["achievement", "P1255"]]],
            "blank",
            "blank",
            ["row", [["achievement", "P1261"],["achievement", "P1262"],["achievement", "P1263"],["achievement", "P1264"],["achievement", "P1265"]]],
            ["row", [["achievement", "P2011"],["achievement", "P2012"],["achievement", "P2013"],["achievement", "P2014"],["achievement", "P2015"]]],
            ["row", [["achievement", "P2021"],["achievement", "P2022"],["achievement", "P2023"],["achievement", "P2024"],["achievement", "P2025"]]],
            ["row", [["achievement", "P2031"],["achievement", "P2032"],["achievement", "P2033"],["achievement", "P2034"],["achievement", "P2035"]]],
            ["row", [["achievement", "P2041"],["achievement", "P2042"],["achievement", "P2043"],["achievement", "P2044"],["achievement", "P2045"]]],
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
            tooltip() {return "Have "+format(1.000e10)+" Points [1 GP]"},
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
            tooltip() {return "Have "+format(1.000e10)+" Amogus [1 GP]"},
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
            tooltip() {return "Have "+format(1.000e10)+" 🆎 [1 GP]"},
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
            tooltip() {return "Have "+format(1.000e10)+" Chess Points [3 GP]"},
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
            done() {return getBuyableAmount('amogus', 21).gte(8) && player.difficulty.gameStarted},
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
        P1161: {
            name: "P1P1",
            tooltip() {return "Have 5 Deadly Virus [4 GP]"},
            unlocked() {return player.dv.unlocked},
            done() {return player.dv.points.gte(5) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(4)
            }
        },
        P1162: {
            name: "P1P2",
            tooltip() {return "Have 10 Deadly Virus [4 GP]"},
            unlocked() {return player.dv.unlocked},
            done() {return player.dv.points.gte(10) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(4)
            }
        },
        P1163: {
            name: "P1P3",
            tooltip() {return "Have 15 Deadly Virus [4 GP]"},
            unlocked() {return player.dv.unlocked},
            done() {return player.dv.points.gte(15) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(4)
            }
        },
        P1164: {
            name: "P1P4",
            tooltip() {return "Have 20 Deadly Virus [4 GP]"},
            unlocked() {return player.dv.unlocked},
            done() {return player.dv.points.gte(20) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(4)
            }
        },
        P1165: {
            name: "P1P5",
            tooltip() {return "Have 25 Deadly Virus [4 GP]"},
            unlocked() {return player.dv.unlocked},
            done() {return player.dv.points.gte(25) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(4)
            }
        },
        P1171: {
            name: "P1Q1",
            tooltip() {return "Have 4 Super Boosters [4 GP]"},
            unlocked() {return player.dv.unlocked},
            done() {return player.sbooster.points.gte(4) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(4)
            }
        },
        P1172: {
            name: "P1Q2",
            tooltip() {return "Have 8 Super Boosters [4 GP]"},
            unlocked() {return player.dv.unlocked},
            done() {return player.sbooster.points.gte(8) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(4)
            }
        },
        P1173: {
            name: "P1Q3",
            tooltip() {return "Have 12 Super Boosters [4 GP]"},
            unlocked() {return player.dv.unlocked},
            done() {return player.sbooster.points.gte(12) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(4)
            }
        },
        P1174: {
            name: "P1Q4",
            tooltip() {return "Have 16 Super Boosters [4 GP]"},
            unlocked() {return player.dv.unlocked},
            done() {return player.sbooster.points.gte(16) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(4)
            }
        },
        P1175: {
            name: "P1Q5",
            tooltip() {return "Have 20 Super Boosters [4 GP]"},
            unlocked() {return player.dv.unlocked},
            done() {return player.sbooster.points.gte(20) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(4)
            }
        },
        P1181: {
            name: "P1R1",
            tooltip() {return "Beat King [4 GP]"},
            unlocked() {return player.dv.unlocked},
            done() {return hasChallenge('chess', 21) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(4)
            }
        },
        P1182: {
            name: "P1R2",
            tooltip() {return "Beat Silver General [4 GP]"},
            unlocked() {return player.dv.unlocked},
            done() {return hasChallenge('chess', 22) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(4)
            }
        },
        P1183: {
            name: "P1R3",
            tooltip() {return "Beat Berolina Pawn [4 GP]"},
            unlocked() {return player.dv.unlocked},
            done() {return hasChallenge('chess', 23) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(4)
            }
        },
        P1184: {
            name: "P1R4",
            tooltip() {return "Beat General [4 GP]"},
            unlocked() {return player.dv.unlocked},
            done() {return hasChallenge('chess', 24) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(4)
            }
        },
        P1185: {
            name: "P1R5",
            tooltip() {return "Beat Amalgam [4 GP]"},
            unlocked() {return player.dv.unlocked},
            done() {return hasChallenge('chess', 25) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(4)
            }
        },
        P1191: {
            name: "P1S1",
            tooltip() {return "Perform DIEmension Shifts 2 times [4 GP]"},
            unlocked() {return player.dv.unlocked},
            done() {return getBuyableAmount('dv', 32).gte(2) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(4)
            }
        },
        P1192: {
            name: "P1S2",
            tooltip() {return "Perform DIEmension Shifts 4 times [4 GP]"},
            unlocked() {return player.dv.unlocked},
            done() {return getBuyableAmount('dv', 32).gte(4) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(4)
            }
        },
        P1193: {
            name: "P1S3",
            tooltip() {return "Perform DIEmension Shifts 6 times [4 GP]"},
            unlocked() {return player.dv.unlocked},
            done() {return getBuyableAmount('dv', 32).gte(6) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(4)
            }
        },
        P1194: {
            name: "P1S4",
            tooltip() {return "Perform DIEmension Boosts 8 times [4 GP]"},
            unlocked() {return player.dv.unlocked},
            done() {return getBuyableAmount('dv', 32).gte(8) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(4)
            }
        },
        P1195: {
            name: "P1S5",
            tooltip() {return "Perform DIEmension Boosts 10 times [4 GP]"},
            unlocked() {return player.dv.unlocked},
            done() {return getBuyableAmount('dv', 32).gte(10) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(4)
            }
        },
        P1201: {
            name: "P1T1",
            tooltip() {return "Obtain a Deadly orb [4 GP]"},
            unlocked() {return player.dv.unlocked},
            done() {return getBuyableAmount('dv', 33).gte(1) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(4)
            }
        },
        P1202: {
            name: "P1T2",
            tooltip() {return "Obtain 2 Deadly orbs [4 GP]"},
            unlocked() {return player.dv.unlocked},
            done() {return getBuyableAmount('dv', 33).gte(2) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(4)
            }
        },
        P1203: {
            name: "P1T3",
            tooltip() {return "Obtain 3 Deadly orbs [4 GP]"},
            unlocked() {return player.dv.unlocked},
            done() {return getBuyableAmount('dv', 33).gte(3) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(4)
            }
        },
        P1204: {
            name: "P1T4",
            tooltip() {return "Obtain 4 Deadly orbs [4 GP]"},
            unlocked() {return player.dv.unlocked},
            done() {return getBuyableAmount('dv', 33).gte(4) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(4)
            }
        },
        P1205: {
            name: "P1T5",
            tooltip() {return "Obtain 5 Deadly orbs [4 GP]"},
            unlocked() {return player.dv.unlocked},
            done() {return getBuyableAmount('dv', 33).gte(5) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(4)
            }
        }, 
        P1211: {
            name: "P1U1",
            tooltip() {return "Have 10 IP [5 GP]"},
            unlocked() {return player.infection.unlocked},
            done() {return player.infection.points.gte(10) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(5)
            }
        },
        P1212: {
            name: "P1U2",
            tooltip() {return "Have 100 IP [5 GP]"},
            unlocked() {return player.infection.unlocked},
            done() {return player.infection.points.gte(100) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(5)
            }
        },
        P1213: {
            name: "P1U3",
            tooltip() {return "Have 1,000 IP [5 GP]"},
            unlocked() {return player.infection.unlocked},
            done() {return player.infection.points.gte(1000) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(5)
            }
        },
        P1214: {
            name: "P1U4",
            tooltip() {return "Have 10,000 IP [5 GP]"},
            unlocked() {return player.infection.unlocked},
            done() {return player.infection.points.gte(10000) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(5)
            }
        },
        P1215: {
            name: "P1U5",
            tooltip() {return "Have 100,000 IP [5 GP]"},
            unlocked() {return player.infection.unlocked},
            done() {return player.infection.points.gte(100000) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(5)
            }
        },
        P1221: {
            name: "P1V1",
            tooltip() {return "Have 100 Decelerated Points [5 GP]"},
            unlocked() {return player.infection.unlocked},
            done() {return player.points.gte(100) && inChallenge('infection', 11) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(5)
            }
        },
        P1222: {
            name: "P1V2",
            tooltip() {return "Have 10,000 Decelerated Points [5 GP]"},
            unlocked() {return hasMilestone('infection', 3)},
            done() {return player.points.gte(1e4) && inChallenge('infection', 11) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(5)
            }
        },
        P1223: {
            name: "P1V3",
            tooltip() {return "Have 1,000,000 Decelerated Points [5 GP]"},
            unlocked() {return hasMilestone('infection', 3)},
            done() {return player.points.gte(1e6) && inChallenge('infection', 11) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(5)
            }
        },
        P1224: {
            name: "P1V4",
            tooltip() {return "Have 100,000,000 Decelerated Points [5 GP]"},
            unlocked() {return hasMilestone('infection', 3)},
            done() {return player.points.gte(1e8) && inChallenge('infection', 11) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(5)
            }
        },
        P1225: {
            name: "P1V5",
            tooltip() {return "Have "+format(1e10)+" Decelerated Points [5 GP]"},
            unlocked() {return hasMilestone('infection', 3)},
            done() {return player.points.gte(1e10) && inChallenge('infection', 11) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(5)
            }
        },
        P1231: {
            name: "P1W1",
            tooltip() {return "Have 100 Crewmates [5 GP]"},
            unlocked() {return hasMilestone('infection', 3)},
            done() {return player.antiamogus.points.gte(100) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(5)
            }
        },
        P1232: {
            name: "P1W2",
            tooltip() {return "Have 10,000 Crewmates [5 GP]"},
            unlocked() {return hasMilestone('infection', 3)},
            done() {return player.antiamogus.points.gte(1e4) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(5)
            }
        },
        P1233: {
            name: "P1W3",
            tooltip() {return "Have 1,000,000 Crewmates [5 GP]"},
            unlocked() {return hasMilestone('infection', 3)},
            done() {return player.antiamogus.points.gte(1e6) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(5)
            }
        },
        P1234: {
            name: "P1W4",
            tooltip() {return "Have 100,000,000 Crewmates [5 GP]"},
            unlocked() {return hasMilestone('infection', 3)},
            done() {return player.antiamogus.points.gte(1e8) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(5)
            }
        },
        P1235: {
            name: "P1W5",
            tooltip() {return "Have "+format(1e10)+" Crewmates [5 GP]"},
            unlocked() {return hasMilestone('infection', 3)},
            done() {return player.antiamogus.points.gte(1e10) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(5)
            }
        },
        P1241: {
            name: "P1X1",
            tooltip() {return "Have 100 Beans [5 GP]"},
            unlocked() {return hasMilestone('infection', 3)&&hasUpgrade('amogus', 54)},
            done() {return player.antiamogus.beans.gte(100) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(5)
            }
        },
        P1242: {
            name: "P1X2",
            tooltip() {return "Have 10,000 Beans [5 GP]"},
            unlocked() {return hasMilestone('infection', 3)&&hasUpgrade('amogus', 54)},
            done() {return player.antiamogus.beans.gte(10000) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(5)
            }
        },
        P1243: {
            name: "P1X3",
            tooltip() {return "Have 1,000,000 Beans [5 GP]"},
            unlocked() {return hasMilestone('infection', 3)&&hasUpgrade('amogus', 54)},
            done() {return player.antiamogus.beans.gte(1000000) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(5)
            }
        },
        P1244: {
            name: "P1X4",
            tooltip() {return "Have 100,000,000 Beans [5 GP]"},
            unlocked() {return hasMilestone('infection', 3)&&hasUpgrade('amogus', 54)},
            done() {return player.antiamogus.beans.gte(1e8) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(5)
            }
        },
        P1245: {
            name: "P1X5",
            tooltip() {return "Have "+format(1e10)+" Beans [5 GP]"},
            unlocked() {return hasMilestone('infection', 3)&&hasUpgrade('amogus', 54)},
            done() {return player.antiamogus.beans.gte(1e10) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(5)
            }
        },
        P1251: {
            name: "P1Y1",
            tooltip() {return "Reach Bean Level 10 [5 GP]"},
            unlocked() {return hasMilestone('antiamogus', 2)},
            done() {return player.antiamogus.level.gte(10) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(5)
            }
        },
        P1252: {
            name: "P1Y2",
            tooltip() {return "Reach Bean Level 20 [5 GP]"},
            unlocked() {return hasMilestone('antiamogus', 2)},
            done() {return player.antiamogus.level.gte(20) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(5)
            }
        },
        P1253: {
            name: "P1Y3",
            tooltip() {return "Reach Bean Level 30 [5 GP]"},
            unlocked() {return hasMilestone('antiamogus', 2)},
            done() {return player.antiamogus.level.gte(30) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(5)
            }
        },
        P1254: {
            name: "P1Y4",
            tooltip() {return "Reach Bean Level 40 [5 GP]"},
            unlocked() {return hasMilestone('antiamogus', 2)},
            done() {return player.antiamogus.level.gte(40) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(5)
            }
        },
        P1255: {
            name: "P1Y5",
            tooltip() {return "Reach Bean Level 50 [5 GP]"},
            unlocked() {return hasMilestone('antiamogus', 2)},
            done() {return player.antiamogus.level.gte(50) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(5)
            }
        },
        P1261: {
            name: "P1Z1",
            tooltip() {return "Have 10 Prestige Points [6 GP]"},
            unlocked() {return hasMilestone('antiamogus', 3)},
            done() {return player.antip.points.gte(10) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(6)
            }
        },
        P1262: {
            name: "P1Z2",
            tooltip() {return "Have 100 Prestige Points [6 GP]"},
            unlocked() {return hasMilestone('antiamogus', 3)},
            done() {return player.antip.points.gte(100) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(6)
            }
        },
        P1263: {
            name: "P1Z3",
            tooltip() {return "Have 1,000 Prestige Points [6 GP]"},
            unlocked() {return hasMilestone('antiamogus', 3)},
            done() {return player.antip.points.gte(1000) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(6)
            }
        },
        P1264: {
            name: "P1Z4",
            tooltip() {return "Have 10,000 Prestige Points [6 GP]"},
            unlocked() {return hasMilestone('antiamogus', 3)},
            done() {return player.antip.points.gte(10000) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(6)
            }
        },
        P1265: {
            name: "P1Z5",
            tooltip() {return "Have 100,000 Prestige Points [6 GP]"},
            unlocked() {return hasMilestone('antiamogus', 3)},
            done() {return player.antip.points.gte(1e5) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(6)
            }
        },
        P2011: {
            name: "P2A1",
            tooltip() {return "Reach Bean Tier 2 [6 GP]"},
            unlocked() {return hasMilestone('antip', 3)},
            done() {return player.antiamogus.tier.gte(2) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(6)
            }
        },
        P2012: {
            name: "P2A2",
            tooltip() {return "Reach Bean Tier 4 [6 GP]"},
            unlocked() {return hasMilestone('antip', 3)},
            done() {return player.antiamogus.tier.gte(4) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(6)
            }
        },
        P2013: {
            name: "P2A3",
            tooltip() {return "Reach Bean Tier 6 [6 GP]"},
            unlocked() {return hasMilestone('antip', 3)},
            done() {return player.antiamogus.tier.gte(6) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(6)
            }
        },
        P2014: {
            name: "P2A4",
            tooltip() {return "Reach Bean Tier 8 [6 GP]"},
            unlocked() {return hasMilestone('antip', 3)},
            done() {return player.antiamogus.tier.gte(8) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(6)
            }
        },
        P2015: {
            name: "P2A5",
            tooltip() {return "Reach Bean Tier 10 [6 GP]"},
            unlocked() {return hasMilestone('antip', 3)},
            done() {return player.antiamogus.tier.gte(10) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(6)
            }
        },
        P2021: {
            name: "P2B1",
            tooltip() {return "Have 10 Crystals [6 GP]"},
            unlocked() {return hasUpgrade('antip', 15)},
            done() {return player.antic.points.gte(10) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(6)
            }
        },
        P2022: {
            name: "P2B2",
            tooltip() {return "Have 100 Crystals [6 GP]"},
            unlocked() {return hasUpgrade('antip', 15)},
            done() {return player.antic.points.gte(100) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(6)
            }
        },
        P2023: {
            name: "P2B3",
            tooltip() {return "Have 1,000 Crystals [6 GP]"},
            unlocked() {return hasUpgrade('antip', 15)},
            done() {return player.antic.points.gte(1e3) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(6)
            }
        },
        P2024: {
            name: "P2B4",
            tooltip() {return "Have 10,000 Crystals [6 GP]"},
            unlocked() {return hasUpgrade('antip', 15)},
            done() {return player.antic.points.gte(1e4) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(6)
            }
        },
        P2025: {
            name: "P2B5",
            tooltip() {return "Have 100,000 Crystals [6 GP]"},
            unlocked() {return hasUpgrade('antip', 15)},
            done() {return player.antic.points.gte(1e5) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(6)
            }
        },
        P2031: {
            name: "P2C1",
            tooltip() {return "Complete <b>ADD</b> with at most 8 DBs [6 GP]"},
            unlocked() {return hasMilestone('antip', 4)},
            done() {return player.infection.ad.lte(8) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(6)
            }
        },
        P2032: {
            name: "P2C2",
            tooltip() {return "Complete <b>ADD</b> with at most 6 DBs [6 GP]"},
            unlocked() {return hasMilestone('antip', 4)},
            done() {return player.infection.ad.lte(6) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(6)
            }
        },
        P2033: {
            name: "P2C3",
            tooltip() {return "Complete <b>ADD</b> with at most 4 DBs [6 GP]"},
            unlocked() {return hasMilestone('antip', 4)},
            done() {return player.infection.ad.lte(4) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(6)
            }
        },
        P2034: {
            name: "P2C4",
            tooltip() {return "Complete <b>ADD</b> with at most 2 DSs [6 GP]"},
            unlocked() {return hasMilestone('antip', 4)},
            done() {return player.infection.ad.lte(2) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(6)
            }
        },
        P2035: {
            name: "P2C5",
            tooltip() {return "Complete <b>ADD</b> without DSs [6 GP]"},
            unlocked() {return hasMilestone('antip', 4)},
            done() {return player.infection.ad.lte(0) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(6)
            }
        },
        P2041: {
            name: "P2D1",
            tooltip() {return "Have 2 Grasshop? [6 GP]"},
            unlocked() {return hasMilestone('antip', 7)},
            done() {return player.antigh.points.gte(2) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(6)
            }
        },
        P2042: {
            name: "P2D2",
            tooltip() {return "Have 4 Grasshop? [6 GP]"},
            unlocked() {return hasMilestone('antip', 7)},
            done() {return player.antigh.points.gte(4) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(6)
            }
        },
        P2043: {
            name: "P2D3",
            tooltip() {return "Have 6 Grasshop? [6 GP]"},
            unlocked() {return hasMilestone('antip', 7)},
            done() {return player.antigh.points.gte(6) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(6)
            }
        },
        P2044: {
            name: "P2D4",
            tooltip() {return "Have 8 Grasshop? [6 GP]"},
            unlocked() {return hasMilestone('antip', 7)},
            done() {return player.antigh.points.gte(8) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(6)
            }
        },
        P2045: {
            name: "P2D5",
            tooltip() {return "Have 10 Grasshop? [6 GP]"},
            unlocked() {return hasMilestone('antip', 7)},
            done() {return player.antigh.points.gte(10) && player.difficulty.gameStarted},
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(6)
            }
        },
    },
})
addLayer("pgn", {
    name: "point gain nerf",
    symbol: "↓", // ↓
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
            ["display-text", function() {
                if (player.points.gte("6.9e420")&&(canGenPoints())) return "Point gain will be capped at " + format(getPointCap())
            }],
            ["display-text", function() {
                if (player.points.gte("1e1000")&&(canGenPoints())) return "The point gain cap will softcap after "+ format("1e1000") +"."
            }],
        ],
        }
    },
})
addLayer("amogus", {
    name: "amogus", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ඞ", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal (0),
        AB: new Decimal (0),
        ExAB: new Decimal (0),
        Extracting: false,
        autoABa1: false,
        autoABa2: false,
    }},
    tooltip() {
       let base = format(player.amogus.points)+" amogus"
       if (hasUpgrade('amogus', 25)) base = base+"<br>"+format(player.amogus.AB)+" 🆎"
       if (hasUpgrade('booster', 21)) base = base+"<br>"+format(player.amogus.ExAB)+" extracted 🆎"
       return base
    },
    color: "#FF0000",
    requires() {
        if (inChallenge('infection', 11)) return Decimal.dInf
        return new Decimal(10)}, // Can be a function that takes requirement increases into account
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
        if (hasUpgrade('booster', 51)) mult = mult.times(upgradeEffect('booster', 51))
        if (hasUpgrade('booster', 52)) mult = mult.times(upgradeEffect('booster', 52).A)
        if (hasUpgrade('chess', 11)) mult = mult.times(upgradeEffect('chess', 11))
        if (hasUpgrade('chess', 24)) mult = mult.times(upgradeEffect('chess', 24))
        if (hasUpgrade('dv', 14)) mult = mult.times(upgradeEffect('dv', 14))
        if (hasUpgrade('dv', 75)) mult = mult.times(upgradeEffect('dv', 75).AM)
        if (hasUpgrade('antiamogus', 12)) mult = mult.times(upgradeEffect('antiamogus', 12))
        if (player.difficulty.staticResBoost) mult = mult.times(2)
        mult = mult.times(tmp.chess.effect)
        mult = mult.times(buyableEffect('chess', 22).Ef)
        if (hasMilestone('infection', 13)) mult = mult.times(Decimal.pow(new Decimal (buyableEffect('chess', 11).MP), new Decimal (buyableEffect('chess', 11).MP).pow(0.4)))
        if (inChallenge('chess', 13)) mult = mult.div(tmp.chess.AmogusDivinFerz)
        if (inChallenge('infection', 11)) mult = new Decimal (0)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        expo = new Decimal (1)
        if (hasUpgrade('booster', 42)) expo = expo.times(1.1)
        if (hasUpgrade('dv', 35)) expo = expo.times(1.1)
        if (hasUpgrade('infection', 12)) expo = expo.times(1.1)
        expo = expo.times(buyableEffect('infection', 12).Ef)
        if (inChallenge('chess', 22)) expo = expo.times(0.5)
        if (inChallenge('infection', 11)) expo = new Decimal (1)
        return expo
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown() {
        return player.difficulty.gameStarted&&!inChallenge('infection', 11)
    },
    doReset(l) {
        if (!(layers[l].row > this.row)) return
        
        let keep = ['autoABa1', 'autoABa2','milestones']
        if (hasMilestone('booster', 0)) keep.push('upgrades', 'buyables')
        
        layerDataReset(this.layer, keep)
    },
    hotkeys: [
        {key: "a", description: "A: Reset for amogus", onPress(){if (canReset(this.layer)&&(!hasMilestone('booster', 1))) doReset(this.layer)}},
    ],
    passiveGeneration() {
        let passive = 0
        if (hasMilestone('booster', 1)) passive = new Decimal (1)
        if (hasUpgrade('amogus', 43)) passive = passive.times(upgradeEffect('amogus', 43))
        if (hasUpgrade('amogus', 52)) passive = passive.times(buyableEffect('dv', 31).Ef)
        if (inChallenge('infection', 11)) passive = 0
        return passive
    },
    getABeffect() {
        if (inChallenge('infection', 11)) return new Decimal (1)
        return softcap(player.amogus.AB.max(0), new Decimal ("1e1000"), new Decimal (0.1)).pow(0.5).add(1)
    },
    getExABeffect() {
        if (inChallenge('infection', 11)) return new Decimal (1)
        return player.amogus.ExAB.max(0).pow(0.4).add(1)
    },
    tabFormat: {
        "Upgrades": {
            unlocked(){return true},
            content:[
                "main-display",
                "blank",
                ["prestige-button", "", function (){ return hasMilestone("booster", 1) ? {'display': 'none'} : {}}],
                "blank",
                "resource-display",
                "milestones",
                "blank",
                "blank",
                ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15]]],
                ["row", [["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24], ["upgrade", 25]]],
                ["row", [["upgrade", 31], ["upgrade", 32], ["upgrade", 33], ["upgrade", 34], ["upgrade", 35]]],
                ["row", [["upgrade", 41], ["upgrade", 42], ["upgrade", 43], ["upgrade", 44], ["upgrade", 45]]],
                ["row", [["upgrade", 51], ["upgrade", 52], ["upgrade", 53], ["upgrade", 54], ["upgrade", 55]]],
                "blank",
                ["row", [["clickable", 13]]]
            ]
        },
        "🆎": {
            unlocked(){return hasUpgrade('amogus', 25)},
            content:[
                "main-display",
                "blank",
                ["prestige-button", "", function (){ return hasMilestone("booster", 1) ? {'display': 'none'} : {}}],
                "blank",
                "resource-display",
                ["display-text",
                function() {
                    return "You have " + format(player.amogus.AB) + " 🆎, Translated to a x" + format(tmp.amogus.getABeffect) + " boost to point gain." + (player.amogus.AB.gte("1e1000") ? " (softcapped past "+format("1.000e1000")+" 🆎)" : "")
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
    milestones: {
        0: {
            requirementDescription() {return "1,000 🆎 Boosters, 🆎 Generators"},
            unlocked() {return hasMilestone('infection', 6)},
            done() {return (getBuyableAmount('amogus', 11).gte(1e3)&&getBuyableAmount('amogus', 12).gte(1e3))},
            effectDescription() {return "Multiply DP gain by log<sub>20</sub>(🆎), Currently: "+format(player.amogus.AB.max(1).log(20).max(1))+"x"},
        },
        1: {
            requirementDescription() {return "100 🆎 Boosters, 🆎 Generators"},
            unlocked() {return hasUpgrade('amogus', 33)},
            done() {return (getBuyableAmount('amogus', 11).gte(1e2)&&getBuyableAmount('amogus', 12).gte(1e2))},
            effectDescription() {return "First Row 🆎 Buyables don't spend anything, Automate 🆎 Boosters, Generators."},
            toggles: [["amogus", "autoABa1"], ["amogus", "autoABa2"]]
        },
    },
    automate() {
        if (hasMilestone('amogus', 1)) {
            if (player.amogus.autoABa1) {buyBuyable(this.layer, 11)}
            if (player.amogus.autoABa2) {buyBuyable(this.layer, 12)}
        }
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
            tooltip() {return "Formula: ([best amogus]+2)<sup>0.4</sup><br>Softcap after 1.800e308."},
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
        	description: "Multiply passive amogus gain based on amogus, Decrease <b>Material Points</b>' Cost base to 8.",
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
        51: {
	        title: "Amogus Upgrade E1",
        	description: "Raise chess effect by +^0.08 per upgrade.",
         	cost() {
                if (!inChallenge('chess', 21)) return Decimal.dInf
                return new Decimal ("1.185e1185")

            },
            tooltip() {return "Must be in <b>King</b> challenge to buy this upgrade!"},
            effect() {return new Decimal (1).add(Decimal.times(0.08, new Decimal (player.amogus.upgrades.length)))},
            effectDisplay() { return "^"+format(upgradeEffect(this.layer, this.id))},
            unlocked() {return hasMilestone('sbooster', 2)}
       	},
        52: {
	        title: "Amogus Upgrade E2",
        	description: "<b>Accelerator</b>'s Effect Multiply passive amogus gain and 🆎 gain.",
         	cost() {
                if (!inChallenge('chess', 22)) return Decimal.dInf
                return new Decimal ("1.1e841")

            },
            tooltip() {return "Must be in <b>Silver General</b> challenge to buy this upgrade!"},
            unlocked() {return hasMilestone('sbooster', 2)}
       	},
        53: {
	        title: "Amogus Upgrade E3",
        	description: "Gain a free MP per 5 <b>🆎 Space Lab</b>.",
         	cost() {
                if (!inChallenge('chess', 23)) return Decimal.dInf
                return new Decimal ("1e587")

            },
            tooltip() {return "Must be in <b>Berolina Pawn</b> challenge to buy this upgrade!"},
            effect() {return getBuyableAmount('amogus', 24).max(0).div(5).floor()},
            effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id))},
            unlocked() {return hasMilestone('sbooster', 2)}
       	},
        54: {
	        title: "Amogus Upgrade E4",
        	description: "Multiply <b>🆎 Enhancer</b> by SB's effect, Unlock <b>Beans</b> in <b>Crewmate</b> layer.",
         	cost() {
                if (!inChallenge('chess', 24)) return Decimal.dInf
                return new Decimal ("2e568")

            },
            tooltip() {return "Must be in <b>General</b> challenge to buy this upgrade!"},
            unlocked() {return hasMilestone('sbooster', 2)}
       	},
        55: {
	        title: "Amogus Upgrade E5",
        	description: "You can buy 5 more DIEmension shifts, cost scales faster after 10th shift.",
         	cost() {
                if (!inChallenge('chess', 25)) return Decimal.dInf
                return new Decimal ("2.87e574")

            },
            tooltip() {return "Must be in <b>Amalgam</b> challenge to buy this upgrade!"},
            unlocked() {return hasMilestone('sbooster', 2)}
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
            unlocked() {return (!hasMilestone('booster', 1))},
            canClick() {return true},
            onHold() {if (canReset(this.layer) &&(!hasMilestone('booster', 1))) doReset(this.layer)},
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
            purchaseLimit() {return new Decimal (1e3)},
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
                if (hasMilestone('amogus', 1)) cost = new Decimal (0)
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
            purchaseLimit() {return new Decimal (1e3)},
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
                if (hasMilestone('amogus', 1)) cost = new Decimal (0)
                player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal (1.125)
                if (hasUpgrade('booster', 15)) base1 = base1.add(upgradeEffect('booster', 15))
                base1 = base1.add(buyableEffect('amogus', 23).Ef)
                if (hasMilestone('dv', 7)) base1 = base1.times(player.dv.dedpow.max(1).ln().max(1).ln().max(1))
                let base2 = new Decimal (2)
                if (hasUpgrade('amogus', 33)) base2 = base2.add(upgradeEffect('amogus', 33))
                base2 = base2.add(buyableEffect('amogus', 23).Ef)
                if (hasMilestone('dv', 7)) base2 = base2.times(player.dv.dedpow.max(1).ln().max(1).ln().max(1))
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
                if (hasUpgrade('dv', 43)) eff1 = eff1.times(upgradeEffect('dv', 43).AB)
                if (inChallenge('chess', 12)) eff1 = eff1.div(1e15)
                if (hasUpgrade('amogus', 52)) eff1 = eff1.times(buyableEffect('dv', 31).Ef)
                let eff2 = base2.pow(x, expo).mul(x.min(1))
                eff2 = eff2.times(buyableEffect('amogus', 11).Bo)
                if (hasUpgrade('amogus', 32)) eff2 = eff2.times(upgradeEffect('amogus', 32))
                if (hasUpgrade('amogus', 35)) eff2 = eff2.times(upgradeEffect('amogus', 35))
                if (hasUpgrade('booster', 13)) eff2 = eff2.times(upgradeEffect('booster', 13))
                if (hasUpgrade('booster', 25)) eff2 = eff2.times(upgradeEffect('booster', 25))
                if (hasUpgrade('booster', 43)) eff2 = eff2.times(upgradeEffect('booster', 43))
                if (hasUpgrade('dv', 43)) eff2 = eff2.times(upgradeEffect('dv', 43).AB)
                eff2 = eff2.times(buyableEffect('amogus', 24).Ef)
                if (hasUpgrade('chess', 32)) eff2 = eff2.pow(1.1)
                if (hasUpgrade('dv', 12)) eff2 = eff2.pow(1.1)
                if (hasUpgrade('dv', 33)) eff2 = eff2.pow(1.1)
                if (inChallenge('infection', 11)) eff1 = new Decimal (0)
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
                let base = new Decimal(69)
                if (hasUpgrade('chess', 44)) base = base.sub(69)
                let expo = new Decimal (2)
                if (hasMilestone('dv', 3)) expo = new Decimal (1.9)
                if (hasUpgrade('dv', 63)) expo = new Decimal (1.8)
                let base2 = x.pow(expo)
                return base.add(base2).floor()
            },
            tooltip() {
                if (hasUpgrade('dv', 63)) return "Cost Formula:<br>x<sup>1.8</sup>"
                if (hasMilestone('dv', 3)) return "Cost Formula:<br>x<sup>1.9</sup>"
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
                if (hasChallenge('chess', 22)) cost = new Decimal (0)
                setBuyableAmount(this.layer, 11, getBuyableAmount(this.layer, 11).sub(this.cost().times(cost)))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal (1.05)
                if (hasChallenge('chess', 22)) base1 = base1.add(0.05)
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
                if (hasChallenge('chess', 23)) expo2 = new Decimal (1.08)
                if (hasMilestone('dv', 4)) expo2 = new Decimal (1.07)
                if (hasUpgrade('dv', 33)) expo2 = new Decimal (1.06)
                if (hasUpgrade('dv', 53)) expo2 = new Decimal (1.05)
                if (hasUpgrade('booster', 55)) expo2 = new Decimal (1.04)
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
                if (hasUpgrade('dv', 61)) eff1 = eff1.times(upgradeEffect('dv', 61).AB)
                if (hasUpgrade('dv', 65)) eff1 = eff1.times(buyableEffect('dv', 31).Ef)
                if (hasUpgrade('dv', 72)) eff1 = eff1.times(6268)
                if (hasMilestone('infection', 5)) eff1 = eff1.times(Decimal.pow(1e3, new Decimal(player.infection.milestones.length).sub(5).max(0)))
                let eff2 = base2.pow(Decimal.pow(expo2, x.sub(1))).times(x.max(1).min(1))
                eff2 = eff2.div(diveff2)
                let lim = new Decimal (1).times(Decimal.pow(limbase, x)).times(x.max(1).min(1))
                if (hasUpgrade('chess', 43)) lim = lim.times(upgradeEffect('chess', 43))
                if (hasUpgrade('dv', 61)) lim = lim.times(upgradeEffect('dv', 61).AB)
                if (inChallenge('infection', 11)) eff1 = new Decimal (0)
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
                if (hasUpgrade('amogus', 54)) base1 = base1.times(tmp.sbooster.effect.E)
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
    requires() {
        if (inChallenge('infection', 11)) return Decimal.dInf
        return new Decimal(8e5)},
    resource: "boring boosters",
    baseResource: "amogus",
    baseAmount() {return player.amogus.points},
    type: "static",
    base() {
        let base = new Decimal (5)
        if (hasUpgrade('sbooster', 14)) base = new Decimal (4)
        return base},
    exponent() {
        let base = new Decimal (1.25)
        if (hasUpgrade('sbooster', 11)) base = new Decimal (1.2)
        return base
    },
    gainMult() {
        let mult = new Decimal (1)
        if (hasUpgrade('amogus', 45)) mult = mult.div(upgradeEffect('amogus', 45))
        if (hasUpgrade('booster', 14)) mult = mult.div(upgradeEffect('booster', 14))
        if (hasUpgrade('booster', 24)) mult = mult.div(upgradeEffect('booster', 24))
        if (hasUpgrade('booster', 31)) mult = mult.div(upgradeEffect('booster', 31))
        if (hasUpgrade('booster', 41)) mult = mult.div(upgradeEffect('booster', 41))
        if (hasUpgrade('chess', 41)) mult = mult.div(upgradeEffect('chess', 41))
        mult = mult.div(buyableEffect('chess', 41).Ef)
        if (hasUpgrade('dv', 21)) mult = mult.div(upgradeEffect('dv', 21))
        if (hasUpgrade('dv', 22)) mult = mult.div(upgradeEffect('dv', 22))
        if (hasUpgrade('dv', 55)) mult = mult.div(player.dv.dedpow.max(1))
        if (hasUpgrade('sbooster', 13)) mult = mult.div(upgradeEffect('sbooster', 13))
        if (hasUpgrade('infection', 22)) mult = mult.div(upgradeEffect('infection', 22))
        return mult
    },
    row: 1,
    layerShown() {return (hasUpgrade('amogus', 35)||player[this.layer].unlocked)&&!inChallenge('infection', 11)},
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
        base = base.add(tmp.antip.effect.bb)
        base = base.times(tmp.sbooster.effect.E)
        if (inChallenge('chess', 13)) base = base.sub(1)
        if (inChallenge('chess', 14)) base = base.sub(1.25)
        if (inChallenge('chess', 15)) base = base.sub(1.5)
		eff = Decimal.pow(base.max(1),amt);
		return eff;
	},
    M4effect() {
        return Decimal.add(player[this.layer].milestones.length, 2).pow(0.75)
    },
    M5effect() {
        return Decimal.pow(1.25, player.booster.best.max(0).add(1))
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
                if (hasUpgrade('infection', 23)) expo = expo.times(player.sbooster.points.max(0).add(1))
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
        51: {
	        title: "Booster Upgrade E1",
        	description: "Multiply amogus gain by 1.05 per total MP",
            tooltip() {return "Must be in <b>King</b> Challenge to buy this upgrade"},
         	cost() {
                if (!inChallenge('chess', 21)) return Decimal.dInf
                return new Decimal (1305)},
            effect() {
                let base = new Decimal (1.05)
                let expo = buyableEffect('chess', 11).MP
                let eff = base.pow(expo)
                return eff
           },
           effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade('booster', 45)&&hasMilestone('sbooster', 2)}
       	},
        52: {
	        title: "Booster Upgrade E2",
        	description: "Multiply amogus gain and crewmate gain based on Beans",
            tooltip() {return "Effect Formula: 3<sup>(ln(ln[Beans])+1)(10)</sup>,<br>3<sup>ln(ln[Beans])+1</sup><br>Must be in <b>Silver General</b> Challenge to buy this upgrade"},
         	cost() {
                if (!inChallenge('chess', 22)) return Decimal.dInf
                return new Decimal (1139)},
            effect() {
                let base = new Decimal (3)
                let expo = player.antiamogus.beans.max(1).ln().max(1).ln().max(0).add(1)
                let eff = base.pow(expo)
                return {
                    A: eff.pow(10),
                    C: eff
                }
           },
           effectDisplay() { return format(upgradeEffect(this.layer, this.id).A)+"x, "+format(upgradeEffect(this.layer, this.id).C)+"x"},
            unlocked() {return hasUpgrade('booster', 45)&&hasMilestone('sbooster', 2)}
       	},
        53: {
	        title: "Booster Upgrade E3",
        	description: "Unlock <b>Bean buyables and upgrades</b> in crewmate layer, S-boosters effect caps at 25 SBs",
            tooltip() {return "Must be in <b>Berolina Pawn</b> Challenge to buy this upgrade, The cost of the upgrade is multiplied by [SB]+1"},
         	cost() {
                if (!inChallenge('chess', 23)) return Decimal.dInf
                return new Decimal (1030).times(player.sbooster.points.max(0).add(1))},
            unlocked() {return hasUpgrade('booster', 45)&&hasMilestone('sbooster', 2)}
       	},
        54: {
	        title: "Booster Upgrade E4",
        	description: "Multiply point gain cap after everything by log<sub>2</sub>[Beans]<sup>5</sup> and bean gain by log<sub>2</sub>[Beans]",
            tooltip() {return "Must be in <b>General</b> Challenge to buy this upgrade"},
         	cost() {
                if (!inChallenge('chess', 24)) return Decimal.dInf
                return new Decimal (1063)},
            effect() {
                let base = player.antiamogus.beans.max(2).log(2)
                let expo = new Decimal (1)
                let eff = base.pow(expo)
                return eff
           },
           effectDisplay() { return format(upgradeEffect(this.layer, this.id).pow(5))+"x, "+format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade('booster', 45)&&hasMilestone('sbooster', 2)}
       	},
        55: {
	        title: "Booster Upgrade E5",
        	description: "Ex. Req. scales even less for each <b>🆎 Exors</b>, Multiply IP gain by 1.04 per upgrade",
            tooltip() {return "Must be in <b>Amalgam</b> Challenge to buy this upgrade"},
         	cost() {
                if (!inChallenge('chess', 25)) return Decimal.dInf
                return new Decimal (1060)},
            effect() {
                let base = new Decimal (1.04)
                let expo = new Decimal (player.booster.upgrades.length)
                let eff = base.pow(expo)
                return eff
           },
           effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade('booster', 45)&&hasMilestone('sbooster', 2)}
       	},
    },
    milestones: {
        0: {requirementDescription: "3 Boring Boosters",
                done() {return player[this.layer].best.gte(3)}, // Used to determine when to give the milestone
                effectDescription: "Keep all contents in amogus layer upon resetting. (except resources)",
            },
        1: {requirementDescription: "9 Boring Boosters",
            done() {return player[this.layer].best.gte(9)},
            effectDescription: "Gain 100% of amogus gain on reset per second, But Remove the ability to reset.",
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
        5: {requirementDescription: "197 Boring Boosters",
            done() {return player[this.layer].best.gte(197)},
            unlocked() {return hasUpgrade('dv', 22)},
            effectDescription() {return "Multiply Point gain cap by "+format(tmp.booster.M5effect)+" (based on best booster), Unlock a new layer."},
            tooltip() {return "Formula: <br>1.25<sup>[Best Booster]+1</sup>"},
        },
    },
    update(diff) {
    },
})
addLayer("sbooster", {
    name: "super boosters",
    symbol: "SB",
    position: 1,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        autoreset: false,
        best: new Decimal (0),
    }},
    tooltip() {
       let base = formatWhole(player.sbooster.points)+" super boosters"
       if (false) base = base+"<br>"+format(player.amogus.AB)+" 🆎"
       return base
    },
    color: "#0CC8FF",
    requires() {
        if (inChallenge('infection', 11)) return Decimal.dInf
        return new Decimal(200)},
    resource: "super boosters",
    baseResource: "boring boosters",
    baseAmount() {return player.booster.points},
    type: "static",
    base() {
        let base = new Decimal (1.1)
        if (hasUpgrade('dv', 53)) base = new Decimal (1.05)
        return base
    },
    exponent() {return new Decimal (1.25)},
    gainMult() {
        let mult = new Decimal (1)
        return mult
    },
    row: 1,
    layerShown() {return (hasMilestone('booster', 5)||player[this.layer].unlocked)&&!inChallenge('infection', 11)},
    roundUpCost() {return true},
    autoPrestige() {return player.sbooster.autoreset},
    resetsNothing() {return hasMilestone('sbooster', 2)},
    doReset(l) {
        if (!(layers[l].row > this.row)) return
        
        let keep = ['autoreset', 'milestones']

        if (hasMilestone('dv', 5)) keep.push('upgrades')
        
        layerDataReset(this.layer, keep)
    },
    branches: ["booster"],
    effect() {
        let amtcap = new Decimal (20)
        if (hasUpgrade('booster', 53)) amtcap = new Decimal (25)
        let amt = player.sbooster.best.min(amtcap);
		let base = new Decimal(1.05)
		eff = Decimal.pow(base.max(1),amt);
		return {
            C:amtcap,
            E:eff}
	},
    effectDescription() { 
        let eff = this.effect().E;
        let cap = this.effect().C;
        return "translated to a "+format(eff)+"x boost to boring booster base (based on best super booster, caps at "+format(cap)+" SBs)"
    },
    hotkeys: [
        {key: "B", description: "Shift+B: Super Booster reset",
         onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked(){return player[this.layer].unlocked}}
    ],
    tabFormat: ["main-display",
                    "prestige-button", "resource-display",
                    ["blank", "5px"],
						"milestones",
						"upgrades"
				],
    upgrades: {
        11: {
	        title: "Super Booster Upgrade A1",
        	description: "Reduce Boring Booster's cost exponent from 1.25 to 1.2",
         	cost: new Decimal (1),
            unlocked() {return true}
       	},
        12: {
	        title: "Super Booster Upgrade A2",
        	description: "Raise Point gain cap by 1.025th power per upgrade",
         	cost: new Decimal (3),
            effect() {
                let base = new Decimal(1.025)
                let expo = new Decimal(player[this.layer].upgrades.length)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return "^"+format(upgradeEffect(this.layer, this.id)) },
            unlocked() {return hasUpgrade('sbooster', 11)}
       	},
        13: {
	        title: "Super Booster Upgrade A3",
        	description: "Divide B-Booster's Cost by 100,000 per S-Boosters",
         	cost: new Decimal (4),
            effect() {
                let base = new Decimal(1e5)
                let expo = player[this.layer].points
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return "/"+format(upgradeEffect(this.layer, this.id)) },
            unlocked() {return hasUpgrade('sbooster', 12)}
       	},
        14: {
	        title: "Super Booster Upgrade A4",
        	description: "Reduce Booster's Cost base from 5 to 4 but Raise point gain to the 0.8th power.",
         	cost: new Decimal (5),
            unlocked() {return hasUpgrade('sbooster', 13)}
       	},
        15: {
	        title: "Super Booster Upgrade A5",
        	description: "Raise Point gain cap to the 1.05th power.",
         	cost: new Decimal (6),
            unlocked() {return hasUpgrade('sbooster', 14)}
       	},
    },
    milestones: {
        0: {requirementDescription: "3 Super Boosters",
                done() {return player[this.layer].best.gte(3)}, // Used to determine when to give the milestone
                effectDescription() {return "Multiply Point gain cap by "+ format(1e8) +" per super booster."},
            },
        1: {requirementDescription: "7 Super Boosters",
            done() {return player[this.layer].best.gte(7)}, // Used to determine when to give the milestone
            effectDescription: "Square root the point gain nerf.",
        },
        2: {requirementDescription: "19 Super Boosters",
            done() {return player[this.layer].best.gte(19)}, // Used to determine when to give the milestone
            effectDescription: "Unlock more amogus upgrades and boosters upgrades, S-Boosters reset nothing, Automatically gain S-Boosters.",
            toggles: [["sbooster", "autoreset"]]
        },
    },
    update(diff) {
    },
})
addLayer("chess", {
    name: "chess", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "♙", //♙ This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal (0),
        spentMP: new Decimal (0),
        autoMP: false,
    }},
    tooltip() {
       let base = formatWhole(player.chess.points)+" chess points"
       if (hasUpgrade('chess', 11)) base = base+"<br>"+formatWhole(new Decimal(buyableEffect('chess', 11).MP).sub(player.chess.spentMP))+"/"+formatWhole(buyableEffect('chess', 11).MP)+" MP"
       return base
    },
    color: "#008080",
    requires() {
        let base = new Decimal(1e36)
        if (hasUpgrade('chess', 41)) base = base.div(1e6)
        if (inChallenge('infection', 11)) base = Decimal.dInf
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
        if (hasMilestone('chess', 3)) mult = mult.times(250)
        mult = mult.times(buyableEffect('chess', 51).Ef)
        mult = mult.times(tmp.dv.effect)
        mult = mult.times(tmp.dv.dedpoweff)
        if (hasUpgrade('dv', 12)) mult = mult.times(upgradeEffect('dv', 12))
        if (hasMilestone('dv', 3)) mult = mult.times(Decimal.pow(10, new Decimal(player.dv.milestones.length)))
        if (hasUpgrade('dv', 25)) mult = mult.times(upgradeEffect('dv', 25))
        if (hasUpgrade('dv', 44)) mult = mult.times(upgradeEffect('dv', 44).CP)
        if (player.difficulty.staticResBoost) mult = mult.times(2)
        if (hasChallenge('chess', 21)) mult = mult.times(Decimal.pow(8, Object.values(player[this.layer].challenges).reduce((a,b) => a+b)))
        if (hasChallenge('chess', 25)) mult = mult.times(player.chess.points.max(1).ln().max(1).pow(Object.values(player[this.layer].challenges).reduce((a,b) => a+b)))
        if (hasUpgrade('antiamogus', 42)) mult = mult.times(upgradeEffect('antiamogus', 42))
        if (hasMilestone('infection', 10)) mult = mult.times(Decimal.pow(100, player.antiamogus.tier.max(0)))
        if (hasMilestone('antigh', 4)) mult = mult.times(Decimal.pow(5, new Decimal (player.antigh.best.max(0))))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal (1)
        if (hasUpgrade('dv', 15)) exp = exp.times(1.05)
        if (hasUpgrade('infection', 22)) exp = exp.times(1.05)
        if (hasMilestone('antiamogus', 1)) exp = exp.times(1.05)
        return exp
    },
    automate() {
        if (player.chess.autoMP) {buyBuyable('chess', 11)}
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown() {
        return (hasMilestone('booster', 4)||player[this.layer].unlocked)&&!inChallenge('infection', 11)
    },
    doReset(l) {
        if (!(layers[l].row > this.row)) return
        
        let keep = ['milestones', 'challenges', 'autoMP']
        if (hasMilestone('dv', 1)) keep.push('upgrades')
        if (hasMilestone('dv', 2)) keep.push('buyables')
        if (hasMilestone('dv', 2)) keep.push('spentMP')
        
        layerDataReset(this.layer, keep)
    },
    hotkeys: [
        {key: "c", description: "C: Reset for chess points", onPress(){if (canReset(this.layer)&&(!hasMilestone('chess', 3))) doReset(this.layer)}},
    ],
    branches: ["booster"],
    effect() {
		let amt = player.chess.best.max(0).add(1).log(2).add(1);
		let pow = new Decimal(2)
        if (hasUpgrade('chess', 43)) pow = pow.times(2)
        if (hasChallenge('chess', 23)) pow = pow.times(2)
        if (hasUpgrade('amogus', 51)) pow = pow.times(upgradeEffect('amogus', 51))
		eff = Decimal.pow(amt, pow);
		return eff;
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
        let eff = 0
        if (hasMilestone('chess', 2)) eff = new Decimal (0.1)
        if (hasMilestone('chess', 2)){
            if (hasMilestone('chess', 3)) eff = eff.times(10)}
        return eff
    },
    tabFormat: {
        "Upgrades": {
        unlocked(){return true},
        content:[
            "main-display",
            "blank",
            ["prestige-button", "", function (){ return hasMilestone("chess", 3) ? {'display': 'none'} : {}}],
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
                ["prestige-button", "", function (){ return hasMilestone("chess", 3) ? {'display': 'none'} : {}}],
                "blank",
                "resource-display",
                "blank",
                ["display-text",
                function() {
                    return "You have " + formatWhole(buyableEffect('chess',11).MP) + " Material points."
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
                    ["prestige-button", "", function (){ return hasMilestone("chess", 3) ? {'display': 'none'} : {}}],
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
            requirementDescription() {return format(1e12) +" chess points"},
            done() {return player[this.layer].best.gte(1e12)}, // Used to determine when to give the milestone
            tooltip() {return "Effect Formula:<br>(log<sub>2</sub>([Ex. Req.])+2)<sup>0.8</sup>"},
            effectDescription() {return "Square root extracting Requirements, but Multiply Extracted 🆎 gain by "+format(tmp.chess.M1effect)+" (based on it)."},
                },
        2: {
            requirementDescription() {return format(4.204e20) +" chess points"},
            done() {return player[this.layer].best.gte(4.204e20)}, // Used to determine when to give the milestone
            effectDescription: "Gain 10% of chess gain on reset per second.",
            },
        3: {
            requirementDescription: "40 total MP",
            unlocked(){return hasUpgrade('chess', 12)},
            done() {return buyableEffect('chess',11).MP.gte(40)}, // Used to determine when to give the milestone
            effectDescription: "Multiply Previous Milestone by 10, Multiply Chess gain by 250, Unlock a new layer but remove the ability to reset.",
            },
        4: {
            requirementDescription: "80 total MP",
            unlocked(){return hasUpgrade('chess', 12)},
            done() {return buyableEffect('chess',11).MP.gte(80)}, // Used to determine when to give the milestone
            effectDescription: "<b>Material Points</b> don't spend anything Automate <b>Material Points</b>.",
            toggles: [["chess", "autoMP"]]
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
                setBuyableAmount(this.layer, 71, new Decimal(0))
                setBuyableAmount(this.layer, 72, new Decimal(0))
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
                return player.chess.points.max(1).ln().add(2).pow(2.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade(this.layer, 33)}
       	},
        35: {
	        title: "Chess Upgrade C5",
        	description: "Decrease <b>Material Points</b>' Cost base to 9, Unlock 5 more booster upgrades.",
         	cost: new Decimal (1.2e6),
            unlocked() {return hasUpgrade(this.layer, 34)}
       	},
        41: {
	        title: "Chess Upgrade D1",
        	description: "Divide Booster's Cost based on total MP, Divide Chess reset's requirement by 1,000,000.",
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
        	description: "Decrease <b>Material Points</b>' Cost base to 7, Multiply chess point gain based on total MP",
            tooltip() {return "Effect Formula: ([MP]+2)<sup>[MP]<sup>0.4</sup></sup>"},
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
        	description: "Decrease <b>Material Points</b>' Cost base to 6, Raise Chess Point effect to the 2nd power, Multiply Ex. 🆎 lim based on Ex. 🆎 lim.",
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
        	description: "Square root Ex. Req., Generate Ex. 🆎 like Normal 🆎 (as long you have the requirement), Unlock <b>Challenges</b>",
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
                if (hasChallenge('chess', 21)) base = new Decimal (4)
                if (hasChallenge('chess', 24)) base = new Decimal (3)
                let pow = x.pow(1.25)
                let divcost = new Decimal(1)
                divcost = divcost.times(buyableEffect('chess', 52).Ef)
                if (hasUpgrade('dv', 34)) divcost = divcost.times(upgradeEffect('dv', 34))
                if (hasUpgrade('dv', 51)) divcost = divcost.times(player.dv.dedpow.max(1))
                if (hasUpgrade('infection', 13)) divcost = divcost.times(upgradeEffect('infection', 13))
                return base.pow(pow).div(divcost).floor()
            },
            tooltip() {
                if (hasChallenge('chess', 24)) return "Cost Formula:<br>3<sup>x<sup>1.25</sup></sup>"
                if (hasChallenge('chess', 21)) return "Cost Formula:<br>4<sup>x<sup>1.25</sup></sup>"
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
            purchaseLimit() {return new Decimal (1000)},
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                if (hasMilestone('chess', 4)) cost = new Decimal (0)
                player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal (3)
                let expo = x
                let eff1 = base1.pow(expo)
                let matPt = new Decimal (x)
                if (hasUpgrade('chess', 44)) matPt = matPt.add(upgradeEffect('chess', 44))
                if (hasUpgrade('amogus', 53)) matPt = matPt.add(upgradeEffect('amogus', 53))
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
                if (inChallenge('chess', 23)) base1 = base1.pow(-1)
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
                if (inChallenge('chess', 23)) base1 = base1.pow(-1)
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
        71: {
            title: "♔ White King",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color": "#FFFFFF"
                }
            },
            unlocked() {
                return hasUpgrade('antiamogus', 35)
            },
            cost(x) {
                let base = new Decimal (50)
                return base
            },
            tooltip() {
                return "Effect Formula:<br>1.05<sup>[total MP]<sup>0.5</sup></sup>*([total MP]+2)"
            },
            display() {
                return "Multiply DP by "+format(buyableEffect(this.layer, this.id).Ba)+" (based on total MP)<br>Cost: "+format(this.cost())+ " material points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"/1<br>Effect: "+ format(buyableEffect(this.layer, this.id).Ef)+"x"
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
                let base1 = new Decimal (1.05).pow(buyableEffect('chess', 11).MP.max(0).pow(0.5)).times(buyableEffect('chess', 11).MP.max(0).add(2))
                if (inChallenge('chess', 11)) base1 = new Decimal (1)
                if (inChallenge('chess', 12)) base1 = new Decimal (1)
                if (inChallenge('chess', 13)) base1 = new Decimal (1)
                if (inChallenge('chess', 14)) base1 = new Decimal (1)
                let expo = x
                let eff1 = base1.pow(expo)
                return {
                    Ba: base1,
                    Ef: eff1,
                }
            },
        },
        72: {
            title: "♚ Black King",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color": "#333333"
                }
            },
            unlocked() {
                return hasUpgrade('antiamogus', 35)
            },
            cost(x) {
                let base = new Decimal (50)
                return base
            },
            tooltip() {
                return "Effect Formula:<br>1+[total MP]/250"
            },
            display() {
                return "Multiply all DIEmensions' speed by "+format(buyableEffect(this.layer, this.id).Ba)+" (based on total MP)<br>Cost: "+format(this.cost())+ " material points<br>Bought: "+formatWhole(getBuyableAmount(this.layer, this.id))+"/1<br>Effect: "+ format(buyableEffect(this.layer, this.id).Ef)+"x"
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
                let base1 = new Decimal(1).add(buyableEffect('chess', 11).MP.max(0).div(250))
                if (inChallenge('chess', 11)) base1 = new Decimal (1)
                if (inChallenge('chess', 12)) base1 = new Decimal (1)
                if (inChallenge('chess', 13)) base1 = new Decimal (1)
                if (inChallenge('chess', 14)) base1 = new Decimal (1)
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
            challengeDescription() {return "Divide point gain by " + format(1e100) + ", All pieces except pawns do nothing."},
            goalDescription() {return format(1e179) + " amogus"},
            rewardDescription() {return "Pawns are free, Raise Point gain to the 1.05th power outside challenges."},
            canComplete: function() {return player.amogus.points.gte(1e179)},
        },
        12: {
            name: "Dragon Knight",
            challengeDescription() {return "Divide 🆎 gain by "+ format(1e15) +", All pieces except knights do nothing, Square root both Knights' effect."},
            goalDescription() {return format("1e320") + " 🆎"},
            rewardDescription() {return "You can get 1 more of each Knights, Third of each Knight costs 4 MP."},
            canComplete: function() {return player.amogus.AB.gte("1e320")},
            unlocked() {return hasChallenge('chess', 11)},
        },
        13: {
            name: "Ferz",
            challengeDescription() {return "Decrease Booster's base by 1, All pieces except bishops do nothing, Divide amogus gain by "+ format(tmp.chess.AmogusDivinFerz)+" (Effect Formula: <br>10<sup>log<sub>10</sub>[amogus]<sup>0.6</sup></sup>)"},
            goalDescription() {return format(2.02e202) + " amogus"},
            rewardDescription() {return "You can get 1 more of each Bishops, Third of each Bishop costs 4 MP."},
            canComplete: function() {return player.amogus.points.gte("2.02e202")},
            unlocked() {return hasChallenge('chess', 12)},
        },
        14: {
            name: "Wazir",
            challengeDescription() {return "Raise your point gain base to the [# of Rooks]+1th power but Decrease Booster's base by 1.25, All pieces do nothing, Divide point gain by "+ format(tmp.chess.PointDivinWazir)+" (Effect Formula: <br>10<sup>log<sub>10</sub>[points]<sup>0.6</sup></sup>)"},
            goalDescription() {return format(2.9e290) + " points"},
            rewardDescription() {return "Raise Both Rooks' by the [# of Rooks]+1th power, Square root the point gain nerf."},
            canComplete: function() {return player.points.gte("2.9e290")},
            unlocked() {return hasChallenge('chess', 13)},
        },
        15: {
            name: "Cheap Queen",
            challengeDescription() {return "Divide Point gain by " + format(1e150) + ", Decrease Booster's base by 1.5, Square root Queens' effect, Pawns and Knights do nothing."},
            goalDescription() {return format(2.400e120) + " points"},
            rewardDescription() {return "Decrease <b>Material Points</b>' Cost base to 5, Ex. Req. scales less for each <b>🆎 Exors</b>"},
            canComplete: function() {return player.points.gte("2.4e120")},
            unlocked() {return hasChallenge('chess', 14)},
        },
        21: {
            name: "King",
            challengeDescription() {return "Stuck in <b>Ferz</b> and <b>Wazir</b>, Square root your Point gain."},
            goalDescription() {return format(1e200) + " points"},
            rewardDescription() {return "Decrease <b>Material Points</b>' Cost base to 4, Multiply chess gain by 8 per completed challenges"},
            canComplete: function() {return player.points.gte("1e200")},
            unlocked() {return hasUpgrade('dv', 21)},
            countsAs: [13, 14],
        },
        22: {
            name: "Silver General",
            challengeDescription() {return "Stuck in <b>Ferz</b> and <b>Pawn</b>, Square root your amogus gain."},
            goalDescription() {return format(1e145) + " amogus"},
            rewardDescription() {return "Increase <b>🆎 Charged Boosters</b>' base by 0.05, Buying it doesn't consume your <b>🆎 Boosters</b>"},
            canComplete: function() {return player.amogus.points.gte("1e145")},
            unlocked() {return hasUpgrade('dv', 21)&&hasUpgrade('dv', 22)},
            countsAs: [11, 13],
        },
        23: {
            name: "Berolina Pawn",
            challengeDescription() {return "Stuck in <b>Pawn</b>, Pawns' effect is raised to the -1th power, Dilate Point gain by 0.6th power after nerf."},
            goalDescription() {return format(1e85) + " amogus"},
            rewardDescription() {return "Raise chess effect to the 2nd power, Ex. Req. scales even less for each <b>🆎 Exors</b>"},
            canComplete: function() {return player.amogus.points.gte("1e85")},
            unlocked() {return hasUpgrade('dv', 21)&&hasUpgrade('dv', 23)},
            countsAs: [11],
        },
        24: {
            name: "General",
            challengeDescription() {return "Stuck in <b>Dragon Knight</b>, <b>Ferz</b> and <b>Wazir</b>, Raise point gain to the 25th root"},
            goalDescription() {return format(1e29) + " points"},
            rewardDescription() {return "Decrease <b>Material Points</b>' Cost base to 3, Raise Point gain cap to the 1.05th power"},
            canComplete: function() {return player.points.gte("1e29")},
            unlocked() {return hasUpgrade('dv', 21)&&hasUpgrade('dv', 24)},
            countsAs: [12, 13, 14],
        },
        25: {
            name: "Amalgam",
            challengeDescription() {return "Stuck in First 5 Challenges, Raise point gain to the 25th root"},
            goalDescription() {return format(3e24) + " points"},
            rewardDescription() {return "Multiply Chess gain by ln([chess points]) per challenge."},
            canComplete: function() {return player.points.gte("3e24")},
            unlocked() {return hasUpgrade('dv', 21)&&hasUpgrade('dv', 25)},
            countsAs: [11, 12, 13, 14, 15],
        },
    },
    update(diff) {
    },
})
addLayer("dv", {
    name: "deadly virus",
    symbol: "D",
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal (0),
        autoreset: false,
        dedpow: new Decimal (0),
        dd1: new Decimal (0),
        dd2: new Decimal (0),
        dd3: new Decimal (0),
        dd4: new Decimal (0),
        dd5: new Decimal (0),
        dd6: new Decimal (0),
    }},
    tooltip() {
       let base = formatWhole(player.dv.points)+" deadly virus"
       if (hasUpgrade('dv', 35)) base = base + "<br>" + formatWhole(player.dv.dedpow)+" DP"
       return base
    },
    color: "#0000C0",
    requires() {
        let base = new Decimal(1e50)
        if (inChallenge('infection', 11)) base = Decimal.dInf
        return base
    },
    resource: "deadly virus",
    baseResource: " chess points",
    baseAmount() {return player.chess.points},
    type: "static",
    base() {
        let base = new Decimal (1e5)
        if (hasMilestone('dv', 7)) base = new Decimal (1e4)
        return base},
    exponent() {return new Decimal (1.25)},
    gainMult() {
        mult = new Decimal (1)
        if (hasUpgrade('dv', 13)) mult = mult.div(upgradeEffect('dv', 13))
        if (hasUpgrade('dv', 24)) mult = mult.div(upgradeEffect('dv', 24))
        if (hasUpgrade('dv', 32)) mult = mult.div(upgradeEffect('dv', 32))
        if (hasUpgrade('dv', 33)) mult = mult.div(upgradeEffect('dv', 33))
        if (hasUpgrade('dv', 45)) mult = mult.div(player.dv.dedpow.max(1))
        if (hasUpgrade('dv', 64)) mult = mult.div(tmp.dv.effect)
        return mult
    },
    gainExp() {
        return new Decimal (1)
    },
    row: 3,
    layerShown() {
        return (hasMilestone('chess', 3)||player[this.layer].unlocked)&&!inChallenge('infection', 11)
    },
    doReset(l) {
        if ((!(layers[l].row > this.row))) return
        
        let keep = ['upgrades', 'milestones']
        
        
        layerDataReset(this.layer, keep)
    },
    canBuyMax() {return hasMilestone('infection', 2)},
    hotkeys: [
        {key: "d", description: "D: Reset for deadly virus", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches: ["chess"],
    effect() {
		let amt = player.dv.best.add(1)
        if (hasUpgrade('dv', 23)) amt = new Decimal (100)
		let pow = new Decimal(16)
        if (hasUpgrade('dv', 23)) pow = player.dv.best
		eff = Decimal.pow(amt, pow)
        if (hasMilestone('infection', 11)) eff = eff.times(Decimal.pow(player.dv.best.max(1), Decimal.sub(4, player.infection.ad.max(0)).max(0)))
		return eff;
	},
    dedpoweff() {
        return player.dv.dedpow.max(0).add(1).pow(1.25)
    },
    effectDescription() { 
        let eff = this.effect();
        return "translated to a "+format(eff)+"x boost to chess gain (based on best)"
    },
    getDecayingRate() {
        let base = new Decimal (0.1)
        if (hasUpgrade('dv', 64)) base = new Decimal (0.08)
        if (hasMilestone('dv', 10)) base = new Decimal (0.05)
        if (hasUpgrade('infection', 32)) base = new Decimal (0.04)
        return base
    },
    automate() {
        if (hasMilestone('infection', 3)) {
            buyBuyable(this.layer, 11)
            buyBuyable(this.layer, 12)
            buyBuyable(this.layer, 13)
            if (getBuyableAmount('dv', 32).add(tmp.dv.buyables[32].freelvl).gte(1)){ buyBuyable(this.layer, 21)}
            if (getBuyableAmount('dv', 32).add(tmp.dv.buyables[32].freelvl).gte(2)){ buyBuyable(this.layer, 22)}
            if (getBuyableAmount('dv', 32).add(tmp.dv.buyables[32].freelvl).gte(3)){ buyBuyable(this.layer, 23)}
        }
        if (hasMilestone('antip', 0)) {
            buyBuyable(this.layer, 31)
        }
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
            ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15]]],
            ["row", [["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24], ["upgrade", 25]]],
            ["row", [["upgrade", 31], ["upgrade", 32], ["upgrade", 33], ["upgrade", 34], ["upgrade", 35]]],
            "blank",
            "clickables"
        ]},
        "DIEmensions": {
            unlocked(){return hasUpgrade("dv", 35)},
            content:[
                "main-display",
                "blank",
                ["prestige-button",function(){return ""}],
                "blank",
                "resource-display",
                "blank",
                "blank",
                ["display-text",
                function() {
                    return "You have " + format(player.dv.dedpow) + " Deadly Power, Translated to a x" + format(tmp.dv.dedpoweff) + " boost to chess gain."
                }],
                ["display-text",
                function() {
                    return "You're losing "+format(tmp.dv.getDecayingRate.times(100))+"% of Deadly Power, DIEmensions Amount when generating every second"
                }],
                "blank",
                "buyables",
                "blank",
                ["row", [["bar", 1]]],
                "blank",
                ["row", [["upgrade", 41], ["upgrade", 42], ["upgrade", 43], ["upgrade", 44], ["upgrade", 45]]],
                ["row", [["upgrade", 51], ["upgrade", 52], ["upgrade", 53], ["upgrade", 54], ["upgrade", 55]]],
                ["row", [["upgrade", 61], ["upgrade", 62], ["upgrade", 63], ["upgrade", 64], ["upgrade", 65]]],
                ["row", [["upgrade", 71], ["upgrade", 72], ["upgrade", 73], ["upgrade", 74], ["upgrade", 75]]],
                "clickables"
            ]},
    },
    resetsNothing() {return hasMilestone('dv', 6)},
    upgrades: {
        11: {
	        title: "Deadly Upgrade A1",
        	description: "Multiply Point gain based on Deadly Virus, Hardcapped at 200 Deadly Virus.",
            tooltip() {return "Effect Formula:<br>10<sup>([Deadly Virus]+2)<sup>2</sup></sup>"},
            cost: new Decimal (1),
            effect() {
                let base = new Decimal(10)
                let expo = player[this.layer].points.min(200).add(2).pow(2)
                if (hasUpgrade('dv', 62)) expo = expo.pow(0.69)
                let eff = base.pow(expo)
                return eff
            },
             effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return true}
       	},
        12: {
	        title: "Deadly Upgrade A2",
        	description: "Raise 🆎 Lim. to the 1.1th power, Multiply chess gain by 5 per upgrade.",
            cost: new Decimal (2),
            effect() {
                let base = new Decimal(5)
                let expo = new Decimal(player[this.layer].upgrades.length)
                let eff = base.pow(expo)
                return eff
            },
             effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('dv', 11)}
       	},
        13: {
	        title: "Deadly Upgrade A3",
        	description: "Divide Deadly Virus' cost based on Total MP.",
            tooltip() {return "Effect Formula:<br>1.25<sup>([Total MP]+2)<sup>1.25</sup></sup>"},
            cost: new Decimal (3),
            effect() {
                let base = new Decimal(1.25)
                let expo = new Decimal(buyableEffect('chess', 11).MP).max(0).add(2).pow(1.25)
                let eff = base.pow(expo)
                return eff
            },
             effectDisplay() { return "/"+format(upgradeEffect(this.layer, this.id)) },
            unlocked() {return hasUpgrade('dv', 12)}
       	},
        14: {
	        title: "Deadly Upgrade A4",
        	description: "Multiply amogus gain by ln(points) per upgrade.",
            cost: new Decimal (5),
            effect() {
                let base = player.points.max(0).add(1).ln().add(2)
                let expo = new Decimal(player[this.layer].upgrades.length)
                let eff = base.pow(expo)
                return eff
            },
             effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('dv', 13)}
       	},
        15: {
	        title: "Deadly Upgrade A5",
        	description: "Multiply point gain by ln(amogus) per upgrade, Raise chess gain to the 1.05th power.",
            cost: new Decimal (6),
            effect() {
                let base = player.amogus.points.max(0).add(1).ln().add(2)
                let expo = new Decimal(player[this.layer].upgrades.length)
                let eff = base.pow(expo)
                return eff
            },
             effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('dv', 14)}
       	},
        21: {
	        title: "Deadly Upgrade B1",
        	description: "Divide Booster's Cost based on chess point, Unlock a chess challenge per upgrade in this row",
            tooltip() {return "Effect Formula:<br>10<sup>(log<sub>10</sub>[Chess points])<sup>0.75</sup></sup>"},
            cost: new Decimal (7),
            effect() {
                let base = player.chess.points.max(1).log(10)
                let expo = new Decimal(0.75)
                let eff = Decimal.pow(10, base.pow(expo))
                return eff
            },
            effectDisplay() { return "/"+format(upgradeEffect(this.layer, this.id)) },
            unlocked() {return hasUpgrade('dv', 15)}
       	},
        22: {
	        title: "Deadly Upgrade B2",
        	description: "Divide Booster's Cost based on total MP, Raise the 4th point gain nerf to the 0.8th power.",
            tooltip() {return "Effect Formula:<br>2<sup>([Total MP]+2)<sup>1.2</sup></sup>"},
            cost: new Decimal (9),
            effect() {
                let base = buyableEffect('chess', 11).MP.max(0).add(2)
                let expo = new Decimal(1.2)
                let eff = Decimal.pow(2, base.pow(expo))
                return eff
            },
            effectDisplay() { return "/"+format(upgradeEffect(this.layer, this.id))},
            unlocked() {return hasUpgrade('dv', 21)}
       	},
        23: {
	        title: "Deadly Upgrade B3",
        	description: "Deadly Virus use a better Effect formula.",
            tooltip() {return "Effect Formula:<br>([DV]+1)<sup>16</sup> => 100<sup>[DV]</sup>"},
            cost: new Decimal (10),
            unlocked() {return hasUpgrade('dv', 22)}
       	},
        24: {
	        title: "Deadly Upgrade B4",
        	description: "Divide Deadly Virus' cost based on 🆎.",
            tooltip() {return "Effect Formula:<br>10<sup>log<sub>10</sub>[🆎]<sup>0.5</sup></sup>"},
            cost: new Decimal (11),
            effect() {
                let base = player.amogus.AB.max(1).log(10)
                let expo = new Decimal(0.5)
                let eff = Decimal.pow(10, base.pow(expo))
                return eff
            },
            effectDisplay() { return "/"+format(upgradeEffect(this.layer, this.id))},
            unlocked() {return hasUpgrade('dv', 23)}
       	},
        25: {
	        title: "Deadly Upgrade B5",
        	description: "Multiply chess gain by the length of this description, haha funny....",
            cost: new Decimal (16),
            effect() {
                let base = new Decimal(this.description.length)
                let expo = new Decimal(1)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade('dv', 24)}
       	},
        31: {
	        title: "Deadly Upgrade C1",
        	description: "Multiply Point gain cap by Best B-Boosters per Deadly Virus",
            cost: new Decimal (20),
            effect() {
                let base = player.booster.best.max(1)
                let expo = player.dv.points
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade('dv', 25)}
       	},
        32: {
	        title: "Deadly Upgrade C2",
        	description: "Divide Deadly Virus' Cost by log<sub>10</sub>[amogus] per deadly virus",
            cost: new Decimal (22),
            effect() {
                let base = player.amogus.points.max(1).log(10).max(1)
                let expo = player.dv.points
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return "/"+format(upgradeEffect(this.layer, this.id))},
            unlocked() {return hasUpgrade('dv', 31)}
       	},
        33: {
	        title: "Deadly Upgrade C3",
        	description: "Ex. Req. scales even less for each <b>🆎 Exors</b>', Raise 🆎 lim. to the 1.1th power, Divide DV's Cost based on total MP.",
            tooltip() {return "Effect Formula:<br>(log<sub>10</sub>[MP])<sup>[MP]<sup>0.8</sup></sup>"},
            cost: new Decimal (31),
            effect() {
                let base = buyableEffect('chess', 11).MP.max(1).log(10).max(1)
                let expo = buyableEffect('chess', 11).MP.pow(0.8)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return "/"+format(upgradeEffect(this.layer, this.id))},
            unlocked() {return hasUpgrade('dv', 32)}
       	},
        34: {
	        title: "Deadly Upgrade C4",
        	description: "Divide <b>Mat. Pts</b>' Cost based on total MP",
            tooltip() {return "Effect Formula:<br>2.5<sup>[MP]<sup>0.8</sup></sup>"},
            cost: new Decimal (35),
            effect() {
                let base = new Decimal (2.5)
                let expo = buyableEffect('chess', 11).MP.pow(0.8)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return "/"+format(upgradeEffect(this.layer, this.id))},
            unlocked() {return hasUpgrade('dv', 33)}
       	},
        35: {
	        title: "Deadly Upgrade C5",
        	description: "Raise amogus gain to the 1.1th power and a new tab.",
            cost: new Decimal (37),
            unlocked() {return hasUpgrade('dv', 34)}
       	},
        41: {
	        title: "DIEmension Upgrade A1",
        	description: "Multiply DP gain based on DV.",
            currencyDisplayName: "DP",
            currencyLayer: "dv",
            currencyInternalName: "dedpow",
            currencyLocation() {return player.dv},
            tooltip() {return "Effect Formula:<br>(ln[DV])<sup>0.6</sup>"},
            cost: new Decimal (250),
            effect() {
                let base = player.dv.points.max(1).ln().max(1)
                let expo = new Decimal (0.6)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade('dv', 35)}
       	},
        42: {
	        title: "DIEmension Upgrade A2",
        	description: "Multiply DP gain based on DP.",
            currencyDisplayName: "DP",
            currencyLayer: "dv",
            currencyInternalName: "dedpow",
            currencyLocation() {return player.dv},
            tooltip() {return "Effect Formula:<br>(log<sub>10</sub>[DP])<sup>0.6</sup>"},
            cost: new Decimal (222222),
            effect() {
                let base = player.dv.dedpow.max(1).log(10).max(1)
                let expo = new Decimal (0.6)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade('dv', 41)}
       	},
        43: {
	        title: "DIEmension Upgrade A3",
        	description: "Multiply DP gain based on 🆎, Multiply 🆎 gain and lim. based on DP",
            currencyDisplayName: "DP",
            currencyLayer: "dv",
            currencyInternalName: "dedpow",
            currencyLocation() {return player.dv},
            tooltip() {return "Effect Formula:<br>(log<sub>10</sub>[🆎])<sup>0.25</sup>,<br>(log<sub>10</sub>[DP])<sup>10</sup>"},
            cost: new Decimal (7.5e10),
            effect() {
                let base = player.amogus.AB.max(1).log(10).max(1)
                let expo = new Decimal (0.25)
                let eff = base.pow(expo)
                let base2 = player.dv.dedpow.max(1).log(10).max(1)
                let expo2 = new Decimal (10)
                let eff2 = base2.pow(expo2)
                return {
                    DP: eff,
                    AB: eff2,
                }
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id).DP)+"x, "+format(upgradeEffect(this.layer, this.id).AB)+"x"},
            unlocked() {return hasUpgrade('dv', 42)}
       	},
        44: {
	        title: "DIEmension Upgrade A4",
        	description: "Multiply DP gain based on Chess points, Multiply chess gain based on DP",
            currencyDisplayName: "DP",
            currencyLayer: "dv",
            currencyInternalName: "dedpow",
            currencyLocation() {return player.dv},
            tooltip() {return "Effect Formula:<br>(log<sub>10</sub>[CHP])<sup>0.4</sup>,<br>(log<sub>10</sub>[DP])<sup>8</sup>"},
            cost: new Decimal (3e18),
            effect() {
                let base = player.chess.points.max(1).log(10).max(1)
                let expo = new Decimal (0.4)
                let eff = base.pow(expo)
                let base2 = player.dv.dedpow.max(1).log(10).max(1)
                let expo2 = new Decimal (8)
                let eff2 = base2.pow(expo2)
                return {
                    DP: eff,
                    CP: eff2,
                }
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id).DP)+"x, "+format(upgradeEffect(this.layer, this.id).CP)+"x"},
            unlocked() {return hasUpgrade('dv', 43)}
       	},
        45: {
	        title: "DIEmension Upgrade A5",
        	description: "Multiply DP gain by GP, Divide DV's Cost by DP",
            currencyDisplayName: "DP",
            currencyLayer: "dv",
            currencyInternalName: "dedpow",
            currencyLocation() {return player.dv},
            cost: new Decimal (3.6e27),
            unlocked() {return hasUpgrade('dv', 44)}
       	},
        51: {
	        title: "DIEmension Upgrade B1",
        	description: "Multiply DP gain by total MP, Divide <b>Mat. Pts</b>' cost by DP",
            currencyDisplayName: "DP",
            currencyLayer: "dv",
            currencyInternalName: "dedpow",
            currencyLocation() {return player.dv},
            cost: new Decimal (8.1e35),
            unlocked() {return hasUpgrade('dv', 45)}
       	},
        52: {
	        title: "DIEmension Upgrade B2",
        	description: "Multiply DP gain by log<sub>2</sub>(S-Boosters) per DIEmension upgrade.",
            currencyDisplayName: "DP",
            currencyLayer: "dv",
            currencyInternalName: "dedpow",
            currencyLocation() {return player.dv},
            cost: new Decimal (4.242e42),
            effect() {
                let base = player.sbooster.points.max(1).log(2).max(1)
                let expo = new Decimal(player.dv.upgrades.length).sub(15).max(0)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade('dv', 51)}
       	},
        53: {
	        title: "DIEmension Upgrade B3",
        	description: "Ex. Req. scales even less for each <b>🆎 Exors</b>, Reduce S-Booster Cost Base from 1.1 to 1.05",
            currencyDisplayName: "DP",
            currencyLayer: "dv",
            currencyInternalName: "dedpow",
            currencyLocation() {return player.dv},
            cost: new Decimal (1e57),
            unlocked() {return hasUpgrade('dv', 52)}
       	},
        54: {
	        title: "DIEmension Upgrade B4",
        	description: "Multiply DP gain based on points, Multiply Point gain cap based on DP.",
            currencyDisplayName: "DP",
            currencyLayer: "dv",
            currencyInternalName: "dedpow",
            currencyLocation() {return player.dv},
            tooltip() {return "Effect Formula:<br>(log<sub>10</sub>[Points])<sup>0.75</sup>,<br>(log<sub>10</sub>[DP])<sup>12.5</sup>"},
            cost: new Decimal (1.5e61),
            effect() {
                let base = player.points.max(1).log(10).max(1)
                let expo = new Decimal (0.75)
                let eff = base.pow(expo)
                let base2 = player.dv.dedpow.max(1).log(10).max(1)
                let expo2 = new Decimal (12.5)
                let eff2 = base2.pow(expo2)
                return {
                    DP: eff,
                    PT: eff2,
                }
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id).DP)+"x, "+format(upgradeEffect(this.layer, this.id).PT)+"x"},
            unlocked() {return hasUpgrade('dv', 53)}
       	},
        55: {
	        title: "DIEmension Upgrade B5",
        	description: "Multiply DP gain based on B-Boosters, Divide Booster's Cost by DP.",
            currencyDisplayName: "DP",
            currencyLayer: "dv",
            currencyInternalName: "dedpow",
            currencyLocation() {return player.dv},
            tooltip() {return "Effect Formula:<br>(log<sub>2</sub>[B-Boosters])<sup>4</sup>"},
            cost: new Decimal (4.1e68),
            effect() {
                let base = player.booster.points.max(1).log(2).max(1)
                let expo = new Decimal(4)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade('dv', 54)}
       	},
        61: {
	        title: "DIEmension Upgrade C1",
        	description: "Multiply DP gain based on Ex. 🆎, Multiply Ex. 🆎 gain and lim. based on DP",
            currencyDisplayName: "DP",
            currencyLayer: "dv",
            currencyInternalName: "dedpow",
            currencyLocation() {return player.dv},
            tooltip() {return "Effect Formula:<br>(log<sub>10</sub>[Ex. 🆎])<sup>1.25</sup>,<br>(log<sub>10</sub>[DP])<sup>4</sup>"},
            cost: new Decimal (6.4e79),
            effect() {
                let base = player.amogus.ExAB.max(1).log(10).max(1)
                let expo = new Decimal (1.25)
                let eff = base.pow(expo)
                let base2 = player.dv.dedpow.max(1).log(10).max(1)
                let expo2 = new Decimal (4)
                let eff2 = base2.pow(expo2)
                return {
                    DP: eff,
                    AB: eff2,
                }
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id).DP)+"x, "+format(upgradeEffect(this.layer, this.id).AB)+"x"},
            unlocked() {return hasUpgrade('dv', 55)}
       	},
        62: {
	        title: "DIEmension Upgrade C2",
        	description: "Multiply DP gain by log(log([DP])) per S-Boosters but Raise <b>D-Upgrade A1</b>'s eff expo to the 0.69th power (def not intended).",
            currencyDisplayName: "DP",
            currencyLayer: "dv",
            currencyInternalName: "dedpow",
            currencyLocation() {return player.dv},
            cost: new Decimal (1.987e86),
            effect() {
                let base = player.dv.dedpow.max(1).log(10).max(1).log(10).max(1)
                let expo = player.sbooster.points
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade('dv', 61)}
       	},
        63: {
	        title: "DIEmension Upgrade C3",
        	description: "Reduce <b>🆎 C-Boosts</b>' cost exp to 1.8, Multiply Point gain cap by log<sub>2</sub>(log<sub>2</sub>([Points])) per <b>🆎 C-Boost</b><sup>1.125</sup>.",
            currencyDisplayName: "DP",
            currencyLayer: "dv",
            currencyInternalName: "dedpow",
            currencyLocation() {return player.dv},
            cost: new Decimal (4.4e110),
            effect() {
                let base = player.points.max(1).log(2).max(1).log(2).max(1)
                let expo = player.sbooster.points.pow(1.125)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade('dv', 62)}
       	},
        64: {
	        title: "DIEmension Upgrade C4",
        	description: "Multiply DP gain by <b>🆎 C-Boosts</b>' eff, Divide DV's cost by DV's eff, Reduce Decaying Rate to 8%",
            currencyDisplayName: "DP",
            currencyLayer: "dv",
            currencyInternalName: "dedpow",
            currencyLocation() {return player.dv},
            cost: new Decimal (4.5e160),
            unlocked() {return hasUpgrade('dv', 63)}
       	},
        65: {
	        title: "DIEmension Upgrade C5",
        	description: "Multiply DP gain by Factor of All [bought DDs+2], Multiply Ex. 🆎 gain by <b>Accelerators</b>' Effect",
            currencyDisplayName: "DP",
            currencyLayer: "dv",
            currencyInternalName: "dedpow",
            currencyLocation() {return player.dv},
            cost: new Decimal (1.111e217),
            effect() {
                let base = getBuyableAmount('dv', 11).max(0).add(2).times(getBuyableAmount('dv', 12).max(0).add(2)).times(getBuyableAmount('dv', 13).max(0).add(2)).times(getBuyableAmount('dv', 21).max(0).add(2)).times(getBuyableAmount('dv', 22).max(0).add(2)).times(getBuyableAmount('dv', 23).max(0).add(2))
                let expo = new Decimal (1)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade('dv', 64)}
       	},
        71: {
	        title: "DIEmension Upgrade D1",
        	description: "Multiply DP gain by Unspent MP, Multiply Point gain cap based on Point gain cap.",
            currencyDisplayName: "DP",
            currencyLayer: "dv",
            currencyInternalName: "dedpow",
            currencyLocation() {return player.dv},
            tooltip() {return "Effect Formula:<br>(ln(ln[Point gain cap]))<sup>32</sup>"},
            cost: new Decimal (1.5e241),
            effect() {
                let base = getPointCap().max(1).ln().max(1).ln().max(1)
                let expo = new Decimal (32)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade('dv', 65)}
       	},
        72: {
	        title: "DIEmension Upgrade D2",
        	description: "Cookie gives you some good boosts :D, Multiply Ex. 🆎 and DP gain by 6,268, Raise Point gain cap based on Points",
            currencyDisplayName: "DP",
            currencyLayer: "dv",
            currencyInternalName: "dedpow",
            currencyLocation() {return player.dv},
            tooltip() {return "Effect Formula:<br>(slog[Points])<sup>0.2</sup>"},
            cost: new Decimal (2.828e249),
            effect() {
                let base = player.points.max(1).slog().max(1)
                let expo = new Decimal (0.2)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() { return "^"+format(upgradeEffect(this.layer, this.id))},
            unlocked() {return hasUpgrade('dv', 71)}
       	},
        73: {
	        title: "DIEmension Upgrade D3",
        	description: "Multiply DD1 Eff by log<sub>2</sub>[DP], Multiply DD2 Eff by log<sub>2</sub>[DD1 Amt], Multiply DD3 Eff by log<sub>2</sub>[DD2 Amt].",
            currencyDisplayName: "DP",
            currencyLayer: "dv",
            currencyInternalName: "dedpow",
            currencyLocation() {return player.dv},
            cost: new Decimal (2.828e258),
            unlocked() {return hasUpgrade('dv', 72)}
       	},
        74: {
	        title: "DIEmension Upgrade D4",
        	description: "Multiply DD4 Eff by log<sub>2</sub>[DD3 Amt], Multiply DD5 Eff by log<sub>2</sub>[DD4 Amt], Multiply DD6 Eff by log<sub>2</sub>[DD5 Amt] but disable <b>DI-U A5</b>'s First Eff.",
            currencyDisplayName: "DP",
            currencyLayer: "dv",
            currencyInternalName: "dedpow",
            currencyLocation() {return player.dv},
            cost: new Decimal (4.646e276),
            unlocked() {return hasUpgrade('dv', 73)}
       	},
        75: {
	        title: "DIEmension Upgrade D5",
        	description: "Multiply DP gain based on amogus, Multiply amogus gain based on DP.",
            currencyDisplayName: "DP",
            currencyLayer: "dv",
            currencyInternalName: "dedpow",
            currencyLocation() {return player.dv},
            tooltip() {return "Effect Formula:<br>(log<sub>10</sub>[amogus])<sup>1.25</sup>,<br>(log<sub>10</sub>[DP])<sup>5</sup>"},
            cost: new Decimal (1.125e293),
            effect() {
                let base = player.amogus.points.max(1).log(10).max(1)
                let expo = new Decimal (1.25)
                let eff = base.pow(expo)
                let base2 = player.dv.dedpow.max(1).log(10).max(1)
                let expo2 = new Decimal (5)
                let eff2 = base2.pow(expo2)
                return {
                    DP: eff,
                    AM: eff2,
                }
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id).DP)+"x, "+format(upgradeEffect(this.layer, this.id).AM)+"x"},
            unlocked() {return hasUpgrade('dv', 74)}
       	},
    },
    buyables: {
        11: {
            title: "1st Deadly DIEmension",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color" : "#0000C0"
                }
            },
            unlocked() {
                return hasUpgrade('dv', 35)
            },
            cost(x) {
                let base = new Decimal (10)
                let base2 = new Decimal (4)
                let expo = new Decimal (1.25)
                return base.times(base2.pow(x.sub(1).pow(expo))).times(x.min(1))
            },
            tooltip() {
                return "Cost Formula:<br>10*4<sup>(x-1)<sup>1.25</sup></sup>"
            },
            display() {
                return "Generating "+format(this.effect().Ef)+" Deadly Power per second<br>Cost: "+format(this.cost())+" Deadly Power<br>Multiplier: " + format(this.effect().Mult)+"x<br>Amount: " + format(player[this.layer].dd1) + " (" + formatWhole(getBuyableAmount(this.layer, this.id)) + ")"
            },
            canAfford() {
                return player[this.layer].dedpow.gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                if (hasMilestone('infection', 1)) cost = new Decimal (0)
                player[this.layer].dedpow = player[this.layer].dedpow.sub(this.cost().times(cost))
                player[this.layer].dd4 = player[this.layer].dd4.add(1)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let prod = player[this.layer].dd1
                let mult = new Decimal(2)
                if (hasUpgrade('infection', 21)) mult = new Decimal (2.05)
                let expo = x.max(0)
                let currmult = mult.pow(expo)
                currmult = currmult.times(buyableEffect('dv', 32).pow(getBuyableAmount('dv', 32).add(tmp.dv.buyables[32].freelvl)))
                let eff1 = prod.times(currmult)
                eff1 = eff1.times(buyableEffect('dv', 31).Ef)
                if (hasMilestone('amogus', 0)) eff1 = eff1.times(player.amogus.AB.max(1).log(20).max(1))
                if (hasUpgrade('dv', 41)) eff1 = eff1.times(upgradeEffect('dv', 41))
                if (hasUpgrade('dv', 42)) eff1 = eff1.times(upgradeEffect('dv', 42))
                if (hasUpgrade('dv', 43)) eff1 = eff1.times(upgradeEffect('dv', 43).DP)
                if (hasUpgrade('dv', 44)) eff1 = eff1.times(upgradeEffect('dv', 44).DP)
                if (hasUpgrade('dv', 45)) eff1 = eff1.times(player.goal.points.pow(hasUpgrade('dv', 74) ? 0 : 1))
                if (hasUpgrade('dv', 51)) eff1 = eff1.times(buyableEffect('chess', 11).MP)
                if (hasUpgrade('dv', 52)) eff1 = eff1.times(upgradeEffect('dv', 52))
                if (hasUpgrade('dv', 54)) eff1 = eff1.times(upgradeEffect('dv', 54).DP)
                if (hasUpgrade('dv', 55)) eff1 = eff1.times(upgradeEffect('dv', 55))
                if (hasUpgrade('dv', 61)) eff1 = eff1.times(upgradeEffect('dv', 61).DP)
                if (hasUpgrade('dv', 62)) eff1 = eff1.times(upgradeEffect('dv', 62))
                if (hasUpgrade('dv', 64)) eff1 = eff1.times(buyableEffect('amogus', 21).Ef1)
                if (hasUpgrade('dv', 65)) eff1 = eff1.times(upgradeEffect('dv', 65))
                if (hasUpgrade('dv', 71)) eff1 = eff1.times(Decimal.sub(buyableEffect('chess', 11).MP, player.chess.spentMP))
                if (hasUpgrade('dv', 72)) eff1 = eff1.times(6268)
                if (hasUpgrade('dv', 73)) eff1 = eff1.times(player.dv.dedpow.max(1).log(2).max(1))
                if (hasUpgrade('dv', 75)) eff1 = eff1.times(upgradeEffect('dv', 75).DP)
                if (hasMilestone('dv', 8)) eff1 = eff1.times(Decimal.pow(1.25, player.dv.points))
                if (hasMilestone('dv', 11)) eff1 = eff1.times(Decimal.pow(getBuyableAmount('dv', 33).add(1).max(1), getBuyableAmount('dv', 33).add(1).max(0)))
                eff1 = eff1.times(tmp.infection.effect.D)
                if (hasMilestone('infection', 0)) eff1 = eff1.times(Decimal.pow(2.5, new Decimal (player.infection.milestones.length)))
                if (hasMilestone('antigh', 3)) eff1 = eff1.times(Decimal.pow(3, new Decimal (player.antigh.best.max(0))))
                if (hasUpgrade('antiamogus', 15)) eff1 = eff1.times(upgradeEffect('antiamogus', 15))
                if (hasUpgrade('antip', 15)) eff1 = eff1.times(upgradeEffect('antip', 15))
                if (hasUpgrade('antic', 15)) eff1 = eff1.times(player.antiamogus.level.max(1))
                if (hasUpgrade('antiamogus', 45)) eff1 = eff1.times(upgradeEffect('antiamogus', 45))
                if (hasUpgrade('infection', 31)) eff1 = eff1.times(upgradeEffect('infection', 31))
                eff1 = eff1.times(buyableEffect('chess', 71).Ef)
                eff1 = eff1.times(buyableEffect('chess', 72).Ef)
                if (hasMilestone('infection', 6)) eff1 = eff1.times(getBuyableAmount('infection', 12).max(0).add(1))
                if (hasMilestone('infection', 6)) eff1 = eff1.times(Decimal.pow(10, new Decimal(player.infection.milestones.length).max(0)))
                eff1 = eff1.times(tmp.antigh.effect.D)
                if (inChallenge('infection', 11)) eff1 = new Decimal (0)
                return {
                    Mult: currmult,
                    Ef: eff1,
                }
            },
        },
        12: {
            title: "2nd Deadly DIEmension",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color" : "#0000C0"
                }
            },
            unlocked() {
                return hasUpgrade('dv', 35)
            },
            cost(x) {
                let base = new Decimal (1750)
                let base2 = new Decimal (8)
                let expo = new Decimal (1.25)
                return base.times(base2.pow(x.pow(expo)))
            },
            tooltip() {
                return "Cost Formula:<br>1,750*8<sup>x<sup>1.25</sup></sup>"
            },
            display() {
                return "Generating "+format(this.effect().Ef)+" 1st Deadly Dimensions per second<br>Cost: "+format(this.cost())+" Deadly Power<br>Multiplier: " + format(this.effect().Mult)+"x<br>Amount: " + format(player[this.layer].dd2) + " (" + formatWhole(getBuyableAmount(this.layer, this.id)) + ")"
            },
            canAfford() {
                return player[this.layer].dedpow.gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                if (hasMilestone('infection', 1)) cost = new Decimal (0)
                player[this.layer].dedpow = player[this.layer].dedpow.sub(this.cost().times(cost))
                player[this.layer].dd4 = player[this.layer].dd4.add(1)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let prod = player[this.layer].dd2
                let mult = new Decimal(2)
                if (hasUpgrade('infection', 21)) mult = new Decimal (2.05)
                let expo = x.max(0)
                let currmult = mult.pow(expo)
                currmult = currmult.times(buyableEffect('dv', 32).pow((getBuyableAmount('dv', 32)).add(tmp.dv.buyables[32].freelvl).sub(1).max(0)))
                let eff1 = prod.times(currmult)
                eff1 = eff1.times(buyableEffect('dv', 31).Ef)
                if (hasUpgrade('dv', 73)) eff1 = eff1.times(player.dv.dd1.max(1).log(2).max(1))
                eff1 = eff1.times(buyableEffect('chess', 72).Ef)
                return {
                    Mult: currmult,
                    Ef: eff1,
                }
            },
        },
        13: {
            title: "3rd Deadly DIEmension",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color" : "#0000C0"
                }
            },
            unlocked() {
                return hasUpgrade('dv', 35)
            },
            cost(x) {
                let base = new Decimal (3e7)
                let base2 = new Decimal (32)
                let expo = new Decimal (1.25)
                return base.times(base2.pow(x.pow(expo)))
            },
            tooltip() {
                return "Cost Formula:<br>30,000,000*32<sup>x<sup>1.25</sup></sup>"
            },
            display() {
                return "Generating "+format(this.effect().Ef)+" 2nd Deadly Dimensions per second<br>Cost: "+format(this.cost())+" Deadly Power<br>Multiplier: " + format(this.effect().Mult)+"x<br>Amount: " + format(player[this.layer].dd3) + " (" + formatWhole(getBuyableAmount(this.layer, this.id)) + ")"
            },
            canAfford() {
                return player[this.layer].dedpow.gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                if (hasMilestone('infection', 1)) cost = new Decimal (0)
                player[this.layer].dedpow = player[this.layer].dedpow.sub(this.cost().times(cost))
                player[this.layer].dd4 = player[this.layer].dd4.add(1)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
            effect(x) {
                let prod = player[this.layer].dd3
                let mult = new Decimal(2)
                if (hasUpgrade('infection', 21)) mult = new Decimal (2.05)
                let expo = x.max(0)
                let currmult = mult.pow(expo)
                currmult = currmult.times(buyableEffect('dv', 32).pow((getBuyableAmount('dv', 32)).add(tmp.dv.buyables[32].freelvl).sub(2).max(0)))
                let eff1 = prod.times(currmult)
                eff1 = eff1.times(buyableEffect('dv', 31).Ef)
                if (hasUpgrade('dv', 73)) eff1 = eff1.times(player.dv.dd2.max(1).log(2).max(1))
                eff1 = eff1.times(buyableEffect('chess', 72).Ef)
                return {
                    Mult: currmult,
                    Ef: eff1,
                }
            },
        },
        21: {
            title: "4th Deadly DIEmension",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color" : "#0000C0"
                }
            },
            unlocked() {
                return hasUpgrade('dv', 35)&&getBuyableAmount('dv', 32).add(tmp.dv.buyables[32].freelvl).gte(1)
            },
            cost(x) {
                let base = new Decimal (9e12)
                let base2 = new Decimal (256)
                let expo = new Decimal (1.25)
                return base.times(base2.pow(x.pow(expo)))
            },
            tooltip() {
                return "Cost Formula:<br>"+format(9e12)+"*256<sup>x<sup>1.25</sup></sup>"
            },
            display() {
                return "Generating "+format(this.effect().Ef)+" 3rd Deadly Dimensions per second<br>Cost: "+format(this.cost())+" Deadly Power<br>Multiplier: " + format(this.effect().Mult)+"x<br>Amount: " + format(player[this.layer].dd4) + " (" + formatWhole(getBuyableAmount(this.layer, this.id)) + ")"
            },
            canAfford() {
                return player[this.layer].dedpow.gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                if (hasMilestone('infection', 1)) cost = new Decimal (0)
                player[this.layer].dedpow = player[this.layer].dedpow.sub(this.cost().times(cost))
                player[this.layer].dd4 = player[this.layer].dd4.add(1)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let prod = player[this.layer].dd4
                let mult = new Decimal(2)
                if (hasUpgrade('infection', 21)) mult = new Decimal (2.05)
                let expo = x.max(0)
                let currmult = mult.pow(expo)
                currmult = currmult.times(buyableEffect('dv', 32).pow((getBuyableAmount('dv', 32)).add(tmp.dv.buyables[32].freelvl).sub(3).max(0)))
                let eff1 = prod.times(currmult)
                eff1 = eff1.times(buyableEffect('dv', 31).Ef)
                if (hasUpgrade('dv', 74)) eff1 = eff1.times(player.dv.dd3.max(1).log(2).max(1))
                eff1 = eff1.times(buyableEffect('chess', 72).Ef)
                if (!getBuyableAmount('dv', 32).add(tmp.dv.buyables[32].freelvl).gte(1)) eff1 = new Decimal (0)
                return {
                    Mult: currmult,
                    Ef: eff1,
                }
            },
        },
        22: {
            title: "5th Deadly DIEmension",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color" : "#0000C0"
                }
            },
            unlocked() {
                return hasUpgrade('dv', 35)&&getBuyableAmount('dv', 32).add(tmp.dv.buyables[32].freelvl).gte(2)
            },
            cost(x) {
                let base = new Decimal (1e24)
                let base2 = new Decimal (4096)
                let expo = new Decimal (1.25)
                return base.times(base2.pow(x.pow(expo)))
            },
            tooltip() {
                return "Cost Formula:<br>"+format(1e24)+"*4,096<sup>x<sup>1.25</sup></sup>"
            },
            display() {
                return "Generating "+format(this.effect().Ef)+" 4th Deadly Dimensions per second<br>Cost: "+format(this.cost())+" Deadly Power<br>Multiplier: " + format(this.effect().Mult)+"x<br>Amount: " + format(player[this.layer].dd5) + " (" + formatWhole(getBuyableAmount(this.layer, this.id)) + ")"
            },
            canAfford() {
                return player[this.layer].dedpow.gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                if (hasMilestone('infection', 1)) cost = new Decimal (0)
                player[this.layer].dedpow = player[this.layer].dedpow.sub(this.cost().times(cost))
                player[this.layer].dd5 = player[this.layer].dd5.add(1)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let prod = player[this.layer].dd5
                let mult = new Decimal(2)
                if (hasUpgrade('infection', 21)) mult = new Decimal (2.05)
                let expo = x.max(0)
                let currmult = mult.pow(expo)
                currmult = currmult.times(buyableEffect('dv', 32).pow((getBuyableAmount('dv', 32)).add(tmp.dv.buyables[32].freelvl).sub(4).max(0)))
                let eff1 = prod.times(currmult)
                eff1 = eff1.times(buyableEffect('dv', 31).Ef)
                if (hasUpgrade('dv', 74)) eff1 = eff1.times(player.dv.dd4.max(1).log(2).max(1))
                eff1 = eff1.times(buyableEffect('chess', 72).Ef)
                if (!getBuyableAmount('dv', 32).add(tmp.dv.buyables[32].freelvl).gte(2)) eff1 = new Decimal (0)
                return {
                    Mult: currmult,
                    Ef: eff1,
                }
            },
        },
        23: {
            title: "6th Deadly DIEmension",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color" : "#0000C0"
                }
            },
            unlocked() {
                return hasUpgrade('dv', 35)&&getBuyableAmount('dv', 32).add(tmp.dv.buyables[32].freelvl).gte(3)
            },
            cost(x) {
                let base = new Decimal (2e53)
                let base2 = new Decimal (131072)
                let expo = new Decimal (1.25)
                return base.times(base2.pow(x.pow(expo)))
            },
            tooltip() {
                return "Cost Formula:<br>"+format(2e53)+"*131,072<sup>x<sup>1.25</sup></sup>"
            },
            display() {
                return "Generating "+format(this.effect().Ef)+" 5th Deadly Dimensions per second<br>Cost: "+format(this.cost())+" Deadly Power<br>Multiplier: " + format(this.effect().Mult)+"x<br>Amount: " + format(player[this.layer].dd6) + " (" + formatWhole(getBuyableAmount(this.layer, this.id)) + ")"
            },
            canAfford() {
                return player[this.layer].dedpow.gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                if (hasMilestone('infection', 1)) cost = new Decimal (0)
                player[this.layer].dedpow = player[this.layer].dedpow.sub(this.cost().times(cost))
                player[this.layer].dd6 = player[this.layer].dd6.add(1)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let prod = player[this.layer].dd6
                let mult = new Decimal(2)
                if (hasUpgrade('infection', 21)) mult = new Decimal (2.05)
                let expo = x.max(0)
                let currmult = mult.pow(expo)
                currmult = currmult.times(buyableEffect('dv', 32).pow((getBuyableAmount('dv', 32)).add(tmp.dv.buyables[32].freelvl).sub(5).max(0)))
                let eff1 = prod.times(currmult)
                eff1 = eff1.times(buyableEffect('dv', 31).Ef)
                if (hasUpgrade('dv', 74)) eff1 = eff1.times(player.dv.dd5.max(1).log(2).max(1))
                eff1 = eff1.times(buyableEffect('chess', 72).Ef)
                if (!getBuyableAmount('dv', 32).add(tmp.dv.buyables[32].freelvl).gte(3)) eff1 = new Decimal (0)
                return {
                    Mult: currmult,
                    Ef: eff1,
                }
            },
        },
        31: {
            title: "Accelerator",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color" : "#0000C0"
                }
            },
            unlocked() {
                return hasUpgrade('dv', 35)
            },
            cost(x) {
                let base = new Decimal (100)
                let base2 = new Decimal (10)
                let expo = new Decimal (1.25)
                return base.times(base2.pow(x.pow(expo)))
            },
            tooltip() {
                return "Cost Formula:<br>100*10<sup>x<sup>1.25</sup></sup>"
            },
            display() {
                return "Multiply all DIEmensions' speed by "+format(this.effect().Mult)+"<br>Cost: "+format(this.cost())+" Deadly Power<br>Multiplier: " + format(this.effect().Ef)+"x<br>Amount: " + formatWhole(getBuyableAmount(this.layer, this.id))
            },
            canAfford() {
                return player[this.layer].dedpow.gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                if (hasMilestone('infection', 1)) cost = new Decimal (0)
                player[this.layer].dedpow = player[this.layer].dedpow.sub(this.cost().times(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let mult = new Decimal (1.125)
                mult = mult.add(buyableEffect('dv', 33).M)
                let expo = x.max(0)
                let currmult = mult.pow(expo)
                return {
                    Mult: mult,
                    Ef: currmult,
                }
            },
        },
        32: {
            title() {
                let base = "DIEmension Shift"
                if (getBuyableAmount(this.layer, this.id).add(this.freelvl()).gte(3)) base = "DIEmension Boost"
                if ((getBuyableAmount(this.layer, this.id).gte(10))&&hasUpgrade('amogus', 55)) base = "Scaled DIEmension Boost"
                return base
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color" : "#0000C0"
                }
            },
            unlocked() {
                return hasUpgrade('dv', 35)
            },
            cost(x) {
                let base = new Decimal (3).add(x)
                if (hasUpgrade('amogus', 55)&&(x.gte(10))) base = base.add(Decimal.times(x.sub(8), x.sub(9)).div(2))
                return base
            },
            tooltip() {
                return "Cost Formula:<br>x+3"
            },
            display() {
                let lengthdim = ""
                if (getBuyableAmount(this.layer, this.id).add(tmp.dv.buyables[32].freelvl).gte(1)) lengthdim = "-" + getBuyableAmount(this.layer, this.id).add(tmp.dv.buyables[32].freelvl).add(1).min(6)
                let unlock = " and Unlock a new DIEmension.<br>"
                if (getBuyableAmount(this.layer, this.id).add(tmp.dv.buyables[32].freelvl).gte(3)) unlock = ""
                let dimtype = ["3rd DIEmension", "4th DIEmension", "5th DIEmension", "6th DIEmension"][getBuyableAmount(this.layer, this.id).min(3)]
                let freelvl = this.freelvl()
                let limit = new Decimal (10)
                if (hasUpgrade('amogus', 55)) limit = limit.add(5)
                if (this.freelvl().gte(1)) return "Reset DIEmensions and Accerlerators, Multiply DIEmension 1"+lengthdim+" by "+format(this.effect())+"<br>"+unlock+"Cost: "+formatWhole(this.cost())+" "+dimtype+"<br>Amount: " + formatWhole(getBuyableAmount(this.layer, this.id))+"+"+formatWhole(freelvl)+" (Can only be bought "+ formatWhole(limit) +" times)"
                return "Reset DIEmensions and Accerlerators, Multiply DIEmension 1"+lengthdim+" by "+format(this.effect())+"<br>"+unlock+"Cost: "+formatWhole(this.cost())+" "+dimtype+"<br>Amount: " + formatWhole(getBuyableAmount(this.layer, this.id))+" (Can only be bought "+ formatWhole(limit) +" times)"
            },
            canAfford() {
                let dimtype = [getBuyableAmount('dv', 13), getBuyableAmount('dv', 21), getBuyableAmount('dv', 22), getBuyableAmount('dv', 23)][getBuyableAmount(this.layer, this.id).min(3)]
                let limit = new Decimal (10)
                if (hasUpgrade('amogus', 55)) limit = limit.add(5)
                return dimtype.gte(this.cost())&&(!getBuyableAmount(this.layer, this.id).gte(limit))
            },
            freelvl(){
                let base = new Decimal (0)
                if (hasMilestone('dv', 9)) base = base.add(new Decimal (player[this.layer].milestones.length))
                if (inChallenge('infection', 12)) base = new Decimal (0)
                return base
            },
            buy() {
                if (!hasMilestone('infection', 2)) {player[this.layer].dedpow = new Decimal (0)
                player[this.layer].dd1 = new Decimal (0)
                player[this.layer].dd2 = new Decimal (0)
                player[this.layer].dd3 = new Decimal (0)
                player[this.layer].dd4 = new Decimal (0)
                player[this.layer].dd5 = new Decimal (0)
                player[this.layer].dd6 = new Decimal (0)
                setBuyableAmount(this.layer, 11, new Decimal (0))
                setBuyableAmount(this.layer, 12, new Decimal (0))
                setBuyableAmount(this.layer, 13, new Decimal (0))
                setBuyableAmount(this.layer, 21, new Decimal (0))
                setBuyableAmount(this.layer, 22, new Decimal (0))
                setBuyableAmount(this.layer, 23, new Decimal (0))
                setBuyableAmount(this.layer, 31, new Decimal (0))}
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let mult = new Decimal (2)
                if ((hasMilestone('infection', 7)&&(!inChallenge('infection', 12)))) mult = new Decimal (2.05)
                return mult
            },
        },
        33: {
            title: "Deadly Orb",
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color" : "#0000C0"
                }
            },
            unlocked() {
                return hasUpgrade('dv', 35)
            },
            cost(x) {
                let base = new Decimal (6).add(x.pow(2))
                if (hasMilestone('antiamogus', 0)) base = base.sub(1)
                if (inChallenge('infection', 12)) base = Decimal.dInf
                return base.floor()
            },
            purchaseLimit() {
                let base = new Decimal (5)
                if (hasMilestone('infection', 6)) base = base.add(getBuyableAmount('infection', 12).sub(5).max(0))
                return base
            },
            tooltip() {
                return "Cost Formula:<br>x<sup>2</sup>+6"
            },
            display() {
                return "Reset everything DIEmension Shift/Boost does including DIEmension Shift/Boost, Increase Accelerator's base"+" by "+format(this.effect().B)+"<br>Cost: "+formatWhole(this.cost())+" 6th DIEmemsions<br>Effect: +"+format(this.effect().M)+"<br>Amount: " + formatWhole(getBuyableAmount(this.layer, this.id))+"/"+formatWhole(this.purchaseLimit())
            },
            canAfford() {
                return getBuyableAmount('dv', 23).gte(this.cost())&&(!getBuyableAmount(this.layer, this.id).gte(6))
            },
            buy() {
                if (!hasMilestone('infection', 2)){player[this.layer].dedpow = new Decimal (0)
                player[this.layer].dd1 = new Decimal (0)
                player[this.layer].dd2 = new Decimal (0)
                player[this.layer].dd3 = new Decimal (0)
                player[this.layer].dd4 = new Decimal (0)
                player[this.layer].dd5 = new Decimal (0)
                player[this.layer].dd6 = new Decimal (0)
                setBuyableAmount(this.layer, 11, new Decimal (0))
                setBuyableAmount(this.layer, 12, new Decimal (0))
                setBuyableAmount(this.layer, 13, new Decimal (0))
                setBuyableAmount(this.layer, 21, new Decimal (0))
                setBuyableAmount(this.layer, 22, new Decimal (0))
                setBuyableAmount(this.layer, 23, new Decimal (0))
                setBuyableAmount(this.layer, 31, new Decimal (0))
                setBuyableAmount(this.layer, 32, new Decimal (0))}
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base = new Decimal (0.015)
                if (hasMilestone('dv', 11)) base = base.add(getBuyableAmount('dv', 33).sub(5).max(0).div(1e3))
                let mult = base.times(x)
                return {
                    B: base,
                    M: mult
                }
            },
        },
    },
    milestones: {
        0: {
            requirementDescription: "1 deadly virus",
                done() {return player[this.layer].best.gte(1)},
                effectDescription: "Keep chess challenges on reset.",
            },
        1: {
                requirementDescription: "2 deadly virus",
                    done() {return player[this.layer].best.gte(2)},
                    effectDescription: "Keep chess upgrades on reset.",
            },
        2: {
                requirementDescription: "3 deadly virus",
                    done() {return player[this.layer].best.gte(3)},
                    effectDescription: "Keep <b>Material Points</b> and Pieces Choice on reset.",
            },
        3: {
                requirementDescription: "5 deadly virus",
                    done() {return player[this.layer].best.gte(5)},
                    effectDescription: "Reduce <b>🆎 Charged Boosters</b>' cost exponent to 1.9, Multiply chess gain by 10 per milestone.",
            },
        4: {
                requirementDescription: "24 deadly virus",
                    done() {return player[this.layer].best.gte(24)},
                    effectDescription: "Ex. Req. scales even less for each <b>🆎 Exors</b>, Multiply Point gain cap by Ex. 🆎.",
            },
        5: {
                requirementDescription: "35 deadly virus",
                    done() {return player[this.layer].best.gte(35)},
                    effectDescription: "Keep S-Boosters upgrades.",
            },
        6: {
                requirementDescription: "50 deadly virus",
                    done() {return player[this.layer].best.gte(50)},
                    unlocked() {return hasUpgrade('dv', 35)},
                    effectDescription: "Deadly Virus reset nothing, Multiply Point gain cap by DP.",
            },
        7: {
                requirementDescription: "69 deadly virus",
                    done() {return player[this.layer].best.gte(69)},
                    unlocked() {return hasUpgrade('dv', 35)},
                    effectDescription() {return "Multiply Both <b>🆎 Gens</b>' Eff base by "+format(player.dv.dedpow.max(1).ln().max(1).ln().max(1))+" (based on DP), Reduce Deadly Virus' Cost base from 10,000 to 1,000."},
                    tooltip() {return "Formula: <br>ln(ln[DP])"},
            },
        8: {
                requirementDescription: "101 deadly virus",
                    done() {return player[this.layer].best.gte(101)},
                    unlocked() {return hasUpgrade('dv', 35)},
                    effectDescription() {return "Multiply DP gain by 1.25 per DV, Raise Point gain cap to the 1.05th power"},
            },
        9: {
                requirementDescription() {return format(1.897e172)+" DP"},
                    done() {return player[this.layer].dedpow.gte(1.897e172)},
                    unlocked() {return hasUpgrade('dv', 35)},
                    effectDescription() {return "Gain a free DS/DBs per Milestone"},
            },
        10: {
                requirementDescription: "191 deadly virus",
                    done() {return player[this.layer].best.gte(191)},
                    unlocked() {return hasUpgrade('dv', 35)},
                    effectDescription() {return "Multiply Point gain cap by "+format(player.chess.points.max(1).ln().max(1).pow(5))+" (based on chess points) per Milestone, Reduce Decaying Rate to 5%"},
                    tooltip() {return "Formula: <br>ln[chess points]<sup>5</sup>"},
            },
        11: {
                requirementDescription: "6 Deadly Orbs",
                    done() {return getBuyableAmount('dv', 33).gte(6)},
                    unlocked() {return hasMilestone('infection', 6)},
                    effectDescription() {return "Add 0.0010 to Deadly Orbs' base per Deadly Orbs starting at 6, Multiply DP by DO+1 per DO+1, Currently: +"+format(getBuyableAmount('dv', 33).sub(5).max(0).div(1e3))+", "+format(Decimal.pow(getBuyableAmount('dv', 33).max(1), getBuyableAmount('dv', 33).add(1).max(0)))+"x"},
            },
    },
    bars: {
        1: {
            direction: RIGHT,
            width: 500,
            height: 50,
            progress() {return player.dv.dedpow.max(1).log("1.8e308").min(1)},
            display() {return "Progress till "+format("1.8e308")+" DP<br>"+ format(player.dv.dedpow.max(1).log("1.8e308").times(100).min(100))+"%/100.000%"},
            instant: false,
            fillStyle: {'background-color' : "#000080"},
            baseStyle: {'background-color' : "#000000"},
        },
    },
    clickables: {
        11: {
            title: "Hold to Do a deadly virus reset",
            display(){
                return ""
            },
            unlocked() {return true},
            canClick() {return true},
            onHold() {if (canReset(this.layer)) doReset(this.layer)},
            style: {"background-color"(){
                let color = "#000090"
                return color
            }},
        },
    },
    update(diff) {
        let dedlim = new Decimal ("1.8e308")
        if (hasMilestone('infection', 4)) dedlim = new Decimal ("2e1024")
        if (!player.dv.dedpow.gte(dedlim)) {
            if (player.dv.dd1.gte(1)) {
            let dploserate = player.dv.dedpow.times(tmp.dv.getDecayingRate)
            player.dv.dedpow = player.dv.dedpow.sub(dploserate.times(diff)).add((buyableEffect('dv', 11).Ef).times(diff)).max(0).min(dedlim)
        }
            let dd1loserate = player.dv.dd1.times(tmp.dv.getDecayingRate)
            player.dv.dd1 = player.dv.dd1.sub(dd1loserate.times(diff)).add((buyableEffect('dv', 12).Ef).times(diff)).max(getBuyableAmount('dv', 11))
            let dd2loserate = player.dv.dd2.times(tmp.dv.getDecayingRate)
            player.dv.dd2 = player.dv.dd2.sub(dd2loserate.times(diff)).add((buyableEffect('dv', 13).Ef).times(diff)).max(getBuyableAmount('dv', 12))
            let dd3loserate = player.dv.dd3.times(tmp.dv.getDecayingRate)
            player.dv.dd3 = player.dv.dd3.sub(dd3loserate.times(diff)).add((buyableEffect('dv', 21).Ef).times(diff)).max(getBuyableAmount('dv', 13))
            let dd4loserate = player.dv.dd4.times(tmp.dv.getDecayingRate)
            player.dv.dd4 = player.dv.dd4.sub(dd4loserate.times(diff)).add((buyableEffect('dv', 22).Ef).times(diff)).max(getBuyableAmount('dv', 21))
            let dd5loserate = player.dv.dd5.times(tmp.dv.getDecayingRate)
            player.dv.dd5 = player.dv.dd5.sub(dd5loserate.times(diff)).add((buyableEffect('dv', 23).Ef).times(diff)).max(getBuyableAmount('dv', 22))
        }
    },
})
addLayer("infection", {
    name: "infection", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "INF", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal (0),
        ad: new Decimal (15),
    }},
    tooltip() {
       let base = formatWhole(player.infection.points)+" infected points"
       return base
    },
    color: "#0000D0",
    requires: new Decimal ("1.8e308"), // Can be a function that takes requirement increases into account
    resource: "infected points", // Name of prestige currency
    baseResource: "DP", // Name of resource prestige is based on
    baseAmount() {return player.dv.dedpow}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1/(new Decimal (2).log(10).times(512)), // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal (1)
        mult = mult.times(buyableEffect(this.layer, 11).Ef)
        if (hasUpgrade('booster', 55)) mult = mult.times(upgradeEffect('booster', 55))
        if (player.difficulty.staticResBoost) mult = mult.times(2)
        mult = mult.times(buyableEffect('antiamogus', 22).Ef)
        if (hasMilestone('infection', 12)) mult = mult.times(getBuyableAmount('dv', 33).max(0).add(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        expo = new Decimal (1)
        return expo
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    layerShown() {
        return (player.dv.dedpow).gte("1.8e308")||player[this.layer].unlocked
    },
    doReset(l) {
        if (!(layers[l].row > this.row)) return
        
        let keep = []
        
        layerDataReset(this.layer, keep)
    },
    DePtsCap() {
        let base = new Decimal (1e9)
        if (hasUpgrade('antiamogus', 54)) base = new Decimal (1e20)
        return base
    },
    hotkeys: [
        {key: "D", description: "Shift+D: Reset for Infected Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches: ['dv'],
    passiveGeneration() {
        let passive = 0
        return passive
    },
    effect() {
        return {
            D: new Decimal (2).pow(player.infection.best.add(1).max(1).log(10)),
            PC: new Decimal (1.05).pow(player[this.layer].best.add(1).max(1).log(10).pow(0.5)).min(2)
        }
    },
    effectDescription() {
        return "translated to a " + format(tmp[this.layer].effect.D) + "x boost to DP gain and a ^" + format(tmp[this.layer].effect.PC) + " boost to point gain cap (based on best IP)"
    },
    tabFormat: {
        "Upgrades": {
            unlocked(){return true},
            content:[
                "main-display",
                "blank",
                ["prestige-button", "", function (){ return false ? {'display': 'none'} : {}}],
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
        "Buyables": {
            unlocked(){return true},
            content:[
                "main-display",
                "blank",
                ["prestige-button", "", function (){ return false ? {'display': 'none'} : {}}],
                "blank",
                "resource-display",
                "blank",
                "blank",
                "buyables"
            ]
        },
        "Milestones": {
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
        "Decelarator": {
            unlocked(){return hasMilestone('infection', 3)},
            content:[
                "main-display",
                "blank",
                ["prestige-button", "", function (){ return false ? {'display': 'none'} : {}}],
                "blank",
                "resource-display",
                "blank",
                "blank",
                ["challenge", 11]
            ]
        },
        "Anti-Deadly": {
            unlocked(){return hasMilestone('antip', 4)},
            content:[
                "main-display",
                "blank",
                ["prestige-button", "", function (){ return false ? {'display': 'none'} : {}}],
                "blank",
                "resource-display",
                "blank",
                "blank",
                ["challenge", 12],
                "blank",
                ["display-text",
                function() {
                    return "Your least DIEmensions Boosts/Shifts is "+formatWhole(player.infection.ad)
                }],
            ]
        },
    },
    upgrades: {
        11: {
	        title: "Infected Upgrade A1",
        	description: "Multiply your point gain cap after everything based on best IP.",
            effect() {
                let base = player[this.layer].best.max(1).add(1).log(2).add(1).pow(5)
                let pow = new Decimal (1)
                if (hasUpgrade('infection', 21)) pow = pow.times(3)
                return base.pow(pow)
            },
            tooltip() {
                return "Effect Formula:<br>(log<sub>2</sub>[IP+1]+1)<sup>5</sup>"
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"},
            unlocked() {return hasMilestone(this.layer, 0)},
         	cost: new Decimal (1),
       	},
        12: {
	        title: "Infected Upgrade A2",
        	description: "Raise amogus gain to the 1.1th power.",
            unlocked() {return hasMilestone(this.layer, 0)},
         	cost: new Decimal (1),
       	},
        13: {
	        title: "Infected Upgrade A3",
        	description: "Divide <b>Mat. Points.</b>' Cost based on unspent IP",
            effect() {
                let base = Decimal.pow(10, player[this.layer].points.max(0).add(1).log(10).add(1).pow(0.4).add(2))
                if (hasUpgrade('infection', 23)) base = base.pow(3)
                return base},
            tooltip() {
                    return "Effect Formula:<br>10<sup>[(log<sub>10</sub>[IP+1]+1)<sup>0.4</sup>+2]</sup>"
            },
            effectDisplay() {return "/" + format(upgradeEffect(this.layer, this.id))},
            unlocked() {return hasMilestone(this.layer, 0)},
         	cost: new Decimal (1),
       	},
        21: {
	        title: "Infected Upgrade B1",
        	description: "Raise The Upgrade Above's Effect to the 3rd power, Multiplier per DIEmensions bought is increased from 2x to 2.05x.",
            unlocked() {return hasUpgrade('antiamogus', 15)},
         	cost: new Decimal (3),
       	},
        22: {
	        title: "Infected Upgrade B2",
        	description: "Raise chess gain to the 1.05th power, Divide Booster's cost based on Best IP.",
            effect() {return player.infection.best.add(1).max(1).pow(25)},
            tooltip() {
                return "Effect Formula:<br>([IP]+1)<sup>25</sup></sup>"
            },
            effectDisplay() {return "/" + format(upgradeEffect(this.layer, this.id))},
            unlocked() {return hasUpgrade('antiamogus', 15)},
         	cost: new Decimal (3),
       	},
        23: {
	        title: "Infected Upgrade B3",
        	description: "Raise The Upgrade above's effect to the 3rd power, Raise BUA1's effect to the (SB+1)th power.",
            unlocked() {return hasUpgrade('antiamogus', 15)},
         	cost: new Decimal (3),
       	},
        31: {
	        title: "Infected Upgrade C1",
        	description: "Multiply DP gain based on unspent IP.",
            effect() {return player.infection.points.max(1).add(2).pow(0.5)},
            tooltip() {
                return "Effect Formula:<br>([IP]+2)<sup>0.5</sup></sup>"
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasMilestone(this.layer, 4)},
         	cost: new Decimal (9),
       	},
        32: {
	        title: "Infected Upgrade C2",
        	description: "Reduce the Decaying rate to 4%.",
            unlocked() {return hasMilestone(this.layer, 4)},
         	cost: new Decimal (9),
       	},
        33: {
	        title: "Infected Upgrade C3",
        	description: "Unlock a new buyable in INF layer.",
            unlocked() {return hasMilestone(this.layer, 4)},
         	cost: new Decimal (9),
       	},
    },
    buyables: {
        11: {
            title: "IP multiplier",
            unlocked() {
                return hasMilestone(this.layer, 3)
            },
            cost(x) {
                let base = Decimal.pow(4, x.pow(1.25))
                if (hasMilestone('infection', 9)) base = base.div(Decimal.sub(10, player.infection.ad.max(0)))
                return base.floor()
            },
            tooltip() {
                return "Cost Formula:<br>4<sup>x<sup>1.250</sup></sup>/<b>Cost Dividers</b>"
            },
            display() {
                return "Multiply IP gain by " + format(buyableEffect(this.layer, this.id).Ba) + "<br>Cost: " + format(this.cost())+ " IP<br>Bought: " + formatWhole(getBuyableAmount(this.layer, this.id)) + "<br>Effect: " + format(buyableEffect(this.layer, this.id).Ef) + "x"
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                if (hasMilestone(this.layer, 13)) cost = new Decimal (0)
                player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal (1.5)
                let expo = x.add(this.freelevel())
                let eff1 = base1.pow(expo)
                return {
                    Ba: base1,
                    Ef: eff1}
            },
            freelevel() {
                let freelvl = new Decimal (0)
                return freelvl.floor()
            },
        },
        12: {
            title: "Suspicious Exponents",
            unlocked() {
                return hasUpgrade(this.layer, 33)
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color": "#FF0000"
                }
            },
            cost(x) {
                let base = Decimal.pow(new Decimal ("1e1000"), Decimal.pow(1.1, x.pow(1.25)))
                return base.floor()
            },
            tooltip() {
                return "Cost Formula:<br>"+format("1.000e1000")+"<sup>1.1<sup>x<sup>1.250</sup></sup></sup>"
            },
            display() {
                return "Raise amogus gain by + ^" + format(buyableEffect(this.layer, this.id).Ba) + "<br>Cost: " + format(this.cost())+ " amogus<br>Bought: " + formatWhole(getBuyableAmount(this.layer, this.id)) + "/6<br>Effect: ^" + format(buyableEffect(this.layer, this.id).Ef)
            },
            canAfford() {
                return player.amogus.points.gte(this.cost())&&getBuyableAmount(this.layer, this.id).lt(6)
            },
            buy() {
                let cost = new Decimal (1)
                player.amogus.points = player.amogus.points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal (0.05)
                let expo = x.add(this.freelevel())
                let eff1 = base1.times(expo).max(0).add(1).min(1.50)
                return {
                    Ba: base1,
                    Ef: eff1}
            },
            freelevel() {
                let freelvl = new Decimal (0)
                return freelvl.floor()
            },
        },
    },
    milestones: {
        0: {
            requirementDescription: "1 Total IP (1)",
            done() {return player[this.layer].total.gte(1)},
            effectDescription() {return "Multiply DP by 2.5 per milestone, Unlock 3 IP Upgrades."},
            },
        1: {
            requirementDescription: "2 Total IP (2)",
            done() {return player[this.layer].total.gte(2)},
            effectDescription: "Multiply Point gain cap by 250 per <b>🆎 Charged Boosters</b>, Buying DIEmensions and Accelerators Doesn't take away any DP",
            },
        2: {
            requirementDescription: "3 Total IP (3)",
            done() {return player[this.layer].total.gte(3)},
            effectDescription: "Buying DIEmension shifts or Deadly Orbs don't reset anything, You can buy max Deadly Virus.",
            },
        3: {
            requirementDescription: "4 Total IP (4)",
            done() {return player[this.layer].total.gte(4)},
            effectDescription: "Unlock <b>the Decelerator</b> and <b>IP Multiplier</b>, Automate All 6 <b>Deadly DIEmensions</b>",
            },
        4: {
                requirementDescription: "6 IP Upgrades (5)",
                done() {return new Decimal (player[this.layer].upgrades.length).gte(6)},
                effectDescription() {return "Extend The Deadly Limit to "+ format("2e1024") +", Unlock more decelerated and IP upgrades."},
            },
        5: {
                requirementDescription: "20 IP (6)",
                done() {return player[this.layer].points.gte(20)},
                effectDescription() {return "Fourth Point gain nerf caps at 15th power, Multiply Ex. 🆎 gain by 1,000 per milestone starting at 6."},
            },
        6: {
                requirementDescription: "6 <b>Suspicious Exponents</b> (7)",
                done() {return getBuyableAmount('infection', 12).gte(6)},
                effectDescription() {return "Multiply DP gain by <b>Suspicious Exponents</b>+1, Add 1 to Deadly Orbs' Limit for each <b>Suspicious Exponents</b> starting at 6, Multiply DP gain by 10 per milestone."},
            },
        7: {
                requirementDescription: "Complete Anti-Deadly Dimensions with 10 or less DIEmension Boosts (AD1)",
                done() {return player.infection.ad.lte(10)},
                unlocked () {return hasMilestone('antip', 4)},
                effectDescription() {return "DIEmensions Boosts' base is increased to 2.05x outside the <b>Anti-Deadly Dimensions</b> Challenge"},
            },
        8: {
                requirementDescription: "Complete Anti-Deadly Dimensions with 8 or less DIEmension Boosts (AD2)",
                done() {return player.infection.ad.lte(8)},
                unlocked () {return hasMilestone('antip', 4)},
                effectDescription() {return "Multiply bean gain by 2 per 10-[Least DS or DB]"},
            },
        9: {
                requirementDescription: "Complete Anti-Deadly Dimensions with 6 or less DIEmension Boosts (AD3)",
                done() {return player.infection.ad.lte(6)},
                unlocked () {return hasMilestone('antip', 4)},
                effectDescription() {return "Divide <b>IP Multiplier</b>'s cost by 10-[Least DS or DB], Multiply Bean XP gain by 1.5"},
            },
        10: {
                requirementDescription: "Complete Anti-Deadly Dimensions with 4 or less DIEmension Boosts (AD4)",
                done() {return player.infection.ad.lte(4)},
                unlocked () {return hasMilestone('antip', 4)},
                effectDescription() {return "Multiply chess gain by 100 per Bean Tier."},
            },
        11: {
                requirementDescription: "Complete Anti-Deadly Dimensions with 3 or less DIEmension Shifts (AD5)",
                done() {return player.infection.ad.lte(3)},
                unlocked () {return hasMilestone('antip', 4)},
                effectDescription() {return "Multiply deadly virus' effect by Deadly Virus<sup>4-[Least DS or DB]</sup>."},
            },
        12: {
                requirementDescription: "Complete Anti-Deadly Dimensions with 2 or less DIEmension Shifts (AD6)",
                done() {return player.infection.ad.lte(2)},
                unlocked () {return hasMilestone('antip', 4)},
                effectDescription() {return "Multiply bean gain by MP<sup>0.5</sup>, Multiply IP gain by DO+1."},
            },
        13: {
                requirementDescription: "Complete Anti-Deadly Dimensions with 1 or less DIEmension Shifts (AD7)",
                done() {return player.infection.ad.lte(1)},
                unlocked () {return hasMilestone('antip', 4)},
                effectDescription() {return "Multiply amogus gain by MP per MP<sup>0.4</sup>, Buying <b>IP Multiplier</b> doesn't consume your IP."},
            },
        14: {
                requirementDescription: "Complete Anti-Deadly Dimensions with 0 DIEmension Shifts (AD8)",
                done() {return player.infection.ad.eq(0)},
                unlocked () {return hasMilestone('antip', 4)},
                effectDescription() {return "Multiply Bean XP gain by 1.1 per <b>IP Multiplier</b>."},
            },
    },
    challenges: {
        11: {
            name: "The Decelerator",
            challengeDescription: "Most of the main layer contents are disabled, Dilate point gain to the 0.5th power, While decelerated unlock new contents which also applies in main game.",
            goalDescription: "????",
            rewardDescription() {return "???"},
            canComplete: function() {return false},
        },
        12: {
            name: "Anti-Deadly Dimensions",
            challengeDescription: "Disable Free DIEmension Boosts/Shifts and you can't buy Deadly Orbs, Unlock Anti-Deadly Milestones",
            goalDescription() {return "250 Deadly Virus"},
            rewardDescription() {return "Gain Anti-Deadly Milestones based on how low your DIEmension Boosts/Shifts is."},
            canComplete: function() {return player.dv.points.gte(250)},
            onExit() {
                if (player.dv.points.gte(250)) {player.infection.ad = getBuyableAmount('dv', 32).min(player.infection.ad)}
            }
        },
    },
    update(diff) {
    },
})
addLayer('antiamogus', {
    name: "anti-amogus", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ඞ", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal (0),
        beans: new Decimal (0),
        level: new Decimal (1),
        perks: new Decimal (0),
        spentperks: new Decimal (0),
        tier: new Decimal (1),
        levelin: false,
        tierin: false
    }},
    tooltip() {
       let base = formatWhole(player.antiamogus.points)+" crewmates"
       if (hasMilestone('antiamogus', 2)) base = base + "<br>" + "Bean Level "+ formatWhole(player.antiamogus.level)
       if (hasUpgrade('amogus', 54)) base = base + "<br>" + format(player.antiamogus.beans) + (hasUpgrade('antiamogus', 41) ? "/"+format(upgradeEffect('antiamogus', 41)) : "") + " beans"
       if (hasMilestone('antiamogus', 2)) base = base + "<br>" + + formatWhole(player.antiamogus.perks.sub(player.antiamogus.spentperks).max(0)) + "/" + formatWhole(player.antiamogus.perks.max(0)) + " perks"
       return base
    },
    color: "#00FF00",
    requires: new Decimal ("10"), // Can be a function that takes requirement increases into account
    resource: "crewmates", // Name of prestige currency
    baseResource: "decelerated points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1/3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal (1)
        if (hasUpgrade('booster', 52)) mult = mult.times(upgradeEffect('booster', 52).C)
        if (hasUpgrade(this.layer, 21)) mult = mult.times(upgradeEffect(this.layer, 21))
        if (hasUpgrade(this.layer, 22)) mult = mult.times(upgradeEffect(this.layer, 22))
        if (player.difficulty.staticResBoost) mult = mult.times(2)
        mult = mult.times(buyableEffect(this.layer, 12).Ef)
        if (hasUpgrade('antip', 11)) mult = mult.times(upgradeEffect('antip', 11))
        mult = mult.times(challengeEffect('antip', 11))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        expo = new Decimal (1)
        return expo
    },
    Beangain() {
        if (!hasUpgrade('amogus', 54)) return new Decimal (0)
        let base = new Decimal (1)
        if (hasUpgrade('booster', 54)) base = base.times(upgradeEffect('booster', 54))
        if (hasUpgrade('antip', 13)) base = base.times(upgradeEffect('antip', 13))
        if (hasUpgrade('antip', 14)) base = base.times(upgradeEffect('antip', 14))
        if (hasUpgrade('antic', 12)) base = base.times(1.6)
        if (hasUpgrade('antic', 14)) base = base.times(player.antiamogus.level.max(1))
        if (player.difficulty.staticResBoost) base = base.times(2)
        base = base.times(buyableEffect(this.layer, 11).Ef)
        base = base.times(buyableEffect(this.layer, 31).Ef)
        if (hasUpgrade(this.layer, 31)) base = base.times(upgradeEffect(this.layer, 31))
        if (hasUpgrade(this.layer, 32)) base = base.times(upgradeEffect(this.layer, 32))
        if (hasUpgrade(this.layer, 33)) base = base.times(upgradeEffect(this.layer, 33))
        if (hasUpgrade(this.layer, 34)) base = base.times(upgradeEffect(this.layer, 34))
        if (hasUpgrade(this.layer, 35)) base = base.times(upgradeEffect(this.layer, 35))
        if (hasUpgrade(this.layer, 44)) base = base.times(upgradeEffect(this.layer, 44))
        if (hasMilestone(this.layer, 2)) base = base.times(Decimal.add(1, getBuyableAmount('infection', 11).max(0).times(0.3)))
        base = base.times(tmp.antip.effect.be)
        base = base.times(tmp.antic.effect.be)
        base = base.times(tmp.antiamogus.TierEff.E)
        if (hasMilestone('antip', 0)) base = base.times(Decimal.pow(1.2, player.antip.milestones.length))
        if (hasMilestone('antip', 5)) base = base.times(player.antiamogus.tier.max(1))
        if (hasMilestone('antip', 7)) base = base.times(2.5)
        if (hasMilestone('antiamogus', 4)) base = base.times(Decimal.add(1, player.antiamogus.level.sub(50).max(0).div(100)))
        if (hasMilestone('infection', 8)) base = base.times(Decimal.pow(2, Decimal.sub(10, player.infection.ad.max(0).min(10))))
        if (hasMilestone('antic', 1)) base = base.times(5)
        base = base.times(challengeEffect('antip', 11))
        if (hasMilestone('infection', 12)) base = base.times(buyableEffect('chess', 11).MP.pow(0.5))
        if (hasMilestone('antigh', 0)) base = base.times(tmp.antigh.milestones[0].effect)
        if (inChallenge('antip', 12)) base = base.pow(0.8)
        if (player[this.layer].best.gte(2.5e4)) return base
        return new Decimal (0)
    },
    Beaneffect() {
        return player.antiamogus.beans.add(1).pow(0.75).max(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown() {
        return inChallenge('infection', 11)
    },
    doReset(l) {
        if ((layers[l].row > this.row)&&(inChallenge('infection', 11)))
        {
        let keep = ['milestones', 'tierin', 'levelin']
        if (hasMilestone('antip', 3)) keep.push('upgrades')
        if (layers[l].row==1) keep.push('tier')
        if (!inChallenge('infection', 11)) {}
        if (inChallenge('infection', 11)) {layerDataReset(this.layer, keep)}
    }
    },
    tabFormat: {
        "Upgrades": {
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
                ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15]]],
                ["row", [["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24], ["upgrade", 25]]],
                ["row", [["upgrade", 31], ["upgrade", 32], ["upgrade", 33], ["upgrade", 34], ["upgrade", 35]]],
                ["row", [["upgrade", 41], ["upgrade", 42], ["upgrade", 43], ["upgrade", 44], ["upgrade", 45]]],
                ["row", [["upgrade", 51], ["upgrade", 52], ["upgrade", 53], ["upgrade", 54], ["upgrade", 55]]],
                "blank",
            ]
        },
        "Beans": {
            unlocked(){return hasUpgrade('amogus', 54)},
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
                    return "You can start generate Beans when you reached 25,000 best crewmates."
                }],
                ["display-text",
                function() {
                    a = ""
                    if (hasUpgrade('antiamogus', 41)) a = "/"+format(upgradeEffect('antiamogus', 41))
                    return "You have " + format(player.antiamogus.beans) + a + " Beans, Translated to a x" + format(tmp.antiamogus.Beaneffect) + " boost to point gain and point gain cap after everything."
                }],
                ["display-text",
                function() {
                    if (tmp.antiamogus.getBeansSpeed.gte(1)) return "Bean gain: " + format(tmp.antiamogus.Beangain)
                }],
                ["display-text",
                function() {
                    return "You are generating " + format(tmp.antiamogus.Beangain.times(tmp.antiamogus.getBeansSpeed)) + " Beans per second"
                }],
                "blank",
                ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13]]],
                ["row", [["buyable", 21], ["buyable", 22], ["buyable", 23]]],
                "blank",
                ["row", [["bar", 1], ["clickable", 11]]],
                ["row", [["bar", 2], ["clickable", 12]]],
                ["display-text",
                function() {
                    if(hasMilestone('antip', 3)) return "Your bean tier is currently multiplying your bean gain and XP by "+format(tmp.antiamogus.TierEff.E)+" (Next: "+format(tmp.antiamogus.TierEff.N)+"x)"
                }],
                ["display-text",
                function() {
                    if(hasMilestone('antiamogus', 2)) return "Bean Level's requirement cannot go below "+format(1e11)+" beans."
                }],
                ["display-text",
                function() {
                    if(hasMilestone('antip', 3)) return "Bean Tier's requirement cannot go below 50 bean levels."
                }],
            ]
        },
        "Perks": {
            unlocked(){return player.antiamogus.level.gte(6)||hasMilestone('antip', 1)},
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
                    return "You have "+formatWhole(player.antiamogus.perks.sub(player.antiamogus.spentperks).max(0))+" perks to spent. [You gain a perk per level starting at 2]"
                }],
                "blank",
                ["row", [["buyable", 31], ["buyable", 32], ["buyable", 33]]],
                ["row", [["buyable", 41], ["buyable", 42], ["buyable", 43]]],
                "blank",
                ["row", [["bar", 1], ["clickable", 11]]],
                ["display-text",
                function() {
                    if(hasMilestone('antiamogus', 2)) return "Bean Level's requirement cannot go below "+format(1e11)+" beans."
                }],
            ]
        },
    },
    milestones: {
        0: {
            requirementDescription() {return format(1e9)+" Crewmates"},
            done() {return player[this.layer].points.gte(1e9)},
            effectDescription: "Square root point gain nerf while decelerating, Raise point gain base to the 1.05th power, Decrease DO's cost by 1.",
        },
        1: {
            requirementDescription() {return format(1e9)+" Decelerated points"},
            done() {return player.points.gte(1e9)&&inChallenge('infection', 11)},
            effectDescription() {return "Raise Point gain nerf to the 1.05th root, Raise chess gain to the 1.05th power, Your decelerated points caps at "+format(new Decimal (1e9))+". (for now...)"},
        },
        2: {
            requirementDescription() {return format(4e10)+" Beans"},
            done() {return player[this.layer].beans.gte(4e10)},
            effectDescription: "Unlock Bean's level, Increase bean gain by +30% per <b>IP Multiplier</b>, You will unlock <b>Perks</b> at Bean Level 6.",
        },
        3: {
            requirementDescription() {return "Bean Level 50"},
            done() {return player[this.layer].level.gte(50)},
            effectDescription: "Unlock Prestige.",
        },
        4: {
            requirementDescription() {return format(1e12)+" Crewmates"},
            done() {return player[this.layer].points.gte(1e12)},
            effectDescription() {return "Your crewmates stuck at "+format(1e12)+", Increase bean gain by +1% per bean level starting at 51."},
        },
    },
    passiveGeneration() {
        if (hasMilestone('antip', 2)&&inChallenge('infection', 11)) return new Decimal (0.1)
        return 0
    },
    upgrades: {
        11: {
            title: "Crewmate Upgrade A1",
        	description: "Multiply Point gain by 5, Multiply Point gain by 3 per upgrade.",
         	cost: new Decimal (1),
             effect() {
                let base = new Decimal (3)
                if (hasUpgrade(this.layer, 24)) base = base.add(upgradeEffect(this.layer, 24))
                return base.pow(new Decimal (player.antiamogus.upgrades.length))
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return player[this.layer].best.gte(1)}
        },
        12: {
            title: "Crewmate Upgrade A2",
        	description: "Multiply amogus gain based on best crewmates.",
            tooltip: "Effect Formula: (log<sub>2</sub>([crewmates]+1)+1)<sup>3</sup>",
         	cost: new Decimal (3),
             effect() {
                return player.antiamogus.best.max(1).add(1).log(2).add(1).pow(3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade(this.layer, 11)}
        },
        13: {
            title: "Crewmate Upgrade A3",
        	description: "Multiply point gain cap after everything and point gain based on best crewmates.",
            tooltip: "Effect Formula: (log<sub>2</sub>([crewmates]+1)+1)<sup>1.25</sup>",
         	cost: new Decimal (10),
             effect() {
                return player.antiamogus.best.max(1).add(1).log(2).add(1).pow(1.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade(this.layer, 12)}
        },
        14: {
            title: "Crewmate Upgrade A4",
        	description: "Multiply point gain cap after everything based on point gain cap, Multiply point gain by log<sub>2</sub>[point gain cap].",
            tooltip: "Effect Formula: (log<sub>2</sub>([point gain cap])<sup>4</sup>",
         	cost: new Decimal (25),
             effect() {
                return {
                    PGC: getPointCap().add(1).log(2).max(1).pow(4),
                    P: getPointCap().max(2).log(2).max(1)
                }
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id).PGC)+"x, " + format(upgradeEffect(this.layer, this.id).P) + "x"},
            unlocked() {return hasUpgrade(this.layer, 13)}
        },
        15: {
            title: "Crewmate Upgrade A5",
        	description: "Multiply DP by log<sub>2</sub>[crewmates]+1, Unlock 3 more IP upgrades.",
         	cost: new Decimal (40),
             effect() {
                return player.antiamogus.points.max(1).log(2).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade(this.layer, 14)}
        },
        21: {
            title: "Crewmate Upgrade B1",
        	description: "Multiply Crewmates gain based on best crewmates.",
         	cost: new Decimal (80),
             tooltip: "Effect Formula: (log<sub>10</sub>([crewmates]+1)+1)<sup>2</sup>",
            effect() {
                return player.antiamogus.best.max(1).log(10).add(1).pow(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade(this.layer, 15)&&hasMilestone('infection', 4)}
        },
        22: {
            title: "Crewmate Upgrade B2",
        	description: "Multiply Crewmates gain based on points.",
         	cost: new Decimal (500),
             tooltip: "Effect Formula: (log<sub>2</sub>([points]+1)+1)<sup>0.5</sup>",
            effect() {
                return player.points.max(1).log(2).add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade(this.layer, 21)&&hasMilestone('infection', 4)}
        },
        23: {
            title: "Crewmate Upgrade B3",
        	description: "Multiply point gain based on points.",
         	cost: new Decimal (1250),
            tooltip: "Effect Formula: (log<sub>2</sub>([points]+1)+1)<sup>0.8</sup>",
            effect() {
                return player.points.max(1).log(2).add(1).pow(0.8)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade(this.layer, 22)&&hasMilestone('infection', 4)}
        },
        24: {
            title: "Crewmate Upgrade B4",
        	description: "Per upgrade adds 0.2 to Cr-U A1's effect base.",
         	cost: new Decimal (2700),
             effect() {
                return new Decimal (player.antiamogus.upgrades.length).times(0.2)
            },
            effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id))},
            unlocked() {return hasUpgrade(this.layer, 23)&&hasMilestone('infection', 4)}
        },
        25: {
            title: "Crewmate Upgrade B5",
        	description: "Multiply Point gain cap after everything and point gain by IP+1 if delerated, Raise this effect to the 4th power if not.",
         	cost: new Decimal (5555),
             effect() {
                let base = player.infection.points.max(0).add(1)
                let pow = new Decimal (1)
                if (!inChallenge('infection', 11)) pow = pow.times(4)
                return base.pow(pow)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade(this.layer, 24)&&hasMilestone('infection', 4)}
        },
        31: {
            title: "Beans Upgrade A1",
        	description: "Multiply bean gain based on points",
            currencyDisplayName: "beans",
            currencyLayer: "antiamogus",
            currencyInternalName: "beans",
            currencyLocation() {return player.antiamogus},
            tooltip: "Effect Formula: (ln([points]+1)+1)<sup>0.75</sup>",
         	cost: new Decimal (5555),
             effect() {
                let base = player.points.max(0).add(1).ln().add(1)
                let pow = new Decimal (0.75)
                return base.pow(pow).min(10)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade(this.layer, 25)&&hasUpgrade('booster', 53)}
        },
        32: {
            title: "Beans Upgrade A2",
        	description: "Multiply bean gain based on best crewmates",
            currencyDisplayName: "beans",
            currencyLayer: "antiamogus",
            currencyInternalName: "beans",
            currencyLocation() {return player.antiamogus},
            tooltip: "Effect Formula: (ln([Crewmates]+1)+1)<sup>0.5</sup>",
         	cost: new Decimal (24576),
             effect() {
                let base = player.antiamogus.points.max(0).add(1).ln().add(1)
                let pow = new Decimal (0.5)
                return base.pow(pow).min(5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade(this.layer, 31)&&hasUpgrade('booster', 53)}
        },
        33: {
            title: "Beans Upgrade A3",
        	description: "Multiply bean gain by 1.1 per ln[best IP]",
            currencyDisplayName: "beans",
            currencyLayer: "antiamogus",
            currencyInternalName: "beans",
            currencyLocation() {return player.antiamogus},
         	cost: new Decimal (2e5),
             effect() {
                let base = new Decimal (1.1)
                let pow = player.infection.best.max(1).ln().max(0)
                return base.pow(pow).min(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade(this.layer, 32)&&hasUpgrade('booster', 53)}
        },
        34: {
            title: "Beans Upgrade A4",
        	description: "Multiply Beans gain based on [Beanier Gain]'s level",
            currencyDisplayName: "beans",
            currencyLayer: "antiamogus",
            currencyInternalName: "beans",
            currencyLocation() {return player.antiamogus},
            tooltip: "Effect Formula: ([BG]+1)<sup>0.4</sup>",
         	cost: new Decimal (8e5),
             effect() {
                let base = new Decimal (getBuyableAmount(this.layer, 11)).max(0).add(1)
                let pow = new Decimal (0.4)
                return base.pow(pow).min(10)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade(this.layer, 33)&&hasUpgrade('booster', 53)}
        },
        35: {
            title: "Beans Upgrade A5",
        	description: "Unlock 2 new chess pieces, Multiply Beans gain by 1.15 per upgrade",
            currencyDisplayName: "beans",
            currencyLayer: "antiamogus",
            currencyInternalName: "beans",
            currencyLocation() {return player.antiamogus},
         	cost: new Decimal (3e6),
             effect() {
                let base = new Decimal (1.15)
                let pow = new Decimal (player.antiamogus.upgrades.length)
                return base.pow(pow)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade(this.layer, 34)&&hasUpgrade('booster', 53)}
        },
        41: {
            title: "Beans Upgrade B1",
        	description: "Unlock a new bean buyable, But your beans cap at 300 seconds worth of bean gain.",
            currencyDisplayName: "beans",
            currencyLayer: "antiamogus",
            currencyInternalName: "beans",
            currencyLocation() {return player.antiamogus},
         	cost: new Decimal (1e9),
             effect() {
                let base = new Decimal (300)
                if (hasMilestone('antip', 5)) base = base.times(6)
                let gain = new Decimal (tmp.antiamogus.Beangain)
                return base.times(gain)
            },
            effectDisplay() { return format(player.antiamogus.beans)+"/"+format(upgradeEffect(this.layer, this.id))},
            unlocked() {return hasUpgrade(this.layer, 35)&&hasUpgrade('booster', 53)}
        },
        42: {
            title: "Beans Upgrade B2",
        	description: "Multiply chess gain by Beans, Increase Point gain base by 1 per upgrade",
            currencyDisplayName: "beans",
            currencyLayer: "antiamogus",
            currencyInternalName: "beans",
            currencyLocation() {return player.antiamogus},
         	cost: new Decimal (5.25e9),
            effect() {
                let base = player.antiamogus.beans.max(1)
                let pow = new Decimal (1)
                return base.times(pow)
            },
            effectDisplay() { return format(player.antiamogus.beans)+"x, +"+format(player.antiamogus.upgrades.length)},
            unlocked() {return hasUpgrade(this.layer, 41)&&hasUpgrade('booster', 53)}
        },
        43: {
            title: "Beans Upgrade B3",
        	description: "Multiply Bean generating speed based on Beans' cap and amount",
            currencyDisplayName: "beans",
            currencyLayer: "antiamogus",
            currencyInternalName: "beans",
            currencyLocation() {return player.antiamogus},
            tooltip: "Effect Formula: 2-([Cap]/[Amount])",
         	cost: new Decimal (7.2e9),
            effect() {
                let max = new Decimal (2)
                let base = player.antiamogus.beans.max(0).div(upgradeEffect(this.layer, 41).max(1)).max(0).min(1)
                let decay = new Decimal (1)
                return max.sub(base.times(decay))
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade(this.layer, 42)&&hasUpgrade('booster', 53)}
        },
        44: {
            title: "Beans Upgrade B4",
        	description: "Unlock another bean buyable, Multiply bean gain based on bean gain",
            currencyDisplayName: "beans",
            currencyLayer: "antiamogus",
            currencyInternalName: "beans",
            currencyLocation() {return player.antiamogus},
            tooltip: "Effect Formula: 1.15<sup>log<sub>2</sub>(log<sub>2</sub>[gain])</sup>",
         	cost: new Decimal (1.2e10),
            effect() {
                let base = new Decimal (1.15)
                let pow = tmp.antiamogus.Beangain.max(1).log2().max(1).log2()
                return base.pow(pow)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade(this.layer, 43)&&hasUpgrade('booster', 53)}
        },
        45: {
            title: "Beans Upgrade B5",
        	description: "Multiply DP gain based on Beans.",
            currencyDisplayName: "beans",
            currencyLayer: "antiamogus",
            currencyInternalName: "beans",
            currencyLocation() {return player.antiamogus},
            tooltip: "EffectFormula: 2.5<sup>log<sub>2</sub>(log<sub>2</sub>[beans])</sup>",
         	cost: new Decimal (3e10),
            effect() {
                let base = new Decimal (2.5)
                let pow = player.antiamogus.beans.max(1).log2().max(1).log2()
                return base.pow(pow)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade(this.layer, 44)&&hasUpgrade('booster', 53)}
        },
        51: {
            title: "Automation Upgrade A1",
        	description: "You can bulk buy bean buyables.",
            currencyDisplayName: "beans",
            currencyLayer: "antiamogus",
            currencyInternalName: "beans",
            currencyLocation() {return player.antiamogus},
         	cost: new Decimal (1e3),
            unlocked() {return hasMilestone('antip', 3)}
        },
        52: {
            title: "Automation Upgrade A2",
        	description: "You can bulk leveling up.",
            currencyDisplayName: "beans",
            currencyLayer: "antiamogus",
            currencyInternalName: "beans",
            currencyLocation() {return player.antiamogus},
         	cost: new Decimal (1e4),
            unlocked() {return hasMilestone('antip', 3)}
        },
        53: {
            title: "Automation Upgrade A3",
        	description: "You can bulk tiering up.",
            currencyDisplayName: "beans",
            currencyLayer: "antiamogus",
            currencyInternalName: "beans",
            currencyLocation() {return player.antiamogus},
         	cost: new Decimal (1e5),
            unlocked() {return hasMilestone('antip', 3)}
        },
        54: {
            title: "Automation Upgrade A4",
        	description() {return "<b>Decelerated Points</b> will cap at "+format(1e20)+" instead of "+format(1e9)+"."},
            currencyDisplayName: "beans",
            currencyLayer: "antiamogus",
            currencyInternalName: "beans",
            currencyLocation() {return player.antiamogus},
         	cost: new Decimal (1e6),
            unlocked() {return hasMilestone('antip', 3)}
        },
        55: {
            title: "Automation Upgrade A5",
        	description() {return "<b>Crewmates</b> will cap at "+format(1e30)+" instead of "+format(1e12)+"."},
            currencyDisplayName: "beans",
            currencyLayer: "antiamogus",
            currencyInternalName: "beans",
            currencyLocation() {return player.antiamogus},
         	cost: new Decimal (1e7),
            unlocked() {return hasMilestone('antip', 3)}
        },
    },
    buyables: {
        11: {
            title: "Beanier Gain",
            unlocked() {
                return hasUpgrade('booster', 53)
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color": "#FFA500"
                }
            },
            cost(x) {
                let base = Decimal.pow(1.12, x).times(10)
                return base.floor()
            },
            tooltip() {
                return "Cost Formula:<br>10*1.12<sup>x</sup>"
            },
            display() {
                return "Increase Bean gain by +" + format(buyableEffect(this.layer, this.id).Ba.times(100)) + "% per level,<br>Increase this boost by 25% per 25 level<br>Cost: " + format(this.cost())+ " Beans<br>Bought: " + formatWhole(getBuyableAmount(this.layer, this.id)) + "<br>Effect: " + format(buyableEffect(this.layer, this.id).Ef) + "x"
            },
            canAfford() {
                return player[this.layer].beans.gte(this.cost())&&(!inChallenge('antip', 14))
            },
            buy() {
                let cost = new Decimal (1)
                if (hasMilestone('antigh', 5)) cost = new Decimal (0)
                if (!hasUpgrade('antiamogus', 51)){player[this.layer].beans = player[this.layer].beans.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))}
                if (hasUpgrade('antiamogus', 51)){
                    setBuyableAmount(this.layer, this.id, player.antiamogus.beans.div(10).max(1).log(1.12).add(1))
                    player[this.layer].beans = player[this.layer].beans.sub(this.cost().mul(cost))
                }
            },
            effect(x) {
                let base1 = new Decimal (0.2)
                let levels = x.add(this.freelevel())
                let boostbase = new Decimal (1.25)
                let boostamt = x.div(25).floor()
                let eff1 = new Decimal(1).add(base1.times(levels)).times(Decimal.pow(boostbase, boostamt))
                return {
                    Ba: base1,
                    Ef: eff1}
            },
            freelevel() {
                let freelvl = new Decimal (0)
                return freelvl.floor()
            },
        },
        12: {
            title: "Crewtive Bean",
            unlocked() {
                return hasUpgrade('booster', 53)
            },
            cost(x) {
                let base = Decimal.pow(1.16, x).times(25)
                return base.floor()
            },
            tooltip() {
                return "Cost Formula:<br>25*1.16<sup>x</sup>"
            },
            display() {
                return "Increase Crewmate gain by +" + format(buyableEffect(this.layer, this.id).Ba.times(100)) + "% per level,<br>Increase this boost by 25% per 25 level<br>Cost: " + format(this.cost())+ " Beans<br>Bought: " + formatWhole(getBuyableAmount(this.layer, this.id)) + "<br>Effect: " + format(buyableEffect(this.layer, this.id).Ef) + "x"
            },
            canAfford() {
                return player[this.layer].beans.gte(this.cost())&&(!inChallenge('antip', 14))
            },
            buy() {
                let cost = new Decimal (1)
                if (hasMilestone('antigh', 5)) cost = new Decimal (0)
                if (!hasUpgrade('antiamogus', 51)){player[this.layer].beans = player[this.layer].beans.sub(this.cost().mul(cost))
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))}
                    if (hasUpgrade('antiamogus', 51)){
                        setBuyableAmount(this.layer, this.id, player.antiamogus.beans.div(25).max(1).log(1.16).add(1))
                        player[this.layer].beans = player[this.layer].beans.sub(this.cost().mul(cost))
                    }
            },
            effect(x) {
                let base1 = new Decimal (0.1)
                let levels = x.add(this.freelevel())
                let boostbase = new Decimal (1.25)
                let boostamt = x.div(25).floor()
                let eff1 = new Decimal(1).add(base1.times(levels)).times(Decimal.pow(boostbase, boostamt))
                return {
                    Ba: base1,
                    Ef: eff1}
            },
            freelevel() {
                let freelvl = new Decimal (0)
                return freelvl.floor()
            },
        },
        13: {
            title: "Pointy Bean",
            unlocked() {
                return hasUpgrade('booster', 53)
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color": "#FFFFFF"
                }
            },
            cost(x) {
                let base = Decimal.pow(1.35, x).times(100)
                return base.floor()
            },
            tooltip() {
                return "Cost Formula:<br>100*1.35<sup>x</sup>"
            },
            display() {
                return "Increase Point gain after everything and its cap after everything by +" + format(buyableEffect(this.layer, this.id).Ba.times(100)) + "% per level,<br>Increase this boost by 50% per 25 level<br>Cost: " + format(this.cost())+ " Beans<br>Bought: " + formatWhole(getBuyableAmount(this.layer, this.id)) + "<br>Effect: " + format(buyableEffect(this.layer, this.id).Ef) + "x"
            },
            canAfford() {
                return player[this.layer].beans.gte(this.cost())&&(!inChallenge('antip', 14))
            },
            buy() {
                let cost = new Decimal (1)
                if (hasMilestone('antigh', 5)) cost = new Decimal (0)
                if (!hasUpgrade('antiamogus', 51)){player[this.layer].beans = player[this.layer].beans.sub(this.cost().mul(cost))
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))}
                    if (hasUpgrade('antiamogus', 51)){
                        setBuyableAmount(this.layer, this.id, player.antiamogus.beans.div(100).max(1).log(1.35).add(1))
                        player[this.layer].beans = player[this.layer].beans.sub(this.cost().mul(cost))
                    }
            },
            effect(x) {
                let base1 = new Decimal (0.1)
                let levels = x.add(this.freelevel())
                let boostbase = new Decimal (1.5)
                let boostamt = x.div(25).floor()
                let eff1 = new Decimal(1).add(base1.times(levels)).times(Decimal.pow(boostbase, boostamt))
                return {
                    Ba: base1,
                    Ef: eff1}
            },
            freelevel() {
                let freelvl = new Decimal (0)
                return freelvl.floor()
            },
        },
        21: {
            title: "Bean Speed",
            unlocked() {
                return hasUpgrade('antiamogus', 41)
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color": "#FFFFFF"
                }
            },
            cost(x) {
                let base = Decimal.pow(2.5, x).times(10000)
                return base.floor()
            },
            tooltip() {
                return "Cost Formula:<br>10,000*2.5<sup>x</sup>"
            },
            display() {
                return "Increase Bean generating speed by +" + format(buyableEffect(this.layer, this.id).Ba.times(100)) + "% per level<br>Cost: " + format(this.cost())+ " Beans<br>Bought: " + formatWhole(getBuyableAmount(this.layer, this.id)) + "<br>Effect: " + format(buyableEffect(this.layer, this.id).Ef)+"x"
            },
            canAfford() {
                return player[this.layer].beans.gte(this.cost())&&(!inChallenge('antip', 14))
            },
            buy() {
                let cost = new Decimal (1)
                if (hasMilestone('antigh', 5)) cost = new Decimal (0)
                if (!hasUpgrade('antiamogus', 51)){player[this.layer].beans = player[this.layer].beans.sub(this.cost().mul(cost))
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))}
                    if (hasUpgrade('antiamogus', 51)){
                        setBuyableAmount(this.layer, this.id, player.antiamogus.beans.div(1e4).max(1).log(2.5).add(1))
                        player[this.layer].beans = player[this.layer].beans.sub(this.cost().mul(cost))
                    }
            },
            effect(x) {
                let base1 = new Decimal (0.1)
                let levels = x.add(this.freelevel())
                let eff1 = new Decimal(1).add(base1.times(levels))
                return {
                    Ba: base1,
                    Ef: eff1}
            },
            freelevel() {
                let freelvl = new Decimal (0)
                return freelvl.floor()
            },
        },
        22: {
            title: "Bean Infection",
            unlocked() {
                return hasUpgrade('antiamogus', 44)
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color": "#0000D0"
                }
            },
            cost(x) {
                let base = Decimal.pow(7, x).times(2000)
                return base.floor()
            },
            tooltip() {
                return "Cost Formula:<br>2,000*7<sup>x</sup>"
            },
            display() {
                return "Increase infection gain by +" + format(buyableEffect(this.layer, this.id).Ba.times(100)) + "% per level<br>Cost: " + format(this.cost())+ " Beans<br>Bought: " + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10<br>Effect: " + format(buyableEffect(this.layer, this.id).Ef)+"x"
            },
            purchaseLimit() {return new Decimal (10)},
            canAfford() {
                return player[this.layer].beans.gte(this.cost())&&(!inChallenge('antip', 14))
            },
            buy() {
                let cost = new Decimal (1)
                if (hasMilestone('antigh', 5)) cost = new Decimal (0)
                if (!hasUpgrade('antiamogus', 51)){player[this.layer].beans = player[this.layer].beans.sub(this.cost().mul(cost))
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))}
                    if (hasUpgrade('antiamogus', 51)){
                        setBuyableAmount(this.layer, this.id, player.antiamogus.beans.div(2000).max(1).log(7).add(1).min(10))
                        player[this.layer].beans = player[this.layer].beans.sub(this.cost().mul(cost))
                    }
            },
            effect(x) {
                let base1 = new Decimal (0.1)
                let levels = x.add(this.freelevel())
                let eff1 = new Decimal(1).add(base1.times(levels))
                return {
                    Ba: base1,
                    Ef: eff1}
            },
            freelevel() {
                let freelvl = new Decimal (0)
                return freelvl.floor()
            },
        },
        23: {
            title: "Bean XP",
            unlocked() {
                return hasMilestone('antip', 2)
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color": "#00FFFF"
                }
            },
            cost(x) {
                let base = Decimal.pow(1.2, x).times(1000)
                return base.floor()
            },
            tooltip() {
                return "Cost Formula:<br>1,000*1.2<sup>x</sup>"
            },
            display() {
                return "Increase Bean XP gain by +" + format(buyableEffect(this.layer, this.id).Ba.times(100)) + "% per level,<br>Increase this boost by 4% per 25 level<br>Cost: " + format(this.cost())+ " Beans<br>Bought: " + formatWhole(getBuyableAmount(this.layer, this.id)) + "<br>Effect: " + format(buyableEffect(this.layer, this.id).Ef) + "x"
            },
            canAfford() {
                return player[this.layer].beans.gte(this.cost())&&(!inChallenge('antip', 14))
            },
            buy() {
                let cost = new Decimal (1)
                if (hasMilestone('antigh', 5)) cost = new Decimal (0)
                if (!hasUpgrade('antiamogus', 51)){player[this.layer].beans = player[this.layer].beans.sub(this.cost().mul(cost))
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))}
                    if (hasUpgrade('antiamogus', 51)){
                        setBuyableAmount(this.layer, this.id, player.antiamogus.beans.div(1e3).max(1).log(1.2).add(1))
                        player[this.layer].beans = player[this.layer].beans.sub(this.cost().mul(cost))
                    }
            },
            effect(x) {
                let base1 = new Decimal (0.04)
                let levels = x.add(this.freelevel())
                let boostbase = new Decimal (1.04)
                let boostamt = x.div(25).floor()
                let eff1 = new Decimal(1).add(base1.times(levels)).times(Decimal.pow(boostbase, boostamt))
                return {
                    Ba: base1,
                    Ef: eff1}
            },
            freelevel() {
                let freelvl = new Decimal (0)
                return freelvl.floor()
            },
        },
        31: {
            title: "Bean Perk",
            unlocked() {
                return player[this.layer].level.gte(1)
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color": "#FFA500"
                }
            },
            cost(x) {
                let base = new Decimal (1)
                return base.floor()
            },
            purchaseLimit() {return new Decimal (50)},
            display() {
                return "Increase Bean gain by +" + format(buyableEffect(this.layer, this.id).Ba.times(100)) + "% per level multiplied by bean's level<br>Cost: " + formatWhole(this.cost())+ " Perks<br>Bought: " + formatWhole(getBuyableAmount(this.layer, this.id)) + "/50<br>Effect: " + format(buyableEffect(this.layer, this.id).Ef)+"x"
            },
            canAfford() {
                return player[this.layer].perks.sub(player[this.layer].spentperks).max(0).gte(this.cost())&&(!inChallenge('antip', 14))
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].spentperks = player[this.layer].spentperks.add(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal (0.1)
                let levels = x.add(this.freelevel()).max(0)
                let eff1 = new Decimal(1).add(base1.times(levels).times(player[this.layer].level.max(0)))
                return {
                    Ba: base1,
                    Ef: eff1}
            },
            freelevel() {
                let freelvl = new Decimal (0)
                return freelvl.floor()
            },
        },
        32: {
            title: "Speed Perk",
            unlocked() {
                return player[this.layer].level.gte(1)
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color": "#FFFFFF"
                }
            },
            cost(x) {
                let base = new Decimal (1)
                return base.floor()
            },
            purchaseLimit() {return new Decimal (10)},
            display() {
                return "Increase Bean generating speed by +" + format(buyableEffect(this.layer, this.id).Ba.times(100)) + "% per level<br>Cost: " + formatWhole(this.cost())+ " Perks<br>Bought: " + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10<br>Effect: " + format(buyableEffect(this.layer, this.id).Ef)+"x"
            },
            canAfford() {
                return player[this.layer].perks.sub(player[this.layer].spentperks).max(0).gte(this.cost())&&(!inChallenge('antip', 14))
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].spentperks = player[this.layer].spentperks.add(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal (0.25)
                let levels = x.add(this.freelevel()).max(0)
                let eff1 = new Decimal(1).add(base1.times(levels))
                return {
                    Ba: base1,
                    Ef: eff1}
            },
            freelevel() {
                let freelvl = new Decimal (0)
                return freelvl.floor()
            },
        },
        33: {
            title: "XP Perk",
            unlocked() {
                return hasUpgrade('antic', 11)
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background-color": "#00FFFF"
                }
            },
            cost(x) {
                let base = new Decimal (1)
                return base.floor()
            },
            purchaseLimit() {return new Decimal (50)},
            display() {
                return "Increase Bean XP gain by +" + format(buyableEffect(this.layer, this.id).Ba.times(100)) + "% per level<br>Cost: " + formatWhole(this.cost())+ " Perks<br>Bought: " + formatWhole(getBuyableAmount(this.layer, this.id)) + "/50<br>Effect: " + format(buyableEffect(this.layer, this.id).Ef)+"x"
            },
            canAfford() {
                return player[this.layer].perks.sub(player[this.layer].spentperks).max(0).gte(this.cost())&&(!inChallenge('antip', 14))
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].spentperks = player[this.layer].spentperks.add(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal (0.05)
                let levels = x.add(this.freelevel()).max(0)
                let eff1 = new Decimal(1).add(base1.times(levels))
                return {
                    Ba: base1,
                    Ef: eff1}
            },
            freelevel() {
                let freelvl = new Decimal (0)
                return freelvl.floor()
            },
        },
    },
    XPMult() {
        let base = new Decimal (1)
        if (hasMilestone('antip', 1)) base = base.times(2)
        if (hasMilestone('infection', 9)) base = base.times(1.5)
        if (hasUpgrade('antip', 12)) base = base.times(upgradeEffect('antip', 12))
        if (hasUpgrade('antic', 11)) base = base.times(upgradeEffect('antic', 11))
        base = base.times(buyableEffect(this.layer, 23).Ef)
        base = base.times(buyableEffect(this.layer, 33).Ef)
        if (player.difficulty.staticResBoost) base = base.times(2)
        base = base.times(tmp.antiamogus.TierEff.E)
        base = base.times(challengeEffect('antip', 12))
        if (hasMilestone('antip', 6)) base = base.times(player.antiamogus.tier.max(1))
        if (hasMilestone('antigh', 1)) base = base.times(tmp.antigh.milestones[1].effect)
        return base
    },
    LVLReq() {
        let base = new Decimal(1e11).times(Decimal.pow(1.05, player.antiamogus.level.sub(1).max(0).pow(1.25)))
        if (inChallenge('antip', 13)) base = new Decimal(1e11).times(Decimal.pow(1.1, player.antiamogus.level.sub(1).max(0).pow(1.25)))
        base = base.div(tmp.antiamogus.XPMult)
        return base.max(1e11).floor()
    },
    TierReq() {
        let base = new Decimal (50).add(Decimal.times(5, player.antiamogus.tier.pow(2).sub(player.antiamogus.tier).div(2)))
        return base.max(50)
    },
    TierEff() {
        let base = new Decimal (1.2)
        let eff = Decimal.pow(base, player.antiamogus.tier.sub(1).max(0))
        let neff = Decimal.pow(base, player.antiamogus.tier.max(0))
        return {
            B: base,
            E: eff,
            N: neff
        }
    },
    clickables: {
        11: {
            title() {return "Allow Level up: " + (player.antiamogus.levelin ? "ON" : "OFF")},
            unlocked() {return hasMilestone('antiamogus', 2)},
            canClick() {return true},
            onClick() {player.antiamogus.levelin = !player.antiamogus.levelin},
            style: {"background-color"(){
                if (!player.antiamogus.levelin) return '#FFFFFF'
                if (player.antiamogus.levelin) return "#00CFCF"
            }},
        },
        12: {
            title() {return "Allow Tier up: " + (player.antiamogus.tierin ? "ON" : "OFF")},
            unlocked() {return hasMilestone('antip', 3)},
            canClick() {return true},
            onClick() {player.antiamogus.tierin = !player.antiamogus.tierin},
            style: {"background-color"(){
                if (!player.antiamogus.tierin) return '#FFFFFF'
                if (player.antiamogus.tierin) return "#CFCF00"
            }},
        },
    },
    bars: {
        1: {
            direction: RIGHT,
            width: 500,
            height: 50,
            progress() {return player.antiamogus.beans.max(0).div(tmp.antiamogus.LVLReq).min(1)},
            display() {return "Bean Level: "+formatWhole(player.antiamogus.level)+"<br> Progress: "+format(player.antiamogus.beans)+"/"+format(tmp.antiamogus.LVLReq)+" Beans"},
            instant: false,
            unlocked() {return hasMilestone('antiamogus', 2)},
            fillStyle: {'background-color' : "#00CFCF"},
            baseStyle: {'background-color' : "#000000"},
        },
        2: {
            direction: RIGHT,
            width: 500,
            height: 50,
            progress() {return player.antiamogus.level.max(0).div(tmp.antiamogus.TierReq).min(1)},
            display() {return "Bean Tier: "+formatWhole(player.antiamogus.tier)+"<br> Progress: "+formatWhole(player.antiamogus.level)+"/"+formatWhole(tmp.antiamogus.TierReq)+" Bean Level"},
            instant: false,
            unlocked() {return hasMilestone('antip', 3)},
            fillStyle: {'background-color' : "#CFCF00"},
            baseStyle: {'background-color' : "#000000"},
        },
    },
    getBeansSpeed() {
        let speed = new Decimal (1)
        speed = speed.times(buyableEffect('antiamogus', 21).Ef)
        speed = speed.times(buyableEffect('antiamogus', 32).Ef)
        if (hasUpgrade('antiamogus', 43)) speed = speed.times(upgradeEffect('antiamogus', 43))
        if (hasMilestone('antic', 1)) speed = speed.times(Decimal.pow(1.2, new Decimal (player.antic.milestones.length).max(0)))
        if (hasMilestone('antip', 6)) speed = speed.times(player.antiamogus.tier.max(1))
        if (hasMilestone('antigh', 6)) speed = speed.times(player.antigh.best.max(1))
        return speed
    },
    getCMcap() {
        let base = new Decimal (1e12)
        if (hasUpgrade('antiamogus', 55)) base = new Decimal (1e30)
        return base
    },
    update(diff) {
        player.antiamogus.points = player.antiamogus.points.min(tmp.antiamogus.getCMcap)
        player.antiamogus.best = player.antiamogus.best.min(tmp.antiamogus.getCMcap)
        player.antiamogus.total = player.antiamogus.total.min(tmp.antiamogus.getCMcap)
        player.antiamogus.perks = player.antiamogus.level.sub(1).times(challengeEffect('antip', 14)).max(player.antiamogus.perks)
        if (hasUpgrade('amogus', 54)&&inChallenge('infection', 11)) {
            cap = Decimal.dInf
            if (hasUpgrade('antiamogus', 41)) cap = upgradeEffect('antiamogus', 41)
            player.antiamogus.beans = player.antiamogus.beans.add(tmp.antiamogus.Beangain.times(diff).times(tmp.antiamogus.getBeansSpeed)).min(cap)
        }
        if (player.antiamogus.levelin) {
            if (player.antiamogus.beans.gte(tmp.antiamogus.LVLReq)) {
                if (!hasUpgrade('antiamogus', 52)){if (!hasMilestone('antigh', 3)){player.antiamogus.beans = player.antiamogus.beans.sub(tmp.antiamogus.LVLReq).max(0)}
                player.antiamogus.level = player.antiamogus.level.add(1)}
                if (hasUpgrade('antiamogus', 52)){ player.antiamogus.level = player.antiamogus.beans.times(tmp.antiamogus.XPMult).div(1e11).log(1.05).pow(0.8).add(2).floor()
                    if (!hasMilestone('antigh', 3)){player.antiamogus.beans = player.antiamogus.beans.sub(tmp.antiamogus.LVLReq).max(0)}}
            }
        }
        if (player.antiamogus.tierin) {
            if (player.antiamogus.level.gte(tmp.antiamogus.TierReq)) {
                if (!hasUpgrade('antiamogus', 53)){if (!hasMilestone('antigh', 2)){player.antiamogus.level = player.antiamogus.level.sub(tmp.antiamogus.TierReq).max(1)}
                player.antiamogus.tier = player.antiamogus.tier.add(1)}
                if (hasUpgrade('antiamogus', 53)){
                    player.antiamogus.tier = Decimal.sub(player.antiamogus.level,50).times(1.6).add(1).pow(0.5).add(3).div(2).floor()
                    if (!hasMilestone('antigh', 2)){player.antiamogus.level = player.antiamogus.level.sub(tmp.antiamogus.TierReq).max(1)}}
            }
        }
    },
})
addLayer('antip', {
    name: "anti-prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal (0),
    }},
    tooltip() {
       let base = formatWhole(player.antip.points)+" prestige points"
       return base
    },
    color: "#31AEB0",
    requires: new Decimal ("50"), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "bean levels", // Name of resource prestige is based on
    baseAmount() {return player.antiamogus.level}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal (1)
        if (hasMilestone('antic', 0)) mult = mult.times(Decimal.pow(1.2, player.antic.milestones.length))
        if (hasUpgrade('antip', 11)) mult = mult.times(upgradeEffect('antip', 11))
        if (player.difficulty.staticResBoost) mult = mult.times(2)
        if (hasUpgrade('antic', 4)) mult = mult.times(2)
        if (hasMilestone('antigh', 2)) mult = mult.div(tmp.antigh.milestones[2].effect)
        mult = mult.times(tmp.antic.effect.pp)
        mult = mult.times(tmp.antigh.effect.PC)
        mult = mult.times(challengeEffect('antip', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        expo = new Decimal (1)
        return expo
    },
    passiveGeneration() {
        if (hasUpgrade('antic', 12)&&inChallenge('infection', 11)&&(player.antip.activeChallenge==null)) return upgradeEffect('antic', 12)
        return 0
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown() {
        return inChallenge('infection', 11)&&(hasMilestone('antiamogus', 3))
    },
    branches: ['antiamogus'],
    getResetGain() {
        if (player.antiamogus.level.lt(tmp.antip.requires)) return new Decimal (0)
        return Decimal.pow(tmp.antip.Gainbase, player.antiamogus.level.sub(tmp.antip.requires).div(10).max(0)).times(tmp.antip.gainMult).pow(tmp.antip.gainExp).floor()
    },
    getNextAt(canMax=false) {
        if (player.antiamogus.level.lt(tmp.antip.requires)) return tmp.antip.requires
        return Decimal.add(tmp.antip.requires, tmp.antip.getResetGain.add(1).pow(Decimal.div(1, tmp.antip.gainExp)).div(tmp.antip.gainMult).log(tmp.antip.Gainbase).times(10))},
    doReset(l) {
        if ((layers[l].row > this.row)&&(inChallenge('infection', 11)))
        {
        let keep = ['challenges','milestones', 'upgrades']
        if (!inChallenge('infection', 11)) {}
        if (inChallenge('infection', 11)) {layerDataReset(this.layer, keep)}
    }},
    Gainbase() {return new Decimal (1.3)},
    effect() {
        return {
            be: Decimal.add(1, player[this.layer].best.pow(0.4).div(25)),
            bb: player[this.layer].best.add(1).max(1).log(20).pow(0.2).min(2)}
    },
    effectDescription() {return "translated to a "+format(tmp.antip.effect.be)+"x boost to bean gain and a +"+format(tmp.antip.effect.bb)+" to B-Booster's base"},
    milestones: {
        0: {
            requirementDescription: "1 Total PP (1)",
            done() {return player[this.layer].total.gte(1)},
            effectDescription() {return "Multiply Bean gain by 1.2 per milestone, Keep prestige upgrades, Automatically buy <b>accelerators</b>"},
            },
        1: {
                requirementDescription: "2 Total PP (2)",
                done() {return player[this.layer].total.gte(2)},
                effectDescription() {return "Perks always unlocked, Double Bean XPerience gain. [Basically Divide Bean Level's Requirement by 2]"},
            },
        2: {
                requirementDescription: "3 Total PP (3)",
                done() {return player[this.layer].total.gte(3)},
                effectDescription() {return "Unlock Bean XP buyable, Gain 10% of crewmate gain on reset per second"},
            },
        3: {
                requirementDescription: "4 Total PP (4)",
                done() {return player[this.layer].total.gte(4)},
                effectDescription() {return "Unlock Bean Tiers and Automation Upgrades, Keep Crewmate upgrades."},
            },
        4: {
                requirementDescription: "10 Best PP (5)",
                done() {return player[this.layer].best.gte(10)},
                effectDescription() {return "Unlock an infection challenge."},
            },
        5: {
                requirementDescription: "Bean Level 180 (6)",
                done() {return player.antiamogus.level.gte(180)},
                effectDescription() {return "Multiply Bean cap by 6, Multiply bean gain by your bean tier."},
            },
        6: {
                requirementDescription: "Bean Tier 10 (7)",
                done() {return player.antiamogus.tier.gte(10)},
                effectDescription() {return "Multiply Bean speed and XP by your bean tier."},
            },
        7: {
                requirementDescription: "Bean Level 295 (8)",
                done() {return player.antiamogus.level.gte(295)},
                effectDescription() {return "Multiply bean gain by 2.5, Unlock a new layer."},
            },
    },
    upgrades:{
        11: {
            title: "Prestige Upgrade A1",
        	description: "Multiply crewmate and prestige gain based on Beans.",
         	cost: new Decimal (5),
            tooltip() {return "Effect Formula: floor(log<sub>10</sub>[Beans]<sup>0.5</sup>)"},
            effect() {
                let base = player.antiamogus.beans.max(1).log10().max(1)
                let pow = new Decimal (0.5)
                return base.pow(pow).floor()
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return player[this.layer].best.gte(1)}
        },
        12: {
            title: "Prestige Upgrade A2",
        	description: "Multiply Bean XP gain based on best prestige points.",
         	cost: new Decimal (8),
             tooltip() {return "Effect Formula: ln[PP]<sup>1.25</sup>"},
             effect() {
                let base = player.antip.best.max(1).ln().max(1)
                let pow = new Decimal (1.25)
                return base.pow(pow)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('antip', 11)}
        },
        13: {
            title: "Prestige Upgrade A3",
        	description: "Multiply Bean gain by 1.6 per upgrade but Multiply next upgrade's cost by 2.",
         	cost() {return new Decimal (14).times(hasUpgrade(this.layer, 14) ? 2 : 1)},
             effect() {
                let base = new Decimal (1.6)
                let pow = new Decimal (player.antip.upgrades.length)
                return base.pow(pow)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('antip', 12)}
        },
        14: {
            title: "Prestige Upgrade A4",
        	description: "Multiply bean gain based on Total Perks but Multiply previous upgrade's cost by 2.",
         	cost() {return new Decimal (14).times(hasUpgrade(this.layer, 13) ? 2 : 1)},
            tooltip() {return "Effect Formula: [Perks]<sup>0.25</sup>"},
             effect() {
                let base = player.antiamogus.perks.max(1)
                let pow = new Decimal (0.25)
                return base.pow(pow)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('antip', 12)}
        },
        15: {
            title: "Prestige Upgrade A5",
        	description: "Multiply DP gain by 2 per Bean Tier, Unlock Crystalize.",
         	cost: new Decimal (40),
             effect() {
                let base = new Decimal (2)
                let pow = player.antiamogus.tier.max(0)
                return base.pow(pow)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('antip', 13)&&hasUpgrade('antip', 14)}
        },
    },
    challenges: {
        11: {
            name: "Simple One",
            unlocked() {return hasMilestone('antic', 2)},
            challengeDescription() {return "No Nerfs or Buff at all.<br>Completions: "+formatWhole(challengeCompletions(this.layer, this.id))+"/"+formatWhole(this.completionLimit())},
            goal() {return Decimal.add(200, Decimal.times(20, new Decimal (challengeCompletions(this.layer, this.id)).max(0)))},
            goalDescription() {return "Bean Level "+formatWhole(this.goal())},
            completionLimit() {return new Decimal (8)},
            rewardEffect() {return Decimal.pow(3, new Decimal (challengeCompletions(this.layer, this.id)).max(0))},
            rewardDescription() {return "Multiply bean and crewmate gain by 3 per completion Currently: "+format(challengeEffect(this.layer, this.id))+"x"},
            canComplete: function() {return player.antiamogus.level.gte(this.goal())},
        },
        12: {
            name: "Lesser Bean",
            unlocked() {return hasMilestone('antic', 2)},
            challengeDescription() {return "Raise bean gain to the 0.8th power.<br>Completions: "+formatWhole(challengeCompletions(this.layer, this.id))+"/"+formatWhole(this.completionLimit())},
            goal() {return Decimal.add(175, Decimal.times(25, new Decimal (challengeCompletions(this.layer, this.id)).max(0)))},
            goalDescription() {return "Bean Level "+formatWhole(this.goal())},
            completionLimit() {return new Decimal (8)},
            rewardEffect() {return Decimal.pow(2, new Decimal (challengeCompletions(this.layer, this.id)).max(0))},
            rewardDescription() {return "Multiply bean XP gain by 2 per completion Currently: "+format(challengeEffect(this.layer, this.id))+"x"},
            canComplete: function() {return player.antiamogus.level.gte(this.goal())},
        },
        13: {
            name: "Step It Up",
            unlocked() {return hasMilestone('antigh', 1)},
            challengeDescription() {return "Level's requirement is much more expensive.<br>Completions: "+formatWhole(challengeCompletions(this.layer, this.id))+"/"+formatWhole(this.completionLimit())},
            goal() {return Decimal.add(175, Decimal.times(25, new Decimal (challengeCompletions(this.layer, this.id)).max(0)))},
            goalDescription() {return "Bean Level "+formatWhole(this.goal())},
            completionLimit() {return new Decimal (8)},
            rewardEffect() {return Decimal.pow(1.15, new Decimal (challengeCompletions(this.layer, this.id)).max(0))},
            rewardDescription() {return "Multiply prestige gain by 1.15 per completion Currently: "+format(challengeEffect(this.layer, this.id))+"x"},
            canComplete: function() {return player.antiamogus.level.gte(this.goal())},
        },
        14: {
            name: "Beanless",
            unlocked() {return hasMilestone('antigh', 5)},
            challengeDescription() {return "You can't buy any bean buyables.<br>Completions: "+formatWhole(challengeCompletions(this.layer, this.id))+"/"+formatWhole(this.completionLimit())},
            goal() {return Decimal.add(250, Decimal.times(25, new Decimal (challengeCompletions(this.layer, this.id)).max(0)))},
            goalDescription() {return "Bean Level "+formatWhole(this.goal())},
            completionLimit() {return new Decimal (8)},
            rewardEffect() {return Decimal.times(0.25, new Decimal (challengeCompletions(this.layer, this.id)).max(0)).add(1)},
            rewardDescription() {return "Increase perk gain by +25% per completion Currently: "+format(challengeEffect(this.layer, this.id))+"x"},
            canComplete: function() {return player.antiamogus.level.gte(this.goal())},
        },
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
                ["display-text",
                function() {
                    return "Doing a Prestige will reset Crewmates, Crewmate upgrades, Beans, Bean Buyables, Bean Perks and Bean Level."
                }],
                "milestones",
                "blank",
                "blank",
                ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15]]],
                "blank",
        ]
    },
    "Challenges": {
        unlocked(){return hasMilestone('antic', 2)},
        content:[
            "main-display",
                "blank",
                ["prestige-button", "", function (){ return false ? {'display': 'none'} : {}}],
                "blank",
                "resource-display",
                ["display-text",
                function() {
                    return "Doing a Prestige will reset Crewmates, Crewmate upgrades, Beans, Bean Buyables, Bean Perks and Bean Level."
                }],
                "blank",
                "blank",
                "challenges",
                "blank",
        ]
    },
    },
})
addLayer('antic', {
    name: "anti-crystalize", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "💎", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal (0),
    }},
    tooltip() {
       let base = formatWhole(player.antic.points)+" crystals"
       return base
    },
    color: "#A020F0",
    requires: new Decimal ("8"), // Can be a function that takes requirement increases into account
    resource: "crystals", // Name of prestige currency
    baseResource: "bean tiers", // Name of resource prestige is based on
    baseAmount() {return player.antiamogus.tier}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal (1)
        mult = mult.times(tmp.antigh.effect.PC)
        if (hasUpgrade('antic', 13)) mult = mult.times(upgradeEffect('antic', 13))
        if (player.difficulty.staticResBoost) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        expo = new Decimal (1)
        return expo
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown() {
        return inChallenge('infection', 11)&&(hasUpgrade('antip', 15))
    },
    branches: ['antip'],
    getResetGain() {
        if (player.antiamogus.tier.lt(tmp.antic.requires)) return new Decimal (0)
        return Decimal.pow(tmp.antic.Gainbase, player.antiamogus.tier.sub(tmp.antic.requires).max(0)).times(tmp.antic.gainMult).pow(tmp.antic.gainExp).floor().max(1)
    },
    getNextAt(canMax=false) {return Decimal.add(tmp.antic.requires, tmp.antic.getResetGain.add(1).pow(Decimal.div(1, tmp.antic.gainExp)).div(tmp.antic.gainMult).log(tmp.antic.Gainbase)).max(tmp.antic.requires)},
    doReset(l) {
        if ((layers[l].row > this.row)&&(inChallenge('infection', 11)))
        {
        let keep = ['milestones','upgrades']
        if (!inChallenge('infection', 11)) {}
        if (inChallenge('infection', 11)) {layerDataReset(this.layer, keep)}
    }},
    Gainbase() {return new Decimal (1.3)},
    effect() {
        return {
            be: Decimal.add(1, player[this.layer].best.pow(0.5).div(25)),
            pp: Decimal.add(1, player[this.layer].best.add(1).max(1).log10().pow(0.4))}
    },
    effectDescription() {return "translated to a "+format(tmp.antic.effect.be)+"x boost to bean gain and a "+format(tmp.antic.effect.pp)+"x boost to prestige gain"},
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
                    return "Doing a Crystalize will reset everything prestige does, Bean Tiers and Prestige Points."
                }],
                "milestones",
                "blank",
                "blank",
                ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15]]],
                "blank",
        ]
    },
    },
    milestones: {
        0: {
            requirementDescription: "1 Total Crystal (1)",
            done() {return player[this.layer].total.gte(1)},
            effectDescription() {return "Multiply Prestige gain by 1.2 per milestone."},
            },
        1: {
                requirementDescription: "3 Total Crystals (2)",
                done() {return player[this.layer].total.gte(3)},
                effectDescription() {return "Multiply Bean generating speed by 1.2 per milestone, Multiply bean gain by 5."},
            },
        2: {
                requirementDescription: "4 Total Crystals (3)",
                done() {return player[this.layer].total.gte(4)},
                effectDescription() {return "Unlock 2 Prestige Challenges, Keep Prestige Challenges"},
            },
    },
    upgrades:{
        11: {
            title: "Crystalize Upgrade A1",
        	description: "Multiply bean XP gain by 2 per upgrade, Unlock XP Perk.",
         	cost: new Decimal (2),
             effect() {
                let base = new Decimal (2)
                let pow = new Decimal (player.antic.upgrades.length)
                return base.pow(pow)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return player[this.layer].best.gte(1)}
        },
        12: {
            title: "Crystalize Upgrade A2",
        	description: "Gain 1% of prestige gain on reset outside prestige challenges per upgrade, Multiply bean gain by 1.6.",
         	cost: new Decimal (3),
             effect() {
                let base = new Decimal (player.antic.upgrades.length).div(100)
                return base
            },
            effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id).times(100))+"%" },
            unlocked() {return player.antigh.best.gte(1)&&(hasMilestone('antigh', 0))}
        },
        13: {
            title: "Crystalize Upgrade A3",
        	description: "Multiply crystal gain based on prestige points.",
            tooltip() {return "Effect Formula: floor(log<sub>10</sub>[PP]<sup>0.5</sup>)"},
         	cost: new Decimal (5),
             effect() {
                let base = player.antip.points.max(1).log10().max(1)
                let pow = new Decimal (0.5)
                return base.pow(pow).floor()
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return player.antigh.best.gte(2)&&(hasMilestone('antigh', 0))}
        },
        14: {
            title: "Crystalize Upgrade A4",
        	description: "Multiply bean gain by bean level, Multiply Prestige gain by 2.",
         	cost: new Decimal (8),
            unlocked() {return player.antigh.best.gte(3)&&(hasMilestone('antigh', 0))}
        },
        15: {
            title: "Crystalize Upgrade A5",
        	description: "Multiply DP gain by bean level.",
         	cost: new Decimal (13),
            unlocked() {return player.antigh.best.gte(3)&&(hasMilestone('antigh', 0))}
        },
    }
})
addLayer('antigh', {
    name: "anti-grasshop", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "↷", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal (0),
    }},
    tooltip() {
       let base = formatWhole(player.antigh.points)+" grasshop?"
       return base
    },
    color: "#FFE6E6",
    requires: new Decimal ("300"), // Can be a function that takes requirement increases into account
    resource: "grasshop?", // Name of prestige currency
    baseResource: "bean levels", // Name of resource prestige is based on
    baseAmount() {return player.antiamogus.level}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal (1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        expo = new Decimal (1)
        return expo
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    layerShown() {
        return inChallenge('infection', 11)&&(hasMilestone('antip', 7))
    },
    branches: ['antip'],
    getResetGain() {
        if (player.antiamogus.level.lt(tmp.antigh.requires.add(player.antigh.points.times(15)))) return new Decimal (0)
        return player.antiamogus.level.sub(tmp.antigh.requires.add(player.antigh.points.sub(1).times(15))).div(15).floor().min(1)
    },
    getNextAt(canMax=false) {return Decimal.add(tmp.antigh.requires, player.antigh.points.times(15))},
    doReset(l) {
        if ((layers[l].row > this.row)&&(inChallenge('infection', 11)))
        {
        let keep = ['milestones']
        if (!inChallenge('infection', 11)) {}
        if (inChallenge('infection', 11)) {layerDataReset(this.layer, keep)}
    }},
    effect() {
        return {
            D: Decimal.pow(player.antigh.points.max(0).add(1), 8),
            PC: Decimal.add(1, player.antigh.points.max(0).pow(2).div(20))
        }
    },
    effectDescription() {return "translated to a "+format(tmp.antigh.effect.D)+"x boost to DP gain and a "+format(tmp.antigh.effect.PC)+"x boost to prestige and crystal gain"},
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
                    return "Doing a Grasshop? will reset everything crystalize does and Crystals."
                }],
                "milestones",
                "blank",
                "blank",
        ]
    },
    },
    milestones: {
        0: {
            requirementDescription: "1 Grasshop? (1)",
            done() {return player[this.layer].total.gte(1)},
            effect() {return Decimal.pow(1.5, player.antigh.best.max(0))},
            effectDescription() {return "Keep crystal upgrades, Multiply Bean gain by 1.5 per grasshop? Unlock a crystal upgrade per grasshop ending at 4, Currently: "+format(this.effect())+"x"}, // 14 55 42 22 44 53 42 Wait GCI...?
            },
        1: {
                requirementDescription: "2 Grasshop? (2)",
                done() {return player[this.layer].total.gte(2)},
                effect() {return Decimal.pow(1.2, player.antigh.best.max(0))},
                effectDescription() {return "Multiply Bean XP gain by 1.2 per grasshop? Unlock another prestige challenge, Currently: "+format(this.effect())+"x"},
           },
        2: {
            requirementDescription: "3 Grasshop? (3)",
            done() {return player[this.layer].total.gte(3)},
            effect() {return Decimal.pow(1.2, player.antigh.best.max(0))},
            effectDescription() {return "Multiply prestige gain by 1.2 per grasshop? Bean Tiers don't consume your bean levels, Currently: "+format(this.effect())+"x"},
           },
        3: {
            requirementDescription: "4 Grasshop? (4)",
            done() {return player[this.layer].total.gte(4)},
            effect() {return Decimal.pow(3, player.antigh.best.max(0))},
            effectDescription() {return "Multiply DP gain by 3 per grasshop? Bean Levels don't consume your beans, Currently: "+format(this.effect())+"x"},
           },
        4: {
            requirementDescription: "5 Grasshop? (5)",
            done() {return player[this.layer].total.gte(5)},
            effect() {return Decimal.pow(5, player.antigh.best.max(0))},
            effectDescription() {return "Multiply Chess gain by 5 per grasshop?, Unlock another prestige challenge, Currently: "+format(this.effect())+"x"},
           },
        5: {
            requirementDescription: "6 Grasshop? (6)",
            done() {return player[this.layer].total.gte(6)},
            effectDescription() {return "Buying Bean buyables doesn't consume your bean."},
           },
        6: {
            requirementDescription: "7 Grasshop? (7)",
            done() {return player[this.layer].total.gte(7)},
            effectDescription() {return "Multiply Bean generating speed by grasshop?."},
           },
        7: {
            requirementDescription: "8 Grasshop? (8)",
            done() {return player[this.layer].total.gte(8)},
            effectDescription() {return "STFTKI H AOX HBXNX.E [Key: MOENTCKIA]"}, // Key: MOENTCKIA
           },
    },
})