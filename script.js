/* script.js — Rewritten for redesigned UI
   - Works with new HTML structure (panels, modals, select dropdowns)
   - Preserves original simulation logic and team data
   - Removes references to non-existent old HTML elements
*/

/* -------------------------- Team Data & Constants -------------------------- */
let allTeams = [];
let defaultAllTeams = [
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

let currentUser = null;
const ALL_TEAMS_KEY = "allTeams";

/* -------------------------- LocalStorage Helpers -------------------------- */
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

/* -------------------------- Team Strength Assignment -------------------------- */
function determineTeamStrength() {
  const values = [];
  for (let i = -15; i <= 15; i++) {
    if (i !== 0) values.push(i / 2);
  }

  // Shuffle values
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]];
  }

  // Assign team strength
  for (let i = 0; i < allTeams.length; i += 2) {
    const stats = allTeams[i + 1];
    const strength = values[i / 2];
    stats[5] = strength;

    const normalized = (strength + 7.5) / 15;
    const offense = 1.0 + (Math.random() * 0.1 - 0.05) + (normalized - 0.5) * 0.2;
    const defense = 1.0 - (Math.random() * 0.1 - 0.05) - (normalized - 0.5) * 0.2;

    stats[3] = parseFloat(offense.toFixed(3));
    stats[4] = parseFloat(defense.toFixed(3));
  }

  saveAllTeamsToLocal();
}

/* -------------------------- Game Simulation Logic -------------------------- */
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

function applyGameResultToTeams(homeTeamNum, awayTeamNum, homeScore, awayScore) {
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

  saveAllTeamsToLocal();
}

/* -------------------------- UI Management -------------------------- */
function renderTeamsList() {
  const teamsList = document.getElementById('teamsList');
  if (!teamsList) return;

  teamsList.innerHTML = '';
  
  for (let i = 0; i < allTeams.length; i += 2) {
    const teamName = allTeams[i];
    const stats = allTeams[i + 1];
    const teamNum = i / 2;

    const li = document.createElement('li');
    li.className = 'team-item';
    
    const infoDiv = document.createElement('div');
    const nameSpan = document.createElement('div');
    nameSpan.className = 'team-name';
    nameSpan.textContent = teamName;
    
    const metaSpan = document.createElement('div');
    metaSpan.className = 'team-meta';
    metaSpan.textContent = `${stats[0]}-${stats[1]} (${stats[2]}) | Rating: ${stats[5]}`;
    
    infoDiv.appendChild(nameSpan);
    infoDiv.appendChild(metaSpan);
    
    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn danger';
    removeBtn.textContent = 'Remove';
    removeBtn.style.padding = '4px 8px';
    removeBtn.style.fontSize = '12px';
    removeBtn.onclick = () => removeTeam(teamNum);
    
    li.appendChild(infoDiv);
    li.appendChild(removeBtn);
    teamsList.appendChild(li);
  }

  updateTeamSelects();
}

function updateTeamSelects() {
  const teamASelect = document.getElementById('teamASelect');
  const teamBSelect = document.getElementById('teamBSelect');
  
  if (!teamASelect || !teamBSelect) return;

  const currentA = teamASelect.value;
  const currentB = teamBSelect.value;

  teamASelect.innerHTML = '<option value="">-- Select Home Team --</option>';
  teamBSelect.innerHTML = '<option value="">-- Select Away Team --</option>';

  for (let i = 0; i < allTeams.length; i += 2) {
    const teamName = allTeams[i];
    const teamNum = i / 2;

    const optionA = document.createElement('option');
    optionA.value = teamNum;
    optionA.textContent = teamName;
    teamASelect.appendChild(optionA);

    const optionB = document.createElement('option');
    optionB.value = teamNum;
    optionB.textContent = teamName;
    teamBSelect.appendChild(optionB);
  }

  if (currentA !== null) teamASelect.value = currentA;
  if (currentB !== null) teamBSelect.value = currentB;
}

function addTeam(name, rating) {
  // Check if team already exists
  for (let i = 0; i < allTeams.length; i += 2) {
    if (allTeams[i].toLowerCase() === name.toLowerCase()) {
      return false;
    }
  }

  const stats = ["0", "0", ".000", "1.0", "1.0", rating.toString()];
  allTeams.push(name, stats);
  
  saveAllTeamsToLocal();
  renderTeamsList();
  updateStandings();
  return true;
}

function removeTeam(teamNum) {
  const index = teamNum * 2;
  allTeams.splice(index, 2);
  
  saveAllTeamsToLocal();
  renderTeamsList();
  updateStandings();
}

