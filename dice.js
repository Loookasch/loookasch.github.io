console.log("Hello World :) V2")

const Id = (id) => { return document.getElementById(id) };

const Sum = arr => arr.reduce((a, b) => a + b, 0);
const Count = arr => {
    const counts = Array(Math.max(...arr)).fill(0);
    arr.forEach(num => { counts[num - 1]++ });
    return counts;
}

class DieD6 {
    value = undefined;
    locked = false;

    reroll = () => this.value = Math.ceil(Math.random() * 6);
    getValue = () => this.value;

    lock = () => this.locked = true;
    unlock = () => this.locked = false;
}

class ClassicGame {
    constructor(amount = 5) {
        this.dice = Array.from({ length: amount }, () => new DieD6());
    }

    rerollAll = () => this.dice.forEach(die => { if (!die.locked) die.reroll() });

    getValues = () => { return this.dice.map(die => die.getValue()) }

    lock = (index) => this.dice[index]?.lock();

    unlock = (index) => this.dice[index]?.unlock();

}

class Combo {
    comboName = undefined;
    howToScore = undefined;
    score = () => { throw new Error("must overwrite this!") }
}

class ComboOnes extends Combo {
    comboName = "1er";
    howToScore = "nur Einser zählen";
    score = (values) => { return Sum(values.filter((value) => value === 1)) }
}

class ComboTwos extends Combo {
    comboName = "2er";
    howToScore = "nur Zweier zählen";
    score = (values) => { return Sum(values.filter((value) => value === 2)) }
}

class ComboThrees extends Combo {
    comboName = "3er";
    howToScore = "nur Dreier zählen";
    score = (values) => { return Sum(values.filter((value) => value === 3)) }
}

class ComboFours extends Combo {
    comboName = "4er";
    howToScore = "nur Vierer zählen";
    score = (values) => { return Sum(values.filter((value) => value === 4)) }
}

class ComboFives extends Combo {
    comboName = "5er";
    howToScore = "nur Fünfer zählen";
    score = (values) => { return Sum(values.filter((value) => value === 5)) }
}

class ComboSixes extends Combo {
    comboName = "6er";
    howToScore = "nur Sechser zählen";
    score = (values) => { return Sum(values.filter((value) => value === 6)) }
}

class ComboThreeOfAKind extends Combo {
    comboName = "Dreierpasch";
    howToScore = "alle Augen zählen";
    score = (values) => { return Count(values).some(num => num >= 3) ? Sum(values) : 0 }
}

class ComboFourOfAKind extends Combo {
    comboName = "Dreierpasch";
    howToScore = "alle Augen zählen";
    score = (values) => { return Count(values).some(num => num >= 4) ? Sum(values) : 0 }
}

class ComboFullHouse extends Combo {
    comboName = "Full House";
    howToScore = "25 Punkte";
    score = (values) => {
        const counts = Count(values)
        return (counts.includes(2) && counts.includes(3)) ? 25 : 0
    }
}

const dice = new ClassicGame(5);

dice.rerollAll();          // würfelt alle
console.log(dice.getValues());

// z.B. Würfel 0 locken
dice.lock(0);

// nochmal würfeln → Würfel 0 bleibt gleich
dice.rerollAll();
console.log(dice.getValues());

console.log((new ComboOnes()).score(dice.getValues()))
console.log((new ComboTwos()).score(dice.getValues()))
console.log((new ComboThrees()).score(dice.getValues()))
console.log((new ComboFours()).score(dice.getValues()))
console.log((new ComboFives()).score(dice.getValues()))
console.log((new ComboSixes()).score(dice.getValues()))
console.log((new ComboThreeOfAKind()).score(dice.getValues()))
console.log((new ComboFourOfAKind()).score(dice.getValues()))
console.log((new ComboFullHouse()).score(dice.getValues()))