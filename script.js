/* script.js — updated
   - preserves original allTeams/defaultAllTeams/teamImage/teamColor and sim math
   - initializes allTeams at app start (populates all 30 teams with generated ratings if not present)
   - saves allTeams to localStorage on Save and whenever records change
   - adds season-simulation helpers that reuse the existing scoring algorithm
*/

/* -------------------------- new UI element references -------------------------- */
// Team management
const addTeamForm = document.getElementById("addTeamForm");
const teamNameInput = document.getElementById("teamNameInput");
const teamRatingInput = document.getElementById("teamRatingInput");
const teamsList = document.getElementById("teamsList");

// Simulator controls
const teamASelect = document.getElementById("teamASelect");
const teamBSelect = document.getElementById("teamBSelect");
const simulateBtn = document.getElementById("simulateBtn");
const simulateSeasonBtn = document.getElementById("simulateSeasonBtn");
const lastResult = document.getElementById("lastResult");
const standingsList = document.getElementById("standingsList");

// Modals
const seasonModal = document.getElementById("seasonModal");
const seasonClose = document.getElementById("seasonClose");
const seasonTitle = document.getElementById("seasonTitle");
const seasonGameCard = document.getElementById("seasonGameCard");
const seasonContinue = document.getElementById("seasonContinue");
const seasonStandings = document.getElementById("seasonStandings");
const seasonEnd = document.getElementById("seasonEnd");

const standingsModal = document.getElementById("standingsModal");
const standingsClose = document.getElementById("standingsClose");
const modalStandingsList = document.getElementById("modalStandingsList");
const closeStandingsBtn = document.getElementById("closeStandingsBtn");

// Save/Load buttons
const saveUser = document.getElementById("saveUser");
const loadUser = document.getElementById("loadUser");

var westernConference = [];
var easternConference = []; 
var allTeams = [];
var defaultAllTeams = []; 
let currentUser = null;
let userTeams = []; // Custom teams added by user

/* -------------------------- default teams -------------------------- */
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

// teamArray[x][1]=wins, 2=losses, 3=pct, 4=o rating, 5=d rating, 6=overall rating 

/* -------------------------- styling assets (unchanged) -------------------------- */
const teamColor = [
  '#E03A3E', '#007A33', '#000000', '#00788C', '#CE1141', '#6F263D',
  '#00538C', '#0E2240', '#006BB6', '#1D428A', '#CE1141', '#002D62',
  '#C8102E', '#552583', '#12173F', '#98002E', '#00471B', '#236192',
  '#0C2340', '#006BB6', '#007AC1', '#0077C0', '#EF3B24', '#1D1160',
  '#E03A3E', '#5A2D81', '#000000', '#CE1141', '#002B5C', '#E31837'
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

/* -------------------------- helper persistence -------------------------- */
const ALL_TEAMS_KEY = "allTeams";

function saveAllTeamsToLocal() {
  try {
    localStorage.setItem(ALL_TEAMS_KEY, JSON.stringify(allTeams));
  } catch (e) {
    console.warn("Unable to persist allTeams:", e);
  }
}

function loadAllTeamsFromLocal() {
  try {
    const raw = localStorage.getItem(ALL_TEAMS_KEY);
    if (!raw) return false;
    allTeams = JSON.parse(raw);
    return true;
  } catch (e) {
    console.warn("Unable to load allTeams:", e);
    return false;
  }
}

/* -------------------------- rating assignment (unchanged) -------------------------- */
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

  // Save after generation so default initialization persists
  saveAllTeamsToLocal();
}

