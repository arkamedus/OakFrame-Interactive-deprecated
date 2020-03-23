export class GLBuffer {
    vertices: Array<number>;
    indices: Array<number>;

    scale(scale){
        this.vertices = this.vertices.map((v, idx) => {
            if (idx % 5 >= 3){
                return v;
            }
            return v * scale
        });
    }

    translate(x,y,z){
        this.vertices = this.vertices.map((v, idx) => {
            if (idx % 5 === 0){
                return v+x;
            }else if (idx % 5 === 1){
                return v+y;
            }else if (idx % 5 === 2){
                return v+z;
            }
            return v;
        });
    }

    appendBuffer(buffer:GLBuffer){
        let self = this;
        let indlen = (this.vertices.length/5);
        this.vertices=this.vertices.concat(buffer.vertices);

        buffer.indices.forEach(function(ind){
            self.indices.push(ind+indlen);
        });

        console.log(this.vertices, this.indices);
    }
}

export class GLCubeBuffer extends GLBuffer {
    vertices = [ // X, Y, Z           R, G, B
        // Top
        -1.0, 1.0, -1.0, 0.5, 0.5, 0.5,
        -1.0, 1.0, 1.0, 0.5, 0.5, 0.5,
        1.0, 1.0, 1.0, 0.5, 0.5, 0.5,
        1.0, 1.0, -1.0, 0.5, 0.5, 0.5,

        // Left
        -1.0, 1.0, 1.0, 0.75, 0.25, 0.5,
        -1.0, -1.0, 1.0, 0.75, 0.25, 0.5,
        -1.0, -1.0, -1.0, 0.75, 0.25, 0.5,
        -1.0, 1.0, -1.0, 0.75, 0.25, 0.5,

        // Right
        1.0, 1.0, 1.0, 0.25, 0.25, 0.75,
        1.0, -1.0, 1.0, 0.25, 0.25, 0.75,
        1.0, -1.0, -1.0, 0.25, 0.25, 0.75,
        1.0, 1.0, -1.0, 0.25, 0.25, 0.75,

        // Front
        1.0, 1.0, 1.0, 1.0, 0.0, 0.15,
        1.0, -1.0, 1.0, 1.0, 0.0, 0.15,
        -1.0, -1.0, 1.0, 1.0, 0.0, 0.15,
        -1.0, 1.0, 1.0, 1.0, 0.0, 0.15,

        // Back
        1.0, 1.0, -1.0, 0.0, 1.0, 0.15,
        1.0, -1.0, -1.0, 0.0, 1.0, 0.15,
        -1.0, -1.0, -1.0, 0.0, 1.0, 0.15,
        -1.0, 1.0, -1.0, 0.0, 1.0, 0.15,

        // Bottom
        -1.0, -1.0, -1.0, 0.5, 0.5, 1.0,
        -1.0, -1.0, 1.0, 0.5, 0.5, 1.0,
        1.0, -1.0, 1.0, 0.5, 0.5, 1.0,
        1.0, -1.0, -1.0, 0.5, 0.5, 1.0
    ];
    indices = [
        // Top
        0, 1, 2,
        0, 2, 3,

        // Left
        5, 4, 6,
        6, 4, 7,

        // Right
        8, 9, 10,
        8, 10, 11,

        // Front
        13, 12, 14,
        15, 14, 12,

        // Back
        16, 17, 18,
        16, 18, 19,

        // Bottom
        21, 20, 22,
        22, 20, 23
    ];
}


export class GLCubeBufferUV extends GLBuffer {
    vertices = [ // X, Y, Z           U, V
        // Top
        -1.0, 1.0, -1.0,   0, 0,
        -1.0, 1.0, 1.0,    0, 1,
        1.0, 1.0, 1.0,     1, 1,
        1.0, 1.0, -1.0,    1, 0,

        // Left
        -1.0, 1.0, 1.0,    0, 0,
        -1.0, -1.0, 1.0,   1, 0,
        -1.0, -1.0, -1.0,  1, 1,
        -1.0, 1.0, -1.0,   0, 1,

        // Right
        1.0, 1.0, 1.0,    1, 1,
        1.0, -1.0, 1.0,   0, 1,
        1.0, -1.0, -1.0,  0, 0,
        1.0, 1.0, -1.0,   1, 0,

        // Front
        1.0, 1.0, 1.0,    1, 1,
        1.0, -1.0, 1.0,    1, 0,
        -1.0, -1.0, 1.0,    0, 0,
        -1.0, 1.0, 1.0,    0, 1,

        // Back
        1.0, 1.0, -1.0,    0, 0,
        1.0, -1.0, -1.0,    0, 1,
        -1.0, -1.0, -1.0,    1, 1,
        -1.0, 1.0, -1.0,    1, 0,

        // Bottom
        -1.0, -1.0, -1.0,   1, 1,
        -1.0, -1.0, 1.0,    1, 0,
        1.0, -1.0, 1.0,     0, 0,
        1.0, -1.0, -1.0,    0, 1,
    ];
    indices = [
        // Top
        0, 1, 2,
        0, 2, 3,

        // Left
        5, 4, 6,
        6, 4, 7,

        // Right
        8, 9, 10,
        8, 10, 11,

        // Front
        13, 12, 14,
        15, 14, 12,

        // Back
        16, 17, 18,
        16, 18, 19,

        // Bottom
        21, 20, 22,
        22, 20, 23
    ];
}

export class GLPlaneBufferUV extends GLBuffer {
    vertices = [-1.0, 0, -1.0, 1, 1,
        -1.0, 0, 1.0, 1, 0,
        1.0, 0, 1.0, 0, 0,
        1.0, 0, -1.0, 0, 1];
    indices = [0, 1, 2,
        0, 2, 3];
}