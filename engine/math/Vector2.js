export default class Vector2 {

    constructor(x, y) {
        if (typeof x == "undefined") {
            this.x = 0;
            this.y = 0;
        } else if (typeof x != "undefined" && x instanceof Vector2) {
            this.x = x.x;
            this.y = x.y;
        } else if (typeof y == "undefined") {
            this.x = x;
            this.y = 0;
        } else {
            this.x = x;
            this.y = y;
        }
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        let mag = this.magnitude();
        this.x /= mag;
        this.y /= mag;
        return this;
    }

    normalized() {
        let mag = this.magnitude();
        let norm = new Vector2(this.x / mag, this.y / mag);
        return norm;
    }

    add(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    plus(other) {
        return new Vector2(this.x + other.x, this.y + other.y);
    }

    sub(other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    minus(other) {
        return new Vector2(this.x - other.x, this.y - other.y);
    }

    mult(x) {
        this.x *= x;
        this.y *= x;
        return this;
    }

    times(x) {
        return new Vector2(this.x * x, this.y * x);
    }

    div(x) {
        this.x /= x;
        this.y /= x;
        return this;
    }

    over(x) {
        return new Vector2(this.x / x, this.y / x);
    }

    dot(other) {
        return this.x * other.x + this.y * other.y;
    }

    rotate(deg) {
        let theta = deg * Math.PI / 180;

        let cosTheta = Math.cos(theta);
        let sinTheta = Math.sin(theta);

        let newI = this.x * cosTheta - this.y * sinTheta;
        let newJ = this.x * sinTheta + this.y * cosTheta;

        this.x = newI;
        this.y = newJ;

        return this;
    }

    rotated(deg) {
        let theta = deg * Math.PI / 180;

        let cosTheta = Math.cos(theta);
        let sinTheta = Math.sin(theta);

        let newX = this.x * cosTheta - this.y * sinTheta;
        let newY = this.x * sinTheta + this.y * cosTheta;

        return new Vector2(newX, newY);
    }

    toAngle() {
        if(this.x === 0) {
            var angle = 0;
        }
        if(this.x !== 0) {
            var angle = Math.atan(this.y / Math.abs(this.x));

            if(this.x < 0) {
                angle = Math.PI - angle;
            }
        }

        return angle;
    }

    reflect(normal) {
        let intermediate = normal.times(2 * dir.dot(normal));
        this.subtract(intermediate);

        return this;
    }

    reflected(normal) {
        let reflectedVector = new Vector2(this);
        reflectedVector.reflect(normal);

        return reflectedVector;
    }

    projectedOnto(other) {
        let dotProdQuotient = this.dot(other) / other.dot(other);
        let projection = other.normalized();
        projection.mult(dotProdQuotient)

        return projection;
    }

    rotate90() {
        let x = this.x;
        let y = this.y;

        this.x = -y;
        this.y = x;
    }

    set(x, y) {
        if (typeof x !== "undefined" && x instanceof Vector2) {
            this.x = x.x;
            this.y = x.y;
        }
        else {
            this.x = x;
            this.y = y;
        }
    }

    clone() {
        return new Vector2(this);
    }

    equals(other) {
        return (this.x == other.x && this.y == other.y);
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }
    
    static lerp(a, b, t) {
        return new Vector2(
            a.x * (1 - t) + b.x * t,
            a.y * (1 - t) + b.y * t
        );
    }
    
}
