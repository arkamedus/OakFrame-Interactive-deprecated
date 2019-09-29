import {Room} from "./Room";
import {Prefab} from "./Prefab";
import {RoomObject} from "./RoomObject";
import {Timeline} from "./Timeline";

export class Project {
    private name;
    private owner;
    private status;
    private objects: Array<Prefab>;
    private sprites;
    private rooms: Array<Room>;
    private sounds;
    private scripts;
    private timelines: Array<Timeline>;

    constructor(project?: Project) {
        let self = this;
        this.rooms = [];
        this.timelines = [];
        this.objects = [];
        if (project) {
            this.name = project.name;
            project.rooms.forEach(function (room) {
                self.rooms.push(new Room(room));
            });
            project.objects.forEach(function (room_object) {
                self.objects.push(new Prefab(room_object));
            });
            project.timelines.forEach(function (timeline) {
                self.timelines.push(new Timeline(timeline));
            });
        }
    }

    setName(name: string) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    getObjects() {
        return this.objects;
    }

    createRoom(r?: Room) {
        let room = new Room(r);
        this.rooms.push(room);
        return room;
    }

    getRooms() {
        return this.rooms;
    }

    getTimelines() {
        return this.timelines;
    }

}