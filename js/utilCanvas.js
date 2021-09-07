export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class Circle {
    constructor() {
    }

    static drawEllipse(ctx, center, radius) {
        ctx.moveTo(center.x, center.y + radius);
        ctx.bezierCurveTo(center.x, center.y + radius, center.x - radius, center.y + radius, center.x - radius, center.y);
        ctx.bezierCurveTo(center.x - radius, center.y, center.x -radius, center.y - radius, center.x, center.y - radius);
        ctx.bezierCurveTo(center.x, center.y - radius, center.x + radius, center.y - radius, center.x + radius, center.y);
        ctx.bezierCurveTo(center.x + radius, center.y, center.x + radius, center.y + radius, center.x, center.y + radius);
    }
}