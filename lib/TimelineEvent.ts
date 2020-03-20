import {FormField} from "./Form";
import {State} from "./State";
import {RoomObject} from "./RoomObject";

export const TimelineEventType = {
    EMPTY: 0,
    LOG: 1,
    BARK: 2,
    FIND: 3,
    WAIT: 4,
    WALK:5
};

export class TimelineEvent {
    private data: any;
    private type: number;
    private timeout: number;
    private d;

    constructor(event?: any) {
        this.type = TimelineEventType.EMPTY;
        this.timeout = 1000;
        this.d = {};

        if (event) {
            this.timeout = event.timeout || this.timeout;
            this.data = event.data;
            this.type = event.type;
        }
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

    public update(room, item, done) {
        switch (this.type) {
            case TimelineEventType.EMPTY:
                //console.log('EMPTY EVENT');
                done();
                break;
            case TimelineEventType.LOG:
                //console.log('LOG EVENT');
                //console.log(this.data);
                done();
                break;
            case TimelineEventType.BARK:
                if (!this.d.interval) {
                    item.bark = this.data;
                    this.d.interval =true;

                    window.setTimeout(function () {
                        done();
                    }, this.timeout||1000);
                }
                // console.log('BARK EVENT');
                //console.log(this.data);
                break;

            case TimelineEventType.FIND:
                if (!this.d.set){
                    this.d.set = true;
                    let is = this.findItems(room.getObjects(),this.data);
                    if (is.length){
                        item.path = this.arrayRandom(is).position;
                    }else{
                        done();
                        return;
                    }
                }
                if (item.position.dist(item.path)< 4){
                    done();
                }
                break;

            case TimelineEventType.WAIT:
                if (!this.d.wait) {
                    this.d.wait = true;
                    window.setTimeout(function () {
                        done();
                    }, this.timeout||1000);
                }
                // console.log('WAIT EVENT');
                //console.log(this.data);
                break;
        }
    }

    render(state?: State, updateCB?: any) {
        let self = this;
        let elem = document.createElement('div');

        let object_controls = new FormField({
            type: "select",
            placeholder: "Event Type",
            value: this.type || TimelineEventType.EMPTY,
            options: [{text: "Empty", value: TimelineEventType.EMPTY}, {
                text: "Log",
                value: TimelineEventType.LOG
            }, {text: "Bark", value: TimelineEventType.BARK}, {text: "Move", value: TimelineEventType.FIND}]
        }, function (n) {
            self.type = n;
            if (updateCB) {
                updateCB();
            }
            console.log('selected', n);
        });

        elem.appendChild(object_controls.getElement());

        if (this.type !== TimelineEventType.EMPTY) {
            let time_controls = new FormField({
                type: "select",
                placeholder: "Event Speed",
                value: this.timeout || 0,
                options: [{text: "Instant", value: 0}, {text: "Realtime", value: -1}, {
                    text: "1 Second",
                    value: 1
                }, {text: "5 Second", value: 5}, {text: "15 Second", value: 15}]
            }, function (n) {
                self.timeout = n;
                if (updateCB) {
                    updateCB();
                }
                console.log('selected', n);
            });
            elem.appendChild(time_controls.getElement());

        }


        switch (this.type) {

            case TimelineEventType.LOG:
                let log_controls = new FormField({
                    type: "text",
                    placeholder: "Message",
                    value: (this.data || "").toString()
                }, function (n) {
                    self.data = n;
                });
                elem.appendChild(log_controls.getElement());

                break;

            case TimelineEventType.BARK:

                if (!self.data) {
                    self.data = {object: 0, text: ""};
                } else {
                    if (!self.data.object && !self.data.text) {
                        self.data = {object: 0, text: ""};
                    }
                }

                let object_controls = new FormField({
                    type: "object",
                    placeholder: "Object",
                    value: self.data.object ? self.data.object : 0,
                    state: state
                }, function (n) {
                    self.data.object = n;
                    if (updateCB) {
                        updateCB()
                    }
                    console.log('selected', n);
                });
                let bark_controls = new FormField({
                    type: "text",
                    placeholder: "Message",
                    value: (self.data.text || "").toString()
                }, function (n) {

                    self.data.text = n;
                });


                elem.appendChild(object_controls.getElement());
                elem.appendChild(bark_controls.getElement());

                break;
        }


        return elem;
    }

}