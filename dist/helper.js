"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function charPicker(char) {
    return `
    <div class="col-12 mx-auto my-3 border rounded char chose_char ${char.isVillain === true
        ? 'villain'
        : 'hero'}" data-id="${char.id}" data-type="${char.isVillain === true ? 'villain' : 'hero'}">
        <div class="row">
            <div class="col-2 mx-auto border-right">
               
                    <img src="assets/images/${char.id}.jpg" alt="${char.name}" class="img-fluid">
               
            </div>
            <div class="col-10 mx-auto text-center">
                <h6>
                    ${char.name}
                </h6>
            </div>
            
            <div class="col-12 mx-auto border-top description">
                ${char.description}
            </div>
        </div>
    </div>
    `;
}
exports.charPicker = charPicker;
function wait(ms) {
    return new Promise((resolve, rej) => {
        setTimeout(resolve, ms);
    });
}
exports.wait = wait;
function planetPicker(planet) {
    return `
    <div class="col-4 mx-auto my-3 planet chose_planet" data-id="${planet.id}">
        <div class="col-12 border rounded ">
            <div class="row">
                <div class="col-10 mx-auto text-center">
                    <h6>
                        ${planet.name}
                    </h6>
                </div>
                
                <div class="col-12 mx-auto border-top description">
                    ${planet.description}
                </div>
            </div>
        </div>
    </div>
    `;
}
exports.planetPicker = planetPicker;
function charCard(char) {
    return `
	<div class="card">
  <img class="card-img-top" src="assets/images/${char.id}.jpg" alt="${char.name}">
  <div class="card-body">
    <h5 class="card-title">${char.name}</h5>
	<p class="card-text">
	Health: ${char.health}
	Attack: ${char.attack}
	</p>
  </div>
</div>
	
	`;
}
exports.charCard = charCard;
function planetCard(planet) {
    return `
	<div class="card">
  <div class="card-body text-center">
	<h5 class="card-title">${planet.name}</h5>
		<p class="card-text">
			Heroes Health Modifier: ${planet.heroHealthModifier}
		</p>
		<p class="card-text">
		Heroes Attack Modifier: ${planet.heroAttackModifier}
			</p>
		<p class="card-text">
		Villain Health Modifier: ${planet.villainHealthModifier}
			</p>
		<p class="card-text">
		Villain Attack Modifier: ${planet.villainAttackModifier}
			</p>
  </div>
</div>
	
	`;
}
exports.planetCard = planetCard;
function removeClassFromElements(elements, cls) {
    [...elements].forEach((el) => el.classList.remove(cls));
}
exports.removeClassFromElements = removeClassFromElements;
function choseRandomChar(charsLength) { }
exports.choseRandomChar = choseRandomChar;
class Planet {
    constructor(name, heroAttackModifier, heroHealthModifier, villainAttackModifier, villainHealthModifier) {
        this.heroAttackModifier = heroAttackModifier;
        this.heroHealthModifier = heroHealthModifier;
        this.villainAttackModifier = villainAttackModifier;
        this.villainHealthModifier = villainHealthModifier;
        this.name = name;
    }
}
exports.Planet = Planet;
class Character {
    constructor(name, health, attack, isVillain, id) {
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.isVillain = isVillain;
        this.id = id;
    }
    applyModifier(planet) {
        if (this.isVillain) {
            this.attack += planet.villainAttackModifier;
            this.health += planet.villainHealthModifier;
        }
        else {
            this.attack += planet.heroAttackModifier;
            this.health += planet.heroHealthModifier;
        }
    }
    isAlive() {
        return this.health > 0;
    }
    attacks(enamy) {
        enamy.health -= this.attack;
    }
    getLife() {
        return this.health;
    }
    getName() {
        return this.name;
    }
    getAttack() {
        return this.attack;
    }
}
exports.Character = Character;
function fight(char1, char2, planet, elements) {
    return __awaiter(this, void 0, void 0, function* () {
        let turn = 1;
        let charWaitTime = 300;
        let turnWaitTime = 100;
        char1.applyModifier(planet);
        char2.applyModifier(planet);
        elements.planet.innerHTML = planetCard(planet);
        elements.char1.innerHTML = charCard(char1);
        elements.char2.innerHTML = charCard(char2);
        while (char1.isAlive() && char2.isAlive()) {
            elements.turn.innerText = turn;
            yield wait(turnWaitTime);
            char1.attacks(char2);
            yield wait(charWaitTime);
            elements.char1.innerHTML = charCard(char1);
            char2.attacks(char1);
            yield wait(charWaitTime);
            elements.char2.innerHTML = charCard(char2);
            turn++;
        }
        elements.turn.innerText = turn;
        elements.results.innerHTML = `
	<div class="col-12">
	<h3 class="text-center">Results</h3>
	</div>
	<div class="col-12 border rounded">
	<p class="text-center my-1">
		Turns:${turn}
	</p>
	<p class="text-center my-1">
		Winner: ${char1.isAlive() ? char1.name : char2.name}
	</p>
	<p class="text-center my-1">
		Planet: ${planet.name}
	</p>
	</div>
    `;
    });
}
exports.fight = fight;
//# sourceMappingURL=helper.js.map