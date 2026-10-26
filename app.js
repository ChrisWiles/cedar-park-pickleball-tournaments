const eventList = document.querySelector('#event-list');
const bestMatches = document.querySelector('#best-matches');
const bestList = document.querySelector('#best-list');
const resultCount = document.querySelector('#result-count');
const emptyState = document.querySelector('#empty');
const playControl = document.querySelector('#play');
const skillControl = document.querySelector('#skill');
const travelControl = document.querySelector('#travel');
const dateControl = document.querySelector('#date-range');
const searchControl = document.querySelector('#search');
const sortControl = document.querySelector('#sort');
const duprControl = document.querySelector('#dupr-only');
const teamFilterControl = document.querySelector('#team-filter');
const compactLayout = window.matchMedia('(max-width: 760px)');

const today = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit'
}).format(new Date());

const defaults = {
  view: 'tournaments', play: 'all', skill: 'all', travel: 'local',
  date: 'all', sort: 'date', dupr: false, query: '', teamFilter: 'all'
};

const state = {...defaults};
const plays = ['women', 'mixed', 'men'];
const allowed = {
  view: ['tournaments', 'team', 'recurring'],
  play: ['all', ...plays],
  skill: ['all', '30', '35', '40', '45'],
  travel: ['local', 'twoHour', 'all'],
  date: ['all', '30', '60'],
  sort: ['date', 'distance', 'price', 'deadline'],
  teamFilter: ['all', 'local', 'travel', 'recurring']
};

const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

function addDays(dateString, days) {
  const date = new Date(`${dateString}T12:00:00`);
  date.setDate(date.getDate() + days);
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(date);
}

function inferMen30(event) {
  const details = (event.menDetails || '').toLowerCase();
  return event.men === true && (
    /\b3\.0\b/.test(details) ||
    /beginner/.test(details) ||
    /under[- ]?6/.test(details) ||
    /combined[^.]{0,40}\b6(?:\.0)?\b/.test(details) ||
    (/\b2\.5\b/.test(details) && /\b(?:4\.5|5\.0)\b/.test(details))
  );
}

function hasDivision(event, play, skill) {
  const key = `${play}${skill}`;
  if (Object.prototype.hasOwnProperty.call(event, key)) return event[key] === true;
  if (play === 'men' && skill === '30') return inferMen30(event);
  return false;
}

function matchesDivision(event) {
  if (state.play === 'all' && state.skill === 'all') return true;
  if (state.skill === 'all') return event[state.play] === true;
  if (state.play === 'all') return plays.some(play => hasDivision(event, play, state.skill));
  return hasDivision(event, state.play, state.skill);
}

function matchesTravel(event) {
  if (state.travel === 'local') return Number.isFinite(event.distanceMiles) && event.distanceMiles <= 40;
  if (state.travel === 'twoHour') return Number.isFinite(event.driveMinutes) && event.driveMinutes <= 120;
  return true;
}

function matchesDate(event) {
  if (event.end < today) return false;
  if (state.date === 'all') return true;
  return event.date <= addDays(today, Number(state.date));
}

function matchingEvents() {
  const query = state.query.trim().toLowerCase();
  const events = tournaments.filter(event => (
    matchesDivision(event) &&
    matchesTravel(event) &&
    matchesDate(event) &&
    (!state.dupr || event.dupr === true) &&
    (!query || Object.values(event).join(' ').toLowerCase().includes(query))
  ));

  return events.sort((a, b) => {
    if (state.sort === 'distance') return (a.distanceMiles ?? Infinity) - (b.distanceMiles ?? Infinity) || a.date.localeCompare(b.date);
    if (state.sort === 'price') return (a.price ?? Infinity) - (b.price ?? Infinity) || a.date.localeCompare(b.date);
    if (state.sort === 'deadline') return (a.deadlineDate || '9999').localeCompare(b.deadlineDate || '9999') || a.date.localeCompare(b.date);
    return a.date.localeCompare(b.date);
  });
}

function fitInfo(event) {
  if (state.play === 'all' && state.skill === 'all') return {label: 'Multiple divisions', kind: 'neutral'};
  if (state.skill === 'all') {
    const label = state.play === 'women' ? 'Women’s divisions' : state.play === 'mixed' ? 'Mixed divisions' : 'Men’s divisions';
    return {label, kind: 'neutral'};
  }

  const matchedPlays = state.play === 'all'
    ? plays.filter(play => hasDivision(event, play, state.skill))
    : [state.play];
  const details = matchedPlays.map(play => event[`${play}Details`] || '').join(' ').toLowerCase();
  const combined = /combined|under[- ]?\d|team cap|rating cap|aggregate|\bband\b|dupr-\d/.test(details);
  if (combined) return {label: 'Compatible combined bracket', kind: 'compatible'};

  const skill = `${state.skill[0]}.${state.skill[1]}`;
  if (matchedPlays.length > 1) return {label: `Published ${skill} fit`, kind: 'exact'};
  const play = matchedPlays[0] === 'women' ? 'women’s' : matchedPlays[0] === 'mixed' ? 'mixed' : 'men’s';
  return {label: `Exact ${play} ${skill}`, kind: 'exact'};
}

