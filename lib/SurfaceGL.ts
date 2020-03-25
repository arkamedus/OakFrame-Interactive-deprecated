import {Vec3} from "./Vec3";

// @ts-ignore
import {mat4, mat3, vec3, glMatrix} from "gl-matrix";
import {GLCameraShadowTextureShader, GLLightShadowTextureShader, GLShaderBasic, GLShaderTexture} from "./GLShaderBasic";
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

        let surface = this;

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

        var shadowDepthTextureSize = 512;

        var gl = this.gl;
        gl.enable(gl.DEPTH_TEST)

// We set up controls so that we can drag our mouse or finger to adjust the rotation of
// the camera about the X and Y axes
        var canvasIsPressed = false
        var xRotation = Math.PI / 20
        var yRotation = 0
        var xVelocity = 0;
        var yVelocity = 0;
        var lastPressX
        var lastPressY
        canvas.onmousedown = function (e) {
            canvasIsPressed = true
            lastPressX = e.pageX
            lastPressY = e.pageY
        }
        canvas.onmouseup = function () {
            canvasIsPressed = false
        }
        canvas.onmouseout = function () {
            canvasIsPressed = false
        }
        canvas.onmousemove = function (e) {
            if (canvasIsPressed) {
                xVelocity = (e.pageY - lastPressY) / 50
                yVelocity = -(e.pageX - lastPressX) / 50;

                lastPressX = e.pageX
                lastPressY = e.pageY
            }
        }

// As you drag your finger we move the camera
        canvas.addEventListener('touchstart', function (e) {
            lastPressX = e.touches[0].clientX
            lastPressY = e.touches[0].clientY
        })
        canvas.addEventListener('touchmove', function (e) {
            e.preventDefault()
            xVelocity = (e.touches[0].clientY - lastPressY) / 100
            yVelocity = -(e.touches[0].clientX - lastPressX) / 50
            
            lastPressX = e.touches[0].clientX
            lastPressY = e.touches[0].clientY
        })

        /**
         * Section 2 - Shaders
         */

        var shadowDepthTextureSize = 1024;

        let lightShader = new GLLightShadowTextureShader();
        let cameraShader = new GLCameraShadowTextureShader();

        var lightVertexGLSL = lightShader.vertexShader;
        var lightFragmentGLSL = lightShader.fragmentShader;

// We create a vertex shader that renders the scene from the camera's point of view.
// This is what you see when you view the demo
        var cameraVertexGLSL = cameraShader.vertexShader;
        var cameraFragmentGLSL = cameraShader.fragmentShader;

// Link our light and camera shader programs
        var cameraVertexShader = gl.createShader(gl.VERTEX_SHADER)
        gl.shaderSource(cameraVertexShader, cameraVertexGLSL)
        gl.compileShader(cameraVertexShader)

        var cameraFragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
        gl.shaderSource(cameraFragmentShader, cameraFragmentGLSL)
        gl.compileShader(cameraFragmentShader)

        var cameraShaderProgram = gl.createProgram()
        gl.attachShader(cameraShaderProgram, cameraVertexShader)
        gl.attachShader(cameraShaderProgram, cameraFragmentShader)
        gl.linkProgram(cameraShaderProgram)

        var lightVertexShader = gl.createShader(gl.VERTEX_SHADER)
        gl.shaderSource(lightVertexShader, lightVertexGLSL)
        gl.compileShader(lightVertexShader)

        var lightFragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
        gl.shaderSource(lightFragmentShader, lightFragmentGLSL)
        gl.compileShader(lightFragmentShader)

        var lightShaderProgram = gl.createProgram()
        gl.attachShader(lightShaderProgram, lightVertexShader)
        gl.attachShader(lightShaderProgram, lightFragmentShader)
        gl.linkProgram(lightShaderProgram)

        /**
         * Setting up our buffered data
         */


        let drawModel = new GLPlaneBufferUV();
        drawModel.scale(8);

        let box = new GLCubeBufferUV();
        box.translate(0,1,0);

            drawModel.appendBuffer(box)

        var bufferedVertices = drawModel.vertices;
        var bufferedIndices = drawModel.indices;

        /**
         * Camera shader setup
         */

