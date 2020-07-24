var start = document.getElementById("start");
var restart = document.getElementById("restart");
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var ballRadius = 10;

var x = canvas.width / 2;
var y = canvas.height - 30;
var dy = -2;

var paddleWidth = 75;
var paddleHeight = 10;

var rightPressed = false;
var leftPressed = false;
var spacePressed = false;

var brickWidth = 30;
var brickHeight = 30;
var brickPadding = 10;
var brickX = Math.floor(Math.random() * ((canvas.width - brickPadding - brickWidth) - brickPadding) + brickPadding);
var brickY = 10;

var counter = 0;
var interval = setInterval(draw, 10);

start.addEventListener("click", () => { interval })
restart.addEventListener("click", () => { document.location.reload() })
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    } else if (e.keyCode == 32) {
        spacePressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(x - paddleWidth / 2, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBrick() {
    ctx.beginPath();
    ctx.rect(brickX, brickY, brickWidth, brickHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function collisionDetection() {
    if (x > brickX && x < brickX + brickWidth && y > brickY && y < brickY + brickHeight) {
        counter++;
        if (counter < 10) {
            score.innerHTML = counter;
            spacePressed = false;
            x = canvas.width / 2;
            y = canvas.height - 30;
            brickX = Math.floor(Math.random() * ((canvas.width - brickPadding - brickWidth) - brickPadding) + brickPadding);
        } else {
            score.innerHTML = `${counter} => You win!`;
            clearInterval(interval);
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBrick();
    drawPaddle();
    collisionDetection();

    if (spacePressed) {
        drawBall();
        if (y + ballRadius > 0) {
            y += dy;
        } else {
            console.log('out');
            spacePressed = false;
            y = canvas.height - 30;
        }
    }

    if (rightPressed && x < canvas.width - paddleWidth / 2) {
        x += 5;
    }
    else if (leftPressed && x - paddleWidth / 2 > 0) {
        x -= 5;
    }
}

