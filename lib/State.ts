import {Room} from "./Room";
import {Timeline} from "./Timeline";
import {Project} from "./Project";
import {Camera} from "./Camera";
import {TimelineEvent} from "./TimelineEvent";

export class State {
    private project: Project;
    private room: Room;
    private timeline: Timeline;
    public timeline_event: TimelineEvent;
    public camera: Camera;
    public timeline_index: number;

    constructor(state?) {
        this.room = null;
        this.project = null;
        this.timeline = null;
        this.timeline_index = 0;
        this.timeline_event = null;
        this.camera = new Camera();
    }

    setProject(project) {
        this.project = project;
    }

    setTimeline(timeline) {
        this.timeline = timeline;
    }

    getCamera() {
        return this.camera;
    }

    setRoom(room) {
        this.room = new Room(room);
    }

    getRoom() {
        return this.room;
    }

    getProject() {
        return this.project;
    }

    getTimeline() {
        return this.timeline;
    }

    getTimelineEvent() {
        return this.timeline.getEvents()[this.timeline_index];
    }

}