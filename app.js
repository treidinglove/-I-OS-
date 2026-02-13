const starsContainer = document.getElementById('stars');
const answerInput = document.getElementById('answer');
const checkBtn = document.getElementById('checkBtn');
const nextBtn = document.getElementById('nextBtn');
const feedback = document.getElementById('feedback');

const colorPrompt = document.getElementById('colorPrompt');
const colorGrid = document.getElementById('colorGrid');
const colorFeedback = document.getElementById('colorFeedback');

let currentStars = 0;
const colorNames = [
  { name: 'Rojo', hex: '#ef4444' },
  { name: 'Azul', hex: '#3b82f6' },
  { name: 'Verde', hex: '#22c55e' },
  { name: 'Amarillo', hex: '#eab308' },
  { name: 'Morado', hex: '#a855f7' },
  { name: 'Naranja', hex: '#f97316' },
  { name: 'Rosa', hex: '#ec4899' },
  { name: 'Turquesa', hex: '#14b8a6' }
];
let targetColor = colorNames[1];

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderStars() {
  currentStars = randomNumber(1, 10);
  starsContainer.textContent = '⭐'.repeat(currentStars);
  feedback.textContent = '';
  answerInput.value = '';
}

function checkStarsAnswer() {
  const value = Number(answerInput.value);
  if (!value) {
    feedback.textContent = 'Escribe un número para intentar.';
    feedback.style.color = '#f97316';
    return;
  }

  if (value === currentStars) {
    feedback.textContent = '¡Excelente! 🎉';
    feedback.style.color = '#22c55e';
  } else {
    feedback.textContent = '¡Buen intento! Intenta otra vez 💪';
    feedback.style.color = '#ef4444';
  }
}

function renderColorGame() {
  colorGrid.innerHTML = '';
  targetColor = colorNames[randomNumber(0, colorNames.length - 1)];
  colorPrompt.innerHTML = `Toca el color: <strong>${targetColor.name}</strong>`;
  colorFeedback.textContent = '';

  const shuffled = [...colorNames].sort(() => Math.random() - 0.5);
  shuffled.forEach((color) => {
    const button = document.createElement('button');
    button.className = 'color-tile';
    button.style.backgroundColor = color.hex;
    button.setAttribute('aria-label', color.name);
    button.addEventListener('click', () => {
      if (color.name === targetColor.name) {
        colorFeedback.textContent = '¡Correcto! 👏';
        colorFeedback.style.color = '#22c55e';
        setTimeout(renderColorGame, 800);
      } else {
        colorFeedback.textContent = 'Casi. Vuelve a intentarlo 😊';
        colorFeedback.style.color = '#ef4444';
      }
    });
    colorGrid.appendChild(button);
  });
}

checkBtn.addEventListener('click', checkStarsAnswer);
nextBtn.addEventListener('click', renderStars);

renderStars();
renderColorGame();
