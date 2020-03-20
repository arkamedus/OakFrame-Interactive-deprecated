import {TimelineEvent, TimelineEventType} from "./TimelineEvent";
import {RoomObject} from "./RoomObject";
import {Timeline} from "./Timeline";

export class EntityBehavior {

    public hunger;
    public hygiene;
    public social;
    public energy;
    public environment;
    public entertained;

    constructor() {
        this.hunger = Math.random();
        this.hygiene = Math.random();
        this.social = Math.random();
        this.energy = Math.random();
        this.environment = Math.random();
        this.entertained = Math.random();
    }

    public update() {
        let decay = 0.0001;
        this.hunger -= decay;
        this.hygiene -= decay;
        this.social -= decay;
        this.energy -= decay;
        this.environment -= decay;
        this.entertained -= decay;
    }

    public getHunger() {
        return this.hunger;
    }

    public getHygiene() {
        return this.hygiene;
    }

    public getSocial() {
        return this.social;
    }

    public getEnergy() {
        return this.energy;
    }

    public getEnvironment() {
        return this.environment;
    }

    public getEntertained() {
        return this.entertained;
    }

    public giveSocial() {
        this.social += 0.25;
    }

    public giveFood() {
        this.hunger += 0.25;
    }
    public giveEnergy() {
        this.energy += 1.25;
    }

}

export class Interaction {
    public events: Array<Task>;
    private name: string;
    private index;
    private remove;
    private priority_function;

    constructor(interaction?: Interaction) {
        let self = this;
        this.name = "Default Timeline";
        this.events = [];
        this.index = 0;
        this.remove = false;
        this.priority_function = null;

        if (interaction) {
            this.name = interaction.name;
            interaction.events.forEach(function (e) {
                self.events.push(new Task(e));
            });
        }

    }

    setPriorityFunction(fn) {
        this.priority_function = fn;
    }

    getPriority(item, room) {
        return (this.priority_function ? this.priority_function(item, room) : 0.5);
    }

    update(room, item) {
        let self = this;
        // console.log(item.getName(), this.getCurrentTask());
        if (this.getCurrentTask()) {
            // let next = this.nextTask();
            //if (next) {
            this.getCurrentTask().update(room, item, this);
            //} else {
            //  console.log('interaction complete', this.name);
            //}
        }
    }


    public getDone() {
        //TODO REMOVE TASK
        return this.nextTask;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    getEvents() {
        return this.events;
    }

    getRemove() {
        return this.remove;
    }

    nextTask() {
        if (this.events[this.index].isDone()) {
            this.events.shift();
            if (this.events.length === 0) {
                this.remove = true;
                return false;
            }
        }
        return this.events[this.index];
    }

    getCurrentTask() {
        return this.events[this.index];
    }

}

export class TaskManager {

    public queue;
    public next_action;
    public active_actions;
    public layers;

    constructor() {
        this.queue = [];
        this.next_action = null;
        this.active_actions = [];
        this.layers = [];
    }

    public update(room, item) {

        let self = this;
        if (this.queue.length > 0) {

            if (!this.next_action) {
                this.next_action = new Interaction(this.queue.shift());
            }
        }

        let conflicts = 0;
        this.active_actions.forEach(function (task) {
            conflicts++;
        });

        if (conflicts === 0) {
            this.active_actions.push(this.next_action);
            this.next_action = null;
        }

        this.active_actions.forEach(function (interaction, i) {
            if (interaction) {
                interaction.update(room, item);
            }
        });

        this.active_actions = this.active_actions.filter(function (a) {
            return a && a.getRemove() == false;
        });
    }

    public compareConstraints(object, task_a, task_b) {

    }

    public setNextInteraction(action) {
        this.next_action = action;
    }

    public getNextAction() {
        return this.next_action;
    }

    public getCurrentTasks() {
        return this.active_actions;
    }

    public getQueue() {
        return this.queue;
    }

