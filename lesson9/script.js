'use strict';

// Lekcja 9: dynamiczne listy z szablonów HTML. Dane są tylko w pamięci.
const $ = (id) => document.getElementById(id);
const newId = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
const formatNumber = (value) => new Intl.NumberFormat('pl-PL', { maximumFractionDigits: 2 }).format(value);
const initialState = () => ({ version: 1, subjects: ['Matematyka', 'Język polski', 'Język angielski'].map(name => ({ id: newId(), name })), grades: [], tasks: [] });
let state = initialState();
let latestResult = null;
let pendingDelete = null;
let notificationTimer;

function isValidState(data) {
  if (!data || data.version !== 1 || !Array.isArray(data.subjects) || !Array.isArray(data.grades) || !Array.isArray(data.tasks)) return false;
  if (data.subjects.length > 500 || data.grades.length > 10000 || data.tasks.length > 5000) return false;
  const validId = id => typeof id === 'string' && id.length > 0 && id.length < 150;
  if (!data.subjects.every(s => s && validId(s.id) && typeof s.name === 'string' && s.name.trim().length > 0 && s.name.length <= 60)) return false;
  const ids = new Set(data.subjects.map(s => s.id));
  if (ids.size !== data.subjects.length) return false;
  const validDate = date => date === '' || (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(date)) && new Date(date).toISOString().slice(0, 10) === date);
  if (!data.grades.every(g => g && validId(g.id) && ids.has(g.subjectId) && Number.isInteger(g.value) && g.value >= 1 && g.value <= 6)) return false;
  if (!data.tasks.every(t => t && validId(t.id) && typeof t.title === 'string' && t.title.trim().length > 0 && t.title.length <= 160 && (t.subjectId === '' || ids.has(t.subjectId)) && typeof t.done === 'boolean' && validDate(t.date))) return false;
  return new Set(data.grades.map(g => g.id)).size === data.grades.length && new Set(data.tasks.map(t => t.id)).size === data.tasks.length;
}
function notify(message) {
  clearTimeout(notificationTimer);
  $('notification').textContent = message;
  $('notification').hidden = false;
  notificationTimer = setTimeout(() => { $('notification').textContent = ''; $('notification').hidden = true; }, 7000);
}
// Znaczniki i klasy są w index.html. Tutaj kopiujemy tylko gotowy szablon.
function copyTemplate(id) {
  return $(id).content.firstElementChild.cloneNode(true);
}

function showResultMessage(message) {
  $('result-message').textContent = message;
  $('result-message').hidden = false;
  $('result-details').hidden = true;
}

function calculatePercentage(points, maxPoints) { return points / maxPoints * 100; }
function gradeFromPercentage(percentage) {
  if (percentage >= 95) return 6;
  else if (percentage >= 85) return 5;
  else if (percentage >= 70) return 4;
  else if (percentage >= 55) return 3;
  else if (percentage >= 40) return 2;
  return 1;
}
function average(grades) {
  if (grades.length === 0) return null;
  let sum = 0;
  for (const grade of grades) sum += grade.value;
  return sum / grades.length;
}
function calculateResult() {
  latestResult = null;
  $('save-result').hidden = true;
  const points = Number($('points').value);
  const maxPoints = Number($('maxPoints').value);
  let error = '';
  if ($('points').value.trim() === '' || $('maxPoints').value.trim() === '') error = 'Uzupełnij oba pola z punktami.';
  else if (!Number.isFinite(points) || !Number.isFinite(maxPoints)) error = 'Podaj poprawne liczby.';
  else if (maxPoints <= 0) error = 'Maksymalna liczba punktów musi być większa od zera.';
  else if (points < 0) error = 'Zdobyte punkty nie mogą być ujemne.';
  else if (points > maxPoints) error = 'Zdobyte punkty nie mogą przekraczać maksimum.';
  if (error) { $('result').className = 'alert alert-danger mt-4 mb-0'; showResultMessage(error); return; }
  const percentage = calculatePercentage(points, maxPoints);
  const grade = gradeFromPercentage(percentage);
  const passed = percentage >= 40;
  $('result').className = passed ? 'alert alert-success mt-4 mb-0' : 'alert alert-danger mt-4 mb-0';
  // Wartość zaokrąglona poniżej progu nie powinna wyglądać jak próg zaliczenia.
  let shownPercentage = formatNumber(percentage);
  if (percentage < 40 && Number(percentage.toFixed(2)) >= 40) shownPercentage = '< 40';
  if (percentage < 100 && Number(percentage.toFixed(2)) >= 100) shownPercentage = '< 100';
  $('result-message').hidden = true;
  $('result-details').hidden = false;
  $('result-percentage').textContent = `${shownPercentage}%`;
  $('result-status').textContent = passed ? 'Sprawdzian zaliczony' : 'Sprawdzian niezaliczony';
  $('result-grade').textContent = grade;
  latestResult = { grade };
  $('save-result').hidden = false;
  $('save-grade').disabled = state.subjects.length === 0;
  console.log('Wynik sprawdzianu:', percentage, 'Ocena:', grade);
}
function clearResult() {
  $('calculator-form').reset();
  latestResult = null;
  $('result').className = 'alert alert-light border text-secondary mt-4 mb-0';
  showResultMessage('Twój wynik pojawi się tutaj.');
  $('save-result').hidden = true;
  $('points').focus();
  console.log('Formularz wyczyszczony');
}
function renderSelect(id, allowEmpty = false) {
  const select = $(id);
  const previous = select.value;
  // Pierwsza opcja jest stałym elementem HTML; usuwamy tylko poprzednie dane.
  while (select.options.length > 1) select.remove(1);
  select.options[0].hidden = !allowEmpty && state.subjects.length > 0;
  select.options[0].disabled = !allowEmpty && state.subjects.length > 0;
  for (const subject of state.subjects) {
    const option = copyTemplate('subject-option-template');
    option.value = subject.id;
    option.textContent = subject.name;
    select.append(option);
  }
  if ([...select.options].some(option => option.value === previous && !option.disabled)) {
    select.value = previous;
  } else {
    select.selectedIndex = !allowEmpty && state.subjects.length ? 1 : 0;
  }
}

