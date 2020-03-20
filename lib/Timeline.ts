import {TimelineEvent} from "./TimelineEvent";

export class Timeline {
    public events: Array<TimelineEvent>;
    private name: string;

    constructor(timeline?:Timeline) {
        let self = this;
        this.name = "Default Timeline";
        this.events = [];

        if (timeline) {
            this.name = timeline.name;
            timeline.events.forEach(function (e) {
                self.events.push(new TimelineEvent(e));
            });
        }

    }

    getName(){
        return this.name;
    }

    getEvents(){
        return this.events;
    }

}