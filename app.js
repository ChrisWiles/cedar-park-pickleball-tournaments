const grid = document.querySelector('#event-grid');
const search = document.querySelector('#search');
const sort = document.querySelector('#sort');
let activeFilter = 'all';
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const today = new Intl.DateTimeFormat('en-CA', {timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());

function card(event) {
  const e = Object.fromEntries(Object.entries(event).map(([k,v]) => [k, typeof v === 'string' ? escapeHtml(v) : v]));
  const closed = today > event.deadlineDate;
  const past = today > event.end;
  return `<article class="event-card" id="${e.id}" tabindex="-1">
    <div class="card-top"><div class="date-tile"><span>${e.month}</span><strong>${e.day}</strong><small>2026</small></div><div class="badges"><span class="badge ${e.dupr ? 'confirmed' : 'unconfirmed'}">${e.dupr ? '✓ DUPR confirmed' : 'DUPR unconfirmed'}</span>${e.rating ? '<span class="badge fit">Close rating fit</span>' : ''}${past ? '<span class="badge unconfirmed">Event has passed</span>' : ''}</div></div>
    <p class="location">${e.city} <span>· ${e.driveLabel} drive</span></p>
    <h3><a href="${e.url}" target="_blank" rel="noopener noreferrer">${e.name}<span aria-hidden="true"> ↗</span></a></h3><p class="venue">${e.venue}</p><p class="card-summary">${e.summary}</p>
    <div class="quick-facts"><div><span>LISTED ENTRY</span><strong>${e.priceLabel}</strong></div><div><span>DEADLINE</span><strong class="deadline">${closed ? 'Listed deadline passed' : e.deadlineLabel}</strong></div></div>
    <dl><dt>Divisions & schedule</dt><dd>${e.divisions}</dd><dt>Rating requirements</dt><dd>${e.ratings}</dd><dt>Format</dt><dd>${e.format}</dd></dl>
    <div class="watch"><strong>Before you register</strong><p>${e.note}</p></div>
    <details><summary>Fees, reporting & registration details</summary><dl><dt>Entry fees</dt><dd>${e.cost}</dd><dt>Registration</dt><dd>${e.deadline}</dd><dt>DUPR reporting</dt><dd>${e.reporting}</dd>${e.email ? `<dt>Organizer contact</dt><dd><a href="mailto:${e.email}">${e.email}</a></dd>` : ''}</dl></details>
    <a class="event-link" href="${e.url}" target="_blank" rel="noopener noreferrer">View event & registration <span aria-hidden="true">↗</span><span class="sr-only"> for ${e.name}</span></a>
  </article>`;
}
function render() {
  const query = search.value.trim().toLowerCase();
  const events = tournaments.filter(e => (activeFilter === 'all' || (activeFilter === 'confirmed' && e.dupr) || (activeFilter === 'rating' && e.rating) || (activeFilter === 'mixed' && e.mixed)) && Object.values(e).join(' ').toLowerCase().includes(query));
  events.sort((a,b) => sort.value === 'drive' ? a.drive-b.drive : sort.value === 'price' ? a.price-b.price : a.date.localeCompare(b.date));
  grid.innerHTML = events.map(card).join('');
  document.querySelector('#result-count').textContent = `Showing ${events.length} of ${tournaments.length} main tournaments · dates shown in local Texas time`;
  document.querySelector('#empty').hidden = events.length > 0;
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  render();
}));
search.addEventListener('input', render);
sort.addEventListener('change', render);
function resetFilters() {search.value=''; activeFilter='all'; document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter==='all'))); render();}
document.querySelector('#reset').addEventListener('click', resetFilters);
function showLinkedCard() {if (tournaments.some(e => `#${e.id}` === location.hash)) {resetFilters(); const target=document.getElementById(location.hash.slice(1)); target.scrollIntoView({block:'start'}); target.focus({preventScroll:true});}}
window.addEventListener('hashchange', showLinkedCard);
document.querySelector('#leads').innerHTML=leads.map((e,i)=>`<article class="lead"><span class="lead-number">0${i+1}</span><div><p class="eyebrow">${escapeHtml(e.tag)}</p><h3><a href="${e.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(e.name)} ↗</a></h3><p class="lead-meta">${escapeHtml(e.date)} · ${escapeHtml(e.venue)}</p><p>${escapeHtml(e.text)}</p><a class="text-link" href="${e.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(e.linkLabel)} ↗</a></div></article>`).join('');
render();
if(location.hash) showLinkedCard();
