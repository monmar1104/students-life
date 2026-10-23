// Lekcja 1: HTML zawiera formularz, a JS tylko pobiera dane i oblicza wynik.
// required i min w HTML sprawdzają pola przed wywołaniem onsubmit.
function calculateResult() {
  const pointsInput = document.getElementById('points');
  const maxPointsInput = document.getElementById('maxPoints');
  const points = Number(pointsInput.value);
  const maxPoints = Number(maxPointsInput.value);
  const percentage = points / maxPoints * 100;

  document.getElementById('result').textContent = 'Wynik: ' + percentage + '%';
  console.log(percentage);
}

function clearResult() {
  document.getElementById('calculator-form').reset();
  document.getElementById('result').textContent = 'Wpisz punkty i oblicz wynik.';
  console.log('Formularz wyczyszczony');
}
