document.addEventListener("DOMContentLoaded", () => {
    const poppiImages = [
      'poppi-cherry.jpg',
      'poppi-docpop.jpg',
      'poppi-orange.png',
      'poppi-strawberry.jpg',
      'poppi-watermelon.png',
      'poppi-grape.png'
    ];
  
    let cards = [...poppiImages, ...poppiImages].sort(() => 0.5 - Math.random());
  
    const gameBoard = document.getElementById('gameBoard');
    const scoreDisplay = document.getElementById('score');
    const winMessage = document.getElementById('winMessage');
    const modeSelect = document.getElementById('visionMode');
  
    let flippedCards = [];
    let lockBoard = false;
    let score = 0;
    let playerFullName = "";
  
    function createCard(img) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <div class="card-inner">
          <div class="card-front" style="background-image: url('images/${img}')"></div>
          <div class="card-back" style="background-image: url('images/poppi-back.jpg')"></div>
        </div>
      `;
      return card;
    }
  
    function resetBoard() {
      gameBoard.innerHTML = '';
      score = 0;
      scoreDisplay.textContent = score;
      winMessage.classList.add('hidden');
      flippedCards = [];
      lockBoard = false;
      cards = [...poppiImages, ...poppiImages].sort(() => 0.5 - Math.random());
  
      cards.forEach(img => {
        const card = createCard(img);
        gameBoard.appendChild(card);
  
        card.addEventListener('click', () => {
          if (lockBoard || card.classList.contains('matched') || card.classList.contains('flip')) return;

     // Card Flipping
          card.classList.add('flip');
          flippedCards.push(card);
  
          if (flippedCards.length === 2) {
            lockBoard = true;
            const [first, second] = flippedCards;
            const firstImg = first.querySelector('.card-front').style.backgroundImage;
            const secondImg = second.querySelector('.card-front').style.backgroundImage;
  
            if (firstImg === secondImg) {
              first.classList.add('matched');
              second.classList.add('matched');
              score++;
              scoreDisplay.textContent = score;
  
              if (score === poppiImages.length) {
                winMessage.textContent = `🎉 You matched all the Poppi cans, ${playerFullName}! #SodasBack`;
                winMessage.classList.remove('hidden');
              }
  
              flippedCards = [];
              lockBoard = false;
            } else {
              setTimeout(() => {
                first.classList.remove('flip');
                second.classList.remove('flip');
                flippedCards = [];
                lockBoard = false;
              }, 1000);
            }
          }
        });
      });
  
      updateBackCardImages();
    }
  
    modeSelect.addEventListener("change", () => {
      const mode = modeSelect.value;
      document.body.className = mode;
      updateBackCardImages();
    });
  
    function updateBackCardImages() {
      const mode = modeSelect.value;
      const backCards = document.querySelectorAll(".card-back");
  
      backCards.forEach(card => {
        if (mode === "normal") {
          card.style.backgroundImage = "url('images/poppi-back.jpg')";
        } else {
          card.style.backgroundImage = `url('images/poppi-back-${mode}.jpg')`;
        }
      });
    }
  
    // Pop Up Validation with name fields
    const startupModal = document.getElementById('startupModal');
    const startupVisionSelect = document.getElementById('startupVisionSelect');
    const startGameBtn = document.getElementById('startGameBtn');
    const errorMessage = document.getElementById('errorMessage');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
  
    startGameBtn.addEventListener('click', () => {
      const selectedMode = startupVisionSelect.value;
      const firstName = firstNameInput.value.trim();
      const lastName = lastNameInput.value.trim();
  
      if (!selectedMode || !firstName || !lastName) {
        errorMessage.classList.remove('hidden');
        return;
      }
  
      errorMessage.classList.add('hidden');
      document.body.className = selectedMode;
      modeSelect.value = selectedMode;
      playerFullName = `${firstName} ${lastName}`;
      updateBackCardImages();
      startupModal.classList.add('hidden');
      resetBoard();
    });
  });  