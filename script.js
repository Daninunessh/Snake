let canvas = document.getElementById("snake"); 
let context = canvas.getContext("2d"); 
let box = 32;
let snake = []; 
snake[0] ={
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food ={  
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let score = 0;

function createBG(){
    context.fillStyle = "#2c3e50";
    context.fillRect(0, 0, 16*box, 16*box); 
}
function createSnake (){
    for(i = 0; i < snake.length; i++){
        if(i == 0){
            // Setting the color of the head
            context.fillStyle = "cadetblue";
            context.fillRect(snake[i].x, snake[i].y, box, box);
            // Creating a line around the head
            context.strokeStyle = "#2c3e50";
            context.strokeRect(snake[i].x, snake[i].y, box, box);
        } else {
            // Setting the color of the body
            context.fillStyle = "lightcoral";
            context.fillRect(snake[i].x, snake[i].y, box, box);
            // Creating a line around the body
            context.strokeStyle = "#2c3e50";
            context.strokeRect(snake[i].x, snake[i].y, box, box);
        }
        // Showing the score
        context.fillStyle = "white";
        context.font = "30px Arial";
        context.fillText(score, 14.5 * box, 1 * box);
    }
}

function drawFood (){
    //Creating the "apple"
    context.fillStyle = "brown";
    context.fillRect(food.x, food.y, box, box);
}

// Creating a listener to catch the player's movement
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 || event.keyCode == 65 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 || event.keyCode == 87 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 || event.keyCode == 68 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 || event.keyCode == 83 && direction != 'up') direction = 'down';
}

function startGame(){    

    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;
    
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            // Finishing the game
            clearInterval(game);
            // Showing a final message and the final score
            let mensagem = document.getElementById("msg");
            mensagem.innerHTML = "Game Over! Your score: " + score;
        }
    }

    createBG();
    createSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); 
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
        score++;
    }
    
    let newHead ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); 
}

let game = setInterval(startGame, 100);