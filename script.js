const homePage = document.getElementById("homePageContent");
const startPage = document.getElementById("startPage");
const simTypePage = document.getElementById("simChoicePage");
const simScorePage = document.getElementById("simulateScorePage");
const standingsPage = document.getElementById("standingsPage");
const loginPage = document.getElementById("loginDiv");

homePage.hidden = false;
startPage.hidden = true;
simTypePage.hidden = true;
simScorePage.hidden = true;
standingsPage.hidden = true;
loginPage.hidden = true; 

function startGame() {
   startPage.hidden = false;
}

var westernConference = [];
var easternConference = []; 
var allTeams = [];
var defaultAllTeams = []; 
let currentUser = null;

defaultAllTeams = [
    "Atlanta Hawks", ["0", "0", ".000", "0", "0", "0"],
    "Boston Celtics", ["0", "0", ".000", "0", "0", "0"],
    "Brooklyn Nets", ["0", "0", ".000", "0", "0", "0"],
    "Charlotte Hornets", ["0", "0", ".000", "0", "0", "0"],
    "Chicago Bulls", ["0", "0", ".000", "0", "0", "0"],
    "Cleveland Caviliers", ["0", "0", ".000", "0", "0", "0"],
    "Dallas Mavericks", ["0", "0", ".000", "0", "0", "0"],
    "Denver Nuggets", ["0", "0", ".000", "0", "0", "0"],
    "Detroit Pistons", ["0", "0", ".000", "0", "0", "0"],
    "Golden State Warriors", ["0", "0", ".000", "0", "0", "0"],
    "Houston Rockets", ["0", "0", ".000", "0", "0", "0"],
    "Indiana Pacers", ["0", "0", ".000", "0", "0", "0"],
    "Los Angeles Clippers", ["0", "0", ".000", "0", "0", "0"],
    "Los Angeles Lakers", ["0", "0", ".000", "0", "0", "0"],
    "Memphis Grizzlies", ["0", "0", ".000", "0", "0", "0"],
    "Miami Heat", ["0", "0", ".000", "0", "0", "0"],
    "Milwaukee Bucks", ["0", "0", ".000", "0", "0", "0"],
    "Minnesota Timberwolves", ["0", "0", ".000", "0", "0", "0"],
    "New Orleans Pelicans", ["0", "0", ".000", "0", "0", "0"],
    "New York Knicks", ["0", "0", ".000", "0", "0", "0"],
    "Oklahoma City Thunder", ["0", "0", ".000", "0", "0", "0"],
    "Orlando Magic", ["0", "0", ".000", "0", "0", "0"],
    "Philadelphia 76ers", ["0", "0", ".000", "0", "0", "0"],
    "Phoenix Suns", ["0", "0", ".000", "0", "0", "0"],
    "Portland Trailblazers", ["0", "0", ".000", "0", "0", "0"],
    "Sacramento Kings", ["0", "0", ".000", "0", "0", "0"],
    "San Antonio Spurs", ["0", "0", ".000", "0", "0", "0"],
    "Toronto Raptors", ["0", "0", ".000", "0", "0", "0"],
    "Utah Jazz", ["0", "0", ".000", "0", "0", "0"],
    "Washington Wizards", ["0", "0", ".000", "0", "0", "0"],
];

//teamArray[x][1]=wins, 2=losses, 3=pct, 4=o rating, 5=d rating, 6=overall rating 

function simChoicePage () {
    startPage.hidden = true;
    simTypePage.hidden = false;
}

function simulateGame() {

}

function simulateScore() {
    simTypePage.hidden = true;
    simScorePage.hidden = false;
}

function standings() {
    
}

function simulate() {
    
}

function startLogin() {
    homePage.hidden = true;
    loginPage.hidden = false;
}

function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const messageDiv = document.getElementById('message');

    if (!username || !password) {
        messageDiv.innerText = "Please enter both username and password.";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    let existingUser = users.find(user => user.username === username);
    let passwordUsed = users.find(user => user.password === password && user.username !== username);

    if (existingUser) {
        if (existingUser.password !== password) {
          messageDiv.innerText = "Incorrect password.";
          return;
        } else {
          messageDiv.innerText = "Login successful!";
          allTeams = existingUser.teamData;
          currentUser = existingUser.username;
          document.getElementById('loginDiv').style.display = 'none';
          startGame();
          document.getElementById('saveButton').style.display = 'block';
          // You can use existingUser.teamData in your game logic 
        }
    } else {
        if (passwordUsed) {
          messageDiv.innerText = "This password is already used by another account.";
          return;
        }
        // Register new user
        const newUser = {
          username: username,
          password: password,
          teamData: JSON.parse(JSON.stringify(defaultAllTeams)) // Deep copy
        };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        allTeams = newUser.teamData;
        currentUser = newUser.username;
        messageDiv.innerText = "New user registered!";
        document.getElementById('loginDiv').style.display = 'none';
        startGame();
        document.getElementById('saveButton').style.display = 'block';
    // Use newUser.teamData in your game logic
    }
}

function saveUserData() {
  if (!currentUser) return;

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  let userIndex = users.findIndex(u => u.username === currentUsername);

  if (userIndex !== -1) {
    users[userIndex].teamData = allTeams;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Progress saved!");
  } else {
    alert("User not found.");
  }
}
 



 