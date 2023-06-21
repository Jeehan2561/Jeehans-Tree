let modInfo = {
	name: "Le Scaling Elevator",
	id: "MCKLSE",
	author: "MomentCookie (MomentCookina)",
	pointsName: "floor",
	modFiles: ["layers.js", "tree.js"],

	discordName: "MomentCookie's Modded stuffs",
	discordLink: "https://discord.gg/ccbBZHYsTv",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1",
	name: "Start",
}

let changelog = `<h1>Changelog:</h1><br>
    <h2>Warning: This mod may be unbalanced</h2><br>
	<h3>v1 - Start</h3><br>
	    - Added a prestige layer.<br>
		- Added 10 upgrades.<br>
		- Added 2 buyables.<br>
		Endgame: - Floor 2<br><br>`
	

let winText = "Congratulations! You have reached the end and beaten this game, I know this is too short, but for now, You can join my discord server and check the original idea."

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal (0)

	let gain = new Decimal (0.2)
	gain = gain.times(tmp.p.effect)
	gain = gain.times(buyableEffect('p', 11))
	if (hasUpgrade('p', 13)) gain = gain.times(upgradeEffect('p', 13))
	if (hasUpgrade('p', 14)) gain = gain.times(upgradeEffect('p', 14))
	if (hasUpgrade('p', 15)) gain = gain.times(upgradeEffect('p', 15))
	if (hasUpgrade('p', 21)) gain = gain.times(upgradeEffect('p', 21))
	if (hasUpgrade('p', 22)) gain = gain.times(upgradeEffect('p', 22))
	gain = gain.div(FloorDivider())
	return gain
}

function FloorDivider() {
	return Decimal.pow(1e4, player.p.floor.max(0).floor())
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	runTime: new Decimal(0)
}}

// Display extra things at the top of the page
var displayThings = [
	() => "<br>If you found a bug or find yourself stuck Please contact MomentCookie#6268 on Discord.",
	"<br>",
	() => "Your elevator's speed is divided by 10,000 per floor starting at 1.<br>Currently: /"+format(FloorDivider()),
	() => player.keepGoing ? "You're past endgame. The Game may not balanced after this." : ""
]

// Determines when the game "ends"
function isEndgame() {
	return player.p.floor.add(player.points).gte(2)
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