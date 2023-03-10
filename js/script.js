function aboutButton(){
  document.getElementById('textInput').classList.toggle("show");
}

/* DROPDOWN BUTTON - https://www.w3schools.com/howto/howto_js_dropdown.asp
When the user clicks on the button, toggle between hiding and showing the dropdown content */
function dropDown() {
    document.getElementById("myDropdown").classList.toggle("show");
};
  
// Close the dropdown menu if the user clicks outside of it 
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      let dropdowns = document.getElementsByClassName("dropdown-content");
      for (let i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        };
      };
    };
};

// Choose Difficulty Level
const easy = document.getElementById("easy");
const medium = document.getElementById("medium");
const hard = document.getElementById("hard");

let difficulty = "easy"; // default difficulty

easy.addEventListener('click', (evt) => {
  difficulty = "easy";
  let easySelection = easy.innerText;
  document.querySelector(".dropbtn").innerText = easySelection;
});

medium.addEventListener('click', (evt) => {
  difficulty = "medium";
  document.querySelector(".dropbtn").innerText = medium.innerText;
});

hard.addEventListener('click', (evt) => {
  difficulty = "hard";
  document.querySelector(".dropbtn").innerText = hard.innerText;
});

// When the user clicks on div, open the popup
const xBtn = document.createElement("button");
xBtn.classList.add("close-button");
xBtn.innerText = "x";
function myFunction(myBool) {
  let popup = document.getElementById("myPopup");
  if (myBool) {
    popup.innerHTML = "CORRECT!! ur da best"
    popup.append(xBtn);
  }
  popup.classList.toggle("show");
};


// Choose category and get question - trivia db has multiple sub-categories so created random function 
function random_cat(cats) { 
  return cats[Math.floor(Math.random()*cats.length)];
}

function catGeo () {
  choiceCat = 22; 
  sendApiRequest();
};

function catEnt () {
  let cats = [11, 12, 13, 14, 15, 16, 26, 29, 31, 32];
  choiceCat = random_cat(cats); 
  console.log(choiceCat)
  sendApiRequest();
};

function catHist () {
  let cats = [20, 23, 24]
  choiceCat = random_cat(cats); 
  sendApiRequest();
};

function catArt () {
  let cats = [10, 25]
  choiceCat = random_cat(cats); 
  sendApiRequest();
};

function catSci () {
  let cats = [17, 18, 19, 27, 30]
  choiceCat = random_cat(cats); 
  sendApiRequest();
};

function catSports () {
  let cats = [21, 28]
  choiceCat = random_cat(cats); 
  sendApiRequest();
};


// Send API Request, log data in console, call useApiData - https://www.youtube.com/watch?v=SgJ_femmsfg
async function sendApiRequest() {
    let question = await fetch(`https://opentdb.com/api.php?amount=1&category=${choiceCat}&difficulty=${difficulty}&type=multiple`);
    let data = await question.json();
    console.log(data);
    useApiData(data);
    return;
};

// Use API Data - combines correct & incorrect answers, shuffles them, then displays question and answer buttons/texts
let wholeCard = document.querySelector("section.card");
let original = wholeCard.innerHTML;
let pie = 0;
let questionNum = 0;
function useApiData(data) {
    let answrArr = data.results[0].incorrect_answers;
    let correctAns = data.results[0].correct_answer;
    answrArr.push(data.results[0].correct_answer);
    shuffleArray(answrArr);
    answers(answrArr);
    wholeCard.innerHTML = (`${data.results[0].question}`);
    answers(answrArr, correctAns);
};

// Shuffle Answer Array - https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
const shuffleArray = answrArr => {
  for (let i = answrArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = answrArr[i];
    answrArr[i] = answrArr[j];
    answrArr[j] = temp;
  }
  return answrArr
};

// Make buttons & answers -- https://www.3schools.in/2022/08/create-multiple-buttons-js.html
const buttonLetters = ['A', 'B', 'C', 'D'];
const answers = (answrArr, correctAns) => {
  for(let i = 0; i< answrArr.length; i++) {
    let newBtn = document.createElement('button');
    btnChoice = buttonLetters[i]
    newBtn.innerText = btnChoice;
    newBtn.setAttribute('id', answrArr[i]);
    newBtn.setAttribute('class', `category answer ${btnChoice}`)
    let newText = document.createElement('text');
    newText.innerHTML=answrArr[i];
    newText.setAttribute('class', 'answer');
    newText.setAttribute('id', btnChoice);
    newText.style.paddingLeft = "20px";
    let newDiv = document.createElement('div');
    wholeCard.append(newDiv);
    newDiv.append(newBtn, newText);}
  
 
  // Select Correct Answer
  let chooseAnswer = document.getElementsByClassName("answer");
  Array.from(chooseAnswer).forEach((answer) => {
    answer.addEventListener('click', evt => {
      let answerChoice = answer.innerText;
      let answerBtn = answer.id;
      if (answerChoice == correctAns || answerBtn == correctAns) {
        rightAns();
      }
      else {
        let popup = document.getElementById("myPopup");
        popup.innerText = `INCORRECT the correct answer is ${correctAns}`;
        popup.append(xBtn);
        wrongAns();
      };
  })});
};

const scoreCard = document.querySelector(".score");

// if wrong answer is selected
function wrongAns() { 
  myFunction(false);
  wholeCard.innerHTML = original;
  questionNum++;
  scoreCard.innerHTML = `Question Num: ${questionNum}   Pie Pieces: ${pie}`
  checkWin();
};

// if correct answer is selected
function rightAns() {
  myFunction(true);
  wholeCard.innerHTML = original;
  questionNum++;
  pie++;
  scoreCard.innerHTML = `Question Num: ${questionNum}   Pie Pieces: ${pie}`
  checkWin()
};


// check for win/lose
function checkWin () {
  if (pie === 6) {
    let popup = document.getElementById("myPopup");
    popup.innerHTML= "WIIIINNNNNEERRR!!!! congrats"
    scoreCard.innerHTML = '';
    pie = 0;
    questionNum = 0;
    return true;
  }
  else if (questionNum === 10) {
    let popup = document.getElementById("myPopup");
    popup.innerHTML= "You are a Loser";
    scoreCard.innerHTML = '';
    pie = 0;
    questionNum = 0;
  }
};

