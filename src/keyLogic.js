let position = {
    y: 0,
    x: 0
}


let direction = {
    down: false,
    up: false,
    left: false,
    right: false,
}

const velocity = {
    jump: 10,
    fall: 5,
    travel: 5
}

const jumpHeight = 100;

let lastPos = 0;
let falling = false;

const handleKeyDown = (e) => {
    switch(e.keyCode) {
        case 37:
            direction.left = true;
            break;
        case 38:
            direction.up = true;
            break;
        case 39:
            direction.right = true;
            break;
        case 40:
            direction.down = true;
            break;
        default:
            break;
    }
}

const handleKeyUp = (e) => {
    switch(e.keyCode) {
        case 37:
            direction.left = false;
            break;
        case 38:
            direction.up = false;
            break;
        case 39:
            direction.right = false;
            break;
        case 40:
            direction.down = false;
            break;
        default:
            break;
    }
}

handleKeyLogic = () => {
    const bottomLine = canvas.height - block.height;
    const isBottom = position.y >= bottomLine;
    const isTop = position.y <= bottomLine - jumpHeight;  
    
    position.y = direction.up && !falling && !isTop ? position.y - velocity.jump : !isBottom ? position.y + velocity.fall : position.y;
 
    position.x = direction.right && position.x < canvas.width - block.width ? position.x + velocity.travel : direction.left && position.x > 0 ? position.x - velocity.travel : position.x;

    falling = lastPos < position.y;
    lastPos = position.y;
}