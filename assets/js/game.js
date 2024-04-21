alert('Welcome to Robot Gladiators');

const playerName = prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

const enemyNames = ["Roborto", "Nunu Bot", "Robo Trumble"];
var enemyHealth = 10;
var enemyAttack = 12;

var fight = function(enemyName) {
    while(enemyHealth > 0 && playerHealth > 0) {
        var promptFight = prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.").trim().toLowerCase();
        //if player picks 'skip', confirm and then stop the loop
        if(promptFight === 'skip') {
            var confirmSkip = confirm("Are you sure you'd like to skip this fight?");
            if(confirmSkip) {
                alert(playerName + ' has decided to skip this fight. Goodbye!')
                playerMoney = playerMoney - 10;
                break;
            }
        }

        enemyHealth = enemyHealth - playerAttack;
        console.log(playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + " health remaining.")
    
        //check enemy's health
        if(enemyHealth <= 0) {
            alert(enemyName + ' has died.');
            break;
        } else {
            alert(enemyName + ' still has ' + enemyHealth + ' health left.')
        }
    
        //remove player's health
        playerHealth = playerHealth - enemyAttack;
        console.log(enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health left.')
            
        //check player's health
        if(playerHealth <=0) {
            alert(playerName + ' has died!');
            break;
        } else {
            alert(playerName + ' still has ' + playerHealth + ' health left.')
        }
    }
}

for(var i = 0; i < enemyNames.length; i++) {
    var currentEnemy = enemyNames[i];
    enemyHealth = 20;
    console.log(currentEnemy)
    fight(currentEnemy);
}
