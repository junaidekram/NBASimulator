const homePage = document.getElementById("homePageContent");
const startPage = document.getElementById("startPage");
const simTypePage = document.getElementById("simChoicePage");
const simScorePage = document.getElementById("simulateScorePage");
const standingsPage = document.getElementById("standingsPage");

function startGame() {
   homePage.hidden = true;
   startPage.style.visibility = "visible";
}

var westernConference = [];
var easternConference = [];
westernConference = [
    "Golden State Warriors", ["0", "0", ".000", "0"],
    "Oklahoma City Thunder", ["0", "0", ".000", "0"],
    "Houston Rockets", ["0", "0", ".000", "0"],
    "Los Angeles Lakers", ["0", "0", ".000", "0"],
    "Denver Nuggets", ["0", "0", ".000", "0"],
    "LA Clippers", ["0", "0", ".000", "0"],
    "Minnesota Timberwolves", ["0", "0", ".000", "0"],
    "Memphis Grizzles", ["0", "0", ".000", "0"],
    "Sacremento Kings", ["0", "0", ".000", "0"],
    "Dallas Mavericks", ["0", "0", ".000", "0"],
    "Phoenix Suns", ["0", "0", ".000", "0"], 
    "Portland Traiblazers", ["0", "0", ".000", "0"],
    "San Antonio Spurs", ["0", "0", ".000", "0"],
    "New Orleans Pelicans", ["0", "0", ".000", "0"],
    "Utah Jazz", ["0", "0", ".000", "0"], 
]

easternConference = [
    "Cleveland Caviliers", ["0", "0", ".000", "0"],
    "Boston Celtics", ["0", "0", ".000", "0"],
    "New York Knicks", ["0", "0", ".000", "0"],
    "India Pacers", ["0", "0", ".000", "0"],
    "Milwaukee Bucks", ["0", "0", ".000", "0"],
    "Detroit Pistons", ["0", "0", ".000", "0"],
    "Orlando Magic", ["0", "0", ".000", "0"], 
    "Atlanta Hawks", ["0", "0", ".000", "0"], 
    "Chicago Bulls", ["0", "0", ".000", "0"],
    "Miami Heat", ["0", "0", ".000", "0"],
    "Toronto Raptors", ["0", "0", ".000", "0"],
    "Brooklyn Nets", ["0", "0", ".000", "0"],
    "Philadelphia 76ers", ["0", "0", ".000", "0"],
    "Charlotte Hornets", ["0", "0", ".000", "0"],
    "Washington Wizards", ["0", "0", ".000", "0"],
]

//teamArray[x][1]=wins, 2=losses, 3=pct, +-how good the team is 

function simChoicePage () {
    startPage.hidden = true;
    simTypePage.style.visibility = "visible";
}

function simulateGame() {

}

function simulateScore() {
    simTypePage.hidden = true;
    simScorePage.style.visibility = "visible";
}

function standings() {
    
}
 



 