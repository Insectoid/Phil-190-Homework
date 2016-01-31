//TODO: Use the HTML page to create interactive elements instead of using alert() and prompt() for everything
//INIT
var playerAttack = [];
var npcAttack = [];
var npc = [];
var response = 0;

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

npc[0] = npcCreator("Acrobat", 2, 6, 3);
npc[1] = npcCreator("Agent", 1, 6, 3);
npc[2] = npcCreator("Archer", 5, 3, 2);
npc[3] = npcCreator("Assassin", 3, 6, 1);
npc[4] = npcCreator("Barbarian", 6, 3, 1);
npc[5] = npcCreator("Bard", 3, 4, 3);
npc[6] = npcCreator("Battlemage", 3, 1, 6);
npc[7] = npcCreator("Crusader", 6, 1, 3);
npc[8] = npcCreator("Healer", 1, 3, 6);
npc[9] = npcCreator("Knight", 6, 2, 2);
npc[10] = npcCreator("Mage", 0, 1, 9);
npc[11] = npcCreator("Monk", 3, 5, 2);
npc[12] = npcCreator("Nightblade", 0, 5, 5);
npc[13] = npcCreator("Pilgrim", 2, 5, 3);
npc[14] = npcCreator("Rogue", 5, 5, 0);
npc[15] = npcCreator("Scout", 4, 3, 3);
npc[16] = npcCreator("Sorcerer", 2, 2, 6);
npc[17] = npcCreator("Spellsword", 5, 0, 5);
npc[18] = npcCreator("Thief", 1, 9, 0);
npc[19] = npcCreator("Warrior", 9, 1, 0);
npc[20] = npcCreator("Witchhunter", 2, 3, 5);
//var npc[randomNPC] = npcCreator("Active NPC", 0, 0, 0);

//var randomNPC = function() {
//    npcFighter.pname = this.pname;
//    npcFighter.strength = this.strength;
//    npcFighter.agility = this.agility;
//    npcFighter.magic = this.magic;
//}

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
    while (response < 2) {
        //Reset player damage
        player.damage = 0;

        //Picks a random NPC and resets their damage
        var randomNPC = Math.floor((Math.random() * npc.length));
        alert("Thy next contestant is a(n) " + npc[randomNPC].pname + ". Good luck!");
        npc[randomNPC].damage = 0;

        //Choose 3 attacks. For NPCs, 1 = Strength, 2 = Agility, 3 = Magic.
        for (var i = 0; i < 3; i++) {
            playerAttack[i] = prompt("Thou can do ", 3 - i, " more attacks this fight. What kind of attack will thou make next? Enter 1 for strength, 2 for agility, 3 for magic");
            npcAttack[i] = npc[randomNPC].AI(Math.floor((Math.random() * 10) + 1));
        }

        //Calculate and show results of battle. Currently, Strength beats Agility, Agility beats Magic, and Magic beats Strength
        for (var i = 0; i < 3; i++) {
            var roundAnnounce = "Round " + i + ": "
            if ((playerAttack[i] == 1 && npcAttack[i] == 2) || (playerAttack[i] == 2 && npcAttack[i] == 3) || (playerAttack[i] == 3 && npcAttack[i] == 1)) {
                npc[randomNPC].damage++;
                switch (playerAttack[i]) {
                    case 1:
                        alert(roundAnnounce + player.pname + " bashed " + npc[randomNPC].pname + " into smithereens!");

                    case 2:
                        alert(roundAnnounce + player.pname + " snuck up to the " + npc[randomNPC].pname + " and stabbed them!");

                    case 3:
                        alert(roundAnnounce + player.pname + " burnt the " + npc[randomNPC].pname + " to a crisp!")
                }
            } else if ((playerAttack[i] == 2 && npcAttack[i] == 1) || (playerAttack[i] == 3 && npcAttack[i] == 2) || (playerAttack[i] == 1 && npcAttack[i] == 3)) {
                player.damage++;
                switch (npcAttack[i]) {
                    case 1:
                        alert(roundAnnounce + npc[randomNPC].pname + " bashed " + player.pname + " into smithereens!");

                    case 2:
                        alert(roundAnnounce + npc[randomNPC].pname + " snuck up on " + player.pname + " and stabbed them!");

                    case 3:
                        alert(roundAnnounce + npc[randomNPC].pname + " burnt " + player.pname + " to a crisp!");
                }
            } else {
                //switch (npcAttack[i]) {
                    //case 1:
                        //alert(roundAnnounce + player.pname + " and the "
                        //    npc[randomNPC].pname + " parried each other's blows.");

                    //case 2:
                        //alert(roundAnnounce + player.pname + " and the "
                        //    npc[randomNPC].pname + " danced around each other.");

                    //case 3:
                        //alert(roundAnnounce + player.pname + "\'s and the "
                        //    npc[randomNPC].pname + "\'s fireballs collided mid air.");
                //}
            }

            //Judge who won
            if (npc[randomNPC].damage > player.damage) {
                player.kills++;
                alert("Congratulations, thou hast won the fight! Ye get a flask as a trophy.")
            } else if (npc[randomNPC].damage < player.damage) {
                alert("Alas! Thou hast perished in battle!");
            } else {
                alert("The battle has ended in a tie! You both survive to live another day.")
            }
        }
    }
    response = prompt("Would thou like to: \(1\) continue playing, \(2\) make a new gladiator, or \(3\) quit?");
}


//MAIN BODY
alert("Greetings traveller! Does thou hast what it takes to be a gladiator?");

while (true) {
    player.playerSetup();
    fight();
    if (response == 3) {
        break;
    }
}
