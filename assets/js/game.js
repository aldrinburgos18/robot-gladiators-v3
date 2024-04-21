const playerName = prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;

const enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function() {
    alert('Welcome to Robot Gladiators');
    enemyHealth = enemyHealth - playerAttack;
    console.log(playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + " health remaining.")
    if(enemyHealth <= 0) {
        alert(enemyName + " has died.");
    
    } else {
        alert(enemyName + ' still has ' + enemyHealth + ' health left.' )
    }
}

fight()
