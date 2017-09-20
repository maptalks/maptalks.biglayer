#ifdef GL_ES
precision highp float;
#else
#define lowp
#define mediump
#define highp
#endif

attribute vec4 a_pos;
attribute mediump vec2 a_normal;
// attribute mediump vec2 a_linenormal;
attribute float a_linesofar;
// (line_width * 100 + opacity * 10) * 10000 + tex_idx
attribute float a_style;
// attribute float a_seglen;

uniform mat4 u_matrix;
uniform float u_scale;
uniform float u_styles[maxUniformLength];

varying vec2 v_linenormal;
varying float v_linewidth;
varying float v_opacity;
varying vec4 v_texcoord;
varying float v_scale;
varying float v_texture_normal;

varying float v_linesofar;
// varying float v_ruler;

void main() {
    int tex_idx = int(mod(a_style, 10000.0));
    float s = floor(a_style / 10000.0);
    v_opacity = mod(s, 10.0) / 10.0;
    if (v_opacity == 0.0) {
        v_opacity = 1.0;
    }
    v_linewidth = s / 100.0;
    v_texcoord = vec4(u_styles[tex_idx], u_styles[tex_idx + 1], u_styles[tex_idx + 2], u_styles[tex_idx + 3]);

    v_scale = u_scale;

    // v_linenormal = a_linenormal;

    vec4 pos = a_pos;
    pos.x += a_normal.x * v_linewidth * u_scale;
    pos.y += a_normal.y * v_linewidth * u_scale;

    // add linesofar with corner length caused by line-join
    v_linesofar = a_linesofar;


    gl_Position = u_matrix * pos;
    if (a_normal.y == 0.0) {
        // with an upside down straight line, a_normal.y is always 0, use a_normal.x instead
        v_texture_normal = -sign(a_normal.x);
    } else {
        //
        v_texture_normal = sign(a_normal.y);
    }
}
