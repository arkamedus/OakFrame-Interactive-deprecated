import {Vec2} from "./Vec2";
import {Vec3} from "./Vec3";

export class BasicInput {
    private TouchMoveAllowed: boolean;
    private TouchTimer: number;
    private isTouching;
    public didLongTouch;
    public didLongTouchRelease;
    public pos;
    public wheel;
    public pos_last;
    public start_last;
    public isSwiping;
    public touch_state;
    public button;
    public buttonPressed;
    public buttonReleased;
    public input;
    public Key;
    public KeyPressed;
    public KeyReleased;
    public TILT;
    public TILTD;
    public ABSTILT;
    public positionCurrent;
    public defaultOrientation;
    public isScrolling;

    constructor( input_target ) {
        window['BasicInput'] = this;
        this.TouchMoveAllowed = false;
        this.TouchTimer = 0;
        this.isTouching = false;
        this.didLongTouch = false;
        this.didLongTouchRelease = false;
        this.pos = new Vec2();
        this.wheel = 0;
        this.pos_last = new Vec2();
        this.start_last = new Vec2();
        this.isSwiping = false;
        this.touch_state = 0; // 0 = none, 1 = short tap, 2= long tap, 3 = hold
        this.button = [false, false, false, false, false, false];
        this.buttonPressed = [false, false, false, false, false, false];
        this.buttonReleased = [false, false, false, false, false, false];
        this.TILT = new Vec3();
        this.TILTD = new Vec3();
        this.ABSTILT = new Vec3();
        this.positionCurrent = 0;
        this.isScrolling = 0;
        this.defaultOrientation = 'portrait';
        this.Key = [];
        /** @type {Array<boolean>} */
        this.KeyReleased = [];
        /** @type {Array<boolean>} */
        this.KeyPressed = [];

        for (let u = 0; u < 255; u += 1) {
            this.Key[u] = false;
            this.KeyPressed[u] = false;
            this.KeyReleased[u] = false;
        }

        input_target.addEventListener("mousedown", this.handleMouseEvent, false);
        input_target.addEventListener("mouseup", this.handleMouseEventUp, false);

        //window.addEventListener("contextmenu", this.stopEvent);
        input_target.addEventListener("touchstart", this.onTouchDown, false);
        input_target.addEventListener("touchmove", BasicInput.onTouchMove, false);
        input_target.addEventListener("touchend", this.onTouchUp, false);

        input_target.addEventListener('mousemove', this.setPos, false);


        window.addEventListener("keydown", this.onKeyDown, false);
        window.addEventListener("keyup", this.onKeyUp, false);

        window.addEventListener("scroll", this.handleScroll, false);


    }

    handleScroll(event){
        window['BasicInput'].isScrolling = Date.now()+15;
    }

    getIsScrolling(){
        return window['BasicInput'].isScrolling > Date.now();
    }

    lengthdir_x(dist, angle) {
        return dist * Math.cos(angle * 0.0174533);
    }

    lengthdir_y(dist, angle) {
        return dist * -Math.sin(angle * 0.0174533);
    }

    setPos(event) {

       // let mousePos = window['BasicInput'].getMousePos(event.srcElement, event);
        window['BasicInput'].pos.x = event.clientX;//mousePos.x;
        window['BasicInput'].pos.y = event.clientY;//mousePos.y;
        //console.log(window['BasicInput'].pos.toArray());

    }

    getPos(){
        return window['BasicInput'].pos;
    }

    static stopEvent(event) {
        if (event.preventDefault !== undefined) {
            event.preventDefault();
        }
        return false;
    }

    onKeyDown(event) {
        if (window['BasicInput'].Key[event.keyCode] === false) {
            console.log("keyboard: " + event.keyCode + "pressed");
            window['BasicInput'].KeyPressed[event.keyCode] = true;
        }
        window['BasicInput'].Key[event.keyCode] = true;
    }

    onKeyUp(event) {
        window['BasicInput'].Key[event.keyCode] = false;
        console.log("keyboard: " + event.keyCode + "released");
        window['BasicInput'].KeyReleased[event.keyCode] = true;
    }


    onTouchDown(event) {
        console.log('touchDown');
        window['BasicInput'].start_last.x = event.changedTouches[0].pageX;
        window['BasicInput'].start_last.y = event.changedTouches[0].pageY;
        window['BasicInput'].pos.x = event.changedTouches[0].pageX;
        window['BasicInput'].pos.y = event.changedTouches[0].pageY;
        window['BasicInput'].buttonPressed[5] = true;
        window['BasicInput'].button[5] = true;
        window['BasicInput'].TouchTimer = 0;
        window['BasicInput'].isTouching = true;
        window['BasicInput'].didLongTouch = false;
        window['BasicInput'].isSwiping = false;
       // console.log('touchDown', event);
    }