// We enable our vertex attributes for our camera's shader.
        var vertexPositionAttrib = gl.getAttribLocation(lightShaderProgram, 'aVertexPosition')

        var glPositionBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, glPositionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferedVertices), gl.STATIC_DRAW)
        gl.vertexAttribPointer(vertexPositionAttrib, 3, // Number of elements per attribute
            gl.FLOAT, // Type of elements
            gl.FALSE,
            5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
            0 // Offset from the beginning of a single vertex to this attribute
        )



        gl.enableVertexAttribArray(vertexPositionAttrib);

        var glIndexBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glIndexBuffer)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(bufferedIndices), gl.STATIC_DRAW)


        /**
         * Light shader setup
         */

        gl.useProgram(lightShaderProgram)

// This section is the meat of things. We create an off screen frame buffer that we'll render
// our scene onto from our light's viewpoint. We output that to a color texture `shadowDepthTexture`.
// Then later our camera shader will use `shadowDepthTexture` to determine whether or not fragments
// are in the shadow.
        var shadowFramebuffer = gl.createFramebuffer()
        gl.bindFramebuffer(gl.FRAMEBUFFER, shadowFramebuffer)

        var shadowDepthTexture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, shadowDepthTexture)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, shadowDepthTextureSize, shadowDepthTextureSize, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)

        var renderBuffer = gl.createRenderbuffer()
        gl.bindRenderbuffer(gl.RENDERBUFFER, renderBuffer)
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, shadowDepthTextureSize, shadowDepthTextureSize)

        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, shadowDepthTexture, 0)
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderBuffer)

        gl.bindTexture(gl.TEXTURE_2D, null)
        gl.bindRenderbuffer(gl.RENDERBUFFER, null)

// We create an orthographic projection and view matrix from which our light
// will vie the scene
        var lightProjectionMatrix = mat4.ortho([], -20, 20, -20, 20, -20.0, 80)
        var lightViewMatrix = mat4.lookAt([], [0, 4, 0], [3, 0, 5], [0, 1, 0])

        var shadowPMatrix = gl.getUniformLocation(lightShaderProgram, 'uPMatrix')
        var shadowMVMatrix = gl.getUniformLocation(lightShaderProgram, 'uMVMatrix')

        gl.uniformMatrix4fv(shadowPMatrix, false, lightProjectionMatrix)
        gl.uniformMatrix4fv(shadowMVMatrix, false, lightViewMatrix)

        gl.bindFramebuffer(gl.FRAMEBUFFER, null)

        /**
         * Scene uniforms
         */
        gl.useProgram(cameraShaderProgram)

        var samplerUniform = gl.getUniformLocation(cameraShaderProgram, 'depthColorTexture')

        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, shadowDepthTexture)
        gl.uniform1i(samplerUniform, 0)

        var uMVMatrix = gl.getUniformLocation(cameraShaderProgram, 'uMVMatrix')
        var uPMatrix = gl.getUniformLocation(cameraShaderProgram, 'uPMatrix')
        var uLightMatrix = gl.getUniformLocation(cameraShaderProgram, 'lightMViewMatrix')
        var uLightProjection = gl.getUniformLocation(cameraShaderProgram, 'lightProjectionMatrix')
        var uColor = gl.getUniformLocation(cameraShaderProgram, 'uColor')

        gl.uniformMatrix4fv(uLightMatrix, false, lightViewMatrix)
        gl.uniformMatrix4fv(uLightProjection, false, lightProjectionMatrix)
        gl.uniformMatrix4fv(uPMatrix, false, mat4.perspective([], glMatrix.toRadian(45), surface._width / surface._height, 0.01, 900.0))

