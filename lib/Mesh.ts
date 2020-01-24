import {Vec3} from "./Vec3";
import {Vec2} from "./Vec2";
import {RGB} from "./RGB";
import construct = Reflect.construct;

var Tri3_Temp = {
    a: 0, i: 0, t: 0, e: 0, u: 0, v: 0, f: 0, g: 0, s: 0, c: 0, h: 0, M: 0
};

function rayTriangle(origin, direction, tri) { // rayTriangle(from:Vec3, direction:Vec3 triangle:Face3)
    Tri3_Temp.a = (tri.pos2.y - tri.pos1.y) * (tri.pos3.z - tri.pos1.z) - (tri.pos3.y - tri.pos1.y) * (tri.pos2.z - tri.pos1.z);
    Tri3_Temp.i = (tri.pos2.z - tri.pos1.z) * (tri.pos3.x - tri.pos1.x) - (tri.pos3.z - tri.pos1.z) * (tri.pos2.x - tri.pos1.x);
    Tri3_Temp.t = (tri.pos2.x - tri.pos1.x) * (tri.pos3.y - tri.pos1.y) - (tri.pos3.x - tri.pos1.x) * (tri.pos2.y - tri.pos1.y);
    Tri3_Temp.e = Math.sign(Tri3_Temp.a * (tri.pos1.x - origin.x) + Tri3_Temp.i * (tri.pos1.y - origin.y) + Tri3_Temp.t * (tri.pos1.z - origin.z));
    Tri3_Temp.u = direction.x * Tri3_Temp.a + direction.y * Tri3_Temp.i + direction.z * Tri3_Temp.t;
    if (Tri3_Temp.e != Math.sign(Tri3_Temp.u) || 0 == Tri3_Temp.e) return !1;
    Tri3_Temp.v = (Tri3_Temp.a * tri.pos1.x + Tri3_Temp.i * tri.pos1.y + Tri3_Temp.t * tri.pos1.z - (Tri3_Temp.a * origin.x + Tri3_Temp.i * origin.y + Tri3_Temp.t * origin.z)) / Tri3_Temp.u;
    Tri3_Temp.f = direction.x * Tri3_Temp.v + origin.x;
    Tri3_Temp.g = direction.y * Tri3_Temp.v + origin.y;
    Tri3_Temp.s = direction.z * Tri3_Temp.v + origin.z;
    Tri3_Temp.c = (tri.pos1.y - Tri3_Temp.g) * (tri.pos2.z - Tri3_Temp.s) - (tri.pos2.y - Tri3_Temp.g) * (tri.pos1.z - Tri3_Temp.s);
    Tri3_Temp.h = (tri.pos1.z - Tri3_Temp.s) * (tri.pos2.x - Tri3_Temp.f) - (tri.pos2.z - Tri3_Temp.s) * (tri.pos1.x - Tri3_Temp.f);
    Tri3_Temp.M = (tri.pos1.x - Tri3_Temp.f) * (tri.pos2.y - Tri3_Temp.g) - (tri.pos2.x - Tri3_Temp.f) * (tri.pos1.y - Tri3_Temp.g);
    if (0 > Tri3_Temp.c * Tri3_Temp.a + Tri3_Temp.h * Tri3_Temp.i + Tri3_Temp.M * Tri3_Temp.t) return !1;
    Tri3_Temp.c = (tri.pos2.y - Tri3_Temp.g) * (tri.pos3.z - Tri3_Temp.s) - (tri.pos3.y - Tri3_Temp.g) * (tri.pos2.z - Tri3_Temp.s);
    Tri3_Temp.h = (tri.pos2.z - Tri3_Temp.s) * (tri.pos3.x - Tri3_Temp.f) - (tri.pos3.z - Tri3_Temp.s) * (tri.pos2.x - Tri3_Temp.f);
    Tri3_Temp.M = (tri.pos2.x - Tri3_Temp.f) * (tri.pos3.y - Tri3_Temp.g) - (tri.pos3.x - Tri3_Temp.f) * (tri.pos2.y - Tri3_Temp.g);
    if (0 > Tri3_Temp.c * Tri3_Temp.a + Tri3_Temp.h * Tri3_Temp.i + Tri3_Temp.M * Tri3_Temp.t) return !1;
    Tri3_Temp.c = (tri.pos3.y - Tri3_Temp.g) * (tri.pos1.z - Tri3_Temp.s) - (tri.pos1.y - Tri3_Temp.g) * (tri.pos3.z - Tri3_Temp.s);
    Tri3_Temp.h = (tri.pos3.z - Tri3_Temp.s) * (tri.pos1.x - Tri3_Temp.f) - (tri.pos1.z - Tri3_Temp.s) * (tri.pos3.x - Tri3_Temp.f);
    Tri3_Temp.M = (tri.pos3.x - Tri3_Temp.f) * (tri.pos1.y - Tri3_Temp.g) - (tri.pos1.x - Tri3_Temp.f) * (tri.pos3.y - Tri3_Temp.g);
    return 0 > Tri3_Temp.c * Tri3_Temp.a + Tri3_Temp.h * Tri3_Temp.i + Tri3_Temp.M * Tri3_Temp.t ? !1 : new Vec3().set(Tri3_Temp.f, Tri3_Temp.g, Tri3_Temp.s); //[f, g, s, vecDist(y, [f, g, s])];
}

