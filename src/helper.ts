export function charPicker(char: any) {
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

export function wait(ms: number) {
	return new Promise((resolve, rej) => {
		setTimeout(resolve, ms);
	});
}

export function planetPicker(planet: any) {
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

export function charCard(char: any) {
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

export function planetCard(planet: any) {
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

export function removeClassFromElements(elements: any, cls: string) {
	[ ...elements ].forEach((el) => el.classList.remove(cls));
}

export function choseRandomChar(charsLength: number) {}

export class Planet {
	name: string;
	heroAttackModifier: number;
	heroHealthModifier: number;
	villainAttackModifier: number;
	villainHealthModifier: number;

	constructor(
		name: string,
		heroAttackModifier: number,
		heroHealthModifier: number,
		villainAttackModifier: number,
		villainHealthModifier: number
	) {
		this.heroAttackModifier = heroAttackModifier;
		this.heroHealthModifier = heroHealthModifier;
		this.villainAttackModifier = villainAttackModifier;
		this.villainHealthModifier = villainHealthModifier;
		this.name = name;
	}
}

export class Character {
	id: number;
	name: string;
	health: number;
	attack: number;
	isVillain: boolean;

	constructor(name: string, health: number, attack: number, isVillain: boolean, id: number) {
		this.name = name;
		this.health = health;
		this.attack = attack;
		this.isVillain = isVillain;
		this.id = id;
	}

	public applyModifier(planet: Planet): void {
		if (this.isVillain) {
			this.attack += planet.villainAttackModifier;
			this.health += planet.villainHealthModifier;
		} else {
			this.attack += planet.heroAttackModifier;
			this.health += planet.heroHealthModifier;
		}
	}

	public isAlive(): boolean {
		return this.health > 0;
	}

	public attacks(enamy: Character): void {
		enamy.health -= this.attack;
	}

	public getLife(): number {
		return this.health;
	}
	public getName(): string {
		return this.name;
	}

	public getAttack(): number {
		return this.attack;
	}
}

export async function fight(char1: Character, char2: Character, planet: Planet, elements: any) {
	let turn: number = 1;
	let charWaitTime = 300;
	let turnWaitTime = 100;

	char1.applyModifier(planet);
	char2.applyModifier(planet);

	elements.planet.innerHTML = planetCard(planet);
	elements.char1.innerHTML = charCard(char1);
	elements.char2.innerHTML = charCard(char2);

	while (char1.isAlive() && char2.isAlive()) {
		elements.turn.innerText = turn;

		await wait(turnWaitTime);
		char1.attacks(char2);

		await wait(charWaitTime);
		elements.char1.innerHTML = charCard(char1);

		char2.attacks(char1);
		await wait(charWaitTime);
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
}
