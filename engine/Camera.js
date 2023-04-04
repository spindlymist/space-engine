import {Engine} from './Engine.js';
import {Rect, Vector2} from './Math.js';

export default class Camera {

    static getBounds() {
        if(Camera.__bounds_position === null || !Camera.__bounds_position.equals(Camera.position)) {
            Camera.updateBounds();
        }

        return Camera.__bounds;
    }

    static updateBounds() {
        let dx = Engine.canvas.width / 2;
        let dy = Engine.canvas.height / 2;

        Camera.__bounds = new Rect(
            Camera.position.x - dx,
            Camera.position.y - dy,
            Engine.canvas.width,
            Engine.canvas.height
        );
    }

    static worldToScreen(point) {
        let cameraPoint = point.minus(Camera.position);
        cameraPoint.y *= -1;
        cameraPoint.mult(Camera.pixelsPerUnit);
        cameraPoint.add(new Vector2(Engine.canvas.width / 2, Engine.canvas.height / 2));
        return cameraPoint;
    }

}

Camera.pixelsPerUnit = 50;
Camera.position = new Vector2(0, 0);
Camera.__bounds_position = null
Camera.__bounds = null;
