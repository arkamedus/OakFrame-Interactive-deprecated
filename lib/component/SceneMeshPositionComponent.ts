import {Component} from "../Component";

export class SceneMeshPositionComponent extends Component{

	constructor(){
		super();
	}
	update(entity){
		if (entity.mesh) {
			entity.mesh.position.copy(entity.position);
		}
	}

}