var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;

    return value;
}

//function to set name
var getPlayerName = function() {
    var name = "";
    //check if name is blank or null
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?")
    }
    console.log(name)
    return name;
}

var fightOrSkip = function() {
    var promptFight = prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.").trim().toLowerCase();

    if (!promptFight) {
        alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }
    //if player picks 'skip', confirm then stop loop
    if(promptFight === 'skip') {
        //confirm player wants to skip
        var confirmSkip = confirm("Are you sure you'd like to quit?");

        if(confirmSkip) {
            alert(player.name + " has decided to skip this fight. Goodbye!");
            //subtract money from player.money for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            return true;
        }
        return false;
    }
}

var player = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if(this.money >= 7) {          
            window.alert("Refilling player's health by 20 for $7.");
            this.health += 20;
            this.money -= 7;
            console.log("money: " + this.money)
        } else {
            alert("You don't have enough money!"); 
        }
    },
    upgradeAttack: function() {
        if(this.money >= 7) {
            alert("Upgrading player's attack by 6 for $7.");
            this.attack += 6;
            this.money -= 7;
        } else {
            alert("You don't have enough money!")
        }
    }
}

var enemies = [
    {
        name: 'Roborto',
        attack: randomNumber(10, 12)
    },
    {
        name: 'Nunu Bot',
        attack: randomNumber(10, 13)
    },
    {
        name: 'Robo Trundle',
        attack: randomNumber(10, 14)
    }
]

var fight = function(enemy) {
    //randomize turns
    var isPlayerTurn = true;
    if(Math.random() > 0.5) {
        isPlayerTurn = false;
    } 

    while(enemy.health > 0 && player.health > 0) {
        //player attacks first
        if(isPlayerTurn) {
            if(fightOrSkip()) {
                break;
            }

            var damage = randomNumber(player.attack - 3, player.attack);

            //remove enemy health
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(player.name + " attacked " + enemy.name + " for " + damage + " attack damage. " + enemy.name + " now has " + enemy.health + " remaining.");

            //check enemy's health
            if(enemy.health <= 0) {
                alert("You have defeated " + enemy.name + "! You have been awarded $20.");
                player.money = player.money + 20;

                break;
            } else {
                alert(player.name + " attacked " + enemy.name + " for " + damage + " attack damage. " + enemy.name + " now has " + enemy.health + " remaining.");
            }
        //player gets attacked first
        } else {
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            //remove player's health
            player.health = Math.max(0, player.health - damage);
            console.log(enemy.name + " attacked " + player.name + " for " + damage + " attack damage. " + player.name + " now has " + player.health + " remaining.");

            if(player.health <= 0) {
                alert(player.name + " has died.");
                //leave while() loop if player is dead
                break;
            } else {
                alert(enemy.name + " attacked " + player.name + " for " + damage + " attack damage. " + player.name + " now has " + player.health + " remaining.");
            }
        }
        isPlayerTurn = !isPlayerTurn;
    }
}


var startGame = function() {
    //reset player stats
    player.reset()
    console.log(player)

    for(var i = 0; i < enemies.length; i++) {
        if(player.health > 0) {
            alert('Welcome to Robot Gladiators! Round ' + (i+1))
            //pick new enemy to fight
            var currentEnemy = enemies[i];
            //reset enemyHealth before starting new fight
            currentEnemy.health = randomNumber(40, 60);
        fight(currentEnemy);

        if(player.health > 0 && i < enemies.length - 1) {
            var storeConfirm = confirm('The fight is over, would you like to visit the store before the next round?');

            if(storeConfirm) {
                shop();
            }
        }
        }
    }
    endGame();
}

var endGame = function() {
    //check localStorage for high schore. default to 0.
    var highScore = localStorage.getItem('highscore');
    if(highScore === null) {
        highScore = 0;
    }

    //if player beats the high score, set new high score.
    if(player.money > highScore && player.health > 0) {
        alert("Great job, " + player.name + ". You beat the high score of " + highScore + "! Congratulations!\n\n You scored: " + player.money);

        localStorage.setItem('name', player.name);
        localStorage.setItem('highscore', player.money);        
    } else if(player.money < highScore && player.health > 0){
        alert("Great job, " + player.name + "! You've defeated all the enemies but did not beat the high score of: " + highScore + ". Try again next time!\n\n You scored: " + player.money);
    } else if (player.money > highScore && player.health < 0) {
        alert("Oh no, you've lose your robot in battle, but you beat the high score of: " + highScore + "Still impressive!");
        localStorage.setItem('name', player.name);
        localStorage.setItem('highscore', player.money);
    } else if(player.money < highScore && player.health <0){
        alert("Game over! You've lost your robot in battle. Better luck next time!")
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

var shop = function() {
    var shopPrompt = prompt("Would you like to REFILL($7) your health, UPGRADE($7) your attack, or LEAVE the store? Please enter one: 1 for REFILL, 2 for UPGRADE, or 3 to LEAVE the shop. \n\nCurrent money: $" + player.money).trim().toLowerCase();
    shopPrompt = parseInt(shopPrompt);
    switch(shopPrompt) {
        case 1:
            player.refillHealth();
            break;
        case 2:
            player.upgradeAttack();
            break;
        case 3:
            alert('Leaving the store.');
            //do nothing, so function will end
            break;
        default:
            alert('You did not pick a valid option. Try again.')
            //call shop() again to force player to pick a valid option
            shop();
            break; 
    }
}

startGame();