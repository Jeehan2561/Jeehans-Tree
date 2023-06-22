let modInfo = {
	name: "Le Boring Tree",
	id: "JHLBT",
	author: "MomentCookie (JeehanMoment)",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "MomentCookie's Modded stuffs",
	discordLink: "https://discord.gg/ccbBZHYsTv",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.5.2",
	name: "Steel Time!",
}

let changelog = `<h1>Changelog:</h1><br>
    <h2>Warning: This mod may be unbalanced</h2><br>
	<h3>V1 - Start</h3><br>
	    - Added a layer.<br>
		- Added 15 upgrades.<br>
		- Added 2 buyables.<br>
		Endgame: - 16,777,216 amogus<br><br>
	<h3>V1.1 - BB</h3><br>
	    - Added 3 layers.<br>
		- Added 15 upgrades.<br>
		- Added 3 buyables.<br>
		- Added 3 milestones.<br>
		- Added 50 Goals.<br>
		- Added 3 Difficulty Modifiers.<br>
		- Easy/Normal mode for each one (i don't like to make stuffs harder).<br>
		Endgame: - 26 boring boosters (even you can get 27 or more idc)<br><br>
	<h3>V1.1.1 - Balance Boost</h3><br>
	    - Fixed Several Bugs.<br>
		- Balance First Layer lil' better (by lowering the upgrades' cost)<br>
		- Multiplied Booster Cost by 0.8 (cause i was bored)<br>
		Endgame: - 26 boring boosters (even you can get 27 or more idc)<br><br>
	<h3>V1.2 - Classical Case</h3><br>
		- Added a prestige layer<br>
		- Moved Point gain nerfs lists in a side layer.<br>
		- Added 30 upgrades<br>
		- Added 12 buyables<br>
		- Added 5 milestones.<br>
		- Added 5 Challenges<br>
		- Fixed some several Displays<br>
		Endgame: - 42 total MP<br><br>
	<h3>V1.3 - Super Deadly</h3><br>
		- Added 2 prestige layers<br>
		- Added a point gain cap (just to prevent inflation).<br>
		- Added 40 upgrades<br>
		- Added 9 buyables<br>
		- Added 14 milestones.<br>
		- Added 5 Challenges<br>
		- REMOVED A DIFFICULTY MODIFIER (IT MEANT TO BE DONE)<br>
		Endgame: - 1.800e308 DP<br><br>
	<h3>V1.4 - Infecting Death</h3><br>
		- Added 2 prestige layers<br>
		- New fonts (Just a little testing...)<br>
		- Remove the MP's effect (I just forgot to make it work).<br>
		- Added 29 upgrades<br>
		- Added 2 buyables<br>
		- Added 2 notations<br>
		- Added 5 milestones.<br>
		- Added a challenge<br>
		Endgame: - 237 DV and B-U E3<br><br>
	<h3>V1.4a - The Decelerated Realm</h3><br>
		- Added a prestige layer [semi-finished]<br>
		- Added a new theme (Just a little testing =])<br>
		- Added 10 upgrades<br>
		- Added 12 buyables<br>
		- Added 3 notations<br>
		- Added 12 milestones.<br>
		Endgame: - Bean Level 80<br><br>
	<h3>V1.5 - The Decelerated References</h3><br>
		- Added more content to previous prestige layer<br>
		- Added 2 new prestige layer<br>
		- Added 10 upgrades<br>
		- Added a buyable<br>
		- Added 26 milestones.<br>
		- Added 10 achievements.<br>
		- Added some more QoLs and Automations.<br>
		- Decreased some upgrade and milestone's cost.<br>
		- Reworded some upgrades, buyables and milestones<br>
		Endgame: - GH? 8<br><br>
		<h3>V1.5.1 - The Decelerated Patch</h3><br>
		- Fixed Bulk Buying Bean Buyables?
		- Fixed Bulk Leveling up
		Endgame: - GH? 8<br><br>
		<h3>V1.5.2 - Steel Time!</h3><br>
		- FIXED EXPORT YAYAYAYAYAY<br>
		- Added a prestige layer<br>
		- Fixed prestige gain<br>
		Endgame: - GH? 24 and S Milestone 8 <br><br>
		`
	

