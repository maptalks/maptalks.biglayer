precision mediump float;
uniform sampler2D u_sampler;
varying vec3 v_texCoord;
void main() {
    gl_FragColor = texture2D(u_sampler, vec2(v_texCoord[0] + gl_PointCoord[0] * v_texCoord[1], 1.0 + gl_PointCoord[1] * v_texCoord[2]));
}
