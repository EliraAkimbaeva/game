const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = canvas.parentElement.clientWidth;
canvas.height = canvas.parentElement.clientHeight;

// Paddle properties
const paddle = {
    width: 100,
    height: 20,
    x: canvas.width / 2 - 50,
    y: canvas.height - 30,
    dx: 0
};

// Ball properties
const ball = {
    x: Math.random() * canvas.width,
    y: 0,
    radius: 10,
    dy: 2
};

let score = 0;

// Draw paddle
function drawPaddle() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// Draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

// Draw score
function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText(`Score: ${score}`, 8, 20);
}

// Update game objects
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    drawScore();

    // Move ball
    ball.y += ball.dy;

    // Ball falls out of canvas
    if (ball.y + ball.radius > canvas.height) {
        ball.y = 0;
        ball.x = Math.random() * canvas.width;
        score = 0; // Reset score on miss
    }

    // Ball catches paddle
    if (ball.y + ball.radius > paddle.y && ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
        ball.y = 0;
        ball.x = Math.random() * canvas.width;
        score += 1; // Increase score on catch
    }

    // Move paddle
    paddle.x += paddle.dx;

    // Prevent paddle from going out of bounds
    if (paddle.x < 0) {
        paddle.x = 0;
    } else if (paddle.x + paddle.width > canvas.width) {
        paddle.x = canvas.width - paddle.width;
    }

    requestAnimationFrame(update);
}

// Handle keyboard input
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        paddle.dx = -5;
    } else if (e.key === 'ArrowRight') {
        paddle.dx = 5;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        paddle.dx = 0;
    }
});

update();