let winText = "Congratulations! You have reached the end and beaten this game, I know this is too boring, but for now, You can join my discord server."

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	if (!player.difficulty.gameStarted) return false
	return hasUpgrade('amogus', 11)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal (0)

	let gain = new Decimal (1)
	gain = gain.add(buyableEffect('amogus', 24).Ef2)
	if (hasUpgrade('antiamogus', 42)) gain = gain.add(player.antiamogus.upgrades.length)
	if (hasMilestone('antigh', 23)) gain = gain.add(player.antigh.points.max(0))
	gain = gain.pow(buyableEffect('chess', 62).Ef)
	if (hasMilestone('antiamogus', 0)) gain = gain.pow(1.05)
	if (inChallenge('chess', 14)) gain = gain.pow(getBuyableAmount('chess', 51).add(getBuyableAmount('chess', 52)).add(1))
	if (hasUpgrade('amogus', 12)) gain = gain.times(upgradeEffect('amogus', 12))
	if (hasUpgrade('amogus', 13)) gain = gain.times(upgradeEffect('amogus', 13))
	if (hasUpgrade('amogus', 14)) gain = gain.times(upgradeEffect('amogus', 14))
	if (hasUpgrade('amogus', 24)) gain = gain.times(upgradeEffect('amogus', 24))
	if (hasUpgrade('amogus', 25)) gain = gain.times(upgradeEffect('amogus', 25))
	if (hasUpgrade('amogus', 34)) gain = gain.times(upgradeEffect('amogus', 34))
	if (hasUpgrade('amogus', 41)) gain = gain.times(upgradeEffect('amogus', 41))
	gain = gain.times(tmp.amogus.getABeffect)
	if (hasUpgrade('booster', 33)) gain = gain.times(upgradeEffect('booster', 33))
	gain = gain.times(tmp.booster.effect)
	gain = gain.times(tmp.goal.effect)
	if (hasUpgrade('chess', 12)) gain = gain.times(upgradeEffect('chess', 12))
	if (hasUpgrade('chess', 21)) gain = gain.times(upgradeEffect('chess', 21))
	if (hasUpgrade('chess', 34)) gain = gain.times(upgradeEffect('chess', 34))
	gain = gain.times(buyableEffect('chess', 21).Ef)
	if (inChallenge('chess', 11)) gain = gain.div(1e100)
	if (inChallenge('chess', 14)) gain = gain.div(tmp.chess.PointDivinWazir)
	if (inChallenge('chess', 15)) gain = gain.div(1e150)
	if (hasUpgrade('dv', 11)) gain = gain.times(upgradeEffect('dv', 11))
	if (hasUpgrade('dv', 15)) gain = gain.times(upgradeEffect('dv', 15))
	if (inChallenge('infection', 11)) gain = new Decimal (1)
	if (hasMilestone('antigh', 23)&&inChallenge('infection', 11)) gain = gain.add(player.antigh.points.max(0))
	if (hasUpgrade('antiamogus', 42)&&inChallenge('infection', 11)) gain = gain.add(player.antiamogus.upgrades.length)
	gain = gain.times(tmp.antiamogus.Beaneffect)
	if (hasUpgrade('antiamogus', 11)) gain = gain.times(5).times(upgradeEffect('antiamogus', 11))
	if (hasUpgrade('antiamogus', 13)) gain = gain.times(upgradeEffect('antiamogus', 13))
	if (hasUpgrade('antiamogus', 14)) gain = gain.times(upgradeEffect('antiamogus', 14).P)
	if (hasUpgrade('antiamogus', 23)) gain = gain.times(upgradeEffect('antiamogus', 23))
	if (hasUpgrade('antiamogus', 25)) gain = gain.times(upgradeEffect('antiamogus', 25))
	if (player.difficulty.staticResBoost) gain = gain.times(2)
	if (hasUpgrade('sbooster', 14)&&(player.infection.activeChallenge==null)) gain = gain.pow(0.8)
	if (hasChallenge('chess', 11)&&(player.chess.activeChallenge==null)&&(player.infection.activeChallenge==null)) gain = gain.pow(1.05)
	if (inChallenge('chess', 21)) gain = gain.pow(0.5)
	if (inChallenge('chess', 24)) gain = gain.pow(0.04)
	if (inChallenge('chess', 25)) gain = gain.pow(0.04)
	if (!player.difficulty.gameStarted) gain = new Decimal (0)
	if (inChallenge('chess', 23)) gain = Decimal.pow(10, gain.max(1).log(10).pow(0.6))
	if (inChallenge('infection', 11)) gain = Decimal.pow(10, gain.max(1).log(10).pow(0.5))
	gain = gain.times(buyableEffect('antiamogus', 13).Ef)
	if (hasMilestone('antigh', 12)) gain = gain.times(tmp.antigh.milestones[12].effect)
	gain = gain.div(getPointDivider())
	return gain.min(getPointCap())
}
function getPointCap() {
	let cap = new Decimal ("1e500")
	if (hasMilestone('booster', 5)) cap = cap.times(tmp.booster.M5effect)
	if (hasMilestone('sbooster', 0)) cap = cap.times(Decimal.pow(1e8, player.sbooster.points.max(0)))
	if (hasMilestone('dv', 4)) cap = cap.times((player.amogus.ExAB).max(1))
	if (hasMilestone('dv', 6)) cap = cap.times((player.dv.dedpow).max(1))
	if (hasUpgrade('dv', 31)) cap = cap.times(upgradeEffect('dv', 31))
	if (hasUpgrade('dv', 31)) cap = cap.times(upgradeEffect('dv', 31))
	if (hasUpgrade('dv', 54)) cap = cap.times(upgradeEffect('dv', 54).PT)
	if (hasUpgrade('dv', 63)) cap = cap.times(upgradeEffect('dv', 63))
	if (hasUpgrade('dv', 71)) cap = cap.times(upgradeEffect('dv', 71))
	if (hasMilestone('dv', 10)) cap = cap.times(player.chess.points.max(1).ln().max(1).pow(5).pow(player.dv.milestones.length))
	if (hasMilestone('infection', 1)) cap = cap.times(Decimal.pow(250, getBuyableAmount('amogus', 21)))
	if (hasUpgrade('sbooster', 12)) cap = cap.pow(upgradeEffect('sbooster', 12))
	if (hasUpgrade('infection', 11)) cap = cap.times(upgradeEffect('infection', 11))
	if (hasUpgrade('sbooster', 15)&&(player.infection.activeChallenge==null)) cap = cap.pow(1.05)
	if (hasChallenge('chess', 24)&&(player.infection.activeChallenge==null)) cap = cap.pow(1.05)
	if (hasMilestone('dv', 8)&&(player.infection.activeChallenge==null)) cap = cap.pow(1.05)
	if (hasUpgrade('dv', 72)&&(player.infection.activeChallenge==null)) cap = cap.pow(upgradeEffect('dv', 72))
	cap = softcap(cap, new Decimal ("1e1000"), new Decimal (0.1))
	cap = cap.pow(tmp.infection.effect.PC)
	if (inChallenge('infection', 11)) cap = new Decimal ("1e500")
	if (hasUpgrade('antiamogus', 13)) cap = cap.times(upgradeEffect('antiamogus', 13))
	if (hasUpgrade('antiamogus', 14)) cap = cap.times(upgradeEffect('antiamogus', 14).PGC)
	if (hasUpgrade('antiamogus', 25)) cap = cap.times(upgradeEffect('antiamogus', 25))
	if (hasUpgrade('booster', 54)&&(player.infection.activeChallenge==null)) cap = cap.times(player.antiamogus.beans.max(2).log(2).pow(5))
	cap = cap.times(tmp.antiamogus.Beaneffect)
	cap = cap.times(buyableEffect('antiamogus', 13).Ef)
	if (hasMilestone('antigh', 17)) cap = cap.times(tmp.antigh.milestones[17].effect)
	return cap
}
function getPointDivider() {
	let base = player.points.max(10).log(10).max(1).pow(2)
	if (!inChallenge('infection', 11)) {if (hasUpgrade('amogus', 22)) base = base.pow(0.5)
	if (hasUpgrade('chess', 22)) base = base.pow(0.5)
	if (hasMilestone('sbooster', 1)) base = base.pow(0.5)}
	base = base.pow(getPointDividerExpo1())
	if (player.difficulty.dividerNerf) base = base.pow(1)
	if (hasMilestone('antiamogus', 1)) base = base.pow(1/1.05)
	if (hasMilestone('antiamogus', 0)&&inChallenge('infection', 11)) base = base.pow(0.5)
	base = base.min("1e10000")
	return base
}
function getPointDividerExpo1() {
	let base = new Decimal (1)
	if (player.points.gte(1e20)) base = player.points.div(1e20).max(0).add(1).log(2).add(10).log(10).pow(1.25)
	if (player.points.gte(1e100)) base = base.times(getPointDividerExpoMult())
	return base
}