/* -------------------------- game score generation (extracted) -------------------------- */
function generateGameScoresByTeamNumber(homeTeamNum, awayTeamNum) {
  const homeTeamIndex = homeTeamNum * 2;
  const awayTeamIndex = awayTeamNum * 2;

  const homeStrength = parseFloat(allTeams[homeTeamIndex + 1][5]) || 0;
  const awayStrength = parseFloat(allTeams[awayTeamIndex + 1][5]) || 0;

  let homeScore = Math.random() * 30 + 87;
  let awayScore = Math.random() * 30 + 87;

  const strengthGap = homeStrength - awayStrength;
  const clampedImpact = Math.max(Math.min(strengthGap, 2.5), -2.5);
  homeScore += clampedImpact * 1.5;
  awayScore -= clampedImpact * 1.5;

  homeScore += homeStrength / 4;
  awayScore += awayStrength / 4;

  homeScore *= parseFloat(allTeams[homeTeamIndex + 1][3]) || 1;
  homeScore *= parseFloat(allTeams[awayTeamIndex + 1][4]) || 1;

  awayScore *= parseFloat(allTeams[awayTeamIndex + 1][3]) || 1;
  awayScore *= parseFloat(allTeams[homeTeamIndex + 1][4]) || 1;

  const upsetSwing = Math.random();
  const upsetBias = Math.abs(strengthGap) / 4;

  if (strengthGap > 0) {
    awayScore += upsetBias * (upsetSwing * 10);
    homeScore -= upsetBias * (Math.random() * 3);
  } else if (strengthGap < 0) {
    homeScore += upsetBias * (upsetSwing * 10);
    awayScore -= upsetBias * (Math.random() * 3);
  }

  homeScore *= ((Math.random() * 0.2) + 0.9);
  awayScore *= ((Math.random() * 0.2) + 0.9);

  homeScore = Math.ceil(homeScore);
  awayScore = Math.floor(awayScore);

  let scoreDiff = Math.abs(homeScore - awayScore);
  if (scoreDiff >= 15) {
    const winner = homeScore > awayScore ? 'home' : 'away';
    const targetDiff = Math.floor(6 + Math.random() * 8);

    if (winner === 'home') {
      awayScore = homeScore - targetDiff;
    } else {
      homeScore = awayScore - targetDiff;
    }

    if (homeScore < 85) homeScore = 85 + Math.floor(Math.random() * 5);
    if (awayScore < 85) awayScore = 85 + Math.floor(Math.random() * 5);
  }

  let wentToOT = false;
  if (homeScore === awayScore) {
    wentToOT = true;
    const homeBoost = (Math.random() * 4 + 5) + (homeStrength / 10);
    const awayBoost = (Math.random() * 4 + 5) + (awayStrength / 10);

    homeScore += Math.round(homeBoost);
    awayScore += Math.round(awayBoost);

    if (homeScore === awayScore) {
      if (Math.random() > 0.5) {
        homeScore += 1;
      } else {
        awayScore += 1;
      }
    }
  }

  return { homeScore, awayScore, wentToOT };
}

/* -------------------------- apply result helper (persists) -------------------------- */
function applyGameResultToTeams(homeTeamNum, awayTeamNum, homeScore, awayScore, wentToOT) {
  const homeTeamIndex = homeTeamNum * 2;
  const awayTeamIndex = awayTeamNum * 2;

  const homeTeamData = allTeams[homeTeamIndex + 1];
  const awayTeamData = allTeams[awayTeamIndex + 1];

  const homeWon = homeScore > awayScore;
  if (homeWon) {
    homeTeamData[0] = (parseInt(homeTeamData[0]) + 1).toString();
    awayTeamData[1] = (parseInt(awayTeamData[1]) + 1).toString();
  } else {
    awayTeamData[0] = (parseInt(awayTeamData[0]) + 1).toString();
    homeTeamData[1] = (parseInt(homeTeamData[1]) + 1).toString();
  }

  const homeWins = parseInt(homeTeamData[0]);
  const homeLosses = parseInt(homeTeamData[1]);
  const awayWins = parseInt(awayTeamData[0]);
  const awayLosses = parseInt(awayTeamData[1]);

  homeTeamData[2] = homeWins + homeLosses === 0 ? ".000" : (homeWins / (homeWins + homeLosses)).toFixed(3);
  awayTeamData[2] = awayWins + awayLosses === 0 ? ".000" : (awayWins / (awayWins + awayLosses)).toFixed(3);

  // persist snapshot so user can resume later
  saveAllTeamsToLocal();
}

/* -------------------------- season simulation state -------------------------- */
let seasonRunState = null;

/* -------------------------- UI helper functions -------------------------- */
function updateTeamSelects() {
  // Clear existing options
  teamASelect.innerHTML = '<option value="">Select Home Team</option>';
  teamBSelect.innerHTML = '<option value="">Select Away Team</option>';
  
  // Add options from userTeams
  userTeams.forEach((team, index) => {
    const optionA = document.createElement('option');
    optionA.value = index;
    optionA.textContent = team.name;
    teamASelect.appendChild(optionA);
    
    const optionB = document.createElement('option');
    optionB.value = index;
    optionB.textContent = team.name;
    teamBSelect.appendChild(optionB);
  });
}

