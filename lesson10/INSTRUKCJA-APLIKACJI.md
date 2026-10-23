# Student Life — gotowy projekt kursowy

Aplikacja przygotowana na podstawie rozmowy: https://chatgpt.com/share/6ad1cf17-ebe4-83ed-bf91-6867d12e64e5

## Uruchomienie

Otwórz `index.html` w aktualnej przeglądarce. Projekt korzysta z Bootstrap 5.3.8 pobieranego z CDN jsDelivr. Do załadowania stylów potrzebny jest internet; nie wymaga konta ani instalacji. Wszystkie pliki z folderu muszą pozostać obok siebie.

Dla stabilnego zapisu danych podczas pracy nad kodem zalecamy lokalny serwer. W terminalu przejdź do folderu projektu i uruchom:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Następnie otwórz http://127.0.0.1:8000. Zatrzymanie serwera: Ctrl+C. Korzystaj stale z tego samego adresu i portu, ponieważ pamięć przeglądarki jest przypisana do adresu. Zachowanie localStorage po bezpośrednim otwarciu pliku zależy od przeglądarki.

## Funkcje

- Kalkulator procentowego wyniku sprawdzianu, informacja o zaliczeniu oraz ocena.
- Walidacja pustych pól, ujemnych punktów, zerowego maksimum i przekroczenia maksimum.
- Zapisywanie obliczonej oceny w wybranym przedmiocie.
- Dodawanie i usuwanie przedmiotów oraz ocen; średnia ogólna i średnie przedmiotowe.
- Najwyższa ocena i licznik ocen.
- Lista zadań domowych: przedmiot, termin, oznaczanie ukończenia, usuwanie, zaległe terminy.
- Tabela wyników generowana pętlą z wybranym krokiem.
- Automatyczny zapis w localStorage, eksport i przywracanie kopii JSON.
- Układ dostosowany do telefonu i komputera.

Pierwsze uruchomienie dodaje trzy puste przedmioty. Nie ma fikcyjnych ocen ani zadań. Kliknięcie kafelka oceny usuwa tę ocenę; jego opis dostępności i dymek objaśniają tę czynność. Usunięcie przedmiotu wymaga potwierdzenia, usuwa jego oceny, a zadania zachowuje bez przedmiotu.

## Reguły obliczeń

Procent = zdobyte punkty / maksymalne punkty × 100. Zaliczenie następuje od 40%.

| Przedział procentowy | Ocena |
| --- | --- |
| 0 ≤ wynik < 40 | 1 |
| 40 ≤ wynik < 55 | 2 |
| 55 ≤ wynik < 70 | 3 |
| 70 ≤ wynik < 85 | 4 |
| 85 ≤ wynik < 95 | 5 |
| 95 ≤ wynik ≤ 100 | 6 |

Zaliczenie następuje od 40%, czyli od oceny 2. Wynik poniżej 40% oznacza ocenę 1 i brak zaliczenia; oceny 2–6 oznaczają zaliczenie. Zmiana skali ocen: funkcja `gradeFromPercentage()` w `script.js`. Zmiana zaliczenia: warunek `percentage >= 40` w `calculateResult()` oraz objaśnienie w HTML.

Średnie są arytmetyczne, bez wag; każdy zapis oceny liczy się osobno. Przedmioty bez ocen nie wpływają na średnią. Przeliczenie oceny wykorzystuje dokładny wynik, a prezentacja procentów jest zaokrąglana maksymalnie do dwóch miejsc.

## Pliki

- `index.html` — pełna struktura interfejsu, formularze, komunikaty, nagłówki tabeli, puste stany i szablony `<template>` dla powtarzalnych pozycji.
- `styles.css` — tylko dwie reguły dla natywnego okna dialogowego. Układ, responsywność, formularze, przyciski i dynamiczne elementy korzystają z klas Bootstrap.
- `script.js` — obliczenia, walidacja, obsługa zdarzeń, aktualizacja danych w istniejącym HTML i zapis.
- `PLAN-LEKCJI.md` — praktyczny plan rozwoju projektu podczas kursu.
- `WERYFIKACJA.md` — zakres wykonanych testów.

## Dane

Dane pozostają w lokalnej przeglądarce. Nie ma serwera aplikacji, synchronizacji między urządzeniami ani logowania. Wyczyszczenie danych strony lub używanie trybu prywatnego może spowodować ich utratę. Przycisk „Eksportuj kopię danych” zapisuje plik JSON; „Przywróć kopię” wczytuje go po sprawdzeniu formatu i potwierdzeniu zastąpienia danych. Kopię można przenieść między urządzeniami.

## Wykorzystanie na lekcjach

To kompletna wersja referencyjna dla prowadzącego. Uczeń powinien rozwijać własny projekt stopniowo. W kodzie początkowym kursu można używać nazwanych funkcji z `onclick`; wersja końcowa wiąże zdarzenia przez `addEventListener`. Nie zawiera to oddzielnych gotowych implementacji każdej lekcji. Plan opisuje zadania i kryteria działania.

## Bootstrap

Dokumentacja: https://getbootstrap.com/docs/5.3/ . CSS dołączono przez CDN z przypiętą wersją 5.3.8 i atrybutem integrity. Projekt używa m.in. siatki row/col, kart card, formularzy form-control/form-select/form-check-input, przycisków btn, komunikatów alert i klas narzędziowych. Bootstrap JavaScript nie jest potrzebny; potwierdzenie usunięcia korzysta z natywnego dialog.

## HTML jako podstawa interfejsu

Cała struktura i klasy Bootstrap znajdują się w `index.html`. Wynik kalkulatora, puste listy, tabela z nagłówkami i odnośnik pobierania są stałymi elementami HTML. JavaScript uzupełnia tekst przez `textContent`, przełącza `hidden`, aktualizuje stany i zapisuje dane.

Przedmioty, oceny, zadania, opcje wyboru przedmiotu i wiersze wyników mają szablony `<template>` w HTML. Funkcja `copyTemplate()` kopiuje gotowy element przez `cloneNode(true)` wyłącznie wtedy, gdy potrzebna jest kolejna pozycja listy. Kod JS nie zawiera znaczników HTML, `innerHTML` ani `createElement()`. Przykładowo: układ zadania zmieniasz w `task-template`, a regułę ukończenia — w `renderTasks()`.

Na początku kursu korzystaj z istniejących elementów HTML i prostych funkcji zmieniających ich zawartość. Szablony wprowadź przy dynamicznych listach. Zachowujemy dane `student-life-v1`, więc aktualizacja interfejsu nie wymaga usuwania zapisanych ocen i zadań.
