export class SceneMeshPositionComponent {

	constructor(){

	}
	update(entity){
		if (entity.mesh) {
			entity.mesh.position.copy(entity.position);
		}
	}

}