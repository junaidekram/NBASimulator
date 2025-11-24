/* script.js — NBA Simulator with 30 default teams
   - Auto-initializes 30 NBA teams with randomly generated ratings
   - Teams are split between Eastern and Western conferences
   - Ratings range from -7.50 to 7.50 with biased offensive/defensive ratings
*/

/* -------------------------- UI element references -------------------------- */
// Simulator controls
const teamASelect = document.getElementById("teamASelect");
const teamBSelect = document.getElementById("teamBSelect");
const simulateBtn = document.getElementById("simulateBtn");
const simulateSeasonBtn = document.getElementById("simulateSeasonBtn");
const lastResult = document.getElementById("lastResult");

// Standings
const easternStandingsBody = document.getElementById("easternStandingsBody");
const westernStandingsBody = document.getElementById("westernStandingsBody");

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
const modalEasternStandingsBody = document.getElementById("modalEasternStandingsBody");
const modalWesternStandingsBody = document.getElementById("modalWesternStandingsBody");
const closeStandingsBtn = document.getElementById("closeStandingsBtn");

// Save/Reset buttons
const saveUser = document.getElementById("saveUser");
const resetSeason = document.getElementById("resetSeason");

var allTeams = [];
var defaultAllTeams = [];

/* -------------------------- default teams -------------------------- */
// teamArray structure: [name, [wins, losses, pct, offRating, defRating, overallRating, conference]]
// Conference: 'E' for Eastern, 'W' for Western
defaultAllTeams = [
    "Atlanta Hawks", ["0", "0", ".000", "0", "0", "0", "E"],
    "Boston Celtics", ["0", "0", ".000", "0", "0", "0", "E"],
    "Brooklyn Nets", ["0", "0", ".000", "0", "0", "0", "E"],
    "Charlotte Hornets", ["0", "0", ".000", "0", "0", "0", "E"],
    "Chicago Bulls", ["0", "0", ".000", "0", "0", "0", "E"],
    "Cleveland Cavaliers", ["0", "0", ".000", "0", "0", "0", "E"],
    "Detroit Pistons", ["0", "0", ".000", "0", "0", "0", "E"],
    "Indiana Pacers", ["0", "0", ".000", "0", "0", "0", "E"],
    "Miami Heat", ["0", "0", ".000", "0", "0", "0", "E"],
    "Milwaukee Bucks", ["0", "0", ".000", "0", "0", "0", "E"],
    "New York Knicks", ["0", "0", ".000", "0", "0", "0", "E"],
    "Orlando Magic", ["0", "0", ".000", "0", "0", "0", "E"],
    "Philadelphia 76ers", ["0", "0", ".000", "0", "0", "0", "E"],
    "Toronto Raptors", ["0", "0", ".000", "0", "0", "0", "E"],
    "Washington Wizards", ["0", "0", ".000", "0", "0", "0", "E"],
    "Dallas Mavericks", ["0", "0", ".000", "0", "0", "0", "W"],
    "Denver Nuggets", ["0", "0", ".000", "0", "0", "0", "W"],
    "Golden State Warriors", ["0", "0", ".000", "0", "0", "0", "W"],
    "Houston Rockets", ["0", "0", ".000", "0", "0", "0", "W"],
    "Los Angeles Clippers", ["0", "0", ".000", "0", "0", "0", "W"],
    "Los Angeles Lakers", ["0", "0", ".000", "0", "0", "0", "W"],
    "Memphis Grizzlies", ["0", "0", ".000", "0", "0", "0", "W"],
    "Minnesota Timberwolves", ["0", "0", ".000", "0", "0", "0", "W"],
    "New Orleans Pelicans", ["0", "0", ".000", "0", "0", "0", "W"],
    "Oklahoma City Thunder", ["0", "0", ".000", "0", "0", "0", "W"],
    "Phoenix Suns", ["0", "0", ".000", "0", "0", "0", "W"],
    "Portland Trailblazers", ["0", "0", ".000", "0", "0", "0", "W"],
    "Sacramento Kings", ["0", "0", ".000", "0", "0", "0", "W"],
    "San Antonio Spurs", ["0", "0", ".000", "0", "0", "0", "W"],
    "Utah Jazz", ["0", "0", ".000", "0", "0", "0", "W"],
];

