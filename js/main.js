// Declare The Variaables Of Items

let level = document.querySelector("select");
let lvlSeconds = document.querySelector(".msg .seconds");
let startBtn = document.querySelector(".start");
let theWord = document.querySelector(".the-word");
let input = document.querySelector("input");
let upcomingWords = document.querySelector(".upcoming-words");
let controlTime = document.querySelector(".control span.time-left");
let pointsGotten = document.querySelector(".control .got");
let Total = document.querySelector(".control .total");
let finish = document.querySelector(".finish");
let resetBtn = document.querySelector(".reset");
let levelDifficulty = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};
// Default Level
let defaultLvl = level.value;
lvlSeconds.innerHTML = `[ ${levelDifficulty[defaultLvl]} ] `;
// If The User Change The Game Difficulty
level.onchange = function () {
    defaultLvl = level.value;
    lvlSeconds.innerHTML = `[ ${levelDifficulty[defaultLvl]} ] `;
}
const techWords = [
  "algorithm",
  "API",
  "array",
  "backend",
  "bandwidth",
  "binary",
  "bit",
  "blockchain",
  "boolean",
  "browser",
  "cache",
  "cloud",
  "compiler",
  "cookie",
  "CPU",
  "cybersecurity",
  "database",
  "debug",
  "DNS",
  "encryption",
  "Ethernet",
  "firewall",
  "framework",
  "frontend",
  "function",
  "Git",
  "GPU",
  "hash",
  "HTML",
  "HTTP",
  "interface",
  "IoT",
  "IP",
  "JavaScript",
  "JSON",
  "kernel",
  "latency",
  "library",
  "Linux",
  "loop",
  "malware",
  "network",
  "node",
  "object",
  "open-source",
  "packet",
  "Python",
  "query",
  "RAM",
  "runtime",
];

Total.innerHTML = `${techWords.length}`;
input.onpaste = function () {
  return false;
};
startBtn.onclick = function () {
  this.style.display = "none";
  finish.innerHTML = "";
  input.value = "";
  input.focus();
  // Generate Words Function
  generateWords();
};

function generateWords() {
  // Chose Random Index
  let Index = Math.floor(Math.random() * techWords.length);
  // Random Words
  let Word = techWords[Index];
  // Remove The Words From The Array
  techWords.splice(Index, 1);
  // The Word Content
  theWord.innerHTML = Word;
  // Empty Upcoming Words
  upcomingWords.innerHTML = "";
  // Then Fill It The Rest Words
  for (let i = 0; i < techWords.length; i++) {
    const element = document.createElement("div");
    let txt = document.createTextNode(techWords[i]);
    element.append(txt);
    upcomingWords.append(element);
  }

  startPlay();
}

function startPlay() {
    level.setAttribute("disabled" , "");
  controlTime.innerHTML = levelDifficulty[defaultLvl];
  start = setInterval(() => {
    controlTime.innerHTML--;
    if (controlTime.innerHTML === "0") {
      clearInterval(start);
      if (theWord.innerHTML === input.value) {
        pointsGotten.innerHTML++;
        if (pointsGotten.innerHTML === "50") {
          let element = document.createElement("span");
          element.innerHTML = "Wonderfull ! You Won";
          finish.classList.add("good");
          finish.replaceChildren(element);
        } else if (techWords.length > 0) generateWords();
      } else {
        let element = document.createElement("span");
        element.innerHTML = "Game Over!";
        finish.classList.add("bad");
        finish.replaceChildren(element);
        startBtn.style.display = "block";
        level.removeAttribute("disabled");
      }
      input.value = "";
    }
  }, 1000);
}