function renderTeamsList() {
  teamsList.innerHTML = '';
  userTeams.forEach((team, index) => {
    const li = document.createElement('li');
    li.className = 'team-item';
    li.innerHTML = `
      <div>
        <div class="team-name">${team.name}</div>
        <div class="team-meta">Rating: ${team.rating} | W: ${team.wins} L: ${team.losses}</div>
      </div>
      <button class="btn danger" onclick="removeTeam(${index})">Remove</button>
    `;
    teamsList.appendChild(li);
  });
  updateTeamSelects();
}

function renderInlineStandings() {
  if (userTeams.length === 0) {
    standingsList.innerHTML = '<p style="color: var(--muted); text-align: center;">Add teams to see standings</p>';
    return;
  }
  
  const sorted = [...userTeams].sort((a, b) => {
    const aPct = a.wins + a.losses === 0 ? 0 : a.wins / (a.wins + a.losses);
    const bPct = b.wins + b.losses === 0 ? 0 : b.wins / (b.wins + b.losses);
    return bPct - aPct;
  });
  
  standingsList.innerHTML = '';
  sorted.forEach((team, index) => {
    const pct = team.wins + team.losses === 0 ? '.000' : (team.wins / (team.wins + team.losses)).toFixed(3);
    const row = document.createElement('div');
    row.className = 'standings-row';
    row.innerHTML = `
      <span>${index + 1}. ${team.name}</span>
      <span>${team.wins}-${team.losses} (${pct})</span>
    `;
    standingsList.appendChild(row);
  });
}

/* -------------------------- Team management -------------------------- */
function addTeam(name, rating) {
  const team = {
    name: name,
    rating: parseInt(rating),
    wins: 0,
    losses: 0
  };
  userTeams.push(team);
  saveUserTeams();
  renderTeamsList();
  renderInlineStandings();
}

function removeTeam(index) {
  userTeams.splice(index, 1);
  saveUserTeams();
  renderTeamsList();
  renderInlineStandings();
}

/* -------------------------- Save/Load user teams -------------------------- */
const USER_TEAMS_KEY = "userTeams";

function saveUserTeams() {
  try {
    localStorage.setItem(USER_TEAMS_KEY, JSON.stringify(userTeams));
  } catch (e) {
    console.warn("Unable to save teams:", e);
  }
}

function loadUserTeams() {
  try {
    const raw = localStorage.getItem(USER_TEAMS_KEY);
    if (raw) {
      userTeams = JSON.parse(raw);
      return true;
    }
  } catch (e) {
    console.warn("Unable to load teams:", e);
  }
  return false;
}

/* -------------------------- Single game simulation -------------------------- */
function simulateSingleGame() {
  const homeIdx = parseInt(teamASelect.value);
  const awayIdx = parseInt(teamBSelect.value);
  
  if (isNaN(homeIdx) || isNaN(awayIdx)) {
    alert('Please select both home and away teams');
    return;
  }
  
  if (homeIdx === awayIdx) {
    alert('Please select two different teams');
    return;
  }
  
  const homeTeam = userTeams[homeIdx];
  const awayTeam = userTeams[awayIdx];
  
  // Calculate scores based on ratings
  let homeScore = Math.random() * 30 + 87;
  let awayScore = Math.random() * 30 + 87;
  
  const ratingDiff = (homeTeam.rating - awayTeam.rating) / 10;
  homeScore += ratingDiff * 2;
  awayScore -= ratingDiff * 2;
  
  // Add randomness
  homeScore *= ((Math.random() * 0.2) + 0.9);
  awayScore *= ((Math.random() * 0.2) + 0.9);
  
  homeScore = Math.round(homeScore);
  awayScore = Math.round(awayScore);
  
  // Handle tie
  if (homeScore === awayScore) {
    if (Math.random() > 0.5) {
      homeScore += Math.floor(Math.random() * 5) + 3;
    } else {
      awayScore += Math.floor(Math.random() * 5) + 3;
    }
  }
  
  // Update records
  if (homeScore > awayScore) {
    homeTeam.wins++;
    awayTeam.losses++;
  } else {
    awayTeam.wins++;
    homeTeam.losses++;
  }
  
  saveUserTeams();
  renderTeamsList();
  renderInlineStandings();
  
  // Display result
  lastResult.classList.remove('hidden');
  lastResult.innerHTML = `
    <h4>Game Result</h4>
    <div style="display: flex; justify-content: space-around; margin: 12px 0;">
      <div style="text-align: center;">
        <div style="font-size: 18px; font-weight: 700;">${homeTeam.name}</div>
        <div style="font-size: 32px; font-weight: 900; color: ${homeScore > awayScore ? 'var(--success)' : 'var(--muted)'};">${homeScore}</div>
      </div>
      <div style="align-self: center; font-size: 20px;">vs</div>
      <div style="text-align: center;">
        <div style="font-size: 18px; font-weight: 700;">${awayTeam.name}</div>
        <div style="font-size: 32px; font-weight: 900; color: ${awayScore > homeScore ? 'var(--success)' : 'var(--muted)'};">${awayScore}</div>
      </div>
    </div>
    <div style="text-align: center; color: var(--muted); margin-top: 8px;">
      ${homeScore > awayScore ? homeTeam.name : awayTeam.name} wins!
    </div>
  `;
}

