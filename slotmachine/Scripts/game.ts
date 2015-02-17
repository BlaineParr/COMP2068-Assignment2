var canvas;
var stage: createjs.Stage;

//Game Objects 
var game: createjs.Container;
var background: createjs.Bitmap;
var spinButton: createjs.Bitmap;
var disabledButton: createjs.Bitmap;
var resetButton: createjs.Bitmap;
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
    spinButton.y = 234;
    spinButton.visible = false;
    game.addChild(spinButton);

    spinButton.addEventListener("click", spinReels);
    spinButton.addEventListener("mouseover", spinButtonOver);
    spinButton.addEventListener("mouseout", spinButtonOut);

    //Disabled Button
    disabledButton = new createjs.Bitmap("assets/images/DisabledButton.png");
    disabledButton.x = 10;
    disabledButton.y = 234;
    disabledButton.visible = true;
    game.addChild(disabledButton);

    //Reset Button
    resetButton = new createjs.Bitmap("assets/images/ResetButton.png");
    resetButton.x = 230;
    resetButton.y = 234;
    game.addChild(resetButton);

    resetButton.addEventListener("click", resetAll);
    resetButton.addEventListener("mouseover", resetButtonOver);
    resetButton.addEventListener("mouseout", resetButtonOut);

    //Bet 1 Button
    bet1Button = new createjs.Bitmap("assets/images/Bet1Button.png");
    bet1Button.x = 122;
    bet1Button.y = 204;
    game.addChild(bet1Button);

    bet1Button.addEventListener("click", bet1);
    bet1Button.addEventListener("mouseover", bet1ButtonOver);
    bet1Button.addEventListener("mouseout", bet1ButtonOut);

    //Bet 10 Button
    bet10Button = new createjs.Bitmap("assets/images/Bet10Button.png");
    bet10Button.x = 122;
    bet10Button.y = 234;
    game.addChild(bet10Button);

    bet10Button.addEventListener("click", bet10);
    bet10Button.addEventListener("mouseover", bet10ButtonOver);
    bet10Button.addEventListener("mouseout", bet10ButtonOut);

    //Bet 100 Button
    bet100Button = new createjs.Bitmap("assets/images/Bet100Button.png");
    bet100Button.x = 122;
    bet100Button.y = 264;
    game.addChild(bet100Button);

    bet100Button.addEventListener("click", bet100);
    bet100Button.addEventListener("mouseover", bet100ButtonOver);
    bet100Button.addEventListener("mouseout", bet100ButtonOut);

    //set up tile containers
    for (var i = 0; i < 3; i++) {
        tileContainer[i] = new createjs.Container();
        tileContainer[i].x = 80 + (64 * i);
        tileContainer[i].y = 64;
        game.addChild(tileContainer[i]);
        tiles[i] = new createjs.Bitmap("assets/images/Default.png");
        tiles[i].y = 32;
        tileContainer[i].addChild(tiles[i]);
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

            tiles[tile].y = 32;

            tileContainer[tile].addChild(tiles[tile]);
        } //for ends
        determineWinnings();
        showPlayerStats();
        betValidate();
    } //else if ends
} //function spinReels ends

function resetButtonOut() {
    resetButton.alpha = 1.0;
} //function resetButtonOut ends

function resetButtonOver() {
    resetButton.alpha = 0.01;
} //function resetButtonOut ends

function bet1ButtonOut() {
    bet1Button.alpha = 1.0;
} //function bet1ButtonOut ends

function bet1ButtonOver() {
    bet1Button.alpha = 0.01;
} //function bet1ButtonOut ends

function bet1() {
    playerBet = 1;
    playerBetText.text = playerBet.toString();
    betValidate();
} //function bet1 ends

function bet10ButtonOut() {
    bet10Button.alpha = 1.0;
} //function bet10ButtonOut ends

function bet10ButtonOver() {
    bet10Button.alpha = 0.01;
} //function bet10ButtonOut ends

function bet10() {
    playerBet = 10;
    playerBetText.text = playerBet.toString();
    betValidate();
} //function bet10 ends

/* This function sets the bet 100 button to be 0% transparent when the mouse leaves it*/
function bet100ButtonOut() {
    bet100Button.alpha = 1.0;
} //function bet10ButtonOut ends

/* This function sets the bet 100 button to be 99% transparent when the mouse is hovering over it*/
function bet100ButtonOver() {
    bet100Button.alpha = 0.01;
} //function bet10ButtonOut ends

/* This function sets the player's bet to 100 and displays the bet*/
function bet100() {
    playerBet = 100;
    playerBetText.text = playerBet.toString();
    betValidate();
} //function bet100 ends

/* This function ensures the player has enough money to place their bet*/
function betValidate() {
    if (playerBet > playerMoney) {
        spinButton.visible = false;
        disabledButton.visible = true;
    } //if ends
    else if (playerBet < playerMoney) {
        spinButton.visible = true;
        disabledButton.visible = false;
    } //else if ends
} //funtion bet validate ends

/* Utility function to show Player Stats */
function showPlayerStats() {
    winRatio = winNumber / turn;

    jackpotText.text = jackpot.toString();
    playerMoneyText.text = playerMoney.toString();
} //function showPlayerStats ends

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
} //function resetFruitTally ends

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
    playerBetText.text = playerBet.toString();
    playerMoneyText.text = playerMoney.toString();
    winningsText.text = winnings.toString();
    jackpotText.text = jackpot.toString();
    spinButton.visible = false;
    disabledButton.visible = true;
} //function resetAll ends

/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);

    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
    } //function if ends
} //function checkJackPot ends

/* Utility function to show a win message and increase player money */
function showWinMessage() {
    playerMoney += winnings;
    winningsText.text = winnings.toString();
    resetFruitTally();
    checkJackPot();
} //function showWinMessage ends

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    winningsText.text = "0";
    resetFruitTally();
} //function showLossMessage ends

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    } //if ends
    else {
        return !value;
    } //else ends
} //function checkRange ends

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
        } //switch ends
    } //for ends
    return betLine;
} //function Reels ends

/* This function calculates the player's winnings, if any */
function determineWinnings()
{
    if (blanks == 0)
    {
        if (fish == 3) {
            winnings = playerBet * 10;
        } //if ends
        else if(mice == 3) {
            winnings = playerBet * 20;
        } //else if ends
        else if (birds == 3) {
            winnings = playerBet * 30;
        } //else if ends
        else if (cherries == 3) {
            winnings = playerBet * 40;
        } //else if ends
        else if (bars == 3) {
            winnings = playerBet * 50;
        } //else if ends
        else if (balls == 3) {
            winnings = playerBet * 75;
        } //else if ends
        else if (sevens == 3) {
            winnings = playerBet * 100;
        } //else if ends
        else if (fish == 2) {
            winnings = playerBet * 2;
        } //else if ends
        else if (mice == 2) {
            winnings = playerBet * 2;
        } //else if ends
        else if (birds == 2) {
            winnings = playerBet * 3;
        } //else if ends
        else if (cherries == 2) {
            winnings = playerBet * 4;
        } //else if ends
        else if (bars == 2) {
            winnings = playerBet * 5;
        } //else if ends
        else if (balls == 2) {
            winnings = playerBet * 10;
        } //else if ends
        else if (sevens == 2) {
            winnings = playerBet * 20;
        } //else if ends
        else if (sevens == 1) {
            winnings = playerBet * 5;
        } //else if ends
        else {
            winnings = playerBet * 1;
        } //else ends
        winNumber++;
        showWinMessage();
    } //if ends
    else {
        lossNumber++;
        showLossMessage();
    } //else ends
    
} //function determineWinnings ends