let modInfo = {
	name: "Cookina's Abnormal Trees",
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
	num: "1.1",
	name: "Hell II",
}

let changelog = `<h1>Changelog:</h1><br>
    <h2>Warning: This mod may be unbalanced</h2><br>
	<h3>v1 - Hell</h3><br>
	    - Published =]<br>
		Endgame: - 1e1403 Points<br><br>
	<h3>v1.1 - Hell II</h3><br>
	    - Added Blah<br>
		Endgame: - 1e170 Points from ur mom<br><br>
	`
	

let winText = "Congratulations! You have reached the end and beaten this game, NOW GET OUT."

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
	// UNIVERSE 1
	if (hasUpgrade('p', 13)&&player.universe.eq(0)) gain = gain.add(upgradeEffect('p', 13))
	if (hasUpgrade('p', 22)&&player.universe.eq(0)) gain = gain.pow(upgradeEffect('p', 22))
	if (hasUpgrade('p', 11)&&player.universe.eq(0)) gain = gain.times(upgradeEffect('p', 11))
	if (hasUpgrade('p', 12)&&player.universe.eq(0)) gain = gain.times(upgradeEffect('p', 12))
	if (hasUpgrade('p', 14)&&player.universe.eq(0)) gain = gain.times(upgradeEffect('p', 14))
	if (hasUpgrade('p', 23)&&player.universe.eq(0)) gain = gain.times(upgradeEffect('p', 23))
	if (hasUpgrade('p', 24)&&player.universe.eq(0)) gain = gain.times(upgradeEffect('p', 24))
	if (hasUpgrade('p', 42)&&player.universe.eq(0)) gain = gain.times(upgradeEffect('p', 42))
	if (hasUpgrade('p', 43)&&player.universe.eq(0)) gain = gain.times(upgradeEffect('p', 43))
	if (hasUpgrade('g', 34)&&player.universe.eq(0)) gain = gain.times(upgradeEffect('g', 34))
	if (hasMilestone('r', 0)&&player.universe.eq(0)) gain = gain.times(milestoneEffect('r', 0))
	if (hasMilestone('t', 0)&&player.universe.eq(0)) gain = gain.times(milestoneEffect('t', 0))
	if (hasMilestone('b', 0)&&player.universe.eq(0)) gain = gain.times(milestoneEffect('b', 0))
	if (hasMilestone('g', 1)&&player.universe.eq(0)) gain = gain.times(milestoneEffect('g', 1))
	if (player.universe.eq(0)) gain = gain.times(tmp.g.genEffect)
	// UNIVERSE 2
	if (player.universe.eq(1)) gain = gain.times(tmp.T.timeEffect)
	if (hasUpgrade('T', 11)&&player.universe.eq(1)) gain = gain.times(upgradeEffect('T', 11))
	if (hasUpgrade('T', 12)&&player.universe.eq(1)) gain = gain.times(upgradeEffect('T', 12))
	if (hasUpgrade('T', 15)&&player.universe.eq(1)) gain = gain.times(upgradeEffect('T', 15))
	if (hasUpgrade('T', 21)&&player.universe.eq(1)) gain = gain.times(upgradeEffect('T', 21))
	// UNIVERSE 1
	if (hasUpgrade('p', 45)&&player.universe.eq(0)) gain = gain.pow(upgradeEffect('p', 45))
	if (hasUpgrade('g', 35)&&player.universe.eq(0)) gain = gain.pow(upgradeEffect('g', 35))
	if (player.universe.eq(0)) gain = gain.pow(tmp.b.effect)
	// UNIVERSE 2
	if (inChallenge('tm', 11)&&player.universe.eq(1)) gain = gain.max(1).log10().pow(0.75).pow_base(10)
	if (player.universe.eq(1)) gain = gain.times(tmp.tm.timeSpeed)
	return gain
}
function PGN() {
	let dev = D(1)
	if (RPG().gte(D(2).pow(1024))) dev = dev.times(RPG().div(D(2).pow(1024)).log10().pow_base(3))
	if (hasUpgrade('g', 31)&&player.universe.eq(0)) dev = D(1)
	return dev
}
// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	universe: D(0)
}}

// Display extra things at the top of the page
var displayThings = [
	() => (player.universe.eq(0)) ? "<br>Welcome to "+player.t.realname+"." : "",
	() => (player.universe.eq(1)) ? "<br>Welcome to "+player.T.realname+"." : "",
	() => "<br>If you found a bug or find yourself stuck Please contact momentcookie on Discord.",
	() => RPG().gte(D(2).pow(1024)) ? "<br>Get Softcapped Idiot, Divide Point gain by "+format(PGN()) : "",
	() => "<br>Corrupted Progress: "+format(player.points.max(1).slog().min(100))+"%",
	() => player.keepGoing ? "<br>"+makeCyan("You're past endgame. The Game may not be balanced after this.") : "<br>Endgame: Reach "+makeCyan(format('1e170'))+" Points in CBTTT ("+format(player.points.max(1).log('1e170').times(50).min(50).times(player.universe.eq(1) ? D(1) : D(0)).add(player.universe.eq(0) ? player.points.max(1).slog().div(2).min(50) : D(50)))+"%)",
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte("1e170")&&player.universe.eq(1)
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