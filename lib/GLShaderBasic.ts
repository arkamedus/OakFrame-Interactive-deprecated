export interface GLShader {
    vertexShader:string;
    fragmentShader:string;
}

export class GLShaderBasic {
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