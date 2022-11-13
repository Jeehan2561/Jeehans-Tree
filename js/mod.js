let modInfo = {
	name: "Le Boring Tree",
	id: "JHLBT",
	author: "MomentCookie (JeehanMoment)",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "JeehanMoment's Modded stuffs",
	discordLink: "https://discord.gg/ccbBZHYsTv",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.1.1",
	name: "Balance Boost",
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
		- Added 50 Goals.<br>
		- Added 3 Difficulty Modifiers.<br>
		- Easy/Normal mode for each one (i don't like to make stuffs harder).<br>
		Endgame: - 26 boring boosters (even you can get 27 or more idc)<br><br>
	<h3>V1.1.1 - Balance Boost</h3><br>
	    - Fixed Several Bugs.<br>
		- Balance First Layer lil' better (by lowering the upgrades' cost)<br>
		- Multiplied Booster Cost by 0.8 (cause i was bored)<br>
		Endgame: - 26 boring boosters (even you can get 27 or more idc)<br><br>`
	

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

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
	if (hasUpgrade('amogus', 12)) gain = gain.times(upgradeEffect('amogus', 12))
	if (hasUpgrade('amogus', 13)) gain = gain.times(upgradeEffect('amogus', 13))
	if (hasUpgrade('amogus', 14)) gain = gain.times(upgradeEffect('amogus', 14))
	if (hasUpgrade('amogus', 24)) gain = gain.times(upgradeEffect('amogus', 24))
	if (hasUpgrade('amogus', 25)) gain = gain.times(upgradeEffect('amogus', 25))
	if (hasUpgrade('amogus', 34)) gain = gain.times(upgradeEffect('amogus', 34))
	gain = gain.times(tmp.amogus.getABeffect)
	if (hasUpgrade('booster', 33)) gain = gain.times(upgradeEffect('booster', 33))
	gain = gain.times(tmp.booster.effect)
	gain = gain.times(tmp.goal.effect)
	gain = gain.div(getPointDivider())
	if (player.difficulty.staticResBoost) gain = gain.times(2)
	if (!player.difficulty.gameStarted) gain = new Decimal (0)
	return gain
}
function getPointDivider() {
	let base = player.points.max(10).log(10).max(1).pow(2)
	if (hasUpgrade('amogus', 22)) base = base.pow(0.5)
	base = base.pow(getPointDividerExpo1())
	if (player.difficulty.dividerNerf) base = base.pow(0.75)
	return base
}
function getPointDividerExpo1() {
	let base = new Decimal (1)
	if (player.points.gte(1e20)) base = player.points.div(1e20).max(0).add(1).log(2).add(10).log(10).pow(1.25)
	return base
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	runTime: new Decimal(0)
}}

// Display extra things at the top of the page
var displayThings = [
	() => `<br>If you found a bug Please contact MomentCookie#6268 on Discord.`,
	"<br>",
	() => player.points.gte(10)&(canGenPoints()) ? `Your point gain is divided by ` + format(getPointDivider()) + " (based on points)"  : "",
	"<br>",
	() => player.points.gte(1e20)&(canGenPoints()) ? `Previous Effect is raised to the ` + format(getPointDividerExpo1()) + "th power (based on points)"  : "",
	"<br>",
	() => player.keepGoing ? `You're past endgame. The Game may not balanced after this.` : ""
]

// Determines when the game "ends"
function isEndgame() {
	return player.booster.points.gte(new Decimal("26"))
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