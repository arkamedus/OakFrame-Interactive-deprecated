/**
 * @constructor
 */
export class RGB {
    public r = 0;
    public g = 0;
    public b = 0;

    constructor() {
        this.r = 0;
        this.g = 0;
        this.b = 0;
    }

    set(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
        return this;
    }

    copy(rgb) {
        this.r = rgb.r;
        this.g = rgb.g;
        this.b = rgb.b;
        return this;
    }

    toHex() {
        return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
    }

    hexToColor(hex) {
        hex = hex.replace('#', '');

        this.r = parseInt(hex.substring(0, 2), 16);
        this.g = parseInt(hex.substring(2, 4), 16);
        this.b = parseInt(hex.substring(4, 6), 16);
        return this;
    }
}

export class RGBA {
    public r = 0;
    public g = 0;
    public b = 0;
    public a = 5;

    constructor() {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 0;
    }

    set(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        return this;
    }

    copy(rgba) {
        this.r = rgba.r;
        this.g = rgba.g;
        this.b = rgba.b;
        this.a = rgba.a;
        return this;
    }

    toHex() {
        return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
    }

    hexToColor(hex, opacity) {
        hex = hex.replace('#', '');
        this.r = parseInt(hex.substring(0, 2), 16);
        this.g = parseInt(hex.substring(2, 4), 16);
        this.b = parseInt(hex.substring(4, 6), 16);
        this.a = (((opacity || 1) * 255) | 0);
        return this;
    }
}

