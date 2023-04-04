import Transform from './Transform.js';

export default class Entity {

    constructor(position, rotation, scale) {
        this.transform = new Transform(position, rotation, scale);
        this.behaviors = [];
    }

    addBehavior(behavior) {
        behavior.entity = this;
        behavior.transform = this.transform;
        this.behaviors.push(behavior);
    }

    getBehavior(type) {
        for(const behavior of this.behaviors) {
            if(behavior instanceof type) return behavior;
        }

        return null;
    }

    init() {
        this.behaviors.forEach(behavior => { if(behavior.enabled) behavior.init() });
    }

    destroy() {
        this.behaviors.forEach(behavior => { if(behavior.enabled) behavior.destroy() });
    }

    update(dt) {
        this.behaviors.forEach(behavior => { if(behavior.enabled) behavior.update(dt) });
    }

    updatePhysics(dt) {
        this.behaviors.forEach(behavior => { if(behavior.enabled) behavior.updatePhysics(dt) });
    }

    draw(ctx) {
        this.behaviors.forEach(behavior => { if(behavior.enabled) behavior.draw(ctx) });
    }

}
