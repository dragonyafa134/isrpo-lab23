const cell = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

cell.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
});

restartBtn.addEventListener("click", restartGame);

function handleCellClick(event){
    const cell = event.target;
    const index  = cell.getAttribute("data-index");
    if (board[index] !== "" || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++){
        const [a, b, c] = winConditions[i];

        if (board[a] && board[a] === board[b] && board[a] === board[c]){
            roundWon = true;
            break;
        }

        if (roundWon) {
            statusText.textContent = `Игрок ${currentPlayer} победил!`;
            gameActive = false;
            return;
        }

        if (!board.includes("")){
            statusText.textContent = "Ничья!";
            gameActive = false;
            return;
        }
    }
    currentPlayer = currentPlayer === "X" ? "0" : "X";
    statusText.textContent = `Ход игрока ${currentPlayer}`;
}

function restartGame() {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusText.textContent = "Ход игрока Х";

    cell.forEach((cell) => {
        cell.textContent = "";
    });
}





//рассказ кода (чтобы точно точно все понгять)
//тут все получаем
const form = document.getElementById('userForm');
const clearBtn = document.getElementById('clearBtn');
const profileInfo = document.getElementById('profileInfo');

const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const cityInput = document.getElementById('city');
const hobbyInput = document.getElementById('hobby');

const nameError = document.getElementById('nameError');
const ageError = document.getElementById('ageError');
const cityError = document.getElementById('cityError');
const hobbyError = document.getElementById('hobbyError');

// Функция проверки формы
function validateForm() {
    let isValid = true; //возращаем да если все данные введены верно
    
    if (nameInput.value == "") { //проверка пустого поля 
        nameError.innerHTML = "Напишите имя";  //требуем
        nameInput.style.borderColor = "red"; //если ошмбка то красим рамку в красный(инет)
        isValid = false; //если пустое поле у нас то форма не работат
    } else {
        nameError.innerHTML = "";
        nameInput.style.borderColor = "#ddd";
    }
    
    if (!ageInput.value) {
        ageError.innerHTML = 'Введите возраст';
        ageInput.style.borderColor = "red";
        isValid = false;
    } else {
        const age = parseInt(ageInput.value);
        if (isNaN(age) || age < 1 || age > 120) {
            showError(ageError, 'Возраст от 1 до 120 лет');
            ageInput.classList.add('error');
            isValid = false;
        } else {
            ageInput.innerHTML = "";
            ageInput.style.borderColor = "#ddd";
        }
    }
    
    if (!cityInput.value) { 
        cityError.innerHTML = 'Введите город';
        cityInput.style.borderColor = "red";
        isValid = false;
    } else {
        cityInput.innerHTML = "";
        cityInput.style.borderColor = "#ddd";
    }
    
    if (!hobbyInput.value.trim()) {
        hobbyError.innerHTML =  'Введите хобби';
        hobbyInput.style.borderColor = "red";
        isValid = false;
    } else {
        hobbyInput.innerHTML = "";
        hobbyInput.style.borderColor = "#ddd";
    }

    return isValid;
}


function clearErrors() { //Очищает текст всех сообщений об ошибках
    nameError.textContent = '';
    ageError.textContent = '';
    cityError.textContent = '';
    hobbyError.textContent = '';
}

function clearAllData() {
    nameInput.value = '';
    ageInput.value = '';
    cityInput.value = '';
    hobbyInput.value = '';
    
    clearErrors();
    
    nameInput.classList.remove('error');
    ageInput.classList.remove('error');
    cityInput.classList.remove('error');
    hobbyInput.classList.remove('error');
    
    displayProfileData({});
    
    alert('Данные очищены');
}

