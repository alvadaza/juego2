const choices = document.querySelectorAll('.choice');
const resultDiv = document.getElementById('result');
const playerScoreSpan = document.getElementById('playerScore');
const computerScoreSpan = document.getElementById('computerScore');
const restartButton = document.getElementById('restart');

let playerScore = 0;
let computerScore = 0;

// Función para generar la elección de la computadora
function getComputerChoice() {
  const choices = ['Piedra', 'Papel', 'Tijeras'];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

// Función para determinar el ganador
function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return 'Empate';
  } else if (
    (userChoice === 'Piedra' && computerChoice === 'Tijeras') ||
    (userChoice === 'Papel' && computerChoice === 'Piedra') ||
    (userChoice === 'Tijeras' && computerChoice === 'Papel')
  ) {
    return '¡Ganaste!';
  } else {
    return '¡Perdiste!';
  }
}

// Función para manejar la elección del usuario
function handleChoiceClick(event) {
  const userChoice = event.target.id;
  const computerChoice = getComputerChoice();
  const result = determineWinner(userChoice, computerChoice);
  showResult(userChoice, computerChoice, result);
}

// Función para mostrar el resultado y actualizar el puntaje
function showResult(userChoice, computerChoice, result) {
  resultDiv.innerHTML = `<p>Tu elección: ${userChoice}</p>
                          <p>La computadora: ${computerChoice}</p>
                          <p>Resultado: ${result}</p>`;

  // Actualizar el puntaje según el resultado
  if (result === '¡Ganaste!') {
    playerScore++;
  } else if (result === '¡Perdiste!') {
    computerScore++;
  }

  // Mostrar el puntaje actualizado
  playerScoreSpan.textContent = playerScore;
  computerScoreSpan.textContent = computerScore;

 /*  // Verificar si el jugador ha ganado 5 veces*/
  if (playerScore === 5) {
    resultDiv.innerHTML += "";
    gameInProgress = false; // Juego terminado
    showResultMessage("¡Eres ganador!");
  } else if (computerScore === 5) {
    resultDiv.innerHTML += "";
    gameInProgress = false; // Juego terminado
    showResultMessage("¡Perdiste!");
  } 


  // Función para mostrar el mensaje de resultado centrado en la pantalla
  function showResultMessage(message) {
    const resultBox = document.querySelector('.result-box');
    resultBox.innerHTML = `<p>${message}</p>`;
    resultBox.style.display = 'block';
  }

  // Desactivar los botones de elección si el juego ha terminado
  if (!gameInProgress) {
    const choiceButtons = document.querySelectorAll('.choice');
    choiceButtons.forEach(button => {
      button.disabled = true;
    });
  }
}
function restartGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreSpan.textContent = playerScore;
  computerScoreSpan.textContent = computerScore;
  resultDiv.textContent = '';
  resultDiv.innerHTML = ''; // Limpiar contenido del cuadro del resultado

  // Ocultar el cuadro del resultado
  const resultBox = document.querySelector('.result-box');
  resultBox.style.display = 'none';

  // Reactivar los botones de elección
  const choiceButtons = document.querySelectorAll('.choice');
  choiceButtons.forEach(button => {
    button.disabled = false;
  });

  // Reiniciar el juego en curso
  gameInProgress = true;

  /* // Reactivar los botones de elección
  const choiceButtons = document.querySelectorAll('.choice');
  choiceButtons.forEach(button => {
    button.disabled = false;
  });

  // Reiniciar el juego en curso
  gameInProgress = true; */
}




// Agregar detectores de eventos a todos los botones de elección
choices.forEach(choice => choice.addEventListener('click', handleChoiceClick));

// Agregar detector de eventos para reiniciar el botón
restartButton.addEventListener('click', restartGame);
