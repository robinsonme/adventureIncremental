var savegame = JSON.parse(localStorage.getItem("adventureIncrementalSave"))
if (savegame !== null) {
  gameData = savegame
}

var gameData = {
  copperPieces: 0,
  copperOre: 0,
  copperOrePerClick: 1,
  pickaxeUpgradeCost: 10,
  merchantSkill: 1,
  improveMerchantSkillCost: 100,
  copperMiners: 0,
  copperMinerCost: 50
}

function hireCopperMiner() {
  if (gameData.copperPieces >= gameData.copperMinerCost) {
    gameData.copperPieces -= gameData.copperMinerCost
    gameData.copperMiners += 1
    gameData.copperMinerCost *= 2
    document.getElementById("copperPieces").innerHTML = gameData.copperPieces + " Copper Pieces"
    document.getElementById("copperMiners").innerHTML = gameData.copperMiners + " Copper Miners"
    document.getElementById("hireCopperMiner").innerHTML = "Hire a Copper Miner Cost: " + gameData.copperMinerCost + " Copper"
  }
}

function mineCopper() {
  gameData.copperOre += gameData.copperOrePerClick
  document.getElementById("copperOre").innerHTML = gameData.copperOre + " Copper Ore"
}

function buyPickaxe() {
  if (gameData.copperPieces >= gameData.pickaxeUpgradeCost) {
    gameData.copperPieces -= gameData.pickaxeUpgradeCost
    gameData.copperOrePerClick += 1
    gameData.pickaxeUpgradeCost *= 2
    document.getElementById("copperPieces").innerHTML = gameData.copperPieces + " Copper Pieces"
    document.getElementById("pickaxeUpgrade").innerHTML = "Upgrade Pickaxe (Currently Level " + gameData.copperOrePerClick + ") Cost: " + gameData.pickaxeUpgradeCost + " Copper"
  }
}

function improveMerchantSkill() {
  if (gameData.copperPieces >= gameData.improveMerchantSkillCost) {
    gameData.copperPieces -= gameData.improveMerchantSkillCost
    gameData.merchantSkill += 1
    gameData.improveMerchantSkillCost *= 2
    document.getElementById("copperPieces").innerHTML = gameData.copperPieces + " Copper Pieces"
    document.getElementById("improveMerchantSkill").innerHTML = "Improve Your Merchant Skills (Currently Level " + gameData.merchantSkill + ") Cost: " + gameData.improveMerchantSkillCost + " Copper"
  }
}

function sellCopperOre() {
  gameData.copperPieces = gameData.copperPieces + (gameData.copperOre * gameData.merchantSkill)
  gameData.copperOre -= gameData.copperOre
  document.getElementById("copperPieces").innerHTML = gameData.copperPieces + " Copper Pieces"
  document.getElementById("copperOre").innerHTML = gameData.copperOre + " Copper Ore"
}

var mainGameLoop = window.setInterval(function() {
  for (var i = 0; i < gameData.copperMiners; i++) {
    mineCopper()
  }
}, 1000)

var saveGameLoop = window.setInterval(function() {
  localStorage.setItem("adventureIncrementalSave", JSON.stringify(gameData))
}, 15000)
