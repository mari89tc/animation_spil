let point;
let liv;
let random;

let scoreBoard;
let lifeBoard;

let mus_container;
let nisse_container;

window.addEventListener("load", sidenVises);
function sidenVises() {
  console.log("sidenVises");
  scoreBoard = document.querySelector("#muspoint_sprite");
  lifeBoard = document.querySelector("#hjerteliv_sprite");
  mus_container = document.querySelector("#mus_container");
  musvenstre_container = document.querySelector("#musvenstre_container");
  nisse_container = document.querySelector("#nissepigevenstre_container");
  nissehøjre_container = document.querySelector("#nissedrenghøjre_container");

  //skjul andre skærme
  document.querySelector("#level_complete").classList = "hide";
  document.querySelector("#game_over").classList = "hide";

  //vis startskærm
  document.querySelector("#start").classList = "";
  console.log("start");
  fontResize();
  //klik på start knap
  document.querySelector("#start_knap_container").addEventListener("click", startSpil);
}

window.addEventListener("resize", windowResize);
function windowResize() {
  console.log("windowResize");
  fontResize();
}
function fontResize() {
  let widthScreen = document.querySelector("#screen").clientWidth;
  let myFontInProcent = 2.5;
  let myFont = (widthScreen / 100) * myFontInProcent;
  scoreBoard.style.fontSize = myFont + "px"; // fontsize
  lifeBoard.style.fontSize = myFont + "px";
  document.querySelector("#level_complete_points").style.fontSize = myFont + "px";
  document.querySelector("#game_over_points").style.fontSize = myFont + "px";
}

function startSpil() {
  console.log("startSpillet");
  //skjul andre skærme
  document.querySelector("#level_complete").classList = "hide";
  document.querySelector("#game_over").classList = "hide";
  document.querySelector("#start").classList = "hide";

  mus_container.addEventListener("animationiteration", genstartMus);
  musvenstre_container.addEventListener("animationiteration", genstartMus);

  nissehøjre_container.addEventListener("animationiteration", genstartNisse);
  nisse_container.addEventListener("animationiteration", genstartNisse);

  //Nulstil point
  point = 0;
  document.querySelector("#muspoint_sprite").innerHTML = point;
  //nulstil
  liv = 3;
  document.querySelector("#hjerteliv_sprite").innerHTML = liv;

  //start timer
  document.querySelector("#lys_sprite").classList.add("timer");
  document.querySelector("#ild_container").classList.add("ild");
  document.querySelector("#lys_sprite").addEventListener("animationend", stopSpillet);
  document.querySelector("#ild_container").addEventListener("animationend", stopSpillet);

  //Random position + delay til container
  mus_container.classList.add("pos" + randTal(4));
  mus_container.classList.add("delay" + randTal(4));
  musvenstre_container.classList.add("pos" + randTal(4));
  musvenstre_container.classList.add("delay" + randTal(4));
  nisse_container.classList.add("pos" + randTal(4));
  nisse_container.classList.add("delay" + randTal(4));
  nissehøjre_container.classList.add("pos" + randTal(4));
  nissehøjre_container.classList.add("delay" + randTal(4));

  //Start fald animation og lyt efter klik
  mus_container.classList.add("fald");
  musvenstre_container.classList.add("fald");
  console.log(mus_container);
  mus_container.addEventListener("mousedown", clickMus);
  musvenstre_container.addEventListener("mousedown", clickMus);
  nisse_container.classList.add("fald");
  nissehøjre_container.classList.add("fald");
  console.log(nisse_container);
  nisse_container.addEventListener("mousedown", clickNisse);
  nissehøjre_container.addEventListener("mousedown", clickNisse);
}

function clickMus() {
  console.log("clickMus");
  console.log("this", this);
  console.log("this.firstElementChild", this.firstElementChild);

  //start animation
  this.classList.add("frys");
  this.firstElementChild.classList.add("drej");
  point++;
  document.querySelector("#muspoint_sprite").innerHTML = point;

  //afspil lyd good
  document.querySelector("#goodSound").volume = 0.9;
  document.querySelector("#goodSound").currentTime = 0;
  document.querySelector("#goodSound").play();
  // document.querySelector("#goodSound").addEventListener("ended", efterRotation);

  this.addEventListener("animationend", efterRotation);
}

