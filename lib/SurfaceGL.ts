import {Vec3} from "./Vec3";

// @ts-ignore
import {mat4, mat3, vec3, glMatrix} from "gl-matrix";
import {GLShaderBasic, GLShaderTexture} from "./GLShaderBasic";
import {GLCubeBuffer, GLCubeBufferUV, GLPlaneBufferUV} from "./GLBuffer";
import {Sprite} from "./Sprite";

export class SurfaceGL {

    element;
    _width;
    _height;
    _scaling;
    gl;
    _render_loop;


    constructor(canvas?, sprite?:Sprite) {

        let shader = new GLShaderTexture();//new GLShaderBasic();
        //let shader_texture = new GLShaderTexture();

        this.element = canvas;
        this._scaling = (window.innerWidth < 600 ? 1 : window.devicePixelRatio) || 1;

        canvas = canvas || <HTMLCanvasElement>document.getElementById('canvas-play');
        this.gl = canvas.getContext('webgl');

        if (!this.gl) {
            console.log('WebGL not supported, falling back on experimental-webgl');
            this.gl = canvas.getContext('experimental-webgl');
        }

        if (!this.gl) {
            alert('Your browser does not support WebGL');
        }

        var gl = this.gl;

        this._width = gl.width || 300;
        this._height = gl.height || 150;

        gl.clearColor(0.75, 0.85, 0.8, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.frontFace(gl.CCW);
        gl.cullFace(gl.BACK);

        //
        // Create shaders
        //
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

        gl.shaderSource(vertexShader, shader.vertexShader);
        gl.shaderSource(fragmentShader, shader.fragmentShader);

        gl.compileShader(vertexShader);
        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
            return;
        }

        gl.compileShader(fragmentShader);
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
            return;
        }

        var shading_program = gl.createProgram();
        gl.attachShader(shading_program, vertexShader);
        gl.attachShader(shading_program, fragmentShader);
        gl.linkProgram(shading_program);
        if (!gl.getProgramParameter(shading_program, gl.LINK_STATUS)) {
            console.error('ERROR linking program!', gl.getProgramInfoLog(shading_program));
            return;
        }
        gl.validateProgram(shading_program);
        if (!gl.getProgramParameter(shading_program, gl.VALIDATE_STATUS)) {
            console.error('ERROR validating program!', gl.getProgramInfoLog(shading_program));
            return;
        }


        let planeUV = new GLPlaneBufferUV();
        planeUV.scale(4);

        let boxUV = new GLCubeBufferUV();

        let verts = [];
        let ind = [];

        verts = verts.concat(planeUV.vertices).concat(boxUV.vertices);
        ind = ind.concat(planeUV.indices).concat(boxUV.indices);

        var boxVertexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
        //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxUV.vertices), gl.STATIC_DRAW);

