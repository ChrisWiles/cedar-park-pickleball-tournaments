const grid = document.querySelector('#event-grid');
const search = document.querySelector('#search');
const sort = document.querySelector('#sort');
const travel = document.querySelector('#travel');
let activeFilter = 'all';

const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

const today = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit'
}).format(new Date());

const filterMatches = {
  all: () => true,
  women30: event => event.women30,
  mixed30: event => event.mixed30,
  women35: event => event.women35,
  mixed35: event => event.mixed35,
  men35: event => event.men35,
  confirmed: event => event.dupr === true
};

const travelMatches = {
  local: event => Number.isFinite(event.distanceMiles) && event.distanceMiles <= 40,
  twoHour: event => Number.isFinite(event.driveMinutes) && event.driveMinutes <= 120,
  all: () => true
};

function card(event) {
  const e = Object.fromEntries(Object.entries(event).map(([key, value]) => [key, typeof value === 'string' ? escapeHtml(value) : value]));
  const closed = today > event.deadlineDate;
  const past = today > event.end;
  const fitBadges = [event.women30 && 'Women’s 3.0', event.mixed30 && 'Mixed 3.0'].filter(Boolean);

  return `<article class="event-card" id="${e.id}" tabindex="-1">
    <div class="card-top"><div class="date-tile"><span>${e.month}</span><strong>${e.day}</strong><small>2026</small></div><div class="badges"><span class="badge ${e.dupr ? 'confirmed' : 'unconfirmed'}">${e.dupr === true ? '✓ DUPR confirmed' : e.dupr === false ? 'Not DUPR-recorded' : 'DUPR unconfirmed'}</span>${fitBadges.map(label => `<span class="badge fit">${label}</span>`).join('')}${past ? '<span class="badge unconfirmed">Event has passed</span>' : ''}</div></div>
    <p class="location">${e.city} <span>· ${e.driveLabel} from Cedar Park</span></p>
    <h3><a href="${e.url}" target="_blank" rel="noopener noreferrer">${e.name}<span aria-hidden="true"> ↗</span></a></h3><p class="venue">${e.venue}</p><p class="card-summary">${e.summary}</p>
    <div class="quick-facts"><div><span>LISTED ENTRY</span><strong>${e.priceLabel}</strong></div><div><span>DEADLINE</span><strong class="deadline">${closed ? 'Listed deadline passed' : e.deadlineLabel}</strong></div></div>
    <dl><dt>Men’s doubles</dt><dd>${e.menDetails}</dd><dt>Women’s doubles</dt><dd>${e.womenDetails}</dd><dt>Mixed doubles</dt><dd>${e.mixedDetails}</dd><dt>Format</dt><dd>${e.format}</dd></dl>
    <div class="watch"><strong>Before you register</strong><p>${e.note}</p></div>
    <details><summary>Fees, reporting & registration details</summary><dl><dt>Entry fees</dt><dd>${e.cost}</dd><dt>Registration</dt><dd>${e.deadline}</dd><dt>Rating fit</dt><dd>${e.ratings}</dd><dt>DUPR reporting</dt><dd>${e.reporting}</dd>${e.email ? `<dt>Organizer contact</dt><dd><a href="mailto:${e.email}">${e.email}</a></dd>` : ''}</dl></details>
    <a class="event-link" href="${e.url}" target="_blank" rel="noopener noreferrer">View event & registration <span aria-hidden="true">↗</span><span class="sr-only"> for ${e.name}</span></a>
  </article>`;
}

function updateFilterCounts() {
  document.querySelectorAll('[data-filter]').forEach(button => {
    const count = tournaments.filter(filterMatches[button.dataset.filter]).length;
    const countNode = button.querySelector('[data-count]');
    if (countNode) countNode.textContent = count;
  });
}

