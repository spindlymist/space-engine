import {Engine, Behavior, Camera, Vector2} from '../engine/Engine.js';

export default class PolygonTest extends Behavior {

    constructor(polygon) {
        super()

        this.polygon = polygon;
    }

    update(dt) {
        // if(this.p1.intersects(this.p2)) {
        //     this.p1.color = this.p2.color = 'red';
        // }
        // else {
        //     this.p1.color = this.p2.color = 'lime';
        // }
    }

    draw(ctx) {
        this.polygon.draw(ctx);
    }

}
