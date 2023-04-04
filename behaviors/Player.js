import {Engine, Behavior, Camera, RigidBody, Vector2, Input} from '../engine/Engine.js';

export default class Player extends Behavior {

    constructor() {
        super()

        this.speed = 1000;
    }

    init() {
        this.rb = this.entity.getBehavior(RigidBody);
    }

    update(dt) {
        if(Input.mouse.left) {
            const screenPos = Camera.worldToScreen(this.transform.position);
            const force = new Vector2(
                Input.mouse.x - screenPos.x,
                -(Input.mouse.y - screenPos.y)
            );

            this.transform.rotation = -force.toAngle();

            force.normalize();
            force.mult(this.speed);

            this.rb.applyForce(force);
        }
        else if(Input.mouse.right) {
            const force = this.rb.velocity.clone();
            force.normalize();
            force.mult(-this.speed / 4);

            this.rb.applyForce(force);
        }
    }

}
