function lcm(){
    const m = Number(document.getElementById("num1").value);
    const n = Number(document.getElementById("num2").value);
    let maxNum = Math.max(m,n);
    while(1)
    {
        if(maxNum%m==0 && maxNum%n==0)
        {
            break;
        }
        maxNum+=1;
    }
    document.getElementById("result_lcm").innerHTML = 
        "The LCM of "+String(m) + " and "+ String(n) +" is: <b>"+String(maxNum)+"</b>";
}

function hcf(){
    const m = Number(document.getElementById("num1").value);
    const n = Number(document.getElementById("num2").value);
    let minNum = Math.min(m,n);
    while(1)
    {
        if(m%minNum==0 && n%minNum==0)
        {
            break;
        }
        minNum-=1;
    }
    document.getElementById("result_hcf").innerHTML = 
        "The HCF of "+String(m) + " and "+ String(n) +" is: <b>"+String(minNum)+"</b>";
}

function resetlcmhcf(){
    location.reload();
    //$("#lcmhcf").load(" #lcmhcf > *");
}

function days(){
    let birthday = new Date(document.getElementById("birthday").value);
    let today = new Date();
    datediff = Math.floor((today - birthday)/(1000*60*60*24))
    let greetings = ['Whooo!','Yippeee!','Yeeet!!','Yiiieet!!','Get in there! :-)',
            'Congratulations ;-)','Wow!!','Brilliant!','Cheerio!','Bravo!',
            'Bravo Bravo!!','Well done! :-)','good good!','Not bad!']
    let index = Math.floor(Math.random() * greetings.length)
    let greeting = greetings[index]
    document.getElementById("result_days").innerHTML = 
        "You are <b>"+ datediff + "</b> days old! "+greeting;
}

document.querySelector('#lcm').addEventListener('click',lcm) ; 
document.querySelector('#hcf').addEventListener('click',hcf) ; 
document.querySelector('#resetlcmhcf').addEventListener('click',resetlcmhcf) ; 
document.querySelector('#days').addEventListener('click',days) ;

function submitme(){
    let year = prompt("What year were you born?")
    let cur = new Date();
    let curYear = cur.getFullYear()
    let days = (curYear-year)*365

    let myh2       = document.createElement("h2")  // does apply h2 style on this new element
    let textAnswer = document.createTextNode("You are "+days+" days old.")
    myh2.setAttribute("id", "txt_result")
    myh2.appendChild(textAnswer)
    document.getElementById("result").appendChild(myh2);
}

function clearme(){
    document.getElementById("txt_result").remove()
}

function generateCat(){
    let img1 = document.createElement("img");
    let div = document.getElementById("cats-go-here")
    img1.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small"
    div.appendChild(img1)
}

function getRandNum(){
    let num = Math.floor(Math.random()*3)
    return num;
}

function getChoice(number){
    return ["rock","paper","scissors"][number]
}

function decideWinner(yourChoice, botChoice){
    // decide in the terms of the user
    let rpsDatabase = {
        "rock":{"scissors":1, "rock": 0.5, "paper": 0},
        "paper":{"rock":1, "paper": 0.5, "scissors": 0},
        "scissors":{"paper":1, "scissors": 0.5, "rock": 0}
    }
    let yourScore = rpsDatabase[yourChoice.id][botChoice]
    let botScore =  rpsDatabase[botChoice][yourChoice.id]
    return [yourScore, botScore]
}

function finalMessage(yourScore, botScore){
    // console.log(yourScore)
    // console.log(botScore)
    if (yourScore === 0) {
        return {'message':'You Lost!', 'color': 'red'}
    }
    else if (yourScore === 0.5){
        return {'message':'You Tied!', 'color': 'yellow'}
    }
    else{
        return {'message':'You Won!', 'color': 'green'}
    }
}

