//const
const container = document.getElementById("alphabetButtons");
var answerDisplay = document.getElementById("hold");
var answer = "";
var hint = "";
var life = 10;
var wordDisplay = [];
var winningCheck = "";
const containerHint = document.getElementById("clue");
const buttonHint = document.getElementById("hint");
const buttonReset = document.getElementById("reset");
const livesDisplay = document.getElementById("mylives");
var myStickman = document.getElementById("stickman");
var context = myStickman.getContext("2d");

//generate alphabet button
function generateButton() {
  var buttonsHTML = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) =>
        `<button
         class = "alphabetButtonJS" 
         id="${letter}"
         >
        ${letter}
        </button>`
    )
    .join("");

  return buttonsHTML;
}

function handleClick(event) {
  const isButton = event.target.nodeName === "BUTTON";
  if (isButton) {
    //console.dir(event.target.id);
    //console.log(isButton);
    const buttonId = document.getElementById(event.target.id);
    buttonId.classList.add("selected");
  }
  return;
}

//word array
const question = [
  "La catégorie est : Équipes de football de Premier League",
  "La catégorie est : Films",
  "La catégorie est : Villes",
  "La catégorie est : Jeu Video"
];

const categories = [
  [
    "everton",
    "liverpool",
    "swansea",
    "chelsea",
    "hull",
    "manchester-city",
    "newcastle-united"
  ],
  ["alien", "inspecteur-harry", "gladiateur", "trouver-nemo", "les-dents-de-la-mer"],
  ["manchester", "milan", "madrid", "amsterdam", "prague"],
  ["minecraft","mario-kart","fortnite","grand-theft-auto-v","super-mario-bros"]
];

const hints = [
  [
    "Basé à Mersyside",
    "Basé à Mersyside",
    "Première équipe galloise à atteindre la Premier League",
    "Appartenant à un milliardaire russe",
    "Autrefois dirigé par Phil Brown",
    "Finaliste de la FA Cup 2013",
    "Le premier club de Gazza"
  ],
  [
    "Film d'horreur de science-fiction",
    "Film d'action américain de 1971",
    "Drame historique",
    "Poisson animé",
    "Grand requin blanc géant"
  ],
  [
    "Ville du nord du Royaume-Uni",
    "Siège de l'AC et de l'Inter",
    "Capitale espagnole",
    "Capitale des Pays-Bas",
    "Capitale de la République tchèque"
  ],
  [
    "Le jeu le plus vendu",
    "Série de jeu de course fait par Nintendo",
    "Le Battle royale le plus jouer en 2017",
    "Le jeu qui est sur le plus de console sans avoir de remasteur ",
    "Le plus grand classique des jeux vidéo"
]
];

//set question,answer and hint

function setAnswer() {
  const categoryOrder = Math.floor(Math.random() * categories.length);
  const chosenCategory = categories[categoryOrder];
  const wordOrder = Math.floor(Math.random() * chosenCategory.length);
  const chosenWord = chosenCategory[wordOrder];

  const categoryNameJS = document.getElementById("categoryName");
  categoryNameJS.innerHTML = question[categoryOrder];

  //console.log(chosenCategory);
  //console.log(chosenWord);
  answer = chosenWord;
  hint = hints[categoryOrder][wordOrder];
  answerDisplay.innerHTML = generateAnswerDisplay(chosenWord);
}

function generateAnswerDisplay(word) {
  var wordArray = word.split("");
  //console.log(wordArray);
  for (var i = 0; i < answer.length; i++) {
    if (wordArray[i] !== "-") {
      wordDisplay.push("_");
    } else {
      wordDisplay.push("-");
    }
  }
  return wordDisplay.join(" ");
}

function showHint() {
  containerHint.innerHTML = `Indice - ${hint}`;
}

buttonHint.addEventListener("click", showHint);
//setting initial condition
function init() {
  answer = "";
  hint = "";
  life = 10;
  wordDisplay = [];
  winningCheck = "";
  context.clearRect(0, 0, 400, 400);
  canvas();
  containerHint.innerHTML = `Indice -`;
  livesDisplay.innerHTML = `Tu as ${life} vies!`;
  setAnswer();
  container.innerHTML = generateButton();
  container.addEventListener("click", handleClick);
  console.log(answer);
  //console.log(hint);
}

window.onload = init();

//reset (play again)
buttonReset.addEventListener("click", init);

//guess click
function guess(event) {
  const guessWord = event.target.id;
  const answerArray = answer.split("");
  var counter = 0;
  if (answer === winningCheck) {
    livesDisplay.innerHTML = `Tu as gagné!`;
    return;
  } else {
    if (life > 0) {
      for (var j = 0; j < answer.length; j++) {
        if (guessWord === answerArray[j]) {
          wordDisplay[j] = guessWord;
          console.log(guessWord);
          answerDisplay.innerHTML = wordDisplay.join(" ");
          winningCheck = wordDisplay.join("");
          //console.log(winningCheck)
          counter += 1;
        }
      }
      if (counter === 0) {
        life -= 1;
        counter = 0;
        animate();
      } else {
        counter = 0;
      }
      if (life > 1) {
        livesDisplay.innerHTML = `Tu as ${life} vies!`;
      } else if (life === 1) {
        livesDisplay.innerHTML = `Tu as ${life} vie!`;
      } else {
        livesDisplay.innerHTML = `JEU TERMINÉ!`;
      }
    } else {
      return;
    }
    console.log(wordDisplay);
    //console.log(counter);
    //console.log(life);
    if (answer === winningCheck) {
      livesDisplay.innerHTML = `TU AS GAGNÉ!`;
      return;
    }
  }
}

container.addEventListener("click", guess);

// Hangman
function animate() {
  drawArray[life]();
  //console.log(drawArray[life]);
}

function canvas() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#fff";
  context.lineWidth = 2;
}

function head() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.arc(60, 25, 10, 0, Math.PI * 2, true);
  context.stroke();
}

function draw($pathFromx, $pathFromy, $pathTox, $pathToy) {
  context.moveTo($pathFromx, $pathFromy);
  context.lineTo($pathTox, $pathToy);
  context.stroke();
}

function frame1() {
  draw(0, 150, 150, 150);
}

function frame2() {
  draw(10, 0, 10, 600);
}

function frame3() {
  draw(0, 5, 70, 5);
}

function frame4() {
  draw(60, 5, 60, 15);
}

function torso() {
  draw(60, 36, 60, 70);
}

function rightArm() {
  draw(60, 46, 100, 50);
}

function leftArm() {
  draw(60, 46, 20, 50);
}

function rightLeg() {
  draw(60, 70, 100, 100);
}

function leftLeg() {
  draw(60, 70, 20, 100);
}

var drawArray = [
  rightLeg,
  leftLeg,
  rightArm,
  leftArm,
  torso,
  head,
  frame4,
  frame3,
  frame2,
  frame1
];

// nouveau code içi //

const dialog = document.getElementById("dialog");
const fermerDialog = document.getElementById("fermerDialog");
const nePlusAfficher = document.getElementById("nePlusAfficher");

if(localStorage.getItem('afficher') === null){
  localStorage.setItem('afficher','oui');
}


if(localStorage.getItem('afficher') === 'oui'){
  window.onload = function afficherDialog() {
    dialog.showModal();
  };
}




fermerDialog.addEventListener("click", () => {
  dialog.close();
});

nePlusAfficher.addEventListener("click", () => {
  localStorage.removeItem('afficher');
  localStorage.setItem('afficher','non');
  dialog.close();
});