    onTouchUp(event) {
        if (window['BasicInput'].TouchTimer < 10) {
            window['BasicInput'].touch_state = 1;
            // console.log('touch quick tap');
        } else if (window['BasicInput'].TouchTimer < 30) {
            window['BasicInput'].touch_state = 2;
            //console.log('touch tap');
        } else {
            //window['BasicInput'].didLongTouchRelease = true;
        }
        window['BasicInput'].pos.x = event.changedTouches[0].pageX;
        window['BasicInput'].pos.y = event.changedTouches[0].pageY;
        window['BasicInput'].isSwiping = false;

        window['BasicInput'].isTouching = false;
        //window['BasicInput'].buttonReleased[5] = false;
        window['BasicInput'].button[5] = false;
        //console.error('UP')
    }

    public static onTouchMove(event) {
        window['BasicInput'].button[5] = true;
        window['BasicInput'].pos.x = event.changedTouches[0].pageX;
        window['BasicInput'].pos.y = event.changedTouches[0].pageY;

        if (window['BasicInput'].pos.dist(window['BasicInput'].start_last) > 20) {
            window['BasicInput'].isSwiping = true;
        }

        console.log("touching");

        window['BasicInput'].isTouching = true;
        if (!window['BasicInput'].TouchMoveAllowed) {
            //	event.preventDefault();
        }
    }

    handleMouseEvent(event) {
        //console.log('mouseEvent', event);
        let evt = event || window.event;
        let mb = 1;
        if (evt.which) {
            if (evt.which === 3) {
                mb = 2;
            }
            if (evt.which === 2) {
                mb = 4;
            }
        } else if (evt.button) {
            if (evt.button === 2) {
                mb = 2;
            }
            if (evt.button === 4) {
                mb = 4;
            }
        }
        //window['BasicInput'].buttonPressed[mb] = true;
        window['BasicInput'].button[mb] = true;
        window['BasicInput'].setPos(event);
       // this.button[mb] = true;
       // this.setPos(event);
          console.log(mb);
        return mb;
    }

    handleMouseEventUp(event) {
        let evt = event || window.event;
        let mb = 1;
        if (evt.which) {
            if (evt.which === 3) {
                mb = 2;
            }
            if (evt.which === 2) {
                mb = 4;
            }
        } else if (evt.button) {
            if (evt.button === 2) {
                mb = 2;
            }
            if (evt.button === 4) {
                mb = 4;
            }
        }
        window['BasicInput'].buttonReleased[mb] = true;
        window['BasicInput'].button[mb] = false;
        //this.buttonReleased[mb] = true;
        //this.button[mb] = false;
        //this.setPos(event);
        return mb;
    }

    getButton(btn) {
        return window['BasicInput'].button[btn];
    }

    getMousePos(elem, evt) {
        let getMousePosRect = elem.getBoundingClientRect();

        return {
            x: evt.clientX - getMousePosRect.left,
            y: evt.clientY - getMousePosRect.top
        };
    }

    getBrowserOrientation() {
        let orientation;
        /*if (screen.orientation && screen.orientation.type) {
            orientation = screen.orientation.type;
        } else {
            orientation = screen.orientation ||
                screen.mozOrientation ||
                screen.msOrientation;
        }*/

        /*
         'portait-primary':      for (screen width < screen height, e.g. phone, phablet, small tablet)
         device is in 'normal' orientation
         for (screen width > screen height, e.g. large tablet, laptop)
         device has been turned 90deg clockwise from normal
         'portait-secondary':    for (screen width < screen height)
         device has been turned 180deg from normal
         for (screen width > screen height)
         device has been turned 90deg anti-clockwise (or 270deg clockwise) from normal
         'landscape-primary':    for (screen width < screen height)
         device has been turned 90deg clockwise from normal
         for (screen width > screen height)
         device is in 'normal' orientation
         'landscape-secondary':  for (screen width < screen height)
         device has been turned 90deg anti-clockwise (or 270deg clockwise) from normal
         for (screen width > screen height)
         device has been turned 180deg from normal
         */

        return orientation;
    }

    arrayGetAverage(a) {
        let ret = 0;
        if (a.length && a.length !== 0) {
            a.forEach(function (list) {
                ret += list;
            });
            return (ret / a.length)
        }
        return 0;
    }

