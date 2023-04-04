import {Engine, Behavior, Camera, Resources} from '../engine/Engine.js';

export default class ParallaxBackground extends Behavior {

    constructor(src, scrollSensitivity) {
        super();

        if(typeof scrollSensitivity == "undefined") {
            this.scrollSensitivity = 0;
        }
        else {
            this.scrollSensitivity = scrollSensitivity;
        }

        this.shiftX = Math.random() * 400 - 200;
        this.shiftY = Math.random() * 400 - 200;

        // this.img = new Image();
        // this.img.onload = () => {
        //     this.aspectRatio = this.img.height / this.img.width;
        //     this.loaded = true;
        // };
        // this.img.src = src;
        this.img = Resources.registerImage(src, src);
        //this.loaded = false;
    }

    init() {

    }

    update(dt) {
        const effectiveScrollX = -Camera.position.x * this.scrollSensitivity + this.shiftX;
        const effectiveScrollY = Camera.position.y * this.scrollSensitivity + this.shiftY;

        let offsetX = effectiveScrollX % this.img.width;
        let offsetY = effectiveScrollY % this.img.height;

        this.startX = offsetX - this.img.width;
        this.startY = offsetY - this.img.height;
    }

    draw(ctx) {
        //if(!this.loaded) return;
        
        ctx.resetTransform();

        for(let i = this.startX; i < Engine.canvas.width; i += this.img.width) {
            for(let j = this.startY; j < Engine.canvas.height; j += this.img.height) {
                ctx.drawImage(this.img, i, j);
            }
        }
    }

}
