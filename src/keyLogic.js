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
    travel: 5,
    gravity: 0.50,
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
    //velocity.gravitySpeed = jumping ? velocity.gravitySpeed -= velocity.gravity : falling && velocity.gravitySpeed < 0 ? velocity.gravitySpeed += velocity.gravity : 0;
    //const fixedGravitySpeed = parseInt(velocity.gravitySpeed.toFixed(2));
    
    playerPosition.y = direction.up && !falling && !isTop ? playerPosition.y - velocity.jump : !isBottom && !isInCollision ? playerPosition.y + velocity.fall : playerPosition.y;

    if(direction.right && playerPosition.x <= canvas.width - playerSettings.width && !isInCollision) {
        //console.log('moving right width no collision');
        playerPosition.x = playerPosition.x + velocity.travel;
        lastMoveWasRight = true;
    } else if(direction.left && playerPosition.x >= 0 && !isInCollision) {
        //console.log('moving left width no collision');
        playerPosition.x = playerPosition.x - velocity.travel;
        lastMoveWasRight = false;
    } else if(!direction.left && isInAir && lastMoveWasRight && playerPosition.x < canvas.width - playerSettings.width && !isBottom && isInCollision && !collisionIsTop) {
        //console.log('moving right in the air width a collision');
        playerPosition.y = playerPosition.y + velocity.travel;
    } else if(!direction.right && isInAir && !lastMoveWasRight && playerPosition.x < canvas.width - playerSettings.width && !isBottom && isInCollision && !collisionIsTop) {
        //console.log('moving left in the air width a collision');
        playerPosition.y = playerPosition.y + velocity.travel;
    } else if(direction.right && isInCollision && !lastMoveWasRight && !isInAir || direction.right && isInCollision && collisionIsTop) {
        playerPosition.x = playerPosition.x + velocity.travel;
    } else if (direction.left && isInCollision && lastMoveWasRight && !isInAir || direction.left && isInCollision && collisionIsTop) {
        playerPosition.x = playerPosition.x - velocity.travel;
        //console.log('moving right in the air width a collision');
    }

    falling = lastPos < playerPosition.y;
    jumping = lastPos > playerPosition.y;
    lastPos = playerPosition.y;
    jump = collisionIsTop ? jumpHeight + 100 : isBottom ? jump = jumpHeight : jump;

}