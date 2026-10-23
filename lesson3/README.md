# Lekcja 3 — oceny, funkcje i pętla for

Punkt startowy ucznia: [start/index.html](start/index.html) oraz [instrukcja](start/INSTRUKCJA.pdf). Folder start zawiera gotowy HTML z matematyką i kod z lekcji 2 do rozbudowy. Ten katalog, poza start, zawiera gotowe rozwiązanie prowadzącego.

## Zadania podstawowe i ich wykonanie

| Zadanie z instrukcji | Gotowe rozwiązanie |
| --- | --- |
| Dopisek dla 100% | calculateResult(prefix), warunek percentage === 100 |
| Progi ocen 1–6 | gradeFromPercentage(percentage) |
| Zaliczanie od 40% | calculateResult(prefix), warunek percentage >= 40 |
| Sprawdzenie danych przed obliczeniami | Puste pola połączone przez OR, potem osobne warunki na maksimum i zdobyte punkty; po każdym błędzie return |
| Funkcja procentów | calculatePercentage(points, maxPoints) |
| Dwa niezależne kalkulatory | Dwie sekcje HTML, parametr prefix oraz identyfikatory math- i polish- |
| Czyszczenie i neutralny wygląd | clearResult(prefix), ustawienie value, textContent i className; komunikat w konsoli |
| Trzy przykładowe oceny | showExamples() → 40%: 2, 70%: 4, 95%: 6 |
| Tabela z 11 wierszami | Stała tabela HTML, generateTable() z pętlą od 0 do 100 co 10 |

formatNumber(value) realizuje opcjonalne formatowanie z instrukcji. Pozostałe zadania dodatkowe — inne przykłady i własny komunikat motywujący — są przeznaczone do samodzielnej modyfikacji przez ucznia, a nie do domyślnego działania rozwiązania wzorcowego.

## Zasady

Zaliczenie: od 40%, czyli od oceny 2. Progi: poniżej 40% → 1; od 40% → 2; od 55% → 3; od 70% → 4; od 85% → 5; od 95% → 6. Porównania wykorzystują dokładny procent, a formatNumber służy tylko do prezentacji.

HTML określa strukturę, Bootstrap wygląd, a JavaScript obsługuje dane i obliczenia. Wszystkie elementy poza kalkulatorem języka polskiego istnieją w pakiecie startowym. Uczeń dodaje tylko tę jedną sekcję HTML.

## Testy

Sprawdź 39,9% i 40%, wszystkie granice ocen, 100% → 95%, puste pola i błędne punkty, niezależność kalkulatorów, czyszczenie, przykłady i wielokrotne wypełnienie tabeli. Dokładny opis audytu jest w AUDYT.md.

Następny katalog kursu: lesson6. Pozostałe katalogi zachowują dotychczasowe numery; finalna aplikacja pozostaje w lesson10.

Oba przedmioty mają własny prefiks: matematyka math-, język polski polish-. Przykładowe pola to math-points i polish-points; funkcje otrzymują odpowiedni prefiks w onclick.
