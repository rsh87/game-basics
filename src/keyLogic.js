const playerPosition = {
    y: 0,
    x: 0
}

const direction = {
    down: false,
    up: false,
    left: false,
    right: false,
}

const velocity = {
    jump: 10,
    fall: 10,
    travel: 1,
    gravity: 0.35,
    gravitySpeed: 0
}

const jumpHeight = 200;

let lastPos = 0;
let falling = false;
let jumping = false;
let lastMoveWasRight = false;
let jump = jumpHeight;

const handleKeys = (e, keydown) => {
    switch(e.keyCode) {
        case 37:
            direction.left = keydown;
            break;
        case 38:
            direction.up = keydown;
            break;
        case 39:
            direction.right = keydown;
            break;
        case 40:
            direction.down = keydown;
            break;
        default:
            break;
    }
}

handleKeyLogic = () => {
    const bottomLine = canvas.height - playerSettings.height;
    const isBottom = playerPosition.y >= bottomLine;
    const isTop = playerPosition.y <= bottomLine - jump;
    const isInAir = (jumping || falling);
    const isInCollision = playerSettings.isInCollision;
    const collisionIsTop = playerSettings.isCollidingY;
    velocity.gravitySpeed = jumping ? velocity.gravitySpeed += velocity.gravity : falling ? velocity.gravitySpeed -= velocity.gravity : 0;
    playerPosition.y = playerPosition.y <= bottomLine ? playerPosition.y : bottomLine;

    if(direction.up && !falling && !isTop && !isInCollision || direction.up && collisionIsTop) {
        playerPosition.y = playerPosition.y - velocity.jump + velocity.gravitySpeed;
    } else if(!isBottom && !collisionIsTop) {
        playerPosition.y = playerPosition.y + velocity.fall - velocity.gravitySpeed;
    }

    if(direction.right && playerPosition.x < canvas.width - playerSettings.width && !isInCollision) {
        playerPosition.x = playerPosition.x + velocity.travel;
        lastMoveWasRight = true;
    } else if(direction.left && playerPosition.x > 0 && !isInCollision) {
        playerPosition.x = playerPosition.x - velocity.travel;
        lastMoveWasRight = false;
    } else if(direction.right && isInCollision && !lastMoveWasRight || direction.right && collisionIsTop) {
        playerPosition.x = playerPosition.x + velocity.travel;
    } else if(direction.left && isInCollision && lastMoveWasRight || direction.left && collisionIsTop) {
        playerPosition.x = playerPosition.x - velocity.travel;
    } else if(isInCollision && !collisionIsTop && !isBottom) {
        playerPosition.y = playerPosition.y + velocity.travel;
    }
    

    falling = lastPos < playerPosition.y;
    jumping = lastPos > playerPosition.y;
    lastPos = playerPosition.y;
    jump = collisionIsTop ? jumpHeight + 100 : isBottom ? jump = jumpHeight : jump;


}