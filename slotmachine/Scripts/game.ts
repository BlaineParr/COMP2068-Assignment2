/*
 * Author: Blaine Parr
 * Last Modified Date: February 19, 2015
 * Last Modified By: Blaine Parr
 * 
 * Description: This program simulates a slot machine. The user chooses how much they wish to bet,
 * and spins the reels. Depending on the outcome, they will win more money, or lose their bet.
 * If the user does not have enough money to place the bet they are trying to make, the spin
 * button will become disabled and disallow the user from activating it. There is a reset button
 * to restart the game, and a close button which redirects the user to the Georgian College 
 * website.
 * 
 * Revision History:
 * v0.1:
 * - Created project.
 * 
 * v0.2:
 * - Added a canvas and a slot machine image. 
 * - Included other images for later use.
 * 
 * v0.3:
 * - Added spin function to slot machine.
 * 
 * v0.4:
 * - Added custom font, added player money on screen.
 * 
 * v0.5:
 * - Added text display for bet, winnings and jackpot.
 * - Added button and functions for betting 1.
 * 
 * v0.6:
 * - Added reset button. 
 * - Added validation to make sure the user has enough money to place a bet.
 * - Added some internal documentation.
 * 
 * v0.7:
 * - Added close button.
 * 
 * v1.0:
 * - Moved positions of displayed text and increased size of the payout and credit placeholders
 * for the winnings and playerMoney text objects.
 * - Fixed close button so it now redirects rather than closes the program (since this doesn't 
 * work on the live web).
 * - Finished internal documentation.
 */
//Variables///////////////////////////////////////////////////////////////////////////////////////
//Stage Objects
var canvas;
var stage: createjs.Stage;

//Game Objects 
var game: createjs.Container;
var background: createjs.Bitmap;
var spinButton: createjs.Bitmap;
var disabledButton: createjs.Bitmap;
var resetButton: createjs.Bitmap;
var closeButton: createjs.Bitmap;
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
var playerBet = 0;
var spinResult;

//Tally Variables
var fish = 0;
var mice = 0;
var birds = 0;
var cherries = 0;
var bars = 0;
var balls = 0;
var sevens = 0;
var blanks = 0;

//Initialization Functions////////////////////////////////////////////////////////////////////////
/* 
 * This function initializes the game by setting up the stage, mouse events, FPS and calls the
 * main function.
 */
function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);

    main();
} //function init ends

/*
 * This function refreshes the game screen.
 */
function gameLoop() {
    stage.update(); // Refreshes our stage
} //function gameLoop ends

/*
 * This function sets up the game container calls the createUI method and adds the game container
 * to the stage.
 */
function main() {
    // instantiate my game container
    game = new createjs.Container();

    // Create Slotmachine User Interface
    createUI();

    //add game to the stage
    stage.addChild(game);
} //function main ends

/*
 * This function sets up the user interface for the game, laying out images and text objects in
 * their respective places.
 */
