import {Component} from "../Component";
import {Vec3} from "../Vec3";
import {RoomObject} from "../RoomObject";

export class PathVelocityComponent extends Component {

    constructor(){
        super();
    }

    update(entity: RoomObject){
        if (entity.path) {
            if (entity.path.mag() !== 0) {
                if (entity.position.dist(entity.path) > 1.25) {
                    let v = new Vec3();
                    v.copy(entity.path).pointTo(entity.position);
                    v.normalize().divI(5);
                    entity.velocity.copy(v);
                }
            }
        }

    }

}