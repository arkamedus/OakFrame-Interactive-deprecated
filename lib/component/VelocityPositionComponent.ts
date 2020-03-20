import {Component} from "../Component";

export class VelocityPositionComponent extends Component{
    constructor() {
		super();
	}

    update(entity) {
        if (entity.velocity.mag() > 1) {
            entity.velocity.normalize();
        }
        if (entity.velocity.mag() < 0.01) {
            entity.velocity.set(0, 0, 0);
        }

        entity.position.add(entity.velocity);
        entity.velocity.mulI(0.85);
    }

}