/**
 * @constructor
 */
export class Face3 {

    public pos1;
    public uv1;
    public pos2;
    public uv2;
    public pos3;
    public uv3;
    public color1;
    public color2;
    public color3;
    public center;
    public normal;
    public _cullvec;
    public _dotvec;
    public _depth;

    constructor() {

        this.pos1 = new Vec3();
        this.uv1 = new Vec2();

        this.pos2 = new Vec3();
        this.uv2 = new Vec2();

        this.pos3 = new Vec3();
        this.uv3 = new Vec2();

        this.color1 = new RGB();
        this.color2 = new RGB();
        this.color3 = new RGB();

        this.center = new Vec3();
        this.normal = new Vec3();
        this._cullvec = new Vec3();
        this._dotvec = new Vec3();
        this._depth = 9999;
    }


    set(x1, y1, z1, u1, v1, x2, y2, z2, u2, v2, x3, y3, z3, u3, v3, r1, g1, b1, r2, g2, b2, r3, g3, b3) {
        this.pos1.set(x1, y1, z1);
        this.uv1.set(u1, v1);

        this.pos2.set(x2, y2, z2);
        this.uv2.set(u2, v2);

        this.pos3.set(x3, y3, z3);
        this.uv3.set(u3, v3);

        this.center.copy(this.pos1).add(this.pos2).add(this.pos3).divI(3);
        this.getnormal();

        this.color1.set(r1, g1, b1);
        this.color2.set(r2, g2, b2);
        this.color3.set(r3, g3, b3);
        return this;
    };


    /**
     * @type {function():Vec3}
     */
    getcenter() {
        return new Vec3().set((this.pos1.x + this.pos2.x + this.pos3.x) / 3, (this.pos1.y + this.pos2.y + this.pos3.y) / 3, (this.pos1.z + this.pos2.z + this.pos3.z) / 3);
    };

    /**
     * @type {function():Vec3}
     */
    recalc() {
        this.center.set((this.pos1.x + this.pos2.x + this.pos3.x) / 3, (this.pos1.y + this.pos2.y + this.pos3.y) / 3, (this.pos1.z + this.pos2.z + this.pos3.z) / 3);
        return this;
    };

    /**
     * @type {function():Vec3}
     */
    getnormal() {

        var ax, ay, az, bx, by, bz, rx, ry, rz, m;

        //point0 -> point1
        ax = this.pos2.x - this.pos1.x;
        ay = this.pos2.y - this.pos1.y;
        az = this.pos2.z - this.pos1.z;

        //point0 -> point2
        bx = this.pos3.x - this.pos1.x;
        by = this.pos3.y - this.pos1.y;
        bz = this.pos3.z - this.pos1.z;

        //cross product
        rx = ay * bz - by * az;
        ry = az * bx - bz * ax,
            rz = ax * by - bx * ay;

        //magnitude
        m = Math.sqrt(rx * rx + ry * ry + rz * rz);

        //normalize
        return this.normal.set(rx / m, ry / m, rz / m);
    };

