// START LEKCJI 3
// Poniżej działa logika lekcji 2, podłączona do pól math- (zaliczenie od 40%).
// Rozbuduj calculateResult i clearResult zgodnie z instrukcją.
// Wspólne funkcje calculatePercentage, gradeFromPercentage i formatNumber
// dopisz w etapie B. Strukturę strony i tabelę masz już w HTML.

// Lekcja 2: funkcja przerywa pracę po wykryciu błędu danych.
function calculateResult() {
  const pointsInput = document.getElementById('math-points');
  const maxInput = document.getElementById('math-maxPoints');
  const points = Number(pointsInput.value);
  const maxPoints = Number(maxInput.value);
  const result = document.getElementById('math-result');
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
    result.textContent = 'Wynik: ' + percentage + '% — Sprawdzian niezaliczony!';
  }
  console.log(percentage);
}

function clearResult() {
  document.getElementById('math-points').value = '';
  document.getElementById('math-maxPoints').value = '';
  document.getElementById('math-result').textContent = 'Wpisz punkty i oblicz wynik.';
  document.getElementById('math-result').className = 'alert alert-light border mt-3 mb-0';
  console.log('Pola wyczyszczone');
}

// ETAP B: uzupełnij przycisk „Trzy przykłady”.
// Pokaż w istniejącym akapicie examples oceny dla 40%, 70% i 95%.
// Wykorzystaj gradeFromPercentage().
function showExamples() {
  // TODO: wywołaj wspólną funkcję i ustaw textContent.
}

// ETAP D: uzupełnij istniejące komórki table-grade-0 ... table-grade-100.
function generateTable() {
  // TODO: użyj pętli for oraz gradeFromPercentage().
}
