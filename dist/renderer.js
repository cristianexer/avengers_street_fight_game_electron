"use strict";
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("./helper");
let test = document.getElementById('test');
let villainsList = document.getElementById('villains');
let heroesList = document.getElementById('heroes');
let planetsList = document.getElementById('planets');
//@ts-ignore
const chars = require("../assets/data/characters.json");
//@ts-ignore
const planets = require("../assets/data/planets.json");
const helper_2 = require("./helper");
chars.map((el) => el.isVillain === true ? (villainsList.innerHTML += helper_1.charPicker(el)) : (heroesList.innerHTML += helper_1.charPicker(el)));
planets.map((el) => (planetsList.innerHTML += helper_1.planetPicker(el)));
var chosenHero = 0;
var chosenVillian = 0;
var chosenPlanet = 0;
[...document.getElementsByClassName('chose_char')].forEach((el) => el.addEventListener('click', (e) => {
    //@ts-ignore
    if (el.dataset.type === 'hero') {
        //@ts-ignore
        chosenHero = el.dataset.id;
        helper_1.removeClassFromElements(document.getElementsByClassName('hero'), 'selected');
    }
    //@ts-ignore
    if (el.dataset.type === 'villain') {
        //@ts-ignore
        chosenVillian = el.dataset.id;
        helper_1.removeClassFromElements(document.getElementsByClassName('villain'), 'selected');
    }
    el.classList.add('selected');
}));
[...document.getElementsByClassName('chose_planet')].forEach((el) => el.addEventListener('click', (e) => {
    //@ts-ignore
    chosenPlanet = el.dataset.id;
    helper_1.removeClassFromElements(document.getElementsByClassName('planet'), 'selected');
    el.classList.add('selected');
}));
var hero;
var villain;
var planet;
document.getElementById('start').addEventListener('click', (e) => {
    init();
});
function init() {
    console.log(`
    heroID: ${chosenHero}\n
    villainID: ${chosenVillian}\n
    planetID: ${chosenPlanet}\n
    `);
    hero = new helper_2.Character(chars[chosenHero - 1].name, chars[chosenHero - 1].health, chars[chosenHero - 1].attack, chars[chosenHero - 1].isVillain);
    console.log(hero);
    villain = new helper_2.Character(chars[chosenVillian - 1].name, chars[chosenVillian - 1].health, chars[chosenVillian - 1].attack, chars[chosenVillian - 1].isVillain);
    console.log(villain);
    planet = new helper_2.Planet(planets[chosenPlanet - 1].name, planets[chosenPlanet - 1].modifiers.heroAttackModifier, planets[chosenPlanet - 1].modifiers.heroHealthModifier, planets[chosenPlanet - 1].modifiers.villainAttackModifier, planets[chosenPlanet - 1].modifiers.villainHealthModifier);
    console.log(planet);
    helper_1.fight(hero, villain, planet);
}
//# sourceMappingURL=renderer.js.map