    /**
     * @type {function():Face3}
     */
    clone() {
        return new Face3().set(this.pos1.x, this.pos1.y, this.pos1.z, this.uv1.x, this.uv1.y,
            this.pos2.x, this.pos2.y, this.pos2.z, this.uv2.x, this.uv2.y,
            this.pos3.x, this.pos3.y, this.pos3.z, this.uv3.x, this.uv3.y,
            this.color1.r, this.color1.g, this.color1.b, this.color2.r, this.color2.g, this.color2.b, this.color3.r, this.color3.g, this.color3.b);
    };

//console.warn("function Face3().copy() is broken!");
    /**
     * @type {function(Face3):Face3}
     */
    copy(face3) {
        this.pos1.copy(face3.pos1);
        this.pos2.copy(face3.pos2);
        this.pos3.copy(face3.pos3);
        this.color1.copy(face3.color1);
        this.color2.copy(face3.color2);
        this.color3.copy(face3.color3);
        return this;
    };

    /**
     * @type {function():Face3}
     */
    flipX() {
        //this.pos1.flipX(vec3);
        //this.pos2.flipX(vec3);
        // this.pos3.flipX(vec3);
        return this;
    };

    /**
     * @type {function(Vec3):Face3}
     */
    translate(vec3) {
        this.pos1.add(vec3);
        this.pos2.add(vec3);
        this.pos3.add(vec3);
        return this;
    };

    /**
     * @type {function(number,number,number):Face3}
     */
    rotate(rx, ry, rz) {
        this.pos1.rotX(rx);
        this.pos2.rotX(rx);
        this.pos3.rotX(rx);
        this.pos1.rotY(ry);
        this.pos2.rotY(ry);
        this.pos3.rotY(ry);
        this.pos1.rotZ(rz);
        this.pos2.rotZ(rz);
        this.pos3.rotZ(rz);
        return this;
    };

    /**
     * @type {function(number):Face3}
     */
    rotX(rot) {
        this.pos1.rotX(rot);
        this.pos2.rotX(rot);
        this.pos3.rotX(rot);
        return this;
    };

    /**
     * @type {function(number):Face3}
     */
    rotY(rot) {
        this.pos1.rotY(rot);
        this.pos2.rotY(rot);
        this.pos3.rotY(rot);
        return this;
    };

    /**
     * @type {function(number):Face3}
     */
    rotZ(rot) {
        this.pos1.rotZ(rot);
        this.pos2.rotZ(rot);
        this.pos3.rotZ(rot);
        return this;
    };

    /**
     * @type {function(number):Face3}
     */
    scale(vec) {
        this.pos1.mul(vec);
        this.pos2.mul(vec);
        this.pos3.mul(vec);
        return this;
    };

    size() {

        var r:any = {},
            n:any = {},
            t:any = {};
        return r.x = this.pos2.x - this.pos1.x, r.y = this.pos2.y - this.pos1.y, r.z = this.pos2.z - this.pos1.z, n.x = this.pos3.x - this.pos1.x, n.y = this.pos3.y - this.pos1.y, n.z = this.pos3.z - this.pos1.z, t.x = r.y * n.z - r.z * n.y, t.y = r.z * n.x - r.x * n.z, t.z = r.x * n.y - r.y * n.x, .5 * Math.sqrt(t.x * t.x + t.y * t.y + t.z * t.z);

    };
}


/**
 * @constructor
 */
export class Mesh {

    public _children;
    private _bounds;
    private _tmpv;
    private _tmpr;
    private sortmeta;

    constructor() {
        this._children = [];
        this._bounds = [0, 0, 0, 0, 0, 0];
        this._tmpv = new Vec3();
        this._tmpr = new Vec3();
        this.sortmeta = {
            co: 0,
            sw: 0,
            index: 0,
            loop: 0,
            val: {},
            times: 0
        }

    }

    clear() {
        this._children = [];
        this._bounds = [0, 0, 0, 0, 0, 0];
        return this;
    }

