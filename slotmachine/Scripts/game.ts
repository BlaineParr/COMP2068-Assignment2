var canvas;
var stage: createjs.Stage;

//Game Objects 
var game: createjs.Container;
var background: createjs.Bitmap;
var spinButton: createjs.Bitmap;
var bet1Button: createjs.Bitmap;
var bet10Button: createjs.Bitmap;
var bet100Button: createjs.Bitmap;
var tiles: createjs.Bitmap[] = [];
var tileContainer: createjs.Container[] = [];
var jackpotText: createjs.Text;
var winningsText: createjs.Text;
var playerBetText: createjs.Text;
var playerMoneyText: createjs.Text;


//Game Variables
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
var winRatio = 0;

//Tally Variables
var fish = 0;
var mice = 0;
var birds = 0;
var cherries = 0;
var bars = 0;
var balls = 0;
var sevens = 0;
var blanks = 0;

function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);

    main();
} //function init ends

function gameLoop() {
    stage.update(); // Refreshes our stage
} //function gameLoop ends

// Our Game Kicks off in here
function main() {
    // instantiate my game container
    game = new createjs.Container();
    game.x = 0;
    game.y = 0;

    // Create Slotmachine User Interface
    createUI();

    stage.addChild(game);
} //function main ends

function createUI(): void {
    // instantiate my background
    background = new createjs.Bitmap("assets/images/SlotMachine.png");
    game.addChild(background);

    //Spin Button
    spinButton = new createjs.Bitmap("assets/images/SpinButton.png");
    spinButton.x = 10;
    spinButton.y = 226;
    game.addChild(spinButton);

    spinButton.addEventListener("click", spinReels);
    spinButton.addEventListener("mouseover", spinButtonOver);
    spinButton.addEventListener("mouseout", spinButtonOut);

    //Bet 1 Button
    bet1Button = new createjs.Bitmap("assets/images/Bet1Button.png");
    bet1Button.x = 122;
    bet1Button.y = 204;
    game.addChild(bet1Button);

    bet1Button.addEventListener("click", bet1);
    bet1Button.addEventListener("mouseover", bet1ButtonOver);
    bet1Button.addEventListener("mouseout", bet1ButtonOut);

    //set up tile containers
    for (var i = 0; i < 3; i++) {
        tileContainer[i] = new createjs.Container();
        tileContainer[i].x = 80 + (64 * i);
        tileContainer[i].y = 64;
        game.addChild(tileContainer[i]);
    } //for ends

    //set up displayed text
    jackpotText = new createjs.Text(jackpot.toString(), "16px PokemonGB", "#000000");
    jackpotText.x = 256;
    jackpotText.y = 16;

    winningsText = new createjs.Text(winnings.toString(), "16px PokemonGB", "#000000");
    winningsText.x = 176;
    winningsText.y = 16;

    playerMoneyText = new createjs.Text(playerMoney.toString(), "16px PokemonGB", "#000000");
    playerMoneyText.x = 80;
    playerMoneyText.y = 16;

    playerBetText = new createjs.Text(playerBet.toString(), "16px PokemonGB", "#000000");
    playerBetText.x = 0;
    playerBetText.y = 16;

    game.addChild(jackpotText);
    game.addChild(winningsText);
    game.addChild(playerBetText);
    game.addChild(playerMoneyText);
} //function createUI ends

// Event handlers
function spinButtonOut() {
    spinButton.alpha = 1.0;
} //function spinButtonOut ends

function spinButtonOver() {
    spinButton.alpha = 0.01;
} //function spinButtonOut ends

function spinReels() {
    // Add Spin Reels code here
    if (playerMoney == 0) {
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            resetAll();
            showPlayerStats();
        } //if ends
    } //if ends
    else if (playerBet > playerMoney) {
        alert("You don't have enough Money to place that bet.");
    } //else if ends
    else if (playerBet <= playerMoney) {
        //get what was spun
        spinResult = Reels();

        //This code is for debugging purposes -- remove before completion!
        fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
        console.log(fruits);

        for (var tile = 0; tile < 3; tile++) {
            tileContainer[tile].removeAllChildren();

            tiles[tile] = new createjs.Bitmap("assets/images/" + spinResult[tile] + ".png");

            console.log(tiles[tile]); //debugging code

            tiles[tile].x = 0;
            tiles[tile].y = 32;

            tileContainer[tile].addChild(tiles[tile]);
        } //for ends
        determineWinnings();
        showPlayerStats();
    } //else if ends
} //function spinReels ends