        var boxIndexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(ind), gl.STATIC_DRAW);
       // gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(boxUV.indices), gl.STATIC_DRAW);

        var positionAttribLocation = gl.getAttribLocation(shading_program, 'vertPosition');
        /* var colorAttribLocation = gl.getAttribLocation(shading_program, 'vertColor');*/
        var texCoordAttribLocation = gl.getAttribLocation(shading_program, 'vertTexCoord');
        gl.vertexAttribPointer(
            positionAttribLocation, // Attribute location
            3, // Number of elements per attribute
            gl.FLOAT, // Type of elements
            gl.FALSE,
            5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
            0 // Offset from the beginning of a single vertex to this attribute
        );


        /*gl.vertexAttribPointer(
            colorAttribLocation, // Attribute location
            3, // Number of elements per attribute
            gl.FLOAT, // Type of elements
            gl.FALSE,
            6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
            3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
        );*/

        gl.vertexAttribPointer(
            texCoordAttribLocation, // Attribute location
            2, // Number of elements per attribute
            gl.FLOAT, // Type of elements
            gl.FALSE,
            5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
            3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
        );

        gl.enableVertexAttribArray(positionAttribLocation);
        //gl.enableVertexAttribArray(colorAttribLocation);
        gl.enableVertexAttribArray(texCoordAttribLocation);


        /// TODO BINDING MULTIPLE TEXTURES
        var basicTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, basicTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(
            gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
            gl.UNSIGNED_BYTE,
            <HTMLImageElement>sprite.images[0]
        );
        gl.bindTexture(gl.TEXTURE_2D, null);


        // Tell OpenGL state machine which program should be active.
        gl.useProgram(shading_program);

        var matWorldUniformLocation = gl.getUniformLocation(shading_program, 'mWorld');
        var matViewUniformLocation = gl.getUniformLocation(shading_program, 'mView');
        var matProjUniformLocation = gl.getUniformLocation(shading_program, 'mProj');

        var worldMatrix = new Float32Array(16);
        var viewMatrix = new Float32Array(16);
        var projMatrix = new Float32Array(16);
        mat4.identity(worldMatrix);
        mat4.lookAt(viewMatrix, [0, 0, -8], [0, 0, 0], [0, 1, 0]);
        mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);

        gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
        gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
        gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

        var xRotationMatrix = new Float32Array(16);
        var yRotationMatrix = new Float32Array(16);

        //
        // Main render loop
        //
        var identityMatrix = new Float32Array(16);
        mat4.identity(identityMatrix);
        var angle = 0;
        this._render_loop = function () {

            //if (!sprite.ready){
            //    return false;
            //}

            mat4.identity(worldMatrix);
            mat4.lookAt(viewMatrix, [0, 8, -8], [0, 1, 0], [0, 1, 0]);
            mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);

            gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
            gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
            gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

            angle = Date.now() / 1000 / 6 * 2 * Math.PI;
            mat4.rotate(yRotationMatrix, identityMatrix, angle, [0, 1, 0]);
            mat4.rotate(xRotationMatrix, identityMatrix, 0, [1, 0, 0]);
            mat4.mul(worldMatrix, yRotationMatrix, xRotationMatrix);
            gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

            gl.clearColor(1, 1, 1, 1.0);
            gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

            gl.bindTexture(gl.TEXTURE_2D, basicTexture);
            gl.activeTexture(gl.TEXTURE0);

            gl.drawElements(gl.TRIANGLES, ind.length, gl.UNSIGNED_SHORT, 0);

            //requestAnimationFrame(loop);
        };
        //requestAnimationFrame(this._render_loop);


    }

    maximize() {
        let node = this.getElement().parentNode;
        if (node) {
            let w = node.offsetWidth - (parseInt(node.style.paddingRight || "0", 10) + parseInt(node.style.paddingLeft || "0", 10) + parseInt(node.style.borderLeftWidth || "0", 10)) || 1;
            let h = node.offsetHeight || this.getHeight() || 1;
            if (this._width !== w * this._scaling || this._height !== h * this._scaling) {
                this.resize(w * this._scaling, h * this._scaling);
            }
        }
    }

    getElement() {
        return this.element;
    }

    getContext() {
        return this.gl;
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

    attach(x, y) {
        /* document.body.appendChild(this.element);
         this.element.style.position = "fixed";
         this.element.style.left = x + "px";
         this.element.style.top = y + "px";
         return this;*/
    }

    resize(width, height) {
        this.element.width = width;
        this.element.height = height;
        this._width = width;
        this._height = height;
        this.gl.width = width;
        this.gl.height = height;
        this.gl.viewportWidth = width;
        this.gl.viewportHeight = height;
        //this._camera.ascent = width/height;

        this.gl.viewport(0, 0, width, height);

        if (this._scaling !== 1) {
            this.element.style.width = "100%";
            /*this.element.style.transform = "scale(" + (1 / this._scaling) + ")";
            this.element.style.WebkitTransform = "scale(" + (1 / this._scaling) + ")";
            this.element.style.msTransform = "scale(" + (1 / this._scaling) + ")";
            this.element.style.transformOrigin = "0 0";
            this.element.style.WebkitTransformOrigin = "0 0";
            this.element.style.msTransformOrigin = "0 0";*/
        }

        return this;
    }

    render(){
        return this._render_loop();
    }

}