export default
`
precision mediump float;

varying vec4 v_texcoord;
varying float v_opacity;
// varying vec4 v_lighting;

void main() {
    gl_FragColor = v_texcoord * v_opacity;
}`;
