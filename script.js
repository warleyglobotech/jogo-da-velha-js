// =================================================================
// ARQUIVO script.js COMPLETO E REFATORADO COM ARROW FUNCTIONS
// =================================================================

// --- 1. Seleção dos Elementos do DOM ---
const cells = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('status-message');
const restartButton = document.getElementById('restart-button');

// --- 2. Variáveis de Estado do Jogo ---
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6]  // Diagonais
];

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

// --- 3. Funções (agora como Arrow Functions) ---
const handleCellPlayed = (clickedCellIndex) => {
    gameState[clickedCellIndex] = currentPlayer;
    cells[clickedCellIndex].innerHTML = currentPlayer;
};

const handlePlayerChange = () => {
    // Uso do operador ternário para alternar entre 'X' e 'O' de forma concisa.
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusMessage.innerHTML = `Vez do jogador ${currentPlayer}`;
};

const handleResultValidation = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusMessage.innerHTML = `Jogador ${currentPlayer} venceu!`;
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusMessage.innerHTML = `O jogo empatou!`;
        gameActive = false;
        return;
    }

    handlePlayerChange();
};

const handleCellClick = (clickedCellIndex) => {
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    handleCellPlayed(clickedCellIndex);
    handleResultValidation();
};

const handleRestartGame = () => {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusMessage.innerHTML = `Vez do jogador ${currentPlayer}`;
    cells.forEach(cell => cell.innerHTML = "");
};

// --- 4. Adicionando os "Ouvintes" de Evento (EventListeners) ---
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

restartButton.addEventListener('click', handleRestartGame);
