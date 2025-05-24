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

function determineTeamStrength() {
  const values = [];
  for (let i = -15; i <= 15; i++) {
    if (i !== 0) values.push(i / 2); // range: -7.5 to +7.5
  }

  // Shuffle values to assign random team strengths
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]];
  }

  // Assign team strength and calculate offense/defense multipliers
  for (let i = 0; i < allTeams.length; i += 2) {
    const stats = allTeams[i + 1];
    const strength = values[i / 2];
    stats[5] = strength;

    const normalized = (strength + 7.5) / 15; // maps to 0–1

    // Offense: ranges roughly from 0.95 to 1.15
    const offense = 1.0 + (Math.random() * 0.1 - 0.05) + (normalized - 0.5) * 0.2;

    // Defense: ranges from 0.95 to 1.15 inversely
    const defense = 1.0 - (Math.random() * 0.1 - 0.05) - (normalized - 0.5) * 0.2;

    stats[3] = parseFloat(offense.toFixed(3));
    stats[4] = parseFloat(defense.toFixed(3));
  }
}

function simFinalScore() {
  const getHomeTeam = document.getElementById("homeTeam");
  const getAwayTeam = document.getElementById("awayTeam");
  const homeTeamIndex = (parseInt(getHomeTeam.value) - 1) * 2;
  const awayTeamIndex = (parseInt(getAwayTeam.value) - 1) * 2;

  const homeScoreSection = document.getElementById("homeScore");
  const awayScoreSection = document.getElementById("awayScore");

  let awayScore;
  let homeScore;

  canvas.hidden = true;
  resultsPage.hidden = false;

  // Set team names and images
  document.querySelector("#awayScore h3").textContent = allTeams[awayTeamIndex];
  document.querySelector("#homeScore h3").textContent = allTeams[homeTeamIndex];

  document.querySelector("#homeScore img").src = teamImage[homeTeamIndex / 2];
  document.querySelector("#awayScore img").src = teamImage[awayTeamIndex / 2];

  // Ratings
  const homeStrength = parseFloat(allTeams[homeTeamIndex + 1][5]);
  const awayStrength = parseFloat(allTeams[awayTeamIndex + 1][5]);

  // Base NBA score
  homeScore = Math.random() * 30 + 87;
  awayScore = Math.random() * 30 + 87;

  // Strength impact (clamped to avoid extremes)
  const strengthGap = homeStrength - awayStrength;
  const clampedImpact = Math.max(Math.min(strengthGap, 2.5), -2.5);
  homeScore += clampedImpact * 1.5;
  awayScore -= clampedImpact * 1.5;

  // Add base rating bonuses
  homeScore += homeStrength / 4;
  awayScore += awayStrength / 4;

  // Adjust based on offense/defense stats
  homeScore *= parseFloat(allTeams[homeTeamIndex + 1][3]); // home offense
  homeScore *= parseFloat(allTeams[awayTeamIndex + 1][4]); // away defense

  awayScore *= parseFloat(allTeams[awayTeamIndex + 1][3]); // away offense
  awayScore *= parseFloat(allTeams[homeTeamIndex + 1][4]); // home defense

  // Underdog performance boost
  const upsetSwing = Math.random();
  const upsetBias = Math.abs(strengthGap) / 4;

  if (strengthGap > 0) {
    // Home is better
    awayScore += upsetBias * (upsetSwing * 14);
    homeScore -= upsetBias * (Math.random() * 5);
  } else if (strengthGap < 0) {
    // Away is better
    homeScore += upsetBias * (upsetSwing * 14);
    awayScore -= upsetBias * (Math.random() * 5);
  }

  // Final game randomness
  homeScore *= ((Math.random() * 0.2) + 0.9);
  awayScore *= ((Math.random() * 0.2) + 0.9);

  homeScore = Math.ceil(homeScore);
  awayScore = Math.floor(awayScore);

  // 🛠️ Blowout Compression
  let scoreDiff = Math.abs(homeScore - awayScore);
  if (scoreDiff >= 15) {
    const winner = homeScore > awayScore ? 'home' : 'away';
    const targetDiff = Math.floor(6 + Math.random() * 8); // 6–13 pt win

    if (winner === 'home') {
      awayScore = homeScore - targetDiff;
    } else {
      homeScore = awayScore - targetDiff;
    }

    // Floor of 85
    if (homeScore < 85) homeScore = 85 + Math.floor(Math.random() * 5);
    if (awayScore < 85) awayScore = 85 + Math.floor(Math.random() * 5);
  }

  // ⏱️ Handle Tie Game — simulate OT
  let wentToOT = false;
  if (homeScore === awayScore) {
    wentToOT = true;

    const homeBoost = (Math.random() * 4 + 5) + (homeStrength / 10);
    const awayBoost = (Math.random() * 4 + 5) + (awayStrength / 10);

    homeScore += Math.round(homeBoost);
    awayScore += Math.round(awayBoost);

    // Break tie if still equal (extremely rare)
    if (homeScore === awayScore) {
      if (Math.random() > 0.5) {
        homeScore += 1;
      } else {
        awayScore += 1;
      }
    }
  }

  // Update DOM
  awayScoreSection.querySelectorAll("h3")[1].textContent = awayScore;
  homeScoreSection.querySelectorAll("h3")[1].textContent = homeScore;

  // Update record
  const homeTeamData = allTeams[homeTeamIndex + 1];
  const awayTeamData = allTeams[awayTeamIndex + 1];

  let homeWon = homeScore > awayScore;
  if (homeWon) {
    winnerArrow.innerText = wentToOT ? "Final/OT >" : "Final >";
    homeTeamData[0] = (parseInt(homeTeamData[0]) + 1).toString(); // win
    awayTeamData[1] = (parseInt(awayTeamData[1]) + 1).toString(); // loss
  } else {
    winnerArrow.innerText = wentToOT ? "< Final/OT" : "< Final";
    awayTeamData[0] = (parseInt(awayTeamData[0]) + 1).toString(); // win
    homeTeamData[1] = (parseInt(homeTeamData[1]) + 1).toString(); // loss
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
          setTimeout(() => startGlowAnimation(glowCount + 1), 200);
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
  simScorePage.hidden = true;

  // Clear the standings container
  standingsPage.innerHTML = "<h1 class='pageTitle'>Standings</h1>";

  // Create EAST and WEST team arrays
  const eastTeams = [
    "Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Hornets", "Chicago Bulls",
    "Cleveland Caviliers", "Detroit Pistons", "Indiana Pacers", "Miami Heat", "Milwaukee Bucks",
    "New York Knicks", "Orlando Magic", "Philadelphia 76ers", "Toronto Raptors", "Washington Wizards"
  ];

  const eastStandings = [];
  const westStandings = [];

  for (let i = 0; i < allTeams.length; i += 2) {
    const name = allTeams[i];
    const stats = allTeams[i + 1];
    const obj = {
      name,
      wins: stats[0],
      losses: stats[1],
      winPct: parseFloat(stats[2]),
      offense: parseFloat(stats[3]),
      defense: parseFloat(stats[4]),
      overall: parseFloat(stats[5]),
      logo: teamImage[i / 2]
    };
    if (eastTeams.includes(name)) {
      eastStandings.push(obj);
    } else {
      westStandings.push(obj);
    }
  }

  eastStandings.sort((a, b) => b.winPct - a.winPct);
  westStandings.sort((a, b) => b.winPct - a.winPct);

  standingsPage.appendChild(buildStandingsTable("Eastern Conference", eastStandings));
  standingsPage.appendChild(buildStandingsTable("Western Conference", westStandings));
}

function buildStandingsTable(title, standings) {
  const container = document.createElement("div");

  const heading = document.createElement("h2");
  heading.textContent = title;
  heading.style.textAlign = "center";
  container.appendChild(heading);

  const table = document.createElement("table");
  table.style.margin = "0 auto";
  table.style.borderCollapse = "collapse";
  table.style.marginBottom = "24px";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const headers = ["Rank", "Team", "Wins |", "Losses |", "Win % |", "Offense |", "Defense |", "Overall |"];
  for (const h of headers) {
    const th = document.createElement("th");
    th.textContent = h;
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  for (let i = 0; i < standings.length; i++) {
    const team = standings[i];
    const row = document.createElement("tr");

    const rankTd = document.createElement("td");
    rankTd.textContent = i + 1;

    const teamTd = document.createElement("td");
    teamTd.style.display = "flex";
    teamTd.style.alignItems = "center";
    teamTd.style.gap = "8px";

    const logo = document.createElement("img");
    logo.src = team.logo;
    logo.style.width = "30px";
    logo.style.height = "30px";
    logo.style.objectFit = "contain";

    const nameSpan = document.createElement("span");
    nameSpan.textContent = team.name;

    teamTd.appendChild(logo);
    teamTd.appendChild(nameSpan);

    const data = [
      rankTd,
      teamTd,
      createCell(team.wins),
      createCell(team.losses),
      createCell(team.winPct.toFixed(3)),
      createCell(team.offense.toFixed(2)),
      createCell(team.defense.toFixed(2)),
      createCell(team.overall.toFixed(2))
    ];

    for (const cell of data) {
      cell.style.padding = "8px 12px";
      cell.style.borderBottom = "1px solid #ccc";
      row.appendChild(cell);
    }

    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  container.appendChild(table);
  return container;
}

function createCell(text) {
  const td = document.createElement("td");
  td.textContent = text;
  return td;
}







const errorMess = document.getElementById("errorMess"); 


function simulate() {
    animationValue = 5;
    homeValue = 0;
    awayValue = 0;
    errorMess.innerText = "";
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
 


 