// Lekcja 2: funkcja przerywa pracę po wykryciu błędu danych.
function calculateResult() {
  const pointsInput = document.getElementById('points');
  const maxInput = document.getElementById('maxPoints');
  const points = Number(pointsInput.value);
  const maxPoints = Number(maxInput.value);
  const result = document.getElementById('result');
  result.className = 'alert alert-danger mt-3 mb-0';

  if (pointsInput.value === '' || maxInput.value === '') {
    result.textContent = 'Uzupełnij oba pola.';
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
    result.textContent = 'Wynik: ' + percentage + '% — Sprawdzian niezaliczony!';
  }
  let grade = 1;
  if (percentage >= 95) {
    grade = 6;
  } else if (percentage >= 85 && percentage < 95) {
    grade = 5;
  } else if (percentage >= 70 && percentage < 85) {
    grade = 4;
  } else if (percentage >= 55 && percentage < 70) {
    grade = 3;
  } else if (percentage >= 40 && percentage < 55) {
    grade = 2;
  }
  result.textContent += ' Ocena: ' + grade + '.';
  if (percentage === 100) {
    result.textContent += ' Komplet punktów!';
  } else if (percentage >= 40) {
    result.textContent += ' Dobra robota!';
  } else {
    result.textContent += ' Spróbuj jeszcze raz.';
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