function bet1ButtonOut() {
    bet1Button.alpha = 1.0;
} //function bet1ButtonOut ends

function bet1ButtonOver() {
    bet1Button.alpha = 0.01;
} //function bet1ButtonOut ends

function bet1() {
    playerBet = 1;
    playerBetText.text = playerBet.toString();
} //function bet1 ends

/* Utility function to show Player Stats */
function showPlayerStats() {
    winRatio = winNumber / turn;

    jackpotText.text = jackpot.toString();
    playerMoneyText.text = playerMoney.toString();
    //$("#jackpot").text("Jackpot: " + jackpot);
    //$("#playerMoney").text("Player Money: " + playerMoney);
    //$("#playerTurn").text("Turn: " + turn);
    //$("#playerWins").text("Wins: " + winNumber);
    //$("#playerLosses").text("Losses: " + lossNumber);
    //$("#playerWinRatio").text("Win Ratio: " + (winRatio * 100).toFixed(2) + "%");
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    fish = 0;
    mice = 0;
    birds = 0;
    cherries = 0;
    bars = 0;
    balls = 0;
    sevens = 0;
    blanks = 0;
}

/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
}


/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
    }
}

/* Utility function to show a win message and increase player money */
function showWinMessage() {
    playerMoney += winnings;
    winningsText.text = winnings.toString();
    resetFruitTally();
    checkJackPot();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    winningsText.text = "0";
    resetFruitTally();
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds)
    {
        return value;
    }
    else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "Blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "Fish";
                fish++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "Mouse";
                mice++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "Bird";
                birds++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "Cherry";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "Bar";
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "Ball";
                balls++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "Seven";
                sevens++;
                break;
        }
    }
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings()
{
    if (blanks == 0)
    {
        if (fish == 3) {
            winnings = playerBet * 10;
        }
        else if(mice == 3) {
            winnings = playerBet * 20;
        }
        else if (birds == 3) {
            winnings = playerBet * 30;
        }
        else if (cherries == 3) {
            winnings = playerBet * 40;
        }
        else if (bars == 3) {
            winnings = playerBet * 50;
        }
        else if (balls == 3) {
            winnings = playerBet * 75;
        }
        else if (sevens == 3) {
            winnings = playerBet * 100;
        }
        else if (fish == 2) {
            winnings = playerBet * 2;
        }
        else if (mice == 2) {
            winnings = playerBet * 2;
        }
        else if (birds == 2) {
            winnings = playerBet * 3;
        }
        else if (cherries == 2) {
            winnings = playerBet * 4;
        }
        else if (bars == 2) {
            winnings = playerBet * 5;
        }
        else if (balls == 2) {
            winnings = playerBet * 10;
        }
        else if (sevens == 2) {
            winnings = playerBet * 20;
        }
        else if (sevens == 1) {
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        winNumber++;
        showWinMessage();
    }
    else
    {
        lossNumber++;
        showLossMessage();
    }
    
}

/* When the player clicks the spin button the game kicks off 
$("#spinButton").click(function () {
    playerBet = $("div#betEntry>input").val();

    if (playerMoney == 0)
    {
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            resetAll();
            showPlayerStats();
        }
    }
    else if (playerBet > playerMoney) {
        alert("You don't have enough Money to place that bet.");
    }
    else if (playerBet < 0) {
        alert("All bets must be a positive $ amount.");
    }
    else if (playerBet <= playerMoney) {
        spinResult = Reels();
        fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
        $("div#result>p").text(fruits);
        determineWinnings();
        turn++;
        showPlayerStats();
    }
    else {
        alert("Please enter a valid bet amount");
    }
    
});*/
