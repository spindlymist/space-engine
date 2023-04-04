import { Behavior, Resources, Engine, Input } from "../engine/Engine.js";
import { Vector2 } from "../engine/Math.js";

export default class ShipBuilder extends Behavior {

    init() {
        this.gridImg = Resources.registerImage('shipbuilder-grid', './img/grid.png');
        this.gridSize = 68;
        this.gridPad = 2;
        this.gridOffset = 24;
    }

    update(dt) {

    }

    draw(ctx) {
        ctx.resetTransform();

        ctx.globalAlpha = .95;
        ctx.fillStyle = '#34363f';
        ctx.fillRect(0, 0, Engine.canvas.width, Engine.canvas.height);

        ctx.globalAlpha = 1;
        this.drawGrid(ctx);

        this.drawCursor(ctx);
    }

    drawGrid(ctx) {
        for(let x = -this.gridOffset; x < Engine.canvas.width; x += this.gridImg.width) {
            for(let y = -this.gridOffset; y < Engine.canvas.height; y += this.gridImg.height) {
                ctx.drawImage(this.gridImg, x, y);
            }
        }
    }

    drawCursor(ctx) {
        const gridCell = new Vector2(
            Math.floor((Input.mouse.x + this.gridOffset) / this.gridSize),
            Math.floor((Input.mouse.y + this.gridOffset) / this.gridSize)
        );
        const gridCoords = gridCell.times(this.gridSize);

        ctx.fillStyle = 'rgba(255, 255, 255, .1)';
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.rect(gridCoords.x + this.gridPad - this.gridOffset, gridCoords.y + this.gridPad - this.gridOffset, this.gridSize - 2*this.gridPad, this.gridSize - 2*this.gridPad);
        ctx.fill();
        ctx.stroke();
    }

}