function render() {
  const allAverage = average(state.grades);
  $('average').textContent = allAverage === null ? '—' : formatNumber(allAverage);
  $('grade-count').textContent = state.grades.length;
  $('best-grade').textContent = `Najwyższa ocena: ${state.grades.length ? Math.max(...state.grades.map(g => g.value)) : '—'}`;
  const openTasks = state.tasks.filter(t => !t.done).length;
  $('task-count').textContent = openTasks;
  $('task-summary').textContent = state.tasks.length ? `Ukończone: ${state.tasks.length - openTasks} z ${state.tasks.length}` : 'Możesz złapać oddech';
  renderSelect('grade-subject'); renderSelect('result-subject'); renderSelect('task-subject', true);
  $('save-grade').disabled = state.subjects.length === 0;
  renderSubjects(); renderTasks();
}
function renderSubjects() {
  const list = $('subject-list');
  list.replaceChildren();
  $('subjects-empty').hidden = state.subjects.length > 0;

  for (const subject of state.subjects) {
    const grades = state.grades.filter(grade => grade.subjectId === subject.id);
    const row = copyTemplate('subject-template');
    row.querySelector('[data-subject-name]').textContent = subject.name;
    row.querySelector('[data-grade-count]').textContent = grades.length;
    row.querySelector('[data-no-grades]').hidden = grades.length > 0;
    const subjectAverage = average(grades);
    row.querySelector('[data-average]').textContent = subjectAverage === null ? '—' : formatNumber(subjectAverage);

    const gradeList = row.querySelector('[data-grade-list]');
    for (const grade of grades) {
      const button = copyTemplate('grade-template');
      button.textContent = grade.value;
      button.title = `Usuń ocenę ${grade.value} — ${subject.name}`;
      button.setAttribute('aria-label', button.title);
      button.classList.toggle('btn-outline-danger', grade.value < 3);
      button.classList.toggle('btn-outline-success', grade.value >= 3);
      button.addEventListener('click', () => {
        state.grades = state.grades.filter(item => item.id !== grade.id);
        
        render();
      });
      gradeList.append(button);
    }

    const remove = row.querySelector('[data-remove-subject]');
    remove.setAttribute('aria-label', `Usuń przedmiot ${subject.name}`);
    remove.addEventListener('click', () => {
      pendingDelete = subject.id;
      $('delete-description').textContent = `Usuniesz „${subject.name}” i wszystkie jego oceny. Zadania domowe pozostaną na liście bez przypisanego przedmiotu.`;
      $('delete-dialog').showModal();
    });
    list.append(row);
  }
}

