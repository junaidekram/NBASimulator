const homePage = document.getElementById("homePageContent");
const startPage = document.getElementById("startPage");
const simTypePage = document.getElementById("simChoicePage");
const simScorePage = document.getElementById("simulateScorePage");
const standingsPage = document.getElementById("standingsPage");
const loginPage = document.getElementById("loginDiv");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const simButton = document.getElementById("simButton");
const resultsPage = document.getElementById("finalScore");
const awayScore = document.getElementById("awayScore");
const homeScore = document.getElementById("homeScore");
const winnerArrow = document.getElementById("result");

homePage.hidden = false;
startPage.hidden = true;
simTypePage.hidden = true;
simScorePage.hidden = true;
standingsPage.hidden = true;
loginPage.hidden = true;  
canvas.hidden = true;
simButton.hidden = true;
resultsPage.hidden = true;

function startGame() {
   startPage.hidden = false;
}

var westernConference = [];
var easternConference = []; 
var allTeams = [];
var defaultAllTeams = []; 
let currentUser = null;
const getHomeTeam = document.getElementById("homeTeam");
const getAwayTeam = document.getElementById("awayTeam");
const awayTeam = getAwayTeam.value;

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
    resultsPage.hidden = true;
    simTypePage.hidden = false;
    canvas.hidden = true;
    simButton.hidden = true;
    standingsPage.hidden = true;
}


const teamColor = [
  '#E03A3E', // Atlanta Hawks
  '#007A33', // Boston Celtics
  '#000000', // Brooklyn Nets
  '#00788C', // Charlotte Hornets
  '#CE1141', // Chicago Bulls
  '#6F263D', // Cleveland Cavaliers
  '#00538C', // Dallas Mavericks
  '#0E2240', // Denver Nuggets
  '#006BB6', // Detroit Pistons
  '#1D428A', // Golden State Warriors
  '#CE1141', // Houston Rockets
  '#002D62', // Indiana Pacers
  '#C8102E', // Los Angeles Clippers
  '#552583', // Los Angeles Lakers
  '#12173F', // Memphis Grizzlies
  '#98002E', // Miami Heat
  '#00471B', // Milwaukee Bucks
  '#236192', // Minnesota Timberwolves
  '#0C2340', // New Orleans Pelicans
  '#006BB6', // New York Knicks
  '#007AC1', // Oklahoma City Thunder
  '#0077C0', // Orlando Magic
  '#EF3B24', // Philadelphia 76ers
  '#1D1160', // Phoenix Suns
  '#E03A3E', // Portland Trail Blazers
  '#5A2D81', // Sacramento Kings
  '#000000', // San Antonio Spurs
  '#CE1141', // Toronto Raptors
  '#002B5C', // Utah Jazz
  '#E31837'  // Washington Wizards
];

