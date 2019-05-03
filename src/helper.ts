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
	name: string;
	health: number;
	attack: number;
	isVillain: boolean;

	constructor(name: string, health: number, attack: number, isVillain: boolean) {
		this.name = name;
		this.health = health;
		this.attack = attack;
		this.isVillain = isVillain;
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

export function fight(char1: Character, char2: Character, planet: Planet) {
	let turn: number = 1;

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
