import _Behavior from './Behavior.js';
import _Camera from './Camera.js';
import _Entity from './Entity.js';
import _Input from './Input.js';
import {
    Circle as _Circle,
    MathUtil as _MathUtil,
    Polygon as _Polygon,
    Random as _Random,
    Rect as _Rect,
    Vector2 as _Vector2
} from './Math.js';
import {
    Collider as _Collider,
    Physics as _Physics,
    RigidBody as _RigidBody
} from './Physics.js';
import _Resources from './Resources.js';
import _Sprite from './Sprite.js';
import _Transform from './Transform.js';

export const Behavior = _Behavior;
export const Camera = _Camera;
export const Entity = _Entity;
export const Input = _Input;
export const Circle = _Circle;
export const MathUtil = _MathUtil;
export const Physics = _Physics;
export const Polygon = _Polygon;
export const Random = _Random;
export const Rect = _Rect;
export const Vector2 = _Vector2;
export const Collider = _Collider;
export const RigidBody = _RigidBody;
export const Resources = _Resources;
export const Sprite = _Sprite;
export const Transform = _Transform;

export class Engine {

    static update() {
        // Pre-update operations
        let dt = Engine.updateTime();
        Input.update();

        // Update
        Engine.entities.forEach(e => e.update(dt));

        // Post-update operations
        Engine.entities = Engine.entities.filter(e => {
            if(e.__delete_on_frame_end) e.destroy();
            return !e.__delete_on_frame_end;
        });
        Engine.entities.forEach(e => e.updatePhysics(dt));

        // Draw
        Engine.draw();

        Engine.animFrameHandle = window.requestAnimationFrame(Engine.update);
    }

    static updateTime() {
        let newTime = Date.now();
        let dt = (newTime - Engine.time) / 1000;
        Engine.time = newTime;

        return dt;
    }

    static draw() {
        Engine.ctx.resetTransform();
        Engine.ctx.clearRect(0, 0, Engine.canvas.width, Engine.canvas.height);

        Engine.ctx.beginPath();
        Engine.ctx.ellipse(Engine.canvas.width / 2, Engine.canvas.height / 2, 5, 5, 0, 0, 2*Math.PI);
        Engine.ctx.fill();

        Engine.ctx.translate(
            (Engine.canvas.width / 2)  - (Camera.position.x * Camera.pixelsPerUnit),
            (Engine.canvas.height / 2) + (Camera.position.y * Camera.pixelsPerUnit)
        );

        Engine.entities.forEach(e => {
            Engine.ctx.save();
            e.draw(Engine.ctx);
            Engine.ctx.restore();
        });
    }

    static async startGame() {
        Engine.initCanvas();

        Engine.entities.forEach(e => e.init());        

        await Resources.loadResources();

        Engine.registerEventListeners();

        Engine.time = Date.now();
        Engine.running = true;

        Engine.animFrameHandle = window.requestAnimationFrame(Engine.update);
    }

    static addEntity() {
        for (let arg of arguments) {
            Engine.entities.push(arg);

            if(Engine.running) {
                arg.init();
            }
        }
    }

    static deleteEntity(entity) {
        entity.__delete_on_frame_end = true;
    }

    static initCanvas() {
        Engine.canvas = document.querySelector('#main-canvas');
        Engine.ctx = Engine.canvas.getContext('2d');

        Engine.adjustCanvasDimensions();
    }

    static adjustCanvasDimensions() {
        Engine.canvas.width = Engine.canvas.offsetWidth;
        Engine.canvas.height = Engine.canvas.offsetHeight;
        Camera.updateBounds();
    }

    static registerEventListeners() {
        window.addEventListener('resize', Engine.adjustCanvasDimensions);
        document.addEventListener('visibilitychange', Engine.onDocumentVisibilityChange);
        Input.registerEventListeners();
    }

    static onDocumentVisibilityChange() {
        if(document.hidden) {
            window.cancelAnimationFrame(Engine.animFrameHandle);
        }
        else {
            Engine.time = Date.now();
            Engine.animFrameHandle = window.requestAnimationFrame(Engine.update);
        }
    }

}

Engine.running = false;
Engine.entities = [];
Engine.time = 0;
