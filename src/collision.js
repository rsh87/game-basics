const defaultCollesionValues = {
    isInCollision: false,
    isCollidingX: false,
    isCollidingY: false
}

const handleCollisions = () => {
    playerSettings = {...playerSettings, ...defaultCollesionValues};
    for(let i = 0; i < rects.length; i++) {
        if(!(rects[i] instanceof Player)) {
            if(isInCollision(playerPosition, playerSettings, rects[i]).isInCollision) {
                playerSettings = {...playerSettings, ...isInCollision(playerPosition, playerSettings, rects[i])}
            }
        }
    }
}

const isInCollision = (playerPosition, playerSettings, rect) => {

    const obj = {
        isInCollision: (playerPosition.x + playerSettings.width >= rect.x && playerPosition.x - playerSettings.width <= rect.x && playerPosition.y + playerSettings.height >= rect.y),
        isCollidingX: (playerPosition.x + playerSettings.width >= rect.x && playerPosition.x - playerSettings.width <= rect.x),
        isCollidingY: (playerPosition.x + playerSettings.width > rect.x && playerPosition.x - playerSettings.width < rect.x) && (playerPosition.y >= (rect.y - rect.height))
    }
    return obj;
}