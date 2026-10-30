# Audyt lekcji 4

Data: 30 października 2026.

## Zgodność z kartą ucznia

- Starter i rozwiązanie mają identyczny HTML: dwa kalkulatory, tabelę 11 wyników, skalę oraz nową listę ocen.
- Starter zawiera działający kod poprzedniej lekcji. Powtórka showExamples, pętla generateTable i obsługa listy mają miejsca do samodzielnego uzupełnienia. Tablicę grades uczeń tworzy sam.
- Rozwiązanie realizuje wszystkie zadania podstawowe. Pętla po tablicy na końcu karty jest ćwiczeniem dodatkowym, wykonywanym w konsoli.
- Zachowano prefiksy math- i polish-, próg zaliczenia 40%, komunikat dla 100% i dotychczasową walidację.

## Sprawdzone działanie

- Poprawność składni JS obu wersji, unikalność id oraz odwołania etykiet i przycisków.
- Obliczenia i czyszczenie obu kalkulatorów w starterze i rozwiązaniu.
- Przykłady 40% → 2, 70% → 4 i 95% → 6.
- Dwa wywołania generateTable, 11 komórek i poprawne oceny w każdej z nich.
- Pusta tablica, dodawanie 3, 4 i 5, tekst listy i licznik.
- Błędny pusty wybór zachowuje dane, a poprawny wybór usuwa komunikat błędu.
- Powtórne dodanie tej samej oceny tworzy kolejną pozycję.
- Kolejne usuwanie oraz kilka wywołań usuwania przy pustej tablicy.
- Ponowne uruchomienie strony zaczyna od pustej listy.

Testy logiki wykonano w Node z odwzorowaniem elementów HTML. Wszystkie osiem stron PDF sprawdzono wizualnie po renderowaniu. W tej aktualizacji nie wykonywano testów interfejsu we wszystkich przeglądarkach.
