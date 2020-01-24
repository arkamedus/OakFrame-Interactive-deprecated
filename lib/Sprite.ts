import {Listeners} from "./PubSub";

export class Sprite {
    private src: Array<String>;
    private images: Array<any>;
    private image_index;
    private image_speed;
    private listener;

    constructor(sprite) {
        this.src = [];
        this.images = [];
        if (sprite) {
            this.src = ((sprite.src) ? (Array.isArray(sprite.src) ? sprite.src : [sprite.src]) : []);
        }
        this.listener = new Listeners();
    }

    getImage() {
        let self = this;
        this.image_index = (Date.now() / 250) | 0;
        this.image_index = this.image_index % this.src.length;

        let img = this.images[this.image_index];
        if (!img) {
            let new_img: any = new Image();
            new_img.src = this.src[this.image_index];
            new_img.isReady = false;
            new_img.onload = function () {
                new_img.isReady = true;
                self.listener.publish('load');
            };

            this.images.push(new_img);
            return false;
        }

        if (img) {
            if (img.isReady) {
                return img;
            }
        }
        return false;
    }

    toString() {
        return JSON.stringify({src: this.src});
    }

    on(notice, callback) {
        this.listener.subscribe(notice, callback);
    }

}