    public addQueue(interaction) {
        this.queue.push(interaction);
    }

}

export class Task {
    public constraints: Array<Constraint>;
    private data: any;
    private type: number;
    private timeout: number;
    private d;
    private done;
    private ticks;
    private on_complete;

    constructor(event?: any) {
        this.type = TimelineEventType.EMPTY;
        this.timeout = 1000;
        this.d = {};
        this.done = false;
        this.ticks = 0;
        this.on_complete = null;

        if (event) {
            this.on_complete = event.on_complete || null;
            this.timeout = event.timeout || this.timeout;
            this.data = event.data;
            this.type = event.type;
        }
    }

    setDone(done) {
        this.done = done;
    }

    isDone() {
        return this.done;
    }

    public findItems(a, tag) {
        let i = [];
        a.forEach(function (e) {
            if (e.tags.indexOf(tag) !== -1) {
                i.push(e);
            }
        });
        return i;
    }

    public arrayRandom(a) {
        return a[Math.floor((Math.random() * a.length))]
    }


    public pathToTag(room, item, tag) {
        let i: Array<RoomObject> = this.findItems(room.getObjects(), tag);
        if (i.length) {
            let e = this.arrayRandom(i);
            if (e) {
                item.path.copy(e.position);
                item.action = null;
                item.bark = '';
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

    public update(room, item, interaction: Interaction) {
        let self = this;
        this.ticks++;

        switch (this.type) {
            case TimelineEventType.EMPTY:
                self.complete(interaction);
                break;
            case TimelineEventType.LOG:
                interaction.nextTask();
                break;
            case TimelineEventType.BARK:
                if (!this.d.interval) {
                    item.bark = this.data;
                    this.d.interval = true;

                    window.setTimeout(function () {
                        self.complete(interaction);
                    }, this.timeout || 1000);
                }
                break;

            case TimelineEventType.FIND:
                if (!this.d.set) {
                    let is = this.findItems(room.getObjects(), this.data);
                    if (is.length) {
                        let ob = this.arrayRandom(is);
                        if (ob.getId() !== item.getId()) {
                            this.d.set = ob;
                            item.path = this.d.set.position;
                        }
                    } else {
                        self.complete(interaction);
                        return;
                    }
                } else {
                    item.path = this.d.set.position;
                    if (item.position.dist(item.path) < 4) {
                        self.complete(interaction);
                    }
                }
                break;

            case TimelineEventType.WAIT:
                if (!this.d.wait) {
                    this.d.wait = true;
                    window.setTimeout(function () {
                        self.complete(interaction);
                    }, this.timeout || 1000);
                }
                break;
            case TimelineEventType.WALK:
                if (!this.d.path) {
                    this.d.path = true;
                    item.path = this.data;
                }
                if (item.position.dist(item.path) < 4) {
                    self.complete(interaction);
                }
                break;
        }

        if (this.ticks > 1200) {
            console.error('TASK FAILED TO COMPLETE WITHIN TIME');
            this.complete(interaction);
        }
    }

    public complete(interaction) {
        if (!this.isDone()) {
            if (this.on_complete) {
                this.on_complete(interaction);
            }
            this.setDone(true);
            interaction.nextTask();
            return true;
        }
        return false;
    }

    public getConstraints() {
        return this.constraints;
    }

    public getPriority() {
        return 0;
    }
}

export class Constraint {
    private type: string;
    private position;
    private distance;

    constructor() {
    }

    public getType() {
        return this.type;
    }

    public meetsConstraint(object, layers) {
        return false;
    }
}

export class Vec3DistanceConstraint {
    private position;
    private distance;
    private type: string;

    constructor(position, distance) {
        this.position = position;
        this.distance = distance;
        this.type = 'distance';
    }

    public getType() {
        return this.type;
    }

    public meetsConstraint(object, layers) {
        return this.position.dist(object.position) <= this.distance;
    }
}

