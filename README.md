# Päivän sää

Tämä on sääsovellus, joka tarjoaa ajankohtaista säädataa annetulle sijainnille ja sisältää myös suosikkikaupunkien lisäämisen suosikkilistaan.

## Ominaisuudet

- Hae ajankohtaista säädataa tietystä sijainnista
- Näytä lämpötila, kosteus, tuuli ja muut säätilatiedot
- Hae sääennusteita kaupungin nimen tai koordinaattien perusteella
- Responsiivinen suunnittelu mobiili- ja työpöytälaitteille

## Asentaminen

1. Kloonaa repository: `git clone https://github.com/your-username/weather-forecast-app.git`
2. Asenna riippuvuudet: `npm install`
3. Käynnistä sovellus: `npm start`
4. Ympäristömuuttujiin täytyy antaa OpenWeatherMapin API-avain kohtaan: API_KEY=''

## Käyttäminen

1. Avaa sovellus web-selaimessasi osoitteessa localhost:3000.
2. Syötä kaupungin nimi tai sen koordinaatit hakupalkkiin.
3. Klikkaa "Hae" -painiketta hakeaksesi sääennusteita.
4. Ajankohtaiset säätilatiedot näytetään ruudulla.

## Suosikit

1. Suosikkilista tallentuu evästeisiin.
2. Voit lisätä paikkakunnan listaan sivun yläosassa olevalla kentällä.
3. Suosikkilistassa olevat paikkakunnat näyttävät sivulla perustiedot useasta paikasta kerralla.
4. Voit poistaa suosikkilistan kohteita kirjoittamalla paikan nimen alempaan tekstikenttään ja painamalla Poista.
5. Voit myös tyhjentää koko suosikkilistan poistamalla sivun evästeet.

## Käytetyt teknologiat

- HTML
- CSS
- JavaScript
- Node

## Esittelyvideo

https://youtu.be/AO7QjGrqh3s