    onHeadingChange(event) {

        let TILT = window['BasicInput'].TILT;
        let TILTD = window['BasicInput'].TILTD;
        let ABSTILT = window['BasicInput'].ABSTILT;
        let defaultOrientation = window['BasicInput'].defaultOrientation;
        let positionCurrent = window['BasicInput'].positionCurrent;
        let arrayGetAverage = window['BasicInput'].arrayGetAverage;
        let lengthdir_x = window['BasicInput'].lengthdir_x;
        let lengthdir_y = window['BasicInput'].lengthdir_y;
        //var frontToBack = event.beta;

        //console.log(frontToBack)

        var x = event.beta;  // In degree in the range [-180,180]
        var y = -event.gamma; // In degree in the range [-90,90]

        var heading = event.alpha;

        if (typeof event.webkitCompassHeading !== "undefined") {
            heading = event.webkitCompassHeading; //iOS non-standard
        }

        var orientation = window['BasicInput'].getBrowserOrientation();

        if (typeof heading !== "undefined" && heading !== null) { // && typeof orientation !== "undefined") {
            //	offX = 65;
            // we have a browser that reports device heading and orientation

            // Because we don't want to have the device upside down
            // We constrain the x value to the range [-90,90]
            //x += 90;
            //y += 90;
            let s = 10;
            x -= 40 + s;
            x = Math.min(x, 25);

            // what adjustment we have to add to rotation to allow for current device orientation
            var adjustment = 0;
            if (defaultOrientation === "landscape") {
                adjustment -= 90;
            }

            if (typeof orientation !== "undefined") {
                var currentOrientation = orientation.split("-");

                if (defaultOrientation !== currentOrientation[0]) {
                    if (defaultOrientation === "landscape") {
                        adjustment -= 270;
                    } else {
                        adjustment -= 90;
                    }
                }

                if (currentOrientation[1] === "secondary") {
                    adjustment -= 180;
                }
            }

            positionCurrent.hng = heading + adjustment;

            var phase = positionCurrent.hng < 0 ? 360 + positionCurrent.hng : positionCurrent.hng;
            // positionHng.textContent = (360 - phase | 0) + "°";

            let sx = x;
            let sy = y;

            ABSTILT.x = x / 2.6 | 0;
            ABSTILT.y = y / 2 | 0;

            if (x > 90) {
                x = 90
            }
            if (x < -90) {
                x = -90
            }

            if (ABSTILT.x > 20) {
                ABSTILT.x = 20
            }

            //console.log(ABSTILT.x, ABSTILT.y);

            x -= arrayGetAverage(TILTD.x);
            y -= arrayGetAverage(TILTD.y);


            //y/=max;
            let tilt_dir = -((Math.atan2(x, (y) + 0.0000001) / Math.PI) * 180) + 180;
            let tilt_len = Math.sqrt((x * x) + (y * y));
            //tilt_dir /= 10;

//		lengthdir_x(tilt_len,positionCurrent.hng+tilt_dir);
//console.log(x,y);

            tilt_dir = Math.floor(tilt_dir);
            TILT.x = lengthdir_x(tilt_len, positionCurrent.hng + tilt_dir);
            TILT.y = -lengthdir_y(tilt_len, positionCurrent.hng + tilt_dir);

            //if (Game.isActive()) {
            //document.getElementById('status').innerHTML = `<i class="fa fa-arrow-right" aria-hidden="true" style="transform:rotate(${tilt_dir}deg);"></i>${tilt_len}`;
            //}
            /*
             VELOCITY.x.push(TILT.x);
             VELOCITY.y.push(TILT.y);

             let run = 60;
             if (TILTD.x.length === 0 && TILTD.y.length === 0) {
             TILTD.x.push(sx);
             TILTD.y.push(sy);
             } else {
             //TILTD.x += sx;
             //TILTD.y += sy;
             //if ( Main.getTick() % 5 === 0) {
             TILTD.x.push(sx);
             TILTD.y.push(sy);
             //}

             if (TILTD.x.length > run) {
             TILTD.x.splice(40, 1);
             }
             if (TILTD.y.length > run) {
             TILTD.y.splice(40, 1);
             }

             if (Main.getTick() % 24 === 0) {
             TILTD.x.splice(0, 1);
             TILTD.y.splice(0, 1);
             }

             ///TILTD.x /= 2;
             //T/ILTD.y /= 2;
             //TILTD.x = (sx*0.25)+(TILTD.x*.75);
             //TILTD.x = (sy*0.25)+(TILTD.y*.75);
             }
             //console.log(TILT,TILTD)
             */
            // apply rotation to compass rose
            /*  if (typeof rose.style.transform !== "undefined") {
             rose.style.transform = "rotateZ(" + positionCurrent.hng + "deg)";
             } else if (typeof rose.style.webkitTransform !== "undefined") {
             rose.style.webkitTransform = "rotateZ(" + positionCurrent.hng + "deg)";
             }*/
            //Game.updateDirection(positionCurrent.hng);
            //ROTATION = -positionCurrent.hng;
        } else {
            // device can't show heading
            console.log('err');
            //positionHng.textContent = "n/a";
            //showHeadingWarning();
        }

    }

}