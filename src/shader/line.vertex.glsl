#ifdef GL_ES
precision highp float;
#else
#define lowp
#define mediump
#define highp
#endif

attribute vec4 a_pos;
attribute vec3 a_normal;
attribute vec4 a_texcoord;
attribute float a_opacity;
attribute float a_linewidth;

uniform mat4 u_matrix;
uniform float u_scale;

varying vec3 v_normal;
varying float v_linewidth;
varying float v_opacity;
varying vec4 v_texcoord;
varying float v_scale;
varying float v_texture_normal;

void main() {
    v_opacity = a_opacity;
    v_linewidth = a_linewidth;
    v_texcoord = a_texcoord;
    v_scale = u_scale;

    // a normal is a 2-bit number: yx, normal.x is 0 or 1, normal.y is -1 or 1
    // v_normal = vec2(mod(abs(a_normal.z), 2.0), a_normal.z / 2.0);
    v_normal = a_normal;

    vec4 pos = a_pos;
    pos.x += a_normal.x * v_linewidth * u_scale;
    pos.y += a_normal.y * v_linewidth * u_scale;

    gl_Position = u_matrix * pos;
    if (a_normal.y == 0.0) {
        v_texture_normal = -sign(a_normal.x);
    } else {
        v_texture_normal = sign(a_normal.y);
    }

}