    clone(){
        let m = new Mesh();
        this._children.forEach(function (face) {
            m._children.push(face.clone().recalc());
        });
        return m;
    }

    join(mesh, parent) {
        //this._children = this._children.concat(mesh._children);
        var target = this;

        mesh._children.forEach(function (face) {
            target._children.push(face.clone().scale(parent.scale).rotY(parent.rotation.y).rotX(parent.rotation.x).rotZ(parent.rotation.z).translate(parent.position).recalc());
        });
        // this._bounds = [Math.min(mesh._bounds[0],this._bounds[0]),0,0,0,0,0];
        //console.warn('Mesh.prototype.join() is incomplete!');
        return this;
    };

//console.warn("function Mesh().draw() should have tri._cullvec moved into mesh, not children");

    draw(canvas, camera, parent) {
        this._children.forEach(function (tri) {

            camera.drawFace3(canvas, tri.pos1, tri.pos2, tri.pos3, tri.color1.toHex());

        });
        return this;
    };

    scale(scale) {
        this._children.forEach(function (tri) {

            tri.scale(scale);

        });
        return this;
    };

    rotate(rx, ry, rz) {
        this._children.forEach(function (tri) {

            tri.rotate(rx, ry, rz);

        });
        return this;
    };


    drawUV(surface, camera, parent, texture, scale) {
        this._children.forEach(function (tri) {

            //  tri.center=tri.getcenter().rotY(parent.rotation.y).add(parent.position)
            //if (tri._cullvec.copy(tri._dotvec.copy(tri.normal).mul(parent.scale).normalize().rotY(parent.rotation.y).rotX(parent.rotation.x).rotZ(parent.rotation.z)).dot(tri._dotvec.copy(tri.center).mul(parent.scale).rotZ(parent.rotation.z).add(parent.position).pointTo(camera.from).invert()) > 0) {
            camera.drawFace(surface, tri, parent, texture, scale);
            // }
            //camera.drawFace3(canvas, tri.pos1, tri.pos2, tri.pos3, tri.color1.toHex());

        });
        return this;
    };

    /*
    Mesh.prototype.draw = function (camera, surface, parent) {
        //var vecFrom = new Vec3();


        if (surface._draw_outline&&!parent._static) {
            surface._context.beginPath();
            surface._context.fillStyle = "rgba(0,0,0,255)";
            this._children.forEach(function (tri) {
                //vecFrom.set(camera.from).pointTo();
                //tri._cullvec.clear().add(tri.normal).dot(tri.center.clone().add().pointTo(camera.from))
                // if (dotproduct(tri.normal(), vecFromVecs(camera.from, this._children[index].getCenter())) > 0) {
                if (tri._cullvec.copy(tri._dotvec.copy(tri.normal).mul(parent.scale).normalize().rotY(parent.rotation.y).rotX(parent.rotation.x).rotZ(parent.rotation.z)).dot(tri._dotvec.copy(tri.center).mul(parent.scale).rotY(parent.rotation.y).rotX(parent.rotation.x).rotZ(parent.rotation.z).add(parent.position).pointTo(camera.from)) > 0) {
                    surface.drawFaceOutline(camera, tri, parent);
                } else {
                    surface._tmp.culltris++;
                }

            });
            surface._context.fill();
        }


        this._children.forEach(function (tri) {
            //vecFrom.set(camera.from).pointTo();
            //tri._cullvec.clear().add(tri.normal).dot(tri.center.clone().add().pointTo(camera.from))
            // if (dotproduct(tri.normal(), vecFromVecs(camera.from, this._children[index].getCenter())) > 0) {
            if (tri._cullvec.copy(tri._dotvec.copy(tri.normal).mul(parent.scale).normalize().rotY(parent.rotation.y).rotX(parent.rotation.x).rotZ(parent.rotation.z)).dot(tri._dotvec.copy(tri.center).mul(parent.scale).rotZ(parent.rotation.z).add(parent.position).pointTo(camera.from).invert()) > 0) {
                surface.drawFace(camera, tri, parent);
            } else {
                surface._tmp.culltris++;
            }

        });

        return this;
    };*/

