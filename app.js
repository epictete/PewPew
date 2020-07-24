var start = document.getElementById("start");
var restart = document.getElementById("restart");
var canvas = document.getElementById("myCanvas");
var result = document.getElementById("result");
var comment = document.getElementById("comment");
var ctx = canvas.getContext("2d");

var ballRadius = 5;

var x = canvas.width / 2;
var y = canvas.height - 20;
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

restart.addEventListener("click", () => document.location.reload(), false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// start.onclick = function () {
//     interval = setInterval(draw, 10);
// }

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
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
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
        score.innerHTML = counter;
        if (counter < 10) {
            spacePressed = false;
            x = canvas.width / 2;
            y = canvas.height - 20;
            brickX = Math.floor(Math.random() * ((canvas.width - brickPadding - brickWidth) - brickPadding) + brickPadding);
        } else {
            result.innerHTML = `You win!`;
            comment.innerHTML = `Click Restart to play again.`;
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
            spacePressed = false;
            y = canvas.height - 20;
        }
    }

    if (rightPressed && x < canvas.width - paddleWidth / 2) {
        x += 5;
    }
    else if (leftPressed && x - paddleWidth / 2 > 0) {
        x -= 5;
    }
}