// We rotate the dragon about the y axis every frame
        var dragonRotateY = 0
        function drawShadowMap () {

            gl.useProgram(lightShaderProgram)

            // Draw to our off screen drawing buffer
            gl.bindFramebuffer(gl.FRAMEBUFFER, shadowFramebuffer)

            // Set the viewport to our shadow texture's size
            gl.viewport(0, 0, shadowDepthTextureSize, shadowDepthTextureSize)
            gl.clearColor(0, 0, 0, 1)
            gl.clearDepth(1.0)
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

            gl.bindBuffer(gl.ARRAY_BUFFER, glPositionBuffer)
            gl.vertexAttribPointer(vertexPositionAttrib, 3, // Number of elements per attribute
                gl.FLOAT, // Type of elements
                gl.FALSE,
                5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
                0 // Offset from the beginning of a single vertex to this attribute
            );
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glIndexBuffer)

            // We draw our dragon onto our shadow map texture
            var lightModelMVMatrix = mat4.create()
                // mat4.rotateY(lightModelMVMatrix, lightModelMVMatrix, dragonRotateY)
            mat4.multiply(lightModelMVMatrix, lightViewMatrix, lightModelMVMatrix)
            gl.uniformMatrix4fv(shadowMVMatrix, false, lightModelMVMatrix)

            gl.drawElements(gl.TRIANGLES, bufferedIndices.length, gl.UNSIGNED_SHORT, 0);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }

        this._render_loop = function () {

            xVelocity *= 0.8;
            yVelocity *= 0.8;

            xRotation += xVelocity
            yRotation += yVelocity

            xRotation = Math.min(xRotation, Math.PI / 2.5);
            xRotation = Math.max(xRotation, 0.1);

            drawShadowMap();
            gl.useProgram(cameraShaderProgram)
            gl.viewport(0, 0, surface._width, surface._height)
            gl.clearColor(0.98, 0.98, 0.98, 1)
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

            // Create our camera view matrix
            var camera = mat4.create()
            mat4.translate(camera, camera, [12, 0, 24])
            var xRotMatrix = mat4.create()
            var yRotMatrix = mat4.create()
            mat4.rotateX(xRotMatrix, xRotMatrix, -xRotation)
            mat4.rotateY(yRotMatrix, yRotMatrix, yRotation)
            mat4.multiply(camera, xRotMatrix, camera)
            mat4.multiply(camera, yRotMatrix, camera)
            camera = mat4.lookAt(camera, [camera[12], camera[13], camera[14]], [0, 1, 0], [0, 1, 0])

            gl.uniformMatrix4fv(uPMatrix, false, mat4.perspective([], glMatrix.toRadian(45), surface._width / surface._height, 0.01, 900.0))


            var dragonModelMatrix = mat4.create()
            mat4.rotateY(dragonModelMatrix, dragonModelMatrix, dragonRotateY)

            // We use the light's model view matrix of our dragon so that our camera knows if
            // parts of the dragon are in the shadow
            var lightModelMVMatrix = mat4.create()
            mat4.multiply(lightModelMVMatrix, lightViewMatrix, dragonModelMatrix)
            gl.uniformMatrix4fv(uLightMatrix, false, lightModelMVMatrix)

            gl.uniformMatrix4fv(
                uMVMatrix,
                false,
                mat4.multiply(dragonModelMatrix, camera, dragonModelMatrix)
            )

            gl.uniform3fv(uColor, [0.36, 0.66, 0.8])

            gl.activeTexture(gl.TEXTURE0)
            gl.bindTexture(gl.TEXTURE_2D, shadowDepthTexture)
            gl.uniform1i(samplerUniform, 0)

            gl.drawElements(gl.TRIANGLES, bufferedIndices.length, gl.UNSIGNED_SHORT, 0)

        };

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

    createShadowPrograms(){

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