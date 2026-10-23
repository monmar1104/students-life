// Lekcja 4: te same obliczenia wykorzystujemy w różnych formularzach.
function calculatePercentage(points, maxPoints) {
  return points / maxPoints * 100;
}

function gradeFromPercentage(percentage) {
  if (percentage >= 95) return 6;
  else if (percentage >= 85) return 5;
  else if (percentage >= 70) return 4;
  else if (percentage >= 55) return 3;
  else if (percentage >= 40) return 2;
  return 1;
}

function formatNumber(value) {
  return value.toLocaleString('pl-PL', { maximumFractionDigits: 2 });
}

function calculateResult(prefix) {
  const pointsInput = document.getElementById(prefix + 'points');
  const maxInput = document.getElementById(prefix + 'maxPoints');
  const result = document.getElementById(prefix + 'result');
  const points = Number(pointsInput.value);
  const maxPoints = Number(maxInput.value);
  if (pointsInput.value === '' || maxInput.value === '' || maxPoints <= 0 || points < 0 || points > maxPoints) {
    result.textContent = 'Podaj poprawne punkty: 0 ≤ punkty ≤ maksimum, a maksimum > 0.';
    result.className = 'alert alert-danger mt-3 mb-0';
    return;
  }
  const percentage = calculatePercentage(points, maxPoints);
  const grade = gradeFromPercentage(percentage);
  if (percentage >= 40) {
    result.textContent = formatNumber(percentage) + '% — Sprawdzian zaliczony!';
    result.className = 'alert alert-success mt-3 mb-0';
  } else {
    result.textContent = formatNumber(percentage) + '% — Sprawdzian niezaliczony!';
    result.className = 'alert alert-danger mt-3 mb-0';
  }
  result.textContent += ' Ocena: ' + grade + '.';
  console.log(percentage, grade);
}

function clearResult(prefix) {
  document.getElementById(prefix + 'points').value = '';
  document.getElementById(prefix + 'maxPoints').value = '';
  document.getElementById(prefix + 'result').textContent = 'Wpisz punkty i oblicz wynik.';
  document.getElementById(prefix + 'result').className = 'alert alert-light border mt-3 mb-0';
}

// Lekcja 5: komórki tabeli istnieją w HTML; pętla wpisuje tylko oceny.
function showExamples() {
  document.getElementById('examples').textContent = '40% → ' + gradeFromPercentage(40) + ', 70% → ' + gradeFromPercentage(70) + ', 95% → ' + gradeFromPercentage(95);
}

function generateTable() {
  for (let percentage = 0; percentage <= 100; percentage += 10) {
    document.getElementById('table-grade-' + percentage).textContent = gradeFromPercentage(percentage);
  }
}

// Lekcja 8: przedmioty, oceny i zadania są obiektami.
const subjects = [
  { id: 'math', name: 'Matematyka' },
  { id: 'polish', name: 'Język polski' },
  { id: 'english', name: 'Język angielski' }
];
const grades = [];
const tasks = [];

function addGrade() {
  const value = Number(document.getElementById('grade-value').value);
  if (value < 1 || value > 6) {
    document.getElementById('grade-message').textContent = 'Wybierz ocenę od 1 do 6.';
    return;
  }
  document.getElementById('grade-message').textContent = '';
  grades.push({ subjectId: document.getElementById('grade-subject').value, value: value });
  renderGrades();
}

function removeLastGrade() {
  grades.pop();
  renderGrades();
}

function renderGrades() {
  const values = [];
  let sum = 0;
  let best = 0;
  let good = 0;
  for (const grade of grades) {
    values.push(grade.value);
    sum += grade.value;
    if (grade.value > best) best = grade.value;
    if (grade.value >= 4) good++;
  }
  document.getElementById('grade-list').textContent = values.length ? values.join(', ') : 'Brak ocen';
  document.getElementById('grade-count').textContent = grades.length;
  document.getElementById('average').textContent = grades.length ? formatNumber(sum / grades.length) : '—';
  document.getElementById('best-grade').textContent = grades.length ? best : '—';
  document.getElementById('good-count').textContent = good;
  for (const subject of subjects) {
    const subjectValues = [];
    let subjectSum = 0;
    for (const grade of grades) {
      if (grade.subjectId === subject.id) {
        subjectValues.push(grade.value);
        subjectSum += grade.value;
      }
    }
    document.getElementById(subject.id + '-grades').textContent = subjectValues.length ? subjectValues.join(', ') : 'Brak ocen';
    document.getElementById(subject.id + '-average').textContent = subjectValues.length ? formatNumber(subjectSum / subjectValues.length) : '—';
  }
}

function addTask() {
  const title = document.getElementById('task-title').value.trim();
  if (title === '') {
    document.getElementById('task-message').textContent = 'Wpisz treść zadania.';
    return;
  }
  document.getElementById('task-message').textContent = '';
  tasks.push({ title: title, subjectId: document.getElementById('task-subject').value });
  const descriptions = [];
  for (const task of tasks) {
    for (const subject of subjects) {
      if (subject.id === task.subjectId) descriptions.push(subject.name + ': ' + task.title);
    }
  }
  document.getElementById('task-list').textContent = descriptions.join(' • ');
  document.getElementById('task-title').value = '';
}
