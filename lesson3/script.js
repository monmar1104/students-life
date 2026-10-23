// Lekcja 3, funkcje: te same obliczenia wykorzystujemy w różnych formularzach.
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
  result.className = 'alert alert-danger mt-3 mb-0';
  if (pointsInput.value === '' || maxInput.value === '') {
    result.textContent = 'Uzupełnij oba pola.';
    return;
  }
  if (maxPoints <= 0) {
    result.textContent = 'Maksymalna liczba punktów musi być większa od zera.';
    return;
  }
  if (points < 0) {
    result.textContent = 'Punkty nie mogą być ujemne.';
    return;
  }
  if (points > maxPoints) {
    result.textContent = 'Zdobyte punkty nie mogą przekraczać maksimum.';
    return;
  }
  const percentage = calculatePercentage(points, maxPoints);
  const grade = gradeFromPercentage(percentage);
  if (percentage >= 40) {
    result.textContent = 'Wynik: ' + formatNumber(percentage) + '% — Sprawdzian zaliczony!';
    result.className = 'alert alert-success mt-3 mb-0';
  } else {
    result.textContent = 'Wynik: ' + formatNumber(percentage) + '% — Sprawdzian niezaliczony!';
    result.className = 'alert alert-danger mt-3 mb-0';
  }
  result.textContent += ' Ocena: ' + grade + '.';
  if (percentage === 100) {
    result.textContent += ' Komplet punktów!';
  }
  console.log(percentage, grade);
}

function clearResult(prefix) {
  document.getElementById(prefix + 'points').value = '';
  document.getElementById(prefix + 'maxPoints').value = '';
  document.getElementById(prefix + 'result').textContent = 'Wpisz punkty i oblicz wynik.';
  document.getElementById(prefix + 'result').className = 'alert alert-light border mt-3 mb-0';
  console.log('Pola wyczyszczone');
}

// Lekcja 3, pętla for: komórki tabeli istnieją w HTML; pętla wpisuje tylko oceny.
function showExamples() {
  document.getElementById('examples').textContent = '40% → ' + gradeFromPercentage(40) + ', 70% → ' + gradeFromPercentage(70) + ', 95% → ' + gradeFromPercentage(95);
}

function generateTable() {
  for (let percentage = 0; percentage <= 100; percentage += 10) {
    document.getElementById('table-grade-' + percentage).textContent = gradeFromPercentage(percentage);
  }
}
