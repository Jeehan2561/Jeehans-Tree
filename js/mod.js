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
	num: "1",
	name: "Start",
}

let changelog = `<h1>Changelog:</h1><br>
    <h2>Warning: This mod may be unbalanced</h2><br>
	<h3>V1 - Start</h3><br>
	    - Added a layer.
		- Added 15 upgrades.
		- Added 2 buyables.
		Endgame: - 16,777,216 amogus`
	

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade('amogus', 11)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal (0)

	let gain = new Decimal (1)
	if (hasUpgrade('amogus', 12)) gain = gain.times(upgradeEffect('amogus', 12))
	if (hasUpgrade('amogus', 13)) gain = gain.times(upgradeEffect('amogus', 13))
	if (hasUpgrade('amogus', 14)) gain = gain.times(upgradeEffect('amogus', 14))
	if (hasUpgrade('amogus', 24)) gain = gain.times(upgradeEffect('amogus', 24))
	if (hasUpgrade('amogus', 25)) gain = gain.times(upgradeEffect('amogus', 25))
	if (hasUpgrade('amogus', 34)) gain = gain.times(upgradeEffect('amogus', 34))
	gain = gain.times(tmp.amogus.getABeffect)
	gain = gain.div(getPointDivider())
	return gain
}
function getPointDivider() {
	let base = player.points.max(10).log(10).max(1).pow(2)
	if (hasUpgrade('amogus', 22)) base = base.pow(0.5)
	return base
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	() => `<br>If you found a bug Please contact MomentCookie#6268 on Discord.`,
	"<br>",
	() => player.points.gte(10)&(canGenPoints()) ? `Your point gain is divided by ` + format(getPointDivider())  : "",
	"<br>",
	() => player.keepGoing ? `You're past endgame. The Game may not balanced after this.` : ""
]

// Determines when the game "ends"
function isEndgame() {
	return player.amogus.points.gte(new Decimal("16777216"))
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