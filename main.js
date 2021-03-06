
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let rects = [];

const setup = () => {
    canvas.height = 500;
    canvas.width = 800;
    playerPosition.y = canvas.height - playerSettings.height;

    document.addEventListener('keydown', (e) => handleKeys(e, true));
    document.addEventListener('keyup', (e) => handleKeys(e, false));
    loop();
}

const handleDrawing = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    const fill = playerSettings.isInCollision ? '#ffff00' : '#ff0000';

    rects.push(new Player(playerPosition.x, playerPosition.y, playerSettings.width, playerSettings.height, fill));
    rects.push(new Obstacle(canvas.width / 2 - obstacleSettings.width / 2, canvas.height - obstacleSettings.height, obstacleSettings.width, obstacleSettings.height, obstacleSettings.fill));
    rects.push(new Obstacle(canvas.width / 4 - obstacleSettings.width / 2, canvas.height - obstacleSettings.height, obstacleSettings.width, obstacleSettings.height, obstacleSettings.fill));
    // rects.push(new Obstacle(canvas.width - obstacleSettings.width, canvas.height - obstacleSettings.height * 6, obstacleSettings.width, obstacleSettings.height * 6, obstacleSettings.fill));
    // rects.push(new Obstacle(canvas.width - obstacleSettings.width * 3, canvas.height - obstacleSettings.height * 5, obstacleSettings.width, obstacleSettings.height * 5, obstacleSettings.fill));
    // rects.push(new Obstacle(canvas.width - obstacleSettings.width * 5, canvas.height - obstacleSettings.height * 4, obstacleSettings.width, obstacleSettings.height * 4, obstacleSettings.fill));
    // rects.push(new Obstacle(canvas.width - obstacleSettings.width * 7, canvas.height - obstacleSettings.height * 3, obstacleSettings.width, obstacleSettings.height * 3, obstacleSettings.fill));
    // rects.push(new Obstacle(canvas.width - obstacleSettings.width * 9, canvas.height - obstacleSettings.height * 2, obstacleSettings.width, obstacleSettings.height * 2, obstacleSettings.fill));
    // rects.push(new Obstacle(canvas.width - obstacleSettings.width * 11, canvas.height - obstacleSettings.height, obstacleSettings.width, obstacleSettings.height, obstacleSettings.fill));

    for(let i = 0; i < rects.length; i++) {
        const rect = rects[i];
        ctx.fillStyle = rect.fill;
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    }
    handleCollisions();
    rects = [];
}

const loop = () => {  
    handleKeyLogic();
    handleDrawing();
    requestAnimationFrame(loop);
}

setup();
