#ifdef GL_ES
precision highp float;
#else
#define lowp
#define mediump
#define highp
#endif

attribute vec4 a_pos;
attribute vec3 a_normal;

uniform mat4 u_matrix;
uniform mediump float u_linewidth;
uniform lowp vec4 u_color;

varying vec2 v_normal;
varying float v_linewidth;
varying vec4 v_color;

void main() {
    v_color = u_color;
    v_linewidth = u_linewidth;

    // a normal is a 2-bit number: yx, normal.x is 0 or 1, normal.y is -1 or 1
    v_normal = vec2(mod(abs(a_normal.z), 2.0), a_normal.z / 2.0);

    vec4 pos = u_matrix * a_pos;
    pos.y += a_normal.z / 2.0 * u_linewidth;
    gl_Position = pos;
}