    sort(from, parent) {
        this.sortmeta.co = 0;
        this.sortmeta.sw = 0; // ti = performance.now();

        for (this.sortmeta.index = 0; this.sortmeta.index < this._children.length; this.sortmeta.index++) {
            this._children[this.sortmeta.index]._depth = this._tmpv.copy(from).sub(parent.position).dist(this._tmpr.copy(this._children[this.sortmeta.index].center).mul(parent.scale).rotY(parent.rotation.y).rotX(parent.rotation.x).rotZ(parent.rotation.z));
            //dc++;
        }
        this.sortmeta.loop = true;
        this.sortmeta.times = 0;


        // quickSort(this._children);


        // BAD BUBBLE SORT
        //ti = performance.now();
        do {
            this.sortmeta.loop = false;

            for (var i = 0; i < this._children.length - (1 + this.sortmeta.times); i++) {
                //co += 1;

                if (this._children[i]._depth < this._children[i + 1]._depth) {
                    //sw += 1;
                    this.sortmeta.val = this._children[i];
                    this._children[i] = this._children[i + 1];
                    this._children[i + 1] = this.sortmeta.val;
                    this.sortmeta.loop = true;
                }

            }
            this.sortmeta.times++;
        } while (this.sortmeta.loop);


        return this;
    };


    sortQ(from, parent) {
        this.sortmeta.co = 0;
        this.sortmeta.sw = 0; // ti = performance.now();

        for (this.sortmeta.index = 0; this.sortmeta.index < this._children.length; this.sortmeta.index++) {
            this._children[this.sortmeta.index]._depth = this._tmpv.copy(from).dist(this._tmpr.copy(this._children[this.sortmeta.index].center)) + (this._children[this.sortmeta.index].size() / 2);

            // this._children[this.sortmeta.index]._depth = this._tmpv.copy(from).dist(this._tmpr.copy(this._children[this.sortmeta.index].center).mul(parent.scale).rotY(parent.rotation.y).rotX(parent.rotation.x).rotZ(parent.rotation.z));
            //dc++;
        }
        this.sortmeta.loop = true;
        this.sortmeta.times = 0;


        // quickSort(this._children);


        // BAD BUBBLE SORT
        //ti = performance.now();
        do {
            this.sortmeta.loop = false;

            for (var i = 0; i < this._children.length - (1 + this.sortmeta.times); i++) {
                //co += 1;

                if (this._children[i]._depth < this._children[i + 1]._depth) {
                    //sw += 1;
                    this.sortmeta.val = this._children[i];
                    this._children[i] = this._children[i + 1];
                    this._children[i + 1] = this.sortmeta.val;
                    this.sortmeta.loop = true;
                }

            }
            this.sortmeta.times++;
        } while (this.sortmeta.loop);


        return this;
    };

