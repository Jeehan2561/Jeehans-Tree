let modInfo = {
	name: "Cookina's New Tree",
	id: "MCKST",
	author: "MomentCookie (Cookina)",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],
	discordName: "MomentCookie's Modded stuffs",
	discordLink: "https://discord.gg/ccbBZHYsTv",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1",
	name: "Hell",
}

let changelog = `<h1>Changelog:</h1><br>
    <h2>Warning: This mod may be unbalanced</h2><br>
	<h3>v1 - Hell</h3><br>
	    - Published =]<br>
		Endgame: - 1e1403 Points<br><br>
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
		return D(0)

	let gain = RPG().div(PGN())
	return gain
}
function RPG() {
	let gain = D(1)
	if (hasUpgrade('p', 13)) gain = gain.add(upgradeEffect('p', 13))
	if (hasUpgrade('p', 22)) gain = gain.pow(upgradeEffect('p', 22))
	if (hasUpgrade('p', 11)) gain = gain.times(upgradeEffect('p', 11))
	if (hasUpgrade('p', 12)) gain = gain.times(upgradeEffect('p', 12))
	if (hasUpgrade('p', 14)) gain = gain.times(upgradeEffect('p', 14))
	if (hasUpgrade('p', 23)) gain = gain.times(upgradeEffect('p', 23))
	if (hasUpgrade('p', 24)) gain = gain.times(upgradeEffect('p', 24))
	if (hasUpgrade('p', 42)) gain = gain.times(upgradeEffect('p', 42))
	if (hasUpgrade('p', 43)) gain = gain.times(upgradeEffect('p', 43))
	if (hasMilestone('r', 0)) gain = gain.times(milestoneEffect('r', 0))
	if (hasMilestone('t', 0)) gain = gain.times(milestoneEffect('t', 0))
	if (hasMilestone('b', 0)) gain = gain.times(milestoneEffect('b', 0))
	if (hasMilestone('g', 1)) gain = gain.times(milestoneEffect('g', 1))
	gain = gain.times(tmp.g.genEffect)
	if (hasUpgrade('p', 45)) gain = gain.pow(upgradeEffect('p', 45))
	gain = gain.pow(tmp.b.effect)
	return gain
}
function PGN() {
	let dev = D(1)
	if (RPG().gte(D(2).pow(1024))) dev = dev.times(RPG().div(D(2).pow(1024)).log10().pow_base(3))
	return dev
}
// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	() => "<br>Welcome to "+player.t.realname+".",
	() => "<br>If you found a bug or find yourself stuck Please contact momentcookie on Discord.",
	() => RPG().gte(D(2).pow(1024)) ? "<br>Get Softcapped Idiot, Divide Point gain by "+format(PGN()) : "",
	() => player.keepGoing ? "<br>"+makeCyan("You're past endgame. The Game may not be balanced after this.") : "<br>Endgame: Reach "+makeCyan(format('1e1403'))+" Points ("+format(player.points.max(1).log('1e1403').times(100))+"%)",
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte("1e1403")
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