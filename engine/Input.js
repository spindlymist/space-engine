import { Engine } from "./Engine.js";

export default class Input {

    static registerEventListeners() {
        Engine.canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });
        Engine.canvas.addEventListener('mousedown', Input.onMouseDown);
        Engine.canvas.addEventListener('mouseup', Input.onMouseUp);
        Engine.canvas.addEventListener('mousemove', Input.onMouseMove);
        document.addEventListener('keydown', Input.onKeyDown);
        document.addEventListener('keyup', Input.onKeyUp);
    }

    static update() {
        if (Input.mouse.left) {
            Input.mouse.leftDown = !Input.lastInput.mouse.left;
        } else {
            Input.mouse.leftUp = Input.lastInput.mouse.left;
        }

        if (Input.mouse.right) {
            Input.mouse.rightDown = !Input.lastInput.mouse.right;
        } else {
            Input.mouse.rightUp = Input.lastInput.mouse.right;
        }

        Input.lastInput = JSON.parse(JSON.stringify({
            mouse: Input.mouse,
            keys: Input.keys
        }));
    }

    static onMouseDown(e) {
        e.preventDefault();

        if (e.button === 0) {
            Input.mouse.left = true;
        } else if (e.button === 2) {
            Input.mouse.right = true;
        }
    }

    static onMouseUp(e) {
        if (e.button === 0) {
            Input.mouse.left = false;
        } else if (e.button === 2) {
            Input.mouse.right = false;
        }
    }

    static onMouseMove(e) {
        Input.mouse.x = e.offsetX;
        Input.mouse.y = e.offsetY;
    }

    static onKeyDown(e) {
        Input.keys[e.key] = true;
    }

    static onKeyUp(e) {
        Input.keys[e.key] = false;
    }

}

Input.mouse = {
    leftDown: false,
    left: false,
    leftUp: false,
    rightDown: false,
    right: false,
    rightUp: false,
    x: 0,
    y: 0,
};
Input.keys = {};
Input.lastInput = JSON.parse(JSON.stringify({
    mouse: Input.mouse,
    keys: Input.keys
}));
