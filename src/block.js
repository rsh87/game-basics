
class Block {
    constructor(x, y, width, height) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.fill = "#ff0000";
    }


    draw(ctx, y, x) {
        ctx.fillRect(y, x, this.width, this.height);
        ctx.fill();
    }
}