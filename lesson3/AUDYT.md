# Audyt zgodności lekcji 3

Data: 23 października 2026. Porównano start/INSTRUKCJA.pdf, start/index.html, start/script.js oraz gotowe rozwiązanie index.html i script.js.

## Poprawione rozbieżności

- Gotowy wynik zawiera „Wynik:”, zgodnie z przykładami z instrukcji.
- Połączono kontrolę pustych pól z komunikatem „Uzupełnij oba pola.”, a dla pozostałych błędów przywrócono szczegółowe komunikaty znane z lekcji 2. Każdy błąd kończy funkcję przez return.
- clearResult(prefix) ponownie wypisuje w konsoli „Pola wyczyszczone”.
- Potwierdzono zachowanie „Komplet punktów!” wyłącznie przy 100%; wcześniej dodany dopisek pozostaje w gotowym rozwiązaniu.
- Nazwa bieżącego materiału to „Lekcja 3”. Katalog, odwołania, tytuły HTML, PDF i komentarze używają tej nazwy.
- Każdy przedmiot ma prefiks: math- dla matematyki, polish- dla języka polskiego. Id, for i argumenty onclick są zgodne.
- Uporządkowano opis zadań dodatkowych. Gotowe rozwiązanie realizuje wymagania podstawowe i opcjonalne formatowanie liczb; inne przykłady i własny komunikat motywujący to dalsze ćwiczenia ucznia.

## Sprawdzone wymagania podstawowe

1. Próg zaliczenia 40% i granice wszystkich ocen, w tym 39,9/40, 54,9/55, 69,9/70, 84,9/85 i 94,9/95.
2. Wspólne calculatePercentage, gradeFromPercentage oraz obliczenia przez calculateResult(prefix).
3. Dwa niezależne zestawy pól; wynik, błąd i czyszczenie jednego nie zmieniają drugiego.
4. Puste pola, maksimum zero i ujemne, punkty ujemne i przekroczenie maksimum.
5. Dopisek dla 100% oraz jego znikanie przy kolejnym niższym wyniku lub czyszczeniu.
6. Neutralne klasy po czyszczeniu i komunikat w konsoli.
7. showExamples(): 40%, 70% i 95% dają oceny 2, 4 i 6.
8. generateTable(): 11 poprawnych ocen; ponowne wywołanie uzupełnia te same komórki.
9. Unikalne id, poprawne for etykiet i istniejące funkcje wszystkich przycisków.
10. Startowy HTML zawiera matematykę, skalę, przykłady i tabelę. Te sekcje są identyczne w rozwiązaniu końcowym. Różnica strukturalna to dodatkowa sekcja języka polskiego.

Testy wykonano w Node z odwzorowaniem elementów HTML oraz przez porównanie ich struktury. Sprawdzono składnię JS. PDF przejrzano wizualnie na wszystkich 10 stronach. W tej aktualizacji nie wykonywano pełnego testu interfejsu we wszystkich przeglądarkach.

Teoria opisuje także rozwiązanie pośrednie z let i else if; finalna gradeFromPercentage wykorzystuje wczesne return, dopuszczone w etapie B instrukcji. To dwa warianty tej samej logiki, a nie brak wymaganego działania.
