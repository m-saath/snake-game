const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const canvasSize = 400;
const rows = canvasSize / gridSize;
const cols = canvasSize / gridSize;

let snake = [
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 },
];

let direction = { x: 1, y: 0 };
let food = { x: getRandomInt(cols), y: getRandomInt(rows) };
let gameOver = false;
let score = 0;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function drawCell(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
}

function drawSnake() {
    snake.forEach(segment => drawCell(segment.x, segment.y, '#61dafb'));
}

function drawFood() {
    drawCell(food.x, food.y, '#e63946');
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = { x: getRandomInt(cols), y: getRandomInt(rows) };
        score++;
        document.getElementById('score').innerText = `Score: ${score}`;
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }

    return false;
}

function gameLoop() {
    if (gameOver) {
        alert('Game Over');
        document.location.reload();
        return;
    }

    ctx.clearRect(0, 0, canvasSize, canvasSize);
    drawSnake();
    drawFood();
    moveSnake();

    gameOver = checkCollision();

    setTimeout(gameLoop, 100);
}

document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

gameLoop();