// Firebase config – REPLACE with your actual config from Firebase Console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MSG_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
firebase.analytics();

// UI elements
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

function simChoicePage() {
  startPage.hidden = true;
  simTypePage.hidden = false;
}

function simulateGame() {}

function simulateScore() {
  simTypePage.hidden = true;
  simScorePage.hidden = false;
}

function standings() {}

function simulate() {}

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

  const email = username + "@example.com"; // create pseudo-email from username

  // Try to sign in
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      currentUser = username;
      loadUserData();
      messageDiv.innerText = "Login successful!";
      document.getElementById('loginDiv').style.display = 'none';
      startGame();
      document.getElementById('saveButton').style.display = 'block';
    })
    .catch((error) => {
      if (error.code === "auth/user-not-found") {
        // If user not found, register new user
        auth.createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            currentUser = username;
            allTeams = JSON.parse(JSON.stringify(defaultAllTeams));
            db.collection("users").doc(username).set({
              teamData: allTeams
            });
            messageDiv.innerText = "New user registered!";
            document.getElementById('loginDiv').style.display = 'none';
            startGame();
            document.getElementById('saveButton').style.display = 'block';
          })
          .catch((err) => {
            messageDiv.innerText = "Error: " + err.message;
          });
      } else {
        messageDiv.innerText = "Login failed: " + error.message;
      }
    });
}

function loadUserData() {
  db.collection("users").doc(currentUser).get()
    .then((doc) => {
      if (doc.exists) {
        allTeams = doc.data().teamData;
      } else {
        allTeams = JSON.parse(JSON.stringify(defaultAllTeams));
      }
    })
    .catch((error) => {
      console.error("Error loading data: ", error);
    });
}

function saveUserData() {
  if (!currentUser) return;

  db.collection("users").doc(currentUser).set({
    teamData: allTeams
  })
  .then(() => {
    alert("Progress saved!");
  })
  .catch((error) => {
    alert("Error saving: " + error.message);
  });
}