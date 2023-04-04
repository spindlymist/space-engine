export default class Circle {

    constructor(center, radius) {
        this.center = center;
        this.radius = radius;
    }

    intersects(other) {
        const dist = this.center.minus(other.center).magnitude();
        return (dist < this.radius + other.radius);
    }

}
