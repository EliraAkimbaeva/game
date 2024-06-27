const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = canvas.parentElement.clientWidth;
canvas.height = canvas.parentElement.clientHeight;

let paddle = {
    width: 100,
    height: 20,
    x: canvas.width / 2 - 50,
    y: canvas.height - 30,
    dx: 0
};

let ball = {
    x: Math.random() * canvas.width,
    y: 0,
    radius: 10,
    dy: 2
};

let score = 0;

function drawPaddle() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText(`Score: ${score}`, 8, 20);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    drawScore();

    ball.y += ball.dy;

    if (ball.y + ball.radius > canvas.height) {
        ball.y = 0;
        ball.x = Math.random() * canvas.width;
        score = 0; // Reset score on miss
    }

    if (ball.y + ball.radius > paddle.y && ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
        ball.y = 0;
        ball.x = Math.random() * canvas.width;
        score += 1; // Increase score on catch
    }

    paddle.x += paddle.dx;

    if (paddle.x < 0) {
        paddle.x = 0;
    } else if (paddle.x + paddle.width > canvas.width) {
        paddle.x = canvas.width - paddle.width;
    }

    requestAnimationFrame(update);
}

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