function createUI(): void {
    //this draws the slot machine image as the background for the game
    background = new createjs.Bitmap("assets/images/SlotMachine.png");
    game.addChild(background);

    //Spin Button
    //this will let out user spin the slot machine
    spinButton = new createjs.Bitmap("assets/images/SpinButton.png"); //get the image
    spinButton.x = 10; //position x 
    spinButton.y = 234; //position y

    //set it to be invisible until the user makes a valid bet.
    spinButton.visible = false;
    game.addChild(spinButton); //add it to the game

    //set up events
    spinButton.addEventListener("click", spinReels);
    spinButton.addEventListener("mouseover", spinButtonOver);
    spinButton.addEventListener("mouseout", spinButtonOut);

    //Disabled Button
    //this is a placeholder for the spin button while it is invisible. This will be set to
    //invisible whenever the user makes a valid bet, and set to visible when they make an invalid
    //bet
    disabledButton = new createjs.Bitmap("assets/images/DisabledButton.png"); //get the image
    disabledButton.x = 10; 
    disabledButton.y = 234; 
    game.addChild(disabledButton); //add it to the game

    //Reset Button
    //this will return the game to its original state when it is clicked
    resetButton = new createjs.Bitmap("assets/images/ResetButton.png"); //get the image
    resetButton.x = 230; 
    resetButton.y = 204; 
    game.addChild(resetButton); //add it to the game

    //set up events
    resetButton.addEventListener("click", resetAll);
    resetButton.addEventListener("mouseover", resetButtonOver);
    resetButton.addEventListener("mouseout", resetButtonOut);

    //Close Button
    //this will redirect the user to the Georgian College website when clicked
    closeButton = new createjs.Bitmap("assets/images/CloseButton.png"); //get the image
    closeButton.x = 230; //position x
    closeButton.y = 264; //position y
    game.addChild(closeButton); //add it to the games

    //set up events
    closeButton.addEventListener("click", closeGame);
    closeButton.addEventListener("mouseover", closeButtonOver);
    closeButton.addEventListener("mouseout", closeButtonOut);

    //Bet 1 Button
    //this sets the playerBet to 1 when clicked
    bet1Button = new createjs.Bitmap("assets/images/Bet1Button.png"); //get the image
    bet1Button.x = 122; 
    bet1Button.y = 204; 
    game.addChild(bet1Button); 

    //set up events
    bet1Button.addEventListener("click", bet1);
    bet1Button.addEventListener("mouseover", bet1ButtonOver);
    bet1Button.addEventListener("mouseout", bet1ButtonOut);

    //Bet 10 Button
    //this sets the playerBet to 10 when clicked
    bet10Button = new createjs.Bitmap("assets/images/Bet10Button.png"); //get the image
    bet10Button.x = 122; 
    bet10Button.y = 234; 
    game.addChild(bet10Button);

    //set up events
    bet10Button.addEventListener("click", bet10);
    bet10Button.addEventListener("mouseover", bet10ButtonOver);
    bet10Button.addEventListener("mouseout", bet10ButtonOut);

    //Bet 100 Button
    //this sets the playerBet to 100 when clicked
    bet100Button = new createjs.Bitmap("assets/images/Bet100Button.png"); //get the image
    bet100Button.x = 122;
    bet100Button.y = 264;
    game.addChild(bet100Button);

    //set up events
    bet100Button.addEventListener("click", bet100);
    bet100Button.addEventListener("mouseover", bet100ButtonOver);
    bet100Button.addEventListener("mouseout", bet100ButtonOut);

    //set up tile containers. These are used to hold the images for what's spun on the slot machine
    for (var i = 0; i < 3; i++) {
        tileContainer[i] = new createjs.Container();
        tileContainer[i].x = 80 + (64 * i); //increment x by 64 for each container
        tileContainer[i].y = 64;
        game.addChild(tileContainer[i]);

        tiles[i] = new createjs.Bitmap("assets/images/Default.png"); //load the default image tile
        tiles[i].y = 32;
        tileContainer[i].addChild(tiles[i]); //add the tile to the container
    } //for ends

    //set up displayed text
    jackpotText = new createjs.Text(jackpot.toString(), "16px PokemonGB", "#000000");
    jackpotText.x = 176;
    jackpotText.y = 16;

    winningsText = new createjs.Text(winnings.toString(), "16px PokemonGB", "#000000");
    winningsText.x = 240;
    winningsText.y = 44;

    playerMoneyText = new createjs.Text(playerMoney.toString(), "16px PokemonGB", "#000000");
    playerMoneyText.y = 44;

    playerBetText = new createjs.Text(playerBet.toString(), "16px PokemonGB", "#000000");
    playerBetText.x = 80;
    playerBetText.y = 16;

    //add the text objects to the game
    game.addChild(jackpotText);
    game.addChild(winningsText);
    game.addChild(playerBetText);
    game.addChild(playerMoneyText);
} //function createUI ends

// Event handlers/////////////////////////////////////////////////////////////////////////////////
/* 
 * This function sets the reset button to be 0% transparent when the mouse leaves it.
 */
function spinButtonOut() {
    spinButton.alpha = 1.0;
} //function spinButtonOut ends

/* 
 * This function sets the spin button to be 99% transparent when the mouse is hovering over it.
 */
function spinButtonOver() {
    spinButton.alpha = 0.01;
} //function spinButtonOut ends

/* 
 * This function spins the slot machine.
 */
function spinReels() {
    //get what was spun
    spinResult = Reels();

    //get the respecive images for the spin results
    for(var tile = 0; tile < 3; tile++) {
        tileContainer[tile].removeAllChildren(); //clear the tileContainer

        //this gets the image of what was spun
        tiles[tile] = new createjs.Bitmap("assets/images/" + spinResult[tile] + ".png");

        tiles[tile].y = 32; //center the image vertically on the reels

        tileContainer[tile].addChild(tiles[tile]); //display the image on the tileContainer
    } //for ends
    determineWinnings(); //determine if the player won or lost
    showPlayerStats(); //display the results of the spin
    betValidate(); //ensure the player still has enough money to make the same bet
} //function spinReels ends

/* 
 * This function sets the reset button to be 0% transparent when the mouse leaves it.
 */
function resetButtonOut() {
    resetButton.alpha = 1.0;
} //function resetButtonOut ends

/* 
 * This function sets the close button to be 99% transparent when the mouse is hovering over it.
 */
function resetButtonOver() {
    resetButton.alpha = 0.01;
} //function resetButtonOut ends

/* 
 * This function sets the close button to be 0% transparent when the mouse leaves it.
 */
function closeButtonOut() {
    closeButton.alpha = 1.0;
} //function closeButtonOut ends

/* 
 * This function sets the reset button to be 99% transparent when the mouse is hovering over it.
 * */
function closeButtonOver() {
    closeButton.alpha = 0.01;
} //function closeButtonOut ends

