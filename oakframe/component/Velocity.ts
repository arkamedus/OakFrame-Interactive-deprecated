export class VelocityComponent {
	constructor(){

	}
	update(entity){
		if (entity.velocity.mag() > 1) {
			entity.velocity.normalize();
		}

		entity.position.add(entity.velocity);
		entity.velocity.mulI(0.75);
	}
}