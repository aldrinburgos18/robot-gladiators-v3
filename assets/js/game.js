const playerName = prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

const enemyNames = ["Roborto", "Nunu Bot", "Robo Trumble"];
var enemyHealth = 50;
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


var startGame = function() {
    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for(var i = 0; i < enemyNames.length; i++) {
        if(playerHealth > 0) {
            alert('Welcome to Robot Gladiators! Round ' + (i+1))
            //pick new enemy to fight
            var currentEnemy = enemyNames[i];
            //reset enemyHealth before starting new fight
            enemyHealth = 50;
        fight(currentEnemy);
        }
    }
    endGame();
}

var endGame = function() {
    // if player is still alive, player wins.
    if(playerHealth > 0) {
        alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    } else {
        alert("You've lost your robot in battle.")
    }

    //ask player if they'd like to play again
    var playAgainConfirm = confirm('Would you like to play again?');
    if(playAgainConfirm) {
        //restart the game
        startGame();
    } else {
        alert('Thank you for playing Robot Gladiators! Come back soon!');
    }
}

startGame();