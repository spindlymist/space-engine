import Behavior from '../Behavior.js';
import { Vector2 } from '../Math.js';

export default class RigidBody extends Behavior {

    init() {
        this.mass = 1;
        this.velocity = new Vector2(0, 0);
        this.drag = 10;
        this.gravity = 0;
        this.totalForce = new Vector2(0, 0);
    }

    updatePhysics(dt) {
        this.totalForce.sub(this.velocity.times(this.drag));
        this.totalForce.mult(dt);

        const acceleration = this.totalForce.over(this.mass);
        acceleration.mult(dt);

        this.velocity.add(acceleration);

        this.transform.position.add(this.velocity.times(dt));

        this.totalForce.x = 0;
        this.totalForce.y = 0;
    }

    applyForce(force) {
        this.totalForce.add(force);
    }

}
