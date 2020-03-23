import shaderTextureVertex from "./shader/textureVertex.glsl";
import shaderTextureFragment from "./shader/textureFragment.glsl";

import cameraShadowVertex from "./shader/cameraShadowVertex.glsl";
import cameraShadowFragment from "./shader/cameraShadowFragment.glsl";

import lightBufferVertex from "./shader/lightBufferVertex.glsl";
import lightBufferFragment from "./shader/lightBufferFragment.glsl";

export interface GLShader {
    vertexShader:string;
    fragmentShader:string;
}

export class GLShaderBasic implements GLShader{
    vertexShader=`precision mediump float;
    attribute vec3 vertPosition;
    attribute vec3 vertColor;
    varying vec3 fragColor;
    uniform mat4 mWorld;
    uniform mat4 mView;
    uniform mat4 mProj;

    void main()
    {
      fragColor = vertColor;
      gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);
    }`;

    fragmentShader = `precision mediump float;

varying vec3 fragColor;
void main()
{
  gl_FragColor = vec4(fragColor, 1.0);
}`;
}

export class GLShaderTexture implements GLShader {
    vertexShader = shaderTextureVertex;
    fragmentShader = shaderTextureFragment;
}

export class GLCameraShadowTextureShader implements GLShader {
    vertexShader = cameraShadowVertex;
    fragmentShader = cameraShadowFragment;
}

export class GLLightShadowTextureShader implements GLShader {
    vertexShader = lightBufferVertex;
    fragmentShader = lightBufferFragment;
}