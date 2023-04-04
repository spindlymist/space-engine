export default class Rect {
    
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    top() {
        return this.y;
    }

    right() {
        return this.x + this.width;
    }

    bottom() {
        return this.y + this.height;
    }

    left() {
        return this.x;
    }

    topLeft() {
        return new Vector2(this.x, this.y);
    }

    topRight() {
        return new Vector2(this.x + this.width, this.y);
    }

    bottomRight() {
        return new Vector2(this.x + this.width, this.y + this.height);
    }

    bottomLeft() {
        return new Vector2(this.x, this.y + this.height);
    }

    intersects(other) {
        return !(this.x >= other.right() 
                 || this.right() <= other.x
                 || this.y >= other.bottom()
                 || this.bottom() <= other.y);
    }

    toString() {
        return `[${this.x}, ${this.y}, ${this.width}, ${this.height}]`;
    }
    
    equals(other) {
        return (this.x == other.x
                && this.y == other.y
                && this.width == other.width
                && this.height == other.height);
    }

    static fromPoints(p1, p2) {
        return new Vector2(
            p1.x,
            p1.y,
            p2.x - p1.x,
            p2.y - p1.y
        );
    }

}