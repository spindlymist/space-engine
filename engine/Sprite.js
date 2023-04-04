import Behavior from './Behavior.js';
import Camera from './Camera.js';
import {Rect} from './Math.js';
import Resources from './Resources.js';

export default class Sprite extends Behavior {

    constructor(src) {
        super();

        this.loaded = false;
        // this.img = new Image();
        // this.img.onload = () => {
        //     this.aspectRatio = this.img.height / this.img.width;
        //     this.loaded = true;
        // };
        //this.img.src = src;
        this.img = Resources.registerImage(src, src);
    }

    draw(ctx) {
        // if(!this.loaded) return;

        let dx = this.img.width * this.transform.scale.x;
        let dy = this.img.height * this.transform.scale.y;
        let bounds = new Rect(
            this.transform.position.x - dx,
            this.transform.position.y - dy,
            dx,
            dy
        );

        //if(bounds.intersects(Camera.getBounds())) {
            // let screenPos = Camera.worldToScreen(this.transform.position);

            ctx.translate(this.transform.position.x * Camera.pixelsPerUnit, -this.transform.position.y * Camera.pixelsPerUnit);
            ctx.rotate(this.transform.rotation);
            ctx.scale(this.transform.scale.x, this.transform.scale.y);
            ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);
        //}
    }

}