async function rpsFrontEnd(yourChoice, botChoice, message){
    let imageDB = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    };
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();
    
    let humanDiv = document.createElement('div')
    let botDiv = document.createElement('div')
    let msgDiv = document.createElement('div')

    humanDiv.innerHTML = "<img src='" + imageDB[yourChoice] + "' style='box-shadow: 0px 10px 50px rgba(37,50,233,1);'>";
    msgDiv.innerHTML = "<h3 style='color:" + message['color'] + "; font-size:40px; padding:10px;'>" + message['message'] + "</h3>";
    botDiv.innerHTML = "<img src='" + imageDB[botChoice] + "' style='box-shadow: 0px 10px 50px rgba(243,38,24,1);'>";

    // console.log('here => '+message['message']);
    if (message['message'].indexOf('Won') != -1) {
        winSound.play();
    }
    else if (message['message'].indexOf('Lost') != -1) {
        lossSound.play();
    }

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(msgDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
    await sleep(3000);
    location.reload();
    // $("#rpsgame").load(" #rpsgame > *");
}

function rpsgame(yourChoice){
    // console.log(yourChoice.id);
    let botChoice = getChoice(getRandNum());
    // console.log(botChoice);
    let result = decideWinner(yourChoice, botChoice); // [1,0] human won, [0.5, 05] tie, [0, 1] bot won
    // console.log(result);
    let message = finalMessage(result[0], result[1]);   // You Won! You Lost! You Tied!
                                          // {"message":"You Won", "color":"green"} // Object for JS styling
    // console.log(message)
    rpsFrontEnd(yourChoice.id, botChoice, message); 
}

let all_btns= document.getElementsByTagName('button');
var copy_all_btns = []
for (let index = 0; index < all_btns.length; index++) {
    copy_all_btns.push(all_btns[index].classList[1]);   // out of "btn btn-warning", we only want second one
}

function buttonColourChange(yourChoice){
    if (yourChoice.value === 'red'){
        buttonRed();
    }
    else if (yourChoice.value === 'green'){
        buttonGreen();
    }
    else if (yourChoice.value === 'reset'){
        buttonReset();
    }
    else if (yourChoice.value === 'random'){
        buttonRandom();
    }
}

function buttonRed(){
    let array = document.getElementsByTagName('button');
    for (let index = 0; index < array.length; index++) {
        array[index].classList.remove(array[index].classList[1]);
        array[index].classList.add('btn-danger');
    }
}

function buttonGreen(){
    let array = document.getElementsByTagName('button');
    for (let index = 0; index < array.length; index++) {
        array[index].classList.remove(array[index].classList[1]);
        array[index].classList.add('btn-success');
    }
}

function buttonReset(){
    let array = document.getElementsByTagName('button');
    for (let index = 0; index < array.length; index++) {
        array[index].classList.remove(array[index].classList[1]);
        array[index].classList.add(copy_all_btns[index]);
    }
}

function buttonRandom(){
    let array = document.getElementsByTagName('button');
    let choices = ['btn-primary','btn-success','btn-warning','btn-danger']
    for (let index = 0; index < array.length; index++) {
        array[index].classList.remove(array[index].classList[1]);
        array[index].classList.add(choices[Math.floor(Math.random()*4)])
    }
}

let blackjackGame = {
    'you' : {'scoreSpan': '#your-result', 'div':'#your-box', 'score': 0},
    'dealer' : {'scoreSpan': '#dealer-result', 'div':'#dealer-box', 'score': 0},
    'cards' : ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
    'cardsMap' : {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10,'A':[1,11]},
    'wins' : 0,
    'losses' : 0,
    'draws' : 0,
    'isStand' : false,  /* stand mode activated */
    'turnsOver' : false,
};

document.querySelector('#hit').addEventListener('click', blackjackHit);
document.querySelector('#stand').addEventListener('click', blackjackStand);
document.querySelector('#deal').addEventListener('click', blackjackDeal);


const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

const PLAYTEXT = document.querySelector('#BlackJackResult').textContent
document.getElementById('stand').disabled = true
document.getElementById('deal').disabled = true

