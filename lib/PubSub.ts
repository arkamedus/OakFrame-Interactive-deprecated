export class Listeners {
    private subs;

    constructor() {
        this.subs = [];
    }

    subscribe(notice: string, callback: any) {
        this.subs.push(new Subscriber(notice, callback));
    }
    publish(notice, payload) {
        let subs = [];
        this.subs.forEach(function(sub){
            if (sub.notice === notice){
                sub.callback();
            }else{
                subs.push(sub);
            }
        });
        this.subs = subs;
        return;
    }
}

export class Subscriber {
    public notice : string;
    public callback : any;

    constructor(notice, callback) {
        this.notice = notice;
        this.callback = callback;
    }

}