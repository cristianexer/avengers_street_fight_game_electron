"use strict";
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
    constructor(name, health, attack, isVillain) {
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.isVillain = isVillain;
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
function fight(char1, char2, planet) {
    let turn = 1;
    char1.applyModifier(planet);
    char2.applyModifier(planet);
    while (char1.isAlive() || char2.isAlive()) {
        char1.attacks(char2);
        char2.attacks(char1);
        turn++;
    }
    console.log(`
    Turns:${turn}\n
    Winner: ${char1.isAlive() ? char1.name : char2.name}\n
    Planet: ${planet.name}
    `);
}
exports.fight = fight;
//# sourceMappingURL=helper.js.map