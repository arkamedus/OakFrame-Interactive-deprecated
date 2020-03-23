precision mediump float;

varying vec2 vDepthUv;
varying vec4 shadowPos;

uniform sampler2D depthColorTexture;
uniform vec3 uColor;

float decodeFloat (vec4 color) {
    const vec4 bitShift = vec4(
    1.0 / (256.0 * 256.0 * 256.0),
    1.0 / (256.0 * 256.0),
    1.0 / 256.0,
    1
    );
    return dot(color, bitShift);
}

void main(void) {
    vec3 fragmentDepth = shadowPos.xyz;
    float shadowAcneRemover = 0.004;
    fragmentDepth.z -= shadowAcneRemover;

    float texelSize = 1.0 / 1024.0;
    float amountInLight = 0.0;

    for (int x = -1; x <= 1; x++) {
        for (int y = -1; y <= 1; y++) {
            float texelDepth = decodeFloat(texture2D(depthColorTexture,
            fragmentDepth.xy + vec2(x, y) * texelSize));
            if (fragmentDepth.z < texelDepth) {
                amountInLight += 1.0;
            }
        }
    }
    amountInLight /= 9.0;

    gl_FragColor = vec4(amountInLight * uColor, 1.0);
}