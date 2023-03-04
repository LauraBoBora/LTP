

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


/* functions for choosing difficulty */
const easy = document.getElementById("easy");
const medium = document.getElementById("medium");
const hard = document.getAnimations("hard");


// Send API Request, log data in console, Call Use API Data - https://www.youtube.com/watch?v=SgJ_femmsfg
async function sendApiRequest() {
    let question = await fetch(`https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple`);
    // console.log(question);
    let data = await question.json();
    console.log(data);
    useApiData(data);
};

// Use API Data - combines correct & incorrect answers, shuffles them, then displays question and answer buttons/texts
let wholeCard = document.querySelector("section.card");
let original = wholeCard.innerHTML;
let pie = 0;
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
  for(let i = 0; i< answrArr.length; i++){
    let newBtn = document.createElement('button');
    btnChoice = buttonLetters[i]
    newBtn.innerText = btnChoice;
    newBtn.setAttribute('id', answrArr[i]);
    newBtn.setAttribute('class', 'category answer')
    // console.log(newBtn);
    let newText = document.createElement('text');
    newText.innerHTML=answrArr[i];
    newText.setAttribute('class', 'answer');
    newText.setAttribute('id', btnChoice);
    let newDiv = document.createElement('div');
    wholeCard.append(newDiv);
    newDiv.append(newBtn, newText);}
  
 
  // Select Correct Answer
  let chooseAnswer = document.getElementsByClassName("answer");
  // console.log(chooseAnswer);
  Array.from(chooseAnswer).forEach((answer) => {
    answer.addEventListener('click', evt => {
      // console.log(evt);
      let answerChoice = answer.innerText;
      let answerBtn = answer.id;
      // console.log(answerChoice);
      if (answerChoice == correctAns || answerBtn == correctAns) {
        alert("Correct! UR DA BEST!");
        wholeCard.innerHTML = original;
        pie++;
        console.log(pie);
        // return;
        // correct function - pie
      }
      else {console.log('incorrect');
      alert("INCORRECT");
      wholeCard.innerHTML = original;
      console.log(pie);
      // return;
    };
    // function next q
    
  })});
};



let chooseCat = document.querySelectorAll(".category");
// Click Event
// const questions = function() {
  console.log(chooseCat)
  chooseCat.forEach((category) => {
    category.addEventListener('click', evt => {
      // console.log(evt);
      let catId = category.getAttribute('id');
      console.log(catId);
      sendApiRequest();
    })});
  // };
// questions();
  // window.onclick = function() {
  //   let chooseCat = document.getElementsByClassName("category");
  //   // console.log(chooseCat)
  //   Array.from(chooseCat).forEach((category) => {
  //     category.addEventListener('click', evt => {
  //       // console.log(evt);
  //       let catId = category.getAttribute('id');
  //       // console.log(catId);
  //       sendApiRequest();
  //     })});
  //   };