const teamImage = [
  "https://a.espncdn.com/i/teamlogos/nba/500/atl.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Boston_Celtics.svg/640px-Boston_Celtics.svg.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Brooklyn_Nets_primary_icon_logo_2024.svg/1200px-Brooklyn_Nets_primary_icon_logo_2024.svg.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Charlotte_Hornets_%282014%29.svg/1200px-Charlotte_Hornets_%282014%29.svg.png",
  "https://a.espncdn.com/i/teamlogos/nba/500/chi.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Cleveland_Cavaliers_logo.svg/1200px-Cleveland_Cavaliers_logo.svg.png",
  "https://s.yimg.com/cv/apiv2/default/nba/20181214/500x500/mavericks_wbg.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/7/76/Denver_Nuggets.svg/1200px-Denver_Nuggets.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Logo_of_the_Detroit_Pistons.svg/1200px-Logo_of_the_Detroit_Pistons.svg.png",
  "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/Gsw.png",
  "https://s.yimg.com/cv/apiv2/default/nba/20191021/500x500/rockets_wbgs.png",
  "https://s.yimg.com/cv/apiv2/default/nba/20181214/500x500/pacers_wbg.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Los_Angeles_Clippers_%282024%29.svg/800px-Los_Angeles_Clippers_%282024%29.svg.png",
  "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/lal.png",
  "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/mem.png",
  "https://s.yimg.com/it/api/res/1.2/viPExHzWDztzwTOzNneYVw--~A/YXBwaWQ9eW5ld3M7dz0xMjAwO2g9NjMwO3E9MTAw/https://s.yimg.com/cv/apiv2/default/nba/20181219/500x500/heat_wbgs.png",
  "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/mil.png",
  "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/min.png",
  "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/no.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/2/25/New_York_Knicks_logo.svg/1200px-New_York_Knicks_logo.svg.png",
  "https://s.yimg.com/it/api/res/1.2/UAryyamYpD9BjgxYKNFdww--~A/YXBwaWQ9eW5ld3M7dz0xMjAwO2g9NjMwO3E9MTAw/https://s.yimg.com/cv/apiv2/default/nba/20181218/500x500/thunder_wbgs.png",
  "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/orl.png",
  "https://s.yimg.com/cv/apiv2/default/nba/20181217/500x500/76ers_wbg.png",
  "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/phx.png",
  "https://s.yimg.com/cv/apiv2/default/nba/20181221/500x500/trailblazers_wbgs.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/SacramentoKings.svg/1200px-SacramentoKings.svg.png",
  "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/sa.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/3/36/Toronto_Raptors_logo.svg/250px-Toronto_Raptors_logo.svg.png",
  "https://loodibee.com/wp-content/uploads/utah-jazz-logo-symbol.png",
  "https://a.espncdn.com/guid/64d73af6-b8ec-e213-87e8-a4eab3a692e7/logos/primary_logo_on_black_color.png",
];

function simFinalScore() {
  const getHomeTeam = document.getElementById("homeTeam");
  const getAwayTeam = document.getElementById("awayTeam");
  const homeTeamIndex = (parseInt(getHomeTeam.value) - 1) * 2;
  const awayTeamIndex = (parseInt(getAwayTeam.value) - 1) * 2;

  const homeScoreSection = document.getElementById("homeScore");
  const awayScoreSection = document.getElementById("awayScore");

  let awayScore;
  let homeScore;
  let scoreDiff;

  canvas.hidden = true;
  resultsPage.hidden = false;

  // Set team names and images
  document.querySelector("#awayScore h3").textContent = allTeams[awayTeamIndex];
  document.querySelector("#homeScore h3").textContent = allTeams[homeTeamIndex];

  document.querySelector("#homeScore img").src = teamImage[homeTeamIndex / 2];
  document.querySelector("#awayScore img").src = teamImage[awayTeamIndex / 2];

  // Ratings
  const homeRating = parseFloat(allTeams[homeTeamIndex + 1][5]);
  const awayRating = parseFloat(allTeams[awayTeamIndex + 1][5]);

  // Calculate score differential
  scoreDiff = Math.abs(homeRating - awayRating) / 1.75;
  scoreDiff = Math.ceil(scoreDiff * ((Math.random() * 1.2) + 0.4));

  if ((Math.random() * 2.1) <= 1) {
    awayScore = Math.ceil((Math.random() * 30) + 87);
    homeScore = awayScore + scoreDiff;
  } else {
    homeScore = Math.ceil((Math.random() * 30) + 87);
    awayScore = homeScore + scoreDiff;
  }

  // Adjust scores based on rating bonuses and random factors
  awayScore += (awayRating / 4);
  homeScore += (homeRating / 4);

  awayScore *= parseFloat(allTeams[awayTeamIndex + 1][3]);
  awayScore *= parseFloat(allTeams[homeTeamIndex + 1][4]);

  homeScore *= parseFloat(allTeams[awayTeamIndex + 1][4]);
  homeScore *= parseFloat(allTeams[homeTeamIndex + 1][3]);

  homeScore *= ((Math.random() * 0.2) + 0.9);
  awayScore *= ((Math.random() * 0.2) + 0.9);

  homeScore = Math.ceil(homeScore);
  awayScore = Math.floor(awayScore);

  // Update scores in DOM
  awayScoreSection.querySelectorAll("h3")[1].textContent = awayScore;
  homeScoreSection.querySelectorAll("h3")[1].textContent = homeScore;

  // Update record
  const homeTeamData = allTeams[homeTeamIndex + 1];
  const awayTeamData = allTeams[awayTeamIndex + 1]; 

  if (homeScore > awayScore) {
    winnerArrow.innerText = "Final >";
    homeTeamData[0] = (parseInt(homeTeamData[0]) + 1).toString(); // win
    awayTeamData[1] = (parseInt(awayTeamData[1]) + 1).toString(); // loss
  } else {
    winnerArrow.innerText = "< Final";
    awayTeamData[0] = (parseInt(awayTeamData[0]) + 1).toString();
    homeTeamData[1] = (parseInt(homeTeamData[1]) + 1).toString();
  }

  // Update win %
  const homeWins = parseInt(homeTeamData[0]);
  const homeLosses = parseInt(homeTeamData[1]);
  const awayWins = parseInt(awayTeamData[0]);
  const awayLosses = parseInt(awayTeamData[1]);

  homeTeamData[2] = (homeWins / (homeWins + homeLosses)).toFixed(3);
  awayTeamData[2] = (awayWins / (awayWins + awayLosses)).toFixed(3);

  // Display updated record
  document.getElementById("homeTeamRecord").innerText = `Record: ${homeTeamData[0]}-${homeTeamData[1]} (${homeTeamData[2]})`;
  document.getElementById("awayTeamRecord").innerText = `Record: ${awayTeamData[0]}-${awayTeamData[1]} (${awayTeamData[2]})`;
}

