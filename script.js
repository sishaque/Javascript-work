
// your age in days
function ageInDays() {
    let year = prompt('What year were you born?');
    let age = (2020 - year) * 365;
    console.log('Your ' + age + ' days old')
    let h1 = document.createElement('h1');
    let textAnswer = document.createTextNode('Your are ' + age + ' days old');
    h1.setAttribute('id', 'ageInDays()');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
    return age
}

function reset() {
    document.getElementById('ageInDays()').remove();
}

// Challenge 2: Cat Generator

function generateCat() {
    let image = document.createElement("img");
    let div = document.getElementById("flex-gen-cat");
    image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size";
    div.appendChild(image);
}


// challenge 3: rock, paper, scissor

function rpsGame(yourChoice) {
    console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randomToRpsInt());
    console.log('Computer choice:', botChoice);
    // alert(botChoice); 
    // [1, 0] human won
    result = decideWinner(humanChoice, botChoice); 
    console.log(result);
    message = finalMessage(result); // you won {'message' : 'you won', 'color' : 'green'}
    console.log(message)
    rpsFrontEnd(yourChoice.id, botChoice, message)
}

function randomToRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
    return ["rock", "paper", "scissor"][number];
}

function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        "rock": {"scissor": 1, "rock": 0.5, "paper": 0},
        "paper": {"rock" : 1, "paper" : 0.5, "scissor": 0},
        "scissor": {"paper": 1, "scissor": 0.5, "rock": 0},
    };
    
    var yourScore = rpsDatabase[yourChoice][computerChoice]; 
    var computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];
}


function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return {'message': 'You Lost!', 'color': 'red'};
    }
    else if(yourScore === 0.5) {
        return {'message': 'Draw!', 'color': 'yellow'};
    }
    else {
        return {'message': 'You won!', 'color': 'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor':  document.getElementById('scissor').src

    }

    // lets remove all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    let humanDiv = document.createElement('div');
    let botDiv = document.createElement('div');
    let messageDiv = document.createElement('div');

    humanDiv.innerHTML = " <img src = '" + imagesDatabase[humanImageChoice] + "' height = 150 width = 150 style = 'box-shadow: 0px 10px 50px rgba(37,50,233,1);'>";
    messageDiv.innerHTML = " <h1 style = 'color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>";
    botDiv.innerHTML = " <img src = '" + imagesDatabase[botImageChoice] + "' height = 150 width = 150 style = 'box-shadow: 0px 10px 50px rgba(243,38,24,1);'>";
    

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
    
}
// Challenge 4, change the color of all the buttons
let all_buttons = document.getElementsByTagName('button');
console.log(all_buttons);

var copyAllButtons = [];
for (let i = 0; i<all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
}

console.log(copyAllButtons);

function buttonColorChange(buttonThingy){
    if (buttonThingy.value === 'red'){
        buttonsRed();
    } else if(buttonThingy.value === 'green') {
        buttonsGreen();
    } else if(buttonThingy.value === 'reset') {
        buttonColorReset();
    } else if(buttonThingy.value === 'random') {
        randomColors();
    }
}

function buttonsRed() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}


function buttonsGreen() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonColorReset() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1])
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors() {
    let choices = ['btn-primary', 'btn-danger','btn-warning', 'btn-success'];

    for (let i = 0; i < all_buttons.length; i++) {
        let randomNumber = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}


// Challenge 5: Blackjack
let blackjackGame = {
    "You" : {"scoreSpan" : "#your-blackjack-result", "div" : "#yourbox", "score" : 0},
    "Dealer" : {"scoreSpan" : "#dealer-blackjack-result", "div" : "#dealerbox", "score" : 0},
    "cards" : ["2","3","4","5","6","7","8","9","10","J","Q","K","A"],
    "cardsMap" : {'2' : 2, '3' : 3, '4' : 4, '5' : 5, '6' : 6, '7' : 7,
     '8' : 8, '9' : 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1,11]},

     'wins' : 0,
     'losses' : 0,
     'draws' : 0,
     'isStand': false,
     'turnsOver': false,
};

const YOU = blackjackGame['You']
const DEALER = blackjackGame['Dealer']

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
    if(blackjackGame['isStand'] === false) {
        let card = randomCard();
        console.log(card);
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
        console.log(YOU['score']);
   } 
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}



function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true) {
    
        blackjackGame['isStand'] = false;
        let yourImages = document.querySelector('#yourbox').querySelectorAll('img');
        console.log(yourImages);

        let dealerImages = document.querySelector('#dealerbox').querySelectorAll('img');
        console.log(dealerImages);

        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove()
        }

        for (let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove()
        }
        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#your-blackjack-result').style.color = '#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';
        document.querySelector('#blackjack-result').textContent = 'Lets Play';
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['turnsOver'] = true;

    }
}

function updateScore(card, activePlayer) {
    if (card === 'A') {
// if adding 11 (card[1]) keeps me below 21 add 11 otherwise add 1 (card[0])
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = "BUST!";
        document.querySelector(activePlayer['scoreSpan']).style.color = "red";
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
    }
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function dealerLogic() {
    blackjackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {     
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
            
        }
      
    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
       
    
       
        
    }

    function computeWinner() {
        let winner;

        if (YOU['score'] <= 21) {
            if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
                blackjackGame['wins']++;
                winner = YOU;
            } else if (YOU['score'] < DEALER['score']) {
                blackjackGame['losses']++;
                winner = DEALER;

            } else if (YOU['score'] === DEALER['score']) {
                blackjackGame['draws']++;
            }
        } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
            blackjackGame['losses']++;
            winner = DEALER;
        } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
            blackjackGame['draws']++;
        }

        console.log(blackjackGame);
        return winner;
    }



function showResult(winner) {
    let message, messageColor;

    if (blackjackGame['turnsOver'] === true){

        

        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won!';
            messageColor = 'green';
            winSound.play();
        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You Lost!';
            messageColor = 'red';
            lossSound.play()

        } else {
            document.querySelectorAll('#draws').textContent = blackjackGame['draws'];
            message = 'You draw!';
            messageColor = 'black';

        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}

