// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import { charPicker, removeClassFromElements, planetPicker, fight } from './helper';

let test = document.getElementById('test');

let villainsList = document.getElementById('villains');
let heroesList = document.getElementById('heroes');
let planetsList = document.getElementById('planets');

//@ts-ignore
import * as chars from '../assets/data/characters.json';

//@ts-ignore
import * as planets from '../assets/data/planets.json';

import { Planet, Character } from './helper';

chars.map(
	(el: any) =>
		el.isVillain === true ? (villainsList.innerHTML += charPicker(el)) : (heroesList.innerHTML += charPicker(el))
);

planets.map((el: any) => (planetsList.innerHTML += planetPicker(el)));

var chosenHero = 0;
var chosenVillian = 0;
var chosenPlanet = 0;

[ ...document.getElementsByClassName('chose_char') ].forEach((el) =>
	el.addEventListener('click', (e) => {
		//@ts-ignore
		if (el.dataset.type === 'hero') {
			//@ts-ignore
			chosenHero = el.dataset.id;
			removeClassFromElements(document.getElementsByClassName('hero'), 'selected');
		}
		//@ts-ignore
		if (el.dataset.type === 'villain') {
			//@ts-ignore
			chosenVillian = el.dataset.id;
			removeClassFromElements(document.getElementsByClassName('villain'), 'selected');
		}

		el.classList.add('selected');
	})
);

[ ...document.getElementsByClassName('chose_planet') ].forEach((el) =>
	el.addEventListener('click', (e) => {
		//@ts-ignore
		chosenPlanet = el.dataset.id;

		removeClassFromElements(document.getElementsByClassName('planet'), 'selected');
		el.classList.add('selected');
	})
);

var hero: Character;
var villain: Character;
var planet: Planet;

document.getElementById('start').addEventListener('click', (e) => {
	init();
});

function init() {
	console.log(`
    heroID: ${chosenHero}\n
    villainID: ${chosenVillian}\n
    planetID: ${chosenPlanet}\n
    `);

	hero = new Character(
		chars[chosenHero - 1].name,
		chars[chosenHero - 1].health,
		chars[chosenHero - 1].attack,
		chars[chosenHero - 1].isVillain
	);
	console.log(hero);
	villain = new Character(
		chars[chosenVillian - 1].name,
		chars[chosenVillian - 1].health,
		chars[chosenVillian - 1].attack,
		chars[chosenVillian - 1].isVillain
	);
	console.log(villain);
	planet = new Planet(
		planets[chosenPlanet - 1].name,
		planets[chosenPlanet - 1].modifiers.heroAttackModifier,
		planets[chosenPlanet - 1].modifiers.heroHealthModifier,
		planets[chosenPlanet - 1].modifiers.villainAttackModifier,
		planets[chosenPlanet - 1].modifiers.villainHealthModifier
	);
	console.log(planet);

	fight(hero, villain, planet);
}
