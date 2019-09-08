export class Surface {
    private element;
    private context;
    private _width;
    private _height;
    private _scaling;
    private _set_size;

    constructor() {
        let self=this;
        //this.nodes = 0;
        this.element = <HTMLCanvasElement>document.createElement('canvas');
        if (!this.element.getContext || !this.element.getContext("2d")) {
            console.error('canvas is not supported.');
        }
        this._set_size = false;
        this.context = this.element.getContext('2d');
        this._width = this.context.width;
        this._height = this.context.height;
        this._scaling = 1;//(window.innerWidth < 600 ? 1 : window.devicePixelRatio) || 1;
        this.context.font = (20 * this._scaling) + "px DM Sans";
        return this;

    }

    drawText(x, y, text) {
        this.context.font = (20 * this._scaling) + "px DM Sans";
        this.context.fillStyle = '#000';
        this.context.fillText(text, x, y);
    }

    resize(_width, _height) {
        let width = _width * this._scaling;
        let height = _height * this._scaling;

        height = Math.min(height, window.innerHeight * this._scaling);
        width = Math.min(width, window.innerWidth * this._scaling);
        this.element.width = _width;
        this._width = width;
        this.element.height = _height;
        this._height = height;
        this.context.width = width * this._scaling;
        this.context.height = height * this._scaling;

        // this.element.style.transform = "scale(" + (1 / this._scaling) + ")";
        //this.element.style.WebkitTransform = "scale(" + (1 / this._scaling) + ")";
        //this.element.style.msTransform = "scale(" + (1 / this._scaling) + ")";
        //this.element.style.transformOrigin = "0 0";
        //this.element.style.WebkitTransformOrigin = "0 0";
        //this.element.style.msTransformOrigin = "0 0";

        return this;
    };

    maximize() {
        let node = this.getElement().parentNode;//.parentNode.parentNode;
        if (node) {
            let w = node.offsetWidth;
            let h = node.offsetHeight;
            if (this._width !== w * this._scaling || this._height !== h * this._scaling) {
                this.resize(w, h);
            }
        }
    }

    setSize(w, h) {
        this._set_size = true;
        this.resize(w, h);
    }

    attach(x: number, y: number) {
        document.body.appendChild(this.element);
        this.element.style.position = "fixed";
        this.element.style.left = x + "px";
        this.element.style.top = y + "px";
        return this;
    };

    detach() {
        this.element.parentElement.removeChild(this.element);
    }

    fill(col) {
        if (!this._set_size){
            this.maximize();
        }

        this.context.beginPath();
        this.context.fillStyle = col;
        this.context.rect(0, 0, this._width, this._height);
        this.context.fill();
        return this;
    };

    clear() {
        this.context.clearRect(0, 0, this._width, this._height);
        return this;
    }

    getElement() {
        return this.element;
    }

    getContext() {
        return this.context;
    }

    getScaling() {
        return this._scaling;
    }

    getWidth() {
        return this._width;
    }

    getHeight() {
        return this._height;
    }

}