function determineTeamStrength() { 
  const values = [];
  for (let i = -15; i <= 15; i++) {
    if (i !== 0) values.push(i / 2);
  }

  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]]; 
  }

  for (let i = 0; i < allTeams.length; i += 2) {
    allTeams[i + 1][5] = values[i / 2];
  }
  for (let i = 0; i < allTeams.length; i += 2) { 
    const stats = allTeams[i + 1];
    const strength = stats[5]; 

    const normalized = (strength + 7.5) / 15;

    const offense = 0.85 + Math.random() * 0.35 * (0.5 + normalized / 2);

    const defense = 1.15 - Math.random() * 0.35 * (0.5 + normalized / 2);

    stats[3] = parseFloat(offense.toFixed(3));
    stats[4] = parseFloat(defense.toFixed(5));

    console.log(allTeams);
  }

}

let screenClear = 10;

function eraseScreenAnimation() {
  ctx.clearRect(0, 0, 900, screenClear);
  screenClear *= 1.1;
  if (screenClear < 730) {
    requestAnimationFrame(eraseScreenAnimation);
  } else {
      simButton.hidden = false;
      simFinalScore();
  }
}

function flashTeamImage() {
  const getHomeTeam = document.getElementById("homeTeam");
  const getAwayTeam = document.getElementById("awayTeam");
  const homeTeam = parseInt(getHomeTeam.value) - 1;
  const awayTeam = parseInt(getAwayTeam.value) - 1;
  const homeColor = teamColor[homeTeam];
  const awayColor = teamColor[awayTeam];

  const homeImg = new Image();
  const awayImg = new Image();
  let loaded = 0;

  homeImg.onload = checkAndStart;
  awayImg.onload = checkAndStart;

  homeImg.src = teamImage[homeTeam];
  awayImg.src = teamImage[awayTeam];

  function checkAndStart() {
    loaded++;
    if (loaded === 2) {
      startGlowAnimation(0); 
    }
  }

  function startGlowAnimation(glowCount) {
    const duration = 1000; // duration per glow
    const startTime = performance.now();

    function animateGlow(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const alpha = 1 - progress; // fade out glow

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background colors
      ctx.fillStyle = awayColor;
      ctx.fillRect(0, 0, 450, 700);
      ctx.fillStyle = homeColor;
      ctx.fillRect(450, 0, 450, 700);

      // Base logos
      ctx.drawImage(awayImg, 200, 275, 150, 150);
      ctx.drawImage(homeImg, 550, 275, 150, 150);

      // Glow effect
      if (alpha > 0) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.shadowColor = "white";
        ctx.shadowBlur = 30;
        ctx.drawImage(awayImg, 200, 275, 150, 150);
        ctx.drawImage(homeImg, 550, 275, 150, 150);
        ctx.restore();

        requestAnimationFrame(animateGlow);
      } else {
        if (glowCount < 1) {
          // Start second glow
          setTimeout(() => startGlowAnimation(glowCount + 1), 200); // brief delay between glows
        } else {
          eraseScreenAnimation();
        }
      }
    }

    requestAnimationFrame(animateGlow);
  }
}

