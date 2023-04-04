import { Engine, Behavior, Camera, RigidBody } from '../engine/Engine.js';

export default class CameraFollow extends Behavior {

    constructor(target) {
        super();

        this.target = target;
        this.smoothing = .2;
        this.rb = this.target.getBehavior(RigidBody);
    }

    update(dt) {
        if(this.smoothing > 0) {
            
            const velocity = this.rb.velocity.over(18);
            const xSign = velocity.x < 0 ? -1 : 1;
            const ySign = velocity.y < 0 ? -1 : 1;
            velocity.x = velocity.x * velocity.x * xSign;
            velocity.y = velocity.y * velocity.y * ySign;

            const maxDeltaX = Engine.canvas.width * .9;
            const maxDeltaY = Engine.canvas.height * .9;
            
            if(Math.abs(velocity.x) > maxDeltaX) velocity.x = maxDeltaX * xSign;
            if(Math.abs(velocity.y) > maxDeltaY) velocity.y = maxDeltaY * ySign;

            const targetPoint = this.target.transform.position.plus(velocity);
        
            const direction = targetPoint.minus(Camera.position);
            direction.mult(dt);
            direction.div(this.smoothing);

            Camera.position.add(direction);
        }
        else {
            Camera.position.set(this.target.transform.position);
        }
    }

}
