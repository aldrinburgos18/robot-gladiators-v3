alert('Welcome to Robot Gladiators');

const playerName = prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

const enemyNames = ["Roborto", "Nunu Bot", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {
    while(enemyHealth > 0) {
        var promptFight = prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.").trim().toLowerCase();
        if(promptFight === 'fight') {
            //remove enemy's health
            enemyHealth = enemyHealth - playerAttack;
            console.log(playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + " health remaining.")
    
            //check enemy's health
            if(enemyHealth <= 0) {
                alert(enemyName + ' has died.');
            } else {
                alert(enemyName + ' still has ' + enemyHealth + ' health left.')
            }
    
            //remove player's health
            playerHealth = playerHealth - enemyAttack;
            console.log(enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health left.')
            
            //check player's health
            if(playerHealth <=0) {
                alert(playerName + ' has died!');
            } else {
                alert(playerName + ' still has ' + playerHealth + ' health left.')
            }
            //if player chooses to skip 
        } else if(promptFight === 'skip') {
            //confirm if player wants to skip
            var confirmSkip = confirm("Are you sure you'd like to skip?")
            //if yes(true), leave fight
            if(confirmSkip) {
                alert(playerName + ' has decided to skip this fight. Goodbye!')
                playerMoney = playerMoney - 2;
            //if no(false), ask question again by running fight() again
            } else {
                fight()
            }
            } else {
                alert('You need to choose a valid option. Try again.');
            }
    }
}

for(var i = 0; i < enemyNames.length; i++) {
    var currentEnemy = fight(enemyNames[i]);
    enemyHealth = 50;
    fight(currentEnemy);
}
