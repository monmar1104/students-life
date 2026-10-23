// Lekcja 2: funkcja przerywa pracę po wykryciu błędu danych.
function calculateResult() {
  const pointsInput = document.getElementById('points');
  const maxInput = document.getElementById('maxPoints');
  const points = Number(pointsInput.value);
  const maxPoints = Number(maxInput.value);
  const result = document.getElementById('result');
  result.className = 'alert alert-danger mt-3 mb-0';

  if (pointsInput.value === '') {
    result.textContent = 'Podaj zdobyte punkty.';
    return;
  }
  if (maxInput.value === '') {
    result.textContent = 'Podaj maksymalną liczbę punktów.';
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
  const percentage = points / maxPoints * 100;
  if (percentage >= 40) {
    result.textContent = 'Wynik: ' + percentage + '% — Sprawdzian zaliczony!';
    result.className = 'alert alert-success mt-3 mb-0';
  } else {
    result.textContent = 'Wynik: ' + `percentage` + '% — Sprawdzian niezaliczony!';
  }
  console.log(percentage);
}

function clearResult() {
  document.getElementById('points').value = '';
  document.getElementById('maxPoints').value = '';
  document.getElementById('result').textContent = 'Wpisz punkty i oblicz wynik.';
  document.getElementById('result').className = 'alert alert-light border mt-3 mb-0';
  console.log('Formularz wyczyszczony');
}