var homeValue = 0;
var awayValue = 0;
var animationValue = 5;

function drawSimAnimation() {
    const getHomeTeam = document.getElementById("homeTeam");
    const getAwayTeam = document.getElementById("awayTeam");
    const awayTeam = parseInt(getAwayTeam.value) - 1;
    const homeTeam = parseInt(getHomeTeam.value) - 1;
    const homeColor = teamColor[homeTeam];
    const awayColor = teamColor[awayTeam];

    animationValue = animationValue * 1.1;

    // Home bar grows UP
    homeValue += animationValue;
    if (homeValue > canvas.height) homeValue = canvas.height;

    // Away bar grows DOWN
    awayValue += animationValue;
    if (awayValue > canvas.height) awayValue = canvas.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = awayColor;
    ctx.fillRect(0, 0, 450, awayValue); // Grows down from top

    ctx.fillStyle = homeColor;
    ctx.fillRect(450, canvas.height - homeValue, 450, homeValue); // Grows up from bottom

    if (animationValue < 1000) {
        requestAnimationFrame(drawSimAnimation);
    } else {
      flashTeamImage();
    }
}

function simulateGame() {

}

function simulateScore() {
    simTypePage.hidden = true;
    simScorePage.hidden = false;
    document.getElementById("awayTeam").value = "invalid";
    document.getElementById("homeTeam").value = "invalid1";
}

function standings() {
  standingsPage.hidden = false;
  resultsPage.hidden = true;
  startPage.hidden = true;
  simButton.hidden = false;
  const standingsBody = document.getElementById("standingsBody");
  standingsBody.innerHTML = "";

  const standings = [];

  for (let i = 0; i < allTeams.length; i += 2) {
    const teamName = allTeams[i];
    const stats = allTeams[i + 1];

    standings.push({
      name: teamName,
      wins: stats[0],
      losses: stats[1],
      winPct: parseFloat(stats[2]),
      offense: parseFloat(stats[3]),
      defense: parseFloat(stats[4]),
      overall: parseFloat(stats[5])
    });
  }

  standings.sort((a, b) => b.winPct - a.winPct);

  for (const team of standings) {
    const row = document.createElement("tr");

    const cells = [
      team.name,
      team.wins,
      team.losses,
      team.winPct.toFixed(3),
      team.offense.toFixed(2),
      team.defense.toFixed(2),
      team.overall.toFixed(2)
    ];

    for (const value of cells) {
      const td = document.createElement("td");
      td.textContent = value;
      row.appendChild(td);
    }

    standingsBody.appendChild(row);
  }
}


const errorMess = document.getElementById("errorMess"); 


function simulate() {
    animationValue = 5;
    homeValue = 0;
    awayValue = 0;
    const getHomeTeam = document.getElementById("homeTeam");
    const getAwayTeam = document.getElementById("awayTeam");
    const awayTeam = getAwayTeam.value;
    const homeTeam = getHomeTeam.value;
    if (awayTeam == homeTeam) {
        errorMess.innerText = "Please enter two different teams.";
    } else if (homeTeam == "invalid1" || awayTeam == "invalid") {
        errorMess.innerText = "Please enter the teams to simulate.";
    } else {
      simScorePage.hidden = true;
      canvas.hidden = false;
      drawSimAnimation();
    }
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
        determineTeamStrength();
        saveUserData();
        document.getElementById('loginDiv').style.display = 'none';
        startGame();
        document.getElementById('saveButton').style.display = 'block';
    // Use newUser.teamData in your game logic
    } 
}

function saveUserData() {
  if (!currentUser) return;

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  let userIndex = users.findIndex(u => u.username === currentUser);


  if (userIndex !== -1) {
    users[userIndex].teamData = allTeams;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Progress Saved");
  } else {
    alert("User not found");
    } 
}
 
function resetUser() {
  alert("User Reset");
  allTeams = defaultAllTeams;
  determineTeamStrength();
  saveUserData();
}
 


 