/**
 * @constructor
 */
import {Vec3} from "./Vec3";
import {Vec2} from "./Vec2";

export class Projection {

    private d: Vec3;
    private u: Vec3;
    private v: Vec3;
    private mm: number;

    private p: Vec3;
    private s: Vec2;

    private tfov: number;
    private tfovpower: number;
    private tfovpoweraspect: number;


    constructor() {
        this.d = new Vec3();
        this.u = new Vec3();
        this.v = new Vec3();

        this.mm = 0;

        this.p = new Vec3();
        this.s = new Vec2();

        this.tfov = 1;
        this.tfovpower = 1;
        this.tfovpoweraspect = 1;
    }

    set(camera) {
        this.d.copy(camera.to).sub(camera.from);

        this.mm = Math.sqrt(this.d.x * this.d.x + this.d.y * this.d.y + this.d.z * this.d.z);

        this.d.divI(this.mm);
        this.u.copy(camera.up);
        this.mm = this.u.dot(this.d);

        this.u.x -= (this.mm * this.d.x);
        this.u.y -= (this.mm * this.d.y);
        this.u.z -= (this.mm * this.d.z);
        this.mm = Math.sqrt(this.u.x * this.u.x + this.u.y * this.u.y + this.u.z * this.u.z);

        this.u.divI(this.mm);

        this.tfov = Math.tan(camera.fov * Math.PI / 360);
        this.tfovpower = this.tfov * this.tfov;
        this.tfovpoweraspect = (camera.aspect * this.tfov) * (camera.aspect * this.tfov);

        this.u.mulI(this.tfov);

        this.v.set(this.u.y * this.d.z - this.d.y * this.u.z, this.u.z * this.d.x - this.d.z * this.u.x, this.u.x * this.d.y - this.d.x * this.u.y).mulI(camera.aspect);

    }

    toWorld(surface, mousePosition, from, target) {

        this.s.x = 2 * mousePosition.x / surface._width - 1;
        this.s.y = 1 - 2 * mousePosition.y / surface._height;
        this.p.x = this.d.x + this.u.x * this.s.y + this.v.x * this.s.x;
        this.p.y = this.d.y + this.u.y * this.s.y + this.v.y * this.s.x;
        this.p.z = this.d.z + this.u.z * this.s.y + this.v.z * this.s.x;
        if (this.p.z != 0) {
            target.set(from.x - from.z * this.p.x / this.p.z, from.y - from.z * this.p.y / this.p.z, 0);
        } else {
            target.set(from.x - from.z * this.p.x, from.y - from.z * this.p.y, 0);
        }

    }

    toScreen(surface, position, from, target) {
        this.p.set(position.x - from.x, position.y - from.y, position.z - from.z);
        this.mm = this.p.dot(this.d);
        if (this.mm > 0) {
            this.p.divI(this.mm);
            this.mm = this.p.dot(this.v) / this.tfovpoweraspect;
            target.x = (this.mm + 1) / 2 * surface._width;
            this.mm = this.p.dot(this.u) / this.tfovpower;
            target.y = (1 - this.mm) / 2 * surface._height;
        } else {
            target.set(-99, -99);
        }

    }
}
