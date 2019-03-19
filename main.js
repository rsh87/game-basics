
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const block = new Block(0, 0, 50, 50);
const obstacle = new Obstacle(0, 0, 50, 150);

const setup = () => {
    canvas.height = 500;
    canvas.width = 800;
    position.y = canvas.height - block.height;

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    loop();
}

const handleDrawing = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    block.draw(ctx, position.x, position.y);
    obstacle.draw(ctx, canvas.width / 2 - obstacle.width / 2, canvas.height - obstacle.height);
}

const loop = () => {  
    handleKeyLogic();
    handleDrawing();
    requestAnimationFrame(loop);
}

setup();
