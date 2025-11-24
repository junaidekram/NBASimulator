// NBA Simulator — redesigned
const LOCAL_KEY = 'nbasim_teams'

let teams = []
let seasonState = null // {teamAIdx, teamBIdx, currentGame, totalGames}

// DOM refs
const teamsList = document.getElementById('teamsList')
const teamASelect = document.getElementById('teamASelect')
const teamBSelect = document.getElementById('teamBSelect')
const addTeamForm = document.getElementById('addTeamForm')
const teamNameInput = document.getElementById('teamNameInput')
const teamRatingInput = document.getElementById('teamRatingInput')
const saveUserBtn = document.getElementById('saveUser')
const loadUserBtn = document.getElementById('loadUser')
const simulateBtn = document.getElementById('simulateBtn')
const simulateSeasonBtn = document.getElementById('simulateSeasonBtn')
const lastResult = document.getElementById('lastResult')
const standingsList = document.getElementById('standingsList')

// Modals
const seasonModal = document.getElementById('seasonModal')
const seasonClose = document.getElementById('seasonClose')
const seasonTitle = document.getElementById('seasonTitle')
const seasonGameCard = document.getElementById('seasonGameCard')
const seasonContinue = document.getElementById('seasonContinue')
const seasonEnd = document.getElementById('seasonEnd')
const seasonStandings = document.getElementById('seasonStandings')

const standingsModal = document.getElementById('standingsModal')
const modalStandingsList = document.getElementById('modalStandingsList')
const standingsClose = document.getElementById('standingsClose')
const closeStandingsBtn = document.getElementById('closeStandingsBtn')

function sampleTeams(){
  return [
    {name:'Lakers',rating:110,wins:0,losses:0},
    {name:'Bulls',rating:102,wins:0,losses:0},
    {name:'Heat',rating:105,wins:0,losses:0},
    {name:'Celtics',rating:108,wins:0,losses:0}
  ]
}

function saveTeams(){
  try{
    localStorage.setItem(LOCAL_KEY, JSON.stringify(teams))
    showToast('Teams saved to localStorage')
  }catch(e){
    console.error('save failed',e)
    showToast('Save failed',true)
  }
}

function loadTeams(){
  try{
    const raw = localStorage.getItem(LOCAL_KEY)
    if(!raw) return false
    teams = JSON.parse(raw)
    // ensure numbers
    teams.forEach(t=>{t.rating = Number(t.rating)||100; t.wins = Number(t.wins)||0; t.losses = Number(t.losses)||0})
    renderAll()
    showToast('Teams loaded from localStorage')
    return true
  }catch(e){
    console.error('load failed',e)
    showToast('Load failed',true)
    return false
  }
}

function showToast(msg, isError){
  lastResult.classList.remove('hidden')
  lastResult.innerHTML = `<strong>${isError? 'Error' : 'Info'}:</strong> ${msg}`
  setTimeout(()=>{ lastResult.classList.add('hidden') }, 2400)
}

function addTeam(name, rating){
  teams.push({name, rating: Number(rating)||100, wins:0, losses:0})
  renderAll()
}

function removeTeam(index){
  teams.splice(index,1)
  renderAll()
}

function renderAll(){
  // teams list
  teamsList.innerHTML = ''
  teams.forEach((t,i)=>{
    const li = document.createElement('li')
    li.className = 'team-item'
    li.innerHTML = `<div>
      <div class="team-name">${escapeHtml(t.name)}</div>
      <div class="team-meta">Rating: ${t.rating} — Record: ${t.wins}-${t.losses}</div>
    </div>
    <div style="display:flex;gap:8px;align-items:center">
      <button class="btn" onclick="editTeam(${i})">Edit</button>
      <button class="btn danger" onclick="removeTeam(${i})">Delete</button>
    </div>`
    teamsList.appendChild(li)
  })
  populateTeamSelects()
  renderStandings()
}