function guaranteeLabel(event) {
  const text = `${event.format || ''} ${event.summary || ''}`.toLowerCase();
  const words = {three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8};
  const match = text.match(/(?:at least|min(?:imum)?(?: of)?|guarantees?)?\s*(three|four|five|six|seven|eight|\d+)\s+(?:played\s+)?(?:games|matches)/);
  if (!match) return 'Check format';
  const value = words[match[1]] || Number(match[1]);
  const approximate = /at least|min(?:imum)?|guarantee/.test(match[0]);
  return `${value}${approximate ? '+' : ''} games`;
}

function duprInfo(event) {
  if (event.dupr === true) return {label: 'Confirmed', className: 'confirmed'};
  if (event.dupr === false) return {label: 'Not recorded', className: 'not-recorded'};
  return {label: 'Unconfirmed', className: 'unconfirmed'};
}

function deadlineInfo(event) {
  if (today > event.deadlineDate) return {label: 'Deadline passed', className: 'urgent'};
  const days = Math.round((new Date(`${event.deadlineDate}T12:00:00`) - new Date(`${today}T12:00:00`)) / 86400000);
  return {
    label: event.deadlineLabel.replace(/^Register by\s+/i, ''),
    className: days <= 7 ? 'urgent' : ''
  };
}

function dateMarkup(event) {
  return `<span class="date-month">${escapeHtml(event.month)}</span><strong>${escapeHtml(event.day)}</strong><span class="date-year">${escapeHtml(event.date.slice(0, 4))}</span>`;
}

function renderEvent(event) {
  const e = Object.fromEntries(Object.entries(event).map(([key, value]) => [key, typeof value === 'string' ? escapeHtml(value) : value]));
  const fit = fitInfo(event);
  const dupr = duprInfo(event);
  const deadline = deadlineInfo(event);
  const games = guaranteeLabel(event);

  return `<details class="event-row" id="${e.id}">
    <summary class="event-summary">
      <span class="event-date">${dateMarkup(event)}</span>
      <span class="event-identity"><strong>${e.name}</strong><span>${e.city} · ${e.venue}</span></span>
      <span class="fit-label ${fit.kind}">${fit.label}</span>
      <span class="row-value travel-value"><strong>${e.driveLabel}</strong><span>from Cedar Park</span></span>
      <span class="row-value"><strong>${e.priceLabel}</strong><span>listed</span></span>
      <span class="row-value"><strong>${games}</strong><span>minimum</span></span>
      <span class="status-label ${dupr.className}">${dupr.label}</span>
      <span class="row-value deadline-value ${deadline.className}"><strong>${deadline.label}</strong><span>registration</span></span>
      <span class="row-action"><span class="detail-show">Details</span><span class="detail-hide">Close</span></span>
    </summary>
    <div class="event-details">
      <div class="event-overview"><p class="event-summary-copy">${e.summary}</p><div class="watch"><strong>Before you register</strong><p>${e.note}</p></div></div>
      <dl class="detail-list"><div><dt>Men’s doubles</dt><dd>${e.menDetails}</dd></div><div><dt>Women’s doubles</dt><dd>${e.womenDetails}</dd></div><div><dt>Mixed doubles</dt><dd>${e.mixedDetails}</dd></div><div><dt>Format</dt><dd>${e.format}</dd></div></dl>
      <dl class="detail-list"><div><dt>Entry fees</dt><dd>${e.cost}</dd></div><div><dt>Registration</dt><dd>${e.deadline}</dd></div><div><dt>Rating fit</dt><dd>${e.ratings}</dd></div><div><dt>DUPR reporting</dt><dd>${e.reporting}</dd></div>${event.email ? `<div><dt>Organizer contact</dt><dd><a href="mailto:${e.email}">${e.email}</a></dd></div>` : ''}</dl>
      <a class="primary event-cta" href="${e.url}" target="_blank" rel="noopener noreferrer">Open event and registration <span aria-hidden="true">↗</span><span class="sr-only"> for ${e.name}</span></a>
    </div>
  </details>`;
}

