#ifdef GL_ES
precision highp float;
#else
#define lowp
#define mediump
#define highp
#endif

attribute vec4 a_pos;
attribute float a_corner;
attribute vec2 a_normal;
attribute float a_linesofar;
attribute float a_seglen;
attribute vec2 a_linenormal;
attribute vec4 a_texcoord;
attribute float a_opacity;
attribute float a_linewidth;

uniform mat4 u_matrix;
uniform float u_scale;

varying vec2 v_linenormal;
varying float v_linewidth;
varying float v_opacity;
varying vec4 v_texcoord;
varying float v_scale;
varying float v_texture_normal;

varying float v_linesofar;
varying float v_linelength;
varying float v_ruler;
varying float v_seglen;

void main() {
    v_opacity = a_opacity;
    v_linewidth = a_linewidth;
    v_texcoord = a_texcoord;
    v_scale = u_scale;

    v_linenormal = a_linenormal;

    vec4 pos = a_pos;
    pos.x += a_normal.x * v_linewidth * u_scale;
    pos.y += a_normal.y * v_linewidth * u_scale;

    float corner = a_corner * v_linewidth * u_scale;
    v_linelength = a_linesofar;
    // add linesofar with corner length caused by line-join
    v_linesofar = a_linesofar + corner;

    float seglen = a_seglen / 2.0;
    float direction = mod(a_seglen, 2.0);
    if (corner != 0.0) {
        if (direction >= 1.0) {
            if (corner > 0.0) {
                // to the end point
                v_ruler = corner / seglen * 4.0 + 1.0;
            } else {
                v_ruler = 1.0;
            }

        } else {
            // to the start point
            if (corner < 0.0) {
                // to the end point
                v_ruler = corner / seglen * 4.0 - 1.0;
            } else {
                v_ruler = -1.0;
            }
        }
    } else {
        if (direction >= 1.0) {
            // to the end point
            v_ruler = 1.0;
        } else {
            // to the start point
            v_ruler = -1.0;
        }
    }


    v_seglen = seglen / u_scale;

    gl_Position = u_matrix * pos;
    if (a_normal.y == 0.0) {
        // with an upside down straight line, a_normal.y is always 0, use a_normal.x instead
        v_texture_normal = -sign(a_normal.x);
    } else {
        //
        v_texture_normal = sign(a_normal.y);
    }

}
