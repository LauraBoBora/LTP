// window.onload = sendApiRequest

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



// selectCategory();

async function sendApiRequest() {
    let question = await fetch(`https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple`);
    console.log(question);
    let data = await question.json();
    console.log(data);
    useApiData(data);
};

function useApiData(data) {
    const wholeCard = document.querySelector("section.card");
    wholeCard.innerHTML = `${data.results[0].question}`;
    console.log(wholeCard)
}

const chooseCat = document.getElementsByClassName("category");
console.log(chooseCat);

/* on click, send API request */
// Array.from(chooseCat).forEach((category) => {
//   category.addEventListener('click', evt => {
//     sendApiRequest();
//   })
// });

const card = document.getElementById("card");

Array.from(chooseCat).forEach((category) => {
  category.addEventListener('click', evt => {
    flipCard;
    sendApiRequest();
  })});

function flipCard() {
  card.classList.toggle("flipCard")
};