/* -------------------------- Standings Display -------------------------- */
function updateStandings() {
  const standingsList = document.getElementById('standingsList');
  if (!standingsList) return;

  if (allTeams.length === 0) {
    standingsList.innerHTML = '<div style="color: var(--muted); padding: 12px; text-align: center;">No teams added yet</div>';
    return;
  }

  const teams = [];
  for (let i = 0; i < allTeams.length; i += 2) {
    const name = allTeams[i];
    const stats = allTeams[i + 1];
    teams.push({
      name,
      wins: parseInt(stats[0]),
      losses: parseInt(stats[1]),
      winPct: parseFloat(stats[2]),
      rating: parseFloat(stats[5])
    });
  }

  teams.sort((a, b) => b.winPct - a.winPct || b.wins - a.wins);

  let html = '';
  teams.forEach((team, index) => {
    html += `
      <div class="standings-row">
        <div><strong>${index + 1}. ${team.name}</strong></div>
        <div style="color: var(--muted)">${team.wins}-${team.losses} (${team.winPct.toFixed(3)})</div>
      </div>
    `;
  });

  standingsList.innerHTML = html;
}

function showStandingsModal() {
  const modal = document.getElementById('standingsModal');
  const modalList = document.getElementById('modalStandingsList');
  
  if (!modal || !modalList) return;

  if (allTeams.length === 0) {
    modalList.innerHTML = '<div style="color: var(--muted); padding: 12px; text-align: center;">No teams added yet</div>';
  } else {
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

    let html = '';
    
    if (eastStandings.length > 0) {
      html += '<h4 style="margin-top: 0;">Eastern Conference</h4>';
      eastStandings.forEach((team, i) => {
        html += `
          <div class="standings-row">
            <div><strong>${i + 1}. ${team.name}</strong></div>
            <div style="color: var(--muted)">${team.wins}-${team.losses} (${team.winPct.toFixed(3)})</div>
          </div>
        `;
      });
    }

    if (westStandings.length > 0) {
      html += '<h4 style="margin-top: 16px;">Western Conference</h4>';
      westStandings.forEach((team, i) => {
        html += `
          <div class="standings-row">
            <div><strong>${i + 1}. ${team.name}</strong></div>
            <div style="color: var(--muted)">${team.wins}-${team.losses} (${team.winPct.toFixed(3)})</div>
          </div>
        `;
      });
    }

    modalList.innerHTML = html;
  }

  modal.classList.remove('hidden');
}

function hideStandingsModal() {
  const modal = document.getElementById('standingsModal');
  if (modal) modal.classList.add('hidden');
}

/* -------------------------- Game Simulation -------------------------- */
function simulateGame() {
  const teamASelect = document.getElementById('teamASelect');
  const teamBSelect = document.getElementById('teamBSelect');
  const lastResult = document.getElementById('lastResult');

  if (!teamASelect || !teamBSelect || !lastResult) return;

  const homeTeamNum = parseInt(teamASelect.value);
  const awayTeamNum = parseInt(teamBSelect.value);

  if (isNaN(homeTeamNum) || isNaN(awayTeamNum)) {
    lastResult.innerHTML = '<div style="color: var(--danger);">Please select both teams</div>';
    lastResult.classList.remove('hidden');
    return;
  }

  if (homeTeamNum === awayTeamNum) {
    lastResult.innerHTML = '<div style="color: var(--danger);">Please select two different teams</div>';
    lastResult.classList.remove('hidden');
    return;
  }

  const result = generateGameScoresByTeamNumber(homeTeamNum, awayTeamNum);
  applyGameResultToTeams(homeTeamNum, awayTeamNum, result.homeScore, result.awayScore);

  const homeTeamName = allTeams[homeTeamNum * 2];
  const awayTeamName = allTeams[awayTeamNum * 2];
  const winner = result.homeScore > result.awayScore ? homeTeamName : awayTeamName;
  const otText = result.wentToOT ? ' (OT)' : '';

  lastResult.innerHTML = `
    <div style="text-align: center;">
      <h3 style="margin: 0 0 8px 0;">Final Score${otText}</h3>
      <div style="display: flex; justify-content: space-around; align-items: center; margin: 12px 0;">
        <div>
          <div style="font-weight: 700; font-size: 16px;">${homeTeamName}</div>
          <div style="font-size: 32px; font-weight: 900; color: ${result.homeScore > result.awayScore ? 'var(--success)' : 'var(--muted)'};">${result.homeScore}</div>
        </div>
        <div style="font-size: 24px; color: var(--muted);">-</div>
        <div>
          <div style="font-weight: 700; font-size: 16px;">${awayTeamName}</div>
          <div style="font-size: 32px; font-weight: 900; color: ${result.awayScore > result.homeScore ? 'var(--success)' : 'var(--muted)'};">${result.awayScore}</div>
        </div>
      </div>
      <div style="margin-top: 8px; color: var(--muted);">${winner} wins!</div>
    </div>
  `;
  lastResult.classList.remove('hidden');

  updateStandings();
}

