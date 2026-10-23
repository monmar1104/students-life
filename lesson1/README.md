# Lekcja 1. Pierwszy JavaScript — kalkulator sprawdzianu

To kompletna, działająca wersja **po lekcji 1**, zawierająca również rozwiązania opisanych tu ćwiczeń i pracy domowej, jeśli są częścią tego etapu. Otwórz `index.html` w przeglądarce; Bootstrap jest pobierany z internetu. Nie potrzeba npm ani budowania projektu.

## Praktyczny początek — 0–10 min

Dodaj do szkieletu dwa pola: zdobyte punkty i maksymalna liczba punktów, przycisk oraz miejsce na wynik. To pierwsza lekcja, więc zadanie startowe dotyczy HTML.

Punktem wyjścia jest główny katalog JS — etap 0. Uczeń pracuje na kopii poprzedniej wersji. Nie pokazuj gotowego rozwiązania z tego katalogu przed samodzielną próbą.

## Omówienie — 10–15 min

Uruchomcie rozwiązanie ucznia, porównajcie wyniki z wymaganiami i naprawcie błąd na konkretnych danych.

## Nowa wiedza — 15–22 min

const, funkcja nazwana, getElementById, value, Number, textContent, onsubmit i onclick.

## Rozbudowa — 22–40 min

Obliczanie procentów zdobytych na sprawdzianie i czyszczenie formularza. Podstawowe ograniczenia pól są w HTML; sprawdzanie zaliczenia i walidacja zależności między polami pojawią się w lekcji 2.

## Sprawdzenie działania — 40–45 min

35/50 → 70%; 10/20 → 50%; 0/20 → 0%; Wyczyść usuwa wartości i wynik. Puste pola oraz maksimum poniżej 1 zatrzymuje formularz HTML.

## Zadanie domowe / dalsza modyfikacja

Dodaj przycisk pokazujący liczbę brakujących punktów: maksimum minus zdobyte punkty.

## Zasada kodu

HTML definiuje interfejs. Bootstrap odpowiada za wygląd. JavaScript służy do obliczeń, zdarzeń i danych. Szablony powtarzalnych pozycji pojawiają się dopiero w lekcji 9. Dane są w pamięci i znikają po odświeżeniu.

W tym etapie HTML pilnuje wymaganych pól i podstawowych zakresów. Zależność „zdobyte punkty nie mogą przekraczać maksimum” uczeń doda w lekcji 2 podczas poznawania `if/else`.
