let modInfo = {
	name: "Le Underrated Forest",
	id: "MCKLUF",
	author: "MomentCookie (Cookina)",
	authormore: "Harry, 42UR3, Thenonymous",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],
	discordName: "MomentCookie's Modded stuffs",
	discordLink: "https://discord.gg/ccbBZHYsTv",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.2",
	name: "Plant Thyme",
}

let changelog = `<h1>Changelog:</h1><br>
    <h2>Warning: This mod may be unbalanced</h2><br>
	<h3>v1 - Operation</h3><br>
	    - Added The Operator Tree from Harry.<br>
		- Added v0.0, v0.1, v0.2, v0.3, v0.4 to The Operator Tree<br>
		- Added 9 upgrades.<br>
		- Added 3 buyables.<br>
		- Added 5 milestones.<br>
		- Added 4 prestige layers.<br>
		- Added 10 achievements.<br>
		Endgame: - Buy A new Addventure<br><br>
	<h3>v1.0.1 - Rebalancing</h3><br>
	    - Rebalanced v1.<br>
		Endgame: - Buy A new Addventure<br><br>
	<h3>v1.1 - Challenging Adventure</h3><br>
	    - Added YACT:A from 42UR3.<br>
		- Added v0.5 to The Operator Tree<br>
		- Added v0.0, v0.1, v0.2 to YACT:A<br>
		- Added 3 buyables.<br>
		- Added 24 milestones.<br>
		- Added 12 challenges.<br>
		- Added 4 prestige layers.<br>
		- Added 10 achievements.<br>
		Endgame: - Buy A new Addventure<br><br>
	<h3>v1.2 - Plant Thyme</h3><br>
	    - Added The Plant Tree from Thenonymous.<br>
		- Added v0.6 to The Operator Tree<br>
		- Added v0.0, v1.0, v2.0 to The Plant Tree<br>
		- Added 43 upgrades.<br>
		- Added 6 buyables.<br>
		- Added 31 milestones.<br>
		- Added 3 challenges.<br>
		- Added 4 prestige layers.<br>
		- Added 15 achievements.<br>
		- Added Tree Switching QoLs and hotkeys.<br>
		- Fixed Bugs from previous version.<br>
		Endgame: - Reach 1e73 Points<br><br>
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
	if (hasMilestone('rat', 8)) gain = gain.add(player.rat.best.max(0).div(10))
	gain = gain.times(tmp.mul.effect)
	if (hasUpgrade('mul', 13)) gain = gain.times(upgradeEffect('mul', 13))
	gain = gain.times(buyableEffect('a', "A1"))
	gain = gain.times(buyableEffect('a', 11))
	gain = gain.times(buyableEffect('a', 12))
	gain = gain.times(buyableEffect('a', 13))
	gain = gain.times(buyableEffect('sub', 11).p)
	if (hasMilestone('rat', 1)) gain = gain.times(milestoneEffect('rat', 1))
	if (hasMilestone('rat', 2)) gain = gain.times(milestoneEffect('rat', 2))
	if (hasMilestone('rat', 3)) gain = gain.times((hasMilestone('rat', 4)) ? player.rat.best.max(2) : 2)
	if (hasMilestone('rat', 8)) gain = gain.times(player.add.version.max(1))
	if (hasMilestone('div', 2)) gain = gain.times(milestoneEffect('div', 2))
	if (inChallenge('I', 11)) gain = gain.div(tmp.I.ProveNerf)
	if (hasChallenge('I', 21)) gain = gain.times(challengeEffect('I', 21))
	gain = gain.times(tmp.I.effect)
	gain = gain.times(tmp.II.effect)
	gain = gain.times(tmp.pla.effect)
	gain = gain.times(tmp.gar.effect)
	if (hasMilestone('pla', 1)) gain = gain.times(milestoneEffect('pla', 1))
	if (hasUpgrade('pla', 31)) gain = gain.times(upgradeEffect('pla', 31))
	if (hasUpgrade('pla', 55)) gain = gain.times(upgradeEffect('pla', 55))
	if (hasUpgrade('pla', 65)) gain = gain.times(upgradeEffect('pla', 65))
	gain = gain.pow(D(1).add(challengeEffect('I', 12)))
	if (inChallenge('II', 12)) gain = gain.pow(0.5)
	gain = gain.pow(tmp.expo.effect)
	return gain
}
// YACT:A
function getChalPowGen() {
	let gain = D(challengeCompletions('I', 11)).max(0).div(10)
	if (hasChallenge('I', 12)) gain = gain.add(challengeEffect('I', 12))
	gain = gain.times(tmp.I.effect)
	gain = gain.times(tmp.II.effect)
	if (hasUpgrade('sub', 12)) gain = gain.times(upgradeEffect('sub', 12))
	if (hasChallenge('I', 22)) gain = gain.times(challengeEffect('I', 22))
	if (inChallenge('I', 12)) gain = gain.div(4)
	gain = gain.times(challengeEffect('II', 11))
	if (hasMilestone('div', 11)) gain = gain.times(milestoneEffect('div', 11))
	if (hasChallenge('II', 12)) gain = gain.times(challengeEffect('II', 12))
	if (hasUpgrade('pla', 63)) gain = gain.times(upgradeEffect('pla', 63))
	if (hasMilestone('rat', 4)) gain = gain.times(player.rat.best.max(1))
	gain = gain.times(tmp.III.fteff)
	if (hasMilestone('gar', 0)) gain = gain.times(milestoneEffect('gar', 0))
	if (inChallenge('II', 21)) gain = gain.div(tmp.II.BQII)
	if (inChallenge('I', 21)&&gain.gte(1)) gain = gain.pow(0.5)
	if (inChallenge('I', 21)&&gain.lt(1)) gain = gain.pow(2)
	if (inChallenge('II', 12)) gain = gain.pow(0.5)
	return gain
}
// TPT:O
function getPlaPtsGen() {
	let gain = D(0.1)
	if (hasUpgrade('gar', 12)) gain = gain.add(upgradeEffect('gar', 12))
	if (inChallenge('zon', 11)) gain = gain.div(player.pla.points.max(0).add(1))
	if (inChallenge('zon', 12)) gain = gain.div(getBuyableAmount('pla', 11).add(1))
	if (inChallenge('zon', 21)) gain = gain.div(tmp.zon.TTZNerf)
	gain = gain.times(buyableEffect('pla', 11).P)
	if (hasMilestone('div', 10)) gain = gain.times(milestoneEffect('div', 10))
	if (hasMilestone('pla', 0)) gain = gain.times(milestoneEffect('pla', 0))
	if (hasMilestone('pla', 3)) gain = gain.times(milestoneEffect('pla', 3))
	if (hasUpgrade('pla', 12)) gain = gain.times(upgradeEffect('pla', 12))
	if (hasUpgrade('pla', 14)) gain = gain.times(upgradeEffect('pla', 14))
	if (hasUpgrade('pla', 15)) gain = gain.times(upgradeEffect('pla', 15))
	if (hasUpgrade('pla', 24)) gain = gain.times(upgradeEffect('pla', 24))
	if (hasUpgrade('pla', 31)) gain = gain.times(upgradeEffect('pla', 31))
	if (hasUpgrade('pla', 32)) gain = gain.times(upgradeEffect('pla', 32))
	if (hasUpgrade('pla', 35)) gain = gain.times(upgradeEffect('pla', 35))
	if (hasUpgrade('pla', 42)) gain = gain.times(upgradeEffect('pla', 42))
	if (hasUpgrade('pla', 43)) gain = gain.times(upgradeEffect('pla', 43))
	if (hasUpgrade('pla', 51)) gain = gain.times(upgradeEffect('pla', 51))
	if (hasUpgrade('pla', 53)) gain = gain.times(upgradeEffect('pla', 53))
	if (hasUpgrade('pla', 65)) gain = gain.times(upgradeEffect('pla', 65))
	if (hasUpgrade('gar', 11)) gain = gain.times(upgradeEffect('gar', 11))
	if (hasUpgrade('gar', 21)) gain = gain.times(upgradeEffect('gar', 21))
	if (hasUpgrade('gar', 24)) gain = gain.times(upgradeEffect('gar', 24))
	if (hasUpgrade('gar', 25)) gain = gain.times(upgradeEffect('gar', 25))
	gain = gain.times(buyableEffect('gar', 11))
	gain = gain.times(buyableEffect('gar', 12))
	gain = gain.times(buyableEffect('gar', 13))
	gain = gain.times(challengeEffect('zon', 11))
	gain = gain.times(challengeEffect('zon', 12))
	gain = gain.times(challengeEffect('zon', 21))
	gain = gain.times(tmp.zon.effect)
	if (hasMilestone('div', 7)) gain = gain.times(milestoneEffect('div', 7))
	if (hasMilestone('rat', 10)) gain = gain.times(milestoneEffect('rat', 10))
	return gain
}
// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	newsTotal: D(0),
	universe: D(0),
	chalpow: D(0), // YACT:A Points [Challenge Power]
	planpts: D(0) // TPT:O Points [Plant Points]
}}

// Display extra things at the top of the page
var displayThings = [
	() => player.universe.eq(1) ? "<br>You have " + format(player.chalpow) + " Challenge Power (+"+format(getChalPowGen())+"/s)" : "",
	() => player.universe.eq(2) ? "<br>You have " + format(player.planpts) + " Plant Points (+"+format(getPlaPtsGen())+"/s)" : "",
	() => "<br>If you found a bug or find yourself stuck Please contact momentcookie on Discord.",
	() => "<br>You're inside "+["The Operator Tree", "Yet Another Challenge Tree: Adventure", "The Plant Tree Original"][player.universe]+" "+[[tmp.add.versionList][0][player.add.version], [tmp.I.versionList][0][player.I.version], [tmp.pla.versionList][0][player.pla.version]][player.universe]+".",
	() => player.keepGoing ? "<br>"+makeCyan("You're past endgame. The Game may not be balanced after this.") : "<br>Endgame: Reach "+makeCyan(format(1e73))+" Points",
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(1e73)
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