/* -------------------------- Season Simulation -------------------------- */
let seasonRunState = null;

function startSeasonSimulation() {
  const teamASelect = document.getElementById('teamASelect');
  const teamBSelect = document.getElementById('teamBSelect');

  if (!teamASelect || !teamBSelect) return;

  const homeTeamNum = parseInt(teamASelect.value);
  const awayTeamNum = parseInt(teamBSelect.value);

  if (isNaN(homeTeamNum) || isNaN(awayTeamNum)) {
    showSeasonModal('Please select both teams', '', false);
    return;
  }

  if (homeTeamNum === awayTeamNum) {
    showSeasonModal('Please select two different teams', '', false);
    return;
  }

  seasonRunState = {
    homeTeamNum,
    awayTeamNum,
    currentGame: 0,
    totalGames: 82,
    isRunning: true
  };

  simulateNextSeasonGame();
}

function simulateNextSeasonGame() {
  if (!seasonRunState || !seasonRunState.isRunning) return;

  seasonRunState.currentGame++;

  const result = generateGameScoresByTeamNumber(seasonRunState.homeTeamNum, seasonRunState.awayTeamNum);
  applyGameResultToTeams(seasonRunState.homeTeamNum, seasonRunState.awayTeamNum, result.homeScore, result.awayScore);

  const homeTeamName = allTeams[seasonRunState.homeTeamNum * 2];
  const awayTeamName = allTeams[seasonRunState.awayTeamNum * 2];
  const winner = result.homeScore > result.awayScore ? homeTeamName : awayTeamName;
  const otText = result.wentToOT ? ' (OT)' : '';

  const title = `Game ${seasonRunState.currentGame} of ${seasonRunState.totalGames}`;
  const body = `
    <div style="display: flex; justify-content: space-around; align-items: center; margin: 12px 0;">
      <div>
        <div style="font-weight: 700;">${homeTeamName}</div>
        <div style="font-size: 28px; font-weight: 900; color: ${result.homeScore > result.awayScore ? 'var(--success)' : 'var(--muted)'};">${result.homeScore}</div>
      </div>
      <div style="font-size: 20px; color: var(--muted);">-</div>
      <div>
        <div style="font-weight: 700;">${awayTeamName}</div>
        <div style="font-size: 28px; font-weight: 900; color: ${result.awayScore > result.homeScore ? 'var(--success)' : 'var(--muted)'};">${result.awayScore}</div>
      </div>
    </div>
    <div style="margin-top: 8px; color: var(--muted);">${winner} wins${otText}</div>
  `;

  const isLastGame = seasonRunState.currentGame >= seasonRunState.totalGames;
  showSeasonModal(title, body, !isLastGame);

  if (isLastGame) {
    seasonRunState.isRunning = false;
  }

  updateStandings();
}

function showSeasonModal(title, body, showContinue) {
  const modal = document.getElementById('seasonModal');
  const titleEl = document.getElementById('seasonTitle');
  const gameCard = document.getElementById('seasonGameCard');
  const continueBtn = document.getElementById('seasonContinue');

  if (!modal || !titleEl || !gameCard || !continueBtn) return;

  titleEl.textContent = title;
  gameCard.innerHTML = body;
  
  if (showContinue) {
    continueBtn.style.display = 'inline-block';
  } else {
    continueBtn.style.display = 'none';
  }

  modal.classList.remove('hidden');
}

function hideSeasonModal() {
  const modal = document.getElementById('seasonModal');
  if (modal) modal.classList.add('hidden');
  seasonRunState = null;
}

function showSeasonStandings() {
  showStandingsModal();
}

