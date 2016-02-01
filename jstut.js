//TODO: Use the HTML page to create interactive elements instead of using alert() and prompt() for everything
//INIT
var playerAttack = [];
var npcAttack = [];
var npc = [];
var response = 2;

function npcCreator(pname, strength, agility, magic) {
    this.pname = pname;
    this.strength = strength;
    this.agility = agility;
    this.magic = magic;
    this.damage = 0;
    this.AI = function(attackRoll) {
        if (attackRoll < this.strength) {
            return 1;
        } else if (attackRoll < (this.strength + this.agility)) {
            return 2;
        } else {
            return 3;
        }
    };
}

npc[0] = new npcCreator("Acrobat", 2, 6, 3);
npc[1] = new npcCreator("Agent", 1, 6, 3);
npc[2] = new npcCreator("Archer", 5, 3, 2);
npc[3] = new npcCreator("Assassin", 3, 6, 1);
npc[4] = new npcCreator("Barbarian", 6, 3, 1);
npc[5] = new npcCreator("Bard", 3, 4, 3);
npc[6] = new npcCreator("Battlemage", 3, 1, 6);
npc[7] = new npcCreator("Crusader", 6, 1, 3);
npc[8] = new npcCreator("Healer", 1, 3, 6);
npc[9] = new npcCreator("Knight", 6, 2, 2);
npc[10] = new npcCreator("Mage", 0, 1, 9);
npc[11] = new npcCreator("Monk", 3, 5, 2);
npc[12] = new npcCreator("Nightblade", 0, 5, 5);
npc[13] = new npcCreator("Pilgrim", 2, 5, 3);
npc[14] = new npcCreator("Rogue", 5, 5, 0);
npc[15] = new npcCreator("Scout", 4, 3, 3);
npc[16] = new npcCreator("Sorcerer", 2, 2, 6);
npc[17] = new npcCreator("Spellsword", 5, 0, 5);
npc[18] = new npcCreator("Thief", 1, 9, 0);
npc[19] = new npcCreator("Warrior", 9, 1, 0);
npc[20] = new npcCreator("Witchhunter", 2, 3, 5);

//CHARACTER
var player = {
    pname: undefined,
    strength: 0,
    agility: 0,
    magic: 0,
    points: 10,
    kills: 0,
    damage: 0,
    playerSetup: function() {
        //Get pname
        this.pname = prompt("What is the name of thy gladiator?");

        //Reset number of points
        this.points = 10;

        alert("Next, thou must assign points to thy strength, agility, and magic abilities");

        //Doles out points. See addPoints() below for more info
        do {
            this.addPoints("strength");
            if (this.points > 0) {
                this.addPoints("agility");
            }
            if (this.points > 0) {
                this.addPoints("magic");
            }
            if (this.points > 0) {
                alert("Thou still hast points left to spend!");
            }
        } while (this.points > 0)

        alert(this.pname + ", thy career begins here!");
        response = 1;
    },
    addPoints: function(stat) {
        while (true) {
            if (this.points > 0) {
                //Takes the number given from the player and adds it to the stat, while subtracting from the points. The player will be asked again to give a number if they give an illegal value.
                var sum = prompt("Thou hast " + this.points + " left to spend. How many points will thou put into " + stat + "?");
                if (sum <= this.points) {
                    this.points -= sum;
                    this[stat] += sum;
                    break;
                } else {
                    alert("Not enough points!");
                }
            }
        }
    }
};