function renderBestMatches(events) {
  if (events.length <= 3) {
    bestMatches.hidden = true;
    bestList.innerHTML = '';
    return;
  }

  const sortLabels = {date: 'soonest date', distance: 'shortest drive', price: 'lowest listed fee', deadline: 'registration deadline'};
  document.querySelector('#best-context').textContent = `Top three by ${sortLabels[state.sort]}.`;
  bestList.innerHTML = events.slice(0, 3).map(event => {
    const fit = fitInfo(event);
    return `<a class="best-match" href="#${escapeHtml(event.id)}"><span class="best-date">${escapeHtml(event.month)} ${escapeHtml(event.day)}</span><strong>${escapeHtml(event.name)}</strong><span>${escapeHtml(event.city)} · ${escapeHtml(event.driveLabel)}</span><small>${fit.label}</small></a>`;
  }).join('');
  bestMatches.hidden = false;
}

function activeFilterSummary(events) {
  const pieces = [];
  if (state.play !== 'all') pieces.push(playControl.options[playControl.selectedIndex].text);
  if (state.skill !== 'all') pieces.push(`${skillControl.options[skillControl.selectedIndex].text} level`);
  pieces.push(travelControl.options[travelControl.selectedIndex].text);
  if (state.date !== 'all') pieces.push(dateControl.options[dateControl.selectedIndex].text);
  if (state.dupr) pieces.push('DUPR confirmed');
  if (state.query) pieces.push(`“${state.query}”`);
  return `Showing ${events.length} of ${tournaments.length} tournaments · ${pieces.join(' · ')}`;
}

function renderEvents() {
  const events = matchingEvents();
  eventList.innerHTML = events.map(renderEvent).join('');
  resultCount.textContent = activeFilterSummary(events);
  emptyState.hidden = events.length > 0;
  document.querySelector('.event-list').hidden = events.length === 0;
  renderBestMatches(events);
}

function renderTeamEvents() {
  const visible = teamEvents.filter(event => state.teamFilter === 'all' || event.group === state.teamFilter);
  const counts = group => teamEvents.filter(event => event.group === group).length;
  document.querySelector('#team-count').textContent = `Showing ${visible.length} of ${teamEvents.length} team options · ${counts('local')} local · ${counts('travel')} within about two hours · ${counts('recurring')} recurring`;
  document.querySelector('#team-list').innerHTML = visible.map(event => {
    const e = Object.fromEntries(Object.entries(event).map(([key, value]) => [key, escapeHtml(value)]));
    const passed = event.end && today > event.end;
    return `<details class="team-row" id="${e.id}"><summary><span class="team-status">${e.status}</span><span class="team-identity"><strong>${e.name}</strong><span>${e.date} · ${e.venue}</span></span><span class="row-action"><span class="detail-show">Details</span><span class="detail-hide">Close</span></span></summary><div class="team-details">${passed ? '<p class="past-notice">This event has passed.</p>' : ''}<div class="watch"><strong>Before you build your team</strong><p>${e.note}</p></div><dl class="detail-list"><div><dt>Team and format</dt><dd>${e.format}</dd></div><div><dt>Rating requirements</dt><dd>${e.ratings}</dd></div><div><dt>Fees and registration</dt><dd>${e.cost}</dd></div><div><dt>DUPR reporting</dt><dd>${e.reporting}</dd></div></dl><div class="team-actions"><a class="primary" href="${e.url}" target="_blank" rel="noopener noreferrer">${e.linkLabel} <span aria-hidden="true">↗</span></a>${event.booking ? `<a class="text-link" href="${e.booking}" target="_blank" rel="noopener noreferrer">Browse individual bookings ↗</a>` : ''}</div></div></details>`;
  }).join('');
}

function syncControls() {
  playControl.value = state.play;
  skillControl.value = state.skill;
  travelControl.value = state.travel;
  dateControl.value = state.date;
  sortControl.value = state.sort;
  searchControl.value = state.query;
  duprControl.checked = state.dupr;
  teamFilterControl.value = state.teamFilter;
}

function updateUrl(keepHash = false) {
  const url = new URL(window.location.href);
  const values = {
    view: state.view, play: state.play, skill: state.skill, travel: state.travel,
    date: state.date, sort: state.sort, q: state.query, team: state.teamFilter
  };
  Object.entries(values).forEach(([key, value]) => {
    const defaultKey = key === 'q' ? 'query' : key === 'team' ? 'teamFilter' : key;
    if (value === defaults[defaultKey] || value === '') url.searchParams.delete(key);
    else url.searchParams.set(key, value);
  });
  if (state.dupr) url.searchParams.set('dupr', '1');
  else url.searchParams.delete('dupr');
  if (!keepHash) url.hash = '';
  history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
}

