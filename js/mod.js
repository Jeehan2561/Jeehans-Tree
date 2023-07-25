let modInfo = {
	name: "Le Stupid Tree Game",
	id: "MCKLSTG",
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
	num: "1.3",
	truenum: "1.3", // Used for Achievement I1, Very dangerous to change. - Cookina
	name: "All good things must end",
}

let changelog = `<h1>Changelog:</h1><br>
    <h2>Warning: This mod may be unbalanced</h2><br>
	<h3>v1 - Start</h3><br>
	    - Added 3 Gamemodes.<br>
		- Added 24 upgrades.<br>
		- Added 5 prestige layers.<br>
		- Added 15 achievements.<br>
		Endgame: - Beat NM+ gamemode<br><br>
	<h3>v1.1 - Start of the NightMare++</h3><br>
	    - Added 2 Gamemodes.<br>
		- Added 7 upgrades.<br>
		- Added a prestige layer.<br>
		- Added 10 achievements.<br>
		- Added 4 buyables.<br>
		Endgame: - Beat NM+3 gamemode<br><br>
	<h3>v1.2 - Stuck in NM++++++</h3><br>
	    - Added 4 Gamemodes.<br>
		- Added 20 upgrades.<br>
		- Added a prestige layer.<br>
		- Added 15 achievements.<br>
		- Added a buyable.<br>
		Endgame: - Beat NM+6 gamemode<br><br>
	<h3>v1.3 - All good things must end</h3><br>
	    - Added 3 Gamemodes.<br>
		- Added a upgrade.<br>
		- Added a prestige layer.<br>
		- Added 15 achievements.<br>
		- Added a buyable.<br>
		Endgame: - Beat NM+8 gamemode<br><br>
		Note: If you solve the puzzle then you'll be a great person in my server
	`
	

let winText = "Congratulations! You have reached the end and beaten this game, Cookina Why would you make this stupid game?!?!?, Welp I dunno, Anyways You can join my discord server and check out my other games."

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
	if (hasAchievement('a', 21)) gain = gain.add(D(player.p.upgrades.length).times(0.05))
	if (hasAchievement('a', 41)) gain = gain.add(D(player.sp.upgrades.length).times(0.05))
	if (hasAchievement('a', 73)) gain = gain.add(D(player.hp.upgrades.length).times(0.05))
	gain = gain.add(buyableEffect('ub', 11))
	if (hasAchievement('a', 62)) gain = gain.add(tmp.sb.effect)
	gain = gain.pow(buyableEffect('ub', 13))
	gain = gain.times(buyableEffect('ub', 12))
	gain = gain.times(tmp.p.effect)
	gain = gain.times(tmp.b.effect)
	if (hasAchievement('a', 11)) gain = gain.times(1.2)
	if (hasAchievement('a', 14)) gain = gain.times(1.2)
	if (hasAchievement('a', 22)) gain = gain.times(player.a.best.max(0).add(1))
	if (hasAchievement('a', 24)) gain = gain.times(1.2)
	if (hasAchievement('a', 33)) gain = gain.times(achievementEffect('a', 33))
	if (hasAchievement('a', 42)) gain = gain.times(player.sb.best.max(0).add(1))
	if (hasAchievement('a', 71)) gain = gain.times(player.ub.best.max(1).add(1))
	if (hasAchievement('a', 84)) gain = gain.times(1.2)
	if (hasAchievement('a', 95)) gain = gain.times(2.7)
	if (hasAchievement('a', 103)) gain = gain.times(achievementEffect('a', 103))
	if (hasUpgrade('ub', 12)) gain = gain.times(upgradeEffect('ub', 12))
	gain = gain.times(buyableEffect('b', 11))
	gain = gain.times(D(parseFloat(VERSION.truenum)))
	if (player.ub.best.gte(1)) gain = gain.div(2)
	if (player.ub.best.gte(2)) gain = gain.div(Decimal.pow(3, player.ub.best))
	if (player.ub.best.gte(3)) gain = gain.div(tmp.ub.NMII)
	gain = gain.pow(buyableEffect('ub', 14))
	if (player.ub.best.gte(10)) gain = gain.times(0)
	return gain
}
// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	() => "<br>If you found a bug or find yourself stuck Please contact MomentCookie#6268 on Discord.",
	() => "<br>Current Mode: " + VERSION.withmode,
	() => player.keepGoing ? "You're past endgame. The Game may not be balanced after this." : ""
]

// Determines when the game "ends"
function isEndgame() {
	return player.ub.best.gte(10)
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