function render() {
  const query = search.value.trim().toLowerCase();
  const divisionMatch = filterMatches[activeFilter] || filterMatches.all;
  const rangeMatch = travelMatches[travel.value] || travelMatches.local;
  const events = tournaments.filter(event => divisionMatch(event) && rangeMatch(event) && Object.values(event).join(' ').toLowerCase().includes(query));

  events.sort((a, b) => {
    if (sort.value === 'distance') return (a.distanceMiles ?? Infinity) - (b.distanceMiles ?? Infinity);
    if (sort.value === 'price') return a.price - b.price;
    return a.date.localeCompare(b.date);
  });

  grid.innerHTML = events.map(card).join('');
  const selectedRange = travel.options[travel.selectedIndex].text;
  document.querySelector('#result-count').textContent = `Showing ${events.length} of ${tournaments.length} tournaments · ${selectedRange} · dates in local Texas time`;
  document.querySelector('#empty').hidden = events.length > 0;
}

document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(candidate => candidate.setAttribute('aria-pressed', String(candidate === button)));
  render();
}));

search.addEventListener('input', render);
sort.addEventListener('change', render);
travel.addEventListener('change', render);

function resetFilters() {
  search.value = '';
  travel.value = 'local';
  sort.value = 'date';
  activeFilter = 'all';
  document.querySelectorAll('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === 'all')));
  render();
}

document.querySelector('#reset').addEventListener('click', resetFilters);

function showLinkedCard() {
  const linkedEvent = tournaments.find(event => `#${event.id}` === location.hash);
  if (!linkedEvent) return;
  search.value = '';
  travel.value = 'all';
  activeFilter = 'all';
  document.querySelectorAll('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === 'all')));
  render();
  const target = document.getElementById(linkedEvent.id);
  target.scrollIntoView({block: 'start'});
  target.focus({preventScroll: true});
}

window.addEventListener('hashchange', showLinkedCard);

updateFilterCounts();
render();
if (location.hash) showLinkedCard();

function renderTeamEvents(filter = 'all') {
  const visible = teamEvents.filter(event => filter === 'all' || event.group === filter);
  const groupCount = group => teamEvents.filter(event => event.group === group).length;
  document.querySelector('#team-count').textContent = `Showing ${visible.length} of ${teamEvents.length} team options · ${groupCount('local')} local, ${groupCount('travel')} within about 2 hours, ${groupCount('recurring')} recurring`;
  document.querySelector('#team-grid').innerHTML = visible.map(event => {
    const e = Object.fromEntries(Object.entries(event).map(([key, value]) => [key, escapeHtml(value)]));
    return `<article class="event-card team-card" id="${e.id}"><span class="badge ${e.group === 'travel' ? 'unconfirmed' : 'fit'}">${e.status}</span><p class="team-date">${e.date}${event.end && today > event.end ? ' · Event has passed' : ''}</p><h3><a href="${e.url}" target="_blank" rel="noopener noreferrer">${e.name} ↗</a></h3><p class="venue">${e.venue}</p><dl><dt>Team & format</dt><dd>${e.format}</dd><dt>Rating requirements</dt><dd>${e.ratings}</dd><dt>Fees & registration</dt><dd>${e.cost}</dd><dt>DUPR reporting</dt><dd>${e.reporting}</dd></dl><div class="watch"><strong>Before you build your team</strong><p>${e.note}</p></div>${e.email ? `<p><a class="text-link" href="mailto:${e.email}">${e.email}</a></p>` : ''}<a class="event-link" href="${e.url}" target="_blank" rel="noopener noreferrer">${e.linkLabel} ↗<span class="sr-only"> for ${e.name}</span></a>${e.booking ? `<a class="event-link" href="${e.booking}" target="_blank" rel="noopener noreferrer">Browse individual bookings ↗</a>` : ''}</article>`;
  }).join('');
}

document.querySelectorAll('[data-team-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-team-filter]').forEach(candidate => candidate.setAttribute('aria-pressed', String(candidate === button)));
  renderTeamEvents(button.dataset.teamFilter);
}));

renderTeamEvents();
