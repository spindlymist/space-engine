import {Vector2} from './Math.js';

export default class Transform {
    constructor(position, rotation, scale) {
        if(typeof position != "undefined" && position instanceof Vector2) {
            this.position = position;
        }
        else {
            this.position = new Vector2(0, 0);
        }

        if(typeof rotation == "number") {
            this.rotation = rotation;
        }
        else {
            this.rotation = 0;
        }

        if(typeof scale == "number") {
            this.scale = new Vector2(scale, scale);
        }
        else if(typeof scale != "undefined" && scale instanceof Vector2) {
            this.scale = scale;
        }
        else {
            this.scale = new Vector2(1, 1);
        }
    }
}
