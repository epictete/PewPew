var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var start = document.getElementById("start");
var restart = document.getElementById("restart");
var result = document.getElementById("result");
var comment = document.getElementById("comment");

var x = canvas.width / 2;
var y = canvas.height - 20;
var dy = -5;
var raf;

var ball = {
    radius: 5,
    show: false
}

var paddle = {
    width: 75,
    height: 10,
    x: (canvas.width - this.width) / 2
}

var keyboard = {
    left: false,
    right: false,
    space: false
}

var brick = {
    width: 30,
    height: 30,
    padding: 10,
    x: 50, // Random
    y: 30
}

var game = {
    counter: 0,
    goal: 10,
    end: false
}

start.onclick = draw;
restart.onclick = () => {
    start.disabled = false;
    document.location.reload();
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddle.x = relativeX - paddle.width / 2;
    }
}

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        keyboard.right = true;
    } else if (e.keyCode == 37) {
        keyboard.left = true;
    } else if (e.keyCode == 32) {
        keyboard.space = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        keyboard.right = false;
    } else if (e.keyCode == 37) {
        keyboard.left = false;
    } else if (e.keyCode == 32) {
        keyboard.space = false;
    }
}

function drawResult() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.textAlign = "center";
    ctx.fillText("You WIN! Click Restart to play again.", canvas.width / 2, canvas.height / 2);
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.textAlign = "start";
    ctx.fillText("Score: " + game.counter + "/" + game.goal, 8, 20);
}

function drawBall() {
    if (ball.show) {
        ctx.beginPath();
        ctx.arc(x, y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBrick() {
    ctx.beginPath();
    ctx.rect(brick.x, brick.y, brick.width, brick.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function collisionDetection() {
    if (x > brick.x && x < brick.x + brick.width && y > brick.y && y < brick.y + brick.height) {
        game.counter++;
        if (game.counter < game.goal) {
            y = canvas.height - 20;
            brick.x = Math.floor(Math.random() * ((canvas.width - brick.padding - brick.width) - brick.padding) + brick.padding);
            ball.show = false;
        } else {
            drawResult();
            game.end = true;
        }
    }
}

function draw() {

    if (game.end) {
        window.cancelAnimationFrame(raf);
    } else {
        raf = window.requestAnimationFrame(draw);
    }

    start.disabled = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBrick();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();

    if (keyboard.space) {
        x = paddle.x + paddle.width / 2;
        ball.show = true;
    }

    if (ball.show && y + ball.radius > 0) {
        y += dy;
    } else {
        ball.show = false;
        y = canvas.height - 20;
    }

    if (keyboard.right && paddle.x + paddle.width < canvas.width) {
        paddle.x += 5;
    } else if (keyboard.left && paddle.x > 0) {
        paddle.x -= 5;
    }
}