/* -------------------------- Save/Load User Data -------------------------- */
function saveUserData() {
  if (!currentUser) {
    // Anonymous save
    saveAllTeamsToLocal();
    showNotification('Progress saved locally!');
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  let userIndex = users.findIndex(u => u.username === currentUser);

  if (userIndex !== -1) {
    users[userIndex].teamData = allTeams;
    localStorage.setItem("users", JSON.stringify(users));
    saveAllTeamsToLocal();
    showNotification('User data saved!');
  } else {
    showNotification('User not found');
  }
}

function loadUserData() {
  const username = prompt('Enter username to load:');
  if (!username) return;

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  let user = users.find(u => u.username === username);

  if (user) {
    allTeams = user.teamData || JSON.parse(JSON.stringify(defaultAllTeams));
    currentUser = username;
    saveAllTeamsToLocal();
    renderTeamsList();
    updateStandings();
    showNotification(`Loaded data for ${username}`);
  } else {
    // Create new user
    const createNew = confirm(`User "${username}" not found. Create new user?`);
    if (createNew) {
      currentUser = username;
      allTeams = JSON.parse(JSON.stringify(defaultAllTeams));
      determineTeamStrength();
      
      users.push({
        username: username,
        password: '',
        teamData: allTeams
      });
      localStorage.setItem("users", JSON.stringify(users));
      
      renderTeamsList();
      updateStandings();
      showNotification(`Created new user: ${username}`);
    }
  }
}

function showNotification(message) {
  // Simple notification - could be enhanced
  const notif = document.createElement('div');
  notif.style.position = 'fixed';
  notif.style.top = '20px';
  notif.style.right = '20px';
  notif.style.background = 'var(--accent)';
  notif.style.color = 'white';
  notif.style.padding = '12px 20px';
  notif.style.borderRadius = '8px';
  notif.style.zIndex = '1000';
  notif.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
  notif.textContent = message;
  
  document.body.appendChild(notif);
  
  setTimeout(() => {
    notif.style.transition = 'opacity 0.3s';
    notif.style.opacity = '0';
    setTimeout(() => notif.remove(), 300);
  }, 2000);
}

/* -------------------------- Event Listeners -------------------------- */
function initializeApp() {
  // Load teams from localStorage or use defaults
  const loaded = loadAllTeamsFromLocal();
  if (!loaded) {
    allTeams = JSON.parse(JSON.stringify(defaultAllTeams));
    determineTeamStrength();
  }

  renderTeamsList();
  updateStandings();

  // Add Team Form
  const addTeamForm = document.getElementById('addTeamForm');
  if (addTeamForm) {
    addTeamForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('teamNameInput');
      const ratingInput = document.getElementById('teamRatingInput');
      
      const name = nameInput.value.trim();
      const rating = parseInt(ratingInput.value) || 100;

      if (!name) return;

      const success = addTeam(name, rating);
      if (success) {
        nameInput.value = '';
        ratingInput.value = '100';
      } else {
        showNotification('Team already exists!');
      }
    });
  }

  // Simulate Game Button
  const simulateBtn = document.getElementById('simulateBtn');
  if (simulateBtn) {
    simulateBtn.addEventListener('click', simulateGame);
  }

  // Simulate Season Button
  const simulateSeasonBtn = document.getElementById('simulateSeasonBtn');
  if (simulateSeasonBtn) {
    simulateSeasonBtn.addEventListener('click', startSeasonSimulation);
  }

  // Save User Button
  const saveUserBtn = document.getElementById('saveUser');
  if (saveUserBtn) {
    saveUserBtn.addEventListener('click', saveUserData);
  }

  // Load User Button
  const loadUserBtn = document.getElementById('loadUser');
  if (loadUserBtn) {
    loadUserBtn.addEventListener('click', loadUserData);
  }

  // Season Modal Controls
  const seasonContinue = document.getElementById('seasonContinue');
  if (seasonContinue) {
    seasonContinue.addEventListener('click', simulateNextSeasonGame);
  }

  const seasonStandings = document.getElementById('seasonStandings');
  if (seasonStandings) {
    seasonStandings.addEventListener('click', showSeasonStandings);
  }

  const seasonEnd = document.getElementById('seasonEnd');
  if (seasonEnd) {
    seasonEnd.addEventListener('click', hideSeasonModal);
  }

  const seasonClose = document.getElementById('seasonClose');
  if (seasonClose) {
    seasonClose.addEventListener('click', hideSeasonModal);
  }

  // Standings Modal Controls
  const standingsClose = document.getElementById('standingsClose');
  if (standingsClose) {
    standingsClose.addEventListener('click', hideStandingsModal);
  }

  const closeStandingsBtn = document.getElementById('closeStandingsBtn');
  if (closeStandingsBtn) {
    closeStandingsBtn.addEventListener('click', hideStandingsModal);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
