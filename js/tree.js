var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
	showTree: true,

    treeLayout: ""

    
}


// A "ghost" layer which offsets other layers in the tree
addNode("blank", {
    layerShown: "ghost",
}, 
)


addLayer("tree-tab", {
    tabFormat: [["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}], "blank", "clickables"],
    previousTab: "",
    leftTab: true,
    clickables: {
        11: {
            title() {return "Switch to previous tree"},
            unlocked() {return player.a.trees.gte(1)&&player.tab == 'none'},
            canClick() {return player.universe.sub(1).gte(0)},
            onClick() {return player.universe = player.universe.sub(1)},
            onHold() {return player.universe = player.universe.sub(1)},
        },
        12: {
            title() {return "Switch to next tree"},
            unlocked() {return player.a.trees.gte(1)&&player.tab == 'none'},
            canClick() {return player.universe.add(1).lte(player.a.trees)},
            onClick() {return player.universe = player.universe.add(1)},
            onHold() {return player.universe = player.universe.add(1)},
        },
    }
})