# Lekcja 3 — pakiet startowy ucznia

Otwórz index.html. HTML zawiera już kalkulator matematyki, skalę ocen, tabelę z 11 wierszami, akapit examples oraz przyciski „Trzy przykłady” i „Uzupełnij tabelę”. Wygląd korzysta z Bootstrap CDN.

W script.js znajduje się działająca logika lekcji 2 oraz dwa miejsca TODO: showExamples() i generateTable(). Zaliczenie następuje od 40%. Nowe zadania wykonaj według INSTRUKCJA.pdf.

1. Dodaj komunikat „Komplet punktów!” przy 100%, a następnie rozbuduj JS o skalę ocen 1–6.
2. Wydziel wspólne funkcje z parametrami i return; zaprogramuj showExamples().
3. Dodaj w HTML wyłącznie kalkulator języka polskiego przez skopiowanie sekcji matematyki; zmień id, for i argumenty onclick na wariant polish-; matematyka używa math-.
4. Rozbuduj calculateResult(prefix) i clearResult(prefix), aby obsługiwały obie sekcje.
5. Napisz generateTable() z pętlą for, która uzupełnia istniejące komórki tabeli.

Nie trzeba dopisywać tabeli, skali ocen ani przycisków w HTML. Nowa sekcja języka polskiego to jedyna zmiana struktury HTML w tej lekcji. Całą logikę programujesz w script.js.

Rozwiązanie końcowe prowadzącego jest katalog wyżej. Pracuj w tej wersji startowej, aby samodzielnie wykonać zadania.

Oba przedmioty mają własny prefiks: matematyka math-, język polski polish-. Przykładowe pola to math-points i polish-points; funkcje otrzymują odpowiedni prefiks w onclick.
