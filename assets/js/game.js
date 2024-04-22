var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;

    return value;
}

var player = {
    name: prompt("What is your robot's name?"),
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
        attack: randomNumber(10, 14)
    },
    {
        name: 'Nunu Bot',
        attack: randomNumber(10, 15)
    },
    {
        name: 'Robo Trundle',
        attack: randomNumber(10, 16)
    }
]

var fight = function(enemy) {
    console.log(enemy)
    while(enemy.health > 0 && player.health > 0) {
        var promptFight = prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.").trim().toLowerCase();
        //if player picks 'skip', confirm and then stop the loop
        if(promptFight === 'skip') {
            var confirmSkip = confirm("Are you sure you'd like to skip this fight?");
            if(confirmSkip) {
                alert(player.name + ' has decided to skip this fight. Goodbye!')
                player.money = Math.max(0, player.money - 10);
                break;
            }
        } else if(promptFight === 'fight') {
            //generate random damage value based on player's attack power
            var damage = randomNumber(player.attack -3, player.attack);
            console.log('Player dmg: ' + damage)
            //remove enemy's health
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(player.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + " health remaining.")
    
            //check enemy's health
            if(enemy.health <= 0) {
                alert(enemy.name + ' has died.');
                break;
            } else {
                alert(enemy.name + ' still has ' + enemy.health + ' health left.')
            }
            //generate random damage value based on enemy's attack power
            var damage = randomNumber(enemy.attack - 2, enemy.attack);
            console.log('Enemy dmg: ' + damage)
            //remove player's health
            player.health = Math.max(0, player.health - damage);
            console.log(enemy.name + ' attacked ' + player.name + '. ' + player.name + ' now has ' + player.health + ' health left.')
            
            //check player's health
            if(player.health <=0) {
                alert(player.name + ' has died!');
                break;
            } else {
                alert(player.name + ' still has ' + player.health + ' health left.')
            }
        } else {
            alert('You need to choose a valid option. Try again.');
        }    
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

        if(i < enemies.length -1) {
            shop();
        }
        }
    }
    endGame();
}

var endGame = function() {
    // if player is still alive, player wins.
    if(player.health > 0) {
        alert("Great job, you've survived the game! You now have a score of " + player.money + ".");
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

var shop = function() {
    var shopPrompt = prompt("Would you like to REFILL($7) your health, UPGRADE($7) your attack, or LEAVE the store? Please enter one : 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice. \n\nCurrent money: $" + player.money).trim().toLowerCase();

    switch(shopPrompt) {
        case 'refill':
            player.refillHealth();
            break;
        case 'upgrade':
            player.upgradeAttack();
            break;
        case 'leave':
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