function blackjackHit() {
    //console.log(document.querySelector('#BlackJackResult').textContent);
    //console.log(document.querySelector('#BlackJackResult').textContent.indexOf('Play'));
    if(document.querySelector('#BlackJackResult').textContent.indexOf('Play') === -1) {
        //console.log("going to clean function")
        clean()
    }
    if (blackjackGame['isStand'] === false){
        let card = randomCard();
        showCard(YOU, card);
        updateScore(YOU, card);
        showScore(YOU)
        document.getElementById('stand').disabled = false
        if (YOU['score'] > 0 && DEALER['score']> 0)
        {
            document.getElementById('deal').disabled = false;
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function blackjackStand() {
    document.getElementById('hit').disabled = true
    document.getElementById('stand').disabled = true
    blackjackGame['isStand'] = true;
    while (DEALER['score']<16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(DEALER, card);
        updateScore(DEALER, card);
        showScore(DEALER);
        await sleep(500);
    }
    if (DEALER['score'] > 15) {
        blackjackGame['turnsOver'] = true;
        showResult(computeWinner());
    }
    if (YOU['score'] > 0 && DEALER['score']> 0)
    {
        document.getElementById('deal').disabled = false;
    }
}

function showCard(activePlayer, card){
    if (activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal() {
    clean();
    /*
    if (blackjackGame['turnsOver'] === true) {
        blackjackGame['isStand'] = false;
        document.getElementById('stand').disabled = true;
        document.getElementById('deal').disabled = true;
        if(document.querySelector('#BlackJackResult').textContent.indexOf('Play') === -1)
        {
            return null;
        }
        showResult(computeWinner());
    }*/
}

function clean() {
    cards1 = document.querySelector('#your-box').querySelectorAll('img');
    cards2 = document.querySelector('#dealer-box').querySelectorAll('img');
    for (let index = 0; index < cards1.length; index++) {
        cards1[index].remove();
    }
    for (let index = 0; index < cards2.length; index++) {
        cards2[index].remove();
    }
    YOU['score'] = 0;
    DEALER['score'] = 0;
    document.querySelector('#your-result').textContent = 0;
    document.querySelector('#dealer-result').textContent = 0;
    document.querySelector('#your-result').style.color = '#ffffff';
    document.querySelector('#dealer-result').style.color = '#ffffff';
    document.querySelector('#BlackJackResult').textContent = PLAYTEXT;
    document.querySelector('#BlackJackResult').style.color = 'black';
    document.getElementById('deal').disabled = true;
    blackjackGame['isStand'] = false;
}

function randomCard() {
    return blackjackGame['cards'][Math.floor(Math.random() * 13)]
}

function updateScore(activePlayer, card) {
    // For A : if adding 11 keeps score below 21, add 11, otherwise add 1
    if (card === 'A')
    {
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }
        else{
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    }
    else{
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}
function computeWinner() {
    let winner;
    if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        winner = DEALER;
    }
    else if (YOU['score'] <= 21 && DEALER['score'] > 21) {
        winner = YOU;
    }
    else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        // DRAW
    }
    else if (YOU['score'] === DEALER['score'] ) {
        // DRAW
    }
    else if (YOU['score'] > DEALER['score'] ) {
        winner = YOU;
    }
    else {
        winner = DEALER;
    }
    if (winner === YOU) {
        blackjackGame['wins']++;
    }
    else if (winner === DEALER) {
        blackjackGame['losses']++;
    }
    else {
        blackjackGame['draws']++;
    }
    return winner;
}

function showResult(winner) {
    document.getElementById('deal').disabled = true;
    document.getElementById('stand').disabled = true;
    let message, messageColor;

    if (winner === YOU) {
        message = 'You won!';
        messageColor = 'green';
        winSound.play();
    }
    else if (winner === DEALER) {
        message = 'You lost!';
        messageColor = 'red';
        lossSound.play();
    }
    else {
        message = 'You drew!';
        messageColor = 'black';
    }
    document.querySelector('#BlackJackResult').textContent = message;
    document.querySelector('#BlackJackResult').style.color = messageColor;
    document.querySelector('#wins').textContent = blackjackGame['wins']
    document.querySelector('#losses').textContent = blackjackGame['losses']
    document.querySelector('#draws').textContent = blackjackGame['draws']
    document.getElementById('deal').disabled = true;
    document.getElementById('stand').disabled = true;
    document.getElementById('hit').disabled = false
    document.getElementById('deal')
}