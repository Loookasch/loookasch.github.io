console.log("Hello World :)")

const Id = (id) => { return document.getElementById(id); };

class diceGame {
    constructor(numOfPlayers) {
        this.numOfPlayers = 2;
        this.dice = [0, 0, 0, 0, 0];
        this.diceLock = [0, 0, 0, 0, 0];
        this.currentComboValues = Array(13).fill(0)
        this.points = [
            undefined, // 0     1er
            undefined, // 1     2er
            undefined, // 2     3er
            undefined, // 3     4er
            undefined, // 4     5er
            undefined, // 5     6er
            undefined, // 6     3er Pasch
            undefined, // 7     4er Pasch
            undefined, // 8     Full House
            undefined, // 9     kl Str
            undefined, // 10    gr Str
            undefined, // 11    Kniffel
            undefined  // 12    Chance
        ]
        this.throws = 0;
        this.audioThrow = new Audio('sound_dice_roll.mp3');
        this.throwDice();
    }

    throwDice() {
        if (this.throws >= 3) return alert("Na Na Na, du kannst nicht nochmal würfeln 😭")
        this.throws++;
        this.dice = this.dice.map((x, i) => { return !this.diceLock[i] ? Math.ceil(Math.random() * 6) : x });

        this.calculateCombo();
        console.log("Werte:", this.currentComboValues)
        this.updateTable();
        this.audioThrow.play()
        this.updateDicePositions()

    }

    toggleDiceLock(i) {
        this.diceLock[i - 1] = 1 - this.diceLock[i - 1];
        this.updateTable()
    }

    calculateCombo() {
        const counts = Array(6).fill(0);

        this.dice.forEach(num => { counts[num - 1]++; });

        const straight = [...new Set(this.dice)].sort().join("")
        const sum = this.dice.reduce((sum, num) => sum + num, 0)

        this.currentComboValues = [
            counts[0] * 1, counts[1] * 2, counts[2] * 3, counts[3] * 4, counts[4] * 5, counts[5] * 6,
            counts.some(num => num >= 3) ? sum : 0,
            counts.some(num => num >= 4) ? sum : 0,
            (counts.some(num => num == 2) && counts.some(num => num == 3)) ? 25 : 0,
            (straight.includes("1234") || straight.includes("2345") || straight.includes("3456")) ? 30 : 0,
            (straight.includes("12345") || straight.includes("23456")) ? 40 : 0,
            counts.some(num => num == 5) ? 50 : 0,
            sum
        ]
    }

    setValue(i) {
        this.points[i] = this.currentComboValues[i]
        console.log("Punkte:", this.points)
        this.diceLock = this.diceLock.fill(0);
        this.throws = 0;
        this.throwDice();
    }

    updateDicePositions() {

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        const randXPositions = shuffleArray([0.16, 0.33, 0.5, 0.66, 0.83]);
        const randYPositions = shuffleArray([0.16, 0.33, 0.5, 0.66, 0.83]);

        const dicearea = Id("dicearea")

        this.dice.forEach((val, i) => {
            const currentDice = Id("dice" + (i + 1))
            if (!currentDice.classList.contains("lockedDice")) {
                currentDice.style.left = (randXPositions.pop() * (dicearea.clientWidth - currentDice.offsetWidth)) + "px";
                currentDice.style.top = (randYPositions.pop() * (dicearea.clientHeight - currentDice.offsetHeight)) + "px";
                currentDice.style.transform = "rotate(" + (Math.random() * 360) + "deg)";
            } else {
                currentDice.style.top = "-79px";
                currentDice.style.transform = "rotate(0deg)";
                currentDice.style.left = ((i * 45) + 5) + "px";
            }
        });
    }

    updateTable() {

        this.dice.forEach((val, i) => {
            const currentDice = Id("dice" + (i + 1))

            currentDice.dataset.value = val;
            currentDice.classList.toggle("lockedDice", this.diceLock[i]);
        });
        Id("throws").innerHTML = this.throws

        document.querySelectorAll(".combo").forEach((cell, i) => { 
            cell.innerHTML = this.points[i] !== undefined ? this.points[i] : "(" +this.currentComboValues[i] + ")";
        });
        const bonus = this.points.slice(0, 6).reduce((sum, num) => sum + (Number(num) || 0), 0) >= 63 ? 35 : 0;
        const totalUpper  = this.points.slice(0, 6).reduce((sum, num) => sum + (Number(num) || 0), 0) + bonus;
        const totalLower  = this.points.slice(6).reduce((sum, num) => sum + (Number(num) || 0), 0);
        Id("bonus").innerHTML = bonus
        Id("totalUpper").innerHTML = totalUpper;
        Id("totalLower").innerHTML = totalLower;
        Id("total").innerHTML = totalUpper + totalLower;
    }
}

const game = new diceGame;

Id("throwBtn").addEventListener("click", () => { game.throwDice() })

Id("dice1").addEventListener("click", () => { game.toggleDiceLock(1) })
Id("dice2").addEventListener("click", () => { game.toggleDiceLock(2) })
Id("dice3").addEventListener("click", () => { game.toggleDiceLock(3) })
Id("dice4").addEventListener("click", () => { game.toggleDiceLock(4) })
Id("dice5").addEventListener("click", () => { game.toggleDiceLock(5) })

const cells = document.querySelectorAll(".combo");
cells.forEach((cell, i) => {
    cell.addEventListener("click", () => {
        if (!cell.classList.contains("lockedCombo")) {
            cell.classList.toggle("lockedCombo");
            game.setValue(i)
        } else {
            alert("Das geht nicht mehr 😭")
        }
    });
});