    /*
        parsePLY(file) {
            var model = this;
            var ply = loadFile(file, function (a) {
                var properties = {
                        vertices: 0,
                        indeces: 0
                    },
                    elements = {
                        vertices: [],
                        indeces: []
                    },
                    arr = [],
                    define_pos = 0, //0-headers,vertices,indeces
                    read_pos = 0;


                arr = a.split('\n');

                // console.log(arr);


                for (var i = 0; i < arr.length; i++) {
                    var line_arr = arr[i].split(' ');
                    if (define_pos === 0) { // READING HEADER

                        if (line_arr[0] === 'element') {
                            if (line_arr[1] === 'vertex') {
                                properties.vertices = parseInt(line_arr[2], 10);
                            } else if (line_arr[1] === 'face') {
                                properties.indeces = parseInt(line_arr[2], 10);
                            }
                        } else if (line_arr[0] === 'end_header') {
                            define_pos = 1;
                        }
                    } else if (define_pos === 1) { // READING VERTICES
                        if (line_arr[0]) {

                            elements.vertices.push(parseFloat(line_arr[0])); //x
                            elements.vertices.push(parseFloat(line_arr[1])); //y
                            elements.vertices.push(parseFloat(line_arr[2])); //z
                            elements.vertices.push(parseFloat(line_arr[3])); //u
                            elements.vertices.push(parseFloat(line_arr[4])); //v
                            elements.vertices.push(parseInt(line_arr[5], 10)); //r
                            elements.vertices.push(parseInt(line_arr[6], 10)); //g
                            elements.vertices.push(parseInt(line_arr[7], 10)); //b

                            model._bounds[0] = Math.min(model._bounds[0], parseFloat(line_arr[0]));
                            model._bounds[1] = Math.min(model._bounds[1], parseFloat(line_arr[1]));
                            model._bounds[2] = Math.min(model._bounds[2], parseFloat(line_arr[2]));

                            model._bounds[3] = Math.max(model._bounds[3], parseFloat(line_arr[0]));
                            model._bounds[4] = Math.max(model._bounds[4], parseFloat(line_arr[1]));
                            model._bounds[5] = Math.max(model._bounds[5], parseFloat(line_arr[2]));


                        }
                        properties.vertices--;
                        if (properties.vertices === 0) {
                            define_pos = 2;
                        }
                    } else if (define_pos === 2) {
                        if (line_arr[0]) {
                            elements.indeces.push(parseInt(line_arr[0], 10)); //facedefinition
                            elements.indeces.push(parseInt(line_arr[1], 10)); //v1
                            elements.indeces.push(parseInt(line_arr[2], 10)); //v2
                            elements.indeces.push(parseInt(line_arr[3], 10)); //v3
                        }
                        properties.indeces--;
                        if (properties.indeces === 0) {
                            define_pos = 3;
                        }
                    }
                }

                model.name = file;


                for (var y = 0; y < elements.indeces.length; y += 4) {
                    var c = 1;

                    model._children.push(new Face3().set(
                        elements.vertices[(elements.indeces[y + 1] * 8) + 0], //x1
                        elements.vertices[(elements.indeces[y + 1] * 8) + 1], //y1
                        elements.vertices[(elements.indeces[y + 1] * 8) + 2], //z1
                        elements.vertices[(elements.indeces[y + 1] * 8) + 3], //u1
                        1 - elements.vertices[(elements.indeces[y + 1] * 8) + 4], //v1

                        elements.vertices[(elements.indeces[y + 2] * 8) + 0], //x2
                        elements.vertices[(elements.indeces[y + 2] * 8) + 1], //y2
                        elements.vertices[(elements.indeces[y + 2] * 8) + 2], //z2
                        elements.vertices[(elements.indeces[y + 2] * 8) + 3], //u2
                        1 - elements.vertices[(elements.indeces[y + 2] * 8) + 4], //v2

                        elements.vertices[(elements.indeces[y + 3] * 8) + 0], //x3
                        elements.vertices[(elements.indeces[y + 3] * 8) + 1], //y3
                        elements.vertices[(elements.indeces[y + 3] * 8) + 2], //z3
                        elements.vertices[(elements.indeces[y + 3] * 8) + 3], //u3
                        1 - elements.vertices[(elements.indeces[y + 3] * 8) + 4], //v3

                        Math.floor(elements.vertices[(elements.indeces[y + 1] * 8) + 5]), //r1
                        Math.floor(elements.vertices[(elements.indeces[y + 1] * 8) + 6]), //g1
                        Math.floor(elements.vertices[(elements.indeces[y + 1] * 8) + 7]), //b1

                        Math.floor(elements.vertices[(elements.indeces[y + 2] * 8) + 5]), //r2
                        Math.floor(elements.vertices[(elements.indeces[y + 2] * 8) + 6]), //g2
                        Math.floor(elements.vertices[(elements.indeces[y + 2] * 8) + 7]), //b2

                        Math.floor(elements.vertices[(elements.indeces[y + 3] * 8) + 5]), //r3
                        Math.floor(elements.vertices[(elements.indeces[y + 3] * 8) + 6]), //g3
                        Math.floor(elements.vertices[(elements.indeces[y + 3] * 8) + 7]) //b3

                    ));

                }









                //console.log(model);
                //model._mesh_id = ModelManager._children.length;
                //ModelManager._children.push(model);

            });


            return this;
        };*/

}
