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