function todayKey() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
function renderTasks() {
  const list = $('task-list');
  list.replaceChildren();
  $('tasks-empty').hidden = state.tasks.length > 0;
  const tasks = [...state.tasks].sort((a, b) => Number(a.done) - Number(b.done) || (a.date || '9999').localeCompare(b.date || '9999'));

  for (const task of tasks) {
    const row = copyTemplate('task-template');
    const checkbox = row.querySelector('[data-task-done]');
    checkbox.checked = task.done;
    checkbox.setAttribute('aria-label', `Oznacz zadanie: ${task.title}`);
    checkbox.addEventListener('change', () => {
      task.done = checkbox.checked;
      
      render();
    });

    const title = row.querySelector('[data-task-title]');
    title.textContent = task.title;
    title.classList.toggle('text-decoration-line-through', task.done);
    title.classList.toggle('text-secondary', task.done);
    const subject = state.subjects.find(item => item.id === task.subjectId);
    const subjectLabel = row.querySelector('[data-task-subject]');
    subjectLabel.hidden = !subject;
    if (subject) subjectLabel.textContent = `${subject.name} · `;
    if (task.date) {
      row.querySelector('[data-task-date]').textContent = new Date(`${task.date}T12:00:00`).toLocaleDateString('pl-PL');
    }
    row.querySelector('[data-task-overdue]').hidden = task.done || !task.date || task.date >= todayKey();

    const remove = row.querySelector('[data-remove-task]');
    remove.setAttribute('aria-label', `Usuń zadanie: ${task.title}`);
    remove.addEventListener('click', () => {
      state.tasks = state.tasks.filter(item => item.id !== task.id);
      
      render();
    });
    list.append(row);
  }
}

function addGrade(subjectId, value) {
  if (!state.subjects.some(s => s.id === subjectId) || !Number.isInteger(value) || value < 1 || value > 6) { notify('Wybierz przedmiot i ocenę od 1 do 6.'); return false; }
  state.grades.push({ id: newId(), subjectId, value });
   render(); return true;
}
$('calculator-form').addEventListener('submit', event => { event.preventDefault(); calculateResult(); });
// Zmiana punktów unieważnia wynik, aby nie zapisać oceny z poprzedniego obliczenia.
$('calculator-form').addEventListener('input', () => { latestResult = null; $('save-result').hidden = true; $('result').className = 'alert alert-light border text-secondary mt-4 mb-0'; showResultMessage('Punkty zmienione. Oblicz wynik ponownie.'); });
$('clear-result').addEventListener('click', clearResult);
$('save-grade').addEventListener('click', () => { if (latestResult && addGrade($('result-subject').value, latestResult.grade)) { latestResult = null; $('save-result').hidden = true; notify('Ocena zapisana w dzienniku.'); } });
$('subject-form').addEventListener('submit', event => {
  event.preventDefault(); const name = $('subject-name').value.trim();
  if (!name) { notify('Wpisz nazwę przedmiotu.'); $('subject-name').focus(); return; }
  if (state.subjects.some(s => s.name.toLocaleLowerCase('pl') === name.toLocaleLowerCase('pl'))) { notify('Taki przedmiot już istnieje.'); return; }
  state.subjects.push({ id: newId(), name });  render(); $('subject-form').reset();
});
$('grade-form').addEventListener('submit', event => { event.preventDefault(); if (addGrade($('grade-subject').value, Number($('grade-value').value))) $('grade-value').value = ''; });
$('task-form').addEventListener('submit', event => {
  event.preventDefault(); const title = $('task-title').value.trim();
  if (!title) { notify('Wpisz treść zadania.'); $('task-title').focus(); return; }
  if (!$('task-date').checkValidity()) { notify('Podaj poprawną datę.'); return; }
  const task = { id: newId(), title, subjectId: $('task-subject').value, date: $('task-date').value, done: false };
  if (!isValidState({ ...state, tasks: [...state.tasks, task] })) { notify('Sprawdź dane zadania i datę.'); return; }
  state.tasks.push(task);  render(); $('task-form').reset();
});
$('cancel-delete').addEventListener('click', () => $('delete-dialog').close());
$('confirm-delete').addEventListener('click', () => {
  if (!pendingDelete) return;
  state.subjects = state.subjects.filter(s => s.id !== pendingDelete);
  state.grades = state.grades.filter(g => g.subjectId !== pendingDelete);
  state.tasks.forEach(t => { if (t.subjectId === pendingDelete) t.subjectId = ''; });
  pendingDelete = null;  render(); $('delete-dialog').close();
});
$('table-form').addEventListener('submit', event => {
  event.preventDefault(); const step = Number($('table-step').value);
  if (!Number.isInteger(step) || step < 1 || step > 100) { notify('Krok tabeli musi być liczbą całkowitą od 1 do 100.'); return; }
  const body = $('score-table-body');
  body.replaceChildren();
  function addRow(percentage) {
    const row = copyTemplate('score-row-template');
    row.querySelector('[data-percentage]').textContent = `${percentage}%`;
    row.querySelector('[data-score-grade]').textContent = gradeFromPercentage(percentage);
    body.append(row);
  }
  for (let percentage = 0; percentage <= 100; percentage += step) addRow(percentage);
  if (100 % step !== 0) addRow(100);
  $('score-table').hidden = false;
});
$('today').textContent = new Date().toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
render();

