import Vector2 from "./Vector2.js";

export default class Polygon {

    constructor(points) {
        if(typeof points != "undefined" && points instanceof Array) {
            this.points = points;
            this.edges = points.length;
        }
        else {
            this.points = [];
            this.edges = 0;
        }
    }

    intersects(other) {
        const axes = this.findAxes().concat(other.findAxes());

        let minOverlap = Infinity;
        let minOverlapAxis = null;

        for(const axis of axes) {
            const [min, max] = this.findAxisMinMax(axis, this.points);
            const [otherMin, otherMax] = this.findAxisMinMax(axis, other.points);

            if(otherMin > max || min > otherMax) {
                return false;
            }

            const overlap = Math.abs(max - otherMin);

            if(overlap < minOverlap) {
                minOverlap = overlap;
                minOverlapAxis = axis;
            }
        }

        const corrective = minOverlapAxis.times(minOverlap);

        return corrective;
    }

    findAxes() {
        const axes = [];

        for(let i = 0; i < this.edges; i++) {
            const next = (i + 1) % this.edges;
            const axis = new Vector2(this.points[next]);
            axis.sub(this.points[i]);
            axis.normalize();
            axis.rotate90();

            axes.push(axis);
        }

        return axes;
    }

    findAxisMinMax(axis, points) {
        let min = Infinity, max = -Infinity;

        for(const point of points) {
            const axisVal = point.projectedOnto(axis).magnitude();
            if(axisVal < min) min = axisVal;
            if(axisVal > max) max = axisVal;
        }

        return [min, max];
    }

    draw(ctx) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = .5;
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for(let i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        ctx.lineTo(this.points[0].x, this.points[0].y);
        ctx.stroke();
    }

}
