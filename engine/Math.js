import _Circle from './math/Circle.js';
import _Polygon from './math/Polygon.js';
import _Random from './math/Random.js';
import _Rect from './math/Rect.js';
import _Vector2 from './math/Vector2.js';

export const Circle = _Circle;
export const Polygon = _Polygon;
export const Random = _Random;
export const Rect = _Rect;
export const Vector2 = _Vector2;

export class MathUtil {

    static degToRad(deg) {
        return deg * (Math.PI / 180);
    }

    static radToDeg(rad) {
        return rad * (180 / Math.PI);
    }

    static clamp(val, min, max) {
        if (val < min) {
            return min;
        } else if (val > max) {
            return max;
        } else {
            return val;
        }
    }

    static lerp(a, b, t) {
        return a * (1 - t) + b * t;
    }

    static smoothstep(a, b, t) {
        t = (t * t) * (3 - 2 * t);
        return a * (1 - t) + b * t;
    }
    
}
