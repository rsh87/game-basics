
class Obstacle {
    constructor(x, y, width, height) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }

    draw(ctx, y, x) {
        ctx.fillRect(y, x, this.width, this.height);
        ctx.fill();
    }
}