// teamArray[x][1]=wins, 2=losses, 3=pct, 4=offRating, 5=defRating, 6=overallRating, 7=conference 

/* -------------------------- styling assets (reordered by conference) -------------------------- */
// Team logos reordered to match the team list (Eastern conference first, then Western)
const teamImage = [
  "https://a.espncdn.com/i/teamlogos/nba/500/atl.png", // Atlanta Hawks
  "https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Boston_Celtics.svg/640px-Boston_Celtics.svg.png", // Boston Celtics
  "https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Brooklyn_Nets_primary_icon_logo_2024.svg/1200px-Brooklyn_Nets_primary_icon_logo_2024.svg.png", // Brooklyn Nets
  "https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Charlotte_Hornets_%282014%29.svg/1200px-Charlotte_Hornets_%282014%29.svg.png", // Charlotte Hornets
  "https://a.espncdn.com/i/teamlogos/nba/500/chi.png", // Chicago Bulls
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Cleveland_Cavaliers_logo.svg/1200px-Cleveland_Cavaliers_logo.svg.png", // Cleveland Cavaliers
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Logo_of_the_Detroit_Pistons.svg/1200px-Logo_of_the_Detroit_Pistons.svg.png", // Detroit Pistons
  "https://s.yimg.com/cv/apiv2/default/nba/20181214/500x500/pacers_wbg.png", // Indiana Pacers
  "https://s.yimg.com/it/api/res/1.2/viPExHzWDztzwTOzNneYVw--~A/YXBwaWQ9eW5ld3M7dz0xMjAwO2g9NjMwO3E9MTAw/https://s.yimg.com/cv/apiv2/default/nba/20181219/500x500/heat_wbgs.png", // Miami Heat
  "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/mil.png", // Milwaukee Bucks
  "https://upload.wikimedia.org/wikipedia/en/thumb/2/25/New_York_Knicks_logo.svg/1200px-New_York_Knicks_logo.svg.png", // New York Knicks
  "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/orl.png", // Orlando Magic
  "https://s.yimg.com/cv/apiv2/default/nba/20181217/500x500/76ers_wbg.png", // Philadelphia 76ers
  "https://upload.wikimedia.org/wikipedia/en/thumb/3/36/Toronto_Raptors_logo.svg/250px-Toronto_Raptors_logo.svg.png", // Toronto Raptors
  "https://a.espncdn.com/guid/64d73af6-b8ec-e213-87e8-a4eab3a692e7/logos/primary_logo_on_black_color.png", // Washington Wizards
  "https://s.yimg.com/cv/apiv2/default/nba/20181214/500x500/mavericks_wbg.png", // Dallas Mavericks
  "https://upload.wikimedia.org/wikipedia/en/thumb/7/76/Denver_Nuggets.svg/1200px-Denver_Nuggets.svg.png", // Denver Nuggets
  "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/Gsw.png", // Golden State Warriors
  "https://s.yimg.com/cv/apiv2/default/nba/20191021/500x500/rockets_wbgs.png", // Houston Rockets
  "https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Los_Angeles_Clippers_%282024%29.svg/800px-Los_Angeles_Clippers_%282024%29.svg.png", // Los Angeles Clippers
  "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/lal.png", // Los Angeles Lakers
  "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/mem.png", // Memphis Grizzlies
  "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/min.png", // Minnesota Timberwolves
  "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/no.png", // New Orleans Pelicans
  "https://s.yimg.com/it/api/res/1.2/UAryyamYpD9BjgxYKNFdww--~A/YXBwaWQ9eW5ld3M7dz0xMjAwO2g9NjMwO3E9MTAw/https://s.yimg.com/cv/apiv2/default/nba/20181218/500x500/thunder_wbgs.png", // Oklahoma City Thunder
  "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/phx.png", // Phoenix Suns
  "https://s.yimg.com/cv/apiv2/default/nba/20181221/500x500/trailblazers_wbgs.png", // Portland Trailblazers
  "https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/SacramentoKings.svg/1200px-SacramentoKings.svg.png", // Sacramento Kings
  "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/sa.png", // San Antonio Spurs
  "https://loodibee.com/wp-content/uploads/utah-jazz-logo-symbol.png" // Utah Jazz
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

/* -------------------------- rating assignment -------------------------- */
function determineTeamStrength() {
  const values = [];
  for (let i = -15; i <= 15; i++) {
    if (i !== 0) values.push(i / 2); // range: -7.5 to +7.5 (excludes 0 to avoid neutral teams, generates exactly 30 values)
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
    stats[5] = strength.toFixed(2); // Overall rating

    const normalized = (strength + 7.5) / 15; // maps to 0–1

    // Offense: ranges roughly from 0.95 to 1.15, biased towards higher overall ratings
    const offense = 1.0 + (Math.random() * 0.1 - 0.05) + (normalized - 0.5) * 0.2;

    // Defense: ranges from 0.95 to 1.15, inversely biased (lower is better defense)
    const defense = 1.0 - (Math.random() * 0.1 - 0.05) - (normalized - 0.5) * 0.2;

    stats[3] = parseFloat(offense.toFixed(3)); // Offensive rating
    stats[4] = parseFloat(defense.toFixed(3)); // Defensive rating
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

// Constants for season simulation
const MAX_MATCHUPS_BETWEEN_TEAMS = 5; // Allow up to 5 games between any two teams if needed to reach 82

// Helper to get team count from allTeams array
// Note: allTeams is structured as [teamName1, teamData1, teamName2, teamData2, ...]
function getTeamCount() {
  return allTeams.length / 2;
}

// Track matchups between teams to minimize repeats
// matchupCounts[teamA][teamB] = number of games played between them
function initializeMatchupCounts() {
  const counts = {};
  const teamCount = getTeamCount();
  for (let i = 0; i < teamCount; i++) {
    counts[i] = {};
    for (let j = 0; j < teamCount; j++) {
      if (i !== j) {
        counts[i][j] = 0;
      }
    }
  }
  return counts;
}

// Get total games played for a team
function getTeamGamesPlayed(teamIdx) {
  const teamData = allTeams[teamIdx * 2 + 1];
  return parseInt(teamData[0]) + parseInt(teamData[1]);
}

// Find next best matchup - returns {homeIdx, awayIdx} or null if all teams at 82
function findNextMatchup(matchupCounts) {
  const teamCount = getTeamCount();
  
  // Get teams that need more games
  const teamsNeedingGames = [];
  for (let i = 0; i < teamCount; i++) {
    const gamesPlayed = getTeamGamesPlayed(i);
    if (gamesPlayed < 82) {
      teamsNeedingGames.push({ idx: i, gamesPlayed });
    }
  }
  
  // If no teams need games, season is complete
  if (teamsNeedingGames.length === 0) {
    return null;
  }
  
  // If only one team needs games, find any opponent (even if exceeds normal limit)
  if (teamsNeedingGames.length === 1) {
    const lastTeam = teamsNeedingGames[0].idx;
    // Find opponent with fewest games against this team
    let bestOpponent = null;
    let minGames = Infinity;
    for (let i = 0; i < teamCount; i++) {
      if (i !== lastTeam) {
        const gamesAgainst = matchupCounts[lastTeam][i] || 0;
        if (gamesAgainst < minGames) {
          minGames = gamesAgainst;
          bestOpponent = i;
        }
      }
    }
    return bestOpponent !== null ? { homeIdx: lastTeam, awayIdx: bestOpponent } : null;
  }
  
  // Find best matchup: prioritize teams that need games and have played each other least
  let bestMatchup = null;
  let bestScore = -1;
  
  for (let i = 0; i < teamsNeedingGames.length; i++) {
    for (let j = i + 1; j < teamsNeedingGames.length; j++) {
      const teamA = teamsNeedingGames[i].idx;
      const teamB = teamsNeedingGames[j].idx;
      const matchupCount = matchupCounts[teamA][teamB] || 0;
      
      // Allow up to MAX_MATCHUPS_BETWEEN_TEAMS games if both teams need games to reach 82
      if (matchupCount >= MAX_MATCHUPS_BETWEEN_TEAMS) continue;
      
      // Prefer matchups with fewer previous games
      // Higher score = better matchup (teams need games more, played less)
      const gamesNeeded = (82 - teamsNeedingGames[i].gamesPlayed) + (82 - teamsNeedingGames[j].gamesPlayed);
      const score = gamesNeeded * 100 - matchupCount * 10;
      
      if (score > bestScore) {
        bestScore = score;
        bestMatchup = { homeIdx: teamA, awayIdx: teamB };
      }
    }
  }
  
  return bestMatchup;
}

/* -------------------------- UI helper functions -------------------------- */
function updateTeamSelects() {
  // Clear existing options
  teamASelect.innerHTML = '<option value="">Select Home Team</option>';
  teamBSelect.innerHTML = '<option value="">Select Away Team</option>';
  
  // Add options from all 30 teams
  for (let i = 0; i < allTeams.length; i += 2) {
    const teamName = allTeams[i];
    const teamIndex = i / 2;
    
    const optionA = document.createElement('option');
    optionA.value = teamIndex;
    optionA.textContent = teamName;
    teamASelect.appendChild(optionA);
    
    const optionB = document.createElement('option');
    optionB.value = teamIndex;
    optionB.textContent = teamName;
    teamBSelect.appendChild(optionB);
  }
}

function renderStandings() {
  renderConferenceStandings(easternStandingsBody, 'E');
  renderConferenceStandings(westernStandingsBody, 'W');
}

function renderConferenceStandings(tbody, conference) {
  const teams = [];
  
  // Collect teams from the specified conference
  for (let i = 0; i < allTeams.length; i += 2) {
    const stats = allTeams[i + 1];
    if (stats[6] === conference) {
      teams.push({
        name: allTeams[i],
        teamIndex: i / 2,
        wins: parseInt(stats[0]),
        losses: parseInt(stats[1]),
        pct: parseFloat(stats[2]),
        offRating: parseFloat(stats[3]),
        defRating: parseFloat(stats[4]),
        overallRating: parseFloat(stats[5])
      });
    }
  }
  
  // Sort by winning percentage (descending), then by wins
  teams.sort((a, b) => {
    if (b.pct !== a.pct) return b.pct - a.pct;
    return b.wins - a.wins;
  });
  
  // Render table rows
  tbody.innerHTML = '';
  teams.forEach((team, index) => {
    const row = document.createElement('tr');
    const logo = teamImage[team.teamIndex];
    
    // Add separator classes
    let separatorClass = '';
    if (index === 5) {
      separatorClass = 'playoff-line';
    } else if (index === 9) {
      separatorClass = 'playin-line';
    }
    
    row.className = separatorClass;
    row.innerHTML = `
      <td>
        <div style="display: flex; align-items: center; gap: 8px;">
          <img src="${logo}" alt="${team.name}" style="width: 24px; height: 24px; object-fit: contain;" />
          <span>${team.name}</span>
        </div>
      </td>
      <td>${team.wins}</td>
      <td>${team.losses}</td>
      <td>${team.pct}</td>
      <td>${team.offRating.toFixed(3)}</td>
      <td>${team.defRating.toFixed(3)}</td>
      <td>${team.overallRating}</td>
    `;
    tbody.appendChild(row);
  });
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
  
  // Use the existing game generation algorithm
  const { homeScore, awayScore, wentToOT } = generateGameScoresByTeamNumber(homeIdx, awayIdx);
  
  // Apply the result to update team records
  applyGameResultToTeams(homeIdx, awayIdx, homeScore, awayScore, wentToOT);
  
  // Update UI
  renderStandings();
  
  // Get team names for display
  const homeTeamName = allTeams[homeIdx * 2];
  const awayTeamName = allTeams[awayIdx * 2];
  
  // Display result
  const homeLogo = teamImage[homeIdx];
  const awayLogo = teamImage[awayIdx];
  
  lastResult.classList.remove('hidden');
  lastResult.innerHTML = `
    <h4>Game Result${wentToOT ? ' (OT)' : ''}</h4>
    <div style="display: flex; justify-content: space-around; margin: 12px 0;">
      <div style="text-align: center;">
        <img src="${homeLogo}" alt="${homeTeamName}" style="width: 48px; height: 48px; object-fit: contain; margin-bottom: 8px;" />
        <div style="font-size: 18px; font-weight: 700;">${homeTeamName}</div>
        <div style="font-size: 32px; font-weight: 900; color: ${homeScore > awayScore ? 'var(--success)' : 'var(--muted)'};">${homeScore}</div>
      </div>
      <div style="align-self: center; font-size: 20px;">vs</div>
      <div style="text-align: center;">
        <img src="${awayLogo}" alt="${awayTeamName}" style="width: 48px; height: 48px; object-fit: contain; margin-bottom: 8px;" />
        <div style="font-size: 18px; font-weight: 700;">${awayTeamName}</div>
        <div style="font-size: 32px; font-weight: 900; color: ${awayScore > homeScore ? 'var(--success)' : 'var(--muted)'};">${awayScore}</div>
      </div>
    </div>
    <div style="text-align: center; color: var(--muted); margin-top: 8px;">
      ${homeScore > awayScore ? homeTeamName : awayTeamName} wins!
    </div>
  `;
}

/* -------------------------- Season simulation -------------------------- */
function startSeasonSim() {
  // Initialize matchup tracking
  const matchupCounts = initializeMatchupCounts();
  
  // Find the first matchup
  const firstMatchup = findNextMatchup(matchupCounts);
  
  if (!firstMatchup) {
    alert('All teams have already completed 82 games!');
    return;
  }
  
  // Calculate total games needed (each team plays 82 games, divide by 2 since each game involves 2 teams)
  const totalGamesInSeason = (getTeamCount() * 82) / 2;
  
  seasonRunState = {
    matchupCounts,
    currentMatchup: firstMatchup,
    gamesSimulated: 0,
    totalGamesInSeason,
    lastResult: null
  };
  
  seasonModal.classList.remove('hidden');
  renderSeasonGame();
}

function renderSeasonGame() {
  if (!seasonRunState) return;
  
  const { currentMatchup, gamesSimulated, totalGamesInSeason, lastResult } = seasonRunState;
  
  if (!currentMatchup) {
    // Season complete
    seasonTitle.textContent = 'Season Complete!';
    seasonGameCard.innerHTML = `
      <h4>All teams have reached 82 games!</h4>
      <p style="text-align: center; margin-top: 12px;">Total games simulated: ${gamesSimulated}</p>
    `;
    return;
  }
  
  const { homeIdx, awayIdx } = currentMatchup;
  const homeTeamName = allTeams[homeIdx * 2];
  const awayTeamName = allTeams[awayIdx * 2];
  const homeGamesPlayed = getTeamGamesPlayed(homeIdx);
  const awayGamesPlayed = getTeamGamesPlayed(awayIdx);
  
  seasonTitle.textContent = `Season Simulation - Game ${gamesSimulated + 1} of ${totalGamesInSeason}`;
  
  // If we just simulated a game, show the result
  if (lastResult) {
    const { homeScore, awayScore, wentToOT, homeTeamName: lastHomeName, awayTeamName: lastAwayName, homeIdx: lastHomeIdx, awayIdx: lastAwayIdx } = lastResult;
    const lastHomeLogo = teamImage[lastHomeIdx];
    const lastAwayLogo = teamImage[lastAwayIdx];
    
    seasonGameCard.innerHTML = `
      <h4>Last Game Result${wentToOT ? ' (OT)' : ''}</h4>
      <div style="display: flex; justify-content: space-around; margin: 12px 0;">
        <div style="text-align: center;">
          <img src="${lastHomeLogo}" alt="${lastHomeName}" style="width: 48px; height: 48px; object-fit: contain; margin-bottom: 8px;" />
          <div style="font-size: 18px; font-weight: 700;">${lastHomeName}</div>
          <div style="font-size: 32px; font-weight: 900; color: ${homeScore > awayScore ? 'var(--success)' : 'var(--muted)'};">${homeScore}</div>
        </div>
        <div style="align-self: center; font-size: 20px;">vs</div>
        <div style="text-align: center;">
          <img src="${lastAwayLogo}" alt="${lastAwayName}" style="width: 48px; height: 48px; object-fit: contain; margin-bottom: 8px;" />
          <div style="font-size: 18px; font-weight: 700;">${lastAwayName}</div>
          <div style="font-size: 32px; font-weight: 900; color: ${awayScore > homeScore ? 'var(--success)' : 'var(--muted)'};">${awayScore}</div>
        </div>
      </div>
      <div style="text-align: center; color: var(--muted); margin-top: 8px;">
        ${homeScore > awayScore ? lastHomeName : lastAwayName} wins!
      </div>
      <hr style="margin: 16px 0; border: none; border-top: 1px solid rgba(255,255,255,0.1);">
    `;
  } else {
    seasonGameCard.innerHTML = '';
  }
  
  // Show next game preview (without scores)
  const homeLogo = teamImage[homeIdx];
  const awayLogo = teamImage[awayIdx];
  
  seasonGameCard.innerHTML += `
    <h4>Next Game</h4>
    <div style="display: flex; justify-content: space-around; margin: 12px 0;">
      <div style="text-align: center;">
        <img src="${homeLogo}" alt="${homeTeamName}" style="width: 48px; height: 48px; object-fit: contain; margin-bottom: 8px;" />
        <div style="font-size: 18px; font-weight: 700;">${homeTeamName}</div>
        <div style="font-size: 14px; color: var(--muted);">${homeGamesPlayed} games played</div>
      </div>
      <div style="align-self: center; font-size: 20px;">vs</div>
      <div style="text-align: center;">
        <img src="${awayLogo}" alt="${awayTeamName}" style="width: 48px; height: 48px; object-fit: contain; margin-bottom: 8px;" />
        <div style="font-size: 18px; font-weight: 700;">${awayTeamName}</div>
        <div style="font-size: 14px; color: var(--muted);">${awayGamesPlayed} games played</div>
      </div>
    </div>
  `;
}

function continueSeasonGame() {
  if (!seasonRunState) return;
  
  const { currentMatchup, matchupCounts } = seasonRunState;
  
  if (!currentMatchup) {
    // Season already complete
    alert('Season is complete! All teams have reached 82 games.');
    seasonRunState = null;
    seasonModal.classList.add('hidden');
    renderStandings();
    return;
  }
  
  const { homeIdx, awayIdx } = currentMatchup;
  const homeTeamName = allTeams[homeIdx * 2];
  const awayTeamName = allTeams[awayIdx * 2];
  
  // Simulate and apply game
  const { homeScore, awayScore, wentToOT } = generateGameScoresByTeamNumber(homeIdx, awayIdx);
  applyGameResultToTeams(homeIdx, awayIdx, homeScore, awayScore, wentToOT);
  
  // Update matchup counts
  matchupCounts[homeIdx][awayIdx] = (matchupCounts[homeIdx][awayIdx] || 0) + 1;
  matchupCounts[awayIdx][homeIdx] = (matchupCounts[awayIdx][homeIdx] || 0) + 1;
  
  // Store the result for display
  seasonRunState.lastResult = {
    homeScore,
    awayScore,
    wentToOT,
    homeTeamName,
    awayTeamName,
    homeIdx,
    awayIdx
  };
  
  // Increment games simulated
  seasonRunState.gamesSimulated++;
  
  // Find next matchup
  const nextMatchup = findNextMatchup(matchupCounts);
  seasonRunState.currentMatchup = nextMatchup;
  
  // Render next game or completion screen
  setTimeout(() => {
    if (!nextMatchup) {
      // Season complete
      alert(`Season complete! Simulated ${seasonRunState.gamesSimulated} games. All teams have reached 82 games.`);
      renderStandings();
    }
    renderSeasonGame();
  }, 500);
}

function showStandingsModal() {
  renderConferenceStandings(modalEasternStandingsBody, 'E');
  renderConferenceStandings(modalWesternStandingsBody, 'W');
  standingsModal.classList.remove('hidden');
}

function endSeasonSim() {
  seasonRunState = null;
  seasonModal.classList.add('hidden');
  renderStandings();
}

/* -------------------------- Event listeners -------------------------- */
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
  saveAllTeamsToLocal();
  alert('Progress saved successfully!');
});

resetSeason.addEventListener('click', () => {
  if (confirm('Are you sure you want to reset the season? All team records and ratings will be reset.')) {
    // Reset all teams with new random ratings
    allTeams = JSON.parse(JSON.stringify(defaultAllTeams));
    determineTeamStrength();
    renderStandings();
    updateTeamSelects();
    lastResult.classList.add('hidden');
    alert('Season reset successfully!');
  }
});

/* -------------------------- Initialize on page load -------------------------- */
(function initApp() {
  // Initialize allTeams - load from storage or create fresh with ratings
  const loaded = loadAllTeamsFromLocal();
  if (!loaded) {
    allTeams = JSON.parse(JSON.stringify(defaultAllTeams));
    determineTeamStrength();
  }
  
  // Populate UI
  updateTeamSelects();
  renderStandings();
  
  // Hide modals on page load
  seasonModal.classList.add('hidden');
  standingsModal.classList.add('hidden');
})();