function populateTeamSelects(){
  [teamASelect, teamBSelect].forEach(sel=>{
    sel.innerHTML = ''
    teams.forEach((t,i)=>{
      const opt = document.createElement('option')
      opt.value = i
      opt.textContent = t.name
      sel.appendChild(opt)
    })
  })
}

function renderStandings(){
  // sort copy
  const sorted = [...teams].sort((a,b)=> (b.wins - a.wins) || (b.rating - a.rating))
  standingsList.innerHTML = ''
  sorted.forEach((t)=>{
    const row = document.createElement('div')
    row.className = 'standings-row'
    row.innerHTML = `<div>${escapeHtml(t.name)}</div><div>${t.wins}-${t.losses}</div>`
    standingsList.appendChild(row)
  })
}

function renderModalStandings(){
  const sorted = [...teams].sort((a,b)=> (b.wins - a.wins) || (b.rating - a.rating))
  modalStandingsList.innerHTML = ''
  sorted.forEach(t=>{
    const r = document.createElement('div')
    r.className = 'standings-row'
    r.innerHTML = `<div>${escapeHtml(t.name)}</div><div>${t.wins}-${t.losses}</div>`
    modalStandingsList.appendChild(r)
  })
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, c=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]))
}

// Editing support (simple prompt)
function editTeam(idx){
  const t = teams[idx]
  const newName = prompt('Team name', t.name)
  if(newName==null) return
  const newRating = prompt('Rating (50-150)', t.rating)
  if(newRating==null) return
  t.name = newName.trim() || t.name
  t.rating = Number(newRating) || t.rating
  renderAll()
}

// Scores generator
function generateScores(teamA, teamB){
  // Base on rating and randomness
  const aPow = Math.pow(teamA.rating, 1)
  const bPow = Math.pow(teamB.rating, 1)
  const total = aPow + bPow
  // Expected points mean
  const meanA = 90 + (aPow/total)*20 + (Math.random()*10 - 5)
  const meanB = 90 + (bPow/total)*20 + (Math.random()*10 - 5)
  // Random variance
  const aScore = Math.round(Math.max(60, meanA + (Math.random()*30 - 15)))
  const bScore = Math.round(Math.max(60, meanB + (Math.random()*30 - 15)))
  return {aScore,bScore}
}

function simulateOnce(idxA, idxB){
  const teamA = teams[idxA]
  const teamB = teams[idxB]
  let {aScore,bScore} = generateScores(teamA, teamB)
  // handle tie with a simple random overtime
  if(aScore === bScore){
    if(Math.random()>0.5){ aScore = aScore + 1 } else { bScore = bScore + 1 }
  }
  let winner = null
  if(aScore > bScore){
    teamA.wins++
    teamB.losses++
    winner = teamA.name
  } else {
    teamB.wins++
    teamA.losses++
    winner = teamB.name
  }
  saveTeamsToState()
  return {teamA,teamB,aScore,bScore,winner}
}

function saveTeamsToState(){
  // Intentionally empty: teams are kept in memory.
  // Save to localStorage only on explicit Save User click.
}

// UI handlers
addTeamForm.addEventListener('submit', e=>{
  e.preventDefault()
  const name = teamNameInput.value.trim()
  const rating = Number(teamRatingInput.value) || 100
  if(!name) return
  addTeam(name,rating)
  teamNameInput.value = ''
})

saveUserBtn.addEventListener('click', ()=>{
  saveTeams()
})

loadUserBtn.addEventListener('click', ()=>{
  const ok = loadTeams()
  if(!ok) showToast('No saved teams found', true)
})

simulateBtn.addEventListener('click', ()=>{
  if(teams.length < 2) return showToast('Add at least two teams', true)
  const idxA = Number(teamASelect.value)
  const idxB = Number(teamBSelect.value)
  if(idxA === idxB) return showToast('Pick two different teams', true)
  const res = simulateOnce(idxA, idxB)
  lastResult.classList.remove('hidden')
  lastResult.innerHTML = `<div style="font-weight:800;">${escapeHtml(res.teamA.name)} ${res.aScore} — ${res.bScore} ${escapeHtml(res.teamB.name)}</div>
  <div style="margin-top:6px;color:var(--muted)">${escapeHtml(res.winner)} wins!</div>`
  renderAll()
})