function readUrlState() {
  const params = new URLSearchParams(window.location.search);
  Object.assign(state, defaults);
  ['view', 'play', 'skill', 'travel', 'date', 'sort'].forEach(key => {
    if (allowed[key].includes(params.get(key))) state[key] = params.get(key);
  });
  if (allowed.teamFilter.includes(params.get('team'))) state.teamFilter = params.get('team');
  state.query = params.get('q') || '';
  state.dupr = params.get('dupr') === '1';
  if (window.location.hash === '#mlp') state.view = 'team';
}

function setView(view, {update = true, moveFocus = false, scroll = false} = {}) {
  if (!allowed.view.includes(view)) return;
  state.view = view;
  document.querySelectorAll('[role="tab"]').forEach(tab => {
    const selected = tab.dataset.viewTarget === view;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && moveFocus) tab.focus();
  });
  document.querySelectorAll('.view-panel').forEach(panel => {
    panel.hidden = panel.id !== `panel-${view}`;
  });
  if (view === 'team') renderTeamEvents();
  if (update) updateUrl();
  if (scroll) document.querySelector('#explorer').scrollIntoView({block: 'start'});
}

function resetFilters() {
  Object.assign(state, {
    play: defaults.play, skill: defaults.skill, travel: defaults.travel,
    date: defaults.date, sort: defaults.sort, dupr: defaults.dupr, query: defaults.query
  });
  syncControls();
  renderEvents();
  updateUrl();
}

function applyTournamentControls() {
  state.play = playControl.value;
  state.skill = skillControl.value;
  state.travel = travelControl.value;
  state.date = dateControl.value;
  state.sort = sortControl.value;
  state.query = searchControl.value.trim();
  state.dupr = duprControl.checked;
  renderEvents();
  updateUrl();
}

function showLinkedItem() {
  const id = window.location.hash.slice(1);
  if (!id || ['top', 'explorer', 'field-notes'].includes(id)) return;
  if (id === 'mlp') {
    setView('team', {update: true, scroll: true});
    return;
  }

  const tournament = tournaments.find(event => event.id === id);
  if (tournament) {
    if (!document.getElementById(id)) {
      Object.assign(state, {view: 'tournaments', play: 'all', skill: 'all', travel: 'all', date: 'all', dupr: false, query: ''});
      syncControls();
      renderEvents();
    }
    setView('tournaments', {update: false});
    updateUrl(true);
  }

  const teamEvent = teamEvents.find(event => event.id === id);
  if (teamEvent) {
    state.teamFilter = 'all';
    syncControls();
    setView('team', {update: false});
    renderTeamEvents();
    updateUrl(true);
  }

  const target = document.getElementById(id);
  if (!target) return;
  target.open = true;
  target.scrollIntoView({block: 'start'});
  const summary = target.querySelector('summary');
  if (summary) summary.focus({preventScroll: true});
}

[playControl, skillControl, travelControl, dateControl, sortControl, duprControl].forEach(control => control.addEventListener('change', applyTournamentControls));
searchControl.addEventListener('input', applyTournamentControls);
document.querySelector('#reset').addEventListener('click', resetFilters);
document.querySelector('#empty-reset').addEventListener('click', resetFilters);

teamFilterControl.addEventListener('change', () => {
  state.teamFilter = teamFilterControl.value;
  renderTeamEvents();
  updateUrl();
});

document.querySelectorAll('[data-view-target]').forEach(control => control.addEventListener('click', () => {
  const isHeaderControl = control.getAttribute('role') !== 'tab';
  setView(control.dataset.viewTarget, {scroll: isHeaderControl});
}));

const tabs = [...document.querySelectorAll('[role="tab"]')];
tabs.forEach((tab, index) => tab.addEventListener('keydown', event => {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  let nextIndex = index;
  if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
  if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
  if (event.key === 'Home') nextIndex = 0;
  if (event.key === 'End') nextIndex = tabs.length - 1;
  setView(tabs[nextIndex].dataset.viewTarget, {moveFocus: true});
}));

window.addEventListener('hashchange', showLinkedItem);
window.addEventListener('popstate', () => {
  readUrlState();
  syncControls();
  renderEvents();
  renderTeamEvents();
  setView(state.view, {update: false});
  showLinkedItem();
});

compactLayout.addEventListener('change', () => {
  document.querySelectorAll('.event-row[open], .team-row[open]').forEach(row => { row.open = false; });
});

readUrlState();
syncControls();
renderEvents();
renderTeamEvents();
setView(state.view, {update: false});
if (window.location.hash) showLinkedItem();