//TODO: Make the player and NPC stats actually matter beyond what attacks the NPC AI prefers
//FIGHT
var fight = function() {
    //Reset player damage
    player.damage = 0;

    //Picks a random NPC and resets their damage
    var randomNPC = Math.floor((Math.random() * npc.length));
    alert("Thy next contestant is a(n) " + npc[randomNPC].pname + ". Good luck!");
    npc[randomNPC].damage = 0;

    //Choose 3 attacks. For NPCs, 1 = Strength, 2 = Agility, 3 = Magic.
    for (var i = 1; i <= 3; i++) {
        playerAttack[i] = prompt("Thou can do " + (4 - i) + " more attacks this fight. What kind of attack will thou make next? Enter 1 for strength, 2 for agility, 3 for magic");
        console.log("Player chose " + playerAttack[i]);
        npcAttack[i] = npc[randomNPC].AI(Math.floor((Math.random() * 10) + 1));
        console.log("NPC chose " + npcAttack[i]);
    }

    //Calculate the results of battle. Currently, Strength beats Agility, Agility beats Magic, and Magic beats Strength
    for (var i = 1; i <= 3; i++) {
        console.log("Player: " + playerAttack[i] + " VS NPC: " + npcAttack[i]);
        if ((playerAttack[i] == 1 && npcAttack[i] == 2) || (playerAttack[i] == 2 && npcAttack[i] == 3) || (playerAttack[i] == 3 && npcAttack[i] == 1)) {
            npc[randomNPC].damage++;
            console.log("NPC took damage in round " + i);
        } else if ((playerAttack[i] == 2 && npcAttack[i] == 1) || (playerAttack[i] == 3 && npcAttack[i] == 2) || (playerAttack[i] == 1 && npcAttack[i] == 3)) {
            player.damage++;
            console.log("Player took damage in round " + i);
        } else {
            console.log("Nobody took damage in round " + i);
        }
    }

    //Describe the battle
    for (var i = 1; i <= 3; i++) {
        var roundAnnounce = "Round " + i + ": "
        console.log("Describing round " + i + " ...");

        if (playerAttack[i] == 1) {
            if (npcAttack[i] == 1) {
                alert(roundAnnounce + player.pname + " and the " + npc[randomNPC].pname + " parried blow after blow!");
            } else if (npcAttack[i] == 2) {
                alert(roundAnnounce + player.pname + " smashed the " + npc[randomNPC].pname + " into smithereens!");
            } else if (npcAttack[i] == 3) {
                alert(roundAnnounce + "the " + npc[randomNPC].pname + " burnt " + player.pname + " to a crisp!");
            } else {
                console.log("ERROR. npcAttack[" + i + "] is " + npcAttack[i]);
            }
        } else if (playerAttack[i] == 2) {
            if (npcAttack[i] == 1) {
                alert(roundAnnounce + "the " + npc[randomNPC].pname + " smashed " + player.pname + " into smithereens!");
            } else if (npcAttack[i] == 2) {
                alert(roundAnnounce + player.pname + " and the " + npc[randomNPC].pname + " danced around each other!");
            } else if (npcAttack[i] == 3) {
                alert(roundAnnounce + player.pname + " snuck up to the " + npc[randomNPC].pname + " and stabbed them!");
            } else {
                console.log("ERROR. npcAttack[" + i + "] is " + npcAttack[i]);
            }
        } else if (playerAttack[i] == 3) {
            if (npcAttack[i] == 1) {
                alert(roundAnnounce + player.pname + " burnt the " + npc[randomNPC].pname + " to a crisp!");
            } else if (npcAttack[i] == 2) {
                alert(roundAnnounce + "the " + npc[randomNPC].pname + " snuck up to " + player.pname + " and stabbed them!");
            } else if (npcAttack[i] == 3) {
                alert(roundAnnounce + player.pname + "\'s and the " + npc[randomNPC].pname + "\'s fireballs collided mid-air!");
            } else {
                console.log("ERROR. npcAttack[" + i + "] is " + npcAttack[i]);
            }
        } else {
            player.damage++;
            alert(roundAnnounce + npc[randomNPC].pname + " attacked while " + player.pname + " was loafing around. Please enter a number between 1 and 3 when thou art entering attacks next time!")
        }
    }

    //Judge who won
    if (npc[randomNPC].damage > player.damage) {
        player.kills++;
        alert("Congratulations, thou hast won the fight!")
    } else if (npc[randomNPC].damage < player.damage) {
        alert("Alas! Thou hast perished in battle!");
    } else {
        alert("The battle has ended in a tie! You both survive to live another day.")
    }
}





//MAIN BODY
alert("Greetings traveller! Does thou hast what it takes to be a gladiator?");

while (response != 3) {
    if (response == 2) {
        player.playerSetup();
    }
    if (response == 1) {
        fight();
        response = prompt("Would thou like to: \(1\) continue playing, \(2\) make a new gladiator, or \(3\) quit?");
    }
    if (response == 3) {
        break;
    }
}
