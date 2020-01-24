import {RoomObject} from "./RoomObject";
import {Vec3} from "./Vec3";

export class Room {
    private name: string;
    private objects: Array<RoomObject>;
    private position: Vec3;
    private size: Vec3;

    constructor(room?: Room) {
        let self = this;
        this.name = "Default Room";
        this.objects = [];
        this.position = new Vec3();
        this.size = new Vec3();
        this.size.x = 24;
        this.size.y = 16;

        if (room) {
            this.name = room.name;
            this.position.copy(room.position);
            this.size.copy(room.size);
            room.objects.forEach(function (ob) {
                self.objects.push(new RoomObject(ob));
            })
        }
    }

    public getName() {
        return this.name;
    }

    public setName(name) {
        this.name = name;
    }

    public getObjects() {
        return this.objects;
    }

    public addObject(ob: RoomObject) {
        this.objects.push(ob);
    }

    public createObject(ob?: RoomObject) {
        this.objects.push(new RoomObject(ob));
    }

    public findItems(tag) {
        let i = [];
        this.objects.forEach(function (e) {
            if (e.getTags().indexOf(tag) !== -1) {
                i.push(e);
            }
        });
        return i;
    }

    depthSort(camera) {
        var co = 0;
        var sw = 0; // ti = performance.now();
        let _v1 = new Vec3();

        for (var index = 0; index < this.objects.length; index++) {
             _v1.copy(camera.from).z = 0;
            this.objects[index].depth = _v1.dist(this.objects[index].position);
            if (this.objects[index].decal) {
                this.objects[index].depth += 1000000;
                this.objects[index].depth += (this.objects[index].scale.mag());
            }
        }
        var loop = true;
        var times = 0;
        var val = null;

        do {
            loop = false;

            for (var i = 0; i < this.objects.length - (1 + times); i++) {
                //co += 1;

                if (this.objects[i].depth < this.objects[i + 1].depth) {
                    //sw += 1;
                    val = this.objects[i];
                    this.objects[i] = this.objects[i + 1];
                    this.objects[i + 1] = val;
                    loop = true;
                }

            }
            times++;
        } while (loop);
    }

}