function efterRotation() {
  console.log("efterRotation");
  this.firstElementChild.classList.remove("drej");
  console.log("efter drej");
  this.firstElementChild.classList.add("forsvind");
  console.log("efter forsvind");
  this.firstElementChild.addEventListener("animationend", genstartMus);
}

function genstartMus() {
  console.log("genstartMus");
  this.classList = "";
  this.firstElementChild.classList = "";
  this.offsetLeft;
  this.classList.add("pos" + randTal(4));
  this.classList.add("fald");
  this.addEventListener("mousedown", clickMus);
}

function clickNisse() {
  console.log("clickNisse");
  console.log("this", this);
  console.log("this.firstElementChild", this.firstElementChild);

  this.classList.add("frys");
  this.firstElementChild.classList.add("shake");
  liv--;
  document.querySelector("#hjerteliv_sprite").textContent = liv;

  //afspil lyd bad
  document.querySelector("#badSound").volume = 0.9;
  document.querySelector("#badSound").currentTime = 0;
  document.querySelector("#badSound").play();
  // document.querySelector("#badSound").addEventListener("ended", efterRyst);

  this.firstElementChild.addEventListener("animationend", efterRyst);
  if (liv <= 0) {
    stopSpillet();
  }
}

function efterRyst() {
  console.log("efterRyst");
  this.firstElementChild.classList.remove("shake");
  this.firstElementChild.classList.add("forsvind");
  this.firstElementChild.addEventListener("animationend", genstartNisse);
}

function genstartNisse() {
  console.log("genstartNisse");
  this.classList = "";
  this.firstElementChild.classList = "";
  this.offsetLeft;
  this.classList.add("pos" + randTal(4));
  this.classList.add("fald");
  this.addEventListener("mousedown", clickNisse);
}

function stopSpillet() {
  console.log("stopSpillet");
  document.querySelector("#lys_sprite").classList.remove("timer");
  document.querySelector("#ild_container").classList.remove("ild");
  document.querySelector("#lys_sprite").removeEventListener("animationend", stopSpillet);

  mus_container.classList = "";
  document.querySelector("#mus_sprite").classList = "";
  musvenstre_container.classList = "";
  document.querySelector("#musvenstre_sprite").classList = "";
  nisse_container.classList = "";
  document.querySelector("#nissepigevenstre_sprite").classList = "";
  nissehøjre_container.classList = "";
  document.querySelector("#nissedrenghøjre_sprite").classList = "";

  mus_container.removeEventListener("animationiteration", genstartMus);
  mus_container.removeEventListener("animationend", genstartMus);
  document.querySelector("#mus_container").removeEventListener("mousedown", genstartMus);

  musvenstre_container.removeEventListener("animationiteration", genstartMus);
  musvenstre_container.removeEventListener("animationend", genstartMus);
  document.querySelector("#musvenstre_container").removeEventListener("mousedown", genstartMus);

  nisse_container.removeEventListener("animationiteration", genstartNisse);
  nisse_container.removeEventListener("animationend", genstartNisse);
  nisse_container.removeEventListener("mousedown", genstartNisse);

  nissehøjre_container.removeEventListener("animationiteration", genstartNisse);
  nissehøjre_container.removeEventListener("animationend", genstartNisse);
  nissehøjre_container.removeEventListener("mousedown", genstartNisse);
  /*
  document.querySelector("#lys_sprite").classList.add("timer");
  document.querySelector("#ild_container").classList.add("ild");
  document.querySelector("#lys_sprite").addEventListener("animationend", stopSpillet);
*/
  if (liv <= 0) {
    gameOver();
  } else if (point >= 10) {
    levelComplete();
  } else {
    gameOver();
  }
}
function gameOver() {
  console.log("funktionen gameOver");
  //Vis gameover skærm
  document.querySelector("#game_over").classList = "";
  //Gameover med tekst og point
  document.querySelector("#game_over_points").textContent = "Du fik " + point + " point. Man skal have 10 for at vinde";
  //Klik på prøvigen1
  document.querySelector("#prøvigen1_container").addEventListener("click", startSpil);
}

function levelComplete() {
  console.log("funktionen levelComplete");
  //vis levelComplete skærm
  document.querySelector("#level_complete").classList = "";
  //level complete med tekst og point
  document.querySelector("#level_complete_points").textContent = "Du har vundet med " + point + " gode point";
  //Klik på prøvigen2
  document.querySelector("#prøvigen2_container").addEventListener("click", startSpil);
}

function randTal(n) {
  return Math.floor(Math.random() * n) + 1;
}