/* -------------------------- Season simulation -------------------------- */
function startSeasonSim() {
  const homeIdx = parseInt(teamASelect.value);
  const awayIdx = parseInt(teamBSelect.value);
  
  if (isNaN(homeIdx) || isNaN(awayIdx)) {
    alert('Please select both home and away teams');
    return;
  }
  
  if (homeIdx === awayIdx) {
    alert('Please select two different teams for a season');
    return;
  }
  
  seasonRunState = {
    homeIdx,
    awayIdx,
    currentGame: 1,
    totalGames: 82
  };
  
  seasonModal.classList.remove('hidden');
  renderSeasonGame();
}

function renderSeasonGame() {
  if (!seasonRunState) return;
  
  const { homeIdx, awayIdx, currentGame, totalGames } = seasonRunState;
  const homeTeam = userTeams[homeIdx];
  const awayTeam = userTeams[awayIdx];
  
  seasonTitle.textContent = `Season Simulation - Game ${currentGame} of ${totalGames}`;
  
  // Simulate game preview
  const result = simulateGameBetweenTeams(homeTeam, awayTeam, false);
  
  seasonGameCard.innerHTML = `
    <h4>Next Game Preview</h4>
    <div style="display: flex; justify-content: space-around; margin: 12px 0;">
      <div style="text-align: center;">
        <div style="font-size: 18px; font-weight: 700;">${homeTeam.name}</div>
        <div style="font-size: 32px; font-weight: 900;">${result.homeScore}</div>
      </div>
      <div style="align-self: center; font-size: 20px;">vs</div>
      <div style="text-align: center;">
        <div style="font-size: 18px; font-weight: 700;">${awayTeam.name}</div>
        <div style="font-size: 32px; font-weight: 900;">${result.awayScore}</div>
      </div>
    </div>
  `;
}

function continueSeasonGame() {
  if (!seasonRunState) return;
  
  const { homeIdx, awayIdx, currentGame, totalGames } = seasonRunState;
  const homeTeam = userTeams[homeIdx];
  const awayTeam = userTeams[awayIdx];
  
  // Simulate and apply game
  const result = simulateGameBetweenTeams(homeTeam, awayTeam, true);
  
  seasonGameCard.innerHTML = `
    <h4>Game ${currentGame} Result</h4>
    <div style="display: flex; justify-content: space-around; margin: 12px 0;">
      <div style="text-align: center;">
        <div style="font-size: 18px; font-weight: 700;">${homeTeam.name}</div>
        <div style="font-size: 32px; font-weight: 900; color: ${result.homeScore > result.awayScore ? 'var(--success)' : 'var(--muted)'};">${result.homeScore}</div>
      </div>
      <div style="align-self: center; font-size: 20px;">vs</div>
      <div style="text-align: center;">
        <div style="font-size: 18px; font-weight: 700;">${awayTeam.name}</div>
        <div style="font-size: 32px; font-weight: 900; color: ${result.awayScore > result.homeScore ? 'var(--success)' : 'var(--muted)'};">${result.awayScore}</div>
      </div>
    </div>
    <div style="text-align: center; color: var(--muted); margin-top: 8px;">
      ${result.homeScore > result.awayScore ? homeTeam.name : awayTeam.name} wins!
    </div>
  `;
  
  if (currentGame >= totalGames) {
    alert(`Season complete! Simulated ${totalGames} games.`);
    seasonRunState = null;
    seasonModal.classList.add('hidden');
    renderTeamsList();
    renderInlineStandings();
  } else {
    seasonRunState.currentGame++;
    setTimeout(renderSeasonGame, 500);
  }
}