/* 
 * This function redirects the user to the Georgian College website when the close button is 
 * clicked.
 */
function closeGame() {
    window.location.href="http://georgiancollege.ca";
} //function closeGame ends

/* 
 * This function sets the bet 1 button to be 0% transparent when the mouse leaves it.
 */
function bet1ButtonOut() {
    bet1Button.alpha = 1.0;
} //function bet1ButtonOut ends

/* 
 * This function sets the bet 1 button to be 99% transparent when the mouse is hovering over it.
 */
function bet1ButtonOver() {
    bet1Button.alpha = 0.01;
} //function bet1ButtonOut ends

/* 
 * This function sets the player's bet to 1 and displays the bet.
 */
function bet1() {
    playerBet = 1;
    playerBetText.text = playerBet.toString();
    betValidate();
} //function bet1 ends

/* 
 * This function sets the bet 10 button to be 0% transparent when the mouse leaves it.
 */
function bet10ButtonOut() {
    bet10Button.alpha = 1.0;
} //function bet10ButtonOut ends

/* 
 * This function sets the bet 10 button to be 99% transparent when the mouse is hovering over it.
 */
function bet10ButtonOver() {
    bet10Button.alpha = 0.01;
} //function bet10ButtonOut ends

/* 
 * This function sets the player's bet to 10 and displays the bet.
 */
function bet10() {
    playerBet = 10;
    playerBetText.text = playerBet.toString();
    betValidate();
} //function bet10 ends

/* 
 * This function sets the bet 100 button to be 0% transparent when the mouse leaves it.
 */
function bet100ButtonOut() {
    bet100Button.alpha = 1.0;
} //function bet10ButtonOut ends

/* 
 * This function sets the bet 100 button to be 99% transparent when the mouse is hovering over it.
 */
function bet100ButtonOver() {
    bet100Button.alpha = 0.01;
} //function bet10ButtonOut ends

/* 
 * This function sets the player's bet to 100 and displays the bet.
 */
function bet100() {
    playerBet = 100;
    playerBetText.text = playerBet.toString();
    betValidate();
} //function bet100 ends

//Utility Functions///////////////////////////////////////////////////////////////////////////////
/* 
 * This function ensures the player has enough money to place their bet.
 */
function betValidate() {
    //if the player does not have enough money, set the spinButton to be invisible and the 
    //disabledButton to be visible. Else set the spinButton to be visible and the disabledButton
    //to be invisible
    //
    if (playerBet > playerMoney) {
        spinButton.visible = false;
        disabledButton.visible = true;
    } //if ends
    else {
        spinButton.visible = true;
        disabledButton.visible = false;
    } //else if ends
} //funtion bet validate ends

/* 
 * This function displays the jackpot and playerMoney values on screen.
 */
function showPlayerStats() {
    jackpotText.text = jackpot.toString(); //display the jackpot value
    playerMoneyText.text = playerMoney.toString(); //display the player's money
} //function showPlayerStats ends

/*
 * This function resets all fruit tallies.
 */
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

/*
 * This function returns the slot machine to its initial state.
 */
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    playerBet = 0;
    playerBetText.text = playerBet.toString();
    playerMoneyText.text = playerMoney.toString();
    winningsText.text = winnings.toString();
    jackpotText.text = jackpot.toString();
    spinButton.visible = false;
    disabledButton.visible = true;

    //for loop to set the tile containers to display the default images again
    for (var i = 0; i < 3; i++) {
        tileContainer[i].removeAllChildren();

        tiles[i] = new createjs.Bitmap("assets/images/Default.png");
        tiles[i].y = 32;

        tileContainer[i].addChild(tiles[i]);
    } //for loop ends
} //function resetAll ends

/* 
 * This function checks to see if the player won the jackpot.
 */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);

    //if the two values are equal let the user know they won the jackpot, and add it to their
    //money
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
    } //function if ends
} //function checkJackPot ends

/* 
 * This function adds the winnings to the player's money and gives them a chance to win the 
 * jackpot.
 */
function showWinMessage() {
    playerMoney += winnings;
    winningsText.text = winnings.toString();
    resetFruitTally();
    checkJackPot();
} //function showWinMessage ends

/*
 * This function removes the bet from the player's money.
 */
function showLossMessage() {
    playerMoney -= playerBet;
    winningsText.text = "0";
    resetFruitTally();
} //function showLossMessage ends

/* 
 * This function checks if a value falls within a range of bounds.
 */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    } //if ends
    else {
        return !value;
    } //else ends
} //function checkRange ends

/* 
 * This function determines the betLine results.
 * e.g. Bar - Mouse - Bird
 */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    //for loop to add each result to the betLine
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

/* 
 * This function calculates the player's winnings, if any 
 */
function determineWinnings()
{
    //if no blanks were spun check to see how much the player won and call showWinMessage. Else
    //call showLossMessage
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
        showWinMessage();
    } //if ends
    else {
        showLossMessage();
    } //else ends 
} //function determineWinnings ends