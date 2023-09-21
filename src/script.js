// TODO 
/**
1. Create Canvas context
2. Create and draw ball
3. Create paddle
4. Create bricks
5. Score window
6. Add update function
7. Rules function
8. Rules for the ball animation
9. Move paddle
10. Keyboard events with the Paddle
11. Moving ball
12. Setup Wall boundries
13. Score Update
14. When Ball break the bricks (remove)
15. Lose - redraw the bricks and rest the score.
16.3D
 * 
 */

//ANCHOR DOM Selectors
const rulesBtn = document.getElementById('rules-btn')
const closedBtn = document.getElementById('close-btn')
const rules = document.getElementById('rules')

//ANCHOR Canvas DOM Selector
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let score = 0 //Setting the score to zero from start

const brickRowCount = 9
const brickColumnCount = 5

// Create Ball

const ball = {
    x: canvas.width / 2, //Start displaying in the middle of the screen
    y: canvas.height / 2, // Start displaying in the middle of the screen
    size: 10,
    speed: 4, //Sets animation speed props
    dx: 4, //Animation direction
    dy: -4 //Animation direcction with (-) so it does not move below the bottom of the screen
}

//Create Paddle

const paddle = {
    x: canvas.width / 2 -40, // We are taking half width of the paddle
    y: canvas.height / -20, // Center this paddle in the middle of the screen
    w: 80,
    h: 10,
    speed: 8,
    dx: 0, // only moves on the X axis
}

//Create Bricks

const brickInfo = {
    w: 70, //bricks will share the same properties
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

//Create brick array

const bricks = [] // Init bricks array
for (let i=0; i < brickRowCount; i++) { // Loop through the array row
    bricks[i] = [] //Set the row bricks iteration to empty array
    for(let j = 0; j < brickColumnCount; j++) { //Loop through array column
        const x = i * (brickInfo.width + brickInfo.padding) + brickInfo.offsetX // i is the row iteration for each brick
        const y = j * (brickInfo.height + brickInfo.padding) + brickInfo.offsetY // We are looping and setting/getting position of bricks
        bricks[i][j] = {x, y, ...brickInfo} // Copy and take the array 2D and give it the values of x, y.
    } 
};

//Create and draw the ball on the canvas

function drawBall() {
    ctx.beginPath() //We are going to create a path 
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2) //Draw an arc to build a ball
    ctx.fillStyle = '#0095dd' // Style the ball
    ctx.fill()
    ctx.closePath()
}

//Create and Draw Paddle on the canvas

function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
    ctx.fillStyle = '#0095dd'
    ctx.fill()
    ctx.closePath()
}

//Draw and Design the score board

function drawScore() {
    ctx.font = '20px Arial'
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30)
}

// Bricks Design on the canvas

function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath()
            ctx.rect(brick.x, brick.y, brick.h)
            ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent' //This will be conditional.
            ctx.fill()
            ctx.closePath()
        })
    })
}

//NOTE Move the paddle on the canvas

function movePaddle() { //Every time you start playing, draw on the canvas with the function
    paddle.x += paddle.dx // Paddle will not move until we use the kayboard inputs

    if(paddle.x + paddle.w > canvas.width) { //0 from the x axis and this is the border detection rules
        paddle.x = canvas.width - paddle.w
    }

    if(paddle.x < 0) {
        paddle.x = 0
    }
}

//NOTE Moving the ball on the canvas

function moveBall() {
    ball.x += ball.dx //Append the ball on the x-axis
    ball.y += ball.dy //Append the ball on the y-axis

    //Wall collision (right/left)

    if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1 // This is to reverse the ball in the opposite direction on collision 
    }

    //Wall collision (top/bottom)
    if(ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1
    }

    //Paddle collision
    if(
        ball.x - ball.size > paddle.x && // checking the left side of my canvas
        ball.x + ball.size < paddle.x + paddle.w && // checking the right side of my canvas.
        ball.y + ball.size  > paddle.y
    ) {
        ball.dy = -ball.speed //reverse the ball object and bounce off the wall in the opposite direction
    }

//NOTE - Brick Collision

    bricks.forEach(column => { //Loop through the bricks array
        column.forEach(brick => {
            if(brick.visible) { // Make sure the bricks are visible
                if(
                    ball.x - ball.size > brick.x && //Checking the left side bricks
                    ball.x + ball.size < brick.x + brick.w && //Checking the right side bricks
                    ball.y + ball.size > brick.y && // Top brick checked
                    ball.y - ball.size < brick.y + brick.h // Bottom brick side is checked
                ) {
                    ball.y *= -1 //Bouncr of the brick in the opposite direction
                    brick.visible = false // Once brick has made contact with the ball, change state to transparent

                    // increaseScore() this will change score values
                }
            }
        })
    })
}



