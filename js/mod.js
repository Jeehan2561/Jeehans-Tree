let modInfo = {
	name: "Le Underrated Forest",
	id: "MCKLUF",
	author: "MomentCookie (Cookina)",
	authormore: "Harry",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],
	discordName: "MomentCookie's Modded stuffs",
	discordLink: "https://discord.gg/ccbBZHYsTv",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.0.1",
	name: "Rebalancing",
}

let changelog = `<h1>Changelog:</h1><br>
    <h2>Warning: This mod may be unbalanced</h2><br>
	<h3>v1 - Operation</h3><br>
	    - Added The Operator Tree from Harry.<br>
		- Added v0, v0.1, v0.2, v0.3, v0.4 to The Operator Tree<br>
		- Added 9 upgrades.<br>
		- Added 3 buyables.<br>
		- Added 5 milestones.<br>
		- Added 4 prestige layers.<br>
		- Added 10 achievements.<br>
		Endgame: - Buy A new Addventure<br><br>
	<h3>v1.0.1 - Rebalancing</h3><br>
	    - Added The Operator Tree from Harry.<br>
		- Added v0, v0.1, v0.2, v0.3, v0.4 to The Operator Tree<br>
		- Added 9 upgrades.<br>
		- Added 3 buyables.<br>
		- Added 5 milestones.<br>
		- Added 4 prestige layers.<br>
		- Added 10 achievements.<br>
		Endgame: - Buy A new Addventure<br><br>
	`
	

let winText = "Congratulations! You have reached the end and beaten this game, Thanks to some mod creators that allow me to include their contents, Anyways You can join my discord server and check out my other games."

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

	let gain = new Decimal (0.1)
	if (player.add.version.gte(1)) gain = gain.add(tmp.add.effect)
	if (hasUpgrade('add', 11)) gain = gain.add(upgradeEffect('add', 11))
	if (hasUpgrade('add', 12)) gain = gain.add(upgradeEffect('add', 12))
	if (hasUpgrade('add', 13)) gain = gain.add(upgradeEffect('add', 13))
	if (hasUpgrade('mul', 11)) gain = gain.add(upgradeEffect('mul', 11))
	gain = gain.add(buyableEffect('add', 11))
	gain = gain.times(tmp.mul.effect)
	if (hasUpgrade('mul', 13)) gain = gain.times(upgradeEffect('mul', 13))
	gain = gain.times(buyableEffect('a', 11))
	gain = gain.times(buyableEffect('sub', 11).p)
	if (hasMilestone('rat', 1)) gain = gain.times(milestoneEffect('rat', 1))
	if (hasMilestone('rat', 2)) gain = gain.times(milestoneEffect('rat', 2))
	return gain
}
// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	universe: D(0),
	chalpow: D(0) // YACT:A Points [Challenge Powers]
}}

// Display extra things at the top of the page
var displayThings = [
	() => "<br>If you found a bug or find yourself stuck Please contact MomentCookie#6268 on Discord.",
	() => "<br>You're inside "+["The Operator Tree"][player.universe]+" "+[[tmp.add.versionList][0][player.add.version]][player.universe]+".",
	() => player.keepGoing ? "You're past endgame. The Game may not be balanced after this." : ""
]

// Determines when the game "ends"
function isEndgame() {
	return hasUpgrade('add', 23)
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