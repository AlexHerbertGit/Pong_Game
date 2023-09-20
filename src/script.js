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

const paddle = {}

//Create Bricks

const brickInfo = {}

//Create brick array

const bricks = []