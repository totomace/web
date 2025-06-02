class ColorGuessingGame {
    constructor() {
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('colorGameHighScore')) || 0;
        this.level = 1;
        this.lives = 3;
        this.combo = 0;
        this.timeLeft = 30;
        this.gameActive = false;
        this.gamePaused = false;
        this.currentColors = [];
        this.targetColorIndex = 0;
        this.timer = null;
        this.difficulty = 'medium';
        
        // Statistics
        this.totalGames = parseInt(localStorage.getItem('colorGameTotalGames')) || 0;
        this.totalCorrect = parseInt(localStorage.getItem('colorGameTotalCorrect')) || 0;
        this.bestCombo = parseInt(localStorage.getItem('colorGameBestCombo')) || 0;
        
        this.initializeElements();
        this.bindEvents();
        this.updateDisplay();
        this.newGame();
    }
    
    initializeElements() {
        this.elements = {
            score: document.getElementById('score'),
            highScore: document.getElementById('highScore'),
            level: document.getElementById('level'),
            lives: document.getElementById('lives'),
            targetColor: document.getElementById('targetColor'),
            colorCode: document.getElementById('colorCode'),
            colorOptions: document.getElementById('colorOptions'),
            timerFill: document.getElementById('timerFill'),
            timerText: document.getElementById('timerText'),
            comboCounter: document.getElementById('comboCounter'),
            comboValue: document.getElementById('comboValue'),
            difficulty: document.getElementById('difficulty'),
            
            // Buttons
            newGameBtn: document.getElementById('newGameBtn'),
            hintBtn: document.getElementById('hintBtn'),
            pauseBtn: document.getElementById('pauseBtn'),
            playAgainBtn: document.getElementById('playAgainBtn'),
            resumeBtn: document.getElementById('resumeBtn'),
            mainMenuBtn: document.getElementById('mainMenuBtn'),
            statsBtn: document.getElementById('statsBtn'),
            rulesBtn: document.getElementById('rulesBtn'),
            closeRulesBtn: document.getElementById('closeRulesBtn'),
            
            // Modals
            gameOverModal: document.getElementById('gameOverModal'),
            pauseModal: document.getElementById('pauseModal'),
            rulesModal: document.getElementById('rulesModal'),
            gameOverTitle: document.getElementById('gameOverTitle'),
            gameOverMessage: document.getElementById('gameOverMessage'),
            finalScore: document.getElementById('finalScore'),
            newRecordMessage: document.getElementById('newRecordMessage'),
            
            // Stats
            totalGames: document.getElementById('totalGames'),
            accuracy: document.getElementById('accuracy'),
            bestComboStat: document.getElementById('bestCombo')
        };
    }
    
    bindEvents() {
        this.elements.newGameBtn.addEventListener('click', () => this.newGame());
        this.elements.hintBtn.addEventListener('click', () => this.useHint());
        this.elements.pauseBtn.addEventListener('click', () => this.pauseGame());
        this.elements.playAgainBtn.addEventListener('click', () => this.newGame());
        this.elements.resumeBtn.addEventListener('click', () => this.resumeGame());
        this.elements.mainMenuBtn.addEventListener('click', () => this.backToMenu());
        this.elements.statsBtn.addEventListener('click', () => this.toggleStats());
        this.elements.rulesBtn.addEventListener('click', () => this.showRules());
        this.elements.closeRulesBtn.addEventListener('click', () => this.hideRules());
        this.elements.difficulty.addEventListener('change', (e) => {
            this.difficulty = e.target.value;
            if (this.gameActive) {
                this.generateRound();
            }
        });
        
        // Close modals when clicking outside
        [this.elements.gameOverModal, this.elements.pauseModal, this.elements.rulesModal].forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
    }
    
    newGame() {
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.combo = 0;
        this.timeLeft = 30;
        this.gameActive = true;
        this.gamePaused = false;
        
        this.hideAllModals();
        this.updateDisplay();
        this.generateRound();
        this.startTimer();
    }
    
    generateRound() {
        const colorCount = this.getColorCount();
        this.currentColors = this.generateColors(colorCount);
        this.targetColorIndex = Math.floor(Math.random() * colorCount);
        
        this.displayTargetColor();
        this.displayColorOptions();
        this.resetTimer();
    }
    
    getColorCount() {
        switch (this.difficulty) {
            case 'easy': return 3;
            case 'medium': return 6;
            case 'hard': return 9;
            default: return 6;
        }
    }
    
    generateColors(count) {
        // Predefined distinct colors for better gameplay
        const distinctColors = [
            { r: 255, g: 0, b: 0 },     // Đỏ
            { r: 0, g: 255, b: 0 },     // Xanh lá
            { r: 0, g: 0, b: 255 },     // Xanh dương
            { r: 255, g: 255, b: 0 },   // Vàng
            { r: 255, g: 0, b: 255 },   // Tím
            { r: 0, g: 255, b: 255 },   // Xanh lơ
            { r: 255, g: 165, b: 0 },   // Cam
            { r: 128, g: 0, b: 128 },   // Tím đậm
            { r: 255, g: 192, b: 203 }, // Hồng
            { r: 165, g: 42, b: 42 },   // Nâu
            { r: 128, g: 128, b: 128 }, // Xám
            { r: 0, g: 128, b: 0 },     // Xanh lá đậm
            { r: 75, g: 0, b: 130 },    // Chàm
            { r: 255, g: 20, b: 147 },  // Hồng đậm
            { r: 50, g: 205, b: 50 },   // Xanh lá lime
            { r: 220, g: 20, b: 60 },   // Đo crimson
            { r: 255, g: 215, b: 0 },   // Vàng gold
            { r: 70, g: 130, b: 180 },  // Xanh steel
            { r: 255, g: 69, b: 0 },    // Đỏ cam
            { r: 46, g: 139, b: 87 }    // Xanh sea
        ];
        
        // Shuffle and pick random distinct colors
        const shuffled = this.shuffleArray([...distinctColors]);
        return shuffled.slice(0, count);
    }
    
    generateRandomColor() {
        // This method now returns a random distinct color
        const distinctColors = [
            { r: 255, g: 0, b: 0 },     // Đỏ
            { r: 0, g: 255, b: 0 },     // Xanh lá
            { r: 0, g: 0, b: 255 },     // Xanh dương
            { r: 255, g: 255, b: 0 },   // Vàng
            { r: 255, g: 0, b: 255 },   // Tím
            { r: 0, g: 255, b: 255 },   // Xanh lơ
            { r: 255, g: 165, b: 0 },   // Cam
            { r: 128, g: 0, b: 128 },   // Tím đậm
            { r: 255, g: 192, b: 203 }, // Hồng
            { r: 165, g: 42, b: 42 }    // Nâu
        ];
        
        return distinctColors[Math.floor(Math.random() * distinctColors.length)];
    }
    
    shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
    
    displayTargetColor() {
        const targetColor = this.currentColors[this.targetColorIndex];
        const colorString = `rgb(${Math.round(targetColor.r)}, ${Math.round(targetColor.g)}, ${Math.round(targetColor.b)})`;
        
        this.elements.targetColor.style.backgroundColor = colorString;
        this.elements.colorCode.textContent = `RGB(${Math.round(targetColor.r)}, ${Math.round(targetColor.g)}, ${Math.round(targetColor.b)})`;
    }
    
    displayColorOptions() {
        this.elements.colorOptions.innerHTML = '';
        this.elements.colorOptions.className = `color-options ${this.difficulty}`;
        
        this.currentColors.forEach((color, index) => {
            const colorDiv = document.createElement('div');
            colorDiv.className = 'color-option';
            const colorString = `rgb(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)})`;
            colorDiv.style.backgroundColor = colorString;
            
            colorDiv.addEventListener('click', () => this.selectColor(index));
            this.elements.colorOptions.appendChild(colorDiv);
        });
    }
    
    selectColor(selectedIndex) {
        if (!this.gameActive || this.gamePaused) return;
        
        const isCorrect = selectedIndex === this.targetColorIndex;
        const selectedOption = this.elements.colorOptions.children[selectedIndex];
        
        if (isCorrect) {
            this.handleCorrectAnswer(selectedOption);
        } else {
            this.handleIncorrectAnswer(selectedOption);
        }
        
        // Brief pause before next round
        setTimeout(() => {
            if (this.gameActive) {
                if (isCorrect) {
                    this.nextRound();
                } else if (this.lives <= 0) {
                    this.gameOver();
                } else {
                    this.generateRound();
                }
            }
        }, 1000);
    }
    
    handleCorrectAnswer(selectedOption) {
        selectedOption.classList.add('correct');
        this.combo++;
        const points = 10 * this.combo;
        this.score += points;
        this.totalCorrect++;
        
        if (this.combo > this.bestCombo) {
            this.bestCombo = this.combo;
            localStorage.setItem('colorGameBestCombo', this.bestCombo.toString());
        }
        
        this.showCombo();
        this.updateDisplay();
        
        // Play success sound effect (visual feedback)
        this.animateScoreIncrease(points);
    }
    
    handleIncorrectAnswer(selectedOption) {
        selectedOption.classList.add('incorrect');
        this.lives--;
        this.combo = 0;
        this.hideCombo();
        
        // Highlight correct answer
        const correctOption = this.elements.colorOptions.children[this.targetColorIndex];
        correctOption.classList.add('correct');
        
        this.updateDisplay();
        this.animateLifeLoss();
    }
    
    nextRound() {
        if (this.score > 0 && this.score % 50 === 0) { // Level up every 50 points instead of 100
            this.level++;
            this.animateLevelUp();
        }
        this.generateRound();
    }
    
    useHint() {
        if (!this.gameActive || this.gamePaused || this.score < 5) return;
        
        this.score -= 5;
        this.updateDisplay();
        
        const correctOption = this.elements.colorOptions.children[this.targetColorIndex];
        correctOption.classList.add('hint');
        
        setTimeout(() => {
            correctOption.classList.remove('hint');
        }, 2000);
    }
    
    startTimer() {
        this.timer = setInterval(() => {
            if (!this.gamePaused && this.gameActive) {
                this.timeLeft--;
                this.updateTimer();
                
                if (this.timeLeft <= 0) {
                    this.timeUp();
                }
            }
        }, 1000);
    }
    
    resetTimer() {
        this.timeLeft = Math.max(10, 30 - this.level); // Decrease time as level increases
        this.updateTimer();
    }
    
    updateTimer() {
        const percentage = (this.timeLeft / 30) * 100;
        this.elements.timerFill.style.width = `${percentage}%`;
        this.elements.timerText.textContent = `${this.timeLeft}s`;
        
        if (this.timeLeft <= 5) {
            this.elements.timerFill.style.background = '#fc8181';
        } else if (this.timeLeft <= 10) {
            this.elements.timerFill.style.background = '#f6e05e';
        } else {
            this.elements.timerFill.style.background = 'linear-gradient(90deg, #48bb78, #f6e05e, #fc8181)';
        }
    }
    
    timeUp() {
        this.lives--;
        this.combo = 0;
        this.hideCombo();
        
        if (this.lives <= 0) {
            this.gameOver();
        } else {
            this.generateRound();
        }
        
        this.updateDisplay();
    }
    
    pauseGame() {
        if (!this.gameActive) return;
        
        this.gamePaused = true;
        this.elements.pauseModal.style.display = 'flex';
    }
    
    resumeGame() {
        this.gamePaused = false;
        this.elements.pauseModal.style.display = 'none';
    }
    
    backToMenu() {
        this.gameActive = false;
        this.gamePaused = false;
        clearInterval(this.timer);
        this.hideAllModals();
        this.updateDisplay();
    }
    
    gameOver() {
        this.gameActive = false;
        clearInterval(this.timer);
        this.totalGames++;
        
        // Check for new high score
        let isNewRecord = false;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('colorGameHighScore', this.highScore.toString());
            isNewRecord = true;
        }
        
        // Save statistics
        localStorage.setItem('colorGameTotalGames', this.totalGames.toString());
        localStorage.setItem('colorGameTotalCorrect', this.totalCorrect.toString());
        
        // Show game over modal
        this.elements.gameOverTitle.textContent = isNewRecord ? 'Kỷ lục mới!' : 'Game Over!';
        this.elements.finalScore.textContent = this.score;
        this.elements.newRecordMessage.style.display = isNewRecord ? 'block' : 'none';
        this.elements.gameOverModal.style.display = 'flex';
        
        this.updateDisplay();
    }
    
    showCombo() {
        if (this.combo > 1) {
            this.elements.comboValue.textContent = this.combo;
            this.elements.comboCounter.style.display = 'block';
        }
    }
    
    hideCombo() {
        this.elements.comboCounter.style.display = 'none';
    }
    
    toggleStats() {
        const statsPanel = document.getElementById('statsPanel');
        if (statsPanel.style.display === 'none' || !statsPanel.style.display) {
            this.updateStats();
            statsPanel.style.display = 'block';
        } else {
            statsPanel.style.display = 'none';
        }
    }
    
    updateStats() {
        this.elements.totalGames.textContent = this.totalGames;
        const accuracy = this.totalGames > 0 ? Math.round((this.totalCorrect / this.totalGames) * 100) : 0;
        this.elements.accuracy.textContent = `${accuracy}%`;
        this.elements.bestComboStat.textContent = this.bestCombo;
    }
    
    showRules() {
        this.elements.rulesModal.style.display = 'flex';
    }
    
    hideRules() {
        this.elements.rulesModal.style.display = 'none';
    }
    
    hideAllModals() {
        this.elements.gameOverModal.style.display = 'none';
        this.elements.pauseModal.style.display = 'none';
        this.elements.rulesModal.style.display = 'none';
    }
    
    updateDisplay() {
        this.elements.score.textContent = this.score;
        this.elements.highScore.textContent = this.highScore;
        this.elements.level.textContent = this.level;
        
        // Update lives display
        const livesText = '❤️'.repeat(Math.max(0, this.lives));
        this.elements.lives.textContent = livesText || '💀';
        
        // Update hint button
        this.elements.hintBtn.disabled = this.score < 5 || !this.gameActive;
        this.elements.hintBtn.textContent = `Gợi ý (${this.score >= 5 ? '5 điểm' : 'Không đủ điểm'})`;
        
        // Update pause button
        this.elements.pauseBtn.disabled = !this.gameActive;
        this.elements.pauseBtn.textContent = this.gamePaused ? 'Đã tạm dừng' : 'Tạm dừng';
    }
    
    animateScoreIncrease(points) {
        const scoreElement = this.elements.score;
        const originalText = scoreElement.textContent;
        
        scoreElement.style.transform = 'scale(1.2)';
        scoreElement.style.color = '#48bb78';
        scoreElement.textContent = `+${points}`;
        
        setTimeout(() => {
            scoreElement.style.transform = 'scale(1)';
            scoreElement.style.color = '';
            scoreElement.textContent = originalText;
        }, 500);
    }
    
    animateLifeLoss() {
        const livesElement = this.elements.lives;
        livesElement.style.animation = 'shake 0.5s ease-in-out';
        
        setTimeout(() => {
            livesElement.style.animation = '';
        }, 500);
    }
    
    animateLevelUp() {
        const levelElement = this.elements.level;
        levelElement.style.animation = 'bounce 1s ease-in-out';
        
        // Show level up message
        const levelUpMsg = document.createElement('div');
        levelUpMsg.textContent = `LEVEL ${this.level}!`;
        levelUpMsg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #ff6b6b, #feca57);
            color: white;
            padding: 20px 40px;
            border-radius: 20px;
            font-size: 24px;
            font-weight: bold;
            z-index: 1000;
            animation: levelUpAnimation 2s ease-out forwards;
        `;
        
        document.body.appendChild(levelUpMsg);
        
        setTimeout(() => {
            levelElement.style.animation = '';
            if (levelUpMsg.parentNode) {
                levelUpMsg.parentNode.removeChild(levelUpMsg);
            }
        }, 2000);
    }
}

// Add CSS animations for level up
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes levelUpAnimation {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;
document.head.appendChild(style);

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ColorGuessingGame();
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    const game = window.colorGame;
    if (!game) return;
    
    switch(e.key) {
        case ' ':
            e.preventDefault();
            if (game.gameActive && !game.gamePaused) {
                game.pauseGame();
            } else if (game.gamePaused) {
                game.resumeGame();
            }
            break;
        case 'h':
        case 'H':
            if (game.gameActive && !game.gamePaused) {
                game.useHint();
            }
            break;
        case 'n':
        case 'N':
            game.newGame();
            break;
        case 'Escape':
            if (game.gamePaused) {
                game.resumeGame();
            }
            break;
    }
});

// Store game instance globally for keyboard shortcuts
window.addEventListener('load', () => {
    window.colorGame = new ColorGuessingGame();
});