function simulateGameBetweenTeams(homeTeam, awayTeam, applyResult) {
  let homeScore = Math.random() * 30 + 87;
  let awayScore = Math.random() * 30 + 87;
  
  const ratingDiff = (homeTeam.rating - awayTeam.rating) / 10;
  homeScore += ratingDiff * 2;
  awayScore -= ratingDiff * 2;
  
  homeScore *= ((Math.random() * 0.2) + 0.9);
  awayScore *= ((Math.random() * 0.2) + 0.9);
  
  homeScore = Math.round(homeScore);
  awayScore = Math.round(awayScore);
  
  if (homeScore === awayScore) {
    if (Math.random() > 0.5) {
      homeScore += Math.floor(Math.random() * 5) + 3;
    } else {
      awayScore += Math.floor(Math.random() * 5) + 3;
    }
  }
  
  if (applyResult) {
    if (homeScore > awayScore) {
      homeTeam.wins++;
      awayTeam.losses++;
    } else {
      awayTeam.wins++;
      homeTeam.losses++;
    }
    saveUserTeams();
  }
  
  return { homeScore, awayScore };
}

function showStandingsModal() {
  const sorted = [...userTeams].sort((a, b) => {
    const aPct = a.wins + a.losses === 0 ? 0 : a.wins / (a.wins + a.losses);
    const bPct = b.wins + b.losses === 0 ? 0 : b.wins / (b.wins + b.losses);
    return bPct - aPct;
  });
  
  modalStandingsList.innerHTML = '';
  sorted.forEach((team, index) => {
    const pct = team.wins + team.losses === 0 ? '.000' : (team.wins / (team.wins + team.losses)).toFixed(3);
    const row = document.createElement('div');
    row.className = 'standings-row';
    row.innerHTML = `
      <span>${index + 1}. ${team.name}</span>
      <span>${team.wins}-${team.losses} (${pct})</span>
    `;
    modalStandingsList.appendChild(row);
  });
  
  standingsModal.classList.remove('hidden');
}

function endSeasonSim() {
  seasonRunState = null;
  seasonModal.classList.add('hidden');
  renderTeamsList();
  renderInlineStandings();
}

/* -------------------------- Event listeners -------------------------- */
addTeamForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = teamNameInput.value.trim();
  const rating = teamRatingInput.value;
  
  if (!name) {
    alert('Please enter a team name');
    return;
  }
  
  addTeam(name, rating);
  teamNameInput.value = '';
  teamRatingInput.value = '100';
});

simulateBtn.addEventListener('click', simulateSingleGame);
simulateSeasonBtn.addEventListener('click', startSeasonSim);

seasonClose.addEventListener('click', () => {
  seasonRunState = null;
  seasonModal.classList.add('hidden');
});

seasonContinue.addEventListener('click', continueSeasonGame);
seasonStandings.addEventListener('click', showStandingsModal);
seasonEnd.addEventListener('click', endSeasonSim);

standingsClose.addEventListener('click', () => {
  standingsModal.classList.add('hidden');
});

closeStandingsBtn.addEventListener('click', () => {
  standingsModal.classList.add('hidden');
});

saveUser.addEventListener('click', () => {
  saveUserTeams();
  alert('Progress saved successfully!');
});

loadUser.addEventListener('click', () => {
  if (loadUserTeams()) {
    renderTeamsList();
    renderInlineStandings();
    alert('Progress loaded successfully!');
  } else {
    alert('No saved progress found');
  }
});

/* -------------------------- Initialize on page load -------------------------- */
(function initApp() {
  // Initialize allTeams for backwards compatibility (preserves existing logic)
  const loaded = loadAllTeamsFromLocal();
  if (!loaded) {
    allTeams = JSON.parse(JSON.stringify(defaultAllTeams));
    determineTeamStrength();
  }
  
  // Load user teams
  loadUserTeams();
  renderTeamsList();
  renderInlineStandings();
  
  // Hide modals on page load
  seasonModal.classList.add('hidden');
  standingsModal.classList.add('hidden');
})();