simulateSeasonBtn.addEventListener('click', ()=>{
  if(teams.length < 2) return showToast('Add at least two teams', true)
  const idxA = Number(teamASelect.value)
  const idxB = Number(teamBSelect.value)
  if(idxA === idxB) return showToast('Pick two different teams', true)
  // initialize season state
  seasonState = {teamAIdx: idxA, teamBIdx: idxB, currentGame: 1, totalGames: 82}
  openSeasonModal()
  renderSeasonGame()
})

function openSeasonModal(){
  seasonModal.classList.remove('hidden')
  seasonTitle.textContent = `Season: ${teams[seasonState.teamAIdx].name} vs ${teams[seasonState.teamBIdx].name} — Game ${seasonState.currentGame}/${seasonState.totalGames}`
}

function closeSeasonModal(){
  seasonModal.classList.add('hidden')
  seasonState = null
  // reset Continue button state
  seasonContinue.disabled = false
  seasonContinue.textContent = 'Continue'
}

function renderSeasonGame(){
  const idxA = seasonState.teamAIdx
  const idxB = seasonState.teamBIdx
  const preview = generateScores(teams[idxA], teams[idxB])
  // Do not apply yet - preview display
  seasonGameCard.innerHTML = `<div style="font-weight:800">Game ${seasonState.currentGame} / ${seasonState.totalGames}</div>
    <div style="margin-top:6px">${escapeHtml(teams[idxA].name)} ${preview.aScore} — ${preview.bScore} ${escapeHtml(teams[idxB].name)}</div>
    <div style="margin-top:8px;color:var(--muted)">${preview.aScore>preview.bScore? escapeHtml(teams[idxA].name) + ' leads' : escapeHtml(teams[idxB].name) + ' leads'}</div>`
  seasonTitle.textContent = `Season: ${teams[idxA].name} vs ${teams[idxB].name} — Game ${seasonState.currentGame}/${seasonState.totalGames}`
}

seasonContinue.addEventListener('click', ()=>{
  if(!seasonState) return
  const result = simulateOnce(seasonState.teamAIdx, seasonState.teamBIdx)
  // update modal card to show actual result
  seasonGameCard.innerHTML = `<div style="font-weight:900">Game ${seasonState.currentGame} / ${seasonState.totalGames}</div>
    <div style="margin-top:6px">${escapeHtml(result.teamA.name)} ${result.aScore} — ${result.bScore} ${escapeHtml(result.teamB.name)}</div>
    <div style="margin-top:8px;color:var(--muted)">${escapeHtml(result.winner)} wins!</div>`
  renderAll()
  // advance
  if(seasonState.currentGame >= seasonState.totalGames){
    seasonContinue.disabled = true
    seasonContinue.textContent = 'Completed'
    seasonTitle.textContent = `Season completed — ${seasonState.totalGames} games`;
  } else {
    seasonState.currentGame++
    // small delay for preview update when continuing
    setTimeout(()=>{
      renderSeasonGame()
    }, 250)
  }
})

seasonEnd.addEventListener('click', ()=>{
  closeSeasonModal()
})

seasonStandings.addEventListener('click', ()=>{
  renderModalStandings()
  standingsModal.classList.remove('hidden')
})

seasonClose.addEventListener('click', ()=> closeSeasonModal())
standingsClose.addEventListener('click', ()=> standingsModal.classList.add('hidden'))
closeStandingsBtn.addEventListener('click', ()=> standingsModal.classList.add('hidden'))

// initial load
(function init(){
  const ok = loadTeams()
  if(!ok){
    teams = sampleTeams()
    renderAll()
  }
})()

// expose some functions for inline handlers
window.removeTeam = removeTeam
window.editTeam = editTeam
