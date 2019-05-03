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
var fightWindow = document.getElementById('fight');
var menuWindow = document.getElementById('menu');
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
document.getElementById('replay').addEventListener('click', (e) => {
    menuWindow.classList.remove('hide');
    fightWindow.classList.add('hide');
    helper_1.removeClassFromElements(document.getElementsByClassName('planet'), 'selected');
    helper_1.removeClassFromElements(document.getElementsByClassName('villain'), 'selected');
    helper_1.removeClassFromElements(document.getElementsByClassName('hero'), 'selected');
});
function init() {
    console.log(`
    heroID: ${chosenHero}\n
    villainID: ${chosenVillian}\n
    planetID: ${chosenPlanet}\n
    `);
    chosenHero -= 1;
    chosenVillian -= 1;
    chosenPlanet -= 1;
    hero = new helper_2.Character(chars[chosenHero].name, chars[chosenHero].health, chars[chosenHero].attack, chars[chosenHero].isVillain, chosenHero + 1);
    villain = new helper_2.Character(chars[chosenVillian].name, chars[chosenVillian].health, chars[chosenVillian].attack, chars[chosenVillian].isVillain, chosenVillian + 1);
    planet = new helper_2.Planet(planets[chosenPlanet].name, planets[chosenPlanet].modifiers.heroAttackModifier, planets[chosenPlanet].modifiers.heroHealthModifier, planets[chosenPlanet].modifiers.villainAttackModifier, planets[chosenPlanet].modifiers.villainHealthModifier);
    menuWindow.classList.add('hide');
    fightWindow.classList.remove('hide');
    helper_1.fight(hero, villain, planet, {
        char1: document.getElementById('char1'),
        char2: document.getElementById('char2'),
        planet: document.getElementById('planet'),
        turn: document.getElementById('turn'),
        results: document.getElementById('results')
    });
}
//# sourceMappingURL=renderer.js.map