function getPointDividerExpoMult() {
	let base = new Decimal (1)
	if (player.points.gte(1e100)) base = player.points.div(1e100).max(0).add(1).log(2).add(10).ln().pow(0.2)
	base = base.pow(getPointDividerExpo2())
	return base
}

function getPointDividerExpo2() {
	let base = new Decimal (1)
	if (player.points.gte("1.8e308")) base = player.points.div("1.8e308").max(0).add(1).log(10).add(10).log(10).pow(3)
	if (hasUpgrade('dv', 22)) base = base.pow(0.8)
	if (hasMilestone('infection', 5)) base = base.min(15)
	return base
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	runTime: new Decimal(0)
}}

// Display extra things at the top of the page
var displayThings = [
	() => "<br>If you found a bug or find yourself stuck Please contact MomentCookie#6268 on Discord.",
	"<br>",
	() => (player.difficulty.gameStarted) ? "You have spent "+formatTime(player.runTime)+" in this run" : "",
	"<br>",
	() => (player.points.gte(10)&&(canGenPoints())) ? "Your point gain is divided by "+format(getPointDivider())+" (check PGN layer for infos)" : "",
	"<br>",
	() => (player.points.gte("6.9e420")&&(canGenPoints())) ? "Your point gain will be capped at "+format(getPointCap())+" (check PGN layer for infos)" : "",
	"<br>",
	() => player.keepGoing ? "You're past endgame. The Game may not be balanced after this." : ""
]

// Determines when the game "ends"
function isEndgame() {
	return player.antigh.best.gte(24)&&hasMilestone('antisteel', 7)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}