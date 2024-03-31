//Initialize variables
let uncoveredCards = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let movements = 0;
let successes = 0;
let timer = false;
let theTimer = 30;
let initialTime = 30;
let regressiveTime = null;

let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');


//Random number generation
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numbers = numbers.sort(() => { return Math.random() - 0.5 });
console.log(numbers);

//funtions

function time() {
    regressiveTime = setInterval(() => {
        theTimer--;
        mostrarTiempo.innerHTML = `Tiempo: ${theTimer} segundos`;
        if (theTimer == 0) {
            clearInterval(regressiveTime);
            blockCards();
        }
    }, 1000);
}

function blockCards() {
    for (let i = 0; i <= 15; i++) {
        let lockedCard = document.getElementById(i);
        lockedCard.innerHTML = numbers[i];
        lockedCard.disabled = true;
    }
}

//principal function
function uncover(id) {

    if (timer == false) {
        time();
        timer = true;
    }

    uncoveredCards++;
    console.log(uncoveredCards);

    if (uncoveredCards == 1) {
        //show first number
        card1 = document.getElementById(id);
        firstResult = numbers[id]
        card1.innerHTML = firstResult;

        //disable first button
        card1.disabled = true;
    } else if (uncoveredCards == 2) {
        //show second number
        card2 = document.getElementById(id);
        secondResult = numbers[id];
        card2.innerHTML = secondResult;

        //disable second button
        card2.disabled = true;

        //increase movements
        movements++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movements}`;

        if (firstResult == secondResult) {
            //
            uncoveredCards = 0;

            //increase hits
            successes++;
            mostrarAciertos.innerHTML = `Aciertos: ${successes}`;

            if (successes == 8) {
                clearInterval(regressiveTime);
                mostrarAciertos.innerHTML = `Aciertos : ${successes}`;
                mostrarTiempo.innerHTML = `Genial! Solo tardaste ${initialTime - theTimer} segundos`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movements}`;
            }

        } else {
            //show values and cover if erroneous
            setTimeout(() => {
                card1.innerHTML = ' ';
                card2.innerHTML = ' ';
                card1.disabled = false;
                card2.disabled = false;
                uncoveredCards = 0;
            }, 800);
        }
    }
}